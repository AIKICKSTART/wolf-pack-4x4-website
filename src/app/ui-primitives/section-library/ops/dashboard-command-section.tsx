/**
 * Dashboard command — Operations section.
 *
 * A production-ready page section that composes existing primitives into a
 * workshop command surface: headline metrics, four telemetry tiles with
 * sparkline trends, a live bay-status board, and an activity feed. Fully
 * token-driven (carbon/metallic via tokens, CTAs use the metallic red→amber
 * button DNA). Light/dark, responsive 320→1920, reduced-motion, a11y.
 *
 * Composed from (no primitives rebuilt — imported by path):
 *   - dashboards/DashboardTile
 *   - data-display/MetricBlock, DashboardCard, ActivityFeed, StatusBadgeGrid
 *   - charts/Sparkline
 */

import { ActivityFeed } from "../../components/data-display/activity-feed"
import Link from "next/link"
import { DashboardCard } from "../../components/data-display/dashboard-card"
import { MetricBlock } from "../../components/data-display/metric-block"
import { StatusBadgeGrid } from "../../components/data-display/status-badge-grid"
import { DashboardTile } from "../../components/dashboards/dashboard-tile"
import { Sparkline } from "../../components/charts/sparkline"

import {
  COMMAND_ACTIVITY,
  COMMAND_HEADLINE_METRICS,
  COMMAND_STATUS_BADGES,
  COMMAND_TILES,
} from "./_mock-data"
import styles from "./sections-ops.module.css"

export interface DashboardCommandSectionProps {
  /** Section eyebrow. */
  kicker?: string
  /** Section heading. */
  title?: string
  /** Supporting lede. */
  lede?: string
  /** Primary CTA label (uses the metallic red→amber button DNA). */
  ctaLabel?: string
  /** Primary CTA href. */
  ctaHref?: string
  className?: string
}

export function DashboardCommandSection({
  kicker = "Workshop command",
  title = "Run the floor at a glance",
  lede = "Every bay, booking and dollar in one live surface — the Oak Flats Mufflermen command deck, built from registered primitives.",
  ctaLabel = "Open full dashboard",
  ctaHref = "/ui-primitives/dashboards",
  className,
}: DashboardCommandSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-labelledby="ops-command-title"
      role="region"
    >
      <header className={styles.sectionHead}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id="ops-command-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.lede}>{lede}</p>
        <div className={styles.actionRow}>
          <a className={styles.ctaPrimary} href={ctaHref}>
            {ctaLabel}
          </a>
          <Link className={styles.ctaSecondary} href="/ui-primitives/workshop-ops">
            Workshop ops
          </Link>
        </div>
      </header>

      <div className={styles.commandMetrics}>
        <MetricBlock metrics={COMMAND_HEADLINE_METRICS} />
      </div>

      <div className={styles.commandGrid}>
        {COMMAND_TILES.map((tile) => (
          <DashboardTile
            key={tile.id}
            label={tile.label}
            aside={tile.aside}
            tone={tile.tone}
          >
            <DashboardCard
              label={tile.cardLabel}
              value={tile.cardValue}
              unit={tile.cardUnit}
              meta={tile.cardMeta}
              surface="glass"
              delta={tile.delta}
              spark={
                <span className={styles.commandCardSpark}>
                  <Sparkline
                    points={tile.spark}
                    tone={tile.sparkTone}
                    ariaLabel={`${tile.cardLabel} trend`}
                    width={180}
                    height={40}
                  />
                </span>
              }
            />
          </DashboardTile>
        ))}
      </div>

      <div className={styles.commandSplit}>
        <div className={styles.commandPanel}>
          <p className={styles.panelLabel}>
            <span>Live activity</span>
            <span className={styles.liveDot}>Streaming</span>
          </p>
          <ActivityFeed
            items={COMMAND_ACTIVITY}
            ariaLabel="Workshop activity feed"
          />
        </div>
        <div className={styles.commandPanel}>
          <p className={styles.panelLabel}>
            <span>Bay status board</span>
            <span aria-hidden="true">6 / 8</span>
          </p>
          <StatusBadgeGrid badges={COMMAND_STATUS_BADGES} />
        </div>
      </div>
    </section>
  )
}

export default DashboardCommandSection
