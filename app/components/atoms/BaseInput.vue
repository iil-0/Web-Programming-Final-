<template>
  <div class="input-wrap" :class="{ active: isFocused || !!model, empty: !model }">
    <input
      class="searchInput"
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
  :placeholder="nativePlaceholder ? placeholder : ''"
      :readonly="readonly"
      ref="inputEl"
      v-model="model"
      @focus="() => { onFocus(); if (openPickerOnFocus) tryOpenDatePicker(); }"
      @blur="onBlur"
      @keydown="onKeyDown"
      @beforeinput="onBeforeInput"
      @paste.prevent="onBlockEditing"
      @drop.prevent="onBlockEditing"
      @keydown.enter="$emit('enter', model)"
    />
    <label v-if="label || placeholder" class="float-label" :for="id">{{ label || placeholder }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Etkinlik, sanatçı ya da mekan arayın" },
  label: { type: String, default: "" },
  type: { type: String, default: 'text' },
  name: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  id: { type: String, default: undefined }
  ,readonly: { type: Boolean, default: false }
  ,nativePlaceholder: { type: Boolean, default: false }
  ,openPickerOnFocus: { type: Boolean, default: false }
  ,blockTypingForDate: { type: Boolean, default: true }
});
const emit = defineEmits(["update:modelValue","enter","focus","blur"]);
const model = computed({
  get: () => props.modelValue,
  set: v => emit("update:modelValue", v)
});
const isFocused = ref(false)
const inputEl = ref(null)

function onFocus(){
  isFocused.value = true
  emit('focus')
}
function onBlur(){
  isFocused.value = false
  emit('blur')
}

// If this is a date input and browser supports the showPicker() API,
// open the native date picker when the field receives focus. We also
// use readonly on date fields to prevent manual typing.
function tryOpenDatePicker(){
  if (props.type === 'date' && inputEl.value && typeof inputEl.value.showPicker === 'function'){
    try { inputEl.value.showPicker() } catch(e) { /* ignore */ }
  }
}

function shouldBlockTypingForDate(){
  return props.type === 'date' && props.blockTypingForDate === true;
}

function onKeyDown(e){
  if (!shouldBlockTypingForDate()) return;
  // Allow navigation keys that don't change value: Tab only
  if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Escape') return;
  e.preventDefault();
  // Nudge users to picker
  tryOpenDatePicker();
}

function onBeforeInput(e){
  if (!shouldBlockTypingForDate()) return;
  e.preventDefault();
}

function onBlockEditing(){ /* noop; handled by .prevent modifiers */ }
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
  font-size: 11px; /* biraz daha küçük */
}
.searchInput{
  height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.6);
  background: transparent;
  color: #fff;
  outline: none;
  width: 100%;
  max-width: 520px;
}
.searchInput::placeholder{ color: rgba(255,255,255,.9); }
</style>
