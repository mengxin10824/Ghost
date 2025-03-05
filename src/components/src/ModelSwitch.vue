<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Model } from "../../model/Model";
import { setCurrentModel } from "../../services/aiService";

defineProps({
  currentModel: {
    type: Model,
    required: true,
  },
  models: {
    type: Array<Model>,
    required: true,
  },
});

const emit = defineEmits(["modelChange"]);

const handleModelSelect = (model: Model) => {
  // 如果模型未设置URL或API Key，使用默认值
  if (!model.url) {
    model.url = import.meta.env.VITE_API_BASE_URL;
  }
  if (!model.apiKey) {
    model.apiKey = import.meta.env.VITE_FALLBACK_API_KEY;
  }

  // 验证API密钥和URL
  if (!model.apiKey || !model.url) {
    console.error("API Key或URL未正确设置");
    alert("请检查API Key和URL配置");
    return;
  }

  // 回传模型信息给aiService
  setCurrentModel(model);
  console.log("模型已切换至:", model.id, model.name, "API URL:", model.url); // 添加日志

  // 更新 modelSettings
  emit("modelChange", model);
};
</script>

<template>
  <div class="absolute top-[-200px] left-0 z-[1000] bg-gray-500 rounded-lg shadow-md p-2 w-[200px]">
    <div
      v-for="model in models"
      :key="model.id"
      class="flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-200 hover:text-black"
      :class="{ 'bg-gray-600 font-bold': model.id === currentModel.id }"
      @click="handleModelSelect(model)"
    >
      <img :src="model.icon" :alt="model.name" class="w-6 h-6 mr-2" />
      <span class="text-sm">{{ model.name }}</span>
    </div>
  </div>
</template>
