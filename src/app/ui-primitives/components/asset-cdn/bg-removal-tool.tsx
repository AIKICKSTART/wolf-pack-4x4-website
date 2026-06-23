"use client"

import { useState, type CSSProperties } from "react"

import styles from "./bg-removal-tool.module.css"

interface BgRemovalToolProps {
  /** Subject label rendered on the silhouette. */
  subject?: string
  /** Background colour of the "after" canvas (hex). */
  defaultBackdrop?: string
  /** Feather / edge softness 0-100. */
  defaultFeather?: number
  className?: string
}

interface BgRemovalState {
  position: number
  feather: number
  backdrop: string
}

const SWATCHES: ReadonlyArray<{ id: string; hex: string; label: string }> = [
  { id: "obsidian", hex: "var(--primitive-canvas)", label: "Obsidian" },
  { id: "teal", hex: "color-mix(in oklab, var(--primitive-teal) 30%, var(--primitive-canvas))", label: "Workshop teal" },
  { id: "amber", hex: "color-mix(in oklab, var(--primitive-amber) 22%, var(--primitive-canvas))", label: "Burnt amber" },
  { id: "red", hex: "color-mix(in oklab, var(--primitive-red) 22%, var(--primitive-canvas))", label: "Manta red" },
  { id: "alpha", hex: "transparent", label: "Alpha" },
]

export function BgRemovalTool({
  subject = "Holden HQ Manta",
  defaultBackdrop = "var(--primitive-canvas)",
  defaultFeather = 18,
  className,
}: BgRemovalToolProps) {
  const [state, setState] = useState<BgRemovalState>({
    position: 50,
    feather: defaultFeather,
    backdrop: defaultBackdrop,
  })

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="Background removal preview"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Background removal</span>
        <h3 className={styles.title}>Before · After</h3>
      </header>

      <div
        className={styles.stage}
        style={
          {
            "--reveal": `${state.position}%`,
            "--feather": `${state.feather}px`,
          } as CSSProperties
        }
      >
        <div className={styles.before} aria-hidden="true">
          <span className={styles.beforeGrain} />
          <span className={styles.beforeBlur} />
          <span className={styles.subject}>{subject}</span>
          <span className={styles.cornerLabel}>Before</span>
        </div>

        <div
          className={styles.after}
          style={
            state.backdrop === "transparent"
              ? undefined
              : { backgroundColor: state.backdrop }
          }
          aria-hidden="true"
          data-alpha={state.backdrop === "transparent" ? "true" : "false"}
        >
          <span className={styles.subject} style={{ filter: `drop-shadow(0 12px 24px color-mix(in oklab, var(--primitive-canvas) 60%, transparent))` }}>
            {subject}
          </span>
          <span className={styles.cornerLabel}>After</span>
        </div>

        <div
          className={styles.divider}
          style={{ left: `${state.position}%` }}
          aria-hidden="true"
        >
          <span className={styles.handle} />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={state.position}
          className={styles.scrub}
          aria-label="Reveal slider position"
          onChange={(event) =>
            setState({ ...state, position: Number(event.target.value) })
          }
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>
            Edge feather <em className={styles.controlValue}>{state.feather}px</em>
          </span>
          <input
            type="range"
            min={0}
            max={60}
            value={state.feather}
            className={styles.slider}
            aria-label="Edge feather"
            onChange={(event) =>
              setState({ ...state, feather: Number(event.target.value) })
            }
          />
        </div>

        <fieldset className={styles.swatchFieldset}>
          <legend className={styles.controlLabel}>Backdrop</legend>
          <div className={styles.swatchRow} role="radiogroup" aria-label="After-canvas backdrop">
            {SWATCHES.map((swatch) => {
              const active = state.backdrop === swatch.hex
              return (
                <button
                  key={swatch.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={swatch.label}
                  className={[
                    styles.swatch,
                    swatch.hex === "transparent" ? styles.swatchAlpha : "",
                    active ? styles.swatchOn : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    swatch.hex === "transparent"
                      ? undefined
                      : { backgroundColor: swatch.hex }
                  }
                  onClick={() => setState({ ...state, backdrop: swatch.hex })}
                />
              )
            })}
          </div>
        </fieldset>
      </div>
    </section>
  )
}

export default BgRemovalTool
