"use client"

import { useState } from "react"

import {
  CONNECTOR_STATUS_LABEL,
  CONNECTOR_STATUS_TONE,
  type ConnectorStatus,
  type OAuthProviderId,
} from "./connectors-types"
import type { StatusTone } from "../status-page/status-types"
import styles from "./oauth-connect-card.module.css"

export interface OAuthConnectCardProps {
  provider: OAuthProviderId
  providerName: string
  /** Two-letter monogram drawn into the logo tile. */
  monogram: string
  status: ConnectorStatus
  /** Granted OAuth scopes, e.g. ["calendar.read", "drive.file"]. */
  scopes: ReadonlyArray<string>
  /** Connected account label, e.g. "daniel@verridian.ai" or "@oakflatsmufflers". */
  account?: string
  /** Token expiry — ISO date string or human "in 28 days". */
  expiresIn?: string
  /** True while a connect/refresh flow is in flight. */
  busy?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const PROVIDER_CLASS: Record<OAuthProviderId, string> = {
  google: styles.providerGoogle,
  meta: styles.providerMeta,
  tiktok: styles.providerTiktok,
  x: styles.providerX,
  linkedin: styles.providerLinkedin,
  stripe: styles.providerStripe,
  xero: styles.providerXero,
  shopify: styles.providerShopify,
  twilio: styles.providerTwilio,
}

export function OAuthConnectCard({
  provider,
  providerName,
  monogram,
  status,
  scopes,
  account,
  expiresIn,
  busy = false,
  onConnect,
  onDisconnect,
  className,
}: OAuthConnectCardProps) {
  const [pressed, setPressed] = useState(false)
  const tone = CONNECTOR_STATUS_TONE[status]
  const isConnected = status === "connected" || status === "warning" || status === "syncing"
  const action = isConnected ? "Disconnect" : status === "pending" ? "Connecting…" : "Connect"

  const classes = [styles.card, TONE_CLASS[tone], PROVIDER_CLASS[provider], className]
    .filter(Boolean)
    .join(" ")

  const handleClick = () => {
    setPressed(true)
    if (isConnected) {
      onDisconnect?.()
    } else {
      onConnect?.()
    }
    // tiny visual confirmation reset
    window.setTimeout(() => setPressed(false), 260)
  }

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${providerName} OAuth connection — ${CONNECTOR_STATUS_LABEL[status]}`}
    >
      <header className={styles.head}>
        <div className={styles.logo} aria-hidden="true">
          <span className={styles.logoMono}>{monogram}</span>
        </div>
        <div className={styles.identity}>
          <h3 className={styles.providerName}>{providerName}</h3>
          {account ? <p className={styles.account}>{account}</p> : null}
        </div>
        <span className={[styles.chip, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.chipDot} aria-hidden="true" />
          {CONNECTOR_STATUS_LABEL[status]}
        </span>
      </header>

      <div className={styles.scopesBlock}>
        <span className={styles.scopesLabel}>Granted scopes</span>
        <ul className={styles.scopesList} aria-label={`${providerName} OAuth scopes`}>
          {scopes.map((scope) => (
            <li key={scope} className={styles.scopeItem}>
              <span className={styles.scopeDot} aria-hidden="true" />
              <code className={styles.scopeCode}>{scope}</code>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.foot}>
        <div className={styles.expiry}>
          <span className={styles.expiryLabel}>Token expiry</span>
          <span className={styles.expiryValue}>{expiresIn ?? "—"}</span>
        </div>
        <button
          type="button"
          className={[styles.action, pressed ? styles.actionPressed : ""].join(" ")}
          onClick={handleClick}
          disabled={busy}
          aria-busy={busy}
          aria-label={`${action} ${providerName}`}
        >
          {action}
        </button>
      </footer>
    </article>
  )
}

export default OAuthConnectCard
