<template>
  <section class="featured-section" aria-labelledby="featured-heading">
    <h2 id="featured-heading" class="heading">ÖNE ÇIKANLAR</h2>
    <FeaturedTilesSlider v-if="!loading && items.length" :items="items" />
    <div v-else class="loading">Yükleniyor…</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFeaturedStore } from '~/stores/featured'
import { storeToRefs } from 'pinia'

const featuredStore = useFeaturedStore()
const { items, loading } = storeToRefs(featuredStore)
const { fetchFeatured } = featuredStore
onMounted(fetchFeatured)
</script>

<style scoped>
.featured-section{ width:100%; display:flex; flex-direction:column; align-items:flex-start; gap:4px; }
.heading{ width:100%; max-width:1100px; margin: 0; padding-left: 0; margin-left: calc((100vw - 1100px) / 2 + 40px); font-size:18px; font-weight:600; color:#414141; font-family:'Poppins', system-ui, Arial, sans-serif; }
.loading{ padding: 12px 0; font-size: 14px; color: #6b7280; }
</style>
