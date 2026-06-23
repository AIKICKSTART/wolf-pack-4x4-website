"use client"

import { CheckCircle2, UploadCloud, X } from "lucide-react"
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react"

import { FileTypeIcon } from "./file-type-icon"
import type { UploadEntry } from "./file-types"

import styles from "./upload-drop-zone.module.css"

type UploadStatus = UploadEntry["status"]
type SegmentId = "queued" | "uploading" | "done"

interface UploadDropZoneProps {
  entries: ReadonlyArray<UploadEntry>
  onAdd?: (files: FileList) => void
  onCancel?: (id: string) => void
  /** Max file size in MB shown as guidance text only. */
  maxSizeMb?: number
  acceptHint?: string
  className?: string
}

const SEGMENTS: ReadonlyArray<{ id: SegmentId; label: string }> = [
  { id: "queued", label: "Queued" },
  { id: "uploading", label: "Uploading" },
  { id: "done", label: "Done" },
]

const STATUS_TO_SEGMENT: Record<UploadStatus, SegmentId | null> = {
  queued: "queued",
  uploading: "uploading",
  done: "done",
  error: null,
}

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec <= 0) return "—"
  return `${formatSize(bytesPerSec)}/s`
}

function formatEta(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "—"
  if (seconds < 60) return `${Math.round(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s.toString().padStart(2, "0")}s`
}

export function UploadDropZone({
  entries,
  onAdd,
  onCancel,
  maxSizeMb = 50,
  acceptHint = "Images, video, PDFs, models",
  className,
}: UploadDropZoneProps) {
  const dropLabelId = useId()
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [segment, setSegment] = useState<SegmentId>("uploading")

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragActive(false)
  }, [])

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragActive(false)
      onAdd?.(event.dataTransfer.files)
    },
    [onAdd],
  )

  const handleFileInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) onAdd?.(event.target.files)
      event.target.value = ""
    },
    [onAdd],
  )

  const handleZoneKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        const input = event.currentTarget.querySelector<HTMLInputElement>(
          "input[type=file]",
        )
        input?.click()
      }
    },
    [],
  )

  const totals = useMemo(() => {
    let totalSpeed = 0
    let totalRemaining = 0
    let active = 0
    for (const entry of entries) {
      if (entry.status === "uploading") {
        totalSpeed += entry.speed
        const remaining = entry.size * (1 - entry.progress / 100)
        totalRemaining += remaining
        active += 1
      }
    }
    const eta = totalSpeed > 0 ? totalRemaining / totalSpeed : Infinity
    return { totalSpeed, eta, active }
  }, [entries])

  const filtered = useMemo(
    () => entries.filter((e) => STATUS_TO_SEGMENT[e.status] === segment),
    [entries, segment],
  )

  const counts = useMemo(() => {
    const c: Record<SegmentId, number> = { queued: 0, uploading: 0, done: 0 }
    for (const e of entries) {
      const seg = STATUS_TO_SEGMENT[e.status]
      if (seg) c[seg] += 1
    }
    return c
  }, [entries])

  return (
    <section
      aria-label="Upload drop zone"
      className={[styles.section, className].filter(Boolean).join(" ")}
    >
      <header className={styles.summary}>
        <span className={styles.summaryLabel}>
          <UploadCloud size={14} strokeWidth={2.2} aria-hidden="true" />
          {totals.active > 0
            ? `${totals.active} uploading`
            : "Idle"}
        </span>
        <span className={styles.summaryMeta}>
          <span>{formatSpeed(totals.totalSpeed)}</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span>ETA {formatEta(totals.eta)}</span>
        </span>
      </header>

      <div
        className={[styles.zone, dragActive ? styles.zoneActive : ""]
          .filter(Boolean)
          .join(" ")}
        role="button"
        tabIndex={0}
        aria-labelledby={dropLabelId}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleZoneKeyDown}
      >
        <UploadCloud size={28} strokeWidth={1.6} aria-hidden="true" />
        <h3 id={dropLabelId} className={styles.zoneTitle}>
          Drop assets to upload
        </h3>
        <p className={styles.zoneCopy}>
          {acceptHint} · up to {maxSizeMb} MB each
        </p>
        <label className={styles.browseLabel}>
          Browse files
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            className={styles.hiddenInput}
          />
        </label>
      </div>

      <div className={styles.segmented} role="tablist">
        {SEGMENTS.map((seg) => {
          const active = segment === seg.id
          return (
            <button
              key={seg.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={[styles.segment, active ? styles.segmentActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSegment(seg.id)}
            >
              <span>{seg.label}</span>
              <span className={styles.segmentCount}>{counts[seg.id]}</span>
            </button>
          )
        })}
      </div>

      <ul className={styles.list}>
        {filtered.length === 0 ? (
          <li className={styles.empty}>Nothing in this stage.</li>
        ) : null}
        {filtered.map((entry) => {
          const speedLabel =
            entry.status === "uploading"
              ? formatSpeed(entry.speed)
              : entry.status === "done"
                ? "Complete"
                : "Waiting"
          return (
            <li key={entry.id} className={styles.entry}>
              <span className={styles.entryIcon} aria-hidden="true">
                <FileTypeIcon kind={entry.kind} size="sm" />
              </span>
              <div className={styles.entryBody}>
                <span className={styles.entryName} title={entry.name}>
                  {entry.name}
                </span>
                <div className={styles.entryRow}>
                  <span className={styles.entrySize}>
                    {formatSize(entry.size)}
                  </span>
                  <span className={styles.dot} aria-hidden="true">
                    •
                  </span>
                  <span className={styles.entryStatus}>{speedLabel}</span>
                </div>
                <div
                  className={styles.progress}
                  role="progressbar"
                  aria-valuenow={Math.round(entry.progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${entry.name} upload progress`}
                >
                  <span
                    className={[
                      styles.progressFill,
                      entry.status === "done" ? styles.progressFillDone : "",
                      entry.status === "error"
                        ? styles.progressFillError
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ width: `${entry.progress}%` }}
                  />
                </div>
              </div>
              {entry.status === "done" ? (
                <span className={styles.doneIcon} aria-label="Upload complete">
                  <CheckCircle2 size={16} strokeWidth={2.2} />
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.cancelBtn}
                  aria-label={`Cancel upload of ${entry.name}`}
                  onClick={() => onCancel?.(entry.id)}
                >
                  <X size={14} strokeWidth={2.2} aria-hidden="true" />
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default UploadDropZone
