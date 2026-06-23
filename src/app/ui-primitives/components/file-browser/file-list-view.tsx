"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useCallback, useState, type MouseEvent } from "react"

import { FileRow } from "./file-row"
import type { FileItem } from "./file-types"

import styles from "./file-list-view.module.css"

export type FileListColumnId = "name" | "size" | "modified" | "owner"

interface FileListViewProps {
  files: ReadonlyArray<FileItem>
  selectedIds?: ReadonlySet<string>
  defaultSelectedIds?: ReadonlyArray<string>
  onSelectionChange?: (ids: ReadonlySet<string>) => void
  onMenuOpen?: (file: FileItem) => void
  caption?: string
  className?: string
}

type SortState = { col: FileListColumnId; dir: "asc" | "desc" } | null

const COLUMNS: ReadonlyArray<{ id: FileListColumnId; label: string }> = [
  { id: "name", label: "Name" },
  { id: "size", label: "Size" },
  { id: "modified", label: "Modified" },
  { id: "owner", label: "Owner" },
]

function ariaSort(state: SortState, col: FileListColumnId): "ascending" | "descending" | "none" {
  if (!state || state.col !== col) return "none"
  return state.dir === "asc" ? "ascending" : "descending"
}

export function FileListView({
  files,
  selectedIds,
  defaultSelectedIds = [],
  onSelectionChange,
  onMenuOpen,
  caption = "File list",
  className,
}: FileListViewProps) {
  const [internal, setInternal] = useState<ReadonlySet<string>>(
    new Set(defaultSelectedIds),
  )
  const [sort, setSort] = useState<SortState>(null)
  const isControlled = selectedIds !== undefined
  const selection = isControlled ? selectedIds : internal

  const update = useCallback(
    (next: ReadonlySet<string>) => {
      if (!isControlled) setInternal(next)
      onSelectionChange?.(next)
    },
    [isControlled, onSelectionChange],
  )

  const handleSort = useCallback((col: FileListColumnId) => {
    setSort((prev) => {
      if (!prev || prev.col !== col) return { col, dir: "asc" }
      if (prev.dir === "asc") return { col, dir: "desc" }
      return null
    })
  }, [])

  const handleSelect = useCallback(
    (file: FileItem, event: MouseEvent<HTMLTableRowElement>) => {
      if (event.metaKey || event.ctrlKey) {
        const next = new Set(selection)
        if (next.has(file.id)) next.delete(file.id)
        else next.add(file.id)
        update(next)
        return
      }
      update(new Set([file.id]))
    },
    [selection, update],
  )

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <table className={styles.table} aria-label={caption}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.iconTh} aria-label="Type" />
            {COLUMNS.map((col) => {
              const sortVal = ariaSort(sort, col.id)
              return (
                <th
                  key={col.id}
                  scope="col"
                  className={styles.th}
                  aria-sort={sortVal}
                >
                  <button
                    type="button"
                    className={styles.sortBtn}
                    onClick={() => handleSort(col.id)}
                  >
                    <span>{col.label}</span>
                    <span className={styles.sortIcons} aria-hidden="true">
                      {sortVal === "ascending" ? (
                        <ChevronUp size={12} strokeWidth={2.4} />
                      ) : sortVal === "descending" ? (
                        <ChevronDown size={12} strokeWidth={2.4} />
                      ) : (
                        <span className={styles.sortIdle}>↕</span>
                      )}
                    </span>
                  </button>
                </th>
              )
            })}
            <th scope="col" className={styles.actionsTh} aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileRow
              key={file.id}
              file={file}
              selected={selection.has(file.id)}
              onSelect={handleSelect}
              onMenuOpen={onMenuOpen}
            />
          ))}
        </tbody>
      </table>
      {files.length === 0 ? (
        <p className={styles.empty} aria-live="polite">
          No files to list.
        </p>
      ) : null}
    </div>
  )
}

export default FileListView
