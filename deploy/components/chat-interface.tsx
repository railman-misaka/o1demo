"use client"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"
import { useChat } from "@/hooks/use-chat"
import { useEffect, useRef, useState } from "react"

interface ChatInterfaceProps {
  chatId?: string | null
  onUpdateTitle?: (title: string) => void
  model?: string
}

export function ChatInterface({ chatId, onUpdateTitle, model = "gpt-35-turbo" }: ChatInterfaceProps = {}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ 
    chatId,
    model
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ファイル選択ハンドラー
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    
    if (file) {
      // 画像ファイルの場合はプレビューを表示
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        // 画像以外のファイルの場合はファイル名を表示
        setFilePreview(null)
      }
    } else {
      setFilePreview(null)
    }
  }

  // ファイル選択ボタンのクリックハンドラー
  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  // 選択したファイルをキャンセル
  const handleCancelFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // メッセージが変更されたときにタイトルを更新
  useEffect(() => {
    if (messages.length >= 2 && onUpdateTitle) {
      // 最初のユーザーメッセージに基づいてタイトルを生成
      const firstUserMessage = messages.find(msg => msg.role === 'user')
      if (firstUserMessage) {
        // メッセージの最初の20文字をタイトルとして使用
        const title = firstUserMessage.content.length > 20
          ? `${firstUserMessage.content.substring(0, 20)}...`
          : firstUserMessage.content
        
        onUpdateTitle(title)
        
        // チャットIDがある場合、チャット履歴に追加されているか確認
        if (chatId && typeof window !== 'undefined') {
          const savedChatHistory = localStorage.getItem('chat_history')
          if (savedChatHistory) {
            const parsedHistory = JSON.parse(savedChatHistory)
            // チャットIDが履歴に存在するか確認
            const existingChat = parsedHistory.find((chat: any) => chat.id === chatId)
            
            if (!existingChat && messages.length > 0) {
              // 履歴に存在しない場合は追加
              const newChat = {
                id: chatId,
                createdAt: parseInt(chatId) || Date.now(),
                title: title,
                workspaceId: localStorage.getItem('selected_workspace') || 'default'
              }
              
              // 履歴に追加
              const updatedHistory = [newChat, ...parsedHistory]
              localStorage.setItem('chat_history', JSON.stringify(updatedHistory))
            }
          }
        }
      }
    }
  }, [messages, onUpdateTitle, chatId])

  // カスタムのフォーム送信ハンドラー
  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, selectedFile)
    
    // ファイルが選択されていた場合はリセット
    if (selectedFile) {
      setSelectedFile(null)
      setFilePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
    
    // チャットIDがあり、メッセージが送信された場合
    if (chatId && input.trim() && typeof window !== 'undefined') {
      // チャット履歴を確認
      const savedChatHistory = localStorage.getItem('chat_history')
      if (savedChatHistory) {
        const parsedHistory = JSON.parse(savedChatHistory)
        // チャットIDが履歴に存在するか確認
        const existingChat = parsedHistory.find((chat: any) => chat.id === chatId)
        
        if (!existingChat) {
          // 履歴に存在しない場合は仮のタイトルで追加
          const tempTitle = input.length > 20
            ? `${input.substring(0, 20)}...`
            : input
            
          const newChat = {
            id: chatId,
            createdAt: parseInt(chatId) || Date.now(),
            title: tempTitle,
            workspaceId: localStorage.getItem('selected_workspace') || 'default'
          }
          
          // 履歴に追加
          const updatedHistory = [newChat, ...parsedHistory]
          localStorage.setItem('chat_history', JSON.stringify(updatedHistory))
        }
      } else {
        // チャット履歴がない場合は新規作成
        const tempTitle = input.length > 20
          ? `${input.substring(0, 20)}...`
          : input
          
        const newChat = {
          id: chatId,
          createdAt: parseInt(chatId) || Date.now(),
          title: tempTitle,
          workspaceId: localStorage.getItem('selected_workspace') || 'default'
        }
        
        localStorage.setItem('chat_history', JSON.stringify([newChat]))
      }
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="bg-zinc-900 text-white p-4 rounded-full mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-3xl font-bold mb-8">Azure OpenAI チャットデモ</h2>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      {/* ファイルプレビュー表示エリア */}
      {selectedFile && (
        <div className="px-4 pb-2">
          <div className="flex items-center p-2 bg-gray-100 dark:bg-zinc-800 rounded-md">
            {filePreview ? (
              <div className="relative">
                <img src={filePreview} alt="プレビュー" className="h-16 w-auto rounded" />
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm">{selectedFile.name}</span>
              </div>
            )}
            <button 
              onClick={handleCancelFile}
              className="ml-auto p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="border-t p-4 bg-white dark:bg-zinc-900">
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
          />
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            onClick={handleAttachmentClick}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="sr-only">添付ファイルを追加</span>
          </Button>

          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={selectedFile ? `${selectedFile.name}について質問する...` : "メッセージを入力..."}
            className="w-full pl-12 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />

          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={isLoading || (!input.trim() && !selectedFile)}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">送信</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

