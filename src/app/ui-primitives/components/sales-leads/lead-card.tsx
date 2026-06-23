"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { LeadScoreChip } from "../crm/lead-score-chip"
import type { LeadScoreBreakdown } from "../crm/lead-score-chip"
import {
  LEAD_SOURCE_GLYPH,
  LEAD_SOURCE_LABEL,
  LEAD_SOURCE_TONE,
  type LeadSource,
} from "./sales-leads-types"

import styles from "./lead-card.module.css"

interface LeadCardProps {
  id: string
  name: string
  vehicle: string
  source: LeadSource
  score: number
  /** Optional score factor breakdown to drive the score chip popover. */
  scoreBreakdown?: ReadonlyArray<LeadScoreBreakdown>
  /** ISO timestamp for the first touch. */
  firstTouch: string
  firstTouchIso?: string
  assignedToName: string
  assignedToInitials?: string
  /** Optional sub-line below the vehicle (e.g. "Manta 2.5in cat-back"). */
  inquiryAbout?: string
  className?: string
}

export function LeadCard({
  id,
  name,
  vehicle,
  source,
  score,
  scoreBreakdown,
  firstTouch,
  firstTouchIso,
  assignedToName,
  assignedToInitials,
  inquiryAbout,
  className,
}: LeadCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-lead-id={id}
      aria-label={`Lead: ${name}, ${vehicle}, source ${LEAD_SOURCE_LABEL[source]}`}
    >
      <header className={styles.head}>
        <Avatar name={name} size="md" tone="red" />
        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.vehicle}>{vehicle}</span>
        </div>
        <div className={styles.chips}>
          <Chip
            label={`${LEAD_SOURCE_GLYPH[source]} ${LEAD_SOURCE_LABEL[source]}`}
            tone={LEAD_SOURCE_TONE[source]}
          />
          <LeadScoreChip score={score} breakdown={scoreBreakdown} />
        </div>
      </header>

      {inquiryAbout ? (
        <p className={styles.inquiry}>
          <span className={styles.inquiryLabel}>Inquiry</span>
          <span>{inquiryAbout}</span>
        </p>
      ) : null}

      <footer className={styles.foot}>
        <div className={styles.fact}>
          <span className={styles.factLabel}>First touch</span>
          <time
            className={styles.factValue}
            dateTime={firstTouchIso ?? firstTouch}
          >
            {firstTouch}
          </time>
        </div>
        <div className={styles.fact}>
          <span className={styles.factLabel}>Assigned</span>
          <span className={styles.assigned}>
            <span className={styles.assignedDot} aria-hidden="true">
              {assignedToInitials ?? assignedToName.slice(0, 2).toUpperCase()}
            </span>
            <span>{assignedToName}</span>
          </span>
        </div>
      </footer>
    </article>
  )
}

export default LeadCard
