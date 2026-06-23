import { CalendarClock } from "lucide-react"

import { Chip, type ChipTone } from "../primitives/chip"

import { daysUntil } from "./vehicles-types"

interface RegistrationExpiryChipProps {
  /** ISO date when the NSW registration expires. */
  expiresISO: string
  /** State/territory abbreviation — defaults to NSW. */
  state?: string
  /** Override "now" — used by tests + fixtures. */
  now?: Date
  className?: string
}

function pickTone(days: number): ChipTone {
  if (days < 0) {
    return "red"
  }
  if (days <= 7) {
    return "red"
  }
  if (days <= 14) {
    return "amber"
  }
  if (days <= 30) {
    return "amber"
  }
  return "green"
}

function formatLabel(days: number, state: string): string {
  if (days < 0) {
    return `${state} rego · expired ${Math.abs(days)} d ago`
  }
  if (days === 0) {
    return `${state} rego · expires today`
  }
  if (days === 1) {
    return `${state} rego · 1 day left`
  }
  if (days <= 90) {
    return `${state} rego · ${days} days left`
  }
  const months = Math.round(days / 30)
  return `${state} rego · ${months} months left`
}

export function RegistrationExpiryChip({
  expiresISO,
  state = "NSW",
  now,
  className,
}: RegistrationExpiryChipProps) {
  const days = daysUntil(expiresISO, now)
  const tone = pickTone(days)
  return (
    <Chip
      className={className}
      label={formatLabel(days, state)}
      tone={tone}
      icon={<CalendarClock size={12} strokeWidth={2.4} aria-hidden="true" />}
    />
  )
}

export default RegistrationExpiryChip
