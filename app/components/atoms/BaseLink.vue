<template>
  <a :href="href" class="navlink"><slot /></a>
</template>
<script setup lang="ts">
defineProps({ href: { type: String, required: true } });
</script>
<style scoped>
.navlink { text-decoration:none; color:#fff; font-weight:600; }
.navlink:hover { opacity:.9; }
</style>