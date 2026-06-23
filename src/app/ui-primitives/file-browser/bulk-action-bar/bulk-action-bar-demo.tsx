"use client"

import { useState } from "react"

import { BulkActionBar } from "../../components/file-browser"

import styles from "../file-browser.module.css"

const PRESETS: ReadonlyArray<number> = [0, 1, 3, 8, 24]

export function BulkActionBarDemo() {
  const [count, setCount] = useState<number>(3)

  return (
    <>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Adjust the selection count</span>
        <div
          style={{
            display: "inline-flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              style={{
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid var(--primitive-line)",
                background:
                  count === n
                    ? "color-mix(in oklab, var(--primitive-red) 18%, transparent)"
                    : "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
                color: "var(--primitive-text-strong)",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {n} selected
            </button>
          ))}
        </div>
      </section>
      <BulkActionBar count={count} onClear={() => setCount(0)} />
    </>
  )
}
