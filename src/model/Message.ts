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
        public attachments: { base64: string, mimeType: string, id: string }[] = [] // 添加图片ID支持
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

    // 新增方法：生成图片的HTML标签
    getImageHtml(): string {
        if (this.attachments.length === 0) return '';
        return this.attachments.map(attachment => {
            return `<img src="data:${attachment.mimeType};base64,${attachment.base64}" alt="Uploaded Image" style="max-width: 100%; height: auto;" />`;
        }).join('');
    }
}