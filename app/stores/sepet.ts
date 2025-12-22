import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '~/types/interfaces'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'

const STORAGE_KEY = 'sepet_items'

/**
 * Sepet Store
 *
 * Persistence stratejisi:
 * - Kullanıcı giriş yapmamışsa: localStorage
 * - Kullanıcı giriş yapmışsa: Firestore
 *
 * Her işlemden sonra otomatik olarak uygun yere kaydedilir.
 */
export const useSepetStore = defineStore('sepet', () => {
  const items = ref<CartItem[]>([])
  const loading = ref(false)

  // ─────────────────────────────────────────────────────────────
  // Computed
  // ─────────────────────────────────────────────────────────────

  const count = computed(() =>
    items.value.reduce((sum, item) => sum + (item.qty || 1), 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + ((item.unitPrice || 0) * (item.qty || 1)), 0)
  )

  // ─────────────────────────────────────────────────────────────
  // localStorage işlemleri
  // ─────────────────────────────────────────────────────────────

  function saveToLocal() {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function loadFromLocal() {
    if (typeof window === 'undefined') return
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        items.value = JSON.parse(data)
      }
    } catch (e) {
      console.error('[sepet] localStorage okuma hatası:', e)
    }
  }

  function clearLocal() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  }

  // ─────────────────────────────────────────────────────────────
  // Firebase Auth'dan mevcut kullanıcıyı al
  // ─────────────────────────────────────────────────────────────

  function getCurrentUserId(): string | null {
    try {
      const { $auth } = useNuxtApp()
      return ($auth as any)?.currentUser?.uid || null
    } catch {
      return null
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Firestore işlemleri
  // ─────────────────────────────────────────────────────────────

  async function saveToFirestore(uid?: string) {
    const userId = uid || getCurrentUserId()
    if (!userId) return

    try {
      const { $db } = useNuxtApp()
      const cartRef = doc($db as any, 'carts', userId)
      await setDoc(cartRef, { items: items.value })
    } catch (e) {
      console.error('[sepet] Firestore kaydetme hatası:', e)
    }
  }

  async function loadFromFirestore(uid?: string) {
    const userId = uid || getCurrentUserId()
    if (!userId) return

    loading.value = true
    try {
      const { $db } = useNuxtApp()
      const cartRef = doc($db as any, 'carts', userId)
      const snap = await getDoc(cartRef)
      if (snap.exists()) {
        items.value = snap.data().items || []
      }
    } catch (e) {
      console.error('[sepet] Firestore okuma hatası:', e)
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Kaydetme (kullanıcı durumuna göre)
  // ─────────────────────────────────────────────────────────────

  async function save(uid?: string) {
    const userId = uid || getCurrentUserId()
    if (userId) {
      await saveToFirestore(userId)
    } else {
      saveToLocal()
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Yükleme (kullanıcı durumuna göre)
  // ─────────────────────────────────────────────────────────────

  async function load(uid?: string) {
    const userId = uid || getCurrentUserId()
    if (userId) {
      await loadFromFirestore(userId)
    } else {
      loadFromLocal()
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Login sonrası: localStorage'daki sepeti Firestore'a taşı
  // uid parametresi: userStore.login()'dan dönen user.uid
  // ─────────────────────────────────────────────────────────────

  async function syncAfterLogin(uid: string) {
    if (!uid) return

    loading.value = true
    try {
      const { $db } = useNuxtApp()
      const cartRef = doc($db as any, 'carts', uid)
      const snap = await getDoc(cartRef)
      const firestoreItems = snap.exists() ? (snap.data().items || []) : []

      // localStorage'daki sepeti al
      let localItems: CartItem[] = []
      if (typeof window !== 'undefined') {
        try {
          const data = localStorage.getItem(STORAGE_KEY)
          if (data) localItems = JSON.parse(data)
        } catch (e) { /* ignore */ }
      }

      if (firestoreItems.length > 0) {
        // Firestore'da sepet var - onu kullan
        items.value = firestoreItems
      } else if (localItems.length > 0) {
        // Firestore boş, localStorage'da veri var - Firestore'a taşı
        items.value = localItems
        await setDoc(cartRef, { items: items.value })
      }

      // Her durumda localStorage'ı temizle (artık Firestore kullanılacak)
      clearLocal()
    } catch (e) {
      console.error('[sepet] syncAfterLogin hatası:', e)
    } finally {
      loading.value = false
    }
  }

  // ─────────────────────────────────────────────────────────────
  // Sepet işlemleri
  // ─────────────────────────────────────────────────────────────

  async function add(item: CartItem) {
    // İlk ekleme öncesi mevcut sepeti yükle
    if (items.value.length === 0) {
      await load()
    }

    const idx = items.value.findIndex(i => i.id === item.id)
    if (idx >= 0) {
      items.value[idx].qty = (items.value[idx].qty || 1) + (item.qty || 1)
    } else {
      items.value.push({ ...item, qty: item.qty || 1 })
    }

    await save()
  }

  async function remove(id: string) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx >= 0) {
      items.value.splice(idx, 1)
      await save()
    }
  }

  async function updateQty(id: string, qty: number) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx >= 0) {
      if (qty <= 0) {
        items.value.splice(idx, 1)
      } else {
        items.value[idx].qty = qty
      }
      await save()
    }
  }

  async function clear() {
    items.value = []
    await save()
  }

  return {
    // State
    items,
    loading,

    // Computed
    count,
    totalPrice,

    // Sepet işlemleri
    add,
    remove,
    updateQty,
    clear,

    // Yükleme/Kaydetme
    load,
    save,
    syncAfterLogin
  }
})
