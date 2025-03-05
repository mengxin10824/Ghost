<script setup lang="ts">
import InputBox from "./src/inputBox.vue";
import { Message, MessageType } from "../model/Message";
import { Model } from "../model/Model";
import { ref, type Ref } from "vue";
import MarkdownIt from "markdown-it";

const messages = ref<Message[]>([]);
const model = new Model(
  undefined,
  "Bot",
  "/src/icon.png",
  "Qwen/Qwen2-1.5B-Instruct",
  import.meta.env.VITE_FALLBACK_API_KEY
);

function deleteMessage(message: Message) {
  const index = messages.value.indexOf(message);
  if (index >= 0) {
    messages.value.splice(index, 1);
  }
}

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

const md = new MarkdownIt();
const splitContent = (content: string) => {
  const parts = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g; // 匹配代码块及其语言
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // 添加普通文本部分
    if (match.index > lastIndex) {
      parts.push({
        isCode: false,
        content: content.slice(lastIndex, match.index),
      });
    }
    // 添加代码块部分
    const codeContent = match[2].trim(); // 去除代码块标记
    const lines = codeContent.split("\n");
    const minIndent = Math.min(
      ...lines
        .filter((line) => line.trim()) // 过滤掉空行
        .map((line) => line.match(/^\s*/)?.[0].length || 0) // 计算每行的缩进
    );
    const normalizedContent = lines
      .map((line, index) =>
        index === 0 ? line.trimStart() : line.slice(minIndent)
      ) // 第一行去除所有前导空格，其他行去除公共缩进
      .join("\n"); // 重新组合为字符串

    parts.push({
      isCode: true,
      language: match[1] || "text", // 提取语言名称，默认为 "text"
      content: normalizedContent, // 去除多余缩进后的代码内容
    });
    lastIndex = match.index + match[0].length;
  }
  // 添加剩余的普通文本部分
  if (lastIndex < content.length) {
    parts.push({
      isCode: false,
      content: content.slice(lastIndex),
    });
  }
  return parts;
};
const formatContent = (content: string) => {
  return md.render(content);
};

const copyToClipboard = (code: string) => {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      alert("复制成功");
    })
    .catch(() => {
      alert("复制失败，请检查浏览器设置");
    });
};

let inputRef: Ref<InstanceType<typeof InputBox> | null> = ref(null);

defineExpose({
  inputRef,
});

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    class="flex flex-col bg-black text-white rounded-2xl w-150 h-[80dvh] border-2 border-gray-800 p-4 gap-4"
  >
    <div class="flex justify-between p-2 items-start" @click="$emit('close')">
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
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M0 0h16v16H0V0Z"
            clip-rule="evenodd"
          />
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
        <img
          alt="Ghost AI"
          :src="model.icon"
          class="size-9 aspect-square rounded-full bg-amber-50"
        />
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

    <!-- Chat -->
    <div
      class="grow w-full text-white md:gap-5 md:flex md:flex-col overflow-y-auto h-[calc(100vh-200px)]"
    >
      <div class="relative group" v-for="msg in messages" :key="msg.id">
        <div
          v-if="msg.sender === MessageType.USER"
          class="h-fit flex flex-row-reverse items-start justify-start gap-2"
        >
          <div class="rounded-2xl p-2 max-w-[90%] bg-gray-800">
            <p class="text-pretty break-words">{{ msg.content }}</p>
          </div>
        </div>
        <div
          v-if="msg.sender === MessageType.BOT"
          class="h-fit flex items-start justify-start gap-2"
        >
          <img
            src="/src/icon.png"
            alt="AI"
            class="size-10 aspect-square rounded-full bg-amber-50"
          />
          <div class="rounded-2xl bg-gray-800 p-2 max-w-[90%]">
            <template
              v-for="(part, index) in splitContent(msg.content)"
              :key="index"
            >
              <template v-if="part.isCode">
                <div
                  class="w-full overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2"
                >
                  <div
                    class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm"
                  >
                    <span>{{ part.language }}</span>
                    <button @click="copyToClipboard(part.content)">Copy</button>
                  </div>
                  <pre
                    class="p-4 bg-gray-900"
                  ><code>{{ part.content }}</code></pre>
                </div>
              </template>
              <template v-else>
                <p
                  class="text-pretty break-words"
                  v-html="formatContent(part.content)"
                ></p>
              </template>
            </template>
          </div>
        </div>

        <!-- Hover-Tool -->
        <div
          class="absolute h-6 bg-gray-700 w-fit top-full rounded-2xl py-1 px-2 text-gray-300 gap-2 hidden group-hover:flex z-1"
          :class="msg.sender === MessageType.BOT ? 'left-10' : 'right-10'"
        >
          <!-- 删除 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            @click="deleteMessage(msg)"
          >
            <path
              fill="currentColor"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
            />
          </svg>
          <!-- 复制 -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            @click="copyToClipboard(msg.content)"
          >
            <g fill="currentColor">
              <path
                d="M15.2 2h-3.9l-4.2.1c-1.1.2-2 .5-2.8 1.2-.7.8-1 1.7-1.2 2.8L3 10.4v5.8a4 4 0 0 0 2.2 3.4V8c.2-1 .5-1.8 1.2-2.6.8-.7 1.7-1 2.6-1.1l3.3-.1h6.3A3.6 3.6 0 0 0 15.2 2Z"
              />
              <path
                d="M6.6 11.4c0-2.7 0-4 .8-5 .9-.8 2.2-.8 5-.8h2.8c2.8 0 4.1 0 5 .9.8.8.8 2.2.8 4.9v4.8c0 2.7 0 4.1-.8 5-.9.8-2.2.8-5 .8h-2.8c-2.8 0-4.1 0-5-.8-.8-.9-.8-2.3-.8-5v-4.8Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <InputBox
      ref="inputRef"
      :isToolBar="false"
      @sendMessage="sendMessage"
      @updateMessage="updateMessage"
      @receiveMessage="receiveMessage"
    />
  </div>
</template>
