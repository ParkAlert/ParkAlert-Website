<template>
  <v-app id="inspire">
    <v-app-bar color="secondary">
      <img src="../assets/icon.png" alt="" class="h-50 ml-5" />

      <v-toolbar-title class="title"><nuxt-link to="/">Park Alert</nuxt-link></v-toolbar-title>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="right" temporary>
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div v-if="!email">請先登入或註冊</div>
        <div v-else>
          <nuxt-link to="/profile"> {{ email }}</nuxt-link>
        </div>
      </v-sheet>
      <v-list>
        <NuxtLink to="/match"><v-list-item link>尋找車主</v-list-item></NuxtLink>
        <NuxtLink to="/qrcode"><v-list-item link>QR CODE</v-list-item></NuxtLink>
        <NuxtLink to="/registration"><v-list-item link>註冊</v-list-item></NuxtLink>
        <NuxtLink v-if="!email" to="/login"><v-list-item link>登入</v-list-item></NuxtLink>
        <v-list-item v-else link @click="singout">登出 </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-bg" style="padding-top: 64px">
      <v-container id="root-container" class="h-100">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
const drawer = ref(false);
const email = useState("email");

function singout() {
  localStorage.setItem("token", "");
  window.location.reload();
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&display=swap");

.v-toolbar {
  position: fixed;
}

* {
  font-family: "Noto Sans TC", sans-serif;
}

a {
  text-decoration: none;
  color: black;
}

.title {
  a {
    color: white;
  }
}
</style>
