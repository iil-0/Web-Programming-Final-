<template>
  <!-- Swiper v8+ container class is 'swiper' -->
  <div ref="rootEl" class="swiper spotlight-slider">
    <div class="swiper-wrapper">
      <div v-for="(s, i) in normalizedItems" :key="i" class="swiper-slide">
        <SliderItem :image="s.image" :title="s.title" :description="s.description">
          <template #actions>
            <a v-if="s.href" :href="s.href">
              <BaseButton class="btn-tickets">BİLETLER</BaseButton>
            </a>
            <BaseButton v-else class="btn-tickets">BİLETLER</BaseButton>
          </template>
        </SliderItem>
        <!-- Tüm karo tıklanabilir olsun: href varsa üstten kaplayan link -->
        <a v-if="s.href" :href="s.href" class="slide-link-overlay" :aria-label="s.title"></a>
      </div>
    </div>

    <div class="swiper-pagination"></div>
    <div class="swiper-button-next spotlightArrows"></div>
    <div class="swiper-button-prev spotlightArrows"></div>
  </div>
</template>

<script setup lang="ts">
// Script açıklaması:
// - props.items: slider'a verilecek öğelerin listesi
// - normalizedItems: farklı veri şekillerini (imageurl vs image, name vs title vs id) düzene sokar
// - Eğer bir öğede `slug` varsa, o öğe için `href` = `/etkinlik-group/${slug}` oluşturulur
// - Swiper instance'ı onMounted içinde başlatılır ve onBeforeUnmount'ta temizlenir
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SliderItem from '~/components/molecules/SliderItem.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

const props = defineProps({
  items: { type: Array, default: () => [] }
})

// root element for Swiper instance
const rootEl = ref(null)

// normalize: farklı alan adlarını (image/imageurl, name/title, text/description) tek şablona çevirir
const normalizedItems = computed(() =>
  (props.items || []).map(s => {
    const slug = s.slug || s.id || ''
    const href = slug ? `/etkinlik-group/${slug}` : (s.href || s.link || '')
    return {
      image: s.image || s.imageurl,
      title: s.title || s.name,
      description: s.description || s.text,
      href,
      slug
    }
  })
)

let swiper
onMounted(() => {
  const el = rootEl.value
  if (!el) return
  // Swiper başlangıcı: navigation, pagination ve autoplay ayarları verilir
  swiper = new Swiper(el, {
    modules: [Navigation, Pagination, Autoplay],
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: { delay: 4000, disableOnInteraction: false },
    loop: false
  })
})

onBeforeUnmount(() => {
  if (swiper) swiper.destroy(true, true)
})
</script>


<style scoped>
.spotlight-slider {
  width: 100%;
  max-width: 665px;
  height: 405px;
  margin: 24px 0 10px calc((100vw - 1100px) / 2 + 40px);
  transform: none;
  position: relative;
  background: #fff;
  color: #0b326a;
  box-sizing: border-box;
  border: 1px solid #eaedf3;
  /* ayarlanabilir küçük ofsetler */
  --text-shift-x: -20px; /* biraz daha sola */
  --text-shift-y: -4px; /* yukarı doğru */
}

@media (max-width: 1100px){
  .spotlight-slider{
    margin: 16px;
  }
}
.swiper-slide {
  width: 100%;
  max-width: 665px;
  height: 405px;
  background: transparent;
  border-radius: 0;
  overflow: hidden;
  position: relative;
}
.slide-card{ display:flex; flex-direction:column; width:100%; height:100%; background:#fff; }
.slide-top{ height:275px; overflow:hidden; }
.slide-image{ display:block; width:100%; height:100%; object-fit:cover; }
:deep(.slide-bottom){ height:130px; display:flex; align-items:flex-start; justify-content:flex-start; gap:12px; padding:4px 160px 16px 40px; border-top:1px solid rgba(11,50,106,0.06); background:#fff; position:relative; }
:deep(.slide-text){ max-width:100%; transform: translate(var(--text-shift-x), var(--text-shift-y)); }
/* Child component (SliderItem) içindeki öğeleri hedeflemek için deep kullan */
/* Başlık: 24px, Poppins Regular */
:deep(.slide-text .title){
  font-size:24px;
  font-weight:400;
  color:#0b326a;
  margin-bottom:1px; /* başlık ve metin daha yakın */
  font-family: 'Poppins', system-ui, Arial, sans-serif;
}
/* Alt yazı: 13px, Poppins Regular */
:deep(.slide-text .text){
  font-size:13px;
  color:rgba(11,50,106,0.85);
  line-height:1.22; /* satırlar daha sıkı */
  font-weight:400;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
}
:deep(.slide-actions){ position:absolute; right:20px; bottom:44px; display:flex; align-items:center; }
/* Overlay link'in üstünde kalsın */
:deep(.slide-actions){ z-index: 2; }
/* BaseButton çocuk bileşeninde – deep ile stillendir */
:deep(.btn-tickets){ 
  padding:12px 22px;
  border-radius:0;
  background:#00a0e6;
  color:#fff;
  border:0;
  cursor:pointer;
  display:inline-block;
  font-size:15px;
  line-height:1;
  min-height:40px;
  font-family:'Poppins', system-ui, Arial, sans-serif; /* Poppins regular */
  font-weight:400; /* regular */
  text-decoration:none; /* alttaki çizgiyi kaldır */
}
:deep(.btn-tickets:hover),
:deep(.btn-tickets:focus),
:deep(.btn-tickets:visited){
  color:#fff; text-decoration:none;
}
:deep(.slide-actions a){ text-decoration: none; }
.btn-tickets:hover,
.btn-tickets:focus,
.btn-tickets:visited {
  color:#fff;
  text-decoration:none; /* underline yok */
}
.btn-tickets:hover{ filter:brightness(0.98); }
.slide-link-overlay{ position:absolute; inset:0; z-index:1; display:block; text-indent:-9999px; background:transparent; }
.spotlightArrows { color: var(--btx-blue-2); }
.swiper-pagination-bullet { background:#0b326a; opacity:.35; }
.swiper-pagination-bullet-active { opacity:1; }
.swiper-pagination{
  text-align: left;
  left: 0;
  right: auto;
  width: 100%;
  padding-left: 12px;
}
</style>
