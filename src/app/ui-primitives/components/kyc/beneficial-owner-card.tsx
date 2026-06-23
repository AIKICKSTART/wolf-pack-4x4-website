"use client"

import { useId, useState } from "react"

import {
  STATUS_LABEL,
  type VerificationStatus,
} from "./kyc-types"
import styles from "./beneficial-owner-card.module.css"

export interface BeneficialOwner {
  id: string
  /** Owner full name. */
  name: string
  /** Ownership percentage 0-100. */
  ownershipPct: number
  /** Role label, e.g. "Director", "Trustee", "UBO". */
  role: string
  status: VerificationStatus
}

export interface BeneficialOwnerCardProps {
  /** Eyebrow label, e.g. "Beneficial owners". */
  kicker: string
  /** Headline above the list. */
  title: string
  /** Body copy describing ownership thresholds (AUSTRAC 25% rule). */
  body: string
  /** Initial list of owners. */
  initialOwners: ReadonlyArray<BeneficialOwner>
  /** Optional add-owner CTA click handler. */
  onAddOwner?: () => void
  className?: string
}

const STATUS_TONE: Record<VerificationStatus, string> = {
  pending: "pending",
  "under-review": "review",
  approved: "approved",
  rejected: "rejected",
  "requires-additional-info": "action",
}

export function BeneficialOwnerCard({
  kicker,
  title,
  body,
  initialOwners,
  onAddOwner,
  className,
}: BeneficialOwnerCardProps) {
  const headingId = useId()
  const [owners, setOwners] =
    useState<ReadonlyArray<BeneficialOwner>>(initialOwners)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleRemove = (id: string) => {
    setOwners((current) => current.filter((o) => o.id !== id))
  }

  const totalPct = owners.reduce((acc, o) => acc + o.ownershipPct, 0)

  return (
    <section className={classes} aria-labelledby={headingId}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
        <p className={styles.body}>{body}</p>
      </header>

      <ul className={styles.list}>
        {owners.map((owner) => {
          const tone = STATUS_TONE[owner.status]
          return (
            <li key={owner.id} className={styles.item}>
              <div className={styles.itemMain}>
                <span className={styles.avatar} aria-hidden="true">
                  {owner.name
                    .split(" ")
                    .map((part) => part[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
                <div className={styles.itemIdentity}>
                  <span className={styles.name}>{owner.name}</span>
                  <span className={styles.role}>{owner.role}</span>
                </div>
              </div>
              <div className={styles.itemMeta}>
                <span className={styles.pctChip}>
                  {Math.round(owner.ownershipPct)}%
                </span>
                <span className={styles.statusChip} data-tone={tone}>
                  {STATUS_LABEL[owner.status]}
                </span>
              </div>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => handleRemove(owner.id)}
                aria-label={`Remove ${owner.name}`}
              >
                ✕
              </button>
            </li>
          )
        })}
        {owners.length === 0 ? (
          <li className={styles.empty}>No beneficial owners added yet.</li>
        ) : null}
      </ul>

      <footer className={styles.foot}>
        <span className={styles.total}>
          Total ownership&nbsp;
          <strong data-warn={totalPct !== 100 || undefined}>{totalPct}%</strong>
        </span>
        <button type="button" className={styles.addCta} onClick={onAddOwner}>
          <span aria-hidden="true">+</span>
          Add beneficial owner
        </button>
      </footer>
    </section>
  )
}

export default BeneficialOwnerCard
