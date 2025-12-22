<template>
  <main class="perf" v-if="perf && group">

    <div class="hero-heading" v-if="perf || group">{{ (perf && perf.title) || group.title }}</div>
    <div class="perf-meta below-heading" v-if="perfDateInfo">
      <div class="left-meta">
        <span class="meta-icon" aria-hidden="true">🗓</span>
        <span class="date-text">{{ perfDateInfo.dateString }}</span>
        <span class="sep">•</span>
        <span class="time-text">{{ perf.time }}</span>
        <span class="sep">•</span>
        <span class="meta-icon" aria-hidden="true">📍</span>
        <span class="venue-text">{{ perf.venue }}</span>
      </div>
    </div>

    <div class="hero-controls lowered">
      <button class="share-btn" aria-label="Paylaş">
        <span class="share-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#026CDF" d="M18 8a3 3 0 1 0-2.83-3.99L8.91 8.58A3.02 3.02 0 0 0 7 8a3 3 0 0 0 0 6c.7 0 1.34-.24 1.85-.63l6.3 4.06A3 3 0 1 0 16 16a2.99 2.99 0 0 0-.17.56l-6.3-4.06A3.02 3.02 0 0 0 9 12a3 3 0 0 0-.91-2.17l6.26-4.06A3 3 0 0 0 18 8Z" />
          </svg>
        </span>
        <span class="share-text">Paylaş</span>
      </button>
    </div>

    <div class="hero-wrap">
      <img :src="group.hero" alt="hero" class="hero-img" />
      <OrderSummary ref="orderSummaryRef" :ticket="selectedTicket" @find-ticket="goTo('tickets')" @clear="handleClearSelection" />
    </div>

    <nav class="page-tabs" aria-label="Etkinlik sekmeleri">
      <ul class="tab-list" role="tablist">
        <li :class="['tab', { active: activeTab === 'tickets' } ]" role="tab" @click.prevent="goTo('tickets')">Biletler</li>
        <li :class="['tab', { active: activeTab === 'seating' } ]" role="tab" @click.prevent="goTo('seating')">Koltuk Seçimi</li>
        <li :class="['tab', { active: activeTab === 'about' } ]" role="tab" @click.prevent="goTo('about')">Etkinliğe Dair</li>
        <li :class="['tab', { active: activeTab === 'rules' } ]" role="tab" @click.prevent="goTo('rules')">Etkinlik Kuralları</li>
      </ul>
    </nav>

    <section id="seating" class="seating" v-if="group">
      <div class="seating-inner">
        <div class="seating-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#111111" d="M12 2.8a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM9.4 9.6 7 14.7c-.3.7 0 1.5.7 1.8.7.3 1.5 0 1.8-.7l1.4-2.9 2.2 1.7v3.4c0 .8.6 1.5 1.4 1.5.8 0 1.4-.7 1.4-1.5v-4c0-.5-.2-1-.7-1.4l-2.5-1.9.8-2.3 1.7.5c.7.2 1.5-.2 1.7-.9.2-.7-.2-1.5-.9-1.7l-2.7-.8c-.7-.2-1.4.2-1.7.9l-1.4 3.9Z" />
          </svg>
        </div>
        <div class="seating-text">
          <h3 class="seating-title">Ayakta</h3>
          <p class="lead-body">Etkinliğe katılım ayakta olup oturma düzeni bulunmamaktadır.</p>
        </div>
      </div>
    </section>
    <section id="tickets" class="tickets">
      <h2 class="tickets-title">Biletler</h2>
      <div class="selection-modes">
        <button type="button" class="mode-btn map" :class="{ inactive: true }" disabled>Harita Üzerinden Seçim</button>
        <button type="button" class="mode-btn auto active" aria-pressed="true">Otomatik Seçim</button>
      </div>
      <TicketSelection ref="ticketSelectionRef" :tickets="tickets" :eventTitle="(perf && perf.title) || group.title" @add-ticket="addTicket" @select-ticket="handleSelectTicket" />
    </section>

    <section id="about" class="about" v-if="group">
      <h2 class="section-title">Etkinliğe Dair</h2>

      <div class="event-time-infos">
        <div v-for="(it, idx) in infoItems" :key="idx" class="info-item">
          <div class="item-icon" aria-hidden="true">
            <template v-if="it.icon">
              <img :src="it.icon" alt="" class="icon-img" />
            </template>
            <template v-else>
              <span class="icon-glyph" :class="'icon-'+it.type">{{ it.type === 'time' ? '⏰' : (it.type === 'rule' ? '⚠️' : '') }}</span>
            </template>
          </div>
          <div class="item-content">
            <div class="info-item-title">{{ it.value }}</div>
            <div class="sub-title">{{ it.label }}</div>
          </div>
        </div>
      </div>

      <div class="about-paragraph">
        <p class="lead-body">{{ group.shortIntro }}</p>
      </div>
    </section>

    <section id="rules" class="rules" v-if="group">
      <h2 class="section-title">Etkinlik Kuralları</h2>
      <div class="rules-body">
        <p v-if="group.legal" class="lead-body">{{ group.legal }}</p>
      </div>
    </section>
  </main>
  <main v-else class="perf empty">
    <p>Etkinlik bilgisi bulunamadı.</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import type { Ref } from 'vue'
import calendarIcon from '~/assets/images/calendaricon.png'
import { useRoute } from 'vue-router'
import { usePerformanceStore } from '~/stores/performance'
import { useEventGroupStore } from '~/stores/eventGroup'
import { storeToRefs } from 'pinia'

definePageMeta({ layout: 'event-group' })

// Store'ları kullan
const performanceStore = usePerformanceStore()
const eventGroupStore = useEventGroupStore()

// Store'dan reactive referansları al
const { current: perf } = storeToRefs(performanceStore)
const { current: group } = storeToRefs(eventGroupStore)

const route = useRoute()
const id = String(route.params.id || '')
const selectedTicket = ref<any | null>(null)

const activeTab = ref<string>('tickets')

function goTo(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeTab.value = sectionId
  }
}

async function loadPerf() {
  const perfId = String(id)

  // Performance'ı Firestore'dan çek
  const foundPerf = await performanceStore.fetchById(perfId)

  if (foundPerf && foundPerf.eventGroupSlug) {
    // İlgili eventGroup'u da çek
    await eventGroupStore.fetchBySlug(foundPerf.eventGroupSlug)

    if (typeof document !== 'undefined') {
      document.title = `${foundPerf.title} | Biletix`
    }
  }
}

onMounted(() => { loadPerf() })
const orderSummaryRef: Ref<any | null> = ref(null)
const ticketSelectionRef: Ref<any | null> = ref(null)
let osInitialTop: number | null = null
let osInitialLeft: number | null = null
let osInitialWidth: number | null = null
function handleScroll(){
  if(!orderSummaryRef.value) return
  const el: any = orderSummaryRef.value && (orderSummaryRef.value.$el ? orderSummaryRef.value.$el : orderSummaryRef.value)
  if(osInitialTop == null){
    const r = el.getBoundingClientRect()
    osInitialTop = r.top + window.scrollY
    osInitialLeft = r.left
    osInitialWidth = r.width
  }
  const scrollY = window.scrollY
  if(osInitialTop != null && scrollY > osInitialTop - 20){
    if(!el.classList.contains('sticky-floating')){
      el.classList.add('sticky-floating')
      el.style.left = osInitialLeft + 'px'
      el.style.top = '20px'
      el.style.width = osInitialWidth + 'px'
    }
    let footerEl = null
    const footers = document.querySelectorAll('footer')
    if(footers && footers.length) footerEl = footers[footers.length - 1]
    if(!footerEl) footerEl = document.querySelector('.eg-footer, .bt-footer, .main-footer, .event-group-footer')
    if(footerEl){
      const footerTop = footerEl.getBoundingClientRect().top + window.scrollY
      const elHeight = el.offsetHeight
      const allowedTop = footerTop - scrollY - elHeight - 20
      if(allowedTop < 20){
        el.style.top = Math.max(allowedTop, 0) + 'px'
      } else {
        el.style.top = '20px'
      }
    }
  } else {
    if(el.classList.contains('sticky-floating')){
      el.classList.remove('sticky-floating')
      el.style.left = ''
      el.style.top = ''
      el.style.width = ''
    }
  }
}
onMounted(() => { window.addEventListener('scroll', handleScroll, { passive:true }) })
onBeforeUnmount(() => { window.removeEventListener('scroll', handleScroll) })

function handleClearSelection(){
  selectedTicket.value = null
  if(ticketSelectionRef.value && ticketSelectionRef.value.resetQtyOnly){
    try{ ticketSelectionRef.value.resetQtyOnly() }catch(e){}
  }
}

function addTicket(t: any){
  // Minimal implementation to satisfy template bindings.
  // Keeps behavior consistent with selecting a ticket.
  handleSelectTicket(t)
}
const weekdayNames = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi']
const monthMap = { 'Ocak':0,'Şubat':1,'Mart':2,'Nisan':3,'Mayıs':4,'Haziran':5,'Temmuz':6,'Ağustos':7,'Eylül':8,'Ekim':9,'Kasım':10,'Aralık':11 }
const perfDateInfo = computed(() => {
  if(!perf.value) return null
  const year = new Date().getFullYear()
  const dayNum = parseInt(String(perf.value.day || ''),10)
  const monthName = String(perf.value.month || '')
  const mi = (monthMap as Record<string, number | undefined>)[monthName]
  if(mi == null || isNaN(dayNum)) return { dateString: `${String(perf.value.day || '')} ${monthName} ${year}` }
  const d = new Date(year, mi, dayNum)
  const weekday = weekdayNames[d.getDay()]
  return { dateString: `${dayNum} ${monthName} ${year} ${weekday}` }
})

const tickets = computed(() => {
  if(!perf.value) return []
  return [
    { id: perf.value.id + '-genel', name: 'Genel Satış', price: 149.0, info: 'Standart giriş' },
    { id: perf.value.id + '-vip', name: 'VIP', price: 299.0, info: 'Ön sıra, sınırlı kontenjan' },
    { id: perf.value.id + '-cocuk', name: 'Çocuk', price: 99.0, info: '6–12 yaş arası' }
  ]
})

function handleSelectTicket(t: any){
  if(!t){ selectedTicket.value = null; return }
  selectedTicket.value = {
    saleTitle: t.name || 'GENEL SATIŞ',
    eventName: (perf.value?.title) || (group.value?.title) || t.name || 'Etkinlik',
    category: t.categoryLabel || 'Kategori',
    block: t.blockLabel || 'Bölüm / Blok',
    unitPrice: t.price,
    serviceFee: Math.round(t.price * 0.15),
    qty: t.qty || 1,
    day: perf.value?.day || '-',
    month: perf.value?.month || '-',
    time: perf.value?.time || '-',
    venue: perf.value?.venue || (group.value?.venue) || '-',
    image: group.value?.hero || null
  }
}

function formatPrice(v: number | null | undefined){
  return (v || 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
}

const infoItems = computed(() => {
  if(!perf.value) return []
  const year = new Date().getFullYear()
  return [
    { type:'date', icon: calendarIcon, value: `${perf.value.day} ${perf.value.month} ${year}`, label: 'ETKİNLİK BAŞLANGIÇ TARİHİ' },
    { type:'time', icon: null, value: perf.value.time || '-', label: 'ETKİNLİK BAŞLANGIÇ' },
    { type:'rule', icon: null, value: 'Hassas Kurallar', label: 'ETKİNLİK KURALı'.replace('KURALı','KURALI') }
  ]
})
</script>

<style scoped>
.perf{ max-width:1260px; margin:28px auto; font-family:'Poppins', system-ui, Arial, sans-serif }
.perf-meta{ max-width:1260px; margin:0 auto 12px }
.left-meta{ display:flex; align-items:center; gap:6px; font-size:12px; color:#262626; font-weight:400 }
.left-meta .date-text{ text-decoration:underline }
.left-meta .venue-text{ color:#026CDF; font-weight:500 }
.left-meta .meta-icon{ font-size:14px }
.left-meta .sep{ color:#262626 }
.hero-controls{ max-width:1220px; margin:0 auto 4px; display:flex; justify-content:flex-end }
.hero-controls.lowered{ margin-top:-4px; }
.hero-controls.lowered .share-btn{ transform: translate(18px, -6px); }
.share-btn{ background:#fff; border:1px solid #d1d5db; width:102px; height:38px; padding:0 12px; border-radius:8px; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:8px }
.hero-wrap{ margin-bottom:18px; position:relative }
.hero-img{ width:1260px; height:344px; object-fit:cover; border-radius:12px }
.hero-wrap > .order-summary{ position:absolute; top:366px; right:-30px; z-index:6 }
.hero-wrap > .order-summary.sticky-floating{ position:fixed !important; right:auto; z-index:60; }
.hero-wrap > .order-summary.sticky-floating{ box-shadow:0 12px 36px rgba(15,25,55,0.22), 0 3px 10px rgba(15,25,55,0.12); }
.hero-heading{ font-size:32px; color:#262626; font-weight:600; margin:6px 0 12px }
.hero-heading small{ display:block; font-size:14px; color:#6b7280; font-weight:500; margin-top:6px }
@media (max-width:920px){ .hero-heading{ font-size:22px } }
.page-tabs{ max-width:1220px; margin:12px auto; }
.tab-list{ display:flex; gap:24px; list-style:none; padding:0; margin:0; border-bottom:1px solid #e6e6e6 }
.tab{ padding:12px 0; cursor:pointer; color:#6b7280; font-size:16px }
.tab.active{ color:#0b66d1; border-bottom:3px solid #0b66d1; font-weight:600 }
.seating{ max-width:1220px; margin:18px auto; }
.seating-inner{ display:flex; gap:12px; align-items:flex-start }
.seating-icon{ font-size:22px }
.seating-title{ margin:0 0 6px; font-size:16px; color:#0b1111 }
.tickets{ margin-top:18px }
.tickets-title{ font-size:20px; margin-bottom:12px; color:#0b0b0b; font-weight:600 }
.selection-modes{ width:831px; height:52px; display:flex; margin:0 0 12px; border:1px solid #e4eaf0; border-radius:6px; overflow:hidden }
.mode-btn{ width:415px; height:52px; border:none; background:#ffffff; font-size:18px; color:#026CDF; font-weight:500; cursor:pointer; font-family:'Poppins', system-ui, Arial, sans-serif; }
.mode-btn.auto.active{ background:#e4eef9 }
.mode-btn.map.inactive{ cursor:default; opacity:0.9 }
.tickets-list{ display:flex; flex-direction:column; gap:12px }
.ticket-card{ display:flex; align-items:center; justify-content:space-between; background:#fff; border:1px solid rgba(15,23,42,0.06); border-radius:8px; padding:12px 16px }
.ticket-info{ display:flex; flex-direction:column }
.ticket-name{ font-weight:600; color:#0b1111 }
.ticket-desc{ color:#6b7280; font-size:13px }
.ticket-right{ display:flex; align-items:center; gap:12px }
.ticket-price{ font-weight:700; color:#0b326a }
.btn-add{ background:#0b66d1; color:#fff; border:none; padding:8px 12px; border-radius:6px; cursor:pointer }
.empty{ max-width:900px; margin:40px auto; color:#6b7280 }

.info-grid{ display:flex; flex-wrap:wrap; gap:28px; margin-top:24px }
.info-item{ width:260px; display:flex; flex-direction:column; gap:6px }
.info-title{ font-size:14px; color:#262626; font-weight:600 }
.info-title:empty{ display:none }
.info-sub{ font-size:11px; color:#6b7280 }

.event-time-infos{ display:flex; flex-wrap:nowrap; gap:48px; margin-top:12px }
.event-time-infos .info-item{ display:flex; flex-direction:row; align-items:flex-start; box-sizing:border-box }
.event-time-infos .item-icon{ width:32px; height:32px; border:1px solid #d1d5db; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-right:10px; flex-shrink:0 }
.event-time-infos .item-icon .icon-glyph{ font-size:18px; line-height:1; color:#0b326a }
.event-time-infos .item-icon .icon-img{ width:18px; height:18px; object-fit:contain }
.event-time-infos .item-content{ display:flex; flex-direction:column; gap:2px }
.event-time-infos .info-item-title{ font-size:14px; color:#0b1111; font-weight:600 }
.event-time-infos .sub-title{ font-size:11px; color:#6b7280; letter-spacing:.2px; font-weight:500 }
.about-paragraph{ margin-top:12px }
.about-paragraph .lead-body{ font-size:14px; line-height:20px }
.rules-body .lead-body{ font-size:14px; line-height:20px }

@media (max-width:920px){ .event-time-infos .info-item{ flex:1 1 100%; max-width:100% } }

@media (max-width:1280px){ .hero-img{ width:100% !important; height:260px } }
@media (max-width:920px){ .hero-img{ height:220px } .ticket-card{ flex-direction:column; align-items:flex-start } .ticket-right{ width:100%; justify-content:space-between } }
.about{ margin-top:18px }
.section-title{ font-size:20px; margin:12px 0; color:#0b0b0b; font-weight:600 }
.share-btn .share-text{ color:#026CDF; font-size:14px; font-weight:600 }
.share-icon{ display:inline-flex; align-items:center; justify-content:center }
.hero-controls{ margin-top:12px !important }
</style>
