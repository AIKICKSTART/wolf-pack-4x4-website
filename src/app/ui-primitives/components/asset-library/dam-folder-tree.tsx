"use client"

import { ChevronRight, Folder, FolderOpen } from "lucide-react"
import { useState } from "react"

export interface DamFolderNode {
  id: string
  name: string
  /** Total assets directly inside this folder. */
  count: number
  /** Optional child folders. */
  children?: ReadonlyArray<DamFolderNode>
  /** Drag target highlight (visual indicator only). */
  dragTarget?: boolean
}

interface DamFolderTreeProps {
  nodes: ReadonlyArray<DamFolderNode>
  selectedId?: string
  defaultExpandedIds?: ReadonlyArray<string>
  onSelect?: (node: DamFolderNode) => void
  className?: string
}

import styles from "./dam-folder-tree.module.css"

interface RowProps {
  node: DamFolderNode
  depth: number
  expandedIds: ReadonlySet<string>
  selectedId?: string
  onToggle: (id: string) => void
  onSelect?: (node: DamFolderNode) => void
}

function TreeRow({
  node,
  depth,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
}: RowProps) {
  const hasChildren = (node.children?.length ?? 0) > 0
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id
  const indent = depth * 14

  return (
    <li className={styles.item}>
      <div
        className={[
          styles.row,
          isSelected ? styles.rowSelected : "",
          node.dragTarget ? styles.rowDragTarget : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingLeft: 10 + indent }}
        aria-current={isSelected ? "true" : undefined}
      >
        <button
          type="button"
          className={styles.chevron}
          aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
          aria-expanded={isExpanded}
          onClick={() => onToggle(node.id)}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            <ChevronRight
              size={12}
              strokeWidth={2.2}
              className={isExpanded ? styles.chevronOpen : ""}
              aria-hidden="true"
            />
          ) : (
            <span className={styles.chevronDot} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          className={styles.label}
          onClick={() => onSelect?.(node)}
        >
          <span className={styles.icon} aria-hidden="true">
            {isExpanded && hasChildren ? (
              <FolderOpen size={14} strokeWidth={2} />
            ) : (
              <Folder size={14} strokeWidth={2} />
            )}
          </span>
          <span className={styles.name}>{node.name}</span>
          <span className={styles.count}>{node.count}</span>
          {node.dragTarget ? (
            <span className={styles.dragTargetChip}>Drop here</span>
          ) : null}
        </button>
      </div>

      {hasChildren && isExpanded ? (
        <ul className={styles.children} role="group">
          {node.children?.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function DamFolderTree({
  nodes,
  selectedId,
  defaultExpandedIds = [],
  onSelect,
  className,
}: DamFolderTreeProps) {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(
    () => new Set(defaultExpandedIds),
  )

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <nav
      className={[styles.tree, className].filter(Boolean).join(" ")}
      aria-label="Media folders"
    >
      <ul className={styles.root} role="tree">
        {nodes.map((node) => (
          <TreeRow
            key={node.id}
            node={node}
            depth={0}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onToggle={toggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  )
}

export default DamFolderTree
