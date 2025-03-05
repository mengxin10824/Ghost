<script lang="ts" setup>
import { Message } from "../../../model/Message";
import SingleFavorite from "./SingleFavorite.vue";

defineProps<{
  favorites: Message[];
}>();

defineEmits<{
  (e: "close"): void;
  (e: "addFavorite", newFavorite: Message): void;
  (e: "deleteFavorite", favorite: Message): void;
}>();
</script>

<template>
  <div
    class="absolute right-0 w-full pr-5 h-dvh flex flex-col gap-2 p-4 rounded-2xl bg-[#333333] -mr-2 max-w-2xs"
  >
    <div class="flex flex-col gap-5 p-5 items-end">
      <div
        class="p-1 bg-white text-black rounded-2xl text-sm w-fit"
        @click="$emit('close')"
      >
        收起 &rightarrow;
      </div>
    </div>
    <div
      class="flex flex-col mx-2 gap-2 border-2 border-white rounded-2xl bg-gray-800 text-sm font-black text-black overflow-hidden grow"
    >
      <!-- Toolbar -->
      <div class="p-2 w-full flex justify-between items-center bg-white">
        <span>所有收藏</span>
      </div>
      <!-- 收藏记录 -->
      <div class="flex flex-col gap-4 justify-start p-4">
        <SingleFavorite
          v-for="(favorite, index) in favorites"
          :key="favorite.id"
          :favoriteIndex="index"
          :favorite="favorite"
          @delete="$emit('deleteFavorite', favorite)"
        />
      </div>
    </div>
  </div>
</template>
