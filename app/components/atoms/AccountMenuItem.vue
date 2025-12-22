<template>
  <component :is="to ? 'router-link' : 'button'"
             :to="to"
             class="account-item"
             @click.native="handleClick"
             v-bind="to ? {} : { type: 'button' }">
    {{ label }}
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, required: true },
  to: { type: String, default: null }
})
const emit = defineEmits(['select'])

function handleClick(e){
  emit('select', e)
}
</script>

<style scoped>
.account-item{ display:block; font-size:13px; color:#353C42; padding:12px 8px; text-decoration:none; background:transparent; border:0; text-align:left; width:100%; font-weight:600 }
.account-item:hover{ background:#f7f7f8 }
</style>
