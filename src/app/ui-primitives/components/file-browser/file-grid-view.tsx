"use client"

import { useCallback, useState, type MouseEvent } from "react"

import { FileCard } from "./file-card"
import type { FileItem } from "./file-types"

import styles from "./file-grid-view.module.css"

interface FileGridViewProps {
  files: ReadonlyArray<FileItem>
  /** Controlled selection set; falls back to internal state. */
  selectedIds?: ReadonlySet<string>
  defaultSelectedIds?: ReadonlyArray<string>
  onSelectionChange?: (ids: ReadonlySet<string>) => void
  onMenuOpen?: (file: FileItem) => void
  className?: string
}

function toggle(set: ReadonlySet<string>, id: string): Set<string> {
  const next = new Set(set)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  return next
}

function rangeSelect(
  files: ReadonlyArray<FileItem>,
  anchorId: string,
  endId: string,
): Set<string> {
  const anchor = files.findIndex((f) => f.id === anchorId)
  const end = files.findIndex((f) => f.id === endId)
  if (anchor === -1 || end === -1) return new Set([endId])
  const [from, to] = anchor < end ? [anchor, end] : [end, anchor]
  return new Set(files.slice(from, to + 1).map((f) => f.id))
}

export function FileGridView({
  files,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  onMenuOpen,
  className,
}: FileGridViewProps) {
  const [internal, setInternal] = useState<ReadonlySet<string>>(
    new Set(defaultSelectedIds),
  )
  const [anchorId, setAnchorId] = useState<string | null>(null)
  const isControlled = selectedIds !== undefined
  const selection = isControlled ? selectedIds : internal

  const update = useCallback(
    (next: ReadonlySet<string>) => {
      if (!isControlled) setInternal(next)
      onSelectionChange?.(next)
    },
    [isControlled, onSelectionChange],
  )

  const handleSelect = useCallback(
    (file: FileItem, event: MouseEvent<HTMLDivElement>) => {
      if (event.shiftKey && anchorId) {
        update(rangeSelect(files, anchorId, file.id))
        return
      }
      if (event.metaKey || event.ctrlKey) {
        setAnchorId(file.id)
        update(toggle(selection, file.id))
        return
      }
      setAnchorId(file.id)
      update(new Set([file.id]))
    },
    [anchorId, files, selection, update],
  )

  return (
    <ul
      className={[styles.grid, className].filter(Boolean).join(" ")}
      role="listbox"
      aria-multiselectable="true"
      aria-label="File grid"
    >
      {files.map((file) => (
        <li key={file.id} className={styles.cell}>
          <FileCard
            file={file}
            selected={selection.has(file.id)}
            onSelect={handleSelect}
            onMenuOpen={onMenuOpen}
          />
        </li>
      ))}
      {files.length === 0 ? (
        <li className={styles.empty} aria-live="polite">
          No files in this view.
        </li>
      ) : null}
    </ul>
  )
}

export default FileGridView
