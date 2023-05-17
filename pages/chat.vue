<template>
  <v-row>
    <v-col cols="4" class="h-100">
      <v-card class="chat-wrapper h-100">
        <v-banner class="chat-header text-h6 font-weight-regular" sticky> 聊天列表 </v-banner>
        <v-card-text>
          <div
            v-for="(item, index) in chatList.value"
            :key="index"
            class="chat-list rounded"
            @click="selectChatTarget(item.target)"
          >
            <v-avatar color="grey-darken-1" size="42"></v-avatar>
            <div class="d-flex flex-column">
              <h3>{{ item.target }}</h3>
              <p>{{ item.latestMsg.msg }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="h-100">
      <v-card class="chat-wrapper h-100">
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
      </v-card></v-col
    >
  </v-row>
</template>
<script setup lang="ts">
import io from "socket.io-client";

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

const api = useApi();
const inputValue = ref("");
const msg: MsgList = reactive({ value: [] });
const route = useRouter();
const chatList: ChatList = reactive({ value: [] });
const targetEmail: Ref<string> = ref(""); // 聊天目標的email
const userEmail = ref(""); // 當前用戶的email
const refCardContainer: any = ref(null);

let socket: any = null;

onMounted(async () => {
  await getUserEmail();
  await getChatList();
  await getChatHistory();
  targetEmail.value = route.currentRoute.value.query.email as string;
  setupSocket();
  refCardContainer.value.$el.scrollTo(0, refCardContainer.value.$el.clientHeight);
});

function setupSocket() {
  socket = io("http://localhost:5090", {
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

  // 連結失敗
  socket.on("connect_error", (error: Error) => {
    console.log("Connection error:", error);
  });

  // 接收訊息
  socket.on("onMessage", async (res: any) => {
    await getChatHistory();
    if (res.roomName.replace(userEmail.value, "") === targetEmail.value) {
      msg.value = res;
    }
  });
}

function sendData() {
  socket.emit("newMessage", inputValue.value);
  inputValue.value = "";
}

async function selectChatTarget(target: string) {
  route.push({
    path: "/chat",
    query: { email: target }
  });

  targetEmail.value = target;
  await getChatHistory();
  await setupSocket();

  refCardContainer.value.$el.scrollTo(0, refCardContainer.value.$el.scrollHeight);
}
// 送出訊息

async function getUserEmail() {
  try {
    const res = await api.isAuth();
    userEmail.value = res.data.email;
  } catch (e) {
    console.log(e);
  }
}

async function getChatHistory() {
  try {
    const res = await api.getHistory({ user1: userEmail.value, user2: targetEmail.value });
    msg.value = res.data.chatHistory;
  } catch (e) {
    console.log(e);
  }
}

async function getChatList() {
  try {
    const res = await api.getChatList();
    chatList.value = res.data.list;
    console.log(chatList.value);
  } catch (e) {
    console.log(e);
  }
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
}

.msg-bubble {
  background-color: rgb(var(--v-theme-secondary));
  font-size: 1.25rem;
  color: white;
}
</style>
