/**
 * Firestore Seed Script
 * 
 * Bu script featured, spotlight ve categorySpotlight verilerini Firestore'a yükler.
 * Çalıştırmak için: npx ts-node scripts/seedFirestore.ts
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

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

// Featured Data - public/spotlight/ klasöründen sunuluyor
const featuredData = [
  { id: 'harbiye', image: '/spotlight/harbyeackspot.png', title: 'Harbiye Cemil Topuzlu Açıkhava', subtitle: 'Sizleri bekliyor!' },
  { id: 'donkisot', image: '/spotlight/donkisotspott.png', title: 'Meçhul Paşa', subtitle: 'Sizlerle…' },
  { id: 'melisfis', image: '/spotlight/hiraispot.png', title: 'Melis Fis', subtitle: 'Sizleri bekliyor!' },
  { id: 'blind', image: '/spotlight/blindspot.png', title: 'Blind İstanbul Konserleri', subtitle: 'Sizleri bekliyor!' },
  { id: '25yil', image: '/spotlight/25yilindirimlerispotgors.png', title: '25. Yıl Kampanyası', subtitle: 'Fırsatlar' },
  { id: 'astra', image: '/spotlight/astraspot.png', title: 'Astra Lumina', subtitle: 'Sizlerle…' },
  { id: 'paribu', image: '/spotlight/atlantisspot.png', title: 'Paribu Harbiye', subtitle: 'Sizleri bekliyor!' },
  { id: 'karsu', image: '/spotlight/karsuspot.png', title: 'Karsu', subtitle: 'Türkiye turnesi' }
]

// Spotlight Data
const spotlightData = [
  { id: '25-yil-kampanyasi', imageurl: '/spotlight/25yilindirimlerispotgors.png', name: '25. Yıl Kampanyası', text: 'Etkinliklerde %25 indirim fırsatı!', slug: '25-yil-kampanyasi' },
  { id: 'astralumina-istanbul', imageurl: '/spotlight/astraspot.png', name: 'Astra Lumina İstanbul', text: 'Multimedya ışık yürüyüşü deneyimi sizlerle!', slug: 'astralumina-istanbul' },
  { id: 'paribu-harbiye', imageurl: '/spotlight/atlantisspot.png', name: 'Paribu Harbiye Konserleri', text: 'Atlantis Yapım konserleri başlıyor!', slug: 'paribu-harbiye-konserleri' },
  { id: 'blind-istanbul', imageurl: '/spotlight/blindspot.png', name: 'BLIND İstanbul', text: 'Blind sahnesinde müzik dolu geceler!', slug: 'blind-istanbul' },
  { id: 'don-kisot', imageurl: '/spotlight/donkisotspott.png', name: 'Don Kişot Müzikali', text: 'Cervantes\'in efsane eseri sahnede yeniden canlanıyor!', slug: 'don-kisot' },
  { id: 'harbiye-acikhava', imageurl: '/spotlight/harbyeackspot.png', name: 'Harbiye Açıkhava Konserleri', text: '2025 Açıkhava etkinlikleri sizlerle!', slug: 'harbiye-acikhava' },
  { id: 'hirai-kayip-notlar', imageurl: '/spotlight/hiraispot.png', name: 'HiraiZerdüş – Kayıp Notlar', text: 'Yeni turnesiyle sizlerle!', slug: 'hirai-kayip-notlar' },
  { id: 'karsu-turkiye', imageurl: '/spotlight/karsuspot.png', name: 'Karsu – Türkiye Turnesi', text: 'Karsu, Türkiye turnesiyle sahnede!', slug: 'karsu-turkiye-turnesi' }
]

// Category Spotlight - Music
const musicItems = [
  { id: 'yalin', title: 'Yalın - Bir Büyülü Gece', image: '/spotlight/yalin.png', category: 'music' },
  { id: 'ebru-gundes', title: 'Ebru Gündeş - Beraber Söylüyoruz', image: '/spotlight/ebrugundes.png', category: 'music' },
  { id: 'jolly-joker', title: 'Jolly Joker Konserleri', image: '/spotlight/jollyjoker.png', category: 'music' },
  { id: 'bayhan', title: 'Bayhan Müzik Konserleri', image: '/spotlight/Bayhan.png', category: 'music' },
  { id: 'barabar', title: 'Barabar', image: '/spotlight/BARABAR.PNG', category: 'music' },
  { id: 'atlantis', title: 'Atlantis Yapım Etkinlikleri', image: '/spotlight/atlantisspot.png', category: 'music' },
  { id: 'ercan-saatci', title: 'Ercan Saatçi ile Çok Akustik Turne', image: '/spotlight/ercansaatci.png', category: 'music' },
  { id: 'askin-nur-yengi', title: 'Aşkın Nur Yengi Senfonik', image: '/spotlight/ASKINNURYENGI.PNG', category: 'music' },
  { id: 'erol-evgin', title: 'Erol Evgin', image: '/spotlight/EROLEVGIN.png', category: 'music' }
]

// Category Spotlight - Stage
const stageItems = [
  { id: 'don-quixote', title: 'Don Quixote (Don Kişot)', image: '/spotlight/donkisotspott.png', category: 'stage' },
  { id: 'baturay-ozdemir', title: 'Baturay Özdemir - Stand Up', image: '/spotlight/baturayozdemir.png', category: 'stage' },
  { id: 'tolga-cevik', title: 'Tolga Çevik - Tolgshow', image: '/spotlight/tolgacevik.png', category: 'stage' },
  { id: 'chopin-carmen', title: 'Chopin and Carmen', image: '/spotlight/chopinandcarmen.png', category: 'stage' },
  { id: 'bkm', title: 'BKM Etkinlikleri Maximum Uniq', image: '/spotlight/bkmetkinlikleri.png', category: 'stage' },
  { id: 'teoman', title: 'Teoman - Varoluşçuluk 101', image: '/spotlight/teoman.png', category: 'stage' }
]

async function seed() {
  console.log('🚀 Firestore seed başlıyor...')

  // Featured
  console.log('📦 Featured verisi yükleniyor...')
  for (const item of featuredData) {
    await setDoc(doc(db, 'featured', item.id), item)
    console.log(`  ✓ ${item.title}`)
  }

  // Spotlight
  console.log('📦 Spotlight verisi yükleniyor...')
  for (const item of spotlightData) {
    await setDoc(doc(db, 'spotlight', item.id), item)
    console.log(`  ✓ ${item.name}`)
  }

  // Category Spotlight (tek collection, category field ile ayırt edilecek)
  console.log('📦 CategorySpotlight verisi yükleniyor...')
  for (const item of [...musicItems, ...stageItems]) {
    await setDoc(doc(db, 'categorySpotlight', item.id), item)
    console.log(`  ✓ ${item.title} (${item.category})`)
  }

  console.log('✅ Seed tamamlandı!')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed hatası:', err)
  process.exit(1)
})

