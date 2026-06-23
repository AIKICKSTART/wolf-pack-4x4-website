import type { Metadata } from "next"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock,
  Wrench,
} from "lucide-react"

import { GaugeCluster, RadialMeter } from "../../components/charts"
import { ButtonDnaLink } from "../../components/button-dna-link"

import styles from "./job-readiness.module.css"

export const metadata: Metadata = {
  title: "Job readiness checklist | UI Primitives — Sandbox",
  description:
    "Sandbox surface combining a radial-meter readiness ring with a three-up KPI gauge cluster and a live checklist.",
}

interface ChecklistItem {
  label: string
  detail: string
  state: "done" | "active" | "pending" | "blocked"
}

const checklist: ChecklistItem[] = [
  { label: "Underbody photos uploaded", detail: "12 frames · 2024-W22 set", state: "done" },
  { label: "Parts allocated from stockroom", detail: "Cat-back kit · O2 spacer · clamps", state: "done" },
  { label: "Hoist booked", detail: "Bay 2 · Sat 09:30 AEST", state: "active" },
  { label: "Customer countersigned ADR notice", detail: "Awaiting e-signature", state: "active" },
  { label: "Dyno strap reserved", detail: "Ramp · 15min slot", state: "pending" },
  { label: "Insurance reference on file", detail: "Blocked — insurer follow-up", state: "blocked" },
]

const doneCount = checklist.filter((item) => item.state === "done").length
const readyPct = Math.round((doneCount / checklist.length) * 100)

const stateMeta: Record<ChecklistItem["state"], { icon: typeof CheckCircle2; tone: string; label: string }> = {
  done: { icon: CheckCircle2, tone: "green", label: "Done" },
  active: { icon: CircleDot, tone: "teal", label: "In progress" },
  pending: { icon: Clock, tone: "amber", label: "Pending" },
  blocked: { icon: AlertTriangle, tone: "red", label: "Blocked" },
}

export default function JobReadinessSandbox() {
  return (
    <main className={styles.page} aria-labelledby="job-readiness-title">
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Sandbox · Job readiness primitive</span>
          <h1 id="job-readiness-title" className={styles.headline}>
            Pre-job readiness ring + KPI cluster
          </h1>
          <p className={styles.subhead}>
            Test bed for the readiness surface technicians will see on the workshop tablet before
            a vehicle hits the hoist. Radial meter shows overall completion; gauge cluster
            surfaces three measurable KPIs that decide whether the job actually starts on time.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)", justifyContent: "flex-end" }}>
          <ButtonDnaLink />
          <Link href="/ui-primitives/sandbox" className={styles.backLink}>
            <ArrowUpRight aria-hidden="true" />
            Back to sandbox
          </Link>
        </div>
      </header>

      <section className={styles.summary} aria-label="Readiness summary">
        <div className={styles.summaryRing}>
          <RadialMeter
            value={readyPct}
            label="Ready to start"
            tone={readyPct >= 80 ? "green" : readyPct >= 50 ? "amber" : "red"}
            ariaLabel={`Pre-job readiness at ${readyPct} percent`}
            size={180}
            caption={`${doneCount} of ${checklist.length} pre-flight items complete`}
          />
        </div>

        <div className={styles.summaryCopy}>
          <span className={styles.summaryKicker}>Job · J-4471 · VE SS cat-back</span>
          <strong className={styles.summaryHeadline}>Two items pending. One blocker.</strong>
          <p>
            The radial meter aggregates the six pre-flight checks below. Two amber items remain
            and one red blocker is waiting on the insurer — the bay should not be reserved until
            the red clears.
          </p>
        </div>

        <GaugeCluster
          ariaLabel="Workshop key performance indicators for the booked window"
          kicker="Workshop KPIs — booked window"
          scaleLabels={["Bay utilisation", "On-time start", "First-time-right"]}
          gauges={[
            { label: "Bay utilisation", value: 78, tone: "teal" },
            { label: "On-time start", value: 92, tone: "green" },
            { label: "First-time-right", value: 64, tone: "amber" },
          ]}
        />
      </section>

      <section className={styles.checklist} aria-label="Pre-flight checklist">
        <header className={styles.checklistHead}>
          <h2 className={styles.checklistTitle}>
            <Wrench aria-hidden="true" />
            Pre-flight checklist
          </h2>
          <span className={styles.checklistMeta}>{doneCount} of {checklist.length} complete</span>
        </header>

        <ol className={styles.checklistList}>
          {checklist.map((item, idx) => {
            const meta = stateMeta[item.state]
            const Icon = meta.icon
            return (
              <li key={item.label} className={styles.checklistRow} data-state={item.state} style={{ animationDelay: `${idx * 70}ms` }}>
                <span className={styles.checklistIcon} data-tone={meta.tone} aria-hidden="true">
                  <Icon />
                </span>
                <div className={styles.checklistCopy}>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </div>
                <span className={styles.checklistState} data-tone={meta.tone}>
                  {meta.label}
                </span>
              </li>
            )
          })}
        </ol>
      </section>
    </main>
  )
}
