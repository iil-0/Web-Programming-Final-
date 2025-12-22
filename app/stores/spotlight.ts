import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { SpotlightItem, StoreError } from '~/types/interfaces'

function toStoreError(e: unknown): StoreError {
  if (e instanceof Error) {
    return { code: (e as any).code, message: e.message }
  }
  return { message: String(e) }
}

export const useSpotlightStore = defineStore('spotlight', () => {
  const items = ref<SpotlightItem[]>([])
  const loading = ref(false)
  const error = ref<StoreError | null>(null)

  async function fetchSpotlight() {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const col = collection($db as any, 'spotlight')
      const snap = await getDocs(col)
      items.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as SpotlightItem))
    } catch (e) {
      error.value = toStoreError(e)
      console.error('[spotlight] Firestore okuma hatası:', e)
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchSpotlight }
})

