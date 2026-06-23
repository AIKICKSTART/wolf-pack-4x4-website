"use client"

import { useState } from "react"

import { BUCKET_LABEL, type PurgePath } from "./asset-cdn-types"

import styles from "./cdn-purge-confirmation.module.css"

interface CdnPurgeConfirmationProps {
  paths: ReadonlyArray<PurgePath>
  expectedConfirmation?: string
  onConfirm?: () => void
  onCancel?: () => void
  className?: string
}

export function CdnPurgeConfirmation({
  paths,
  expectedConfirmation = "PURGE",
  onConfirm,
  onCancel,
  className,
}: CdnPurgeConfirmationProps) {
  const [confirmation, setConfirmation] = useState<string>("")
  const matches = confirmation === expectedConfirmation
  const totalAffected = paths.reduce((sum, path) => sum + path.affected, 0)

  return (
    <section
      className={[styles.modal, className].filter(Boolean).join(" ")}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="cdn-purge-title"
      aria-describedby="cdn-purge-body"
    >
      <header className={styles.head}>
        <span className={styles.scanline} aria-hidden="true" />
        <span className={styles.kicker}>Hard purge · destructive</span>
        <h2 className={styles.title} id="cdn-purge-title">
          Confirm CDN purge
        </h2>
        <p className={styles.body} id="cdn-purge-body">
          This evicts cached responses from every edge PoP. Visitors will hit the origin
          until the cache rebuilds. Use only after you have verified the new asset is
          published.
        </p>
      </header>

      <div className={styles.totals}>
        <div className={styles.totalStat}>
          <span className={styles.totalLabel}>Paths</span>
          <strong className={styles.totalValue}>{paths.length}</strong>
        </div>
        <div className={styles.totalStat}>
          <span className={styles.totalLabel}>Affected URLs</span>
          <strong className={styles.totalValue}>{totalAffected.toLocaleString("en-AU")}</strong>
        </div>
      </div>

      <ul className={styles.list} aria-label="Affected path patterns">
        {paths.map((path) => (
          <li key={path.pattern} className={styles.pathRow}>
            <code className={styles.pattern}>{path.pattern}</code>
            <span className={styles.bucket}>{BUCKET_LABEL[path.bucket]}</span>
            <span className={styles.affected}>
              {path.affected.toLocaleString("en-AU")} URLs
            </span>
          </li>
        ))}
      </ul>

      <label className={styles.confirmField}>
        <span className={styles.confirmLabel}>
          Type <em className={styles.token}>{expectedConfirmation}</em> to confirm
        </span>
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          className={[styles.confirmInput, matches ? styles.confirmInputOk : ""].filter(Boolean).join(" ")}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          aria-invalid={confirmation.length > 0 && !matches}
        />
      </label>

      <footer className={styles.foot}>
        <button type="button" className={styles.cancel} onClick={() => onCancel?.()}>
          Cancel
        </button>
        <button
          type="button"
          className={styles.confirm}
          disabled={!matches}
          aria-disabled={!matches}
          onClick={() => matches && onConfirm?.()}
        >
          Purge {totalAffected.toLocaleString("en-AU")} URLs
        </button>
      </footer>
    </section>
  )
}

export default CdnPurgeConfirmation
