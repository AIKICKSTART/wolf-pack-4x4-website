import { AlertTriangle } from "lucide-react"
import { useMemo, type CSSProperties } from "react"

import { ProgressRadial } from "../primitives"

import {
  SEO_STATUS_LABEL,
  SEO_STATUS_TONE,
  TONE_HEX,
  type SeoCheck,
  type SeoCheckStatus,
} from "./cms-types"

import styles from "./seo-checklist.module.css"

export interface SeoChecklistProps {
  pageTitle: string
  url: string
  checks: ReadonlyArray<SeoCheck>
  loading?: boolean
  error?: string
  className?: string
}

const STATUS_ORDER: ReadonlyArray<SeoCheckStatus> = ["pass", "warn", "fail", "skip"]

export function SeoChecklist({
  pageTitle,
  url,
  checks,
  loading = false,
  error,
  className,
}: SeoChecklistProps) {
  const counts = useMemo(() => {
    const acc: Record<SeoCheckStatus, number> = { pass: 0, warn: 0, fail: 0, skip: 0 }
    checks.forEach((check) => {
      acc[check.status] += 1
    })
    return acc
  }, [checks])

  const total = checks.length
  const completion = total === 0 ? 0 : Math.round((counts.pass / total) * 100)
  const tone: "red" | "amber" | "teal" | "green" =
    counts.fail > 0 ? "red" : counts.warn > 0 ? "amber" : completion >= 80 ? "green" : "teal"

  const classes = [styles.checklist, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`SEO checks for ${pageTitle}`}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>SEO checklist · {url}</span>
          <span className={styles.heading}>{pageTitle}</span>
        </div>
        <div className={styles.score}>
          <ProgressRadial
            value={completion}
            tone={tone}
            size="md"
            showLabel
            label={`${completion}% passing`}
          />
        </div>
      </header>

      {error ? (
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Crawl failed</strong>
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className={styles.summary} role="list" aria-label="Check summary">
            {STATUS_ORDER.map((status) => {
              const toneHex = TONE_HEX[SEO_STATUS_TONE[status]]
              return (
                <div
                  key={status}
                  className={styles.summaryCell}
                  role="listitem"
                  style={{ "--cell-tone": toneHex } as CSSProperties}
                >
                  <span className={styles.summaryLabel}>{SEO_STATUS_LABEL[status]}</span>
                  <span className={styles.summaryCount}>{counts[status]}</span>
                </div>
              )
            })}
          </div>

          <div className={styles.list} role="list">
            {loading
              ? null
              : checks.map((check) => {
                  const toneHex = TONE_HEX[SEO_STATUS_TONE[check.status]]
                  return (
                    <article
                      key={check.id}
                      className={styles.row}
                      role="listitem"
                      style={{ "--row-tone": toneHex } as CSSProperties}
                    >
                      <span className={styles.dot} aria-hidden="true" />
                      <div className={styles.body}>
                        <span className={styles.label}>{check.label}</span>
                        <p className={styles.detail}>{check.detail}</p>
                      </div>
                      <span className={styles.statusTag}>{SEO_STATUS_LABEL[check.status]}</span>
                    </article>
                  )
                })}
          </div>
        </>
      )}

      <footer className={styles.footer}>
        <span>Mufflermen SEO playbook</span>
        <span>{completion}% complete</span>
      </footer>
    </section>
  )
}

export default SeoChecklist
