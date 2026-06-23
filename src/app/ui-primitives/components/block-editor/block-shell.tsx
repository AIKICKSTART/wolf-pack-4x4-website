import type { ReactNode } from "react"

import type { BlockError, BlockMode } from "./block-editor-types"
import styles from "./block-editor.module.css"

export interface BlockShellProps {
  /** Block kind used as ARIA label and toolbar title. */
  kind: string
  /** Current render mode — controls chrome and editable affordances. */
  mode: BlockMode
  /** Optional error payload — rendered when mode === "error". */
  error?: BlockError
  /** Inline toolbar shown above the content in edit mode. */
  toolbar?: ReactNode
  /** Block content. */
  children: ReactNode
  className?: string
  /** Optional aria-labelledby pointer for screen readers. */
  ariaLabelledBy?: string
}

/**
 * Shared block shell — renders the surface, error state, and inline
 * toolbar in edit mode. Used by every block primitive so a host CMS
 * gets identical chrome around every primitive.
 */
export function BlockShell({
  kind,
  mode,
  error,
  toolbar,
  children,
  className,
  ariaLabelledBy,
}: BlockShellProps) {
  const classes = [
    styles.block,
    mode === "edit" ? styles.blockEdit : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")

  if (mode === "error") {
    const errorCode = error?.code ?? "BLOCK_ERROR"
    const message = error?.message ?? `${kind} block failed to render.`
    return (
      <section
        className={styles.errorState}
        role="alert"
        aria-live="polite"
        aria-label={`${kind} block error`}
      >
        <span className={styles.errorCode}>{errorCode}</span>
        <p className={styles.errorMessage}>{message}</p>
        {error?.hint ? <p className={styles.errorHint}>{error.hint}</p> : null}
      </section>
    )
  }

  return (
    <section
      className={classes}
      aria-label={`${kind} block`}
      aria-labelledby={ariaLabelledBy}
    >
      {mode === "edit" && toolbar ? (
        <div className={styles.toolbar} role="toolbar" aria-label={`${kind} toolbar`}>
          <span className={styles.toolbarLabel}>{kind}</span>
          {toolbar}
        </div>
      ) : null}
      {children}
    </section>
  )
}
