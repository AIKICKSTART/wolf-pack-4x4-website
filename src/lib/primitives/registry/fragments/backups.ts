import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "backups",
  "title": "Backups",
  "group": "System",
  "summary": "14 backup-and-recovery primitives: schedule cards, snapshot rows, restore wizard, size charts, retention/encryption controls, verification, PITR slider, destination/cold-storage cards and status chips.",
  "entries": [
    {
      "key": "backups/backup-schedule-card",
      "family": "backups",
      "name": "BackupScheduleCard",
      "label": "Backup schedule card",
      "description": "Card showing a resource's backup schedule with frequency/cron chips, enable toggle, live next-run countdown, last-run status and an edit action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-schedule-card",
      "tags": [
        "backup",
        "schedule",
        "cron"
      ],
      "status": "captured"
    },
    {
      "key": "backups/snapshot-list-row",
      "family": "backups",
      "name": "SnapshotListRow",
      "label": "Snapshot list row",
      "description": "Table row for a snapshot record showing id, resource, created time, formatted size, duration, status chip and restore/delete actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/snapshot-list-row",
      "tags": [
        "backup",
        "snapshot",
        "table-row"
      ],
      "status": "captured"
    },
    {
      "key": "backups/restore-wizard",
      "family": "backups",
      "name": "RestoreWizard",
      "label": "Restore wizard",
      "description": "Four-step (snapshot/target/impact/confirm) stepper wizard with a progress bar for choosing and confirming a backup restore.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/restore-wizard",
      "tags": [
        "backup",
        "restore",
        "wizard",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "backups/backup-size-chart",
      "family": "backups",
      "name": "BackupSizeChart",
      "label": "Backup size chart",
      "description": "SVG stacked-area chart of full/differential/incremental backup sizes over time with grid ticks, retention-horizon marker and growth projection.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-size-chart",
      "tags": [
        "backup",
        "chart",
        "data-viz",
        "size"
      ],
      "status": "captured"
    },
    {
      "key": "backups/retention-policy-editor",
      "family": "backups",
      "name": "RetentionPolicyEditor",
      "label": "Retention policy editor",
      "description": "Editor for daily/weekly/monthly/yearly retention rules with keep-count inputs and a tier-mover toggle that selects a destination storage tier.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/retention-policy-editor",
      "tags": [
        "backup",
        "retention",
        "policy",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "backups/encryption-at-rest-indicator",
      "family": "backups",
      "name": "EncryptionAtRestIndicator",
      "label": "Encryption at rest indicator",
      "description": "Lock-icon card showing the encryption algorithm, key source chip, rotation date and optional key label for at-rest backup encryption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/encryption-at-rest-indicator",
      "tags": [
        "backup",
        "encryption",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "backups/backup-verification-result",
      "family": "backups",
      "name": "BackupVerificationResult",
      "label": "Backup verification result",
      "description": "Card reporting checksum and restore-test verification pass/fail with icons, overall status, message and a verify-now action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-verification-result",
      "tags": [
        "backup",
        "verification",
        "checksum"
      ],
      "status": "captured"
    },
    {
      "key": "backups/point-in-time-recovery-slider",
      "family": "backups",
      "name": "PointInTimeRecoverySlider",
      "label": "Point-in-time recovery slider",
      "description": "Range slider for selecting a restore timestamp between earliest and latest PITR bounds, with replication-lag indicator and lag warning.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/point-in-time-recovery-slider",
      "tags": [
        "backup",
        "pitr",
        "recovery",
        "slider"
      ],
      "status": "captured"
    },
    {
      "key": "backups/backup-destination-card",
      "family": "backups",
      "name": "BackupDestinationCard",
      "label": "Backup destination card",
      "description": "Card for a backup storage destination showing provider glyph (S3/GCS/Azure/Wasabi/local), bucket path, region, redundancy class and transfer rate.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-destination-card",
      "tags": [
        "backup",
        "destination",
        "storage",
        "cloud"
      ],
      "status": "captured"
    },
    {
      "key": "backups/compressed-size-badge",
      "family": "backups",
      "name": "CompressedSizeBadge",
      "label": "Compressed size badge",
      "description": "Inline badge showing raw-to-compressed byte sizes and the computed percent savings for a backup.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/compressed-size-badge",
      "tags": [
        "backup",
        "compression",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "backups/backup-kind-chip",
      "family": "backups",
      "name": "BackupKindChip",
      "label": "Backup kind chip",
      "description": "Small toned chip labelling a backup kind (full/differential/incremental/log-only) with a single-letter glyph and sm/md sizes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-kind-chip",
      "tags": [
        "backup",
        "chip",
        "kind",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "backups/restore-progress-status",
      "family": "backups",
      "name": "RestoreProgressStatus",
      "label": "Restore progress status",
      "description": "Card tracking an in-progress restore with a progress bar, rows-restored/total, throughput, ETA and a pause/resume control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/restore-progress-status",
      "tags": [
        "backup",
        "restore",
        "progress",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "backups/backup-integrity-check",
      "family": "backups",
      "name": "BackupIntegrityCheck",
      "label": "Backup integrity check",
      "description": "Surface listing snapshot integrity-check rows with passed/failed summary, a scan-progress bar and per-row remediate actions for failures.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/backup-integrity-check",
      "tags": [
        "backup",
        "integrity",
        "scan",
        "verification"
      ],
      "status": "captured"
    },
    {
      "key": "backups/cold-storage-archive-card",
      "family": "backups",
      "name": "ColdStorageArchiveCard",
      "label": "Cold storage archive card",
      "description": "Card for an archived backup showing storage tier chip (cold/glacier/deep-archive), archived date, size, retrieval estimate and a request-thaw action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/backups",
      "routeHref": "/ui-primitives/backups/cold-storage-archive-card",
      "tags": [
        "backup",
        "archive",
        "cold-storage",
        "glacier"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
