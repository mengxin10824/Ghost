import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initAIService } from './services/aiService'
import { Model } from './model/Model'

// 应用启动时初始化默认模型
const defaultModel = new Model(
  import.meta.env.VITE_DEFAULT_MODEL_ID || "Qwen/Qwen2-1.5B-Instruct",
  'Default Model',
  '/model-icon.png',
  'https://api.siliconflow.cn/v1',
  import.meta.env.VITE_FALLBACK_API_KEY
)

// 初始化AI服务
initAIService(defaultModel)

// 创建Vue应用
const app = createApp(App)
app.mount('#app')
