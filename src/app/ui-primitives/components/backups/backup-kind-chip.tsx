import type { BackupKind } from "./backup-types"

import styles from "./backup-kind-chip.module.css"

const KIND_LABEL: Record<BackupKind, string> = {
  full: "Full",
  differential: "Differential",
  incremental: "Incremental",
  log_only: "Log only",
}

const KIND_TONE: Record<BackupKind, string> = {
  full: styles.toneRed,
  differential: styles.toneAmber,
  incremental: styles.toneTeal,
  log_only: styles.toneMuted,
}

const KIND_GLYPH: Record<BackupKind, string> = {
  full: "F",
  differential: "D",
  incremental: "I",
  log_only: "L",
}

interface BackupKindChipProps {
  kind: BackupKind
  size?: "sm" | "md"
  className?: string
}

export function BackupKindChip({
  kind,
  size = "md",
  className,
}: BackupKindChipProps) {
  const classes = [
    styles.chip,
    size === "sm" ? styles.sm : styles.md,
    KIND_TONE[kind],
    className,
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <span className={classes} aria-label={`Backup kind: ${KIND_LABEL[kind]}`}>
      <span className={styles.glyph} aria-hidden="true">
        {KIND_GLYPH[kind]}
      </span>
      <span className={styles.label}>{KIND_LABEL[kind]}</span>
    </span>
  )
}

export default BackupKindChip
