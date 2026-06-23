import {
  CheckCircle2,
  Eye,
  PauseCircle,
  UserCog,
} from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import type { ProgressLinearTone } from "../primitives/progress-linear"
import styles from "./job-ticket.module.css"

export type JobStatus = "intake" | "in-progress" | "review" | "blocked" | "complete"

export interface JobPhoto {
  id: string
  /** Short label visible inside the placeholder thumb. */
  label: string
}

export interface JobService {
  id: string
  label: string
  tone?: ChipTone
}

export interface JobTicketProps {
  /** Internal job number, e.g. "JOB-2026-0418". */
  jobNumber: string
  customerName: string
  customerAvatarSrc?: string
  customerSuburb: string
  vehicleYear: number
  vehicleMake: string
  vehicleModel: string
  vehicleRego: string
  vehicleEngine: string
  services: ReadonlyArray<JobService>
  status: JobStatus
  /** Bay label, e.g. "Weld bay 2". */
  weldBay: string
  /** Minutes consumed of total budget. */
  timeSpentMin: number
  timeBudgetMin: number
  photos: ReadonlyArray<JobPhoto>
  /** Optional override for the action row. */
  trailingActions?: ReactNode
}

const STATUS_LABEL: Record<JobStatus, string> = {
  intake: "Intake",
  "in-progress": "In progress",
  review: "Quality check",
  blocked: "Blocked",
  complete: "Ready for pickup",
}

const STATUS_TONE: Record<JobStatus, ChipTone> = {
  intake: "teal",
  "in-progress": "amber",
  review: "teal",
  blocked: "red",
  complete: "green",
}

function progressTone(spent: number, budget: number): ProgressLinearTone {
  if (budget <= 0) return "teal"
  const ratio = spent / budget
  if (ratio >= 1) return "red"
  if (ratio >= 0.8) return "amber"
  return "teal"
}

function formatHours(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function JobTicket({
  jobNumber,
  customerName,
  customerAvatarSrc,
  customerSuburb,
  vehicleYear,
  vehicleMake,
  vehicleModel,
  vehicleRego,
  vehicleEngine,
  services,
  status,
  weldBay,
  timeSpentMin,
  timeBudgetMin,
  photos,
  trailingActions,
}: JobTicketProps) {
  const budgetSafe = Math.max(1, timeBudgetMin)
  const tone = progressTone(timeSpentMin, budgetSafe)

  return (
    <article className={styles.ticket} aria-label={`Job ticket ${jobNumber}`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.number}>
            <span className={styles.numberDot} aria-hidden="true" />
            {jobNumber}
          </span>
          <div className={styles.customerRow}>
            <Avatar
              name={customerName}
              src={customerAvatarSrc}
              size="md"
              tone="red"
            />
            <div>
              <span className={styles.customerName}>{customerName}</span>
              <div className={styles.suburb}>{customerSuburb}</div>
            </div>
          </div>
        </div>
        <div className={styles.statusCluster}>
          <Chip label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
          <Chip label={weldBay} tone="amber" />
        </div>
      </header>

      <div className={styles.vehicle}>
        <div className={styles.vehicleMain}>
          <strong className={styles.vehicleTitle}>
            {vehicleYear} {vehicleMake} {vehicleModel}
          </strong>
          <span className={styles.vehicleMeta}>{vehicleEngine}</span>
        </div>
        <span className={styles.rego} aria-label={`Rego ${vehicleRego}`}>{vehicleRego}</span>
      </div>

      <div className={styles.services}>
        <span className={styles.servicesTitle}>Services</span>
        <div className={styles.serviceChips}>
          {services.map((service) => (
            <Chip
              key={service.id}
              label={service.label}
              tone={service.tone ?? "neutral"}
            />
          ))}
        </div>
      </div>

      <div className={styles.budget}>
        <div className={styles.budgetMeta}>
          <span className={styles.budgetTitle}>Time budget</span>
          <strong>
            {formatHours(timeSpentMin)} / {formatHours(timeBudgetMin)}
          </strong>
        </div>
        <ProgressLinear
          value={timeSpentMin}
          max={budgetSafe}
          tone={tone}
          variant="solid"
          label={`Time used ${formatHours(timeSpentMin)} of ${formatHours(timeBudgetMin)}`}
        />
      </div>

      <div className={styles.photos}>
        <span className={styles.photosTitle}>Photo evidence · {photos.length}</span>
        <div className={styles.photoStrip} role="list">
          {photos.map((photo) => (
            <span key={photo.id} className={styles.photoThumb} role="listitem">
              {photo.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        {trailingActions ?? (
          <>
            <button type="button" className={styles.action}>
              <UserCog size={12} strokeWidth={2.4} aria-hidden="true" />
              Reassign
            </button>
            <button type="button" className={styles.action}>
              <PauseCircle size={12} strokeWidth={2.4} aria-hidden="true" />
              Pause
            </button>
            <button type="button" className={styles.action}>
              <Eye size={12} strokeWidth={2.4} aria-hidden="true" />
              View file
            </button>
            <button
              type="button"
              className={`${styles.action} ${styles.actionPrimary}`}
            >
              <CheckCircle2 size={12} strokeWidth={2.4} aria-hidden="true" />
              Complete
            </button>
          </>
        )}
      </div>
    </article>
  )
}

export default JobTicket
