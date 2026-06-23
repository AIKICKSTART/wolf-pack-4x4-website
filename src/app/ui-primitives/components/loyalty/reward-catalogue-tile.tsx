"use client"

import type { MouseEventHandler, ReactNode } from "react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import { REWARD_LABEL, type RewardKind } from "./loyalty-types"
import styles from "./reward-catalogue-tile.module.css"

interface RewardCatalogueTileProps {
  reward: RewardKind
  /** Points cost to redeem. */
  pointsCost: number
  /** Stock state. */
  stock?: "in-stock" | "low-stock" | "sold-out"
  /** Optional thumbnail node — typically a glyph or icon. */
  thumbnail?: ReactNode
  /** Optional short marketing line. */
  blurb?: string
  /** Whether the member can afford the reward (drives CTA enable). */
  affordable?: boolean
  onRedeem?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

const STOCK_LABEL: Record<NonNullable<RewardCatalogueTileProps["stock"]>, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
}

const STOCK_TONE: Record<NonNullable<RewardCatalogueTileProps["stock"]>, ChipTone> = {
  "in-stock": "green",
  "low-stock": "amber",
  "sold-out": "red",
}

export function RewardCatalogueTile({
  reward,
  pointsCost,
  stock = "in-stock",
  thumbnail,
  blurb,
  affordable = true,
  onRedeem,
  className,
}: RewardCatalogueTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const disabled = stock === "sold-out" || !affordable
  const ctaLabel = stock === "sold-out" ? "Sold out" : affordable ? "Redeem" : "Need more pts"

  return (
    <article
      className={classes}
      role="region"
      aria-label={`Reward — ${REWARD_LABEL[reward]} for ${pointsCost.toLocaleString("en-AU")} points`}
    >
      <div className={styles.thumb} aria-hidden="true">
        {thumbnail ?? <span className={styles.thumbGlyph}>{REWARD_LABEL[reward][0]}</span>}
      </div>
      <DashboardCard
        label={REWARD_LABEL[reward]}
        value={pointsCost.toLocaleString("en-AU")}
        unit="pts"
        meta={blurb}
        surface="glass"
      />
      <div className={styles.foot}>
        <Chip label={STOCK_LABEL[stock]} tone={STOCK_TONE[stock]} />
        <button
          type="button"
          className={styles.cta}
          onClick={onRedeem}
          disabled={disabled}
          aria-disabled={disabled}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}

export default RewardCatalogueTile
