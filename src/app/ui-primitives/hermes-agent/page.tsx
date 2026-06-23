import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Hermes agent control plane | UI Primitives",
  description:
    "Hermes agent control-plane primitives for the Mufflermen workshop — chat panel, run timeline, tool palette, automation rules, knowledge sources, persona editor, handoff cards, evaluation rubric, prompt templates, cost budget, safety filters, live conversations, escalation queue, transcript viewer and a composed operations console.",
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
    title: "Agent chat panel",
    body:
      "Branded multi-turn chat with streaming, citation chips and tool-call trace. Hermes red crest + channel chip strip.",
    href: "/ui-primitives/hermes-agent/agent-chat-panel",
    accent: "red",
    glyph: "Hχ",
    state: "Stateful · streaming",
  },
  {
    kicker: "Primitive 02",
    title: "Run timeline",
    body:
      "Single agent run timeline — plan → tool calls → reflection → response. Token + cost summary header.",
    href: "/ui-primitives/hermes-agent/run-timeline",
    accent: "teal",
    glyph: "│▶",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Tool palette",
    body:
      "Available tool cards — quote.estimate, parts.search, bookings.create, payment.collect, refund.process, escalate.to_human — with usage counts and sparklines.",
    href: "/ui-primitives/hermes-agent/tool-palette",
    accent: "teal",
    glyph: "[⌬]",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Automation rule card",
    body:
      "Trigger / condition / action flow with on-off toggle and recent run history chips.",
    href: "/ui-primitives/hermes-agent/automation-rule-card",
    accent: "green",
    glyph: "⇋",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 05",
    title: "Knowledge source row",
    body:
      "Connected source — CMS docs, Drive, supplier feeds, transcripts — with sync status, records and re-sync trigger.",
    href: "/ui-primitives/hermes-agent/knowledge-source-row",
    accent: "amber",
    glyph: "≡⟳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Persona editor",
    body:
      "Agent persona panel — tone, refusals, hours, escalation paths. Versioned with read-only fallback.",
    href: "/ui-primitives/hermes-agent/persona-editor",
    accent: "violet",
    glyph: "ψ",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 07",
    title: "Handoff card",
    body:
      "Agent → human handoff with reason, assigned human and SLA countdown. Accept action.",
    href: "/ui-primitives/hermes-agent/handoff-card",
    accent: "amber",
    glyph: "⇄✱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Evaluation rubric grid",
    body:
      "Quality scoring grid — accuracy / tone / safety / resolution for sampled runs with overall + chip grade.",
    href: "/ui-primitives/hermes-agent/evaluation-rubric-grid",
    accent: "teal",
    glyph: "▦▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Prompt template card",
    body:
      "Versioned prompt template with test cases + win-rate vs prior version. Sparkline trend tail.",
    href: "/ui-primitives/hermes-agent/prompt-template-card",
    accent: "teal",
    glyph: "{{·}}",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Cost budget panel",
    body:
      "Token / cost budget with burn rate, hourly bar chart and projected end-of-day spend.",
    href: "/ui-primitives/hermes-agent/cost-budget-panel",
    accent: "green",
    glyph: "$◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Safety filter strip",
    body:
      "Pre + post moderation filter chain with hit counts and per-filter pass-through rate chip.",
    href: "/ui-primitives/hermes-agent/safety-filter-strip",
    accent: "amber",
    glyph: "△!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Live conversation row",
    body:
      "Active conversation row — channel, customer, queue time, last message, Hermes confidence.",
    href: "/ui-primitives/hermes-agent/live-conversation-row",
    accent: "red",
    glyph: "○●",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 13",
    title: "Escalation queue card",
    body:
      "Escalation queue with priority lane badge, reason and assigned human handler.",
    href: "/ui-primitives/hermes-agent/escalation-queue-card",
    accent: "red",
    glyph: "↑‼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Transcript viewer",
    body:
      "Conversation transcript reader with tool-call + citation expand chips. Read-only snapshot.",
    href: "/ui-primitives/hermes-agent/transcript-viewer",
    accent: "violet",
    glyph: "⟪⟫",
    state: "Stateful · expand",
  },
  {
    kicker: "Composition",
    title: "Full Hermes control plane",
    body:
      "Composed operations console — live conversations + active chat + run inspector + escalation queue + tool palette + cost + safety + persona.",
    href: "/ui-primitives/hermes-agent/full-control-plane",
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

export default function HermesAgentIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Hermes agent / 14 primitives + composition"
        title="Hermes agent control plane"
        description="The Hermes agent control-plane primitive family — the workshop's customer-facing AI assistant, re-skinned in the Mufflermen system and extended into a full operations console. Realistic scenarios with Mick's Hilux N80 cat-back, Leah's Commodore SS quote follow-up, the Manta DPF warranty rattle, and an after-hours M1 emergency handoff. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real Hermes backend wired
      </span>

      <section className={styles.grid} aria-label="Hermes agent primitives">
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
