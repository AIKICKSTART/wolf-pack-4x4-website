"use client"

import { useMemo, useState } from "react"

export type SeoDashboardRow = {
  path: string
  /** Display-ready title cell, e.g. `My title (42)` or `(page default)`. */
  titleCell: string
  /** Display-ready description cell. */
  descriptionCell: string
  statusColor: string
  statusLabel: string
  detailHref: string
  editHref: string
  editLabel: string
}

const cellStyle: React.CSSProperties = {
  borderBottom: "1px solid var(--theme-elevation-150, #e5e7eb)",
  padding: "8px 12px",
  textAlign: "left",
  verticalAlign: "top",
}

const headCellStyle: React.CSSProperties = {
  ...cellStyle,
  borderBottom: "2px solid var(--theme-elevation-250, #d1d5db)",
  whiteSpace: "nowrap",
}

type SeoDashboardFilterProps = {
  rows: SeoDashboardRow[]
}

export function SeoDashboardFilter({ rows }: SeoDashboardFilterProps) {
  const [query, setQuery] = useState("")

  const visibleRows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return rows
    return rows.filter(
      (row) =>
        row.path.toLowerCase().includes(needle) ||
        row.titleCell.toLowerCase().includes(needle) ||
        row.descriptionCell.toLowerCase().includes(needle) ||
        row.statusLabel.toLowerCase().includes(needle),
    )
  }, [query, rows])

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter by path, title, description or status…"
        style={{
          border: "1px solid var(--theme-elevation-250, #d1d5db)",
          borderRadius: 6,
          fontSize: 13,
          marginBottom: 12,
          maxWidth: 420,
          padding: "7px 10px",
          width: "100%",
        }}
      />
      {query.trim() && (
        <p style={{ fontSize: 12, marginBottom: 8, opacity: 0.65 }}>
          {visibleRows.length} of {rows.length} pages match
        </p>
      )}
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={headCellStyle}>Path</th>
            <th style={headCellStyle}>Title (length)</th>
            <th style={headCellStyle}>Description (length)</th>
            <th style={headCellStyle}>Status</th>
            <th style={headCellStyle}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.path}>
              <td style={{ ...cellStyle, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                <a href={row.detailHref}>{row.path}</a>
              </td>
              <td style={cellStyle}>{row.titleCell}</td>
              <td style={cellStyle}>{row.descriptionCell}</td>
              <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
                <span
                  style={{
                    backgroundColor: row.statusColor,
                    borderRadius: "50%",
                    display: "inline-block",
                    height: 10,
                    marginRight: 6,
                    width: 10,
                  }}
                />
                {row.statusLabel}
              </td>
              <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
                <a href={row.editHref}>{row.editLabel}</a>
              </td>
            </tr>
          ))}
          {visibleRows.length === 0 && (
            <tr>
              <td colSpan={5} style={{ ...cellStyle, opacity: 0.65 }}>
                No pages match &ldquo;{query}&rdquo;.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SeoDashboardFilter
