<template>
  <div class="eg-search">
    <span class="icon" aria-hidden="true" :style="{ '--search-icon': `url(${searchIcon})` }"></span>
    <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '~/assets/images/icon-search.png'
const props = defineProps({ placeholder: { type:String, default:'Etkinlik, sanatçı ya da mekan arayın' } })
const searchIcon = SearchIcon
</script>

<style scoped>
.eg-search{ display:flex; align-items:center; gap:8px; border:1px solid #e5e7eb; padding:6px 10px; border-radius:4px; background:#fff; min-width:260px; }
/* Use PNG as mask to apply exact color #BFBFBF */
.eg-search .icon{ width:14px; height:14px; display:block; background-color:#BFBFBF; -webkit-mask-image: var(--search-icon); mask-image: var(--search-icon); -webkit-mask-position:center; mask-position:center; -webkit-mask-size:contain; mask-size:contain; }
.eg-search input{ border:0; outline:0; width:100%; font-size:14px; }
</style>
