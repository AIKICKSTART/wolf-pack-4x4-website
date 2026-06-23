"use client"

import { ChevronRight } from "lucide-react"
import { useState, type ReactNode } from "react"

import styles from "./typescript-types-preview.module.css"

export interface TsTypeNode {
  /** Unique key — used by React + collapse state. */
  key: string
  /** Top-line declaration, e.g. "interface Quote {" or "id: string". */
  declaration: string
  /** Optional inline comment shown muted to the right. */
  comment?: string
  /** Optional collapsible children. Renders the disclosure caret. */
  children?: ReadonlyArray<TsTypeNode>
  /** Initial expanded state when children present — defaults to true. */
  defaultOpen?: boolean
}

export interface TypescriptTypesPreviewProps {
  /** Top-level nodes — typically one root interface/type per preview. */
  nodes: ReadonlyArray<TsTypeNode>
  /** Optional file name shown in the header strip. */
  fileName?: string
  /** Optional className passthrough. */
  className?: string
}

function TypeNode({ node, depth }: { node: TsTypeNode; depth: number }): ReactNode {
  const [open, setOpen] = useState<boolean>(node.defaultOpen ?? true)
  const hasChildren = node.children && node.children.length > 0
  const indent = depth * 14

  return (
    <li className={styles.node}>
      <div
        className={`${styles.row} ${hasChildren ? styles.rowHeader : ""}`}
        style={{ paddingLeft: indent }}
      >
        {hasChildren ? (
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label={open ? `Collapse ${node.declaration}` : `Expand ${node.declaration}`}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronRight
              size={12}
              strokeWidth={2.4}
              className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
              aria-hidden="true"
            />
          </button>
        ) : (
          <span className={styles.bullet} aria-hidden="true" />
        )}
        <code className={styles.declaration}>{node.declaration}</code>
        {node.comment ? (
          <span className={styles.comment}>{node.comment}</span>
        ) : null}
      </div>
      {hasChildren && open ? (
        <ul className={styles.children}>
          {node.children!.map((child) => (
            <TypeNode key={child.key} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function TypescriptTypesPreview({
  nodes,
  fileName,
  className,
}: TypescriptTypesPreviewProps) {
  const classes = [styles.preview, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={fileName ? `TypeScript types in ${fileName}` : "TypeScript types preview"}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>TypeScript</span>
        {fileName ? <code className={styles.fileName}>{fileName}</code> : null}
      </header>
      <ul className={styles.tree}>
        {nodes.map((node) => (
          <TypeNode key={node.key} node={node} depth={0} />
        ))}
      </ul>
    </section>
  )
}

export default TypescriptTypesPreview
