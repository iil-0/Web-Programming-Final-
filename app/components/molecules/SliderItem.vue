<template>
  <!-- SpotlightSlider ile aynı markup ve sınıflar: görünüm SpotlightSlider.css'den gelsin -->
  <div class="slide-card">
    <div class="slide-top">
      <img class="slide-image" :src="image" :alt="title" />
    </div>
    <div class="slide-bottom">
      <div class="slide-text">
        <div class="title">{{ title }}</div>
        <div class="text">{{ description }}</div>
      </div>
      <div class="slide-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" }
})
</script>

<!-- Bilerek stil yok: görünüm üst bileşenden (SpotlightSlider.vue) gelsin. -->
