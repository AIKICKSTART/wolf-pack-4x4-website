"use client"

import { X } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { AccessSource, RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./acl-row.module.css"

export type AclPrincipalKind = "user" | "role" | "group" | "service-account"

export interface AclPrincipal {
  readonly kind: AclPrincipalKind
  readonly name: string
  readonly subtitle?: string
  readonly avatarTone?: AvatarTone
  readonly roleTone?: RoleTone
}

export interface AclRowGrant {
  readonly id: string
  readonly label: string
  readonly tone?: "neutral" | "red" | "amber" | "teal" | "green"
}

interface AclRowProps {
  principal: AclPrincipal
  grants: ReadonlyArray<AclRowGrant>
  source: AccessSource
  /** ISO date when the grant ends, or null for never. */
  expiresAt?: string | null
  onRemove?: () => void
  removable?: boolean
  className?: string
}

const SOURCE_LABEL: Record<AccessSource, string> = {
  direct: "Direct grant",
  inherited: "Inherited",
  group: "Group rule",
  workspace: "Workspace default",
}

function formatExpiry(value: string | null | undefined): string {
  if (!value) return "Never"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function AclRow({
  principal,
  grants,
  source,
  expiresAt = null,
  onRemove,
  removable = true,
  className,
}: AclRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="listitem">
      <div className={styles.principal}>
        {principal.kind === "role" ? (
          <RoleBadge label={principal.name} tone={principal.roleTone ?? "member"} size="md" />
        ) : (
          <>
            <Avatar name={principal.name} tone={principal.avatarTone ?? "obsidian"} size="md" />
            <div className={styles.identity}>
              <span className={styles.name}>{principal.name}</span>
              {principal.subtitle && (
                <span className={styles.subtitle}>{principal.subtitle}</span>
              )}
            </div>
          </>
        )}
      </div>

      <ul className={styles.grants} aria-label={`Grants for ${principal.name}`}>
        {grants.map((grant) => (
          <li key={grant.id}>
            <Chip label={grant.label} tone={grant.tone ?? "neutral"} />
          </li>
        ))}
      </ul>

      <div className={styles.meta}>
        <span className={styles.source} data-source={source}>
          {SOURCE_LABEL[source]}
        </span>
        <span className={styles.expiry}>
          <span className={styles.expiryLabel}>Expires</span>
          <time dateTime={expiresAt ?? undefined}>{formatExpiry(expiresAt)}</time>
        </span>
      </div>

      {removable && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label={`Remove ${principal.name} access`}
        >
          <X size={14} strokeWidth={2.4} aria-hidden="true" />
          <span>Remove</span>
        </button>
      )}
    </div>
  )
}

export default AclRow
