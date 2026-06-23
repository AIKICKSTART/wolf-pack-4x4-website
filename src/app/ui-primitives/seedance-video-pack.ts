export type SeedanceAspectRatio = "16:9" | "9:16"
export type SeedanceFormFactor = "landscape" | "portrait"
export type SeedanceTone = "ember" | "amber" | "abyss" | "green" | "iron"

export interface SeedanceVideoAsset {
  id: string
  title: string
  purpose: string
  section: string
  transition: string
  formFactor: SeedanceFormFactor
  aspectRatio: SeedanceAspectRatio
  tone: SeedanceTone
  videoSrc: string
  posterSrc: string
  model: string
  durationSec: number
  promptSummary: string
  alt: string
}

const BASE = "/media/generated/replicate/videos"
const MODEL = "bytedance/seedance-2.0"

export const SEEDANCE_VIDEO_PACK: readonly SeedanceVideoAsset[] = [
  {
    id: "workshop-hero-landscape",
    title: "Desktop landing workshop hero",
    purpose: "Homepage and service landing hero background for desktop and wide tablet layouts.",
    section: "Landing hero",
    transition: "Anamorphic fade-in with a stable left-copy final frame.",
    formFactor: "landscape",
    aspectRatio: "16:9",
    tone: "ember",
    videoSrc: `${BASE}/workshop-hero-landscape.mp4`,
    posterSrc: `${BASE}/workshop-hero-landscape.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Wide workshop hero, hoist bay, performance vehicle, left-side UI safe space, no text or plates.",
    alt: "Wide cinematic workshop hero video with a performance vehicle and service bay lighting.",
  },
  {
    id: "workshop-hero-portrait",
    title: "Mobile workshop story hero",
    purpose: "Mobile landing hero and story-safe workshop opener with top and bottom UI safe zones.",
    section: "Mobile hero",
    transition: "Vertical crane reveal ending in a locked mobile-safe frame.",
    formFactor: "portrait",
    aspectRatio: "9:16",
    tone: "ember",
    videoSrc: `${BASE}/workshop-hero-portrait.mp4`,
    posterSrc: `${BASE}/workshop-hero-portrait.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Vertical workshop opener, vehicle low in frame, tall mobile copy space, no text or plates.",
    alt: "Vertical workshop hero video composed for mobile landing pages.",
  },
  {
    id: "performance-road-landscape",
    title: "Desktop performance road promo",
    purpose: "Performance category hero for wide pages, promo strips, and scroll-bound road motion.",
    section: "Performance promo",
    transition: "Tracking road-roll shot that resolves to a left-copy hero composition.",
    formFactor: "landscape",
    aspectRatio: "16:9",
    tone: "amber",
    videoSrc: `${BASE}/performance-road-landscape.mp4`,
    posterSrc: `${BASE}/performance-road-landscape.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Dawn road roll, wet asphalt reflections, twin exhaust detail, safe left copy space.",
    alt: "Wide performance road promo video with a rolling vehicle and exhaust detail.",
  },
  {
    id: "performance-road-portrait",
    title: "Mobile performance reel",
    purpose: "Portrait social reel and mobile performance CTA with the car low in frame.",
    section: "Social performance",
    transition: "Vertical road-roll reveal ending with tall safe space for mobile controls.",
    formFactor: "portrait",
    aspectRatio: "9:16",
    tone: "amber",
    videoSrc: `${BASE}/performance-road-portrait.mp4`,
    posterSrc: `${BASE}/performance-road-portrait.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Vertical dawn road roll, car low in frame, exhaust detail, mobile overlay safe zones.",
    alt: "Portrait performance road reel prepared for mobile and social surfaces.",
  },
  {
    id: "exhaust-product-landscape",
    title: "Desktop exhaust product sweep",
    purpose: "Parts/product scene, masked exhaust hero, and catalogue landing media.",
    section: "Parts product",
    transition: "Macro slider sweep across stainless parts into a stable product frame.",
    formFactor: "landscape",
    aspectRatio: "16:9",
    tone: "iron",
    videoSrc: `${BASE}/exhaust-product-landscape.mp4`,
    posterSrc: `${BASE}/exhaust-product-landscape.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Stainless exhaust bends, TIG weld texture, macro product movement, right-side copy space.",
    alt: "Wide macro product video of stainless exhaust components.",
  },
  {
    id: "exhaust-product-portrait",
    title: "Mobile exhaust product close-up",
    purpose: "Portrait parts-page product hero and social story detail for exhaust components.",
    section: "Parts story",
    transition: "Vertical macro sweep from exhaust tip to weld texture.",
    formFactor: "portrait",
    aspectRatio: "9:16",
    tone: "iron",
    videoSrc: `${BASE}/exhaust-product-portrait.mp4`,
    posterSrc: `${BASE}/exhaust-product-portrait.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Vertical stainless exhaust close-up, weld detail, dark top space for headline copy.",
    alt: "Portrait macro video of stainless exhaust parts and weld texture.",
  },
  {
    id: "service-dyno-landscape",
    title: "Desktop service and dyno scan",
    purpose: "Service-page hero, diagnostic dashboard video, and underbody reveal sections.",
    section: "Service diagnostic",
    transition: "Underbody scan into dyno-style rear-quarter frame.",
    formFactor: "landscape",
    aspectRatio: "16:9",
    tone: "green",
    videoSrc: `${BASE}/service-dyno-landscape.mp4`,
    posterSrc: `${BASE}/service-dyno-landscape.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Hoist-bay underbody reveal, exhaust routing scan, dyno finish, bottom UI safe area.",
    alt: "Wide service diagnostic video showing underbody exhaust work.",
  },
  {
    id: "service-dyno-portrait",
    title: "Mobile service scan",
    purpose: "Portrait service-page hero and mobile booking flow media with vertical underbody motion.",
    section: "Mobile service",
    transition: "Crane scan along exhaust routing ending in a mobile dashboard frame.",
    formFactor: "portrait",
    aspectRatio: "9:16",
    tone: "green",
    videoSrc: `${BASE}/service-dyno-portrait.mp4`,
    posterSrc: `${BASE}/service-dyno-portrait.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Vertical hoist-bay underbody scan, exhaust routing, mobile dashboard safe zones.",
    alt: "Portrait service scan video showing underbody exhaust routing.",
  },
  {
    id: "social-outro-landscape",
    title: "Desktop brand outro",
    purpose: "Landing-page closer, social preview, and wide CTA outro that can loop cleanly.",
    section: "Brand outro",
    transition: "Slow workshop slide into a composed final CTA frame.",
    formFactor: "landscape",
    aspectRatio: "16:9",
    tone: "abyss",
    videoSrc: `${BASE}/social-outro-landscape.mp4`,
    posterSrc: `${BASE}/social-outro-landscape.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Wide parked-vehicle silhouette, carbon workshop depth, exhaust parts, and clean CTA safe space.",
    alt: "Wide brand outro video with a parked vehicle silhouette and workshop depth.",
  },
  {
    id: "social-outro-portrait",
    title: "Portrait social story outro",
    purpose: "9:16 social story, reels preview, and mobile CTA outro with native-control safe zones.",
    section: "Story outro",
    transition: "Vertical workshop slide into a clean story outro hold.",
    formFactor: "portrait",
    aspectRatio: "9:16",
    tone: "abyss",
    videoSrc: `${BASE}/social-outro-portrait.mp4`,
    posterSrc: `${BASE}/social-outro-portrait.webp`,
    model: MODEL,
    durationSec: 15,
    promptSummary: "Vertical parked-vehicle silhouette, workshop depth, top and bottom UI safe zones.",
    alt: "Portrait brand outro video prepared for stories and mobile CTAs.",
  },
] as const

export function seedanceById(id: string): SeedanceVideoAsset {
  const asset = SEEDANCE_VIDEO_PACK.find((item) => item.id === id)
  if (!asset) {
    throw new Error(`Unknown Seedance video asset: ${id}`)
  }
  return asset
}

export function seedanceForFormFactor(section: string, formFactor: SeedanceFormFactor): SeedanceVideoAsset {
  const asset = SEEDANCE_VIDEO_PACK.find((item) => item.section === section && item.formFactor === formFactor)
  if (!asset) {
    throw new Error(`Unknown Seedance section/form factor: ${section} ${formFactor}`)
  }
  return asset
}
