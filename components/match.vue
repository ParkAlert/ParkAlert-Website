<template>
  <div>
    <div class="wrapper">
      <div class="p-container mb-2" style="display: flex; justify-content: center; margin: 5px 0">
        <p style="font-size: 16px; font-weight: 600">掃描信箱</p>
      </div>
      <v-sheet class="mx-auto">
        <v-form @submit.prevent="btnClicked">
          <!-- <v-text-field
            v-model="email"
            clearable
            class="text-input"
            label="電子郵件"
            :rules="rule"
            variant="underlined"
          /> -->
          <div id="qrcode-scan">請允許攝影機權限</div>
          <!-- <v-btn type="submit" block class="mt-2">確認</v-btn> -->
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Html5Qrcode } from "html5-qrcode";
const emailData: any = useState("chatEmail", () => "");
const email = ref("");
const emit = defineEmits(["close"]);

const rule = ref([
  (value: any) => {
    if (value) {
      return true;
    }
    return "電子郵件不可以為空!";
  }
]);

const btnClicked = () => {
  emailData.value = email.value;
  if (email.value !== "") {
    emit("close", emailData.value);
  }
};

onMounted(async () => {
  let cameraId: any;
  const devices = await Html5Qrcode.getCameras();
  if (devices && devices.length) {
    cameraId = devices[0].id;
  }

  const html5QrCode = new Html5Qrcode("qrcode-scan");
  html5QrCode
    .start(
      cameraId,
      { fps: 10 },
      (decodedText, decodedResult) => {
        const tempUrl = decodedResult.result.text;
        const tempEmail = tempUrl.substring(tempUrl.indexOf("email=") + 6);
        html5QrCode.stop();
        emit("close", tempEmail);
      },
      (errorMessage) => {}
    )
    .catch((err) => {
      console.log(err);
    });
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 340px;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background: rgb(var(--v-theme-white));
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 40px;
  input {
    border: none;
  }
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
}

#qrcode-scan {
  min-height: 150px;
  width: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
