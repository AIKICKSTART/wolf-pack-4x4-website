"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { MufflermenMonogramIcon } from "../icons/mufflermen-monogram"
import { CheckeredFlagIcon } from "../icons/checkered-flag"
import {
  formatAud,
  type ReferralActivity,
  type ReferralProgram,
} from "./customer-portal-types"

import styles from "./referral-share-card.module.css"

interface ReferralShareCardProps {
  program: ReferralProgram
  className?: string
}

const STATUS_LABEL: Readonly<Record<ReferralActivity["status"], string>> = {
  invited: "Invited",
  booked: "Booked in",
  rewarded: "Reward earned",
}

const STATUS_TONE: Readonly<
  Record<ReferralActivity["status"], "neutral" | "teal" | "green">
> = {
  invited: "neutral",
  booked: "teal",
  rewarded: "green",
}

export function ReferralShareCard({
  program,
  className,
}: ReferralShareCardProps) {
  const [copied, setCopied] = useState<"code" | "url" | undefined>(undefined)

  const handleCopy = async (value: string, label: "code" | "url") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        // Swallow — user denied permission or insecure context. Visual state
        // still shows "copied" so the demo doesn't dead-end.
      }
    }
    setCopied(label)
    if (typeof window !== "undefined") {
      window.setTimeout(() => setCopied(undefined), 2000)
    }
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-program={program.code}
      aria-label={`Refer-a-mate program — share code ${program.code}`}
    >
      <header className={styles.head}>
        <span className={styles.monogram} aria-hidden="true">
          <MufflermenMonogramIcon size={36} tone="red" motion="none" />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>Refer-a-mate</span>
          <h3 className={styles.title}>Send mates, score gear</h3>
          <p className={styles.subhead}>{program.rewardLabel}</p>
        </div>
      </header>

      <section className={styles.shareBlock} aria-label="Share details">
        <div className={styles.shareRow}>
          <div className={styles.shareLabel}>
            <span className={styles.shareKicker}>Your code</span>
            <span className={styles.shareValue}>{program.code}</span>
          </div>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={() => handleCopy(program.code, "code")}
            aria-label="Copy referral code"
          >
            {copied === "code" ? "Copied" : "Copy"}
          </button>
        </div>
        <div className={styles.shareRow}>
          <div className={styles.shareLabel}>
            <span className={styles.shareKicker}>Share link</span>
            <span className={styles.shareUrl}>{program.shareUrl}</span>
          </div>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={() => handleCopy(program.shareUrl, "url")}
            aria-label="Copy share URL"
          >
            {copied === "url" ? "Copied" : "Copy"}
          </button>
        </div>
      </section>

      <dl className={styles.stats}>
        <div>
          <dt>Invited</dt>
          <dd>{program.invitedCount}</dd>
        </div>
        <div>
          <dt>Booked in</dt>
          <dd>{program.bookedCount}</dd>
        </div>
        <div>
          <dt>Banked</dt>
          <dd>{formatAud(program.rewardedTotalAud, 0)}</dd>
        </div>
      </dl>

      {program.activity.length > 0 ? (
        <section className={styles.activity} aria-label="Recent referral activity">
          <header className={styles.activityHead}>
            <span className={styles.activityKicker}>Recent referrals</span>
            <Chip
              label="Live"
              tone="green"
              icon={
                <CheckeredFlagIcon size={11} tone="currentColor" motion="none" />
              }
            />
          </header>
          <ul className={styles.activityList}>
            {program.activity.map((entry) => (
              <li key={entry.id} className={styles.activityRow}>
                <div className={styles.activityMeta}>
                  <span className={styles.activityName}>{entry.mateName}</span>
                  <time className={styles.activityWhen}>{entry.when}</time>
                </div>
                <div className={styles.activityRight}>
                  {entry.rewardAud !== undefined && entry.rewardAud > 0 ? (
                    <span className={styles.activityReward}>
                      +{formatAud(entry.rewardAud, 0)}
                    </span>
                  ) : null}
                  <Chip
                    label={STATUS_LABEL[entry.status]}
                    tone={STATUS_TONE[entry.status]}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

export default ReferralShareCard
