"use client"

import styles from "./address-verification-row.module.css"

export type AddressProofStatus = "proof-on-file" | "proof-needed" | "expired"

export interface AddressVerificationRowProps {
  /** Address label, e.g. "Workshop", "Residential". */
  label: string
  /** Full single-line address. */
  address: string
  status: AddressProofStatus
  /** Optional supporting metadata, e.g. "Filed 14 Mar 2026". */
  meta?: string
  /** Click handler for the upload-proof CTA. */
  onUploadProof?: () => void
  /** href for the upload-proof CTA. Used when onUploadProof is omitted. */
  uploadProofHref?: string
  className?: string
}

const STATUS_LABEL: Record<AddressProofStatus, string> = {
  "proof-on-file": "Proof on file",
  "proof-needed": "Proof needed",
  expired: "Expired",
}

export function AddressVerificationRow({
  label,
  address,
  status,
  meta,
  onUploadProof,
  uploadProofHref,
  className,
}: AddressVerificationRowProps) {
  const classes = [styles.row, styles[`status_${status.replace(/-/g, "_")}`], className]
    .filter(Boolean)
    .join(" ")

  const showCta = status !== "proof-on-file"
  const ctaLabel = status === "expired" ? "Re-upload proof" : "Upload proof"

  return (
    <article className={classes} data-status={status}>
      <div className={styles.identity}>
        <span className={styles.label}>{label}</span>
        <span className={styles.address}>{address}</span>
        {meta ? <span className={styles.meta}>{meta}</span> : null}
      </div>

      <span className={styles.statusChip} data-status={status}>
        <span className={styles.statusDot} aria-hidden="true" />
        {STATUS_LABEL[status]}
      </span>

      {showCta ? (
        uploadProofHref ? (
          <a className={styles.cta} href={uploadProofHref}>
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <button type="button" className={styles.cta} onClick={onUploadProof}>
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </button>
        )
      ) : (
        <span className={styles.lockChip} aria-hidden="true">
          ✓ Verified
        </span>
      )}
    </article>
  )
}

export default AddressVerificationRow
