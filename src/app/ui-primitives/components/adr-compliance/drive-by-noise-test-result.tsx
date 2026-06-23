import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import {
  classifySoundBand,
  SOUND_BAND_TONE,
  type ComplianceResult,
} from "./adr-compliance-types"
import styles from "./drive-by-noise-test-result.module.css"

type TrafficCondition = "quiet" | "moderate" | "busy"

interface DriveByNoiseTestResultProps {
  /** Headline e.g. "Drive-by · VE Commodore SS". */
  title: string
  /** Overall pass / fail / pending result. */
  result: ComplianceResult
  /** Test speed in km/h. */
  speedKmh: number
  /** Measured drive-by sound level in dB(A). */
  measuredDb: number
  /** Ambient (background) sound level recorded prior to drive-by. */
  ambientDb: number
  /** ADR limit applicable. */
  limitDb: number
  /** Traffic condition during the test. */
  traffic: TrafficCondition
  /** Optional caption beneath the headline. */
  caption?: string
  className?: string
}

const RESULT_LABEL: Record<ComplianceResult, string> = {
  pass: "Pass",
  fail: "Fail",
  pending: "TBD",
}

const RESULT_CLASS: Record<ComplianceResult, string> = {
  pass: styles.stampPass,
  fail: styles.stampFail,
  pending: styles.stampPending,
}

const TRAFFIC_LABEL: Record<TrafficCondition, string> = {
  quiet: "Quiet street",
  moderate: "Moderate traffic",
  busy: "Busy / motorway",
}

const TRAFFIC_TONE: Record<TrafficCondition, "green" | "amber" | "red"> = {
  quiet: "green",
  moderate: "amber",
  busy: "red",
}

function DriveByDetails({
  title,
  result,
  speedKmh,
  measuredDb,
  ambientDb,
  limitDb,
  traffic,
}: Omit<DriveByNoiseTestResultProps, "className" | "caption">) {
  const band = classifySoundBand(measuredDb, limitDb)
  const ambientHeadroom = measuredDb - ambientDb

  return (
    <div className={styles.result} role="group" aria-label={`Drive-by noise test result for ${title}`}>
      <div className={styles.summary}>
        <div
          className={RESULT_CLASS[result]}
          role={result === "fail" ? "alert" : "img"}
          aria-label={`Result ${RESULT_LABEL[result]}`}
        >
          {RESULT_LABEL[result]}
        </div>
        <div className={styles.headline}>
          <span className={styles.kicker}>Drive-by · stage test</span>
          <h4>{title}</h4>
          <span>Measured against ADR drive-by close-proximity protocol.</span>
        </div>
      </div>

      <dl className={styles.metricsRow}>
        <div className={styles.metric}>
          <dt className={styles.metricLabel}>Test speed</dt>
          <dd className={styles.metricValue} style={{ margin: 0 }}>
            {speedKmh}
            <span className={styles.metricUnit}>km/h</span>
          </dd>
        </div>
        <div className={styles.metric}>
          <dt className={styles.metricLabel}>Ambient</dt>
          <dd className={styles.metricValue} style={{ margin: 0 }}>
            {ambientDb.toFixed(1)}
            <span className={styles.metricUnit}>dB(A)</span>
          </dd>
        </div>
        <div className={styles.metric}>
          <dt className={styles.metricLabel}>Δ vs ambient</dt>
          <dd className={styles.metricValue} style={{ margin: 0 }}>
            +{ambientHeadroom.toFixed(1)}
            <span className={styles.metricUnit}>dB</span>
          </dd>
        </div>
      </dl>

      <div className={styles.contextRow}>
        <Chip label={TRAFFIC_LABEL[traffic]} tone={TRAFFIC_TONE[traffic]} />
        <Chip label={`Band · ${band}`} tone={SOUND_BAND_TONE[band]} />
        <Chip label={`Limit ${limitDb} dB`} tone="neutral" />
      </div>
    </div>
  )
}

export function DriveByNoiseTestResult({
  title,
  result,
  speedKmh,
  measuredDb,
  ambientDb,
  limitDb,
  traffic,
  caption,
  className,
}: DriveByNoiseTestResultProps) {
  const overLimit = measuredDb > limitDb
  return (
    <DashboardCard
      label={`Drive-by noise · ADR ${limitDb} dB(A) limit`}
      value={measuredDb.toFixed(1)}
      unit="dB(A)"
      surface="material"
      className={className}
      meta={caption ?? `Speed ${speedKmh} km/h · ${TRAFFIC_LABEL[traffic]}`}
      delta={{
        label: overLimit ? `Over limit` : `Within ADR`,
        direction: overLimit ? "up" : "down",
      }}
      spark={
        <DriveByDetails
          title={title}
          result={result}
          speedKmh={speedKmh}
          measuredDb={measuredDb}
          ambientDb={ambientDb}
          limitDb={limitDb}
          traffic={traffic}
        />
      }
    />
  )
}

export default DriveByNoiseTestResult
