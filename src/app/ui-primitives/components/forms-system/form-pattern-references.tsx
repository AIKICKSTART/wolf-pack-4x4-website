import {
  FORM_PATTERNS_BY_ID,
  type FormPatternId,
} from "./form-patterns"

import styles from "./forms-atlas.module.css"

interface FormPatternReferencesProps {
  ids: ReadonlyArray<FormPatternId>
  title?: string
  description?: string
}

export function FormPatternReferences({
  ids,
  title = "Uses form patterns",
  description = "These surfaces consume canonical form families from the forms atlas.",
}: FormPatternReferencesProps) {
  const patterns = ids.map((id) => FORM_PATTERNS_BY_ID[id])

  return (
    <aside className={styles.referencePanel} aria-label={title}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <ul className={styles.referenceList}>
        {patterns.map((pattern) => (
          <li key={pattern.id}>
            <a href={`/ui-primitives/forms#pattern-${pattern.id}`}>
              {pattern.shortTitle}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
