import type { BackupDestinationInfo, RedundancyClass } from "./backup-types"

import styles from "./backup-destination-card.module.css"

const REDUNDANCY_LABEL: Record<RedundancyClass, string> = {
  single: "Single zone",
  zone_redundant: "Zone redundant",
  geo_redundant: "Geo redundant",
}

const REDUNDANCY_TONE: Record<RedundancyClass, string> = {
  single: styles.toneMuted,
  zone_redundant: styles.toneTeal,
  geo_redundant: styles.toneGreen,
}

function ProviderGlyph({ provider }: { provider: BackupDestinationInfo["provider"] }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true" as const,
  }
  switch (provider) {
    case "s3":
      return (
        <svg {...props}>
          <path
            d="M5 6.5l7-3 7 3v11l-7 3-7-3v-11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M5 6.5l7 3 7-3M12 9.5v11" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case "gcs":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case "azure":
      return (
        <svg {...props}>
          <path
            d="M10 4l-6 14h6.5l1.5-4 1.5 4H20L14 4h-4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "wasabi":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="12" rx="7" ry="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 12c3 2 11 2 14 0" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case "local":
    default:
      return (
        <svg {...props}>
          <rect
            x="4"
            y="6"
            width="16"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M4 10h16M8 18v2M16 18v2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
  }
}

const PROVIDER_LABEL: Record<BackupDestinationInfo["provider"], string> = {
  s3: "Amazon S3",
  gcs: "Google Cloud Storage",
  azure: "Azure Blob",
  wasabi: "Wasabi",
  local: "On-premise",
}

interface BackupDestinationCardProps {
  destination: BackupDestinationInfo
  className?: string
}

export function BackupDestinationCard({
  destination,
  className,
}: BackupDestinationCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Backup destination: ${destination.bucketOrPath}`}
    >
      <header className={styles.head}>
        <span className={styles.providerIcon} aria-hidden="true">
          <ProviderGlyph provider={destination.provider} />
        </span>
        <div className={styles.titles}>
          <span className={styles.kicker}>{PROVIDER_LABEL[destination.provider]}</span>
          <span className={styles.bucket}>{destination.bucketOrPath}</span>
        </div>
      </header>

      <dl className={styles.meta}>
        <div>
          <dt>Region</dt>
          <dd>{destination.region}</dd>
        </div>
        <div>
          <dt>Redundancy</dt>
          <dd>
            <span
              className={[styles.redundancyChip, REDUNDANCY_TONE[destination.redundancy]].join(
                " ",
              )}
            >
              {REDUNDANCY_LABEL[destination.redundancy]}
            </span>
          </dd>
        </div>
        <div>
          <dt>Transfer</dt>
          <dd>
            <span className={styles.transferChip}>
              {destination.transferRateMbps.toFixed(0)} Mbps
            </span>
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default BackupDestinationCard
