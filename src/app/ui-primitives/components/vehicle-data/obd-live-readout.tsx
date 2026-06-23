"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { Gauge, Thermometer, Fuel, Wind, Activity } from "lucide-react"
import type { ReactNode } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import { ProgressRadial, type ProgressRadialTone } from "../primitives/progress-radial"

import styles from "./obd-live-readout.module.css"

export interface ObdLiveReadingFrame {
  /** Engine speed (rpm). */
  rpm: number
  /** Coolant temperature (°C). */
  coolantTempC: number
  /** Fuel level (%). */
  fuelLevelPercent: number
  /** Mass airflow sensor (g/s). */
  mafGramsPerSecond: number
  /** Bank 1 sensor 1 lambda voltage (V). */
  o2Voltage: number
}

interface ObdLiveReadoutProps {
  /** Initial frame rendered before live streaming kicks in. */
  initial: ObdLiveReadingFrame
  /** Whether the live simulation should run. Disable for snapshot views. */
  live?: boolean
  /** Optional vehicle label for the header. */
  vehicleLabel?: string
  /** ISO timestamp displayed alongside the live dot. */
  capturedAtISO?: string
  className?: string
}

interface GaugeSpec {
  key: keyof ObdLiveReadingFrame
  icon: ReactNode
  label: string
  unit: string
  /** Maximum value used for the radial fill. */
  max: number
  /** Numeric formatter (integer or 1 decimal). */
  format: (value: number) => string
}

const GAUGES: ReadonlyArray<GaugeSpec> = [
  {
    key: "rpm",
    icon: <Gauge size={14} strokeWidth={2.2} aria-hidden="true" />,
    label: "Engine RPM",
    unit: "rpm",
    max: 7_000,
    format: (value) => Math.round(value).toLocaleString("en-AU"),
  },
  {
    key: "coolantTempC",
    icon: <Thermometer size={14} strokeWidth={2.2} aria-hidden="true" />,
    label: "Coolant",
    unit: "°C",
    max: 130,
    format: (value) => `${Math.round(value)}`,
  },
  {
    key: "fuelLevelPercent",
    icon: <Fuel size={14} strokeWidth={2.2} aria-hidden="true" />,
    label: "Fuel",
    unit: "%",
    max: 100,
    format: (value) => `${Math.round(value)}`,
  },
  {
    key: "mafGramsPerSecond",
    icon: <Wind size={14} strokeWidth={2.2} aria-hidden="true" />,
    label: "MAF",
    unit: "g/s",
    max: 80,
    format: (value) => value.toFixed(1),
  },
  {
    key: "o2Voltage",
    icon: <Activity size={14} strokeWidth={2.2} aria-hidden="true" />,
    label: "O₂ B1S1",
    unit: "V",
    max: 1,
    format: (value) => value.toFixed(2),
  },
]

function gaugeTone(key: keyof ObdLiveReadingFrame, value: number): ProgressRadialTone {
  switch (key) {
    case "rpm":
      if (value > 5_500) return "red"
      if (value > 4_000) return "amber"
      return "teal"
    case "coolantTempC":
      if (value >= 110) return "red"
      if (value >= 100) return "amber"
      if (value < 60) return "teal"
      return "green"
    case "fuelLevelPercent":
      if (value < 12) return "red"
      if (value < 28) return "amber"
      return "green"
    case "mafGramsPerSecond":
      if (value > 60) return "amber"
      return "teal"
    case "o2Voltage":
      if (value > 0.85 || value < 0.1) return "amber"
      return "green"
    default:
      return "teal"
  }
}

function chipTone(key: keyof ObdLiveReadingFrame, value: number): ChipTone {
  switch (key) {
    case "rpm":
      if (value > 5_500) return "red"
      if (value > 4_000) return "amber"
      return "teal"
    case "coolantTempC":
      if (value >= 110) return "red"
      if (value >= 100) return "amber"
      return "green"
    case "fuelLevelPercent":
      if (value < 12) return "red"
      if (value < 28) return "amber"
      return "green"
    case "mafGramsPerSecond":
      return "teal"
    case "o2Voltage":
      if (value > 0.85 || value < 0.1) return "amber"
      return "green"
    default:
      return "neutral"
  }
}

function jitter(value: number, amplitude: number, min = 0, max = Number.POSITIVE_INFINITY) {
  const next = value + (Math.random() - 0.5) * amplitude * 2
  return Math.max(min, Math.min(max, next))
}

function nextFrame(frame: ObdLiveReadingFrame): ObdLiveReadingFrame {
  return {
    rpm: jitter(frame.rpm, 280, 700, 6_800),
    coolantTempC: jitter(frame.coolantTempC, 1.2, 40, 125),
    fuelLevelPercent: jitter(frame.fuelLevelPercent, 0.6, 0, 100),
    mafGramsPerSecond: jitter(frame.mafGramsPerSecond, 3.4, 1, 75),
    o2Voltage: jitter(frame.o2Voltage, 0.04, 0.05, 0.98),
  }
}

function formatClock(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

function subscribeToReducedMotion(notify: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
  reduce.addEventListener("change", notify)
  return () => reduce.removeEventListener("change", notify)
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getServerReducedMotionSnapshot(): boolean {
  return false
}

export function ObdLiveReadout({
  initial,
  live = true,
  vehicleLabel,
  capturedAtISO,
  className,
}: ObdLiveReadoutProps) {
  const [frame, setFrame] = useState<ObdLiveReadingFrame>(initial)
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  )

  useEffect(() => {
    if (!live || reduceMotion || typeof window === "undefined") {
      return
    }
    const interval = window.setInterval(() => {
      setFrame((prev) => nextFrame(prev))
    }, 900)
    return () => window.clearInterval(interval)
  }, [live, reduceMotion])

  const classes = useMemo(
    () => [styles.readout, className].filter(Boolean).join(" "),
    [className],
  )

  const isLive = live && !reduceMotion

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={vehicleLabel ? `OBD-II live readout for ${vehicleLabel}` : "OBD-II live readout"}
    >
      <header className={styles.head}>
        <span className={[styles.dot, isLive ? styles.dotLive : null].filter(Boolean).join(" ")} aria-hidden="true" />
        <span className={styles.kicker}>
          OBD-II live{vehicleLabel ? ` · ${vehicleLabel}` : ""}
        </span>
        {capturedAtISO ? (
          <time className={styles.clock} dateTime={capturedAtISO}>
            {formatClock(capturedAtISO)}
          </time>
        ) : null}
      </header>

      <ul className={styles.grid}>
        {GAUGES.map((gauge) => {
          const value = frame[gauge.key]
          const tone = gaugeTone(gauge.key, value)
          const numeric = gauge.format(value)
          return (
            <li key={gauge.key} className={styles.cell}>
              <ProgressRadial
                value={value}
                max={gauge.max}
                tone={tone}
                size="md"
                showLabel={false}
                label={`${gauge.label}: ${numeric} ${gauge.unit}`}
              />
              <div className={styles.cellMeta}>
                <span className={styles.cellLabel}>
                  {gauge.icon}
                  {gauge.label}
                </span>
                <span className={styles.cellValue}>
                  <strong>{numeric}</strong>
                  <em>{gauge.unit}</em>
                </span>
                <Chip
                  label={tone === "green" ? "Nominal" : tone === "amber" ? "Watch" : tone === "red" ? "Alert" : "Steady"}
                  tone={chipTone(gauge.key, value)}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ObdLiveReadout
