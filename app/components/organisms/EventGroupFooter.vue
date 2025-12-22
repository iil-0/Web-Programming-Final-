<template>
  <footer class="eg-footer">
    <div class="eg-footer__grid">
      <section class="eg-follow">
        <BaseLogo
          classAttr="eg-logo"
          :width="360"
          :height="90"
          href="/"
          style="margin-top:-10px; margin-left:0; margin-bottom:10px;"
        />

        <!-- Başlıklar logonun hemen altından başlar -->
        <h3 class="footer-col__title" style="margin-top:0; margin-bottom:10px; text-align:left; width:100%;">Bizi Takip Edin</h3>
        <SocialLinks :platforms="socials" style="margin-bottom:18px;" />

        <h3 class="footer-col__title apps-title" style="margin-top:0; margin-bottom:10px; text-align:left; width:100%;">Uygulamalarımız</h3>
        <div class="stores" style="gap:18px;">
          <a href="https://itunes.apple.com/tr/app/biletix/id1181457295?ls=1&mt=8" target="_blank" rel="noopener">
            <img :src="downloadAppleImg" alt="App Store'dan indir" width="213" height="68" class="store-img" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.biletix.ticketmaster" target="_blank" rel="noopener">
            <img :src="googlePlayImg" alt="Google Play'den indir" width="213" height="68" class="store-img googleplay-img" />
          </a>
        </div>
      </section>

  <FooterColumn class="footer--about" title="Hakkımızda" :items="aboutItems" />
  <FooterColumn class="footer--help" title="Yardım Edelim" :items="helpItems" />
  <FooterColumn class="footer--work" title="Bizimle Çalışın" :items="workItems" />
    </div>

    <div class="eg-footer__bottom">
      <ul class="eg-policies__list">
        <li v-for="(it, i) in policyItems" :key="i">
          <template v-if="it.type === 'button'">
            <button id="ot-sdk-btn" class="ot-sdk-show-settings">{{ it.label }}</button>
          </template>
          <template v-else>
            <a :href="it.href" :target="it.external ? '_blank' : undefined" rel="noopener">{{ it.label }}</a>
          </template>
        </li>
      </ul>
      <div class="eg-smallprint">
        <p>© 2025 Biletix Bilet Dağıtım Basım ve Tic. A.Ş. Tüm hakları saklıdır.</p>
      </div>
    </div>

    <p class="eg-legal">
      Bu internet sitesinin kullanımı, ticari kullanımını engelleyen Kullanım Koşulları'na tabidir. Bu sayfayı geçtiğinizde bu koşulları kabul etmiş sayılırsınız.
    </p>
  </footer>
</template>

<script setup lang="ts">
import FooterColumn from '~/components/molecules/FooterColumn.vue'
import SocialLinks from '~/components/molecules/SocialLinks.vue'
import BaseLogo from '~/components/atoms/BaseLogo.vue'

import FacebookIcon from '~/assets/images/FacebookIcon.png'
import TwitterIcon from '~/assets/images/TwitterIcon.png'
import BlogIcon from '~/assets/images/BlogIcon.png'
import YoutubeIcon from '~/assets/images/YoutubeIcon.png'
import InstagramIcon from '~/assets/images/InstagramIcon.png'
import LinkedlnIcon from '~/assets/images/LinkedlnIcon.png'
import SpotifyIcon from '~/assets/images/SpotifyIcon.png'
import TiktokIcon from '~/assets/images/TiktokIcon.png'
import DownloadAppleImg from '~/assets/images/Downloadapple.png'
import GooglePlayTrIcon from '~/assets/images/googleplay.trICON.png'

const helpItems = [
  { label: 'Yardım/SSS', href: '/yardim/TURKIYE/tr' },
  { label: 'Satış Kanalları', href: '/saleschannel/TURKIYE/tr' },
  { label: 'Hesabım', href: 'https://www.biletix.com/myaccount/tr/my-personal-information', external: true },
  { label: 'Hediye Kart', href: '/hediyekart/tr' },
  { label: 'Etkinlik Katılım Sigortası', href: '/insurance/TURKIYE/tr' }
]

const aboutItems = [
  { label: 'Biz Kimiz', href: 'https://business.ticketmaster.com.tr/', external: true },
  { label: 'Kurum Politikamız', href: '/qualitypolicies/TURKIYE/tr' },
  { label: 'Görsel Materyaller', href: 'https://www.biletix.com/static/docs/Gorsel_Materyal_Rehberi_2025.pdf', external: true },
  { label: 'Bize Ulaşın', href: '/contactus/TURKIYE/tr' },
  { label: 'Live Nation Entertainment', href: 'http://www.livenation.com/', external: true },
  { label: 'Biletinizin Hikayesi', href: 'https://trust.ticketmaster.com.tr/', external: true },
  { label: 'Bilgi Toplumu Hizmetleri', href: 'https://mths.ttr.com.tr/firmabilgileri.aspx?mersis=0171009936100018', external: true }
]

const workItems = [
  { label: 'Etkinlik Biletleriniz', href: 'https://business.ticketmaster.com.tr', external: true },
  { label: 'Reklam Verin', href: 'https://business.ticketmaster.com.tr/bize-ulasin/', external: true },
  { label: 'Kariyer', href: '/career/TURKIYE/tr' },
  { label: 'Affiliate Programı', href: 'https://developer.ticketmaster.com/partners/', external: true }
]

const policyItems = [
  { label: 'TTK Bildirimleri', href: '/ttk/TURKIYE/tr' },
  { label: 'Gizlilik Politikası', href: 'https://privacy.ticketmaster.com.tr/tr/privacy-policy', external: true },
  { label: 'Çerez Politikası', href: 'https://privacy.ticketmaster.com.tr/tr/cookie-policy', external: true },
  { label: 'Tercihleri Yönet', type: 'button' },
  { label: 'Sözleşme ve Politikalar', href: '/ourpolicies/TURKIYE/tr' }
]

const socials = [
  { title:'Facebook',  href:'https://www.facebook.com/Biletix', src: FacebookIcon },
  { title:'Twitter',   href:'https://twitter.com/biletix', src: TwitterIcon },
  { title:'Blog',      href:'http://blog.biletix.com/', src: BlogIcon },
  { title:'Youtube',   href:'https://www.youtube.com/channel/UCI6ownTOlxgaN0Um74-sC6Q', src: YoutubeIcon },
  { title:'Instagram', href:'http://instagram.com/biletix', src: InstagramIcon },
  { title:'LinkedIn',  href:'https://www.linkedin.com/company/biletix', src: LinkedlnIcon },
  { title:'Spotify',   href:'https://open.spotify.com/user/qcjtfkcpiw94n579mfq1h2pq2', src: SpotifyIcon },
  { title:'TikTok',    href:'https://www.tiktok.com/@ticketmasterturkiye?_t=8hM0Q36uYa6&_r=1', src: TiktokIcon }
]

const downloadAppleImg = DownloadAppleImg
const googlePlayImg = GooglePlayTrIcon
</script>

<style scoped>
.eg-footer{
  background:#1F262D; color:#fff;
  /* full-bleed background while centering content in the grid below */
  width:100%;
  box-sizing:border-box; padding:28px 0 16px;
  display:flex; flex-direction:column; min-height:418px;
  /* enforce Poppins regular for all footer text by default */
  font-family: 'Poppins', system-ui, Arial, sans-serif;
  font-weight:400;
  font-size:14px;
}

.eg-footer a{ color:#fff; text-decoration:none; font-weight:400; font-family:inherit; font-size:inherit; line-height:1.6; }
.eg-footer a:visited, .eg-footer a:active{ color:#fff; }

/* Force white links inside child FooterColumn components */
:deep(.footer-col__list a),
:deep(.footer-col__list a:visited),
:deep(.footer-col__list a:active){ color:#ffffff !important; }
:deep(.footer-col__list a:hover){ color:#ffffff; text-decoration:none; }
.eg-footer a:hover{ text-decoration:none; }

/* GRID */
.eg-footer__grid{
  width:100%; margin:0 auto; display:grid; max-width:1520px;
  grid-template-columns: 360px 1fr 1fr 1fr;
  grid-template-areas: 'follow about help work';
  gap:28px; /* equal gap between rows and columns */
  align-items:start; justify-items:start;
  flex:1 0 auto;
  /* add extra left padding so the three content columns sit closer to the right edge (can be tuned) */
  padding-left:140px;
}
.eg-follow{ grid-area: follow; display:flex; flex-direction:column; align-items:flex-start; width:360px; padding-left:0; /* pull the logo slightly left so it doesn't move with the other columns */
  margin-left: -180px;
}
.footer--about{ grid-area: about; }
.footer--help{ grid-area: help; }
.footer--work{ grid-area: work; }

/* Start the three content columns lower so their headers align under the logo */
.footer--about,
.footer--help,
.footer--work{
  margin-top:58px;
}

.eg-logo{ display:block; margin-left:-20px; }
/* Logo görseli; bileşen içi resme zorla ölçü */
:deep(.eg-logo .logo__media){
  width:360px; height:145px; display:block; object-fit:contain;
  image-rendering:-webkit-optimize-contrast;
}

/* Başlıklar */
.footer-col__title{
  font-family:inherit; /* inherit Poppins regular from .eg-footer */
  font-weight:400; font-size:20px; color:#fff;
  margin:4px 0 6px; padding-bottom:0; position:relative; display:block;
  text-transform:none; letter-spacing:0;
}
.footer-col__title::after{ content:none; }

/* Ensure global footer styles (if present) can't force uppercase here */
:deep(.footer-col__title){
  text-transform: none !important;
}

/* Ensure the three main content column titles are explicitly 20px */
.footer--about .footer-col__title,
.footer--help .footer-col__title,
.footer--work .footer-col__title{
  font-size:20px !important;
}

/* Increase spacing between items in each footer column */
:deep(.footer-col__list){
  display: grid;
  gap: 12px; /* increase from global 6px to make rows more airy */
}

/* Ensure titles are enforced at 20px even if other styles apply */
:deep(.footer-col__title){
  font-size:20px !important;
}

/* Store rozetleri */
.stores{ display:flex; gap:12px; align-items:center; margin-top:4px; }
.store-img{ width:213px; height:68px; object-fit:contain; display:block; }
.eg-follow .stores .googleplay-img{ margin-left: -50px; }

.eg-follow{ padding-left:24px !important; }
.eg-follow > .footer-col__title,
.eg-follow > .stores,
.eg-follow :deep(.socials){
  /* Başlık ve ikonları logodan 20px sağda başlat */
  margin-left: 110px !important;
}

/* App rozetlerini başlığa yakın tut */
.eg-follow .stores{
  margin-left: 80px !important; /* 10px daha sola alındı */
  gap:20px !important;         /* ikonlar arası boşluk 20px */
  align-self:flex-start;
}

/* Sosyal ikon satırını da logo ile aynı hizaya çek */
.eg-follow :deep(.socials){
  margin-left: 110px !important;
}
.eg-follow .stores{
  margin-left: 80px !important; /* 10px daha sola alındı (duplicate selector adjusted) */
}

/* ALT BLOK – “bir tık yukarı” */
.eg-footer__bottom{ border-top:1px solid rgba(255,255,255,.16); margin-top:4px; }

.eg-policies__list{
  list-style:none; margin:0; padding:6px 0 0;
  display:flex; gap:14px; flex-wrap:wrap; justify-content:flex-start;
  /* align this policies row with the main footer grid content */
  max-width:1520px; margin:0 auto; padding-left:64px;
}
.eg-policies__list li{ position:relative; padding:0 10px; }
.eg-policies__list li+li{ border-left:1px solid rgba(255,255,255,.18); }

.eg-footer__bottom a, .eg-footer__bottom button{ font-size:12px; }
.eg-footer__bottom #ot-sdk-btn,
.eg-footer__bottom .ot-sdk-show-settings{
  background:transparent !important; border:none !important;
  color:#ffffff !important; text-decoration:none !important;
  padding:0; margin:0; cursor:pointer; font:inherit;
}
.eg-footer__bottom #ot-sdk-btn:hover,
.eg-footer__bottom .ot-sdk-show-settings:hover{
  color:#ffffff !important; text-decoration:none !important;
}

/* Sosyal icon boyutları */
:deep(.social-icon){ width:25px; height:25px; }
:deep(.social-icon img){ width:25px; height:25px; }
/* Store badge’ler inline boyut alır */
:deep(.store-badge img){ width:auto; height:auto; }

/* Sosyal satırı tek satır ve sola hizalı */
:deep(.socials){
  width:auto; height:25px; display:flex;
  flex-wrap:nowrap; align-items:center; justify-content:flex-start;
  gap:15px; margin-left:0; padding-left:0; overflow:hidden;
}

:deep(.footer-col){ text-align:left; }

/* Linklerin alt çizgilerini tamamen kaldır */
:deep(.footer-col__list a),
:deep(.footer-col__list a:link),
:deep(.footer-col__list a:visited),
:deep(.footer-col__list a:hover),
:deep(.footer-col__list a:active),
.eg-footer__bottom a,
.eg-footer__bottom a:link,
.eg-footer__bottom a:visited,
.eg-footer__bottom a:hover,
.eg-footer__bottom a:active{
  text-decoration: none !important; color: #ffffff !important;
}

/* Küçük yazılar */
.eg-smallprint{
  font-size:12px; line-height:1.5;
  /* align to the right edge of the centered footer content */
  max-width:1520px; margin:0 auto;
  text-align:right; padding:0 64px 4px 0;
  /* pull it up slightly so it sits closer to the policies row */
  margin-top:-6px;
}
.eg-smallprint p{ margin:0; }

/* En alt ek cümle (12px, aynı renk) - keep it visually part of footer */
.eg-legal{
  font-size:12px; line-height:1.4; color:#ffffff;
  text-align:center; margin:0; padding:6px 0 0; background:transparent; display:block; width:100%;
}
</style>
