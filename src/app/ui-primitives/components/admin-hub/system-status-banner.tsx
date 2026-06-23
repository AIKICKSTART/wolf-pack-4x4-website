import { AlertTriangle, CheckCircle2, ExternalLink, Wrench } from "lucide-react"
import Link from "next/link"

import {
  SYSTEM_HEALTH_LABEL,
  SYSTEM_HEALTH_TONE,
  type SystemHealth,
  type SystemStatusEntry,
} from "./admin-hub-types"

import styles from "./system-status-banner.module.css"

interface SystemStatusBannerProps {
  status: SystemStatusEntry
  className?: string
}

const TONE_CLASS = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  violet: styles.toneNeutral,
  neutral: styles.toneNeutral,
} as const

function StatusGlyph({ health }: { health: SystemHealth }) {
  if (health === "operational") {
    return <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
  }
  if (health === "maintenance") {
    return <Wrench size={18} strokeWidth={2.2} aria-hidden="true" />
  }
  return <AlertTriangle size={18} strokeWidth={2.2} aria-hidden="true" />
}

export function SystemStatusBanner({ status, className }: SystemStatusBannerProps) {
  const tone = SYSTEM_HEALTH_TONE[status.state]
  const toneClass = TONE_CLASS[tone]
  const headline = status.label || SYSTEM_HEALTH_LABEL[status.state]
  const isOperational = status.state === "operational"

  return (
    <aside
      className={[styles.banner, toneClass, className].filter(Boolean).join(" ")}
      role={isOperational ? "status" : "alert"}
      aria-live="polite"
      aria-label={`System status: ${headline}`}
    >
      <span className={styles.pulse} aria-hidden="true" />

      <div className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          <StatusGlyph health={status.state} />
        </span>
        <div className={styles.identity}>
          <span className={styles.kicker}>System status</span>
          <h3 className={styles.title}>{headline}</h3>
        </div>
      </div>

      <div className={styles.body}>
        {status.note && <p className={styles.note}>{status.note}</p>}
        {status.affectedServices && status.affectedServices.length > 0 && (
          <ul className={styles.services} aria-label="Affected services">
            {status.affectedServices.map((service) => (
              <li key={service} className={styles.service}>
                {service}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.foot}>
        <span className={styles.updated}>Updated {status.updatedLabel}</span>
        <Link
          href={status.statusPageHref}
          className={styles.cta}
          aria-label="Open the status page"
        >
          Open status page
          <ExternalLink size={12} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}

export default SystemStatusBanner
