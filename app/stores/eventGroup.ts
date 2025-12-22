import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EventGroup, StoreError } from '~/types/interfaces'
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import { useNuxtApp } from '#app'

function toStoreError(e: unknown): StoreError {
  if (e instanceof Error) {
    return { code: (e as any).code, message: e.message }
  }
  return { message: String(e) }
}

// Hero görsellerini slug'a göre eşleştiren map
import astraspot from '~/assets/spotlight/astraspot.png'
import donkisotspot from '~/assets/spotlight/donkisotspott.png'
import yil25spot from '~/assets/spotlight/25yilindirimlerispotgors.png'
import atlantisspot from '~/assets/spotlight/atlantisspot.png'
import blindspot from '~/assets/spotlight/blindspot.png'
import harbyespot from '~/assets/spotlight/harbyeackspot.png'
import hiraispot from '~/assets/spotlight/hiraispot.png'
import karsuspot from '~/assets/spotlight/karsuspot.png'

const heroImages: Record<string, string> = {
  'astralumina-istanbul': astraspot,
  'don-kisot': donkisotspot,
  '25-yil-kampanyasi': yil25spot,
  'paribu-harbiye-konserleri': atlantisspot,
  'blind-istanbul': blindspot,
  'harbiye-acikhava': harbyespot,
  'hirai-kayip-notlar': hiraispot,
  'karsu-turkiye-turnesi': karsuspot
}

export const useEventGroupStore = defineStore('eventGroup', () => {
  const groups = ref<EventGroup[]>([])
  const current = ref<EventGroup | null>(null)
  const loading = ref(false)
  const error = ref<StoreError | null>(null)

  // Hero görselini slug'a göre döndür
  function getHeroImage(slug: string): string {
    return heroImages[slug] || ''
  }

  // Tüm eventGroup'ları Firestore'dan çek
  async function fetchGroups() {
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      const col = collection($db as any, 'eventGroups')
      const snap = await getDocs(col)
      groups.value = snap.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          ...data,
          hero: getHeroImage(data.slug || d.id)
        } as EventGroup
      })
    } catch (e) {
      console.error('[eventGroupStore] fetchGroups error:', e)
      error.value = toStoreError(e)
    } finally {
      loading.value = false
    }
  }

  // Tek bir eventGroup'u slug ile Firestore'dan çek
  async function fetchBySlug(slug: string): Promise<EventGroup | null> {
    if (!slug) return null
    loading.value = true
    error.value = null
    try {
      const { $db } = useNuxtApp()
      // Document ID = slug olarak kaydettik
      const docRef = doc($db as any, 'eventGroups', slug)
      const snap = await getDoc(docRef)

      if (snap.exists()) {
        const data = snap.data()
        const eventGroup = {
          id: snap.id,
          ...data,
          hero: getHeroImage(data.slug || snap.id)
        } as EventGroup
        current.value = eventGroup
        return eventGroup
      }
      return null
    } catch (e) {
      console.error('[eventGroupStore] fetchBySlug error:', e)
      error.value = toStoreError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  return { groups, current, loading, error, fetchGroups, fetchBySlug, getHeroImage }
})
