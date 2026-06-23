import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./job-queue.module.css"

export const metadata: Metadata = {
  title: "Job queue | UI Primitives",
  description:
    "Fourteen reusable job queue / async tasks console primitives — Sidekiq/BullMQ-style queue dashboard for the Mufflermen async pipeline.",
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
    title: "Job row",
    body: "Single job row in a semantic table — id, kind, status, duration, attempts, view payload.",
    href: "/ui-primitives/job-queue/job-row",
    accent: "teal",
    role: "Atom",
  },
  {
    kicker: "Primitive 02",
    title: "Queue depth chart",
    body: "Live stacked depth across priority lanes over the last hour.",
    href: "/ui-primitives/job-queue/queue-depth-chart",
    accent: "teal",
    role: "Chart",
  },
  {
    kicker: "Primitive 03",
    title: "Worker status grid",
    body: "Worker pods with uptime, current job, and capacity meter.",
    href: "/ui-primitives/job-queue/worker-status-grid",
    accent: "green",
    role: "Telemetry",
  },
  {
    kicker: "Primitive 04",
    title: "Retry policy editor",
    body: "Max attempts, backoff strategy, base/max delay, on-error action.",
    href: "/ui-primitives/job-queue/retry-policy-editor",
    accent: "amber",
    role: "Configuration",
  },
  {
    kicker: "Primitive 05",
    title: "Failed jobs panel",
    body: "Recent failures with error class chip, stack-trace expand, retry/discard.",
    href: "/ui-primitives/job-queue/failed-jobs-panel",
    accent: "red",
    role: "Diagnostics",
  },
  {
    kicker: "Primitive 06",
    title: "Job retry button",
    body: "Retry job with confirmation modal and optional retry-from-step picker.",
    href: "/ui-primitives/job-queue/job-retry-button",
    accent: "amber",
    role: "Action",
  },
  {
    kicker: "Primitive 07",
    title: "Concurrency limits",
    body: "Per-queue concurrency cap with usage meter and adjust slider.",
    href: "/ui-primitives/job-queue/concurrency-limits-card",
    accent: "teal",
    role: "Configuration",
  },
  {
    kicker: "Primitive 08",
    title: "Timing distribution",
    body: "Histogram of job durations with p50/p90/p99 readouts and outlier chips.",
    href: "/ui-primitives/job-queue/job-timing-distribution",
    accent: "teal",
    role: "Chart",
  },
  {
    kicker: "Primitive 09",
    title: "Dead letter queue",
    body: "Stranded-job count, oldest message age, replay-all CTA, per-message inspect.",
    href: "/ui-primitives/job-queue/dead-letter-queue-card",
    accent: "red",
    role: "Diagnostics",
  },
  {
    kicker: "Primitive 10",
    title: "Job kind filter",
    body: "Filter chips by job kind with selected-counts chip.",
    href: "/ui-primitives/job-queue/job-kind-filter",
    accent: "teal",
    role: "Filter",
  },
  {
    kicker: "Primitive 11",
    title: "Priority indicator",
    body: "High / normal / low chips with backlog count per priority.",
    href: "/ui-primitives/job-queue/priority-queue-indicator",
    accent: "red",
    role: "Atom",
  },
  {
    kicker: "Primitive 12",
    title: "Scheduled jobs",
    body: "Upcoming scheduled jobs with countdown timers, edit/cancel actions.",
    href: "/ui-primitives/job-queue/scheduled-jobs-upcoming",
    accent: "amber",
    role: "Feed",
  },
  {
    kicker: "Primitive 13",
    title: "Autoscale meter",
    body: "Current N pods, target N pods, scale-out/scale-in cooldown chips.",
    href: "/ui-primitives/job-queue/worker-autoscale-meter",
    accent: "green",
    role: "Telemetry",
  },
  {
    kicker: "Primitive 14",
    title: "Pipeline visualization",
    body: "Multi-step async pipeline canvas with status and timing per step.",
    href: "/ui-primitives/job-queue/task-pipeline-visualization",
    accent: "teal",
    role: "Visualization",
  },
  {
    kicker: "Bonus",
    title: "Full queue console",
    body: "Every primitive in one operational dashboard — depth, workers, limits, failures, DLQ.",
    href: "/ui-primitives/job-queue/full-console",
    accent: "amber",
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
        <circle cx="14" cy="14" r="4" fill="var(--primitive-amber)" />
        <rect x="24" y="11" width="48" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
        <rect x="8" y="26" width="68" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 14%, transparent)" />
        <rect x="8" y="34" width="44" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
        <rect x="8" y="44" width="68" height="12" rx="3" fill="var(--primitive-red)" opacity="0.16" />
        <rect x="8" y="44" width="32" height="12" rx="3" fill="var(--primitive-red)" opacity="0.58" />
      </g>
    </svg>
  )
}

export default function JobQueueIndexPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="30 / Job queue"
        title="Job queue + async tasks console"
        description="Fourteen reusable primitives for the Oak Flats Mufflermen async pipeline — Sidekiq/BullMQ/Inngest-style queue dashboard. Live queue depth, worker fleet, retry policies, failed jobs, dead-letter inspection, timing distribution, autoscale meter, and a multi-step pipeline canvas."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Job queue" },
        ]}
      />

      <span className={styles.notice}>
        Job queue — distinct from workflow builder (visual DAG) and API console (HTTP).
      </span>

      <section className={styles.grid} aria-label="Job queue primitives index">
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
