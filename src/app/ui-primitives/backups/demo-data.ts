/** Shared Mufflermen mock data for the backup primitive sub-routes. */

import type {
  BackupDestinationInfo,
  BackupScheduleInfo,
  BackupSizeSample,
  ColdArchiveInfo,
  EncryptionInfo,
  IntegrityCheckRow,
  PointInTimeWindow,
  RestoreProgressInfo,
  RetentionRule,
  SnapshotRecord,
  VerificationResult,
} from "../components/backups"
import type { RestoreTarget } from "../components/backups"

export const SCHEDULES: ReadonlyArray<BackupScheduleInfo> = [
  {
    id: "sched-quote-db",
    resourceName: "Quote DB",
    frequency: "hourly",
    cron: "0 * * * *",
    nextRunAt: "2026-05-28T07:00:00Z",
    lastRunAt: "2026-05-28T06:00:00Z",
    lastStatus: "successful",
    enabled: true,
    retentionSummary: "7d / 4w / 12m / 5y",
  },
  {
    id: "sched-parts-catalogue",
    resourceName: "Parts catalogue",
    frequency: "every_6_hours",
    cron: "0 */6 * * *",
    nextRunAt: "2026-05-28T12:00:00Z",
    lastRunAt: "2026-05-28T06:00:00Z",
    lastStatus: "successful",
    enabled: true,
    retentionSummary: "14d / 4w / 6m",
  },
  {
    id: "sched-cms-media",
    resourceName: "CMS media",
    frequency: "daily",
    cron: "0 2 * * *",
    nextRunAt: "2026-05-29T02:00:00Z",
    lastRunAt: "2026-05-28T02:00:00Z",
    lastStatus: "verifying",
    enabled: true,
    retentionSummary: "7d / 4w / 12m",
  },
  {
    id: "sched-workshop-scheduler",
    resourceName: "Workshop scheduler",
    frequency: "daily",
    cron: "0 3 * * *",
    nextRunAt: "2026-05-29T03:00:00Z",
    lastRunAt: "2026-05-28T03:00:00Z",
    lastStatus: "failed",
    enabled: false,
    retentionSummary: "7d / 4w",
  },
]

export const SNAPSHOTS: ReadonlyArray<SnapshotRecord> = [
  {
    id: "snap-quote-db-20260528-06",
    resourceName: "Quote DB",
    createdAt: "2026-05-28T06:00:12Z",
    sizeBytes: 14_682_000_000,
    durationSec: 192,
    status: "successful",
    kind: "incremental",
    checksum: "sha256:48f1…",
  },
  {
    id: "snap-quote-db-20260528-05",
    resourceName: "Quote DB",
    createdAt: "2026-05-28T05:00:08Z",
    sizeBytes: 13_905_000_000,
    durationSec: 178,
    status: "successful",
    kind: "incremental",
  },
  {
    id: "snap-parts-cat-20260528-06",
    resourceName: "Parts catalogue",
    createdAt: "2026-05-28T06:00:02Z",
    sizeBytes: 2_120_000_000,
    durationSec: 64,
    status: "successful",
    kind: "differential",
  },
  {
    id: "snap-cms-media-20260528-02",
    resourceName: "CMS media",
    createdAt: "2026-05-28T02:00:00Z",
    sizeBytes: 38_412_000_000,
    durationSec: 1_812,
    status: "verifying",
    kind: "full",
  },
  {
    id: "snap-workshop-20260528-03",
    resourceName: "Workshop scheduler",
    createdAt: "2026-05-28T03:00:00Z",
    sizeBytes: 412_000_000,
    durationSec: 84,
    status: "failed",
    kind: "differential",
  },
  {
    id: "snap-quote-db-20260521-06",
    resourceName: "Quote DB",
    createdAt: "2026-05-21T06:00:00Z",
    sizeBytes: 11_204_000_000,
    durationSec: 152,
    status: "expired",
    kind: "full",
  },
]

export const RESTORE_TARGETS: ReadonlyArray<RestoreTarget> = [
  { id: "tgt-prod", label: "Mufflermen prod (ap-southeast-2)", detail: "rds.quote-db.prod" },
  { id: "tgt-staging", label: "Mufflermen staging", detail: "rds.quote-db.staging" },
  { id: "tgt-dev-clone", label: "Dev clone", detail: "rds.quote-db.devclone" },
]

export const RESTORE_IMPACT: ReadonlyArray<string> = [
  "All open quote sessions will be terminated for ~3 minutes during failover.",
  "Reverts the Quote DB to 2026-05-28T06:00:12Z — all quote acceptances after that time will be lost.",
  "Triggers PartsCatalogueResync downstream — expect 8–12 minutes of search-index rebuild.",
  "On-call must acknowledge in #mufflermen-ops before the operation can start.",
]

export const SIZE_SAMPLES: ReadonlyArray<BackupSizeSample> = [
  { date: "2026-05-14", fullBytes: 12_000_000_000, diffBytes: 2_200_000_000, incrementalBytes: 1_200_000_000 },
  { date: "2026-05-15", fullBytes: 12_000_000_000, diffBytes: 2_400_000_000, incrementalBytes: 1_400_000_000 },
  { date: "2026-05-16", fullBytes: 12_500_000_000, diffBytes: 2_500_000_000, incrementalBytes: 1_350_000_000 },
  { date: "2026-05-17", fullBytes: 12_700_000_000, diffBytes: 2_600_000_000, incrementalBytes: 1_500_000_000 },
  { date: "2026-05-18", fullBytes: 12_900_000_000, diffBytes: 2_700_000_000, incrementalBytes: 1_700_000_000 },
  { date: "2026-05-19", fullBytes: 13_100_000_000, diffBytes: 2_900_000_000, incrementalBytes: 1_800_000_000 },
  { date: "2026-05-20", fullBytes: 13_200_000_000, diffBytes: 3_000_000_000, incrementalBytes: 1_750_000_000 },
  { date: "2026-05-21", fullBytes: 13_300_000_000, diffBytes: 3_100_000_000, incrementalBytes: 1_900_000_000 },
  { date: "2026-05-22", fullBytes: 13_400_000_000, diffBytes: 3_200_000_000, incrementalBytes: 1_950_000_000 },
  { date: "2026-05-23", fullBytes: 13_500_000_000, diffBytes: 3_300_000_000, incrementalBytes: 2_000_000_000 },
  { date: "2026-05-24", fullBytes: 13_700_000_000, diffBytes: 3_400_000_000, incrementalBytes: 2_050_000_000 },
  { date: "2026-05-25", fullBytes: 13_900_000_000, diffBytes: 3_500_000_000, incrementalBytes: 2_100_000_000 },
  { date: "2026-05-26", fullBytes: 14_100_000_000, diffBytes: 3_600_000_000, incrementalBytes: 2_200_000_000 },
  { date: "2026-05-27", fullBytes: 14_300_000_000, diffBytes: 3_700_000_000, incrementalBytes: 2_250_000_000 },
  { date: "2026-05-28", fullBytes: 14_500_000_000, diffBytes: 3_800_000_000, incrementalBytes: 2_300_000_000 },
]

export const RETENTION_RULES: ReadonlyArray<RetentionRule> = [
  { tier: "daily", keepCount: 7, tierMoveEnabled: false },
  { tier: "weekly", keepCount: 4, tierMoveEnabled: true, moveTo: "cold" },
  { tier: "monthly", keepCount: 12, tierMoveEnabled: true, moveTo: "glacier" },
  { tier: "yearly", keepCount: 5, tierMoveEnabled: true, moveTo: "deep_archive" },
]

export const ENCRYPTION: EncryptionInfo = {
  algorithm: "aes_256_gcm",
  keySource: "kms",
  rotatedAt: "2026-05-01T00:00:00Z",
  keyLabel: "arn:aws:kms:ap-southeast-2:…:key/mufflermen-backups",
}

export const VERIFICATION_PASS: VerificationResult = {
  snapshotId: "snap-quote-db-20260528-06",
  checksumPassed: true,
  restoreTestPassed: true,
  lastVerifiedAt: "2026-05-28T06:18:00Z",
}

export const VERIFICATION_FAIL: VerificationResult = {
  snapshotId: "snap-workshop-20260528-03",
  checksumPassed: true,
  restoreTestPassed: false,
  lastVerifiedAt: "2026-05-28T03:14:00Z",
  message: "Restore-test container OOM-killed after 42s — verify available memory on test runner.",
}

export const PITR_WINDOW: PointInTimeWindow = {
  earliest: "2026-05-21T06:00:00Z",
  latest: "2026-05-28T06:42:00Z",
  lagSec: 180,
}

export const DESTINATIONS: ReadonlyArray<BackupDestinationInfo> = [
  {
    id: "dest-syd-primary",
    provider: "s3",
    bucketOrPath: "s3://mufflermen-backups-syd",
    region: "ap-southeast-2",
    redundancy: "zone_redundant",
    transferRateMbps: 940,
  },
  {
    id: "dest-syd-cold",
    provider: "s3",
    bucketOrPath: "s3://mufflermen-backups-syd-cold",
    region: "ap-southeast-2",
    redundancy: "geo_redundant",
    transferRateMbps: 220,
  },
  {
    id: "dest-mel-offsite",
    provider: "azure",
    bucketOrPath: "mufflermenbackups/offsite",
    region: "australiasoutheast",
    redundancy: "geo_redundant",
    transferRateMbps: 580,
  },
]

export const RESTORE_PROGRESS: RestoreProgressInfo = {
  snapshotId: "snap-quote-db-20260528-06",
  resourceName: "Quote DB",
  rowsRestored: 4_812_320,
  totalRows: 7_905_000,
  etaSec: 624,
  throughputRps: 7_820,
  paused: false,
}

export const INTEGRITY_ROWS: ReadonlyArray<IntegrityCheckRow> = [
  { snapshotId: "snap-quote-db-20260528-06", resourceName: "Quote DB", passed: true },
  { snapshotId: "snap-quote-db-20260528-05", resourceName: "Quote DB", passed: true },
  { snapshotId: "snap-parts-cat-20260528-06", resourceName: "Parts catalogue", passed: true },
  {
    snapshotId: "snap-workshop-20260528-03",
    resourceName: "Workshop scheduler",
    passed: false,
    reason: "Checksum mismatch on appointments.dat — last 3.4MB does not match write log.",
  },
  {
    snapshotId: "snap-cms-media-20260527-02",
    resourceName: "CMS media",
    passed: false,
    reason: "12 manifest entries reference missing object keys — repair via re-upload.",
  },
]

export const COLD_ARCHIVES: ReadonlyArray<ColdArchiveInfo> = [
  {
    id: "arc-quote-db-2025-q4",
    resourceName: "Quote DB · 2025 Q4",
    tier: "glacier",
    retrievalEstimate: "3 – 5 hours",
    archivedAt: "2026-01-08T00:00:00Z",
    sizeBytes: 142_000_000_000,
  },
  {
    id: "arc-cms-media-2024",
    resourceName: "CMS media · 2024",
    tier: "deep_archive",
    retrievalEstimate: "12 – 48 hours",
    archivedAt: "2025-02-02T00:00:00Z",
    sizeBytes: 1_280_000_000_000,
  },
  {
    id: "arc-parts-cat-2023",
    resourceName: "Parts catalogue · 2023",
    tier: "archive_tier",
    retrievalEstimate: "5 – 12 hours",
    archivedAt: "2024-01-04T00:00:00Z",
    sizeBytes: 38_000_000_000,
  },
]
