import type { Metadata } from "next"

import { StatTile } from "../../components/primitives/stat-tile"
import { PageHeader } from "../../components/page-header"

import { LogsViewer } from "./_logs-viewer"
import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  STREAM_LABEL,
  STREAM_STATS,
} from "./_demo-data"
import styles from "./logs-viewer.module.css"

export const metadata: Metadata = {
  title: "Logs viewer | Torque",
  description:
    "The structured log stream behind Oak Flats Muffler Men's Torque assistant — quote drafting, SMS, supplier stock, payments and the public site. Filter by level and source, search, live-tail, and expand any line. Composed entirely from UI primitives.",
}

export default function LogsViewerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Observability"
        title="Logs viewer"
        description="Every action Torque takes for the workshop leaves a structured trace. Filter the live stream by level and source, search across messages and fields, pause the tail when you need to read, and expand any line for its timestamp, correlation id and full context. Light + dark, responsive, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Logs viewer" },
        ]}
      />

      {/* Console identity band — placeholder Torque avatar + live status.
          The customer-facing assistant brand is always "Torque". */}
      <section className={styles.band} aria-label="Stream identity and status">
        <div className={styles.bandId}>
          <span
            className={styles.torqueAvatar}
            role="img"
            aria-label="Torque, your Mufflermen business assistant"
          >
            <span aria-hidden="true">T</span>
          </span>
          <span className={styles.bandText}>
            <span className={styles.bandName}>Torque</span>
            <span className={styles.bandTitle}>{BUSINESS_NAME} · platform logs</span>
            <span className={styles.bandRole}>Your Mufflermen business assistant</span>
          </span>
        </div>
        <p className={styles.bandMeta}>
          <span className={styles.liveDot}>{STREAM_LABEL}</span>
          <span>{BUSINESS_REGION}</span>
          <span>Retention 14 days</span>
        </p>
      </section>

      {/* Summary stat strip */}
      <section
        className={styles.statStrip}
        aria-label="Stream health summary"
      >
        {STREAM_STATS.map((stat) => (
          <StatTile
            key={stat.id}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            tone={stat.tone}
            delta={stat.delta}
            sparkline={stat.sparkline ? [...stat.sparkline] : undefined}
            caption={stat.caption}
          />
        ))}
      </section>

      <LogsViewer />
    </main>
  )
}
