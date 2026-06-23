import { GlassSurface } from "../surfaces"
import { ProgressLinear } from "../primitives"

import {
  scoreTone,
  scoreToneToStudioTone,
  studioToneToChip,
  type ScoreTone,
  type SeoMetaPreview,
  type SeoSignal,
} from "./content-studio-types"
import styles from "./seo-inspector.module.css"

interface SeoInspectorProps {
  signals: ReadonlyArray<SeoSignal>
  metaPreview: SeoMetaPreview
  /** Overall composite score (0–100). */
  overallScore?: number
  className?: string
}

const TONE_PROGRESS: Record<ScoreTone, "red" | "amber" | "teal" | "green"> = {
  low: "red",
  mid: "amber",
  high: "teal",
  excellent: "green",
}

function computeOverall(signals: ReadonlyArray<SeoSignal>): number {
  if (signals.length === 0) return 0
  const sum = signals.reduce((acc, s) => acc + s.score, 0)
  return Math.round(sum / signals.length)
}

export function SeoInspector({
  signals,
  metaPreview,
  overallScore,
  className,
}: SeoInspectorProps) {
  const overall = overallScore ?? computeOverall(signals)
  const overallTone = scoreTone(overall)
  const classes = [styles.inspector, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>SEO inspector</span>
            <h2 className={styles.title}>Search readiness</h2>
          </div>
          <div
            className={[styles.overall, styles[`overall_${overallTone}`]]
              .filter(Boolean)
              .join(" ")}
            role="status"
            aria-label={`Composite SEO score: ${overall} out of 100`}
          >
            <strong>{overall}</strong>
            <span>/ 100</span>
          </div>
        </header>

        <div className={styles.preview} aria-label="Google search snippet preview">
          <span className={styles.previewUrl}>{metaPreview.url}</span>
          <span className={styles.previewTitle}>{metaPreview.title}</span>
          <span className={styles.previewDesc}>{metaPreview.description}</span>
        </div>

        <ul className={styles.signals} aria-label="SEO signals">
          {signals.map((signal) => {
            const tone = scoreTone(signal.score)
            const studioTone = scoreToneToStudioTone(tone)
            return (
              <li
                key={signal.id}
                className={[styles.signal, styles[`signal_${tone}`]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.signalHead}>
                  <span className={styles.signalLabel}>{signal.label}</span>
                  <span
                    className={[
                      styles.signalBadge,
                      styles[`badge_${studioToneToChip(studioTone)}`],
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {signal.value}
                  </span>
                </div>
                <ProgressLinear
                  value={signal.score}
                  max={100}
                  tone={TONE_PROGRESS[tone]}
                  showLabel
                  label={`${signal.label} score`}
                />
                <p className={styles.signalHint}>{signal.hint}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </GlassSurface>
  )
}

export default SeoInspector
