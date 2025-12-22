<template>
  <div v-if="open" class="account-drawer-root">
    <div class="overlay" @click="close" />
    <aside class="drawer" role="dialog" aria-modal="true" @keydown.esc.prevent="close" ref="panel">
      <CloseIconButton class="close" @click="close" aria-label="Kapat" />
      <div class="drawer-inner">
        <header class="drawer-header">Merhaba</header>
        <div class="divider" />

            <nav class="drawer-nav">
              <AccountMenuItem label="PROFİLİM" to="/account/profile" @select="close" />
              <div class="divider thin" />
              <AccountMenuItem label="ADRESLERİM" to="/account/addresses" @select="close" />
              <div class="divider thin" />
              <AccountMenuItem label="BİLETLERİM" to="/account/tickets" @select="close" />
              <div class="divider thin" />
              <AccountMenuItem label="KULLANICI BİLGİLERİM" to="/account/info" @select="close" />
              <div class="divider thin" />
              <AccountMenuItem label="SEZONLUK BİLETLERİM" to="/account/seasonal" @select="close" />
              <div class="divider thin" />
              <AccountMenuItem class="logout-item" label="ÇIKIŞ" @select="handleLogout" />
            </nav>

        <div class="spacer" />

        <div class="logout-wrap" v-if="false">
          <BaseButton class="logout" variant="btn--ghost" @click="handleLogout">ÇIKIŞ</BaseButton>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import AccountMenuItem from '~/components/atoms/AccountMenuItem.vue'
import CloseIconButton from '~/components/atoms/CloseIconButton.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

const props = defineProps({
  open: { type: Boolean, required: true },
  onLogout: Function
})
const emit = defineEmits(['update:open','logout'])
const router = useRouter()
const panel = ref(null)

function close(){ emit('update:open', false); emit('close') }

function handleLogout(){
  if (typeof props.onLogout === 'function') props.onLogout()
  emit('logout')
  close()
}

function lockBody(lock){ try{ document.body.style.overflow = lock ? 'hidden' : '' }catch(_){} }

watch(()=> props.open, (v)=>{ lockBody(v) })

onBeforeUnmount(()=> lockBody(false))

// allow parent to focus panel if needed
onMounted(()=>{
  if (props.open && panel.value) panel.value.focus()
})
</script>

<style scoped>
.account-drawer-root{ position:fixed; inset:0; z-index:1200; }
.overlay{ position:fixed; inset:0; background:rgba(0,0,0,0.35); }
.drawer{ position:fixed; right:0; top:0; height:100vh; width:562px; background:#fff; box-shadow:-12px 0 30px rgba(0,0,0,.12); display:flex; flex-direction:column; }
.close{ position:absolute; left:12px; top:12px; background:transparent; border:0; font-size:20px; cursor:pointer }
.drawer-inner{ padding:56px 24px 24px; display:flex; flex-direction:column; height:100%; }
.drawer-header{ font-size:19px; color:#009CDE; font-weight:600; margin-bottom:8px }
.divider{ height:1px; background:#eef0f2; margin:6px 0 }
.divider.thin{ height:1px; background:#f3f4f6; margin:4px 0 }
.drawer-nav{ display:flex; flex-direction:column }
.account-item{ font-size:13px; color:#353C42; padding:12px 8px; text-decoration:none }
.account-item:hover{ background:#f7f7f8 }
.spacer{ flex:1 1 auto }
.logout-wrap{ padding:8px 0 }
.logout{ font-size:13px; color:#D93A3A; background:transparent; border:0; cursor:pointer; text-align:left; padding:12px 8px }
.logout:hover{ background:#fff0f0 }
.logout-item{ color:#D93A3A; font-weight:600 }

/* small screens: full width */
@media (max-width:600px){ .drawer{ width:100vw } }
</style>
