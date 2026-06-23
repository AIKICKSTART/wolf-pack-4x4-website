import { MufflerIcon } from "../icons/muffler"
import type { LoyaltyCard } from "./workshop-ops-types"

import styles from "./loyalty-stamp-card.module.css"

interface LoyaltyStampCardProps {
  card: LoyaltyCard
  className?: string
}

export function LoyaltyStampCard({ card, className }: LoyaltyStampCardProps) {
  const classes = [
    styles.card,
    card.rewardReady ? styles.cardReady : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const stamps = Array.from({ length: card.totalStamps }, (_, idx) => idx)
  const remaining = card.totalStamps - card.currentStamps

  return (
    <article
      className={classes}
      data-card={card.id}
      aria-label={`Loyalty card for ${card.customerLabel}: ${card.currentStamps} of ${card.totalStamps} stamps`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Mufflermen loyalty</span>
          <h3 className={styles.title}>{card.customerLabel}</h3>
        </div>
        {card.rewardReady ? (
          <span className={styles.rewardBadge}>
            <span aria-hidden="true">★</span>
            Reward unlocked
          </span>
        ) : (
          <span className={styles.progressBadge}>
            {remaining} stamp{remaining === 1 ? "" : "s"} to go
          </span>
        )}
      </header>

      <section
        className={styles.stampGrid}
        aria-label="Stamp grid"
      >
        {stamps.map((idx) => {
          const filled = idx < card.currentStamps
          return (
            <span
              key={idx}
              className={[
                styles.stamp,
                filled ? styles.stampFilled : "",
                idx === card.currentStamps - 1 ? styles.stampLatest : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label={
                filled
                  ? `Stamp ${idx + 1} of ${card.totalStamps} earned`
                  : `Stamp ${idx + 1} of ${card.totalStamps} pending`
              }
            >
              {filled ? (
                <MufflerIcon
                  size={22}
                  tone="currentColor"
                  motion="none"
                />
              ) : (
                <span className={styles.stampNumber} aria-hidden="true">
                  {idx + 1}
                </span>
              )}
            </span>
          )
        })}
      </section>

      <footer className={styles.foot}>
        <div className={styles.reward}>
          <span className={styles.rewardKicker}>Next reward</span>
          <span className={styles.rewardLabel}>{card.reward}</span>
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>Joined</dt>
            <dd>
              <time>{card.joinedAt}</time>
            </dd>
          </div>
          {card.lastVisit ? (
            <div>
              <dt>Last visit</dt>
              <dd>
                <time>{card.lastVisit}</time>
              </dd>
            </div>
          ) : null}
        </dl>
      </footer>
    </article>
  )
}

export default LoyaltyStampCard
