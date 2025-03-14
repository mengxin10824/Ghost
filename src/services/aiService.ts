import axios from "axios";
// 在文件顶部添加导入语句
import { Model } from "../model/Model";
import { Message, MessageType } from "../model/Message";
import { generateUUID } from "../model/UUID";
import { getNow } from "../model/Time";

// 在文件顶部添加变量声明
let _currentModel: Model;
// let API_BASE: string;

export let _apiBase: string;

interface ChatCompletionRequest {
  prompt: string;
  max_tokens: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number | null;
  echo?: boolean;
  stop?: string[] | string;
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: { [token: string]: number };
  user?: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// interface StreamChunk {
//     choices: Array<{
//         delta: { content?: string }
//     }>
// }
export interface StreamChunk {
  choices: {
    delta: {
      content: string;
    };
  }[];
}

export class AIError extends Error {
  readonly code: string;
  readonly statusCode?: number;

  constructor(code: string, message: string, statusCode?: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "AIError";
  }
}

// 初始化默认模型
export function initAIService(defaultModel: Model) {
  _currentModel = defaultModel;
  _apiBase = defaultModel.url;
  console.log("AI服务已初始化，默认模型:", defaultModel.name);
}

export const getChatCompletion = async (
  request: ChatCompletionRequest & { apiUrl: string }
): Promise<ChatCompletionResponse> => {
  const abortController = new AbortController();
  try {
    console.log(
      "API 请求 URL:",
      `${
        _currentModel.url || import.meta.env.VITE_API_BASE_URL
      }/chat/completions`
    );
    console.log("API 请求头:", {
      Authorization:
        _currentModel.apiKey || import.meta.env.VITE_FALLBACK_API_KEY,
    });
    const response = await axios.post(
      `${request.apiUrl}/chat/completions`,
      request,
      {
        headers: {
          Authorization: _currentModel.getFullKey(),
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AIError("ABORTED", "Request was aborted by the user");
    }
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as { error?: { message: string } };
      throw new AIError(
        "API_ERROR",
        errorData?.error?.message || "API request failed",
        error.response?.status
      );
    }
    throw new AIError("NETWORK_ERROR", "Network error occurred");
  }
};

export const streamChatCompletion = async (
  messages: Message[],
  systemString: string,
  onData?: (chunk: Message) => void,
  onComplete?: (messageId: string, content: string) => void,
  onCompleted?: (messageId: string, fullContent: string) => void,
  modelSettings?: any
) => {
  console.log("开始API调用，模型设置:", modelSettings);
  // _currentModel = setCurrentModel(modelSettings.model);

  try {
    const response = await fetch(
      `${
        _currentModel.url || import.meta.env.VITE_API_BASE_URL
      }/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: _currentModel.getFullKey(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: _currentModel.id || modelSettings.model,
          messages: [
            {
              role: "system",
              content: systemString,
            },
            ...messages.map((msg) => {
              const contentParts = [];

              // 添加文字指令
              if (msg.content) {
                contentParts.push({
                  type: "text",
                  text: msg.content,
                });
              }

              // 如果有则添加图片附件
              if (msg.attachments && msg.attachments.length > 0) {
                msg.attachments.forEach((attachment) => {
                  // 确保 base64 数据存在
                  if (!attachment.base64) {
                    console.warn("附件缺少base64数据，跳过此附件");
                    return;
                  }

                  const imageType = attachment.mimeType || "image/jpeg";

                  const detailLevel =  "auto"; // 可选值: "high", "low", "auto"

                  contentParts.push({
                    type: "image_url",
                    image_url: {
                      url: `data:${imageType};base64,${attachment.base64}`,
                      detail: detailLevel,
                    },
                  });
                });
              }

              return {
                role: msg.sender === MessageType.USER ? "user" : "assistant",
                content: contentParts,
              };
            }),
          ],
          max_tokens: modelSettings.maxTokens,
          temperature: modelSettings.temperature,
          top_p: modelSettings.topP,
          top_k: modelSettings.topK,
          frequency_penalty: modelSettings.frequency_penalty,
          stream: true,
        }),
      }
    );

    console.log("API调用成功，响应:", response.body);

    if (response.status !== 200) {
      throw new AIError(
        "API_ERROR",
        "Failed to fetch stream response",
        response.status
      );
    }

    if (!response.body) throw new AIError("NO_RESPONSE", "Empty response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let messageId: string | null = null;
    let accumulatedContent = "";
    let isDone = false; // 用于标记是否已读取到 [DONE]

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // 流已结束
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk
        .split("\n")
        .filter((line) => line.trim() && line.startsWith("data: "));

      for (const line of lines) {
        const data = line.replace("data: ", "").trim();
        if (data === "[DONE]") {
          // 标记已完成读取，并跳出循环
          isDone = true;
          break;
        }

        const parsedData = JSON.parse(data) as StreamChunk;
        const content = parsedData.choices[0].delta.content || "";

        console.log("API Response（aiService）:", content);

        // 累积完整内容
        accumulatedContent += content;

        if (!messageId) {
          // 第一次拿到 content 时，创建新 message 并调用 onData
          const newMessage = new Message(
            generateUUID(),
            content,
            MessageType.BOT,
            getNow(),
            undefined
          );
          messageId = newMessage.id;
          onData?.(newMessage);
        } else {
          // 后续内容调用 onComplete
          onComplete?.(messageId, content);
        }
      }

      // 如果已经接收到 [DONE]，退出外层循环
      if (isDone) break;
    }

    // 整个流式内容读取完成后，调用 onCompleted 回调
    onCompleted?.(messageId || "", accumulatedContent);
  } catch (error) {
    console.error("API调用失败:", error);
    throw error;
  }
};

export const getCurrentModel = () => _currentModel;
export const setCurrentModel = (model: Model): Model => {
  _currentModel = model;
  _apiBase = model.url;
  console.log("当前模型已更新:", model.id, model.name, "API URL:", model.url); // 添加日志
  return _currentModel;
};

class MockModel extends Model {
  constructor() {
    super(
      "mock-model",
      "Mock Model",
      "mock-icon.svg",
      "https://mock.api",
      "sk-mock-key"
    );
  }
}

// 初始化使用模拟模型
setCurrentModel(new MockModel());

let abortController: AbortController | null = null;

export const abortRequest = () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
  }
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const getChatCompletionWithRetry = async (
  request: ChatCompletionRequest & { apiUrl: string },
  retries = MAX_RETRIES
): Promise<ChatCompletionResponse> => {
  try {
    return await getChatCompletion(request);
  } catch (error) {
    if (
      retries > 0 &&
      error instanceof AIError &&
      error.statusCode !== undefined &&
      error.statusCode >= 500
    ) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return getChatCompletionWithRetry(request, retries - 1);
    }
    throw error;
  }
};
