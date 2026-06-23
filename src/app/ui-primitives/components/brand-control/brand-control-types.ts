/**
 * Brand-control primitive family — shared domain types.
 *
 * One central "umbrella" hub where a single token edit cascades to every
 * surface that reads `var(--primitive-*)`. The model captures:
 *  • design tokens (color / spacing / radius / shadow / font)
 *  • palette + contrast verdict
 *  • typography pairing
 *  • motion duration/easing
 *  • brand assets + role permissions + audit log
 *  • staged theme deploy + release channel + accessibility gate
 *
 * The types here are deliberately exhaustive but minimal — each primitive
 * picks the subset it needs.
 */

import type { ReactNode } from "react"

// ─────────────────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────────────────

export type BrandTokenCategory = "color" | "spacing" | "radius" | "shadow" | "font"

/**
 * A single design token. `cssVar` is the `--primitive-*` custom property the
 * value writes to so other primitives can subscribe to changes.
 */
export interface BrandToken {
  id: string
  label: string
  category: BrandTokenCategory
  value: string
  cssVar: string
  description?: string
  /** Number of primitives currently consuming this token. */
  consumers?: number
  /** Optional preview value used by readonly grids. */
  preview?: string
}

export interface BrandTokenHistoryEntry {
  id: string
  tokenId: string
  before: string
  after: string
  /** ISO timestamp. */
  changedAt: string
  changedBy: string
}

// ─────────────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────────────

export type ContrastVerdict = "aaa" | "aa" | "aa-large" | "fail"

export interface OklchColor {
  l: number
  c: number
  h: number
}

export interface PaletteSwatch {
  id: string
  label: string
  hex: string
  oklch: OklchColor
  role: "primary" | "secondary" | "support" | "warning" | "success" | "surface" | "text"
}

export interface ContrastResult {
  ratio: number
  verdict: ContrastVerdict
  largeText: boolean
  background: string
  foreground: string
}

// ─────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────

export interface TypographyPairing {
  id: string
  label: string
  displayFamily: string
  displaySample: string
  bodyFamily: string
  bodySample: string
  rationale: string
  tags: ReadonlyArray<string>
}

// ─────────────────────────────────────────────────────────────────────────
// Motion
// ─────────────────────────────────────────────────────────────────────────

export interface MotionDurationToken {
  id: string
  label: string
  ms: number
}

export interface MotionEasingToken {
  id: string
  label: string
  /** Cubic-bezier 4-tuple. */
  bezier: readonly [number, number, number, number]
}

// ─────────────────────────────────────────────────────────────────────────
// Assets
// ─────────────────────────────────────────────────────────────────────────

export type AssetKind = "logo" | "wordmark" | "monogram" | "pattern" | "photo" | "icon"

export interface BrandAssetVariant {
  id: string
  label: string
  format: "svg" | "png" | "webp" | "avif"
  bytes: number
}

export interface BrandAsset {
  id: string
  name: string
  kind: AssetKind
  cdnPath: string
  bytes: number
  usageCount: number
  variants: ReadonlyArray<BrandAssetVariant>
  uploadedAt: string
  uploadedBy: string
}

// ─────────────────────────────────────────────────────────────────────────
// Roles / People / Audit
// ─────────────────────────────────────────────────────────────────────────

export type RoleId = "founder" | "brand" | "parts" | "workshop" | "contractor"

export type PermissionId =
  | "tokens.edit"
  | "assets.upload"
  | "theme.deploy"
  | "brand.publish"
  | "audit.read"

export type PermissionLevel = "none" | "inherit" | "read" | "write" | "admin"

export interface RoleMatrixCell {
  roleId: RoleId
  permissionId: PermissionId
  level: PermissionLevel
  inheritedFrom?: RoleId
}

export interface TeamMember {
  id: string
  name: string
  roleId: RoleId
  email: string
  avatarInitial: string
  lastActive: string
  scope: ReadonlyArray<string>
}

export type AuditAction = "edit" | "upload" | "publish" | "deploy" | "rollback"

export interface AuditLogEntry {
  id: string
  actor: string
  action: AuditAction
  resource: string
  resourceLabel: string
  timestamp: string
  diff?: {
    before: string
    after: string
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Deploy / Channels / Gate
// ─────────────────────────────────────────────────────────────────────────

export type DeployStage = "draft" | "staging" | "production"
export type DeployStatus = "queued" | "rolling" | "live" | "halted"

export interface ThemeDeployment {
  id: string
  themeLabel: string
  stage: DeployStage
  status: DeployStatus
  rolloutPct: number
  changedTokenIds: ReadonlyArray<string>
  startedAt: string
  promotedBy?: string
}

export type ReleaseChannel = "alpha" | "beta" | "production"

export interface ChannelInfo {
  id: ReleaseChannel
  label: string
  version: string
  diffCount: number
  description: string
}

export type AccessibilityCheckId = "contrast" | "focus" | "motion" | "aria"

export interface AccessibilityCheckResult {
  id: AccessibilityCheckId
  label: string
  verdict: "pass" | "warn" | "fail"
  passing: number
  total: number
  note?: string
}

// ─────────────────────────────────────────────────────────────────────────
// Brand guidelines / coverage / umbrella graph
// ─────────────────────────────────────────────────────────────────────────

export type GuidelineSection = "logo" | "voice" | "do" | "dont"

export interface BrandGuidelineRule {
  id: string
  section: GuidelineSection
  title: string
  body: string
  emphasis?: ReactNode
}

export interface UmbrellaImpactNode {
  id: string
  label: string
  consumers: number
  tone: "red" | "amber" | "teal" | "green" | "neutral"
}

export interface UsageCoverageDatum {
  family: string
  adopted: number
  total: number
}
