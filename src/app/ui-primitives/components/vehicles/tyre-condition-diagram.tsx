"use client"

import { useState } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"

import { TYRE_LABEL, type TyrePosition } from "./vehicles-types"
import styles from "./tyre-condition-diagram.module.css"

export interface TyreReading {
  position: TyrePosition
  /** Tread depth in millimetres. NSW road minimum is 1.5 mm. */
  treadMm: number
  /** Cold inflation pressure in kPa. */
  pressureKpa: number
  /** Optional brand+model label. */
  spec?: string
}

interface TyreConditionDiagramProps {
  tyres: ReadonlyArray<TyreReading>
  /** Minimum legal tread depth in mm (NSW = 1.5). */
  minTreadMm?: number
  /** Maximum tread when new (typically 8 mm). */
  maxTreadMm?: number
  className?: string
}

function treadTone(treadMm: number, minMm: number): ChipTone {
  if (treadMm <= minMm) {
    return "red"
  }
  if (treadMm <= minMm + 1) {
    return "amber"
  }
  if (treadMm <= minMm + 2.5) {
    return "teal"
  }
  return "green"
}

function progressTone(treadMm: number, minMm: number): ProgressLinearTone {
  const tone = treadTone(treadMm, minMm)
  if (tone === "neutral") {
    return "teal"
  }
  return tone
}

export function TyreConditionDiagram({
  tyres,
  minTreadMm = 1.5,
  maxTreadMm = 8,
  className,
}: TyreConditionDiagramProps) {
  const [active, setActive] = useState<TyrePosition | null>(null)
  const classes = [styles.diagram, className].filter(Boolean).join(" ")

  const lookup: Partial<Record<TyrePosition, TyreReading>> = {}
  for (const tyre of tyres) {
    lookup[tyre.position] = tyre
  }

  const renderTyre = (position: TyrePosition) => {
    const reading = lookup[position]
    if (!reading) {
      return null
    }
    const tone = treadTone(reading.treadMm, minTreadMm)
    const isActive = active === position
    return (
      <button
        type="button"
        className={[
          styles.tyre,
          styles[`pos-${position}`],
          isActive ? styles.tyreActive : null,
        ]
          .filter(Boolean)
          .join(" ")}
        data-tone={tone}
        aria-pressed={isActive}
        aria-label={`${TYRE_LABEL[position]} tyre, ${reading.treadMm.toFixed(1)} mm tread`}
        onClick={() => setActive((current) => (current === position ? null : position))}
      >
        <span className={styles.tyreLabel}>{TYRE_LABEL[position].split("-")[0]}</span>
        <span className={styles.tyreTread}>{reading.treadMm.toFixed(1)} mm</span>
      </button>
    )
  }

  return (
    <section className={classes} aria-label="Tyre condition diagram">
      <div className={styles.vehicleShell} aria-hidden="true">
        <div className={styles.cabin} />
        <div className={styles.bonnet} />
        <div className={styles.tray} />
        {renderTyre("front-left")}
        {renderTyre("front-right")}
        {renderTyre("rear-left")}
        {renderTyre("rear-right")}
      </div>

      <div className={styles.chart}>
        <h3 className={styles.chartHeading}>
          {active ? `${TYRE_LABEL[active]} detail` : "Tread depth"}
        </h3>
        <ul className={styles.bars}>
          {tyres.map((tyre) => {
            const isHighlighted = active === null || active === tyre.position
            return (
              <li
                key={tyre.position}
                className={[styles.bar, isHighlighted ? null : styles.dim].filter(Boolean).join(" ")}
              >
                <div className={styles.barHead}>
                  <span>{TYRE_LABEL[tyre.position]}</span>
                  <Chip
                    label={`${tyre.pressureKpa} kPa`}
                    tone={tyre.pressureKpa < 200 ? "amber" : "neutral"}
                  />
                </div>
                <ProgressLinear
                  value={tyre.treadMm}
                  max={maxTreadMm}
                  tone={progressTone(tyre.treadMm, minTreadMm)}
                  variant="solid"
                  label={`${tyre.treadMm.toFixed(1)} mm of ${maxTreadMm.toFixed(1)} mm`}
                  showLabel
                />
                {tyre.spec ? <span className={styles.spec}>{tyre.spec}</span> : null}
              </li>
            )
          })}
        </ul>
        <p className={styles.legalLine}>
          NSW legal minimum is {minTreadMm.toFixed(1)} mm across the central three-quarters of the
          tread.
        </p>
      </div>
    </section>
  )
}

export default TyreConditionDiagram
