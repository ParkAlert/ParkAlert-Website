<template>
  <ClientOnly>
    <v-row>
      <v-col class="h-100 d-none d-md-flex" cols="12" md="4">
        <v-card class="chat-wrapper h-100 pb-2 w-100">
          <v-banner class="chat-header text-h6 font-weight-regular" sticky> 聊天列表 </v-banner>
          <v-card-text>
            <div
              v-for="(item, index) in chatList.value"
              :key="index"
              class="chat-list rounded"
              @click="
                selectChatTarget(item.target);
                isShowChatList = true;
              "
            >
              <v-avatar color="grey-darken-1" size="42"></v-avatar>
              <div class="d-flex flex-column">
                <h3>{{ item.target }}</h3>
                <p>{{ item?.latestMsg?.msg }}</p>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              variant="tonal"
              class="ml-auto mr-4"
              @click="findDialog = true"
            >
              尋找車主
              <v-icon end icon="mdi-account-multiple-plus m-0"></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="h-100 d-flex flex-column">
        <div class="d-md-none">
          <v-btn color="secondary" variant="tonal" class="mb-3" @click="listDialog = true">
            聊天列表
            <v-icon end icon="mdi-account-multiple m-0"></v-icon>
          </v-btn>
          <v-btn color="secondary" variant="tonal" class="ml-2 mb-3" @click="findDialog = true">
            尋找車主
            <v-icon end icon="mdi-account-multiple-plus m-0"></v-icon>
          </v-btn>
        </div>

        <v-card v-if="targetEmail" class="chat-wrapper h-100 w-100">
          <v-banner class="chat-header text-h6 font-weight-regular" sticky>
            {{ targetEmail }}
          </v-banner>

          <v-card-text ref="refCardContainer">
            <div v-for="(item, index) in msg.value" :key="index" class="d-flex mb-4">
              <div v-if="item.name === userEmail" class="msg-bubble ml-auto py-3 px-4 rounded-xl">
                {{ item.msg }}
              </div>
              <div v-else class="msg-bubble py-3 px-4 rounded-xl">{{ item.msg }}</div>
            </div>
          </v-card-text>
          <div class="input-group">
            <input
              v-model="inputValue"
              type="text"
              placeholder="輸入訊息"
              @keypress.enter="sendData"
            />
            <span @click="sendData">發送</span>
          </div>
        </v-card>

        <v-card v-else class="chat-wrapper h-100">
          <div class="empty-chat h-100">選擇聊天室或開啟新對話</div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="findDialog" width="auto">
      <v-card>
        <v-card-text>
          <Match @close="newChat" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="listDialog" width="auto">
      <v-card class="chat-wrapper h-100 pb-2 w-100">
        <v-banner class="chat-header text-h6 font-weight-regular" sticky> 聊天列表 </v-banner>
        <v-card-text>
          <div
            v-for="(item, index) in chatList.value"
            :key="index"
            class="chat-list rounded"
            @click="
              selectChatTarget(item.target);
              isShowChatList = true;
            "
          >
            <v-avatar color="grey-darken-1" size="42"></v-avatar>
            <div class="d-flex flex-column">
              <h3>{{ item.target }}</h3>
              <p>{{ item?.latestMsg?.msg }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>
<script setup lang="ts">
import { io } from "socket.io-client";

definePageMeta({
  middleware: "auth"
});

const route = useRouter();
const api = useApi();
let socket: any = null;

interface Msg {
  name: string;
  msg: string;
  time: string;
}

interface ChatListItem {
  target: string;
  latestMsg: Msg;
}

interface MsgList {
  value: Msg[];
}

interface ChatList {
  value: ChatListItem[];
}

const msg: MsgList = reactive({ value: [] });
const chatList: ChatList = reactive({ value: [] });
const targetEmail: Ref<string> = ref(""); // 聊天目標的email
const userEmail = ref(""); // 當前用戶的email
const refCardContainer: any = ref(null);
const inputValue = ref("");
const findDialog: Ref<boolean> = ref(false); // 新增新聊天對象modal
const listDialog = ref(false);
const isShowChatList = ref(false);

onMounted(async () => {
  await getUserEmail(); // 取得當前用戶email
  initChat();
  await getChatList(); // 取得當前用戶聊天列表
});

// 當還未指定聊天對象，只是單純掃描qrcode或直接進入路由
async function initChat() {
  if (!route.currentRoute.value.query.email) return;

  targetEmail.value = route.currentRoute.value.query.email as string;
  setupSocket();
  await getChatHistory();

  chatScrollBottom();
}

async function newChat(data: string) {
  route.push({
    path: "/chat",
    query: { email: data }
  });
  targetEmail.value = data;
  setupSocket();
  await getChatHistory();
  await getChatList();
  chatScrollBottom();
  findDialog.value = false;
}

// 建立socket連線
function setupSocket() {
  socket = io("https://parkalert.onrender.com", {
    extraHeaders: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      chatWith: targetEmail.value
    }
  });
  // 連接上聊天室
  socket.on("connect", () => {
    console.log("Connected to Socket.io server");
  });

  socket.on("disconnect", () => {
    navigateTo("/login");
  });

  // 連結失敗Bottom
  socket.on("connect_error", (error: Error) => {
    console.log("Connection error:", error);
  });

  // 接收訊息
  socket.on("onMessage", async (res: any) => {
    await getChatList();
    // 如果接受的訊息是當前正在聊天對象
    if (res.roomName.replace(userEmail.value, "") === targetEmail.value) {
      msg.value = res.chatHistory;
      chatScrollBottom();
    }
  });
}

// 送出訊息
function sendData() {
  socket.emit("newMessage", inputValue.value);
  inputValue.value = "";
  chatScrollBottom();
}

// 選擇制定聊天對象
async function selectChatTarget(target: string) {
  route.push({
    path: "/chat",
    query: { email: target }
  });

  targetEmail.value = target;
  await getChatHistory();
  await setupSocket();

  refCardContainer.value.$el.scrollTo(0, refCardContainer.value.$el.scrollHeight);

  listDialog.value = false;
}

// 取得當前用戶email
async function getUserEmail() {
  try {
    const res = await api.isAuth();
    userEmail.value = res.data.email;
  } catch (e) {
    console.log(e);
  }
}

// 取得當前聊天紀錄
async function getChatHistory() {
  try {
    const res = await api.getHistory({ user1: userEmail.value, user2: targetEmail.value });
    msg.value = res.data.chatHistory;
  } catch (e) {
    console.log(e);
  }
}

// 取得當前聊天列表
async function getChatList() {
  try {
    const res = await api.getChatList();
    chatList.value = res.data.list;
  } catch (e) {
    console.log(e);
  }
}

// 將聊天的滾動條移至最底
function chatScrollBottom() {
  refCardContainer.value.$el.scrollTo(0, refCardContainer.value.$el.scrollHeight);
}
</script>
<style lang="scss" scoped>
.card-container {
  max-width: 800px;
}

.v-row {
  height: calc(100vh - 80px);
}

.chat-wrapper {
  // margin-top: 64px;
  background: rgb(var(--v-theme-white));
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 0;
  .chat-header {
    display: flex;
    justify-content: center;
    align-items: center;
    .v-icon {
      position: fixed;
      left: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .chat-list {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(233, 233, 233);
    }
  }
  .v-card-text {
    overflow: auto;
    height: calc(100% - 110px);
  }
  .input-group {
    width: 100%;
    // background-color: red;
    position: absolute;
    bottom: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      background-color: #d7d7d7;
      height: 34px;
      width: calc(100% - 100px);
      border: none;
      outline: none;
      box-sizing: border-box;
      padding: 10px 60px 10px 20px;
      border-radius: 16px;
      margin-right: 10px;
    }
    span {
      white-space: nowrap;
      color: rgb(var(--v-theme-secondary));
      &:hover {
        cursor: pointer;
        color: rgb(var(--v-theme-secondaryVariant));
      }
    }
  }

  .empty-chat {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
  }
}
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 340px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background: rgb(var(--v-theme-white));
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 40px;
  input {
    border: none;
  }
  .text-input {
    .v-label {
      font-weight: 600;
      color: rgb(var(--v-theme-secondary));
    }
  }
  .mt-2 {
    color: rgb(var(--v-theme-white));
    font-size: 16px;
    font-weight: 600;
    background: rgb(var(--v-theme-secondaryVariant));
  }
}
.msg-bubble {
  background-color: rgb(var(--v-theme-secondary));
  font-size: 1.25rem;
  color: white;
}
</style>
