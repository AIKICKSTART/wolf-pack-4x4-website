import { FileBadge2 } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip, type ChipTone } from "../primitives/chip"

import { ROADWORTHY_LABEL, type RoadworthyStatus } from "./vehicles-types"
import styles from "./roadworthy-certificate-card.module.css"

interface RoadworthyCertificateCardProps {
  certNumber: string
  issuedISO: string
  expiresISO: string
  workshop: string
  inspector: string
  status: RoadworthyStatus
  /** Optional list of advisories or fail items. */
  advisories?: ReadonlyArray<string>
  className?: string
}

const STATUS_TONE: Record<RoadworthyStatus, ChipTone> = {
  passed: "green",
  failed: "red",
  advisory: "amber",
  pending: "neutral",
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" }).format(
    date,
  )
}

export function RoadworthyCertificateCard({
  certNumber,
  issuedISO,
  expiresISO,
  workshop,
  inspector,
  status,
  advisories,
  className,
}: RoadworthyCertificateCardProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  return (
    <div className={classes}>
      <DashboardCard
        surface="material"
        icon={<FileBadge2 size={14} strokeWidth={2.2} aria-hidden="true" />}
        label="Safety certificate"
        value={certNumber}
        meta={`${workshop} · Inspector ${inspector}`}
      />
      <dl className={styles.dates}>
        <div>
          <dt>Issued</dt>
          <dd>{formatDate(issuedISO)}</dd>
        </div>
        <div>
          <dt>Expires</dt>
          <dd>{formatDate(expiresISO)}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <Chip label={ROADWORTHY_LABEL[status]} tone={STATUS_TONE[status]} />
          </dd>
        </div>
      </dl>
      {advisories && advisories.length > 0 && (
        <ul className={styles.advisories} aria-label="Advisories">
          {advisories.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RoadworthyCertificateCard
