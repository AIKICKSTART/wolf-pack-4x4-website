"use client"

import { Plus } from "lucide-react"
import { useState } from "react"

import { DataTable } from "@/app/ui-primitives/components/data-display/data-table"
import type { DataTableColumn } from "@/app/ui-primitives/components/data-display/data-table"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"

import type { ScheduledJob } from "./_demo-data"
import styles from "./scheduled-jobs.module.css"

interface JobsTableProps {
  jobs: ReadonlyArray<ScheduledJob>
}

/**
 * Interactive scheduled-jobs table. Composes the registered DataTable
 * primitive and StatusBadge primitive; the only local state is the
 * per-job enabled toggle (visual demo only — no network). A "New job"
 * affordance sits in the header.
 */
export function JobsTable({ jobs }: JobsTableProps) {
  const [enabled, setEnabled] = useState<ReadonlyArray<string>>(() =>
    jobs.filter((job) => job.enabled).map((job) => job.id),
  )

  const isEnabled = (id: string) => enabled.includes(id)

  const toggle = (id: string) => {
    setEnabled((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    )
  }

  const columns: ReadonlyArray<DataTableColumn<ScheduledJob>> = [
    {
      id: "job",
      header: "Automation",
      sortable: true,
      cell: (job) => (
        <div className={styles.jobCell}>
          <span className={styles.jobName} data-off={isEnabled(job.id) ? undefined : "true"}>
            {job.name}
          </span>
          <span className={styles.jobBlurb}>{job.blurb}</span>
          <span className={styles.jobOwner}>{job.owner}</span>
        </div>
      ),
    },
    {
      id: "schedule",
      header: "Schedule",
      cell: (job) => (
        <div className={styles.scheduleCell}>
          <code className={styles.cron}>{job.cron}</code>
          <span className={styles.cadence}>{job.cadence}</span>
        </div>
      ),
    },
    {
      id: "next",
      header: "Next run",
      align: "right",
      cell: (job) => (
        <span className={styles.nextRun} data-paused={isEnabled(job.id) ? undefined : "true"}>
          {isEnabled(job.id) ? job.nextRun : "Paused"}
        </span>
      ),
    },
    {
      id: "last",
      header: "Last status",
      cell: (job) => (
        <div className={styles.lastCell}>
          <StatusBadge tone={job.lastStatus} size="sm" shape="pill" label={job.lastStatusLabel} />
          <span className={styles.lastRun}>{job.lastRun}</span>
        </div>
      ),
    },
    {
      id: "enabled",
      header: "Enabled",
      align: "center",
      cell: (job) => {
        const on = isEnabled(job.id)
        return (
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={`${on ? "Disable" : "Enable"} ${job.name}`}
            className={styles.toggle}
            data-on={on ? "true" : "false"}
            onClick={() => toggle(job.id)}
          >
            <span className={styles.toggleTrack} aria-hidden="true">
              <span className={styles.toggleThumb} />
            </span>
            <span className={styles.toggleText}>{on ? "On" : "Off"}</span>
          </button>
        )
      },
    },
  ]

  return (
    <section className={styles.tableFrame} aria-labelledby="scheduled-jobs-table-title">
      <header className={styles.tableHead}>
        <div className={styles.tableHeadText}>
          <span className={styles.tableKicker}>Automations roster</span>
          <h2 id="scheduled-jobs-table-title" className={styles.tableTitle}>
            Scheduled jobs
          </h2>
        </div>
        <button type="button" className={styles.newJobBtn}>
          <Plus size={15} strokeWidth={2.6} aria-hidden="true" />
          New job
        </button>
      </header>

      <DataTable
        rows={[...jobs]}
        columns={columns}
        getRowId={(job) => job.id}
        density="comfortable"
        caption="Scheduled Torque automations with cron schedule, next run and last status"
        zebra
      />
    </section>
  )
}

export default JobsTable
