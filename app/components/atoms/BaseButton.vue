<template>
<button :type="type" class="btn" :class="variant" @click="$emit('click')"><slot /></button>
</template>
<script setup lang="ts">
const props = defineProps({
type: { type: String, default: 'button' },
variant: { type: String, default: 'btn--ghost' },
});
</script>
<style scoped>
.btn { cursor:pointer; border:0; background:transparent; padding:.5rem .75rem; }
.btn--ghost { opacity:.95; }
</style>