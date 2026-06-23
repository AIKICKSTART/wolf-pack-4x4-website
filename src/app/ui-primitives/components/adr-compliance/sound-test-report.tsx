import { AudioWaveform } from "../audio/audio-waveform"
import type { AudioWaveformSamples } from "../audio/audio-types"
import { Chip } from "../primitives/chip"

import { ComplianceBandChip } from "./compliance-band-chip"
import {
  classifySoundBand,
  type SoundComplianceBand,
  type TestPosition,
} from "./adr-compliance-types"
import styles from "./sound-test-report.module.css"

interface SoundTestReportProps {
  /** Heading, e.g. "VE Commodore SS · Cat-back report". */
  title: string
  /** Pre-modification baseline reading. */
  preModDb: number
  /** Post-modification reading. */
  postModDb: number
  /** Applicable ADR limit. */
  limitDb: number
  /** ADR rule label, e.g. "ADR 28/01". */
  ruleLabel: string
  /** Microphone position used during the test. */
  position: TestPosition
  /** ISO timestamp at which the test concluded. */
  testedIso: string
  /** Friendly tested-at label, e.g. "Mon 27 May · 10:48". */
  testedAt: string
  /** Technician name printed in the signed-by chip. */
  signedBy: string
  /** Optional pre-mod waveform samples (0..1). */
  preSamples?: AudioWaveformSamples
  /** Optional post-mod waveform samples (0..1). */
  postSamples?: AudioWaveformSamples
  className?: string
}

const POSITION_LABEL: Record<TestPosition, string> = {
  stationary: "0.5 m stationary",
  "drive-by": "7.5 m drive-by",
  "rev-test": "3/4 rated rev",
}

export function SoundTestReport({
  title,
  preModDb,
  postModDb,
  limitDb,
  ruleLabel,
  position,
  testedIso,
  testedAt,
  signedBy,
  preSamples,
  postSamples,
  className,
}: SoundTestReportProps) {
  const delta = postModDb - preModDb
  const deltaAbs = Math.abs(delta)
  const deltaClass =
    delta > 0.05 ? styles.deltaNegative : delta < -0.05 ? styles.deltaPositive : styles.deltaFlat
  const deltaGlyph = delta > 0.05 ? "+" : delta < -0.05 ? "−" : "≈"

  const postBand: SoundComplianceBand = classifySoundBand(postModDb, limitDb)

  const classes = [styles.report, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Sound test report — ${title}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Sound test report · {ruleLabel}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.timeMeta}>
          Tested
          <strong>
            <time dateTime={testedIso}>{testedAt}</time>
          </strong>
        </div>
      </header>

      <div className={styles.results}>
        <div className={styles.col}>
          <span className={styles.colLabel}>Pre-modification</span>
          <span className={styles.colValue}>
            {preModDb.toFixed(1)}
            <span className={styles.colUnit}>dB(A)</span>
          </span>
        </div>
        <div
          className={`${styles.delta} ${deltaClass}`}
          aria-label={`Change ${deltaGlyph} ${deltaAbs.toFixed(1)} decibels`}
        >
          <span>
            {deltaGlyph}
            {deltaAbs.toFixed(1)}
            <span className={styles.deltaUnit}>dB</span>
          </span>
        </div>
        <div className={styles.col}>
          <span className={styles.colLabel}>Post-modification</span>
          <span className={styles.colValue}>
            {postModDb.toFixed(1)}
            <span className={styles.colUnit}>dB(A)</span>
          </span>
        </div>
      </div>

      <div className={styles.waveformRow}>
        <div className={styles.waveformCard}>
          <span className={styles.waveformLabel}>
            <span>Pre-mod capture</span>
            <span>0–2.5 s</span>
          </span>
          <AudioWaveform
            samples={preSamples}
            tone="neutral"
            variant="compact"
            ariaLabel="Pre-modification exhaust waveform"
          />
        </div>
        <div className={styles.waveformCard}>
          <span className={styles.waveformLabel}>
            <span>Post-mod capture</span>
            <span>0–2.5 s</span>
          </span>
          <AudioWaveform
            samples={postSamples}
            tone="red"
            variant="compact"
            ariaLabel="Post-modification exhaust waveform"
          />
        </div>
      </div>

      <div className={styles.diagram}>
        <div className={styles.diagramSketch} aria-hidden="true" />
        <div className={styles.diagramCopy}>
          <strong>Microphone position</strong>
          <span>{POSITION_LABEL[position]} · ADR limit {limitDb} dB(A)</span>
        </div>
      </div>

      <div className={styles.signedRow}>
        <span className={styles.signedLabel}>Signed off</span>
        <Chip label={signedBy} tone="teal" />
        <ComplianceBandChip band={postBand} />
      </div>
    </article>
  )
}

export default SoundTestReport
