<template>
  <div>
    <v-card class="chat-wrapper">
      <v-banner class="chat-header text-h6 font-weight-regular" sticky>
        <v-icon size="22" icon="mdi-keyboard-backspace" @click="goBackToMatch"></v-icon>
        {{ title }}
      </v-banner>

      <v-card-text>
        <div v-for="(item, index) in msg" :key="index" class="d-flex mb-4">
          <div v-if="item.name === userEmail" class="msg-bubble ml-auto py-3 px-4 rounded-xl">
            {{ item.msg }}
          </div>
          <div v-else class="msg-bubble py-3 px-4 rounded-xl">{{ item.msg }}</div>
        </div>
      </v-card-text>
      <div class="input-group">
        <input v-model="inputValue" type="text" placeholder="輸入訊息" @keypress.enter="sendData" />
        <span @click="sendData">發送</span>
      </div>
    </v-card>
  </div>
</template>
<script setup>
import io from "socket.io-client";
definePageMeta({
  middleware: "chat"
});
const inputValue = ref("");
const msg = ref([]);
const route = useRouter();
const emailData = useState("chatEmail");
const title = ref("");
const userEmail = ref(""); // 當前用戶的email

let socket = null;

// 送出訊息
function sendData() {
  socket.emit("newMessage", inputValue.value);
  inputValue.value = "";
}

// 返回 match 頁面
function goBackToMatch() {
  route.go(-1);
}

onMounted(async () => {
  await getUserEmail();
  title.value = emailData.value;
  socket = io("https://parkalert.onrender.com", {
    extraHeaders: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      chatWith: title.value
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
  socket.on("connect_error", (error) => {
    console.log("Connection error:", error);
  });

  // 接收訊息
  socket.on("onMessage", (res) => {
    msg.value.push(res);
  });
});

async function getUserEmail() {
  try {
    const api = useApi();
    const res = await api.isAuth();
    userEmail.value = res.data.email;
  } catch (e) {
    console.log(e);
  }
}
</script>
<style lang="scss">
.card-container {
  max-width: 800px;
}

body {
  background-color: rgb(var(--v-theme-primary));
  margin: 0;
  padding: 0;
}

.v-application {
  background-color: rgb(var(--v-theme-primary));
}

.chat-wrapper {
  max-width: 500px;
  position: absolute;
  top: 54%;
  left: 50%;
  width: calc(100% - 20px);
  height: calc(100% - 94px);
  // margin-top: 64px;
  background: rgb(var(--v-theme-white));
  transform: translate(-50%, -50%);
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
      width: calc(100% - 20px);
      border: none;
      outline: none;
      box-sizing: border-box;
      padding: 10px 60px 10px 20px;
      border-radius: 16px;
    }
    span {
      position: fixed;
      right: 25px;
      font-weight: 600;
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
