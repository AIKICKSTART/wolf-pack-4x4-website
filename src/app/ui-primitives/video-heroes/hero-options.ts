import { seedanceById, type SeedanceVideoAsset } from "../seedance-video-pack"

export type HeroFrame = "wide" | "split" | "stack" | "social" | "dashboard"

export interface HeroPresentationOption {
  id: string
  name: string
  group: string
  frame: HeroFrame
  overlay: string
  motion: string
  useCase: string
  headline: string
  subhead: string
  cta: string
  asset: SeedanceVideoAsset
  /**
   * Explicit hero-component id (matches a HeroComponentId in hero-renderer).
   * When set it overrides the frame/group heuristic — used by the creative
   * "shape" heroes (jigsaw, hexagon, etc.) that must render a specific layout.
   */
  component?: string
}

/**
 * The ten generated Seedance clips, cycled across the forty presentation
 * options. Kept in source order so option indices map to a stable asset.
 */
const HERO_MEDIA = [
  seedanceById("workshop-hero-landscape"),
  seedanceById("performance-road-landscape"),
  seedanceById("workshop-hero-portrait"),
  seedanceById("service-dyno-landscape"),
  seedanceById("social-outro-landscape"),
  seedanceById("exhaust-product-landscape"),
  seedanceById("exhaust-product-portrait"),
  seedanceById("service-dyno-portrait"),
  seedanceById("performance-road-portrait"),
  seedanceById("social-outro-portrait"),
] as const

type HeroBlueprint = readonly [
  name: string,
  group: string,
  frame: HeroFrame,
  overlay: string,
  motion: string,
  useCase: string,
]

const HERO_PRESENTATION_BLUEPRINTS: readonly HeroBlueprint[] = [
  ["Anamorphic service opener", "Landing", "wide", "Left copy rail", "Slow red-light fade", "Homepage hero"],
  ["Carbon workshop billboard", "Landing", "wide", "Logo top-right", "Floor reflection sweep", "Brand entry"],
  ["Split build sheet", "Landing", "split", "Spec stack right", "Video parallax left", "Service detail"],
  ["Ticker marquee hero", "Landing", "wide", "Bottom red ticker", "Looping phrase rail", "Campaign banner"],
  ["Masked exhaust reveal", "Product", "wide", "Pipe-shaped window", "Clip-path widen", "Parts category"],
  ["Macro product intro", "Product", "split", "Large price-safe rail", "Slider card entry", "Product landing"],
  ["Parts carousel lead", "Product", "stack", "Three feature pills", "Card stack lift", "Catalogue page"],
  ["Configurator preview", "Product", "dashboard", "Control strip overlay", "Soft gauge pulse", "Build flow"],
  ["Vertical story opener", "Social", "social", "Top logo lockup", "Story-safe crane", "Instagram story"],
  ["Reels CTA closer", "Social", "social", "Bottom CTA band", "Final-frame hold", "Paid social"],
  ["Silent caption card", "Social", "social", "Caption-safe lower third", "Subtle caption reveal", "Muted social"],
  ["Before-after wipe", "Social", "split", "Center divider", "Horizontal wipe", "Transformation ad"],
  ["Dyno pulse hero", "Service", "dashboard", "Live readout chips", "RPM pulse rings", "Diagnostic page"],
  ["Booking funnel hero", "Service", "split", "Booking card right", "Hoist light sweep", "Booking flow"],
  ["Underbody scan", "Service", "wide", "Scanline band", "Red diagnostic pass", "Inspection page"],
  ["Workshop status header", "Service", "dashboard", "Status chips", "Sequential chip glow", "Dashboard"],
  ["Premium full bleed", "Brand", "wide", "Minimal logo plate", "Slow contrast bloom", "About page"],
  ["Founder story frame", "Brand", "split", "Editorial title card", "Poster drift", "Story page"],
  ["Local trust hero", "Brand", "stack", "Review quote rail", "Soft card rise", "Trust section"],
  ["CTA outro hold", "Brand", "wide", "Centered red CTA", "Orbit into hold", "Page closer"],
  ["Mobile landing lockup", "Mobile", "social", "Sticky header gap", "Vertical lock frame", "Mobile hero"],
  ["Mobile product blade", "Mobile", "social", "Bottom product drawer", "Drawer slide", "Mobile parts"],
  ["Mobile booking card", "Mobile", "social", "Floating appointment card", "Card settle", "Mobile booking"],
  ["Mobile service scan", "Mobile", "social", "Safe control gutter", "Vertical scan drift", "Mobile service"],
  ["Event promo hero", "Promo", "wide", "Date badge", "Red light sweep", "Event page"],
  ["Performance strip", "Promo", "wide", "Thin stat row", "Road-roll crop", "Promo strip"],
  ["Offer countdown", "Promo", "dashboard", "Timer capsule", "Pulse countdown", "Offer hero"],
  ["Workshop reel stack", "Promo", "stack", "Three reel cards", "Staggered card rise", "Campaign page"],
  ["Gallery lead frame", "Gallery", "wide", "Thumbnail rail", "Rail drift", "Gallery opener"],
  ["Case study split", "Gallery", "split", "Problem-result cards", "Crossfade cards", "Case study"],
  ["Feature comparison", "Gallery", "dashboard", "Two-column stats", "Gauge tick", "Comparison page"],
  ["Media wall hero", "Gallery", "stack", "Poster mosaic", "Mosaic lift", "Portfolio wall"],
  ["Quiet reduced-motion hero", "Accessible", "wide", "Poster-first layout", "Video fades late", "Reduced motion"],
  ["Caption-led hero", "Accessible", "split", "Large caption rail", "Caption reveal", "Accessible media"],
  ["Keyboard-safe player", "Accessible", "dashboard", "Visible focus chrome", "Control pulse", "Video component"],
  ["Muted autoplay card", "Accessible", "stack", "Muted badge", "No audio motion", "Media card"],
  ["Dealer embed hero", "Utility", "wide", "Embed-safe logo", "Letterbox settle", "Partner page"],
  ["Quote request hero", "Utility", "split", "Form-safe panel", "Panel slide", "Lead form"],
  ["Dashboard preview loop", "Utility", "dashboard", "Telemetry row", "Status scan", "Ops dashboard"],
  ["Social proof outro", "Utility", "social", "Review badge", "Final CTA hold", "Social closer"],
] as const

function toKebabId(index: number, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return `${String(index + 1).padStart(2, "0")}-${slug}`
}

function ctaForGroup(group: string): string {
  if (group === "Social") return "Export preview"
  if (group === "Product") return "Use for parts"
  if (group === "Service") return "Book service"
  return "Open hero"
}

export const heroOptions: HeroPresentationOption[] = HERO_PRESENTATION_BLUEPRINTS.map(
  ([name, group, frame, overlay, motion, useCase], index) => {
    const asset = HERO_MEDIA[index % HERO_MEDIA.length]
    return {
      id: toKebabId(index, name),
      name,
      group,
      frame,
      overlay,
      motion,
      useCase,
      headline: name,
      subhead: `${useCase} using ${asset.title.toLowerCase()} with dark carbon, red light, and logo-led composition.`,
      cta: ctaForGroup(group),
      asset,
    }
  },
)

/**
 * Creative shape-driven heroes (batch 1). Each renders a specific component via
 * the explicit `component` override and is appended as a presentation option so
 * it gets a gallery card + a per-viewport preview page like every other hero.
 */
type ShapeBlueprint = readonly [name: string, component: string, overlay: string, motion: string, useCase: string]

const SHAPE_HERO_BLUEPRINTS: readonly ShapeBlueprint[] = [
  ["Jigsaw puzzle hero", "jigsaw-puzzle", "Interlocking piece grid", "Pieces assemble in", "Playful landing"],
  ["Puzzle piece hero", "puzzle-piece", "Single piece mask", "Ghost piece drift", "Feature spotlight"],
  ["Hexagon mosaic hero", "hexagon-mosaic", "Honeycomb tiles", "Ripple reveal", "Tech showcase"],
  ["Diagonal split hero", "diagonal-split", "Angled seam", "Edge-light sweep", "Versus / before-after"],
  ["Circular reveal hero", "circular-reveal", "Iris ring", "Circle expand", "Launch reveal"],
  ["Filmstrip hero", "filmstrip", "35mm sprockets", "Strip scroll", "Reel / gallery"],
  ["Triptych hero", "triptych", "Three panels", "Offset parallax", "Editorial landing"],
  ["Venetian blinds hero", "venetian-blinds", "Louvre slats", "Slats open", "Reveal transition"],
  ["Spotlight mask hero", "spotlight-mask", "Drifting spotlight", "Light follows motion", "Moody feature"],
  ["Shatter glass hero", "shatter-glass", "Glass shards", "Shards settle", "Impact / promo"],
  ["Liquid blob hero", "liquid-blob", "Organic blob mask", "Blob morph", "Fluid landing"],
  ["Zoom burst hero", "zoom-burst", "Radial speed lines", "Zoom burst pulse", "High-energy promo"],
  ["Grid flip tiles hero", "grid-flip-tiles", "Flipping tile grid", "3D flip wave", "Reveal landing"],
  ["Perspective tilt hero", "perspective-tilt", "Raked 3D plane", "Floating screen tilt", "Product showcase"],
  ["Dual exposure hero", "dual-exposure", "Type silhouette blend", "Double-exposure screen", "Cinematic brand"],
  ["Neon outline hero", "neon-outline", "Traced neon stroke", "Outline draw-on", "Night promo"],
  ["Curtain wipe hero", "curtain-wipe", "Split curtain panels", "Curtain opens", "Reveal opener"],
  ["Radial segments hero", "radial-segments", "Pie wedge fan", "Segments fan in", "Radial reveal"],
  ["Wave distort hero", "wave-distort", "Wavy edge clip", "Wave crawl", "Flow landing"],
  ["Card deck hero", "card-deck", "Fanned card stack", "Deck fans out", "Gallery / reel"],
] as const

const shapeHeroOptions: HeroPresentationOption[] = SHAPE_HERO_BLUEPRINTS.map(
  ([name, component, overlay, motion, useCase], index) => {
    const asset = HERO_MEDIA[index % HERO_MEDIA.length]
    return {
      id: toKebabId(HERO_PRESENTATION_BLUEPRINTS.length + index, name),
      name,
      group: "Shapes",
      frame: "wide" as HeroFrame,
      overlay,
      motion,
      useCase,
      headline: name.replace(/ hero$/i, ""),
      subhead: `${useCase} using ${asset.title.toLowerCase()} clipped through a ${overlay.toLowerCase()} treatment, dark carbon and red light.`,
      cta: "Open hero",
      asset,
      component,
    }
  },
)

heroOptions.push(...shapeHeroOptions)

const heroOptionById = new Map<string, HeroPresentationOption>(
  heroOptions.map((option) => [option.id, option]),
)

export function getHeroOption(id: string): HeroPresentationOption | undefined {
  return heroOptionById.get(id)
}
