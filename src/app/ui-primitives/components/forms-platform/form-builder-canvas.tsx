import { FieldTypeIcon } from "../form-builder/field-type-icon"
import type {
  FormBuilderCanvasField,
  FormBuilderPaletteSection,
  FormsPlatformTone,
} from "./forms-platform-types"
import styles from "./form-builder-canvas.module.css"

interface FormBuilderCanvasProps {
  /** Left rail field palette grouped into sections. */
  palette: ReadonlyArray<FormBuilderPaletteSection>
  /** Centre stage form title. */
  formTitle: string
  /** Hint surfaced under the title — e.g. step label or audience. */
  hint?: string
  /** Ordered draggable rows on the stage. */
  fields: ReadonlyArray<FormBuilderCanvasField>
  /** Id of the currently selected field (drives the amber selection ring). */
  selectedFieldId?: string
  /** Index between rows that should show the active drop indicator. */
  activeDropIndex?: number
  className?: string
}

const TONE_CLASS: Record<FormsPlatformTone, string> = {
  red: styles.dropRowToneRed,
  amber: styles.dropRowToneAmber,
  teal: styles.dropRowToneTeal,
  green: styles.dropRowToneGreen,
  violet: styles.dropRowToneViolet,
  neutral: styles.dropRowToneNeutral,
}

export function FormBuilderCanvas({
  palette,
  formTitle,
  hint,
  fields,
  selectedFieldId,
  activeDropIndex,
  className,
}: FormBuilderCanvasProps) {
  const classes = [styles.canvas, className].filter(Boolean).join(" ")

  const gapClassFor = (index: number) => {
    return [
      styles.dropGap,
      activeDropIndex === index ? styles.dropGapActive : "",
    ]
      .filter(Boolean)
      .join(" ")
  }

  return (
    <section
      className={classes}
      role="application"
      aria-roledescription="form builder canvas"
      aria-label={`${formTitle} builder`}
    >
      <aside className={styles.palette} aria-label="Field palette">
        <span className={styles.paletteKicker}>Field palette</span>
        {palette.map((section) => (
          <div key={section.id} className={styles.paletteSection}>
            <p className={styles.paletteTitle}>{section.title}</p>
            {section.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.paletteItem}
                aria-roledescription="draggable palette item"
              >
                <span className={styles.paletteIcon} aria-hidden="true">
                  <FieldTypeIcon type={item.type} size={14} />
                </span>
                <span>
                  {item.label}
                  {item.hint ? (
                    <span className={styles.paletteItemHint}>{item.hint}</span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        ))}
      </aside>

      <div className={styles.stage}>
        <div className={styles.stageHead}>
          <h3 className={styles.stageTitle}>{formTitle}</h3>
          {hint ? <span className={styles.stageHint}>{hint}</span> : null}
        </div>

        {fields.length === 0 ? (
          <div className={styles.empty}>Drag a field from the palette</div>
        ) : (
          <ul className={styles.stageList}>
            <li className={gapClassFor(0)} aria-hidden="true">
              Drop here
            </li>
            {fields.map((field, index) => {
              const isSelected = selectedFieldId === field.id
              const rowClass = [
                styles.dropRow,
                isSelected ? styles.dropRowSelected : "",
                TONE_CLASS[field.tone ?? "neutral"],
              ]
                .filter(Boolean)
                .join(" ")

              return (
                <li key={field.id} className={styles.stageGroup}>
                  <article
                    className={rowClass}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <span className={styles.dropIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.dropIcon} aria-hidden="true">
                      <FieldTypeIcon type={field.type} size={14} />
                    </span>
                    <span className={styles.dropBody}>
                      <span className={styles.dropLabel}>
                        {field.label}
                        {field.required ? (
                          <span
                            className={styles.dropRequired}
                            aria-label="Required"
                          >
                            *
                          </span>
                        ) : null}
                      </span>
                      {field.helperText ? (
                        <span className={styles.dropHelper}>
                          {field.helperText}
                        </span>
                      ) : null}
                    </span>
                    <svg
                      viewBox="0 0 8 16"
                      width="8"
                      height="16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="2" cy="3" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                      <circle cx="6" cy="3" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                      <circle cx="2" cy="8" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                      <circle cx="6" cy="8" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                      <circle cx="2" cy="13" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                      <circle cx="6" cy="13" r="1.1" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
                    </svg>
                  </article>
                  <span
                    className={gapClassFor(index + 1)}
                    aria-hidden="true"
                  >
                    Drop here
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
