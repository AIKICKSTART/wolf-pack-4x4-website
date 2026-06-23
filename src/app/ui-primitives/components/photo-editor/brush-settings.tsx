import type { CSSProperties } from "react"

import { Sparkline } from "../charts/sparkline"

import { clamp01, formatPct } from "./photo-editor-types"
import type { BrushState } from "./photo-editor-types"
import styles from "./brush-settings.module.css"

interface BrushSettingsProps {
  /** Current brush configuration. */
  state: BrushState
  /** Quick-select swatches displayed beneath the colour bar. */
  swatches?: ReadonlyArray<string>
}

const DEFAULT_SWATCHES: ReadonlyArray<string> = [
  "#0b0c12",
  "#f5f6fa",
  "#e62028",
  "#ffc14f",
  "#40bcff",
  "#37d67a",
]

function clampSize(value: number): number {
  if (!Number.isFinite(value) || value < 1) return 1
  if (value > 480) return 480
  return value
}

export function BrushSettings({
  state,
  swatches = DEFAULT_SWATCHES,
}: BrushSettingsProps) {
  const size = clampSize(state.sizePx)
  const hardness = clamp01(state.hardness)
  const flow = clamp01(state.flow)
  const tipPx = Math.min(size, 96)

  const previewVars: CSSProperties = {
    "--tip-size": `${tipPx}px`,
    "--tip-color": state.hex,
    "--tip-hardness": hardness,
    "--tip-opacity": flow,
  } as CSSProperties

  // Pressure-response curve — flow ramps from 0 to active flow over 16 samples,
  // with the hardness driving how quickly the curve plateaus.
  const pressureCurve = Array.from({ length: 16 }, (_, index) => {
    const t = index / 15
    return Math.min(1, flow * Math.pow(t, 1 - hardness * 0.7))
  })

  return (
    <section className={styles.wrap} aria-label="Brush settings">
      <header className={styles.head}>
        <span className={styles.title}>Brush</span>
        <span className={styles.kicker}>
          {Math.round(size)} px · {formatPct(hardness)} hard · {formatPct(flow)} flow
        </span>
      </header>

      <div className={styles.preview} style={previewVars} role="presentation">
        <span
          className={styles.tip}
          role="img"
          aria-label={`Brush tip preview · ${state.hex} · ${Math.round(size)} pixel diameter`}
        />
        <span
          style={{
            position: "absolute",
            right: "var(--primitive-space-2-5)",
            bottom: "var(--primitive-space-2-5)",
            background: "color-mix(in oklab, var(--primitive-overlay) 88%, transparent)",
            borderRadius: 4,
            padding: "var(--primitive-space-0-5)",
          }}
          aria-hidden="true"
        >
          <Sparkline
            points={pressureCurve}
            tone="amber"
            ariaLabel={`Pressure response curve · ${formatPct(flow)} peak flow`}
            width={88}
            height={28}
          />
        </span>
      </div>

      <div className={styles.controls}>
        <SliderField
          label="Size"
          valueLabel={`${Math.round(size)} px`}
          progress={size / 480}
          ariaLabel={`Brush size ${Math.round(size)} pixels`}
        />
        <SliderField
          label="Hardness"
          valueLabel={formatPct(hardness)}
          progress={hardness}
          ariaLabel={`Brush hardness ${formatPct(hardness)}`}
        />
        <SliderField
          label="Flow"
          valueLabel={formatPct(flow)}
          progress={flow}
          ariaLabel={`Brush flow ${formatPct(flow)}`}
        />

        <div className={styles.colourRow}>
          <span className={styles.fieldLabel}>Colour</span>
          <div className={styles.colourBar} role="group" aria-label="Brush colour">
            <span
              className={styles.colourChip}
              style={{ "--colour-hex": state.hex } as CSSProperties}
              role="img"
              aria-label={`Selected colour ${state.hex.toUpperCase()}`}
            />
            <span className={styles.hexValue}>{state.hex.toUpperCase()}</span>
            <span className={styles.swatchRow}>
              {swatches.map((hex) => (
                <span
                  key={hex}
                  className={styles.swatch}
                  style={{ "--swatch-hex": hex } as CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-label={`Set colour to ${hex.toUpperCase()}`}
                  title={hex.toUpperCase()}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SliderFieldProps {
  label: string
  valueLabel: string
  /** 0 – 1 progress. */
  progress: number
  ariaLabel: string
}

function SliderField({ label, valueLabel, progress, ariaLabel }: SliderFieldProps) {
  const safeProgress = clamp01(progress)
  const style = { "--slider-fill": `${safeProgress * 100}%` } as CSSProperties
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span
        className={styles.slider}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safeProgress * 100)}
        aria-label={ariaLabel}
        style={style}
      >
        <span className={styles.sliderFill} />
        <span className={styles.sliderThumb} aria-hidden="true" />
      </span>
      <span className={styles.fieldValue}>{valueLabel}</span>
    </div>
  )
}
