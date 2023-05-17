<template class="bg-black">
  <div class="container"></div>
  <div class="car"><img src="../assets/car.png" class="carImg" /></div>
  <div class="man"><img src="../assets/manWalk1.png" class="manImg" /></div>
  <div class="phone"><img src="../assets/phone.png" class="phoneImg" /></div>
  <div class="yellow"></div>
</template>
<script setup lang="ts">
import gsap from "gsap";
// https://icones.js.org/ Icon來這邊找

onMounted(() => {
  const runx = gsap.fromTo(".yellow", { width: 0 }, { width: 1350, duration: 3 });
  const runy = gsap.fromTo(".yellow", { height: 5, y: 0 }, { height: 600, y: -310, duration: 3 });
  const runCar = gsap.fromTo(".car", { x: 0 }, { x: 500, ease: "power1.inOut", duration: 3 });
  const runMan = gsap.to(".man", { x: "-=580", duration: 3 });
  const runPhone = gsap.to(".phone", { y: "+=200" });
  const hugePhone = gsap.to(".phone", { ease: "power1.easeOut", scale: 100 });
  const Container = gsap.timeline().add(runx).add(runy);
  const imgMove = gsap.timeline().add(runCar).add(runMan).add(runPhone).add(hugePhone);
  const hide = () => {
    gsap.to(".yellow", { opacity: 0, duration: 1 });
    gsap.to(".container", { opacity: 0, duration: 1 });
  };
  document.addEventListener("click", function () {
    hide();
  });
  imgMove.then(() => {
    // 動畫執行完畢，執行頁面跳轉
    navigateTo("/");
  });
});
</script>
<style lang="scss">
.container {
  position: absolute;
  width: 100rem;
  height: 100rem;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0%;
  top: 0%;
  z-index: 1;
}

.yellow {
  position: absolute;
  top: 60%;
  left: 0%;
  background-color: yellow;
  height: 10px;
  width: 100rem;
  z-index: 99;
}

.man {
  .manImg {
    width: 100px;
  }
  position: absolute;
  left: 95%;
  top: 40%;
  z-index: 100;
}
.car {
  position: absolute;
  left: 0%;
  top: 40%;
  width: 100px;
  height: 10px;
  width: 100rem;
  z-index: 100;
  .carImg {
    width: 200px;
  }
}
.phone {
  .phoneImg {
    width: 50px;
  }
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 0%;
}
</style>
