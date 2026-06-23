"use client"

import { Crop, Sparkles } from "lucide-react"
import type { CSSProperties } from "react"
import { useId, useState } from "react"

import { Chip } from "../primitives"
import { GlassSurface } from "../surfaces"

import {
  studioToneToChip,
  type CoverSuggestion,
} from "./content-studio-types"
import styles from "./cover-art-studio.module.css"

interface CoverArtStudioProps {
  coverAlt: string
  /** 0–100 — horizontal focal point. */
  focalX?: number
  /** 0–100 — vertical focal point. */
  focalY?: number
  /** AI cover suggestions. */
  suggestions: ReadonlyArray<CoverSuggestion>
  /** Active aspect ratio (16:9, 4:5, 1:1). */
  defaultRatio?: "16:9" | "4:5" | "1:1"
  /** Optional thumbnail src for the existing cover. */
  previewSrc?: string
  className?: string
}

const RATIO_OPTIONS: ReadonlyArray<{ id: "16:9" | "4:5" | "1:1"; label: string }> = [
  { id: "16:9", label: "16:9 web hero" },
  { id: "4:5", label: "4:5 social" },
  { id: "1:1", label: "1:1 square" },
]

const RATIO_STYLE: Record<"16:9" | "4:5" | "1:1", string> = {
  "16:9": "16 / 9",
  "4:5": "4 / 5",
  "1:1": "1 / 1",
}

export function CoverArtStudio({
  coverAlt,
  focalX = 50,
  focalY = 50,
  suggestions,
  defaultRatio = "16:9",
  previewSrc,
  className,
}: CoverArtStudioProps) {
  const studioId = useId()
  const [ratio, setRatio] = useState<"16:9" | "4:5" | "1:1">(defaultRatio)
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(suggestions[0]?.id ?? null)
  const classes = [styles.studio, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <div className={styles.shell} id={studioId}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Cover art studio</span>
            <h2 className={styles.title}>Crop · focal point · AI suggestions</h2>
          </div>
          <div className={styles.ratio} role="radiogroup" aria-label="Aspect ratio">
            {RATIO_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={option.id === ratio}
                className={[styles.ratioBtn, option.id === ratio ? styles.ratioBtnActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setRatio(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </header>

        <div className={styles.layout}>
          <div
            className={styles.cropFrame}
            style={
              {
                aspectRatio: RATIO_STYLE[ratio],
                backgroundImage: previewSrc ? `url(${previewSrc})` : undefined,
                backgroundPosition: `${focalX}% ${focalY}%`,
              } as CSSProperties
            }
            role="img"
            aria-label={coverAlt}
          >
            <div className={styles.cropGrid} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div
              className={styles.focalPin}
              style={{ left: `${focalX}%`, top: `${focalY}%` }}
              aria-label={`Focal point at ${focalX}% horizontal, ${focalY}% vertical`}
              tabIndex={0}
              role="button"
            >
              <span className={styles.focalCore} />
            </div>
            <div className={styles.cornerBracket} data-pos="tl" aria-hidden="true" />
            <div className={styles.cornerBracket} data-pos="tr" aria-hidden="true" />
            <div className={styles.cornerBracket} data-pos="bl" aria-hidden="true" />
            <div className={styles.cornerBracket} data-pos="br" aria-hidden="true" />
          </div>

          <div className={styles.sidebar}>
            <div className={styles.altRow}>
              <span className={styles.altLabel}>
                <Crop size={11} strokeWidth={2.4} aria-hidden="true" /> Alt text
              </span>
              <p className={styles.altText}>{coverAlt}</p>
            </div>

            <div className={styles.suggestions} role="listbox" aria-label="AI cover suggestions">
              <span className={styles.suggestionsHead}>
                <Sparkles size={11} strokeWidth={2.4} aria-hidden="true" /> AI suggestions
              </span>
              <ul className={styles.suggestionList}>
                {suggestions.map((s) => {
                  const isActive = s.id === activeSuggestion
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        className={[
                          styles.suggestion,
                          isActive ? styles.suggestionActive : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => setActiveSuggestion(s.id)}
                      >
                        <span className={styles.suggestionLabel}>{s.label}</span>
                        <span className={styles.suggestionPrompt}>{s.prompt}</span>
                        <Chip
                          label={s.tone}
                          tone={studioToneToChip(s.tone)}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlassSurface>
  )
}

export default CoverArtStudio
