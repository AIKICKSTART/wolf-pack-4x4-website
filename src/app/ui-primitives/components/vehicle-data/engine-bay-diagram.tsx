"use client"

import { useId, useMemo, useState } from "react"

import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./engine-bay-diagram.module.css"

export interface EngineBayComponent {
  id: string
  /** Component label (e.g. "Battery", "Turbocharger"). */
  label: string
  /** Two-line description rendered when the callout is selected. */
  description?: string
  /** SVG coordinate of the callout (within 0..100 on both axes). */
  point: { x: number; y: number }
  /** Tone used for the swatch + callout pin. */
  tone?: ChipTone
}

interface EngineBayDiagramProps {
  components: ReadonlyArray<EngineBayComponent>
  /** Vehicle label for the ARIA description. */
  vehicleLabel?: string
  className?: string
}

const DEFAULT_TONE: ChipTone = "teal"

const TONE_PIN: Record<ChipTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

export function EngineBayDiagram({
  components,
  vehicleLabel,
  className,
}: EngineBayDiagramProps) {
  const titleId = useId()
  const descId = useId()
  const [active, setActive] = useState<string | null>(components[0]?.id ?? null)

  const classes = useMemo(
    () => [styles.shell, className].filter(Boolean).join(" "),
    [className],
  )

  const activeComponent = components.find((c) => c.id === active) ?? components[0]

  return (
    <section className={classes} aria-label="Engine bay diagram">
      <header className={styles.head}>
        <span className={styles.kicker}>Engine bay diagram</span>
        <h2 className={styles.title}>Click a callout</h2>
      </header>

      <div className={styles.canvasWrap}>
        <svg
          viewBox="0 0 200 130"
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className={styles.canvas}
        >
          <title id={titleId}>
            Engine bay diagram{vehicleLabel ? ` for ${vehicleLabel}` : ""}
          </title>
          <desc id={descId}>
            Top-down schematic of the engine bay with {components.length}{" "}
            interactive callouts. Use Tab to move between them.
          </desc>

          {/* Bay outer chassis */}
          <rect
            x={6}
            y={6}
            width={188}
            height={118}
            rx={10}
            ry={10}
            fill="var(--primitive-recessed)"
            stroke="var(--primitive-line)"
            strokeWidth={0.6}
          />

          {/* Firewall */}
          <rect
            x={6}
            y={100}
            width={188}
            height={6}
            fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
          />

          {/* Engine block */}
          <rect
            x={62}
            y={32}
            width={76}
            height={56}
            rx={6}
            ry={6}
            fill="color-mix(in oklab, var(--primitive-teal) 6%, transparent)"
            stroke="var(--primitive-line-strong)"
            strokeWidth={0.6}
          />
          {/* Engine ribs */}
          {[40, 50, 60, 70, 80].map((y) => (
            <line
              key={y}
              x1={66}
              x2={134}
              y1={y}
              y2={y}
              stroke="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)"
              strokeWidth={0.4}
            />
          ))}

          {/* Intake manifold pipe */}
          <rect
            x={62}
            y={22}
            width={36}
            height={8}
            rx={3}
            ry={3}
            fill="color-mix(in oklab, var(--primitive-green) 16%, transparent)"
            stroke="color-mix(in oklab, var(--primitive-green) 32%, transparent)"
            strokeWidth={0.4}
          />

          {/* Battery */}
          <rect
            x={16}
            y={20}
            width={26}
            height={20}
            rx={2}
            ry={2}
            fill="color-mix(in oklab, var(--primitive-amber) 18%, transparent)"
            stroke="color-mix(in oklab, var(--primitive-amber) 42%, transparent)"
            strokeWidth={0.5}
          />

          {/* Coolant reservoir */}
          <ellipse
            cx={162}
            cy={36}
            rx={14}
            ry={10}
            fill="color-mix(in oklab, var(--primitive-teal) 16%, transparent)"
            stroke="color-mix(in oklab, var(--primitive-teal) 40%, transparent)"
            strokeWidth={0.5}
          />

          {/* Radiator */}
          <rect
            x={20}
            y={108}
            width={160}
            height={10}
            rx={2}
            ry={2}
            fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
            stroke="var(--primitive-line)"
            strokeWidth={0.4}
          />
          {Array.from({ length: 20 }, (_, idx) => (
            <line
              key={idx}
              x1={22 + idx * 8}
              x2={22 + idx * 8}
              y1={108}
              y2={118}
              stroke="color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)"
              strokeWidth={0.3}
            />
          ))}

          {/* Pins */}
          {components.map((component) => {
            const isActive = component.id === activeComponent?.id
            const tone = component.tone ?? DEFAULT_TONE
            return (
              <g key={component.id}>
                <circle
                  cx={component.point.x * 2}
                  cy={component.point.y * 1.3}
                  r={isActive ? 4.6 : 3.4}
                  fill={TONE_PIN[tone]}
                  opacity={isActive ? 0.92 : 0.7}
                />
                <circle
                  cx={component.point.x * 2}
                  cy={component.point.y * 1.3}
                  r={isActive ? 7.6 : 6}
                  fill="none"
                  stroke={TONE_PIN[tone]}
                  strokeOpacity={isActive ? 0.32 : 0.18}
                  strokeWidth={0.6}
                />
              </g>
            )
          })}
        </svg>

        <ul className={styles.callouts}>
          {components.map((component) => {
            const isActive = component.id === activeComponent?.id
            return (
              <li key={component.id}>
                <button
                  type="button"
                  className={[
                    styles.callout,
                    isActive ? styles.calloutActive : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{
                    left: `${component.point.x}%`,
                    top: `${component.point.y}%`,
                  }}
                  aria-pressed={isActive}
                  aria-label={`${component.label}${component.description ? ` — ${component.description}` : ""}`}
                  onClick={() => setActive(component.id)}
                >
                  <span className={styles.calloutPin} aria-hidden="true" />
                  <span className={styles.calloutLabel}>{component.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {activeComponent ? (
        <footer className={styles.detail} aria-live="polite">
          <Chip
            label={activeComponent.label}
            tone={activeComponent.tone ?? DEFAULT_TONE}
          />
          {activeComponent.description ? (
            <p className={styles.detailBody}>{activeComponent.description}</p>
          ) : null}
        </footer>
      ) : null}
    </section>
  )
}

export default EngineBayDiagram
