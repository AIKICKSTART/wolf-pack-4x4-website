"use client"

import { Palette, ShieldCheck } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import type { CSSProperties } from "react"

import { GlassSurface } from "../surfaces"

import type {
  ContrastResult,
  ContrastVerdict,
  OklchColor,
  PaletteSwatch,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface PaletteBuilderProps {
  swatches: ReadonlyArray<PaletteSwatch>
  defaultSelectedId?: string
  /** Background to evaluate contrast against. Defaults to first surface swatch. */
  defaultBackgroundId?: string
  className?: string
}

const VERDICT_CLASS: Record<ContrastVerdict, string> = {
  aaa: styles.verdictAaa,
  aa: styles.verdictAa,
  "aa-large": styles.verdictAaLarge,
  fail: styles.verdictFail,
}

const VERDICT_LABEL: Record<ContrastVerdict, string> = {
  aaa: "AAA",
  aa: "AA",
  "aa-large": "AA Large",
  fail: "Fail",
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const value = hex.replace("#", "")
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.padEnd(6, "0").slice(0, 6)
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  }
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const channel = (raw: number) => {
    const v = raw / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrastRatio(foreground: string, background: string): number {
  const lFg = relativeLuminance(foreground)
  const lBg = relativeLuminance(background)
  const [light, dark] = lFg > lBg ? [lFg, lBg] : [lBg, lFg]
  return (light + 0.05) / (dark + 0.05)
}

function computeContrast(foreground: string, background: string): ContrastResult {
  const ratio = contrastRatio(foreground, background)
  let verdict: ContrastVerdict = "fail"
  if (ratio >= 7) verdict = "aaa"
  else if (ratio >= 4.5) verdict = "aa"
  else if (ratio >= 3) verdict = "aa-large"
  return {
    ratio,
    verdict,
    largeText: ratio >= 3 && ratio < 4.5,
    foreground,
    background,
  }
}

function oklchToCss({ l, c, h }: OklchColor): string {
  return `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(2)} ${h.toFixed(1)})`
}

/**
 * Palette builder with an OKLCH-driven wheel preview and a live contrast
 * check against a chosen background swatch. The wheel is decorative SVG —
 * its angle and radius reflect the selected swatch's hue and chroma so the
 * user can read perceptual relationships at a glance.
 */
export function PaletteBuilder({
  swatches,
  defaultSelectedId,
  defaultBackgroundId,
  className,
}: PaletteBuilderProps) {
  const initialSelected =
    swatches.find((s) => s.id === defaultSelectedId) ?? swatches[0]
  const initialBackground =
    swatches.find((s) => s.id === defaultBackgroundId) ??
    swatches.find((s) => s.role === "surface") ??
    swatches[swatches.length - 1]

  const [selectedId, setSelectedId] = useState<string>(initialSelected.id)
  const [backgroundId, setBackgroundId] = useState<string>(initialBackground.id)

  const selected = useMemo(
    () => swatches.find((s) => s.id === selectedId) ?? initialSelected,
    [swatches, selectedId, initialSelected]
  )
  const background = useMemo(
    () => swatches.find((s) => s.id === backgroundId) ?? initialBackground,
    [swatches, backgroundId, initialBackground]
  )

  const contrast = useMemo(
    () => computeContrast(selected.hex, background.hex),
    [selected.hex, background.hex]
  )

  const handleSelect = useCallback((id: string) => setSelectedId(id), [])
  const handleSwapBackground = useCallback((id: string) => setBackgroundId(id), [])

  const wheelSize = 140
  const wheelRadius = wheelSize / 2 - 12

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label="Palette builder"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Palette size={12} aria-hidden="true" /> Umbrella · Palette
          </span>
          <h3 className={styles.title}>Palette builder</h3>
          <p className={styles.subtitle}>
            OKLCH-aware preview with live WCAG contrast against your chosen surface.
          </p>
        </div>
        <span className={`${styles.verdict} ${VERDICT_CLASS[contrast.verdict]}`}>
          <ShieldCheck size={11} aria-hidden="true" />
          {VERDICT_LABEL[contrast.verdict]} · {contrast.ratio.toFixed(2)}:1
        </span>
      </header>

      <div className={styles.grid2}>
        <GlassSurface tone="obsidian" intensity="low">
          <div className={styles.livePreview} style={{ minHeight: 220 }}>
            <span className={styles.tinyLabel}>OKLCH preview</span>
            <svg
              viewBox={`0 0 ${wheelSize} ${wheelSize}`}
              width={wheelSize}
              height={wheelSize}
              role="img"
              aria-label="OKLCH wheel with palette positions"
            >
              <defs>
                <radialGradient id="palette-bg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={background.hex} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={background.hex} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle
                cx={wheelSize / 2}
                cy={wheelSize / 2}
                r={wheelRadius}
                fill="url(#palette-bg)"
                stroke="var(--primitive-line)"
                strokeWidth={1}
              />
              {swatches.map((swatch) => {
                const angle = (swatch.oklch.h * Math.PI) / 180
                const r = wheelRadius * Math.min(1, swatch.oklch.c * 4)
                const cx = wheelSize / 2 + Math.cos(angle) * r
                const cy = wheelSize / 2 + Math.sin(angle) * r
                const isSelected = swatch.id === selected.id
                return (
                  <circle
                    key={swatch.id}
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 5}
                    fill={swatch.hex}
                    stroke={
                      isSelected
                        ? "var(--primitive-text-strong)"
                        : "color-mix(in oklab, var(--primitive-text-strong) 55%, transparent)"
                    }
                    strokeWidth={isSelected ? 2 : 1}
                  />
                )
              })}
            </svg>
            <p className={styles.livePreviewBody}>
              <strong style={{ color: selected.hex }}>{selected.label}</strong>{" "}
              · {oklchToCss(selected.oklch)}
            </p>
          </div>
        </GlassSurface>

        <div className={styles.list}>
          <span className={styles.tinyLabel}>Palette swatches</span>
          {swatches.map((swatch) => {
            const swatchSelected = swatch.id === selected.id
            const swatchBackground = swatch.id === background.id
            return (
              <div key={swatch.id} className={styles.row}>
                <span
                  className={styles.swatch}
                  style={{ background: swatch.hex } as CSSProperties}
                  aria-hidden="true"
                />
                <div className={styles.rowMain}>
                  <strong>{swatch.label}</strong>
                  <span>
                    {swatch.hex} · {swatch.role}
                  </span>
                </div>
                <div className={styles.flex}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    aria-pressed={swatchSelected}
                    onClick={() => handleSelect(swatch.id)}
                  >
                    Foreground
                  </button>
                  <button
                    type="button"
                    className={styles.actionButton}
                    aria-pressed={swatchBackground}
                    onClick={() => handleSwapBackground(swatch.id)}
                  >
                    Surface
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        className={styles.livePreview}
        role="region"
        aria-label="Contrast verdict preview"
        style={
          {
            background: background.hex,
            color: selected.hex,
            borderColor: selected.hex,
          } as CSSProperties
        }
      >
        <span className={styles.tinyLabel} style={{ color: selected.hex }}>
          Contrast preview
        </span>
        <p style={{ color: selected.hex, fontSize: "var(--primitive-text-xl)", margin: 0, lineHeight: 1.3 }}>
          The Mufflermen badge stays legible on every supported surface.
        </p>
        <p style={{ color: selected.hex, opacity: 0.78, fontSize: "var(--primitive-text-sm)", margin: 0 }}>
          Body copy at 13/1.5 over {background.label} — {contrast.ratio.toFixed(2)}:1.
        </p>
      </div>
    </article>
  )
}

export default PaletteBuilder
