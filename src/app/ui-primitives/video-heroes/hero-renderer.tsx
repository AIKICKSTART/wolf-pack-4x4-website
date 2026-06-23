import type { ReactElement } from "react"

import {
  AmbientGridHero,
  CardDeckHero,
  CinematicLoopHero,
  CircularRevealHero,
  CurtainWipeHero,
  DiagonalSplitHero,
  DualExposureHero,
  FilmstripHero,
  FullBleedMarqueeHero,
  GridFlipTilesHero,
  HexagonMosaicHero,
  JigsawPuzzleHero,
  KenBurnsHero,
  LiquidBlobHero,
  MaskedPipeHero,
  NeonOutlineHero,
  OverlayNarrativeHero,
  ParallaxScrollHero,
  PerspectiveTiltHero,
  PulseReactHero,
  PuzzlePieceHero,
  RadialSegmentsHero,
  ScrollyClipHero,
  ShatterGlassHero,
  SideBySideHero,
  SpotlightMaskHero,
  TriptychHero,
  VenetianBlindsHero,
  WaveDistortHero,
  ZoomBurstHero,
} from "../components/video-heroes"
import { seedanceById, type SeedanceVideoAsset } from "../seedance-video-pack"

import type { HeroPresentationOption } from "./hero-options"

export type HeroComponentId =
  | "cinematic-loop"
  | "parallax-scroll"
  | "ambient-grid"
  | "side-by-side"
  | "full-bleed-marquee"
  | "masked-pipe"
  | "overlay-narrative"
  | "pulse-react"
  | "ken-burns"
  | "scrolly-clip"
  | "jigsaw-puzzle"
  | "puzzle-piece"
  | "hexagon-mosaic"
  | "diagonal-split"
  | "circular-reveal"
  | "filmstrip"
  | "triptych"
  | "venetian-blinds"
  | "spotlight-mask"
  | "shatter-glass"
  | "liquid-blob"
  | "zoom-burst"
  | "grid-flip-tiles"
  | "perspective-tilt"
  | "dual-exposure"
  | "neon-outline"
  | "curtain-wipe"
  | "radial-segments"
  | "wave-distort"
  | "card-deck"

const HERO_COMPONENT_LABEL: Record<HeroComponentId, string> = {
  "cinematic-loop": "Cinematic Loop",
  "parallax-scroll": "Parallax Scroll",
  "ambient-grid": "Ambient Grid",
  "side-by-side": "Side by Side",
  "full-bleed-marquee": "Full-bleed Marquee",
  "masked-pipe": "Masked Pipe",
  "overlay-narrative": "Overlay Narrative",
  "pulse-react": "Pulse React",
  "ken-burns": "Ken Burns",
  "scrolly-clip": "Scrolly Clip",
  "jigsaw-puzzle": "Jigsaw Puzzle",
  "puzzle-piece": "Puzzle Piece",
  "hexagon-mosaic": "Hexagon Mosaic",
  "diagonal-split": "Diagonal Split",
  "circular-reveal": "Circular Reveal",
  filmstrip: "Filmstrip",
  triptych: "Triptych",
  "venetian-blinds": "Venetian Blinds",
  "spotlight-mask": "Spotlight Mask",
  "shatter-glass": "Shatter Glass",
  "liquid-blob": "Liquid Blob",
  "zoom-burst": "Zoom Burst",
  "grid-flip-tiles": "Grid Flip Tiles",
  "perspective-tilt": "Perspective Tilt",
  "dual-exposure": "Dual Exposure",
  "neon-outline": "Neon Outline",
  "curtain-wipe": "Curtain Wipe",
  "radial-segments": "Radial Segments",
  "wave-distort": "Wave Distort",
  "card-deck": "Card Deck",
}

const SHAPE_COMPONENT_IDS = new Set<HeroComponentId>([
  "jigsaw-puzzle",
  "puzzle-piece",
  "hexagon-mosaic",
  "diagonal-split",
  "circular-reveal",
  "filmstrip",
  "triptych",
  "venetian-blinds",
  "spotlight-mask",
  "shatter-glass",
  "liquid-blob",
  "zoom-burst",
  "grid-flip-tiles",
  "perspective-tilt",
  "dual-exposure",
  "neon-outline",
  "curtain-wipe",
  "radial-segments",
  "wave-distort",
  "card-deck",
])

/**
 * Map a presentation option to the best-fit hero component. The option's
 * `frame` carries the dominant layout intent; `group` refines the choice
 * where one frame maps to several components.
 */
export function heroComponentForOption(option: HeroPresentationOption): HeroComponentId {
  const { frame, group, motion } = option

  // Explicit component override (creative shape heroes).
  if (option.component && SHAPE_COMPONENT_IDS.has(option.component as HeroComponentId)) {
    return option.component as HeroComponentId
  }

  if (frame === "dashboard") return "pulse-react"
  if (frame === "stack") return "ambient-grid"
  if (frame === "split") return "side-by-side"

  if (frame === "social") {
    // Accessible + reduced-motion social cards fall back to the poster-pan
    // Ken Burns treatment; everything else uses the vertical scroll widen.
    if (group === "Accessible" || /no audio|reduced/i.test(motion)) return "ken-burns"
    return "scrolly-clip"
  }

  // frame === "wide"
  if (group === "Product") return "masked-pipe"
  if (group === "Promo") return "parallax-scroll"
  if (group === "Gallery") return "overlay-narrative"
  if (group === "Landing" && /ticker|marquee/i.test(option.overlay + option.motion)) {
    return "full-bleed-marquee"
  }
  return "cinematic-loop"
}

export function heroComponentLabel(id: HeroComponentId): string {
  return HERO_COMPONENT_LABEL[id]
}

const KEN_BURNS_TINTS = ["ember", "dusk", "abyss"] as const

function portraitLayerAssets(asset: SeedanceVideoAsset): SeedanceVideoAsset[] {
  // Prefer three distinct portrait plates so the cross-fade reads clearly,
  // anchored on the option's own asset first.
  const portraitPool: SeedanceVideoAsset[] = [
    asset,
    seedanceById("performance-road-portrait"),
    seedanceById("exhaust-product-portrait"),
    seedanceById("social-outro-portrait"),
    seedanceById("workshop-hero-portrait"),
  ]
  const unique = portraitPool.filter(
    (item, index, list) => list.findIndex((other) => other.id === item.id) === index,
  )
  return unique.slice(0, 3)
}

function ambientTileAssets(asset: SeedanceVideoAsset): SeedanceVideoAsset[] {
  const pool: SeedanceVideoAsset[] = [
    asset,
    seedanceById("workshop-hero-portrait"),
    seedanceById("performance-road-portrait"),
    seedanceById("service-dyno-portrait"),
    seedanceById("social-outro-portrait"),
  ]
  const unique = pool.filter(
    (item, index, list) => list.findIndex((other) => other.id === item.id) === index,
  )
  return unique.slice(0, 4)
}

interface RenderArgs {
  option: HeroPresentationOption
  component: HeroComponentId
}

/**
 * Render the chosen full hero for an option, feeding it the option's asset,
 * headline, subhead, and CTA. Returns a full-bleed hero with no extra chrome.
 */
export function renderHeroForOption({ option, component }: RenderArgs): ReactElement {
  const { asset, headline, subhead, cta } = option
  const { videoSrc, posterSrc } = asset
  const action = { label: cta, href: "/" }
  const reelTag = `Seedance 2.0 · ${asset.section} · ${asset.durationSec}s`

  switch (component) {
    case "parallax-scroll":
      return (
        <ParallaxScrollHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          reelTag={reelTag}
        />
      )

    case "ambient-grid":
      return (
        <AmbientGridHero
          headline={headline}
          subhead={subhead}
          cta={action}
          badge={`Mufflermen · ${asset.section}`}
          tiles={ambientTileAssets(asset).map((tile) => ({
            id: tile.id,
            caption: `${tile.section} · ${tile.aspectRatio}`,
            videoSrc: tile.videoSrc,
            posterSrc: tile.posterSrc,
          }))}
        />
      )

    case "side-by-side":
      return (
        <SideBySideHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          primaryCta={{ label: cta, href: "/", emphasis: "primary" }}
          secondaryCta={{ label: "Spec sheet", href: "/" }}
          serial={`${asset.section} · ${asset.aspectRatio}`}
        />
      )

    case "full-bleed-marquee":
      return (
        <FullBleedMarqueeHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          marqueePhrases={["CARBON FIBRE", "RED SHOP LIGHT", "OAK FLATS", "STAINLESS TONE", asset.section.toUpperCase()]}
        />
      )

    case "masked-pipe":
      return (
        <MaskedPipeHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          meta={`${asset.section} · ${asset.aspectRatio} · Seedance 2.0`}
        />
      )

    case "overlay-narrative":
      return (
        <OverlayNarrativeHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          cta={action}
          beats={[
            { id: "beat-1", text: `→ ${option.overlay}.`, position: { top: "18%", left: "7%" }, tone: "amber", delay: 0.4 },
            { id: "beat-2", text: option.motion, position: { top: "46%", right: "7%" }, tone: "red", delay: 1.2 },
            { id: "beat-3", text: `${option.useCase} · portrait-safe.`, position: { bottom: "22%", left: "12%" }, tone: "teal", delay: 2 },
          ]}
        />
      )

    case "pulse-react":
      return (
        <PulseReactHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          tone={asset.tone === "green" ? "green" : asset.tone === "amber" ? "amber" : "red"}
          gauge={[
            { label: "VIDEO", value: `${asset.durationSec}s` },
            { label: "MODE", value: asset.aspectRatio },
            { label: "FRAME", value: option.frame.toUpperCase() },
          ]}
        />
      )

    case "ken-burns":
      return (
        <KenBurnsHero
          videoSrc={asset.formFactor === "portrait" ? videoSrc : undefined}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          layers={portraitLayerAssets(asset).map((layer, index) => ({
            id: layer.id,
            posterSrc: layer.posterSrc,
            tint: KEN_BURNS_TINTS[index % KEN_BURNS_TINTS.length],
            caption: `${layer.section} · ${layer.aspectRatio}`,
          }))}
          chapterLabel={`Seedance 2.0 · ${asset.section}`}
        />
      )

    case "scrolly-clip":
      return (
        <ScrollyClipHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
        />
      )

    case "jigsaw-puzzle":
      return (
        <JigsawPuzzleHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "puzzle-piece":
      return (
        <PuzzlePieceHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "hexagon-mosaic":
      return (
        <HexagonMosaicHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "diagonal-split":
      return (
        <DiagonalSplitHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "circular-reveal":
      return (
        <CircularRevealHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "filmstrip":
      return (
        <FilmstripHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "triptych":
      return (
        <TriptychHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "venetian-blinds":
      return (
        <VenetianBlindsHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "spotlight-mask":
      return (
        <SpotlightMaskHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "shatter-glass":
      return (
        <ShatterGlassHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "liquid-blob":
      return (
        <LiquidBlobHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "zoom-burst":
      return (
        <ZoomBurstHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "grid-flip-tiles":
      return (
        <GridFlipTilesHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "perspective-tilt":
      return (
        <PerspectiveTiltHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "dual-exposure":
      return (
        <DualExposureHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "neon-outline":
      return (
        <NeonOutlineHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "curtain-wipe":
      return (
        <CurtainWipeHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "radial-segments":
      return (
        <RadialSegmentsHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "wave-distort":
      return (
        <WaveDistortHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "card-deck":
      return (
        <CardDeckHero videoSrc={videoSrc} posterSrc={posterSrc} headline={headline} subhead={subhead} cta={action} timestampLabel={reelTag} />
      )

    case "cinematic-loop":
    default:
      return (
        <CinematicLoopHero
          videoSrc={videoSrc}
          posterSrc={posterSrc}
          headline={headline}
          subhead={subhead}
          cta={action}
          timestampLabel={reelTag}
        />
      )
  }
}
