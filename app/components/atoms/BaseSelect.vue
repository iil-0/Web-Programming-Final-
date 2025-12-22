<template>
  <div class="input-wrap" :class="{ active: isFocused || !!model, empty: !model }">
    <!-- Visible custom trigger (keeps .selectEl class for page-level overrides) -->
    <div
      class="selectEl"
      :id="id"
      role="button"
      tabindex="0"
      :aria-haspopup="'listbox'"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggleOpen"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="onKeydown"
    >
      {{ displayText }}
    </div>

    <!-- Dropdown list -->
    <ul v-if="open" class="dropdown" role="listbox">
      <li
        v-for="(opt, idx) in optionsList"
        :key="opt.value + '_' + idx"
        role="option"
        :aria-selected="model === opt.value ? 'true' : 'false'"
        :class="['option', { selected: model === opt.value }]"
        @mousedown.prevent
        @click="select(opt.value)"
      >
        {{ opt.label }}
      </li>
    </ul>

    <!-- Hidden native select to read slot options and preserve form semantics -->
    <select
      ref="hiddenSelect"
      class="native"
      :name="name"
      :autocomplete="autocomplete"
      v-model="model"
      aria-hidden="true"
      tabindex="-1"
    >
      <option :value="''" disabled hidden>{{ placeholder || label }}</option>
      <slot />
    </select>

    <label v-if="label || placeholder" class="float-label" :for="id">{{ label || placeholder }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  name: { type: String, default: '' },
  id: { type: String, default: undefined },
  autocomplete: { type: String, default: 'off' },
  // Özel durumlar için: placeholder odaklanınca da görünsün
  alwaysShowPlaceholder: { type: Boolean, default: false },
  // Boş ('') değerli ilk option'ı da listede göstermek için
  includeEmptyOption: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','focus','blur'])

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
const isFocused = ref(false)
const open = ref(false)
const hiddenSelect = ref(null)
const optionsList = ref([])

const displayText = computed(() => {
  if (!model.value){
    // Varsayılan: odaklanınca placeholder'ı gizleyip sadece float-label gösteririz.
    // alwaysShowPlaceholder=true geldiğinde, odakta da yazı kaybolmaz.
    if (props.alwaysShowPlaceholder) {
      return props.placeholder || props.label || ''
    }
    return isFocused.value ? '' : (props.placeholder || props.label || '')
  }
  const found = optionsList.value.find(o => o.value === model.value)
  return found ? found.label : model.value
})

function parseOptions(){
  const sel = hiddenSelect.value
  if (!sel) return
  const arr = []
  for (const opt of sel.options){
    if (opt.disabled && opt.hidden) continue // skip gizli placeholder
    if (!props.includeEmptyOption && opt.value === '') continue
    arr.push({ value: opt.value, label: opt.label || String(opt.textContent || opt.value) })
  }
  optionsList.value = arr
}

function handleFocus(){ isFocused.value = true; emit('focus') }
function handleBlur(e){
  // Blur on the trigger itself (tab away). If dropdown is open, we'll close and emit blur.
  // Let click selection manage its own close/blur emit.
  if (!open.value){ isFocused.value = false; emit('blur') }
}
function openDropdown(){ if (!open.value){ open.value = true; isFocused.value = true; emit('focus'); attachOutside() } }
function closeDropdown(emitBlur = true){ if (open.value){ open.value = false; detachOutside(); if (emitBlur){ isFocused.value = false; emit('blur') } } }
function toggleOpen(){ open.value ? closeDropdown(false) : openDropdown() }
function select(val){ model.value = val; closeDropdown(true) }

function onKeydown(e){
  if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleOpen(); }
  if (e.key === 'Escape'){ e.preventDefault(); closeDropdown(true) }
}

function onOutsideClick(ev){
  const root = ev.composedPath ? ev.composedPath() : []
  // If click is outside this component's root element, close
  // We rely on the nearest .input-wrap for containment
  const el = (hiddenSelect.value && hiddenSelect.value.closest('.input-wrap')) || null
  if (el && !root.includes(el)) closeDropdown(true)
}
function attachOutside(){ document.addEventListener('mousedown', onOutsideClick) }
function detachOutside(){ document.removeEventListener('mousedown', onOutsideClick) }

onMounted(() => { parseOptions() })
onBeforeUnmount(() => { detachOutside() })
</script>

<style scoped>
.input-wrap{ position: relative; display:block; }
.float-label{
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
  transition: all .15s ease;
  font-size: 14px;
  line-height: 1;
}
.input-wrap.active .float-label{
  top: 6px;
  transform: none;
  font-size: 11px;
}
.selectEl{
  height: 44px;
  padding: 0 36px 0 16px; /* room for arrow graphic */
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.6);
  background: transparent;
  color: #fff;
  outline: none;
  width: 100%;
  max-width: 520px;
  display:flex; align-items:center;
  cursor: pointer;
  user-select: none;
}
.native{ position:absolute; opacity:0; pointer-events:none; width:0; height:0; }

.dropdown{
  position: absolute;
  left: 25%; right: auto; width: 50%;
  top: 0; /* open over the trigger, covering its top area */
  z-index: 20;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px; /* yumuşak köşeler */
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  list-style: none; margin: 0; padding: 6px 0;
}
.option{
  padding: 12px 14px;
  font-family: inherit;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  background: #F7FAFF; /* kırık beyaz (unselected) */
  color: #111827;
  list-style: none;
}
.option + .option{ border-top: 1px solid #e5e7eb; }
.option.selected{ background: #E5E7EB; } /* seçili gri arka plan */
.option:hover{ filter: brightness(0.98); }
</style>
