"use client"

import Link from "next/link"

import {
  DataTable,
  type DataTableColumn,
} from "../data-display/data-table"
import { Chip, type ChipTone } from "../primitives/chip"

import {
  DECISION_LABEL,
  DECISION_TONE,
  type DecisionRecommendation,
  type ExperimentTone,
} from "./experiments-types"

import styles from "./experiment-archive.module.css"

export interface ArchivedExperiment {
  id: string
  name: string
  ranFrom: string
  ranTo: string
  winningVariant?: string
  finalLift?: number
  decision: DecisionRecommendation
  /** Retrospective URL. */
  retrospectiveHref: string
}

export interface ExperimentArchiveProps {
  experiments: ReadonlyArray<ArchivedExperiment>
  caption?: string
  className?: string
}

const TONE_TO_CHIP: Record<ExperimentTone, ChipTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function formatLift(lift: number | undefined): string {
  if (lift === undefined) return "—"
  if (lift > 0) return `+${lift.toFixed(1)}%`
  if (lift < 0) return `${lift.toFixed(1)}%`
  return "0%"
}

export function ExperimentArchive({
  experiments,
  caption = "Experiment archive",
  className,
}: ExperimentArchiveProps) {
  const columns: ReadonlyArray<DataTableColumn<ArchivedExperiment>> = [
    {
      id: "name",
      header: "Experiment",
      sortable: true,
      cell: (row) => <span className={styles.nameCell}>{row.name}</span>,
    },
    {
      id: "ranFrom",
      header: "From",
      cell: (row) => <span className={styles.mono}>{row.ranFrom}</span>,
    },
    {
      id: "ranTo",
      header: "To",
      cell: (row) => <span className={styles.mono}>{row.ranTo}</span>,
    },
    {
      id: "winner",
      header: "Winner",
      cell: (row) => row.winningVariant ?? "—",
    },
    {
      id: "lift",
      header: "Final lift",
      align: "right",
      cell: (row) => (
        <span className={styles.mono}>{formatLift(row.finalLift)}</span>
      ),
    },
    {
      id: "decision",
      header: "Decision",
      cell: (row) => (
        <Chip
          label={DECISION_LABEL[row.decision]}
          tone={TONE_TO_CHIP[DECISION_TONE[row.decision]]}
        />
      ),
    },
    {
      id: "retro",
      header: "Retrospective",
      cell: (row) => (
        <Link href={row.retrospectiveHref} className={styles.link}>
          Open retro <span aria-hidden="true">→</span>
        </Link>
      ),
    },
  ]

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <DataTable
        rows={[...experiments]}
        columns={columns}
        getRowId={(row) => row.id}
        density="comfortable"
        zebra
        caption={caption}
        kicker="Archive"
      />
    </div>
  )
}

export default ExperimentArchive
