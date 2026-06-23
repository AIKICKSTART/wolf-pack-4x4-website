"use client"

import { AlertTriangle, ChevronRight, FileText, FolderTree, Plus, Search } from "lucide-react"
import { useMemo, useState, type CSSProperties } from "react"

import {
  PAGE_STATE_LABEL,
  PAGE_STATE_TONE,
  TONE_HEX,
  type PageNode,
} from "./cms-types"

import styles from "./page-tree.module.css"

export interface PageTreeProps {
  nodes: ReadonlyArray<PageNode>
  /** Currently selected page id. */
  selectedId?: string
  /** Initially expanded node ids. */
  defaultExpandedIds?: ReadonlyArray<string>
  loading?: boolean
  error?: string
  onSelect?: (node: PageNode) => void
  onCreate?: () => void
  className?: string
}

interface TreeRowProps {
  node: PageNode
  depth: number
  expanded: ReadonlySet<string>
  selectedId?: string
  onToggle: (id: string) => void
  onSelect?: (node: PageNode) => void
}

function flattenIds(nodes: ReadonlyArray<PageNode>, list: string[]): void {
  nodes.forEach((node) => {
    list.push(node.id)
    if (node.children) {
      flattenIds(node.children, list)
    }
  })
}

function countNodes(nodes: ReadonlyArray<PageNode>): number {
  return nodes.reduce(
    (sum, node) => sum + 1 + (node.children ? countNodes(node.children) : 0),
    0,
  )
}

function TreeRow({ node, depth, expanded, selectedId, onToggle, onSelect }: TreeRowProps) {
  const hasChildren = (node.children?.length ?? 0) > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selectedId === node.id
  const stateTone = TONE_HEX[PAGE_STATE_TONE[node.state]]

  return (
    <div role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={[styles.row, isSelected ? styles.rowSelected : ""].filter(Boolean).join(" ")}
        style={{ paddingLeft: 10 + depth * 6 } as CSSProperties}
      >
        <button
          type="button"
          className={`${styles.chevron} ${hasChildren && isExpanded ? styles.chevronOpen : ""}`}
          aria-label={hasChildren ? (isExpanded ? "Collapse" : "Expand") : "Leaf page"}
          aria-expanded={hasChildren ? isExpanded : undefined}
          onClick={() => onToggle(node.id)}
          disabled={!hasChildren}
        >
          <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
        </button>
        <span className={styles.icon} aria-hidden="true">
          {hasChildren ? <FolderTree size={14} strokeWidth={2} /> : <FileText size={14} strokeWidth={2} />}
        </span>
        <button
          type="button"
          className={styles.nameBtn}
          aria-label={`Open ${node.title}`}
          onClick={() => onSelect?.(node)}
        >
          <span className={styles.name}>{node.title}</span>
          <span className={styles.slug}>/{node.slug}</span>
        </button>
        <span
          className={styles.state}
          style={{ "--state-tone": stateTone } as CSSProperties}
          aria-label={`Status ${PAGE_STATE_LABEL[node.state]}`}
        >
          {PAGE_STATE_LABEL[node.state]}
        </span>
        <span className={styles.avatar} aria-label={`Owner ${node.ownerInitials ?? "Unassigned"}`}>
          {node.ownerInitials ?? "—"}
        </span>
      </div>

      {hasChildren && isExpanded ? (
        <div className={styles.children} role="group">
          {node.children?.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function filterNodes(nodes: ReadonlyArray<PageNode>, query: string): ReadonlyArray<PageNode> {
  if (!query.trim()) {
    return nodes
  }
  const needle = query.toLowerCase()
  const visit = (list: ReadonlyArray<PageNode>): PageNode[] => {
    const out: PageNode[] = []
    list.forEach((node) => {
      const matchSelf =
        node.title.toLowerCase().includes(needle) || node.slug.toLowerCase().includes(needle)
      const filteredChildren = node.children ? visit(node.children) : undefined
      if (matchSelf || (filteredChildren && filteredChildren.length > 0)) {
        out.push({
          ...node,
          children: filteredChildren,
        })
      }
    })
    return out
  }
  return visit(nodes)
}

export function PageTree({
  nodes,
  selectedId,
  defaultExpandedIds,
  loading = false,
  error,
  onSelect,
  onCreate,
  className,
}: PageTreeProps) {
  const allIds = useMemo(() => {
    const list: string[] = []
    flattenIds(nodes, list)
    return list
  }, [nodes])
  const initialExpanded = useMemo<ReadonlySet<string>>(() => {
    if (defaultExpandedIds) {
      return new Set(defaultExpandedIds)
    }
    return new Set(allIds.slice(0, Math.min(allIds.length, 6)))
  }, [defaultExpandedIds, allIds])

  const [expanded, setExpanded] = useState<ReadonlySet<string>>(initialExpanded)
  const [query, setQuery] = useState("")

  const visible = useMemo(() => filterNodes(nodes, query), [nodes, query])
  const total = countNodes(nodes)
  const visibleCount = countNodes(visible)

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const classes = [styles.tree, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label="Page outline">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Page tree · CMS</span>
          <span className={styles.heading}>Workshop site outline</span>
        </div>
        <button type="button" className={styles.newBtn} onClick={onCreate} aria-label="Create new page">
          <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
          New page
        </button>
      </header>

      <div className={styles.search}>
        <Search size={14} strokeWidth={2.2} aria-hidden="true" />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Filter pages — suburbs, parts, services…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Filter pages"
        />
      </div>

      <div className={styles.body} role="tree" aria-label="Pages">
        {error ? (
          <div className={styles.error} role="alert">
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
            <strong>Outline unavailable</strong>
            <span>{error}</span>
          </div>
        ) : loading ? (
          <div className={styles.empty}>Indexing pages…</div>
        ) : visible.length === 0 ? (
          <div className={styles.empty}>No pages match that filter</div>
        ) : (
          visible.map((node) => (
            <TreeRow
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={toggle}
              onSelect={onSelect}
            />
          ))
        )}
      </div>

      <footer className={styles.footer}>
        <span>
          {visibleCount.toString().padStart(2, "0")} / {total.toString().padStart(2, "0")} pages
        </span>
        <span>{expanded.size} expanded</span>
      </footer>
    </nav>
  )
}

export default PageTree
