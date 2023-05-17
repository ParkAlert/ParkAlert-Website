<template>
  <div class="d-flex justify-center">
    <v-row no-gutters class="mt-5" style="max-width: 1000px">
      <v-col cols="12" sm="6">
        <div>
          <img src="../assets/car.png" class="w-100" id="car" />
          <div id="road"></div>
        </div>
      </v-col>
      <v-col class="btn-list main-content" cols="12" sm="6">
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

<script lang="ts" setup>
import gsap from "gsap";
import { onMounted } from "vue";
onMounted(() => {
  const car = gsap.fromTo("#car", { x: -300 }, { x: 0 });
  const road = gsap.fromTo("#road", { width: 0 }, { width: 650 });
  const Container = gsap.timeline().add(car).add(road);
  Container.getChildren();
  Container.play(0);
});
</script>

<style lang="scss">
@media only screen and (max-width: 768px) {
  #car {
    max-width: 100%;
    position: relative;
    max-width: 350px;
    padding: 1rem;
  }
  #road {
    display: none;
  }
  .btn-list {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
@media only screen and (min-width: 768px) {
  #car {
    position: absolute;
    z-index: 2;
    max-width: 600px;
    left: 0%;
  }
  #road {
    // background: "../assets/roaad.png";
    background-color: black;
    opacity: 0.5;
    position: absolute;
    z-index: 1;
    // background-image: url("../assets/road.png");
    width: 100vh;
    height: 100px;
    top: 60%;
    left: 5%;
    // margin-bottom: 5%;
  }
}
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
