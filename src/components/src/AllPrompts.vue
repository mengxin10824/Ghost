<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from "vue";
import { Prompt } from "../../model/Prompt";
import { getNow } from "../../model/Time";
import { generateUUID } from "../../model/UUID";

const emits = defineEmits<{
  (event: "selectPrompt", prompt: Prompt): void;
}>();

const allPrompts = ref<Prompt[]>([]);

const prompt: Ref<Prompt | null> = ref(null);
const showAddForm = ref(false);
const newName = ref("");
const newContent = ref("");
const hoveredPromptId = ref<string | null>(null);

// 添加新的提示词
function confirmAdd() {
  const trimmedName = newName.value.trim();
  const trimmedContent = newContent.value.trim();

  if (trimmedName && trimmedContent) {
    const newPrompt = new Prompt(
      generateUUID(),
      trimmedName,
      trimmedContent,
      getNow()
    );
    allPrompts.value.push(newPrompt);
    newName.value = "";
    newContent.value = "";
    showAddForm.value = false;
  }
}

function cancelAdd() {
  newName.value = "";
  newContent.value = "";
  showAddForm.value = false;
}

function removePrompt(promptToRemove: Prompt) {
  allPrompts.value = allPrompts.value.filter((p) => p.id !== promptToRemove.id);
}

function selectPrompt(selectedPrompt: Prompt) {
  prompt.value = selectedPrompt;
  emits("selectPrompt", selectedPrompt);
}

watch(
  allPrompts,
  () => {
    try {
      localStorage.setItem("prompts", JSON.stringify(allPrompts.value));
    } catch (error) {
      console.error("Failed to save prompts to localStorage:", error);
    }
  },
  { deep: true }
);

onMounted(() => {
  try {
    const saved = localStorage.getItem("prompts");
    if (saved) {
      allPrompts.value = JSON.parse(saved).map(
        (p: any) => new Prompt(p.id, p.name, p.content, p.createdTime)
      );
    }
  } catch (error) {
    console.error("Failed to load prompts from localStorage:", error);
    allPrompts.value = [];
  }
});
</script>

<template>
  <div
    class="absolute bottom-6/5 left-2 w-64 flex flex-col items-center gap-4 border-2 border-gray-800 bg-gray-800 p-4 text-sm font-medium rounded-2xl text-white"
  >
    <div
      v-for="(p, index) in allPrompts"
      :key="p.id"
      class="group relative flex justify-between items-center w-full p-1 hover:bg-gray-700 rounded cursor-pointer"
      :class="{ 'bg-gray-900': prompt?.id === p.id }"
      @click="selectPrompt(p)"
      @mouseenter="hoveredPromptId = p.id"
      @mouseleave="hoveredPromptId = null"
    >
      <span class="text-gray-500">{{ index + 1 }}</span>
      <span class="flex-1 mx-2 truncate">{{ p.name }}</span>
      <button
        class="text-red-300 hover:text-red-700 text-lg"
        @click.stop="removePrompt(p)"
      >
        ×
      </button>

      <!-- 悬停提示框 -->
      <div
        v-if="hoveredPromptId === p.id"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-xs min-w-[200px] max-w-[60dvw] z-50 shadow-lg"
      >
        {{ p.content }}
        <div
          class="absolute w-3 h-3 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"
        ></div>
      </div>
    </div>

    <!-- 添加提示词表单 -->
    <div v-if="showAddForm" class="w-full space-y-2">
      <input
        v-model="newName"
        placeholder="提示词名称"
        class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none"
      />
      <textarea
        v-model="newContent"
        placeholder="提示词内容"
        class="w-full p-2 rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none resize-none no-scrollbar"
      />
      <div class="flex gap-2">
        <button
          class="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          @click="confirmAdd"
        >
          确认
        </button>
        <button
          class="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          @click="cancelAdd"
        >
          取消
        </button>
      </div>
    </div>

    <button
      v-else
      class="w-full p-2 mt-2 text-white hover:bg-gray-700 rounded-lg border-gray-800"
      @click.stop="showAddForm = true"
    >
      + 添加提示词
    </button>
  </div>
</template>
