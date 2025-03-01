import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-start", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="mr-3">
          <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100",
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {isUser && (
        <Avatar className="ml-3">
          <AvatarImage src="/user-avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

