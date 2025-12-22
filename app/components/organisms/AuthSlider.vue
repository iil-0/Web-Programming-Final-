<template>
  <div class="auth-slider" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp" @mouseenter="pause" @mouseleave="resume">
    <div class="slider-viewport" ref="viewport">
      <div class="track" :style="trackStyle">
        <img v-for="(img, i) in images" :key="i" :src="img" class="slide" :alt="`slide-${i}`" draggable="false" />
      </div>

      <a class="logo-link" :href="logoHref">
        <BaseLogo :width="logoWidth" :height="logoHeight" />
      </a>

      <div class="dots">
        <button v-for="(_, i) in images" :key="i" :class="['dot', { active: i === current }]" @click="go(i)" aria-label="go to slide"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import BaseLogo from '~/components/atoms/BaseLogo.vue'

const props = defineProps({
  images: { type: Array, required: true },
  interval: { type: Number, default: 4000 },
  width: { type: Number, default: 760 },
  height: { type: Number, default: 838 },
  logoWidth: { type: Number, default: 198 },
  logoHeight: { type: Number, default: 80 },
  logoHref: { type: String, default: '/anasayfa' }
})

const current = ref(0)
const offset = ref(0) // during drag
const dragging = ref(false)
const viewport = ref(null)
let timer = null
let startX = 0

// Viewport genişliğini dinamik olarak hesapla
const getViewportWidth = () => {
  if (viewport.value) {
    return viewport.value.offsetWidth || props.width
  }
  return props.width
}

const trackStyle = computed(() => {
  const viewportWidth = getViewportWidth()
  const tx = -current.value * viewportWidth + offset.value
  return {
    transform: `translateX(${tx}px)`,
    transition: dragging.value ? 'none' : 'transform 600ms cubic-bezier(.22,.9,.32,1)'
  }
})

function go(index){ current.value = Math.max(0, Math.min(index, props.images.length - 1)); offset.value = 0 }
function next(){ go((current.value + 1) % props.images.length) }
function prev(){ go((current.value - 1 + props.images.length) % props.images.length) }

function start(){ stop(); timer = setInterval(next, props.interval) }
function stop(){ if (timer) { clearInterval(timer); timer = null } }
function pause(){ stop() }
function resume(){ start() }

function onPointerDown(e){
  dragging.value = true
  startX = e.clientX || 0
  offset.value = 0
  // capture pointer on viewport element if possible
  try{
    const el = e.currentTarget || viewport.value
    if (e.pointerId && el && el.setPointerCapture) el.setPointerCapture(e.pointerId)
  } catch(_) {}
  pause()
}

function onPointerMove(e){
  if (!dragging.value) return
  const x = e.clientX || 0
  offset.value = x - startX
}

function onPointerUp(e){
  if (!dragging.value) return
  dragging.value = false
  const viewportWidth = getViewportWidth()
  const threshold = viewportWidth * 0.15
  if (offset.value > threshold) prev()
  else if (offset.value < -threshold) next()
  else offset.value = 0
  // release pointer capture on viewport if available
  try{ if (e.pointerId && viewport.value && viewport.value.releasePointerCapture) viewport.value.releasePointerCapture(e.pointerId) } catch(_) {}
  resume()
}

onMounted(() => start())
onBeforeUnmount(() => stop())
</script>

<style scoped>
.auth-slider{ display:block; width: 100%; height: 100%; }
.slider-viewport{ position:relative; overflow:hidden; touch-action: pan-y; width: 100%; height: 100%; }
.track, .slide{ user-select:none; -webkit-user-drag: none; }
.slide{ cursor:default; pointer-events:none; }
.track{ display:flex; width:100%; height:100% }
.slide{
  flex:0 0 auto;
  width:100%;
  height:100%;
  object-fit:cover; /* Resmi container'a sığdır, kırpmadan */
  object-position: center; /* Resmi ortala */
}
.logo-link{ position:absolute; left:20px; top:50px; z-index:20; display:inline-block }
.logo-link :deep(.logo__media){ width: auto !important; height: auto !important; max-width: none !important; }

.dots{ position:absolute; left:50%; bottom:18px; transform:translateX(-50%); display:flex; gap:8px; z-index:30 }
.dot{ width:10px; height:10px; border-radius:50%; background: rgba(2,108,223,0.18); border:0; padding:0; cursor:pointer }
.dot.active{ background: #026CDF }

@media (max-width: 900px){ .auth-slider{ display:none } }
</style>
