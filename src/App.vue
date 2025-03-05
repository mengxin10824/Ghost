<script setup lang="ts">
import Web from "./components/web/Web.vue";
import Search from "./components/Search.vue";
import Inline from "./components/Inline.vue";
import { ref } from "vue"

let isShowSearch = ref(true);
let isShowInline = ref(true);
</script>

<template>
  <div
    class="bg-[#0b0b0b] w-vw h-dvh flex justify-center items-center relative"
  >
    <div class="absolute right-10 top-10">
      <Search
      v-if="isShowSearch"
       
      />
    </div>
    <Inline v-if="isShowInline"/>
    
  </div>
  <div class="bg-black w-vw h-dvh flex flex-col justify-center items-center">
    <Web />
  </div>
</template>
