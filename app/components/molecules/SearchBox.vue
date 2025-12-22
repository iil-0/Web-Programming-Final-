<template>
  <form
    tabindex="0"
    :id="formId"
    method="get"
    action="/search/TURKIYE/tr"
    @submit.prevent="onSubmit"
  >
    <input
      type="text"
      :name="nameAttr"
      :id="inputId"
      :class="inputClass"
      :placeholder="placeholder"
      autocomplete="off"
      v-model="q"
    />
    <span class="searchsubmitwrap">
      <button :id="submitBtnId" :class="submitBtnClass" type="submit"></button>
    </span>
    <span class="clearwrap">
      <button :class="clearBtnClass" type="reset" @click="q = ''"></button>
    </span>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  formId: { type: String, default: "search_form" },
  inputId: { type: String, default: "s" },
  inputClass: { type: String, default: "searchpanel__tf ui-autocomplete-input" },
  nameAttr: { type: String, default: "text" },
  placeholder: { type: String, default: "Etkinlik, sanatçı ya da mekan arayın" },
  submitBtnId: { type: String, default: "search__submit__button" },
  submitBtnClass: { type: String, default: "searchpanel__submit_new" },
  clearBtnClass: { type: String, default: "searchpanel__clearbtn nodisplay" },
});
const emit = defineEmits(["search"]);
const q = ref("");
function onSubmit() {
  emit("search", q.value.trim());
}
</script>
