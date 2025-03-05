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
    constructor(
        public readonly id: string,
        public content: string,
        public type: MessageType,
        public timestamp: string,
        public sender: MessageType,
        public sendTime?: string,
        public attachments: { base64: string }[] = [] // 添加附件支持
    ) {}

    // 是否有附件
    attachMent: Array<File> | null = null;

    hasAttachment: boolean = false;

    isStreaming: boolean = false;
    contentBuffer: string[] = [];


    // type: MessageType;

    // constructor(id: string = generateUUID(), content: string, sender: MessageType, sendTime: string = getNow(), attachMent: Array<File> | null = null) {
    //     this.id = id;
    //     this.content = content;
    //     this.sender = sender;
    //     this.sendTime = sendTime;
    //     this.attachMent = attachMent;
    //     this.type = sender;
    // }


    hasAttachments(): boolean {
        return this.attachments.length > 0;
    }

    updateContent(newContent: string) {
        // this.contentBuffer.push(newContent);
        // this.content = this.contentBuffer.join('');
        this.content += newContent;
    }
}