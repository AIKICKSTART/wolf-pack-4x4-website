"use client"

import { Download, Share2, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import { FileTypeIcon } from "./file-type-icon"
import type { FileItem } from "./file-types"

import styles from "./file-preview-pane.module.css"

interface FilePreviewPaneProps {
  file: FileItem | null
  onDownload?: (file: FileItem) => void
  onShare?: (file: FileItem) => void
  onDelete?: (file: FileItem) => void
  className?: string
}

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

const KIND_LABEL: Record<FileItem["kind"], string> = {
  image: "Image",
  video: "Video",
  audio: "Audio",
  pdf: "PDF",
  doc: "Document",
  sheet: "Sheet",
  slide: "Slides",
  archive: "Archive",
  code: "Code",
  "3d-model": "3D",
  cad: "CAD",
  generic: "File",
}

export function FilePreviewPane({
  file,
  onDownload,
  onShare,
  onDelete,
  className,
}: FilePreviewPaneProps) {
  const [propsOpen, setPropsOpen] = useState<boolean>(true)

  if (!file) {
    return (
      <aside
        className={[styles.pane, styles.paneEmpty, className]
          .filter(Boolean)
          .join(" ")}
        aria-label="File preview"
      >
        <span className={styles.emptyGlyph} aria-hidden="true">
          ◇
        </span>
        <p className={styles.emptyText}>Select a file to preview.</p>
      </aside>
    )
  }

  return (
    <aside
      className={[styles.pane, className].filter(Boolean).join(" ")}
      aria-label={`Preview of ${file.name}`}
    >
      <div className={styles.preview}>
        {file.thumb ? (
          <Image
            src={file.thumb}
            alt={file.name}
            width={520}
            height={360}
            className={styles.previewImage}
            unoptimized
          />
        ) : (
          <span className={styles.previewFallback} aria-hidden="true">
            <FileTypeIcon kind={file.kind} size="lg" />
          </span>
        )}
      </div>

      <header className={styles.head}>
        <h3 className={styles.name} title={file.name}>
          {file.name}
        </h3>
        <Chip label={KIND_LABEL[file.kind]} tone="neutral" />
      </header>

      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt>Size</dt>
          <dd>{formatSize(file.size)}</dd>
        </div>
        {file.dimensions ? (
          <div className={styles.metaRow}>
            <dt>Dimensions</dt>
            <dd>
              {file.dimensions.width} × {file.dimensions.height}
            </dd>
          </div>
        ) : null}
        <div className={styles.metaRow}>
          <dt>Modified</dt>
          <dd>
            <time dateTime={file.modified}>{file.modified}</time>
          </dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Owner</dt>
          <dd className={styles.ownerCell}>
            <Avatar
              name={file.owner.name}
              src={file.owner.avatar}
              size="sm"
              tone="obsidian"
            />
            <span>{file.owner.name}</span>
          </dd>
        </div>
      </dl>

      {file.properties && file.properties.length > 0 ? (
        <details
          className={styles.accordion}
          open={propsOpen}
          onToggle={(event) =>
            setPropsOpen((event.target as HTMLDetailsElement).open)
          }
        >
          <summary className={styles.accordionSummary}>Properties</summary>
          <dl className={styles.props}>
            {file.properties.map((p) => (
              <div key={p.label} className={styles.propRow}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      ) : null}

      <div className={styles.actions} role="group" aria-label="File actions">
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onDownload?.(file)}
        >
          <Download size={14} strokeWidth={2.2} aria-hidden="true" />
          Download
        </button>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onShare?.(file)}
        >
          <Share2 size={14} strokeWidth={2.2} aria-hidden="true" />
          Share
        </button>
        <button
          type="button"
          className={[styles.actionBtn, styles.actionBtnDestructive].join(" ")}
          onClick={() => onDelete?.(file)}
        >
          <Trash2 size={14} strokeWidth={2.2} aria-hidden="true" />
          Delete
        </button>
      </div>
    </aside>
  )
}

export default FilePreviewPane
