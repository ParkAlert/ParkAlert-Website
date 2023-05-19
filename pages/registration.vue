<template>
  <div>
    <div class="registration-form">
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="account.email"
            type="email"
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
            :rules="passwordRules"
            variant="underlined"
            type="password"
          />
          <v-text-field
            v-model="account.confirmPassword"
            clearable
            class="text-input"
            label="確認密碼"
            :rules="confirmPasswordRules"
            variant="underlined"
            type="password"
          />
          <v-text-field
            v-model="account.licensePlateNumber"
            clearable
            class="text-input"
            label="車牌號碼"
            :rules="licensePlateNumberRules"
            variant="underlined"
          />
          <v-text-field
            v-model="account.phone"
            clearable
            class="text-input"
            label="電話"
            :rules="phoneRules"
            variant="underlined"
          />
          <v-btn type="submit" block class="mt-2">註冊</v-btn>
          <div class="separate-line"></div>
          <p>已經註冊過帳號嗎?<NuxtLink to="/login">立即登入</NuxtLink></p>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>
<script lang="ts" setup>
const account = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  licensePlateNumber: ""
});

const regEx = reactive({
  email: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
  phone: /0\d{9}$/,
  // 車牌號碼格式為 三個大寫英文字母(除去I、O) + 四個數字(除去4)
  licensePlateNumber: /^[A-HJ-NP-Z]{3}-[0-35-9]{4}$/
});

// 輸入規則
const emailRules = ref([
  (value: any) => {
    if (!value) {
      return "電子郵件輸入不可為空!";
    } else if (value.search(regEx.email)) {
      return "電子郵件格式錯誤!";
    } else {
      return true;
    }
  }
]);

const passwordRules = ref([
  (value: any) => {
    if (!value) {
      return "密碼輸入不可為空!";
    } else {
      return true;
    }
  }
]);

const confirmPasswordRules = ref([
  (value: any) => {
    if (!value) {
      return "確認密碼輸入不可為空!";
    } else if (value !== account.password) {
      return "確認密碼錯誤!";
    } else {
      return true;
    }
  }
]);

const licensePlateNumberRules = ref([
  (value: any) => {
    if (!value) {
      return "車牌號碼輸入不可為空!";
    } else if (value.search(regEx.licensePlateNumber)) {
      return "車牌格式錯誤";
    } else {
      return true;
    }
  }
]);

const phoneRules = ref([
  (value: any) => {
    if (!value) {
      return "電話輸入不可為空!";
    } else if (value.search(regEx.phone)) {
      return "電話格式錯誤!";
    } else {
      return true;
    }
  }
]);

const submit = () => {
  // to-do : form validate error
  createUser();
};

async function createUser() {
  try {
    const api = useApi();
    const res = await api.createUser({
      email: account.email,
      password: account.password
    });
    console.log(res.data);
  } catch (e) {
    console.error(e);
  }
}
</script>
<style lang="scss" scoped>
body {
  background-color: rgb(var(--v-theme-primary));
  margin: 0;
  padding: 0;
}
.v-application {
  background-color: rgb(var(--v-theme-primary));
}

.registration-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background: rgb(var(--v-theme-white));
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px 40px;
  margin-top: 20px;
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
}
</style>
