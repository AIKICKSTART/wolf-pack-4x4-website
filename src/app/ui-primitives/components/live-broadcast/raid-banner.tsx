"use client"

import { Sparkles, Users, X } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import styles from "./raid-banner.module.css"
import type { RaidEvent } from "./live-broadcast-types"

interface RaidBannerProps {
  raid: RaidEvent
  /** Optional handler when host accepts/extends raid. */
  onAccept?: () => void
  /** Optional handler when host dismisses raid banner. */
  onDismiss?: () => void
  className?: string
}

function formatViewerCount(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString("en-AU")
}

export function RaidBanner({ raid, onAccept, onDismiss, className }: RaidBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="status" aria-live="polite">
      <span className={styles.shimmer} aria-hidden="true" />

      <div className={styles.identity}>
        <Avatar
          name={raid.fromChannel}
          src={raid.fromAvatar}
          size="md"
          tone="amber"
        />
        <div className={styles.identityText}>
          <span className={styles.kicker}>
            <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" />
            Incoming raid
          </span>
          <span className={styles.channel}>{raid.fromChannel}</span>
          <span className={styles.handle}>{raid.fromHandle}</span>
        </div>
      </div>

      <div className={styles.counterBlock}>
        <span className={styles.counterLabel}>
          <Users size={12} strokeWidth={2.4} aria-hidden="true" />
          Bringing
        </span>
        <span className={styles.counterValue}>{formatViewerCount(raid.viewerCount)}</span>
        <span className={styles.counterUnit}>viewers</span>
      </div>

      {raid.message ? (
        <p className={styles.message}>&ldquo;{raid.message}&rdquo;</p>
      ) : null}

      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={onAccept}>
          Greet raid
        </button>
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Dismiss raid notification"
        >
          <X size={14} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default RaidBanner
