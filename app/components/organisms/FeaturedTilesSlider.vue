<template>
  <div ref="rootEl" class="swiper featured-slider">
    <div class="swiper-wrapper">
      <div v-for="(it, idx) in normalized" :key="idx" class="swiper-slide">
        <FeaturedTile :image="it.image" :title="it.title" :subtitle="it.subtitle" />
        <!-- Tüm karo tıklanabilir olsun: href varsa üstten kaplayan link -->
        <a v-if="it.href" :href="it.href" class="tile-link-overlay" :aria-label="it.title"></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import Swiper from 'swiper'
import 'swiper/css'
import FeaturedTile from '~/components/molecules/FeaturedTile.vue'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

const normalized = computed(() => (props.items||[]).map(it => {
  const slug = it.slug || it.id || ''
  const href = slug ? `/etkinlik-group/${slug}` : (it.href || '')
  return { ...it, slug, href }
}))

const rootEl = ref(null)
let swiper
onMounted(() => {
  const el = rootEl.value
  if (!el) return
  swiper = new Swiper(el, {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 6,
    loop: false,
    breakpoints: {
      0: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 6 },
      640: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 6 },
      980: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 6 }
    }
  })
})

onBeforeUnmount(() => { if (swiper) swiper.destroy(true, true) })
</script>

<style scoped>
.featured-slider{
  width: 100%;
  max-width: 663px;
  box-sizing: border-box;
  padding: 0;
  position: relative;
  margin: 0 0 0 calc((100vw - 1100px) / 2 + 40px); /* Spotlight ile aynı sola hizalama ve başlığa daha yakın */
}
.featured-slider .swiper-slide{ position: relative; }
.tile-link-overlay{ position:absolute; inset:0; z-index:1; display:block; text-indent:-9999px; background:transparent; }
</style>
