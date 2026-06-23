"use client"

import { Check, Copy, Link2 } from "lucide-react"
import { useId, useMemo, useState, type ChangeEvent } from "react"

import styles from "./utm-parameter-builder.module.css"

interface UtmParameterBuilderProps {
  /** Base URL the UTMs are appended to. */
  defaultBaseUrl?: string
  defaultSource?: string
  defaultMedium?: string
  defaultCampaign?: string
  defaultTerm?: string
  defaultContent?: string
  className?: string
}

interface UtmField {
  key:
    | "utm_source"
    | "utm_medium"
    | "utm_campaign"
    | "utm_term"
    | "utm_content"
  label: string
  placeholder: string
  required: boolean
}

const FIELDS: ReadonlyArray<UtmField> = [
  { key: "utm_source", label: "Source", placeholder: "klaviyo", required: true },
  { key: "utm_medium", label: "Medium", placeholder: "email", required: true },
  {
    key: "utm_campaign",
    label: "Campaign",
    placeholder: "winter_exhaust_2026",
    required: true,
  },
  { key: "utm_term", label: "Term", placeholder: "manta_catback", required: false },
  {
    key: "utm_content",
    label: "Content",
    placeholder: "hero_cta",
    required: false,
  },
]

export function UtmParameterBuilder({
  defaultBaseUrl = "https://mufflermen.com.au/quote",
  defaultSource = "klaviyo",
  defaultMedium = "email",
  defaultCampaign = "winter_exhaust_2026",
  defaultTerm = "",
  defaultContent = "hero_cta",
  className,
}: UtmParameterBuilderProps) {
  const baseId = useId()
  const [baseUrl, setBaseUrl] = useState<string>(defaultBaseUrl)
  const [params, setParams] = useState<Record<UtmField["key"], string>>(() => ({
    utm_source: defaultSource,
    utm_medium: defaultMedium,
    utm_campaign: defaultCampaign,
    utm_term: defaultTerm,
    utm_content: defaultContent,
  }))
  const [copied, setCopied] = useState<boolean>(false)

  const generatedUrl = useMemo(() => {
    if (!baseUrl) return ""
    const qs = new URLSearchParams()
    for (const field of FIELDS) {
      const value = params[field.key]
      if (value.trim().length > 0) {
        qs.set(field.key, value.trim())
      }
    }
    const query = qs.toString()
    const sep = baseUrl.includes("?") ? "&" : "?"
    return query ? `${baseUrl}${sep}${query}` : baseUrl
  }, [baseUrl, params])

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(generatedUrl)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1200)
      } catch {
        // Clipboard unavailable — UI remains in place.
      }
    }
  }

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="UTM parameter builder"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Link2 size={13} strokeWidth={2.4} aria-hidden="true" />
          UTM builder
        </span>
      </header>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Base URL</span>
        <input
          id={baseId}
          type="url"
          className={styles.input}
          value={baseUrl}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setBaseUrl(event.target.value)
          }
          placeholder="https://mufflermen.com.au/quote"
          autoComplete="off"
        />
      </label>

      <div className={styles.grid}>
        {FIELDS.map((f) => (
          <label key={f.key} className={styles.field}>
            <span className={styles.fieldLabel}>
              {f.label}
              {f.required ? (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              ) : null}
            </span>
            <input
              type="text"
              className={styles.input}
              value={params[f.key]}
              placeholder={f.placeholder}
              autoComplete="off"
              spellCheck={false}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setParams((prev) => ({ ...prev, [f.key]: event.target.value }))
              }
            />
          </label>
        ))}
      </div>

      <div className={styles.preview}>
        <span className={styles.previewLabel}>Generated URL</span>
        <code className={styles.previewCode}>{generatedUrl}</code>
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label="Copy URL"
        >
          {copied ? (
            <>
              <Check size={13} strokeWidth={2.6} aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} strokeWidth={2.4} aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
    </section>
  )
}

export default UtmParameterBuilder
