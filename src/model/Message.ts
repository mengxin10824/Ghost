/**
 * 消息模型 Dialog组件的每条对话的数据结构
 * 
 * @param id 消息唯一标识
 * @param content 消息内容
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
        public sender: MessageType,
        public sendTime?: string,
        public attachments: { base64: string }[] = [] // 添加附件支持
    ) {}

    // 是否有附件
    attachMent: Array<File> | null = null;

    hasAttachment: boolean = false;

    isStreaming: boolean = false;
    contentBuffer: string[] = [];


    hasAttachments(): boolean {
        return this.attachments.length > 0;
    }

    updateContent(newContent: string) {
        this.content += newContent;
    }
}