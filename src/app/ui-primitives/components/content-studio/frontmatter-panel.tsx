"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives"
import { MaterialSurface } from "../surfaces"

import {
  CATEGORY_META,
  formatReadMinutes,
  studioToneToChip,
  type Frontmatter,
  type PostCategory,
} from "./content-studio-types"
import styles from "./frontmatter-panel.module.css"

interface FrontmatterPanelProps {
  frontmatter: Frontmatter
  authorChips?: ReadonlyArray<{ id: string; label: string }>
  /** Optional handler when a tag is dismissed. */
  onTagRemove?: (tag: string) => void
  /** Optional handler when category changes. */
  onCategoryChange?: (category: PostCategory) => void
  className?: string
}

const CATEGORY_KEYS: ReadonlyArray<PostCategory> = [
  "workshop-tales",
  "suburb-spotlights",
  "tech-explainers",
  "parts-deep-dives",
  "customer-stories",
]

export function FrontmatterPanel({
  frontmatter,
  authorChips,
  onTagRemove,
  onCategoryChange,
  className,
}: FrontmatterPanelProps) {
  const panelId = useId()
  const [category, setCategory] = useState<PostCategory>(frontmatter.category)
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  const handleCategoryPick = (next: PostCategory) => {
    setCategory(next)
    onCategoryChange?.(next)
  }

  return (
    <MaterialSurface elevation={2} tone="surface" className={classes}>
      <form className={styles.form} aria-labelledby={`${panelId}-title`}>
        <header className={styles.head}>
          <span className={styles.kicker}>Frontmatter</span>
          <h2 className={styles.title} id={`${panelId}-title`}>
            Article metadata
          </h2>
        </header>

        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Title</span>
            <input
              type="text"
              className={styles.input}
              defaultValue={frontmatter.title}
              aria-label="Article title"
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Slug</span>
            <span className={styles.slug}>
              <em>/journal/</em>
              <input
                type="text"
                className={styles.inputMono}
                defaultValue={frontmatter.slug}
                aria-label="URL slug"
              />
            </span>
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Excerpt</span>
          <textarea
            className={styles.textarea}
            defaultValue={frontmatter.excerpt}
            rows={3}
            aria-label="Article excerpt"
          />
          <span className={styles.helper}>
            {frontmatter.excerpt.length} / 220 chars · shown in cards + meta description.
          </span>
        </label>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Category</legend>
          <div className={styles.chipRow} role="radiogroup" aria-label="Post category">
            {CATEGORY_KEYS.map((key) => {
              const meta = CATEGORY_META[key]
              const selected = key === category
              return (
                <Chip
                  key={key}
                  label={`${meta.glyph}  ${meta.label}`}
                  tone={studioToneToChip(meta.tone)}
                  selected={selected}
                  onSelect={() => handleCategoryPick(key)}
                />
              )
            })}
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Tags</legend>
          <div className={styles.chipRow}>
            {frontmatter.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                tone="neutral"
                dismissible
                onDismiss={() => onTagRemove?.(tag)}
              />
            ))}
            <button type="button" className={styles.addTag} aria-label="Add tag">
              + add
            </button>
          </div>
        </fieldset>

        <div className={styles.row}>
          <div className={styles.field}>
            <span className={styles.label}>Cover alt text</span>
            <input
              type="text"
              className={styles.input}
              defaultValue={frontmatter.coverAlt}
              aria-label="Cover image alt text"
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Authors</span>
            <div className={styles.chipRow}>
              {(authorChips ?? frontmatter.authorIds.map((id) => ({ id, label: id }))).map(
                (chip) => (
                  <Chip key={chip.id} label={chip.label} tone="teal" />
                ),
              )}
            </div>
          </div>
        </div>

        <footer className={styles.foot}>
          <span className={styles.metaPill}>
            Read time · <strong>{formatReadMinutes(frontmatter.estimatedReadMinutes)}</strong>
          </span>
          <span className={styles.metaPill}>
            Scheduled · <strong>{frontmatter.scheduledFor ?? "—"}</strong>
          </span>
        </footer>
      </form>
    </MaterialSurface>
  )
}

export default FrontmatterPanel
