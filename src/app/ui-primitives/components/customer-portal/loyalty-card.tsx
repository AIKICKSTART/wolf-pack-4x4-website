import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { MufflerIcon } from "../icons/muffler"
import { CheckeredFlagIcon } from "../icons/checkered-flag"
import {
  LOYALTY_TIER_LABEL,
  LOYALTY_TIER_TONE,
  type CustomerLoyalty,
  portalToneToChip,
} from "./customer-portal-types"

import styles from "./loyalty-card.module.css"

interface LoyaltyCardProps {
  loyalty: CustomerLoyalty
  className?: string
}

export function LoyaltyCard({ loyalty, className }: LoyaltyCardProps) {
  const classes = [
    styles.card,
    loyalty.rewardReady ? styles.cardReady : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const stamps = Array.from({ length: loyalty.totalStamps }, (_, idx) => idx)
  const remaining = loyalty.totalStamps - loyalty.currentStamps
  const tierLabel = LOYALTY_TIER_LABEL[loyalty.tier]
  const tierChipTone = portalToneToChip(LOYALTY_TIER_TONE[loyalty.tier])
  const progressPct =
    loyalty.totalStamps === 0
      ? 0
      : (loyalty.currentStamps / loyalty.totalStamps) * 100

  return (
    <article
      className={classes}
      data-loyalty={loyalty.id}
      aria-label={`Loyalty card for ${loyalty.customerLabel}: ${loyalty.currentStamps} of ${loyalty.totalStamps} stamps, ${tierLabel} tier`}
    >
      <header className={styles.head}>
        <div className={styles.brand}>
          <span className={styles.brandLine} aria-hidden="true">
            <MufflerIcon size={20} tone="amber" motion="none" />
          </span>
          <div>
            <span className={styles.kicker}>Mufflermen loyalty</span>
            <h3 className={styles.title}>{loyalty.customerLabel}</h3>
          </div>
        </div>
        <div className={styles.chipColumn}>
          <Chip
            label={tierLabel}
            tone={tierChipTone}
            icon={
              <CheckeredFlagIcon size={12} tone="currentColor" motion="none" />
            }
          />
          {loyalty.rewardReady ? (
            <span className={styles.rewardBadge}>
              <span aria-hidden="true">★</span>
              Reward unlocked
            </span>
          ) : (
            <span className={styles.progressBadge}>
              {remaining} stamp{remaining === 1 ? "" : "s"} to go
            </span>
          )}
        </div>
      </header>

      <section className={styles.stampPanel} aria-label="Stamp progress">
        <div className={styles.stampGrid}>
          {stamps.map((idx) => {
            const filled = idx < loyalty.currentStamps
            const latest = idx === loyalty.currentStamps - 1
            return (
              <span
                key={idx}
                className={[
                  styles.stamp,
                  filled ? styles.stampFilled : "",
                  latest ? styles.stampLatest : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={
                  filled
                    ? `Stamp ${idx + 1} of ${loyalty.totalStamps} earned`
                    : `Stamp ${idx + 1} of ${loyalty.totalStamps} pending`
                }
              >
                {filled ? (
                  <MufflerIcon size={22} tone="currentColor" motion="none" />
                ) : (
                  <span className={styles.stampNumber} aria-hidden="true">
                    {idx + 1}
                  </span>
                )}
              </span>
            )
          })}
        </div>
        <ProgressLinear
          value={progressPct}
          tone="amber"
          variant="solid"
          label={`${loyalty.currentStamps}/${loyalty.totalStamps} stamps`}
          showLabel
        />
      </section>

      <footer className={styles.foot}>
        <div className={styles.reward}>
          <span className={styles.rewardKicker}>Next reward</span>
          <span className={styles.rewardLabel}>{loyalty.nextReward}</span>
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>Joined</dt>
            <dd>
              <time>{loyalty.joinedAt}</time>
            </dd>
          </div>
          <div>
            <dt>Visits</dt>
            <dd>{loyalty.visitsCount}</dd>
          </div>
          {loyalty.lastVisitAt ? (
            <div>
              <dt>Last visit</dt>
              <dd>
                <time>{loyalty.lastVisitAt}</time>
              </dd>
            </div>
          ) : null}
        </dl>
      </footer>
    </article>
  )
}

export default LoyaltyCard
