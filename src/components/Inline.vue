<script setup lang="ts">
import InputBox from "./src/inputBox.vue";
import { Message } from "../model/Message";
import { Model } from "../model/Model";
import { ref } from "vue";

const messages = ref<Message[]>([]);
const model = new Model(
  undefined,
  "Bot",
  "/src/icon.png",
  "Qwen/Qwen2-1.5B-Instruct",
  import.meta.env.VITE_FALLBACK_API_KEY
);


// function deleteMessage(message: Message) {
//   const index = messages.value.indexOf(message);
//   if (index >= 0) {
//     messages.value.splice(index, 1);
//   }
// }

const sendMessage = (message: Message) => {
  messages.value.push(message);
};

const receiveMessage = (message: Message) => {
  messages.value.push(message);
};

const updateMessage = (messageId: string, content: string) => {
  const message = messages.value.find((msg) => msg.id === messageId);
  if (message) {
    message.content += content;
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-black text-white rounded-2xl w-150 h-[80dvh] border-2 border-gray-800 p-4 gap-4"
  >
    <div class="flex justify-between p-2 items-start">
      <!-- 关闭 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <mask
          id="a"
          width="16"
          height="16"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style="mask-type: luminance"
        >
          <path fill="#fff" fill-rule="evenodd" d="M0 0h16v16H0V0Z" clip-rule="evenodd" />
        </mask>
        <g mask="url(#a)">
          <path
            fill="#969696"
            d="M.8 17-1 15.2 6.2 8-1 .8.8-1 8 6.2 15.2-1 17 .8 9.8 8l7.2 7.2-1.8 1.8L8 9.8.8 17Z"
          />
        </g>
      </svg>

      <!-- Icon -->
      <div class="flex flex-col gap-2 items-center">
        <img alt="Ghost AI" :src="model.icon" class="size-9 aspect-square rounded-full bg-amber-50" />
        <span>Ghost</span>
      </div>

      <!-- 放大 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          fill="#969696"
          fill-rule="evenodd"
          d="M10.7 0H18v7.3l-2.8-2.8-3.4 3.4-1.7-1.7 3.4-3.4L10.7 0ZM18 10.7V18h-7.3l2.8-2.8-3.4-3.4 1.7-1.7 3.4 3.4 2.8-2.8ZM0 18h7.3l-2.8-2.8 3.4-3.4-1.7-1.7-3.4 3.4L0 10.7V18ZM0 7.3V0h7.3L4.5 2.8l3.4 3.4-1.7 1.7-3.4-3.4L0 7.3Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- dialog -->

    <InputBox
      :isToolBar="false"
      @sendMessage="sendMessage"
      @updateMessage="updateMessage"
      @receiveMessage="receiveMessage"
    />
  </div>
</template>
