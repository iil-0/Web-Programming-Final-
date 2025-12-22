<template>
  <div class="eg-account" ref="root" @click="toggle" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle" tabindex="0">
    <img class="icon" :src="userIcon" alt="Hesabım" />
    <div class="texts">
      <div class="title-row">
        <span class="title">Hesabım</span>
        <img class="down-icon" :src="downIcon" alt="" />
      </div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>

    <!-- If compact, render small dropdown under the trigger; otherwise render right-side panel -->
    <div v-if="open" class="dropdown-root">
      <template v-if="compact">
        <div class="account-menu" ref="panel" role="menu">
          <ul class="menu-list">
            <template v-if="!currentUser">
              <li><router-link to="/auth/login" class="menu-item menu-link" @click.native.stop="close">Giriş Yap</router-link></li>
              <li><router-link to="/auth/register" class="menu-item menu-link" @click.native.stop="close">Hesap Oluştur</router-link></li>
            </template>
            <template v-else>
              <li><router-link to="/account/profile" class="menu-item menu-link" @click.native.stop="close">Profilim</router-link></li>
              <li><router-link to="/account/addresses" class="menu-item menu-link" @click.native.stop="close">Adreslerim</router-link></li>
              <li><router-link to="/account/tickets" class="menu-item menu-link" @click.native.stop="close">Biletlerim</router-link></li>
              <li><router-link to="/account/fan-info" class="menu-item menu-link" @click.native.stop="close">Taraftar Bilgileri</router-link></li>
              <li><button type="button" class="menu-item logout-item" @click.stop="handleLogout">Çıkış Yap</button></li>
            </template>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="account-overlay" @click.stop="close"></div>
        <aside class="account-panel" ref="panel" role="dialog" aria-modal="true">
          <button class="panel-close" @click.stop="close" aria-label="Kapat">✕</button>
          <div class="panel-inner">
            <div class="panel-header">
              <h3>Merhaba</h3>
              <p class="panel-subtitle">{{ subtitle }}</p>
            </div>
            <ul class="panel-list">
              <template v-if="!currentUser">
                <li><router-link to="/auth/login" class="menu-item menu-link" @click.native.stop="close">Giriş Yap</router-link></li>
                <li><router-link to="/auth/register" class="menu-item menu-link" @click.native.stop="close">Kayıt Ol</router-link></li>
              </template>
              <template v-else>
                <li><button type="button" class="menu-item menu-link" @click.stop="go('/account/profile')">Profilim</button></li>
                <li><button type="button" class="menu-item menu-link" @click.stop="go('/account/addresses')">Adreslerim</button></li>
                <li><button type="button" class="menu-item menu-link" @click.stop="go('/account/tickets')">Biletlerim</button></li>
                <li><button type="button" class="menu-item menu-link" @click.stop="go('/account/fan-info')">Taraftar Bilgileri</button></li>
                <li><button type="button" class="menu-item" @click.stop="handleLogout">Çıkış Yap</button></li>
              </template>
            </ul>
          </div>
        </aside>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import IconUserImg from '~/assets/images/icon-user.png'
import DownIconImg from '~/assets/images/down.png'
const props = defineProps({ compact: { type: Boolean, default: false } })
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

// Kullanıcı ikonunun yolu (statik asset)
const userIcon = IconUserImg
const downIcon = DownIconImg
// Dropdown durumu
const open = ref(false)
// Kök tetikleyici ve panel referansları
const root = ref(null)
const panel = ref(null)
const router = useRouter()
// Auth (Pinia store üzerinden)
const userStore = useUserStore()
const { current: currentUser } = storeToRefs(userStore)

// Auth listener'ı başlat
onMounted(() => {
  userStore.initAuthListener()
})

// Kullanıcı adı/soyadı store'dan geliyor
const subtitle = computed(() => {
  if (currentUser.value) {
    const name = `${currentUser.value.firstName || ''} ${currentUser.value.lastName || ''}`.trim()
    return name || currentUser.value.email || 'Hesabım'
  }
  return 'Giriş Yap/Üye Ol'
})

async function handleLogout(){
  try{
    await userStore.logout()
    open.value = false
    router.push('/')
  } catch (e){
    console.error('Logout failed', e)
  }
}

// lock/unlock body scroll when panel opens (sadece büyük panel için)
function lockBody(lock){
  if (props.compact) return
  try{ document.body.style.overflow = lock ? 'hidden' : '' }catch(_){ }
}

// toggle: dropdown'u aç/kapa
function toggle(){
  open.value = !open.value
  lockBody(open.value)
}
// go: router ile başka sayfaya git ve dropdown'u kapat
function go(path){
  router.push(path)
  open.value = false
  lockBody(false)
}
// close: sadece kapat
function close(){
  open.value = false
  lockBody(false)
}

// onDocClick: doküman üzerinde tıklama olduğunda, eğer tıklanan
// hedef dropdown içinde değilse paneli kapat
function onDocClick(e){
  if (!open.value) return

  const rootEl = root.value
  if (rootEl instanceof Element && rootEl.contains(e.target)) {
    // Tıklama tetikleyicinin (Hesabım) üzerindeyse kapatma
    return
  }

  const p = panel.value
  if (!p) return
  // if panel is the panel container (right-side), parentElement may be used earlier;
  // but for compact dropdown panel.value is the menu element itself — use contains
  if (p instanceof Element && !p.contains(e.target)) {
    open.value = false
    lockBody(false)
  }
}

// mount/unmount sırasında global click listener ekle/çıkar
onMounted(()=> document.addEventListener('click', onDocClick))
onBeforeUnmount(()=> { document.removeEventListener('click', onDocClick); lockBody(false) })
</script>

<style scoped>
.eg-account{ position:relative; display:flex; align-items:center; gap:8px; cursor:pointer; outline:0; }
.eg-account .icon{ width:22px; height:22px; object-fit:contain; display:block; }
.eg-account .title-row{ display:flex; align-items:center; gap:4px; }
.eg-account .title{ font-size:14px; color:#111827; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:400; }
.eg-account .down-icon{ width:12px; height:12px; object-fit:contain; display:block; filter: drop-shadow(0 0 0.5px currentColor) drop-shadow(0 0 0.5px currentColor); }
.eg-account .subtitle{ font-size:14px; color:#6b7280; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:400; }

.dropdown-root{
  position:absolute;
  top:0;
  right:0;
  pointer-events:none; /* sadece içindeki menü tıklanabilir olsun */
}

.account-menu{
  position:absolute;
  top:100%;
  right:0;
  transform: translate(15px, 40px); /* moved 10px further right */
  pointer-events:auto;
  width:174px;
  min-width:174px;
  box-sizing:border-box;
  background:#fff;
  border:1px solid #eaedf3;
  border-radius:10px;
  box-shadow: 0 12px 30px rgba(0,0,0,.12);
  z-index:200000; /* header'dan da yukarıda olsun */
  padding:0;
  font-family: 'Poppins', system-ui, Arial, sans-serif;
}
.menu-list{ list-style:none; margin:0; padding:0; }
.menu-item{ width:174px; height:40px; box-sizing:border-box; text-align:left; background:none; border:0; padding:0 12px; font-size:14px; line-height:40px; color:#111827; cursor:pointer; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:400; display:block; text-decoration:none; }
.menu-item:hover, .menu-item:focus{ background:#f5f5f5; }
.menu-item.logout-item{ color:#D93A3A; font-weight:600; }
.menu-item.logout-item:hover{ background:#fff0f0; }

/* Right-side panel styles */
.account-overlay{ position:fixed; inset:0; background:rgba(0,0,0,0.35); z-index:1100; }
.account-panel{ position:fixed; right:0; top:0; height:100vh; width:562px; background:#fff; box-shadow: -8px 0 30px rgba(0,0,0,.15); z-index:1110; display:flex; flex-direction:column; }
.panel-close{ position:absolute; left:12px; top:12px; background:transparent; border:0; font-size:20px; cursor:pointer; }
.panel-inner{ padding:56px 24px 24px; overflow:auto; flex:1; }
.panel-header h3{ margin:0 0 12px 0; color:#0a62e6; }
.panel-subtitle{ margin:0 0 18px 0; color:#111827; font-weight:600 }
.panel-list{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px }
.panel-list .menu-item{ width:100%; height:48px; padding:0 16px; box-sizing:border-box; line-height:48px; font-size:15px; text-align:left }
.panel-list .menu-item:hover{ background:#f7f9fb }

@media (max-width: 768px){ .eg-account .texts{ display:none; } }
</style>
