<template>
  <!-- Unstyled atom: görünüm üst bileşenden gelsin -->
  <span v-bind="$attrs" role="button" tabindex="0" :aria-label="ariaLabel" @click="$emit('click')" @keydown.enter.prevent="$emit('click')">
    <img :src="src" alt="" />
  </span>

</template>

<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
  ariaLabel: { type: String, default: "" }
});
</script>

<!-- Stil yok; header.css gibi üst katmanlar boyut/çerçeve verir. -->
