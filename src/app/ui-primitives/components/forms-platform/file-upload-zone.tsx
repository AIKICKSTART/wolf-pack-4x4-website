import type { FileScanState, UploadedFileEntry } from "./forms-platform-types"
import styles from "./file-upload-zone.module.css"

interface FileUploadZoneProps {
  /** Heading text inside the dashed drop area. */
  title: string
  /** Mono hint beneath the title. */
  hint?: string
  /** Whether the drop area is in "drag-over" highlight state. */
  active?: boolean
  /** Uploaded file entries — rendered as a list. */
  files: ReadonlyArray<UploadedFileEntry>
  className?: string
}

const SCAN_LABEL: Record<FileScanState, string> = {
  queued: "Queued",
  scanning: "Scanning",
  clean: "Clean",
  infected: "Threat",
}

const SCAN_CLASS: Record<FileScanState, string> = {
  queued: styles.scanQueued,
  scanning: styles.scanScanning,
  clean: styles.scanClean,
  infected: styles.scanInfected,
}

export function FileUploadZone({
  title,
  hint,
  active = false,
  files,
  className,
}: FileUploadZoneProps) {
  const classes = [styles.zone, className].filter(Boolean).join(" ")
  const dropClass = [
    styles.dropArea,
    active ? styles.dropAreaActive : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label="File upload">
      <div
        className={dropClass}
        role="region"
        aria-roledescription="file drop zone"
        aria-label={`${title}. Drop files or browse`}
      >
        <span className={styles.dropIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 12V3m0 0L5.5 6.5M9 3l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 11v3a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className={styles.dropTitle}>{title}</span>
        {hint ? <span className={styles.dropHint}>{hint}</span> : null}
        <button type="button" className={styles.browseBtn}>
          Browse files
        </button>
      </div>

      {files.length > 0 ? (
        <div className={styles.list}>
          <div className={styles.listHead}>
            <span>{files.length} file{files.length === 1 ? "" : "s"}</span>
            <span>Virus-scanned · ClamAV</span>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
            {files.map((file) => {
              const progress = Math.max(0, Math.min(100, file.progress))
              return (
                <li key={file.id} className={styles.fileRow}>
                  <span className={styles.fileIcon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 1.5h5L11 4.5V12.5A1 1 0 0 1 10 13.5H3a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                      <path d="M8 1.5V5h3" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <div className={styles.fileBody}>
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileMeta}>
                      <span>{file.sizeLabel}</span>
                      {file.kind ? <span>· {file.kind}</span> : null}
                      <span>· {progress}%</span>
                    </span>
                    <span
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress}
                      aria-label={`${file.name} upload progress`}
                    >
                      <span
                        className={styles.progressFill}
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  </div>
                  <span
                    className={`${styles.scanBadge} ${SCAN_CLASS[file.scanState]}`}
                    aria-label={`Scan state ${SCAN_LABEL[file.scanState]}`}
                  >
                    <span className={styles.scanDot} aria-hidden="true" />
                    {SCAN_LABEL[file.scanState]}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
