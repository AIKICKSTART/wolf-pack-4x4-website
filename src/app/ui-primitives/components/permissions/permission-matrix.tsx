"use client"

import { useCallback, useState } from "react"

import type {
  PermissionAction,
  PermissionActionConfig,
  PermissionCellState,
  PermissionMatrixRow,
  PermissionMatrixValue,
  PermissionResource,
  ResourceKind,
} from "./permission-types"
import styles from "./permission-matrix.module.css"

interface PermissionMatrixProps {
  resources: ReadonlyArray<PermissionResource>
  actions: ReadonlyArray<PermissionActionConfig>
  defaultValue: PermissionMatrixValue
  onChange?: (value: PermissionMatrixValue) => void
  legend?: string
  className?: string
}

const STATE_ORDER: ReadonlyArray<PermissionCellState> = ["allow", "deny", "inherited"]

function nextState(current: PermissionCellState): PermissionCellState {
  const index = STATE_ORDER.indexOf(current)
  const nextIndex = (index + 1) % STATE_ORDER.length
  return STATE_ORDER[nextIndex]
}

function STATE_LABEL(state: PermissionCellState): string {
  if (state === "allow") return "Allowed"
  if (state === "deny") return "Denied"
  return "Inherited"
}

function STATE_GLYPH(state: PermissionCellState): string {
  if (state === "allow") return "✓"
  if (state === "deny") return "×"
  return "·"
}

export function PermissionMatrix({
  resources,
  actions,
  defaultValue,
  onChange,
  legend = "Resource access by action",
  className,
}: PermissionMatrixProps) {
  const [value, setValue] = useState<PermissionMatrixValue>(defaultValue)

  const updateCell = useCallback(
    (resourceId: ResourceKind, actionId: PermissionAction, state: PermissionCellState) => {
      const resourceRow = value[resourceId]
      const nextResource = { ...resourceRow, [actionId]: state }
      const next: PermissionMatrixValue = {
        ...value,
        [resourceId]: nextResource,
      }
      setValue(next)
      onChange?.(next)
    },
    [value, onChange],
  )

  const toggleCell = useCallback(
    (resourceId: ResourceKind, actionId: PermissionAction) => {
      const current = value[resourceId]?.[actionId] ?? "inherited"
      updateCell(resourceId, actionId, nextState(current))
    },
    [value, updateCell],
  )

  const setRow = useCallback(
    (resourceId: ResourceKind, state: PermissionCellState) => {
      const nextResource = actions.reduce<Record<PermissionAction, PermissionCellState>>(
        (acc, action) => {
          acc[action.id] = state
          return acc
        },
        { ...value[resourceId] } as Record<PermissionAction, PermissionCellState>,
      )
      const next: PermissionMatrixValue = {
        ...value,
        [resourceId]: nextResource,
      }
      setValue(next)
      onChange?.(next)
    },
    [actions, value, onChange],
  )

  const setColumn = useCallback(
    (actionId: PermissionAction, state: PermissionCellState) => {
      const next: PermissionMatrixValue = { ...value }
      for (const resource of resources) {
        const current = value[resource.id]
        const row: PermissionMatrixRow = { ...current, [actionId]: state }
        next[resource.id] = row
      }
      setValue(next)
      onChange?.(next)
    },
    [resources, value, onChange],
  )

  const classes = [styles.matrix, className].filter(Boolean).join(" ")

  return (
    <fieldset className={classes}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.rowHead} aria-label="Resource" />
              {actions.map((action) => (
                <th key={action.id} scope="col" className={styles.colHead}>
                  <span>{action.label}</span>
                  <span className={styles.bulk}>
                    <button
                      type="button"
                      className={styles.bulkBtn}
                      data-state="allow"
                      onClick={() => setColumn(action.id, "allow")}
                      aria-label={`Allow ${action.label} on every resource`}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className={styles.bulkBtn}
                      data-state="deny"
                      onClick={() => setColumn(action.id, "deny")}
                      aria-label={`Deny ${action.label} on every resource`}
                    >
                      ×
                    </button>
                  </span>
                </th>
              ))}
              <th scope="col" className={styles.colHeadActions} aria-label="Row actions" />
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <th scope="row" className={styles.rowHead}>
                  <span className={styles.rowLabel}>{resource.label}</span>
                  {resource.hint && (
                    <span className={styles.rowHint}>{resource.hint}</span>
                  )}
                </th>
                {actions.map((action) => {
                  const state = value[resource.id]?.[action.id] ?? "inherited"
                  return (
                    <td key={action.id} className={styles.cell}>
                      <button
                        type="button"
                        className={styles.pill}
                        data-state={state}
                        aria-pressed={state === "allow"}
                        aria-label={`${resource.label} ${action.label} ${STATE_LABEL(state)}`}
                        onClick={() => toggleCell(resource.id, action.id)}
                      >
                        <span className={styles.pillGlyph} aria-hidden="true">
                          {STATE_GLYPH(state)}
                        </span>
                        <span className={styles.pillLabel}>{STATE_LABEL(state)}</span>
                      </button>
                    </td>
                  )
                })}
                <td className={styles.cellActions}>
                  <span className={styles.bulk}>
                    <button
                      type="button"
                      className={styles.bulkBtn}
                      data-state="allow"
                      onClick={() => setRow(resource.id, "allow")}
                      aria-label={`Allow every action on ${resource.label}`}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className={styles.bulkBtn}
                      data-state="deny"
                      onClick={() => setRow(resource.id, "deny")}
                      aria-label={`Deny every action on ${resource.label}`}
                    >
                      ×
                    </button>
                    <button
                      type="button"
                      className={styles.bulkBtn}
                      data-state="inherited"
                      onClick={() => setRow(resource.id, "inherited")}
                      aria-label={`Inherit every action on ${resource.label}`}
                    >
                      ·
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  )
}

export default PermissionMatrix
