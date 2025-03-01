"use client"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat-message"
import { useChat } from "@/hooks/use-chat"
import { useEffect } from "react"

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
    handleSubmit(e)
    
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
              <span className="text-2xl">UI</span>
            </div>
            <h2 className="text-3xl font-bold mb-8">チャットボット UI</h2>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-white dark:bg-zinc-900">
        <form onSubmit={handleFormSubmit} className="relative">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
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
            placeholder="メッセージを入力..."
            className="w-full pl-12 pr-12 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />

          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">送信</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

