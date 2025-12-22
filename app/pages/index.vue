<template>
  <div class="page">
    <div class="home-panel">
      <!-- Spotlight (tekli slider) -->
      <SpotlightSection />

      <!-- Öne çıkanlar 4'lü karo slider -->
      <FeaturedSection />

      <!-- Kategori vitrinleri: MÜZİK | SAHNE -->
      <CategoriesDualSection v-if="!catLoading" :music="music" :stage="stage" @tile-click="onCategoryTile" @title-click="onCategoryTitle" />
      <div v-else class="loading-placeholder">Yükleniyor…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategorySpotlightStore } from '~/stores/categorySpotlight'
import { storeToRefs } from 'pinia'

definePageMeta({ layout: 'default' })

const categorySpotlightStore = useCategorySpotlightStore()
const { music, stage, loading: catLoading } = storeToRefs(categorySpotlightStore)
const { fetchData } = categorySpotlightStore

onMounted(fetchData)

function onCategoryTile(section: any, item: any){
  // İleride router.push ile yönlendirme yapılacak. Şimdilik boş.
}
function onCategoryTitle(section: any){
  // İleride ilgili kategori sayfasına yönlendirme yapılacak. Şimdilik boş.
}
</script>

<style scoped>
.page {
  /* Using layout, no need for full page styling here, just panel */
  width: 100%;
}

/* Centered white panel behind sliders */
.home-panel{
  width: 1000px;
  flex: 1 0 auto;    
  margin: 10px auto 0; 
  background: #ffffff;
  position: relative;
  padding-top: 12px;
  padding-bottom: 60px; 
}

:deep(.featured-section .heading){
  margin-left: 16px !important; 
}
:deep(.spotlight-slider){
  margin-left: 16px !important; 
}
:deep(.featured-slider){
  margin-left: 16px !important; 
}

.loading-placeholder{ padding: 12px 16px; color:#6b7280; font-size:14px; }

/* Kategori (MÜZİK | SAHNE) bloğunu panel içinde hafifçe sağa kaydır – taşmayı önlemek için genişliği telafi et */
:deep(.categories-dual){
  margin-left: 0 !important;
  padding-left: 15px;                  
  width: calc(100% - 15px) !important; 
  box-sizing: border-box;
  margin-top: 10px;                    
}
</style>
