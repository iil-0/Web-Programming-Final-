<template>
  <a :href="href || '#'" class="event-cat-card">
    <div class="thumb" :class="{ empty: !image }">
      <img v-if="image" :src="image" :alt="label" loading="lazy" />
    </div>
    <span class="label">{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  image: { type: String, default: '' },
  href: { type: String, default: '' }
})
</script>

<style scoped>
.event-cat-card{ display:flex; flex-direction:column; width:120px; text-decoration:none; color:#111827; background:#fff; border:1px solid #eaedf3; }
.thumb{ width:100%; aspect-ratio: 1.6/1; background:#f0f3f9; display:block; overflow:hidden; }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.label{ display:block; padding:6px 8px; font-size:13px; line-height:16px; color:#111827; }
.event-cat-card:hover .label{ color:#009CDE; text-decoration:underline; text-underline-offset:2px; }
</style>
