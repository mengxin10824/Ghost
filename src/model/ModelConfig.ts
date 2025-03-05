export class ModelConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  topK: number;
  frequencyPenalty: number;

  constructor(
    systemPrompt: string = "",
    temperature: number = 0.7,
    maxTokens: number = 2048,
    topP: number = 0.7,
    topK: number = 50,
    frequencyPenalty: number = 0.5
  ) {
    this.systemPrompt = systemPrompt;
    this.temperature = temperature;
    this.maxTokens = maxTokens;
    this.topP = topP;
    this.topK = topK;
    this.frequencyPenalty = frequencyPenalty;
  }
}
