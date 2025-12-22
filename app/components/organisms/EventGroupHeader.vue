<template>
 
  <header class="eg-header">
    <div class="inner">
      <div class="left">
        <BaseLogo :width="108" :height="41" href="/" />
      </div>

      <div class="center">
        <EventCategoryMenu />
      </div>

      <div class="right">
        <EventSearchBox />
        <EventAccount compact />
        <EventCart />
      </div>
    </div>
  </header>
  
</template>

<script setup lang="ts">
import BaseLogo from '~/components/atoms/BaseLogo.vue'
import EventCategoryMenu from '~/components/organisms/EventCategoryMenu.vue'
import EventSearchBox from '~/components/molecules/EventSearchBox.vue'
import EventAccount from '~/components/organisms/EventAccount.vue'
import EventCart from '~/components/molecules/EventCart.vue'
</script>

<style scoped>
/* Header background matches home gradient */
.eg-header{ 
  background: linear-gradient(90deg, rgb(1, 80, 167), rgb(2, 108, 223), rgb(1, 80, 167));
  color:#fff;
  position: relative; /* ensure header creates a stacking context we can control */
  z-index: 100000;     /* keep header and its dropdowns above page content */
}
/* 1520 x 70 header sizing */
.inner{ max-width:1520px; height:70px; box-sizing:border-box; margin:0 auto; padding:0 16px; display:flex; align-items:center; gap:20px; transform: translateX(-106px); }
.left{ flex: 0 0 auto; display:flex; align-items:center; margin-left:auto; }
.center{ flex: 0 1 auto; display:flex; align-items:center; min-width:0; }
.right{ flex: 0 0 auto; display:flex; align-items:center; gap:16px; }

/* Ensure category links don't change color on hover in this header */
/* Use home header classes but override for this header: keep white color, 16px, and 70px height */
:deep(.event-cat-menu .mainheader__category.tagcontrol){ color:#fff !important; text-decoration:none; font-size:15px !important; height:70px; line-height:70px; padding:0 12px; }
:deep(.event-cat-menu .mainheader__category.tagcontrol:hover),
:deep(.event-cat-menu .mainheader__category.tagcontrol:focus){ color:#fff !important; text-decoration:none; }
:deep(.event-cat-menu .mainheader__categories){ display:flex; align-items:center; gap:10px; flex-wrap:nowrap; }

/* All content is shifted left uniformly; move only logo 30px back to the right */
.left{ transform: translateX(30px); }
.center, .right{ transform:none; }

/* Logo uses BaseLogo props; no extra override needed */

/* Make account/cart texts readable on gradient */
:deep(.eg-account .title),
:deep(.eg-cart .title){ color:#fff; }
:deep(.eg-account .subtitle),
:deep(.eg-cart .subtitle){ color: rgba(255,255,255,.85); }
/* add small spacing to push cart slightly to the right if needed */
:deep(.eg-cart){ margin-left: 10px; }

/* Make search box exact size 295x35 and pill-shaped for this header */
:deep(.eg-search){
  width:295px !important;
  height:35px !important;
  min-width:295px !important;
  box-sizing:border-box;
  border-radius:9999px !important;
  padding:6px 10px;
  gap:6px;
}
:deep(.eg-search input){ font-size:13px; }
:deep(.eg-search input::placeholder){ color: rgba(17,24,39,.55); }

/* Responsiveness: collapse menu/search on small screens */
@media (max-width: 900px){
  .center{ display:none; }
}
@media (max-width: 640px){
  .right{ gap:8px; }
}
</style>
