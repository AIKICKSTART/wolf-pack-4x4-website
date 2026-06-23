import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { ProgressLinear } from "../primitives/progress-linear"

import {
  QUOTA_LABEL,
  formatBytes,
  type CdnTone,
  type QuotaTile as QuotaTileData,
} from "./asset-cdn-types"

import styles from "./usage-quota-tile.module.css"

interface UsageQuotaTileProps {
  quota: QuotaTileData
  className?: string
}

const TONE_TO_PROGRESS: Record<CdnTone, "red" | "amber" | "teal" | "green"> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "teal",
}

const TONE_CLASS: Record<CdnTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

function pickTone(percent: number): CdnTone {
  if (percent >= 90) return "red"
  if (percent >= 70) return "amber"
  if (percent >= 40) return "teal"
  return "green"
}

function formatValue(quota: QuotaTileData["resource"], value: number): string {
  if (quota === "bandwidth" || quota === "storage") return formatBytes(value)
  if (quota === "image-ops") {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)} K`
    return value.toString()
  }
  // video-min
  if (value >= 60) return `${(value / 60).toFixed(1)} hr`
  return `${value} min`
}

function formatRemaining(seconds: number): string {
  if (seconds < 86_400) return `${Math.round(seconds / 3600)} h`
  if (seconds < 2_592_000) return `${Math.round(seconds / 86_400)} d`
  return `${Math.round(seconds / 2_592_000)} mo`
}

function getCycleSeconds(iso: string): number {
  const target = new Date(iso).getTime()
  const now = Date.UTC(2026, 4, 29, 12, 0, 0)
  return Math.max(0, Math.round((target - now) / 1000))
}

export function UsageQuotaTile({ quota, className }: UsageQuotaTileProps) {
  const usedPct = quota.limit > 0 ? Math.min(100, (quota.used / quota.limit) * 100) : 0
  const tone = pickTone(usedPct)
  const classes = [styles.tile, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  const deltaSign: "flat" | "up" | "down" =
    quota.deltaPct === 0 ? "flat" : quota.deltaPct > 0 ? "up" : "down"

  const deltaClass =
    deltaSign === "up" ? styles.deltaUp : deltaSign === "down" ? styles.deltaDown : styles.deltaFlat

  return (
    <article
      className={classes}
      aria-label={`${QUOTA_LABEL[quota.resource]} quota, ${Math.round(usedPct)} percent used`}
    >
      <header className={styles.head}>
        <span className={styles.label}>{QUOTA_LABEL[quota.resource]}</span>
        <span className={`${styles.delta} ${deltaClass}`}>
          {deltaSign === "up" ? (
            <ArrowUpRight size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : deltaSign === "down" ? (
            <ArrowDownRight size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Minus size={11} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span>{Math.abs(quota.deltaPct).toFixed(1)}%</span>
        </span>
      </header>

      <div className={styles.body}>
        <strong className={styles.value}>{formatValue(quota.resource, quota.used)}</strong>
        <span className={styles.limit}>of {formatValue(quota.resource, quota.limit)}</span>
      </div>

      <ProgressLinear
        value={usedPct}
        tone={TONE_TO_PROGRESS[tone]}
        variant={usedPct >= 90 ? "striped" : "solid"}
        className={styles.progress}
      />

      <footer className={styles.foot}>
        <span className={styles.usedPct}>{usedPct.toFixed(0)}% used</span>
        <span className={styles.cycle}>
          Cycle resets in {formatRemaining(getCycleSeconds(quota.cycleEnds))}
        </span>
      </footer>
    </article>
  )
}

export default UsageQuotaTile
