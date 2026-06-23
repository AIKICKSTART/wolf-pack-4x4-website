import type { EncryptionAlgo, EncryptionInfo, KeySource } from "./backup-types"

import styles from "./encryption-at-rest-indicator.module.css"

const ALGO_LABEL: Record<EncryptionAlgo, string> = {
  aes_256_gcm: "AES-256-GCM",
  aes_256_cbc: "AES-256-CBC",
  chacha20_poly1305: "ChaCha20-Poly1305",
  rsa_4096: "RSA-4096",
}

const KEY_SOURCE_LABEL: Record<KeySource, string> = {
  kms: "KMS managed",
  customer_managed: "Customer key",
  vault: "Vault",
  platform: "Platform",
}

const KEY_SOURCE_TONE: Record<KeySource, string> = {
  kms: styles.toneTeal,
  customer_managed: styles.toneAmber,
  vault: styles.toneGreen,
  platform: styles.toneMuted,
}

interface EncryptionAtRestIndicatorProps {
  info: EncryptionInfo
  className?: string
}

export function EncryptionAtRestIndicator({
  info,
  className,
}: EncryptionAtRestIndicatorProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Encryption at rest: ${ALGO_LABEL[info.algorithm]} via ${KEY_SOURCE_LABEL[info.keySource]}`}
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path
            d="M6 11V8a6 6 0 0 1 12 0v3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x="4.5"
            y="11"
            width="15"
            height="9"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
        </svg>
      </div>
      <div className={styles.body}>
        <span className={styles.kicker}>Encryption at rest</span>
        <div className={styles.chipRow}>
          <span className={styles.algoChip}>{ALGO_LABEL[info.algorithm]}</span>
          <span className={[styles.sourceChip, KEY_SOURCE_TONE[info.keySource]].join(" ")}>
            {KEY_SOURCE_LABEL[info.keySource]}
          </span>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt>Rotated</dt>
            <dd>
              <time dateTime={info.rotatedAt}>{info.rotatedAt}</time>
            </dd>
          </div>
          {info.keyLabel ? (
            <div>
              <dt>Key</dt>
              <dd>
                <code>{info.keyLabel}</code>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  )
}

export default EncryptionAtRestIndicator
