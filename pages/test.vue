<template>
  <div class="container">
    <div class="block -black"></div>
    <div class="block -red"></div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
const Container = gsap.timeline();

onMounted(() => {
  // gsap.to(".box", {
  //   x: 500,
  //   y: 200,
  //   scale: 0.3,
  //   rotate: 360,
  //   borderRadius: 50,
  //   backgroundColor: "#ccc",
  //   ease: "expo.out",
  //   repeat: -1,
  //   duration: 3
  // });

  const r1 = gsap
    .timeline({ defaults: { ease: "none" } })
    .to(".-red", { x: 100 })
    .to(".-red", { y: 100 })
    .to(".-red", { x: 200 })
    .to(".-red", { y: 200 })
    .duration(1);

  // single Tween
  const b1 = gsap.to(".-black", {
    keyframes: [{ x: 100 }, { y: 100 }, { x: 200 }, { y: 200 }],
    duration: 1
  });

  const sum = gsap.timeline({ repeat: -1 }).add(r1).add(b1);

  console.log(sum.getChildren());
  // Container.to(".box", {
  //   duration: 1,
  //   x: 0,
  //   y: 0,
  //   scale: 2,
  //   rotate: 360,
  //   borderRadius: 0,
  //   backgroundColor: "red",
  //   ease: "expo.out",
  //   repeat: 0
  // });

  //   gsap.to(".box", {
  //     keyframes: [
  //       { x: 100 }, // 0%
  //       { y: 100 }, // 33.333%
  //       { x: 200 }, // 66.666%
  //       { y: 200 } // 100%
  //     ]
  //   });
  // });
});
</script>
<style lang="scss">
.block {
  background: black;
  width: 100px;
  height: 100px;
  border-radius: 10%;
  margin-bottom: 20px;
  &.-red {
    background: red;
  }
}
</style>
