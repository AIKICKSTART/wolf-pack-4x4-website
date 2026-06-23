"use client"

import { AlertTriangle, ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

import {
  FIELD_KIND_GLYPH,
  FIELD_KIND_LABEL,
  type FieldDefinition,
  type FieldKind,
} from "./cms-types"

import styles from "./field-builder.module.css"

const PALETTE_ORDER: ReadonlyArray<FieldKind> = [
  "text",
  "rich-text",
  "number",
  "boolean",
  "date",
  "image",
  "reference",
  "json",
  "geo",
  "money",
]

export interface FieldBuilderProps {
  collectionName: string
  initialFields: ReadonlyArray<FieldDefinition>
  loading?: boolean
  error?: string
  className?: string
}

let nextFieldId = 1
function makeFieldId(): string {
  nextFieldId += 1
  return `field-new-${nextFieldId.toString().padStart(3, "0")}`
}

export function FieldBuilder({
  collectionName,
  initialFields,
  loading = false,
  error,
  className,
}: FieldBuilderProps) {
  const [fields, setFields] = useState<ReadonlyArray<FieldDefinition>>(initialFields)

  const addField = (kind: FieldKind) => {
    const id = makeFieldId()
    setFields((current) => [
      ...current,
      {
        id,
        label: `New ${FIELD_KIND_LABEL[kind]} field`,
        kind,
        required: false,
        hint: "Set helper copy in the inspector.",
      },
    ])
  }

  const move = (index: number, delta: -1 | 1) => {
    setFields((current) => {
      const target = index + delta
      if (target < 0 || target >= current.length) {
        return current
      }
      const next = current.slice()
      const [removed] = next.splice(index, 1)
      next.splice(target, 0, removed)
      return next
    })
  }

  const remove = (id: string) => {
    setFields((current) => current.filter((field) => field.id !== id))
  }

  const classes = [styles.builder, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Schema builder for ${collectionName}`}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Schema builder · {collectionName}</span>
          <span className={styles.heading}>Fields · {fields.length}</span>
        </div>
      </header>

      <div className={styles.palette}>
        <span className={styles.paletteLabel}>Add field</span>
        <div className={styles.paletteRow}>
          {PALETTE_ORDER.map((kind) => (
            <button
              key={kind}
              type="button"
              className={styles.paletteChip}
              aria-label={`Add ${FIELD_KIND_LABEL[kind]} field`}
              onClick={() => addField(kind)}
            >
              <Plus size={10} strokeWidth={2.4} aria-hidden="true" />
              <span className={styles.paletteGlyph} aria-hidden="true">
                {FIELD_KIND_GLYPH[kind]}
              </span>
              {FIELD_KIND_LABEL[kind]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list} role="list">
        {error ? (
          <div className={styles.error} role="alert">
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
            <strong>Schema not loaded</strong>
            <span>{error}</span>
          </div>
        ) : loading ? (
          <div className={styles.empty}>Loading schema…</div>
        ) : fields.length === 0 ? (
          <div className={styles.empty}>Add a field to get started</div>
        ) : (
          fields.map((field, index) => (
            <article
              key={field.id}
              className={styles.field}
              role="listitem"
              aria-label={`Field ${field.label}`}
            >
              <span className={styles.fieldDragHandle} aria-hidden="true">
                <GripVertical size={12} strokeWidth={2.2} />
              </span>
              <span className={styles.fieldGlyph} aria-hidden="true">
                {FIELD_KIND_GLYPH[field.kind]}
              </span>
              <div className={styles.fieldMeta}>
                <div className={styles.fieldRow1}>
                  <span className={styles.fieldLabel}>{field.label}</span>
                  <span className={styles.fieldKindTag}>{FIELD_KIND_LABEL[field.kind]}</span>
                  {field.required ? <span className={styles.fieldRequired}>Required</span> : null}
                  {field.localized ? <span className={styles.fieldLocalized}>i18n</span> : null}
                </div>
                {field.hint ? <p className={styles.fieldHint}>{field.hint}</p> : null}
              </div>
              <div className={styles.fieldActions}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Move ${field.label} up`}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowUp size={12} strokeWidth={2.4} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Move ${field.label} down`}
                  onClick={() => move(index, 1)}
                  disabled={index === fields.length - 1}
                >
                  <ArrowDown size={12} strokeWidth={2.4} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Remove ${field.label}`}
                  onClick={() => remove(field.id)}
                >
                  <Trash2 size={12} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <footer className={styles.footer}>
        <span>Reorder · drag handles</span>
        <span>{fields.filter((f) => f.required).length} required</span>
      </footer>
    </section>
  )
}

export default FieldBuilder
