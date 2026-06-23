import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import { type EquipmentStatus } from "./adr-compliance-types"
import styles from "./test-equipment-status.module.css"

export interface EquipmentItem {
  id: string
  /** Short instrument code used in the leading badge, e.g. "SLM". */
  code: string
  /** Display name, e.g. "Class 2 sound level meter". */
  name: string
  /** Model / serial line. */
  meta: string
  /** Last-checked friendly label, e.g. "2 days ago". */
  lastChecked: string
  /** Status state. */
  status: EquipmentStatus
}

interface TestEquipmentStatusProps {
  /** Heading shown on the wrapping DashboardCard. */
  title?: string
  /** Optional meta line shown under the heading. */
  meta?: string
  /** Equipment items to display. */
  items: ReadonlyArray<EquipmentItem>
  className?: string
}

const STATUS_LABEL: Record<EquipmentStatus, string> = {
  ok: "Ready",
  "due-soon": "Calibration due",
  overdue: "Overdue",
  fault: "Fault",
}

const STATUS_TONE: Record<EquipmentStatus, ChipTone> = {
  ok: "green",
  "due-soon": "amber",
  overdue: "red",
  fault: "red",
}

export function TestEquipmentStatus({
  title = "Test equipment status",
  meta,
  items,
  className,
}: TestEquipmentStatusProps) {
  const okCount = items.filter((item) => item.status === "ok").length
  const ready = items.length > 0 ? Math.round((okCount / items.length) * 100) : 100

  return (
    <DashboardCard
      label="Equipment readiness"
      value={`${okCount}`}
      unit={`/ ${items.length} ready`}
      surface="material"
      className={className}
      meta={meta ?? `${ready}% ready · ${items.length} instruments`}
      spark={
        <div>
          <strong
            style={{
              display: "block",
              marginBottom: "var(--primitive-space-2)",
              color: "var(--primitive-text-strong)",
              fontFamily: "var(--primitive-font-display)",
              fontSize: "var(--primitive-text-md)",
            }}
          >
            {title}
          </strong>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.row}>
                <span className={styles.icon} aria-hidden="true">
                  {item.code}
                </span>
                <div className={styles.body}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.meta}>
                    {item.meta} · Last checked {item.lastChecked}
                  </span>
                </div>
                <Chip
                  className={styles.statusChip}
                  label={STATUS_LABEL[item.status]}
                  tone={STATUS_TONE[item.status]}
                />
              </li>
            ))}
          </ul>
        </div>
      }
    />
  )
}

export default TestEquipmentStatus
