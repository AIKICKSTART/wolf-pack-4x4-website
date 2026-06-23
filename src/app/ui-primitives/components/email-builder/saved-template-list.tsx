"use client"

import { DataTable } from "../data-display/data-table"
import type { DataTableColumn } from "../data-display/data-table"

import type { SavedTemplate } from "./email-builder-types"
import styles from "./saved-template-list.module.css"

interface SavedTemplateListProps {
  templates: ReadonlyArray<SavedTemplate>
  className?: string
}

function ThumbCell({ glyph }: { glyph: string }) {
  return (
    <span className={styles.thumb} aria-hidden="true">
      <span className={styles.thumbGlyph}>{glyph}</span>
    </span>
  )
}

function ActionsCell({ name }: { name: string }) {
  return (
    <span className={styles.actions}>
      <span className={styles.actionLink} aria-label={`Open ${name}`}>
        Open
      </span>
      <span
        className={styles.actionLink}
        aria-label={`Duplicate ${name}`}
      >
        Duplicate
      </span>
      <span
        className={styles.actionLink}
        aria-label={`Archive ${name}`}
      >
        Archive
      </span>
    </span>
  )
}

const COLUMNS: ReadonlyArray<DataTableColumn<SavedTemplate>> = [
  {
    id: "thumb",
    header: "",
    cell: (row) => <ThumbCell glyph={row.thumb} />,
    width: "60px",
  },
  {
    id: "name",
    header: "Name",
    cell: (row) => <span className={styles.name}>{row.name}</span>,
    sortable: true,
  },
  {
    id: "edited",
    header: "Last edited",
    cell: (row) => <span className={styles.meta}>{row.editedAt}</span>,
    sortable: true,
  },
  {
    id: "sent",
    header: "Sends",
    cell: (row) => (
      <span className={styles.meta}>{row.sentCount.toLocaleString("en-AU")}</span>
    ),
    sortable: true,
    align: "right",
  },
  {
    id: "actions",
    header: "Actions",
    cell: (row) => <ActionsCell name={row.name} />,
    align: "right",
  },
]

export function SavedTemplateList({ templates, className }: SavedTemplateListProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={classes}>
      <DataTable<SavedTemplate>
        rows={[...templates]}
        columns={COLUMNS}
        getRowId={(row) => row.id}
        density="comfortable"
        kicker="Saved templates"
        caption="All campaign and transactional drafts"
        zebra
      />
    </section>
  )
}
