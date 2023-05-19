<template>
  <div>
    <!-- <Header /> -->
    <div class="login-form">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="account.email"
            clearable
            class="text-input"
            label="電子郵件"
            :rules="emailRules"
            variant="underlined"
          />
          <v-text-field
            v-model="account.password"
            clearable
            class="text-input"
            label="密碼"
            variant="underlined"
            :rules="passwordRules"
            type="password"
          />
          <v-btn type="submit" block class="mt-2">登入</v-btn>
          <div class="separate-line"></div>
          <p>尚未擁有帳號?<NuxtLink to="/registration">立即註冊</NuxtLink></p>
          <div class="social-media" @click="handleGoogle">
            <v-btn icon="mdi-google" size="small" color="indigo-darken-2"></v-btn>
          </div>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { googleTokenLogin } from "vue3-google-login";
const api = useApi();
const runtimeConfig = useRuntimeConfig();
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public;

const account = reactive({
  email: "",
  password: ""
});

const emailRules = ref([
  (value: any) => {
    if (value) return true;
    return "帳號輸入不可以為空!";
  }
]);

const passwordRules = ref([
  (value: any) => {
    if (value) return true;
    return "密碼輸入不可以為空!";
  }
]);

const submit = async () => {
  try {
    const res = await api.signin(account);
    const signInResponse = { token: res.data }; // 取得signin字串
    const tokenString = signInResponse.token;
    localStorage.setItem("token", tokenString); // 將 token 字串儲存到本地存儲
    goTo();
    // navigateTo("/");
  } catch (e: any) {
    // 非2xx基本都會到這(應該啦)

    // 例如帳密輸錯
    if (e.response.status === 401) {
      // 提示使用者帳密錯誤...
    }

    console.error(e);
  }
};

const handleGoogle = async () => {
  try {
    const res = await googleTokenLogin({
      clientId: GOOGLE_CLIENT_ID
    });
    const res2 = await api.google_signin({ oAuthToken: res.access_token });

    localStorage.setItem("token", res2.data); // 將 token 字串儲存到本地存儲

    navigateTo("/");
  } catch (error) {
    console.error(error);
  }
};

const goTo = () => {
  const redirectUrl = localStorage.getItem("redirectUrl");
  if (redirectUrl) {
    navigateTo(redirectUrl);
    localStorage.removeItem("redirectUrl"); // 移除已經不需要的 redirectUrl
  } else {
    navigateTo("/"); // 沒有 redirectUrl，就導回首頁
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background: rgb(var(--v-theme-white));
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 40px;
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
  .separate-line {
    margin: 20px 90px 20px 90px;
    background-color: rgb(var(--v-theme-gray));
    height: 2px;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: rgb(var(--v-theme-black));
    a {
      color: rgb(var(--v-theme-secondaryVariant));
      margin-left: 10px;
    }
    a:hover {
      color: rgb(var(--v-theme-secondary));
    }
  }
  .social-media {
    display: flex;
    justify-content: center;
    margin: 20px 0 0 0;
  }
}
</style>
