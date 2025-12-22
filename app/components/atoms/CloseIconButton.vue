<template>
  <button class="close-atom" :aria-label="ariaLabel" @click="$emit('click')" type="button">
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L18 18" :stroke="color" stroke-width="strokeWidth" stroke-linecap="round"/>
      <path d="M18 6L6 18" :stroke="color" stroke-width="strokeWidth" stroke-linecap="round"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  ariaLabel: { type: String, default: 'Kapat' },
  size: { type: [Number, String], default: 30 },
  color: { type: String, default: '#026CDF' },
  strokeWidth: { type: [Number, String], default: 3 }
})
</script>

<style scoped>
.close-atom{ background:transparent; border:none; padding:0; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; width:30px; height:30px }
.close-atom svg{ display:block }
</style>
