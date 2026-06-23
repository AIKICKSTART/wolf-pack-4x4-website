import { FieldTypeIcon } from "./field-type-icon"
import type { FormFieldType } from "./form-builder-types"
import styles from "./field-palette.module.css"

export interface FieldPaletteItem {
  type: FormFieldType
  name: string
  hint: string
}

export interface FieldPaletteSection {
  id: string
  title: string
  items: ReadonlyArray<FieldPaletteItem>
}

interface FieldPaletteProps {
  sections: ReadonlyArray<FieldPaletteSection>
  /** Optional accessible label for the listbox. Defaults to "Field types". */
  ariaLabel?: string
  className?: string
}

const TONE_BY_TYPE: Record<FormFieldType, string> = {
  "short-text": styles.toneTeal,
  "long-text": styles.toneTeal,
  email: styles.toneTeal,
  phone: styles.toneTeal,
  number: styles.toneAmber,
  currency: styles.toneAmber,
  date: styles.toneAmber,
  dropdown: styles.toneViolet,
  "multi-select": styles.toneViolet,
  rating: styles.toneViolet,
  "file-upload": styles.toneGreen,
  signature: styles.toneGreen,
  address: styles.toneGreen,
  payment: styles.toneRed,
  "yes-no": styles.toneRed,
}

export function FieldPalette({
  sections,
  ariaLabel = "Field types",
  className,
}: FieldPaletteProps) {
  const classes = [styles.palette, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Form field palette">
      <header className={styles.head}>
        <span className={styles.kicker}>Add a field</span>
        <span className={styles.hint}>Drag onto the canvas</span>
      </header>

      <div
        className={styles.list}
        role="listbox"
        aria-label={ariaLabel}
        aria-orientation="vertical"
      >
        {sections.map((section) => (
          <section key={section.id} className={styles.section}>
            <span className={styles.sectionTitle}>{section.title}</span>
            <ul className={styles.items}>
              {section.items.map((item) => (
                <li
                  key={item.type}
                  className={[styles.item, TONE_BY_TYPE[item.type]].join(" ")}
                  role="option"
                  aria-selected={false}
                  draggable
                  tabIndex={0}
                  aria-label={`Drag ${item.name} onto the form canvas`}
                >
                  <span className={styles.itemIcon} aria-hidden="true">
                    <FieldTypeIcon type={item.type} size={16} />
                  </span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemHint}>{item.hint}</span>
                  </span>
                  <span className={styles.grip} aria-hidden="true">
                    <svg viewBox="0 0 8 16" width="8" height="16" fill="none">
                      <circle cx="2" cy="3" r="1.1" fill="currentColor" />
                      <circle cx="6" cy="3" r="1.1" fill="currentColor" />
                      <circle cx="2" cy="8" r="1.1" fill="currentColor" />
                      <circle cx="6" cy="8" r="1.1" fill="currentColor" />
                      <circle cx="2" cy="13" r="1.1" fill="currentColor" />
                      <circle cx="6" cy="13" r="1.1" fill="currentColor" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  )
}
