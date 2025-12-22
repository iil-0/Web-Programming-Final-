<template>
  <div class="category-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 180px)`, gap: gap + 'px' }">
    <CategoryTile v-for="(it, i) in visibleItems" :key="i" :image="it.image" :title="it.title" @select="$emit('select', it, i)" />
  </div>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CategoryTile from '~/components/molecules/CategoryTile.vue'
const props = defineProps({
  items: { type: Array, default: () => [] },
  columns: { type: Number, default: 3 },
  rows: { type: Number, default: 3 },
  gap: { type: Number, default: 12 }
})

const visibleItems = computed(() => props.items.slice(0, props.columns * props.rows))
</script>

<style scoped>
.category-grid{ display:grid; gap:12px; justify-content:flex-start; }
</style>
