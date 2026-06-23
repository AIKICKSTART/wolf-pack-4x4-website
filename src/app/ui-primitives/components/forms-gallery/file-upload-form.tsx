"use client"

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react"

import styles from "./file-upload-form.module.css"

export interface FileUploadItem {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "done" | "error"
  isValidType: boolean
  isValidSize: boolean
}

export interface FileUploadFormValues {
  files: FileUploadItem[]
}

interface FileUploadFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<FileUploadFormValues>
}

const MAX_SIZE_MB = 25
const ACCEPTED_TYPES: ReadonlyArray<string> = ["jpg", "png", "pdf", "heic", "mp4"]

const SEED_FILES: ReadonlyArray<FileUploadItem> = [
  {
    id: "seed-1",
    name: "underbody-2010-commodore.jpg",
    size: 4_184_000,
    type: "image/jpeg",
    progress: 100,
    status: "done",
    isValidType: true,
    isValidSize: true,
  },
  {
    id: "seed-2",
    name: "exhaust-noise-recording.mp4",
    size: 18_320_000,
    type: "video/mp4",
    progress: 64,
    status: "uploading",
    isValidType: true,
    isValidSize: true,
  },
  {
    id: "seed-3",
    name: "previous-quote.pdf",
    size: 760_000,
    type: "application/pdf",
    progress: 100,
    status: "done",
    isValidType: true,
    isValidSize: true,
  },
]

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

function getExtension(name: string): string {
  const dot = name.lastIndexOf(".")
  if (dot === -1) return "?"
  return name.slice(dot + 1).toUpperCase().slice(0, 3)
}

export function FileUploadForm({ onSubmit, defaultValues }: FileUploadFormProps) {
  const dropLabelId = useId()
  const fileInputId = useId()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [files, setFiles] = useState<FileUploadItem[]>(
    defaultValues?.files ?? [...SEED_FILES],
  )
  const [dragActive, setDragActive] = useState<boolean>(false)

  const totalBytes = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files],
  )

  const remove = useCallback((id: string) => {
    setFiles((current) => current.filter((file) => file.id !== id))
  }, [])

  const addFromFileList = (fileList: FileList | null) => {
    if (!fileList) return
    const added: FileUploadItem[] = Array.from(fileList).map((file, idx) => {
      const ext = getExtension(file.name).toLowerCase()
      const isValidType = ACCEPTED_TYPES.includes(ext)
      const isValidSize = file.size <= MAX_SIZE_MB * 1_000_000
      return {
        id: `${Date.now()}-${idx}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 100,
        status: isValidType && isValidSize ? "done" : "error",
        isValidType,
        isValidSize,
      }
    })
    setFiles((current) => [...current, ...added])
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    addFromFileList(event.dataTransfer.files)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFromFileList(event.target.files)
    event.target.value = ""
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    files.forEach((file) => {
      data.append("files", file.name)
    })
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>08 / Upload</span>
        <h2 className={styles.title}>Drop your evidence</h2>
        <p className={styles.lede}>
          Underbody photos, sound recordings, prior quotes — drag and drop or browse.
        </p>
      </header>

      <div
        className={`${styles.dropZone} ${dragActive ? styles.dropZoneActive : ""}`}
        aria-labelledby={dropLabelId}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className={styles.dropIcon} aria-hidden="true">
          ↑
        </span>
        <span id={dropLabelId} className={styles.dropTitle}>
          Drop files here
        </span>
        <p className={styles.dropCopy}>
          or click to browse. Photos, video, and PDF up to {MAX_SIZE_MB} MB each.
        </p>
        <button
          type="button"
          className={styles.browseBtn}
          onClick={(event) => {
            event.stopPropagation()
            handleBrowseClick()
          }}
        >
          Browse files
        </button>
        <div className={styles.constraints}>
          {ACCEPTED_TYPES.map((ext) => (
            <span key={ext} className={styles.constraintChip}>
              .{ext}
            </span>
          ))}
          <span className={styles.constraintChip}>≤ {MAX_SIZE_MB} MB</span>
        </div>
        <input
          ref={fileInputRef}
          id={fileInputId}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.heic,.mp4"
          aria-label="Upload evidence files"
          tabIndex={-1}
          onChange={handleFileChange}
          className={styles.hiddenFile}
        />
      </div>

      {files.length > 0 ? (
        <div className={styles.fileList}>
          {files.map((file) => {
            const fillClass = [
              styles.progressFill,
              file.status === "done" ? styles.progressFillDone : "",
              file.status === "error" ? styles.progressFillError : "",
            ]
              .filter(Boolean)
              .join(" ")
            const typeOk = file.isValidType
            const sizeOk = file.isValidSize
            return (
              <div key={file.id} className={styles.fileRow}>
                <span className={styles.fileIcon} aria-hidden="true">
                  {getExtension(file.name)}
                </span>
                <div className={styles.fileBody}>
                  <div className={styles.fileTopRow}>
                    <span className={styles.fileName} title={file.name}>
                      {file.name}
                    </span>
                    <span className={styles.fileMeta}>{formatSize(file.size)}</span>
                  </div>
                  <div className={styles.fileProgress}>
                    <div
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-valuenow={file.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${file.name} upload`}
                    >
                      <span
                        className={fillClass}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className={styles.fileBadgeRow}>
                    <span
                      className={`${styles.badge} ${typeOk ? styles.badgeOk : styles.badgeWarn}`}
                    >
                      {typeOk ? "Type ok" : "Bad type"}
                    </span>
                    <span
                      className={`${styles.badge} ${sizeOk ? styles.badgeOk : styles.badgeWarn}`}
                    >
                      {sizeOk ? "Size ok" : "Too large"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(file.id)}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>
      ) : null}

      <div className={styles.totals}>
        <span className={styles.totalsLabel}>Total queued · {files.length} files</span>
        <output className={styles.totalsValue} aria-live="polite">
          {formatSize(totalBytes)}
        </output>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Upload all
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
