import rawProducts from "../../data/wolfpack-store-products.json"

export const WOLFPACK_STORE_IMAGE_SIZE = 1200

export const storeViewLabels = {
  front: "Front",
  back: "Back",
  side: "Side",
  detail: "Detail",
} as const

export type WolfpackStoreView = keyof typeof storeViewLabels

export type WolfpackStoreCategory =
  | "Apparel"
  | "Headwear"
  | "Camp Gear"
  | "Recovery"
  | "Lighting"
  | "Protection"
  | "Touring Storage"
  | "Suspension"
  | "Performance"

export type WolfpackStoreProduct = {
  id: string
  name: string
  category: WolfpackStoreCategory
  type: string
  price: string
  summary: string
  visual: string
  manufacturerTarget: string
  images: Record<WolfpackStoreView, string>
  isWearable: boolean
  isVehicleVisualisation: boolean
  prompt: string
}

export type WolfpackStoreHero = {
  id: string
  title: string
  kicker: string
  src: string
  alt: string
}

type RawProduct = Omit<
  WolfpackStoreProduct,
  "images" | "isWearable" | "isVehicleVisualisation" | "prompt"
>

export const storeCategoryOrder: readonly WolfpackStoreCategory[] = [
  "Apparel",
  "Headwear",
  "Camp Gear",
  "Recovery",
  "Lighting",
  "Protection",
  "Touring Storage",
  "Suspension",
  "Performance",
]

const wearableCategories = new Set<WolfpackStoreCategory>(["Apparel", "Headwear"])
const vehicleCategories = new Set<WolfpackStoreCategory>([
  "Recovery",
  "Lighting",
  "Protection",
  "Touring Storage",
  "Suspension",
  "Performance",
])

function imageSet(id: string): Record<WolfpackStoreView, string> {
  return {
    front: `/media/wolfpack/store/${id}-front.webp`,
    back: `/media/wolfpack/store/${id}-back.webp`,
    side: `/media/wolfpack/store/${id}-side.webp`,
    detail: `/media/wolfpack/store/${id}-detail.webp`,
  }
}

function productPrompt(product: RawProduct) {
  return [
    `Wolfpack 4x4 product concept render for ${product.name}.`,
    `Subject: ${product.visual}.`,
    "Branding: black base, electric blue and purple accents, metallic silver wolf badge, premium Australian performance 4x4 styling.",
    "Composition: isolated square product photography, front/back/side/detail view set, consistent scale, crisp edges, no clutter.",
    `Manufacturing target: ${product.manufacturerTarget}.`,
  ].join(" ")
}

export const wolfpackStoreProducts: readonly WolfpackStoreProduct[] = (rawProducts as RawProduct[]).map(
  (product) => ({
    ...product,
    images: imageSet(product.id),
    isWearable: wearableCategories.has(product.category),
    isVehicleVisualisation: vehicleCategories.has(product.category),
    prompt: productPrompt(product),
  }),
)

export const wolfpackClothingProducts = wolfpackStoreProducts.filter((product) => product.isWearable)

export const wolfpackAccessoryProducts = wolfpackStoreProducts.filter((product) => !product.isWearable)

export function getWolfpackStoreStats(products: readonly WolfpackStoreProduct[]) {
  return {
    products: products.length,
    viewsPerProduct: Object.keys(storeViewLabels).length,
    images: products.length * Object.keys(storeViewLabels).length,
    apparel: products.filter((product) => product.isWearable).length,
    vehicleAccessories: products.filter((product) => product.isVehicleVisualisation).length,
  } as const
}

export const wolfpackStoreStats = {
  products: wolfpackStoreProducts.length,
  viewsPerProduct: Object.keys(storeViewLabels).length,
  images: wolfpackStoreProducts.length * Object.keys(storeViewLabels).length,
  apparel: wolfpackStoreProducts.filter((product) => product.isWearable).length,
  vehicleAccessories: wolfpackStoreProducts.filter((product) => product.isVehicleVisualisation).length,
} as const

export const featuredWolfpackStoreProducts = wolfpackStoreProducts.filter((product, index) => {
  return index < 12 || product.category === "Suspension" || product.category === "Protection"
})

export const wolfpackStoreHeroes: readonly WolfpackStoreHero[] = [
  {
    id: "full-drop",
    title: "Full Wolfpack Drop",
    kicker: "Apparel, camp gear and 4x4 accessories",
    src: "/media/wolfpack/store/heroes/wolfpack-store-master-hero.webp",
    alt: "Wolfpack 4x4 apparel, camp gear and performance accessories arranged in a dark workshop",
  },
  {
    id: "apparel-line",
    title: "Clothing Line",
    kicker: "Every garment gets its own Wolfpack artwork",
    src: "/media/wolfpack/store/heroes/wolfpack-apparel-line-hero.webp",
    alt: "Wolfpack 4x4 clothing line with t-shirts, jackets, hoodie, hats and socks",
  },
  {
    id: "accessory-fitment",
    title: "4x4 Accessory Concepts",
    kicker: "Australian 4WD fitment visuals",
    src: "/media/wolfpack/store/heroes/wolfpack-accessories-vehicle-hero.webp",
    alt: "Wolfpack 4x4 performance accessories staged with Australian 4WD vehicles",
  },
]

export const wolfpackClothingHeroes = wolfpackStoreHeroes.filter((hero) => hero.id === "apparel-line")

export const wolfpackAccessoryHeroes = wolfpackStoreHeroes.filter(
  (hero) => hero.id === "accessory-fitment" || hero.id === "full-drop",
)
