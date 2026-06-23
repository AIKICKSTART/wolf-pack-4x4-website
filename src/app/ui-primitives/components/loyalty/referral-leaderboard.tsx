"use client"

import { Avatar, type AvatarTone } from "../primitives/avatar"
import { Chip, type ChipTone } from "../primitives/chip"
import { DataTable, type DataTableColumn } from "../data-display/data-table"

import styles from "./referral-leaderboard.module.css"

export interface ReferralLeaderRow {
  /** Unique id for the row. */
  id: string
  /** Display rank — 1-indexed. */
  rank: number
  /** Referrer name. */
  name: string
  /** Optional avatar src override. */
  avatarSrc?: string
  /** Count of successful referrals this period. */
  referralCount: number
  /** Dollar amount earned this period (AUD). */
  earnedAud: number
}

interface ReferralLeaderboardProps {
  rows: ReadonlyArray<ReferralLeaderRow>
  /** Optional caption headline. */
  caption?: string
  /** Optional period kicker e.g. "May 2026". */
  period?: string
  className?: string
}

const RANK_TONE_MAP: Record<number, ChipTone> = {
  1: "amber",
  2: "neutral",
  3: "red",
}

function rankTone(rank: number): ChipTone {
  return RANK_TONE_MAP[rank] ?? "neutral"
}

const AVATAR_TONES: ReadonlyArray<AvatarTone> = ["red", "amber", "teal", "green", "obsidian"]

function avatarTone(rank: number): AvatarTone {
  return AVATAR_TONES[(rank - 1) % AVATAR_TONES.length]
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function ReferralLeaderboard({
  rows,
  caption = "Top referrers",
  period,
  className,
}: ReferralLeaderboardProps) {
  const columns: ReadonlyArray<DataTableColumn<ReferralLeaderRow>> = [
    {
      id: "rank",
      header: "Rank",
      width: "70px",
      cell: (row) => (
        <Chip label={`#${row.rank.toString().padStart(2, "0")}`} tone={rankTone(row.rank)} />
      ),
    },
    {
      id: "name",
      header: "Member",
      cell: (row) => (
        <span className={styles.member}>
          <Avatar name={row.name} src={row.avatarSrc} size="sm" tone={avatarTone(row.rank)} />
          <strong>{row.name}</strong>
        </span>
      ),
    },
    {
      id: "referrals",
      header: "Referrals",
      align: "right",
      sortable: true,
      cell: (row) => (
        <span className={styles.numeric}>{row.referralCount.toLocaleString("en-AU")}</span>
      ),
    },
    {
      id: "earned",
      header: "Earned",
      align: "right",
      sortable: true,
      cell: (row) => <Chip label={formatAud(row.earnedAud)} tone="green" />,
    },
  ]

  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="region" aria-label={caption}>
      <DataTable
        rows={rows.slice()}
        columns={columns}
        getRowId={(row) => row.id}
        density="comfortable"
        zebra
        kicker={period}
        caption={caption}
      />
    </section>
  )
}

export default ReferralLeaderboard
