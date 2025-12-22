<template>
    <footer class="bt-footer">
      <div class="bt-footer__grid">
        <!-- YARDIM EDELİM -->
        <FooterColumn class="footer--help" title="YARDIM EDELİM" :items="helpItems" />

        <!-- Hakkımızda -->
        <FooterColumn class="footer--about" title="Hakkımızda" :items="aboutItems" />

        <!-- Bizimle Çalışın -->
        <FooterColumn class="footer--work" title="Bizimle Çalışın" :items="workItems" />

        <!-- Uygulamalarımız -->
        <FooterColumn class="footer--apps" title="Uygulamalarımız">
          <div class="stores">
            <AppStoreBadge
              platform="apple"
              href="https://itunes.apple.com/tr/app/biletix/id1181457295?ls=1&mt=8" />
            <AppStoreBadge
              platform="android"
              href="https://play.google.com/store/apps/details?id=com.biletix.ticketmaster" />
          </div>
        </FooterColumn>

        <!-- POLİTİKALAR & BİLDİRİMLER -->
        <FooterColumn class="footer--policies" title="POLİTİKALAR & BİLDİRİMLER" :items="policyItems">
          <template #title>
            <span class="title-first">POLİTİKALAR</span>
            &nbsp;&amp;&nbsp;BİLDİRİMLER
          </template>
        </FooterColumn>

        <!-- Sağ blok: Bizi Takip Edin -->
        <div class="bt-footer__right">
          <h3 class="footer-col__title">Bizi Takip Edin</h3>
          <SocialLinks :platforms="socials" />
        </div>
      </div>
    </footer>
    <FooterSmallPrint />
  
</template>

<script setup lang="ts">
import FooterColumn from '../molecules/FooterColumn.vue';
import AppStoreBadge from '../atoms/AppStoreBadge.vue';
import SocialLinks from '../molecules/SocialLinks.vue';
import FooterSmallPrint from '../molecules/FooterSmallPrint.vue';

import InstagramIcon from '~/assets/images/InstagramIcon.png'
import FacebookIcon from '~/assets/images/FacebookIcon.png'
import BlogIcon from '~/assets/images/BlogIcon.png'
import TwitterIcon from '~/assets/images/TwitterIcon.png'
import YoutubeIcon from '~/assets/images/YoutubeIcon.png'
import LinkedlnIcon from '~/assets/images/LinkedlnIcon.png'
import SpotifyIcon from '~/assets/images/SpotifyIcon.png'
import TiktokIcon from '~/assets/images/TiktokIcon.png'

const helpItems = [
  { label: 'Yardım/SSS', href: '/yardim/TURKIYE/tr' },
  { label: 'Satış Kanalları', href: '/saleschannel/TURKIYE/tr' },
  { label: 'Hediye Kart', href: '/hediyekart/tr' },
  { label: 'Etkinlik Katılım Sigortası', href: '/insurance/TURKIYE/tr' },
  { label: 'Hesabım', href: 'https://www.biletix.com/myaccount/tr/my-personal-information', external: true }
];

const aboutItems = [
  { label: 'Biz Kimiz', href: 'https://business.ticketmaster.com.tr/', external: true },
  { label: 'Kurum Politikamız', href: '/qualitypolicies/TURKIYE/tr' },
  { label: 'Görsel Materyaller', href: 'https://www.biletix.com/static/docs/Gorsel_Materyal_Rehberi_2025.pdf', external: true },
  { label: 'Bize Ulaşın', href: '/contactus/TURKIYE/tr' },
  { label: 'Live Nation Entertainment', href: 'http://www.livenation.com/', external: true },
  { label: 'Biletinizin Hikayesi', href: 'https://trust.ticketmaster.com.tr/', external: true },
  { label: 'Bilgi Toplumu Hizmetleri', href: 'https://mths.ttr.com.tr/firmabilgileri.aspx?mersis=0171009936100018', external: true },
];

const workItems = [
  { label: 'Etkinlik Biletleriniz', href: 'https://business.ticketmaster.com.tr', external: true },
  { label: 'Reklam Verin', href: 'https://business.ticketmaster.com.tr/bize-ulasin/', external: true },
  { label: 'Kariyer', href: '/career/TURKIYE/tr' },
  { label: 'Affiliate Programı', href: 'https://developer.ticketmaster.com/partners/', external: true }
];

const policyItems = [
  { label: 'Sözleşme ve Politikalar', href: '/ourpolicies/TURKIYE/tr' },
  { label: 'Çerez Politikası', href: 'https://privacy.ticketmaster.com.tr/tr/cookie-policy', external: true },
  { label: 'Tercihleri Yönet', href: '#', external: false }, // buton yerine basit link
  { label: 'TTK Bildirimleri', href: '/ttk/TURKIYE/tr' },
  { label: 'Gizlilik Politikası', href: 'https://privacy.ticketmaster.com.tr/tr/privacy-policy', external: true }
];

const socials = [
  { title:'Instagram', href:'http://instagram.com/biletix', src: InstagramIcon },
  { title:'Facebook',  href:'https://www.facebook.com/Biletix', src: FacebookIcon },
  { title:'Blog',      href:'http://blog.biletix.com/', src: BlogIcon },
  { title:'Twitter',   href:'https://twitter.com/biletix', src: TwitterIcon },
  { title:'Youtube',   href:'https://www.youtube.com/channel/UCI6ownTOlxgaN0Um74-sC6Q', src: YoutubeIcon },
  { title:'LinkedIn',  href:'https://www.linkedin.com/company/biletix', src: LinkedlnIcon },
  { title:'Spotify',   href:'https://open.spotify.com/user/qcjtfkcpiw94n579mfq1h2pq2', src: SpotifyIcon },
  { title:'TikTok',    href:'https://www.tiktok.com/@ticketmasterturkiye?_t=8hM0Q36uYa6&_r=1', src: TiktokIcon },
];
</script>
