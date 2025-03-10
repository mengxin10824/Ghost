import { generateUUID } from "./UUID";
/**
 * 模型 ModelSwitch 中每个模型
 * 
 * @param id 唯一标识
 * @param name 模型名称
 * @param url 模型地址
 * @param apiKey 模型API密钥
 * 
 */
export class Model {
    constructor(
        public readonly id: string = generateUUID(),
        public name: string,
        public icon: string,     // 图标路径
        public url: string = import.meta.env.VITE_API_BASE_URL,  // 默认使用环境变量
        public apiKey: string = import.meta.env.VITE_FALLBACK_API_KEY,
        public supportsAttach: boolean = false, // 是否支持附件上传
        public settings: any = {} // 添加 settings 属性
    ) {}


    public getFullKey(): string {
        return "Bearer " + this.apiKey;
    }
}



