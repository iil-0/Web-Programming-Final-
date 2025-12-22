import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { CategorySpotlightItem, StoreError } from '~/types/interfaces'

function toStoreError(e: unknown): StoreError {
  if (e instanceof Error) {
    return { code: (e as any).code, message: e.message }
  }
  return { message: String(e) }
}

export const useCategorySpotlightStore = defineStore('categorySpotlight', () => {
  const music = ref<CategorySpotlightItem[]>([])
  const stage = ref<CategorySpotlightItem[]>([])
  const loading = ref(true)
  const error = ref<StoreError | null>(null)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const col = collection($db as any, 'categorySpotlight')

      // Music items
      const musicQuery = query(col, where('category', '==', 'music'))
      const musicSnap = await getDocs(musicQuery)
      music.value = musicSnap.docs.map(d => ({ id: d.id, ...d.data() } as CategorySpotlightItem))

      // Stage items
      const stageQuery = query(col, where('category', '==', 'stage'))
      const stageSnap = await getDocs(stageQuery)
      stage.value = stageSnap.docs.map(d => ({ id: d.id, ...d.data() } as CategorySpotlightItem))
    } catch (err) {
      error.value = toStoreError(err)
      console.error('[categorySpotlight] Firestore okuma hatası:', err)
    } finally {
      loading.value = false
    }
  }

  return { music, stage, loading, error, fetchData }
})

