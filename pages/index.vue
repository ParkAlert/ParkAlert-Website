<template>
  <div class="d-flex justify-center">
    <v-row no-gutters class="mt-5" style="max-width: 1000px">
      <v-col cols="12" sm="6">
        <div>
          <img id="car" src="../assets/car.png" class="w-100" />
        </div>
      </v-col>
      <v-col class="btn-list main-content" cols="12" sm="6">
        <h1>臨停，不必再留電話</h1>
        <nuxt-link to="/chat" class="w-50">
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

<script lang="ts" setup>
import gsap from "gsap";
import { onMounted } from "vue";
onMounted(() => {
  const car = gsap.fromTo("#car", { x: -300 }, { x: 0 });
  const Container = gsap.timeline().add(car);
  Container.getChildren();
  Container.play(0);
});
</script>

<style lang="scss">
.main-content {
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
}
.btn-list {
  gap: 1rem;
}
</style>
