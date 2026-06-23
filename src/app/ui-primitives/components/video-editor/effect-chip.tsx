import styles from "./effect-chip.module.css"
import type { EffectKind, EffectParameter } from "./video-editor-types"

interface EffectChipProps {
  /** Effect family — drives icon + accent. */
  kind: EffectKind
  /** Display name e.g. "Cinematic LUT — Workshop Steel". */
  name: string
  /** On/off state. */
  enabled: boolean
  /** When true the parameters popover is rendered. */
  popoverOpen?: boolean
  /** Slider parameters rendered inside the popover. */
  parameters?: ReadonlyArray<EffectParameter>
  /** Compact mode for inline pill rendering. */
  compact?: boolean
}

const KIND_GLYPH: Record<EffectKind, string> = {
  color: "★",
  blur: "○",
  stabilize: "▲",
  denoise: "≈",
  lut: "▦",
  "audio-eq": "Ξ",
  "audio-gate": "▽",
}

const KIND_TONE: Record<EffectKind, string> = {
  color: styles.toneAmber,
  blur: styles.toneTeal,
  stabilize: styles.toneGreen,
  denoise: styles.toneTeal,
  lut: styles.toneRed,
  "audio-eq": styles.toneAmber,
  "audio-gate": styles.toneGreen,
}

function clamp01(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 1) return 1
  return value
}

export function EffectChip({
  kind,
  name,
  enabled,
  popoverOpen = false,
  parameters,
  compact = false,
}: EffectChipProps) {
  const chipClasses = [styles.chip, KIND_TONE[kind]]
  if (!enabled) chipClasses.push(styles.chipDisabled)
  if (compact) chipClasses.push(styles.chipCompact)

  return (
    <span className={styles.wrap}>
      <span
        className={chipClasses.join(" ")}
        role="button"
        tabIndex={0}
        aria-pressed={enabled}
      >
        <span className={styles.glyph} aria-hidden="true">{KIND_GLYPH[kind]}</span>
        <span className={styles.label}>{name}</span>
        <span
          className={[styles.toggle, enabled ? styles.toggleOn : ""].join(" ")}
          aria-hidden="true"
        >
          <i />
        </span>
      </span>
      {popoverOpen && parameters && parameters.length > 0 ? (
        <div className={styles.popover} role="dialog" aria-label={`${name} parameters`}>
          <span className={styles.popoverTitle}>{name}</span>
          <ul className={styles.paramList}>
            {parameters.map((param) => (
              <li key={param.label} className={styles.paramRow}>
                <span className={styles.paramLabel}>{param.label}</span>
                <span className={styles.slider} aria-hidden="true">
                  <span
                    className={styles.sliderFill}
                    style={{ width: `${clamp01(param.value) * 100}%` }}
                  />
                  <span
                    className={styles.sliderThumb}
                    style={{ left: `${clamp01(param.value) * 100}%` }}
                  />
                </span>
                <span className={styles.paramValue}>
                  {param.display ?? param.value.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </span>
  )
}
