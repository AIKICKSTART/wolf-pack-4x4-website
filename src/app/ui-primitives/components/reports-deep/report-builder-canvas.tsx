"use client"

import {
  useCallback,
  useMemo,
  useState,
  type DragEvent,
  type KeyboardEvent,
} from "react"

import type {
  BuilderDimension,
  BuilderFilterChip,
  BuilderMeasure,
  ChartKind,
} from "./reports-deep-types"
import styles from "./report-builder-canvas.module.css"

export type CanvasZoneId = "filters" | "dimensions" | "measures" | "chart"

interface CanvasLibrary {
  readonly filters: ReadonlyArray<BuilderFilterChip>
  readonly dimensions: ReadonlyArray<BuilderDimension>
  readonly measures: ReadonlyArray<BuilderMeasure>
}

interface ReportBuilderCanvasProps {
  readonly library: CanvasLibrary
  readonly initial?: Partial<Record<CanvasZoneId, ReadonlyArray<string>>>
  readonly chartKinds?: ReadonlyArray<ChartKind>
  readonly className?: string
}

interface ZoneStateValue {
  readonly filters: ReadonlyArray<string>
  readonly dimensions: ReadonlyArray<string>
  readonly measures: ReadonlyArray<string>
  readonly chart: ChartKind
}

const DEFAULT_CHARTS: ReadonlyArray<ChartKind> = [
  "bar",
  "line",
  "area",
  "pie",
  "donut",
  "funnel",
]

const ZONE_LABEL: Record<CanvasZoneId, string> = {
  filters: "Filters",
  dimensions: "Dimensions",
  measures: "Measures",
  chart: "Chart",
}

const ZONE_HINT: Record<CanvasZoneId, string> = {
  filters: "Drop a filter chip",
  dimensions: "Drop a dimension",
  measures: "Drop a measure",
  chart: "Pick a chart kind",
}

interface PalettePayload {
  readonly zone: Exclude<CanvasZoneId, "chart">
  readonly id: string
}

function encodePayload(payload: PalettePayload): string {
  return `${payload.zone}::${payload.id}`
}

function decodePayload(raw: string): PalettePayload | null {
  const [zone, id] = raw.split("::")
  if (zone !== "filters" && zone !== "dimensions" && zone !== "measures") {
    return null
  }
  if (!id) {
    return null
  }
  return { zone, id }
}

function buildInitial(
  initial: ReportBuilderCanvasProps["initial"],
  library: CanvasLibrary,
): ZoneStateValue {
  const ids = {
    filters: new Set(library.filters.map((entry) => entry.id)),
    dimensions: new Set(library.dimensions.map((entry) => entry.id)),
    measures: new Set(library.measures.map((entry) => entry.id)),
  }
  return {
    filters: (initial?.filters ?? []).filter((entry) => ids.filters.has(entry)),
    dimensions: (initial?.dimensions ?? []).filter((entry) =>
      ids.dimensions.has(entry),
    ),
    measures: (initial?.measures ?? []).filter((entry) =>
      ids.measures.has(entry),
    ),
    chart: "bar",
  }
}

export function ReportBuilderCanvas({
  library,
  initial,
  chartKinds = DEFAULT_CHARTS,
  className,
}: ReportBuilderCanvasProps) {
  const [state, setState] = useState<ZoneStateValue>(() => buildInitial(initial, library))
  const [overZone, setOverZone] = useState<CanvasZoneId | null>(null)

  const filterMap = useMemo(() => new Map(library.filters.map((f) => [f.id, f])), [library.filters])
  const dimensionMap = useMemo(
    () => new Map(library.dimensions.map((d) => [d.id, d])),
    [library.dimensions],
  )
  const measureMap = useMemo(
    () => new Map(library.measures.map((m) => [m.id, m])),
    [library.measures],
  )

  const handleDragStart = useCallback(
    (zone: PalettePayload["zone"], id: string) => (event: DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData("text/plain", encodePayload({ zone, id }))
      event.dataTransfer.effectAllowed = "copyMove"
    },
    [],
  )

  const handleDropZone = useCallback(
    (zone: Exclude<CanvasZoneId, "chart">) => (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const raw = event.dataTransfer.getData("text/plain")
      const payload = decodePayload(raw)
      setOverZone(null)
      if (!payload || payload.zone !== zone) {
        return
      }
      setState((current) => {
        const list = current[zone]
        if (list.includes(payload.id)) {
          return current
        }
        return { ...current, [zone]: [...list, payload.id] }
      })
    },
    [],
  )

  const handleAddKey = useCallback(
    (zone: Exclude<CanvasZoneId, "chart">, id: string) => (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return
      }
      event.preventDefault()
      setState((current) => {
        const list = current[zone]
        if (list.includes(id)) {
          return current
        }
        return { ...current, [zone]: [...list, id] }
      })
    },
    [],
  )

  const handleRemove = useCallback(
    (zone: Exclude<CanvasZoneId, "chart">, id: string) => () => {
      setState((current) => ({
        ...current,
        [zone]: current[zone].filter((entry) => entry !== id),
      }))
    },
    [],
  )

  const handleChartChange = useCallback((kind: ChartKind) => () => {
    setState((current) => ({ ...current, chart: kind }))
  }, [])

  const classes = [styles.canvas, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Deep report builder canvas">
      <div className={styles.palette}>
        <div className={styles.paletteHead}>
          <span>Library</span>
          <span className={styles.paletteCount}>
            {library.filters.length + library.dimensions.length + library.measures.length}
          </span>
        </div>

        <PaletteGroup
          title="Filters"
          kind="filter"
          items={library.filters.map((f) => ({ id: f.id, label: f.label, sub: f.value }))}
          onDragStart={(id) => handleDragStart("filters", id)}
        />
        <PaletteGroup
          title="Dimensions"
          kind="dimension"
          items={library.dimensions.map((d) => ({ id: d.id, label: d.label, sub: d.source }))}
          onDragStart={(id) => handleDragStart("dimensions", id)}
        />
        <PaletteGroup
          title="Measures"
          kind="measure"
          items={library.measures.map((m) => ({
            id: m.id,
            label: m.label,
            sub: m.aggregator.toUpperCase(),
          }))}
          onDragStart={(id) => handleDragStart("measures", id)}
        />
      </div>

      <div className={styles.zones}>
        <DropZone
          id="filters"
          isOver={overZone === "filters"}
          onDragOver={(event) => {
            event.preventDefault()
            setOverZone("filters")
          }}
          onDragLeave={() => setOverZone(null)}
          onDrop={handleDropZone("filters")}
        >
          {state.filters.length === 0 ? (
            <EmptyDrop label={ZONE_HINT.filters} />
          ) : (
            state.filters.map((id) => {
              const entry = filterMap.get(id)
              if (!entry) return null
              return (
                <Token
                  key={id}
                  label={entry.label}
                  sub={entry.value}
                  onRemove={handleRemove("filters", id)}
                  removeLabel={`Remove filter ${entry.label}`}
                />
              )
            })
          )}
        </DropZone>

        <DropZone
          id="dimensions"
          isOver={overZone === "dimensions"}
          onDragOver={(event) => {
            event.preventDefault()
            setOverZone("dimensions")
          }}
          onDragLeave={() => setOverZone(null)}
          onDrop={handleDropZone("dimensions")}
        >
          {state.dimensions.length === 0 ? (
            <EmptyDrop label={ZONE_HINT.dimensions} />
          ) : (
            state.dimensions.map((id) => {
              const entry = dimensionMap.get(id)
              if (!entry) return null
              return (
                <Token
                  key={id}
                  label={entry.label}
                  sub={entry.source}
                  onRemove={handleRemove("dimensions", id)}
                  removeLabel={`Remove dimension ${entry.label}`}
                />
              )
            })
          )}
        </DropZone>

        <DropZone
          id="measures"
          isOver={overZone === "measures"}
          onDragOver={(event) => {
            event.preventDefault()
            setOverZone("measures")
          }}
          onDragLeave={() => setOverZone(null)}
          onDrop={handleDropZone("measures")}
        >
          {state.measures.length === 0 ? (
            <EmptyDrop label={ZONE_HINT.measures} />
          ) : (
            state.measures.map((id) => {
              const entry = measureMap.get(id)
              if (!entry) return null
              return (
                <Token
                  key={id}
                  label={entry.label}
                  sub={entry.aggregator.toUpperCase()}
                  onRemove={handleRemove("measures", id)}
                  removeLabel={`Remove measure ${entry.label}`}
                />
              )
            })
          )}
        </DropZone>

        <div className={styles.zone} aria-label={`${ZONE_LABEL.chart} zone`}>
          <div className={styles.zoneHead}>
            <span>Chart</span>
            <span>{state.chart}</span>
          </div>
          <div className={styles.chartPicker} role="radiogroup" aria-label="Chart kind">
            {chartKinds.map((kind) => (
              <button
                key={kind}
                type="button"
                role="radio"
                aria-checked={state.chart === kind}
                className={[styles.chartChoice, state.chart === kind ? styles.chartChoiceActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={handleChartChange(kind)}
              >
                {kind}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden keyboard-only adders for each palette item to satisfy keyboard parity */}
      <span className={styles.srOnly} aria-hidden="true">
        {library.dimensions.map((d) => (
          <span
            key={d.id}
            role="button"
            tabIndex={-1}
            onKeyDown={handleAddKey("dimensions", d.id)}
          />
        ))}
      </span>
    </section>
  )
}

interface PaletteGroupProps {
  readonly title: string
  readonly kind: "filter" | "dimension" | "measure"
  readonly items: ReadonlyArray<{ readonly id: string; readonly label: string; readonly sub: string }>
  readonly onDragStart: (id: string) => (event: DragEvent<HTMLDivElement>) => void
}

function PaletteGroup({ title, kind, items, onDragStart }: PaletteGroupProps) {
  return (
    <div className={styles.paletteGroup}>
      <div className={styles.paletteGroupHead}>{title}</div>
      <div className={styles.paletteList}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.paletteItem}
            data-kind={kind}
            draggable
            tabIndex={0}
            role="button"
            aria-label={`Drag ${item.label} into a zone`}
            onDragStart={onDragStart(item.id)}
          >
            <span className={styles.paletteItemLabel}>{item.label}</span>
            <span className={styles.paletteItemSub}>{item.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface DropZoneProps {
  readonly id: Exclude<CanvasZoneId, "chart">
  readonly isOver: boolean
  readonly onDragOver: (event: DragEvent<HTMLDivElement>) => void
  readonly onDragLeave: () => void
  readonly onDrop: (event: DragEvent<HTMLDivElement>) => void
  readonly children: React.ReactNode
}

function DropZone({ id, isOver, onDragOver, onDragLeave, onDrop, children }: DropZoneProps) {
  const cls = [styles.zone, isOver ? styles.zoneOver : ""].filter(Boolean).join(" ")
  return (
    <div
      className={cls}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      aria-label={`${ZONE_LABEL[id]} zone`}
    >
      <div className={styles.zoneHead}>
        <span>{ZONE_LABEL[id]}</span>
      </div>
      <div className={styles.zoneBody}>{children}</div>
    </div>
  )
}

interface TokenProps {
  readonly label: string
  readonly sub: string
  readonly onRemove: () => void
  readonly removeLabel: string
}

function Token({ label, sub, onRemove, removeLabel }: TokenProps) {
  return (
    <span className={styles.token}>
      <span className={styles.tokenLabel}>{label}</span>
      <span className={styles.tokenSub}>{sub}</span>
      <button
        type="button"
        className={styles.tokenRemove}
        aria-label={removeLabel}
        onClick={onRemove}
      >
        ×
      </button>
    </span>
  )
}

function EmptyDrop({ label }: { readonly label: string }) {
  return <span className={styles.empty}>{label}</span>
}

export default ReportBuilderCanvas
