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
  <div class="model-switch-container">
    <div
      v-for="model in models"
      :key="model.id"
      class="model-item"
      :class="{ 'active-model': model.id === currentModel.id }"
      @click="handleModelSelect(model)"
    >
      <img :src="model.icon" :alt="model.name" class="model-icon" />
      <span class="model-name">{{ model.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.model-switch-container {
  position: absolute;
  top: -200px; /* 根据实际菜单高度调整 */
  left: 0;
  z-index: 1000; /* 确保菜单浮于其他元素上方 */
  background: rgb(97, 97, 97);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 200px; /* 根据实际需求调整 */
}

.model-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.model-item:hover {
  background-color: #f0f0f0;
  color: #000;
}

.active-model {
  background-color: #656565;
  font-weight: bold;
}

.model-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.model-name {
  font-size: 14px;
}
</style>
