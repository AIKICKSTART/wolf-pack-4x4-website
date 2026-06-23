"use client"

import {
  Cloud,
  FileText,
  Mic,
  Package,
  RefreshCw,
  Settings,
  Truck,
} from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  SOURCE_STATUS_LABEL,
  SOURCE_STATUS_TONE,
  type HermesSourceStatus,
} from "./hermes-agent-types"
import styles from "./knowledge-source-row.module.css"

export type KnowledgeSourceKind =
  | "cms-docs"
  | "google-drive"
  | "supplier-feed"
  | "transcripts"
  | "shopify"

interface KnowledgeSourceRowProps {
  id: string
  title: string
  kind: KnowledgeSourceKind
  /** Human metadata, e.g. "172 docs · /workshop-hours". */
  metadata: string
  /** Sync status. */
  status: HermesSourceStatus
  /** Last sync ISO-ish display string. */
  lastSyncLabel: string
  /** Doc / record count. */
  recordCount: number
  /** Sync progress 0..100 if syncing. */
  syncProgress?: number
  onResync?: () => void
  onConfigure?: () => void
  className?: string
}

const KIND_ICON: Record<KnowledgeSourceKind, ReactNode> = {
  "cms-docs": <FileText size={16} strokeWidth={2.2} aria-hidden="true" />,
  "google-drive": <Cloud size={16} strokeWidth={2.2} aria-hidden="true" />,
  "supplier-feed": <Truck size={16} strokeWidth={2.2} aria-hidden="true" />,
  transcripts: <Mic size={16} strokeWidth={2.2} aria-hidden="true" />,
  shopify: <Package size={16} strokeWidth={2.2} aria-hidden="true" />,
}

const KIND_LABEL: Record<KnowledgeSourceKind, string> = {
  "cms-docs": "CMS docs",
  "google-drive": "Google Drive",
  "supplier-feed": "Supplier feed",
  transcripts: "Call transcripts",
  shopify: "Shopify catalogue",
}

const STATUS_PROGRESS_TONE: Record<
  HermesSourceStatus,
  "red" | "amber" | "teal" | "green"
> = {
  synced: "green",
  syncing: "teal",
  stale: "amber",
  error: "red",
  paused: "amber",
}

export function KnowledgeSourceRow({
  id,
  title,
  kind,
  metadata,
  status,
  lastSyncLabel,
  recordCount,
  syncProgress,
  onResync,
  onConfigure,
  className,
}: KnowledgeSourceRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const tone = SOURCE_STATUS_TONE[status]

  return (
    <div
      className={classes}
      role="group"
      aria-labelledby={`source-${id}-title`}
    >
      <span className={styles.kindIcon} data-kind={kind} aria-hidden="true">
        {KIND_ICON[kind]}
      </span>
      <div className={styles.body}>
        <h4 className={styles.title} id={`source-${id}-title`}>
          {title}
        </h4>
        <span className={styles.subtitle}>
          <span>{KIND_LABEL[kind]}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>{metadata}</span>
        </span>
        {status === "syncing" && syncProgress !== undefined ? (
          <div className={styles.progressWrap}>
            <span className={styles.progressLabel}>
              Syncing {Math.round(syncProgress)}%
            </span>
            <ProgressLinear
              value={syncProgress}
              max={100}
              tone="teal"
              variant="striped"
            />
          </div>
        ) : null}
      </div>
      <div className={styles.stats}>
        <div>
          <div className={styles.statLabel}>Records</div>
          <div className={styles.statValue}>{recordCount.toLocaleString()}</div>
        </div>
        <Chip
          label={SOURCE_STATUS_LABEL[status]}
          tone={tone}
        />
        <div>
          <div className={styles.statLabel}>Last sync</div>
          <div className={styles.statValue} aria-hidden="false">
            {lastSyncLabel}
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onResync}
          aria-label={`Re-sync ${title}`}
          data-tone={STATUS_PROGRESS_TONE[status]}
        >
          <RefreshCw size={13} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onConfigure}
          aria-label={`Configure ${title}`}
        >
          <Settings size={13} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default KnowledgeSourceRow
