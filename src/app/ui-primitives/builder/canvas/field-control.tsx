"use client"

import { useId } from "react"

import type { EditableField, PropValue } from "../model"
import styles from "./canvas.module.css"

interface FieldControlProps {
  field: EditableField
  value: PropValue | undefined
  onChange: (value: PropValue) => void
}

/** Coerce a prop value to a string for text-like inputs. */
function asText(value: PropValue | undefined): string {
  return typeof value === "string" ? value : ""
}

/**
 * Renders the right control for one {@link EditableField}, wired to the
 * inspector's onChange. Controls cover the demo blocks' field types: text,
 * textarea/richtext, toggle, select (enum), and url.
 */
export function FieldControl({ field, value, onChange }: FieldControlProps) {
  const id = useId()
  const labelId = `${id}-label`

  function control() {
    switch (field.control) {
      case "toggle":
        return (
          <button
            type="button"
            role="switch"
            aria-checked={value === true}
            aria-labelledby={labelId}
            className={[styles.toggle, value === true ? styles.toggleOn : ""].join(" ")}
            onClick={() => onChange(value !== true)}
          >
            <span className={styles.toggleThumb} />
          </button>
        )
      case "select":
        return (
          <select
            id={id}
            className={styles.fieldInput}
            aria-labelledby={labelId}
            value={asText(value)}
            onChange={(event) => onChange(event.target.value)}
          >
            {(field.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      case "textarea":
      case "richtext":
        return (
          <textarea
            id={id}
            className={styles.fieldTextarea}
            aria-labelledby={labelId}
            rows={3}
            value={asText(value)}
            onChange={(event) => onChange(event.target.value)}
          />
        )
      case "url":
        return (
          <input
            id={id}
            type="url"
            className={styles.fieldInput}
            aria-labelledby={labelId}
            value={asText(value)}
            onChange={(event) => onChange(event.target.value)}
          />
        )
      default:
        return (
          <input
            id={id}
            type="text"
            className={styles.fieldInput}
            aria-labelledby={labelId}
            value={asText(value)}
            onChange={(event) => onChange(event.target.value)}
          />
        )
    }
  }

  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <span id={labelId} className={styles.fieldLabel}>
          {field.label}
          {field.optional ? <span className={styles.fieldOptional}>optional</span> : null}
        </span>
      </div>
      {control()}
      {field.hint ? <p className={styles.fieldHint}>{field.hint}</p> : null}
    </div>
  )
}
