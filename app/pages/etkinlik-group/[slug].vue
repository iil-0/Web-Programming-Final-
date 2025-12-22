<template>
  <section class="egp">
    <nav class="breadcrumb">AİLE  ›  Theme Park  ›  {{ group?.title || 'Etkinlik' }}</nav>

    <h1 class="eg-title">{{ group?.title || 'Etkinlik Başlığı' }}</h1>

    <div class="hero-controls">
      <button class="share-btn" aria-label="Paylaş">
        <span class="share-icon">🔗</span>
        <span class="share-text">Paylaş</span>
      </button>
    </div>

    <div class="hero-wrap">
      <div class="hero" :style="{ width: heroWidth + 'px', height: heroHeight + 'px' }">
        
        <img v-if="group?.hero" :src="group.hero" alt="hero" class="hero-img" />
        <div v-else class="hero-placeholder"></div>
      </div>
    </div>

    <!-- Durum göstergeleri: yükleniyor veya hata mesajı -->
    <div>
      <div v-if="loading" class="debug">Yükleniyor...</div>
      <div v-else-if="error" class="debug error">Hata: {{ error?.message || 'Veri yüklenemedi' }}</div>
    </div>

    <!-- Üstte yatay sekme başlıkları  -->
    <nav class="page-tabs" aria-label="Etkinlik sekmeleri">
      <ul class="tab-list" role="tablist">
        <li :class="['tab', { active: activeTab === 'about' }]" role="tab" @click.prevent="goTo('about')">Etkinliğe Dair</li>
        <li :class="['tab', { active: activeTab === 'list' }]" role="tab" @click.prevent="goTo('list')">Etkinlik Takvimi</li>
        <li :class="['tab', { active: activeTab === 'rules' }]" role="tab" @click.prevent="goTo('rules')">Etkinlik Kuralları</li>
      </ul>
    </nav>

    <!-- Etkinliğe Dair  -->
    <section id="about" class="summary-row" v-if="group && group.title">
      <div class="left-col">
        <h2 class="section-title">Etkinliğe Dair</h2>
        <p class="lead-head">{{ group.shortIntro }}</p>

        <p class="lead-body">
          <span v-if="!showMore">{{ truncated }}...</span>
          <span v-else>{{ group.description }}</span>
        </p>

        <div>
          <button v-if="fullLength > truncatedLength && !showMore" class="more-btn" @click="toggleMore">Daha fazla göster</button>
          <button v-else-if="fullLength > truncatedLength" class="more-btn" @click="toggleMore">Daha az göster</button>
        </div>
      </div>

      <aside class="right-col">
        <div class="ticket-box" aria-hidden="true"></div>
      </aside>
    </section>

    <!-- Etkinlik Takvimi (list) - Etkinliğe Dair bölümünün hemen altında -->
    <section id="list" class="list-section" v-if="group">
      <h2 class="section-title">Etkinlik Takvimi</h2>
      <div class="list-controls">
        <button :class="['control-btn', { active: viewMode === 'list' }]" @click="viewMode = 'list'">Liste</button>
        <button :class="['control-btn', { active: viewMode === 'calendar' }]" @click="viewMode = 'calendar'">Takvim</button>
      </div>

      <div class="list-body">
        <EventList v-if="viewMode === 'list' && performances.length" :events="performances" :hideTitle="true" />
        <div v-else-if="viewMode === 'list'" class="empty">Etkinlik bulunamadı.</div>
        <div v-else class="calendar-placeholder">Takvim görünümü yakında (placeholder)</div>
      </div>
    </section>

    <!-- Etkinlik Kuralları (rules) -->
    <section id="rules" class="rules-section" v-if="group">
      <h2 class="section-title">Etkinlik Kuralları</h2>
      <div class="rules-body">
        <p v-if="group.rules" class="lead-body" v-html="group.rules"></p>
        <p v-else class="lead-body">{{ group.legal }}</p>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventGroupStore } from '~/stores/eventGroup'
import { usePerformanceStore } from '~/stores/performance'
import { storeToRefs } from 'pinia'

definePageMeta({ layout: 'event-group' })

// Store'ları kullan
const eventGroupStore = useEventGroupStore()
const performanceStore = usePerformanceStore()

// Store'dan reactive referansları al
const { current: group, loading, error } = storeToRefs(eventGroupStore)
const { list: performances } = storeToRefs(performanceStore)

// Router
const route = useRoute()
const slug = computed(() => String(route.params.slug || 'astralumina-istanbul'))

// Veri yükleme fonksiyonu
async function loadData(slugValue: string) {
  await eventGroupStore.fetchBySlug(slugValue)
  await performanceStore.fetchByEventGroupSlug(slugValue)
}

// Metin kısaltma
const showMore = ref(false)
const truncatedLength = 260
const fullLength = computed(() => (group.value?.description || '').length)
const truncated = computed(() => (group.value?.description || '').slice(0, truncatedLength))
function toggleMore() { showMore.value = !showMore.value }

// Tab ve view mode
const activeTab = ref('about')
const viewMode = ref('list')

function goTo(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeTab.value = sectionId
  }
}

const heroWidth = 1220
const heroHeight = 344

// Sayfa yüklendiğinde veriyi çek
onMounted(() => { loadData(slug.value) })

// Slug değiştiğinde yeniden yükle
watch(slug, (next) => {
  if (next) {
    loadData(next)
    activeTab.value = 'about'
    viewMode.value = 'list'
  }
})
</script>

<style scoped>
.egp{ padding: 28px 0; font-family: 'Poppins', system-ui, Arial, sans-serif; }
.breadcrumb{ color:#6b7280; font-size:13px; margin-bottom:12px }
.eg-title{ font-size:32px; margin:8px 0 18px; color:#0b326a; font-weight:500 }
.hero-wrap{ display:flex; justify-content:center; margin-bottom:20px }
.hero{ position:relative; border-radius:12px; overflow:hidden; background:#eee }
.hero-img{ width:100%; height:100%; object-fit:cover; object-position:center; display:block }
.hero-controls{ max-width:1260px; margin:0 auto 12px; display:flex; justify-content:flex-end }
.share-btn{ background:#fff; border:1px solid #d1d5db; width:102px; height:38px; padding:0 12px; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:8px }
.share-icon{ color:#0b66d1; font-size:16px; line-height:1 }
.share-text{ color:#0b66d1; font-weight:600; font-size:14px }
.summary-row{ display:flex; gap:24px; align-items:flex-start; max-width:1260px; margin:0 auto 18px }
.left-col{ flex:1 }
.right-col{ width:320px }
.ticket-box{ width:320px; height:56px; border-radius:10px; background:#fff; border:1px solid #eee }
.more-btn{ background:none; border:none; color:#026cdf; cursor:pointer; padding:6px 0; font-size:16px }
.lead-head{ font-weight:700; margin-bottom:8px; font-size:14px; text-transform:uppercase; color:#0b1111 }
.lead-body{ margin-bottom:8px; font-size:14px; white-space:pre-line; color:#374151 }
.legal{ max-width:1260px; margin:12px auto 0; color:#6b7280; font-size:14px }
.legal-main{ font-weight:600; font-size:14px }

/* Page tabs */
.page-tabs{ max-width:1260px; margin:0 auto 12px }
.tab-list{ display:flex; gap:24px; list-style:none; padding:0; margin:0; border-bottom:1px solid #e6e6e6 }
.tab{ padding:12px 0; cursor:pointer; color:#6b7280 }
.tab.active{ color:#0b66d1; border-bottom:3px solid #0b66d1; font-weight:600 }
.section-title{ font-size:24px; margin:18px 0 12px; color:#262626; font-weight:600 }
.list-controls{ display:flex; gap:8px; margin-bottom:16px }
.control-btn{ background:#fff; border:1px solid #e5e7eb; padding:8px 14px; border-radius:6px; cursor:pointer }
.control-btn.active{ background:#0b66d1; color:#fff; border-color:#0b66d1 }
.calendar-placeholder{ padding:24px; border:1px dashed #e5e7eb; color:#6b7280; border-radius:8px }
.empty{ color:#6b7280; padding:12px 0 }

/* Responsive davranış: küçük ekranlarda hero genişliğini yüzdeye çeviriyoruz */
@media (max-width:1280px){
  .hero{ width:100% !important }
  .summary-row{ padding:0 16px }
}
</style>
