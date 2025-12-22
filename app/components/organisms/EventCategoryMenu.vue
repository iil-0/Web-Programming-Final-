<template>
  <nav class="event-cat-menu" aria-label="Kategori menüsü" @mouseleave="open=null">
    <!-- Shared visible categories bar: use the same classes as home header -->
    <CategoryStrip
      :items="stripItems"
      ulClass="mainheader__categories"
      linkClass="mainheader__category tagcontrol"
      @menu-hover="onHover"
    />

    <!-- Event-group specific mega menu panel -->
    <div v-if="panel" class="submenu open" @mouseenter="holdOpen" @mouseleave="open=null">
      <div class="submenu-grid">
        <EventCategoryCard v-for="(it, k) in panel.items" :key="k" :label="it.label" :image="it.image" :href="it.href" />
      </div>
      <a class="see-all" :href="panel.seeAll.href">{{ panel.seeAll.label }}</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CategoryStrip from '~/components/molecules/CategoryStrip.vue'
import EventCategoryCard from '~/components/molecules/EventCategoryCard.vue'
import { categories as defaultCats } from '~/data/eventGroupCategories'

const props = defineProps({ cats: { type: Array, default: () => defaultCats } })
const open = ref(null)

const stripItems = computed(() => props.cats.map(c => ({
  label: c.label,
  type: c.submenu ? 'menu' : 'link',
  href: c.href || '#'
})))

const panel = computed(() => {
  const idx = open.value
  if (idx == null) return null
  const c = props.cats[idx]
  return c && c.submenu ? c.submenu : null
})

function onHover(i){ open.value = i }
function holdOpen(){ /* keep open while hovering panel */ }
</script>

<style scoped>
.event-cat-menu{ position:relative; display:block; }
/* Only panel styling remains here; list looks comes from home header classes */
.submenu{ display:none; position:absolute; top:100%; left:0; background:#fff; border:1px solid #eaedf3; padding:12px; z-index:20; box-shadow:0 8px 20px rgba(0,0,0,.08); width: 780px; }
.submenu.open{ display:block; }
.submenu-grid{ display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; }
.see-all{ display:inline-block; margin-top:10px; color:#009CDE; text-decoration:none; font-size:13px; }
</style>
