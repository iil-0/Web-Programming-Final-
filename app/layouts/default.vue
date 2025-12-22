<template>
  <div class="page">
    <template v-if="isCart">
      <HeaderTopBar background-color="#0150A7" variant="event" />
      <EventGroupHeader />
    </template>
    <template v-else>
      <MainHeader />
    </template>
    <main class="page-main">
      <slot />
    </main>
    <EventGroupFooter v-if="isCart" />
    <MainFooter v-else />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import LogoImg from '~/assets/images/logo.png'
import IconUserImg from '~/assets/images/icon-user.png'
import IconSearchImg from '~/assets/images/icon-search.png'
import InstagramIconImg from '~/assets/images/InstagramIcon.png'
import FacebookIconImg from '~/assets/images/FacebookIcon.png'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

// Preload commonly used icons to reduce delayed rendering (use imported URLs)
useHead({
  link: [
    { rel: 'preload', as: 'image', href: LogoImg },
    { rel: 'preload', as: 'image', href: IconUserImg },
    { rel: 'preload', as: 'image', href: IconSearchImg },
    { rel: 'preload', as: 'image', href: InstagramIconImg },
    { rel: 'preload', as: 'image', href: FacebookIconImg }
  ]
})

const route = useRoute()
const isCart = computed(() => route.path === '/cart')
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header ve footer sabit, main esnek */
.page > *:not(main) {
  flex: 0 0 auto;
}

.page-main {
  flex: 1 0 auto;
  background: #f7f7f7;
  padding-bottom: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
</style>
