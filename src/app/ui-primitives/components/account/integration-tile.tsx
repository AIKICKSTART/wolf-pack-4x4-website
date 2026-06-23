"use client"

import { AlertCircle, CheckCircle2, Clock } from "lucide-react"
import type { ReactNode } from "react"

import { Chip, type ChipTone } from "../primitives/chip"
import styles from "./integration-tile.module.css"

export type IntegrationStatus = "connected" | "setup" | "error" | "disabled"

interface IntegrationTileProps {
  name: string
  description: string
  category?: string
  status: IntegrationStatus
  glyph: ReactNode
  lastSync?: string
  scopes?: ReadonlyArray<string>
  onAction?: () => void
  actionHref?: string
  className?: string
}

const STATUS_CHIP: Record<IntegrationStatus, { label: string; tone: ChipTone }> = {
  connected: { label: "Connected", tone: "green" },
  setup: { label: "Setup needed", tone: "amber" },
  error: { label: "Error", tone: "red" },
  disabled: { label: "Disabled", tone: "neutral" },
}

const STATUS_TONE_CLASS: Record<IntegrationStatus, string> = {
  connected: styles.toneConnected,
  setup: styles.toneSetup,
  error: styles.toneError,
  disabled: styles.toneDisabled,
}

const STATUS_ACTION_LABEL: Record<IntegrationStatus, string> = {
  connected: "Manage",
  setup: "Connect",
  error: "Reconnect",
  disabled: "Enable",
}

function StatusIcon({ status }: { status: IntegrationStatus }) {
  if (status === "connected") {
    return <CheckCircle2 size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  if (status === "setup") {
    return <Clock size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  if (status === "error") {
    return <AlertCircle size={14} strokeWidth={2.2} aria-hidden="true" />
  }
  return <Clock size={14} strokeWidth={2.2} aria-hidden="true" />
}

export function IntegrationTile({
  name,
  description,
  category,
  status,
  glyph,
  lastSync,
  scopes,
  onAction,
  actionHref,
  className,
}: IntegrationTileProps) {
  const statusChip = STATUS_CHIP[status]
  const classes = [styles.tile, STATUS_TONE_CLASS[status], className].filter(Boolean).join(" ")
  const actionLabel = STATUS_ACTION_LABEL[status]

  const actionElement = onAction ? (
    <button type="button" className={styles.actionBtn} onClick={onAction}>
      {actionLabel}
    </button>
  ) : actionHref ? (
    <a className={styles.actionBtn} href={actionHref}>
      {actionLabel}
    </a>
  ) : null

  return (
    <article className={classes} aria-label={`${name} integration`}>
      <header className={styles.head}>
        <div className={styles.glyph} aria-hidden="true">
          {glyph}
        </div>
        <div className={styles.identity}>
          {category && <span className={styles.category}>{category}</span>}
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.statusIcon} aria-hidden="true">
          <StatusIcon status={status} />
        </div>
      </header>

      <p className={styles.description}>{description}</p>

      <div className={styles.metaRow}>
        <Chip label={statusChip.label} tone={statusChip.tone} />
        {lastSync && status === "connected" && (
          <span className={styles.lastSync}>Last sync · {lastSync}</span>
        )}
      </div>

      {scopes && scopes.length > 0 && (
        <ul className={styles.scopes} aria-label={`${name} scopes`}>
          {scopes.map((scope) => (
            <li key={scope}>{scope}</li>
          ))}
        </ul>
      )}

      {actionElement && <footer className={styles.foot}>{actionElement}</footer>}
    </article>
  )
}

export default IntegrationTile
