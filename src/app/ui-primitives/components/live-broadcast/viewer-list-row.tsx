"use client"

import { Crown, MoreHorizontal, Pin, ShieldOff } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import styles from "./viewer-list-row.module.css"
import type { BroadcastViewer, SupporterTier } from "./live-broadcast-types"

interface ViewerListRowProps {
  viewer: BroadcastViewer
  /** Show the host action cluster. */
  showHostActions?: boolean
  /** Optional callback when "raise viewer" fires. */
  onRaiseViewer?: () => void
  /** Optional callback when "kick" fires. */
  onKickViewer?: () => void
  className?: string
}

const TIER_LABEL: Record<SupporterTier, string> = {
  "workshop-crew": "Workshop Crew",
  "inner-circle": "Inner Circle",
  "pit-boss": "Pit Boss",
  platinum: "Platinum",
}

const TIER_TONE: Record<SupporterTier, string> = {
  "workshop-crew": "tierCrew",
  "inner-circle": "tierInner",
  "pit-boss": "tierPit",
  platinum: "tierPlatinum",
}

function formatWatchDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remMinutes = minutes % 60
  return remMinutes > 0 ? `${hours}h ${remMinutes}m` : `${hours}h`
}

export function ViewerListRow({
  viewer,
  showHostActions = false,
  onRaiseViewer,
  onKickViewer,
  className,
}: ViewerListRowProps) {
  const tierLabel = viewer.tier ? TIER_LABEL[viewer.tier] : undefined
  const classes = [
    styles.row,
    viewer.tier ? styles[TIER_TONE[viewer.tier]] : "",
    viewer.isFlagged ? styles.flagged : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <li className={classes}>
      <Avatar
        name={viewer.handle}
        src={viewer.avatar}
        size="sm"
        tone={viewer.tier === "pit-boss" || viewer.tier === "platinum" ? "amber" : "obsidian"}
      />

      <div className={styles.identity}>
        <span className={styles.handle}>
          {viewer.tier === "pit-boss" || viewer.tier === "platinum" ? (
            <Crown size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : null}
          {viewer.handle}
        </span>
        {viewer.region ? <span className={styles.region}>{viewer.region}</span> : null}
      </div>

      <div className={styles.stats}>
        {tierLabel ? (
          <span className={styles.tierBadge}>{tierLabel}</span>
        ) : null}
        <span className={styles.watch} aria-label={`Watched ${formatWatchDuration(viewer.watchSeconds)}`}>
          {formatWatchDuration(viewer.watchSeconds)}
        </span>
      </div>

      {showHostActions ? (
        <div className={styles.actions} role="group" aria-label={`${viewer.handle} actions`}>
          <button
            type="button"
            className={styles.actionBtn}
            aria-label={`Raise ${viewer.handle} to crew`}
            onClick={onRaiseViewer}
          >
            <Pin size={12} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[styles.actionBtn, styles.actionDanger].join(" ")}
            aria-label={`Kick ${viewer.handle}`}
            onClick={onKickViewer}
          >
            <ShieldOff size={12} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button type="button" className={styles.actionBtn} aria-label={`More options for ${viewer.handle}`}>
            <MoreHorizontal size={12} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </li>
  )
}

export default ViewerListRow
