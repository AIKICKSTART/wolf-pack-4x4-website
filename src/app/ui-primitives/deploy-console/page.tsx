import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./deploy-console.module.css"

export const metadata: Metadata = {
  title: "Deploy console | UI Primitives",
  description:
    "Deploy console primitives for the Oak Flats Mufflermen production platform — env editor, secret vault, deploy gate, rollback, healthcheck heatmap, branch previews, CDN cache, DNS, SSL, incident banner, release notes, deploy timeline, runtime versions and blue/green traffic shift.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Env editor",
    body:
      "Key/value env grid with type detection (string / url / secret / json / number / boolean) plus dirty markers (added / edited / removed) and a scope filter.",
    href: "/ui-primitives/deploy-console/env-editor",
    accent: "teal",
    glyph: "K=V",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 02",
    title: "Secret vault row",
    body:
      "Secret row with masked reveal, copy and rotate controls, vendor label and a rotation-window countdown bar.",
    href: "/ui-primitives/deploy-console/secret-vault-row",
    accent: "amber",
    glyph: "🔒",
    state: "Stateful · reveal",
  },
  {
    kicker: "Primitive 03",
    title: "Deploy gate card",
    body:
      "Pre-deploy gate — tests / typecheck / lint / security / owner approval with pass/fail badges and a promote CTA.",
    href: "/ui-primitives/deploy-console/deploy-gate-card",
    accent: "green",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Rollback panel",
    body:
      "Revision picker with diff preview, current live tag and a single-click rollback action.",
    href: "/ui-primitives/deploy-console/rollback-panel",
    accent: "amber",
    glyph: "↺",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 05",
    title: "Healthcheck heatmap",
    body:
      "Endpoint × hour-of-day heatmap of uptime with p95 latency and 24h uptime % per endpoint.",
    href: "/ui-primitives/deploy-console/healthcheck-heatmap",
    accent: "green",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Branch preview deck",
    body:
      "Per-branch preview card with screenshot placeholder, head sha, commits-ahead, open + share actions.",
    href: "/ui-primitives/deploy-console/branch-preview-deck",
    accent: "teal",
    glyph: "⌬",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "CDN cache tile",
    body:
      "Cache hit-rate, TTL and RPM per path pattern with a purge control and a tone-shifting hit-ratio bar.",
    href: "/ui-primitives/deploy-console/cdn-cache-tile",
    accent: "violet",
    glyph: "Σ",
    state: "Stateful · purge",
  },
  {
    kicker: "Primitive 08",
    title: "DNS record row",
    body:
      "DNS record row with type badge, TTL, value and a propagation progress bar with state chip.",
    href: "/ui-primitives/deploy-console/dns-record-row",
    accent: "neutral",
    glyph: "DNS",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "SSL cert card",
    body:
      "Cert chain card — CN, issuer, SAN list, expiry countdown bar and an auto-renew toggle.",
    href: "/ui-primitives/deploy-console/ssl-cert-card",
    accent: "green",
    glyph: "🛡",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 10",
    title: "Incident banner",
    body:
      "Active-incident banner with pulsing dot, severity chip, status copy, ETA and an open-report CTA.",
    href: "/ui-primitives/deploy-console/incident-banner",
    accent: "red",
    glyph: "◉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Release notes card",
    body:
      "Semver release notes with breaking + security callouts and per-change tone chips (feature / fix / perf / breaking / chore / security).",
    href: "/ui-primitives/deploy-console/release-notes-card",
    accent: "teal",
    glyph: "v3.43",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Deploy timeline",
    body:
      "Chronological deploy history rail with author, duration, canary % and the deploy outcome chip.",
    href: "/ui-primitives/deploy-console/deploy-timeline",
    accent: "green",
    glyph: "│││",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Runtime version tile",
    body:
      "Per-runtime tile — Node / Next / pnpm / Docker / Postgres / Redis with current / pinned / latest and drift chip.",
    href: "/ui-primitives/deploy-console/runtime-version-tile",
    accent: "violet",
    glyph: "v",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Traffic shift card",
    body:
      "Blue/green traffic shift slider with snap presets, live blue↔green split bar and a session-stickiness toggle.",
    href: "/ui-primitives/deploy-console/traffic-shift-card",
    accent: "teal",
    glyph: "B|G",
    state: "Stateful · slider",
  },
  {
    kicker: "Composition",
    title: "Full deploy control room",
    body:
      "Composed deploy control room — incident banner, gate, runtime tiles, secret vault, deploy timeline, branch previews, traffic shift and rollback.",
    href: "/ui-primitives/deploy-console/full-control-room",
    accent: "red",
    glyph: "▣▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function DeployConsoleIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Deploy console / 14 primitives + composition"
        title="Deploy console primitives"
        description="Production deploy tooling for the Oak Flats Mufflermen platform — primitives.mufflermen.com.au on Hostinger VPS, Docker stack (web, primitives, hermes-api, mufflerpulse), Let's Encrypt with 30-day auto-renew. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Deploy console primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
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
