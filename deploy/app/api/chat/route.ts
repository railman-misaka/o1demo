import { azureOpenAI } from "@/lib/azure-openai"
import { NextResponse } from "next/server"

// モデル名とデプロイメント名のマッピング
const MODEL_DEPLOYMENT_MAP: Record<string, string> = {
  // OpenAI モデル
  "o1": "o1",
  "o1-mini": "o1-mini",
  "gpt-4.5-preview": "gpt-4.5-preview",
  "o3-mini": "o3-mini",
  "gpt-4o-mini-audio-preview": "gpt-4o-mini-audio-preview",
  "gpt-4o-mini-realtime-preview": "gpt-4o-mini-realtime-preview",
  "gpt-4o": "gpt-4o",
  "gpt-4o-mini": "gpt-4o-mini",
  "gpt-4o-audio-preview": "gpt-4o-audio-preview",
  "gpt-4o-realtime-preview": "gpt-4o-realtime-preview",
  "o1-preview": "o1-preview",
  "gpt-4": "gpt-4",
  "gpt-4-32k": "gpt-4-32k",
  "text-embedding-ada-002": "text-embedding-ada-002",
  "davinci-002": "davinci-002",
  "gpt-35-turbo-16k": "gpt-35-turbo-16k",
  "gpt-35-turbo-instruct": "gpt-35-turbo-instruct",
  "gpt-35-turbo": "gpt-35-turbo",
}

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "メッセージが提供されていません" }, { status: 400 })
    }

    // システムメッセージを追加して回答スタイルを指定
    const systemMessage = {
      role: "system",
      content: "あなたは親切なAIアシスタントです。回答はシンプルなテキスト形式で提供してください。マークダウン記法（#や*など）は使用せず、装飾のない読みやすいテキストで回答してください。箇条書きが必要な場合は、数字や記号の後にスペースを入れて表現してください。"
    }

    // ユーザーメッセージの前にシステムメッセージを追加
    const allMessages = [systemMessage, ...messages.map((msg: any) => {
      // ファイルURLがある場合は、メッセージ内容にファイル情報を追加
      let content = msg.content
      
      if (msg.fileUrl) {
        if (msg.fileUrl.startsWith('data:image/')) {
          // 画像ファイルの場合
          content = `${content ? content + "\n\n" : ""}[画像ファイルが添付されています: ${msg.fileName || "画像"}]`
        } else {
          // その他のファイルの場合
          content = `${content ? content + "\n\n" : ""}[ファイルが添付されています: ${msg.fileName || "ファイル"}]`
        }
      }
      
      return {
        role: msg.role,
        content: content,
      }
    })]

    // モデルに基づいてデプロイメント名を決定
    let deploymentName = process.env.AZURE_OPENAI_DEFAULT_DEPLOYMENT || "gpt-4o"
    
    // クライアントから送信されたモデルに基づいてデプロイメント名を設定
    if (model) {
      // 環境変数からデプロイメント名を取得
      const envDeploymentName = process.env[`AZURE_OPENAI_${model.toUpperCase().replace(/-/g, '_')}_DEPLOYMENT`]
      
      if (envDeploymentName) {
        // 環境変数が設定されている場合はそれを使用
        deploymentName = envDeploymentName
      } else if (MODEL_DEPLOYMENT_MAP[model]) {
        // マッピングが存在する場合はそれを使用
        deploymentName = MODEL_DEPLOYMENT_MAP[model]
      }
      // それ以外の場合はデフォルトのデプロイメント名を使用
    }

    // 埋め込みモデルなど、チャット以外のモデルの場合はエラーを返す
    if (model === "text-embedding-ada-002") {
      return NextResponse.json({ error: "このモデルはチャット用途には対応していません" }, { status: 400 })
    }

    // Azure OpenAIのデプロイメント名を指定
    const response = await azureOpenAI.chat.completions.create({
      model: deploymentName,
      messages: allMessages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    })

    // ストリーミングレスポンスを返す
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        // レスポンスをストリーミングする
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || ""
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`))
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "チャットの処理中にエラーが発生しました" },
      { status: 500 }
    )
  }
} 