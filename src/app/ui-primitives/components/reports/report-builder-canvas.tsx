"use client"

import { useCallback, useMemo, useState } from "react"

import styles from "./report-builder-canvas.module.css"

export type FieldType = "dimension" | "measure" | "date" | "geography"

export interface BuilderField {
  id: string
  label: string
  type: FieldType
}

export type DropZoneId = "rows" | "columns" | "values" | "filters"

interface ZoneDefinition {
  id: DropZoneId
  label: string
}

const ZONES: ReadonlyArray<ZoneDefinition> = [
  { id: "rows", label: "Rows" },
  { id: "columns", label: "Columns" },
  { id: "values", label: "Values" },
  { id: "filters", label: "Filters" },
]

interface ReportBuilderCanvasProps {
  fields: ReadonlyArray<BuilderField>
  initialZones?: Partial<Record<DropZoneId, string[]>>
  previewHeaders: ReadonlyArray<string>
  previewRows: ReadonlyArray<ReadonlyArray<string>>
  className?: string
}

type ZoneState = Record<DropZoneId, string[]>

function buildInitialState(initial?: Partial<Record<DropZoneId, string[]>>): ZoneState {
  return {
    rows: initial?.rows ? [...initial.rows] : [],
    columns: initial?.columns ? [...initial.columns] : [],
    values: initial?.values ? [...initial.values] : [],
    filters: initial?.filters ? [...initial.filters] : [],
  }
}

export function ReportBuilderCanvas({
  fields,
  initialZones,
  previewHeaders,
  previewRows,
  className,
}: ReportBuilderCanvasProps) {
  const [zones, setZones] = useState<ZoneState>(() => buildInitialState(initialZones))
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const fieldById = useMemo(() => {
    const map = new Map<string, BuilderField>()
    for (const field of fields) {
      map.set(field.id, field)
    }
    return map
  }, [fields])

  const handleDragStart = useCallback((fieldId: string) => {
    setDraggingId(fieldId)
  }, [])

  const handleDropOnZone = useCallback(
    (zoneId: DropZoneId) => {
      if (draggingId === null) {
        return
      }
      setZones((current) => {
        if (current[zoneId].includes(draggingId)) {
          return current
        }
        return { ...current, [zoneId]: [...current[zoneId], draggingId] }
      })
      setDraggingId(null)
    },
    [draggingId],
  )

  const handleRemove = useCallback((zoneId: DropZoneId, fieldId: string) => {
    setZones((current) => ({
      ...current,
      [zoneId]: current[zoneId].filter((id) => id !== fieldId),
    }))
  }, [])

  const handleKeyAdd = useCallback(
    (zoneId: DropZoneId, fieldId: string) => {
      setZones((current) => {
        if (current[zoneId].includes(fieldId)) {
          return current
        }
        return { ...current, [zoneId]: [...current[zoneId], fieldId] }
      })
    },
    [],
  )

  const classes = [styles.canvas, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Report builder canvas">
      <div className={styles.pane}>
        <div className={styles.paneTitle}>
          <span>Field library</span>
          <span className={styles.paneCount}>{fields.length}</span>
        </div>
        <div className={styles.fieldList}>
          {fields.map((field) => (
            <div
              key={field.id}
              className={styles.field}
              draggable
              onDragStart={() => handleDragStart(field.id)}
              onDragEnd={() => setDraggingId(null)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  handleKeyAdd("rows", field.id)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Add ${field.label} to rows`}
            >
              <span>{field.label}</span>
              <span className={styles.fieldType}>{field.type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pane}>
        <div className={styles.paneTitle}>
          <span>Drop zones</span>
        </div>
        <div className={styles.zoneList}>
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              className={styles.zone}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDropOnZone(zone.id)}
              aria-label={`${zone.label} zone`}
            >
              <div className={styles.zoneLabel}>
                <span>{zone.label}</span>
                <span>{zones[zone.id].length}</span>
              </div>
              <div className={styles.zoneTokens}>
                {zones[zone.id].length === 0 ? (
                  <span className={styles.fieldType}>Drop a field here</span>
                ) : (
                  zones[zone.id].map((fieldId) => {
                    const field = fieldById.get(fieldId)
                    if (!field) return null
                    return (
                      <span key={fieldId} className={styles.token}>
                        {field.label}
                        <button
                          type="button"
                          className={styles.tokenRemove}
                          aria-label={`Remove ${field.label} from ${zone.label}`}
                          onClick={() => handleRemove(zone.id, fieldId)}
                        >
                          ×
                        </button>
                      </span>
                    )
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pane}>
        <div className={styles.paneTitle}>
          <span>Live preview</span>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewHead}>
            {previewHeaders.map((header) => (
              <span key={header}>{header}</span>
            ))}
          </div>
          {previewRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles.previewRow}>
              {row.map((cell, cellIndex) => (
                <span key={`${rowIndex}-${cellIndex}`}>
                  {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReportBuilderCanvas
