<template>
  <form class="ticket-category-bar" @submit.prevent>
    <div class="category-wrapper">
      <div class="select-item" ref="pRef">
        <div class="custom-select" :class="{ disabled: false, selected: !!profile, empty: !profile }">
          <button type="button" class="cs-toggle" @click="toggle('profile')">
            <div class="toggle-inner">
              <span class="field-label" v-if="profile">BİLET TÜRÜ</span>
              <span class="field-value">{{ profileLabel }}</span>
            </div>
            <span class="caret blue-arrow" aria-hidden="true"></span>
          </button>
          <ul v-if="open.profile" class="cs-options" role="listbox">
            <li v-for="opt in profileOptions" :key="opt.value" :class="['cs-option', { selected: profile.value === opt.value }]" @click="selectProfile(opt)">{{ opt.label }}</li>
          </ul>
        </div>
        <span v-if="touched.profile && !profile" class="validation-msg">Lütfen bilet türü seçiniz.</span>
      </div>

      <div class="select-item" ref="cRef">
        <div class="custom-select" :class="{ disabled: !profile, selected: !!category, empty: !category }">
          <button type="button" class="cs-toggle" @click="toggle('category')">
            <div class="toggle-inner">
              <span class="field-label" v-if="category">KATEGORİ</span>
              <span class="field-value">{{ categoryLabel }}</span>
            </div>
            <span class="caret blue-arrow" aria-hidden="true"></span>
          </button>
          <ul v-if="open.category" class="cs-options" role="listbox">
            <li v-for="opt in categoryOptions" :key="opt.value" :class="['cs-option', { selected: category.value === opt.value }]" @click="selectCategory(opt)">{{ opt.label }}</li>
          </ul>
        </div>
        <span v-if="touched.category && !category" class="validation-msg">Lütfen kategori seçiniz.</span>
      </div>

      <div class="select-item" ref="bRef">
        <div class="custom-select" :class="{ disabled: !category, selected: !!block, empty: !block }">
          <button type="button" class="cs-toggle" @click="toggle('block')">
            <div class="toggle-inner">
              <span class="field-label" v-if="block">BÖLÜM / BLOK</span>
              <span class="field-value">{{ blockLabel }}</span>
            </div>
            <span class="caret blue-arrow" aria-hidden="true"></span>
          </button>
          <ul v-if="open.block" class="cs-options" role="listbox">
            <li v-for="opt in blockOptions" :key="opt.value" :class="['cs-option', { selected: block.value === opt.value }]" @click="selectBlock(opt)">{{ opt.label }}</li>
          </ul>
        </div>
        <span v-if="touched.block && !block" class="validation-msg">Lütfen bölüm / blok seçiniz.</span>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { profileOptions, categoryOptions, blockOptions } from '~/data/ticketCategoryOptions'
const emit = defineEmits(['change'])

// reactive model values
const profile = ref('')
const category = ref('')
const block = ref('')

// touched flags for validation message display after user interaction without selection
const touched = ref({ profile:false, category:false, block:false })

// open state for custom dropdowns
const open = ref({ profile: false, category: false, block: false })

const profileLabel = computed(() => {
  const p = profileOptions.find(x => x.value === profile.value)
  return p ? p.label : 'BİLET TÜRÜ'
})
const categoryLabel = computed(() => {
  const p = categoryOptions.find(x => x.value === category.value)
  return p ? p.label : 'KATEGORİ'
})
const blockLabel = computed(() => {
  const p = blockOptions.find(x => x.value === block.value)
  return p ? p.label : 'BÖLÜM / BLOK'
})

// refs to detect outside clicks if needed
const pRef = ref(null)
const cRef = ref(null)
const bRef = ref(null)

function emitChange(){
  const payload = {
    profile: profile.value,
    category: category.value,
    block: block.value,
    profileLabel: profileLabel.value,
    categoryLabel: categoryLabel.value,
    blockLabel: blockLabel.value,
    categoryPrice: (categoryOptions.find(x => x.value === category.value) || {}).price || null
  }
  emit('change', payload)
}

function toggle(name){
  open.value.profile = false
  open.value.category = false
  open.value.block = false
  if(name === 'profile') open.value.profile = !open.value.profile
  if(name === 'category' && profile.value) open.value.category = !open.value.category
  if(name === 'block' && category.value) open.value.block = !open.value.block
}

function selectProfile(opt){
  profile.value = opt.value
  category.value = ''
  block.value = ''
  open.value.profile = false
  touched.value.profile = false
  emitChange()
}

function selectCategory(opt){
  if(!profile.value) return
  category.value = opt.value
  block.value = ''
  open.value.category = false
  touched.value.category = false
  emitChange()
}

function selectBlock(opt){
  if(!category.value) return
  block.value = opt.value
  open.value.block = false
  touched.value.block = false
  emitChange()
}

function onDocClick(e){
  const targets = [pRef.value, cRef.value, bRef.value]
  if(!targets.some(t => t && t.contains(e.target))){
    if(open.value.profile && !profile.value) touched.value.profile = true
    if(open.value.category && !category.value) touched.value.category = true
    if(open.value.block && !block.value) touched.value.block = true
    open.value.profile = false
    open.value.category = false
    open.value.block = false
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.ticket-category-bar{ display:block }
.category-wrapper{ display:flex; gap:8px; align-items:flex-start; background:#e7f2fb; padding:18px; border-radius:10px; border:1px solid #b5d4e8 }
.select-item{ width:256px; flex:0 0 256px; position:relative }
.cs-toggle{ width:256px; height:52px; padding:8px 12px; border-radius:10px; border:1px solid rgba(11,102,209,0.18); background:#ffffff; font-size:15px; color:#026CDF; text-align:left; display:flex; align-items:center; justify-content:space-between; cursor:pointer; box-shadow:0 2px 4px rgba(11,102,209,0.05) }
.toggle-inner{ display:flex; flex-direction:column; align-items:flex-start }
.field-label{ margin:0 0 4px }
.custom-select.empty .field-value{ font-size:16px; color:#026CDF; font-weight:500; text-transform:uppercase; letter-spacing:0.2px }
.custom-select.selected .field-label{ font-size:12px; color:#026CDF; font-weight:600; text-transform:uppercase; letter-spacing:0.4px }
.custom-select.selected .field-value{ font-size:14px; color:#0b1111; font-weight:400 }
.caret{ font-size:18px; color:#026CDF }
.blue-arrow{ width:22px; height:22px; background-image:url('~/assets/images/bluedownarrow.png'); background-repeat:no-repeat; background-position:center; background-size:22px 22px; display:inline-block }
.validation-msg{ position:absolute; top:100%; left:0; margin-top:4px; font-size:9px; line-height:1; color:#F44336; font-weight:400 }
.cs-options{ position:absolute; top:100%; left:0; width:100%; margin-top:-36px; background:#ffffff; border:1px solid #dce4ec; border-radius:12px; box-shadow:0 10px 28px rgba(15,23,42,0.18); list-style:none; padding:12px 0 8px; z-index:260; overflow:hidden }
.cs-option{ padding:12px 16px; cursor:pointer; color:#1f2937; background:#f9fbfd; font-size:14px }
.cs-option + .cs-option{ border-top:1px solid #edf2f6 }
.cs-option:hover{ background:#eef4fa }
.custom-select.disabled .cs-toggle{ background:#fff }
.cs-option.selected{ background:#dfe9f3; color:#0b66d1; font-weight:600 }
@media (max-width:920px){ .category-wrapper{ flex-direction:column; gap:8px } .select-item{ width:100% } .cs-toggle{ width:100% } }
</style>
