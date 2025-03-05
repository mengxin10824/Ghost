import { describe, expect, it, vi, beforeEach, beforeAll, afterAll } from 'vitest';
import { getChatCompletion, streamChatCompletion, setCurrentModel, AIError } from '../src/services/aiService';
import { Message, MessageType } from '../src/model/Message';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Model } from '../src/model/Model';

const mock = new MockAdapter(axios);

class MockModel extends Model {
  constructor() {
    super(
      'deepseek-ai/DeepSeek-V3',
      'Test Model',
      'default-icon.svg',
      'https://api.siliconflow.cn/v1',
      'sk-test-key'
    );
  }
  
  getFullKey() {
    return `Bearer ${this.apiKey}`;
  }
}


beforeEach(() => {
  setCurrentModel(new MockModel());
});

describe('AI Service API', () => {
  let originalModel: Model;

  beforeAll(() => {
    originalModel = setCurrentModel();
  });

  afterAll(() => {
    setCurrentModel(originalModel);
  });

  beforeEach(() => {
    mock.reset();
  });

  it('should handle stream response correctly', async () => {
    const mockMessages = [new Message('1', '你好', MessageType.USER, new Date().toISOString())];
    const onData = vi.fn();

    // Mock fetch response
    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"你好"}}]}\n'));
            controller.close();
          }
        }),
        { status: 200, statusText: 'OK' }
      ))
    );

    await streamChatCompletion(
      mockMessages, 
      onData,
      (messageId, content) => {
        // 处理消息更新的逻辑
      },
      {}
    );

    expect(onData).toHaveBeenNthCalledWith(1, '你好');
  });

  it('should handle API errors correctly', async () => {
    const mockError = { error: { message: 'API request failed' } };
    mock.onPost(/chat\/completions/).replyOnce(500, mockError);

    await expect(getChatCompletion({
      apiUrl: 'https://api.siliconflow.cn/v1',
      prompt: 'test',
      max_tokens: 1000
    })).rejects.toThrowError('API request failed');
  });
}); 