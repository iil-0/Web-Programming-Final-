<template>
  <section class="spotlight-section" aria-labelledby="spotlight-heading">
    <h2 id="spotlight-heading" class="sr-only">Spotlight</h2>

    <div class="spotlight-row" v-if="!loading && items.length">
      <SpotlightSlider :items="items" />
      <div class="discover-banner">
        <img :src="discoverImage" alt="Keşfet &amp; Eğlen" width="305" height="110" />
      </div>
    </div>
    <div v-else class="loading">Yükleniyor…</div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSpotlightStore } from "~/stores/spotlight";
import { storeToRefs } from "pinia";

const spotlightStore = useSpotlightStore();
const { items, loading } = storeToRefs(spotlightStore);
const { fetchSpotlight } = spotlightStore;
onMounted(fetchSpotlight);

const discoverImage = new URL("../../assets/spotlight/kesfet_eglen.png", import.meta.url).href;
</script>

<style scoped>
.loading {
  padding: 12px 0;
  font-size: 14px;
  color: #6b7280;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.spotlight-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.discover-banner img {
  width: 305px;
  height: 110px;
  display: block;
  margin-top: 25px;
  margin-left: -10px; /* 10px sola kaydır */
}

@media (max-width: 1100px) {
  .spotlight-row {
    flex-direction: column;
    gap: 8px;
  }

  .discover-banner img {
    align-self: flex-start;
  }
}
</style>
