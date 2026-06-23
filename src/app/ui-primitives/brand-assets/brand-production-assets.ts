export interface ProductionBrandCrop {
  title: string
  path: string
  dimensions: string
}

export interface ProductionBrandAsset {
  title: string
  path: string
  category:
    | "Apparel"
    | "Fleet"
    | "Stationery"
    | "Product demo"
    | "Brand system"
    | "Merch"
    | "Aftercare"
  usage: string
  sourceLogo: string
  proof: string
  ratio: string
  tone: string
  crops: ReadonlyArray<ProductionBrandCrop>
}

const primaryLogo = "/media/mufflermen-logo.webp"

export const productionBrandManifestPath = "/media/brand/manifests/production-brand-assets.json"

export const productionBrandAssets: ReadonlyArray<ProductionBrandAsset> = [
  {
    title: "Brand system environment hero",
    path: "/media/brand/brand-system/mufflermen-brand-system-environment-hero.webp",
    category: "Brand system",
    usage:
      "Master brand-world scene showing fascia, fleet, uniforms, merch, counter collateral, and workshop lighting in one dark red environment.",
    sourceLogo: primaryLogo,
    proof:
      "Generated as one full-scene image-agent pass using the local Mufflermen identity references and the carbon-red hero-video palette.",
    ratio: "16:9",
    tone: "var(--primitive-red)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/brand-system/mufflermen-brand-system-environment-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/brand-system/mufflermen-brand-system-environment-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Technician uniform hero",
    path: "/media/brand/apparel/model-shots/technician-uniform-hero.webp",
    category: "Apparel",
    usage:
      "Staff uniform, recruitment, merch-page hero, and workshop-brand presentation with branded garments shown in a real fabrication bay.",
    sourceLogo: primaryLogo,
    proof:
      "Garment branding is part of the single generated scene and tuned to the same dark workshop palette used by the video board.",
    ratio: "16:9",
    tone: "var(--primitive-amber)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/apparel/model-shots/technician-uniform-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/apparel/model-shots/technician-uniform-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Branded ute workshop hero",
    path: "/media/brand/fleet/ute-hero/branded-ute-workshop-hero.webp",
    category: "Fleet",
    usage:
      "Fleet wrap proof, fascia-signage example, homepage banner, and local campaign creative aligned to the dark red workshop video treatment.",
    sourceLogo: primaryLogo,
    proof:
      "Vehicle wrap and fascia branding are part of the single generated scene.",
    ratio: "16:9",
    tone: "var(--primitive-green)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/fleet/ute-hero/branded-ute-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/fleet/ute-hero/branded-ute-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Stationery and print flatlay",
    path: "/media/brand/stationery/mufflermen-stationery-flatlay.webp",
    category: "Stationery",
    usage:
      "Business cards, quote pack, letterhead, invoice forms, reminder pieces, and print-collateral examples shown as one real tabletop suite.",
    sourceLogo: primaryLogo,
    proof:
      "Printed branding is part of the generated stationery scene, with the same black/red/chrome identity language used by the video system.",
    ratio: "16:9",
    tone: "var(--primitive-teal)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/stationery/mufflermen-stationery-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/stationery/mufflermen-stationery-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Exhaust product demo hero",
    path: "/media/brand/products/demo/exhaust-product-demo-hero.webp",
    category: "Product demo",
    usage:
      "Product category hero, ecommerce support image, parts-promo creative, and quote insert with branded tags, sleeves, and bench presentation.",
    sourceLogo: primaryLogo,
    proof:
      "The Mufflermen brand language is integrated into the product bench scene and matches the dark workshop/service-video chrome look.",
    ratio: "16:9",
    tone: "var(--primitive-red)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/products/demo/exhaust-product-demo-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/products/demo/exhaust-product-demo-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Merch rail hero",
    path: "/media/brand/merch/mufflermen-merch-rail-hero.webp",
    category: "Merch",
    usage:
      "Club-day merch, apparel promo art, retail-rail proof, and community-brand expansion beyond the workshop service surfaces.",
    sourceLogo: primaryLogo,
    proof:
      "Hoodies, tees, caps, patches, and stubby coolers are shown as a coherent merch line inside the same dark red workshop aesthetic.",
    ratio: "16:9",
    tone: "var(--primitive-amber)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/merch/mufflermen-merch-rail-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/merch/mufflermen-merch-rail-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
  {
    title: "Customer handover hero",
    path: "/media/brand/handover/mufflermen-customer-handover-hero.webp",
    category: "Aftercare",
    usage:
      "Aftercare pack, warranty handover, booking reminder proof, and customer-operations showcase with branded printed pieces and keys.",
    sourceLogo: primaryLogo,
    proof:
      "The handover kit is presented as a real branded tabletop scene, extending the identity into CRM and aftercare touchpoints.",
    ratio: "16:9",
    tone: "var(--primitive-green)",
    crops: [
      {
        title: "Square social crop",
        path: "/media/brand/handover/mufflermen-customer-handover-square.webp",
        dimensions: "1400x1400",
      },
      {
        title: "Story crop",
        path: "/media/brand/handover/mufflermen-customer-handover-story.webp",
        dimensions: "1080x1920",
      },
    ],
  },
]
