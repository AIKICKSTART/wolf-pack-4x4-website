"use client"

import { useState } from "react"

import styles from "./watermark-config-card.module.css"

export type WatermarkKind = "logo" | "text"

export type WatermarkAnchor =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"

export interface WatermarkSettings {
  kind: WatermarkKind
  text: string
  /** 0-100. */
  opacity: number
  anchor: WatermarkAnchor
  /** 0-100, percent of canvas width. */
  scale: number
}

interface WatermarkConfigCardProps {
  defaultSettings?: WatermarkSettings
  onChange?: (settings: WatermarkSettings) => void
  className?: string
}

const DEFAULT_SETTINGS: WatermarkSettings = {
  kind: "logo",
  text: "OFM",
  opacity: 72,
  anchor: "bottom-right",
  scale: 18,
}

const ANCHOR_ORDER: ReadonlyArray<WatermarkAnchor> = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "center",
]

const ANCHOR_LABEL: Record<WatermarkAnchor, string> = {
  "top-left": "TL",
  "top-right": "TR",
  "bottom-left": "BL",
  "bottom-right": "BR",
  center: "·",
}

const ANCHOR_STYLE: Record<WatermarkAnchor, { top?: string; bottom?: string; left?: string; right?: string; transform?: string }> = {
  "top-left": { top: "8%", left: "8%" },
  "top-right": { top: "8%", right: "8%" },
  "bottom-left": { bottom: "8%", left: "8%" },
  "bottom-right": { bottom: "8%", right: "8%" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
}

export function WatermarkConfigCard({
  defaultSettings = DEFAULT_SETTINGS,
  onChange,
  className,
}: WatermarkConfigCardProps) {
  const [settings, setSettings] = useState<WatermarkSettings>(defaultSettings)

  const emit = (next: WatermarkSettings) => {
    setSettings(next)
    onChange?.(next)
  }

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label="Watermark configuration"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>CDN · Watermark</span>
        <div className={styles.kindRow} role="radiogroup" aria-label="Watermark kind">
          <button
            type="button"
            role="radio"
            aria-checked={settings.kind === "logo"}
            className={[styles.kindBtn, settings.kind === "logo" ? styles.kindOn : ""].filter(Boolean).join(" ")}
            onClick={() => emit({ ...settings, kind: "logo" })}
          >
            Logo
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={settings.kind === "text"}
            className={[styles.kindBtn, settings.kind === "text" ? styles.kindOn : ""].filter(Boolean).join(" ")}
            onClick={() => emit({ ...settings, kind: "text" })}
          >
            Text
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.previewWrap}>
          <div className={styles.preview}>
            <span className={styles.previewBg} aria-hidden="true" />
            <span
              className={styles.mark}
              style={{
                ...ANCHOR_STYLE[settings.anchor],
                opacity: settings.opacity / 100,
                fontSize: `${Math.max(10, settings.scale * 1.6)}px`,
              }}
              aria-hidden="true"
            >
              {settings.kind === "logo" ? "▴" : null}{" "}
              {settings.text}
            </span>
          </div>
          <span className={styles.previewCaption}>
            Live preview · {settings.opacity}% opacity · {settings.scale}% scale
          </span>
        </div>

        <div className={styles.controls}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Text</span>
            <input
              className={styles.input}
              type="text"
              value={settings.text}
              maxLength={48}
              onChange={(event) => emit({ ...settings, text: event.target.value })}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Opacity <em className={styles.value}>{settings.opacity}%</em>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={settings.opacity}
              className={styles.slider}
              onChange={(event) => emit({ ...settings, opacity: Number(event.target.value) })}
              aria-label="Watermark opacity"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Scale <em className={styles.value}>{settings.scale}%</em>
            </span>
            <input
              type="range"
              min={5}
              max={40}
              value={settings.scale}
              className={styles.slider}
              onChange={(event) => emit({ ...settings, scale: Number(event.target.value) })}
              aria-label="Watermark scale"
            />
          </label>

          <fieldset className={styles.fieldset}>
            <legend className={styles.fieldLabel}>Anchor</legend>
            <div className={styles.anchorGrid} role="radiogroup" aria-label="Watermark anchor">
              {ANCHOR_ORDER.map((anchor) => {
                const active = settings.anchor === anchor
                return (
                  <button
                    key={anchor}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={anchor.replace("-", " ")}
                    className={[styles.anchorBtn, active ? styles.anchorOn : ""].filter(Boolean).join(" ")}
                    data-anchor={anchor}
                    onClick={() => emit({ ...settings, anchor })}
                  >
                    {ANCHOR_LABEL[anchor]}
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  )
}

export default WatermarkConfigCard
