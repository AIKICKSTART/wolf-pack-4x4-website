"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import type { RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./role-inspector.module.css"

export interface RoleScope {
  readonly id: string
  readonly label: string
  readonly tone?: "neutral" | "red" | "amber" | "teal" | "green"
}

export interface RolePermissionLine {
  readonly id: string
  readonly label: string
  readonly hint?: string
}

interface RoleInspectorProps {
  roleName: string
  roleTone?: RoleTone
  /** Description of the role's intent. */
  summary: string
  memberCount: number
  permissionCount: number
  scopes: ReadonlyArray<RoleScope>
  permissions: ReadonlyArray<RolePermissionLine>
  /** Default collapsed/expanded state. */
  defaultOpen?: boolean
  className?: string
}

export function RoleInspector({
  roleName,
  roleTone = "member",
  summary,
  memberCount,
  permissionCount,
  scopes,
  permissions,
  defaultOpen = false,
  className,
}: RoleInspectorProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const panelId = `role-inspector-${roleName.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <article className={classes} aria-label={`Role inspector for ${roleName}`}>
      <header className={styles.head}>
        <RoleBadge label={roleName} tone={roleTone} size="lg" />
        <p className={styles.summary}>{summary}</p>
      </header>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>Members</dt>
          <dd>{memberCount.toLocaleString("en-AU")}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Permissions granted</dt>
          <dd>{permissionCount.toLocaleString("en-AU")}</dd>
        </div>
        <div className={styles.stat}>
          <dt>Scopes</dt>
          <dd>{scopes.length}</dd>
        </div>
      </dl>

      <div className={styles.scopes}>
        <span className={styles.label}>Scopes</span>
        <ul className={styles.chipList}>
          {scopes.map((scope) => (
            <li key={scope.id}>
              <Chip label={scope.label} tone={scope.tone ?? "neutral"} />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{open ? "Hide permission set" : "Reveal permission set"}</span>
        <span className={styles.toggleGlyph} data-open={open ? "true" : "false"} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul id={panelId} className={styles.permissions}>
          {permissions.map((line) => (
            <li key={line.id}>
              <code>{line.id}</code>
              <span className={styles.permLabel}>{line.label}</span>
              {line.hint && <span className={styles.permHint}>{line.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default RoleInspector
