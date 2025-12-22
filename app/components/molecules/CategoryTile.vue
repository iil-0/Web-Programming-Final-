<template>
  <button type="button" class="cat-tile" :aria-label="title" @click="$emit('select')">
    <div class="thumb" :class="{ empty: !image }">
      <img v-if="image" :src="image" :alt="title" loading="lazy" />
    </div>
    <div class="caption">
      <div class="heading" :title="title">{{ title }}</div>
    </div>
  </button>

</template>

<script setup lang="ts">
const props = defineProps({
  image: { type: String, default: '' },
  title: { type: String, required: true }
})
</script>

<style scoped>
.cat-tile{ display:flex; flex-direction:column; width:180px; height:159px; background:#fff; border:1px solid #eaedf3; border-radius:0; overflow:hidden; cursor:pointer; padding:0; text-align:left; }
.cat-tile:hover, .cat-tile:focus-visible{ background:#f7f7f7; }
.thumb{ width:100%; height:99px; background:#f0f3f9; flex:0 0 auto; }
.thumb img{ width:100%; height:100%; display:block; object-fit:cover; }
.caption{ width:100%; height:60px; padding:8px; box-sizing:border-box; display:flex; align-items:flex-start; }
.heading{ 
  font-family: 'InterstateWGL', 'Poppins', system-ui, Arial, sans-serif;
  font-size: 15px; line-height:16px; font-weight:400; letter-spacing:0.24px; 
  color:#111827; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical;
}
.cat-tile:hover .heading, .cat-tile:focus-visible .heading{ 
  text-decoration: underline; 
  text-decoration-color:#414141; 
  text-decoration-thickness:1px; 
  text-underline-offset:2px;
}
</style>
