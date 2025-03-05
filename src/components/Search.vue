<script lang="ts" setup>
import type { Message } from '../model/Message';


defineEmits<{
  (e: 'openInline', message: Message): void;
}>();

function quickTranslate() {

}

function openChat() {

}
</script>
<template>
  <div
    class="group w-fit flex gap-2 text-white p-2 bg-black border-2 rounded-2xl border-gray-800 relative items-center"
  >
    <!-- Logo -->
    <img src="../icon.png" alt="Ghost" class="size-9 aspect-square rounded-full"/>

    <!-- Search -->
    <div class="rounded-xl bg-gray-800 p-2 relative flex gap-2 items-center">
      <input
        type="text"
        class="bg-transparent outline-none w-full placeholder:pr"
        placeholder="Search..."
      />

      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            fill="#C4C4C4"
            fill-rule="evenodd"
            d="M8.78 8.25h.6L13.12 12 12 13.12 8.25 9.38v-.6l-.2-.2A4.85 4.85 0 0 1 0 5.1a4.87 4.87 0 1 1 8.56 2.94l.21.2ZM1.5 4.87a3.37 3.37 0 1 0 6.74.01 3.37 3.37 0 0 0-6.74 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Right Menu -->
    <div class="absolute top-full right-2 w-2/3 hidden group-hover:block pt-2">
        <div
      class="flex-col border-2 rounded-2xl border-gray-800 overflow-hidden flex"
    >
      <div
        class="flex items-center justify-between p-2 text-gray-400 not-first:border-t-2 border-gray-800 hover:bg-gray-600"
        @click="openChat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 15 15"
        >
          <mask
            id="a"
            width="15"
            height="15"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style="mask-type: luminance"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M0 0h15v15H0V0Z"
              clip-rule="evenodd"
            />
          </mask>
          <g mask="url(#a)">
            <path
              fill="#fff"
              fill-rule="evenodd"
              d="M8.72 1H14v5.28l-2.03-2.03-2.44 2.44-1.22-1.22 2.44-2.44L8.72 1ZM14 8.72V14H8.72l2.03-2.03-2.44-2.44 1.22-1.22 2.44 2.44L14 8.72ZM1 14h5.28l-2.03-2.03 2.44-2.44-1.22-1.22-2.44 2.44L1 8.72V14Zm0-7.72V1h5.28L4.25 3.03l2.44 2.44-1.22 1.22-2.44-2.44L1 6.28Z"
              clip-rule="evenodd"
            />
          </g>
        </svg>
        <span class="text-sm">打开聊天窗口</span>
      </div>

      <div
        class="flex items-center justify-between p-2 text-gray-400 not-first:border-t-2 border-gray-800 hover:bg-gray-600"
        @click="quickTranslate"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 15 15"
        >
          <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
            <path
              d="m3.9 7.5.4-1.2H6l.4 1.2h1.1L5.8 2.8H4.6L2.8 7.5h1Zm1.3-3.8.6 1.9H4.5L5 3.7Z"
            />
            <path
              d="M0 1.9A1.9 1.9 0 0 1 1.9 0h6.5a1.9 1.9 0 0 1 2 1.9v2.8H13a1.9 1.9 0 0 1 2 1.9V13a1.9 1.9 0 0 1-1.9 1.9H6.6a1.9 1.9 0 0 1-2-1.9v-2.8H2a1.9 1.9 0 0 1-2-1.8V2Zm1.9-1a1 1 0 0 0-1 1v6.5a1 1 0 0 0 1 1h6.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2Zm7.3 10.2a7 7 0 0 1-.6-.8 1.9 1.9 0 0 0 .8-.3l.4.5c.5-.6 1-1.2 1.2-2h-.7v-1h2.8v1H12c-.4 1-.9 1.9-1.5 2.6a7 7 0 0 0 2.6 1.2l-.6.8c-1-.3-2-.8-2.7-1.4-.8.6-1.7 1-2.7 1.4l-.5-.8a9 9 0 0 0 2.6-1.2Z"
            />
          </g>
        </svg>
        <span class="text-sm">快捷翻译</span>
      </div>
      <div
        class="flex items-center justify-between p-2 text-gray-400 not-first:border-t-2 border-gray-800 hover:bg-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          fill="none"
          viewBox="0 0 15 15"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M1.9 5.6a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm11.2 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm-5.4 0a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-sm">更多设置</span>
      </div>
    </div>
    </div>
  </div>
</template>
