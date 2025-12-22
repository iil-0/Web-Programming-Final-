export interface EventGroup {
  id: string
  slug: string
  title: string
  shortIntro?: string
  description?: string
  legal?: string
  hero?: string
  category?: string
  [key: string]: any
}

export interface Performance {
  id: string
  eventGroupSlug: string
  title: string
  day: string
  month: string
  time: string
  venue: string
  status: 'Satışta' | 'Tükendi' | string
  [key: string]: any
}

export interface CartItem {
  id: string
  performanceId: string
  eventName?: string
  saleTitle?: string
  quantity: number
  qty?: number
  price: number
  unitPrice?: number
  serviceFee?: number
  day?: string
  month?: string
  time?: string
  venue?: string
  image?: string
  block?: string
  row?: string
  seat?: string
  [key: string]: any
}

export interface User {
  uid: string
  email?: string
  displayName?: string
  firstName?: string
  lastName?: string
  phone?: string
  [key: string]: any
}

export interface FeaturedItem {
  id: string
  image: string
  title: string
  subtitle: string
}

export interface SpotlightItem {
  id: string
  imageurl: string
  name: string
  text: string
  slug: string
}

export interface CategorySpotlightItem {
  id: string
  title: string
  image: string
  category: 'music' | 'stage'
}

/**
 * Store'larda kullanılan standart error tipi
 */
export interface StoreError {
  code?: string
  message: string
}
