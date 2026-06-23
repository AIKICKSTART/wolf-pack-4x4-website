"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { Sparkline } from "../charts/sparkline"
import { RadialMeter } from "../charts/radial-meter"
import { StatTile } from "../primitives/stat-tile"

import styles from "./umbrella-preview.module.css"

interface UmbrellaPreviewProps {
  className?: string
}

const SPARKLINE_POINTS: ReadonlyArray<number> = [12, 18, 14, 22, 28, 24, 30, 38, 34, 42, 48, 44, 52]

export function UmbrellaPreview({ className }: UmbrellaPreviewProps) {
  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label="Umbrella preview">
      <header className={styles.head}>
        <span className={styles.kicker}>Cascade preview</span>
        <h2 className={styles.title}>Every primitive, one root</h2>
        <p className={styles.lede}>
          Each tile below reads from the same `--primitive-*` tokens scoped on the controller wrapper. Re-skin once,
          every primitive responds.
        </p>
      </header>

      <div className={styles.grid}>
        <article className={styles.heroTile}>
          <span className={styles.tileKicker}>Hero</span>
          <h3 className={styles.heroHeadline}>Oak Flats workshop</h3>
          <p className={styles.heroCopy}>
            Production-floor primitives styled by the token cascade. Tap a preset to see the whole subtree re-paint.
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={`${styles.btn} ${styles.btnRed}`}>
              Book hoist
            </button>
            <button type="button" className={styles.btn}>
              View parts
            </button>
          </div>
        </article>

        <StatTile
          label="Active bookings"
          value="42"
          delta={{ value: "+8%", direction: "up", helpText: "vs last 7 days" }}
          sparkline={SPARKLINE_POINTS.slice()}
          tone="amber"
          caption="Last 14 days"
        />

        <StatTile
          label="Workshop load"
          value="78"
          unit="%"
          delta={{ value: "-3%", direction: "down" }}
          sparkline={SPARKLINE_POINTS.slice().reverse()}
          tone="teal"
        />

        <article className={styles.metricTile}>
          <span className={styles.tileKicker}>Trend</span>
          <strong className={styles.metricValue}>$182,400</strong>
          <span className={styles.metricLabel}>Revenue this month</span>
          <Sparkline
            points={SPARKLINE_POINTS.slice()}
            ariaLabel="Monthly revenue trend"
            tone="red"
            area
            width={220}
            height={48}
          />
        </article>

        <article className={styles.peopleTile}>
          <span className={styles.tileKicker}>Crew</span>
          <div className={styles.avatars}>
            <Avatar name="Marlene Holst" tone="red" status="online" />
            <Avatar name="Jonas Kerr" tone="amber" status="busy" />
            <Avatar name="Vela Tran" tone="teal" status="away" />
            <Avatar name="Bryn Okafor" tone="green" status="online" />
          </div>
          <div className={styles.chipRow}>
            <Chip label="Welder" tone="red" selected />
            <Chip label="Fitter" tone="amber" />
            <Chip label="Diag" tone="teal" />
            <Chip label="Front" tone="green" />
          </div>
        </article>

        <article className={styles.meterTile}>
          <span className={styles.tileKicker}>Capacity</span>
          <RadialMeter
            value={68}
            label="Hoists"
            ariaLabel="Hoist utilisation 68 percent"
            tone="green"
            size={120}
            caption="3 of 4 hoists in use"
          />
        </article>

        <article className={styles.progressTile}>
          <span className={styles.tileKicker}>Throughput</span>
          <h3 className={styles.progressTitle}>Job pipeline</h3>
          <div className={styles.progressBlock}>
            <span className={styles.progressLabel}>Diag complete</span>
            <ProgressLinear value={84} tone="green" label="Diagnostic completion" />
          </div>
          <div className={styles.progressBlock}>
            <span className={styles.progressLabel}>Parts staged</span>
            <ProgressLinear value={62} tone="amber" label="Parts staged" />
          </div>
          <div className={styles.progressBlock}>
            <span className={styles.progressLabel}>Final QA</span>
            <ProgressLinear value={31} tone="red" label="Final QA" />
          </div>
        </article>
      </div>
    </section>
  )
}
