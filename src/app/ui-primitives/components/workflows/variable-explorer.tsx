"use client"

import { Copy } from "lucide-react"
import { useState } from "react"

import type { WorkflowVariable } from "./workflow-types"
import styles from "./variable-explorer.module.css"

interface VariableExplorerProps {
  variables: ReadonlyArray<WorkflowVariable>
  /** Subhead label e.g. "Available at step 3". */
  kicker?: string
  className?: string
}

const TYPE_CLASS: Record<NonNullable<WorkflowVariable["type"]>, string> = {
  string: styles.typeString,
  number: styles.typeNumber,
  boolean: styles.typeBoolean,
  object: styles.typeObject,
  array: styles.typeArray,
  date: styles.typeDate,
}

interface VariableNodeProps {
  variable: WorkflowVariable
  copied: string | null
  onCopy: (token: string) => void
}

function VariableNode({ variable, copied, onCopy }: VariableNodeProps) {
  const [open, setOpen] = useState(false)
  const hasChildren = variable.children && variable.children.length > 0
  const token = `{{${variable.path}}}`
  const isCopied = copied === token

  return (
    <li>
      <div className={styles.nodeRow}>
        {hasChildren ? (
          <button
            type="button"
            className={styles.caret}
            aria-expanded={open}
            aria-label={open ? "Collapse" : "Expand"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "▾" : "▸"}
          </button>
        ) : (
          <span
            className={[styles.caret, styles.caretLeaf].join(" ")}
            aria-hidden="true"
          >
            •
          </span>
        )}
        <span className={styles.label}>
          <span className={styles.path}>{variable.label}</span>
          {variable.sample ? (
            <span className={styles.sample}>{variable.sample}</span>
          ) : null}
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          {variable.type ? (
            <span className={[styles.typeChip, TYPE_CLASS[variable.type]].join(" ")}>
              {variable.type}
            </span>
          ) : null}
          <button
            type="button"
            className={[styles.copyChip, isCopied ? styles.copyChipCopied : ""]
              .filter(Boolean)
              .join(" ")}
            aria-label={`Copy ${token}`}
            onClick={() => onCopy(token)}
          >
            <Copy size={10} aria-hidden="true" />
            {isCopied ? "Copied" : "Copy"}
          </button>
        </span>
      </div>
      {hasChildren && open ? (
        <ul className={styles.children}>
          {variable.children?.map((child) => (
            <VariableNode
              key={child.path}
              variable={child}
              copied={copied}
              onCopy={onCopy}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function VariableExplorer({
  variables,
  kicker = "Available variables",
  className,
}: VariableExplorerProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (token: string) => {
    setCopied(token)
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(token)
    }
    window.setTimeout(() => {
      setCopied((current) => (current === token ? null : current))
    }, 1400)
  }

  const classes = [styles.explorer, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Variable explorer">
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <span className={styles.copyHint}>Tap to copy</span>
      </header>
      <ul className={styles.tree}>
        {variables.map((variable) => (
          <VariableNode
            key={variable.path}
            variable={variable}
            copied={copied}
            onCopy={handleCopy}
          />
        ))}
      </ul>
    </aside>
  )
}
