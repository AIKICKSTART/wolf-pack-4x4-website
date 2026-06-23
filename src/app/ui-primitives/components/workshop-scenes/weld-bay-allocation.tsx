import { AvailabilityGrid } from "../calendar/availability-grid"
import type { BayRow } from "../calendar/availability-grid"
import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import styles from "./weld-bay-allocation.module.css"

export interface WeldBay {
  id: string
  label: string
  /** Technician currently rostered on this bay. */
  technician: string
  /** Optional ARC ticket number / cert tag. */
  certTag?: string
}

export interface UnassignedJob {
  id: string
  jobNumber: string
  customer: string
  vehicle: string
  /** Estimated duration in hours. */
  estHours: number
  priority: ChipTone
}

export interface WeldBayAllocationProps {
  /** Visible hours of the day, exclusive end. */
  startHour?: number
  endHour?: number
  bays: ReadonlyArray<WeldBay>
  /** Availability rows aligned 1:1 to bays. */
  availability: ReadonlyArray<BayRow>
  unassigned: ReadonlyArray<UnassignedJob>
}

export function WeldBayAllocation({
  startHour = 7,
  endHour = 18,
  bays,
  availability,
  unassigned,
}: WeldBayAllocationProps) {
  return (
    <section className={styles.scene} aria-label="Weld bay allocation">
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Allocation</span>
          <h3 className={styles.title}>Weld bays — today</h3>
          <p className={styles.subhead}>
            Drag a job onto a bay row to lock it in. Keyboard users can also use
            the assign button on each job card to pick a bay from a list.
          </p>
        </div>
      </header>

      <div className={styles.bayCrew} aria-label="Bay crew">
        {bays.map((bay) => (
          <div key={bay.id} className={styles.bayCard}>
            <Avatar name={bay.technician} size="md" tone="amber" />
            <div className={styles.bayCardBody}>
              <strong className={styles.bayName}>{bay.label}</strong>
              <span className={styles.bayTech}>{bay.technician}</span>
              {bay.certTag && <Chip label={bay.certTag} tone="teal" />}
            </div>
          </div>
        ))}
      </div>

      <AvailabilityGrid
        bays={availability}
        startHour={startHour}
        endHour={endHour}
      />

      <div
        className={styles.dropZone}
        role="region"
        aria-label="Unassigned job pool"
      >
        <div className={styles.dropZoneTitle}>
          <span>Unassigned jobs · drag to bay</span>
          <span className={styles.tip}>Press Enter to open bay picker</span>
        </div>
        <div className={styles.draggables}>
          {unassigned.map((job) => (
            <button
              key={job.id}
              type="button"
              className={styles.dragCard}
              draggable
              aria-label={`Drag ${job.jobNumber} ${job.vehicle} for ${job.customer}`}
            >
              <header>
                <span>{job.jobNumber}</span>
                <Chip label={`${job.estHours.toFixed(1)}h`} tone={job.priority} />
              </header>
              <strong>{job.vehicle}</strong>
              <span>{job.customer}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WeldBayAllocation
