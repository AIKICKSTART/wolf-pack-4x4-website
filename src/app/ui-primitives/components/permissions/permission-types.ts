/**
 * Shared RBAC primitive types for the permissions namespace.
 *
 * Realistic Mufflermen workshop domain — roles map to actual shop
 * positions (workshop manager, parts receiver, front desk) and
 * resources map to the booking, quoting and parts flows.
 */

export type RoleId =
  | "owner"
  | "admin"
  | "workshop-manager"
  | "workshop"
  | "parts-receiver"
  | "front-desk"
  | "billing"
  | "viewer"
  | "guest"

export type ResourceKind =
  | "jobs"
  | "quotes"
  | "parts"
  | "invoices"
  | "settings"
  | "users"
  | "api"

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "export"

/**
 * `inherited` means the cell follows the role-level default; `allow` and
 * `deny` are explicit overrides on this principal.
 */
export type PermissionCellState = "allow" | "deny" | "inherited"

export type PrincipalKind = "user" | "role" | "group" | "service-account"

export type AccessSource = "direct" | "inherited" | "group" | "workspace"

export type RoleTone =
  | "owner"
  | "admin"
  | "member"
  | "viewer"
  | "billing"
  | "workshop"
  | "guest"

export interface PermissionResource {
  readonly id: ResourceKind
  readonly label: string
  readonly hint?: string
}

export interface PermissionActionConfig {
  readonly id: PermissionAction
  readonly label: string
}

export type PermissionMatrixRow = Record<PermissionAction, PermissionCellState>

export type PermissionMatrixValue = Record<ResourceKind, PermissionMatrixRow>

export interface ApiScope {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly tone?: RoleTone
}

export interface AuditEvent {
  readonly id: string
  readonly timestamp: string
  readonly actor: string
  readonly actorAvatarTone?: "red" | "amber" | "teal" | "green" | "obsidian"
  readonly action: string
  readonly resource: string
  readonly target?: string
  readonly tone: "info" | "success" | "warn" | "danger"
  readonly ip?: string
  readonly location?: string
  readonly payload?: string
}
