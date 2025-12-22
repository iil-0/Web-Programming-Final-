import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import type { User, StoreError } from '~/types/interfaces'
import { useNuxtApp } from '#app'

function toStoreError(e: unknown): StoreError {
  if (e instanceof Error) {
    return { code: (e as any).code, message: e.message }
  }
  return { message: String(e) }
}

export const useUserStore = defineStore('user', () => {
  const current = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<StoreError | null>(null)

  let listenerInitialized = false

  // Plugin'den Firebase instance'larını al
  function getFirebase() {
    const { $auth, $db } = useNuxtApp()
    return { auth: $auth as any, db: $db as any }
  }

  // Auth state listener'ı başlat
  function initAuthListener() {
    if (listenerInitialized || typeof window === 'undefined') return

    try {
      const { auth } = getFirebase()
      if (!auth) {
        loading.value = false
        return
      }

      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Kullanıcı giriş yapmış - profili yükle
          const base: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? undefined,
            displayName: firebaseUser.displayName ?? undefined
          }

          try {
            const { db } = getFirebase()
            const docRef = doc(db, 'users', firebaseUser.uid)
            const snap = await getDoc(docRef)
            if (snap.exists()) {
              Object.assign(base, snap.data())
            }
          } catch (e) {
            console.error('[userStore] Profil yükleme hatası:', e)
          }

          current.value = base
        } else {
          current.value = null
        }
        loading.value = false
      })

      listenerInitialized = true
    } catch (e) {
      console.error('[userStore] Auth listener hatası:', e)
      loading.value = false
    }
  }

  async function login(email: string, password: string): Promise<User> {
    error.value = null
    const { auth, db } = getFirebase()

    try {
      const res = await signInWithEmailAndPassword(auth, email, password)

      // Firestore'dan kullanıcı profilini çek
      const docRef = doc(db, 'users', res.user.uid)
      const snap = await getDoc(docRef)

      const base: User = {
        uid: res.user.uid,
        email: res.user.email ?? undefined,
        displayName: res.user.displayName ?? undefined
      }

      if (snap.exists()) {
        Object.assign(base, snap.data())
      }

      current.value = base
      return base
    } catch (e) {
      error.value = toStoreError(e)
      throw e
    }
  }

  async function register(email: string, password: string, profileData: Record<string, any>) {
    error.value = null
    const { auth, db } = getFirebase()

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      // Profili Firestore'a yaz
      await setDoc(doc(db, 'users', res.user.uid), {
        ...profileData,
        createdAt: serverTimestamp()
      })

      // Kayıt sonrası çıkış yap - kullanıcı manuel giriş yapmalı
      await signOut(auth)
      current.value = null

      return res.user
    } catch (e) {
      error.value = toStoreError(e)
      throw e
    }
  }

  async function logout() {
    error.value = null
    try {
      const { auth } = getFirebase()
      await signOut(auth)
      current.value = null
    } catch (e) {
      error.value = toStoreError(e)
      throw e
    }
  }

  return {
    current,
    loading,
    error,
    login,
    logout,
    register,
    initAuthListener
  }
})
