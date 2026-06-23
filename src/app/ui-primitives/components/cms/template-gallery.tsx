"use client"

import { AlertTriangle } from "lucide-react"
import { useMemo, useState, type CSSProperties } from "react"

import { Chip } from "../primitives"

import { TONE_HEX, type TemplateDefinition } from "./cms-types"

import styles from "./template-gallery.module.css"

const CATEGORY_LABELS: Record<TemplateDefinition["category"], string> = {
  landing: "Landing",
  parts: "Parts detail",
  suburb: "Suburb landing",
  service: "Service page",
  blog: "Blog post",
}

const CATEGORY_ORDER: ReadonlyArray<TemplateDefinition["category"] | "all"> = [
  "all",
  "landing",
  "parts",
  "suburb",
  "service",
  "blog",
]

export interface TemplateGalleryProps {
  templates: ReadonlyArray<TemplateDefinition>
  defaultCategory?: TemplateDefinition["category"] | "all"
  selectedId?: string
  loading?: boolean
  error?: string
  onSelect?: (template: TemplateDefinition) => void
  className?: string
}

export function TemplateGallery({
  templates,
  defaultCategory = "all",
  selectedId,
  loading = false,
  error,
  onSelect,
  className,
}: TemplateGalleryProps) {
  const [category, setCategory] = useState<TemplateDefinition["category"] | "all">(defaultCategory)

  const filtered = useMemo(
    () =>
      templates.filter((template) => category === "all" || template.category === category),
    [templates, category],
  )

  const classes = [styles.gallery, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Template gallery">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Template gallery · {filtered.length} templates</span>
          <span className={styles.heading}>Start from a Mufflermen template</span>
        </div>
        <div className={styles.categories} role="tablist" aria-label="Template categories">
          {CATEGORY_ORDER.map((option) => (
            <Chip
              key={option}
              label={option === "all" ? "All" : CATEGORY_LABELS[option]}
              tone={option === "all" ? "neutral" : "amber"}
              selected={category === option}
              onSelect={() => setCategory(option)}
            />
          ))}
        </div>
      </header>

      {error ? (
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Templates unreachable</strong>
          <span>{error}</span>
        </div>
      ) : loading ? (
        <div className={styles.empty}>Loading templates…</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>No templates in this category</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((template) => {
            const tone = TONE_HEX[template.tone]
            const selected = selectedId === template.id
            return (
              <button
                key={template.id}
                type="button"
                className={styles.tile}
                style={{ "--tile-tone": tone } as CSSProperties}
                aria-pressed={selected}
                aria-label={`${template.title} template`}
                onClick={() => onSelect?.(template)}
              >
                <div className={styles.thumb} aria-hidden="true">
                  {template.glyph}
                </div>
                <div className={styles.meta}>
                  <span className={styles.name}>{template.title}</span>
                  <p className={styles.description}>{template.description}</p>
                </div>
                <footer className={styles.footer}>
                  <span>{CATEGORY_LABELS[template.category]}</span>
                  <span>{template.blocks.toString().padStart(2, "0")} blocks</span>
                </footer>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default TemplateGallery
