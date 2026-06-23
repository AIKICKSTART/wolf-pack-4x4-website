"use client"

import { useId, useState } from "react"

import { exemptionStatusToLabel, type TaxExemptionStatus } from "./billing-types"
import styles from "./tax-exemption-card.module.css"

interface TaxExemptionCardProps {
  jurisdiction: string
  certificateName?: string
  status: TaxExemptionStatus
  expiresISO?: string
  onUpload?: (fileName: string) => void
}

const STATUS_CLASS: Record<TaxExemptionStatus, string> = {
  pending: styles.statusPending,
  active: styles.statusActive,
  expired: styles.statusExpired,
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function TaxExemptionCard({
  jurisdiction,
  certificateName,
  status,
  expiresISO,
  onUpload,
}: TaxExemptionCardProps) {
  const fileId = useId()
  const [stagedName, setStagedName] = useState<string | null>(certificateName ?? null)

  return (
    <article className={styles.card} aria-label={`Tax exemption for ${jurisdiction}`}>
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Tax exemption</span>
          <h3 className={styles.jurisdiction}>{jurisdiction}</h3>
        </div>
        <span className={`${styles.status} ${STATUS_CLASS[status]}`}>
          {exemptionStatusToLabel(status)}
        </span>
      </header>

      <div className={styles.certBlock}>
        <div className={styles.certIcon} aria-hidden="true">
          <span>PDF</span>
        </div>
        <div className={styles.certInfo}>
          <span className={styles.certName}>
            {stagedName ?? "No certificate uploaded"}
          </span>
          {expiresISO ? (
            <span className={styles.certMeta}>
              {status === "expired" ? "Expired" : "Expires"} {formatDate(expiresISO)}
            </span>
          ) : null}
        </div>
      </div>

      <footer className={styles.footer}>
        <label className={styles.uploadBtn} htmlFor={fileId}>
          {stagedName ? "Replace certificate" : "Upload certificate"}
          <input
            id={fileId}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className={styles.fileInput}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setStagedName(file.name)
                onUpload?.(file.name)
              }
            }}
          />
        </label>
      </footer>
    </article>
  )
}

export default TaxExemptionCard
