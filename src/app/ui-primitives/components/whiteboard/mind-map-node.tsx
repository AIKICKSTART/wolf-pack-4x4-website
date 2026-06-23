"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

import type { MindMapTone } from "./whiteboard-types"
import styles from "./mind-map-node.module.css"

export interface MindMapNodeProps {
  /** Node label / heading. */
  label: string
  /** Depth from root — drives default tone if `tone` is omitted. */
  depth?: number
  /** Tone override. */
  tone?: MindMapTone
  /** Direct child count — shown as chip. */
  childCount?: number
  /** Whether the node starts collapsed. */
  defaultCollapsed?: boolean
  /** Optional fixed-width hint. */
  width?: number
  /** Optional className passthrough. */
  className?: string
  /** Called when collapse state changes. */
  onToggleCollapsed?: (collapsed: boolean) => void
}

const TONE_CLASS: Record<MindMapTone, string> = {
  root: styles.toneRoot,
  branch: styles.toneBranch,
  leaf: styles.toneLeaf,
  accent: styles.toneAccent,
}

function depthTone(depth: number): MindMapTone {
  if (depth <= 0) return "root"
  if (depth === 1) return "branch"
  if (depth === 2) return "accent"
  return "leaf"
}

export function MindMapNode({
  label,
  depth = 0,
  tone,
  childCount,
  defaultCollapsed = false,
  width,
  className,
  onToggleCollapsed,
}: MindMapNodeProps) {
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed)
  const resolvedTone = tone ?? depthTone(depth)
  const classes = [
    styles.node,
    TONE_CLASS[resolvedTone],
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const hasChildren = typeof childCount === "number" && childCount > 0

  const handleToggle = () => {
    const next = !collapsed
    setCollapsed(next)
    onToggleCollapsed?.(next)
  }

  return (
    <article
      role="treeitem"
      aria-expanded={hasChildren ? !collapsed : undefined}
      aria-selected={false}
      aria-label={label}
      className={classes}
      style={width ? { width } : undefined}
      data-depth={depth}
      data-tone={resolvedTone}
    >
      {hasChildren ? (
        <button
          type="button"
          className={styles.toggle}
          aria-label={collapsed ? "Expand children" : "Collapse children"}
          aria-expanded={!collapsed}
          onClick={handleToggle}
        >
          {collapsed ? <ChevronRight aria-hidden={true} /> : <ChevronDown aria-hidden={true} />}
        </button>
      ) : (
        <span className={styles.bullet} aria-hidden="true" />
      )}
      <span className={styles.label}>{label}</span>
      {hasChildren ? (
        <span className={styles.count}>{childCount}</span>
      ) : null}
    </article>
  )
}

export default MindMapNode
