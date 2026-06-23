import type { Metadata } from "next"
import Link from "next/link"
import { Activity, ArrowUpRight, Flame, Radio, ThermometerSun, Wifi } from "lucide-react"

import {
  DonutChart,
  RadialMeter,
  SignalStrength,
  type DonutSegment,
  type SignalTone,
} from "../../components/charts"
import { ButtonDnaLink } from "../../components/button-dna-link"

import styles from "./exhaust-telemetry.module.css"

export const metadata: Metadata = {
  title: "Workshop exhaust telemetry | UI Primitives — Sandbox",
  description:
    "Sandbox surface composing signal-strength, donut-chart, and radial-meter for live workshop telemetry.",
}

interface SensorReading {
  bay: string
  channel: string
  level: 0 | 1 | 2 | 3 | 4 | 5
  tone: SignalTone
  state: string
}

const sensors: SensorReading[] = [
  { bay: "Bay 1", channel: "O2 · pre-cat", level: 5, tone: "green", state: "Nominal" },
  { bay: "Bay 1", channel: "O2 · post-cat", level: 4, tone: "green", state: "Nominal" },
  { bay: "Bay 2", channel: "EGT · midpipe", level: 3, tone: "amber", state: "Warming" },
  { bay: "Bay 2", channel: "Knock · cyl 4", level: 2, tone: "amber", state: "Watch" },
  { bay: "Bay 3", channel: "Lambda · tip", level: 5, tone: "teal", state: "Streaming" },
  { bay: "Bay 3", channel: "Boost · turbo", level: 1, tone: "red", state: "Loss" },
]

const exhaustComposition: DonutSegment[] = [
  { label: "N₂", value: 71, tone: "teal" },
  { label: "CO₂", value: 13, tone: "amber" },
  { label: "H₂O", value: 11, tone: "green" },
  { label: "Other", value: 5, tone: "red" },
]

const liveMetrics = [
  { label: "Manifold heat", value: 78, tone: "red" as const, unit: "%" },
  { label: "AFR target", value: 92, tone: "green" as const, unit: "%" },
  { label: "Backpressure", value: 58, tone: "amber" as const, unit: "%" },
]

export default function ExhaustTelemetrySandbox() {
  return (
    <main className={styles.page} aria-labelledby="exhaust-telemetry-title">
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Sandbox · Workshop telemetry</span>
          <h1 id="exhaust-telemetry-title" className={styles.headline}>
            Live exhaust telemetry across the workshop
          </h1>
          <p className={styles.subhead}>
            Experimental view of the workshop sensor mesh. Signal-strength bars expose each
            channel&apos;s live link quality; the radial meter trio reports manifold heat, AFR
            target, and backpressure; the donut chart breaks down exhaust composition from the
            tip sniffer.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)", justifyContent: "flex-end" }}>
          <ButtonDnaLink />
          <Link href="/ui-primitives/sandbox" className={styles.backLink}>
            <ArrowUpRight aria-hidden="true" />
            Back to sandbox
          </Link>
        </div>
      </header>

      <section className={styles.metricsRow} aria-label="Live manifold metrics">
        {liveMetrics.map((metric) => (
          <article key={metric.label} className={styles.metricCard} data-tone={metric.tone}>
            <span className={styles.metricKicker}>
              <Activity aria-hidden="true" />
              Live · 1Hz
            </span>
            <div className={styles.metricMeter}>
              <RadialMeter
                value={metric.value}
                label={metric.label}
                tone={metric.tone}
                ariaLabel={`${metric.label} at ${metric.value} percent`}
                size={140}
                unit={metric.unit}
              />
            </div>
            <span className={styles.metricCaption}>
              {metric.label === "Manifold heat" ? "Cooling fan margin tightening" : null}
              {metric.label === "AFR target" ? "Mix stable, no drift detected" : null}
              {metric.label === "Backpressure" ? "Mid-pipe within design envelope" : null}
            </span>
          </article>
        ))}
      </section>

      <section className={styles.lowerGrid} aria-label="Sensor mesh and composition">
        <article className={styles.sensorPanel}>
          <header className={styles.panelHead}>
            <Radio aria-hidden="true" />
            <div className={styles.panelHeadCopy}>
              <span className={styles.panelKicker}>Sensor mesh · 6 channels</span>
              <h2 className={styles.panelTitle}>Live link quality per bay</h2>
            </div>
            <span className={styles.panelMeta}>
              <Wifi aria-hidden="true" />
              4.7 GHz mesh
            </span>
          </header>
          <ul className={styles.sensorList}>
            {sensors.map((sensor, idx) => (
              <li key={`${sensor.bay}-${sensor.channel}`} className={styles.sensorRow} style={{ animationDelay: `${idx * 60}ms` }}>
                <span className={styles.sensorBay}>{sensor.bay}</span>
                <span className={styles.sensorChannel}>{sensor.channel}</span>
                <SignalStrength
                  level={sensor.level}
                  tone={sensor.tone}
                  ariaLabel={`${sensor.bay} ${sensor.channel}: signal ${sensor.level} of 5`}
                  size={36}
                />
                <span className={styles.sensorState} data-tone={sensor.tone}>
                  {sensor.state}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.compositionCard}>
          <header className={styles.panelHead}>
            <Flame aria-hidden="true" />
            <div className={styles.panelHeadCopy}>
              <span className={styles.panelKicker}>Tip sniffer · 60s avg</span>
              <h2 className={styles.panelTitle}>Exhaust composition</h2>
            </div>
            <span className={styles.panelMeta}>
              <ThermometerSun aria-hidden="true" />
              612 °C tip
            </span>
          </header>
          <DonutChart
            ariaLabel="Exhaust gas composition by volume percent, averaged over the last 60 seconds"
            segments={exhaustComposition}
            centerLabel="100%"
            centerCaption="Tip sample"
          />
        </article>
      </section>
    </main>
  )
}
