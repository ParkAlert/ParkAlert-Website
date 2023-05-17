<script setup lang="ts">
// https://icones.js.org/ Icon來這邊找
import IconXmark from "~icons/mdi/youtube"; // 方法1 建立flag 匯入路徑 再到下面去引用
</script>
<template>
  <icon-xmark style="font-size: 2em; color: blue" /><!-- 方法1 直接打flag即可 -->
  <Icon name="mdi:youtube" size="96" color="black" /><!-- 方法2 使用Icon flag 在name裡打路徑-->

  <div>設計頁面1</div>
  <div>matrial ui</div>

  <div>qr code => chatbox</div>
</template>
