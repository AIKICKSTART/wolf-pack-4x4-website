"use client"

import { useMemo, useState } from "react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import type { RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./workspace-switcher.module.css"

export interface WorkspaceEntry {
  readonly id: string
  readonly name: string
  readonly suburb: string
  readonly memberCount: number
  readonly plan: "Starter" | "Workshop" | "Fleet" | "Enterprise"
  readonly roleInWorkspace: string
  readonly roleTone?: RoleTone
  readonly avatarTone?: AvatarTone
}

interface WorkspaceSwitcherProps {
  current: WorkspaceEntry
  workspaces: ReadonlyArray<WorkspaceEntry>
  onSelect?: (id: string) => void
  className?: string
}

export function WorkspaceSwitcher({
  current,
  workspaces,
  onSelect,
  className,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const switcherId = "workspace-switcher-list"

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle.length === 0) {
      return workspaces
    }
    return workspaces.filter((workspace) => {
      const hay = `${workspace.name} ${workspace.suburb} ${workspace.roleInWorkspace}`.toLowerCase()
      return hay.includes(needle)
    })
  }, [query, workspaces])

  const handleSelect = (id: string) => {
    onSelect?.(id)
    setOpen(false)
  }

  const classes = [styles.switcher, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={switcherId}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar
          name={current.name}
          tone={current.avatarTone ?? "red"}
          size="md"
        />
        <span className={styles.triggerBody}>
          <span className={styles.triggerLabel}>Workspace</span>
          <strong className={styles.triggerName}>{current.name}</strong>
          <span className={styles.triggerMeta}>
            {current.suburb} · {current.memberCount} members · {current.plan}
          </span>
        </span>
        <span className={styles.triggerGlyph} data-open={open ? "true" : "false"} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Switch workspace">
          <div className={styles.search}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Find a workspace…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Filter workspaces"
            />
          </div>

          <ul id={switcherId} className={styles.list} role="listbox">
            {filtered.length === 0 ? (
              <li className={styles.empty} role="presentation">
                No workspaces match
              </li>
            ) : (
              filtered.map((workspace) => {
                const isCurrent = workspace.id === current.id
                return (
                  <li key={workspace.id} role="option" aria-selected={isCurrent}>
                    <button
                      type="button"
                      className={styles.row}
                      aria-current={isCurrent ? "true" : undefined}
                      onClick={() => handleSelect(workspace.id)}
                    >
                      <Avatar
                        name={workspace.name}
                        tone={workspace.avatarTone ?? "obsidian"}
                        size="md"
                      />
                      <span className={styles.rowBody}>
                        <span className={styles.rowName}>{workspace.name}</span>
                        <span className={styles.rowMeta}>
                          {workspace.suburb} · {workspace.memberCount} members
                        </span>
                      </span>
                      <span className={styles.rowRole}>
                        <RoleBadge
                          label={workspace.roleInWorkspace}
                          tone={workspace.roleTone ?? "member"}
                          size="sm"
                        />
                      </span>
                      <span className={styles.rowPlan}>{workspace.plan}</span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default WorkspaceSwitcher
