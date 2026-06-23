import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import {
  AmbientGridHero,
  CinematicLoopHero,
  FullBleedMarqueeHero,
  KenBurnsHero,
  MaskedPipeHero,
  OverlayNarrativeHero,
  ParallaxScrollHero,
  PulseReactHero,
  ScrollyClipHero,
  SideBySideHero,
  VideoHeroCard,
} from "../components/video-heroes"
import { seedanceById, type SeedanceVideoAsset } from "../seedance-video-pack"

import { heroOptions } from "./hero-options"
import { OptionPreviewVideo } from "./option-preview-video"
import styles from "./video-heroes.module.css"

export const metadata: Metadata = {
  title: "Video Heroes | UI Primitives",
  description:
    "Ten dark branded Seedance 2.0 video-hero variants for the Mufflermen umbrella — cinematic, parallax, ambient, side-by-side, marquee, masked pipe, narrative, pulse, ken-burns, scrolly clip.",
}

interface VariantMeta {
  id: string
  name: string
  toneLabel: string
  tone: "ember" | "abyss" | "iron" | "amber" | "green"
  notes: string
}

const VARIANT_META: VariantMeta[] = [
  { id: "cinematic-loop",      name: "Cinematic Loop",     toneLabel: "Anamorphic",  tone: "ember", notes: "Letterbox · grain · typewriter sub" },
  { id: "parallax-scroll",     name: "Parallax Scroll",    toneLabel: "Scroll-bound", tone: "amber", notes: "Video Y shift · scale on scroll" },
  { id: "ambient-grid",        name: "Ambient Grid",       toneLabel: "Four loops",  tone: "abyss", notes: "Glass card · 4 quadrant tiles" },
  { id: "side-by-side",        name: "Side by Side",       toneLabel: "Build sheet", tone: "ember", notes: "Brand stripe · neuomorphic copy" },
  { id: "full-bleed-marquee",  name: "Full-bleed Marquee", toneLabel: "Ticker",      tone: "ember", notes: "Looping tagline strip overlay" },
  { id: "masked-pipe",         name: "Masked Pipe",        toneLabel: "Pipe clip",   tone: "amber", notes: "Video clipped through exhaust silhouette" },
  { id: "overlay-narrative",   name: "Overlay Narrative",  toneLabel: "Story beats", tone: "iron",  notes: "Staggered narrative overlays" },
  { id: "pulse-react",         name: "Pulse React",        toneLabel: "Live dyno",   tone: "ember", notes: "Pulse rings · gauge ticker" },
  { id: "ken-burns",           name: "Ken Burns",          toneLabel: "Poster pan",  tone: "amber", notes: "Three-plate cross-fade · no video" },
  { id: "scrolly-clip",        name: "Scrolly Clip",       toneLabel: "Clip-path",   tone: "abyss", notes: "Width morph 30→100 on scroll" },
]

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

const ambientTiles = [
  seedanceById("workshop-hero-portrait"),
  seedanceById("performance-road-portrait"),
  seedanceById("service-dyno-portrait"),
  seedanceById("social-outro-portrait"),
].map((asset) => ({
  id: asset.id,
  caption: `${asset.section} · ${asset.aspectRatio}`,
  videoSrc: asset.videoSrc,
  posterSrc: asset.posterSrc,
}))

const kenBurnsLayers = [
  seedanceById("performance-road-portrait"),
  seedanceById("exhaust-product-portrait"),
  seedanceById("social-outro-portrait"),
].map((asset, index) => ({
  id: asset.id,
  posterSrc: asset.posterSrc,
  tint: (index === 0 ? "ember" : index === 1 ? "dusk" : "abyss") as "ember" | "dusk" | "abyss",
  caption: `${asset.section} · ${asset.aspectRatio}`,
}))

export default function VideoHeroesShowcasePage() {
  return (
    <main className={styles.page} aria-labelledby="video-heroes-title">
      <PageHeader
        kicker="05 / Media · Video heroes"
        title="Video heroes"
        description="Ten Seedance 2.0 car-brand videos mapped to distinct UI jobs. The footage stays dark, carbon-fibre, red-accented, and logo-led while the real local logo remains a crisp HTML overlay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video heroes" },
        ]}
      />

      <p className={styles.toc} aria-label="Variant index" id="video-heroes-title">
        <strong>10 generated videos · {heroOptions.length} hero options ·</strong>{" "}
        {VARIANT_META.map((v, i) => (
          <span key={v.id}>
            <a href={`#${v.id}`}>{v.name}</a>
            {i < VARIANT_META.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>

      <section className={styles.optionLab} aria-label="Forty hero presentation options">
        <header className={styles.optionLabHeader}>
          <div>
            <h2>{heroOptions.length} hero presentation options</h2>
            <p>
              The ten generated videos are reusable across landing, social, product, service,
              dashboard, and accessibility-safe hero treatments. Every preview is muted and uses the
              real local logo overlay.
            </p>
          </div>
          <span>{heroOptions.length} options · 10 videos · no extra generation</span>
        </header>
        <div className={styles.optionGrid}>
          {heroOptions.map((option, index) => (
            <Link
              className={styles.optionCard}
              data-frame={option.frame}
              data-form-factor={option.asset.formFactor}
              data-tone={option.asset.tone}
              key={option.id}
              href={`/ui-primitives/video-heroes/${option.id}`}
              aria-label={`Open preview: ${option.name} — ${option.useCase}`}
            >
              <div className={styles.optionMedia}>
                <Image
                  className={styles.optionPosterFallback}
                  src={option.asset.posterSrc}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  priority={index < 4}
                />
                <OptionPreviewVideo src={option.asset.videoSrc} poster={option.asset.posterSrc} />
                <div className={styles.optionChrome} aria-hidden="true">
                  <span>{option.asset.durationSec}s</span>
                  <span>Muted</span>
                  <span>{option.asset.aspectRatio}</span>
                </div>
                <Image
                  className={styles.optionLogo}
                  src="/media/brand/mufflermen-logo-nav.webp"
                  alt=""
                  width={132}
                  height={49}
                />
                <span className={styles.optionNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.optionHeroCopy}>
                  <small>{option.group} · {option.useCase}</small>
                  <h3>{option.headline}</h3>
                  <p>{option.subhead}</p>
                  <div className={styles.optionActions} aria-hidden="true">
                    <span>{option.cta}</span>
                    <span>View spec</span>
                  </div>
                </div>
                <div className={styles.optionOverlay}>
                  <strong>{option.overlay}</strong>
                  <small>{option.motion}</small>
                </div>
                <div className={styles.optionStats} aria-hidden="true">
                  <span>{option.frame}</span>
                  <span>{option.asset.section}</span>
                  <span>Seedance 2.0</span>
                </div>
                <span className={styles.optionOpen} aria-hidden="true">
                  Open preview <em>→</em>
                </span>
              </div>
              <div className={styles.optionBody}>
                <span>{option.group} · {option.frame} · {option.asset.aspectRatio}</span>
                <h3>{option.name}</h3>
                <p>{option.overlay}. {option.motion}. Uses {option.asset.title.toLowerCase()}.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Full-size variant sections */}
      <section className={styles.fullSection} id={VARIANT_META[0].id} aria-label="Cinematic loop hero">
        <SectionLabel index={1} meta={VARIANT_META[0]} asset={HERO_MEDIA[0]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[0].formFactor}>
          <CinematicLoopHero
            videoSrc={HERO_MEDIA[0].videoSrc}
            posterSrc={HERO_MEDIA[0].posterSrc}
            headline="Forged in Oak Flats."
            subhead="Hand-built stainless exhausts engineered for tone, torque, and the open Australian highway."
            cta={{ label: "Watch the reel", href: "/about" }}
            timestampLabel="Seedance 2.0 · 15s · dark carbon hero"
          />
          <BrandOverlay asset={HERO_MEDIA[0]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[1].id} aria-label="Parallax scroll hero">
        <SectionLabel index={2} meta={VARIANT_META[1]} asset={HERO_MEDIA[1]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[1].formFactor}>
          <ParallaxScrollHero
            videoSrc={HERO_MEDIA[1].videoSrc}
            posterSrc={HERO_MEDIA[1].posterSrc}
            headline="The signal travels through steel."
            subhead="Twin-loop resonators tuned by ear. Field-tested across 14,000 km of coastal asphalt."
            cta={{ label: "View build sheet", href: "/parts" }}
            reelTag="Seedance 2.0 · performance road · 15s"
          />
          <BrandOverlay asset={HERO_MEDIA[1]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[2].id} aria-label="Ambient grid hero">
        <SectionLabel index={3} meta={VARIANT_META[2]} asset={HERO_MEDIA[2]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[2].formFactor}>
          <AmbientGridHero
            headline="Workshop, showroom, dyno, road."
            subhead="Four portrait-safe Seedance clips feed the umbrella surface. Each tile carries a different mobile job, from workshop opener to service scan."
            cta={{ label: "Tour the workshop", href: "/about" }}
            badge="Mufflermen · portrait media grid"
            tiles={ambientTiles}
          />
          <BrandOverlay asset={HERO_MEDIA[2]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[3].id} aria-label="Side by side hero">
        <SectionLabel index={4} meta={VARIANT_META[3]} asset={HERO_MEDIA[3]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[3].formFactor}>
          <SideBySideHero
            videoSrc={HERO_MEDIA[3].videoSrc}
            posterSrc={HERO_MEDIA[3].posterSrc}
            headline="Twin-loop. Stainless. Aussie made."
            subhead="A build sheet for the truly obsessed. Bore, tone, finish — every number signed off on the workshop floor."
            primaryCta={{ label: "Configure yours", href: "/parts", emphasis: "primary" }}
            secondaryCta={{ label: "Spec PDF", href: "/about" }}
            serial="Seedance 2.0 · service scan"
          />
          <BrandOverlay asset={HERO_MEDIA[3]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[4].id} aria-label="Full-bleed marquee hero">
        <SectionLabel index={5} meta={VARIANT_META[4]} asset={HERO_MEDIA[4]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[4].formFactor}>
          <FullBleedMarqueeHero
            videoSrc={HERO_MEDIA[4].videoSrc}
            posterSrc={HERO_MEDIA[4].posterSrc}
            headline="Push rod heroes."
            subhead="Drop in. Loop on. Keep the ticker scrolling and the engine breathing."
            cta={{ label: "Book a session", href: "/contact" }}
            marqueePhrases={["CARBON FIBRE", "RED SHOP LIGHT", "OAK FLATS", "STAINLESS TONE", "DARK THEME"]}
          />
          <BrandOverlay asset={HERO_MEDIA[4]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[5].id} aria-label="Masked pipe hero">
        <SectionLabel index={6} meta={VARIANT_META[5]} asset={HERO_MEDIA[5]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[5].formFactor}>
          <MaskedPipeHero
            videoSrc={HERO_MEDIA[5].videoSrc}
            posterSrc={HERO_MEDIA[5].posterSrc}
            headline="Cut, bent, and breathing."
            subhead="The video lives inside the pipe. Press-bent contours hold the loop like the steel holds the gas."
            cta={{ label: "Inspect the bore", href: "/parts" }}
            meta="Carbon fibre dark · red shop light · stainless sweep"
          />
          <BrandOverlay asset={HERO_MEDIA[5]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[6].id} aria-label="Overlay narrative hero">
        <SectionLabel index={7} meta={VARIANT_META[6]} asset={HERO_MEDIA[6]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[6].formFactor}>
          <OverlayNarrativeHero
            videoSrc={HERO_MEDIA[6].videoSrc}
            posterSrc={HERO_MEDIA[6].posterSrc}
            headline="A loop tells a story."
            cta={{ label: "Read the field notes", href: "/about" }}
            beats={[
              { id: "product", text: "→ Stainless macro. Carbon fibre dark field.", position: { top: "18%", left: "7%" }, tone: "amber", delay: 0.4 },
              { id: "brand", text: "Red shop light anchors the brand system.", position: { top: "44%", right: "7%" }, tone: "red", delay: 1.2 },
              { id: "mobile", text: "Portrait-safe product hero. No warped text.", position: { bottom: "22%", left: "12%" }, tone: "teal", delay: 2 },
            ]}
          />
          <BrandOverlay asset={HERO_MEDIA[6]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[7].id} aria-label="Pulse react hero">
        <SectionLabel index={8} meta={VARIANT_META[7]} asset={HERO_MEDIA[7]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[7].formFactor}>
          <PulseReactHero
            videoSrc={HERO_MEDIA[7].videoSrc}
            posterSrc={HERO_MEDIA[7].posterSrc}
            headline="Live from bench 03."
            subhead="6,400 RPM. 82.4 dB(A). 748°C EGT. The dyno doesn't lie — and neither do the rings on the floor."
            cta={{ label: "Open the dyno feed", href: "/parts" }}
            tone="red"
            gauge={[
              { label: "VIDEO", value: "15s" },
              { label: "MODE", value: "9:16" },
              { label: "THEME", value: "RED" },
            ]}
          />
          <BrandOverlay asset={HERO_MEDIA[7]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[8].id} aria-label="Ken burns hero">
        <SectionLabel index={9} meta={VARIANT_META[8]} asset={HERO_MEDIA[8]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[8].formFactor}>
          <KenBurnsHero
            videoSrc={HERO_MEDIA[8].videoSrc}
            posterSrc={HERO_MEDIA[8].posterSrc}
            headline="Field plates from the south coast."
            subhead="A portrait performance reel can degrade into a poster pan for reduced motion while keeping the dark red brand palette."
            cta={{ label: "Open the field log", href: "/about" }}
            layers={kenBurnsLayers}
            chapterLabel="Seedance 2.0 · portrait performance"
          />
          <BrandOverlay asset={HERO_MEDIA[8]} />
        </div>
      </section>

      <section className={styles.fullSection} id={VARIANT_META[9].id} aria-label="Scrolly clip hero">
        <SectionLabel index={10} meta={VARIANT_META[9]} asset={HERO_MEDIA[9]} />
        <div className={styles.fullStage} data-form-factor={HERO_MEDIA[9].formFactor}>
          <ScrollyClipHero
            videoSrc={HERO_MEDIA[9].videoSrc}
            posterSrc={HERO_MEDIA[9].posterSrc}
            headline="Scroll widens the frame."
            subhead="A portrait story outro widens into a full brand close, with a clean final frame for mobile and landing-page CTAs."
            cta={{ label: "See the live build", href: "/parts" }}
          />
          <BrandOverlay asset={HERO_MEDIA[9]} />
        </div>
      </section>

      {/* Preview comparison sheet */}
      <section className={styles.gridSection} aria-label="Variant comparison sheet">
        <header className={styles.gridHead}>
          <h2>Comparison sheet</h2>
          <span>10 variants · scaled previews</span>
        </header>

        <div className={styles.grid}>
          <VideoHeroCard variantName="Cinematic loop" toneLabel={VARIANT_META[0].toneLabel} tone={VARIANT_META[0].tone} notes={HERO_MEDIA[0].purpose}>
            <CinematicLoopHero
              videoSrc={HERO_MEDIA[0].videoSrc}
              posterSrc={HERO_MEDIA[0].posterSrc}
              headline="Forged in Oak Flats."
              subhead="Hand-built. Hand-tuned. Hand-signed."
              cta={{ label: "Watch reel", href: "/about" }}
              timestampLabel="Seedance 2.0 · 15s"
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Parallax scroll" toneLabel={VARIANT_META[1].toneLabel} tone={VARIANT_META[1].tone} notes={HERO_MEDIA[1].purpose}>
            <ParallaxScrollHero
              videoSrc={HERO_MEDIA[1].videoSrc}
              posterSrc={HERO_MEDIA[1].posterSrc}
              headline="Signal through steel."
              subhead="Field-tested twin loop."
              cta={{ label: "Build sheet", href: "/parts" }}
              reelTag="Performance road · 15s"
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Ambient grid" toneLabel={VARIANT_META[2].toneLabel} tone={VARIANT_META[2].tone} notes={HERO_MEDIA[2].purpose}>
            <AmbientGridHero
              headline="Four ambient loops."
              subhead="A glass card, a quiet workshop."
              cta={{ label: "Tour workshop", href: "/about" }}
              tiles={ambientTiles}
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Side by side" toneLabel={VARIANT_META[3].toneLabel} tone={VARIANT_META[3].tone} notes={HERO_MEDIA[3].purpose}>
            <SideBySideHero
              videoSrc={HERO_MEDIA[3].videoSrc}
              posterSrc={HERO_MEDIA[3].posterSrc}
              headline="Twin-loop stainless."
              subhead="Build sheet. Brand stripe."
              primaryCta={{ label: "Configure", href: "/parts", emphasis: "primary" }}
              secondaryCta={{ label: "PDF", href: "/about" }}
              serial="Service scan"
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Full-bleed marquee" toneLabel={VARIANT_META[4].toneLabel} tone={VARIANT_META[4].tone} notes={HERO_MEDIA[4].purpose}>
            <FullBleedMarqueeHero
              videoSrc={HERO_MEDIA[4].videoSrc}
              posterSrc={HERO_MEDIA[4].posterSrc}
              headline="Push rod heroes."
              subhead="Ticker rolling, engine breathing."
              cta={{ label: "Book session", href: "/contact" }}
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Masked pipe" toneLabel={VARIANT_META[5].toneLabel} tone={VARIANT_META[5].tone} notes={HERO_MEDIA[5].purpose}>
            <MaskedPipeHero
              videoSrc={HERO_MEDIA[5].videoSrc}
              posterSrc={HERO_MEDIA[5].posterSrc}
              headline="Inside the bore."
              subhead="Video lives inside the pipe."
              cta={{ label: "Inspect", href: "/parts" }}
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Overlay narrative" toneLabel={VARIANT_META[6].toneLabel} tone={VARIANT_META[6].tone} notes={HERO_MEDIA[6].purpose}>
            <OverlayNarrativeHero
              videoSrc={HERO_MEDIA[6].videoSrc}
              posterSrc={HERO_MEDIA[6].posterSrc}
              headline="A loop tells a story."
              cta={{ label: "Field notes", href: "/about" }}
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Pulse react" toneLabel={VARIANT_META[7].toneLabel} tone={VARIANT_META[7].tone} notes={HERO_MEDIA[7].purpose}>
            <PulseReactHero
              videoSrc={HERO_MEDIA[7].videoSrc}
              posterSrc={HERO_MEDIA[7].posterSrc}
              headline="Live · bench 03."
              subhead="The dyno doesn't lie."
              cta={{ label: "Dyno feed", href: "/parts" }}
              tone="red"
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Ken Burns" toneLabel={VARIANT_META[8].toneLabel} tone={VARIANT_META[8].tone} notes={HERO_MEDIA[8].purpose}>
            <KenBurnsHero
              videoSrc={HERO_MEDIA[8].videoSrc}
              posterSrc={HERO_MEDIA[8].posterSrc}
              headline="Field plates."
              subhead="Three plates, slow pan."
              cta={{ label: "Field log", href: "/about" }}
              layers={kenBurnsLayers}
            />
          </VideoHeroCard>

          <VideoHeroCard variantName="Scrolly clip" toneLabel={VARIANT_META[9].toneLabel} tone={VARIANT_META[9].tone} notes={HERO_MEDIA[9].purpose}>
            <ScrollyClipHero
              videoSrc={HERO_MEDIA[9].videoSrc}
              posterSrc={HERO_MEDIA[9].posterSrc}
              headline="Scroll widens the frame."
              subhead="30 percent slit to full reveal."
              cta={{ label: "Live build", href: "/parts" }}
            />
          </VideoHeroCard>
        </div>
      </section>
    </main>
  )
}

interface SectionLabelProps {
  index: number
  meta: VariantMeta
  asset: SeedanceVideoAsset
}

function SectionLabel({ index, meta, asset }: SectionLabelProps) {
  return (
    <header className={styles.fullLabel}>
      <span className={styles.fullIndex}>{String(index).padStart(2, "0")}</span>
      <div>
        <h2>{meta.name}</h2>
        <span className={styles.fullMeta}>
          <i aria-hidden="true" />
          {meta.toneLabel} · {meta.notes} · {asset.aspectRatio} · {asset.durationSec}s
        </span>
        <p className={styles.purposeLine}>
          <strong>{asset.title}:</strong> {asset.purpose} {asset.transition}
        </p>
      </div>
    </header>
  )
}

function BrandOverlay({ asset }: { asset: SeedanceVideoAsset }) {
  return (
    <aside className={styles.brandOverlay} aria-label={`${asset.title} media branding`}>
      <Image
        src="/media/brand/mufflermen-logo-nav.webp"
        alt="Oak Flats Mufflermen"
        width={220}
        height={82}
        priority={false}
      />
      <span>{asset.section} · {asset.aspectRatio} · Seedance 2.0</span>
    </aside>
  )
}
