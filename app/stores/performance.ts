import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import type { Performance, StoreError } from '~/types/interfaces'
import { useNuxtApp } from '#app'

function toStoreError(e: unknown): StoreError {
  if (e instanceof Error) {
    return { code: (e as any).code, message: e.message }
  }
  return { message: String(e) }
}

export const usePerformanceStore = defineStore('performance', () => {
  const list = ref<Performance[]>([])
  const current = ref<Performance | null>(null)
  const loading = ref(false)
  const error = ref<StoreError | null>(null)

  // Tüm performansları çek
  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const col = collection($db as any, 'performances')
      const snap = await getDocs(col)
      list.value = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Performance))
    } catch (e) {
      console.error('[performanceStore] fetchAll error:', e)
      error.value = toStoreError(e)
    } finally {
      loading.value = false
    }
  }

  // Belirli bir eventGroup'a ait performansları çek
  async function fetchByEventGroupSlug(slug: string): Promise<Performance[]> {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const col = collection($db as any, 'performances')
      const q = query(col, where('eventGroupSlug', '==', slug))
      const snap = await getDocs(q)
      const performances = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Performance))
      list.value = performances
      return performances
    } catch (e) {
      console.error('[performanceStore] fetchByEventGroupSlug error:', e)
      error.value = toStoreError(e)
      return []
    } finally {
      loading.value = false
    }
  }

  // Tek bir performansı ID ile çek
  async function fetchById(id: string): Promise<Performance | null> {
    if (!id) return null
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const docRef = doc($db as any, 'performances', id)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        const performance = { id: snap.id, ...(snap.data() as any) } as Performance
        current.value = performance
        return performance
      }
      return null
    } catch (e) {
      console.error('[performanceStore] fetchById error:', e)
      error.value = toStoreError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  return { list, current, loading, error, fetchAll, fetchByEventGroupSlug, fetchById }
})
