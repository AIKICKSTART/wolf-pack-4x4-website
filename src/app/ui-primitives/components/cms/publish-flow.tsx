import { AlertTriangle, Calendar, CheckCircle2, GitBranch, Send } from "lucide-react"
import type { CSSProperties } from "react"

import { ProgressLinear } from "../primitives"

import {
  PAGE_STATE_LABEL,
  TONE_HEX,
  type PagePublishState,
} from "./cms-types"

import styles from "./publish-flow.module.css"

const STAGE_ORDER: ReadonlyArray<PagePublishState> = [
  "draft",
  "review",
  "scheduled",
  "published",
]

const STAGE_TONE: Record<PagePublishState, "red" | "amber" | "teal" | "green" | "neutral"> = {
  draft: "neutral",
  review: "amber",
  scheduled: "teal",
  published: "green",
  archived: "red",
}

const STAGE_DESCRIPTION: Record<PagePublishState, string> = {
  draft: "Work in progress, only visible to editors.",
  review: "Awaiting brand + content sign-off.",
  scheduled: "Queued for an automated publish window.",
  published: "Live for customers visiting the workshop site.",
  archived: "Removed from sitemap and search index.",
}

export interface PublishFlowProps {
  pageTitle: string
  slug: string
  state: PagePublishState
  /** Currently assigned reviewer initials, e.g. "DF". */
  reviewer?: string
  /** ISO-ish display string, e.g. "29 May · 06:00 AEST". */
  scheduledFor?: string
  /** Branch label to mirror Git-backed CMS deployments. */
  branch?: string
  /** Number of pending PR-style change requests. */
  changeRequests?: number
  error?: string
  className?: string
}

export function PublishFlow({
  pageTitle,
  slug,
  state,
  reviewer,
  scheduledFor,
  branch = "main",
  changeRequests = 0,
  error,
  className,
}: PublishFlowProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const activeIndex = STAGE_ORDER.indexOf(state)
  const safeIndex = activeIndex < 0 ? 0 : activeIndex
  const progress = state === "published" ? 100 : ((safeIndex + 1) / STAGE_ORDER.length) * 100

  return (
    <section className={classes} aria-label={`Publish flow for ${pageTitle}`}>
      <header className={styles.header}>
        <span className={styles.kicker}>Publish flow · /{slug}</span>
        <span className={styles.title}>
          {pageTitle} — {PAGE_STATE_LABEL[state]}
        </span>
      </header>

      {error ? (
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Publish pipeline halted</strong>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <ProgressLinear
            value={progress}
            tone={STAGE_TONE[state] === "neutral" ? "teal" : STAGE_TONE[state] === "red" ? "red" : STAGE_TONE[state]}
            variant="solid"
            label={`Stage ${safeIndex + 1} of ${STAGE_ORDER.length}`}
            showLabel
          />

          <div className={styles.stages} role="list" aria-label="Publish stages">
            {STAGE_ORDER.map((stage, index) => {
              const tone = TONE_HEX[STAGE_TONE[stage]]
              const isActive = index === safeIndex
              const isCompleted = index < safeIndex
              const stageClass = [
                styles.stage,
                isActive ? styles.stageActive : "",
                isCompleted ? styles.stageCompleted : "",
              ]
                .filter(Boolean)
                .join(" ")
              return (
                <div
                  key={stage}
                  className={stageClass}
                  role="listitem"
                  aria-current={isActive ? "step" : undefined}
                  style={{ "--stage-tone": tone } as CSSProperties}
                >
                  <div className={styles.stageHeader}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stageDot} aria-hidden="true" />
                  </div>
                  <span className={styles.stageLabel}>{PAGE_STATE_LABEL[stage]}</span>
                  <p className={styles.stageDescription}>{STAGE_DESCRIPTION[stage]}</p>
                </div>
              )
            })}
          </div>

          <div className={styles.detail}>
            <span className={styles.detailLabel}>Next action</span>
            <p className={styles.detailValue}>
              {state === "draft" && "Submit to Mia P. for content review when copy is final."}
              {state === "review" && `Awaiting sign-off from ${reviewer ?? "DF"} — ${changeRequests} change request${changeRequests === 1 ? "" : "s"} open.`}
              {state === "scheduled" && `Auto-publish ${scheduledFor ?? "29 May · 06:00 AEST"} — cache will warm 5 min prior.`}
              {state === "published" && `Live on /${slug} — last deploy ${scheduledFor ?? "today"} from branch ${branch}.`}
              {state === "archived" && "Restore from revision timeline if needed."}
            </p>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <GitBranch size={11} strokeWidth={2.2} aria-hidden="true" /> {branch}
              </span>
              <span className={styles.metaItem}>
                <Calendar size={11} strokeWidth={2.2} aria-hidden="true" /> {scheduledFor ?? "—"}
              </span>
              <span className={styles.metaItem}>
                <CheckCircle2 size={11} strokeWidth={2.2} aria-hidden="true" /> Reviewer {reviewer ?? "—"}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} aria-label="Save draft">
              Save draft
            </button>
            <button type="button" className={styles.actionBtn} aria-label="Send for review">
              Send for review
            </button>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.actionPrimary}`}
              aria-label="Publish page"
            >
              <Send size={11} strokeWidth={2.4} aria-hidden="true" /> Publish
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default PublishFlow
