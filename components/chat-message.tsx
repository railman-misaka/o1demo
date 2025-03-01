import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    fileUrl?: string
    fileName?: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="mr-3">
          <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100",
        )}
      >
        {message.fileUrl && message.fileUrl.startsWith('data:image/') && (
          <div className="mb-2">
            <img 
              src={message.fileUrl} 
              alt={message.fileName || "アップロードされた画像"} 
              className="max-w-full rounded-md max-h-64 object-contain"
            />
          </div>
        )}
        
        {message.fileUrl && !message.fileUrl.startsWith('data:image/') && (
          <div className="mb-2 flex items-center p-2 bg-gray-200 dark:bg-zinc-700 rounded-md">
            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm">{message.fileName || "添付ファイル"}</span>
          </div>
        )}
        
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {isUser && (
        <Avatar className="ml-3">
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

