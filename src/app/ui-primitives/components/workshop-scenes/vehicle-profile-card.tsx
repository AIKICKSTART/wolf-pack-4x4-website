import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import styles from "./vehicle-profile-card.module.css"

export interface VehicleProfileCardProps {
  year: number
  make: string
  model: string
  rego: string
  engine: string
  body: string
  /** Count of prior workshop visits / history entries. */
  historyCount: number
  /** Link target for the full vehicle file. */
  fileHref: string
  photoSrc?: string
  /** Optional placeholder character when no photo is supplied. */
  photoPlaceholder?: string
}

export function VehicleProfileCard({
  year,
  make,
  model,
  rego,
  engine,
  body,
  historyCount,
  fileHref,
  photoSrc,
  photoPlaceholder,
}: VehicleProfileCardProps) {
  const placeholder =
    photoPlaceholder ?? `${make.charAt(0).toUpperCase()}${model.charAt(0).toUpperCase()}`

  return (
    <article
      className={styles.card}
      aria-label={`${year} ${make} ${model} rego ${rego}`}
    >
      <div className={styles.photo}>
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`${year} ${make} ${model}`}
            width={336}
            height={336}
            unoptimized
          />
        ) : (
          <span aria-hidden="true">{placeholder}</span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>
          {year} {make} {model}
        </h3>
        <div className={styles.identityRow}>
          <span className={styles.rego}>{rego}</span>
        </div>

        <dl className={styles.specGrid}>
          <div className={styles.specItem}>
            <dt className={styles.specLabel}>Engine</dt>
            <dd className={styles.specValue}>{engine}</dd>
          </div>
          <div className={styles.specItem}>
            <dt className={styles.specLabel}>Body</dt>
            <dd className={styles.specValue}>{body}</dd>
          </div>
        </dl>

        <div className={styles.foot}>
          <span className={styles.historyBadge}>
            <strong>{historyCount}</strong> Visits on file
          </span>
          <Link className={styles.viewLink} href={fileHref}>
            Open vehicle file
            <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default VehicleProfileCard
