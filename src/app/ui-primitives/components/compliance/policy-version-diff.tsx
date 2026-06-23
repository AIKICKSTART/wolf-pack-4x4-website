"use client"

import { useState } from "react"

import styles from "./policy-version-diff.module.css"

export type DiffLineKind = "equal" | "added" | "removed" | "changed"

export interface PolicyDiffLine {
  id: string
  kind: DiffLineKind
  /** Text shown on the previous version side. */
  previousText?: string
  /** Text shown on the current version side. */
  currentText?: string
}

export interface PolicyVersionDiffProps {
  /** Policy name, e.g. "Privacy Policy". */
  policyName: string
  /** Previous version label, e.g. "v3.2". */
  previousVersion: string
  /** Current version label, e.g. "v3.3". */
  currentVersion: string
  /** Effective date, e.g. "2026-06-01". */
  effectiveDate: string
  /** Diff lines. */
  lines: ReadonlyArray<PolicyDiffLine>
  /** Default view mode. */
  defaultView?: "split" | "unified"
  className?: string
}

type ViewMode = "split" | "unified"

const KIND_CLASS: Record<DiffLineKind, string> = {
  equal: styles.lineEqual,
  added: styles.lineAdded,
  removed: styles.lineRemoved,
  changed: styles.lineChanged,
}

const KIND_GLYPH: Record<DiffLineKind, string> = {
  equal: " ",
  added: "+",
  removed: "−",
  changed: "Δ",
}

export function PolicyVersionDiff({
  policyName,
  previousVersion,
  currentVersion,
  effectiveDate,
  lines,
  defaultView = "split",
  className,
}: PolicyVersionDiffProps) {
  const [view, setView] = useState<ViewMode>(defaultView)

  return (
    <section
      className={[styles.viewer, className].filter(Boolean).join(" ")}
      aria-label={`${policyName} version diff`}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>Policy diff</span>
          <h3 className={styles.title}>{policyName}</h3>
        </div>
        <div className={styles.versionStrip}>
          <span className={[styles.versionChip, styles.versionPrevious].join(" ")}>
            {previousVersion}
          </span>
          <span className={[styles.versionChip, styles.versionCurrent].join(" ")}>
            {currentVersion}
          </span>
        </div>
      </header>

      <div className={styles.toolbar}>
        <span className={styles.effective}>
          Effective
          <span className={styles.effectiveValue}>{effectiveDate}</span>
        </span>
        <div
          className={styles.viewToggle}
          role="group"
          aria-label="Diff view"
        >
          <button
            type="button"
            className={styles.viewToggleBtn}
            aria-pressed={view === "split"}
            onClick={() => setView("split")}
          >
            Split
          </button>
          <button
            type="button"
            className={styles.viewToggleBtn}
            aria-pressed={view === "unified"}
            onClick={() => setView("unified")}
          >
            Unified
          </button>
        </div>
      </div>

      {view === "split" ? (
        <div className={styles.diffSplit}>
          <article className={styles.pane}>
            <header className={styles.paneHead}>
              <span className={styles.paneLabel}>Previous</span>
              <span className={styles.paneTag}>{previousVersion}</span>
            </header>
            <ol className={styles.lines}>
              {lines.map((line) => {
                const isAddedOnly = line.kind === "added"
                const text = isAddedOnly ? "" : line.previousText ?? ""
                const cls = isAddedOnly
                  ? styles.lineHidden
                  : KIND_CLASS[line.kind === "added" ? "equal" : line.kind]
                return (
                  <li
                    key={`prev-${line.id}`}
                    className={[styles.line, cls].join(" ")}
                  >
                    <span className={styles.lineGlyph} aria-hidden="true">
                      {isAddedOnly ? "" : KIND_GLYPH[line.kind]}
                    </span>
                    <span>{text}</span>
                  </li>
                )
              })}
            </ol>
          </article>
          <article className={styles.pane}>
            <header className={styles.paneHead}>
              <span className={styles.paneLabel}>Current</span>
              <span className={styles.paneTag}>{currentVersion}</span>
            </header>
            <ol className={styles.lines}>
              {lines.map((line) => {
                const isRemovedOnly = line.kind === "removed"
                const text = isRemovedOnly ? "" : line.currentText ?? ""
                const cls = isRemovedOnly
                  ? styles.lineHidden
                  : KIND_CLASS[line.kind === "removed" ? "equal" : line.kind]
                return (
                  <li
                    key={`cur-${line.id}`}
                    className={[styles.line, cls].join(" ")}
                  >
                    <span className={styles.lineGlyph} aria-hidden="true">
                      {isRemovedOnly ? "" : KIND_GLYPH[line.kind]}
                    </span>
                    <span>{text}</span>
                  </li>
                )
              })}
            </ol>
          </article>
        </div>
      ) : (
        <div className={styles.diffSingle}>
          <article className={styles.pane}>
            <header className={styles.paneHead}>
              <span className={styles.paneLabel}>Unified</span>
              <span className={styles.paneTag}>
                {previousVersion} → {currentVersion}
              </span>
            </header>
            <ol className={styles.lines}>
              {lines.map((line) => {
                const text =
                  line.kind === "added"
                    ? line.currentText ?? ""
                    : line.kind === "removed"
                    ? line.previousText ?? ""
                    : line.currentText ?? line.previousText ?? ""
                return (
                  <li
                    key={`uni-${line.id}`}
                    className={[styles.line, KIND_CLASS[line.kind]].join(" ")}
                  >
                    <span className={styles.lineGlyph} aria-hidden="true">
                      {KIND_GLYPH[line.kind]}
                    </span>
                    <span>{text}</span>
                  </li>
                )
              })}
            </ol>
          </article>
        </div>
      )}

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: "var(--primitive-green)" }}
            aria-hidden="true"
          />
          added
        </span>
        <span className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: "var(--primitive-red)" }}
            aria-hidden="true"
          />
          removed
        </span>
        <span className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: "var(--primitive-amber)" }}
            aria-hidden="true"
          />
          changed
        </span>
      </div>
    </section>
  )
}

export default PolicyVersionDiff
