<template>
  <div v-if="modelValue" class="overlay">
    <div class="modal" role="alertdialog" aria-modal="true">
      <CloseIconButton class="close" :aria-label="closeLabel" :size="30" :color="closeColor" :stroke-width="3" @click="close" />

      <div class="modal-body">
        <div class="left">
          <div class="icon-wrap">
            <AlertIcon />
          </div>
          <p class="message">{{ message }}</p>
        </div>

        <div class="right">
          <BaseButton class="confirm" @click="close">Tamam</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/atoms/BaseButton.vue'
import AlertIcon from '~/components/atoms/AlertIcon.vue'
import CloseIconButton from '~/components/atoms/CloseIconButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  message: { type: String, default: '' },
  closeLabel: { type: String, default: 'Kapat' }
})

const emits = defineEmits(['update:modelValue'])
const closeColor = '#026CDF'

function close() {
  emits('update:modelValue', false)
}
</script>

<style scoped>
.overlay{ position:fixed; inset:0; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; z-index:1200 }
.modal{ width:100%; max-width:600px; min-height:186px; background:#fff; border-radius:4px; box-shadow:0 10px 30px rgba(0,0,0,0.2); padding:20px 24px; margin:0 16px; position:relative; box-sizing:border-box }
.close{ position:absolute; right:16px; top:30px; background:transparent; border:none; cursor:pointer; width:30px; height:30px; display:flex; align-items:center; justify-content:center }
.close svg path{ stroke-width:3 }
.modal-body{ display:flex; align-items:flex-start; justify-content:space-between; height:100%; padding-top:24px; box-sizing:border-box }
.left{ display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start; gap:8px }
.icon-wrap{ width:32px; height:32px; display:flex; align-items:flex-start; justify-content:flex-start }
.message{ margin:0; margin-top:4px; color:#646464; font-size:14px; font-family: 'Poppins', system-ui, Arial, sans-serif; text-align:left }
.right{ display:flex; align-items:flex-start; justify-content:center }
.confirm{ width:129px; height:45px; background:#026CDF; color:#FFFFFF; border-radius:4px; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-family:'Poppins', system-ui, Arial, sans-serif; border:none; margin-top:70px }
</style>
