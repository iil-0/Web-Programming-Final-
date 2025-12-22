<template>
  <button :class="['account-trigger', compact ? 'mainheader__control--login' : '']" type="button" @click.prevent="emitOpen" :aria-label="label">
    <img class="icon-btn" :src="iconUser" alt="Hesabım" />
    <span v-if="!compact" class="text">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconUserImg from '~/assets/images/icon-user.png'

const props = defineProps({
  label: { type: String, default: 'Hesabım' },
  compact: { type: Boolean, default: false }
})
const emit = defineEmits(['open'])

const iconUser = IconUserImg

function emitOpen(){ emit('open') }
</script>

<style scoped>
.account-trigger{ display:inline-flex; align-items:center; gap:8px; background:transparent; border:0; cursor:pointer; padding:6px; }
.account-trigger .text{ font-size:14px; color:#111827; font-family:'Poppins', system-ui, Arial, sans-serif; font-weight:600 }
.icon-btn{ width:28px; height:28px; object-fit:contain; display:block; filter:none !important; opacity:1 !important }
</style>
