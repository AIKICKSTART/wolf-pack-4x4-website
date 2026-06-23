import {
  CONNECTOR_CATEGORY_LABEL,
  type ConnectorCategory,
} from "./connectors-types"
import styles from "./provider-directory-card.module.css"

export interface ProviderDirectoryCardProps {
  provider: string
  /** Two-letter monogram for the corner mark. */
  monogram: string
  /** One-line description, e.g. "Subscriptions, payouts and reconciliation." */
  description: string
  category: ConnectorCategory
  /** Install count, e.g. 1240. */
  installs: number
  /** Verified badge label, e.g. "Verified by Mufflermen". */
  verifiedLabel?: string
  /** True when this connector has already been installed. */
  installed?: boolean
  /** Logo accent — colour family for the corner tile. */
  accent?: "blue" | "violet" | "amber" | "teal" | "green" | "red"
  className?: string
}

const ACCENT_CLASS: Record<NonNullable<ProviderDirectoryCardProps["accent"]>, string> = {
  blue: styles.accentBlue,
  violet: styles.accentViolet,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  red: styles.accentRed,
}

function formatInstalls(count: number): string {
  if (count >= 10000) return `${(count / 1000).toFixed(0)}k`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return `${count}`
}

export function ProviderDirectoryCard({
  provider,
  monogram,
  description,
  category,
  installs,
  verifiedLabel,
  installed = false,
  accent = "blue",
  className,
}: ProviderDirectoryCardProps) {
  const classes = [
    styles.card,
    ACCENT_CLASS[accent],
    installed ? styles.cardInstalled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      role="region"
      aria-label={`${provider} directory entry — ${installed ? "installed" : "available"}`}
    >
      <header className={styles.head}>
        <div className={styles.logo} aria-hidden="true">
          <span className={styles.logoMono}>{monogram}</span>
        </div>
        <div className={styles.identity}>
          <h3 className={styles.provider}>{provider}</h3>
          <span className={styles.category}>{CONNECTOR_CATEGORY_LABEL[category]}</span>
        </div>
        {verifiedLabel ? (
          <span className={styles.verified} title={verifiedLabel}>
            <span className={styles.verifiedDot} aria-hidden="true" />
            {verifiedLabel}
          </span>
        ) : null}
      </header>

      <p className={styles.description}>{description}</p>

      <footer className={styles.foot}>
        <div className={styles.installs}>
          <span className={styles.installsCount}>{formatInstalls(installs)}</span>
          <span className={styles.installsLabel}>installs</span>
        </div>
        <span className={styles.statusPill}>{installed ? "Installed" : "Available"}</span>
      </footer>
    </article>
  )
}

export default ProviderDirectoryCard
