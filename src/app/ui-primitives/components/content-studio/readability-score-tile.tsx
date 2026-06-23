import { ProgressRadial } from "../primitives"
import { NeuoSurface } from "../surfaces"

import {
  fleschTone,
  scoreToneToStudioTone,
  type ReadabilityScore,
} from "./content-studio-types"
import styles from "./readability-score-tile.module.css"

interface ReadabilityScoreTileProps {
  score: ReadabilityScore
  /** Optional title override. */
  label?: string
  className?: string
}

const TONE_PROGRESS: Record<
  "low" | "mid" | "high" | "excellent",
  "red" | "amber" | "teal" | "green"
> = {
  low: "red",
  mid: "amber",
  high: "teal",
  excellent: "green",
}

const TONE_DESCRIPTION: Record<"low" | "mid" | "high" | "excellent", string> = {
  low: "Hard going — try shorter sentences and plainer words.",
  mid: "Readable for adult readers but could be punchier.",
  high: "Plain English — comfortable for most customers.",
  excellent: "Very easy — like reading a customer story aloud.",
}

export function ReadabilityScoreTile({
  score,
  label,
  className,
}: ReadabilityScoreTileProps) {
  const tone = fleschTone(score.fleschEase)
  const studio = scoreToneToStudioTone(tone)
  const classes = [
    styles.tile,
    styles[`tone_${studio}`],
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const easeRounded = Math.round(score.fleschEase * 10) / 10

  return (
    <NeuoSurface tone="obsidian" className={classes}>
      <section className={styles.shell} aria-label="Readability score">
        <header className={styles.head}>
          <span className={styles.kicker}>Readability</span>
          <h2 className={styles.title}>{label ?? "Flesch reading ease"}</h2>
        </header>

        <div className={styles.dialRow}>
          <ProgressRadial
            value={Math.min(100, score.fleschEase)}
            tone={TONE_PROGRESS[tone]}
            size="lg"
            label="Flesch reading ease"
            showLabel
          />
          <div className={styles.legend}>
            <span className={styles.legendValue}>{easeRounded.toFixed(1)}</span>
            <span className={styles.legendUnit}>Flesch ease (0–100)</span>
            <p className={styles.legendDesc}>{TONE_DESCRIPTION[tone]}</p>
          </div>
        </div>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Grade level</dt>
            <dd>
              <strong>{score.gradeLevel.toFixed(1)}</strong>
              <em>school year</em>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Avg sentence length</dt>
            <dd>
              <strong>{score.avgSentenceLength.toFixed(1)}</strong>
              <em>words</em>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Long words</dt>
            <dd>
              <strong>{score.longWordPercent.toFixed(1)}%</strong>
              <em>of total</em>
            </dd>
          </div>
        </dl>
      </section>
    </NeuoSurface>
  )
}

export default ReadabilityScoreTile
