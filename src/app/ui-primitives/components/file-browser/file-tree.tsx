"use client"

import { ChevronRight, GripVertical } from "lucide-react"
import { useCallback, useState } from "react"

import { FileTypeIcon } from "./file-type-icon"
import type { TreeNode } from "./file-types"

import styles from "./file-tree.module.css"

interface FileTreeProps {
  nodes: ReadonlyArray<TreeNode>
  /** Initially expanded folder ids. */
  defaultExpanded?: ReadonlyArray<string>
  /** Currently active node id. */
  activeId?: string
  onSelect?: (node: TreeNode) => void
  className?: string
}

interface NodeProps {
  node: TreeNode
  depth: number
  expanded: ReadonlySet<string>
  activeId?: string
  onToggle: (id: string) => void
  onSelect: (node: TreeNode) => void
}

function isFolder(node: TreeNode): boolean {
  return Array.isArray(node.children)
}

function TreeNodeRow({
  node,
  depth,
  expanded,
  activeId,
  onToggle,
  onSelect,
}: NodeProps) {
  const folder = isFolder(node)
  const isExpanded = expanded.has(node.id)
  const active = activeId === node.id

  const handleRowKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      if (folder) {
        onToggle(node.id)
      } else {
        onSelect(node)
      }
    } else if (folder && event.key === "ArrowRight" && !isExpanded) {
      event.preventDefault()
      onToggle(node.id)
    } else if (folder && event.key === "ArrowLeft" && isExpanded) {
      event.preventDefault()
      onToggle(node.id)
    }
  }

  return (
    <li
      className={styles.li}
      role="treeitem"
      aria-expanded={folder ? isExpanded : undefined}
      aria-selected={active}
    >
      <div
        className={[styles.row, active ? styles.rowActive : ""]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingInlineStart: `${depth * 14 + 10}px` }}
        tabIndex={0}
        onClick={() => (folder ? onToggle(node.id) : onSelect(node))}
        onKeyDown={handleRowKey}
      >
        <span className={styles.grip} aria-hidden="true">
          <GripVertical size={12} strokeWidth={2} />
        </span>
        {folder ? (
          <span
            className={[styles.chevron, isExpanded ? styles.chevronOpen : ""]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            <ChevronRight size={14} strokeWidth={2.4} />
          </span>
        ) : (
          <span className={styles.chevronSpacer} aria-hidden="true" />
        )}

        <span className={styles.iconCell} aria-hidden="true">
          {folder ? (
            <svg viewBox="0 0 20 16" width="18" height="14" className={styles.folder}>
              <path
                d="M2 3 A1 1 0 0 1 3 2 H8 L10 4 H17 A1 1 0 0 1 18 5 V13 A1 1 0 0 1 17 14 H3 A1 1 0 0 1 2 13 Z"
                fill="color-mix(in oklab, var(--primitive-amber) 16%, transparent)"
                stroke="var(--primitive-amber)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <FileTypeIcon kind={node.kind ?? "generic"} size="sm" />
          )}
        </span>

        <span className={styles.label}>{node.name}</span>

        {node.badge && node.badge > 0 ? (
          <span className={styles.badge}>{node.badge}</span>
        ) : null}
      </div>

      {folder && isExpanded && node.children ? (
        <ul className={styles.children} role="group">
          <span
            className={styles.indentGuide}
            style={{ insetInlineStart: `${depth * 14 + 16}px` }}
            aria-hidden="true"
          />
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              activeId={activeId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function FileTree({
  nodes,
  defaultExpanded = [],
  activeId,
  onSelect,
  className,
}: FileTreeProps) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    new Set(defaultExpanded),
  )

  const toggle = useCallback((id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const handleSelect = useCallback(
    (node: TreeNode) => {
      onSelect?.(node)
    },
    [onSelect],
  )

  return (
    <div
      role="application"
      aria-label="File tree"
      className={[styles.tree, className].filter(Boolean).join(" ")}
    >
      <ul className={styles.root} role="tree">
        {nodes.map((node) => (
          <TreeNodeRow
            key={node.id}
            node={node}
            depth={0}
            expanded={expanded}
            activeId={activeId}
            onToggle={toggle}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  )
}

export default FileTree
