/**
 * Showcase fixtures for the Oak Flats Mufflermen storefront primitive pack.
 *
 * Realistic Aussie performance-exhaust catalogue — Manta cat-backs, Pacemaker
 * headers, X-Force resonators with fitments for Falcon GT XB, Hilux N80, and
 * Ranger Raptor. AUD inc-GST, Albion Park warehouse, Afterpay 4×.
 */

import type {
  AddressSuggestion,
} from "../components/storefront/address-form-card"
import type {
  AfterpaySchedule,
  AustralianAddress,
  CartTotals,
  CheckoutStageMeta,
  CouponApplication,
  FacetGroup,
  OrderConfirmation,
  ProductCard,
  ProductMediaItem,
  ProductReviewItem,
  ProductSpecRow,
  ProductVariantGroup,
  SearchSuggestion,
  ShippingEstimate,
  StorefrontCartLine,
  WishlistEntry,
} from "../components/storefront"

export const SHOWCASE_PRODUCTS: ReadonlyArray<ProductCard> = [
  {
    id: "manta-cb-25",
    sku: "MANTA-CB-25",
    brand: "Manta",
    title: 'Manta 2.5" Cat-Back · VF SS Ute',
    price: 1290.0,
    compareAt: 1490.0,
    badges: [
      { label: "ADR compliant", tone: "green" },
      { label: "Workshop fit", tone: "amber" },
    ],
    stock: "in-stock",
    stockCount: 8,
    fitment: { make: "Holden", model: "VF SS Ute", series: "Series II", years: "2014–2017" },
    rating: 4.8,
    reviewCount: 42,
    freeShipping: true,
    afterpay: true,
  },
  {
    id: "pcmr-ext-30",
    sku: "PCMR-EXT-30",
    brand: "Pacemaker",
    title: "Pacemaker Extractors · VT-VZ LS1",
    price: 890.0,
    badges: [{ label: "1-3/4\" headers", tone: "teal" }],
    stock: "low-stock",
    stockCount: 2,
    fitment: { make: "Holden", model: "VT-VZ Commodore", series: "LS1", years: "1999–2007" },
    rating: 4.7,
    reviewCount: 28,
    afterpay: true,
  },
  {
    id: "xforce-res-30",
    sku: "XFORCE-RES-30",
    brand: "X-Force",
    title: 'X-Force 3" Resonator · Hilux N80',
    price: 345.0,
    badges: [{ label: "Free metro ship", tone: "green" }],
    stock: "in-stock",
    stockCount: 16,
    fitment: { make: "Toyota", model: "Hilux", series: "N80", years: "2015–present" },
    rating: 4.9,
    reviewCount: 71,
    freeShipping: true,
    afterpay: true,
  },
  {
    id: "redback-cb-falcon",
    sku: "RDBK-CB-XB",
    brand: "Redback",
    title: 'Redback 2.5" Cat-Back · Falcon GT XB',
    price: 1689.0,
    badges: [{ label: "Heritage build", tone: "amber" }],
    stock: "back-order",
    fitment: { make: "Ford", model: "Falcon GT", series: "XB", years: "1973–1976" },
    rating: 4.6,
    reviewCount: 14,
    afterpay: true,
  },
  {
    id: "magna-cat-300",
    sku: "MAGNA-CAT-300",
    brand: "Magnaflow",
    title: 'Magnaflow Hi-Flow Cat 3" · 200 cell',
    price: 695.0,
    compareAt: 749.0,
    stock: "in-stock",
    stockCount: 5,
    rating: 4.5,
    reviewCount: 36,
    freeShipping: true,
    afterpay: true,
  },
  {
    id: "raptor-axle-back",
    sku: "MANTA-AXB-RAPTOR",
    brand: "Manta",
    title: "Manta Axle-Back · Ranger Raptor",
    price: 1390.0,
    badges: [
      { label: "Sound legal", tone: "green" },
      { label: "Bay 1 build", tone: "amber" },
    ],
    stock: "pre-order",
    fitment: { make: "Ford", model: "Ranger Raptor", series: "Next-gen", years: "2023–present" },
    rating: 4.9,
    reviewCount: 9,
    afterpay: true,
  },
  {
    id: "beaude-headers",
    sku: "BEAU-EXT-XF",
    brand: "Beaudesert",
    title: "Beaudesert Extractors · XF Falcon",
    price: 1190.0,
    stock: "out-of-stock",
    fitment: { make: "Ford", model: "XF Falcon", years: "1984–1988" },
    rating: 4.7,
    reviewCount: 21,
    afterpay: true,
  },
  {
    id: "hush-resonator",
    sku: "HUSH-RES-25",
    brand: "Hushpower",
    title: 'Hushpower 2.5" Resonator · Universal',
    price: 245.0,
    stock: "in-stock",
    stockCount: 22,
    rating: 4.4,
    reviewCount: 88,
    freeShipping: true,
    afterpay: false,
  },
]

export const HERO_PRODUCT: ProductCard = SHOWCASE_PRODUCTS[0]

export const PDP_MEDIA: ReadonlyArray<ProductMediaItem> = [
  { id: "media-hero", kind: "image", alt: "Manta cat-back hero shot", glyph: "MNT" },
  { id: "media-tailpipe", kind: "image", alt: "Polished tailpipe detail", glyph: "TIP" },
  { id: "media-muffler", kind: "image", alt: "Centre muffler", glyph: "MUF" },
  { id: "media-fitment", kind: "image", alt: "Underbody fitment", glyph: "FIT" },
  { id: "media-dyno", kind: "video", alt: "Dyno run", glyph: "DYNO" },
  { id: "media-spec", kind: "spec", alt: "Spec sheet", glyph: "SPC" },
]

export const PDP_DESCRIPTION =
  "Mandrel-bent 409 stainless 2.5\" cat-back built for the VF Series II Commodore SS Ute. Drops in under the OE heat shields, mates to the factory cat flange, and uses Manta's signature offset rear muffler for a deeper, throatier note without droning on the highway. Built and TIG-welded in Brisbane, fitted at Bay 1, Albion Park."

export const PDP_SPECS: ReadonlyArray<ProductSpecRow> = [
  { label: "Pipe size", value: '2.5" (63 mm) mandrel-bent' },
  { label: "Material", value: "409 aluminised stainless" },
  { label: "Muffler", value: "Centre + offset rear, straight-through" },
  { label: "Fitment", value: "VF SS Ute 6.0L V8 (2014–2017)" },
  { label: "Compliance", value: "ADR 83/00 sound legal" },
  { label: "Warranty", value: "Lifetime structural · 3 yr finish" },
  { label: "Weight", value: "21.4 kg" },
]

export const PDP_VARIANTS: ReadonlyArray<ProductVariantGroup> = [
  {
    key: "tip-finish",
    label: "Tip finish",
    options: [
      { id: "polished", label: "Polished SS", available: true },
      { id: "black", label: "Black ceramic", available: true, priceDelta: 120 },
      { id: "carbon", label: "Carbon wrap", available: false, priceDelta: 280 },
    ],
  },
  {
    key: "bend-rad",
    label: "Bend radius",
    options: [
      { id: "standard", label: "Standard", available: true },
      { id: "tight", label: "Tight clearance", available: true, priceDelta: 60 },
    ],
  },
]

export const PDP_REVIEWS: ReadonlyArray<ProductReviewItem> = [
  {
    id: "rev-1",
    author: "Dean P. · Wollongong",
    rating: 5,
    title: "Note is on the money",
    body: "Fitted Saturday at Bay 1, sounds mean off-throttle and zero drone at 110 on the freeway. Mia and the boys had it on and off in 90 minutes.",
    vehicle: "VF SS Ute 6.0",
    postedAt: "Mar 2026",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Sarah K. · Sutherland",
    rating: 4,
    title: "Sound legal but still angry",
    body: "Was nervous about going louder before rego — police pulled me up Saturday night and didn't blink. Tick.",
    vehicle: "VF SS Sportwagon",
    postedAt: "Feb 2026",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Marko T. · Albion Park",
    rating: 5,
    title: "Daniel knows his stuff",
    body: "Asked for an opinion against the Manta XForce and they recommended this. Glad I listened, fits like factory.",
    vehicle: "VF SS Ute 6.2",
    postedAt: "Jan 2026",
    verified: true,
  },
]

export const PDP_REVIEW_SUMMARY = {
  average: 4.8,
  total: 42,
  recommendPct: 96,
}

export const CART_LINES_FULL: ReadonlyArray<StorefrontCartLine> = [
  {
    id: "manta-cb-25",
    sku: "MANTA-CB-25",
    brand: "Manta",
    title: 'Manta 2.5" Cat-Back · VF SS Ute',
    unitPrice: 1290.0,
    quantity: 1,
    variantLabel: "Polished SS · Standard bend",
    thumbnailGlyph: "MNT",
    stock: "in-stock",
  },
  {
    id: "pcmr-ext-30",
    sku: "PCMR-EXT-30",
    brand: "Pacemaker",
    title: "Pacemaker Extractors · VT-VZ LS1",
    unitPrice: 890.0,
    quantity: 1,
    thumbnailGlyph: "PCM",
    stock: "low-stock",
  },
  {
    id: "xforce-res-30",
    sku: "XFORCE-RES-30",
    brand: "X-Force",
    title: '3" Resonator · Hilux N80',
    unitPrice: 345.0,
    quantity: 2,
    thumbnailGlyph: "XFR",
    stock: "in-stock",
  },
]

export const CART_LINES_LITE: ReadonlyArray<StorefrontCartLine> = [
  {
    id: "magna-cat-300",
    sku: "MAGNA-CAT-300",
    brand: "Magnaflow",
    title: 'Hi-Flow Cat 3" · 200 cell',
    unitPrice: 695.0,
    quantity: 1,
    thumbnailGlyph: "MAG",
    stock: "in-stock",
  },
]

export const CART_TOTALS_FULL: CartTotals = {
  subtotal: 2870.0,
  freight: 0,
  gst: 260.91,
  discount: 200.0,
  total: 2670.0,
}

export const CART_TOTALS_LITE: CartTotals = {
  subtotal: 695.0,
  freight: 18.5,
  gst: 64.86,
  total: 713.5,
}

export const SHIPPING_ESTIMATE: ShippingEstimate = {
  region: "Albion Park NSW",
  postcode: "2527",
  carrier: "TNT Sensitive Express",
  serviceLabel: "Heavy freight cradle",
  cost: 0,
  etaLabel: "2–4 business days",
}

export const CHECKOUT_STAGES_CART: ReadonlyArray<CheckoutStageMeta> = [
  { key: "cart", label: "Cart", caption: "3 items · $2,670", status: "current" },
  { key: "shipping", label: "Shipping", caption: "Address & freight", status: "upcoming" },
  { key: "payment", label: "Payment", caption: "Card · Afterpay · BPay", status: "upcoming" },
  { key: "review", label: "Review", caption: "Confirm & pay", status: "upcoming" },
]

export const CHECKOUT_STAGES_PAYMENT: ReadonlyArray<CheckoutStageMeta> = [
  { key: "cart", label: "Cart", caption: "3 items · $2,670", status: "complete" },
  { key: "shipping", label: "Shipping", caption: "Albion Park 2527", status: "complete" },
  { key: "payment", label: "Payment", caption: "Choose method", status: "current" },
  { key: "review", label: "Review", caption: "Confirm & pay", status: "upcoming" },
]

export const CHECKOUT_STAGES_DONE: ReadonlyArray<CheckoutStageMeta> = [
  { key: "cart", label: "Cart", caption: "3 items · $2,670", status: "complete" },
  { key: "shipping", label: "Shipping", caption: "Albion Park 2527", status: "complete" },
  { key: "payment", label: "Payment", caption: "Visa ···· 4242", status: "complete" },
  { key: "review", label: "Review", caption: "Confirmed", status: "complete" },
]

export const ADDRESS_EMPTY: AustralianAddress = {
  fullName: "",
  company: "",
  line1: "",
  line2: "",
  suburb: "",
  state: "NSW",
  postcode: "",
  phone: "",
  instructions: "",
}

export const ADDRESS_FILLED: AustralianAddress = {
  fullName: "Dean Patel",
  company: "Workshop Crew Pty Ltd",
  line1: "24 Industrial Road",
  line2: "Bay 1",
  suburb: "Albion Park Rail",
  state: "NSW",
  postcode: "2527",
  phone: "0432 188 207",
  instructions: "Forklift access — call on arrival.",
}

export const ADDRESS_SUGGESTIONS: ReadonlyArray<AddressSuggestion> = [
  {
    id: "addr-1",
    label: "24 Industrial Rd, Albion Park Rail NSW",
    meta: "2527",
    patch: {
      line1: "24 Industrial Road",
      suburb: "Albion Park Rail",
      state: "NSW",
      postcode: "2527",
    },
  },
  {
    id: "addr-2",
    label: "12 Princes Hwy, Wollongong NSW",
    meta: "2500",
    patch: {
      line1: "12 Princes Highway",
      suburb: "Wollongong",
      state: "NSW",
      postcode: "2500",
    },
  },
  {
    id: "addr-3",
    label: "88 Tom Thumb Ave, Shell Cove NSW",
    meta: "2529",
    patch: {
      line1: "88 Tom Thumb Avenue",
      suburb: "Shell Cove",
      state: "NSW",
      postcode: "2529",
    },
  },
]

export const AFTERPAY_SCHEDULE: AfterpaySchedule = {
  installments: 4,
  perInstallment: 322.5,
  firstDueLabel: "29 May 2026",
}

export const BPAY_BILLER = {
  code: "423891",
  reference: "OFM-30419",
}

export const SEARCH_SUGGESTIONS: ReadonlyArray<SearchSuggestion> = [
  { id: "ss-1", kind: "product", label: 'Manta 2.5" cat-back', meta: "VF SS Ute" },
  { id: "ss-2", kind: "category", label: "Cat-back systems", meta: "84 products" },
  { id: "ss-3", kind: "fitment", label: "Hilux N80", meta: "16 matched" },
  { id: "ss-4", kind: "product", label: "Pacemaker extractors", meta: "VT–VZ LS1" },
  { id: "ss-5", kind: "product", label: 'X-Force 3" resonator', meta: "Ranger Raptor" },
  { id: "ss-6", kind: "rego", label: "BVA42K", meta: "Holden VF SS Ute" },
  { id: "ss-7", kind: "category", label: "Headers / extractors", meta: "32 products" },
]

export const SEARCH_TRENDING: ReadonlyArray<SearchSuggestion> = [
  { id: "tr-1", kind: "fitment", label: "Ranger Raptor", meta: "12 builds last week" },
  { id: "tr-2", kind: "product", label: "Manta axle-back", meta: "Hilux N80" },
  { id: "tr-3", kind: "category", label: "Sound-legal axle-backs", meta: "ADR 83/00" },
]

export const SEARCH_RECENT: ReadonlyArray<string> = [
  "VF SS cat-back",
  "Pacemaker LS1",
  "Hilux N80 resonator",
]

export const FACET_GROUPS: ReadonlyArray<FacetGroup> = [
  {
    key: "brand",
    label: "Brand",
    kind: "checkbox",
    options: [
      { id: "manta", label: "Manta", count: 42, selected: true },
      { id: "pacemaker", label: "Pacemaker", count: 28 },
      { id: "xforce", label: "X-Force", count: 21, selected: true },
      { id: "redback", label: "Redback", count: 18 },
      { id: "magnaflow", label: "Magnaflow", count: 14 },
      { id: "hushpower", label: "Hushpower", count: 11 },
      { id: "beaudesert", label: "Beaudesert", count: 9 },
    ],
  },
  {
    key: "category",
    label: "Category",
    kind: "checkbox",
    options: [
      { id: "cat-back", label: "Cat-back systems", count: 64 },
      { id: "headers", label: "Headers / extractors", count: 32 },
      { id: "resonators", label: "Resonators", count: 28, selected: true },
      { id: "mufflers", label: "Mufflers", count: 41 },
      { id: "tips", label: "Tips & flanges", count: 19 },
    ],
  },
  {
    key: "price",
    label: "Price (AUD)",
    kind: "range",
    rangeMin: 0,
    rangeMax: 3000,
    rangeValue: [200, 1500],
    unit: "currency",
  },
  {
    key: "fitment",
    label: "Match by rego",
    kind: "rego",
  },
  {
    key: "finish",
    label: "Tip finish",
    kind: "swatch",
    options: [
      { id: "polished", label: "Polished", count: 36 },
      { id: "black", label: "Black ceramic", count: 22, selected: true },
      { id: "carbon", label: "Carbon", count: 8 },
    ],
  },
]

export const COUPON_APPLIED: ReadonlyArray<CouponApplication> = [
  {
    code: "MUFFLER10",
    label: "10% off exhaust hardware",
    discount: 200,
    autoApplied: false,
  },
]

export const COUPON_AUTO: ReadonlyArray<CouponApplication> = [
  {
    code: "TRADE15",
    label: "Trade · 15% off extractors",
    discount: 133.5,
    autoApplied: true,
  },
]

export const WISHLIST_ENTRIES: ReadonlyArray<WishlistEntry> = [
  {
    id: "wl-1",
    sku: "MANTA-AXB-RAPTOR",
    brand: "Manta",
    title: "Axle-Back · Ranger Raptor",
    price: 1390.0,
    stock: "pre-order",
    alertEnabled: true,
    addedAtLabel: "2 days ago",
    fitment: { make: "Ford", model: "Ranger Raptor", series: "Next-gen" },
  },
  {
    id: "wl-2",
    sku: "PCMR-EXT-30",
    brand: "Pacemaker",
    title: "Extractors · VT-VZ LS1",
    price: 890.0,
    stock: "low-stock",
    alertEnabled: false,
    addedAtLabel: "1 week ago",
    fitment: { make: "Holden", model: "VT-VZ", series: "LS1" },
  },
  {
    id: "wl-3",
    sku: "BEAU-EXT-XF",
    brand: "Beaudesert",
    title: "Extractors · XF Falcon",
    price: 1190.0,
    stock: "out-of-stock",
    alertEnabled: true,
    addedAtLabel: "3 weeks ago",
    fitment: { make: "Ford", model: "XF Falcon" },
  },
]

export const ORDER_CONFIRMATION_PAID: OrderConfirmation = {
  orderNumber: "OFM-30419",
  placedAtLabel: "29 May 2026 · 14:24",
  customerName: "Dean Patel",
  email: "dean.patel@workshopcrew.au",
  itemsCount: 4,
  total: 2670.0,
  freightLabel: "Free freight · TNT Sensitive Express",
  etaLabel: "Wed 3 Jun — Fri 5 Jun 2026",
  trackingUrl: "https://www.tnt.com/au/en/track",
  paymentBrand: "Visa",
  paymentLast4: "4242",
}

export const ORDER_CONFIRMATION_AFTERPAY: OrderConfirmation = {
  orderNumber: "OFM-30420",
  placedAtLabel: "29 May 2026 · 16:08",
  customerName: "Sarah Kelly",
  email: "sarah.k@gmail.com",
  itemsCount: 1,
  total: 1290.0,
  freightLabel: "Free freight · Bay 1 Albion Park",
  etaLabel: "Pickup ready Saturday",
  paymentBrand: "Afterpay",
}
