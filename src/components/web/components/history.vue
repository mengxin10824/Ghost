<script lang="ts" setup>
import { ref } from "vue";
import { Tab } from "../../../model/Tab";
import SingleHistory from "./SingleHistory.vue";

defineProps<{
  histories: Tab[];
}>();

// 定义事件
defineEmits<{
  (event: "close"): void;
  (event: "newHistory"): void;
  (event: "selectHistory", item: Tab): void;
  (event: "deleteHistory", item: Tab): void;
}>();

let isEditing = ref<boolean>(false);
</script>

<template>
  <div
    class="absolute left-0 w-full pr-5 h-dvh flex flex-col gap-2 p-4 rounded-2xl bg-[#333333] -ml-2 max-w-2xs justify-start"
  >
    <div class="flex flex-col gap-5 p-5">
      <div
        class="p-1 bg-white text-black rounded-2xl text-sm w-fit"
        @click="$emit('close')"
      >
        &leftarrow; 收起
      </div>
      <img
        src="/src/icon.png"
        alt="Ghost"
        class="size-15 aspect-square rounded-full bg-amber-50"
      />
    </div>

    <!-- 历史记录列表 -->
    <div
      class="flex flex-col mx-2 gap-2 border-2 border-white rounded-2xl bg-gray-800 text-sm font-black text-black overflow-hidden grow"
    >
      <div class="p-2 w-full flex justify-between items-center bg-white">
        <span>所有历史</span>
        <!-- 添加按钮 -->
        <svg
          @click="$emit('newHistory')"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
        </svg>
      </div>

      <div class="flex flex-col gap-4 items-center justify-start p-4">
        <SingleHistory
          v-for="item in histories"
          :key="item.updatedTime"
          :historyItem="item"
          :isEditing="isEditing"
          @delete="$emit('deleteHistory', item)"
          @click="
            $emit('selectHistory', item);
            $emit('close');
          "
        />
      </div>
    </div>

    <div class="flex flex-col gap-4 p-4 items-center">
      <div
        class="flex items-center p-2 gap-5 w-fit font-black text-black rounded-xl text-sm hover:bg-blue-300 cursor-pointer"
        @click="isEditing = !isEditing"
        :class="[isEditing ? 'bg-blue-300' : 'bg-white']"
      >
        <span>{{ isEditing ? "完成编辑" : "历史编辑" }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#000"
            d="M14.7 13.3v1.4H1.3v-1.4h13.4ZM7 4.5l3 3L5.7 12h-3V9L7 4.5Zm3-2.8 3 3-2.1 2.1-3-3L10 1.7Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.history-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.history-item:hover {
  background-color: #f0f0f0;
}

.history-content {
  font-size: 14px;
  color: #333;
}

.history-time {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}
</style>
