import { ArrowRight, OctagonAlert } from "lucide-react"

import styles from "./endpoint-deprecation-banner.module.css"

interface EndpointDeprecationBannerProps {
  /** Endpoint method + path that is being deprecated (e.g. `GET /v0/quote`). */
  endpoint: string
  /** Replacement endpoint label (e.g. `POST /v1/quotes`). */
  replacementEndpoint: string
  /** Replacement endpoint link. */
  replacementHref?: string
  /** Sunset date in ISO-ish display format. */
  sunsetDate: string
  /** Override the default headline. */
  headline?: string
  /** Free-text guidance to migrators. */
  message?: string
  className?: string
}

export function EndpointDeprecationBanner({
  endpoint,
  replacementEndpoint,
  replacementHref,
  sunsetDate,
  headline = "This endpoint is being retired",
  message,
  className,
}: EndpointDeprecationBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")
  return (
    <aside className={classes} role="status" aria-label={`${endpoint} deprecation notice`}>
      <span className={styles.icon} aria-hidden="true">
        <OctagonAlert size={16} strokeWidth={2.4} />
      </span>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>Deprecation notice</span>
          <h3 className={styles.headline}>{headline}</h3>
        </header>

        <div className={styles.migration}>
          <code className={styles.from}>{endpoint}</code>
          <ArrowRight size={13} strokeWidth={2.4} aria-hidden="true" className={styles.arrow} />
          {replacementHref ? (
            <a className={styles.to} href={replacementHref}>
              {replacementEndpoint}
            </a>
          ) : (
            <code className={styles.to}>{replacementEndpoint}</code>
          )}
        </div>

        {message && <p className={styles.message}>{message}</p>}

        <p className={styles.sunset}>
          <span className={styles.sunsetLabel}>Sunset</span>
          <span className={styles.sunsetValue}>{sunsetDate}</span>
        </p>
      </div>
    </aside>
  )
}

export default EndpointDeprecationBanner
