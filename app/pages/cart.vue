<template>
  <section class="cart-page">
    <div class="cart-stack">
      <!-- TOP AREA: either empty message or filled cart items -->
      <div v-if="!items.length" class="cart-empty card">
        <img class="empty-icon" :src="basketImg" alt="Sepet" />
        <h2 class="empty-title">Henüz bilet seçmediniz.</h2>
        <p class="empty-sub">Hemen bilet seçebilirsiniz.</p>
      </div>
      <div v-else class="cart-columns">
        <div class="cart-left">
        <!-- Header when cart has items -->
        <div class="cart-header filled">
          <div class="header-left">
            <div class="title-row">
              <h1 class="cart-title">Sepetim</h1>
              <span class="ticket-count">{{ count }} Bilet</span>
            </div>
            <p class="reserved-note">Seçtiğin biletler geçici olarak senin için ayrıldı!</p>
          </div>
          <div class="header-right">
            <button class="btn-clear" @click="clear" aria-label="Sepeti Temizle">
              <span class="trash-icon" aria-hidden="true"></span>
              Sepeti Temizle
            </button>
          </div>
        </div>

          <div class="product-list">
            <div v-for="grp in groupedItems" :key="grp.key" class="cart-item card">
              <div class="item-main">
                <div class="item-top">
                  <div class="image-col">
                    <img v-if="grp.head.image" :src="grp.head.image" alt="Etkinlik" class="item-img" />
                    <div v-else class="item-img placeholder"></div>
                    <div class="badge">x{{ grp.totalQty }}</div>
                  </div>
                  <div class="detail-col">
                    <h2 class="item-title">{{ resolveItemTitle(grp.head) }}</h2>
                    <div class="meta-line">
                      <span class="meta-date">{{ grp.head.day }} {{ grp.head.month }} • {{ grp.head.time }}</span>
                      <span class="meta-venue">• {{ grp.head.venue }}</span>
                    </div>
                  </div>
                  <div class="price-col">
                    <div class="actions-top">
                      <button class="remove-btn group-remove" @click="removeGroup(grp)" aria-label="Kaldır">
                        <span class="trash-icon" aria-hidden="true"></span>
                        Kaldır
                      </button>
                    </div>
                    <div class="price-lines compact">
                      <div class="price-main">{{ formatPrice(grp.totalUnit) }}</div>
                      <div class="service-fee">Hizmet Bedeli: <span>{{ formatPrice(grp.totalFee) }}</span></div>
                    </div>
                  </div>
                </div>
                <div class="seat-box">
                  <h3 class="seat-title">Koltuk Numaraları ({{ grp.totalQty }})</h3>
                  <div class="seat-body">
                    <div v-for="it in grp.items" :key="it.id" class="seat-entry">
                      <strong> Tam(x{{ it.qty }})</strong>
                      <div class="seat-detail">Bölüm/Blok: <span class="muted">{{ it.block || '-' }}</span></div>
                      <div class="seat-detail"><span class="icon">🪑</span> Sıra: <span class="muted">{{ it.row || '' }}</span> Koltuk: <span class="muted">{{ it.seat || '' }}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside class="cart-right">
          <div class="checkout-card card">
            <div class="checkout-title">ÖDENECEK TUTAR</div>
            <div class="checkout-total">{{ formatPrice(totalPrice) }}</div>
            <button class="confirm-btn">Sepeti Onayla</button>
            <a class="continue-link" href="/">Alışverişe Devam Et</a>
            <div class="checkout-lines">
              <div class="line"><span>Sipariş Bedeli</span><span>{{ formatPrice(orderFee) }}</span></div>
              <div class="line"><span>Biletler ({{ count }} Adet)</span><span>{{ formatPrice(totalPrice) }}</span></div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Divider & campaigns only when empty -->
      <div v-if="!items.length" class="stack-divider" aria-hidden="true"></div>
      <div v-if="!items.length" class="campaigns card">
        <h3 class="campaigns-heading">Önerilen Kampanyalar</h3>
        <div class="campaigns-grid">
          <router-link v-for="(c, i) in campaigns" :key="i" :to="c.to" class="campaign-item">
            <div class="campaign-media">
              <img :src="c.img" :alt="c.caption" />
            </div>
            <div class="campaign-caption">{{ c.caption }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSepetStore } from '~/stores/sepet'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { computed, onMounted, watch } from 'vue'
import BasketImg from '~/assets/images/BlackShoppingbasket42.png'
import Camp1Img from '~/assets/spotlight/CARTICIN25YILKAMPANYA.png'
import Camp2Img from '~/assets/spotlight/hopikampanya.png'

const basketImg = BasketImg
const camp1 = Camp1Img
const camp2 = Camp2Img

// Pinia store'ları
const sepetStore = useSepetStore()
const userStore = useUserStore()
const { items, count, totalPrice, loading } = storeToRefs(sepetStore)
const { current: currentUser, loading: loadingUser } = storeToRefs(userStore)
const { remove, clear, load } = sepetStore

// Auth listener'ı başlat
onMounted(() => {
  userStore.initAuthListener()
})

// Auth hazır olduğunda sepeti yükle
watch(loadingUser, (isLoading) => {
  if (!isLoading) {
    // Auth yüklendi, şimdi sepeti yükle
    load(currentUser.value?.uid)
  }
}, { immediate: true })

const orderFee = 12.5

function resolveItemTitle(it){
  const categoryLike = /Kategori|₺|TL|TRY|\d+\.\s*Kategori/i
  // Highest priority: eventName
  if(it.eventName && !categoryLike.test(it.eventName)) return it.eventName
  if(it.saleTitle && !categoryLike.test(it.saleTitle)) return it.saleTitle
  if(it.title && !categoryLike.test(it.title)) return it.title
  if(it.name && !categoryLike.test(it.name)) return it.name
  // Fallback: if all names look category-like, still show eventName/saleTitle if exists
  if(it.eventName) return it.eventName
  if(it.saleTitle) return it.saleTitle
  return 'Etkinlik'
}

// Group same-event tickets (artist + date + time + venue)
const groupedItems = computed(() => {
  const map: Record<string, any> = {}
  items.value.forEach(it => {
    const key = [it.eventName || it.saleTitle || it.title || it.name || 'Etkinlik', it.day, it.month, it.time, it.venue].join('|')
    if(!map[key]){
      map[key] = { key, head: it, items: [], totalQty:0, totalUnit:0, totalFee:0, totalSum:0 }
    }
    map[key].items.push(it)
    const qty = it.qty || 1
    map[key].totalQty += qty
    map[key].totalUnit += (it.unitPrice || 0) * qty
    map[key].totalFee += (it.serviceFee || 0) * qty
    map[key].totalSum += ((it.unitPrice || 0)+(it.serviceFee || 0)) * qty
  })
  return Object.values(map)
})
// campaigns array: `to` are placeholder routes — update when real targets are available
const campaigns = [
  { img: camp1, caption: '25. Yıl Kampanyası', to: '/kampanya/25' },
  { img: camp2, caption: 'Hopi Kampanyalı Etkinlikler', to: '/kampanya/hopi' }
]
function formatPrice(v){ return (v||0).toLocaleString('tr-TR',{ style:'currency', currency:'TRY' }) }
function removeGroup(grp){ grp.items.forEach(it => remove(it.id)) }

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.cart-page{ display:block; font-family:'Poppins',system-ui,Arial,sans-serif; background:#ffffff; min-height:100vh; color:#111827; }
.cart-page *{ font-family:'Poppins',system-ui,Arial,sans-serif; }
.card{ background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; padding:28px; box-sizing:border-box; margin:0 auto; max-width:1180px; width:100%; }
/* Empty cart */
.cart-empty{ text-align:center; padding:24px; max-width:1180px; height:350px; box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; margin:0 auto }
.empty-icon{ width:60px; height:60px; display:block; margin:0 auto 18px; }
.empty-title{ font-size:20px; margin:0 0 8px; color:#111827; font-weight:600; }
.empty-sub{ font-size:14px; margin:0; color:#6b7280; }
/* Campaigns */
.campaigns-heading{ font-size:16px; margin:0 0 12px; color:#111827; padding-left:6px; }
.campaigns.card{ padding:12px; height:427px; background:#ffffff; border:1px solid #e5e7eb; border-radius:10px; max-width:1180px; margin:0 auto }
.campaigns-grid{ display:flex; gap:20px; justify-content:center; flex-direction:row; align-items:center; width:100%; height:calc(427px - 48px); }
.campaign-item{ background:#ffffff; border-radius:6px; overflow:visible; text-align:left; flex:0 0 auto; width:548px; text-decoration:none; color:inherit; display:block; }
.campaign-media{ width:548px; height:303px; background:#f5f5f5; border-radius:6px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.campaign-media img{ max-width:100%; max-height:100%; object-fit:contain; display:block; }
.campaign-caption{ padding:10px 12px; font-size:16px; color:#111827; }
@media (max-width:1000px){ .campaigns-grid{ flex-direction:column; width:100%; height:auto; } .campaign-item{ width:100%; } .campaign-item img{ width:100%; height:auto; aspect-ratio:548/303; } }
/* Stack wrapper */
.cart-stack{ display:flex; flex-direction:column; align-items:center; }
.stack-divider{ width:1220px; height:1px; background:#e6e6e6; margin:2px 0; }
/* Filled cart styles */
.cart-header.filled{ display:flex; justify-content:space-between; align-items:flex-start; max-width:1180px; margin:0 auto 18px; box-sizing:border-box; }
.header-left{ display:flex; flex-direction:column; gap:8px; }
.title-row{ display:flex; align-items:center; gap:12px; }
.cart-title{ font-size:32px; margin:0; font-weight:600; color:#111827; }
.ticket-count{ font-size:16px; color:#374151; }
.reserved-note{ color:#6b7280; margin:6px 0 0; font-size:14px; }
.header-right{ display:flex; align-items:flex-start; margin-top:36px; }
.btn-clear{ background:transparent; color:#0b66d1; border:none; cursor:pointer; font-weight:600; font-size:16px; display:inline-flex; align-items:center; gap:8px; padding:4px 0; }
.btn-clear:hover{ text-decoration:underline; }
.trash-icon{ width:16px; height:16px; display:inline-block; background-repeat:no-repeat; background-size:16px 16px; background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%230b66d1' viewBox='0 0 16 16'><path d='M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Zm2 .5a.5.5 0 0 1 .5-.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z'/><path d='M14 3a1 1 0 0 1-1 1h-1v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4H3a1 1 0 0 1 0-2h3.5l.276-.553A1 1 0 0 1 7.618 1h.764a1 1 0 0 1 .842.447L9.5 2H13a1 1 0 0 1 1 1ZM5 4v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4H5Z'/></svg>"); }
.product-list{ display:flex; flex-direction:column; gap:18px; }
.cart-item.card{ padding:18px 0; border-radius:0; background:transparent; border:none; }
.item-main{ flex:1 1 auto; display:flex; flex-direction:column; gap:14px; width:919px; max-width:919px; }
.item-top{ display:flex; gap:20px; align-items:flex-start; width:100%; }
.image-col{ position:relative; flex:0 0 232px; }
.item-img{ width:232px; height:130px; object-fit:cover; border-radius:8px; background:#f3f4f6; }
.badge{ position:absolute; right:6px; bottom:6px; background:#e11d48; color:#fff; padding:6px 8px; border-radius:999px; font-weight:700; font-size:13px; }
.detail-col{ flex:1 1 auto; display:flex; flex-direction:column; gap:6px; }
.item-title{ font-size:18px; font-weight:500; margin:0; color:#0b1111; }
.meta-line{ display:flex; gap:8px; align-items:center; color:#374151; font-size:12px; }
.meta-date{ display:inline; }
.meta-venue{ color:#6b7280; }
.price-col{ flex:0 0 240px; display:flex; flex-direction:column; align-items:flex-end; gap:10px; }
.actions-top{ width:100%; display:flex; justify-content:flex-end; }
.price-lines{ display:flex; flex-direction:column; gap:6px; width:100%; }
.price-lines.compact{ align-items:flex-end; }
.price-main{ font-size:20px; font-weight:600; color:#0b1111; }
.service-fee{ font-size:13px; color:#374151; }
.line{ display:flex; justify-content:space-between; font-size:13px; color:#374151; }
.line.total{ font-weight:600; color:#0b1111; }
.actions{ display:flex; gap:8px; }
.remove-btn{ background:transparent; color:#dc2626; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:14px; font-weight:500; display:inline-flex; align-items:center; gap:6px; }
.remove-btn:hover{ text-decoration:underline; }
/* Red trash icon only for group remove button */
.group-remove .trash-icon{ background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23dc2626' viewBox='0 0 16 16'><path d='M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Zm2 .5a.5.5 0 0 1 .5-.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z'/><path d='M14 3a1 1 0 0 1-1 1h-1v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4H3a1 1 0 0 1 0-2h3.5l.276-.553A1 1 0 0 1 7.618 1h.764a1 1 0 0 1 .842.447L9.5 2H13a1 1 0 0 1 1 1ZM5 4v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4H5Z'/></svg>"); }
/* two-column layout */
.cart-columns{ display:flex; gap:28px; justify-content:center; align-items:flex-start; max-width:1267px; margin:0 auto; width:100%; }
.cart-left{ flex:1 1 72%; }
.cart-right{ flex:0 0 320px; }
.checkout-card{ padding:20px; border-radius:12px; width:320px; box-sizing:border-box; background:#ffffff; border:1px solid #e5e7eb; box-shadow:0 4px 12px rgba(0,0,0,0.08); }
.checkout-title{ margin-top:12px; font-size:13px; color:#111827; font-weight:600; }
.checkout-total{ margin-top:8px; font-size:22px; font-weight:700; color:#0b1111; }
.confirm-btn{ width:100%; background:#0b66d1; color:#fff; border:none; padding:12px 14px; border-radius:8px; margin-top:12px; cursor:pointer; font-size:16px; font-weight:600; }
.continue-link{ display:block; width:100%; text-align:center; padding:10px 12px; border-radius:8px; border:1px solid rgba(11,102,209,0.35); margin-top:8px; text-decoration:none; color:#0b66d1; }
.checkout-lines{ margin-top:12px; }
.checkout-lines .line{ display:flex; justify-content:space-between; color:#374151; padding:6px 0; }
/* seat box */
.seat-box{ margin:14px 0 22px; border:1px solid #b3dafe; background:#ffffff; padding:18px 22px; border-radius:6px; width:919px; max-width:919px; min-height:150px; box-sizing:border-box; display:flex; flex-direction:column; }
.seat-title{ color:#0b66d1; margin:0 0 12px; font-size:20px; font-weight:500; }
.seat-body{ flex:1; display:flex; flex-direction:column; justify-content:flex-start; gap:6px; font-size:14px; line-height:20px; color:#374151; }
.seat-body strong{ font-weight:500; }
.seat-detail{ font-size:14px; margin-top:8px; color:#374151; }
.muted{ color:#6b7280; }
@media (max-width:1000px){ .card{ width:100%; } .cart-item{ flex-direction:column; align-items:flex-start; } .price-col{ width:100%; align-items:flex-start; } }
</style>
