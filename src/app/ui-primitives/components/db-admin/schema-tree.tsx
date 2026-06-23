"use client"

import { useMemo, useState } from "react"
import { ChevronRight } from "lucide-react"

import type { SchemaObjectKind, SchemaObjectNode } from "./db-admin-types"
import styles from "./schema-tree.module.css"

interface SchemaTreeProps {
  /** Root schemas (schema → tables → columns). */
  schemas: ReadonlyArray<SchemaObjectNode>
  /** Initially expanded node ids. */
  defaultExpandedIds?: ReadonlyArray<string>
  /** Initially selected node id. */
  defaultSelectedId?: string
  /** Total object count rendered in the header chip. */
  totalCount?: number
  /** Filter placeholder text. */
  filterPlaceholder?: string
  /** Callback when a node is clicked. */
  onSelect?: (nodeId: string, kind: SchemaObjectKind) => void
  className?: string
}

const KIND_GLYPH: Record<SchemaObjectKind, string> = {
  schema: "DB",
  table: "T",
  view: "V",
  materialized_view: "MV",
  function: "ƒn",
  sequence: "SEQ",
}

const KIND_CLASS: Record<SchemaObjectKind, string> = {
  schema: styles.kindSchema,
  table: styles.kindTable,
  view: styles.kindView,
  materialized_view: styles.kindMv,
  function: styles.kindFunction,
  sequence: styles.kindSequence,
}

function matchesFilter(node: SchemaObjectNode, query: string): boolean {
  if (!query) {
    return true
  }
  const lower = query.toLowerCase()
  if (node.name.toLowerCase().includes(lower)) {
    return true
  }
  return (node.children ?? []).some((child) => matchesFilter(child, query))
}

function countLeaves(node: SchemaObjectNode): number {
  if (!node.children || node.children.length === 0) {
    return 1
  }
  return node.children.reduce((acc, child) => acc + countLeaves(child), 0)
}

interface NodeRowProps {
  node: SchemaObjectNode
  level: number
  expanded: ReadonlySet<string>
  selectedId: string | null
  query: string
  onToggle: (id: string) => void
  onSelect: (node: SchemaObjectNode) => void
}

function NodeRow({ node, level, expanded, selectedId, query, onToggle, onSelect }: NodeRowProps) {
  const hasChildren = (node.children?.length ?? 0) > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selectedId === node.id
  const visibleChildren =
    hasChildren && isExpanded
      ? (node.children ?? []).filter((child) => matchesFilter(child, query))
      : []

  const rowClass = [styles.row, KIND_CLASS[node.kind]].join(" ")

  return (
    <li
      className={[styles.node, KIND_CLASS[node.kind]].join(" ")}
      role="treeitem"
      aria-selected={isSelected}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-level={level}
    >
      <button
        type="button"
        className={rowClass}
        data-selected={isSelected}
        data-expanded={hasChildren ? isExpanded : undefined}
        onClick={() => {
          if (hasChildren) {
            onToggle(node.id)
          }
          onSelect(node)
        }}
      >
        <span className={styles.twisty} aria-hidden="true">
          {hasChildren ? <ChevronRight size={12} strokeWidth={2.4} /> : null}
        </span>
        <span className={styles.glyph} aria-hidden="true">
          {KIND_GLYPH[node.kind]}
        </span>
        <span className={styles.name}>{node.name}</span>
        {typeof node.count === "number" ? (
          <span className={styles.rowCount}>{node.count.toLocaleString("en-US")}</span>
        ) : null}
      </button>
      {visibleChildren.length > 0 ? (
        <ul className={styles.children} role="group">
          {visibleChildren.map((child) => (
            <NodeRow
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selectedId={selectedId}
              query={query}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function SchemaTree({
  schemas,
  defaultExpandedIds,
  defaultSelectedId,
  totalCount,
  filterPlaceholder = "Filter schema…",
  onSelect,
  className,
}: SchemaTreeProps) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    new Set(defaultExpandedIds ?? []),
  )
  const [selectedId, setSelectedId] = useState<string | null>(defaultSelectedId ?? null)
  const [query, setQuery] = useState("")

  const total = useMemo(() => {
    if (typeof totalCount === "number") {
      return totalCount
    }
    return schemas.reduce((acc, schema) => acc + countLeaves(schema), 0)
  }, [schemas, totalCount])

  const visible = useMemo(
    () => schemas.filter((schema) => matchesFilter(schema, query)),
    [schemas, query],
  )

  const handleToggle = (id: string) => {
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

  const handleSelect = (node: SchemaObjectNode) => {
    setSelectedId(node.id)
    onSelect?.(node.id, node.kind)
  }

  const classes = [styles.tree, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Database schema browser">
      <header className={styles.header}>
        <span className={styles.kicker}>Schema</span>
        <span className={styles.count}>{total.toLocaleString("en-US")} objects</span>
      </header>
      <input
        type="search"
        className={styles.filter}
        placeholder={filterPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Filter schema objects"
      />
      <ul className={styles.nodes} role="tree" aria-label="Database schemas">
        {visible.length === 0 ? (
          <li className={styles.empty} role="none">
            No matches
          </li>
        ) : (
          visible.map((schema) => (
            <NodeRow
              key={schema.id}
              node={schema}
              level={1}
              expanded={expanded}
              selectedId={selectedId}
              query={query}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          ))
        )}
      </ul>
    </section>
  )
}

export default SchemaTree
