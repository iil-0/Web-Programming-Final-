<template>
  <a :href="href" class="store-badge" target="_blank" rel="noopener">
    <img
      :src="iconSrc"
      :alt="alt"
      loading="lazy"
      :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
    />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  platform: { type: String, required: true }, // 'apple' | 'android'
  href: { type: String, required: true },
  imgWidth: { type: [Number, String], default: 42 },
  imgHeight: { type: [Number, String], default: 43 }
});

import AppleIcon from '~/assets/images/AppleIcon.png'
import AndroidIcon from '~/assets/images/AndroidIcon.png'

const iconSrc = computed(() => (props.platform === 'apple' ? AppleIcon : AndroidIcon));
const alt = computed(() => (props.platform === 'apple' ? 'App Store' : 'Google Play'));
</script>

<style scoped>
.store-badge img { display:block; object-fit:contain; }
</style>
