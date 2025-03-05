import { getNow } from "./Time";
import { generateUUID } from "./UUID";

/**
 * Prompt 
 * 
 * @param id 唯一标识
 * @param name 名字
 * @param content 提示词内容
 * @param createdTime 创建时间
 * 
 */
export class Prompt {
    id: string;
    name: string;
    content: string;
    createdTime: string;

    constructor(id: string = generateUUID(), name: string, content: string, createdTime: string = getNow()) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.createdTime = createdTime;
    }
}