"use client"

import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import type { MouseEventHandler } from "react"

import { FileTypeIcon } from "./file-type-icon"
import type { FileItem } from "./file-types"

import styles from "./file-card.module.css"

interface FileCardProps {
  file: FileItem
  selected?: boolean
  onSelect?: (file: FileItem, event: React.MouseEvent<HTMLDivElement>) => void
  onMenuOpen?: (file: FileItem) => void
  className?: string
}

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export function FileCard({
  file,
  selected = false,
  onSelect,
  onMenuOpen,
  className,
}: FileCardProps) {
  const classes = [
    styles.card,
    selected ? styles.cardSelected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    onSelect?.(file, event)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onMenuOpen?.(file)
  }

  return (
    <div
      role="option"
      tabIndex={0}
      aria-selected={selected}
      aria-label={file.name}
      className={classes}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelect?.(
            file,
            event as unknown as React.MouseEvent<HTMLDivElement>,
          )
        }
      }}
    >
      <div className={styles.thumb} aria-hidden="true">
        {file.thumb ? (
          <Image
            src={file.thumb}
            alt=""
            width={160}
            height={108}
            className={styles.thumbImage}
            unoptimized
          />
        ) : (
          <span className={styles.thumbFallback}>
            <FileTypeIcon kind={file.kind} size="lg" />
          </span>
        )}
        <span className={styles.thumbScrim} />
      </div>

      <div className={styles.body}>
        <span className={styles.name} title={file.name}>
          {file.name}
        </span>
        <span className={styles.meta}>
          <span>{formatSize(file.size)}</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <time dateTime={file.modified}>{file.modified}</time>
        </span>
      </div>

      <button
        type="button"
        className={styles.menuBtn}
        aria-label={`Open actions for ${file.name}`}
        onClick={handleMenuClick}
      >
        <MoreHorizontal size={14} strokeWidth={2} aria-hidden="true" />
      </button>

      {selected ? (
        <span className={styles.tick} aria-hidden="true">
          ✓
        </span>
      ) : null}
    </div>
  )
}

export default FileCard
