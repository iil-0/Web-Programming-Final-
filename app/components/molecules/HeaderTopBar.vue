<template>
  <div :class="['header-top-bar', variant ? `header-top--${variant}` : '']" :style="{ background: backgroundColor }">
    <div class="header-top-inner">
      <div class="header-top-left">
        <button type="button" class="top-link top-link--icon">
          <img :src="trIcon" alt="TR" class="top-icon-img" />
          <span class="top-icon">TR</span>
        </button>
        <button type="button" class="top-link top-link--icon">
          <img :src="worldIcon" alt="" class="top-icon-img top-icon-img--invert" />
          <span class="top-text">Tüm Türkiye</span>
        </button>
      </div>

      <div class="header-top-right">
        <button type="button" class="top-link top-link--icon">
          <img :src="giftCardIcon" alt="" class="top-icon-img top-icon-img--gift" />
          Hediye Kart
        </button>
        <button type="button" class="top-link">Aylık Dergi</button>
        <button type="button" class="top-link">Blog</button>
        <button type="button" class="top-link">Yardım</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import trIconImg from '~/assets/images/tr.png'
import worldIconImg from '~/assets/images/world.png'
import giftCardIconImg from '~/assets/images/gift-card.png'

const trIcon = trIconImg
const worldIcon = worldIconImg
const giftCardIcon = giftCardIconImg

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#1F262D'
  },
  variant: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.header-top-bar {
  width: 100%;
  height: 32px;
  color: #ffffff;
  font-family: 'Averta', 'Poppins', system-ui, Arial, sans-serif;
}

.header-top-inner {
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-top-left,
.header-top-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-top-left {
  margin-left: 45px; /* TR ve Tüm Türkiye hafif sağa */
}

.header-top-right {
  margin-right: 52px; /* Yardım butonunu GİT butonu ile hizala */
  gap: 25px; /* Sağdaki linklerin aralığını aç, Yardım sabit kalsın */
}

.top-link {
  border: 0;
  background: transparent;
  color: #ffffff;
  font-family: 'Averta', 'Poppins', system-ui, Arial, sans-serif;
  font-size: 15px;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Right-side top links: Hediye Kart, Taraftar kaydı, Blog, Yardım */
.header-top-bar.header-top--event .header-top-right .top-link {
  color: #BFDAF6;
  font-size: 14px;
}

/* Left-side small items: TR and Bölge/Tüm Türkiye for event variant */
.header-top-bar.header-top--event .header-top-left .top-link {
  color: #BFDAF6;
  font-size: 12px;
}

.top-link--icon .top-icon {
  font-weight: 600;
}

.top-icon-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.top-icon-img--invert {
  filter: invert(1) brightness(2);
  width: 16px;
  height: 16px;
}

.top-icon-img--gift {
  width: 20px;
  height: 20px;
  filter: invert(1) brightness(2);
}

.top-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .header-top-inner {
    padding: 0 8px;
    font-size: 14px;
  }

  .header-top-right {
    gap: 10px;
  }
}
</style>
