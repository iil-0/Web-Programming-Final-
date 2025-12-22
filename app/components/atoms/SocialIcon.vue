<template>
  <a :href="href" class="social-icon" :title="title" target="_blank" rel="noopener">
    <img :src="src" :alt="alt || title" loading="eager" decoding="async" fetchpriority="high" width="42" height="43" />
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  href: { type: String, required: true },
  src:  { type: String, required: true },
  title:{ type: String, default: "" },
  alt:  { type: String, default: "" }
});
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 43px;
}
.social-icon img {
  width: 42px;
  height: 43px;
  display: block;
  object-fit: contain;
}
</style>
