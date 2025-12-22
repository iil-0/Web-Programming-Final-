<script setup lang="ts">
import { ref, computed } from 'vue'
import slide1 from '~/assets/spotlight/slideregister3.png'
import slide2 from '~/assets/spotlight/auth-cover-shadow-2X2 (1).png'
import slide3 from '~/assets/spotlight/auth-cover-shadow-3X2 (1).png'
import '~/styles/tokens.css'
import { useUserStore } from '~/stores/user'
import { useSepetStore } from '~/stores/sepet'

definePageMeta({ layout: 'auth' })

// 🔹 Form state
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// 🔹 Pinia store'ları
const userStore = useUserStore()
const sepetStore = useSepetStore()

// 🔹 Validation state
const touchedEmail = ref(false)
const touchedPassword = ref(false)

const emailError = computed(() =>
  touchedEmail.value && !email.value ? 'Lütfen e-posta adresinizi giriniz.' : ''
)

const passwordError = computed(() =>
  touchedPassword.value && !password.value ? 'Lütfen şifrenizi giriniz.' : ''
)

// modal state for showing popup dialogs
const showModal = ref(false)
const modalMessage = ref('')

// 🔹 Form submit: Artık gerçekten Firebase login yapıyor
const submit = async () => {
  error.value = ''

  // Boş alan kontrolü
  if (!email.value || !password.value) {
    touchedEmail.value = true
    touchedPassword.value = true
    return
  }

  loading.value = true
  try {
    // 🔥 Firebase Authentication ile giriş yap (Pinia store üzerinden)
    const user = await userStore.login(email.value.trim(), password.value)

    // Login sonrası sepeti senkronize et (localStorage → Firestore)
    if (user?.uid) {
      await sepetStore.syncAfterLogin(user.uid)
    }

    // Giriş başarılı olursa anasayfaya yönlendir
    await navigateTo('/')
  } catch (err) {
    console.error('Login hata:', err)
    // Eğer Firebase auth hatasıysa, sık görülen hatalar için modal göster
    const code = err?.code || ''
    const msg = String(err?.message || '')
    const modalCodes = ['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential']
    const shouldShowModal = modalCodes.includes(code) || modalCodes.some(c => msg.includes(c) || msg.includes(c.replace('auth/', '')))
    if (shouldShowModal) {
      modalMessage.value = 'Geçersiz kullanıcı adı veya şifre girdiniz.'
      showModal.value = true
    } else {
      // Diğer hataları altta göster
      error.value = err?.message || 'Giriş yapılamadı'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main id="signInPage" class="signin auth-page">
    <AuthSlider
      class="auth-left"
      :images="[slide1, slide2, slide3]"
      :logoWidth="792"
      :logoHeight="320"
      :logoHref="'/'"
    />
    <div class="auth-right">
      <div class="auth-inner">
        <div class="top">
          <div class="top-right">
            <span class="muted">Hesabın yok mu?</span>
            <BaseLink href="/auth/register" class="ghost">Hesap Oluştur</BaseLink>
          </div>
        </div>

        <h1 class="title">Giriş Yap</h1>

        <form class="form" @submit.prevent="submit">
          <div class="field" :class="{ invalid: !!emailError }">
            <BaseInput
              v-model="email"
              label="E-posta"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="E-posta"
              @blur="touchedEmail = true"
              required
            />
            <p v-if="emailError" class="field-error">{{ emailError }}</p>
          </div>

          <div class="field" :class="{ invalid: !!passwordError }">
            <BaseInput
              v-model="password"
              label="Şifre"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Şifre"
              @blur="touchedPassword = true"
              required
            />
            <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
          </div>

          <div class="row">
            <BaseLink href="/auth/activation-link" class="link activation">
              Aktivasyon linki gönder
            </BaseLink>
            <BaseLink href="/auth/forgot-password" class="link">Şifremi unuttum</BaseLink>
          </div>

          <BaseButton :disabled="loading" class="submit" type="submit">
            {{ loading ? 'Giriş yapılıyor…' : 'Giriş Yap' }}
          </BaseButton>

          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </main>
  <AlertModal v-model="showModal" :message="modalMessage" />
</template>

<style scoped>
.signin {
  min-height: 100dvh;
  display: flex;
  flex-direction: row;
  background: #fff;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;
}

/* Auth layout: left slider fixed, right content shifted */
.auth-page{ position:relative; min-height:100dvh; }
.auth-left{
  position:fixed;
  left:0;
  top:0;
  height:100vh;
  width: 50%; /* Ekranın tam yarısı */
  box-shadow: 0 8px 30px rgba(0,0,0,.12);
  z-index:1;
}
.auth-right{
  position: fixed;
  left: 50%;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 0;
  box-sizing: border-box;
  z-index: 120;
  display: flex;
  justify-content: center; /* Formu yatayda ortala */
  align-items: flex-start;
  background: #fff;
  overflow-y: auto;
}
.auth-inner{
  max-width: 520px;
  padding: 24px 40px;
  margin-top: 150px;
  background: #fff;
}
@media (max-width: 900px){
  .auth-left{ display:none }
  .auth-right{
    margin-left:0;
    width: 100%;
    padding:24px;
  }
  .auth-inner{
    padding: 24px;
  }
}
/* Top-right register switch absolutely konumlandırılır */
.top { position:fixed; top:24px; right:32px; display:flex; justify-content:flex-end; align-items:center; width:auto; max-width:none; z-index:1200; }
.top-right { display: flex; align-items: center; gap: 10px; }
.muted { color: #262626; font-size: 14px; line-height: 16px; letter-spacing: 0; font-weight: 600; font-family: 'Poppins', system-ui, Arial, sans-serif; }
.title {
  margin: 96px 0 24px 0;
  font-size: 26px;
  line-height: 26px;
  letter-spacing: 0;
  color: #262626;
  font-weight: 600;
  text-align: center;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
}
.form { width: 310px; min-height: 322px; display: flex; flex-direction: column; gap: 16px; margin: 24px auto 0; }
.field { display: flex; flex-direction: column; gap: 3px; }
.field.invalid :deep(.searchInput){
  border-color: #F44336; /* hata durumunda kutu kenarları kırmızı */ 
}
.field.invalid :deep(.searchInput:focus){
  border-color: #F44336; 
}
.row { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }

/* BaseInput atomunu açık zemin için yeniden stillendir */
:deep(.searchInput){
  height: 53px;            
  padding: 6px 16px 0;     
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #111827;
  width: 100%;
  outline: none;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  box-sizing: border-box; 
}
:deep(.searchInput::placeholder){ color:#6b7280; font-size:14px; }

:deep(.input-wrap .float-label){ color:#7f8794 !important; }
:deep(.input-wrap.active .float-label){ color:#7f8794 !important; }

/* Linkler */
:deep(.navlink.link){ color:#026CDF; font-weight:400; font-family: 'Poppins', system-ui, Arial, sans-serif; font-size:14px; }
:deep(.navlink.link:hover){ text-decoration:underline; }
/* Ghost buton görünümü */
:deep(.navlink.ghost){
  color:#026CDF;
  border:1px solid #CFE6FF;
  background: transparent;
  border-radius:4px; 
  font-weight:400;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-size:14px; line-height:16px; letter-spacing:0;
  width:123px; height:38px; box-sizing:border-box;
  display:inline-flex; align-items:center; justify-content:center;
  padding:0 8px; 
  white-space: nowrap; 
  transition: background-color .15s ease, border-color .15s ease, color .15s ease;
}

:deep(.navlink.ghost:hover){
  background: #F7FAFF; 
}

:deep(.navlink.link.activation){
  color:#646464;
  font-size:14px;
  line-height:16px;
  font-weight:400; 
  letter-spacing: normal;
}

/* Submit butonu */
.submit{
  width:100%;            
  height:45px;           
  background:#0a62e6;
  color:#fff;
  padding:0 20px;       
  border-radius:8px;
  font-weight:400;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-size:16px;
  line-height:16px;
  letter-spacing:0;
  margin-top: 6px;
  display:inline-flex; align-items:center; justify-content:center; 
}

.error { color: #c62828; margin-top: 6px; }

/* Alan altı hata mesajı */
.field-error{
  margin: 0; 
  padding-left: 12px; 
  color: #F44336;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;       
  font-size: 10px;      
  line-height: 11.8px;    
  letter-spacing: 0;      
}

/* Şifre alanında Login sayfasında göz ikonu kullanılmıyor */
@media (max-width:640px){
  .top{ top:16px; right:16px; }
  .title{ margin-top:144px; }
}
</style>
