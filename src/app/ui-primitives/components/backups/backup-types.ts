/** Shared types for the generic backup + snapshot primitives. */

export type BackupStatus =
  | "successful"
  | "in_progress"
  | "failed"
  | "expired"
  | "verifying"

export type BackupKind = "full" | "differential" | "incremental" | "log_only"

export type EncryptionAlgo =
  | "aes_256_gcm"
  | "aes_256_cbc"
  | "chacha20_poly1305"
  | "rsa_4096"

export type KeySource = "kms" | "customer_managed" | "vault" | "platform"

export type StorageTier =
  | "hot"
  | "warm"
  | "cold"
  | "glacier"
  | "deep_archive"
  | "archive_tier"

export type RetentionTier = "daily" | "weekly" | "monthly" | "yearly"

export type ScheduleFrequency =
  | "hourly"
  | "every_6_hours"
  | "daily"
  | "weekly"
  | "monthly"

export type RedundancyClass = "single" | "zone_redundant" | "geo_redundant"

export interface BackupScheduleInfo {
  id: string
  resourceName: string
  frequency: ScheduleFrequency
  /** Cron expression for display. */
  cron?: string
  /** ISO timestamp of next scheduled run. */
  nextRunAt: string
  /** ISO timestamp of last completed run. */
  lastRunAt?: string
  lastStatus?: BackupStatus
  enabled: boolean
  /** Retention summary label — e.g. "7 daily / 4 weekly / 12 monthly". */
  retentionSummary: string
}

export interface SnapshotRecord {
  id: string
  /** ISO timestamp. */
  createdAt: string
  sizeBytes: number
  /** Duration in seconds. */
  durationSec: number
  status: BackupStatus
  kind: BackupKind
  resourceName: string
  /** Optional checksum tag. */
  checksum?: string
}

export interface RetentionRule {
  tier: RetentionTier
  keepCount: number
  /** Whether older snapshots are moved to a cooler tier instead of deleted. */
  tierMoveEnabled: boolean
  /** Optional target storage tier when tier-move is enabled. */
  moveTo?: StorageTier
}

export interface BackupDestinationInfo {
  id: string
  /** Provider tag — used for logo selection. */
  provider: "s3" | "gcs" | "azure" | "wasabi" | "local"
  bucketOrPath: string
  region: string
  redundancy: RedundancyClass
  /** Mbps transfer rate observed. */
  transferRateMbps: number
}

export interface EncryptionInfo {
  algorithm: EncryptionAlgo
  keySource: KeySource
  /** ISO timestamp of last key rotation. */
  rotatedAt: string
  /** Optional human-readable key id label. */
  keyLabel?: string
}

export interface VerificationResult {
  snapshotId: string
  checksumPassed: boolean
  restoreTestPassed: boolean
  /** ISO timestamp. */
  lastVerifiedAt: string
  /** Optional message when something failed. */
  message?: string
}

export interface BackupSizeSample {
  /** ISO date — daily granularity. */
  date: string
  /** Bytes — full backups. */
  fullBytes: number
  /** Bytes — differential backups. */
  diffBytes: number
  /** Bytes — incremental backups. */
  incrementalBytes: number
}

export interface PointInTimeWindow {
  /** ISO timestamp of earliest restorable point. */
  earliest: string
  /** ISO timestamp of latest restorable point. */
  latest: string
  /** Lag in seconds between latest and now. */
  lagSec: number
}

export interface RestoreProgressInfo {
  snapshotId: string
  resourceName: string
  rowsRestored: number
  totalRows: number
  /** ETA in seconds. */
  etaSec: number
  /** Throughput in rows per second. */
  throughputRps: number
  paused: boolean
}

export interface IntegrityCheckRow {
  snapshotId: string
  resourceName: string
  passed: boolean
  /** Optional failure reason. */
  reason?: string
}

export interface ColdArchiveInfo {
  id: string
  /** Display label for the archived resource. */
  resourceName: string
  tier: StorageTier
  /** Estimated retrieval time, e.g. "3-5 hours". */
  retrievalEstimate: string
  /** ISO timestamp of archive creation. */
  archivedAt: string
  sizeBytes: number
}

export interface CompressedSizeInfo {
  rawBytes: number
  compressedBytes: number
}
