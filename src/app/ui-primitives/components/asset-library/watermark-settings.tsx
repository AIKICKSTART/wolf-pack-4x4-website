"use client"

import { useState } from "react"

import {
  WATERMARK_POSITION_ORDER,
  type WatermarkPosition,
} from "./asset-library-types"

import styles from "./watermark-settings.module.css"

interface WatermarkSettingsProps {
  defaultText?: string
  defaultOpacity?: number
  defaultScale?: number
  defaultPosition?: WatermarkPosition
  onChange?: (state: WatermarkState) => void
  className?: string
}

export interface WatermarkState {
  text: string
  /** 0-100. */
  opacity: number
  /** 50-200, percent of natural mark size. */
  scale: number
  position: WatermarkPosition
}

const POSITION_LABEL: Record<WatermarkPosition, string> = {
  "top-left": "Top left",
  "top-center": "Top centre",
  "top-right": "Top right",
  "middle-left": "Middle left",
  "middle-center": "Middle centre",
  "middle-right": "Middle right",
  "bottom-left": "Bottom left",
  "bottom-center": "Bottom centre",
  "bottom-right": "Bottom right",
}

const POSITION_CLASS: Record<WatermarkPosition, string> = {
  "top-left": styles.posTopLeft,
  "top-center": styles.posTopCenter,
  "top-right": styles.posTopRight,
  "middle-left": styles.posMiddleLeft,
  "middle-center": styles.posMiddleCenter,
  "middle-right": styles.posMiddleRight,
  "bottom-left": styles.posBottomLeft,
  "bottom-center": styles.posBottomCenter,
  "bottom-right": styles.posBottomRight,
}

export function WatermarkSettings({
  defaultText = "Oak Flats Mufflermen",
  defaultOpacity = 60,
  defaultScale = 100,
  defaultPosition = "bottom-right",
  onChange,
  className,
}: WatermarkSettingsProps) {
  const [text, setText] = useState<string>(defaultText)
  const [opacity, setOpacity] = useState<number>(defaultOpacity)
  const [scale, setScale] = useState<number>(defaultScale)
  const [position, setPosition] = useState<WatermarkPosition>(defaultPosition)

  const emit = (next: Partial<WatermarkState>) => {
    const merged: WatermarkState = {
      text: next.text ?? text,
      opacity: next.opacity ?? opacity,
      scale: next.scale ?? scale,
      position: next.position ?? position,
    }
    onChange?.(merged)
  }

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="Watermark settings"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Watermark</span>
        <h3 className={styles.title}>Editor</h3>
      </header>

      <div className={styles.body}>
        <div className={styles.controls}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Text</span>
            <input
              className={styles.input}
              type="text"
              value={text}
              maxLength={48}
              onChange={(event) => {
                const v = event.target.value
                setText(v)
                emit({ text: v })
              }}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Opacity <span className={styles.fieldValue}>{opacity}%</span>
            </span>
            <input
              className={styles.range}
              type="range"
              min={0}
              max={100}
              step={1}
              value={opacity}
              onChange={(event) => {
                const v = Number(event.target.value)
                setOpacity(v)
                emit({ opacity: v })
              }}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>
              Scale <span className={styles.fieldValue}>{scale}%</span>
            </span>
            <input
              className={styles.range}
              type="range"
              min={50}
              max={200}
              step={5}
              value={scale}
              onChange={(event) => {
                const v = Number(event.target.value)
                setScale(v)
                emit({ scale: v })
              }}
            />
          </label>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Position</span>
            <div
              className={styles.positionGrid}
              role="radiogroup"
              aria-label="Watermark position"
            >
              {WATERMARK_POSITION_ORDER.map((pos) => {
                const isSelected = pos === position
                return (
                  <button
                    key={pos}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={POSITION_LABEL[pos]}
                    className={[
                      styles.positionCell,
                      isSelected ? styles.positionCellSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setPosition(pos)
                      emit({ position: pos })
                    }}
                  >
                    <span aria-hidden="true">●</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={[styles.preview, POSITION_CLASS[position]]
            .filter(Boolean)
            .join(" ")}
          aria-label="Watermark preview"
        >
          <div className={styles.previewMedia} aria-hidden="true">
            <span className={styles.previewLabel}>PREVIEW</span>
          </div>
          <span
            className={styles.mark}
            style={{
              opacity: opacity / 100,
              ["--mark-scale" as string]: `${scale / 100}`,
            }}
          >
            {text || "—"}
          </span>
        </div>
      </div>
    </section>
  )
}

export default WatermarkSettings
