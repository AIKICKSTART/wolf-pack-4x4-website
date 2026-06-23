import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./asset-cdn.module.css"

export const metadata: Metadata = {
  title: "Asset CDN | UI Primitives",
  description:
    "Reusable asset-CDN primitives — image transform, video transcode, signed URLs, cache invalidation, background removal, watermarking, region map, versioning, quotas, MIME filter, presets, bulk jobs, lazy-load, purge confirmation.",
}

interface AssetCdnScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AssetCdnScene> = [
  {
    kicker: "Primitive 01",
    title: "Image transform panel",
    body: "Resize / crop / format / quality controls with a click-and-arrow focal-point picker.",
    href: "/ui-primitives/asset-cdn/image-transform-panel",
    accent: "teal",
    glyph: "▢",
    state: "Stateful · interactive",
  },
  {
    kicker: "Primitive 02",
    title: "Video transcode row",
    body: "Job row with target profile, codec, progress, and ETA. Replicate-style worker chrome.",
    href: "/ui-primitives/asset-cdn/video-transcode-row",
    accent: "amber",
    glyph: "▶",
    state: "Stateless · live data",
  },
  {
    kicker: "Primitive 03",
    title: "Signed URL generator",
    body: "Resource + TTL + algorithm + scope with a copyable signed URL preview.",
    href: "/ui-primitives/asset-cdn/signed-url-generator",
    accent: "green",
    glyph: "⌥",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 04",
    title: "Cache invalidation card",
    body: "Pattern, scope, strategy, affected count, propagation indicator.",
    href: "/ui-primitives/asset-cdn/cache-invalidation-card",
    accent: "teal",
    glyph: "↻",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Background removal tool",
    body: "Before / after slider with backdrop swatches and edge-feather control.",
    href: "/ui-primitives/asset-cdn/bg-removal-tool",
    accent: "red",
    glyph: "◐",
    state: "Stateful · scrub",
  },
  {
    kicker: "Primitive 06",
    title: "Watermark config card",
    body: "Logo / text toggle, opacity, scale, 5-anchor position grid with live preview.",
    href: "/ui-primitives/asset-cdn/watermark-config-card",
    accent: "amber",
    glyph: "❖",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 07",
    title: "CDN region map",
    body: "Global region pins with cache-hit rate, throughput, latency, and PoP count.",
    href: "/ui-primitives/asset-cdn/cdn-region-map",
    accent: "teal",
    glyph: "✸",
    state: "Stateless · live data",
  },
  {
    kicker: "Primitive 08",
    title: "Asset versioning row",
    body: "Version row with size, byline, note, and revert action for non-current versions.",
    href: "/ui-primitives/asset-cdn/asset-versioning-row",
    accent: "green",
    glyph: "○─●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Usage quota tile",
    body: "Bandwidth / storage / image-op / video-minute tile with progress and cycle reset.",
    href: "/ui-primitives/asset-cdn/usage-quota-tile",
    accent: "amber",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "MIME-type filter",
    body: "Allow / block toggle list with pattern input, max-size note, and remove action.",
    href: "/ui-primitives/asset-cdn/mime-type-filter",
    accent: "red",
    glyph: "≡",
    state: "Stateful · CRUD",
  },
  {
    kicker: "Primitive 11",
    title: "Image preset card",
    body: "Thumbnail / hero / OG / card / avatar / splash preset card with dimensions and chips.",
    href: "/ui-primitives/asset-cdn/image-preset-card",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 12",
    title: "Bulk-process job row",
    body: "Bulk job row with kind badge, progress, stats grid, and pause / resume / cancel.",
    href: "/ui-primitives/asset-cdn/bulk-process-job-row",
    accent: "amber",
    glyph: "▰",
    state: "Stateless · actions",
  },
  {
    kicker: "Primitive 13",
    title: "Lazy-load config card",
    body: "LQIP / blur / sketch / dominant-colour strategy with placeholder vs resolved preview.",
    href: "/ui-primitives/asset-cdn/lazy-load-config-card",
    accent: "amber",
    glyph: "◯",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 14",
    title: "CDN purge confirmation",
    body: "Hard-purge modal with affected path list and a typed confirmation word.",
    href: "/ui-primitives/asset-cdn/cdn-purge-confirmation",
    accent: "red",
    glyph: "⚠",
    state: "Stateful · destructive",
  },
  {
    kicker: "Composition",
    title: "Full CDN",
    body: "Region map + quota tiles + transcode jobs + invalidations + bulk + purge, composed.",
    href: "/ui-primitives/asset-cdn/full-cdn",
    accent: "red",
    glyph: "▦◇",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<AssetCdnScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function AssetCdnIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Asset CDN / 14 primitives + composition"
        title="Asset CDN primitives"
        description="The delivery layer for Oak Flats Mufflermen — Cloudflare image transforms, Replicate video transcoding, signed URLs, edge caching, watermarking, region telemetry, and bulk processing. Visual reference only — no real CDN is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — CDN operations are not wired
      </span>

      <section className={styles.grid} aria-label="Asset CDN primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
