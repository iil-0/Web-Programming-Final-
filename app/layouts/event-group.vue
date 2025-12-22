<template>
  <div :class="['event-layout', { 'cart-layout': isCart }]">
    <HeaderTopBar background-color="#0150A7" variant="event" />
    <EventGroupHeader />

    <main class="event-main">
      <slot />
    </main>

    <EventGroupFooter />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isCart = computed(() => route.name === 'cart')
</script>

<style scoped>
.event-layout{ min-height:100vh; display:flex; flex-direction:column; background:#ffffff; }
.event-main{ flex:1 0 auto; max-width:1220px; margin:16px auto; background:transparent; padding:0; box-sizing:border-box; border:none; }
.event-layout.cart-layout{ background:#ffffff; }
.event-layout.cart-layout .event-main{ background:#ffffff; }
</style>
