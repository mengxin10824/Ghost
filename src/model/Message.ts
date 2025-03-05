import { getNow } from "./Time";
import { generateUUID } from "./UUID";
/**
 * 消息模型 Dialog组件的每条对话的数据结构
 * 
 * @param id 消息唯一标识
 * @param content 消息内容
 * @param sender 发送者
 * @param receiver 接收者
 * @param sendTime 发送时间
 * 
 */

export enum MessageType {
    USER = "USER",
    BOT = "BOT",
    SYSTEM = "SYSTEM"
}

export class Message {
    // 唯一标识
    id: string;
    content: string;

    // 发送者
    sender: MessageType;

    // 发送时间
    sendTime: string;
    
    // 是否有附件
    attachMent: Array<File> | null = null;

    hasAttachment: boolean = false;

    isStreaming: boolean = false;
    contentBuffer: string[] = [];

    type: MessageType;

    constructor(id: string, content: string, sender: MessageType, sendTime: string, attachMent: Array<File> | null = null) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.sendTime = sendTime;
        this.attachMent = attachMent;
        this.type = sender;
    }

    hasAttachments(): boolean {
        return this.attachMent !== null && this.attachMent.length > 0;
    }

    updateContent(newContent: string) {
        // this.contentBuffer.push(newContent);
        // this.content = this.contentBuffer.join('');
        this.content += newContent;
    }
}