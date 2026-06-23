"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import {
  classificationLabel,
  formatAud,
  normalBalanceOf,
  type AccountClass,
  type AccountNode,
} from "./accounting-types"
import styles from "./chart-of-accounts-tree.module.css"

interface ChartOfAccountsTreeProps {
  /** Top-level nodes grouped by classification. */
  groups: ReadonlyArray<{
    classification: AccountClass
    nodes: ReadonlyArray<AccountNode>
  }>
  className?: string
}

const TONE_BY_CLASS: Record<AccountClass, "teal" | "red" | "amber" | "green" | "neutral"> = {
  asset: "teal",
  liability: "red",
  equity: "amber",
  income: "green",
  expense: "neutral",
}

interface NodeRowProps {
  node: AccountNode
  depth: number
  expanded: ReadonlySet<string>
  onToggle: (id: string) => void
}

function NodeRow({ node, depth, expanded, onToggle }: NodeRowProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0)
  const isOpen = expanded.has(node.id)
  const indent = depth * 18

  return (
    <li
      className={styles.node}
      role="treeitem"
      aria-expanded={hasChildren ? isOpen : undefined}
      aria-selected={false}
    >
      <div
        className={styles.row}
        style={{ paddingLeft: `${indent + 8}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => onToggle(node.id)}
            aria-label={isOpen ? `Collapse ${node.name}` : `Expand ${node.name}`}
          >
            <span aria-hidden="true" className={isOpen ? styles.glyphOpen : styles.glyph}>
              ▸
            </span>
          </button>
        ) : (
          <span className={styles.toggleSpacer} aria-hidden="true" />
        )}
        <span className={styles.code}>{node.code}</span>
        <span className={styles.name}>{node.name}</span>
        <span className={styles.balance}>{formatAud(node.balance)}</span>
      </div>
      {hasChildren && isOpen ? (
        <ul className={styles.children} role="group">
          {node.children!.map((child) => (
            <NodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function sumGroup(nodes: ReadonlyArray<AccountNode>): number {
  return nodes.reduce((sum, node) => sum + node.balance, 0)
}

export function ChartOfAccountsTree({ groups, className }: ChartOfAccountsTreeProps) {
  // Default: top-level group nodes expanded.
  const initialExpanded = new Set<string>()
  for (const group of groups) {
    for (const node of group.nodes) {
      initialExpanded.add(node.id)
    }
  }
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(initialExpanded)

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

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      aria-label="Chart of accounts"
      role="region"
    >
      {groups.map((group) => {
        const total = sumGroup(group.nodes)
        const tone = TONE_BY_CLASS[group.classification]
        return (
          <section
            key={group.classification}
            className={styles.group}
            data-tone={tone}
          >
            <header className={styles.groupHead}>
              <h3 className={styles.groupTitle}>
                {classificationLabel(group.classification)}
              </h3>
              <div className={styles.groupMeta}>
                <Chip
                  label={`Normal: ${normalBalanceOf(group.classification)}`}
                  tone={tone === "neutral" ? "neutral" : tone}
                />
                <span className={styles.groupTotal}>{formatAud(total)}</span>
              </div>
            </header>
            <ul className={styles.tree} role="tree" aria-label={classificationLabel(group.classification)}>
              {group.nodes.map((node) => (
                <NodeRow
                  key={node.id}
                  node={node}
                  depth={0}
                  expanded={expanded}
                  onToggle={toggle}
                />
              ))}
            </ul>
          </section>
        )
      })}
    </section>
  )
}

export default ChartOfAccountsTree
