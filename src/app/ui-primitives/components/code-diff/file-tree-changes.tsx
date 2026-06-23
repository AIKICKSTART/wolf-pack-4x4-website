"use client"

import { FileDiff, FileMinus, FilePen, FilePlus } from "lucide-react"

import type { FileChange, FileChangeKind } from "./code-diff-types"
import styles from "./file-tree-changes.module.css"

export interface FileTreeChangesProps {
  /** Files in the changeset. */
  files: ReadonlyArray<FileChange>
  /** Optional className passthrough. */
  className?: string
  /** Optional click handler — receives the file path. */
  onSelect?: (path: string) => void
  /** Currently focused / opened file path. */
  selectedPath?: string
}

const KIND_ICON: Record<FileChangeKind, typeof FilePlus> = {
  added: FilePlus,
  modified: FilePen,
  renamed: FileDiff,
  deleted: FileMinus,
}

const KIND_ICON_CLASS: Record<FileChangeKind, string> = {
  added: styles.iconAdded,
  modified: styles.iconModified,
  renamed: styles.iconRenamed,
  deleted: styles.iconDeleted,
}

const KIND_LABEL: Record<FileChangeKind, string> = {
  added: "Added",
  modified: "Modified",
  renamed: "Renamed",
  deleted: "Deleted",
}

const BAR_CELLS = 8

function distributionBar(insertions: number, deletions: number): ReadonlyArray<"add" | "del" | "none"> {
  const total = insertions + deletions
  if (total === 0) {
    return Array.from({ length: BAR_CELLS }, () => "none" as const)
  }
  const addCells = Math.round((insertions / total) * BAR_CELLS)
  const delCells = Math.round((deletions / total) * BAR_CELLS)
  const cells: Array<"add" | "del" | "none"> = []
  for (let i = 0; i < addCells && cells.length < BAR_CELLS; i += 1) {
    cells.push("add")
  }
  for (let i = 0; i < delCells && cells.length < BAR_CELLS; i += 1) {
    cells.push("del")
  }
  while (cells.length < BAR_CELLS) {
    cells.push("none")
  }
  return cells
}

export function FileTreeChanges({
  files,
  className,
  onSelect,
  selectedPath,
}: FileTreeChangesProps) {
  const classes = [styles.tree, className].filter(Boolean).join(" ")
  const totalInsertions = files.reduce((sum, file) => sum + file.insertions, 0)
  const totalDeletions = files.reduce((sum, file) => sum + file.deletions, 0)

  return (
    <section className={classes} aria-label="Changed files">
      <div className={styles.head}>
        <span className={styles.headLabel}>Files changed · {files.length}</span>
        <span className={styles.totalChip}>
          <span className={styles.totalAdd}>+{totalInsertions}</span>
          <span className={styles.totalDel}>-{totalDeletions}</span>
        </span>
      </div>
      <ol className={styles.list}>
        {files.map((file) => {
          const Icon = KIND_ICON[file.kind]
          const cells = distributionBar(file.insertions, file.deletions)
          const isSelected = selectedPath === file.path
          const pathClasses = [
            styles.path,
            file.kind === "deleted" ? styles.pathDeleted : "",
          ]
            .filter(Boolean)
            .join(" ")
          const handleClick = onSelect ? () => onSelect(file.path) : undefined
          return (
            <li
              key={file.path}
              className={styles.item}
              data-selected={isSelected || undefined}
              aria-current={isSelected ? "true" : undefined}
              onClick={handleClick}
            >
              <Icon
                className={`${styles.icon} ${KIND_ICON_CLASS[file.kind]}`}
                aria-label={KIND_LABEL[file.kind]}
              />
              <span className={pathClasses}>{file.path}</span>
              <span className={styles.counts}>
                <span className={styles.add}>+{file.insertions}</span>
                <span className={styles.del}>-{file.deletions}</span>
              </span>
              <span className={styles.bar} aria-hidden="true">
                {cells.map((cell, index) => (
                  <span
                    key={`${file.path}-cell-${index}`}
                    className={`${styles.barCell} ${
                      cell === "add"
                        ? styles.barAdd
                        : cell === "del"
                          ? styles.barDel
                          : styles.barNone
                    }`}
                  />
                ))}
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default FileTreeChanges
