"use client"

import type { MappingTemplateSummary } from "./import-types"
import styles from "./mapping-template-card.module.css"

interface MappingTemplateCardProps {
  template: MappingTemplateSummary
  onApply?: (id: string) => void
  className?: string
}

export function MappingTemplateCard({
  template,
  onApply,
  className,
}: MappingTemplateCardProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Mapping template ${template.name}`}
    >
      <div className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          ⌘
        </span>
        <div className={styles.headText}>
          <h3 className={styles.name}>{template.name}</h3>
          <span className={styles.owner}>Owned by {template.ownerLabel}</span>
        </div>
      </div>

      <div className={styles.chips}>
        <span className={styles.mappedChip}>
          {template.mappedColumnCount} columns mapped
        </span>
        <span className={styles.lastUsedChip}>
          last used {template.lastUsedLabel}
        </span>
      </div>

      <button
        type="button"
        className={styles.applyButton}
        onClick={() => onApply?.(template.id)}
      >
        Apply template
        <span aria-hidden="true"> →</span>
      </button>
    </article>
  )
}

export default MappingTemplateCard
