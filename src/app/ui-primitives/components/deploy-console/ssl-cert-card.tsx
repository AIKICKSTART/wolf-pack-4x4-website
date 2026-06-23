"use client"

import { useId, useState } from "react"

import {
  CERT_HEALTH_LABEL,
  CERT_HEALTH_TONE,
  type SslCertificate,
} from "./deploy-console-types"
import styles from "./ssl-cert-card.module.css"
import shell from "./deploy-console.module.css"

export interface SslCertCardProps {
  certificate: SslCertificate
  /** Initial state of the auto-renew toggle. */
  initialAutoRenew?: boolean
  /** Static-only — disables the toggle. */
  readonly?: boolean
  className?: string
}

function toneClassFor(certificate: SslCertificate): string {
  switch (CERT_HEALTH_TONE[certificate.health]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    default:
      return shell.toneNeutral
  }
}

export function SslCertCard({
  certificate,
  initialAutoRenew,
  readonly = false,
  className,
}: SslCertCardProps) {
  const [autoRenew, setAutoRenew] = useState(initialAutoRenew ?? certificate.autoRenew)
  const toneCls = toneClassFor(certificate)
  const toggleId = useId()
  const expiryLabel =
    certificate.daysUntilExpiry < 0
      ? `${Math.abs(certificate.daysUntilExpiry)}d ago`
      : `${certificate.daysUntilExpiry}d`

  const handleToggle = () => {
    if (readonly) return
    setAutoRenew((current) => !current)
  }

  return (
    <article
      className={[shell.shell, toneCls, styles.card, className].filter(Boolean).join(" ")}
      aria-label={`TLS certificate for ${certificate.commonName}`}
    >
      <header className={styles.head}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>TLS certificate</span>
          <h3 className={styles.cn}>{certificate.commonName}</h3>
          <p className={shell.subtitle}>
            Issued by <strong className={styles.issuer}>{certificate.issuer}</strong>{" "}
            · {certificate.chainLength}-cert chain
          </p>
        </div>
        <span className={[shell.chip, toneCls].join(" ")}>
          {CERT_HEALTH_LABEL[certificate.health]}
        </span>
      </header>

      <div className={styles.countdown} aria-label={`${expiryLabel} until expiry`}>
        <span className={styles.countdownValue}>{expiryLabel}</span>
        <span className={shell.sectionLabel}>
          {certificate.daysUntilExpiry < 0 ? "expired" : "until expiry"}
        </span>
        <div className={styles.bar} aria-hidden="true">
          <span
            className={styles.barFill}
            style={{
              width: `${Math.min(100, Math.max(2, certificate.daysUntilExpiry > 0 ? (certificate.daysUntilExpiry / 90) * 100 : 0))}%`,
            }}
          />
        </div>
      </div>

      <section className={styles.alts} aria-label="Subject alternative names">
        <span className={shell.sectionLabel}>SAN</span>
        <ul className={styles.altList}>
          {certificate.altNames.map((name) => (
            <li key={name} className={styles.alt}>
              {name}
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.foot}>
        <span className={styles.issued}>
          Issued <span className={shell.tabular}>{certificate.issuedAt}</span>
        </span>
        <label className={styles.toggle} htmlFor={toggleId}>
          <span className={shell.sectionLabel}>Auto-renew</span>
          <span
            className={[styles.switch, autoRenew ? styles.switchOn : "", toneCls]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <span className={styles.switchThumb} />
          </span>
          <input
            id={toggleId}
            type="checkbox"
            checked={autoRenew}
            onChange={handleToggle}
            disabled={readonly}
            className={styles.toggleInput}
            aria-label={`Auto-renew ${autoRenew ? "enabled" : "disabled"} for ${certificate.commonName}`}
          />
        </label>
      </footer>
    </article>
  )
}

export default SslCertCard
