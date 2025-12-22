// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  // Firebase config - environment variables'dan okunur
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID
    }
  },
  css: [
    // global style tokens and layout styles
    '~/styles/tokens.css',
    '~/styles/header.css',
    '~/styles/footer.css',
  ],
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/app/components', pathPrefix: false }
  ],
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    // support existing imports that reference '@/...'
    '@/components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@/composables': fileURLToPath(new URL('./app/composables', import.meta.url)),
    '@/stores': fileURLToPath(new URL('./app/stores', import.meta.url))
  }
  ,
  // Ensure Vite HMR uses a port unlikely to be in use on Windows
  vite: {
    server: {
      hmr: {
        port: 24688
      }
    }
  }
})
