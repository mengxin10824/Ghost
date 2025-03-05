import type { Message } from "./Message";
import { getNow } from "./Time";
import { generateUUID } from "./UUID";

// Tab 类型定义
export class Tab {
    // 标识
    id: string;
    name: string;

    // 是否激活
    isActive: boolean;

    // 创建时间
    createdTime: string;

    // 更新时间
    updatedTime: string;

    // 是否无痕
    isPrivate: boolean = false;

    // 所有消息
    messages: Array<Message> = [];

    constructor(id: string = generateUUID(), name: string, isActive: boolean, time: string = getNow()) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.createdTime = time;
        this.updatedTime = time;
    }

    addMessage(message: Message): void {
        this.messages.push(message);
        this.updatedTime = getNow();
    }

    getMessages(): Array<Message> {
        return this.messages;
    }

    clearMessages(): void {
        this.messages = [];
        this.updatedTime = getNow();
    }

    updateTime(): void {
        this.updatedTime = getNow();
    }
}