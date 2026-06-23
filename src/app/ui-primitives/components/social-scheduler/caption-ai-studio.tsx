"use client"

import { useMemo, useState } from "react"
import type { ChangeEvent } from "react"
import { Sparkles, Wand2, Hash } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { CaptionPreset, HashtagDescriptor } from "./social-scheduler-types"

interface CaptionAiStudioProps {
  presets: ReadonlyArray<CaptionPreset>
  hashtagPool: ReadonlyArray<HashtagDescriptor>
  initialPreset?: string
  initialTone?: number
  initialLength?: number
  initialHook?: number
  onGenerate?: (state: CaptionAiState) => void
  /** Provide a precomputed caption to show in the output panel. */
  draft?: string
}

export interface CaptionAiState {
  presetId: string
  tone: number
  length: number
  hook: number
  hashtags: ReadonlyArray<string>
}

const SLIDER_LABELS = {
  tone: ["Workshop", "Polished"] as const,
  length: ["Punchy", "Long-form"] as const,
  hook: ["Reserved", "High hook"] as const,
}

export function CaptionAiStudio({
  presets,
  hashtagPool,
  initialPreset,
  initialTone = 35,
  initialLength = 45,
  initialHook = 65,
  onGenerate,
  draft,
}: CaptionAiStudioProps) {
  const [presetId, setPresetId] = useState<string>(
    initialPreset ?? presets[0]?.id ?? "",
  )
  const [tone, setTone] = useState(initialTone)
  const [length, setLength] = useState(initialLength)
  const [hook, setHook] = useState(initialHook)
  const [selectedTags, setSelectedTags] = useState<ReadonlySet<string>>(
    () => new Set(hashtagPool.slice(0, 4).map((tag) => tag.tag)),
  )

  const preset = presets.find((p) => p.id === presetId) ?? presets[0]

  const toggleHashtag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const previewCaption = useMemo(() => {
    if (draft) return draft
    if (!preset) return ""
    const opener =
      hook > 70
        ? `STOP scrolling — `
        : hook > 40
          ? `Quick one from the bay: `
          : `Just shipped — `
    const closer = length > 70 ? "\n\nFull walkthrough on the blog (link in bio)." : ""
    return `${opener}${preset.sample}${closer}`
  }, [draft, hook, length, preset])

  const handleGenerate = () => {
    if (!preset) return
    onGenerate?.({
      presetId: preset.id,
      tone,
      length,
      hook,
      hashtags: Array.from(selectedTags),
    })
  }

  return (
    <section
      className={`${styles.frame} ${styles.studio}`}
      aria-label="AI caption studio"
    >
      <header className={styles.studioHead}>
        <h2 className={styles.studioName}>Caption studio</h2>
        <button
          type="button"
          className={`${styles.composerBtn} ${styles.composerBtnPrimary}`}
          onClick={handleGenerate}
        >
          <Wand2 size={13} aria-hidden="true" /> Generate
        </button>
      </header>

      <div className={styles.studioGrid}>
        <div className={styles.studioSliderGroup}>
          <fieldset
            className={styles.studioSlider}
            aria-label="Voice presets"
          >
            <legend className={styles.studioSliderLabel}>
              <span>Voice preset</span>
              {preset && <span>{preset.label}</span>}
            </legend>
            <div className={styles.studioPresets}>
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.studioPreset} ${
                    p.id === presetId ? styles.studioPresetOn : ""
                  }`}
                  aria-pressed={p.id === presetId}
                  title={p.description}
                  onClick={() => setPresetId(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.studioSlider}>
            <label className={styles.studioSliderLabel} htmlFor="caption-tone">
              <span>Tone · {SLIDER_LABELS.tone[0]} ↔ {SLIDER_LABELS.tone[1]}</span>
              <span>{tone}%</span>
            </label>
            <input
              id="caption-tone"
              type="range"
              min={0}
              max={100}
              value={tone}
              className={styles.studioSliderInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTone(Number(event.target.value))
              }
            />
          </div>

          <div className={styles.studioSlider}>
            <label className={styles.studioSliderLabel} htmlFor="caption-length">
              <span>Length · {SLIDER_LABELS.length[0]} ↔ {SLIDER_LABELS.length[1]}</span>
              <span>{length}%</span>
            </label>
            <input
              id="caption-length"
              type="range"
              min={0}
              max={100}
              value={length}
              className={styles.studioSliderInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLength(Number(event.target.value))
              }
            />
          </div>

          <div className={styles.studioSlider}>
            <label className={styles.studioSliderLabel} htmlFor="caption-hook">
              <span>Hook · {SLIDER_LABELS.hook[0]} ↔ {SLIDER_LABELS.hook[1]}</span>
              <span>{hook}%</span>
            </label>
            <input
              id="caption-hook"
              type="range"
              min={0}
              max={100}
              value={hook}
              className={styles.studioSliderInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setHook(Number(event.target.value))
              }
            />
          </div>
        </div>

        <div className={styles.studioOutput}>
          <div className={styles.studioOutputHead}>
            <span>
              <Sparkles size={11} aria-hidden="true" /> Draft output
            </span>
            <span>{previewCaption.length} char</span>
          </div>
          <p className={styles.studioOutputBody}>{previewCaption}</p>
          <div
            className={styles.studioHashtagRow}
            aria-label="Suggested hashtags — click to toggle"
          >
            <span className={styles.composerEyebrow}>
              <Hash size={11} aria-hidden="true" /> Suggested
            </span>
            {hashtagPool.map((tag) => {
              const isOn = selectedTags.has(tag.tag)
              return (
                <button
                  key={tag.tag}
                  type="button"
                  className={styles.studioHashtag}
                  aria-pressed={isOn}
                  style={{ opacity: isOn ? 1 : 0.55 }}
                  onClick={() => toggleHashtag(tag.tag)}
                >
                  {tag.tag}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaptionAiStudio
