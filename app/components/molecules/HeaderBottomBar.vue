<template>
  <div class="header-bottom-bar">
    <div class="header-bottom-inner">
      <div class="header-bottom-item">
        <div class="discover-label-wrap">
          <span class="discover-icon" :style="{ '--icon-url': `url(${discoverIcon})` }"></span>
          <span class="discover-label">KEŞFET</span>
        </div>
        <BaseSelect
          v-model="filters.category"
          label="Tüm Kategoriler"
          placeholder="Tüm Kategoriler"
          class="filter-select"
          :alwaysShowPlaceholder="true"
          :includeEmptyOption="true"
        >
          <option value="">Tüm Kategoriler</option>
          <option value="muzik">Müzik</option>
          <option value="sahne">Sahne</option>
          <option value="spor">Spor</option>
          <option value="aile">Aile</option>
          <option value="egitim">Eğitim &amp; Fazlası</option>
        </BaseSelect>
      </div>

      <div class="header-bottom-item">
        <div class="discover-label-wrap">
          <span class="discover-icon" :style="{ '--icon-url': `url(${dateIcon})` }"></span>
          <span class="discover-label">TARİH</span>
        </div>
        <BaseSelect
          v-model="filters.date"
          label="Tüm Tarihler"
          placeholder="Tüm Tarihler"
          class="filter-select"
          :alwaysShowPlaceholder="true"
          :includeEmptyOption="true"
        >
          <option value="">Tüm Tarihler</option>
          <option value="bugun">Bugün</option>
          <option value="hafta">Bu Hafta</option>
          <option value="ay">Bu Ay</option>
        </BaseSelect>
      </div>

      <div class="header-bottom-item">
        <div class="discover-label-wrap">
          <span class="discover-icon" :style="{ '--icon-url': `url(${placeIcon})` }"></span>
          <span class="discover-label">YER</span>
        </div>
        <BaseSelect
          v-model="filters.location"
          label="Tüm Türkiye"
          placeholder="Tüm Türkiye"
          class="filter-select"
          :alwaysShowPlaceholder="true"
          :includeEmptyOption="true"
        >
          <option value="">Tüm Türkiye</option>
          <option value="İstanbul">İstanbul</option>
          <option value="Ankara">Ankara</option>
          <option value="İzmir">İzmir</option>
          <option value="Adana">Adana</option>
          <option value="Adıyaman">Adıyaman</option>
          <option value="Afyonkarahisar">Afyonkarahisar</option>
          <option value="Ağrı">Ağrı</option>
          <option value="Aksaray">Aksaray</option>
          <option value="Amasya">Amasya</option>
          <option value="Antalya">Antalya</option>
          <option value="Artvin">Artvin</option>
          <option value="Aydın">Aydın</option>
          <option value="Balıkesir">Balıkesir</option>
          <option value="Bartın">Bartın</option>
          <option value="Batman">Batman</option>
          <option value="Bayburt">Bayburt</option>
          <option value="Bilecik">Bilecik</option>
          <option value="Bingöl">Bingöl</option>
          <option value="Bitlis">Bitlis</option>
          <option value="Bolu">Bolu</option>
          <option value="Burdur">Burdur</option>
          <option value="Bursa">Bursa</option>
          <option value="Çanakkale">Çanakkale</option>
          <option value="Çankırı">Çankırı</option>
          <option value="Çorum">Çorum</option>
          <option value="Denizli">Denizli</option>
          <option value="Diyarbakır">Diyarbakır</option>
          <option value="Düzce">Düzce</option>
          <option value="Edirne">Edirne</option>
          <option value="Elazığ">Elazığ</option>
          <option value="Erzincan">Erzincan</option>
          <option value="Erzurum">Erzurum</option>
          <option value="Eskişehir">Eskişehir</option>
          <option value="Gaziantep">Gaziantep</option>
          <option value="Giresun">Giresun</option>
          <option value="Gümüşhane">Gümüşhane</option>
          <option value="Hakkari">Hakkari</option>
          <option value="Hatay">Hatay</option>
          <option value="Iğdır">Iğdır</option>
          <option value="Isparta">Isparta</option>
          <option value="Kahramanmaraş">Kahramanmaraş</option>
          <option value="Karabük">Karabük</option>
          <option value="Karaman">Karaman</option>
          <option value="Kars">Kars</option>
          <option value="Kastamonu">Kastamonu</option>
          <option value="Kayseri">Kayseri</option>
          <option value="Kırıkkale">Kırıkkale</option>
          <option value="Kırklareli">Kırklareli</option>
          <option value="Kırşehir">Kırşehir</option>
          <option value="Kilis">Kilis</option>
          <option value="Kocaeli">Kocaeli</option>
          <option value="Konya">Konya</option>
          <option value="Kütahya">Kütahya</option>
          <option value="Malatya">Malatya</option>
          <option value="Manisa">Manisa</option>
          <option value="Mardin">Mardin</option>
          <option value="Mersin">Mersin</option>
          <option value="Muğla">Muğla</option>
          <option value="Muş">Muş</option>
          <option value="Nevşehir">Nevşehir</option>
          <option value="Niğde">Niğde</option>
          <option value="Ordu">Ordu</option>
          <option value="Osmaniye">Osmaniye</option>
          <option value="Rize">Rize</option>
          <option value="Sakarya">Sakarya</option>
          <option value="Samsun">Samsun</option>
          <option value="Şanlıurfa">Şanlıurfa</option>
          <option value="Siirt">Siirt</option>
          <option value="Sinop">Sinop</option>
          <option value="Şırnak">Şırnak</option>
          <option value="Sivas">Sivas</option>
          <option value="Tekirdağ">Tekirdağ</option>
          <option value="Tokat">Tokat</option>
          <option value="Trabzon">Trabzon</option>
          <option value="Tunceli">Tunceli</option>
          <option value="Uşak">Uşak</option>
          <option value="Van">Van</option>
          <option value="Yalova">Yalova</option>
          <option value="Yozgat">Yozgat</option>
          <option value="Zonguldak">Zonguldak</option>
        </BaseSelect>
      </div>

      <div class="header-bottom-item header-bottom-item--button">
        <BaseButton type="submit" class="discover-go-btn" variant="">
          GİT
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import BaseSelect from "~/components/atoms/BaseSelect.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import discoverIconImg from "~/assets/images/blueye.png";
import dateIconImg from "~/assets/images/date.png";
import placeIconImg from "~/assets/images/place.png";

const discoverIcon = discoverIconImg;
const dateIcon = dateIconImg;
const placeIcon = placeIconImg;

const filters = reactive({
  category: "",
  date: "",
  location: "",
});
</script>

<style scoped>
.header-bottom-bar {
  width: 100%;
  height: 45px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.22); /* alta daha belirgin gölge */
}

.header-bottom-inner {
  max-width: 1100px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px 0 76px; /* tüm içerik toplamda 60px sağa kaydırıldı */
  display: flex;
  align-items: center;
  gap: 32px; /* 3 kutu grubu arasındaki boşluk artırıldı */
}

.header-bottom-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px; /* label ile kendi kutusu arasını ~10px aç */
}

.header-bottom-item--button {
  justify-content: flex-end;
  margin-left: -12px; /* GİT butonunu YER kutusuna biraz yaklaştır */
}

.filter-select :deep(.selectEl) {
  width: 220px;
  height: 29px;
  min-height: 29px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  border-radius: 0;
  border: 1px solid #d1d5db; /* gri çerçeve */
  background: #ffffff;
  color: #2D4791;
  font-family: 'Averta', 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px; /* Tüm Kategoriler / Tüm Tarihler / Tüm Türkiye yazılarını 3px küçült */
}

.filter-select :deep(.float-label) {
  display: none; /* bu bardaki kutularda ikinci metni gizle */
}

.filter-select :deep(.selectedOption) {
  font-size: 14px;
}

.discover-label-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.discover-icon {
  width: 22px;
  height: 22px;
  display: block;
  background-color: #2D4891;
  -webkit-mask-image: var(--icon-url);
  mask-image: var(--icon-url);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.discover-label {
  font-family: 'Averta', 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 11px;
  letter-spacing: 0.02em;
  font-weight: 500;
  color: #2D4791;
  margin-bottom: 0;
}

.filter-select :deep(.dropdown) {
  left: 0;
  width: 220px;
  top: 100%;
  border-radius: 0;
  max-height: 600px; /* yaklaşık 20 şehir satırı görünsün */
  overflow-y: auto;
}

.filter-select :deep(.option) {
  height: 29px;
  line-height: 29px;
  font-size: 14px;
  padding: 0 10px;
  background: #ffffff;
  color: #2D4791;
  border: none; /* aralarda çizgi yok */
  font-family: 'Averta', 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.filter-select :deep(.option + .option) {
  border-top: none;
}

.filter-select :deep(.option:hover) {
  background: var(--btx-blue-1);
  color: #ffffff;
}

.filter-select :deep(.option.selected) {
  background: var(--btx-blue-1);
  color: #ffffff;
}

.discover-go-btn {
  width: 60px;
  height: 29px;
  min-width: 29px;
  min-height: 29px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #026cdf;
  color: #ffffff;
  font-family: 'Averta', 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 17px;
  font-weight: 500; /* biraz daha ince yazı */
  border-radius: 3px; /* hafif yumuşak köşe */
}

@media (max-width: 900px) {
  .header-bottom-inner {
    padding: 0 8px;
    gap: 8px;
  }

  .filter-select :deep(.selectedOption) {
    font-size: 12px;
  }
}
</style>
