/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEFAULT_MODEL_ID: string
    readonly VITE_FALLBACK_API_KEY: string
    readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
