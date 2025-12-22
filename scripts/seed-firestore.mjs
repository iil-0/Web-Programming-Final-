/**
 * Firestore Seed Script
 * 
 * Kullanım: npm run seed
 * 
 * Bu script eventGroups ve performances collection'larını oluşturur.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCzDhMRSr_X_TqznAU_lXGdAwZ98slqi1w",
  authDomain: "biletix-c5786.firebaseapp.com",
  projectId: "biletix-c5786",
  storageBucket: "biletix-c5786.firebasestorage.app",
  messagingSenderId: "778422239560",
  appId: "1:778422239560:web:290d54696c734207c9b37d"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ============ EVENT GROUPS ============
const eventGroups = [
  {
    slug: 'astralumina-istanbul',
    title: 'Astra Lumina Istanbul',
    shortIntro: 'ASTRA LUMINA ABD ve Avustralya\'dan sonra Avrupa\'da İlk Kez İstanbul\'da!',
    description: 'Şehrin kalbinde, Turkcell Platinum Park\'ta, her yaştan katılımcısını, orman içinde yıldızlarla çevrili büyüleyici bir gece yürüyüşü deneyimine davet ediyor.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'astraspot.png'
  },
  {
    slug: 'don-kisot',
    title: 'Don Kişot Müzikali',
    shortIntro: 'Bir hayalin peşinde… Bir şövalyenin izinde…',
    description: 'Don Kişot\'un hikayesi sahnede yeniden hayat buluyor. Büyüleyici sahne tasarımı, güçlü oyunculuklar ve zarif koreografiyle unutulmaz bir müzikal deneyimi.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'donkisotspott.png'
  },
  {
    slug: '25-yil-kampanyasi',
    title: '25. Yıl Kampanyası',
    shortIntro: 'Etkinliklerde %25 indirim fırsatı!',
    description: 'Özel kampanya ve avantajlı biletler hakkında bilgi almak için sayfayı ziyaret edin.',
    legal: '*Kampanya şartları ve koşulları uygulanır.',
    hero: '25yilindirimlerispotgors.png'
  },
  {
    slug: 'paribu-harbiye-konserleri',
    title: 'Paribu Harbiye Konserleri',
    shortIntro: 'Atlantis Yapım konserleri başlıyor!',
    description: 'Harbiye Açıkhava\'da gerçekleşecek konser dizisi.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'atlantisspot.png'
  },
  {
    slug: 'blind-istanbul',
    title: 'BLIND İstanbul',
    shortIntro: 'Blind sahnesinde müzik dolu geceler!',
    description: 'BLIND projesinin İstanbul gösterimleri.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'blindspot.png'
  },
  {
    slug: 'harbiye-acikhava',
    title: 'Harbiye Açıkhava Konserleri',
    shortIntro: '2025 Açıkhava etkinlikleri sizlerle!',
    description: 'Yaz sezonu boyunca Harbiye Açıkhava\'da gerçekleşecek konserler.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'harbyeackspot.png'
  },
  {
    slug: 'hirai-kayip-notlar',
    title: 'HiraiZerdüş – Kayıp Notlar',
    shortIntro: 'Yeni turnesiyle sizlerle!',
    description: 'HiraiZerdüş\'ün yeni turnesi.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'hiraispot.png'
  },
  {
    slug: 'karsu-turkiye-turnesi',
    title: 'Karsu – Türkiye Turnesi',
    shortIntro: 'Karsu, Türkiye turnesiyle sahnede!',
    description: 'Karsu\'nun Türkiye turnesi tarihleri ve bilet bilgileri.',
    legal: '*Etkinliğe bilet satın alarak etkinlik kurallarını kabul etmiş sayılırsınız.',
    hero: 'karsuspot.png'
  }
]

// ============ PERFORMANCES ============
const performances = [
  // Astra Lumina
  { id: 'astral-2025-12-23', eventGroupSlug: 'astralumina-istanbul', title: 'Astra Lumina Istanbul', day: '23', month: 'Aralık', time: '20:00', venue: 'Turkcell Platinum Park', status: 'Satışta' },
  { id: 'astral-2025-12-24', eventGroupSlug: 'astralumina-istanbul', title: 'Astra Lumina Istanbul', day: '24', month: 'Aralık', time: '20:00', venue: 'Turkcell Platinum Park', status: 'Tükendi' },
  { id: 'astral-2026-01-15', eventGroupSlug: 'astralumina-istanbul', title: 'Astra Lumina Istanbul', day: '15', month: 'Ocak', time: '19:30', venue: 'Turkcell Platinum Park', status: 'Satışta' },
  // Don Kişot
  { id: 'donkisot-2025-12-05', eventGroupSlug: 'don-kisot', title: 'Don Kişot Müzikali', day: '05', month: 'Aralık', time: '19:00', venue: 'Beyoğlu Sahne', status: 'Satışta' },
  { id: 'donkisot-2025-12-12', eventGroupSlug: 'don-kisot', title: 'Don Kişot Müzikali', day: '12', month: 'Aralık', time: '19:00', venue: 'Beyoğlu Sahne', status: 'Satışta' },
  { id: 'donkisot-2025-12-19', eventGroupSlug: 'don-kisot', title: 'Don Kişot Müzikali', day: '19', month: 'Aralık', time: '19:00', venue: 'Beyoğlu Sahne', status: 'Tükendi' },
  // 25. Yıl
  { id: '25yil-2025-12-06', eventGroupSlug: '25-yil-kampanyasi', title: '25. Yıl Özel Gösterim', day: '06', month: 'Aralık', time: '18:00', venue: 'Kültür Merkezi', status: 'Satışta' },
  { id: '25yil-2025-12-13', eventGroupSlug: '25-yil-kampanyasi', title: '25. Yıl Özel Gösterim', day: '13', month: 'Aralık', time: '18:00', venue: 'Kültür Merkezi', status: 'Satışta' },
  { id: '25yil-2025-12-20', eventGroupSlug: '25-yil-kampanyasi', title: '25. Yıl Özel Gösterim', day: '20', month: 'Aralık', time: '18:00', venue: 'Kültür Merkezi', status: 'Satışta' },
  // Paribu Harbiye
  { id: 'paribu-2025-12-10', eventGroupSlug: 'paribu-harbiye-konserleri', title: 'Paribu Harbiye Konseri', day: '10', month: 'Aralık', time: '21:00', venue: 'Harbiye Açıkhava', status: 'Satışta' },
  { id: 'paribu-2025-12-17', eventGroupSlug: 'paribu-harbiye-konserleri', title: 'Paribu Harbiye Konseri', day: '17', month: 'Aralık', time: '21:00', venue: 'Harbiye Açıkhava', status: 'Satışta' },
  { id: 'paribu-2025-12-24', eventGroupSlug: 'paribu-harbiye-konserleri', title: 'Paribu Harbiye Konseri', day: '24', month: 'Aralık', time: '21:00', venue: 'Harbiye Açıkhava', status: 'Tükendi' },
  // BLIND
  { id: 'blind-2025-12-08', eventGroupSlug: 'blind-istanbul', title: 'BLIND İstanbul', day: '08', month: 'Aralık', time: '20:30', venue: 'Studio Sahne', status: 'Satışta' },
  { id: 'blind-2025-12-15', eventGroupSlug: 'blind-istanbul', title: 'BLIND İstanbul', day: '15', month: 'Aralık', time: '20:30', venue: 'Studio Sahne', status: 'Satışta' },
  { id: 'blind-2025-12-22', eventGroupSlug: 'blind-istanbul', title: 'BLIND İstanbul', day: '22', month: 'Aralık', time: '20:30', venue: 'Studio Sahne', status: 'Satışta' },
  // Harbiye Açıkhava
  { id: 'harbiye-2025-12-11', eventGroupSlug: 'harbiye-acikhava', title: 'Harbiye Açıkhava Konseri', day: '11', month: 'Aralık', time: '20:00', venue: 'Harbiye Açıkhava', status: 'Satışta' },
  { id: 'harbiye-2025-12-18', eventGroupSlug: 'harbiye-acikhava', title: 'Harbiye Açıkhava Konseri', day: '18', month: 'Aralık', time: '20:00', venue: 'Harbiye Açıkhava', status: 'Satışta' },
  { id: 'harbiye-2025-12-25', eventGroupSlug: 'harbiye-acikhava', title: 'Harbiye Açıkhava Konseri', day: '25', month: 'Aralık', time: '20:00', venue: 'Harbiye Açıkhava', status: 'Tükendi' },
  // HiraiZerdüş
  { id: 'hirai-2025-12-07', eventGroupSlug: 'hirai-kayip-notlar', title: 'HiraiZerdüş – Kayıp Notlar', day: '07', month: 'Aralık', time: '19:30', venue: 'Konser Salonu', status: 'Satışta' },
  { id: 'hirai-2025-12-14', eventGroupSlug: 'hirai-kayip-notlar', title: 'HiraiZerdüş – Kayıp Notlar', day: '14', month: 'Aralık', time: '19:30', venue: 'Konser Salonu', status: 'Satışta' },
  { id: 'hirai-2025-12-21', eventGroupSlug: 'hirai-kayip-notlar', title: 'HiraiZerdüş – Kayıp Notlar', day: '21', month: 'Aralık', time: '19:30', venue: 'Konser Salonu', status: 'Satışta' },
  // Karsu
  { id: 'karsu-2025-12-09', eventGroupSlug: 'karsu-turkiye-turnesi', title: 'Karsu – Türkiye Turnesi', day: '09', month: 'Aralık', time: '20:00', venue: 'Konser Salonu', status: 'Satışta' },
  { id: 'karsu-2025-12-16', eventGroupSlug: 'karsu-turkiye-turnesi', title: 'Karsu – Türkiye Turnesi', day: '16', month: 'Aralık', time: '20:00', venue: 'Konser Salonu', status: 'Satışta' },
  { id: 'karsu-2025-12-23', eventGroupSlug: 'karsu-turkiye-turnesi', title: 'Karsu – Türkiye Turnesi', day: '23', month: 'Aralık', time: '20:00', venue: 'Konser Salonu', status: 'Satışta' }
]

async function seed() {
  console.log('🌱 Firestore seed başlıyor...\n')

  // EventGroups ekle
  console.log('📁 eventGroups collection oluşturuluyor...')
  for (const group of eventGroups) {
    await setDoc(doc(db, 'eventGroups', group.slug), group)
    console.log(`  ✅ ${group.slug}`)
  }
  console.log(`  Toplam: ${eventGroups.length} eventGroup eklendi\n`)

  // Performances ekle
  console.log('📁 performances collection oluşturuluyor...')
  for (const perf of performances) {
    await setDoc(doc(db, 'performances', perf.id), perf)
    console.log(`  ✅ ${perf.id}`)
  }
  console.log(`  Toplam: ${performances.length} performance eklendi\n`)

  console.log('🎉 Seed tamamlandı!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed hatası:', err)
  process.exit(1)
})

