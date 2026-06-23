"use client"

import { Globe, Laptop, Smartphone, Tablet, type LucideIcon } from "lucide-react"

import { DataTable, type DataTableColumn } from "../data-display/data-table"
import { Chip } from "../primitives/chip"
import styles from "./session-table.module.css"

export type SessionDeviceKind = "desktop" | "laptop" | "phone" | "tablet" | "browser"

export interface ActiveSession {
  readonly id: string
  readonly device: SessionDeviceKind
  readonly label: string
  readonly browser: string
  readonly ip: string
  readonly location: string
  readonly lastActive: string
  readonly current?: boolean
}

interface SessionTableProps {
  sessions: ReadonlyArray<ActiveSession>
  onRevoke?: (id: string) => void
  className?: string
  caption?: string
  kicker?: string
}

const DEVICE_ICON: Record<SessionDeviceKind, LucideIcon> = {
  desktop: Laptop,
  laptop: Laptop,
  phone: Smartphone,
  tablet: Tablet,
  browser: Globe,
}

const DEVICE_LABEL: Record<SessionDeviceKind, string> = {
  desktop: "Desktop",
  laptop: "Laptop",
  phone: "Phone",
  tablet: "Tablet",
  browser: "Browser",
}

export function SessionTable({
  sessions,
  onRevoke,
  className,
  caption = "Sessions currently signed in to this workspace",
  kicker = "Active sessions",
}: SessionTableProps) {
  const columns: DataTableColumn<ActiveSession>[] = [
    {
      id: "device",
      header: "Device",
      cell: (row) => {
        const Icon = DEVICE_ICON[row.device]
        return (
          <span className={styles.deviceCell}>
            <span className={styles.deviceIcon} aria-hidden="true">
              <Icon size={16} strokeWidth={2.1} />
            </span>
            <span>
              <strong>{row.label}</strong>
              <small>{DEVICE_LABEL[row.device]} · {row.browser}</small>
            </span>
          </span>
        )
      },
    },
    {
      id: "ip",
      header: "IP",
      cell: (row) => <code className={styles.mono}>{row.ip}</code>,
    },
    {
      id: "location",
      header: "Location",
      cell: (row) => <span>{row.location}</span>,
    },
    {
      id: "lastActive",
      header: "Last active",
      sortable: true,
      cell: (row) => <span className={styles.mono}>{row.lastActive}</span>,
    },
    {
      id: "current",
      header: "Status",
      align: "center",
      cell: (row) =>
        row.current ? <Chip label="This device" tone="teal" /> : <Chip label="Live" tone="green" />,
    },
    {
      id: "actions",
      header: "",
      align: "right",
      width: "120px",
      cell: (row) =>
        row.current ? (
          <span className={styles.lockedAction}>—</span>
        ) : (
          <button
            type="button"
            className={styles.revokeBtn}
            onClick={() => onRevoke?.(row.id)}
            aria-label={`Revoke session on ${row.label}`}
          >
            Revoke
          </button>
        ),
    },
  ]

  const wrapperClass = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={wrapperClass}>
      <DataTable
        rows={[...sessions]}
        columns={columns}
        getRowId={(row) => row.id}
        density="comfortable"
        zebra
        kicker={kicker}
        caption={caption}
      />
    </div>
  )
}

export default SessionTable
