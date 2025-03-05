<script lang="ts" setup>
import History from "./components/history.vue";
import Favorite from "./components/favorite.vue";
import InputBox from "../src/inputBox.vue";
import { ref, computed, onMounted, watch } from "vue";
import TabBar from "./components/TabBar.vue";
import { Tab } from "../../model/Tab";
import { Message, MessageType } from "../../model/Message";
import MarkdownIt from "markdown-it";

// 标签页
const tabs = ref<Tab[]>([new Tab(undefined, "New Tab", true, undefined)]);
// 监听标签页变化
watch(
  tabs,
  () => {
    saveTab();
  },
  { deep: true }
);

const loadTabs = () => {
  const tabsData = sessionStorage.getItem("tabs");
  if (tabsData) {
    try {
      const parsedTabs = JSON.parse(tabsData).map((tabData: any) => {
        const tab = new Tab(
          tabData.id,
          tabData.name,
          tabData.isActive,
          tabData.createdTime
        );

        tab.updatedTime = tabData.updatedTime || tab.createdTime;
        tab.isPrivate = tabData.isPrivate || false;
        tab.messages = tabData.messages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp || tab.createdTime,
        }));

        return tab;
      });

      // 确保至少有一个激活的标签页
      const hasActiveTab = parsedTabs.some((tab: Tab) => tab.isActive);
      if (!hasActiveTab && parsedTabs.length > 0) {
        parsedTabs[0].isActive = true;
      }

      tabs.value = parsedTabs;
    } catch (error) {
      console.error("Failed to load tabs:", error);
      // 恢复失败时初始化新标签页
      tabs.value = [new Tab(undefined, "New Tab", true)];
    }
  }
};

const saveTab = () => {
  sessionStorage.setItem("tabs", JSON.stringify(tabs.value));
};

// 关开历史页和收藏
const isShowFavorite = ref(false);
const isShowHistory = ref(false);


// 计算属性
const activeMessages = computed(() => {
  const activeTab = tabs.value.find((tab) => tab.isActive);
  return activeTab ? activeTab.messages : [];
});

const activeTab = computed(() => {
  return tabs.value.find((tab) => tab.isActive);
});

const md = new MarkdownIt();
const formatContent = (content: string) => {
  return md.render(content);
};

// 标签页操作
function addNewTab(newTab?: Tab) {
  //  如果Tab已经存在，则直接active
  const existedTab: Tab = tabs.value.find((tab) => tab.id === newTab?.id);
  if (existedTab) {
    activateTab(existedTab);
    return;
  }

  if (!newTab) {
    newTab = new Tab(undefined, "New Tab", false, undefined);
  }

  tabs.value.push(newTab);
  activateTab(newTab);
  addHistory(newTab);
}

function activateTab(selectedTab: Tab) {
  tabs.value.forEach((tab) => {
    tab.isActive = tab.id === selectedTab.id;
  });
}

function deleteTab(tabToDelete: Tab) {
  const index = tabs.value.findIndex((tab) => tab.id === tabToDelete.id);
  if (index === -1) return;

  const wasActive = tabToDelete.isActive;
  tabs.value = tabs.value.filter((tab) => tab.id !== tabToDelete.id);

  if (wasActive && tabs.value.length > 0) {
    const newIndex = Math.min(index, tabs.value.length - 1);
    activateTab(tabs.value[newIndex]);
  }
}

const handleSendMessage = (message: Message) => {
  activeTab.value?.messages.push(message);
};

const handleReceiveMessage = (message: Message) => {
  activeTab.value?.messages.push(message);
};

const updateMessage = (messageId: string, content: string) => {
  const message = activeTab.value?.messages.find((msg) => msg.id === messageId);
  if (message) {
    message.content += content;
  }
};


const deleteMessage = (message: Message) => {
  const index = activeTab.value?.messages.findIndex(
    (msg) => msg.id === message.id
  );
  if (index === -1) return;

  if (index !== undefined) {
    activeTab.value?.messages.splice(index, 1);
  }
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

onMounted(() => {
  loadTabs();
});

/**
 * 收藏部分
 */

let favorites = ref<Message[]>([]);

watch(
  favorites,
  () => {
    saveFavoritesToLocalStorage();
  },
  { deep: true }
);

onMounted(() => {
  favorites.value = getFavoritesFromLocalStorage();
});

function addFavorite(newFavorite: Message) {
  const existed = favorites.value.find((item) => item.id === newFavorite.id);
  if (!existed) {
    favorites.value.push(newFavorite);
  }
}

function deleteFavorite(favorite: Message) {
  const index = favorites.value.findIndex((item) => item.id === favorite.id);
  if (index === -1) return;

  favorites.value.splice(index, 1);
}

function getFavoritesFromLocalStorage() {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
}

/**
 * 历史部分
 */

let histories = ref<Tab[]>([]);
onMounted(() => {
  histories.value = getHistoriesFromLocalStorage();
});

watch(
  histories,
  () => {
    saveHistoriesToLocalStorage();
  },
  { deep: true }
);

function addHistory(newHistory?: Tab) {
  if (!newHistory) {
    const newTab = new Tab(undefined, "New Tab", false, undefined);
    // 创建新历史并激活标签页
    addHistory(newTab);
    addNewTab(newTab);
    isShowHistory.value = false;
    return;
  }

  // 剔除隐私模式
  if (newHistory.isPrivate) return;

  const existed = histories.value.find((item) => item.id === newHistory.id);
  if (!existed) {
    histories.value.push(newHistory);
  }
}

function deleteHistory(history: Tab) {
  const index = histories.value.findIndex((item) => item.id === history.id);
  if (index === -1) return;

  histories.value.splice(index, 1);

  deleteTab(history);
}

function getHistoriesFromLocalStorage() {
  const storedHistories = localStorage.getItem("histories");
  return storedHistories ? JSON.parse(storedHistories) : [];
}

function saveHistoriesToLocalStorage() {
  localStorage.setItem("histories", JSON.stringify(histories.value));
}
</script>
<template>
  <div
    class="flex flex-col gap-2 w-full h-dvh overflow-hidden text-white relative"
  >
    <!-- Menu Button -->
    <div
      class="w-full flex justify-between items-start p-4 md:absolute md:top-15"
    >
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="isShowHistory = true"
      >
        &leftarrow; 历史
      </div>
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="isShowFavorite = true"
      >
        收藏 &rightarrow;
      </div>
    </div>

    <!-- Dialog -->
    <div
      class="border-2 border-white rounded-2xl shadow-2xl grow no-scrollbar overflow-hidden mx-2 flex flex-col md:mx-0 md:rounded-tl-none md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-2xl md:border-0"
    >
      <!-- Tab Bar -->
      <TabBar
        :tabs="tabs"
        @addTab="addNewTab(undefined)"
        @activateTab="activateTab"
        @deleteTab="deleteTab"
      />

      <!-- Chat -->
      <div
        class="grow w-full text-white py-5 px-3 md:px-26 md:py-10 md:gap-5 md:flex md:flex-col overflow-y-auto h-[calc(100vh-200px)]"
      >
        <div class="relative group" v-for="msg in activeMessages" :key="msg.id">
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
              src="../../icon.png"
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
                      <button @click="copyToClipboard(part.content)">
                        Copy
                      </button>
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
            <!-- 收藏 -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              @click="addFavorite(msg)"
            >
              <path
                fill="currentColor"
                d="M11.172 2a3 3 0 0 1 2.121.879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1-4.822 0l-7.71-7.71A3 3 0 0 1 2 11.172V6a4 4 0 0 1 4-4h5.172ZM7.5 5.5a2 2 0 0 0-1.995 1.85L5.5 7.5a2 2 0 1 0 2-2Z"
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
    </div>

    <!-- Input Box -->
    <div class="relative min-h-40">
      <InputBox
        :activeTab="activeTab"
        :isToolBar="true"
        @sendMessage="handleSendMessage"
        @receiveMessage="handleReceiveMessage"
        @updateMessage="updateMessage"
      />
    </div>

    <Transition name="favorite">
      <Favorite
        v-if="isShowFavorite"
        :favorites="favorites"
        @close="isShowFavorite = false"
        @addFavorite="addFavorite"
        @deleteFavorite="deleteFavorite"
      />
    </Transition>

    <Transition name="history">
      <History
        v-if="isShowHistory"
        :histories="histories"
        @close="isShowHistory = false"
        @newHistory="addHistory(undefined)"
        @selectHistory="addNewTab"
        @deleteHistory="deleteHistory"
      />
    </Transition>
  </div>
</template>

<style scoped>
pre {
  padding: 0.5rem 1rem; /* 减少上下内边距 */
  margin: 0; /* 去除默认外边距 */
  width: 100%; /* 宽度一致 */
  overflow-x: auto; /* 允许水平滚动 */
  background-color: #1e1e1e; /* 深色背景 */
  border-radius: 0.5rem; /* 圆角 */
}

code {
  display: block; /* 确保代码块独占一行 */
  white-space: pre; /* 保留换行，但不自动换行 */
  overflow-wrap: break-word; /* 允许长单词换行 */
  font-size: 1rem; /* 字体大小 */
  font-weight: normal; /* 字体加粗 */
  letter-spacing: normal; /* 字母间距 */
  word-spacing: normal; /* 单词间距 */

  text-align: start; /* 文本对齐方式为左对齐 */
  /* color: #d4d4d4;  */
  font-family: "Consolas", "Monaco", monospace; /* 使用等宽字体 */
  line-height: 1.5; /* 行高 */
}

/* 添加语法高亮 */
code .keyword {
  color: #569cd6; /* 关键字颜色 */
}

code .string {
  color: #ce9178; /* 字符串颜色 */
}

code .comment {
  color: #6a9955; /* 注释颜色 */
}

code .number {
  color: #b5cea8; /* 数字颜色 */
}

.favorite-enter-active {
  animation: favorite-animation 0.2s both;
}
.favorite-leave-active {
  animation: favorite-animation 0.2s both reverse;
}

.history-enter-active {
  animation: history-animation 0.2s both;
}
.history-leave-active {
  animation: history-animation 0.2s both reverse;
}

@keyframes favorite-animation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes history-animation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
