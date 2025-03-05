import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DialogBox from '../src/components/src/dialogBox.vue';
import { Message, MessageType } from '../src/model/Message';
import { Model } from '../src/model/Model';

// 模拟 Model
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
}

describe('DialogBox.vue', () => {
  it('渲染用户消息', () => {
    const messages = [
      new Message('1', '你好', MessageType.USER, new Date().toISOString()),
    ];
    const wrapper = mount(DialogBox, {
      props: {
        messages,
        model: new MockModel(),
        userImg: 'https://example.com/user.png',
      },
    });

    // 验证用户消息是否正确渲染
    const userMessage = wrapper.find('.bg-gray-800');
    expect(userMessage.text()).toBe('你好');
  });

  it('渲染AI消息', () => {
    const messages = [
      new Message('1', '你好，我是AI', MessageType.BOT, new Date().toISOString()),
    ];
    const wrapper = mount(DialogBox, {
      props: {
        messages,
        model: new MockModel(),
        userImg: 'https://example.com/user.png',
      },
    });

    // 验证AI消息是否正确渲染
    const aiMessage = wrapper.find('.bg-gray-800');
    expect(aiMessage.text()).toBe('你好，我是AI');
  });

  it('处理发送消息', async () => {
    const wrapper = mount(DialogBox, {
      props: {
        messages: [],
        model: new MockModel(),
        userImg: 'https://example.com/user.png',
      },
    });

    // 模拟 handleSend 方法
    await wrapper.vm.handleSend('测试消息');

    // 验证消息是否被添加到 messages 中
    expect(wrapper.vm.messages.length).toBe(2);
    expect(wrapper.vm.messages[0].content).toBe('测试消息');
    expect(wrapper.vm.messages[1].sender).toBe(MessageType.BOT);
  });

  it('处理流式响应', async () => {
    const wrapper = mount(DialogBox, {
      props: {
        messages: [],
        model: new MockModel(),
        userImg: 'https://example.com/user.png',
      },
    });

    // 模拟 streamChatCompletion
    vi.spyOn(wrapper.vm as any, 'handleStreamResponse').mockImplementation((chunk: unknown, onData: unknown) => {
      (onData as (content: string) => void)('流式响应内容');
    });

    // 模拟发送消息
    await wrapper.vm.handleSend('测试消息');

    // 验证流式响应是否正确处理
    expect(wrapper.vm.messages[1].content).toBe('流式响应内容');
  });
}); 