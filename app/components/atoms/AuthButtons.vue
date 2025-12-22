<template>
  <div id="loginbutright">
    <a href="https://www.biletix.com/auth/TURKIYE/tr/login">
      <button
        :id="btnId"
        :class="btnClass"
      ></button>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  btnId: { type: String, default: "main-control-login" },
  btnClass: { type: String, default: "mainheader__control--login" },
});
</script>
