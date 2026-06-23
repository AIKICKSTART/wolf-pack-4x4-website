import { Avatar } from "../primitives"
import type { AvatarTone } from "../primitives"
import { MaterialSurface } from "../surfaces"

import {
  AUTHOR_ROLE_TONE,
  type RevisionDiffLine,
  type RevisionMeta,
  type StudioTone,
} from "./content-studio-types"
import styles from "./revision-diff-viewer.module.css"

function avatarTone(tone: StudioTone): AvatarTone {
  if (tone === "violet" || tone === "neutral") return "obsidian"
  return tone
}

interface RevisionDiffViewerProps {
  oldRevision: RevisionMeta
  newRevision: RevisionMeta
  lines: ReadonlyArray<RevisionDiffLine>
  className?: string
}

function buildSides(lines: ReadonlyArray<RevisionDiffLine>): {
  left: ReadonlyArray<RevisionDiffLine | null>
  right: ReadonlyArray<RevisionDiffLine | null>
} {
  const left: Array<RevisionDiffLine | null> = []
  const right: Array<RevisionDiffLine | null> = []
  for (const line of lines) {
    if (line.kind === "context") {
      left.push(line)
      right.push(line)
    } else if (line.kind === "removed") {
      left.push(line)
      right.push(null)
    } else {
      left.push(null)
      right.push(line)
    }
  }
  return { left, right }
}

function RevisionColumn({
  meta,
  lines,
  side,
}: {
  meta: RevisionMeta
  lines: ReadonlyArray<RevisionDiffLine | null>
  side: "old" | "new"
}) {
  const tone = AUTHOR_ROLE_TONE[meta.author.role]
  return (
    <article
      className={[styles.column, side === "new" ? styles.colNew : styles.colOld]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${side === "old" ? "Previous" : "New"} revision: ${meta.label}`}
    >
      <header className={styles.colHead}>
        <div className={styles.colIdentity}>
          <Avatar
            name={meta.author.name}
            size="sm"
            tone={avatarTone(tone)}
          />
          <div>
            <span className={styles.colLabel}>{meta.label}</span>
            <span className={styles.colTimestamp}>
              {meta.author.name} · {meta.timestamp}
            </span>
          </div>
        </div>
        <span className={styles.colTag}>{side === "old" ? "Old" : "New"}</span>
      </header>
      <p className={styles.colSummary}>{meta.changeSummary}</p>
      <ol className={styles.code} aria-label={`${side === "old" ? "Removed" : "Added"} diff lines`}>
        {lines.map((line, idx) => {
          if (!line) {
            return (
              <li key={`gap-${side}-${idx}`} className={styles.lineGap} aria-hidden="true">
                <span className={styles.lineNum}>·</span>
              </li>
            )
          }
          return (
            <li
              key={line.id}
              className={[
                styles.line,
                styles[`line_${line.kind}`],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.lineNum}>{idx + 1}</span>
              <span className={styles.linePrefix} aria-hidden="true">
                {line.kind === "added" ? "+" : line.kind === "removed" ? "−" : " "}
              </span>
              <span className={styles.lineText}>{line.text || " "}</span>
              {line.note ? <em className={styles.lineNote}>{line.note}</em> : null}
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export function RevisionDiffViewer({
  oldRevision,
  newRevision,
  lines,
  className,
}: RevisionDiffViewerProps) {
  const { left, right } = buildSides(lines)
  const added = lines.filter((l) => l.kind === "added").length
  const removed = lines.filter((l) => l.kind === "removed").length
  const classes = [styles.viewer, className].filter(Boolean).join(" ")

  return (
    <MaterialSurface elevation={2} tone="surface" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Revision diff</span>
            <h2 className={styles.title}>Compare changes</h2>
          </div>
          <div className={styles.summary} aria-label="Diff summary">
            <span className={styles.statRemoved}>−{removed}</span>
            <span className={styles.statAdded}>+{added}</span>
          </div>
        </header>
        <div className={styles.split}>
          <RevisionColumn meta={oldRevision} lines={left} side="old" />
          <RevisionColumn meta={newRevision} lines={right} side="new" />
        </div>
      </div>
    </MaterialSurface>
  )
}

export default RevisionDiffViewer
