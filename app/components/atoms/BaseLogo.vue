<template>
  <a :id="idAttr" :href="href" :class="classAttr" aria-label="Biletix">
    <img
      :src="src"
      :alt="alt"
      :class="imgClass"
      :width="width"
      :height="height"
    />
  </a>
</template>

<script setup lang="ts">
import LogoImg from '~/assets/images/logo.png'

const props = defineProps({
  idAttr: { type: String, default: "main-logo" },        // id="main-logo"
  classAttr: { type: String, default: "logo" },          // class="logo"
  imgClass: { type: String, default: "logo__media" },    // class="logo__media"
  href: { type: String, default: "/" },
  src: { type: String, default: LogoImg },
  alt: { type: String, default: "biletix" },
  width: { type: [Number, String], default: 495 },
  height: { type: [Number, String], default: 225 },
});
</script>

<style scoped>
/* Şu an boş bırakıyoruz, çünkü orijinal CSS zaten globalde var */
</style>
