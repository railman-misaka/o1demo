import { AzureOpenAI } from "openai"

// Azure OpenAI クライアントの設定
export const azureOpenAI = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY || "",
  endpoint: process.env.AZURE_OPENAI_ENDPOINT || "",
  apiVersion: "2023-12-01-preview",
  // o1モデルのデプロイ名を設定
  deployment: process.env.AZURE_OPENAI_O1_DEPLOYMENT || "o1-deployment",
})

