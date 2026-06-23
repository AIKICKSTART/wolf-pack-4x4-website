"use client"

import { Chip } from "../../components/primitives/chip"
import { DataTable, type DataTableColumn } from "../../components/data-display/data-table"

interface InvoiceRow {
  id: string
  number: string
  issued: string
  amount: string
  status: "paid" | "open" | "void"
  pdfHref: string
}

const INVOICES: ReadonlyArray<InvoiceRow> = [
  {
    id: "inv-2026-05",
    number: "OFM-2026-05",
    issued: "12 May 2026",
    amount: "AUD $349.00",
    status: "open",
    pdfHref: "#",
  },
  {
    id: "inv-2026-04",
    number: "OFM-2026-04",
    issued: "12 Apr 2026",
    amount: "AUD $349.00",
    status: "paid",
    pdfHref: "#",
  },
  {
    id: "inv-2026-03",
    number: "OFM-2026-03",
    issued: "12 Mar 2026",
    amount: "AUD $349.00",
    status: "paid",
    pdfHref: "#",
  },
  {
    id: "inv-2026-02",
    number: "OFM-2026-02",
    issued: "12 Feb 2026",
    amount: "AUD $149.00",
    status: "paid",
    pdfHref: "#",
  },
  {
    id: "inv-2026-01",
    number: "OFM-2026-01",
    issued: "12 Jan 2026",
    amount: "AUD $149.00",
    status: "void",
    pdfHref: "#",
  },
]

const INVOICE_COLUMNS: ReadonlyArray<DataTableColumn<InvoiceRow>> = [
  {
    id: "number",
    header: "Invoice",
    sortable: true,
    cell: (row) => <strong style={{ color: "var(--primitive-text-strong)" }}>{row.number}</strong>,
  },
  {
    id: "issued",
    header: "Issued",
    sortable: true,
    cell: (row) => row.issued,
  },
  {
    id: "amount",
    header: "Amount",
    align: "right",
    sortable: true,
    cell: (row) => row.amount,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => {
      if (row.status === "paid") {
        return <Chip label="Paid" tone="green" />
      }
      if (row.status === "open") {
        return <Chip label="Open" tone="amber" />
      }
      return <Chip label="Void" tone="neutral" />
    },
  },
  {
    id: "pdf",
    header: "PDF",
    align: "right",
    cell: (row) => (
      <a
        href={row.pdfHref}
        style={{
          color: "var(--primitive-amber)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: "var(--primitive-text-xs)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Download
      </a>
    ),
  },
]

export function InvoiceLedgerTable() {
  return (
    <DataTable
      rows={[...INVOICES]}
      columns={INVOICE_COLUMNS}
      getRowId={(row) => row.id}
      density="comfortable"
      caption="Workshop invoices"
      kicker="Last 12 months"
    />
  )
}
