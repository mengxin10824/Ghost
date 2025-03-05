<script setup lang="ts">
import Web from "./components/web/Web.vue";
import Search from "./components/Search.vue";
import Inline from "./components/Inline.vue";
import { ref, type Ref } from "vue";

let isShow = ref(false);
let inlineRef: Ref<InstanceType<typeof Inline> | null> = ref(null);

function openInline(message?: string) {
  isShow.value = true;
  if (message) {
    inlineRef.value?.inputRef?.initMessage(message);
  }
}
function closeInline() {
  isShow.value = false
}
</script>

<template>
  <div
    class="bg-[#0b0b0b] w-vw h-dvh flex justify-center items-center relative"
  >
    <Search v-show="!isShow" @openInline="openInline" />
    <div class="absolute right-10">
      <Transition name="inline">
        <Inline v-show="isShow" @close="closeInline" ref="inlineRef" />
      </Transition>
    </div>
  </div>
  <div class="bg-black w-vw h-dvh flex flex-col justify-center items-center">
    <Web />
  </div>
</template>

<style lang="css" scoped>
.inline-enter-active {
  animation: inline-animation 0.2s both;
}
.inline-leave-active {
  animation: inline-animation 0.2s both reverse;
}

@keyframes inline-animation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
