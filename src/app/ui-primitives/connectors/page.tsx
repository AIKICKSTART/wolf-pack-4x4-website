import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./connectors.module.css"

export const metadata: Metadata = {
  title: "Connectors | UI Primitives",
  description:
    "Connector hub primitives — OAuth, API key vault, webhook config, rate limits, retry policies, integration health, event relay, scope grids, sync schedules, quota purchase and audit trail.",
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
    title: "OAuth connect card",
    body: "Provider logo tile, granted scopes, status chip, token expiry and a connect / disconnect button per OAuth provider.",
    href: "/ui-primitives/connectors/oauth-connect-card",
    accent: "teal",
    glyph: "OAUTH",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 02",
    title: "API key vault row",
    body: "Symbolic key name, masked secret preview, rotation cadence, days-until-due countdown and a reveal / copy / rotate strip.",
    href: "/ui-primitives/connectors/api-key-vault-row",
    accent: "violet",
    glyph: "*****",
    state: "Stateful · reveal",
  },
  {
    kicker: "Primitive 03",
    title: "Webhook config card",
    body: "Endpoint URL, masked signing secret and event-filter checkboxes for inbound webhooks (Stripe, Shopify, Twilio).",
    href: "/ui-primitives/connectors/webhook-config-card",
    accent: "amber",
    glyph: "HOOK",
    state: "Stateful · filters",
  },
  {
    kicker: "Primitive 04",
    title: "Rate limit gauge",
    body: "Radial gauge — quota used / remaining with a reset countdown for Google, OpenAI and Replicate API caps.",
    href: "/ui-primitives/connectors/rate-limit-gauge",
    accent: "green",
    glyph: "◜◝",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Retry policy card",
    body: "Initial backoff, multiplier and max attempts, with a jitter toggle that fans the timeline to a min/max window.",
    href: "/ui-primitives/connectors/retry-policy-card",
    accent: "violet",
    glyph: "↻↻↻",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 06",
    title: "Integration health tile",
    body: "Provider tile — current status, last-sync, error rate and a 10-sample error-rate sparkline.",
    href: "/ui-primitives/connectors/integration-health-tile",
    accent: "green",
    glyph: "▁▂▃▅▇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Event relay table",
    body: "Inbound webhook event log — received-at, source, event code, HTTP code, outcome chip and a replay button per row.",
    href: "/ui-primitives/connectors/event-relay-table",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · replay",
  },
  {
    kicker: "Primitive 08",
    title: "Scope permission grid",
    body: "Granted / requested / denied scope cells per OAuth provider — Google, Meta, Stripe, Xero, Shopify in one matrix.",
    href: "/ui-primitives/connectors/scope-permission-grid",
    accent: "neutral",
    glyph: "✓✓✕",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Provider directory card",
    body: "Marketplace catalog card — provider logo, one-line description, category chip and install count.",
    href: "/ui-primitives/connectors/provider-directory-card",
    accent: "violet",
    glyph: "□□□",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Data mapping row",
    body: "Source-field → target-field row with type chips, a transform function chip and required / validation badges.",
    href: "/ui-primitives/connectors/data-mapping-row",
    accent: "teal",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Sync schedule card",
    body: "Cron expression with timezone, last-run plus next-run preview and a 12-cell recent outcomes strip.",
    href: "/ui-primitives/connectors/sync-schedule-card",
    accent: "teal",
    glyph: "0 * * * *",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Connection test result",
    body: "Test-call summary — HTTP status code, latency, region and a JSON sample payload in a code block.",
    href: "/ui-primitives/connectors/connection-test-result",
    accent: "green",
    glyph: "200",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Quota purchase card",
    body: "Segmented usage meter plus three tiers — Starter, Studio, Scale — with current and recommended badges.",
    href: "/ui-primitives/connectors/quota-purchase-card",
    accent: "violet",
    glyph: "$$$",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Audit trail row",
    body: "Per-action audit entry — connector, actor avatar, IP, timestamp and a free-text note line.",
    href: "/ui-primitives/connectors/audit-trail-row",
    accent: "amber",
    glyph: "AUDIT",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full integration hub",
    body: "End-to-end hub composition — directory, OAuth, secrets, webhooks, schedules, health, rate limits, event relay and audit trail.",
    href: "/ui-primitives/connectors/full-hub",
    accent: "teal",
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

export default function ConnectorsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Connectors / 14 primitives + composition"
        title="Connector hub primitives"
        description="Central control surface for the Mufflermen workshop — OAuth flows for Google, Meta, Stripe, Xero and Shopify; an API key vault for Replicate, OpenAI and Payload; webhooks for Stripe payments, Shopify orders and Twilio SMS; rate limits, retry policies, mapping, schedules, quotas and a full audit trail. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <section className={styles.grid} aria-label="Connectors primitives">
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
