"use client"

import { useCallback, useMemo, useState } from "react"

import {
  formatAud,
  formatAudCompact,
  formatCount,
  formatPercent,
} from "./reports-deep-types"
import type {
  PivotAxisGroup,
  PivotMatrixCell,
  PivotMeasure,
} from "./reports-deep-types"
import styles from "./pivot-table.module.css"

interface PivotTableProps {
  readonly title: string
  readonly rowGroups: ReadonlyArray<PivotAxisGroup>
  readonly columnGroups: ReadonlyArray<PivotAxisGroup>
  readonly measures: ReadonlyArray<PivotMeasure>
  readonly initialMeasureId?: string
  /** matrix[measureIndex][rowLeafIndex][colLeafIndex] = cell. */
  readonly matrix: ReadonlyArray<ReadonlyArray<ReadonlyArray<PivotMatrixCell>>>
  readonly className?: string
}

function flatten(groups: ReadonlyArray<PivotAxisGroup>): ReadonlyArray<{
  readonly groupId: string
  readonly groupLabel: string
  readonly leaf: string
  readonly leafIndex: number
}> {
  let leafIndex = 0
  const flat: Array<{ groupId: string; groupLabel: string; leaf: string; leafIndex: number }> = []
  for (const group of groups) {
    for (const leaf of group.leaves) {
      flat.push({
        groupId: group.id,
        groupLabel: group.label,
        leaf,
        leafIndex,
      })
      leafIndex += 1
    }
  }
  return flat
}

function formatCell(cell: PivotMatrixCell | undefined, measure: PivotMeasure): string {
  if (cell === undefined) return "—"
  switch (measure.format) {
    case "aud":
      return formatAudCompact(cell.value)
    case "percent":
      return formatPercent(cell.value)
    case "count":
      return formatCount(cell.value)
    case "ratio":
      return cell.value.toFixed(2)
    default:
      return formatAud(cell.value)
  }
}

export function PivotTable({
  title,
  rowGroups,
  columnGroups,
  measures,
  initialMeasureId,
  matrix,
  className,
}: PivotTableProps) {
  const [measureId, setMeasureId] = useState<string>(
    initialMeasureId ?? measures[0]?.id ?? "",
  )

  const measureIndex = useMemo(
    () => measures.findIndex((m) => m.id === measureId),
    [measureId, measures],
  )
  const activeMeasure = measures[measureIndex] ?? measures[0]
  const activeMatrix = useMemo(
    () => matrix[Math.max(0, measureIndex)] ?? [],
    [matrix, measureIndex],
  )

  const flatRows = useMemo(() => flatten(rowGroups), [rowGroups])
  const flatCols = useMemo(() => flatten(columnGroups), [columnGroups])

  const rowSubtotals = useMemo(() => {
    return flatRows.map((row) => {
      const cells = activeMatrix[row.leafIndex] ?? []
      const total = cells.reduce((acc, cell) => acc + (cell?.value ?? 0), 0)
      return total
    })
  }, [activeMatrix, flatRows])

  const colSubtotals = useMemo(() => {
    return flatCols.map((col) => {
      let total = 0
      for (const row of flatRows) {
        const cell = activeMatrix[row.leafIndex]?.[col.leafIndex]
        total += cell?.value ?? 0
      }
      return total
    })
  }, [activeMatrix, flatCols, flatRows])

  const grandTotal = useMemo(
    () => rowSubtotals.reduce((acc, value) => acc + value, 0),
    [rowSubtotals],
  )

  const handleMeasureChange = useCallback((id: string) => () => {
    setMeasureId(id)
  }, [])

  const colCount = flatCols.length
  const classes = [styles.frame, className].filter(Boolean).join(" ")

  if (!activeMeasure) {
    return null
  }

  return (
    <section className={classes} aria-label={`Pivot table: ${title}`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Pivot</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.measurePicker} role="radiogroup" aria-label="Pivot measure">
          {measures.map((measure) => (
            <button
              key={measure.id}
              type="button"
              role="radio"
              aria-checked={measure.id === measureId}
              className={`${styles.measureBtn} ${measure.id === measureId ? styles.measureActive : ""}`.trim()}
              onClick={handleMeasureChange(measure.id)}
            >
              {measure.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.scroll}>
        <table
          className={styles.table}
          aria-rowcount={flatRows.length + 2}
          aria-colcount={colCount + 2}
        >
          <thead>
            <tr className={styles.groupRow}>
              <th className={styles.corner} colSpan={2} scope="col" aria-label="Row labels" />
              {columnGroups.map((group) => (
                <th
                  key={group.id}
                  colSpan={group.leaves.length}
                  scope="colgroup"
                  className={styles.groupCell}
                >
                  {group.label}
                </th>
              ))}
              <th className={styles.totalCorner} scope="col" rowSpan={2}>
                Total
              </th>
            </tr>
            <tr className={styles.leafRow}>
              <th className={styles.corner} scope="col" aria-label="Row group" />
              <th className={styles.corner} scope="col" aria-label="Row leaf" />
              {flatCols.map((col) => (
                <th key={`${col.groupId}-${col.leaf}`} scope="col" className={styles.leafCell}>
                  {col.leaf}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowGroups.map((rowGroup) => (
              <RowGroupBody
                key={rowGroup.id}
                rowGroup={rowGroup}
                flatRows={flatRows}
                flatCols={flatCols}
                activeMatrix={activeMatrix}
                rowSubtotals={rowSubtotals}
                measure={activeMeasure}
              />
            ))}
            <tr className={styles.totalRow}>
              <th colSpan={2} scope="row" className={styles.totalLabel}>
                Grand total
              </th>
              {colSubtotals.map((value, index) => (
                <td key={`grand-${index}`} className={styles.totalCell}>
                  {formatCell({ value, emphasis: "total" }, activeMeasure)}
                </td>
              ))}
              <td className={styles.totalGrand}>
                {formatCell({ value: grandTotal, emphasis: "total" }, activeMeasure)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

interface RowGroupBodyProps {
  readonly rowGroup: PivotAxisGroup
  readonly flatRows: ReadonlyArray<{ readonly groupId: string; readonly leaf: string; readonly leafIndex: number }>
  readonly flatCols: ReadonlyArray<{ readonly leafIndex: number; readonly leaf: string }>
  readonly activeMatrix: ReadonlyArray<ReadonlyArray<PivotMatrixCell>>
  readonly rowSubtotals: ReadonlyArray<number>
  readonly measure: PivotMeasure
}

function RowGroupBody({
  rowGroup,
  flatRows,
  flatCols,
  activeMatrix,
  rowSubtotals,
  measure,
}: RowGroupBodyProps) {
  const groupRows = flatRows.filter((row) => row.groupId === rowGroup.id)
  return (
    <>
      {groupRows.map((row, indexInGroup) => (
        <tr key={`${row.groupId}-${row.leaf}`} className={styles.dataRow}>
          {indexInGroup === 0 ? (
            <th
              scope="rowgroup"
              rowSpan={groupRows.length}
              className={styles.rowGroupCell}
            >
              {rowGroup.label}
            </th>
          ) : null}
          <th scope="row" className={styles.rowLeaf}>
            {row.leaf}
          </th>
          {flatCols.map((col) => {
            const cell = activeMatrix[row.leafIndex]?.[col.leafIndex]
            return (
              <td
                key={`${row.leaf}-${col.leaf}`}
                className={`${styles.cell} ${cell?.emphasis === "value" ? styles.cellStrong : ""}`.trim()}
              >
                {formatCell(cell, measure)}
              </td>
            )
          })}
          <td className={styles.rowTotal}>
            {formatCell({ value: rowSubtotals[row.leafIndex] ?? 0, emphasis: "subtotal" }, measure)}
          </td>
        </tr>
      ))}
    </>
  )
}

export default PivotTable
