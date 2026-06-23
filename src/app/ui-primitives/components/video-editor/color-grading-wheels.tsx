import styles from "./color-grading-wheels.module.css"
import type { GradingWheelState } from "./video-editor-types"

interface ColorGradingWheelsProps {
  shadows: GradingWheelState
  midtones: GradingWheelState
  highlights: GradingWheelState
  /** Optional title. Defaults to "Color grading". */
  title?: string
}

function clamp01(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 1) return 1
  return value
}

function clampHue(value: number): number {
  if (!Number.isFinite(value)) return 0
  const wrapped = value % 360
  return wrapped < 0 ? wrapped + 360 : wrapped
}

interface WheelProps {
  label: string
  state: GradingWheelState
}

function Wheel({ label, state }: WheelProps) {
  const hue = clampHue(state.hueDegrees)
  const sat = clamp01(state.saturation)
  const lift = clamp01(state.lift)

  // Indicator position: hue determines angle, sat determines radius.
  const radiusPct = sat * 38
  const radians = (hue - 90) * (Math.PI / 180)
  const cx = 50 + Math.cos(radians) * radiusPct
  const cy = 50 + Math.sin(radians) * radiusPct

  return (
    <div className={styles.wheel} role="group" aria-label={`${label} grading`}>
      <div className={styles.wheelBody} aria-hidden="true">
        <span
          className={styles.indicator}
          style={{ left: `${cx}%`, top: `${cy}%` }}
        />
      </div>
      <div className={styles.wheelText}>
        <strong>{label}</strong>
        <span className={styles.wheelMeta}>
          <em>H {hue.toFixed(0)}°</em>
          <em>S {(sat * 100).toFixed(0)}%</em>
        </span>
        <span className={styles.liftRow}>
          <span className={styles.liftLabel}>Lift</span>
          <span className={styles.liftTrack} aria-hidden="true">
            <span
              className={styles.liftFill}
              style={{ width: `${lift * 100}%` }}
            />
          </span>
        </span>
      </div>
    </div>
  )
}

export function ColorGradingWheels({
  shadows,
  midtones,
  highlights,
  title = "Color grading",
}: ColorGradingWheelsProps) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>3-Way · Shadows / Midtones / Highlights</span>
      </header>
      <div className={styles.wheels}>
        <Wheel label="Shadows" state={shadows} />
        <Wheel label="Midtones" state={midtones} />
        <Wheel label="Highlights" state={highlights} />
      </div>
    </div>
  )
}
