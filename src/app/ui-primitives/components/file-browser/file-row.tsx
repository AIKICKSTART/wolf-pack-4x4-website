"use client"

import { ChevronRight } from "lucide-react"
import type { MouseEvent } from "react"

import { Avatar } from "../primitives/avatar"

import { FileTypeIcon } from "./file-type-icon"
import type { FileItem } from "./file-types"

import styles from "./file-row.module.css"

interface FileRowProps {
  file: FileItem
  selected?: boolean
  onSelect?: (file: FileItem, event: MouseEvent<HTMLTableRowElement>) => void
  onMenuOpen?: (file: FileItem) => void
}

function formatSize(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export function FileRow({ file, selected = false, onSelect, onMenuOpen }: FileRowProps) {
  const classes = [styles.row, selected ? styles.rowSelected : ""]
    .filter(Boolean)
    .join(" ")

  const handleClick = (event: MouseEvent<HTMLTableRowElement>) => {
    onSelect?.(file, event)
  }

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onMenuOpen?.(file)
  }

  return (
    <tr
      className={classes}
      aria-selected={selected}
      onClick={handleClick}
      tabIndex={0}
    >
      <td className={styles.iconCell}>
        <FileTypeIcon kind={file.kind} size="sm" />
      </td>
      <td className={styles.nameCell}>
        <span className={styles.name} title={file.name}>
          {file.name}
        </span>
      </td>
      <td className={styles.sizeCell}>{formatSize(file.size)}</td>
      <td className={styles.modifiedCell}>
        <time dateTime={file.modified}>{file.modified}</time>
      </td>
      <td className={styles.ownerCell}>
        <span className={styles.ownerInner}>
          <Avatar
            name={file.owner.name}
            src={file.owner.avatar}
            size="sm"
            tone="obsidian"
          />
          <span className={styles.ownerName}>{file.owner.name}</span>
        </span>
      </td>
      <td className={styles.actionsCell}>
        <button
          type="button"
          className={styles.chevronBtn}
          aria-label={`Open actions for ${file.name}`}
          onClick={handleMenu}
        >
          <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </td>
    </tr>
  )
}

export default FileRow
