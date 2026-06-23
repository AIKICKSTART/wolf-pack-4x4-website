import { ShieldCheck } from "lucide-react"

import { DashboardCard } from "../data-display/dashboard-card"
import { Chip } from "../primitives/chip"

import {
  INSURANCE_COVER_LABEL,
  daysUntil,
  type InsuranceCoverType,
} from "./vehicles-types"
import styles from "./insurance-card.module.css"

interface InsuranceCardProps {
  insurer: string
  policyNumber: string
  /** Cover types attached to the policy. */
  covers: ReadonlyArray<InsuranceCoverType>
  /** ISO renewal date. */
  renewalISO: string
  /** Open claim count on this vehicle. */
  openClaims: number
  /** Lifetime claim count on this vehicle. */
  lifetimeClaims: number
  /** Optional excess amount in AUD. */
  excessAud?: number
  /** Optional now override for fixtures. */
  now?: Date
  className?: string
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

function renewalDelta(iso: string, now: Date | undefined) {
  const days = daysUntil(iso, now)
  if (days < 0) {
    return { label: `Expired ${Math.abs(days)} d ago`, direction: "down" as const }
  }
  if (days <= 30) {
    return { label: `${days} d to renew`, direction: "down" as const }
  }
  if (days <= 90) {
    return { label: `${days} d to renew`, direction: "flat" as const }
  }
  return { label: `${Math.round(days / 30)} mo to renew`, direction: "up" as const }
}

export function InsuranceCard({
  insurer,
  policyNumber,
  covers,
  renewalISO,
  openClaims,
  lifetimeClaims,
  excessAud,
  now,
  className,
}: InsuranceCardProps) {
  const delta = renewalDelta(renewalISO, now)
  const claimsTone = openClaims > 0 ? "amber" : "green"
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <DashboardCard
        surface="neuo"
        icon={<ShieldCheck size={14} strokeWidth={2.2} aria-hidden="true" />}
        label={`Insurance · ${insurer}`}
        value={formatDate(renewalISO)}
        unit="renewal"
        delta={delta}
        meta={`Policy ${policyNumber}${excessAud != null ? ` · $${excessAud} excess` : ""}`}
      />
      <div className={styles.chips}>
        {covers.map((cover) => (
          <Chip key={cover} label={INSURANCE_COVER_LABEL[cover]} tone="teal" />
        ))}
        <Chip
          label={`Open claims · ${openClaims}`}
          tone={claimsTone}
        />
        <Chip label={`Lifetime · ${lifetimeClaims}`} tone="neutral" />
      </div>
    </div>
  )
}

export default InsuranceCard
