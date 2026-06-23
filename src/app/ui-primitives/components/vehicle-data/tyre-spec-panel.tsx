import { Chip } from "../primitives/chip"

import styles from "./tyre-spec-panel.module.css"

export interface TyreAxleSpec {
  /** Section width × aspect / construction × rim diameter. E.g. "265/70R17". */
  size: string
  /** Load index (e.g. 116). */
  loadIndex: number
  /** Speed rating letter (e.g. "S"). */
  speedRating: string
  /** Cold inflation pressure, kPa. */
  pressureKpa: number
  /** Maximum cold pressure stamped on the sidewall, kPa. */
  maxPressureKpa?: number
}

interface TyreSpecPanelProps {
  front: TyreAxleSpec
  rear: TyreAxleSpec
  /** Tyre brand + model rendered as a header chip. */
  brand?: string
  /** Optional ADR / placard reference. */
  placard?: string
  className?: string
}

interface AxleRowProps {
  label: string
  spec: TyreAxleSpec
}

function AxleRow({ label, spec }: AxleRowProps) {
  return (
    <article className={styles.axle} aria-label={`${label} axle tyre spec`}>
      <header className={styles.axleHead}>
        <span className={styles.axleKicker}>{label}</span>
        <Chip label={`${spec.loadIndex}${spec.speedRating}`} tone="teal" />
      </header>
      <p className={styles.size}>{spec.size}</p>
      <dl className={styles.facts}>
        <div>
          <dt>Pressure</dt>
          <dd>{spec.pressureKpa} kPa</dd>
        </div>
        {spec.maxPressureKpa ? (
          <div>
            <dt>Max</dt>
            <dd>{spec.maxPressureKpa} kPa</dd>
          </div>
        ) : null}
        <div>
          <dt>Load idx</dt>
          <dd>{spec.loadIndex}</dd>
        </div>
        <div>
          <dt>Speed</dt>
          <dd>{spec.speedRating}</dd>
        </div>
      </dl>
    </article>
  )
}

export function TyreSpecPanel({
  front,
  rear,
  brand,
  placard,
  className,
}: TyreSpecPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Tyre specification panel">
      <header className={styles.head}>
        <span className={styles.kicker}>Tyre spec · ADR placard</span>
        <h2 className={styles.title}>Front + rear fitment</h2>
        {brand ? <Chip label={brand} tone="amber" /> : null}
      </header>
      <div className={styles.grid}>
        <AxleRow label="Front axle" spec={front} />
        <AxleRow label="Rear axle" spec={rear} />
      </div>
      {placard ? (
        <p className={styles.placard}>
          <span>Placard reference</span>
          {placard}
        </p>
      ) : null}
    </section>
  )
}

export default TyreSpecPanel
