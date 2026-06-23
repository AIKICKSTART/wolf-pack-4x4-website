"use client"

import * as React from "react"
import { Activity, Cpu, Signal, Wifi } from "lucide-react"

import styles from "../ui-primitives.module.css"

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function subscribeClock(callback: () => void) {
  const id = window.setInterval(callback, 1000)
  return () => window.clearInterval(id)
}

function getClockSnapshot() {
  return formatClock(new Date())
}

function getServerClockSnapshot() {
  return "--:--:--"
}

export function useLiveClock(): string {
  return React.useSyncExternalStore(subscribeClock, getClockSnapshot, getServerClockSnapshot)
}

interface TopHudProps {
  buildHash: string
  channel: string
}

export function TopHud({ buildHash, channel }: TopHudProps) {
  const clock = useLiveClock()

  return (
    <div className={styles.topHud} role="status" aria-live="off">
      <div className={styles.hudCluster}>
        <span className={styles.hudPulse} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.hudLabel}>System</span>
        <strong>Primitive · Live</strong>
      </div>
      <div className={styles.hudCluster}>
        <Cpu aria-hidden="true" />
        <span className={styles.hudLabel}>Build</span>
        <code>{buildHash}</code>
      </div>
      <div className={styles.hudCluster}>
        <Signal aria-hidden="true" />
        <span className={styles.hudLabel}>Channel</span>
        <code>{channel}</code>
      </div>
      <div className={styles.hudCluster}>
        <Activity aria-hidden="true" />
        <span className={styles.hudLabel}>Latency</span>
        <code>14 ms</code>
      </div>
      <div className={styles.hudCluster} data-mono>
        <Wifi aria-hidden="true" />
        <span className={styles.hudLabel}>Uplink</span>
        <code>{clock}</code>
      </div>
    </div>
  )
}
