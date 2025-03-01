"use client"

import { ChatInterface } from "@/components/chat-interface"
import { useState, useEffect, useRef } from "react"
import { Trash2, Search, X, Settings, Edit } from "lucide-react"

// チャット履歴の型定義
interface ChatHistory {
  id: string
  createdAt: number
  title?: string
  workspaceId?: string
}

// ワークスペースの型定義
interface Workspace {
  id: string
  name: string
  createdAt: number
}

// 利用可能なモデルのリスト
const AVAILABLE_MODELS = [
  // OpenAI モデル
  { id: "o1", name: "o1", category: "OpenAI" },
  { id: "o1-mini", name: "o1-mini", category: "OpenAI" },
  { id: "gpt-4.5-preview", name: "GPT-4.5 Preview", category: "OpenAI" },
  { id: "o3-mini", name: "o3-mini", category: "OpenAI" },
  { id: "gpt-4o-mini-audio-preview", name: "GPT-4o Mini Audio Preview", category: "OpenAI" },
  { id: "gpt-4o-mini-realtime-preview", name: "GPT-4o Mini Realtime Preview", category: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", category: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", category: "OpenAI" },
  { id: "gpt-4o-audio-preview", name: "GPT-4o Audio Preview", category: "OpenAI" },
  { id: "gpt-4o-realtime-preview", name: "GPT-4o Realtime Preview", category: "OpenAI" },
  { id: "o1-preview", name: "o1 Preview", category: "OpenAI" },
  { id: "gpt-4", name: "GPT-4", category: "OpenAI" },
  { id: "gpt-4-32k", name: "GPT-4 32k", category: "OpenAI" },
  { id: "text-embedding-ada-002", name: "Text Embedding Ada 002", category: "OpenAI" },
  { id: "davinci-002", name: "Davinci 002", category: "OpenAI" },
  { id: "gpt-35-turbo-16k", name: "GPT-3.5 Turbo 16k", category: "OpenAI" },
  { id: "gpt-35-turbo-instruct", name: "GPT-3.5 Turbo Instruct", category: "OpenAI" },
  { id: "gpt-35-turbo", name: "GPT-3.5 Turbo", category: "OpenAI" },
]

// デフォルトのワークスペース
const DEFAULT_WORKSPACE: Workspace = {
  id: 'default',
  name: 'デフォルト',
  createdAt: Date.now()
}

export default function Home() {
  const [chatId, setChatId] = useState<string | null>(null)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const [currentChatTitle, setCurrentChatTitle] = useState<string>("新しい会話")
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o")
  const [workspaces, setWorkspaces] = useState<Workspace[]>([DEFAULT_WORKSPACE])
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>(DEFAULT_WORKSPACE.id)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredChatHistory, setFilteredChatHistory] = useState<ChatHistory[]>([])
  const [hasInitialChat, setHasInitialChat] = useState<boolean>(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const initialChatCreated = useRef<boolean>(false)

  // コンポーネントがマウントされたときにチャット履歴とワークスペースを読み込む
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ワークスペースの一覧を取得
      const savedWorkspaces = localStorage.getItem('workspaces')
      if (savedWorkspaces) {
        const parsedWorkspaces = JSON.parse(savedWorkspaces)
        setWorkspaces(parsedWorkspaces.length > 0 ? parsedWorkspaces : [DEFAULT_WORKSPACE])
      } else {
        // デフォルトのワークスペースを保存
        localStorage.setItem('workspaces', JSON.stringify([DEFAULT_WORKSPACE]))
      }
      
      // ローカルストレージからチャット履歴の一覧を取得
      const savedChatHistory = localStorage.getItem('chat_history')
      if (savedChatHistory) {
        const parsedHistory = JSON.parse(savedChatHistory)
        setChatHistory(parsedHistory)
        
        // チャット履歴があれば初期チャットフラグを設定
        if (parsedHistory.length > 0) {
          setHasInitialChat(true)
          initialChatCreated.current = true
        }
      }
      
      // 保存されたモデル設定を取得
      const savedModel = localStorage.getItem('selected_model')
      if (savedModel) {
        setSelectedModel(savedModel)
      }
      
      // 保存されたワークスペース設定を取得
      const savedWorkspace = localStorage.getItem('selected_workspace')
      if (savedWorkspace) {
        setSelectedWorkspace(savedWorkspace)
      }
      
      // 最後に選択されていたチャットIDを取得
      const lastChatId = localStorage.getItem('last_chat_id')
      if (lastChatId) {
        setChatId(lastChatId)
      }
    }
  }, [])

  // チャット履歴を定期的に更新する
  useEffect(() => {
    // ローカルストレージの変更を監視する関数
    const checkForUpdates = () => {
      if (typeof window !== 'undefined') {
        const savedChatHistory = localStorage.getItem('chat_history')
        if (savedChatHistory) {
          const parsedHistory = JSON.parse(savedChatHistory)
          // 現在のチャット履歴と比較して異なる場合のみ更新
          if (JSON.stringify(parsedHistory) !== JSON.stringify(chatHistory)) {
            setChatHistory(parsedHistory)
          }
        }
      }
    }
    
    // 1秒ごとにチェック
    const intervalId = setInterval(checkForUpdates, 1000)
    
    // クリーンアップ関数
    return () => clearInterval(intervalId)
  }, [chatHistory])

  // チャットIDが変更されたときにローカルストレージに保存
  useEffect(() => {
    if (chatId && typeof window !== 'undefined') {
      localStorage.setItem('last_chat_id', chatId)
    }
  }, [chatId])

  // 選択されたワークスペースが変更されたときにフィルタリングされたチャット履歴を更新
  useEffect(() => {
    if (selectedWorkspace) {
      const filtered = chatHistory.filter(chat => 
        chat.workspaceId === selectedWorkspace || 
        (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id)
      )
      setFilteredChatHistory(filtered)
    } else {
      setFilteredChatHistory(chatHistory)
    }
  }, [selectedWorkspace, chatHistory])

  // 検索クエリが変更されたときにフィルタリングされたチャット履歴を更新
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // 検索クエリが空の場合は、選択されたワークスペースのチャット履歴を表示
      const filtered = chatHistory.filter(chat => 
        chat.workspaceId === selectedWorkspace || 
        (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id)
      )
      setFilteredChatHistory(filtered)
    } else {
      // 検索クエリに一致するチャット履歴を検索
      searchChatHistory(searchQuery)
    }
  }, [searchQuery, selectedWorkspace, chatHistory])

  // チャットIDが変更されたときにタイトルを更新
  useEffect(() => {
    if (chatId) {
      const selectedChat = chatHistory.find(chat => chat.id === chatId)
      if (selectedChat) {
        setCurrentChatTitle(selectedChat.title || `会話 ${formatDate(selectedChat.createdAt)}`)
      }
    } else {
      setCurrentChatTitle("新しい会話")
    }
  }, [chatId, chatHistory])

  // チャット履歴を検索する関数
  const searchChatHistory = async (query: string) => {
    if (!query.trim()) return
    
    // チャットタイトルで検索
    let results = chatHistory.filter(chat => {
      const title = chat.title || `会話 ${formatDate(chat.createdAt)}`
      return title.toLowerCase().includes(query.toLowerCase()) &&
        (chat.workspaceId === selectedWorkspace || 
         (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id))
    })
    
    // チャットの内容も検索
    for (const chat of chatHistory) {
      if (results.some(r => r.id === chat.id)) continue // 既に結果に含まれている場合はスキップ
      
      if (chat.workspaceId === selectedWorkspace || 
          (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id)) {
        // ローカルストレージからチャットメッセージを取得
        const messages = localStorage.getItem(`chat_${chat.id}`)
        if (messages) {
          const parsedMessages = JSON.parse(messages)
          // メッセージの内容で検索
          const hasMatch = parsedMessages.some((msg: any) => 
            msg.content.toLowerCase().includes(query.toLowerCase())
          )
          if (hasMatch) {
            results.push(chat)
          }
        }
      }
    }
    
    setFilteredChatHistory(results)
  }

  // 検索をクリアする関数
  const clearSearch = () => {
    setSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // モデルを変更する関数
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value
    setSelectedModel(newModel)
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_model', newModel)
    }
  }

  // ワークスペースを変更する関数
  const handleWorkspaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newWorkspace = e.target.value
    setSelectedWorkspace(newWorkspace)
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_workspace', newWorkspace)
    }
  }

  // 新しいワークスペースを作成する関数
  const createNewWorkspace = () => {
    const name = prompt('新しいワークスペースの名前を入力してください')
    if (!name) return
    
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now()
    }
    
    const updatedWorkspaces = [...workspaces, newWorkspace]
    setWorkspaces(updatedWorkspaces)
    setSelectedWorkspace(newWorkspace.id)
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces))
      localStorage.setItem('selected_workspace', newWorkspace.id)
    }
  }

  // チャットのタイトルを更新する関数
  const updateChatTitle = (id: string, title: string) => {
    const updatedHistory = chatHistory.map(chat => 
      chat.id === id ? { ...chat, title } : chat
    )
    setChatHistory(updatedHistory)
    
    if (chatId === id) {
      setCurrentChatTitle(title)
    }
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_history', JSON.stringify(updatedHistory))
    }
  }

  // 新しいチャットを作成する関数
  const createNewChat = () => {
    // 現在のチャットがある場合は保存する
    if (chatId) {
      // チャットメッセージを確認
      const messages = localStorage.getItem(`chat_${chatId}`)
      if (messages) {
        const parsedMessages = JSON.parse(messages)
        // メッセージがある場合のみ履歴に追加
        if (parsedMessages.length > 0) {
          // 既存のチャット履歴に既に含まれているか確認
          const existingChatIndex = chatHistory.findIndex(chat => chat.id === chatId)
          
          if (existingChatIndex === -1) {
            // 履歴に存在しない場合は追加
            const existingChat: ChatHistory = {
              id: chatId,
              createdAt: parseInt(chatId) || Date.now(),
              workspaceId: selectedWorkspace
            }
            
            // タイトルがあれば設定
            const title = localStorage.getItem(`chat_title_${chatId}`)
            if (title) {
              existingChat.title = title
            }
            
            // 履歴に追加
            const updatedHistory = [existingChat, ...chatHistory]
            setChatHistory(updatedHistory)
            
            // ローカルストレージに保存
            localStorage.setItem('chat_history', JSON.stringify(updatedHistory))
          }
          
          // 初期チャットフラグを更新
          setHasInitialChat(true)
          initialChatCreated.current = true
        }
      }
    }
    
    // 新しいチャットを作成
    const newChatId = Date.now().toString()
    setChatId(newChatId)
    setCurrentChatTitle("新しい会話")
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('last_chat_id', newChatId)
    }
  }

  // 既存のチャットを選択する関数
  const selectChat = (id: string) => {
    setChatId(id)
    const selectedChat = chatHistory.find(chat => chat.id === id)
    if (selectedChat) {
      setCurrentChatTitle(selectedChat.title || `会話 ${formatDate(selectedChat.createdAt)}`)
    }
  }

  // チャットを削除する関数
  const deleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation() // 親要素のクリックイベントが発火するのを防ぐ
    
    // 削除するチャットが現在選択されているチャットの場合、選択を解除
    if (chatId === id) {
      setChatId(null)
      setCurrentChatTitle("新しい会話")
      
      // 最後に選択されていたチャットIDを削除
      if (typeof window !== 'undefined') {
        localStorage.removeItem('last_chat_id')
      }
    }
    
    // チャット履歴から削除
    const updatedHistory = chatHistory.filter(chat => chat.id !== id)
    setChatHistory(updatedHistory)
    
    // ローカルストレージを更新
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_history', JSON.stringify(updatedHistory))
      // チャットのメッセージも削除
      localStorage.removeItem(`chat_${id}`)
      localStorage.removeItem(`chat_title_${id}`)
    }
  }

  // すべてのチャットを削除する関数
  const deleteAllChats = () => {
    // 現在のワークスペースのチャットのみを削除
    const chatsToDelete = chatHistory.filter(chat => 
      chat.workspaceId === selectedWorkspace || 
      (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id)
    )
    
    // 確認ダイアログを表示
    const confirmed = confirm(`このワークスペース内のすべてのチャット履歴を削除しますか？`)
    if (!confirmed) return
    
    // 現在選択されているチャットが削除対象の場合、選択を解除
    if (chatId && chatsToDelete.some(chat => chat.id === chatId)) {
      setChatId(null)
      setCurrentChatTitle("新しい会話")
      
      // 最後に選択されていたチャットIDを削除
      if (typeof window !== 'undefined') {
        localStorage.removeItem('last_chat_id')
      }
    }
    
    // 選択されたワークスペース以外のチャットを保持
    const remainingChats = chatHistory.filter(chat => 
      !(chat.workspaceId === selectedWorkspace || 
        (!chat.workspaceId && selectedWorkspace === DEFAULT_WORKSPACE.id))
    )
    
    setChatHistory(remainingChats)
    
    // ローカルストレージを更新
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_history', JSON.stringify(remainingChats))
      
      // 削除対象のチャットメッセージも削除
      chatsToDelete.forEach(chat => {
        localStorage.removeItem(`chat_${chat.id}`)
        localStorage.removeItem(`chat_title_${chat.id}`)
      })
    }
  }

  // ワークスペースを削除する関数
  const deleteWorkspace = () => {
    // デフォルトワークスペースは削除できない
    if (selectedWorkspace === DEFAULT_WORKSPACE.id) {
      alert('デフォルトのワークスペースは削除できません。')
      return
    }
    
    // 確認ダイアログを表示
    const confirmed = confirm(`ワークスペース「${workspaces.find(w => w.id === selectedWorkspace)?.name}」を削除しますか？\n\nこのワークスペース内のすべてのチャット履歴も削除されます。`)
    if (!confirmed) return
    
    // 削除するワークスペースに関連するチャットを特定
    const chatsToDelete = chatHistory.filter(chat => 
      chat.workspaceId === selectedWorkspace
    )
    
    // 現在選択されているチャットが削除対象の場合、選択を解除
    if (chatId && chatsToDelete.some(chat => chat.id === chatId)) {
      setChatId(null)
      setCurrentChatTitle("新しい会話")
      
      // 最後に選択されていたチャットIDを削除
      if (typeof window !== 'undefined') {
        localStorage.removeItem('last_chat_id')
      }
    }
    
    // 削除するワークスペース以外のチャットを保持
    const remainingChats = chatHistory.filter(chat => 
      chat.workspaceId !== selectedWorkspace
    )
    
    // 削除するワークスペース以外のワークスペースを保持
    const remainingWorkspaces = workspaces.filter(workspace => 
      workspace.id !== selectedWorkspace
    )
    
    // デフォルトワークスペースを選択
    setSelectedWorkspace(DEFAULT_WORKSPACE.id)
    
    // ステートを更新
    setChatHistory(remainingChats)
    setWorkspaces(remainingWorkspaces)
    
    // ローカルストレージを更新
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_history', JSON.stringify(remainingChats))
      localStorage.setItem('workspaces', JSON.stringify(remainingWorkspaces))
      localStorage.setItem('selected_workspace', DEFAULT_WORKSPACE.id)
      
      // 削除対象のチャットメッセージも削除
      chatsToDelete.forEach(chat => {
        localStorage.removeItem(`chat_${chat.id}`)
        localStorage.removeItem(`chat_title_${chat.id}`)
      })
    }
  }

  // ワークスペース名を編集する関数
  const editWorkspace = () => {
    // デフォルトワークスペースは編集できない
    if (selectedWorkspace === DEFAULT_WORKSPACE.id) {
      alert('デフォルトのワークスペースは編集できません。')
      return
    }
    
    const workspace = workspaces.find(w => w.id === selectedWorkspace)
    if (!workspace) return
    
    const newName = prompt('ワークスペース名を入力してください', workspace.name)
    if (!newName || newName === workspace.name) return
    
    // ワークスペース名を更新
    const updatedWorkspaces = workspaces.map(w => 
      w.id === selectedWorkspace ? { ...w, name: newName } : w
    )
    
    setWorkspaces(updatedWorkspaces)
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('workspaces', JSON.stringify(updatedWorkspaces))
    }
  }

  // チャット履歴の日付をフォーマットする関数
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // モデルをカテゴリーでグループ化する
  const groupedModels = AVAILABLE_MODELS.reduce((acc, model) => {
    const category = model.category || 'その他';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_MODELS>);

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="flex w-full h-full">
        {/* サイドバー - 固定位置で常に表示 */}
        <div className="hidden md:flex w-64 flex-col bg-zinc-900 text-white h-full">
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="relative w-full">
                <select 
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedWorkspace}
                  onChange={handleWorkspaceChange}
                >
                  {workspaces.map(workspace => (
                    <option key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <button 
                onClick={createNewWorkspace}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                + 新しいワークスペースを作成
              </button>
              
              <div className="flex flex-col space-y-1">
                <button 
                  onClick={editWorkspace}
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-end"
                  disabled={selectedWorkspace === DEFAULT_WORKSPACE.id}
                  title={selectedWorkspace === DEFAULT_WORKSPACE.id ? 'デフォルトのワークスペースは編集できません' : 'ワークスペース名を編集'}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  編集
                </button>
                
                <button 
                  onClick={deleteWorkspace}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center justify-end"
                  disabled={selectedWorkspace === DEFAULT_WORKSPACE.id}
                  title={selectedWorkspace === DEFAULT_WORKSPACE.id ? 'デフォルトのワークスペースは削除できません' : 'ワークスペースを削除'}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  削除
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button 
              onClick={createNewChat}
              className="flex items-center justify-center w-full bg-white/10 hover:bg-white/20 text-white rounded-md py-2 px-4 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新しいチャット
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="チャットを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-zinc-500 hover:text-zinc-300" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {filteredChatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-zinc-500">
                {searchQuery ? "検索結果がありません" : "チャット履歴がありません"}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredChatHistory.map((chat) => (
                  <div key={chat.id} className="relative group">
                    <button
                      onClick={() => selectChat(chat.id)}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        chatId === chat.id ? 'bg-blue-600' : 'hover:bg-zinc-800'
                      }`}
                    >
                      <div className="text-sm font-medium truncate pr-8">
                        {chat.title || `会話 ${formatDate(chat.createdAt)}`}
                      </div>
                    </button>
                    <button
                      onClick={(e) => deleteChat(e, chat.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-500/20"
                      title="チャットを削除"
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                ))}
                
                {filteredChatHistory.length > 0 && (
                  <button
                    onClick={deleteAllChats}
                    className="w-full mt-4 text-center p-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    このワークスペースのチャットをすべて削除
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* メインコンテンツエリア - スクロール可能 */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <button className="md:hidden mr-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold truncate">{currentChatTitle}</h1>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={handleModelChange}
                  className="appearance-none bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md py-1 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.entries(groupedModels).map(([category, models]) => (
                    <optgroup key={category} label={category}>
                      {models.map(model => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <ChatInterface 
            key={chatId} 
            chatId={chatId} 
            onUpdateTitle={(title) => {
              if (chatId) {
                updateChatTitle(chatId, title)
                // タイトルをローカルストレージにも直接保存
                localStorage.setItem(`chat_title_${chatId}`, title)
              }
            }}
            model={selectedModel}
          />
        </div>
      </div>
    </main>
  )
}

