<template>
  <div class="ticket-selection-content">
    <div class="ticket-box" :class="{ hasTicket: hasSelection }">
      <TicketCategoryBar :key="barKey" @change="onChange" />

      <div class="ticket-body">
        <TicketStart v-if="!hasSelection" />

        <div v-else class="tickets-list">
          <div v-if="displayTicket" class="ticket-plain">
            <div class="ticket-left">
              <div class="ticket-type-line">
                <span class="ticket-kind">TAM</span>
                <span class="ticket-price">{{ formatPrice(displayTicket.price) }}</span>
              </div>
              <div class="fee-notes">
                <p class="note-line">Sepet başına ₺12,50 sipariş bedeli eklenir.</p>
                <p class="note-line">Kampanya ve indirimler, profil seçimine göre bilet fiyatına yansıtılır.</p>
              </div>
            </div>
            <div class="ticket-right-controls">
              <div class="quantity-strip" v-if="qty === 0">
                <button class="strip-btn select" @click.prevent="addSelected">Seç</button>
              </div>
              <div class="quantity-wrap" v-else>
                <div class="qty-rect">
                                <button class="circle-btn minus" @click.prevent="decrease" aria-label="Sil">
                                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M3 6h18v2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3V6zm5-3h8l1 2H7L8 3z" fill="#0B326A"/>
                                  </svg>
                                </button>

                  <div class="qty-content">
                    <span class="count">{{ qty }}</span>
                    <span class="unit">Adet</span>
                  </div>

                  <button class="circle-btn plus" @click.prevent="increase" aria-label="Arttır">
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2h5z" fill="#FFFFFF"/>
                      </svg>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TicketCategoryBar from '~/components/organisms/TicketCategoryBar.vue'
import TicketStart from '~/components/molecules/TicketStart.vue'

const props = defineProps({ tickets: { type: Array, default: () => [] }, eventTitle: { type: String, default: '' } })
const emit = defineEmits(['select-ticket'])

const selection = ref({ profile: '', category: '', block: '', profileLabel: '', categoryLabel: '', blockLabel: '', categoryPrice: null })
const barKey = ref(0)

function onChange(v){ selection.value = v }

// Only show ticket list after a category is selected
const hasSelection = computed(() => !!selection.value.category)

// Build a single ticket entry based on category selection
const displayTicket = computed(() => {
  if(!hasSelection.value) return null
  return {
    id: `cat-${selection.value.category}`,
    // prefer the provided eventTitle (artist/show) for cart display; fallback to category label
    name: props.eventTitle || selection.value.categoryLabel || 'Seçili Bilet',
    price: selection.value.categoryPrice || (props.tickets[0] && props.tickets[0].price) || 0,
    info: selection.value.profileLabel ? selection.value.profileLabel : '',
    categoryLabel: selection.value.categoryLabel || '',
    blockLabel: selection.value.blockLabel || ''
  }
})

const qty = ref(0)

function addSelected(){
  const t = displayTicket.value
  if(!t) return
  emit('select-ticket', { ...t, qty: 1 })
  qty.value = 1
}

function increase(){
  const next = qty.value + 1
  qty.value = next
  emit('select-ticket', { ...displayTicket.value, qty: next })
}

function decrease(){
  const next = qty.value - 1
  if(next <= 0){
    qty.value = 0
    emit('select-ticket', null)
  } else {
    qty.value = next
    emit('select-ticket', { ...displayTicket.value, qty: next })
  }
}

function formatPrice(v){ return (v || 0).toLocaleString('tr-TR', { style:'currency', currency:'TRY' }) }

function resetQtyOnly(){
  qty.value = 0
  // inform parent that there's no selected ticket in order summary
  emit('select-ticket', null)
}

function resetSelection(){
  selection.value = { profile: '', category: '', block: '', profileLabel: '', categoryLabel: '', blockLabel: '', categoryPrice: null }
  qty.value = 0
  // remount the category bar to reset its internal state
  barKey.value = barKey.value + 1
  emit('select-ticket', null)
}

// expose methods for parent control
defineExpose({ resetSelection, resetQtyOnly })
</script>

<style scoped>
.ticket-selection-content{ display:flex; flex-direction:column; gap:12px; margin:0 auto }
.ticket-box{ width:100%; max-width:831px; min-height:300px; background:#ffffff; border-radius:10px; padding:0 0 12px; box-sizing:border-box; border:1px solid #d1d5db; box-shadow:0 6px 20px rgba(11,102,209,0.08) }
.ticket-box.hasTicket{ height:214px; min-height:214px }
.ticket-body{ margin-top:8px; }
.tickets-list{ display:flex; flex-direction:column; gap:16px }
.ticket-plain{ padding:12px 24px 12px; display:flex; flex-direction:row; justify-content:space-between; align-items:flex-start; gap:24px }
.ticket-left{ display:flex; flex-direction:column; gap:10px }
.ticket-type-line{ display:flex; flex-direction:column; gap:4px }
.ticket-kind{ font-size:16px; font-weight:600; color:#0b1111 }
.ticket-price{ font-size:15px; font-weight:700; color:#0b326a }
.ticket-right-controls{ display:flex; align-items:center }
.quantity-strip{ display:flex; align-items:center; gap:12px }
.strip-btn.select{ width:113px; height:35px; background:#ffffff; color:#026CDF; border:1px solid #CFE6FF; font-size:13px; font-weight:600; border-radius:8px; padding:0; display:inline-flex; align-items:center; justify-content:center; cursor:pointer }
.circle-btn{ width:35px; height:35px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; border:none; z-index:3 }
.circle-btn.minus{ background:#ffffff; box-shadow:0 4px 8px rgba(11,102,209,0.04); border:1px solid rgba(11,50,106,0.10); position:absolute; left:1px; top:50%; transform:translateY(-50%); }
.circle-btn.plus{ background:#0b66d1; box-shadow:0 6px 14px rgba(11,102,209,0.12); color:#fff; position:absolute; right:1px; top:50%; transform:translateY(-50%); }
.qty-rect{ background:#EAF6FF; height:40px; width:130px; display:flex; align-items:center; justify-content:center; gap:8px; font-size:15px; color:#0b1111; border-radius:999px; position:relative; padding:0 48px; box-sizing:border-box }
.qty-rect .count{ font-weight:700 }
.qty-rect .unit{ font-size:13px }
.quantity-wrap{ display:flex; align-items:center; justify-content:center }
.qty-content{ display:flex; align-items:center; gap:8px }
.qty-content .count{ font-size:16px }

/* ensure category bar area fits the requested height and spacing */
.ticket-category-bar .category-wrapper{ padding:12px; border-radius:8px }
.fee-notes{ font-size:12px; line-height:16px; color:#646464; display:flex; flex-direction:column; gap:2px; max-width:460px }
.fee-notes .note-line{ margin:0 }

@media (max-width:920px){ .ticket-box{ width:100%; height:auto } .ticket-card{ flex-direction:column; align-items:flex-start } }
</style>
