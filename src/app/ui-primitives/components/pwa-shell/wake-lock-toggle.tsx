"use client"

import { BatteryLow, MoonStar, Sun } from "lucide-react"

import styles from "./wake-lock-toggle.module.css"

interface WakeLockToggleProps {
  enabled: boolean
  batteryCostPctPerHour?: number
  hint?: string
  onToggle?: () => void
  className?: string
}

export function WakeLockToggle({
  enabled,
  batteryCostPctPerHour = 8,
  hint,
  onToggle,
  className,
}: WakeLockToggleProps) {
  const classes = [styles.root, enabled ? styles.active : "", className]
    .filter(Boolean)
    .join(" ")
  const Icon = enabled ? Sun : MoonStar
  const label = enabled ? "Keep screen on" : "Auto-dim screen"
  const helper =
    hint ??
    (enabled
      ? "Useful while quoting on the bay — screen stays awake"
      : "Phone will dim after standard idle timeout")

  return (
    <button
      type="button"
      className={classes}
      role="switch"
      aria-checked={enabled}
      aria-label={`${label} ${enabled ? "on" : "off"}`}
      onClick={onToggle}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <span className={styles.copy}>
        <span className={styles.label}>{label}</span>
        <span className={styles.metaRow}>
          <span>{helper}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.cost}>
            <BatteryLow size={11} strokeWidth={2.4} aria-hidden="true" />
            {batteryCostPctPerHour}% / hr
          </span>
        </span>
      </span>
      <span className={[styles.switch, enabled ? styles.switchOn : ""].filter(Boolean).join(" ")} aria-hidden="true">
        <span className={styles.knob} />
      </span>
    </button>
  )
}

export default WakeLockToggle
