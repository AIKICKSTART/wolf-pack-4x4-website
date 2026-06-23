"use client"

import { useId, useState } from "react"

import {
  SANCTIONS_STATUS_LABEL,
  type SanctionsStatus,
} from "./kyc-types"
import styles from "./sanctions-screen-result.module.css"

export interface SanctionsMatchRecord {
  id: string
  /** Matched entity name. */
  name: string
  /** Matching list name, e.g. "AUSTRAC PEP", "OFAC SDN". */
  list: string
  /** Confidence percentage 0-100. */
  confidence: number
  /** Optional details summary, e.g. country, role. */
  notes?: string
}

export interface SanctionsScreenResultProps {
  /** Eyebrow label. */
  kicker: string
  /** Entity name screened, e.g. "Daniel Fleuren". */
  subject: string
  status: SanctionsStatus
  /** Scan timestamp in plain text, e.g. "28 May 2026, 09:14 AEST". */
  scannedAt: string
  /** List of matches; required when status is "hit" or "review". */
  matches?: ReadonlyArray<SanctionsMatchRecord>
  /** Initial expanded state for the matches accordion. */
  defaultExpanded?: boolean
  className?: string
}

export function SanctionsScreenResult({
  kicker,
  subject,
  status,
  scannedAt,
  matches = [],
  defaultExpanded = false,
  className,
}: SanctionsScreenResultProps) {
  const groupId = useId()
  const [open, setOpen] = useState<boolean>(defaultExpanded)
  const classes = [styles.card, styles[`tone_${status}`], className]
    .filter(Boolean)
    .join(" ")

  const showMatches = status !== "clear" && matches.length > 0

  return (
    <section
      className={classes}
      data-status={status}
      role={status === "hit" ? "alert" : undefined}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>{kicker}</span>
          <h3 className={styles.subject}>{subject}</h3>
          <span className={styles.scannedAt}>Scanned {scannedAt}</span>
        </div>
        <span className={styles.statusChip} data-status={status}>
          {SANCTIONS_STATUS_LABEL[status]}
        </span>
      </header>

      <dl className={styles.summary}>
        <div className={styles.summaryRow}>
          <dt>Lists checked</dt>
          <dd>AUSTRAC · OFAC · UN · DFAT · UK HMT · EU CFSP</dd>
        </div>
        <div className={styles.summaryRow}>
          <dt>Matches</dt>
          <dd>
            <strong>{matches.length}</strong>{" "}
            {matches.length === 1 ? "record" : "records"}
          </dd>
        </div>
      </dl>

      {showMatches ? (
        <div className={styles.accordion}>
          <button
            type="button"
            className={styles.accordionToggle}
            aria-expanded={open}
            aria-controls={`${groupId}-matches`}
            onClick={() => setOpen((p) => !p)}
          >
            <span>{open ? "Hide" : "Show"} matched records</span>
            <span aria-hidden="true" className={styles.chevron} data-open={open}>
              ▾
            </span>
          </button>
          {open ? (
            <ul id={`${groupId}-matches`} className={styles.matchList}>
              {matches.map((match) => (
                <li key={match.id} className={styles.matchItem}>
                  <div className={styles.matchHead}>
                    <span className={styles.matchName}>{match.name}</span>
                    <span className={styles.confidence}>
                      {Math.round(match.confidence)}% match
                    </span>
                  </div>
                  <span className={styles.matchList_name}>{match.list}</span>
                  {match.notes ? (
                    <span className={styles.matchNotes}>{match.notes}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export default SanctionsScreenResult
