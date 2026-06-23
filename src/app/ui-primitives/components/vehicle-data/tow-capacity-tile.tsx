import { Truck, Weight, Anchor } from "lucide-react"
import type { ReactNode } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import { formatKm } from "./vehicle-data-types"
import styles from "./tow-capacity-tile.module.css"

interface TowCapacityTileProps {
  /** Vehicle label rendered in the header. */
  vehicleLabel: string
  /** Maximum braked tow capacity, kg. */
  brakedKg: number
  /** Maximum unbraked tow capacity, kg. */
  unbrakedKg: number
  /** Maximum towball download, kg. */
  ballWeightKg: number
  /** Optional currently loaded trailer weight, kg. */
  currentLoadKg?: number
  /** Optional GCM (gross combination mass), kg. */
  gcmKg?: number
  className?: string
}

interface MetricProps {
  icon: ReactNode
  label: string
  value: string
  helper?: string
  tone?: ChipTone
}

function Metric({ icon, label, value, helper, tone }: MetricProps) {
  return (
    <li className={styles.metric}>
      <span className={styles.metricIcon} aria-hidden="true">
        {icon}
      </span>
      <div className={styles.metricBody}>
        <span className={styles.metricLabel}>{label}</span>
        <span className={styles.metricValue}>{value}</span>
        {helper ? <span className={styles.metricHelper}>{helper}</span> : null}
      </div>
      {tone ? <Chip label={tone === "red" ? "Over" : tone === "amber" ? "Near limit" : "OK"} tone={tone} /> : null}
    </li>
  )
}

const KG_FORMATTER = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 })

function formatKg(value: number): string {
  return `${KG_FORMATTER.format(Math.round(value))} kg`
}

export function TowCapacityTile({
  vehicleLabel,
  brakedKg,
  unbrakedKg,
  ballWeightKg,
  currentLoadKg,
  gcmKg,
  className,
}: TowCapacityTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const loadRatio = currentLoadKg != null ? Math.min(1, currentLoadKg / brakedKg) : 0
  const loadTone: ChipTone | undefined =
    currentLoadKg != null
      ? loadRatio >= 1
        ? "red"
        : loadRatio >= 0.85
          ? "amber"
          : "green"
      : undefined

  return (
    <section className={classes} aria-label="Tow capacity">
      <header className={styles.head}>
        <span className={styles.kicker}>ADR tow capacity</span>
        <h2 className={styles.title}>{vehicleLabel}</h2>
      </header>

      <ul className={styles.metrics}>
        <Metric
          icon={<Truck size={16} strokeWidth={2.2} />}
          label="Braked trailer"
          value={formatKg(brakedKg)}
          helper="Maximum"
        />
        <Metric
          icon={<Truck size={16} strokeWidth={2.2} />}
          label="Unbraked trailer"
          value={formatKg(unbrakedKg)}
          helper="Maximum"
        />
        <Metric
          icon={<Anchor size={16} strokeWidth={2.2} />}
          label="Towball download"
          value={formatKg(ballWeightKg)}
          helper="Maximum"
        />
        {gcmKg != null ? (
          <Metric
            icon={<Weight size={16} strokeWidth={2.2} />}
            label="Gross combination mass"
            value={formatKg(gcmKg)}
            helper="GCM"
          />
        ) : null}
      </ul>

      {currentLoadKg != null ? (
        <div className={styles.load}>
          <div className={styles.loadHead}>
            <span className={styles.loadLabel}>Currently towing</span>
            <span className={styles.loadValue}>{formatKg(currentLoadKg)}</span>
            {loadTone ? (
              <Chip
                label={
                  loadTone === "red"
                    ? "Over capacity"
                    : loadTone === "amber"
                      ? "Near limit"
                      : "Within limit"
                }
                tone={loadTone}
              />
            ) : null}
          </div>
          <ProgressLinear
            value={loadRatio}
            max={1}
            tone={loadTone ?? "teal"}
            variant="solid"
            label={`Towing ${formatKg(currentLoadKg)} of ${formatKg(brakedKg)} braked capacity`}
            showLabel={false}
          />
          <p className={styles.helper}>
            {/* Helper provides context for trailer planning across long NSW hauls. */}
            Braked capacity assumes the trailer has a working electric or
            mechanical brake system rated for the load — required by ADR for
            anything heavier than {formatKg(unbrakedKg)}.
          </p>
          <p className={styles.helperRange}>
            Highway range cushion: {formatKm(80)} buffer kept for headwind +
            climb on the Macquarie Pass.
          </p>
        </div>
      ) : null}
    </section>
  )
}

export default TowCapacityTile
