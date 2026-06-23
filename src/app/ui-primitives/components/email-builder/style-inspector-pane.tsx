"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { ThemeController } from "../theming/theme-controller"
import { TokenColorPicker } from "../theming/token-color-picker"
import { TokenFontPicker } from "../theming/token-font-picker"

import type {
  AlignmentValue,
  EmailBlock,
  EmailBlockKind,
} from "./email-builder-types"
import styles from "./style-inspector-pane.module.css"

interface StyleInspectorPaneProps {
  /** Currently selected block — drives the title + state of the inspector. */
  block: EmailBlock
  /** Padding default (16-48 px). */
  defaultPadding?: number
  /** Initial alignment. */
  defaultAlignment?: AlignmentValue
  className?: string
}

const ALIGNMENTS: ReadonlyArray<AlignmentValue> = ["left", "center", "right"]

const KIND_LABEL: Record<EmailBlockKind, string> = {
  heading: "Heading block",
  image: "Image block",
  button: "Button block",
  divider: "Divider",
  "columns-2": "Two-column row",
  "columns-3": "Three-column row",
  "social-row": "Social row",
  spacer: "Spacer",
  footer: "Footer block",
  html: "Custom HTML",
  personalization: "Personalisation token",
}

export function StyleInspectorPane({
  block,
  defaultPadding = 24,
  defaultAlignment = "left",
  className,
}: StyleInspectorPaneProps) {
  const [padding, setPadding] = useState<number>(defaultPadding)
  const [margin, setMargin] = useState<number>(8)
  const [align, setAlign] = useState<AlignmentValue>(defaultAlignment)

  const classes = [styles.pane, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${block.label} style inspector`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Style inspector</span>
        <h3 className={styles.title}>{block.label}</h3>
        <span className={styles.subtitle}>{KIND_LABEL[block.kind]}</span>
      </header>

      <ThemeController initialPresetId="mufflermen-classic">
        <div className={styles.group}>
          <span className={styles.groupLabel}>Colour</span>
          <TokenColorPicker tokenId="amber" />
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Typography</span>
          <TokenFontPicker tokenId="font-display" />
        </div>
      </ThemeController>

      <div className={styles.group}>
        <label className={styles.sliderLabel} htmlFor="email-builder-padding">
          <span>Padding</span>
          <span className={styles.sliderValue}>{padding}px</span>
        </label>
        <input
          id="email-builder-padding"
          type="range"
          min={0}
          max={64}
          step={2}
          value={padding}
          onChange={(event) => setPadding(Number(event.target.value))}
          className={styles.slider}
          aria-label={`${block.label} padding`}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.sliderLabel} htmlFor="email-builder-margin">
          <span>Margin</span>
          <span className={styles.sliderValue}>{margin}px</span>
        </label>
        <input
          id="email-builder-margin"
          type="range"
          min={0}
          max={48}
          step={2}
          value={margin}
          onChange={(event) => setMargin(Number(event.target.value))}
          className={styles.slider}
          aria-label={`${block.label} margin`}
        />
      </div>

      <div className={styles.group}>
        <span className={styles.groupLabel}>Alignment</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="Block alignment">
          {ALIGNMENTS.map((option) => (
            <Chip
              key={option}
              label={option.charAt(0).toUpperCase() + option.slice(1)}
              tone={align === option ? "amber" : "neutral"}
              selected={align === option}
              onSelect={() => setAlign(option)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
