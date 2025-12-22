<template>
  <div class="ticket-start">
    <div class="start-inner">
      <svg class="ticket-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7C3 6.44772 3.44772 6 4 6H6V8H4V18H20V8H18V6H20C20.5523 6 21 6.44772 21 7V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V7Z" fill="#DDEEFF"/>
        <path d="M8 9H16V11H8V9Z" fill="#BFDFFF"/>
      </svg>
      <p class="start-text">Bilet fiyatlarını görebilmek için kategori seçiniz.</p>
    </div>
    <div class="ticket-info">
      <p class="info-line">Sepet başına ₺12,50 sipariş bedeli eklenir.</p>
      <p class="info-line">Kampanya ve indirimler, profil seçimine göre bilet fiyatına yansıtılır.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.ticket-start{ background:#fff; border:1px solid rgba(15,23,42,0.06); border-radius:8px; padding:24px; display:flex; flex-direction:column; align-items:center; gap:12px }
.start-inner{ display:flex; flex-direction:column; align-items:center; gap:8px; padding:18px 0 }
.ticket-icon{ opacity:0.7 }
.start-text{ color:#6b7280; font-size:14px }
.ticket-info{ width:100%; border-top:1px solid #f1f5f9; padding-top:12px; color:#9aa4af; font-size:13px }
.info-line{ margin:4px 0 }
</style>
