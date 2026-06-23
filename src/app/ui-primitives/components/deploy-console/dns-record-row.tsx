import { ProgressLinear } from "../primitives/progress-linear"

import {
  DNS_PROPAGATION_LABEL,
  DNS_PROPAGATION_TONE,
  type DnsRecord,
} from "./deploy-console-types"
import styles from "./dns-record-row.module.css"
import shell from "./deploy-console.module.css"

export interface DnsRecordRowProps {
  record: DnsRecord
  className?: string
}

function toneClassFor(record: DnsRecord): string {
  switch (DNS_PROPAGATION_TONE[record.state]) {
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

function formatTtl(seconds: number): string {
  if (seconds >= 3600) {
    const hours = seconds / 3600
    return `${hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1)}h`
  }
  if (seconds >= 60) {
    const minutes = seconds / 60
    return `${minutes % 1 === 0 ? minutes.toFixed(0) : minutes.toFixed(1)}m`
  }
  return `${seconds}s`
}

export function DnsRecordRow({ record, className }: DnsRecordRowProps) {
  const toneCls = toneClassFor(record)
  const propagationTone = (() => {
    if (record.propagationPercent >= 95) return "green" as const
    if (record.propagationPercent >= 70) return "teal" as const
    if (record.propagationPercent >= 30) return "amber" as const
    return "red" as const
  })()

  return (
    <article
      className={[shell.shell, toneCls, styles.row, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={`DNS ${record.type} record for ${record.host}`}
    >
      <div className={styles.identity}>
        <span className={[styles.typeBadge, toneCls].join(" ")}>{record.type}</span>
        <div className={styles.hostBlock}>
          <code className={styles.host}>{record.host}</code>
          <span className={styles.meta}>
            TTL <span className={shell.tabular}>{formatTtl(record.ttlSeconds)}</span>
          </span>
        </div>
      </div>

      <code className={styles.value} aria-label={`Value ${record.value}`}>
        {record.value}
      </code>

      <div className={styles.propagation}>
        <div className={styles.propagationHead}>
          <span className={shell.sectionLabel}>Propagation</span>
          <span className={shell.tabular}>{record.propagationPercent}%</span>
        </div>
        <ProgressLinear
          value={record.propagationPercent}
          max={100}
          tone={propagationTone}
          variant={record.state === "propagated" ? "solid" : "striped"}
          label={`Propagation ${record.propagationPercent}% complete`}
        />
        <span className={[shell.chip, toneCls].join(" ")}>
          {DNS_PROPAGATION_LABEL[record.state]}
        </span>
      </div>
    </article>
  )
}

export default DnsRecordRow
