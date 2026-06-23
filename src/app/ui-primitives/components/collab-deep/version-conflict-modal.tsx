"use client"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type {
  CollabUser,
  ConflictResolution,
  ConflictVersion,
  ConflictVersionSource,
  CursorTone,
} from "./collab-deep-types"
import {
  COLLAB_DEEP_TONE_HEX,
  CONFLICT_SOURCE_LABEL,
} from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./version-conflict-modal.module.css"

interface VersionConflictModalProps {
  /** Short label of the field / block in conflict, e.g. "Description". */
  fieldLabel: string
  /** Optional doc title for context, e.g. "Falcon parts page". */
  docTitle?: string
  /** Three-way diff (must contain base + mine + theirs in any order). */
  versions: ReadonlyArray<ConflictVersion>
  /** Optional resolution preselection. */
  selectedResolution?: ConflictResolution
  /** Click handler for an action button. */
  onResolve?: (choice: ConflictResolution) => void
  className?: string
}

const SOURCE_ORDER: ReadonlyArray<ConflictVersionSource> = [
  "base",
  "mine",
  "theirs",
]

const SOURCE_TONE: Record<ConflictVersionSource, "neutral" | "teal" | "amber"> = {
  base: "neutral",
  mine: "teal",
  theirs: "amber",
}

function authorTint(user?: CollabUser): string | null {
  if (!user) {
    return null
  }
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Three-way diff modal showing Original / Yours / Theirs with merge actions. */
export function VersionConflictModal({
  fieldLabel,
  docTitle,
  versions,
  selectedResolution,
  onResolve,
  className,
}: VersionConflictModalProps) {
  const classes = [styles.modal, className].filter(Boolean).join(" ")

  const ordered = SOURCE_ORDER.map((source) =>
    versions.find((v) => v.source === source)
  ).filter((v): v is ConflictVersion => Boolean(v))

  return (
    <div className={classes} role="dialog" aria-modal="true" aria-labelledby="collab-deep-conflict-title">
      <header className={styles.head}>
        <span className={styles.kicker}>Conflict · 3-way merge</span>
        <h2 id="collab-deep-conflict-title" className={styles.title}>
          Two collaborators edited <em className={styles.field}>{fieldLabel}</em>
        </h2>
        {docTitle && <p className={styles.subtitle}>on {docTitle}</p>}
      </header>

      <div className={styles.columns}>
        {ordered.map((version) => {
          const tint = authorTint(version.author)
          return (
            <article
              key={version.id}
              className={styles.column}
              data-source={version.source}
              style={
                tint
                  ? ({ "--column-tint": tint } as React.CSSProperties)
                  : undefined
              }
            >
              <header className={styles.columnHead}>
                <Chip
                  tone={SOURCE_TONE[version.source]}
                  label={CONFLICT_SOURCE_LABEL[version.source]}
                  className={styles.columnChip}
                />
                {version.author && (
                  <div className={styles.author}>
                    <Avatar
                      name={version.author.name}
                      src={version.author.avatar}
                      size="sm"
                      tone={version.author.tone ?? "obsidian"}
                    />
                    <div className={styles.authorMeta}>
                      <span className={styles.authorName}>{version.author.name}</span>
                      {version.timestamp && (
                        <span className={styles.authorTime}>{version.timestamp}</span>
                      )}
                    </div>
                  </div>
                )}
                {version.stats && (
                  <span className={styles.stats} aria-label={`+${version.stats.added} added, ${version.stats.removed} removed`}>
                    <span className={styles.added}>+{version.stats.added}</span>
                    <span className={styles.removed}>−{version.stats.removed}</span>
                  </span>
                )}
              </header>
              <pre className={styles.body}>{version.body}</pre>
            </article>
          )
        })}
      </div>

      <footer className={styles.actions}>
        <button
          type="button"
          className={[
            styles.action,
            styles.actionGhost,
            selectedResolution === "keep-mine" ? styles.actionActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onResolve?.("keep-mine")}
        >
          Keep mine
        </button>
        <button
          type="button"
          className={[
            styles.action,
            styles.actionGhost,
            selectedResolution === "keep-theirs" ? styles.actionActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onResolve?.("keep-theirs")}
        >
          Keep theirs
        </button>
        <button
          type="button"
          className={[
            styles.action,
            styles.actionPrimary,
            selectedResolution === "merge" ? styles.actionActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onResolve?.("merge")}
        >
          Merge both
        </button>
      </footer>
    </div>
  )
}

export default VersionConflictModal
