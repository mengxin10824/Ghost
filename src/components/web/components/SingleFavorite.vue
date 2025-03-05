<script lang="ts" setup>
import { Message } from '../../../model/Message';

defineProps({
  favorite: {
    type: Message,
    required: true
  },
  favoriteIndex: {
    type: Number,
    required: true
  }
});

defineEmits<{
  (event: "delete", message: Message): void;
}>();

const copyToClipboard = (message: Message) => {
  const words = message.content
  navigator.clipboard
    .writeText(words)
    .then(() => {
      alert("复制成功");
    })
    .catch(() => {
      alert("复制失败，请检查浏览器设置");
    });
};
</script>
<template>
  <div
    class="flex-col text-black rounded-xl text-sm w-full flex justify-between bg-white hover:bg-blue-300"
    @click="copyToClipboard(favorite)"
  >
    <div
      class="p-2 text-black rounded-xl text-sm w-full flex justify-between items-center"
    >
      <span> 历史记录 {{ favoriteIndex + 1 }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        @click.stop="$emit('delete', favorite)"
      >
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </div>
    <div class="p-2 border-t-2 border-black overflow-hidden line-clamp-5">
      {{ favorite.content }}
    </div>
  </div>
</template>

