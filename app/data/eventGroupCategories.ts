// Kategori verisi (placeholder) – sadece etkinlik-grup layout'u için
export const categories = [
    { label: 'Futbol', href: '/fan-guide/TURKIYE/tr' },
    {
        label: 'Müzik',
        submenu: {
            items: [
                { label: 'Pop', image: '', href: '/search/TURKIYE/tr#subcategory:pop$MUSIC&qt=standard' },
                { label: 'Rock', image: '', href: '/search/TURKIYE/tr#subcategory:rock$MUSIC&qt=standard' },
                { label: 'Caz', image: '', href: '/search/TURKIYE/tr#subcategory:jazz$MUSIC&qt=standard' },
                { label: 'Klasik', image: '', href: '/search/TURKIYE/tr#subcategory:klasik$MUSIC&qt=standard' },
                { label: 'Alternatif', image: '', href: '/search/TURKIYE/tr#subcategory:alternatif$MUSIC&qt=standard' }
            ],
            seeAll: { label: 'Tüm müzik etkinlikleri gör', href: '/category/MUSIC/TURKIYE/tr' }
        }
    },
    {
        label: 'Sahne',
        submenu: {
            items: [
                { label: 'Tiyatro', image: '', href: '/search/TURKIYE/tr#subcategory:tiyatro$ART&qt=standard' },
                { label: 'Gösteri', image: '', href: '/search/TURKIYE/tr#subcategory:gosteri$ART&qt=standard' },
                { label: 'Bale - Dans', image: '', href: '/search/TURKIYE/tr#subcategory:bale_dans$ART&qt=standard' },
                { label: 'Stand-Up', image: '', href: '/search/TURKIYE/tr#subcategory:stand_up$ART&qt=standard' }
            ],
            seeAll: { label: 'Tüm sahne etkinlikleri gör', href: '/category/ART/TURKIYE/tr' }
        }
    },
    { label: 'Spor' },
    { label: 'Aile' },
    { label: 'Eğitim ve Fazlası' }
]
