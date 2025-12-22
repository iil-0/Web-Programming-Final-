<template>
  <div class="tile" role="group" :aria-label="title">
    <div class="thumb">
      <img :src="image" :alt="title" />
    </div>
    <div class="meta">
      <div class="title" :title="title">{{ title }}</div>
      <div class="subtitle" :title="subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.tile{
  width: 100%; height:180px; display:flex; flex-direction:column; background:#fff; border:1px solid #eaedf3; border-radius:0; overflow:hidden;
}
.thumb{ width:100%; height:90px; overflow:hidden; background:#f0f3f9; }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.meta{ flex:1; padding:6px 8px 8px 8px; display:flex; flex-direction:column; gap:4px; }
.title{ font-size:14px; line-height:16px; letter-spacing:0px; color:#414141; font-weight:700; font-family:'Poppins', system-ui, Arial, sans-serif; overflow:hidden; white-space:normal; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; }
.subtitle{ font-size:11px; line-height:14px; letter-spacing:0px; color:#414141; font-weight:400; font-family:'Poppins', system-ui, Arial, sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
</style>
