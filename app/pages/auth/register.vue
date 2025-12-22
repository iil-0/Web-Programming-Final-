<script setup lang="ts">
import { ref, computed } from 'vue'
import blueEye from '~/assets/images/blueye.png'
import slide1 from '~/assets/spotlight/slideregister3.png'
import slide2 from '~/assets/spotlight/auth-cover-shadow-2X2 (1).png'
import slide3 from '~/assets/spotlight/auth-cover-shadow-3X2 (1).png'
import '~/styles/tokens.css'
import calendarIcon from '~/assets/images/calendaricon.png'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'auth' })

const firstName = ref('')
const lastName = ref('')
const birthDate = ref('')
const gender = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const showPassword = ref(false)

const kvkkRead = ref(false)
const kvkkConsent = ref(false)
const emailOptIn = ref(false)
const smsOptIn = ref(false)

const loading = ref(false)
const error = ref('')

// Modal state for KVKK warning
const showModal = ref(false)
const modalMessage = ref('')

const touched = ref({
  firstName: false,
  lastName: false,
  birthDate: false,
  gender: false,
  email: false,
  phone: false,
  password: false,
  kvkkRead: false,
  kvkkConsent: false,
})

const firstNameError = computed(() => touched.value.firstName && !firstName.value ? 'Lütfen adınızı giriniz.' : '')
const lastNameError  = computed(() => touched.value.lastName && !lastName.value ? 'Lütfen soyadınızı giriniz.' : '')
const birthDateError = computed(() => touched.value.birthDate && !birthDate.value ? 'Lütfen doğum tarihinizi giriniz.' : '')
const genderError    = computed(() => touched.value.gender && !gender.value ? 'Lütfen cinsiyet seçiniz.' : '')
const emailError     = computed(() => touched.value.email && !email.value ? 'Lütfen e-posta adresinizi giriniz.' : '')
const phoneError     = computed(() => touched.value.phone && !phone.value ? 'Lütfen telefon numaranızı giriniz.' : '')
const passwordError  = computed(() => touched.value.password && !password.value ? 'Lütfen şifrenizi giriniz.' : '')
const kvkkReadError  = computed(() => touched.value.kvkkRead && !kvkkRead.value ? 'Metni okuduğunuzu onaylayın.' : '')
const kvkkConsentError = computed(() => touched.value.kvkkConsent && !kvkkConsent.value ? 'Aydınlatılmış açık rızayı onaylayın.' : '')

function markTouched(key){
  touched.value[key] = true
}

const router = useRouter() // Nuxt auto-injects, but using composition API is fine. explicit import is safer if auto-imports strict.

const submit = async () => {
  error.value = ''
  const keysToMark = ['firstName','lastName','birthDate','gender','email','phone','password','kvkkRead','kvkkConsent']
  if (!touched.value) touched.value = {}
  for (const k of keysToMark) { touched.value[k] = true }

  // KVKK checkbox'ları seçilmezse popup göster
  if (!kvkkRead.value || !kvkkConsent.value) {
    modalMessage.value = 'Üye olmak için Kişisel Verilerin Korunması hakkındaki bilgilendirme metnini okumanız ve kabul etmeniz gerekmektedir.'
    showModal.value = true
    return
  }

  const hasErrors = [firstNameError.value,lastNameError.value,birthDateError.value,genderError.value,emailError.value,phoneError.value,passwordError.value].some(Boolean)
  if (hasErrors) return

  loading.value = true
  const userStore = useUserStore()
  
  try {
    const profile = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      birthDate: birthDate.value || null,
      gender: gender.value || null,
      email: email.value.trim(),
      phone: phone.value.trim(),
      consents: {
        kvkkRead: kvkkRead.value,
        kvkkConsent: kvkkConsent.value,
        emailOptIn: emailOptIn.value,
        smsOptIn: smsOptIn.value,
      }
    }
    
    // Call store action
    await userStore.register(email.value.trim(), password.value, profile)
    
    // Redirect to login so user must authenticate explicitly
    if (router && typeof router.push === 'function') {
      router.push('/auth/login')
    } else {
      navigateTo('/auth/login')
    }
  } catch (err) {
    console.error('Register error:', err)
    try { alert(err?.message || 'Kayıt sırasında bir hata oluştu.') } catch(_) {}
    error.value = err?.message || 'Kayıt sırasında bir hata oluştu.'
  } finally {
    loading.value = false
  }
}

function openBirthCalendar(){
  const el = document.getElementById('birthDate')
  if (el) {
    try {
      if (typeof el.showPicker === 'function') { el.showPicker(); return }
    } catch(_) { /* ignore */ }
    el.focus()
  }
}
</script>

<template>
  <main id="registerPage" class="register auth-page">
    <AuthSlider class="auth-left" :images="[slide1, slide2, slide3]" :logoWidth="660" :logoHeight="270" :logoHref="'/'" />
    <div class="auth-right">
      <div class="auth-inner">
      <!-- Top right small bar -->
      <div class="top">
      <div class="top-right">
        <span class="muted">Zaten hesabınız var mı?</span>
        <BaseLink href="/auth/login" class="ghost">Giriş Yap</BaseLink>
      </div>
    </div>

    <h1 class="title">Hesap Oluştur</h1>

    <form class="form" @submit.prevent="submit">
      <div class="grid">
        <div class="field" :class="{ invalid: !!firstNameError }">
          <BaseInput v-model="firstName" label="Ad" name="firstName" type="text" autocomplete="given-name" placeholder="Ad" @blur="markTouched('firstName')" />
          <p v-if="firstNameError" class="field-error">{{ firstNameError }}</p>
        </div>
        <div class="field" :class="{ invalid: !!lastNameError }">
          <BaseInput v-model="lastName" label="Soyad" name="lastName" type="text" autocomplete="family-name" placeholder="Soyad" @blur="markTouched('lastName')" />
          <p v-if="lastNameError" class="field-error">{{ lastNameError }}</p>
        </div>

        <div class="field" :class="{ invalid: !!birthDateError }">
          <div class="date-wrap">
            <BaseInput id="birthDate" v-model="birthDate" label="Doğum Tarihi" name="birthDate" type="date" autocomplete="bday" placeholder="Doğum Tarihi" :readonly="false" :openPickerOnFocus="false" :blockTypingForDate="true" @blur="markTouched('birthDate')" />
            <button type="button" class="calendar-btn" @mousedown.prevent @click="openBirthCalendar" aria-label="Takvimi aç">
              <img :src="calendarIcon" alt="Takvim ikonu" />
            </button>
          </div>
          <p v-if="birthDateError" class="field-error">{{ birthDateError }}</p>
        </div>
        <div class="field" :class="{ invalid: !!genderError }">
          <BaseSelect class="gender-select" v-model="gender" label="CİNSİYET" name="gender" placeholder="CİNSİYET" @blur="markTouched('gender')">
            <option value="Kadın">Kadın</option>
            <option value="Erkek">Erkek</option>
          </BaseSelect>
          <p v-if="genderError" class="field-error">{{ genderError }}</p>
        </div>

        <div class="field" :class="{ invalid: !!emailError }">
          <BaseInput v-model="email" label="E-posta" name="email" type="email" autocomplete="email" placeholder="E-posta" @blur="markTouched('email')" />
          <p v-if="emailError" class="field-error">{{ emailError }}</p>
        </div>

        <div class="field" :class="{ invalid: !!phoneError }">
          <BaseInput v-model="phone" label="Telefon Numarası" name="phone" type="tel" autocomplete="tel" placeholder="Telefon Numarası" @blur="markTouched('phone')" />
          <p v-if="phoneError" class="field-error">{{ phoneError }}</p>
        </div>

        <div class="field" :class="{ invalid: !!passwordError }">
          <div class="password-wrap">
            <BaseInput v-model="password" label="Şifre" name="password" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" placeholder="Şifre" @blur="markTouched('password')" />
            <button
              type="button"
              class="pw-toggle"
              :class="{ off: !showPassword }"
              @click="showPassword = !showPassword"
              :aria-pressed="showPassword"
              aria-label="Şifre görünürlüğünü değiştir"
            >
              <img :src="blueEye" alt="Göz ikonu" />
            </button>
          </div>
          <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
        </div>
      </div>

      <div class="consents">
        <label class="checkbox" :class="{ invalid: !!kvkkReadError }">
          <input type="checkbox" v-model="kvkkRead" @blur="markTouched('kvkkRead')" />
          <span>Kişisel Verilerin Korunması hakkında bilgilendirme metnini okudum ve içeriğini anladım.</span>
        </label>
        <label class="checkbox" :class="{ invalid: !!kvkkConsentError }">
          <input type="checkbox" v-model="kvkkConsent" @blur="markTouched('kvkkConsent')" />
          <span>Kişisel verilerimin, Biletix üyelik kaydı oluşturmak ve üyelik haklarından yararlanmak amacıyla Biletix’in Kişisel Verilerin Korunması hakkında bilgilendirme metninde yer alan hususlarda işlenmesine ve paylaşılmasına aydınlatılmış açık rızam ile onay veriyorum</span>
        </label>
        <label class="checkbox">
          <input type="checkbox" v-model="emailOptIn" />
          <span>Eposta yoluyla en yeni etkinlik duyurularını ve özel kampanya bilgilerini almak istiyorum.</span>
        </label>
        <label class="checkbox">
          <input type="checkbox" v-model="smsOptIn" />
          <span>SMS yoluyla en yeni etkinlik duyurularını ve özel kampanya bilgilerini almak istiyorum.</span>
        </label>
      </div>

      <div class="actions">
        <BaseButton :disabled="loading" class="submit" type="submit">
          {{ loading ? 'Oluşturuluyor…' : 'Hesap Oluştur' }}
        </BaseButton>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
      </form>
      </div>
    </div>
  </main>
  <AlertModal v-model="showModal" :message="modalMessage" />
</template>

<style scoped>
.register {
  min-height: 100dvh;
  display: flex; flex-direction: column; align-items: center;
  gap: 18px; padding: 24px; background: #ffffff;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;
}
/* Auth layout styles (shared with Login) */
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
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  overflow-y: auto;
}
.auth-inner{
  max-width: 620px;
  padding: 24px 40px;
  margin-top: 120px;
  background: #fff;
}
@media (max-width: 900px){
  .auth-left{ display:none }
  .auth-right{
    margin-left:0;
    width: 100%;
    padding:24px;
    position: relative;
    left: 0;
    height: auto;
  }
  .auth-inner{
    padding: 24px;
    margin-top: 0;
  }
}
/* Top-right login switch absolutely konumlandırılır */
.top { position:fixed; top:24px; right:32px; display:flex; justify-content:flex-end; align-items:center; width:auto; max-width:none; z-index:1200; }
.top-right { display: flex; align-items: center; gap: 10px; }
.muted { color: #262626; font-size: 14px; line-height: 16px; letter-spacing: 0; font-weight: 600; font-family: 'Poppins', system-ui, Arial, sans-serif; }
.title {
  margin: 0 auto 20px auto;
  font-size: 26px;
  line-height: 26px;
  letter-spacing: 0;
  color: #262626;
  font-weight: 600;
  text-align: center;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  width: 590px; /* grid ile hizalı */
  display: block;
}

.form { width: 590px; display: flex; flex-direction: column; gap: 20px; margin-top: 48px; }
.grid { display: grid; grid-template-columns: repeat(2, 284px); gap: 22px 22px; }
.grid .wide { grid-column: span 2; }
.field { display: flex; flex-direction: column; gap: 3px; width: 284px; }
.field.invalid :deep(.searchInput){ border-color: #F44336; }
.field.invalid :deep(.searchInput:focus){ border-color: #F44336; }

/* BaseInput overrides to match login light theme */
:deep(.searchInput){
  height: 51px;           /* target height */
  padding: 6px 16px 0;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #999999;         /* kutu içi yazılar gri */
  width: 284px;          /* target width */
  outline: none;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;        /* diğerleri 14px */
  box-sizing: border-box;
}
:deep(.searchInput::placeholder){ color:#999999; }
:deep(.input-wrap .float-label){ color:#7f8794 !important; }
:deep(.input-wrap.active .float-label){ color:#7f8794 !important; }
/* Cinsiyet alanında aktifken küçülen label mavi kalsın */
:deep(.gender-select.input-wrap.active .float-label){
  color:#026CDF !important; font-size:11px; top:6px; transform:none;
}

/* BaseSelect overrides for light theme and placeholder/label behavior */
:deep(.selectEl){
  height: 51px;
  padding: 6px 44px 0 16px; /* extra room for 22px arrow */
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #999999;         /* kutu içi yazılar gri */
  width: 284px;
  outline: none;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;        /* diğerleri 14px */
  box-sizing: border-box;
  appearance: none; -webkit-appearance: none; -moz-appearance: none;
}
/* Gender select: blue down arrow inside on the far right */
:deep(.gender-select .selectEl){
  background-image: url('~/assets/images/bluedownarrow.png');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 22px 22px;
}
/* When empty and NOT active, show blue placeholder inside (gender only) and hide its label to avoid duplication */
:deep(.input-wrap.empty:not(.active) .selectEl){ color:#026CDF; font-size:15px; }
:deep(.gender-select.input-wrap.empty:not(.active) .float-label){ opacity:0; }
/* When empty BUT active (focused), float the label and hide inner placeholder text to avoid duplication (gender select root has both classes) */
:deep(.gender-select.input-wrap.active.empty .selectEl){ color: transparent; }
/* When active (has value/focus), shrink the label and keep select text normal */
:deep(.input-wrap.active .float-label){ color:#7f8794 !important; font-size:11px; top:6px; transform:none; }

/* Custom dropdown options are handled inside BaseSelect styles */

/* Hide browser date mask (e.g., gg.aa.yyyy) when the field is empty – even on focus */
:deep(.input-wrap.empty input[type="date"]){
  color: transparent; /* generic fallback for non-WebKit */
  -webkit-text-fill-color: transparent; /* suppress blue tinted text in WebKit */
  caret-color: transparent;
}
:deep(.input-wrap.empty input[type="date"]::-webkit-datetime-edit),
:deep(.input-wrap.empty input[type="date"]::-webkit-datetime-edit-text),
:deep(.input-wrap.empty input[type="date"]::-webkit-datetime-edit-day-field),
:deep(.input-wrap.empty input[type="date"]::-webkit-datetime-edit-month-field),
:deep(.input-wrap.empty input[type="date"]::-webkit-datetime-edit-year-field){
  color: transparent; /* WebKit-specific parts */
  background: transparent; /* remove blue selection background blocks */
}

/* Hide native calendar icon; we use our custom right-aligned button instead */
:deep(input[type="date"]::-webkit-calendar-picker-indicator){
  opacity: 0;
  pointer-events: none;
  background: none;
  -webkit-appearance: none;
}

/* remove old phone-row styles (unused) */

/* Ghost link (Giriş Yap) */
:deep(.navlink.ghost){
  color:#026CDF;
  border:1px solid #CFE6FF;
  background: transparent;
  border-radius:4px;
  font-weight:400;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-size:14px; line-height:16px; letter-spacing:0;
  width:96px; height:38px; box-sizing:border-box;
  display:inline-flex; align-items:center; justify-content:center;
  padding:0 8px;
  white-space: nowrap;
  transition: background-color .15s ease, border-color .15s ease, color .15s ease;
}
:deep(.navlink.ghost:hover){ background:#F7FAFF; }

/* error text */
.field-error{ margin:0; padding-left:12px; color:#F44336; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:400; font-size:10px; line-height:11.8px; letter-spacing:0; }
.error { color: #c62828; margin-top: 6px; }

/* password toggle */
.password-wrap{ position: relative; display:flex; align-items:center; }
/* input boyutları e‑posta ile aynı; ikon bindirmesini engelle */
.password-wrap :deep(.searchInput){ padding-right: 44px; }
.pw-toggle{
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: transparent; border: none; cursor: pointer; padding: 0;
  width: 22px; height: 22px;
}
.pw-toggle img{ width: 20px; height: 20px; display:block; }
.pw-toggle:focus{ outline: 2px solid rgba(10,98,230,.2); border-radius:4px; }
/* Şifre gizliyken mavi diyagonal çizgi */
.pw-toggle.off::after{
  content: '';
  position: absolute; left: 1px; right: 1px; top: 50%;
  border-top: 2px solid #026CDF; transform: rotate(-25deg);
}

/* date picker button */
.date-wrap{ position: relative; display:flex; align-items:center; }
.date-wrap :deep(.searchInput){ padding-right: 44px; }
.calendar-btn{
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  width: 22px; height: 22px; background: transparent; border: none; cursor: pointer; padding: 0;
}
.calendar-btn img{ width: 20px; height: 20px; display:block; }
.calendar-btn:focus{ outline: 2px solid rgba(10,98,230,.2); border-radius:4px; }

/* consent checkboxes */
.consents{ display:flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.checkbox{ display:flex; align-items:flex-start; gap: 8px; color:#262626; font-size:13px; line-height: 20px; }
/* Checkbox label layout rules: 1st single-line, 2nd allow wrapping (~3 lines), 3rd & 4th single-line */
.consents label:nth-child(1) span{ white-space:nowrap; }
.consents label:nth-child(2) span{ white-space:normal; max-width:520px; }
.consents label:nth-child(3) span{ white-space:nowrap; }
.consents label:nth-child(4) span{ white-space:nowrap; }
.checkbox input[type="checkbox"]{
  width: 16px; height: 16px; /* hedef boyut 16px */
  margin-top: 3px; /* küçük boyutta optik hizalama */
  flex: 0 0 auto;
}
/* Invalid state should not turn red for checkboxes */
.checkbox.invalid span{ color: inherit; }

.actions{ display:flex; flex-direction: column; align-items:center; gap:8px; margin-top: 4px; }
.submit{
  width: 180px; height:45px; background:#0a62e6; color:#fff; padding:0 20px; border-radius:8px;
  font-weight:400; font-family:'Poppins', system-ui, Arial, sans-serif; font-size:16px; line-height:16px; letter-spacing:0;
  display:inline-flex; align-items:center; justify-content:center;
}
@media (max-width: 820px){
  .form{ width: 100%; }
  .grid{ grid-template-columns: 1fr; }
  .grid .wide{ grid-column: auto; }
}
@media (max-width:640px){
  .top{ top:16px; right:16px; }
  .title{ margin-top:104px; }
}
</style>
