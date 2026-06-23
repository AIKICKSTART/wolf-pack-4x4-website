import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./api-explorer.module.css"

export const metadata: Metadata = {
  title: "API Explorer | UI Primitives",
  description:
    "Fourteen developer-facing API explorer primitives — endpoint catalogue, detail card, try-it console, response viewer, schema explorer, multi-language code samples, auth config, rate-limit tiles, webhook receiver, error rows, SDK installs, changelog, history, and deprecation banner.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  role: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Endpoint catalogue",
    body: "Searchable endpoint list grouped by tag with method chip, summary, and selection state.",
    href: "/ui-primitives/api-explorer/endpoint-catalog",
    accent: "teal",
    role: "Navigation",
  },
  {
    kicker: "Primitive 02",
    title: "Endpoint detail card",
    body: "Single endpoint detail — method, full path, summary, auth chip, version, and path params.",
    href: "/ui-primitives/api-explorer/endpoint-detail-card",
    accent: "teal",
    role: "Detail",
  },
  {
    kicker: "Primitive 03",
    title: "Try-it console",
    body: "Request builder with headers / params / body tabs and a send button.",
    href: "/ui-primitives/api-explorer/try-it-console",
    accent: "red",
    role: "Interaction",
  },
  {
    kicker: "Primitive 04",
    title: "Response viewer",
    body: "Response panel with status, duration, size, JSON tree, headers tab.",
    href: "/ui-primitives/api-explorer/response-viewer",
    accent: "green",
    role: "Inspector",
  },
  {
    kicker: "Primitive 05",
    title: "Schema explorer",
    body: "JSON-schema tree viewer with required, type, format, enum, and description.",
    href: "/ui-primitives/api-explorer/schema-explorer",
    accent: "amber",
    role: "Docs",
  },
  {
    kicker: "Primitive 06",
    title: "Code sample tabs",
    body: "Multi-language code sample tabs — cURL, JavaScript, Python, PHP.",
    href: "/ui-primitives/api-explorer/code-sample-tabs",
    accent: "teal",
    role: "Docs",
  },
  {
    kicker: "Primitive 07",
    title: "Auth config card",
    body: "API key, bearer, or OAuth config card with reveal toggle and test-connection button.",
    href: "/ui-primitives/api-explorer/auth-config-card",
    accent: "amber",
    role: "Auth",
  },
  {
    kicker: "Primitive 08",
    title: "Rate-limit tile",
    body: "Quota tile with reset time, used / limit numbers, and recent-usage sparkline.",
    href: "/ui-primitives/api-explorer/rate-limit-tile",
    accent: "green",
    role: "Telemetry",
  },
  {
    kicker: "Primitive 09",
    title: "Webhook receiver card",
    body: "Receiver URL, signing secret, subscribed events, last delivery, replay button.",
    href: "/ui-primitives/api-explorer/webhook-receiver-card",
    accent: "teal",
    role: "Webhooks",
  },
  {
    kicker: "Primitive 10",
    title: "Error code row",
    body: "Error code reference row with HTTP status chip, retryable flag, and retry guidance.",
    href: "/ui-primitives/api-explorer/error-code-row",
    accent: "red",
    role: "Docs",
  },
  {
    kicker: "Primitive 11",
    title: "SDK install card",
    body: "Install snippet card — npm, pnpm, yarn, pip, composer with copy-to-clipboard.",
    href: "/ui-primitives/api-explorer/sdk-install-card",
    accent: "amber",
    role: "Onboarding",
  },
  {
    kicker: "Primitive 12",
    title: "Changelog entry card",
    body: "Versioned changelog entry with breaking-change badge and bullet items.",
    href: "/ui-primitives/api-explorer/changelog-entry-card",
    accent: "teal",
    role: "Docs",
  },
  {
    kicker: "Primitive 13",
    title: "Try-it history row",
    body: "Recent test-call row — timestamp, method, path, status chip, duration, copy-curl.",
    href: "/ui-primitives/api-explorer/try-it-history-row",
    accent: "green",
    role: "History",
  },
  {
    kicker: "Primitive 14",
    title: "Deprecation banner",
    body: "Deprecation banner with replacement endpoint link and sunset date pill.",
    href: "/ui-primitives/api-explorer/endpoint-deprecation-banner",
    accent: "amber",
    role: "Lifecycle",
  },
  {
    kicker: "Bonus",
    title: "Full explorer composition",
    body: "Catalogue + detail + try-it + response + samples + history, wired together.",
    href: "/ui-primitives/api-explorer/full-explorer",
    accent: "teal",
    role: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

function ThumbMark() {
  return (
    <svg viewBox="0 0 200 100" className={styles.thumbSvg} aria-hidden="true">
      <rect x="6" y="14" width="78" height="72" rx="10" fill="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)" />
      <rect x="14" y="22" width="32" height="6" rx="2" fill="var(--primitive-teal)" opacity="0.85" />
      <rect x="14" y="34" width="56" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 16%, transparent)" />
      <rect x="14" y="42" width="44" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
      <rect x="14" y="54" width="20" height="6" rx="2" fill="var(--primitive-green)" opacity="0.85" />
      <rect x="14" y="66" width="56" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
      <rect x="14" y="74" width="40" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
      <g transform="translate(98 18)">
        <rect x="0" y="0" width="94" height="66" rx="8" fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)" stroke="color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)" />
        <rect x="8" y="10" width="32" height="6" rx="3" fill="var(--primitive-amber)" opacity="0.8" />
        <rect x="44" y="10" width="42" height="6" rx="3" fill="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />
        <rect x="8" y="22" width="78" height="3" rx="1.5" fill="color-mix(in oklab, var(--primitive-text-strong) 14%, transparent)" />
        <rect x="8" y="30" width="62" height="3" rx="1.5" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
        <rect x="8" y="38" width="78" height="14" rx="4" fill="color-mix(in oklab, var(--primitive-teal) 18%, transparent)" />
        <rect x="8" y="38" width="48" height="14" rx="4" fill="var(--primitive-teal)" opacity="0.7" />
        <circle cx="14" cy="60" r="3" fill="var(--primitive-green)" />
        <rect x="24" y="58" width="48" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />
      </g>
    </svg>
  )
}

export default function ApiExplorerIndexPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="30 / API explorer"
        title="API explorer + docs"
        description="Fourteen developer-facing primitives for the Mufflermen REST API explorer — endpoint catalogue, detail card, try-it console, response viewer, schema explorer, multi-language code samples, an auth config card, rate-limit tiles, webhook receivers, error rows, SDK installs, changelog entries, try-it history, and a deprecation banner."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer" },
        ]}
      />

      <span className={styles.notice}>
        Developer docs surface — distinct from the operational API console.
      </span>

      <section className={styles.grid} aria-label="API explorer primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <ThumbMark />
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.role}</span>
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
