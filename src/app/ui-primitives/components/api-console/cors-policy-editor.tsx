"use client"

import { useCallback, useId, useState } from "react"

import { Chip } from "../primitives/chip"
import { TagInput } from "../primitives/tag-input"
import type { HttpMethod } from "./api-console-types"

import styles from "./cors-policy-editor.module.css"

export interface CorsPolicy {
  allowedOrigins: ReadonlyArray<string>
  allowedMethods: ReadonlyArray<HttpMethod>
  allowedHeaders: ReadonlyArray<string>
  allowCredentials: boolean
  /** Optional max-age in seconds for the CORS preflight cache. */
  maxAge?: number
}

interface CorsPolicyEditorProps {
  /** Initial policy values. Component owns state — call `onChange` to react. */
  value: CorsPolicy
  onChange?: (next: CorsPolicy) => void
  className?: string
}

const METHOD_OPTIONS: ReadonlyArray<HttpMethod> = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]

export function CorsPolicyEditor({ value, onChange, className }: CorsPolicyEditorProps) {
  const [internal, setInternal] = useState<CorsPolicy>(value)
  const credId = useId()
  const maxAgeId = useId()
  const classes = [styles.editor, className].filter(Boolean).join(" ")

  const apply = useCallback(
    (next: CorsPolicy) => {
      setInternal(next)
      onChange?.(next)
    },
    [onChange],
  )

  const toggleMethod = (method: HttpMethod) => {
    const next = internal.allowedMethods.includes(method)
      ? internal.allowedMethods.filter((m) => m !== method)
      : [...internal.allowedMethods, method]
    apply({ ...internal, allowedMethods: next })
  }

  return (
    <section className={classes} aria-label="CORS policy editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Cross-origin policy</span>
        <h3 className={styles.title}>CORS rules</h3>
      </header>

      <div className={styles.row}>
        <TagInput
          label="Allowed origins"
          placeholder="https://workshop.muffler.men"
          value={[...internal.allowedOrigins]}
          onChange={(next) => apply({ ...internal, allowedOrigins: next })}
          helperText="Wildcards allowed (e.g. https://*.muffler.men). Use * to allow all (dev only)."
        />
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Allowed methods</span>
        <div className={styles.chipRow}>
          {METHOD_OPTIONS.map((method) => {
            const selected = internal.allowedMethods.includes(method)
            return (
              <Chip
                key={method}
                label={method}
                tone={selected ? "teal" : "neutral"}
                selected={selected}
                onSelect={() => toggleMethod(method)}
              />
            )
          })}
        </div>
      </div>

      <div className={styles.row}>
        <TagInput
          label="Allowed headers"
          placeholder="X-Mufflermen-Trace-Id"
          value={[...internal.allowedHeaders]}
          onChange={(next) => apply({ ...internal, allowedHeaders: next })}
          helperText="Case-insensitive. Browsers normalize to lowercase."
        />
      </div>

      <div className={styles.row}>
        <span className={styles.label} id={credId}>
          Credentials
        </span>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={internal.allowCredentials}
            onChange={(event) => apply({ ...internal, allowCredentials: event.target.checked })}
            aria-describedby={credId}
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>
            {internal.allowCredentials ? "Send cookies / auth headers" : "Public requests only"}
          </span>
        </label>
      </div>

      <div className={styles.row}>
        <label htmlFor={maxAgeId} className={styles.label}>
          Preflight cache (seconds)
        </label>
        <input
          id={maxAgeId}
          type="number"
          min={0}
          max={86_400}
          step={60}
          className={styles.numberInput}
          value={internal.maxAge ?? 0}
          onChange={(event) =>
            apply({ ...internal, maxAge: Number(event.target.value) || 0 })
          }
        />
      </div>
    </section>
  )
}

export default CorsPolicyEditor
