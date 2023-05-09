<template>
  <div class="d-flex justify-center">
    <v-row no-gutters class="mt-5" style="max-width: 1000px">
      <v-col cols="12" sm="6">
        <img src="../assets/car.png" class="w-100" />
      </v-col>
      <v-col class="d-flex flex-column btn-list justify-center align-center" cols="12" sm="6">
        <h1>臨停，不必再留電話</h1>
        <nuxt-link to="/match" class="w-50">
          <v-btn size="large" class="w-100"> 尋找車主 </v-btn>
        </nuxt-link>
        <nuxt-link to="/qrcode" class="w-50">
          <v-btn size="large" class="w-100"> QRCODE </v-btn>
        </nuxt-link>
        <nuxt-link to="/login" class="w-50">
          <v-btn size="large" class="w-100"> 登入 </v-btn>
        </nuxt-link>
        <nuxt-link to="/registration" class="w-50">
          <v-btn size="large" class="w-100"> 註冊 </v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.btn-list {
  gap: 1rem;
}
</style>
