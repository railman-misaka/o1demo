"use client"

import type React from "react"

import { useState, useCallback, type FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  fileUrl?: string
  fileName?: string
}

interface UseChatProps {
  chatId?: string | null
  model?: string
}

// チャット履歴をローカルストレージに保存する関数
const saveMessagesToLocalStorage = (chatId: string, messages: Message[]) => {
  if (typeof window !== 'undefined' && chatId) {
    localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages))
  }
}

// チャット履歴をローカルストレージから読み込む関数
const loadMessagesFromLocalStorage = (chatId: string): Message[] => {
  if (typeof window !== 'undefined' && chatId) {
    const savedMessages = localStorage.getItem(`chat_${chatId}`)
    if (savedMessages) {
      return JSON.parse(savedMessages)
    }
  }
  return []
}

export function useChat({ chatId, model = "gpt-35-turbo" }: UseChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // chatIdが変更されたら、そのチャットの履歴を読み込む
  useEffect(() => {
    if (chatId) {
      const savedMessages = loadMessagesFromLocalStorage(chatId)
      setMessages(savedMessages)
    } else {
      setMessages([])
    }
  }, [chatId])

  // メッセージが変更されたら、ローカルストレージに保存
  useEffect(() => {
    if (chatId && messages.length > 0) {
      saveMessagesToLocalStorage(chatId, messages)
    }
  }, [chatId, messages])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent, file?: File | null) => {
      e.preventDefault()

      if ((!input.trim() && !file) || isLoading) return

      let fileUrl = ""
      let fileName = ""

      // ファイルがある場合は処理
      if (file) {
        fileName = file.name
        
        // 画像ファイルの場合はデータURLに変換
        if (file.type.startsWith('image/')) {
          fileUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              resolve(e.target?.result as string)
            }
            reader.readAsDataURL(file)
          })
        } else {
          // 画像以外のファイルの場合はファイル名のみ保存
          fileUrl = "file://" + file.name
        }
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: "user",
        content: input,
        fileUrl: fileUrl || undefined,
        fileName: fileName || undefined
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      // AIの応答用のプレースホルダーメッセージを作成
      const assistantMessageId = uuidv4()
      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant", content: "" }])

      try {
        // APIリクエスト用のメッセージ配列を作成
        const apiMessages = messages
          .concat(userMessage)
          .map(({ role, content, fileUrl, fileName }) => ({ 
            role, 
            content,
            fileUrl,
            fileName
          }))

        // APIエンドポイントにリクエストを送信
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            messages: apiMessages,
            model: model
          }),
        })

        if (!response.ok) {
          throw new Error("APIリクエストに失敗しました")
        }

        // ストリーミングレスポンスを処理
        const reader = response.body?.getReader()
        if (!reader) throw new Error("レスポンスボディを読み取れません")

        const decoder = new TextDecoder()
        let fullResponse = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") continue

              try {
                const { text } = JSON.parse(data)
                if (text) {
                  fullResponse += text
                  setMessages((prev) =>
                    prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: fullResponse } : msg))
                  )
                }
              } catch (e) {
                console.error("JSONのパースに失敗しました:", e)
              }
            }
          }
        }
      } catch (error) {
        console.error("Error generating response:", error)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: "すみません、エラーが発生しました。もう一度お試しください。" }
              : msg
          )
        )
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages, model]
  )

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  }
}

