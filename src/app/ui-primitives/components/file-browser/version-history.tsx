"use client"

import { RotateCcw } from "lucide-react"

import { Avatar } from "../primitives/avatar"

import type { FileVersion } from "./file-types"

import styles from "./version-history.module.css"

interface VersionHistoryProps {
  versions: ReadonlyArray<FileVersion>
  onRestore?: (version: FileVersion) => void
  className?: string
}

function formatDelta(delta: number): string {
  const prefix = delta > 0 ? "+" : delta < 0 ? "−" : ""
  const abs = Math.abs(delta)
  if (abs >= 1_000_000) return `${prefix}${(abs / 1_000_000).toFixed(1)} MB`
  if (abs >= 1_000) return `${prefix}${(abs / 1_000).toFixed(0)} KB`
  return `${prefix}${abs} B`
}

export function VersionHistory({
  versions,
  onRestore,
  className,
}: VersionHistoryProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-label="Version history"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>History</span>
        <h3 className={styles.title}>
          {versions.length} versions
        </h3>
      </header>

      <ol className={styles.timeline}>
        {versions.map((version) => {
          const positive = (version.delta ?? 0) > 0
          const negative = (version.delta ?? 0) < 0
          return (
            <li
              key={version.id}
              className={[
                styles.item,
                version.current ? styles.itemCurrent : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.node} aria-hidden="true">
                <span className={styles.nodeRing} />
                <span className={styles.nodeDot} />
              </span>

              <div className={styles.body}>
                <div className={styles.row}>
                  <span className={styles.label}>
                    {version.label}
                    {version.current ? (
                      <span className={styles.currentTag}>Current</span>
                    ) : null}
                  </span>
                  <time
                    className={styles.time}
                    dateTime={version.timestamp}
                  >
                    {version.timestamp}
                  </time>
                </div>
                <p className={styles.summary}>{version.summary}</p>
                <div className={styles.metaRow}>
                  <span className={styles.author}>
                    <Avatar
                      name={version.author.name}
                      src={version.author.avatar}
                      size="sm"
                      tone="obsidian"
                    />
                    <span>{version.author.name}</span>
                  </span>
                  {version.delta !== undefined ? (
                    <span
                      className={[
                        styles.delta,
                        positive ? styles.deltaPositive : "",
                        negative ? styles.deltaNegative : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {formatDelta(version.delta)}
                    </span>
                  ) : null}
                  {!version.current ? (
                    <button
                      type="button"
                      className={styles.restoreBtn}
                      onClick={() => onRestore?.(version)}
                    >
                      <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
                      Restore
                    </button>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default VersionHistory
