<template>
  <section class="categories-dual" aria-label="Kategori vitrinleri">
    <div class="col">
      <h2 class="section-title" role="button" tabindex="0" @click="$emit('title-click','music')">MÜZİK</h2>
  <CategoryGrid :items="music" :columns="3" :rows="3" :gap="5" @select="(it)=>$emit('tile-click','music',it)" />
    </div>
    <div class="col">
      <h2 class="section-title" role="button" tabindex="0" @click="$emit('title-click','stage')">SAHNE</h2>
  <CategoryGrid :items="stage" :columns="2" :rows="3" :gap="5" @select="(it)=>$emit('tile-click','stage',it)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import CategoryGrid from '~/components/organisms/CategoryGrid.vue'
const props = defineProps({
  music: { type: Array, default: () => [] },
  stage: { type: Array, default: () => [] }
})
</script>

<style scoped>
.categories-dual{ width:100%; max-width:1100px; margin:0 auto; display:grid; grid-template-columns: 1fr; gap:24px; }
.col{ background:#fff; border:0; }
.section-title{ 
  margin:0 0 8px 0; padding:0; 
  font-family: 'Interstate', 'InterstateWGL', 'Poppins', system-ui, Arial, sans-serif;
  font-size:28px; line-height:30.8px; font-weight:400; letter-spacing:0.7px; 
  color:#414141; cursor:pointer;
}
.section-title:hover, .section-title:focus-visible{
  color:#009CDE;
  text-decoration: underline;
  text-decoration-color:#009CDE;
  text-decoration-thickness:1px;
  text-underline-offset:2px;
}
@media (min-width: 1100px){
  .categories-dual{ grid-template-columns: 1fr 1fr; gap:32px; }
}
</style>
