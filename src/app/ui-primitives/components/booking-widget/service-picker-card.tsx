"use client"

import { Check, Clock, DollarSign, Users } from "lucide-react"

import styles from "./service-picker-card.module.css"
import type { BookingService } from "./booking-widget-types"

interface ServicePickerCardProps {
  service: BookingService
  selected?: boolean
  onSelect?: (id: string) => void
  /** Used to wire role="radio" into a parent role="radiogroup". */
  groupName?: string
}

function formatAud(cents: number): string {
  if (cents === 0) return "Free"
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

const ACCENT_CLASS: Record<NonNullable<BookingService["accent"]>, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export function ServicePickerCard({
  service,
  selected = false,
  onSelect,
  groupName,
}: ServicePickerCardProps) {
  const accentClass = service.accent ? ACCENT_CLASS[service.accent] : styles.accentRed
  const className = [styles.card, accentClass, selected && styles.selected]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${service.name}, ${formatDuration(service.durationMinutes)}, ${formatAud(service.price.cents)}`}
      data-group={groupName}
      className={className}
      onClick={() => onSelect?.(service.id)}
    >
      <span className={styles.rail} aria-hidden="true" />
      <span className={styles.body}>
        <span className={styles.headRow}>
          <h3 className={styles.title}>{service.name}</h3>
          {selected ? (
            <span className={styles.checkMark} aria-hidden="true">
              <Check size={12} strokeWidth={3} />
            </span>
          ) : null}
        </span>
        {service.blurb ? <p className={styles.blurb}>{service.blurb}</p> : null}
        <span className={styles.chips}>
          <span className={styles.chip}>
            <Clock size={11} strokeWidth={2.4} aria-hidden="true" />
            {formatDuration(service.durationMinutes)}
          </span>
          <span className={styles.chip}>
            <DollarSign size={11} strokeWidth={2.4} aria-hidden="true" />
            {formatAud(service.price.cents)}
          </span>
          <span className={styles.chip}>
            <Users size={11} strokeWidth={2.4} aria-hidden="true" />
            {service.capacity} per bay
          </span>
        </span>
      </span>
    </button>
  )
}

export default ServicePickerCard
