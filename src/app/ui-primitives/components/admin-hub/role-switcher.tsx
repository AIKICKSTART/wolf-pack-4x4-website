"use client"

import { ChevronDown, Crown, ShieldAlert, ShieldCheck, UserCog } from "lucide-react"
import { useState } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import {
  ROLE_LABEL,
  adminToneToAvatar,
  adminToneToChip,
  type AdminRole,
  type AdminUser,
  type RoleId,
} from "./admin-hub-types"

import styles from "./role-switcher.module.css"

interface RoleSwitcherProps {
  user: AdminUser
  roles: ReadonlyArray<AdminRole>
  /** Force dropdown open in the showcase. Defaults to false. */
  defaultOpen?: boolean
  /** Optional callback when a role is switched. */
  onSwitch?: (roleId: RoleId) => void
  className?: string
}

function roleGlyph(roleId: RoleId) {
  if (roleId === "admin") return <Crown size={12} strokeWidth={2.4} aria-hidden="true" />
  if (roleId === "manager") return <ShieldCheck size={12} strokeWidth={2.4} aria-hidden="true" />
  return <UserCog size={12} strokeWidth={2.4} aria-hidden="true" />
}

export function RoleSwitcher({
  user,
  roles,
  defaultOpen = false,
  onSwitch,
  className,
}: RoleSwitcherProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const currentRole = roles.find((r) => r.id === user.roleId) ?? roles[0]

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      {user.impersonating && (
        <p className={styles.impersonateNotice} role="alert">
          <ShieldAlert size={12} strokeWidth={2.2} aria-hidden="true" />
          <span>
            Impersonating as <strong>{user.name}</strong>
            {user.impersonatorName && <> · session held by {user.impersonatorName}</>}
          </span>
        </p>
      )}

      <button
        type="button"
        className={styles.chipButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current role ${ROLE_LABEL[user.roleId]} — click to switch`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar
          name={user.name}
          tone={adminToneToAvatar(currentRole.tone)}
          size="sm"
        />
        <span className={styles.identity}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.roleLine}>
            <span className={styles.roleGlyph} aria-hidden="true">
              {roleGlyph(user.roleId)}
            </span>
            <span>{ROLE_LABEL[user.roleId]}</span>
          </span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.4}
          className={[styles.chevron, open ? styles.chevronOpen : ""].join(" ")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Switch role">
          {roles.map((role) => {
            const active = role.id === user.roleId
            return (
              <li
                key={role.id}
                role="option"
                tabIndex={0}
                aria-selected={active}
                className={[styles.menuItem, active ? styles.menuItemActive : ""].join(" ")}
                onClick={() => {
                  onSwitch?.(role.id)
                  setOpen(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onSwitch?.(role.id)
                    setOpen(false)
                  }
                }}
              >
                <span className={styles.menuItemHead}>
                  <Chip
                    label={role.label}
                    tone={adminToneToChip(role.tone)}
                    icon={roleGlyph(role.id)}
                  />
                  {active && <span className={styles.activeTag}>Current</span>}
                </span>
                <p className={styles.menuItemDesc}>{role.description}</p>
                <ul className={styles.permissions} aria-label="Permissions">
                  {role.permissions.map((perm) => (
                    <li key={perm} className={styles.permission}>
                      {perm}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default RoleSwitcher
