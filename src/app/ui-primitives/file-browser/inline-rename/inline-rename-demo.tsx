"use client"

import { useState } from "react"

import { InlineRename } from "../../components/file-browser"

import styles from "../file-browser.module.css"

export function InlineRenameDemo() {
  const [name, setName] = useState<string>("ute-engine-side.jpg")

  return (
    <section className={styles.demoSurface}>
      <span className={styles.demoLabel}>
        Click the filename — Enter saves, Esc cancels
      </span>
      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 18,
          border: "1px solid var(--primitive-line)",
          borderRadius: 12,
          background: "var(--primitive-panel)",
        }}
      >
        <InlineRename value={name} onCommit={setName} />
        <span
          style={{
            fontFamily: "var(--primitive-font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--primitive-muted)",
          }}
        >
          Current value: <strong style={{ color: "var(--primitive-text-strong)" }}>{name}</strong>
        </span>
      </div>
    </section>
  )
}
