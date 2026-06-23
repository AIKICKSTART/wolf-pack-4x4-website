import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { CarSideIcon } from "../icons/car-side"
import { CheckeredFlagIcon } from "../icons/checkered-flag"
import {
  LOYALTY_TIER_LABEL,
  LOYALTY_TIER_TONE,
  type PortalCustomer,
  portalToneToChip,
} from "./customer-portal-types"

import styles from "./account-summary-tile.module.css"

interface AccountSummaryTileProps {
  customer: PortalCustomer
  className?: string
}

function avatarToneFor(tier: PortalCustomer["tier"]): "amber" | "teal" | "red" {
  switch (tier) {
    case "platinum":
      return "red"
    case "gold":
      return "amber"
    case "silver":
      return "teal"
    case "starter":
    default:
      return "teal"
  }
}

export function AccountSummaryTile({
  customer,
  className,
}: AccountSummaryTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const tierChipTone = portalToneToChip(LOYALTY_TIER_TONE[customer.tier])
  const tierLabel = LOYALTY_TIER_LABEL[customer.tier]

  return (
    <article
      className={classes}
      aria-label={`Account summary for ${customer.name}, ${tierLabel} tier`}
      data-customer={customer.id}
    >
      <header className={styles.head}>
        <Avatar
          name={customer.name}
          size="lg"
          tone={avatarToneFor(customer.tier)}
        />
        <div className={styles.identity}>
          <span className={styles.kicker}>G&apos;day, mate</span>
          <h2 className={styles.name}>{customer.name}</h2>
          <div className={styles.chipsRow}>
            <Chip
              label={`${tierLabel} member`}
              tone={tierChipTone}
              icon={
                <CheckeredFlagIcon size={12} tone="currentColor" motion="none" />
              }
            />
            <Chip
              label={`${customer.vehicleCount} ${customer.vehicleCount === 1 ? "vehicle" : "vehicles"} in garage`}
              tone="neutral"
              icon={<CarSideIcon size={12} tone="currentColor" motion="none" />}
            />
          </div>
        </div>
      </header>

      <dl className={styles.facts}>
        <div>
          <dt>Member since</dt>
          <dd>
            <time>{customer.memberSince}</time>
          </dd>
        </div>
        <div>
          <dt>Loyalty tier</dt>
          <dd>{tierLabel}</dd>
        </div>
        <div>
          <dt>Garage</dt>
          <dd>{customer.vehicleCount} vehicles</dd>
        </div>
      </dl>

      {customer.nextRewardLabel ? (
        <section
          className={styles.progress}
          aria-label="Loyalty reward progress"
        >
          <header className={styles.progressHead}>
            <span className={styles.progressKicker}>Next reward</span>
            <span className={styles.progressLabel}>
              {customer.nextRewardLabel}
            </span>
          </header>
          <ProgressLinear
            value={customer.loyaltyProgressPct}
            tone="amber"
            variant="solid"
          />
        </section>
      ) : null}
    </article>
  )
}

export default AccountSummaryTile
