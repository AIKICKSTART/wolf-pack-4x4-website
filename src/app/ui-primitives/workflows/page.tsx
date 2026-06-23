import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./workflows.module.css"

export const metadata: Metadata = {
  title: "Workflow Builder | UI Primitives",
  description:
    "Workflow / pipeline builder primitives — canvas, node cards (trigger, action, condition, loop, wait, end), connection lines, palette rail, inspector pane, execution log, run history, variable explorer, toolbar, and full-builder composition.",
}

interface WorkflowScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<WorkflowScene> = [
  {
    kicker: "Primitive 01",
    title: "Workflow canvas",
    body: "Dotted-grid canvas surface that hosts nodes positioned via absolute coordinates with a soft zoom-out feel.",
    href: "/ui-primitives/workflows/canvas",
    accent: "neutral",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Trigger node",
    body: "Amber trigger card with bolt icon, name, optional source meta, pulsing live state, single output port.",
    href: "/ui-primitives/workflows/node-trigger",
    accent: "amber",
    glyph: "⚡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Action node",
    body: "Teal action card with cog icon, service meta, optional running spinner, input + output ports.",
    href: "/ui-primitives/workflows/node-action",
    accent: "teal",
    glyph: "◎",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Condition node",
    body: "Green branching card with expression chip and true / false ports labelled at top and bottom.",
    href: "/ui-primitives/workflows/node-condition",
    accent: "green",
    glyph: "◇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Loop node",
    body: "Red For-Each block with iteration label, side output, loop-back port on the bottom edge.",
    href: "/ui-primitives/workflows/node-loop",
    accent: "red",
    glyph: "↻",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Wait node",
    body: "Compact amber delay card with clock icon and duration text plus optional schedule chip.",
    href: "/ui-primitives/workflows/node-wait",
    accent: "amber",
    glyph: "⏱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "End node",
    body: "Neutral terminal card with flag icon, optional outcome, single input port — closes a branch.",
    href: "/ui-primitives/workflows/node-end",
    accent: "neutral",
    glyph: "⚑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Connection line",
    body: "SVG bezier with animated dashed flow direction and an optional midpoint label chip.",
    href: "/ui-primitives/workflows/connection-line",
    accent: "teal",
    glyph: "↝",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Palette rail",
    body: "Left rail with categorised node types — triggers, actions, logic, time, output — and search.",
    href: "/ui-primitives/workflows/palette-rail",
    accent: "amber",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Inspector pane",
    body: "Right inspector with kind chip, tabs (Config / Test / Notes), advanced expand, delete + test buttons.",
    href: "/ui-primitives/workflows/inspector-pane",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 11",
    title: "Execution log",
    body: "Bottom pane with timestamped entries, status icons, durations, auto-animated appends.",
    href: "/ui-primitives/workflows/execution-log",
    accent: "green",
    glyph: "▤▤",
    state: "Stateful · live",
  },
  {
    kicker: "Primitive 12",
    title: "Run history table",
    body: "Sortable table of past runs — timestamp, trigger, status chip, duration, view link.",
    href: "/ui-primitives/workflows/run-history",
    accent: "neutral",
    glyph: "⏍",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 13",
    title: "Variable explorer",
    body: "Collapsible tree of available variables with type chips and copy-on-click `{{token}}` chips.",
    href: "/ui-primitives/workflows/variable-explorer",
    accent: "teal",
    glyph: "{ }",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 14",
    title: "Workflow toolbar",
    body: "Top bar — workflow name, status chip cycle, version meta, undo/redo, share, test-run, save.",
    href: "/ui-primitives/workflows/toolbar",
    accent: "red",
    glyph: "▭▭▭",
    state: "Stateful · status",
  },
  {
    kicker: "Composition",
    title: "Full workflow builder scene",
    body: "Toolbar + palette rail + canvas (Trigger → Condition → Action / Action → Wait → End) + inspector + execution log.",
    href: "/ui-primitives/workflows/full-builder",
    accent: "red",
    glyph: "≣⚡↻",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<WorkflowScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function WorkflowsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Workflows / 14 primitives + composition"
        title="Workflow / pipeline builder primitives"
        description="Visual primitives for an n8n / Zapier-style workflow builder — canvas, node cards across the trigger / action / condition / loop / wait / end family, connection lines, palette rail, inspector pane, execution log, run history, variable explorer, and toolbar. Visual references — no real execution wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real execution wired
      </span>

      <FormPatternReferences
        ids={["builder-editor-admin-rules", "notification-permissions"]}
      />

      <section className={styles.grid} aria-label="Workflow primitives">
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
