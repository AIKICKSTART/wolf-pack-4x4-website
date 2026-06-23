"use client"

import { DataTable, type DataTableColumn } from "../../components/data-display/data-table"

export interface ComplianceAuditEntry {
  id: string
  when: string
  actor: string
  action: string
  target: string
}

interface ComplianceAuditLogProps {
  rows: ReadonlyArray<ComplianceAuditEntry>
}

const AUDIT_COLUMNS: ReadonlyArray<DataTableColumn<ComplianceAuditEntry>> = [
  {
    id: "when",
    header: "When",
    cell: (row) => (
      <span style={{ fontFamily: "var(--primitive-font-mono)", fontSize: "var(--primitive-text-xs)" }}>
        {row.when}
      </span>
    ),
    width: "120px",
  },
  {
    id: "actor",
    header: "Actor",
    cell: (row) => (
      <span style={{ color: "var(--primitive-text-strong)", fontSize: "var(--primitive-text-xs)" }}>
        {row.actor}
      </span>
    ),
    width: "180px",
  },
  {
    id: "action",
    header: "Action",
    cell: (row) => <span style={{ fontSize: "var(--primitive-text-sm)" }}>{row.action}</span>,
  },
  {
    id: "target",
    header: "Target",
    cell: (row) => (
      <code
        style={{
          fontFamily: "var(--primitive-font-mono)",
          fontSize: "var(--primitive-text-xs)",
          color: "var(--primitive-teal)",
        }}
      >
        {row.target}
      </code>
    ),
  },
]

export function ComplianceAuditLog({ rows }: ComplianceAuditLogProps) {
  return (
    <DataTable
      rows={rows as ComplianceAuditEntry[]}
      columns={AUDIT_COLUMNS}
      getRowId={(row) => row.id}
      caption="Recent compliance audit log"
      kicker="Audit · last 24 hours"
      density="comfortable"
      zebra
    />
  )
}

export default ComplianceAuditLog
