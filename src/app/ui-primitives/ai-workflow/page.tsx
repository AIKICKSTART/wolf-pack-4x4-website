import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./ai-workflow.module.css"

export const metadata: Metadata = {
  title: "AI workflow builder | UI Primitives",
  description:
    "AI workflow builder primitives for the Mufflermen workshop — flow canvas, prompt blocks, model selector, tool blocks, RAG vector search, output gates, parallel branches, eval runner, agent loops, version history, cost projection, safety checks, triggers and a composed live workflow studio.",
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
    title: "Flow canvas",
    body:
      "Node/edge canvas with pan + zoom + grid + minimap. Quote estimator flow on display — drag the surface, jog the zoom.",
    href: "/ui-primitives/ai-workflow/flow-canvas",
    accent: "violet",
    glyph: "▢→▢",
    state: "Stateful · pan/zoom",
  },
  {
    kicker: "Primitive 02",
    title: "Prompt block",
    body:
      "System + user prompt editor with variable scope chips and a live token-budget meter that shifts tone on overflow.",
    href: "/ui-primitives/ai-workflow/prompt-block",
    accent: "teal",
    glyph: "{{·}}",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 03",
    title: "Model selector",
    body:
      "Card picker — Claude Opus 4.7, GPT-4o, Gemini Flash, Llama 70B — with cost-per-1M and latency badges.",
    href: "/ui-primitives/ai-workflow/model-selector",
    accent: "violet",
    glyph: "λ◆",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 04",
    title: "Tool block",
    body:
      "Tool-call block with JSON schema preview, result→scope mapping rows, retry + timeout policy chips.",
    href: "/ui-primitives/ai-workflow/tool-block",
    accent: "amber",
    glyph: "⌬→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Output gate",
    body:
      "Validation gate with regex / JSON-schema / eval-fn strategies. Pass-rate summary + recent decisions log.",
    href: "/ui-primitives/ai-workflow/output-gate",
    accent: "amber",
    glyph: "◇✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Parallel branch",
    body:
      "Fan-out lane group with first / wait-all / race-best-score join strategies. Latency + per-lane status chips.",
    href: "/ui-primitives/ai-workflow/parallel-branch",
    accent: "neutral",
    glyph: "Y‖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Eval runner card",
    body:
      "Eval suite runner with rubric × sample-input scoreboard, weighted overall and a pass-threshold gauge.",
    href: "/ui-primitives/ai-workflow/eval-runner-card",
    accent: "teal",
    glyph: "▦▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Chain step row",
    body:
      "Single chain step with input/output preview, token spend, USD cost and latency chip. Status-driven tone.",
    href: "/ui-primitives/ai-workflow/chain-step-row",
    accent: "teal",
    glyph: "│▸",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Vector search block",
    body:
      "RAG block — embedding model + index handle + top-K + rerank toggle. Hits with similarity + rerank scores.",
    href: "/ui-primitives/ai-workflow/vector-search-block",
    accent: "teal",
    glyph: "≡∴",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Agent loop card",
    body:
      "Agentic loop card with max-iterations radial, halt-condition chips and expand-on-click thought traces.",
    href: "/ui-primitives/ai-workflow/agent-loop-card",
    accent: "violet",
    glyph: "↻ψ",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 11",
    title: "Prompt version history",
    body:
      "Versioned prompt history with win-rate per version, run count and a trailing sparkline trend.",
    href: "/ui-primitives/ai-workflow/prompt-version-history",
    accent: "teal",
    glyph: "│⌖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Cost projection tile",
    body:
      "Projected USD or AUD cost per run / day / month — driven by model pricing, token mix and run volume.",
    href: "/ui-primitives/ai-workflow/cost-projection-tile",
    accent: "green",
    glyph: "$◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Safety check block",
    body:
      "Moderation / PII / jailbreak / topic-fence rules with on-hit action chips (block · redact · flag · escalate).",
    href: "/ui-primitives/ai-workflow/safety-check-block",
    accent: "red",
    glyph: "△!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Flow trigger card",
    body:
      "Webhook / cron / event-bus / manual trigger card with config, sample payload and armed/disarmed state.",
    href: "/ui-primitives/ai-workflow/flow-trigger-card",
    accent: "green",
    glyph: "⚡▶",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full AI workflow studio",
    body:
      "Composed live builder — trigger + flow canvas + prompt + model + RAG + chain + gate + eval + cost + safety + history.",
    href: "/ui-primitives/ai-workflow/full-builder",
    accent: "violet",
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

export default function AiWorkflowIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI workflow / 14 primitives + composition"
        title="AI workflow builder"
        description="The AI workflow builder primitive family — a visual studio for designing what Hermes can do and what marketing automations run on the AI layer. Realistic scenarios: a Quote estimator (RAG over parts catalogue → claude-opus-4.7 → JSON validate), an SMS triage agent loop, and a Monday-morning blog draft fan-out. Visual reference only — no real models invoked."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real models invoked
      </span>

      <section className={styles.grid} aria-label="AI workflow primitives">
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
