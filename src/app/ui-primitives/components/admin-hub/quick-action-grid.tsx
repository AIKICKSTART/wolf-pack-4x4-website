import { Pin } from "lucide-react"

import { Kbd, KbdGroup } from "../primitives/kbd"
import { adminToneToVar, type QuickActionItem } from "./admin-hub-types"

import styles from "./quick-action-grid.module.css"

interface QuickActionGridProps {
  actions: ReadonlyArray<QuickActionItem>
  heading?: string
  /** Max columns. Defaults to 3 for a 3x3 grid. */
  columns?: 2 | 3
  className?: string
}

export function QuickActionGrid({
  actions,
  heading = "Quick actions",
  columns = 3,
  className,
}: QuickActionGridProps) {
  const classes = [
    styles.grid,
    columns === 2 ? styles.col2 : styles.col3,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={styles.surface} aria-label={heading}>
      <header className={styles.head}>
        <span className={styles.kicker}>{heading}</span>
        <span className={styles.helper}>Pinned shortcuts for this role</span>
      </header>

      <ul className={classes} role="list">
        {actions.map((action) => (
          <li key={action.id} className={styles.cell}>
            <button
              type="button"
              className={styles.action}
              aria-label={`${action.label}${action.description ? ` — ${action.description}` : ""}`}
              style={{ "--action-tone": adminToneToVar(action.tone) } as React.CSSProperties}
            >
              <span className={styles.actionTop}>
                <span className={styles.glyph} aria-hidden="true">
                  {action.glyph}
                </span>
                {action.pinned && (
                  <Pin
                    size={12}
                    strokeWidth={2.2}
                    className={styles.pin}
                    aria-label="Pinned"
                  />
                )}
              </span>
              <span className={styles.actionBody}>
                <span className={styles.actionLabel}>{action.label}</span>
                {action.description && (
                  <span className={styles.actionDesc}>{action.description}</span>
                )}
              </span>
              <span className={styles.actionMeta}>
                {action.badge && (
                  <span className={styles.badge}>{action.badge}</span>
                )}
                {action.shortcut && action.shortcut.length > 0 && (
                  <span className={styles.shortcut} aria-hidden="true">
                    <KbdGroup separator="">
                      {action.shortcut.map((key, idx) => (
                        <Kbd key={`${action.id}-${idx}`} size="sm">
                          {key}
                        </Kbd>
                      ))}
                    </KbdGroup>
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default QuickActionGrid
