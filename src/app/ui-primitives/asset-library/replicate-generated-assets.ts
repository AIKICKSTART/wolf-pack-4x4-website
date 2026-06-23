import type { AssetItem } from "../components/asset-library"
import { SEEDANCE_VIDEO_PACK } from "../seedance-video-pack"

export interface ReplicateGeneratedAsset {
  id: string
  preview: string
  filePath: string
  prompt: string
  model: string
  inputType: string
  outputType: string
  costNote: string
  useCase: string
  lightDarkSuitability: string
  altText: string
  optimisationNotes: string
  reuseInstructions: string
  assetItem: AssetItem
}

const SHARED_MODEL_NOTE =
  "Historical generated media imported into the Replicate asset namespace; regenerate with a current catalogue model before production reuse."

const SHARED_COST_NOTE =
  "No new Replicate prediction was run for this implementation. Refresh pricing on the selected live model page before regeneration."

const SEEDANCE_COST_NOTE =
  "Generated with bytedance/seedance-2.0 during the capped live run; estimated USD 2.50 per 15-second output, with pricing marked refreshable."

const SEEDANCE_GENERATED_VIDEO_ASSETS: ReadonlyArray<ReplicateGeneratedAsset> = SEEDANCE_VIDEO_PACK.map((asset) => ({
  id: `seedance-${asset.id}`,
  preview: asset.posterSrc,
  filePath: `public${asset.videoSrc}`,
  prompt: asset.promptSummary,
  model: asset.model,
  inputType: "text prompt plus approved local reference images",
  outputType: `video/mp4, ${asset.aspectRatio}, 15 seconds`,
  costNote: SEEDANCE_COST_NOTE,
  useCase: `${asset.purpose} Reused by the 40-option hero presentation library.`,
  lightDarkSuitability:
    "Dark-theme native with red, carbon, and workshop lighting; use the paired poster for reduced-motion and light-mode checks.",
  altText: asset.alt,
  optimisationNotes:
    "Fast-start MP4 with paired WebP poster; use muted playsInline autoplay, metadata preload, and poster fallback for reduced motion.",
  reuseInstructions: `Use ${asset.videoSrc} with poster ${asset.posterSrc}; keep the real local logo as an overlay instead of baking text into the clip.`,
  assetItem: {
    id: `asset-seedance-${asset.id}`,
    name: `${asset.id}.mp4`,
    kind: "video",
    thumb: asset.posterSrc,
    dimensions: asset.aspectRatio === "16:9" ? { width: 1280, height: 720 } : { width: 720, height: 1280 },
    durationSec: asset.durationSec,
    license: "proprietary",
    ownerId: "janelle",
  },
}))

export const REPLICATE_GENERATED_ASSETS: ReadonlyArray<ReplicateGeneratedAsset> = [
  ...SEEDANCE_GENERATED_VIDEO_ASSETS,
  {
    id: "replicate-workshop-showcase",
    preview: "/media/generated/replicate/replicate-workshop-showcase.webp",
    filePath: "public/media/generated/replicate/replicate-workshop-showcase.webp",
    prompt: "Premium realistic vehicle in a clean automotive workshop service bay, reflective paint, no text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Fallback poster for the workshop vehicle showcase primitive.",
    lightDarkSuitability: "Dark-safe with enough highlight separation for light-mode cards.",
    altText: "Performance vehicle staged in a clean automotive service bay.",
    optimisationNotes: "Already WebP; keep under 350 KB for fast primitive loading.",
    reuseInstructions: "Use behind WebGL loading states and as a static poster when motion is disabled.",
    assetItem: {
      id: "asset-replicate-workshop-showcase",
      name: "replicate-workshop-showcase.webp",
      kind: "image",
      size: 268_360,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-exhaust-service",
    preview: "/media/generated/replicate/replicate-exhaust-service.webp",
    filePath: "public/media/generated/replicate/replicate-exhaust-service.webp",
    prompt: "Realistic exhaust service bay hero image with premium workshop lighting and clean composition.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Fallback poster for the exhaust service hero primitive.",
    lightDarkSuitability: "Works best on dark surfaces; verify contrast before light hero usage.",
    altText: "Automotive service bay prepared for exhaust work.",
    optimisationNotes: "Use as WebP poster; create AVIF derivative for production if needed.",
    reuseInstructions: "Pair with the exhaust hero 3D variant or static service-card previews.",
    assetItem: {
      id: "asset-replicate-exhaust-service",
      name: "replicate-exhaust-service.webp",
      kind: "image",
      size: 124_930,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-performance-promo",
    preview: "/media/generated/replicate/replicate-performance-promo.webp",
    filePath: "public/media/generated/replicate/replicate-performance-promo.webp",
    prompt: "Cinematic performance car promo with glossy reflections, premium lighting, no visible text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Poster and asset-library preview for the performance vehicle promo.",
    lightDarkSuitability: "Dark-mode native with strong highlight contrast.",
    altText: "Glossy performance car presented under cinematic studio lighting.",
    optimisationNotes: "Consider a lower-quality WebP derivative for grid thumbnails.",
    reuseInstructions: "Use in performance-card previews, generated hero experiments, and WebGL fallbacks.",
    assetItem: {
      id: "asset-replicate-performance-promo",
      name: "replicate-performance-promo.webp",
      kind: "image",
      size: 301_364,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-parts-product",
    preview: "/media/generated/replicate/replicate-parts-product.webp",
    filePath: "public/media/generated/replicate/replicate-parts-product.webp",
    prompt: "Premium exhaust product detail on a clean workshop bench, realistic lighting, no text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Fallback poster for the parts product 3D primitive.",
    lightDarkSuitability: "Suitable for light and dark product cards after edge contrast check.",
    altText: "Polished exhaust product detail on a workshop surface.",
    optimisationNotes: "Crop square derivative for catalogue grid cards if reused.",
    reuseInstructions: "Use with product-scene routes and parts-library previews.",
    assetItem: {
      id: "asset-replicate-parts-product",
      name: "replicate-parts-product.webp",
      kind: "image",
      size: 141_988,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-social-preview",
    preview: "/media/generated/replicate/replicate-social-preview.webp",
    filePath: "public/media/generated/replicate/replicate-social-preview.webp",
    prompt: "Social-ready vehicle preview with rugged performance stance, realistic reflections, no text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Poster for square-safe social vehicle preview primitive.",
    lightDarkSuitability: "Dark-mode preferred; crop and contrast-test for light social cards.",
    altText: "Rugged performance vehicle composed for a social media preview.",
    optimisationNotes: "Generate 1:1 and 4:5 crops before social export.",
    reuseInstructions: "Use as a source poster for social-preview scene cards and thumbnail states.",
    assetItem: {
      id: "asset-replicate-social-preview",
      name: "replicate-social-preview.webp",
      kind: "image",
      size: 319_578,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-website-hero-poster",
    preview: "/media/generated/replicate/replicate-website-hero-poster.webp",
    filePath: "public/media/generated/replicate/replicate-website-hero-poster.webp",
    prompt: "Website hero poster for a classic performance car at dawn, premium automotive lighting, no text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Poster fallback for website hero video primitive.",
    lightDarkSuitability: "Works in both modes with a dark overlay for text placement.",
    altText: "Classic performance car shown in dramatic dawn lighting.",
    optimisationNotes: "Keep poster paired with matching compressed video derivative.",
    reuseInstructions: "Use as video poster, WebGL background, or hero fallback image.",
    assetItem: {
      id: "asset-replicate-website-hero-poster",
      name: "replicate-website-hero-poster.webp",
      kind: "image",
      size: 234_012,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-website-hero-loop",
    preview: "/media/generated/replicate/replicate-website-hero-poster.webp",
    filePath: "public/media/generated/replicate/replicate-website-hero-loop.mp4",
    prompt: "Short website hero vehicle loop with smooth camera motion, no text, no private assets.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt or approved poster",
    outputType: "video/mp4",
    costNote: SHARED_COST_NOTE,
    useCase: "Local video fallback layer for the website hero vehicle primitive.",
    lightDarkSuitability: "Dark-safe; use poster or overlay for light-mode pages.",
    altText: "Looping vehicle hero video used as a fallback behind a WebGL scene.",
    optimisationNotes: "Provide poster, muted autoplay, playsInline, and reduced-motion stop behavior.",
    reuseInstructions: "Use only as decorative video behind accessible scene labels and static poster fallback.",
    assetItem: {
      id: "asset-replicate-website-hero-loop",
      name: "replicate-website-hero-loop.mp4",
      kind: "video",
      durationSec: 8,
      size: 2_043_301,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
  {
    id: "replicate-dashboard-status",
    preview: "/media/generated/replicate/replicate-dashboard-status.webp",
    filePath: "public/media/generated/replicate/replicate-dashboard-status.webp",
    prompt: "Dashboard vehicle status visual with clean performance car details and subdued lighting, no text.",
    model: SHARED_MODEL_NOTE,
    inputType: "text prompt",
    outputType: "image/webp",
    costNote: SHARED_COST_NOTE,
    useCase: "Poster for dashboard vehicle status animation primitive.",
    lightDarkSuitability: "Works in dense dark dashboards; verify line contrast in light theme.",
    altText: "Performance vehicle visual prepared for a dashboard status animation.",
    optimisationNotes: "Use compact thumbnails for dashboard cards to keep load cost low.",
    reuseInstructions: "Pair with status scans, telemetry cards, and reduced-motion fallbacks.",
    assetItem: {
      id: "asset-replicate-dashboard-status",
      name: "replicate-dashboard-status.webp",
      kind: "image",
      size: 148_918,
      license: "proprietary",
      ownerId: "janelle",
    },
  },
]
