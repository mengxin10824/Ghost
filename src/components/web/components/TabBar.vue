<script lang="ts" setup>
import { Tab } from "../../../model/Tab";

const props = defineProps({
  tabs: {
    type: Array<Tab>,
    required: true,
  }
})

defineEmits<{
  (event: "addTab"): void;
  (event: "activateTab", tab: Tab): void;
  (event: "deleteTab", tab: Tab): void;
}>();
</script>

<template>
  <div class="w-full bg-white flex justify-items-start gap-2 p-2 text-black overflow-x-scroll no-scrollbar">
    <!-- Tab Items -->
    <TransitionGroup name="tab">
      <div
      v-for="tab in props.tabs"
      :key="tab.id"
      @click="$emit('activateTab', tab)"
      class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl cursor-pointer transition-colors"
      :class="{ 'bg-blue-200': tab.isActive }"
    >
      <span class="font-bold text-nowrap">{{ tab.name }}</span>
      
      <!-- Delete Button -->
      <svg
        @click.stop="$emit('deleteTab', tab)"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        class="hover:bg-gray-400 rounded-full transition-colors"
      >
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </div>
    </TransitionGroup>

    <!-- Add Button -->
    <div
      class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl cursor-pointer transition-colors"
      @click="$emit('addTab')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d="M12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16Zm0-2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2Z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.tab-enter-active{
  animation: tab-animation 0.3s;
}
.tab-leave-active {
  animation: tab-animation 0.3s reverse;
}

@keyframes tab-animation {
  0% {
    opacity: 0;
    transform: translateY(+10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>