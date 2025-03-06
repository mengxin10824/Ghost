<script lang="ts" setup>
import ModelSetting from "./ModelSetting.vue";
import ModelSwicth from "./ModelSwitch.vue";
import AllPrompts from "./AllPrompts.vue";

import { defineProps, defineEmits, ref } from "vue";
import { Message, MessageType } from "../../model/Message";
import { Prompt } from "../../model/Prompt";
import {
  streamChatCompletion,
  setCurrentModel,
} from "../../services/aiService";
import { getNow } from "../../model/Time";
import { generateUUID } from "../../model/UUID";
import { Model } from "../../model/Model";
import { Tab } from "../../model/Tab";

let props = defineProps({
  isToolBar: {
    // 是否显示工具栏
    type: Boolean,
    required: false,
    default: true,
  },
  activeTab: {
    type: Tab
  }
});

const emit = defineEmits<{
  (event: "sendMessage", content: Message): void;
  (event: "receiveMessage", content: Message): void;
  (event: "updateMessage", messageId: string, content: string): void;
  (event: "update:allowAttach", allowAttach: boolean): void;
  (event: "turnOnSafetyMode"): void;
}>();

let prompt = ref(false);
let modelSwitch = ref(false);
let modelSetting = ref(false);
let safetyMode = ref(false);
let inputContent = ref("");

function initMessage(messageString: string) {
  inputContent.value = messageString;
  handleSend();
}

defineExpose({
  initMessage,
});

const modelSettings = ref({
  systemPrompt: "",
  maxTokens: 2048,
  temperature: 0.7,
  topP: 0.7,
  topK: 50,
  frequency_penalty: 0.5,
});

const supportedModels = [
  new Model(
    "deepseek-ai/DeepSeek-V3",
    "DeepSeek-V3",
    "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/Model_LOGO/DP-%20ST-Logo.svg",
    "https://api.siliconflow.cn/v1",
    import.meta.env.VITE_FALLBACK_API_KEY,
    false
  ),
  new Model(
    "Qwen/Qwen2.5-72B-Instruct",
    "Qwen2.5-72B-Instruct",
    "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/Model_LOGO/Tongyi.svg",
    "https://api.siliconflow.cn/v1",
    import.meta.env.VITE_FALLBACK_API_KEY,
    false
  ),
  new Model(
    "Qwen/Qwen2-VL-72B-Instruct",
    "Qwen2-VL-72B-Instruct",
    "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/Model_LOGO/Tongyi.svg",
    "https://api.siliconflow.cn/v1",
    import.meta.env.VITE_FALLBACK_API_KEY,
    true
  ),
  new Model(
    "THUDM/glm-4-9b-chat",
    "GLM-4-9B-Chat",
    "https://sf-maas-uat-prod.oss-cn-shanghai.aliyuncs.com/Model_LOGO/Zhipu.svg",
    "https://api.siliconflow.cn/v1",
    import.meta.env.VITE_FALLBACK_API_KEY,
    false
  ),
];

const currentModel = ref(
  new Model(
    generateUUID(),
    "Qwen/Qwen2-1.5B-Instruct",
    "https://example.com/qwen-icon.png",
    "https://api.siliconflow.cn/v1",
    import.meta.env.VITE_FALLBACK_API_KEY,
    false
  )
);

function selectPrompt(prompt: Prompt) {
  inputContent.value = prompt.content + "\n" + inputContent.value;
}

const handleSend = async () => {
  if (!inputContent.value.trim()) return;

  const message = new Message(
    generateUUID(),
    inputContent.value,
    MessageType.USER,
    getNow(),
    [{base64: attachMent.value}]
  );

  inputContent.value = "";

  // 触发父组件的发送事件
  emit("sendMessage", message);

  // 添加上下文

  const updatedContext: Message[] = [
    ...(props.activeTab?.modelContext.getContext() ?? []),
    message,
  ];

  props.activeTab?.modelContext.addMessage(message);

  // 调用 AI 接口
  try {
    await streamChatCompletion(
      updatedContext,
      modelSettings.value.systemPrompt,
      (newMessage) => {
        // 新建消息对象，并设置类型为 BOT
        newMessage.sender = MessageType.BOT;
        emit("receiveMessage", newMessage);
      },
      (messageId, content) => {
        // 更新消息内容
        emit("updateMessage", messageId, content);
      },
      (messageId, _) => {
        const message = props.activeTab?.messages.find(
          (msg) => msg.id === messageId
        );
        if (message) {
          // 添加上下文
          props.activeTab?.modelContext.addMessage(message);
        }
      },
      modelSettings.value
    );
    console.log("streamChatCompletion completed.", message);
  } catch (error) {
    console.error("Error sending message:", error);
    alert("API 调用失败，请检查 API Key 和网络连接");
  }
};

const handleSaveSettings = (settings: any) => {
  modelSettings.value = {
    ...settings,
    maxTokens: Number(settings.maxTokens), // 转换为数字
    temperature: Number(settings.temperature), // 转换为数字
    topP: Number(settings.topP), // 转换为数字
    topK: Number(settings.topK), // 转换为数字
    frequency_penalty: Number(settings.frequency_penalty), // 转换为数字
  };

  const selectedModelObj = supportedModels.find((m) => m.id === settings.model);
  if (selectedModelObj) {
    setCurrentModel(selectedModelObj);
  }
  console.log("Model settings updated:", modelSettings.value); // 打印日志
};

const handleModelChange = (model: Model) => {
  setCurrentModel(model);
  currentModel.value = model;
  console.log("Model changed to:", model.name); // 添加日志
  // 根据模型是否支持附件上传，更新 allowAttach
  const supportsAttach =
    supportedModels.find((m) => m.id === model.id)?.supportsAttach || false;
  emit("update:allowAttach", supportsAttach);
};

// 上传文件处理函数
let attachMent = ref<string>("");

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;

      attachMent.value = base64.split(",")[1];
    }
    reader.readAsDataURL(file);
  }
 
}


const handleAttachClick = () => {
  if (currentModel.value.supportsAttach) {
    const fileInput = document.getElementById('inputAttach') as HTMLInputElement;
    fileInput.click();
  }
};
</script>

<template>
  <div class="relative">
    <ModelSwicth
      v-if="modelSwitch"
      :currentModel="currentModel"
      :models="supportedModels"
      @modelChange="handleModelChange"
      class="model-switch-menu"
    />
    <!-- Input Box -->
    <div class="w-full flex flex-col gap-2 p-2">
      <!-- Quick Menu -->

      <div
        class="w-full flex item-center justify-start gap-2"
        v-if="props.isToolBar"
      >
        <!-- Command -->
         <div class="relative">
          <div
            class="flex items-center relative w-fit gap-2 bg-white hover:bg-blue-300 rounded-full p-2 shadow-2xl cursor-pointer text-black px-4"
            @click="prompt = !prompt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.333"
                d="m5 6.667 1.667 1.666L5 10m3 0h2.666M4 3.333h8a1.331 1.331 0 0 1 1.333 1.334v6.666a1.356 1.356 0 0 1-.157.629 1.326 1.326 0 0 1-.79.647 1.322 1.322 0 0 1-.386.058H4a1.326 1.326 0 0 1-1.03-.488 1.34 1.34 0 0 1-.304-.846V4.667A1.333 1.333 0 0 1 4 3.333Z"
              />
            </svg>
            <span class="text-sm font-black hidden md:block text-nowrap">
              提示词
            </span>
          </div>
          <AllPrompts v-if="prompt" @selectPrompt="selectPrompt" />
        </div>
        <div
          class="flex items-center w-fit gap-2  hover:bg-blue-300 rounded-full p-2 shadow-2xl cursor-pointer text-black px-4"
          @click="
            $emit('turnOnSafetyMode');
          "
          :class="[safetyMode ? 'bg-blue-300' :'bg-white']"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#000"
              d="M7.33 11.33h1.34v-4H7.33v4ZM8 6c.19 0 .35-.06.48-.2a.65.65 0 0 0 .19-.47.65.65 0 0 0-.2-.47.64.64 0 0 0-.47-.2.64.64 0 0 0-.47.2.65.65 0 0 0-.2.47c0 .2.07.35.2.48.12.13.28.2.47.19Zm0 8.67A6.64 6.64 0 0 1 4.17 12a7.65 7.65 0 0 1-1.5-4.61V3.33l5.33-2 5.33 2V7.4c0 1.69-.5 3.23-1.5 4.6A6.64 6.64 0 0 1 8 14.68Zm0-1.4a5.43 5.43 0 0 0 2.87-2.2A6.33 6.33 0 0 0 12 7.4V4.25l-4-1.5-4 1.5V7.4c0 1.34.38 2.57 1.13 3.67A5.43 5.43 0 0 0 8 13.27Z"
            />
          </svg>
          <span class="text-sm font-black hidden md:block text-nowrap">
            无痕模式
          </span>
        </div>
        <!-- Command -->
        <div class="relative">
          <div
            class="flex items-center w-fit gap-2 bg-white hover:bg-blue-300 rounded-full p-2 shadow-2xl cursor-pointer text-black px-4"
            @click="modelSwitch = !modelSwitch"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                fill="#000"
                d="M11 8a3 3 0 0 1 1.13 5.78 2.95 2.95 0 0 1-.99.22H5a3.05 3.05 0 0 1-2.2-.96 2.96 2.96 0 0 1-.78-2.4 2.97 2.97 0 0 1 1.99-2.47A3.03 3.03 0 0 1 4.86 8H11Zm0 1.33H5a1.67 1.67 0 0 0-.1 3.33H11a1.68 1.68 0 0 0 1.63-1.29 1.66 1.66 0 0 0-1.05-1.93 1.65 1.65 0 0 0-.47-.1H11ZM5 10a1 1 0 0 1 .7 1.7 1 1 0 0 1-1.33.07 1 1 0 0 1-.25-1.24 1.02 1.02 0 0 1 .5-.45A.98.98 0 0 1 5 10Zm6-8.67a3 3 0 0 1 .14 6H5A2.98 2.98 0 0 1 2.02 4.7a3 3 0 0 1 2.84-3.35H11Zm0 1.34H5A1.67 1.67 0 0 0 4.9 6H11a1.66 1.66 0 0 0 1.34-2.66 1.66 1.66 0 0 0-1.23-.67H11Zm0 .66a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
              />
            </svg>
            <span class="text-sm font-black hidden md:block text-nowrap"
              >模型切换</span
            >
          </div>
        </div>
        <!-- Command -->
        <div
          class="flex items-center w-fit gap-2 bg-white hover:bg-blue-300 rounded-full p-2 shadow-2xl cursor-pointer text-black px-4"
          @click="modelSetting = !modelSetting"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#000"
              d="M8 1a3.34 3.34 0 1 0 0 6.68A3.34 3.34 0 0 0 8 1Zm0 7.33c-1.6 0-3.05.47-4.12 1.12-.53.32-.99.7-1.32 1.12-.32.41-.56.9-.56 1.43 0 .56.27 1 .67 1.32.37.3.86.5 1.39.64 1.05.28 2.45.37 3.94.37h.46a.68.68 0 0 0 .45-.19.69.69 0 0 0 .17-.27.66.66 0 0 0-.03-.5 3.99 3.99 0 0 1 .35-4.03.66.66 0 0 0 .01-.58.67.67 0 0 0-.53-.38A8.14 8.14 0 0 0 8 8.33Zm6.41 1.65a.67.67 0 0 0-.36-.97.67.67 0 0 0-.8.3l-.22.4a1.98 1.98 0 0 0-.73-.01l-.22-.39a.66.66 0 0 0-.8-.3.66.66 0 0 0-.38.34.66.66 0 0 0 .02.63l.23.39c-.16.18-.29.4-.37.63h-.45a.67.67 0 0 0 0 1.33h.45c.08.24.2.45.37.64l-.23.38a.67.67 0 0 0 .14.84.67.67 0 0 0 1.02-.17l.22-.39c.24.05.49.05.73 0l.23.4a.66.66 0 0 0 .79.3.66.66 0 0 0 .42-.86.67.67 0 0 0-.06-.12l-.22-.38a2 2 0 0 0 .36-.64H15a.66.66 0 0 0 .62-.4A.67.67 0 0 0 15 11h-.45c-.08-.23-.2-.44-.36-.63l.22-.4Z"
            />
          </svg>
          <span class="text-sm font-black hidden md:block text-nowrap">参数设置</span>
        </div>
        <!-- 上传附件按钮 -->
        <div
          class="flex items-center w-fit gap-2 bg-white hover:bg-blue-300 rounded-full p-2 shadow-2xl cursor-pointer text-black px-4"
          :class="{ 'cursor-not-allowed opacity-50': !currentModel.supportsAttach }"
          :title="currentModel.supportsAttach ? '上传附件' : '当前模型不支持上传附件'"
          @click="handleAttachClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              fill="#000"
              d="M10.62 3.492a4.89 4.89 0 0 1 1.588-1.098 4.85 4.85 0 0 1 5.376 1.054c.458.463.82 1.013 1.067 1.619a4.99 4.99 0 0 1-.025 3.813 4.946 4.946 0 0 1-1.087 1.604l-7.611 7.691a2.935 2.935 0 0 1-2.08.886 2.91 2.91 0 0 1-2.09-.868 2.969 2.969 0 0 1-.86-2.11 2.992 2.992 0 0 1 .877-2.102l7.613-7.691 1.384 1.398-7.613 7.69a.989.989 0 0 0-.298.703.998.998 0 0 0 .286.708.977.977 0 0 0 1.078.21.98.98 0 0 0 .318-.222l7.613-7.69a2.97 2.97 0 0 0 .86-2.099 2.995 2.995 0 0 0-.86-2.097 2.933 2.933 0 0 0-2.076-.87 2.91 2.91 0 0 0-2.076.87l-7.612 7.691a4.972 4.972 0 0 0-1.374 3.478 4.97 4.97 0 0 0 1.433 3.453 4.869 4.869 0 0 0 3.418 1.448 4.867 4.867 0 0 0 3.442-1.388l8.305-8.39 1.384 1.4-8.304 8.39A6.816 6.816 0 0 1 7.85 23c-1.817 0-3.56-.73-4.844-2.027A6.958 6.958 0 0 1 1 16.078a6.96 6.96 0 0 1 2.007-4.895l7.613-7.69Z"
            />
          </svg>
          <span class="text-sm font-black hidden md:block text-nowrap">上传附件</span>
        </div>
        <input
          type="file"
          name="inputAttach"
          id="inputAttach"
          class="hidden"
          :disabled="!currentModel.supportsAttach"
          @change="handleFileUpload"
        />
      </div>

      <div
        class="w-full my-2 min-h-20 rounded-xl text-white border-2 border-gray-700 border-solid bg-gray-800 overflow-hidden relative"
      >
        <!-- Textarea -->
        <textarea
          v-model="inputContent"
          class="h-full w-full p-2 outline-0 resize-none no-scrollbar"
          placeholder="Type your message here..."
          @keyup.enter="handleSend"
        ></textarea>
        <div class="absolute bottom-2 right-2 flex items-center gap-4 no-scrollbar">
          <!-- Send Button -->
          <button @click="handleSend" class="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="21"
              fill="none"
              viewBox="0 0 19 21"
            >
              <path
                fill="gray"
                d="M18.12 8.618 2.487.207C1.175-.502-.345.725.07 2.158l2.14 7.497c.087.31.087.621 0 .932L.07 18.084c-.415 1.433 1.105 2.66 2.418 1.951l15.631-8.411a1.693 1.693 0 0 0 0-2.971v-.035Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pop -->
    <ModelSetting
      v-if="modelSetting"
      @close="modelSetting = !modelSetting"
      @saveSettings="handleSaveSettings"
      :currentSettings="modelSettings"
    />
  </div>
</template>

<style scoped>
.model-switch-menu {
  position: absolute;
  top: -210px; /* 根据实际菜单高度调整 */
  left: 190px;
  z-index: 1000; /* 确保菜单浮于其他元素上方 */
  background: rgb(51, 51, 51);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 200px; /* 根据实际需求调整 */
}
</style>
