import type { Metadata } from "next"

import {
  RunHistoryTable,
  type WorkflowRun,
} from "../../components/workflows"
import { PageHeader } from "../../components/page-header"

import styles from "../workflows.module.css"

export const metadata: Metadata = {
  title: "Run history | Workflows",
  description:
    "Primitive 12 — Sortable table of past workflow runs with timestamp, trigger summary, status chip, duration, and view link.",
}

const RUNS: ReadonlyArray<WorkflowRun> = [
  {
    id: "run_h31n",
    startedAt: "2026-05-28 09:42:04",
    trigger: "New booking · Webhook",
    status: "running",
    duration: "—",
  },
  {
    id: "run_h2zb",
    startedAt: "2026-05-28 09:18:30",
    trigger: "New booking · Webhook",
    status: "success",
    duration: "2.4s",
  },
  {
    id: "run_h2yk",
    startedAt: "2026-05-28 08:01:00",
    trigger: "Daily 8am · Cron",
    status: "success",
    duration: "12.8s",
  },
  {
    id: "run_h2x4",
    startedAt: "2026-05-27 19:11:42",
    trigger: "Manual test run",
    status: "skipped",
    duration: "0.3s",
  },
  {
    id: "run_h2vp",
    startedAt: "2026-05-27 14:33:18",
    trigger: "New booking · Webhook",
    status: "failed",
    duration: "4.1s",
  },
  {
    id: "run_h2u9",
    startedAt: "2026-05-27 09:42:04",
    trigger: "New booking · Webhook",
    status: "success",
    duration: "2.1s",
  },
  {
    id: "run_h2sl",
    startedAt: "2026-05-26 17:02:11",
    trigger: "Manual test run",
    status: "cancelled",
    duration: "—",
  },
  {
    id: "run_h2qe",
    startedAt: "2026-05-26 11:08:55",
    trigger: "New booking · Webhook",
    status: "success",
    duration: "2.6s",
  },
  {
    id: "run_h2py",
    startedAt: "2026-05-26 08:01:00",
    trigger: "Daily 8am · Cron",
    status: "queued",
    duration: "—",
  },
  {
    id: "run_h2nx",
    startedAt: "2026-05-25 16:47:32",
    trigger: "New booking · Webhook",
    status: "success",
    duration: "2.0s",
  },
]

export default function RunHistoryScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Run history"
        title="Run history table"
        description="A sortable table listing past workflow runs. Columns: timestamp split as time + date, trigger summary with run id, status chip with tone, duration chip, and a view link. Reuses the existing `DataTable` primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflows", href: "/ui-primitives/workflows" },
          { label: "Run history" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — last 10 runs</span>
        <RunHistoryTable runs={RUNS} />
      </section>
    </main>
  )
}
