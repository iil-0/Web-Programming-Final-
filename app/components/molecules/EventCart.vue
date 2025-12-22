<template>
  <router-link class="eg-cart" to="/cart">
    <div class="icon-wrap">
      <img :src="img" alt="Sepetim" class="cart-icon" />
      <span class="cart-badge" aria-live="polite">{{ cartCount }}</span>
    </div>
    <div class="texts">
      <div class="title">Sepetim</div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useSepetStore } from '~/stores/sepet'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import CartImg from '~/assets/images/shoppingbasket23.png'

const img = CartImg
const sepetStore = useSepetStore()
const userStore = useUserStore()
const { count } = storeToRefs(sepetStore)
const { current: currentUser, loading: loadingUser } = storeToRefs(userStore)
const cartCount = computed(() => count.value)

// Auth listener'ı başlat
onMounted(() => {
  userStore.initAuthListener()
})

// Auth hazır olduğunda sepeti yükle (badge için)
watch(loadingUser, (isLoading) => {
  if (!isLoading) {
    sepetStore.load(currentUser.value?.uid)
  }
}, { immediate: true })
</script>

<style scoped>
.eg-cart{ display:flex; align-items:center; gap:8px; cursor:pointer; text-decoration:none; color:inherit; }
.icon-wrap{ position:relative; display:inline-flex; align-items:center; justify-content:center; background:transparent; border-radius:9999px; padding:0; }
.eg-cart .cart-icon{ width:24px; height:24px; display:block; object-fit:contain; }
.cart-badge{ position:absolute; top:-6px; right:-6px; min-width:18px; height:18px; padding:0 6px; border-radius:9px; background:#e31b23; color:#fff; font-size:12px; line-height:18px; text-align:center; box-shadow:0 1px 2px rgba(0,0,0,0.15); z-index:2 }
.eg-cart .title{ font-size:16px; color:#111827; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:400; }
@media (max-width: 768px){ .eg-cart .texts{ display:none; } }
</style>
