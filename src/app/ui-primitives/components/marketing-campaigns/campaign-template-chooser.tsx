"use client"

import { Copy, Star } from "lucide-react"
import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./campaign-template-chooser.module.css"
import {
  CHANNEL_LABEL,
  type CampaignTemplateMeta,
} from "./marketing-campaigns-types"

interface CampaignTemplateChooserProps {
  templates: ReadonlyArray<CampaignTemplateMeta>
  defaultTab?: "library" | "private"
  className?: string
}

type TabKey = "library" | "private"

const TABS: ReadonlyArray<{ id: TabKey; label: string }> = [
  { id: "library", label: "Shared library" },
  { id: "private", label: "Private templates" },
]

export function CampaignTemplateChooser({
  templates,
  defaultTab = "library",
  className,
}: CampaignTemplateChooserProps) {
  const [tab, setTab] = useState<TabKey>(defaultTab)

  const visible = useMemo(() => {
    if (tab === "library") return templates.filter((t) => !t.isPrivate)
    return templates.filter((t) => t.isPrivate)
  }, [templates, tab])

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Campaign template chooser"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Templates</span>
        <div className={styles.tabs} role="tablist" aria-label="Template source">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={styles.tab}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <ul className={styles.grid}>
        {visible.map((template) => (
          <li key={template.id} className={styles.tile}>
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{template.thumbGlyph}</span>
              {template.isPrivate ? (
                <span className={styles.privateBadge}>
                  <Star size={11} strokeWidth={2.4} aria-hidden="true" />
                  Private
                </span>
              ) : null}
            </div>
            <div className={styles.meta}>
              <h3 className={styles.title}>{template.title}</h3>
              <p className={styles.description}>{template.description}</p>
            </div>
            <div className={styles.chips}>
              {template.channels.map((channel) => (
                <Chip
                  key={channel}
                  label={CHANNEL_LABEL[channel]}
                  tone="neutral"
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.cloneButton}
              aria-label={`Clone ${template.title}`}
            >
              <Copy size={13} strokeWidth={2.4} aria-hidden="true" />
              Clone template
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CampaignTemplateChooser
