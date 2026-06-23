import type { Metadata } from "next"
import Image from "next/image"
import {
  Captions,
  CheckCircle2,
  ChevronDown,
  Cog,
  Eye,
  Maximize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"

import { ButtonDnaLink } from "../components/button-dna-link"
import { SEEDANCE_VIDEO_PACK, seedanceById, type SeedanceVideoAsset } from "../seedance-video-pack"
import styles from "./videos.module.css"

export const metadata: Metadata = {
  title: "Video media primitives | UI Primitives",
  description:
    "Hero player, ambient loop grid, neumorphic control bar, and accessibility primitives for video used across the Mufflermen umbrella.",
}

// ── Types ──────────────────────────────────────────────────────────────────
type AmbientTone = "ember" | "dusk" | "abyss" | "grove"

interface AmbientLoop {
  id: string
  title: string
  tag: string
  tone: AmbientTone
  asset: SeedanceVideoAsset
}

interface A11yItem {
  title: string
  body: string
}

interface SocialDemo {
  id: string
  title: string
  platform: string
  treatment: string
  overlay: string
  asset: SeedanceVideoAsset
}

// ── Data ───────────────────────────────────────────────────────────────────
const ambientLoops: AmbientLoop[] = [
  { id: "ember", title: "Workshop hero", tag: "Landing · 16:9 · 15s", tone: "ember", asset: seedanceById("workshop-hero-landscape") },
  { id: "dusk", title: "Performance reel", tag: "Promo · 9:16 · 15s", tone: "dusk", asset: seedanceById("performance-road-portrait") },
  { id: "abyss", title: "Service scan", tag: "Booking · 16:9 · 15s", tone: "abyss", asset: seedanceById("service-dyno-landscape") },
  { id: "grove", title: "Product sweep", tag: "Parts · 9:16 · 15s", tone: "grove", asset: seedanceById("exhaust-product-portrait") },
]

const heroAsset = seedanceById("workshop-hero-landscape")

const socialDemoTreatments = [
  ["Story opener", "9:16 story", "Logo-first vertical intro", "Top lockup · silent"],
  ["Reels CTA", "9:16 reels", "Bottom booking band", "CTA hold · muted"],
  ["Landscape teaser", "16:9 feed", "Wide workshop cinema crop", "Left copy · silent"],
  ["Product close-up", "9:16 story", "Macro parts detail", "Price-safe rail"],
  ["Road promo", "16:9 feed", "Performance strip crop", "Stats overlay"],
  ["Service scan", "16:9 feed", "Diagnostic booking preview", "Status chips"],
  ["Carousel lead", "1:1 crop", "Square product/social card", "Logo plate"],
  ["Outro closer", "9:16 story", "Final CTA story frame", "Review badge"],
  ["Offer banner", "16:9 ad", "Muted paid media placement", "Timer pill"],
  ["Dashboard tile", "4:5 feed", "Operational status preview", "Telemetry row"],
] as const

const socialDemos: SocialDemo[] = SEEDANCE_VIDEO_PACK.map((asset, index) => {
  const [title, platform, treatment, overlay] = socialDemoTreatments[index]
  return {
    id: `${asset.id}-social-demo`,
    title,
    platform,
    treatment,
    overlay,
    asset,
  }
})

const a11yItems: A11yItem[] = [
  {
    title: "Reduced-motion swap",
    body: "If the visitor opts into prefers-reduced-motion: reduce, the player swaps from autoplay to its still poster. No loops, no animation overlays, no scanline drift.",
  },
  {
    title: "Caption track ready",
    body: "Hero loop primitive accepts a <track kind=\"captions\" srclang=\"en\"> child. Captions render in the bottom 18% safe area with a 4.5:1 contrast floor.",
  },
  {
    title: "Audio defaults to muted",
    body: "Autoplaying loops ship muted with an explicit mute control. Audio-on requires deliberate user input — no surprise sound.",
  },
  {
    title: "Keyboard reachable",
    body: "Every chrome control (play, pause, mute, scrubber, quality, settings) is a focusable button with visible focus ring and ARIA labels.",
  },
]

// ── Page ────────────────────────────────────────────────────────────────────
export default function VideosPrimitivesPage() {
  return (
    <main className={styles.page} aria-labelledby="videos-title">
      {/* Header */}
      <header className={styles.header} data-ui-primitive-route-header="true">
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>04 / Media · Video primitives</span>
          <h1 className={styles.headline} id="videos-title">
            Dark car-brand videos, hero loops, accessible chrome
          </h1>
          <p className={styles.subhead}>
            Seedance 2.0 outputs are mapped to unique landing, service, product, social, and mobile
            jobs. Each clip is dark-mode native, carbon-fibre influenced, red-accented, and paired
            with the real local Mufflermen logo as a crisp UI overlay.
          </p>
        </div>
        <span className={styles.headerMeta}>
          <strong>{SEEDANCE_VIDEO_PACK.length}</strong> videos · <strong>15s</strong> each
        </span>
        <ButtonDnaLink />
      </header>

      {/* Hero player — Material-3 elevated */}
      <section className={styles.heroPlayer} aria-label="Hero video player primitive">
        <div className={styles.heroStage}>
          {/*
            Seedance hero primitive — graceful: if generated media is pending,
            the poster and logo overlay keep the layout stable.
            Reduced-motion: CSS hides the <video> element entirely.
          */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroAsset.posterSrc}
            aria-hidden="true"
          >
            <source src={heroAsset.videoSrc} type="video/mp4" />
          </video>
          <div className={styles.heroPlaceholderMark} aria-hidden="true">
            <Image
              src="/media/brand/mufflermen-logo-nav.webp"
              alt=""
              width={260}
              height={96}
            />
            <strong>{heroAsset.title}</strong>
            <span>{heroAsset.section} · {heroAsset.aspectRatio} · Seedance 2.0</span>
          </div>
          <div className={styles.heroOverlay}>
            <span className={styles.heroBadge}>Carbon · Red · Dark</span>
            <span className={styles.heroTimer}>00:00 / 00:15</span>
          </div>
        </div>

        <aside className={styles.heroAside}>
          <h2 className={styles.heroAsideTitle}>Seedance hero primitive</h2>
          <p>
            {heroAsset.purpose} {heroAsset.transition} The logo is rendered as local UI, while the
            generated footage carries the dark carbon-fibre red palette.
          </p>
          <div className={styles.heroSpecs}>
            <div className={styles.heroSpecsRow}>
              <span>Container</span>
              <strong>MP4 (H.264)</strong>
            </div>
            <div className={styles.heroSpecsRow}>
              <span>Loop length</span>
              <strong data-tone="amber">15s full clip</strong>
            </div>
            <div className={styles.heroSpecsRow}>
              <span>Poster</span>
              <strong data-tone="teal">WebP fallback</strong>
            </div>
            <div className={styles.heroSpecsRow}>
              <span>Audio</span>
              <strong data-tone="green">Muted · always</strong>
            </div>
            <div className={styles.heroSpecsRow}>
              <span>Reduced motion</span>
              <strong data-tone="teal">Poster only</strong>
            </div>
          </div>
        </aside>
      </section>

      {/* Ambient grid — glassmorphic panel housing the cards */}
      <section className={styles.ambientPanel} aria-label="Ambient backgrounds">
        <header className={styles.ambientHeader}>
          <h3>Ambient loops</h3>
          <span>04 · 15 second branded cuts</span>
        </header>
        <div className={styles.ambientGrid}>
          {ambientLoops.map((loop) => (
            <article
              key={loop.id}
              className={styles.ambientCard}
              data-tone={loop.tone}
              aria-label={`${loop.title}: ${loop.asset.purpose}`}
            >
              <video
                className={styles.ambientVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={loop.asset.posterSrc}
                aria-hidden="true"
              >
                <source src={loop.asset.videoSrc} type="video/mp4" />
              </video>
              <span className={styles.ambientPlay} aria-hidden="true">
                <Play aria-hidden="true" />
              </span>
              <Image
                className={styles.ambientLogo}
                src="/media/brand/mufflermen-logo-nav.webp"
                alt=""
                width={116}
                height={43}
              />
              <div className={styles.ambientLabel}>
                <strong>{loop.title}</strong>
                <span>{loop.tag}</span>
                <small>{loop.asset.transition}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.packPanel} aria-label="Seedance video deployment map">
        <header className={styles.packHeader}>
          <div>
            <h3>Seedance deployment map</h3>
            <p>
              Ten unique 15-second clips, split across portrait and landscape surfaces so the hero,
              product, service, promo, and social sections do not reuse the same motion language.
            </p>
          </div>
          <span>Max 10 · Seedance 2.0</span>
        </header>
        <div className={styles.packGrid}>
          {SEEDANCE_VIDEO_PACK.map((asset) => (
            <article
              key={asset.id}
              className={styles.packCard}
              data-form-factor={asset.formFactor}
              data-tone={asset.tone}
              aria-label={`${asset.title}: ${asset.purpose}`}
            >
              <div className={styles.packMedia}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={asset.posterSrc}
                  aria-hidden="true"
                >
                  <source src={asset.videoSrc} type="video/mp4" />
                </video>
                <Image
                  className={styles.packLogo}
                  src="/media/brand/mufflermen-logo-nav.webp"
                  alt=""
                  width={132}
                  height={49}
                />
                <span>{asset.aspectRatio}</span>
              </div>
              <div className={styles.packBody}>
                <span>{asset.section} · {asset.formFactor}</span>
                <strong>{asset.title}</strong>
                <p>{asset.purpose}</p>
                <small>{asset.transition}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.socialPanel} aria-label="Silent social media video examples">
        <header className={styles.socialHeader}>
          <div>
            <h3>Silent social examples</h3>
            <p>
              Ten demo placements reuse the generated pack for muted social previews. These are
              ready for cheaper short-form follow-up generation later without changing the UI slots.
            </p>
          </div>
          <span>No audio required</span>
        </header>
        <div className={styles.socialGrid}>
          {socialDemos.map((demo, index) => (
            <article
              key={demo.id}
              className={styles.socialCard}
              data-form-factor={demo.asset.formFactor}
              aria-label={`${demo.title}: ${demo.treatment}`}
            >
              <div className={styles.socialMedia}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={demo.asset.posterSrc}
                  aria-hidden="true"
                >
                  <source src={demo.asset.videoSrc} type="video/mp4" />
                </video>
                <Image
                  className={styles.socialLogo}
                  src="/media/brand/mufflermen-logo-nav.webp"
                  alt=""
                  width={118}
                  height={44}
                />
                <span className={styles.socialIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.socialOverlay}>
                  <strong>{demo.overlay}</strong>
                  <small>{demo.platform}</small>
                </div>
              </div>
              <div className={styles.socialBody}>
                <span>{demo.asset.aspectRatio} · {demo.asset.section}</span>
                <strong>{demo.title}</strong>
                <p>{demo.treatment}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Controls primitive — Neumorphic */}
      <section className={styles.chromePanel} aria-label="Player controls primitive">
        <header className={styles.chromeHeader}>
          <h3>Controls primitive</h3>
          <span>static · reference shell</span>
        </header>

        <div className={styles.chromeBar} role="group" aria-label="Playback controls">
          <button type="button" className={styles.chromeButton} aria-label="Skip back 10s">
            <SkipBack size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.chromeButton}
            data-primary="true"
            aria-label="Play"
          >
            <Play size={14} aria-hidden="true" />
          </button>

          <div className={styles.scrubber} role="slider" aria-label="Scrubber" aria-valuemin={0} aria-valuemax={240} aria-valuenow={86}>
            <div className={styles.scrubberBuffered} aria-hidden="true" />
            <div className={styles.scrubberFill} aria-hidden="true" />
            <div className={styles.scrubberThumb} aria-hidden="true" />
          </div>

          <span className={styles.chromeTimecode}>
            <strong>01:26</strong> / 04:00
          </span>

          <button type="button" className={styles.chromeDropdown} aria-label="Quality 1080p">
            1080p<small>· auto</small>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>

        <div className={styles.chromeMicroRow}>
          <button type="button" className={styles.chromeButton} aria-label="Pause">
            <Pause size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Skip forward 10s">
            <SkipForward size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Mute">
            <VolumeX size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Volume">
            <Volume2 size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Captions">
            <Captions size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Settings">
            <Cog size={14} aria-hidden="true" />
          </button>
          <button type="button" className={styles.chromeButton} aria-label="Fullscreen">
            <Maximize2 size={14} aria-hidden="true" />
          </button>
          <span className={styles.chromeChip} data-active="true">
            <Captions size={11} aria-hidden="true" /> Captions on
          </span>
          <span className={styles.chromeChip}>
            <Eye size={11} aria-hidden="true" /> PiP available
          </span>
        </div>
      </section>

      {/* Accessibility card — Material-3 elevated */}
      <section className={styles.a11yCard} aria-label="Video accessibility primitives">
        <div className={styles.a11yCopy}>
          <h3>Accessibility</h3>
          <p>
            Video is the loudest thing on a page. The Mufflermen umbrella honors{" "}
            <code>prefers-reduced-motion</code>, ships captions by default, and never autoplays
            audio. These behaviors are baked into the hero primitive, not bolted on at the page
            level.
          </p>
          <ul className={styles.a11yList}>
            {a11yItems.map((item) => (
              <li key={item.title}>
                <CheckCircle2 aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.body}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.a11yPreview}>
          <div className={styles.a11yPreviewHead}>
            <span>Caption preview</span>
            <strong>EN · 4.5:1</strong>
          </div>
          <div className={styles.captionBox}>
            <span>01:14 — 01:18</span>
            <strong>
              &ldquo;The twin-loop runs hotter at idle but settles by 1500 RPM&hellip;&rdquo;
            </strong>
          </div>
          <div className={styles.captionBox}>
            <span>01:19 — 01:22</span>
            <strong>
              &ldquo;You can hear the harmonic shift after the resonator change.&rdquo;
            </strong>
          </div>
          <div className={styles.motionToggle}>
            <span>
              prefers-reduced-motion: <strong>reduce</strong>
            </span>
            <span className={styles.motionSwitch} aria-hidden="true" />
          </div>
        </aside>
      </section>
    </main>
  )
}
