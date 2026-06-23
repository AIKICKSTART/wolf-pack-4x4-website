import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./api-console.module.css"

export const metadata: Metadata = {
  title: "API Console | UI Primitives",
  description:
    "Fourteen reusable API + webhooks console primitives — endpoint cards, key manager, webhook subscribers, retry queue, request inspector, rate-limit gauge, quota meter, explorer playground, status chips, auth chips, CORS editor, OAuth app card, and signing-secret rows.",
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
    title: "Endpoint card",
    body: "REST endpoint card — METHOD chip, path, description, version, auth method, try-it CTA.",
    href: "/ui-primitives/api-console/endpoint-card",
    accent: "teal",
    role: "Surface",
  },
  {
    kicker: "Primitive 02",
    title: "API key manager",
    body: "Full key management — list, create, rotate, revoke, scope editor, last-used metadata.",
    href: "/ui-primitives/api-console/api-key-manager",
    accent: "amber",
    role: "Management",
  },
  {
    kicker: "Primitive 03",
    title: "Webhook subscriber",
    body: "Subscriber row — URL, event chips, status, last delivery, masked secret, edit/revoke.",
    href: "/ui-primitives/api-console/webhook-subscriber-row",
    accent: "teal",
    role: "Webhooks",
  },
  {
    kicker: "Primitive 04",
    title: "Webhook event log",
    body: "Event log table — timestamp, event, endpoint, status, duration, retry chip, payload expand.",
    href: "/ui-primitives/api-console/webhook-event-log",
    accent: "amber",
    role: "Webhooks",
  },
  {
    kicker: "Primitive 05",
    title: "Retry queue",
    body: "Retry queue — pending retries with backoff schedule, manual retry, abandon control.",
    href: "/ui-primitives/api-console/webhook-retry-queue",
    accent: "red",
    role: "Webhooks",
  },
  {
    kicker: "Primitive 06",
    title: "Request / response inspector",
    body: "Split panel — request on left (method, URL, headers, body) and response on right.",
    href: "/ui-primitives/api-console/request-response-inspector",
    accent: "teal",
    role: "Debug",
  },
  {
    kicker: "Primitive 07",
    title: "Rate limit gauge",
    body: "Live rate-limit meter — requests-per-minute, burst capacity chip, throttle warning.",
    href: "/ui-primitives/api-console/rate-limit-gauge",
    accent: "amber",
    role: "Telemetry",
  },
  {
    kicker: "Primitive 08",
    title: "Quota meter",
    body: "Monthly quota meter — used / limit / overage with tone-shifting progress bar.",
    href: "/ui-primitives/api-console/quota-meter",
    accent: "green",
    role: "Billing",
  },
  {
    kicker: "Primitive 09",
    title: "Explorer playground",
    body: "Postman-style request builder — method, URL, params, headers, body, send, response.",
    href: "/ui-primitives/api-console/api-explorer-playground",
    accent: "red",
    role: "Debug",
  },
  {
    kicker: "Primitive 10",
    title: "HTTP status chip",
    body: "Tiny HTTP status chip — 2xx, 3xx, 4xx, 5xx tones with reason phrase.",
    href: "/ui-primitives/api-console/http-status-chip",
    accent: "green",
    role: "Atom",
  },
  {
    kicker: "Primitive 11",
    title: "Auth method chip",
    body: "Auth method chip — Bearer, Basic, API Key, mTLS, OIDC with signature preview popover.",
    href: "/ui-primitives/api-console/auth-method-chip",
    accent: "amber",
    role: "Atom",
  },
  {
    kicker: "Primitive 12",
    title: "CORS policy editor",
    body: "CORS rules — origins tag-input, methods chips, headers tag-input, credentials toggle.",
    href: "/ui-primitives/api-console/cors-policy-editor",
    accent: "teal",
    role: "Configuration",
  },
  {
    kicker: "Primitive 13",
    title: "OAuth app card",
    body: "OAuth app — client name, masked client-id, redirect URIs, scopes, status.",
    href: "/ui-primitives/api-console/oauth-app-card",
    accent: "red",
    role: "OAuth",
  },
  {
    kicker: "Primitive 14",
    title: "Signing secret row",
    body: "Webhook signing secret — masked secret, algorithm chip, rotate, last rotation date.",
    href: "/ui-primitives/api-console/webhook-signing-secret-row",
    accent: "amber",
    role: "Webhooks",
  },
  {
    kicker: "Bonus",
    title: "Full console composition",
    body: "Explorer, endpoint list, key manager, webhook subscribers, event log, rate limits.",
    href: "/ui-primitives/api-console/full-console",
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
      <rect x="6" y="14" width="86" height="72" rx="10" fill="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)" />
      <rect x="14" y="22" width="40" height="6" rx="2" fill="var(--primitive-teal)" opacity="0.78" />
      <rect x="14" y="34" width="64" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />
      <rect x="14" y="44" width="48" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
      <rect x="14" y="58" width="22" height="6" rx="2" fill="var(--primitive-green)" opacity="0.85" />
      <rect x="42" y="58" width="38" height="6" rx="2" fill="var(--primitive-amber)" opacity="0.78" />
      <rect x="14" y="70" width="58" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
      <g transform="translate(108 18)">
        <rect x="0" y="0" width="84" height="64" rx="8" fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)" stroke="color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)" />
        <circle cx="14" cy="14" r="4" fill="var(--primitive-green)" />
        <rect x="24" y="11" width="48" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
        <rect x="8" y="26" width="68" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 14%, transparent)" />
        <rect x="8" y="34" width="44" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
        <rect x="8" y="44" width="68" height="12" rx="3" fill="var(--primitive-amber)" opacity="0.18" />
        <rect x="8" y="44" width="42" height="12" rx="3" fill="var(--primitive-amber)" opacity="0.6" />
      </g>
    </svg>
  )
}

export default function ApiConsoleIndexPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="29 / API console"
        title="API + webhooks console"
        description="Fourteen reusable console primitives for the Oak Flats Mufflermen REST + webhook surface — endpoint cards, a key manager, webhook subscribers, an event log, a retry queue, a request/response inspector, rate-limit and quota meters, a Postman-style explorer playground, HTTP and auth chips, a CORS policy editor, an OAuth app card, and signing-secret rows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console" },
        ]}
      />

      <span className={styles.notice}>
        API console — distinct from docs. Operational surface for keys, webhooks, and limits.
      </span>

      <section className={styles.grid} aria-label="API console primitives index">
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
