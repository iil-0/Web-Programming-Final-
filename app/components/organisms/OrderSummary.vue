<template>
  <div :class="['order-summary', { expanded: hasTicket }]" role="region" aria-label="Order summary">
    <div class="card-top"></div>

    <!-- Empty state -->
    <div v-if="!hasTicket" class="card-body empty">
      <svg class="ticket-svg" width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M21 7.5V6a2 2 0 0 0-2-2h-1.5" stroke="#8AAEF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 7.5V6a2 2 0 0 1 2-2h1.5" stroke="#8AAEF9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="3" y="7.5" width="18" height="9" rx="2" stroke="#CFE1FF" stroke-width="1.2" fill="none"/>
        <path d="M8 11h8" stroke="#8AAEF9" stroke-width="1.2" stroke-linecap="round"/>
      </svg>

      <div class="no-ticket-text">Henüz bilet seçmediniz.</div>
      <p class="no-ticket-desc">Hemen bilet seçebilirsiniz.</p>

      <button class="btn-find" @click="$emit('find-ticket')">Bilet Bul</button>
    </div>

    <!-- Selected ticket summary -->
    <div v-else class="card-body expanded-body">
      <div class="summary-header">
        <div class="summary-title">Biletler (1)</div>
        <div class="summary-total">{{ formatPrice(totalPrice) }}</div>
      </div>

      <div class="ticket-block">
        <div class="ticket-row top">
          <div class="ticket-main-title">{{ ticket.saleTitle }}</div>
          <div class="ticket-main-price">{{ formatPrice(totalPrice) }}</div>
        </div>

        <div class="ticket-row category-line">
          <span class="muted-label">Kategori</span>
          <button class="icon-trash" @click="$emit('clear')" aria-label="Seçimleri sıfırla">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="#EF4444" d="M9 3h6l1 2h5v2h-2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7H3V5h5l1-2Zm8 4H7v12h10V7Zm-8 2h2v8H9V9Zm4 0h2v8h-2V9Z" />
            </svg>
          </button>
        </div>

        <div class="ticket-row category-detail">
          <div class="category-main">{{ ticket.category }}</div>
          <div class="sub-label">Bölüm / Blok</div>
          <div class="block-main">{{ ticket.block }}</div>
        </div>

        <div class="ticket-row price-line">
          <div class="price-col">
            <div class="muted-label">Bilet Fiyatı</div>
            <div class="price-value">{{ formatPrice(ticket.unitPrice) }}x{{ ticket.qty }}</div>
          </div>
          <div class="price-col">
            <div class="muted-label">Hizmet Bedeli</div>
            <div class="price-value">{{ formatPrice(ticket.serviceFee) }}x{{ ticket.qty }}</div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="fee-row">
        <span>Sipariş Bedeli</span>
        <span>{{ formatPrice(orderFee) }}</span>
      </div>

      <div class="dots-row">
        <span v-for="n in 24" :key="n" class="dot"></span>
      </div>

      <div class="notes">
        <ul>
          <li>Bilet henüz sizin için rezerve edilmedi, seçiminizi değiştirebilirsiniz.</li>
          <li>Taksitli ödemede bankalara göre değişen vade farkı uygulanabilir.</li>
          <li>Bu sitede işlem yaparak Kullanım Koşulları'nı okumuş ve kabul etmiş sayılırsınız.</li>
        </ul>
      </div>

      <div class="summary-footer">
        <div class="total-line">
          <strong>Toplam Tutar</strong>
          <strong class="total-amount">{{ formatPrice(grandTotal) }}</strong>
        </div>
        <button class="btn-primary" @click="handleAddToCart">Sepete At</button>
        <button class="btn-secondary" @click="handleBuyNow">Hemen Al</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSepetStore } from '~/stores/sepet'
import { useRouter } from 'vue-router'
import type { CartItem } from '~/types/interfaces'

const props = defineProps({
  ticket: {
    type: Object,
    default: null
  }
})

const hasTicket = computed(() => !!props.ticket)

const totalPrice = computed(() => {
  if (!props.ticket) return 0
  return (props.ticket.unitPrice + props.ticket.serviceFee) * props.ticket.qty
})

const orderFee = computed(() => 12.5)
const grandTotal = computed(() => totalPrice.value + orderFee.value)

// Store'u kullan
const sepetStore = useSepetStore()
const router = useRouter()

async function handleAddToCart() {
  if (!props.ticket) return

  const cartItem: CartItem = {
    id: `perf-${props.ticket.saleTitle}-${props.ticket.block}-${Date.now()}`,
    performanceId: props.ticket.performanceId || '',
    eventName: props.ticket.eventName || props.ticket.saleTitle,
    saleTitle: props.ticket.saleTitle,
    price: props.ticket.unitPrice + props.ticket.serviceFee,
    quantity: props.ticket.qty || 1,
    qty: props.ticket.qty || 1,
    unitPrice: props.ticket.unitPrice,
    serviceFee: props.ticket.serviceFee,
    day: props.ticket.day,
    month: props.ticket.month,
    time: props.ticket.time,
    venue: props.ticket.venue,
    image: props.ticket.image || null,
    block: props.ticket.block
  }

  await sepetStore.add(cartItem)
  router.push('/cart')
}

function handleBuyNow() {
  router.push('/auth/login')
}

function formatPrice(v: number | null | undefined) {
  return (v || 0).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
}
</script>

<style scoped>
.order-summary{ width:388px; height:191px; box-sizing:border-box; border-radius:12px; overflow:hidden; background:#fff; box-shadow:0 10px 32px rgba(15,25,55,0.16), 0 2px 6px rgba(15,25,55,0.10); display:flex; flex-direction:column; transition:height .25s ease }
.order-summary.expanded{ height:676px }
.card-top{ height:34px; background:linear-gradient(90deg,#026CDF 0%,#4f7bff 50%,#8b5cf6 100%); border-bottom:6px solid #fff }
.card-body{ padding:16px 20px; display:flex; flex-direction:column }
.card-body.empty{ align-items:center; justify-content:center; gap:8px }
.ticket-svg{ opacity:0.9 }
.no-ticket-text{ font-weight:700; color:#111; font-size:14px }
.no-ticket-desc{ color:#6b7280; font-size:12px; margin:0 }
.btn-find{ margin-top:6px; width:90%; background:#fff; color:#0b66d1; border:1px solid rgba(11,102,209,0.12); padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer; font-size:16px }

.expanded-body{ gap:8px }
.summary-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px }
.summary-title{ font-size:22px; font-weight:700 }
.summary-total{ font-weight:700; color:#0b326a }

.ticket-block{ padding-left:18px; border-left:3px solid #111; margin-bottom:12px }
.ticket-row{ margin-bottom:2px }
.ticket-main-title{ font-weight:700; text-transform:uppercase }
.ticket-main-price{ font-weight:700; }
.category-line{ display:flex; justify-content:space-between; align-items:center; margin-top:8px }
.muted-label{ font-size:14px; color:#6b7280 }
.icon-trash{ background:none; border:none; color:#ef4444; cursor:pointer; font-size:18px }
.category-detail .category-main{ font-weight:700; margin-top:4px }
.sub-label{ font-size:13px; color:#6b7280; margin-top:4px }
.block-main{ font-weight:600; margin-top:2px }

.price-line{ display:flex; gap:32px; margin-top:6px }
.price-col{ display:flex; flex-direction:column }
.price-value{ font-weight:600 }

.divider{ border-bottom:1px solid #e5e7eb; margin:10px 0 }
.fee-row{ display:flex; justify-content:space-between; margin-bottom:6px }

.dots-row{ display:flex; gap:4px; margin-bottom:6px }
.dot{ width:6px; height:6px; border-radius:999px; background:#e5e7eb }

.notes{ font-size:13px; color:#6b7280; margin-bottom:8px }
.notes ul{ margin:0; padding-left:18px }

.summary-footer{ margin-top:auto; display:flex; flex-direction:column; gap:8px; align-items:center }
.total-line{ width:100%; display:flex; justify-content:space-between; font-size:18px }
.total-amount{ font-weight:700 }
.btn-primary{ width:358px; height:45px; background:#006be6; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:700 }
.btn-secondary{ width:358px; height:45px; margin-top:4px; background:#fff; color:#006be6; border:1px solid rgba(0,107,230,0.35); border-radius:8px; cursor:pointer; font-weight:600 }

@media (max-width:920px){ .order-summary{ width:320px } .btn-continue{ width:300px } }
</style>
