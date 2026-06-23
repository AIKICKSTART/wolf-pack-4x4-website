import { Download } from "lucide-react"

import { FileTypeIcon } from "../file-browser/file-type-icon"
import type { FileKind } from "../file-browser/file-types"

import styles from "./file-attachment-bubble.module.css"
import type { MessageSender } from "./inbox-types"

interface FileAttachmentBubbleProps {
  sender: MessageSender
  /** Display filename including extension. */
  fileName: string
  /** Human-readable file size (e.g. "1.2 MB"). */
  fileSize: string
  /** Optional extension override; otherwise derived from fileName. */
  extension?: string
  /** Document kind used by the file-type-icon. */
  kind: FileKind
  /** Optional progress 0-100 for in-flight uploads. */
  progress?: number
  /** Download href; visual-only when omitted. */
  downloadHref?: string
  className?: string
}

function deriveExtension(name: string): string {
  const dot = name.lastIndexOf(".")
  if (dot < 0 || dot === name.length - 1) {
    return ""
  }
  return name.slice(dot + 1)
}

export function FileAttachmentBubble({
  sender,
  fileName,
  fileSize,
  extension,
  kind,
  progress,
  downloadHref,
  className,
}: FileAttachmentBubbleProps) {
  const isMine = sender === "me"
  const classes = [
    styles.bubble,
    isMine ? styles.bubbleMine : styles.bubbleTheirs,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const ext = extension ?? deriveExtension(fileName)
  const showProgress =
    typeof progress === "number" && progress >= 0 && progress < 100

  return (
    <article className={classes} aria-label={`File attachment: ${fileName}`}>
      <FileTypeIcon kind={kind} extension={ext} size="md" />
      <div className={styles.body}>
        <strong className={styles.fileName}>{fileName}</strong>
        <div className={styles.meta}>
          <span>{fileSize}</span>
          {ext ? <span className={styles.extPill}>{ext.toUpperCase()}</span> : null}
        </div>
        {showProgress ? (
          <div
            className={styles.progress}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Upload ${progress}%`}
          >
            <span
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>
      {downloadHref ? (
        <a
          href={downloadHref}
          className={styles.downloadBtn}
          aria-label={`Download ${fileName}`}
          download
        >
          <Download size={14} strokeWidth={2.3} aria-hidden="true" />
          <span>Download</span>
        </a>
      ) : (
        <button
          type="button"
          className={styles.downloadBtn}
          aria-label={`Download ${fileName}`}
        >
          <Download size={14} strokeWidth={2.3} aria-hidden="true" />
          <span>Download</span>
        </button>
      )}
    </article>
  )
}

export default FileAttachmentBubble
