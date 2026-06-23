"use client"

import { useId, useMemo, useState, type ReactNode } from "react"

import styles from "./logo-mark-builder.module.css"

type ShapeId = "circle" | "shield" | "hex" | "diamond" | "rounded-square" | "ring"
type ToneId = "red" | "amber" | "teal" | "graphite" | "chrome"
type StrokeId = "solid" | "outline" | "double"

interface ShapeOption {
  id: ShapeId
  label: string
  path: string
}

interface ToneOption {
  id: ToneId
  label: string
  fill: string
  stroke: string
  text: string
}

interface StrokeOption {
  id: StrokeId
  label: string
  fillOpacity: number
  strokeWidth: number
  innerOffset: number
}

const SHAPES: ReadonlyArray<ShapeOption> = [
  { id: "circle", label: "Circle", path: "M50 8 A42 42 0 1 1 49.99 8 Z" },
  {
    id: "shield",
    label: "Shield",
    path: "M50 6 L88 18 L84 56 Q84 78 50 92 Q16 78 16 56 L12 18 Z",
  },
  {
    id: "hex",
    label: "Hex",
    path: "M50 8 L86 28 L86 70 L50 90 L14 70 L14 28 Z",
  },
  {
    id: "diamond",
    label: "Diamond",
    path: "M50 8 L88 50 L50 92 L12 50 Z",
  },
  {
    id: "rounded-square",
    label: "Block",
    path: "M22 12 L78 12 Q90 12 90 24 L90 76 Q90 88 78 88 L22 88 Q10 88 10 76 L10 24 Q10 12 22 12 Z",
  },
  {
    id: "ring",
    label: "Ring",
    path: "M50 8 A42 42 0 1 1 49.99 8 M50 22 A28 28 0 1 0 50.01 22 Z",
  },
]

const AMBER_INK = "color-mix(in oklab, var(--primitive-amber) 20%, var(--primitive-canvas))"
const TEAL_INK = "color-mix(in oklab, var(--primitive-teal) 18%, var(--primitive-canvas))"
const GRAPHITE = "color-mix(in oklab, var(--primitive-canvas) 80%, var(--primitive-text-strong))"
const CHROME = "color-mix(in oklab, var(--primitive-muted) 55%, var(--primitive-text-strong))"

const TONES: ReadonlyArray<ToneOption> = [
  { id: "red", label: "Workshop red", fill: "var(--primitive-red)", stroke: "var(--primitive-text-on-accent)", text: "var(--primitive-text-on-accent)" },
  { id: "amber", label: "Bay amber", fill: "var(--primitive-amber)", stroke: AMBER_INK, text: AMBER_INK },
  { id: "teal", label: "Diagnostic teal", fill: "var(--primitive-teal)", stroke: TEAL_INK, text: TEAL_INK },
  { id: "graphite", label: "Graphite", fill: GRAPHITE, stroke: "var(--primitive-code-fg)", text: "var(--primitive-code-fg)" },
  { id: "chrome", label: "Chrome", fill: CHROME, stroke: GRAPHITE, text: GRAPHITE },
]

const STROKES: ReadonlyArray<StrokeOption> = [
  { id: "solid", label: "Solid", fillOpacity: 1, strokeWidth: 0, innerOffset: 0 },
  { id: "outline", label: "Outline", fillOpacity: 0, strokeWidth: 4, innerOffset: 0 },
  { id: "double", label: "Double", fillOpacity: 1, strokeWidth: 1.6, innerOffset: 8 },
]

export function LogoMarkBuilder() {
  const [shape, setShape] = useState<ShapeId>(SHAPES[0].id)
  const [tone, setTone] = useState<ToneId>(TONES[0].id)
  const [stroke, setStroke] = useState<StrokeId>(STROKES[0].id)
  const titleId = useId()

  const activeShape = useMemo(() => SHAPES.find((entry) => entry.id === shape) ?? SHAPES[0], [shape])
  const activeTone = useMemo(() => TONES.find((entry) => entry.id === tone) ?? TONES[0], [tone])
  const activeStroke = useMemo(() => STROKES.find((entry) => entry.id === stroke) ?? STROKES[0], [stroke])

  const previewLabel = `${activeTone.label} ${activeShape.label} mark, ${activeStroke.label} treatment`

  return (
    <section className={styles.wrapper} aria-label="Logo mark builder">
      <div className={styles.preview}>
        <svg
          viewBox="0 0 100 100"
          className={styles.previewSvg}
          role="img"
          aria-labelledby={titleId}
          focusable="false"
        >
          <title id={titleId}>{previewLabel}</title>
          <path
            d={activeShape.path}
            fill={activeTone.fill}
            fillOpacity={activeStroke.fillOpacity}
            stroke={activeTone.stroke}
            strokeWidth={activeStroke.strokeWidth}
            strokeLinejoin="round"
          />
          {activeStroke.innerOffset > 0 ? (
            <path
              d={activeShape.path}
              fill="none"
              stroke={activeTone.stroke}
              strokeOpacity="0.6"
              strokeWidth="1"
              transform={`translate(${activeStroke.innerOffset / 2} ${activeStroke.innerOffset / 2}) scale(${(100 - activeStroke.innerOffset) / 100})`}
            />
          ) : null}
          <text
            x="50"
            y="56"
            textAnchor="middle"
            fontSize="20"
            fontFamily="var(--primitive-font-display)"
            fontWeight="400"
            fill={activeTone.text}
            letterSpacing="0.04em"
          >
            OFM
          </text>
        </svg>
        <span className={styles.previewMeta}>{previewLabel}</span>
      </div>
      <div className={styles.controls}>
        <Group label="Shape">
          {SHAPES.map((option) => (
            <Pill
              key={option.id}
              label={option.label}
              active={option.id === shape}
              onSelect={() => setShape(option.id)}
            >
              <ShapeThumb path={option.path} />
            </Pill>
          ))}
        </Group>
        <Group label="Tone">
          {TONES.map((option) => (
            <Pill
              key={option.id}
              label={option.label}
              active={option.id === tone}
              onSelect={() => setTone(option.id)}
            >
              <span className={styles.toneSwatch} style={{ background: option.fill }} aria-hidden="true" />
            </Pill>
          ))}
        </Group>
        <Group label="Stroke">
          {STROKES.map((option) => (
            <Pill
              key={option.id}
              label={option.label}
              active={option.id === stroke}
              onSelect={() => setStroke(option.id)}
            />
          ))}
        </Group>
      </div>
    </section>
  )
}

interface GroupProps {
  label: string
  children: ReactNode
}

function Group({ label, children }: GroupProps) {
  return (
    <div className={styles.group} role="group" aria-label={label}>
      <span className={styles.groupLabel}>{label}</span>
      <div className={styles.groupRow}>{children}</div>
    </div>
  )
}

interface PillProps {
  label: string
  active: boolean
  onSelect: () => void
  children?: ReactNode
}

function Pill({ label, active, onSelect, children }: PillProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`${styles.pill} ${active ? styles.pillActive : ""}`}
    >
      {children ? <span className={styles.pillIcon}>{children}</span> : null}
      <span>{label}</span>
    </button>
  )
}

function ShapeThumb({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 100 100" className={styles.shapeThumb} aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}
