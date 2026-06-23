"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

import type { SchemaNode, SchemaPrimitive } from "./api-explorer-types"

import styles from "./schema-explorer.module.css"

interface SchemaExplorerProps {
  root: SchemaNode
  /** Root label rendered when the node has no explicit name. */
  rootLabel?: string
  className?: string
}

function formatType(type: SchemaNode["type"]): string {
  if (Array.isArray(type)) {
    return type.join(" | ")
  }
  return type as SchemaPrimitive
}

function isExpandable(node: SchemaNode): boolean {
  return Boolean(node.children && node.children.length > 0)
}

interface SchemaRowProps {
  node: SchemaNode
  depth: number
  label: string
}

function SchemaRow({ node, depth, label }: SchemaRowProps) {
  const [open, setOpen] = useState(depth < 1)
  const expandable = isExpandable(node)
  const handleToggle = () => {
    if (expandable) {
      setOpen((prev) => !prev)
    }
  }
  const rowClasses = [styles.row, depth === 0 && styles.rowRoot].filter(Boolean).join(" ")

  return (
    <div className={styles.node}>
      <div className={rowClasses} style={{ paddingLeft: `${depth * 16}px` }}>
        {expandable ? (
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggle}
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${label}`}
          >
            {open ? (
              <ChevronDown size={11} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <ChevronRight size={11} strokeWidth={2.4} aria-hidden="true" />
            )}
          </button>
        ) : (
          <span className={styles.bullet} aria-hidden="true" />
        )}
        <code className={styles.name}>{label}</code>
        <span className={styles.type}>{formatType(node.type)}</span>
        {node.format && <span className={styles.format}>{node.format}</span>}
        {node.required ? (
          <span className={styles.required}>required</span>
        ) : (
          <span className={styles.optional}>optional</span>
        )}
        {node.description && <span className={styles.desc}>{node.description}</span>}
        {node.example && (
          <code className={styles.example} aria-label="Example value">
            {node.example}
          </code>
        )}
      </div>
      {node.enumValues && node.enumValues.length > 0 && (
        <ul className={styles.enumList} style={{ paddingLeft: `${depth * 16 + 28}px` }}>
          {node.enumValues.map((value) => (
            <li key={value} className={styles.enumValue}>
              {value}
            </li>
          ))}
        </ul>
      )}
      {expandable && open && (
        <div className={styles.children}>
          {node.children?.map((child, index) => (
            <SchemaRow
              key={child.name ?? `c-${index}`}
              node={child}
              depth={depth + 1}
              label={child.name ?? `[${index}]`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function SchemaExplorer({ root, rootLabel = "root", className }: SchemaExplorerProps) {
  const classes = [styles.explorer, className].filter(Boolean).join(" ")
  const label = root.name ?? rootLabel
  return (
    <section className={classes} aria-label="JSON schema explorer">
      <header className={styles.head}>
        <span className={styles.kicker}>Schema</span>
        <span className={styles.headType}>{formatType(root.type)}</span>
      </header>
      <SchemaRow node={root} depth={0} label={label} />
    </section>
  )
}

export default SchemaExplorer
