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
    // id: string;

    // name: string;
    
    // /**
    //  * 模型图片地址，在对话框显示 Icon
    //  */
    // img: string;

    // url: string;
    // /**
    //  * 模型API密钥，没有 Bearer 的字符串
    //  */
    // apiKey: string;

    // constructor(id: string, name: string, img: string, url: string, apiKey: string) {
    //     this.id = id;
    //     this.name = name;
    //     this.img = img;
    //     this.url = url;
    //     this.apiKey = apiKey;
    constructor(
        public readonly id: string= generateUUID(),
        public name: string,
        public icon: string,     // 图标路径
        public url: string = import.meta.env.VITE_API_BASE_URL,  // 默认使用环境变量
        public apiKey: string = import.meta.env.VITE_FALLBACK_API_KEY,
        public supportsAttach: boolean = false, // 新增属性，表示是否支持附件上传
        public settings: any = {} // 添加 settings 属性
    ) {}


    public getFullKey(): string {
        return "Bearer " + this.apiKey;
    }
}


