import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"

import { business } from "@/lib/site-data"
import { PageHeader } from "../components/page-header"
import {
  CarSideIcon,
  ClipboardCheckIcon,
  EnvelopeTrailIcon,
  ExhaustPipeIcon,
  MigWelderIcon,
  PriceTagIcon,
  ShieldTickIcon,
  TigWelderIcon,
  UteSideIcon,
} from "../components/icons"
import styles from "../ui-primitives.module.css"
import {
  backlogAssets,
  backlogLanes,
  backlogManifestPath,
  type BrandBacklogAsset,
  type BrandBacklogIcon,
} from "./brand-backlog-data"
import {
  productionBrandAssets,
  productionBrandManifestPath,
} from "./brand-production-assets"
import brandStyles from "./brand-assets.module.css"

export const metadata: Metadata = {
  title: "Brand Media System | UI Primitives",
  description:
    "Brand-media board for Oak Flats Muffler Men covering workshop sales images, red-sunset vehicle sets, logo/icon outputs, print collateral, exhaust install proof, and customer handover assets.",
}

interface PortfolioAsset {
  title: string
  path: string
  usage: string
  group: string
  fit?: "cover" | "contain"
  tone: string
  ratio: string
}

interface GenerationBrief {
  title: string
  subject: string
  output: string
  placement: string
  prompt: string
  status: string
  tone: string
}

interface IdentityPlate {
  title: string
  previewPath: string
  deliverable: string
  usage: string
  size: string
  tone: string
  fit?: "cover" | "contain"
}

interface IconExportSpec {
  title: string
  px: number
  usage: string
  deliverable: string
  tone: string
}

type CollateralPreview =
  | "business-front"
  | "business-back"
  | "email-signature"
  | "quote-header"
  | "sticker-sheet"
  | "social-square"
  | "booking-confirmation"
  | "booking-reminder"
  | "video-thumbnail"
  | "video-signoff"
  | "video-shot-order"
  | "handover-frame"
  | "caption-safe-overlay"
  | "review-carousel"
  | "workshop-menu"
  | "warranty-aftercare"
  | "trackside-banner"
  | "key-drop"
  | "loan-car-tag"
  | "trade-account"
  | "paddock-pass"

interface CollateralSurface {
  title: string
  preview: CollateralPreview
  exportTarget: string
  primaryHref: string
  usage: string
  spec: string
  tone: string
}

interface VehicleSetFrame {
  title: string
  path: string
  role: string
  scene: string
  usage: string
  ratio: string
  fit?: "cover" | "contain"
}

interface VehicleSet {
  vehicle: string
  status: string
  sceneLock: string
  exteriorScene: string
  exteriorLocation: string
  lightingWindow: string
  technicalScene: string
  description: string
  manifest: string
  tone: string
  frames: ReadonlyArray<VehicleSetFrame>
}

interface ExpansionIdea {
  title: string
  category: string
  deliverable: string
  usage: string
  reason: string
  tone: string
}

const featuredReadyKits: ReadonlyArray<BrandBacklogAsset> = [
  "vehicle-specific-landing-cover",
  "service-reminder-card",
  "review-request-graphic",
  "service-vehicle-door-decal",
  "care-guide-one-pager",
  "loyalty-referral-card",
].flatMap((id) => backlogAssets.filter((asset) => asset.id === id))

const expansionIdeas: ReadonlyArray<ExpansionIdea> = [
  {
    title: "Event merch checkout kit",
    category: "Community",
    deliverable: "Price board, EFTPOS sign, and merch-table topper",
    usage: "Use at club days, open nights, and local shows where branded merch or promo packs need a faster checkout setup.",
    reason: "The paddock credential set now exists; the next event-commerce gap is a proper merch and payment surface for in-person activations.",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Fleet approval pack",
    category: "B2B",
    deliverable: "PO approval tile, rate summary, and sign-off sheet",
    usage: "Use when fleet managers or repeat trade customers need a faster approval path before work is booked.",
    reason: "The trade-account starter kit now exists; the next B2B gap is branded approval and sign-off support for repeat volume work.",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Sponsor / club banner pack",
    category: "Community",
    deliverable: "Trackside and cars-and-coffee banners",
    usage: "Use for local events, club support, and paddock photography backgrounds.",
    reason: "Expands the brand beyond the workshop and gives event photos a consistent backdrop.",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Parts-box sleeve system",
    category: "Packaging",
    deliverable: "Carton sleeve and insert cards",
    usage: "Wrap shipped parts, merch packs, and in-store pickups with branded packaging.",
    reason: "Useful for ecommerce and parts handoff moments that currently have no media system layer.",
    tone: "var(--primitive-green)",
  },
  {
    title: "Post-fitment check-in kit",
    category: "CRM",
    deliverable: "48-hour follow-up email / SMS assets",
    usage: "Use after installs to drive review requests, care reminders, and trust-building follow-up.",
    reason: "Booking confirmations now exist; the next customer-journey gap is branded aftercare and review follow-up.",
    tone: "var(--primitive-red)",
  },
  {
    title: "Workshop menu board family",
    category: "On-site signage",
    deliverable: "Bay menu boards and price strips",
    usage: "Use at reception, waiting areas, and service desks.",
    reason: "Bridges the gap between print collateral and physical workshop presentation.",
    tone: "var(--primitive-teal)",
  },
]

const lockedExteriorSceneLabel = "Dark workshop lane / red sunset"
const lockedExteriorLocationLabel =
  "One locked wet workshop forecourt outside corrugated service bays"
const lockedLightingWindowLabel =
  "Red sunset sky with warm bay practicals on wet asphalt"
const lockedTechnicalSceneLabel = "Dark carbon-red hoist bay"

const buildVehicleSetDescription = (vehicle: string) =>
  `${vehicle.replace(/ continuity set$/, "")} staged in the Oak Flats Muffler Men red-sunset workshop world. Each image gives the public site a ready sales angle: hero presence, side profile, rear exhaust stance, close hardware proof, and hoist-bay fitment confidence for muffler and exhaust customers.`

const normalizeVehicleFrame = (frame: VehicleSetFrame): VehicleSetFrame => {
  if (frame.role === "Start frame") {
    return {
      ...frame,
      title: "Front hero · quote opener",
      scene: lockedExteriorSceneLabel,
      usage:
        "Lead image for muffler quotes, performance-exhaust campaigns, and above-the-fold service sections.",
    }
  }

  if (frame.role === "Transition / reference") {
    return {
      ...frame,
      title: "Side profile · fitment view",
      scene: lockedExteriorSceneLabel,
      usage:
        "Shows vehicle stance and body line so customers can picture a clean exhaust upgrade on a real car.",
    }
  }

  if (frame.role === "End frame") {
    return {
      ...frame,
      title: "Rear hero · exhaust stance",
      scene: lockedExteriorSceneLabel,
      usage:
        "Rear-three-quarter sales image for exhaust tips, muffler replacement, and finish-quality proof.",
    }
  }

  if (frame.role === "Detail frame") {
    return {
      ...frame,
      title: "Exhaust detail close-up",
      scene: lockedExteriorSceneLabel,
      usage:
        "Close hardware proof for exhaust tips, weld quality, product cards, and service callouts.",
    }
  }

  return {
    ...frame,
    title: "Hoist-bay fitment proof",
    scene: lockedTechnicalSceneLabel,
    usage:
      "Underside proof that supports repair, replacement, routing, clearance, and fitment conversations.",
  }
}

const buildVehiclePackAssets = (set: VehicleSet): ReadonlyArray<VehicleSetFrame> =>
  set.frames.map((frame) => normalizeVehicleFrame(frame))

const continuityStandards: ReadonlyArray<{
  title: string
  meta: string
  summary: string
  tone: string
  details: string
}> = [
  {
    title: "Color lock",
    meta: "Yellow · red · black only",
    summary:
      "White, blue, and silver are out. The live fleet is now balanced across yellow, red, and black packs to keep the board visually controlled.",
    tone: "var(--primitive-amber)",
    details:
      "Allowed paint families only\nYellow muscle / hero variants\nRed performance / hero variants\nBlack halo / premium variants",
  },
  {
    title: "Pack delivery",
    meta: "Five live frames",
    summary:
      "Every approved set now ships exported start, side, end, exhaust, and undercarriage assets as individual full-scene images.",
    tone: "var(--primitive-red)",
    details:
      "Start frame hero\nSide profile reference\nEnd frame rear hero\nExhaust detail close-up\nUndercarriage hoist reference",
  },
  {
    title: "Scene lock",
    meta: "Hero-video aligned",
    summary:
      "The live standard now follows the same carbon-red workshop world as the video primitives: red sunset sky, warm bay practicals, wet asphalt, and dark hoist-bay lighting.",
    tone: "var(--primitive-teal)",
    details:
      "Dark workshop lane / red sunset\nLocked wet forecourt outside corrugated bays\nWarm practical lighting on wet asphalt\nDark carbon-red hoist bay for technical frames",
  },
]

const portfolioAssets: ReadonlyArray<PortfolioAsset> = [
  {
    title: "HSV GTS hero still",
    path: "/media/cinematic/hsv-gts-hero-performance-showcase.webp",
    usage: "Primary performance hero for homepage, proposal covers, ad landers, and launch banners.",
    group: "Halo vehicle",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "Falcon GT-HO dawn charge",
    path: "/media/generated/falcon-gt-ho-dawn-charge.webp",
    usage: "Fresh GPT Image 2 run for heritage-led hero sections, ad covers, and print-poster crops.",
    group: "New generation",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "HSV coupe halo",
    path: "/media/generated/hsv-coupe-gts-halo.webp",
    usage: "Fresh GPT Image 2 run for premium performance campaigns, sales decks, and social hero crops.",
    group: "New generation",
    tone: "var(--primitive-teal)",
    ratio: "16:9",
  },
  {
    title: "Ranger Raptor quarry hit",
    path: "/media/generated/ford-ranger-raptor-quarry-hit.webp",
    usage: "Fresh GPT Image 2 run for 4x4 exhaust offerings, ute marketing, and landing-page refreshes.",
    group: "New generation",
    tone: "var(--primitive-green)",
    ratio: "16:9",
  },
  {
    title: "Toyota GR Supra overpass run",
    path: "/media/generated/toyota-gr-supra-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for modern import-performance references, ad variety, and coupe-led campaign boards.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "Subaru WRX mountain charge",
    path: "/media/generated/subaru-wrx-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for rally-bred performance references, AWD storytelling, and motion-led brand tiles.",
    group: "Performance expansion",
    tone: "var(--primitive-teal)",
    ratio: "16:9",
  },
  {
    title: "Nissan Z NISMO track curve",
    path: "/media/generated/nissan-z-nismo-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for coupe performance variety, import campaign energy, and broader enthusiast reach.",
    group: "Performance expansion",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "Nissan GT-R R35 midnight launch",
    path: "/media/generated/nissan-gtr-r35-midnight-launch.webp",
    usage: "Fresh GPT Image 2 run for flagship Japanese performance coverage, campaign headers, and high-intent ad creative.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "BMW M3 Competition mountain sweep",
    path: "/media/generated/bmw-m3-competition-mountain-sweep.webp",
    usage: "Fresh GPT Image 2 run for European performance variety, premium sales-deck plates, and refined social ad crops.",
    group: "Performance expansion",
    tone: "var(--primitive-teal)",
    ratio: "16:9",
  },
  {
    title: "HSV GTSR W1 night launch",
    path: "/media/generated/hsv-gtsr-w1-night-launch.webp",
    usage: "Fresh GPT Image 2 run for flagship sedan hero work, premium brochure plates, and quote-deck openers.",
    group: "Performance expansion",
    tone: "var(--primitive-green)",
    ratio: "16:9",
  },
  {
    title: "HSV Clubsport R8 LSA red-sunset arrival",
    path: "/media/generated/hsv-clubsport-r8-lsa-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for HSV Commodore coverage, Australian muscle campaign variety, and premium booking-surface imagery.",
    group: "Performance expansion",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "HSV GTSR Maloo rare-ute launch",
    path: "/media/generated/hsv-gtsr-maloo-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for rare HSV ute coverage, premium Australian-muscle ads, and high-attention website campaign imagery.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "FPV GT-F final-edition storm run",
    path: "/media/generated/fpv-gt-f-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for modern rare Falcon coverage, premium sedan campaign variety, and Australian performance advertising surfaces.",
    group: "Performance expansion",
    tone: "var(--primitive-green)",
    ratio: "16:9",
  },
  {
    title: "Falcon XC Cobra dawn lane charge",
    path: "/media/generated/falcon-xc-cobra-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for rare Cobra coverage, heritage-Ford campaign variety, and collector-grade Australian performance advertising.",
    group: "Performance expansion",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "Falcon XA Phase IV collector studio launch",
    path: "/media/generated/falcon-xa-phase-iv-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for ultra-rare Falcon Phase IV coverage, collector-grade marketing, and heritage-led premium brand advertising.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "HSV Walkinshaw collector studio launch",
    path: "/media/generated/hsv-vl-walkinshaw-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for rare HSV Walkinshaw coverage, collector-grade Commodore campaigns, and Australian performance brand advertising.",
    group: "Performance expansion",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "HSV VN Group A studio launch",
    path: "/media/generated/hsv-vn-group-a-start-frame-front-hero.webp",
    usage: "Fresh GPT Image 2 continuity hero for rare VN Group A coverage, homologation-era Commodore campaigns, and Australian performance brand advertising.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "16:9",
  },
  {
    title: "Falcon Phase IV studio legend",
    path: "/media/generated/falcon-phase-iv-studio-legend.webp",
    usage: "Fresh GPT Image 2 run for rare-model posters, collector wall art, and heritage-led premium campaign crops.",
    group: "Performance expansion",
    tone: "var(--primitive-red)",
    ratio: "1:1",
  },
  {
    title: "Twin-system showcase",
    path: "/media/generated/featured-hsv-gts-twin-system.webp",
    usage: "Use for premium exhaust campaign modules, quote up-sell blocks, and comparison decks.",
    group: "Campaign",
    tone: "var(--primitive-amber)",
    ratio: "16:9",
  },
  {
    title: "Dyno-ready street car",
    path: "/media/generated/gallery-dyno-performance-car.webp",
    usage: "Use for socials, speed-led ad creative, and high-intent performance landing pages.",
    group: "Campaign",
    tone: "var(--primitive-teal)",
    ratio: "3:2",
  },
  {
    title: "Collector header beauty shot",
    path: "/media/generated/gallery-header-collector.webp",
    usage: "Use for fabrication features, custom-header callouts, and workshop craft sections.",
    group: "Parts",
    tone: "var(--primitive-amber)",
    ratio: "3:2",
  },
  {
    title: "Mandrel bender scene",
    path: "/media/generated/gallery-mandrel-bender-workshop.webp",
    usage: "Use for process explainers, workshop trust surfaces, and fitment capability pages.",
    group: "Workshop",
    tone: "var(--primitive-green)",
    ratio: "3:2",
  },
  {
    title: "Driveaway underbody detail",
    path: "/media/generated/gallery-driveaway-underbody.webp",
    usage: "Use for install proof, underbody craftsmanship, and before-after storytelling.",
    group: "Workshop",
    tone: "var(--primitive-red)",
    ratio: "3:2",
  },
  {
    title: "Exhaust weld macro",
    path: "/media/generated/gallery-tig-weld-macro.webp",
    usage: "Use for metallurgy, stainless-fab credibility, and detail-first ad crops.",
    group: "Macro",
    tone: "var(--primitive-teal)",
    ratio: "1:1",
  },
  {
    title: "Polished quad tips",
    path: "/media/generated/gallery-polished-quad-tips.webp",
    usage: "Use for sales tiles, carousel closers, premium-install hero strips, and sticker art.",
    group: "Parts",
    tone: "var(--primitive-amber)",
    ratio: "1:1",
  },
  {
    title: "HSV service-bay arrival",
    path: "/media/generated/workshop-hsv-service-bay.webp",
    usage: "Use for workshop UX, booking flows, mobile surfaces, and service-trust sections with a stronger vehicle-led hero.",
    group: "Workshop",
    tone: "var(--primitive-teal)",
    ratio: "16:9",
  },
]

const generationBriefs: ReadonlyArray<GenerationBrief> = [
  {
    title: "Falcon GT-HO dawn charge",
    subject: "1971 Ford Falcon XY GT-HO Phase III",
    output: "1600x900 hero still + 1200x628 ad crop",
    placement: "Homepage hero, proposal opener, social cover",
    status: "Generated v1",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium automotive advertising still for Oak Flats Muffler Men.",
      "Subject: 1971 Ford Falcon XY GT-HO Phase III, right-hand-drive, correct Australian muscle proportions, yellow-gold paint with black bonnet treatment.",
      "Scene: low-angle three-quarter front roller at dawn on a damp mountain road, subtle mist, heat shimmer, polished exhaust detail catching light.",
      "Style: hyper-real, dark workshop-grade contrast, cinematic reflections, no people, no text, no watermark.",
      "Avoid: cartoon rendering, modern body-kit parts, warped wheels, duplicate panels, fake badges.",
    ].join(String.fromCharCode(10)),
  },
  {
    title: "Rare HSV coupe continuity pack",
    subject: "HSV Coupe GTS",
    output: "5-frame continuity set + 1600x900 landing hero",
    placement: "High-end exhaust campaign, premium services page, motion references, paid social",
    status: "Continuity set live",
    tone: "var(--primitive-amber)",
    prompt: [
      "Asset: premium performance-coupe hero visual for Mufflermen brand portfolio.",
      "Subject: rare HSV Coupe GTS in deep black or dark metallic red, aggressive stance, authentic Australian coupe silhouette, polished quad tips.",
      "Scene: wet asphalt industrial lane at blue hour, chrome reflections, faint workshop smoke, camera close to the ground.",
      "Style: glossy magazine-grade realism, cinematic but believable, sharp body lines, no text overlays.",
      "Avoid: exaggerated flares, fake supercar proportions, crowds, extra vehicles, showroom clutter.",
    ].join("\n"),
  },
  {
    title: "Ranger Raptor quarry hit",
    subject: "Ford Ranger Raptor",
    output: "1600x900 hero still + 1080x1920 story variant",
    placement: "4x4 exhaust offering, ute landing pages, promo reels cover frame",
    status: "Generated v1",
    tone: "var(--primitive-teal)",
    prompt: [
      "Asset: off-road performance hero image for Oak Flats Muffler Men.",
      "Subject: new Ford Ranger Raptor with correct modern Raptor grille, muscular stance, Australian-spec feel, visible exhaust hardware.",
      "Scene: red-dirt quarry charge with dust plume, front-three-quarter view, suspension loaded, dramatic sky, late-afternoon light.",
      "Style: premium OEM-style ad photography, sharp paint, realistic tires and dust, no text, no people.",
      "Avoid: monster-truck proportions, unrealistic jumps, extra branding, deformed grille lettering, mud covering the whole vehicle.",
    ].join("\n"),
  },
  {
    title: "HSV GTSR W1 night launch",
    subject: "late-model HSV Commodore GTSR W1 halo sedan",
    output: "1600x900 hero still + 1080 square promo crop",
    placement: "Performance campaign page, quote deck divider, ad refresh",
    status: "Generated v1",
    tone: "var(--primitive-green)",
    prompt: [
      "Asset: flagship sedan campaign visual for Mufflermen performance brand system.",
      "Subject: HSV Commodore GTS or GTSR-style sedan, authentic Australian performance sedan stance, dark metallic finish, visible rear diffuser and exhaust tips.",
      "Scene: tunnel exit into wet city street at night, red taillight glow, steel reflections, subtle vapor in the air.",
      "Style: high-end automotive realism, clean lensing, premium contrast, restrained colour grading.",
      "Avoid: neon overload, fake aero, left-hand-drive interior views, duplicate lights, text overlays.",
    ].join("\n"),
  },
  {
    title: "Phase IV studio legend",
    subject: "Ford Falcon XA GT-HO Phase IV concept-era hero",
    output: "1400x1400 poster crop + 1600x900 landscape",
    placement: "Rare-model showcase, history-driven social post, print poster",
    status: "Generated v1",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: rare-model poster still for Oak Flats Muffler Men heritage wall.",
      "Subject: ultra-rare Ford Falcon XA GT-HO Phase IV styled faithfully as a museum-grade Australian hero car.",
      "Scene: dark studio with brushed-metal reflections, thin red edge light, front-quarter composition, subtle smoke floor.",
      "Style: collector-grade realism, iconic and restrained, heroic but not fantasy.",
      "Avoid: race livery overload, concept-car exaggeration, toy-like studio, fake sponsors, crowds.",
    ].join("\n"),
  },
  {
    title: "Subaru WRX mountain charge",
    subject: "Subaru WRX sedan",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "AWD performance campaign, social teaser, premium workshop ad set, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-teal)",
    prompt: [
      "Asset: premium AWD performance still for Oak Flats Muffler Men.",
      "Subject: Subaru WRX sedan in WR Blue Pearl with authentic hood scoop, performance stance, and visible quad exhaust hardware.",
      "Scene: darker pre-sunrise wet mountain road with rocky wall, guardrail, eucalyptus haze, and restrained cool grade.",
      "Style: hyper-real automotive advertising, rally-bred but premium, believable body geometry, no text, no watermark.",
      "Avoid: oversized rally wings, fake body kits, warm sunrise drift, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "Nissan Z NISMO track curve",
    subject: "Nissan Z NISMO",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Import coupe campaign, social teaser, premium workshop ad set, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-amber)",
    prompt: [
      "Asset: premium Japanese coupe still for Oak Flats Muffler Men.",
      "Subject: Nissan Z NISMO in light metallic grey with authentic current-generation coupe proportions and visible performance exhaust hardware.",
      "Scene: wet workshop lane at red sunset with service-bay glow, exhaust stance, and premium performance grade.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable body geometry, no text, no watermark.",
      "Avoid: fake body kits, warped greenhouse, exaggerated widebody, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "Toyota GR Supra overpass run",
    subject: "Toyota GR Supra",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Import coupe campaign, social teaser, premium workshop ad set, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium import-coupe still for Oak Flats Muffler Men.",
      "Subject: Toyota GR Supra in pearl white with authentic current-generation proportions and visible performance exhaust hardware.",
      "Scene: damp urban overpass at blue hour with city glow, concrete barriers, and restrained cool grade.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable body geometry, no text, no watermark.",
      "Avoid: fake body kits, warped roofline, exaggerated widebody, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "Nissan GT-R R35 midnight launch",
    subject: "Nissan GT-R R35 NISMO",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Import-performance campaign, social teaser, premium workshop ad set, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium Japanese performance hero still for Oak Flats Muffler Men.",
      "Subject: Nissan GT-R R35 NISMO in dark graphite, authentic proportions, quad exhaust visible, no people and no text.",
      "Scene: wet industrial precinct at night with red light streaks, reflective asphalt, subtle workshop vapor, low-angle three-quarter front composition.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, clean body geometry, believable lighting.",
      "Avoid: distorted wheels, fake aero, crowded backgrounds, neon overload, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "BMW M3 Competition mountain sweep",
    subject: "BMW M3 Competition sedan",
    output: "1600x900 hero still + 1200x628 ad crop",
    placement: "European-performance board expansion, brochure insert, and social variety tile",
    status: "Generated v1",
    tone: "var(--primitive-teal)",
    prompt: [
      "Asset: premium European performance still for the Mufflermen brand-assets system.",
      "Subject: BMW M3 Competition sedan in deep metallic blue with carbon roof and visible performance exhaust hardware.",
      "Scene: red-sunset workshop road with wet asphalt, warm bay glow, and front-three-quarter performance stance.",
      "Style: hyper-real ad photography, refined but aggressive, sharp panel lines, realistic tyres, believable atmosphere.",
      "Avoid: fake body kits, exaggerated grille distortion, extra vehicles, racetrack grandstands, heavy stylization.",
    ].join("\n"),
  },
  {
    title: "HSV Clubsport R8 LSA red-sunset arrival",
    subject: "2016 HSV Clubsport R8 LSA sedan",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "HSV Commodore campaign, performance workshop ad set, premium booking surfaces, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-amber)",
    prompt: [
      "Asset: premium HSV Commodore hero still for Oak Flats Muffler Men.",
      "Subject: authentic 2016 HSV Clubsport R8 LSA sedan in Phantom Black with correct four-door proportions, bonnet vents, silver performance wheels, and visible quad exhaust hardware.",
      "Scene: one locked wet industrial service road outside corrugated workshop bays at blue hour with practical workshop lights reflecting on wet asphalt.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable Australian sedan body geometry, no text, no watermark.",
      "Avoid: coupe proportions, fake supercar aero, left-hand-drive interior cues, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "HSV GTSR Maloo rare-ute launch",
    subject: "HSV GTSR Maloo ute",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Rare HSV ute campaign, Australian-muscle ad set, premium workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium rare-model HSV ute hero still for Oak Flats Muffler Men.",
      "Subject: authentic HSV GTSR Maloo performance ute in light white or silver with subtle red accents, correct Australian ute proportions, aggressive front fascia, silver wheels, and visible quad exhaust hardware.",
      "Scene: one locked wet industrial service road outside corrugated workshop bays at blue hour with warm workshop practicals reflecting on wet asphalt.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable Australian ute body geometry, no text, no watermark.",
      "Avoid: pickup-truck proportions, fantasy aero, left-hand-drive cues, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "FPV GT-F final-edition storm run",
    subject: "2014 FPV GT-F sedan",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Rare Falcon campaign, Australian-muscle ad set, premium workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-green)",
    prompt: [
      "Asset: premium rare-model Falcon hero still for Oak Flats Muffler Men.",
      "Subject: authentic 2014 FPV GT-F sedan in dark metallic blue with correct Australian Falcon four-door proportions, bonnet vents, large silver wheels, and visible quad exhaust hardware.",
      "Scene: one locked wet industrial service road outside corrugated workshop bays at cool blue hour with warm workshop practicals reflecting on wet asphalt.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable Australian sedan geometry, no text, no watermark.",
      "Avoid: European-sedan proportions, fake body kits, left-hand-drive cues, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "Falcon XC Cobra dawn lane charge",
    subject: "1978 Ford Falcon XC Cobra hardtop",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Rare Ford campaign, collector-grade ad set, workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-amber)",
    prompt: [
      "Asset: premium rare-model Ford hero still for Oak Flats Muffler Men.",
      "Subject: authentic 1978 Ford Falcon XC Cobra hardtop in white with blue Cobra striping, correct Australian two-door hardtop proportions, bonnet scoop, period alloys, and visible twin exhaust hardware.",
      "Scene: one locked wet industrial service road outside corrugated workshop bays at dawn-blue hour with warm workshop practicals reflecting on wet asphalt and light mist.",
      "Style: hyper-real automotive advertising, serious workshop-grade mood, believable Australian hardtop geometry, no text, no watermark.",
      "Avoid: modern wheel designs, fake body kits, left-hand-drive cues, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "Falcon XA Phase IV collector studio launch",
    subject: "Ford Falcon XA GT-HO Phase IV sedan",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Ultra-rare Falcon campaign, heritage collector ad set, workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium ultra-rare Falcon hero still for Oak Flats Muffler Men.",
      "Subject: authentic Ford Falcon XA GT-HO Phase IV sedan in yellow-gold with black bonnet treatment, correct Australian four-door proportions, period homologation cues, and visible twin exhaust hardware.",
      "Scene: one locked dark collector studio with brushed-metal reflections, subtle smoke floor, thin red edge light, and restrained spotlights.",
      "Style: hyper-real collector-grade advertising, serious workshop-grade mood, believable Australian sedan geometry, no text, no watermark.",
      "Avoid: coupe proportions, modern wheel designs, fake body kits, left-hand-drive cues, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "HSV Walkinshaw collector studio launch",
    subject: "HSV VL SS Group A Walkinshaw Commodore",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Rare HSV campaign, collector Commodore ad set, workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-amber)",
    prompt: [
      "Asset: premium rare HSV hero still for Oak Flats Muffler Men.",
      "Subject: authentic 1988 HSV VL SS Group A Walkinshaw Commodore in Panorama Silver, correct Australian right-hand-drive VL sedan proportions, signature Walkinshaw aero kit, body-colour rear spoiler treatment, and single exhaust exit.",
      "Scene: one locked dark collector studio with graphite wall panels, satin black reflective floor, faint amber guide light, light haze, and restrained overhead spotlights.",
      "Style: hyper-real collector-grade advertising, serious workshop-grade mood, believable Australian sedan geometry, no text, no watermark.",
      "Avoid: wrong colour, left-hand-drive cues, modern body kits, extra exhaust tips, cartoon rendering.",
    ].join("\n"),
  },
  {
    title: "HSV VN Group A studio launch",
    subject: "HSV VN SS Group A SV Commodore",
    output: "5-frame continuity set + 1600x900 hero still",
    placement: "Rare HSV campaign, homologation-era Commodore ad set, workshop reels, motion references",
    status: "Continuity set live",
    tone: "var(--primitive-red)",
    prompt: [
      "Asset: premium rare HSV hero still for Oak Flats Muffler Men.",
      "Subject: authentic 1989 HSV VN SS Group A SV Commodore in Durif Red, correct Australian right-hand-drive VN sedan proportions, Group A aero kit, black tail-light panel, body-colour spoiler, and dual exhaust treatment.",
      "Scene: one locked dark collector studio with vertical graphite wall panels, satin black reflective floor, faint red guide light, light haze, and restrained overhead spotlights.",
      "Style: hyper-real collector-grade advertising, serious workshop-grade mood, believable Australian sedan geometry, no text, no watermark.",
      "Avoid: wrong colour, left-hand-drive cues, modern wheels, fake body kit, extra vehicles, cartoon rendering.",
    ].join("\n"),
  },
]

const identityPlates: ReadonlyArray<IdentityPlate> = [
  {
    title: "Primary lockup",
    previewPath: "/media/brand/mufflermen-logo-primary.webp",
    deliverable: "/media/brand/mufflermen-logo-primary.webp",
    usage: "Deck covers, signage, proposals, quote headers, and hero lockups.",
    size: "Master",
    tone: "var(--primitive-red)",
    fit: "contain",
  },
  {
    title: "Navigation lockup",
    previewPath: "/media/brand/mufflermen-logo-nav.webp",
    deliverable: "/media/brand/mufflermen-logo-nav.webp",
    usage: "App shells, website nav, dashboard headers, and compact mastheads.",
    size: "Horizontal",
    tone: "var(--primitive-amber)",
    fit: "contain",
  },
  {
    title: "App icon",
    previewPath: "/media/brand/mufflermen-logo-icon-512.webp",
    deliverable: "/media/brand/mufflermen-logo-icon-512.webp",
    usage: "Social avatar, app icon, favicon source, badge stamp, and stickers.",
    size: "512",
    tone: "var(--primitive-teal)",
    fit: "contain",
  },
  {
    title: "Browser favicon set",
    previewPath: "/media/brand/mufflermen-logo-icon-512.webp",
    deliverable: "/favicon.ico",
    usage: "Browser tabs, bookmarks, tab-switcher previews, and pinned shortcuts.",
    size: "16 / 32",
    tone: "var(--primitive-green)",
    fit: "contain",
  },
  {
    title: "Apple touch icon",
    previewPath: "/media/brand/mufflermen-logo-icon-512.webp",
    deliverable: "/apple-icon.png",
    usage: "iOS home-screen saves, touch-launch tiles, and bookmark surfaces.",
    size: "180",
    tone: "var(--primitive-red)",
    fit: "contain",
  },
  {
    title: "PWA install icon",
    previewPath: "/media/brand/mufflermen-logo-icon-512.webp",
    deliverable: "/icon.png",
    usage: "Progressive-web-app install, Android launcher, and desktop app tile.",
    size: "192 / 512",
    tone: "var(--primitive-amber)",
    fit: "contain",
  },
]

const iconExportSpecs: ReadonlyArray<IconExportSpec> = [
  {
    title: "Favicon 16",
    px: 16,
    usage: "Browser tab favicon",
    deliverable: "/favicon.ico",
    tone: "var(--primitive-red)",
  },
  {
    title: "Favicon 32",
    px: 32,
    usage: "Retina tab / bookmark icon",
    deliverable: "/favicon.ico",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Utility 64",
    px: 64,
    usage: "Small app tile / docs insert",
    deliverable: "/media/brand/mufflermen-logo-icon-512.webp",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Apple touch 180",
    px: 180,
    usage: "iPhone and iPad home-screen save",
    deliverable: "/apple-icon.png",
    tone: "var(--primitive-green)",
  },
  {
    title: "PWA 192",
    px: 192,
    usage: "Android / PWA install icon",
    deliverable: "/icon.png",
    tone: "var(--primitive-red)",
  },
  {
    title: "Master 512",
    px: 512,
    usage: "Source icon for exports and store-ready derivatives",
    deliverable: "/media/brand/mufflermen-logo-icon-512.webp",
    tone: "var(--primitive-amber)",
  },
]

const collateralSurfaces: ReadonlyArray<CollateralSurface> = [
  {
    title: "Business card front",
    preview: "business-front",
    exportTarget: [
      "/media/brand/collateral/business-card-front-print.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/business-card-front-print.svg",
    usage: "Reception handouts, on-site quotes, workshop walk-ins, networking.",
    spec: "Print",
    tone: "var(--primitive-red)",
  },
  {
    title: "Business card back",
    preview: "business-back",
    exportTarget: [
      "/media/brand/collateral/business-card-back-print.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/business-card-back-print.svg",
    usage: "Service list, QR CTA, booking prompt, and contact reinforcement.",
    spec: "Print",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Email signature",
    preview: "email-signature",
    exportTarget: "/media/brand/collateral/email-signature-workshop.html",
    primaryHref: "/media/brand/collateral/email-signature-workshop.html",
    usage: "Sales replies, quote approvals, supplier outreach, and service reminders.",
    spec: "Digital",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Quote / invoice header",
    preview: "quote-header",
    exportTarget: [
      "/media/brand/collateral/quote-header-strip.svg",
      "/media/brand/collateral/letterhead-a4.svg",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/quote-header-strip.svg",
    usage: "Quotes, invoices, statement headers, and proposal page breaks.",
    spec: "Docs",
    tone: "var(--primitive-green)",
  },
  {
    title: "Sticker / decal sheet",
    preview: "sticker-sheet",
    exportTarget: "/media/brand/collateral/sticker-sheet-a4.svg",
    primaryHref: "/media/brand/collateral/sticker-sheet-a4.svg",
    usage: "Toolboxes, packaging inserts, merch orders, and giveaway packs.",
    spec: "Merch",
    tone: "var(--primitive-red)",
  },
  {
    title: "Social square card",
    preview: "social-square",
    exportTarget: "/media/brand/collateral/social-square-template.svg",
    primaryHref: "/media/brand/collateral/social-square-template.svg",
    usage: "Google Business posts, Facebook tiles, Instagram promo cards, and review asks.",
    spec: "Social",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Booking confirmation banner",
    preview: "booking-confirmation",
    exportTarget: "/media/brand/collateral/booking-confirmation-banner.svg",
    primaryHref: "/media/brand/collateral/booking-confirmation-banner.svg",
    usage: "Confirmation emails, CRM automations, intake updates, and workshop booking acknowledgements.",
    spec: "CRM",
    tone: "var(--primitive-red)",
  },
  {
    title: "Booking reminder mobile card",
    preview: "booking-reminder",
    exportTarget: "/media/brand/collateral/booking-reminder-mobile.svg",
    primaryHref: "/media/brand/collateral/booking-reminder-mobile.svg",
    usage: "Reminder emails, SMS share cards, WhatsApp sends, and reschedule nudges.",
    spec: "Mobile",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Video thumbnail master",
    preview: "video-thumbnail",
    exportTarget: [
      "/media/brand/collateral/video-thumbnail-master.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/video-thumbnail-master.svg",
    usage: "YouTube covers, reels posters, service-explainer thumbnails, and website video placeholders.",
    spec: "Video",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Video sign-off end frame",
    preview: "video-signoff",
    exportTarget: [
      "/media/brand/collateral/video-end-frame-signoff.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/video-end-frame-signoff.svg",
    usage: "Campaign end cards, workshop reel outros, quote-video sign-offs, and booking CTA closes.",
    spec: "Video",
    tone: "var(--primitive-red)",
  },
  {
    title: "Continuity shot-order sheet",
    preview: "video-shot-order",
    exportTarget: [
      "/media/brand/collateral/video-shot-order-reference-sheet.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/video-shot-order-reference-sheet.svg",
    usage: "Editor handoff, image-to-video prompting, scene-lock planning, and continuity-pack review.",
    spec: "Motion",
    tone: "var(--primitive-green)",
  },
  {
    title: "Service handover photo frame",
    preview: "handover-frame",
    exportTarget: [
      "/media/brand/collateral/service-handover-photo-frame.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/service-handover-photo-frame.svg",
    usage: "Pickup-day photos, aftercare emails, SMS follow-up, and social proof posts from real workshop deliveries.",
    spec: "Customer proof",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Reel caption-safe overlay pack",
    preview: "caption-safe-overlay",
    exportTarget: [
      "/media/brand/collateral/reel-caption-safe-overlay-pack.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/reel-caption-safe-overlay-pack.svg",
    usage: "Subtitle-safe workshop reels, continuity-pack cutdowns, quote videos, and social explainer overlays.",
    spec: "Motion",
    tone: "var(--primitive-red)",
  },
  {
    title: "Post-service review proof carousel",
    preview: "review-carousel",
    exportTarget: [
      "/media/brand/collateral/post-service-review-proof-carousel.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/post-service-review-proof-carousel.svg",
    usage: "Three-card social proof strip for aftercare posts, pickup follow-up, and review-driven local promotion.",
    spec: "Social proof",
    tone: "var(--primitive-amber)",
  },
  {
    title: "Workshop menu-board master",
    preview: "workshop-menu",
    exportTarget: [
      "/media/brand/collateral/workshop-menu-board-master.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/workshop-menu-board-master.svg",
    usage: "Reception menu board, waiting-area pricing board, and service desk offer layout for on-site presentation.",
    spec: "On-site",
    tone: "var(--primitive-green)",
  },
  {
    title: "Warranty / aftercare registration card",
    preview: "warranty-aftercare",
    exportTarget: [
      "/media/brand/collateral/warranty-aftercare-registration-card.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/warranty-aftercare-registration-card.svg",
    usage: "Aftercare registration, warranty confirmation, and post-fitment customer follow-up.",
    spec: "Aftercare",
    tone: "var(--primitive-red)",
  },
  {
    title: "Trackside fence mesh banner pack",
    preview: "trackside-banner",
    exportTarget: [
      "/media/brand/collateral/trackside-fence-mesh-banner-pack.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/trackside-fence-mesh-banner-pack.svg",
    usage: "Large-format event branding for club days, paddock edges, sponsor photography, and local car-meet presence.",
    spec: "Event",
    tone: "var(--primitive-amber)",
  },
  {
    title: "After-hours key-drop pack",
    preview: "key-drop",
    exportTarget: [
      "/media/brand/collateral/after-hours-key-drop-pack.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/after-hours-key-drop-pack.svg",
    usage: "Night-drop envelope, instructions, and check-in card for vehicles left before opening or after close.",
    spec: "Intake",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Service loan-car hang tag set",
    preview: "loan-car-tag",
    exportTarget: [
      "/media/brand/collateral/service-loan-car-hang-tag-set.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/service-loan-car-hang-tag-set.svg",
    usage: "Courtesy vehicles, loan cars, temporary workshop handoff cars, and quick-reference driver instructions.",
    spec: "Operations",
    tone: "var(--primitive-green)",
  },
  {
    title: "Trade-account starter kit",
    preview: "trade-account",
    exportTarget: [
      "/media/brand/collateral/trade-account-starter-kit.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/trade-account-starter-kit.svg",
    usage: "Trade onboarding, fleet account setup, repairer handoff, and repeat-customer commercial booking support.",
    spec: "B2B",
    tone: "var(--primitive-teal)",
  },
  {
    title: "Paddock credential pass set",
    preview: "paddock-pass",
    exportTarget: [
      "/media/brand/collateral/paddock-credential-pass-set.svg",
      "/media/brand/collateral/collateral-manifest.json",
    ].join("\n"),
    primaryHref: "/media/brand/collateral/paddock-credential-pass-set.svg",
    usage: "Club-day access passes, support-vehicle windscreens, crew lanyards, and branded event-entry control.",
    spec: "Event",
    tone: "var(--primitive-amber)",
  },
]

const vehicleSets: ReadonlyArray<VehicleSet> = [
  {
    vehicle: "HSV GTSR W1 continuity set",
    status: "Set 01 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet city / tunnel-edge blue hour",
    exteriorLocation: "One locked wet-city tunnel-edge block",
    lightingWindow: "Blue hour on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "First same-vehicle pack for the public site. This uses one HSV GTSR W1 identity across a red-sunset workshop setting with a locked hoist-bay technical scene, giving customers clear proof of stance, exhaust finish, and fitment quality.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-green)",
    frames: [
      {
        title: "Start frame · night launch",
        path: "/media/generated/hsv-gtsr-w1-night-launch.webp",
        role: "Start frame",
        scene: "Wet city exterior",
        usage: "Opening still, establishing shot, and identity anchor for the full W1 pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-gtsr-w1-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Wet city exterior",
        usage: "Side-motion bridge, profile reference, and clean vehicle read for continuity matching.",
        ratio: "16:9",
      },
      {
        title: "End frame · front hero",
        path: "/media/generated/hsv-gtsr-w1-end-frame-front-hero.webp",
        role: "End frame",
        scene: "Wet city exterior",
        usage: "Closing hero, CTA hold, and premium website landing crop.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-gtsr-w1-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Wet city exterior",
        usage: "Macro cutaway for feature modules, product storytelling, and motion inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-gtsr-w1-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Trust section, installation explainer, and underbody reference for video or website proof.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Ford Falcon GT-HO continuity set",
    status: "Set 02 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Mountain road dawn mist",
    exteriorLocation: "One locked dawn mountain bend",
    lightingWindow: "Dawn mist with low warm sun",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Second same-vehicle pack built around the yellow-and-black Falcon GT-HO identity. The exterior frames stay locked to the same dawn mountain-road location and the same misty sunrise lighting while the underside reference stays in a neutral hoist bay for technical continuity.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · dawn charge",
        path: "/media/generated/falcon-gt-ho-dawn-charge.webp",
        role: "Start frame",
        scene: "Mountain road exterior",
        usage: "Opening still, establishing shot, and identity anchor for the full Falcon pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/falcon-gt-ho-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Mountain road exterior",
        usage: "Side-motion bridge, clean silhouette read, and continuity reference for the Falcon set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/falcon-gt-ho-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Mountain road exterior",
        usage: "Closing hero, brand resolve, and campaign CTA hold for the Falcon story.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/falcon-gt-ho-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Mountain road exterior",
        usage: "Rear hardware cutaway for feature callouts, website inserts, and motion close-ups.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/falcon-gt-ho-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Workshop trust frame showing the Falcon underside and system routing for technical storytelling.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Ford Ranger Raptor continuity set",
    status: "Set 03 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Quarry dusk / red-dirt runout",
    exteriorLocation: "One locked quarry runout and ramp edge",
    lightingWindow: "Dusk dust with low amber sun",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Third same-vehicle pack built around the dark Ranger Raptor identity. The exterior frames now stay on the same quarry runout location in the same dusk lighting window while the underbody proof frame uses the same neutral hoist-bay technical scene as the other live sets.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-teal)",
    frames: [
      {
        title: "Start frame · quarry hit",
        path: "/media/generated/ford-ranger-raptor-quarry-hit.webp",
        role: "Start frame",
        scene: "Quarry exterior",
        usage: "Opening still, dust-hit identity anchor, and hero frame for the Ranger pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/ford-ranger-raptor-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Quarry exterior",
        usage: "Side-motion bridge, clean silhouette reference, and continuity match for the Ranger set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/ford-ranger-raptor-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Quarry exterior",
        usage: "Closing rear three-quarter resolve for ads, reels, and campaign end cards.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/ford-ranger-raptor-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Quarry exterior",
        usage: "Tailpipe hardware cutaway for web modules, feature callouts, and motion detail inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/ford-ranger-raptor-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside trust frame showing routing and off-road hardware in a readable technical view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Rare HSV Coupe GTS continuity set",
    status: "Set 04 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Dark workshop lane / red sunset",
    exteriorLocation: "One locked wet workshop forecourt outside corrugated service bays",
    lightingWindow: "Red sunset sky with warm bay practicals on wet asphalt",
    technicalScene: "Dark carbon-red hoist bay",
    description:
      "Fourth same-vehicle pack built around a rare HSV Coupe GTS. The frames sell premium muffler and performance-exhaust work with rear stance, close exhaust detail, and hoist-bay routing proof in the same red-sunset workshop world.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/hsv-coupe-gts-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Wet industrial exterior",
        usage: "Opening hero, rare-model landing still, and premium identity anchor for the coupe pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-coupe-gts-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Wet industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the coupe set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/hsv-coupe-gts-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Wet industrial exterior",
        usage: "Closing rear-three-quarter resolve for premium campaigns, reels, and CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-coupe-gts-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Wet industrial exterior",
        usage: "Macro cutaway for premium exhaust storytelling, feature callouts, and motion inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-coupe-gts-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the coupe exhaust routing and mechanical package in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Nissan GT-R R35 continuity set",
    status: "Set 05 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet industrial precinct / red-streak night",
    exteriorLocation: "One locked wet industrial lane with red traffic streaks",
    lightingWindow: "Night rain reflections with red accent streaks",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Fifth same-vehicle pack built around the GT-R R35 NISMO identity. The frames support import-performance exhaust work with front presence, rear muffler stance, close tip detail, and hoist-bay routing proof.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-red)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/nissan-gtr-r35-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Wet industrial exterior",
        usage: "Opening hero, import-performance landing still, and identity anchor for the GT-R pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/nissan-gtr-r35-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Wet industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the GT-R set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/nissan-gtr-r35-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Wet industrial exterior",
        usage: "Closing rear resolve for campaign end cards, reels, and premium CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/nissan-gtr-r35-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Wet industrial exterior",
        usage: "Macro cutaway for premium exhaust storytelling, import feature callouts, and motion inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/nissan-gtr-r35-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the GT-R exhaust routing and rear driveline package in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Subaru WRX continuity set",
    status: "Set 06 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet mountain road / overcast dawn",
    exteriorLocation: "One locked misty mountain bend with rock wall and guardrail",
    lightingWindow: "Red sunset sky with warm bay practicals on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Sixth same-vehicle pack built around the Subaru WRX identity. The frames sell AWD performance-exhaust work with stance, rear muffler presence, close hardware detail, and hoist-bay fitment confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-teal)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/subaru-wrx-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Wet mountain exterior",
        usage: "Opening hero, AWD campaign anchor, and premium identity still for the WRX pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/subaru-wrx-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Wet mountain exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the WRX set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/subaru-wrx-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Wet mountain exterior",
        usage: "Closing rear resolve for campaign end cards, reels, and premium CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/subaru-wrx-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Wet mountain exterior",
        usage: "Macro cutaway for AWD exhaust storytelling, feature callouts, and motion inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/subaru-wrx-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the WRX exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Toyota GR Supra continuity set",
    status: "Set 07 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Dark workshop lane / red sunset",
    exteriorLocation: "One locked wet workshop forecourt outside corrugated service bays",
    lightingWindow: "Red sunset sky with warm bay practicals on wet asphalt",
    technicalScene: "Dark carbon-red hoist bay",
    description:
      "Seventh same-vehicle pack built around a Toyota GR Supra. The frames give the public site a clear import-exhaust story: stance, rear muffler presence, close tip detail, and hoist-bay fitment confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-red)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/toyota-gr-supra-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Dark workshop exterior",
        usage: "Opening hero for import-exhaust quotes, performance muffler upgrades, and Supra fitment stories.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/toyota-gr-supra-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Dark workshop exterior",
        usage: "Side profile for stance, clearance, and customer fitment context.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/toyota-gr-supra-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Dark workshop exterior",
        usage: "Rear view for exhaust tip, muffler finish, and performance-system sales sections.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/toyota-gr-supra-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Dark workshop exterior",
        usage: "Close exhaust hardware proof for tips, welds, and product fitment callouts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/toyota-gr-supra-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Supra exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Nissan Z NISMO continuity set",
    status: "Set 08 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Dark workshop lane / red sunset",
    exteriorLocation: "One locked wet workshop forecourt outside corrugated service bays",
    lightingWindow: "Red sunset sky with warm bay practicals on wet asphalt",
    technicalScene: "Dark carbon-red hoist bay",
    description:
      "Eighth same-vehicle pack built around a Nissan Z NISMO. The set sells coupe exhaust upgrades with front presence, rear muffler stance, close hardware proof, and hoist-bay install confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/nissan-z-nismo-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Dark workshop exterior",
        usage: "Opening hero for coupe exhaust quotes and performance-muffler upgrades.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/nissan-z-nismo-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Dark workshop exterior",
        usage: "Side profile for stance, clearance, and customer fitment context.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/nissan-z-nismo-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Trackside exterior",
        usage: "Closing rear resolve for campaign end cards, reels, and premium CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/nissan-z-nismo-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Trackside exterior",
        usage: "Macro cutaway for import-exhaust storytelling, feature callouts, and motion inserts.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/nissan-z-nismo-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Z exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "HSV Clubsport R8 LSA continuity set",
    status: "Set 09 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet industrial service road / blue hour",
    exteriorLocation: "One locked wet service road outside corrugated workshop bays",
    lightingWindow: "Blue hour with warm workshop practicals on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Ninth same-vehicle pack built around the HSV Clubsport R8 LSA as a true HSV Commodore-family expansion. The frames sell Australian muscle exhaust work with rear stance, visible hardware, and workshop fitment proof.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/hsv-clubsport-r8-lsa-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Industrial exterior",
        usage: "Opening hero, HSV Commodore campaign anchor, and premium Australian-muscle still for the Clubsport pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-clubsport-r8-lsa-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the Clubsport set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/hsv-clubsport-r8-lsa-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Industrial exterior",
        usage: "Closing rear resolve for campaign end cards, reels, and premium CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-clubsport-r8-lsa-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Industrial exterior",
        usage: "Macro cutaway for exhaust storytelling, feature callouts, and motion inserts tied to the same Clubsport frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-clubsport-r8-lsa-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Clubsport exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "HSV GTSR Maloo continuity set",
    status: "Set 10 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet industrial service road / blue hour",
    exteriorLocation: "One locked wet service road outside corrugated workshop bays",
    lightingWindow: "Blue hour with warm workshop practicals on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Tenth same-vehicle pack built around the rare HSV GTSR Maloo as a ute-led expansion of the Australian performance library. The frames sell ute exhaust upgrades with rear stance, tip finish, and hoist-bay install confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-red)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/hsv-gtsr-maloo-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Industrial exterior",
        usage: "Opening hero, rare-model campaign anchor, and premium Australian-ute still for the Maloo pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-gtsr-maloo-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the Maloo set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/hsv-gtsr-maloo-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Industrial exterior",
        usage: "Closing rear resolve for rare-model ads, reels, and campaign CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-gtsr-maloo-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Industrial exterior",
        usage: "Macro cutaway for quad-tip storytelling, feature callouts, and motion inserts tied to the same Maloo frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-gtsr-maloo-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Maloo exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "FPV GT-F continuity set",
    status: "Set 11 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet industrial service road / cool blue hour",
    exteriorLocation: "One locked wet service road outside corrugated workshop bays",
    lightingWindow: "Cool blue hour with warm workshop practicals on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Eleventh same-vehicle pack built around the rare FPV GT-F as a final-edition Falcon expansion of the Australian performance library. The frames sell Falcon exhaust upgrades with rear stance, close hardware proof, and workshop fitment confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-green)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/fpv-gt-f-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Industrial exterior",
        usage: "Opening hero, rare-Falcon campaign anchor, and premium final-edition sedan still for the GT-F pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/fpv-gt-f-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the GT-F set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/fpv-gt-f-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Industrial exterior",
        usage: "Closing rear resolve for rare-Falcon ads, reels, and campaign CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/fpv-gt-f-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Industrial exterior",
        usage: "Macro cutaway for quad-tip storytelling, feature callouts, and motion inserts tied to the same GT-F frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/fpv-gt-f-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the GT-F exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Ford Falcon XC Cobra continuity set",
    status: "Set 12 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Wet industrial service road / dawn blue hour",
    exteriorLocation: "One locked wet service road outside corrugated workshop bays",
    lightingWindow: "Dawn blue hour with warm workshop practicals on wet asphalt",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Twelfth same-vehicle pack built around the rare Ford Falcon XC Cobra as a collector-grade hardtop expansion of the Australian performance library. The frames sell heritage Ford exhaust work with period stance, rear hardware presence, and fitment proof.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/falcon-xc-cobra-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Industrial exterior",
        usage: "Opening hero, rare-Cobra campaign anchor, and collector-grade hardtop still for the XC pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/falcon-xc-cobra-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Industrial exterior",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the Cobra set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/falcon-xc-cobra-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Industrial exterior",
        usage: "Closing rear resolve for rare-Ford ads, reels, and campaign CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/falcon-xc-cobra-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Industrial exterior",
        usage: "Macro cutaway for classic twin-tip storytelling, stripe-detail callouts, and motion inserts tied to the same Cobra frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/falcon-xc-cobra-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Cobra exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "Ford Falcon XA GT-HO Phase IV continuity set",
    status: "Set 13 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Collector studio / red-edge haze",
    exteriorLocation: "One locked brushed-metal collector studio with smoke floor",
    lightingWindow: "Controlled studio light with thin red edge accents",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Thirteenth same-vehicle pack built around the ultra-rare Ford Falcon XA GT-HO Phase IV as a collector-grade expansion of the Australian performance library. The frames sell careful heritage exhaust work with controlled lighting, stance, and fitment proof.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-red)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/falcon-xa-phase-iv-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Collector studio",
        usage: "Opening hero, ultra-rare Falcon campaign anchor, and collector-grade sedan still for the Phase IV pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/falcon-xa-phase-iv-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Collector studio",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the Phase IV set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/falcon-xa-phase-iv-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Collector studio",
        usage: "Closing rear resolve for ultra-rare Falcon ads, reels, and collector CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/falcon-xa-phase-iv-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Collector studio",
        usage: "Macro cutaway for classic twin-tip storytelling, stripe-detail callouts, and motion inserts tied to the same Phase IV frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/falcon-xa-phase-iv-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Phase IV exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "HSV VL SS Group A Walkinshaw continuity set",
    status: "Set 14 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Collector studio / amber-edge haze",
    exteriorLocation: "One locked graphite collector studio with satin reflective floor",
    lightingWindow: "Controlled top light with faint amber edge accents",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Fourteenth same-vehicle pack built around the rare HSV VL SS Group A Walkinshaw as a collector-grade HSV expansion of the Australian performance library. The frames sell heritage Commodore exhaust work with restrained lighting, visible stance, and fitment confidence.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-amber)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/hsv-vl-walkinshaw-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Collector studio",
        usage: "Opening hero, rare-HSV campaign anchor, and collector-grade Commodore still for the Walkinshaw pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-vl-walkinshaw-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Collector studio",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the Walkinshaw set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/hsv-vl-walkinshaw-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Collector studio",
        usage: "Closing rear resolve for rare-HSV ads, reels, and collector CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-vl-walkinshaw-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Collector studio",
        usage: "Macro cutaway for classic single-exit storytelling, rear aero-detail callouts, and motion inserts tied to the same Walkinshaw frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-vl-walkinshaw-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the Walkinshaw exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
  {
    vehicle: "HSV VN SS Group A continuity set",
    status: "Set 15 live",
    sceneLock: "Location + scene locked",
    exteriorScene: "Collector studio / red-edge haze",
    exteriorLocation: "One locked graphite collector studio with satin reflective floor",
    lightingWindow: "Controlled top light with faint red edge accents",
    technicalScene: "Dark service-scan hoist bay",
    description:
      "Fifteenth same-vehicle pack built around the rare HSV VN SS Group A as a homologation-era HSV expansion of the Australian performance library. The frames sell rare Commodore exhaust work with rear stance, hardware detail, and workshop fitment proof.",
    manifest: "/media/generated/vehicle-sets.json",
    tone: "var(--primitive-red)",
    frames: [
      {
        title: "Start frame · front hero",
        path: "/media/generated/hsv-vn-group-a-start-frame-front-hero.webp",
        role: "Start frame",
        scene: "Collector studio",
        usage: "Opening hero, rare-HSV campaign anchor, and homologation-era Commodore still for the VN Group A pack.",
        ratio: "16:9",
      },
      {
        title: "Transition frame · side profile",
        path: "/media/generated/hsv-vn-group-a-side-profile-reference.webp",
        role: "Transition / reference",
        scene: "Collector studio",
        usage: "Side-motion bridge, silhouette reference, and same-vehicle continuity match for the VN Group A set.",
        ratio: "16:9",
      },
      {
        title: "End frame · rear hero",
        path: "/media/generated/hsv-vn-group-a-end-frame-rear-hero.webp",
        role: "End frame",
        scene: "Collector studio",
        usage: "Closing rear resolve for rare-HSV ads, reels, and collector CTA holds.",
        ratio: "16:9",
      },
      {
        title: "Exhaust detail close-up",
        path: "/media/generated/hsv-vn-group-a-exhaust-closeup.webp",
        role: "Detail frame",
        scene: "Collector studio",
        usage: "Macro cutaway for dual-outlet storytelling, rear aero-detail callouts, and motion inserts tied to the same VN Group A frame family.",
        ratio: "16:9",
      },
      {
        title: "Undercarriage hoist reference",
        path: "/media/generated/hsv-vn-group-a-undercarriage-hoist.webp",
        role: "Technical frame",
        scene: "Workshop hoist bay",
        usage: "Underside proof frame showing the VN Group A exhaust routing and rear hardware in a readable workshop view.",
        ratio: "16:9",
      },
    ],
  },
]

const previewShell: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "grid",
  gap: "var(--primitive-space-3)",
  alignContent: "space-between",
  padding: "18px",
  background:
    "var(--brand-preview-shell-bg, radial-gradient(circle at 88% 0%, color-mix(in srgb, var(--primitive-red) 28%, transparent), transparent 34%), linear-gradient(155deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 58%, color-mix(in srgb, var(--primitive-red) 12%, var(--primitive-canvas)) 100%))",
  color: "var(--brand-preview-shell-fg, var(--primitive-text-strong))",
}

const previewHeader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--primitive-space-3)",
  fontFamily: "var(--primitive-font-mono)",
  fontSize: "var(--primitive-text-2xs)",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
}

const previewTag: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "24px",
  padding: "0 10px",
  borderRadius: "var(--primitive-radius-pill)",
  border: "1px solid var(--brand-preview-tag-border, var(--primitive-line-strong))",
  background: "var(--brand-preview-tag-bg, var(--primitive-glass-strong))",
  color: "var(--brand-preview-tag-fg, color-mix(in srgb, var(--primitive-body) 80%, var(--primitive-text-strong)))",
}

const previewHeadline: CSSProperties = {
  margin: 0,
  fontFamily: "var(--primitive-font-display)",
  fontSize: "clamp(28px, 4vw, 52px)",
  fontWeight: 400,
  lineHeight: 0.92,
  textTransform: "uppercase",
}

const previewBody: CSSProperties = {
  margin: 0,
  color: "color-mix(in srgb, var(--primitive-body) 82%, transparent)",
  fontSize: "var(--primitive-text-sm)",
  lineHeight: 1.55,
}

const signatureRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "var(--primitive-space-4)",
  padding: "14px 18px",
  borderRadius: "var(--primitive-radius-xl)",
  border: "1px solid var(--brand-signature-border, var(--primitive-line))",
  background:
    "var(--brand-signature-bg, linear-gradient(120deg, var(--primitive-glass-strong), var(--primitive-glass-soft)), var(--primitive-recessed))",
}

function renderIconScalePreview(px: number): ReactNode {
  const previewSize = Math.min(Math.max(Math.round(px / 1.8), 28), 132)

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        gap: "14px",
        padding: "18px",
        background:
          "var(--brand-icon-scale-bg, radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-red) 18%, transparent), transparent 34%), linear-gradient(145deg, color-mix(in srgb, var(--primitive-canvas) 88%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 66%, #fff) 100%))",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          minHeight: "140px",
          borderRadius: "var(--primitive-radius-xl)",
          border: "1px dashed var(--brand-icon-scale-inner-border, var(--primitive-line-strong))",
          background:
            "var(--brand-icon-scale-inner-bg, radial-gradient(circle at 50% 24%, var(--primitive-glass-strong), transparent 38%), linear-gradient(145deg, var(--primitive-glass-soft), var(--primitive-recessed)))",
        }}
      >
        <Image
          src="/media/brand/mufflermen-logo-icon-512.webp"
          alt=""
          width={previewSize}
          height={previewSize}
          style={{
            width: `${previewSize}px`,
            height: `${previewSize}px`,
            filter: "drop-shadow(0 14px 28px var(--primitive-overlay)) brightness(1.04)",
          }}
        />
      </div>
      <span style={previewTag}>{px}px export</span>
    </div>
  )
}

function renderCollateralPreview(preview: CollateralPreview): ReactNode {
  switch (preview) {
    case "business-front":
      return (
        <div style={previewShell}>
          <div style={previewHeader}>
            <span style={previewTag}>Front / 90 x 55</span>
            <span>Workshop performance card</span>
          </div>
          <div style={{ display: "grid", gap: "18px" }}>
            <Image
              src="/media/brand/mufflermen-logo-primary.webp"
              alt=""
              width={320}
              height={94}
              style={{ width: "78%", height: "auto" }}
            />
            <p style={previewHeadline}>Exhaust. Performance. Fabrication.</p>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-1)" }}>
            <p style={previewBody}>{business.address}</p>
            <p style={previewBody}>{business.phone} • {business.email}</p>
          </div>
        </div>
      )
    case "business-back":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 0% 100%, color-mix(in srgb, var(--primitive-amber) 24%, transparent), transparent 28%), linear-gradient(145deg, color-mix(in srgb, var(--primitive-canvas) 90%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 64%, #fff) 62%, color-mix(in srgb, var(--primitive-amber) 12%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>Back / service matrix</span>
            <span>QR-ready reverse</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Book the sound you actually want.</p>
            <div className={styles.assetMeta}>
              <span>Custom exhausts</span>
              <span>Mufflers</span>
              <span>4x4 systems</span>
              <span>Exhaust fabrication</span>
            </div>
          </div>
          <p style={previewBody}>Scan the QR or call to book fitment, quote review, or a sound upgrade consult.</p>
        </div>
      )
    case "email-signature":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 56%, color-mix(in srgb, var(--primitive-teal) 10%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={signatureRow}>
            <Image
              src="/media/brand/mufflermen-logo-nav.webp"
              alt=""
              width={220}
              height={68}
              style={{ width: "150px", height: "auto" }}
            />
            <div style={{ display: "grid", gap: "3px" }}>
              <strong style={{ fontSize: "14px" }}>Workshop bookings</strong>
              <span style={previewBody}>Oak Flats Muffler Men</span>
              <span style={previewBody}>{business.phone} • {business.mobile}</span>
              <span style={previewBody}>{business.email}</span>
            </div>
            <span style={previewTag}>Book a quote</span>
          </div>
          <p style={previewBody}>Designed to export as both image and table-based HTML signature.</p>
        </div>
      )
    case "quote-header":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--primitive-teal) 24%, transparent), transparent 32%), linear-gradient(140deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 66%, #fff) 62%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>Quote / invoice strip</span>
            <span>1600 x 360</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "18px", alignItems: "center" }}>
            <Image
              src="/media/brand/mufflermen-logo-primary.webp"
              alt=""
              width={280}
              height={82}
              style={{ width: "180px", height: "auto" }}
            />
            <div style={{ display: "grid", gap: "var(--primitive-space-1)" }}>
              <strong style={{ fontSize: "var(--primitive-text-md)" }}>Performance Exhaust Systems</strong>
              <span style={previewBody}>Quote issued from Oak Flats workshop operations</span>
            </div>
            <span style={previewTag}>Approved asset</span>
          </div>
        </div>
      )
    case "sticker-sheet":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 90%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 62%, #fff) 54%, color-mix(in srgb, var(--primitive-red) 8%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>Sticker sheet</span>
            <span>A4 cut lines</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "var(--primitive-space-2-5)",
            }}
          >
            {["M", "Exhaust", "Mufflermen", "Fabrication", "Oak Flats", "Performance"].map((item) => (
              <div
                key={item}
                style={{
                  minHeight: "54px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: item === "M" ? "18px" : "999px",
                  border: "1px solid var(--primitive-line-strong)",
                  background:
                    item === "M"
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--primitive-red) 24%, transparent), color-mix(in srgb, var(--primitive-amber) 14%, transparent))"
                      : "var(--primitive-glass-soft)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )
    case "social-square":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-red) 24%, transparent), transparent 34%), linear-gradient(145deg, color-mix(in srgb, var(--primitive-canvas) 88%, #000) 0%, color-mix(in srgb, var(--primitive-red) 12%, var(--primitive-canvas)) 46%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1080 square</span>
            <span>Campaign tile</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Custom Exhaust Systems</p>
            <p style={previewBody}>Sharper tone. Better fitment. Built in Oak Flats.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Book now</span>
            <span>HSV + Falcon + 4x4</span>
            <span>Use with car hero</span>
          </div>
        </div>
      )
    case "booking-confirmation":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 22%, transparent), transparent 34%), linear-gradient(145deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 68%, #fff) 54%, color-mix(in srgb, var(--primitive-red) 8%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>CRM banner / 1600 x 520</span>
            <span>Confirmation asset</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Booking confirmed</p>
            <p style={previewBody}>[DAY] [DATE] at [TIME] for [VEHICLE MAKE / MODEL / YEAR]</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Booked work: exhaust / repair / inspection</span>
            <span>CRM-ready</span>
            <span>Arrival details included</span>
          </div>
        </div>
      )
    case "booking-reminder":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--primitive-teal) 16%, transparent), transparent 34%), linear-gradient(155deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 67%, #fff) 54%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>Mobile card / 1080 x 1350</span>
            <span>Reminder asset</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>See you soon</p>
            <p style={previewBody}>[DAY] [DATE] at [TIME] with quick call or reschedule guidance built in.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>SMS share card</span>
            <span>WhatsApp-ready</span>
            <span>Call now CTA</span>
          </div>
        </div>
      )
    case "video-thumbnail":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-amber) 16%, transparent), transparent 36%), linear-gradient(145deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-amber) 10%, var(--primitive-canvas)) 52%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1280 x 720</span>
            <span>Thumbnail master</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>HSV exhaust upgrade</p>
            <p style={previewBody}>Use as the master poster frame for reels, explainers, and website video placeholders.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>YouTube</span>
            <span>Reels poster</span>
            <span>Website video card</span>
          </div>
        </div>
      )
    case "video-signoff":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 20%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-canvas) 69%, #fff) 48%, color-mix(in srgb, var(--primitive-red) 10%, var(--primitive-canvas)) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1920 x 1080</span>
            <span>End frame</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Book your fitment</p>
            <p style={previewBody}>Use as the branded outro and CTA surface for continuity-pack cutdowns and workshop reels.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Phone + web CTA</span>
            <span>Campaign outro</span>
            <span>Service chips</span>
          </div>
        </div>
      )
    case "video-shot-order":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 50%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>Motion handoff</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Shot-order sheet</p>
            <p style={previewBody}>Maps start, side, end, exhaust, and hoist frames into one continuity-planning surface.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Prompt handoff</span>
            <span>Editor guide</span>
            <span>Continuity check</span>
          </div>
        </div>
      )
    case "handover-frame":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 14%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 90%, #000) 0%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>Pickup-day frame</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Delivered and ready</p>
            <p style={previewBody}>Wraps real handover photos with booking, vehicle, and workshop proof details for post-service use.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>SMS follow-up</span>
            <span>Aftercare email</span>
            <span>Social proof post</span>
          </div>
        </div>
      )
    case "caption-safe-overlay":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-red) 18%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-red) 8%, var(--primitive-canvas)) 50%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1920 x 1080</span>
            <span>Subtitle-safe master</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Caption-safe reel pack</p>
            <p style={previewBody}>Gives reels and explainers fixed lower-third, subtitle, and CTA safe areas without rebuilding each post.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Lower third</span>
            <span>Subtitle rail</span>
            <span>CTA safe area</span>
          </div>
        </div>
      )
    case "review-carousel":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-amber) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-amber) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>3240 x 1350</span>
            <span>3-card proof strip</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Review proof carousel</p>
            <p style={previewBody}>Turns pickup photos, customer comments, and workshop trust cues into a repeatable local-promo format.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Before / after</span>
            <span>Customer quote</span>
            <span>Review CTA</span>
          </div>
        </div>
      )
    case "workshop-menu":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>On-site board</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Workshop menu board</p>
            <p style={previewBody}>Use across reception and waiting areas so offers, services, and calls-to-book present with the same brand system as the campaign media.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Reception</span>
            <span>Waiting area</span>
            <span>Service desk</span>
          </div>
        </div>
      )
    case "warranty-aftercare":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-red) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-red) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 70%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 900</span>
            <span>Aftercare card</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Warranty and care confirmed</p>
            <p style={previewBody}>Gives fitted-work follow-up a branded surface for warranty confirmation, registration, and next-step care reminders.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Warranty proof</span>
            <span>Care reminder</span>
            <span>Follow-up CTA</span>
          </div>
        </div>
      )
    case "trackside-banner":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-amber) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-red) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>2400 x 1200</span>
            <span>Large-format event banner</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Trackside brand presence</p>
            <p style={previewBody}>Sets a proper event backdrop for club days, sponsor fences, and paddock photography without inventing new layout work each time.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Club day</span>
            <span>Paddock fence</span>
            <span>Photo backdrop</span>
          </div>
        </div>
      )
    case "key-drop":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>Night-drop intake kit</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Leave keys with clarity</p>
            <p style={previewBody}>Packages the envelope, instruction card, and check-in details into one branded after-hours intake surface.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Key envelope</span>
            <span>Drop instructions</span>
            <span>Check-in slip</span>
          </div>
        </div>
      )
    case "loan-car-tag":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-green) 14%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 92%, #000) 0%, color-mix(in srgb, var(--primitive-green) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>Courtesy-car handoff kit</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Loan car, clearly tagged</p>
            <p style={previewBody}>Bundles the mirror hanger, dashboard card, and key tag into one repeatable courtesy-vehicle asset set.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Mirror hanger</span>
            <span>Dash card</span>
            <span>Key tag</span>
          </div>
        </div>
      )
    case "trade-account":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-teal) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-teal) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>B2B onboarding kit</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Trade account, clearly packaged</p>
            <p style={previewBody}>Groups the rate card, account form, and contact sheet into one branded starter surface for fleets and repairers.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Rate card</span>
            <span>Account form</span>
            <span>Trade contacts</span>
          </div>
        </div>
      )
    case "paddock-pass":
      return (
        <div
          style={{
            ...previewShell,
            background:
              "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--primitive-amber) 16%, transparent), transparent 34%), linear-gradient(150deg, color-mix(in srgb, var(--primitive-canvas) 91%, #000) 0%, color-mix(in srgb, var(--primitive-amber) 8%, var(--primitive-canvas)) 48%, color-mix(in srgb, var(--primitive-canvas) 71%, #fff) 100%)",
          }}
        >
          <div style={previewHeader}>
            <span style={previewTag}>1600 x 1200</span>
            <span>Event credential kit</span>
          </div>
          <div style={{ display: "grid", gap: "var(--primitive-space-2-5)" }}>
            <p style={previewHeadline}>Paddock access, properly branded</p>
            <p style={previewBody}>Packages the lanyard pass, windscreen credential, and crew badge into one reusable event-control surface.</p>
          </div>
          <div className={styles.assetMeta}>
            <span>Lanyard pass</span>
            <span>Windscreen pass</span>
            <span>Crew badge</span>
          </div>
        </div>
      )
  }
}

function renderBacklogIcon(icon: BrandBacklogIcon): ReactNode {
  const iconProps = { size: 34, tone: "currentColor" as const, motion: "none" as const }

  switch (icon) {
    case "payment":
      return <PriceTagIcon {...iconProps} title="Payment asset" />
    case "vehicle":
      return <UteSideIcon {...iconProps} title="Vehicle asset" />
    case "process":
      return <ExhaustPipeIcon {...iconProps} title="Process asset" />
    case "warranty":
      return <ShieldTickIcon {...iconProps} title="Warranty asset" />
    case "portrait":
      return <CarSideIcon {...iconProps} title="Workshop proof asset" />
    case "weld":
      return <TigWelderIcon {...iconProps} title="Weld asset" />
    case "inspection":
    case "care":
      return <ClipboardCheckIcon {...iconProps} title="Checklist asset" />
    case "sound":
      return <ExhaustPipeIcon {...iconProps} title="Sound-test asset" />
    case "email":
      return <EnvelopeTrailIcon {...iconProps} title="Email asset" />
    case "merch":
      return <MigWelderIcon {...iconProps} title="Merch asset" />
    case "social":
    case "review":
    case "signage":
    case "sales":
    default:
      return <PriceTagIcon {...iconProps} title="Brand asset" />
  }
}

function renderBacklogAssetPreview(asset: BrandBacklogAsset): ReactNode {
  return (
    <div className={styles.backlogPreview}>
      <div className={styles.backlogPreviewTop}>
        <span className={styles.backlogIcon} aria-hidden="true">
          {renderBacklogIcon(asset.icon)}
        </span>
        <span className={styles.backlogStatus}>{asset.status} · logo locked</span>
      </div>
      <div className={styles.backlogLogoPlate}>
        <Image
          src={asset.sourceLogo}
          alt={`${asset.title} uses the approved Mufflermen logo`}
          width={420}
          height={180}
          sizes="(max-width: 760px) 62vw, 220px"
        />
      </div>
      <div className={styles.backlogViewportRail} aria-label={`${asset.title} viewport coverage`}>
        {asset.viewportCoverage.map((viewport) => (
          <span key={`${asset.id}-${viewport}`}>{viewport}</span>
        ))}
      </div>
    </div>
  )
}

export default function BrandAssetsPage() {
  const backlogCount = backlogAssets.length
  const productionCount = productionBrandAssets.length

  return (
    <main className={`${styles.main} ${brandStyles.page}`}>
      <PageHeader
        kicker="08 / Marketing & Presentation"
        title="Brand media system"
        description="Expanded brand surface for Oak Flats Muffler Men: workshop sales scenes, red-sunset same-vehicle sets, identity outputs, print collateral, email signatures, exhaust install proof, and customer handover assets."
      />

      <section className={styles.section}>
        <div className={styles.heroPreview}>
          <div className={styles.previewTopbar}>
            <span />
            <span />
            <span />
            <code>{"// brand-assets · live expansion board"}</code>
          </div>

          <div style={{ display: "grid", gap: "18px", padding: "var(--primitive-space-3)" }}>
            <div className={styles.sectionHeader} style={{ marginBottom: 0 }}>
              <span>Board focus</span>
              <div style={{ display: "grid", gap: "var(--primitive-space-4)" }}>
                <h2>Cars, logos, print, apparel, and ad creative in one operating board.</h2>
                <p>
                  This page now acts as the live Mufflermen brand-assets control surface. It keeps
                  existing approved imagery visible, adds integrated brand scenes for the branded
                  ute, technician uniform, stationery, merch, handover, and product-demo lanes,
                  then keeps prompt-ready expansion briefs for HSV
                  Commodores, Falcon GT rare models, Ford Ranger Raptor visuals, and broader
                  performance references like Toyota GR Supra, Subaru WRX, Nissan Z, Nissan GT-R,
                  and BMW M3, while also shifting the production logic toward scene-locked
                  same-vehicle continuity sets with start, transition, end, detail, and underbody
                  frames tuned to the dark red service-video look. The backlog remains visible as
                  a template layer, but the final brand examples now live in the integrated scene
                  set rather than as stamped-logo placeholders.
                </p>
                <div className={styles.heroActions}>
                  <Link className={`${styles.siteButton} ${styles.siteButtonRed}`} href="/ui-primitives/branding">
                    Branding lab
                  </Link>
                  <Link className={`${styles.siteButton} ${styles.siteButtonChrome} ${brandStyles.chromeButton}`} href="/ui-primitives/branding/favicon-preview">
                    Icon sizes
                  </Link>
                  <Link className={`${styles.siteButton} ${styles.siteButtonGhost}`} href="/ui-primitives/print-docs">
                    Print docs
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.guideGrid}>
              <article
                className={styles.guideCard}
                style={{ "--card-tone": "var(--primitive-red)" } as CSSProperties}
              >
                <div className={styles.assetFrame}>
                  <Image
                    src="/media/cinematic/hsv-gts-hero-performance-showcase.webp"
                    alt="HSV GTS performance hero artwork used as the current lead brand image"
                    fill
                    sizes="(max-width: 1180px) 100vw, 720px"
                  />
                </div>
                <div className={styles.guideMeta}>
                  <span>Lead hero</span>
                  <span>Approved still</span>
                  <span>Use now</span>
                </div>
                <h2>Current halo frame</h2>
                <p>
                  Existing hero art stays in place while the next wave expands into Falcon GT-HO,
                  rare HSV coupe imagery, Ranger Raptor campaign-grade stills, and broader
                  enthusiast-car references across Supra, WRX, Nissan Z, GT-R, and BMW M3.
                </p>
              </article>

              <article
                className={styles.guideCard}
                style={{ "--card-tone": "var(--primitive-amber)" } as CSSProperties}
              >
                <div className={styles.guideMeta}>
                  <span>Requested vehicles</span>
                  <span>Dark red aligned</span>
                  <span>Templates separated</span>
                </div>
                <h2>Completed build targets</h2>
                <ol className={styles.stepList}>
                  <li>
                    <strong>1</strong>
                    <span>Falcon, HSV, and Ranger same-vehicle sets are live with scene-lock notes.</span>
                  </li>
                  <li>
                    <strong>2</strong>
                    <span>Root favicon, Apple touch icon, and PWA icon now resolve to real Mufflermen marks.</span>
                  </li>
                  <li>
                    <strong>3</strong>
                    <span>Integrated brand scenes now support muffler quotes, exhaust upgrades, parts handover, and workshop trust proof.</span>
                  </li>
                </ol>
                <pre className={styles.codeBlock}>
{`Asset outputs in play
- Website hero stills
- 1080 social crops
- 1200x628 ad cards
- 90x55 print cards
- 1200x360 signatures
- 1600x360 quote headers
- ${productionCount} integrated brand photo assets
- ${backlogCount} future sales-layout starters`}
                </pre>
              </article>
            </div>

            <div className={styles.telemetryStripe}>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-red)" } as CSSProperties}>
                <strong>{portfolioAssets.length}</strong>
                <small>Live portfolio stills</small>
              </div>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-green)" } as CSSProperties}>
                <strong>{vehicleSets.length}</strong>
                <small>Continuity sets live</small>
              </div>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-amber)" } as CSSProperties}>
                <strong>{generationBriefs.length}</strong>
                <small>Legacy briefs archived</small>
              </div>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-teal)" } as CSSProperties}>
                <strong>{identityPlates.length}</strong>
                <small>Identity outputs mapped</small>
              </div>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-green)" } as CSSProperties}>
                <strong>{productionCount}</strong>
                <small>Integrated brand scenes</small>
              </div>
              <div className={styles.telemetryStripeCell} style={{ "--tile-tone": "var(--primitive-red)" } as CSSProperties}>
                <strong>{backlogCount}</strong>
                <small>Template layout backlog</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Production image set</span>
          <div>
            <h2>Integrated brand scenes aligned to the video system</h2>
            <p>
              These are the finished branded-photo examples for the board: apparel, fleet, signage,
              stationery, merch, aftercare, and product scenes built to the same dark carbon-red
              workshop language used by the live video primitives. Every production image is a
              single full-scene image-agent generation with the logo requested as a reference inside
              the scene itself.
            </p>
          </div>
        </div>

        <article
          className={styles.guideCard}
          style={{ "--card-tone": "var(--primitive-red)", marginBottom: "22px" } as CSSProperties}
        >
          <div className={styles.guideMeta}>
            <span>{productionBrandAssets.length} hero assets</span>
            <span>{productionBrandAssets.reduce((total, asset) => total + asset.crops.length, 0)} responsive crops</span>
            <span>Dark red scene integration</span>
          </div>
          <h2>Production image manifest</h2>
          <p>
            This manifest records the local identity reference, source generation, production hero,
            and square / story crops. It is the proof file for keeping the final brand scenes tied
            to the Mufflermen palette and the video-board lighting language without reverting to
            multi-image boards or after-the-fact logo patches.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.siteButton} ${styles.siteButtonRed}`} href={productionBrandManifestPath} target="_blank" rel="noreferrer">
              Open production manifest
            </a>
          </div>
          <pre className={styles.codeBlock}>{productionBrandManifestPath}</pre>
        </article>

        <div className={styles.assetGrid}>
          {productionBrandAssets.map((asset) => (
            <article
              key={asset.path}
              className={styles.assetCard}
              style={{ "--card-tone": asset.tone } as CSSProperties}
            >
              <div className={styles.assetFrame}>
                <Image
                  src={asset.path}
                  alt={`${asset.title} for Oak Flats Muffler Men`}
                  fill
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                />
              </div>
              <div className={styles.assetMeta}>
                <span>{asset.category}</span>
                <span>{asset.ratio}</span>
                <span>Scene integrated</span>
              </div>
              <h2>{asset.title}</h2>
              <p>{asset.usage}</p>
              <div className={styles.assetMeta}>
                {asset.crops.map((crop) => (
                  <span key={crop.path}>{crop.dimensions}</span>
                ))}
              </div>
              <div className={styles.heroActions}>
                <a className={`${styles.siteButton} ${styles.siteButtonChrome} ${brandStyles.chromeButton}`} href={asset.path} target="_blank" rel="noreferrer">
                  Open asset
                </a>
              </div>
              <pre className={styles.codeBlock}>{`${asset.path}\nLogo: ${asset.sourceLogo}\nProof: ${asset.proof}`}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Live portfolio</span>
          <div>
            <h2>Approved vehicle and workshop imagery</h2>
            <p>
              Existing cinematic and generated stills that already fit the brand language. These are
              the baseline references the new Falcon, HSV, and Ranger imagery should match in tone,
              lighting, and premium workshop feel.
            </p>
          </div>
        </div>

        <div className={styles.assetGrid}>
          {portfolioAssets.map((asset) => (
            <article
              key={asset.path}
              className={styles.assetCard}
              style={{ "--card-tone": asset.tone } as CSSProperties}
            >
              <div className={styles.assetFrame} data-fit={asset.fit ?? "cover"}>
                <Image
                  src={asset.path}
                  alt={asset.title}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                />
              </div>
              <div className={styles.assetMeta}>
                <span>{asset.group}</span>
                <span>{asset.ratio}</span>
                <span>Approved</span>
              </div>
              <h2>{asset.title}</h2>
              <p>{asset.usage}</p>
              <pre className={styles.codeBlock}>{asset.path}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Vehicle sets</span>
          <div>
            <h2>Same-vehicle image packs for web and video</h2>
            <p>
              The live standard is now individual image assets only. Each approved vehicle pack
              carries five full-scene frames rebuilt into the same Oak Flats Muffler Men
              red-sunset workshop world with a dark carbon-red hoist bay. The current rule set is
              locked: only yellow, red, and black vehicles are accepted, and each pack has to
              visually line up with the red-sunset workshop system instead of drifting into cool off-brand
              or neutral workshop looks.
            </p>
          </div>
        </div>

        {vehicleSets.map((set) => {
          const packAssets = buildVehiclePackAssets(set)
          const packDescription = buildVehicleSetDescription(set.vehicle)

          return (
            <div key={set.vehicle} style={{ display: "grid", gap: "var(--primitive-space-5)", marginBottom: "var(--primitive-space-7)" }}>
              <article
                className={styles.guideCard}
                style={{ "--card-tone": set.tone } as CSSProperties}
              >
                <div className={styles.guideMeta}>
                  <span>{set.status}</span>
                  <span>{packAssets.length} assets live</span>
                  <span>{set.sceneLock}</span>
                </div>
                <h2>{set.vehicle}</h2>
                <p>{packDescription}</p>
                <div className={styles.assetMeta}>
                  <span>{lockedExteriorSceneLabel}</span>
                  <span>{lockedExteriorLocationLabel}</span>
                  <span>{lockedLightingWindowLabel}</span>
                </div>
                <div className={styles.assetMeta}>
                  <span>{lockedTechnicalSceneLabel}</span>
                  <span>Continuity pack</span>
                </div>
                <pre className={styles.codeBlock}>{`${set.manifest}\nExterior: ${lockedExteriorSceneLabel}\nLocation: ${lockedExteriorLocationLabel}\nLighting: ${lockedLightingWindowLabel}\nTechnical: ${lockedTechnicalSceneLabel}`}</pre>
              </article>

              <div className={styles.assetGrid}>
                {packAssets.map((frame) => (
                  <article
                    key={`${set.vehicle}-${frame.title}`}
                    className={styles.assetCard}
                    style={{ "--card-tone": set.tone } as CSSProperties}
                  >
                    <div className={styles.assetFrame} data-fit={frame.fit ?? "cover"}>
                      <Image
                        src={frame.path}
                        alt={frame.title}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                      />
                    </div>
                    <div className={styles.assetMeta}>
                      <span>{frame.role}</span>
                      <span>{frame.ratio}</span>
                      <span>{frame.scene}</span>
                    </div>
                    <h2>{frame.title}</h2>
                    <p>{frame.usage}</p>
                    <pre className={styles.codeBlock}>{frame.path}</pre>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Live standard</span>
          <div>
            <h2>Pack rules now driving the live asset board</h2>
            <p>
              The board is no longer being steered by loose one-off prompts. The live standard is
              now a locked delivery rule set: red-sunset workshop mood, yellow/red/black vehicle
              spread, individual image exports, and visual checks against malformed
              badges, broken exhaust geometry, or drift away from the red-sunset workshop system.
            </p>
          </div>
        </div>

        <div className={styles.guideGrid}>
          {continuityStandards.map((brief) => (
            <article
              key={brief.title}
              className={styles.guideCard}
              style={{ "--card-tone": brief.tone } as CSSProperties}
            >
              <div className={styles.guideMeta}>
                <span>{brief.meta}</span>
                <span>Live rule</span>
                <span>Approved standard</span>
              </div>
              <h2>{brief.title}</h2>
              <p>{brief.summary}</p>
              <pre className={styles.codeBlock}>{brief.details}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Identity matrix</span>
          <div>
            <h2>Logo and icon outputs laid out for use</h2>
            <p>
              Core lockups, app-icon surfaces, and the favicon / touch-icon routes that need to stay
              aligned. This keeps the brand mark consistent across the website, app shell,
              bookmarks, saved shortcuts, and printable materials.
            </p>
          </div>
        </div>

        <div className={styles.assetGrid}>
          {identityPlates.map((plate) => (
            <article
              key={`${plate.title}-${plate.deliverable}`}
              className={styles.assetCard}
              style={{ "--card-tone": plate.tone } as CSSProperties}
            >
              <div className={styles.assetFrame} data-fit={plate.fit ?? "contain"}>
                <Image
                  src={plate.previewPath}
                  alt={plate.title}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                />
              </div>
              <div className={styles.assetMeta}>
                <span>{plate.size}</span>
                <span>Identity</span>
              </div>
              <h2>{plate.title}</h2>
              <p>{plate.usage}</p>
              <pre className={styles.codeBlock}>{plate.deliverable}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Collateral</span>
          <div>
            <h2>Icon sizes laid out for handoff</h2>
            <p>
              Export ladder for the main badge mark so the favicon, bookmark, Apple touch, and PWA
              sizes are visible directly in the brand-assets route rather than hidden elsewhere in
              the system.
            </p>
          </div>
        </div>

        <div className={styles.assetGrid}>
          {iconExportSpecs.map((spec) => (
            <article
              key={spec.title}
              className={styles.assetCard}
              style={{ "--card-tone": spec.tone } as CSSProperties}
            >
              <div className={styles.assetFrame} data-fit="contain">
                {renderIconScalePreview(spec.px)}
              </div>
              <div className={styles.assetMeta}>
                <span>{spec.px}px</span>
                <span>Icon export</span>
              </div>
              <h2>{spec.title}</h2>
              <p>{spec.usage}</p>
              <pre className={styles.codeBlock}>{spec.deliverable}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Collateral</span>
          <div>
            <h2>Usable print, email, video, proof, and ops surfaces</h2>
            <p>
              Layout-ready brand pieces inside the primitive system: cards, signatures, document
              strips, sticker sheets, campaign tiles, booking cards, motion-ready masters, and
              customer-proof formats. These give the brand more than a logo pack and make the page
              usable as an operating board for day-to-day assets, motion delivery, event presence,
              intake operations, and follow-up proof content.
            </p>
          </div>
        </div>

        <div className={styles.assetGrid}>
          {collateralSurfaces.map((surface) => (
            <article
              key={surface.title}
              className={styles.assetCard}
              style={{ "--card-tone": surface.tone } as CSSProperties}
            >
              <div className={styles.assetFrame}>{renderCollateralPreview(surface.preview)}</div>
              <div className={styles.assetMeta}>
                <span>{surface.spec}</span>
                <span>Layout visible</span>
              </div>
              <h2>{surface.title}</h2>
              <p>{surface.usage}</p>
              <div className={styles.heroActions}>
                <a className={`${styles.siteButton} ${styles.siteButtonChrome} ${brandStyles.chromeButton}`} href={surface.primaryHref} target="_blank" rel="noreferrer">
                  Open asset
                </a>
              </div>
              <pre className={styles.codeBlock}>{surface.exportTarget}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Ready kits</span>
          <div>
            <h2>Fast-start layout templates</h2>
            <p>
              These are structured SVG and HTML starter layouts for fast rollout work. They are
              useful template shells for follow-up pieces, review asks, vehicle signage, and
              landing covers, but they are not the finished branded-photo examples shown above.
            </p>
          </div>
        </div>

        <div className={styles.guideGrid}>
          {featuredReadyKits.map((asset) => (
            <article
              key={asset.id}
              className={styles.guideCard}
              style={{ "--card-tone": "var(--primitive-amber)" } as CSSProperties}
            >
              {renderBacklogAssetPreview(asset)}
              <div className={styles.guideMeta}>
                <span>{asset.contentType}</span>
                <span>{asset.format}</span>
                <span>{asset.status}</span>
              </div>
              <h2>{asset.title}</h2>
              <p>{asset.usage}</p>
              <p>{asset.proof}</p>
              <div className={styles.heroActions}>
                <a className={`${styles.siteButton} ${styles.siteButtonChrome} ${brandStyles.chromeButton}`} href={asset.outputPath} target="_blank" rel="noreferrer">
                  Open asset
                </a>
              </div>
              <pre className={styles.codeBlock}>{asset.outputPath}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Build next</span>
          <div>
            <h2>Build next brand-media asset classes</h2>
            <p>
              The board now has enough live continuity cars and ready kits to support a second wave
              of brand media. These are the next practical asset classes worth turning into real
              deliverables inside the system.
            </p>
          </div>
        </div>

        <div className={styles.guideGrid}>
          {expansionIdeas.map((idea) => (
            <article
              key={idea.title}
              className={styles.guideCard}
              style={{ "--card-tone": idea.tone } as CSSProperties}
            >
              <div className={styles.guideMeta}>
                <span>{idea.category}</span>
                <span>{idea.deliverable}</span>
                <span>Build next</span>
              </div>
              <h2>{idea.title}</h2>
              <p>{idea.usage}</p>
              <pre className={styles.codeBlock}>{idea.reason}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Future sales layouts</span>
          <div>
            <h2>Sales-layout starters</h2>
            <p>
              This lane tracks SVG and HTML layout starters for future quote sheets, service
              explainers, parts handovers, and customer follow-up assets. They stay behind the
              finished red-sunset workshop imagery used on the public site.
            </p>
          </div>
        </div>

        <article
          className={styles.guideCard}
          style={{ "--card-tone": "var(--primitive-red)", marginBottom: "22px" } as CSSProperties}
        >
          <div className={styles.guideMeta}>
            <span>{backlogAssets.length} layout starters</span>
            <span>Layout starter layer</span>
            <span>SVG + HTML</span>
          </div>
          <h2>Backlog manifest</h2>
          <p>
            The manifest records each layout lane, content type, source logo, and deliverable path
            so future print and follow-up assets can be finished without mixing them into the live
            public-site image set.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.siteButton} ${styles.siteButtonRed}`} href={backlogManifestPath} target="_blank" rel="noreferrer">
              Open manifest
            </a>
          </div>
          <pre className={styles.codeBlock}>{backlogManifestPath}</pre>
        </article>

        {backlogLanes.map((lane) => (
          <div
            key={lane.title}
            className={styles.backlogLaneGroup}
            style={{ "--catalog-tone": lane.tone } as CSSProperties}
          >
            <div className={styles.backlogLaneHeader}>
              <div>
                <span className={styles.catalogLabel}>Sales layout lane</span>
                <h3>{lane.title}</h3>
                <p>{lane.body}</p>
              </div>
              <span className={styles.catalogCount}>{lane.items.length} starters</span>
            </div>

            <div className={styles.catalogGrid}>
              {lane.items.map((asset) => (
                <article
                  key={asset.id}
                  className={styles.catalogCard}
                  style={{ "--catalog-tone": lane.tone } as CSSProperties}
                >
                  <div className={styles.catalogHeader}>
                    <span className={styles.catalogLabel}>{asset.contentType}</span>
                    <span className={styles.catalogCount}>{asset.format}</span>
                  </div>
                  {renderBacklogAssetPreview(asset)}
                  <h3>{asset.title}</h3>
                  <p>{asset.usage}</p>
                  <div className={styles.assetMeta}>
                    <span>{asset.status}</span>
                    <span>Layout starter</span>
                    <span>{asset.viewportCoverage.length} viewports</span>
                  </div>
                  <div className={styles.heroActions}>
                    <a className={`${styles.siteButton} ${styles.siteButtonChrome} ${brandStyles.chromeButton}`} href={asset.outputPath} target="_blank" rel="noreferrer">
                      Open asset
                    </a>
                  </div>
                  <pre className={styles.codeBlock}>{`${asset.outputPath}\nLogo: ${asset.sourceLogo}\nProof: ${asset.proof}`}</pre>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
