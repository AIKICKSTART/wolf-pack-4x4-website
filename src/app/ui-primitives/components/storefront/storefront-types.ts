/**
 * Shared types for the Oak Flats Mufflermen storefront primitive family.
 *
 * Covers product cards, PDP gallery, cart, checkout, payment, search,
 * filters, wishlist, coupons and order confirmation. Currency is AUD
 * inc-GST, fitments target Aussie performance vehicles.
 */

export type StorefrontTone = "red" | "amber" | "teal" | "green" | "neutral"

export type StockStatus =
  | "in-stock"
  | "low-stock"
  | "back-order"
  | "out-of-stock"
  | "pre-order"

export interface StorefrontFitment {
  make: string
  model: string
  series?: string
  years?: string
}

export interface ProductBadge {
  label: string
  tone: StorefrontTone
}

export interface ProductVariantOption {
  id: string
  label: string
  swatch?: string
  available: boolean
  priceDelta?: number
}

export interface ProductVariantGroup {
  key: string
  label: string
  options: ReadonlyArray<ProductVariantOption>
}

export interface ProductCard {
  id: string
  sku: string
  brand: string
  title: string
  price: number
  compareAt?: number
  thumbnail?: string
  badges?: ReadonlyArray<ProductBadge>
  stock: StockStatus
  stockCount?: number
  fitment?: StorefrontFitment
  rating?: number
  reviewCount?: number
  freeShipping?: boolean
  afterpay?: boolean
}

export interface ProductMediaItem {
  id: string
  kind: "image" | "video" | "spec"
  alt: string
  src?: string
  glyph?: string
}

export interface ProductSpecRow {
  label: string
  value: string
}

export interface ProductReviewItem {
  id: string
  author: string
  rating: number
  title: string
  body: string
  vehicle?: string
  postedAt: string
  verified?: boolean
}

export interface StorefrontCartLine {
  id: string
  sku: string
  brand: string
  title: string
  unitPrice: number
  quantity: number
  variantLabel?: string
  thumbnailGlyph?: string
  stock: StockStatus
  freight?: number
}

export interface CartTotals {
  subtotal: number
  freight: number
  gst: number
  discount?: number
  total: number
}

export interface ShippingEstimate {
  region: string
  postcode: string
  carrier: string
  serviceLabel: string
  cost: number
  etaLabel: string
}

export type CheckoutStage = "cart" | "shipping" | "payment" | "review"

export interface CheckoutStageMeta {
  key: CheckoutStage
  label: string
  caption: string
  status: "complete" | "current" | "upcoming"
}

export interface AustralianAddress {
  fullName: string
  company?: string
  line1: string
  line2?: string
  suburb: string
  state: AustralianState
  postcode: string
  phone?: string
  instructions?: string
}

export type AustralianState =
  | "NSW"
  | "VIC"
  | "QLD"
  | "WA"
  | "SA"
  | "TAS"
  | "ACT"
  | "NT"

export type PaymentMethod =
  | "card"
  | "apple-pay"
  | "google-pay"
  | "afterpay"
  | "bpay"

export interface AfterpaySchedule {
  installments: number
  perInstallment: number
  firstDueLabel: string
}

export interface FacetOption {
  id: string
  label: string
  count: number
  selected?: boolean
}

export interface FacetGroup {
  key: string
  label: string
  kind: "checkbox" | "swatch" | "range" | "rego"
  options?: ReadonlyArray<FacetOption>
  rangeMin?: number
  rangeMax?: number
  rangeValue?: [number, number]
  unit?: string
}

export interface SearchSuggestion {
  id: string
  label: string
  kind: "product" | "category" | "fitment" | "rego"
  meta?: string
}

export interface WishlistEntry {
  id: string
  sku: string
  brand: string
  title: string
  price: number
  thumbnail?: string
  stock: StockStatus
  alertEnabled?: boolean
  addedAtLabel: string
  fitment?: StorefrontFitment
}

export interface CouponApplication {
  code: string
  label: string
  discount: number
  autoApplied?: boolean
}

export interface OrderConfirmation {
  orderNumber: string
  placedAtLabel: string
  customerName: string
  email: string
  itemsCount: number
  total: number
  freightLabel: string
  etaLabel: string
  trackingUrl?: string
  paymentBrand: string
  paymentLast4?: string
}

export const STORE_DEFAULT_CURRENCY = "AUD"
export const STORE_FREE_SHIPPING_THRESHOLD = 250
export const STORE_LOCALE = "en-AU"
