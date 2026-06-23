"use client"

import { useId, useMemo, useState } from "react"

import {
  REVISION_STATUS_LABEL,
  REVISION_STATUS_TONE,
  type DeployRevision,
} from "./deploy-console-types"
import styles from "./rollback-panel.module.css"
import shell from "./deploy-console.module.css"

export interface RollbackPanelProps {
  revisions: ReadonlyArray<DeployRevision>
  /** ID of the revision currently chosen as the rollback target. */
  initialTargetId?: string
  /** Title rendered above the panel. */
  title?: string
  /** Optional kicker. */
  kicker?: string
  className?: string
}

function toneClassFor(status: DeployRevision["status"]): string {
  switch (REVISION_STATUS_TONE[status]) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    case "green":
      return shell.toneGreen
    default:
      return shell.toneNeutral
  }
}

function findCurrent(
  revisions: ReadonlyArray<DeployRevision>,
): DeployRevision | undefined {
  return revisions.find((revision) => revision.status === "current")
}

export function RollbackPanel({
  revisions,
  initialTargetId,
  title = "Rollback to a previous revision",
  kicker = "Rollback",
  className,
}: RollbackPanelProps) {
  const current = useMemo(() => findCurrent(revisions), [revisions])
  const candidates = useMemo(
    () => revisions.filter((revision) => revision.id !== current?.id),
    [revisions, current],
  )

  const fallbackTarget =
    candidates.find((revision) => revision.status === "stable") ?? candidates[0]
  const [targetId, setTargetId] = useState<string | undefined>(
    initialTargetId ?? fallbackTarget?.id,
  )
  const target = useMemo(
    () => revisions.find((revision) => revision.id === targetId),
    [revisions, targetId],
  )
  const headingId = useId()

  return (
    <section
      className={[shell.shell, shell.toneAmber, styles.panel, className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={headingId}
    >
      <header className={shell.shellHead}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>{kicker}</span>
          <h3 className={shell.title} id={headingId}>
            {title}
          </h3>
          {current ? (
            <p className={shell.subtitle}>
              Current live: <code className={styles.currentSha}>{current.sha}</code> ·{" "}
              {current.message}
            </p>
          ) : null}
        </div>
        <span className={[shell.chip, shell.toneAmber].join(" ")}>
          Reversible · {revisions.length} revisions
        </span>
      </header>

      <ol className={styles.list} role="radiogroup" aria-label="Rollback target">
        {revisions.map((revision) => {
          const isCurrent = revision.id === current?.id
          const isSelected = revision.id === targetId
          const toneCls = toneClassFor(revision.status)
          return (
            <li key={revision.id} className={styles.item}>
              <label
                className={[
                  styles.revision,
                  toneCls,
                  isSelected ? styles.revisionSelected : "",
                  isCurrent ? styles.revisionCurrent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="radio"
                  name="rollback-target"
                  value={revision.id}
                  checked={isSelected}
                  onChange={() => setTargetId(revision.id)}
                  className={styles.radio}
                  disabled={isCurrent}
                  aria-label={`Rollback to ${revision.sha} — ${revision.message}`}
                />
                <span className={styles.revisionDot} aria-hidden="true" />
                <div className={styles.revisionBody}>
                  <div className={styles.revisionTopRow}>
                    <code className={styles.sha}>{revision.sha}</code>
                    <span className={[shell.chip, toneCls].join(" ")}>
                      {REVISION_STATUS_LABEL[revision.status]}
                    </span>
                  </div>
                  <span className={styles.message}>{revision.message}</span>
                  <span className={styles.meta}>
                    {revision.author} · {revision.authoredAt}
                  </span>
                </div>
                <div className={styles.diff}>
                  <span className={styles.diffAdded}>
                    +{revision.diff.added}
                  </span>
                  <span className={styles.diffRemoved}>
                    −{revision.diff.removed}
                  </span>
                  <span className={styles.diffFiles}>
                    {revision.diff.files} files
                  </span>
                </div>
              </label>
            </li>
          )
        })}
      </ol>

      <footer className={styles.foot}>
        <div className={styles.preview}>
          <span className={shell.sectionLabel}>Diff preview</span>
          <pre className={styles.diffPreview} aria-live="polite">
            {target
              ? `--- live ${current?.sha ?? ""}\n+++ rollback ${target.sha}\n\n` +
                `${target.diff.files} files · +${target.diff.added} / −${target.diff.removed}\n` +
                `// Apply ${target.sha} — "${target.message}"\n// Author: ${target.author} (${target.authoredAt})`
              : "Select a revision to preview the diff."}
          </pre>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={[shell.button, shell.buttonGhost].join(" ")}
          >
            Cancel
          </button>
          <button
            type="button"
            className={[shell.button, shell.buttonPrimary, shell.toneAmber].join(" ")}
            disabled={!target}
            aria-label={
              target
                ? `Roll back production to ${target.sha}`
                : "Pick a revision to roll back to"
            }
          >
            Roll back → {target?.sha ?? "—"}
          </button>
        </div>
      </footer>
    </section>
  )
}

export default RollbackPanel
