
<template>
  <ul :class="['cs-ul', ulClass]" :style="ulStyle" @mouseleave="onMenuHover(null)">
    <li v-for="(it, i) in items" :key="it.label" :class="['cs-item','menu-item', { 'has-sub': it.type === 'menu' }]">
      <template v-if="it.type === 'menu'">
        <button
          type="button"
          :class="['cs-link', linkClass]"
          @click.prevent="onMenuClick(it)"
          @mouseenter="onMenuHover(i)"
          @focus="onMenuHover(i)"
        >
          {{ it.label }}
        </button>
      </template>
      <template v-else>
        <a :href="it.href || '#'" :class="['cs-link', linkClass]">{{ it.label }}</a>
      </template>
    </li>
  </ul>
  <button v-if="showMore"
    :id="moreId"
    :class="moreClass"
    :style="moreStyle"
    @click.prevent="onMoreClick"
  >
    {{ moreLabel }}
  </button>
  
  <!-- Note: Görsel/animasyon kontrolü üst kapsayıcının CSS'inden gelsin -->
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['menu-click','more-click','menu-hover'])
const props = defineProps({
  // items: [{ label, type: 'link'|'menu', href? }]
  items: { type: Array, required: true },
  ulClass: { type: String, default: 'mainheader__categories' },
  linkClass: { type: String, default: 'mainheader__category tagcontrol' },
  // Optional inline left offset (e.g., '-254px')
  leftOffset: { type: String, default: null },
  // More button visibility and style
  showMore: { type: Boolean, default: false },
  moreLabel: { type: String, default: 'Eğitim & Fazlası' },
  moreId: { type: String, default: 'main-category-more' },
  moreClass: { type: String, default: 'mainheader__category--more tagcontrol' },
  moreInlineStyle: { type: [String, Object], default: null }
})

const ulStyle = computed(() => props.leftOffset ? { left: props.leftOffset } : undefined)
const moreStyle = computed(() => props.moreInlineStyle || undefined)

function onMenuClick(item){ emit('menu-click', item) }
function onMoreClick(){ emit('more-click') }
function onMenuHover(index){ emit('menu-hover', index) }
</script>

<style scoped>
.cs-ul{ list-style:none; margin:0; padding:0; display:flex; align-items:center; gap:16px; flex-wrap:nowrap; }
.cs-item{ display:flex; align-items:center; }
.cs-link{ display:inline-flex; align-items:center; white-space:nowrap; background:none; border:0; }
</style>
