import type { ReactNode } from "react"

import { FieldTypeIcon } from "./field-type-icon"
import type { FormBuilderField } from "./form-builder-types"
import styles from "./form-canvas.module.css"

export type DropTargetState = "idle" | "hover" | "active"

interface FormCanvasProps {
  /** Form title displayed at the top of the canvas. */
  formTitle: string
  /** Subline beneath the title — e.g. page label. */
  formMeta?: string
  /** Field rows rendered as draggable cards. */
  fields: ReadonlyArray<FormBuilderField>
  /** Id of the currently selected field (drives the highlight ring). */
  selectedFieldId?: string
  /** Visual state for the in-between drop zones. */
  dropTargetState?: DropTargetState
  /** Optional empty state slot — rendered when `fields` is empty. */
  empty?: ReactNode
  className?: string
}

export function FormCanvas({
  formTitle,
  formMeta,
  fields,
  selectedFieldId,
  dropTargetState = "idle",
  empty,
  className,
}: FormCanvasProps) {
  const classes = [styles.canvas, className].filter(Boolean).join(" ")
  const dropClass = [
    styles.dropZone,
    dropTargetState === "hover" ? styles.dropZoneHover : "",
    dropTargetState === "active" ? styles.dropZoneActive : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      role="application"
      aria-roledescription="form builder canvas"
      aria-label={`${formTitle} canvas`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Form canvas</span>
        <h2 className={styles.title}>{formTitle}</h2>
        {formMeta ? <span className={styles.meta}>{formMeta}</span> : null}
      </header>

      <div className={styles.stage}>
        {fields.length === 0 ? (
          <div className={styles.empty} role="status">
            {empty ?? (
              <>
                <span className={styles.emptyKicker}>Empty form</span>
                <span className={styles.emptyHint}>
                  Drag a field type from the palette to begin
                </span>
              </>
            )}
          </div>
        ) : (
          <ol className={styles.rows}>
            <li className={dropClass} aria-hidden="true">
              <span className={styles.dropLabel}>Drop here</span>
            </li>
            {fields.map((field, index) => {
              const isSelected = selectedFieldId === field.id
              const cardClass = [
                styles.row,
                isSelected ? styles.rowSelected : "",
              ]
                .filter(Boolean)
                .join(" ")

              return (
                <li
                  key={field.id}
                  className={styles.rowWrap}
                  aria-current={isSelected ? "true" : undefined}
                >
                  <article className={cardClass}>
                    <span className={styles.rowIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.rowIcon} aria-hidden="true">
                      <FieldTypeIcon type={field.type} size={16} />
                    </span>
                    <span className={styles.rowBody}>
                      <span className={styles.rowLabel}>
                        {field.label}
                        {field.required ? (
                          <span className={styles.requiredStar} aria-label="Required">
                            *
                          </span>
                        ) : null}
                      </span>
                      {field.placeholder ? (
                        <span className={styles.rowPlaceholder}>
                          {field.placeholder}
                        </span>
                      ) : null}
                    </span>
                    <span className={styles.rowGrip} aria-hidden="true">
                      <svg viewBox="0 0 8 16" width="8" height="16" fill="none">
                        <circle cx="2" cy="3" r="1.1" fill="currentColor" />
                        <circle cx="6" cy="3" r="1.1" fill="currentColor" />
                        <circle cx="2" cy="8" r="1.1" fill="currentColor" />
                        <circle cx="6" cy="8" r="1.1" fill="currentColor" />
                        <circle cx="2" cy="13" r="1.1" fill="currentColor" />
                        <circle cx="6" cy="13" r="1.1" fill="currentColor" />
                      </svg>
                    </span>
                  </article>
                  <span className={dropClass} aria-hidden="true">
                    <span className={styles.dropLabel}>Drop here</span>
                  </span>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </section>
  )
}
