<template>
  <div class="HeaderWrapper">
    <HeaderTopBar />
    <div class="mainheader">
      <div class="mainheader__wrapper navbar">
        <div id="main-header-primary" class="mainheader__primary">
          <div class="mainheader__container">
            <BaseLogo />

            <div id="main-categories" class="mainheader__group">
              <div class="mainheader__categories--anim is-mounted">
                <CategoryStrip
                  :items="cats"
                  ulClass="mainheader__categories"
                  linkClass="mainheader__category tagcontrol"
                  :showMore="false"
                  @menu-click="openMenu"
                />
              </div>
            </div>

            <div id="search-box">
              <SearchBox @search="goSearch" />
            </div>

            <div id="loginbutright">
              <AccountTrigger @open="handleAccountOpen" :compact="true" />
              <AccountDrawer :open="drawerOpen" @update:open="drawerOpen = $event" @logout="handleLogout" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeaderBottomBar />
  </div>
</template>

<script setup lang="ts">
import SearchBox from "~/components/molecules/SearchBox.vue";
import AccountTrigger from '~/components/molecules/AccountTrigger.vue'
import AccountDrawer from '~/components/organisms/AccountDrawer.vue'
import BaseIconButton from "~/components/atoms/BaseIconButton.vue";
import BaseLogo from "~/components/atoms/BaseLogo.vue";
import CategoryStrip from "~/components/molecules/CategoryStrip.vue";
import HeaderTopBar from "~/components/molecules/HeaderTopBar.vue";
import HeaderBottomBar from "~/components/molecules/HeaderBottomBar.vue";
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import IconSearchImg from '~/assets/images/icon-search.png'
import IconUserImg from '~/assets/images/icon-user.png'

const iconSearch = IconSearchImg
const iconUser = IconUserImg

const cats = [
  { label: "Futbol", type: 'link', href: "/fan-guide/TURKIYE/tr" },
  { label: "Müzik", type: 'menu' },
  { label: "Sahne", type: 'menu' },
  { label: "Spor", type: 'menu' },
  { label: "Aile", type: 'menu' },
  { label: "Eğitim & Fazlası", type: 'menu' },
];

function openMenu(item){
  // Mega menüler daha sonra eklenecek.
  // console.log('open mega menu:', item.label)
}

function goSearch(q) {
  if (!q) return;
  window.location.href = `/search/TURKIYE/tr?text=${encodeURIComponent(q)}`;
}

const drawerOpen = ref(false)
const router = useRouter()
const userStore = useUserStore()
const { current: currentUser } = storeToRefs(userStore)

// Auth listener'ı başlat
onMounted(() => {
  userStore.initAuthListener()
})

function handleLogout(){ try{ userStore.logout() }catch(e){ console.error(e) } }

function handleAccountOpen(){
  if (currentUser && currentUser.value) {
    drawerOpen.value = true
  } else {
    router.push('/auth/login')
  }
}
</script>
