<script setup lang="ts">
import { ref, defineEmits, defineProps, onMounted } from "vue";

const emit = defineEmits(["close", "saveSettings"]);

// 定义 props 接收当前模型设置
const props = defineProps({
  currentSettings: {
    type: Object,
    required: true,
  },
});


// 使用 ref 初始化参数
const systemPrompt = ref("");
const temperature = ref(0.7);
const maxTokens = ref(2048);
const topP = ref(0.7);
const topK = ref(50);
const frequency_penalty = ref(0.5);
const errorMessage = ref("");

// 在组件挂载时，将传入的当前设置应用到 ref 中
onMounted(() => {
  systemPrompt.value = props.currentSettings.systemPrompt || "你是一个乐于助人的AI助手";
  temperature.value = props.currentSettings.temperature || 0.7;
  maxTokens.value = props.currentSettings.maxTokens || 2048;
  topP.value = props.currentSettings.topP || 0.7;
  topK.value = props.currentSettings.topK || 50;
  frequency_penalty.value = props.currentSettings.frequency_penalty || 0.5;
  console.log("Initialized model settings:", props.currentSettings); // 添加日志
});

function validateSettings(settings: any) {
  const errors = [];
  // 根据SiliconFlow API要求验证参数
  if (settings.temperature < 0 || settings.temperature > 2) {
    errors.push("Temperature 必须在 0 到 2 之间");
  }
  if (settings.maxTokens < 1 || settings.maxTokens > 4096) {
    errors.push("Max Tokens 必须在 1 到 4096 之间");
  }
  if (settings.topP < 0 || settings.topP > 1) {
    errors.push("Top P 必须在 0 到 1 之间");
  }
  if (settings.topK < 1 || settings.topK > 100) {
    errors.push("Top K 必须在 1 到 100 之间");
  }
  if (settings.frequency_penalty < 0 || settings.frequency_penalty > 2) {
    errors.push("Frequency Penalty 必须在 0 到 2 之间");
  }
  return errors;
}

function saveSettings() {
  const settings = {
    systemPrompt: systemPrompt.value,
    maxTokens: Number(maxTokens.value),
    temperature: Number(temperature.value),
    topP: Number(topP.value),
    topK: Number(topK.value),
    frequency_penalty: Number(frequency_penalty.value),
  };

  const errors = validateSettings(settings);
  if (errors.length > 0) {
    errorMessage.value = errors.join("\n");
    return;
  }


  emit("saveSettings", settings); // 将设置传递给父组件
  emit("close"); // 关闭设置菜单
}
</script>

<template>
  <div
    class="fixed w-full h-full left-0 top-0 flex items-center justify-center backdrop-blur-sm z-99"
  >
    <div class="w-full max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-6">模型设置</h2>
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>

      <div class="space-y-8 text-gray-300">
        <div class="mb-4">
          <label class="block text-gray-300 mb-2">System Prompt</label>
          <textarea
            v-model="systemPrompt"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          >
          </textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Temperature（温度）: {{ temperature }} </label>
          <input
            type="range"
            v-model="temperature"
            min="0"
            max="2"
            step="0.1"
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2"> topP: {{ topP }} </label>
          <input
            type="range"
            v-model="topP"
            min="0.1"
            max="1"
            step="0.1"
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2"> topK: {{ topK }} </label>
          <input
            type="range"
            v-model="topK"
            min="0"
            max="100"
            step="0.1"
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2">
            Requency Penalty（频率惩罚）: {{ frequency_penalty }}
          </label>
          <input
            type="range"
            v-model="frequency_penalty"
            min="-2.0"
            max="2.0"
            step="0.1"
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-300 mb-2">最大 Tokens</label>
          <input
            type="number"
            v-model="maxTokens"
            min="1"
            max="16384"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          @click="saveSettings"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>
