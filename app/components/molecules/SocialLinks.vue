<template>
  <ul class="socials">
    <li v-for="(p, i) in platforms" :key="i">
      <SocialIcon :href="p.href" :src="p.src" :title="p.title" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import SocialIcon from '~/components/atoms/SocialIcon.vue'
const props = defineProps({
  platforms: { type: Array, default: () => [] }
});
</script>

<style scoped>
.socials { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
</style>
