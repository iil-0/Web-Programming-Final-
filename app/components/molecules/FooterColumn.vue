<template>
  <section class="footer-col">
    <h3 class="footer-col__title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <ul v-if="items?.length" class="footer-col__list">
      <li v-for="(it, i) in items" :key="i">
        <a :href="it.href" :target="it.external ? '_blank' : undefined" rel="noopener">{{ it.label }}</a>
      </li>
    </ul>
    <div v-if="$slots.default" class="footer-col__slot">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] }
});
</script>
