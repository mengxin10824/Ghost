import { MessageType, type Message } from "./Message";

export class ModelContext {
  private messages: Message[] = [];
  private maxTokens: number;
  private currentTokenCount = 0;

  constructor(maxTokens: number = 4096) {
    this.maxTokens = maxTokens;
  }

  // 估算文本的 Token 数量
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  setMaxToken(maxTokens: number): void {
    this.maxTokens = maxTokens;
    this.fitContext();
  }

  // 添加消息并维护上下文
  addMessage(message: Message): void {
    const messageTokens = this.estimateTokens(message.content) + 3;

    // 添加新消息
    this.messages.push(message);
    this.currentTokenCount += messageTokens;
  }

  fitContext(): void {
    // 移除旧消息直到不超过最大限制
    while (this.currentTokenCount > this.maxTokens) {
      const removedMessage = this.messages.shift();
      if (!removedMessage) break;

      const removedTokens = this.estimateTokens(removedMessage.content) + 3;
      this.currentTokenCount -= removedTokens;
    }
  }

  // 获取当前有效上下文
  getContext(): Message[] {
    return [...this.messages];
  }

  getContextString(): string {
    return this.messages
      .map((msg) => {
        if (msg.sender == MessageType.BOT) {
          return `BOT: ${msg.content} `;
        }
        if (msg.sender == MessageType.USER) {
          return `USER: ${msg.content} `;
        }
      })
      .join("\n")
      + "以上是历史记录，BOT 代表上文你输出的话， USER 代表用户之前的输入。"
      ;
  }

  // 清空上下文
  clearContext(): void {
    this.messages = [];
    this.currentTokenCount = 0;
  }
}
