"use client"

import styles from "./pivot-quick-builder.module.css"

export interface PivotFieldChip {
  id: string
  /** Display name (e.g. "Supplier"). */
  label: string
  /** Optional aggregation marker shown in the value zone (Sum / Avg / Count). */
  agg?: "sum" | "avg" | "count" | "min" | "max"
}

export type PivotZoneId = "rows" | "columns" | "values" | "filters"

export interface PivotQuickBuilderProps {
  /** A1 source range expressed as a string. */
  sourceRange: string
  /** Field chips dropped into each drop zone. */
  rows?: ReadonlyArray<PivotFieldChip>
  columns?: ReadonlyArray<PivotFieldChip>
  values?: ReadonlyArray<PivotFieldChip>
  filters?: ReadonlyArray<PivotFieldChip>
  /** Available fields shown above the zones. */
  availableFields?: ReadonlyArray<PivotFieldChip>
  onDropField?: (zone: PivotZoneId, fieldId: string) => void
  onRemoveField?: (zone: PivotZoneId, fieldId: string) => void
}

const ZONE_LABEL: Record<PivotZoneId, string> = {
  rows: "Rows",
  columns: "Columns",
  values: "Values",
  filters: "Filters",
}

const ZONE_HINT: Record<PivotZoneId, string> = {
  rows: "Drop fields to group rows",
  columns: "Drop fields to pivot across",
  values: "Drop fields to summarise",
  filters: "Drop fields to slice by",
}

const AGG_LABEL: Record<NonNullable<PivotFieldChip["agg"]>, string> = {
  sum: "Σ",
  avg: "x̄",
  count: "#",
  min: "↓",
  max: "↑",
}

function FieldChip({
  field,
  zone,
  onRemove,
}: {
  field: PivotFieldChip
  zone: PivotZoneId
  onRemove?: () => void
}) {
  return (
    <span className={styles.chip}>
      {field.agg ? (
        <span className={styles.chipAgg} aria-hidden="true">
          {AGG_LABEL[field.agg]}
        </span>
      ) : null}
      <span className={styles.chipLabel}>{field.label}</span>
      <button
        type="button"
        className={styles.chipRemove}
        onClick={onRemove}
        aria-label={`Remove ${field.label} from ${ZONE_LABEL[zone]}`}
      >
        ×
      </button>
    </span>
  )
}

function DropZone({
  id,
  fields,
  onRemoveField,
}: {
  id: PivotZoneId
  fields: ReadonlyArray<PivotFieldChip>
  onRemoveField?: PivotQuickBuilderProps["onRemoveField"]
}) {
  return (
    <div className={styles.zone} aria-label={`${ZONE_LABEL[id]} zone`}>
      <div className={styles.zoneHead}>
        <span className={styles.zoneLabel}>{ZONE_LABEL[id]}</span>
        <span className={styles.zoneCount}>{fields.length}</span>
      </div>
      <div className={styles.zoneBody}>
        {fields.length === 0 ? (
          <span className={styles.zoneHint}>{ZONE_HINT[id]}</span>
        ) : (
          fields.map((field) => (
            <FieldChip
              key={field.id}
              field={field}
              zone={id}
              onRemove={() => onRemoveField?.(id, field.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export function PivotQuickBuilder({
  sourceRange,
  rows = [],
  columns = [],
  values = [],
  filters = [],
  availableFields = [],
  onRemoveField,
}: PivotQuickBuilderProps) {
  return (
    <section className={styles.builder} aria-label="Pivot quick builder">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Pivot</span>
          <h3 className={styles.title}>Quick builder</h3>
        </div>
        <span className={styles.source}>
          <span className={styles.sourceLabel}>Source</span>
          <code className={styles.sourceRange}>{sourceRange}</code>
        </span>
      </header>
      {availableFields.length > 0 ? (
        <div className={styles.available}>
          <span className={styles.availableLabel}>Fields</span>
          <div className={styles.availableList}>
            {availableFields.map((field) => (
              <span key={field.id} className={styles.availableChip}>
                {field.label}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      <div className={styles.zones}>
        <DropZone id="rows" fields={rows} onRemoveField={onRemoveField} />
        <DropZone id="columns" fields={columns} onRemoveField={onRemoveField} />
        <DropZone id="values" fields={values} onRemoveField={onRemoveField} />
        <DropZone id="filters" fields={filters} onRemoveField={onRemoveField} />
      </div>
    </section>
  )
}

export default PivotQuickBuilder
