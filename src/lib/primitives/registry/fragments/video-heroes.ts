import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "video-heroes",
  "title": "Video heroes",
  "group": "Media",
  "summary": "Eleven brand-led video-hero surfaces for the Mufflermen umbrella, with light-mode registry copy and dark media treatments kept intentional: ten autoplay-loop hero compositions plus a scaled preview-card wrapper.",
  "entries": [
    {
      "key": "video-heroes/cinematic-loop-hero",
      "family": "video-heroes",
      "name": "CinematicLoopHero",
      "label": "Cinematic loop hero",
      "description": "Full-bleed autoplay/loop video hero with letterbox bars, grain, vignette, corner frame and a typewriter-animated subhead (reduced-motion aware).",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#cinematic-loop",
      "tags": [
        "video",
        "hero",
        "cinematic",
        "loop"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/parallax-scroll-hero",
      "family": "video-heroes",
      "name": "ParallaxScrollHero",
      "label": "Parallax scroll hero",
      "description": "Two-column hero whose video pane shifts and scales on scroll via framer-motion useScroll, with a copy block, scanlines and a parallax numeral stripe.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#parallax-scroll",
      "tags": [
        "video",
        "hero",
        "parallax",
        "scroll"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/ambient-grid-hero",
      "family": "video-heroes",
      "name": "AmbientGridHero",
      "label": "Ambient grid hero",
      "description": "Quadrant grid of looping ambient video tiles behind a centered GlassSurface card with headline, CTA and a signal indicator.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#ambient-grid",
      "tags": [
        "video",
        "hero",
        "grid",
        "glass"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/side-by-side-hero",
      "family": "video-heroes",
      "name": "SideBySideHero",
      "label": "Side by side hero",
      "description": "Split hero pairing a video column (overlay, label, corners) with a NeuoSurface copy column carrying a spec definition list and primary/secondary CTAs.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#side-by-side",
      "tags": [
        "video",
        "hero",
        "split",
        "specs"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/full-bleed-marquee-hero",
      "family": "video-heroes",
      "name": "FullBleedMarqueeHero",
      "label": "Full-bleed marquee hero",
      "description": "Full-bleed video hero with glow, contrast and dashed-ring overlays plus a looping Marquee strip of star-separated tagline phrases along the bottom.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#full-bleed-marquee",
      "tags": [
        "video",
        "hero",
        "marquee",
        "ticker"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/masked-pipe-hero",
      "family": "video-heroes",
      "name": "MaskedPipeHero",
      "label": "Masked pipe hero",
      "description": "Hero that clips the looping video through an SVG exhaust-pipe silhouette with a dashed amber stroke outline and a spec/copy header column.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#masked-pipe",
      "tags": [
        "video",
        "hero",
        "svg-mask",
        "clip-path"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/overlay-narrative-hero",
      "family": "video-heroes",
      "name": "OverlayNarrativeHero",
      "label": "Overlay narrative hero",
      "description": "Full-bleed video hero with positioned, tone-colored narrative beat captions that stagger in via framer-motion (reduced-motion aware) above an animated headline and CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#overlay-narrative",
      "tags": [
        "video",
        "hero",
        "narrative",
        "motion"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/pulse-react-hero",
      "family": "video-heroes",
      "name": "PulseReactHero",
      "label": "Pulse react hero",
      "description": "Tone-themed video hero with animated pulse rings at a configurable origin and a live bench-dyno gauge aside listing labeled readings.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#pulse-react",
      "tags": [
        "video",
        "hero",
        "pulse",
        "gauge"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/ken-burns-hero",
      "family": "video-heroes",
      "name": "KenBurnsHero",
      "label": "Ken burns hero",
      "description": "Hero that cross-fades through tinted poster plates with a slow ken-burns pan (optional underlying video), plus a chapter kicker, copy and numbered markers.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#ken-burns",
      "tags": [
        "video",
        "hero",
        "ken-burns",
        "poster"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/scrolly-clip-hero",
      "family": "video-heroes",
      "name": "ScrollyClipHero",
      "label": "Scrolly clip hero",
      "description": "Scroll-driven hero that widens the video via an animated inset clip-path (framer-motion useScroll) while the headline slides in, with a top ticker and CTA.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes#scrolly-clip",
      "tags": [
        "video",
        "hero",
        "scroll",
        "clip-path"
      ],
      "status": "captured"
    },
    {
      "key": "video-heroes/video-hero-card",
      "family": "video-heroes",
      "name": "VideoHeroCard",
      "label": "Video hero card",
      "description": "Tone-themed wrapper card framing a scaled hero preview with a tone chip, readable title, expand control and optional notes footer for the comparison sheet.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-heroes",
      "routeHref": "/ui-primitives/video-heroes",
      "tags": [
        "video",
        "preview",
        "card",
        "showcase"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
