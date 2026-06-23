"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useId, useState } from "react"

import { Chip } from "../primitives"
import { NeuoSurface } from "../surfaces"

import type { TaxonomyNode } from "./content-studio-types"
import styles from "./taxonomy-tree.module.css"

interface TaxonomyTreeProps {
  nodes: ReadonlyArray<TaxonomyNode>
  /** Optional handler when a node is clicked. */
  onSelect?: (id: string) => void
  /** Optional id pre-selected. */
  selectedId?: string
  /** Defaults to expanding all primary categories. */
  defaultExpanded?: ReadonlyArray<string>
  className?: string
}

export function TaxonomyTree({
  nodes,
  onSelect,
  selectedId,
  defaultExpanded,
  className,
}: TaxonomyTreeProps) {
  const treeId = useId()
  const initialExpanded = defaultExpanded ?? nodes.map((node) => node.id)
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set(initialExpanded))

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const classes = [styles.tree, className].filter(Boolean).join(" ")

  return (
    <NeuoSurface tone="obsidian" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <span className={styles.kicker}>Taxonomy</span>
          <span className={styles.total} aria-label="Total articles across all categories">
            <strong>{nodes.reduce((acc, n) => acc + n.count, 0)}</strong> articles
          </span>
        </header>
        <ul className={styles.list} role="tree" aria-label="Content taxonomy" id={treeId}>
          {nodes.map((node) => {
            const isOpen = expanded.has(node.id)
            const isSelected = node.id === selectedId
            return (
              <li
                key={node.id}
                role="treeitem"
                aria-expanded={isOpen}
                aria-selected={isSelected}
                className={[
                  styles.node,
                  styles.nodePrimary,
                  isSelected ? styles.nodeSelected : "",
                  node.dropTarget ? styles.nodeDropTarget : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.row}>
                  <button
                    type="button"
                    className={styles.disclosure}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.label}`}
                    onClick={() => toggle(node.id)}
                  >
                    {isOpen ? (
                      <ChevronDown size={12} strokeWidth={2.4} aria-hidden="true" />
                    ) : (
                      <ChevronRight size={12} strokeWidth={2.4} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    className={styles.label}
                    onClick={() => onSelect?.(node.id)}
                  >
                    {node.label}
                  </button>
                  <Chip label={`${node.count}`} tone="neutral" />
                </div>
                {isOpen && node.children ? (
                  <ul className={styles.children} role="group">
                    {node.children.map((child) => {
                      const childSelected = child.id === selectedId
                      return (
                        <li
                          key={child.id}
                          role="treeitem"
                          aria-selected={childSelected}
                          className={[
                            styles.node,
                            styles.nodeChild,
                            childSelected ? styles.nodeSelected : "",
                            child.dropTarget ? styles.nodeDropTarget : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <div className={styles.row}>
                            <span
                              className={styles.disclosureSpacer}
                              aria-hidden="true"
                            />
                            <button
                              type="button"
                              className={styles.label}
                              onClick={() => onSelect?.(child.id)}
                            >
                              #{child.label}
                            </button>
                            <span className={styles.count}>{child.count}</span>
                            {child.dropTarget ? (
                              <span className={styles.dropChip} aria-label="Drag target">
                                Drop here
                              </span>
                            ) : null}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>
    </NeuoSurface>
  )
}

export default TaxonomyTree
