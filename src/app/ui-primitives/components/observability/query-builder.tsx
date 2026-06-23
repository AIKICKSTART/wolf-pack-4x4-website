"use client"

import { useCallback, useState, type ChangeEvent, type MouseEvent } from "react"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import { MaterialSurface } from "../surfaces/material-surface"

import styles from "./query-builder.module.css"

export interface QueryMetric {
  id: string
  label: string
  /** e.g. "Counter", "Gauge", "Histogram". */
  kind: string
}

export interface QueryFilter {
  id: string
  key: string
  value: string
  tone?: ChipTone
}

export interface QueryGroupBy {
  id: string
  label: string
}

export interface QueryBuilderProps {
  metrics: ReadonlyArray<QueryMetric>
  initialMetricId?: string
  initialFilters?: ReadonlyArray<QueryFilter>
  initialGroupBy?: ReadonlyArray<QueryGroupBy>
  availableGroupBy?: ReadonlyArray<QueryGroupBy>
  onChange?: (state: {
    metricId: string
    filters: ReadonlyArray<QueryFilter>
    groupBy: ReadonlyArray<QueryGroupBy>
  }) => void
  className?: string
}

export function QueryBuilder({
  metrics,
  initialMetricId,
  initialFilters = [],
  initialGroupBy = [],
  availableGroupBy = [],
  onChange,
  className,
}: QueryBuilderProps) {
  const firstMetricId = initialMetricId ?? metrics[0]?.id ?? ""
  const [metricId, setMetricId] = useState<string>(firstMetricId)
  const [filters, setFilters] = useState<ReadonlyArray<QueryFilter>>(initialFilters)
  const [groupBy, setGroupBy] = useState<ReadonlyArray<QueryGroupBy>>(initialGroupBy)

  const emit = useCallback(
    (next: { metricId: string; filters: ReadonlyArray<QueryFilter>; groupBy: ReadonlyArray<QueryGroupBy> }) => {
      onChange?.(next)
    },
    [onChange],
  )

  const handleMetric = useCallback(
    (id: string) => {
      setMetricId(id)
      emit({ metricId: id, filters, groupBy })
    },
    [emit, filters, groupBy],
  )

  const removeFilter = useCallback(
    (id: string) => {
      const next = filters.filter((f) => f.id !== id)
      setFilters(next)
      emit({ metricId, filters: next, groupBy })
    },
    [emit, filters, groupBy, metricId],
  )

  const toggleGroup = useCallback(
    (group: QueryGroupBy) => {
      const has = groupBy.some((g) => g.id === group.id)
      const next = has ? groupBy.filter((g) => g.id !== group.id) : [...groupBy, group]
      setGroupBy(next)
      emit({ metricId, filters, groupBy: next })
    },
    [emit, filters, groupBy, metricId],
  )

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleMetric(event.target.value)
  }

  const handleAvailableClick = (group: QueryGroupBy) => (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleGroup(group)
  }

  const classes = [styles.builder, className].filter(Boolean).join(" ")
  const currentMetric = metrics.find((m) => m.id === metricId)

  return (
    <MaterialSurface elevation={2} className={classes}>
      <div className={styles.row} role="group" aria-label="Metric query builder">
        <div className={styles.field}>
          <span className={styles.label}>Metric</span>
          <label className={styles.metricSelect}>
            <span className={styles.srOnly}>Metric</span>
            <select
              className={styles.select}
              value={metricId}
              onChange={handleSelectChange}
              aria-label="Select metric"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
            {currentMetric ? (
              <span className={styles.kind} aria-hidden="true">
                {currentMetric.kind}
              </span>
            ) : null}
          </label>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Filter</span>
          <div className={styles.chips}>
            {filters.length === 0 ? (
              <span className={styles.empty}>No filters</span>
            ) : (
              filters.map((filter) => (
                <Chip
                  key={filter.id}
                  label={`${filter.key}:${filter.value}`}
                  tone={filter.tone ?? "teal"}
                  dismissible
                  onDismiss={() => removeFilter(filter.id)}
                />
              ))
            )}
          </div>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Group by</span>
          <div className={styles.chips}>
            {availableGroupBy.length === 0 && groupBy.length === 0 ? (
              <span className={styles.empty}>No groupings available</span>
            ) : null}
            {availableGroupBy.map((group) => {
              const active = groupBy.some((g) => g.id === group.id)
              return (
                <button
                  key={group.id}
                  type="button"
                  className={[styles.groupChip, active ? styles.groupActive : ""].filter(Boolean).join(" ")}
                  onClick={handleAvailableClick(group)}
                  aria-pressed={active}
                >
                  {group.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <span className={styles.previewLabel}>Query</span>
        <code className={styles.previewCode}>
          {currentMetric ? currentMetric.label : metricId}
          {filters.length > 0
            ? `{${filters.map((f) => `${f.key}="${f.value}"`).join(", ")}}`
            : ""}
          {groupBy.length > 0 ? ` by (${groupBy.map((g) => g.label).join(", ")})` : ""}
        </code>
      </div>
    </MaterialSurface>
  )
}

export default QueryBuilder
