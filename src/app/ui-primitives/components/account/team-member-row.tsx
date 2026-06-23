"use client"

import { Trash2 } from "lucide-react"
import { useId, type ChangeEvent } from "react"

import { Avatar, type AvatarTone } from "../primitives/avatar"
import { Chip, type ChipTone } from "../primitives/chip"
import styles from "./team-member-row.module.css"

export type TeamMemberRole = "owner" | "admin" | "manager" | "technician" | "viewer"
export type TeamMemberStatus = "active" | "invited" | "suspended"

export interface TeamMemberRowItem {
  id: string
  name: string
  email: string
  role: TeamMemberRole
  status?: TeamMemberStatus
  avatarSrc?: string
  avatarTone?: AvatarTone
  bay?: string
}

interface TeamMemberRowProps {
  member: TeamMemberRowItem
  onRoleChange?: (id: string, role: TeamMemberRole) => void
  onRemove?: (id: string) => void
  disabled?: boolean
  className?: string
}

const ROLE_OPTIONS: ReadonlyArray<{ value: TeamMemberRole; label: string }> = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Bay manager" },
  { value: "technician", label: "Technician" },
  { value: "viewer", label: "Viewer" },
]

const STATUS_CHIP: Record<TeamMemberStatus, { label: string; tone: ChipTone }> = {
  active: { label: "Active", tone: "green" },
  invited: { label: "Invite pending", tone: "amber" },
  suspended: { label: "Suspended", tone: "red" },
}

export function TeamMemberRow({
  member,
  onRoleChange,
  onRemove,
  disabled = false,
  className,
}: TeamMemberRowProps) {
  const roleId = useId()
  const classes = [
    styles.row,
    disabled ? styles.disabled : "",
    member.status === "invited" ? styles.invited : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const status = member.status ?? "active"
  const statusChip = STATUS_CHIP[status]

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!onRoleChange) {
      return
    }
    const value = event.target.value as TeamMemberRole
    onRoleChange(member.id, value)
  }

  const handleRemove = () => {
    if (onRemove && !disabled) {
      onRemove(member.id)
    }
  }

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <Avatar
          name={member.name}
          src={member.avatarSrc}
          tone={member.avatarTone ?? "obsidian"}
          size="md"
          status={status === "active" ? "online" : status === "invited" ? "away" : "offline"}
        />
        <div className={styles.identityText}>
          <span className={styles.name}>{member.name}</span>
          <span className={styles.email}>{member.email}</span>
        </div>
      </div>

      <div className={styles.meta}>
        {member.bay && <span className={styles.bay}>{member.bay}</span>}
        <Chip label={statusChip.label} tone={statusChip.tone} />
      </div>

      <div className={styles.controls}>
        <label htmlFor={roleId} className={styles.roleLabel}>
          Role
        </label>
        <select
          id={roleId}
          className={styles.roleSelect}
          value={member.role}
          onChange={handleRoleChange}
          disabled={disabled}
          aria-label={`Role for ${member.name}`}
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={styles.removeBtn}
          onClick={handleRemove}
          disabled={disabled}
          aria-label={`Remove ${member.name}`}
        >
          <Trash2 size={14} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default TeamMemberRow
