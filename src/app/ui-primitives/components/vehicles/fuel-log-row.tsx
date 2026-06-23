import { Fuel } from "lucide-react"

import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./fuel-log-row.module.css"

interface FuelLogRowProps {
  /** ISO timestamp when fuel was logged. */
  filledISO: string
  litres: number
  costAud: number
  /** Distance travelled since last fill, used to compute km/L. */
  distanceSinceLastKm: number
  /** Fuel station name (e.g. Ampol, BP, Shell, 7-Eleven). */
  station: string
  /** Optional fuel grade (e.g. "Diesel", "Unleaded 95"). */
  grade?: string
  className?: string
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function efficiency(distanceKm: number, litres: number): number {
  if (litres <= 0) {
    return 0
  }
  return distanceKm / litres
}

function efficiencyTone(kmPerL: number): ChipTone {
  if (kmPerL <= 0) {
    return "neutral"
  }
  if (kmPerL >= 14) {
    return "green"
  }
  if (kmPerL >= 9) {
    return "teal"
  }
  if (kmPerL >= 6) {
    return "amber"
  }
  return "red"
}

export function FuelLogRow({
  filledISO,
  litres,
  costAud,
  distanceSinceLastKm,
  station,
  grade,
  className,
}: FuelLogRowProps) {
  const kmPerL = efficiency(distanceSinceLastKm, litres)
  const pricePerL = litres > 0 ? costAud / litres : 0
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <tr className={classes}>
      <th scope="row" className={styles.dateCell}>
        <Fuel size={14} strokeWidth={2.2} aria-hidden="true" />
        <time dateTime={filledISO}>{formatDate(filledISO)}</time>
      </th>
      <td className={styles.litresCell}>
        {litres.toFixed(1)} <span className={styles.unit}>L</span>
      </td>
      <td className={styles.costCell}>
        <strong>
          {new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
            maximumFractionDigits: 2,
          }).format(costAud)}
        </strong>
        <span className={styles.subCost}>
          ${pricePerL.toFixed(2)}/L
        </span>
      </td>
      <td className={styles.effCell}>
        <Chip label={`${kmPerL.toFixed(1)} km/L`} tone={efficiencyTone(kmPerL)} />
      </td>
      <td className={styles.stationCell}>
        <Chip label={grade ? `${station} · ${grade}` : station} tone="neutral" />
      </td>
    </tr>
  )
}

export default FuelLogRow
