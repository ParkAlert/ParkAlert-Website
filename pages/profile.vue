<template>
  <div>
    <div class="profile-wrapper">
      <div class="profile-title">
        <h2>用戶資料</h2>
      </div>
      <div class="profile-item email-section">
        電子郵件
        <p @click="handleEditEmail">{{ profile.email }}</p>
      </div>
      <div class="profile-item phone-section">
        電話號碼
        <p @click="handleEditPhone">{{ profile.phone }}</p>
      </div>
      <div class="profile-item license-section" style="margin-bottom: 20px">
        車牌號碼
        <p @click="handleEditLicense">{{ profile.license }}</p>
      </div>
      <div class="separate-line"></div>
      <div class="edit-password" @click="handleEditPassword">
        <p>修改密碼</p>
      </div>
      <div class="logout" @click="handleLogout">
        <p>登出</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const profile = reactive({
  email: "test@gmail.com",
  phone: "0928283940",
  license: "ABC-0123"
});

const handleLogout = () => {
  console.log("logout section pressed");
};

const handleEditPassword = () => {
  console.log("edit password section pressed");
};

const handleEditEmail = () => {
  console.log("edit email section pressed");
};

const handleEditPhone = () => {
  console.log("edit phone section pressed");
};

const handleEditLicense = () => {
  console.log("edit license section pressed");
};
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

.profile-wrapper {
  position: absolute;
  top: 55%;
  left: 50%;
  min-width: 370px;
  height: 575px;
  background: rgb(var(--v-theme-white));
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 20px;
  .profile-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .profile-item {
    font-size: 20px;
    font-weight: 600;
    margin: 29px 0;
    color: rgb(var(--v-theme-secondary));
    p {
      color: rgb(var(--v-theme-black));
      font-weight: 400;
      margin: 5px 0 0 2px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .separate-line {
    background-color: rgb(var(--v-theme-gray));
    height: 2px;
  }
  .edit-password {
    margin: 20px 0;
    p {
      font-size: 20px;
      font-weight: 600;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logout {
    margin: 20px 0;
    p {
      font-size: 20px;
      font-weight: 600;
      color: rgb(var(--v-theme-warning));
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
