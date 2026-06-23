/**
 * Version history + rollback types.
 *
 * Every save of a page snapshots its `PageConfig` into an immutable
 * `PageVersion`. The CMS keeps the ordered list (`VersionHistory`) so an owner
 * can diff, compare, and roll back. This aligns with Payload's native
 * `versions.drafts` on `MarketingPages` — a Payload version row maps onto a
 * `PageVersion` (see `payload-mapping.ts`); we model the editorial metadata
 * Payload's bare version row does not carry (label, workflow state at capture,
 * change summary, rollback provenance).
 *
 * Snapshots are pure data: a frozen `PageConfig` plus metadata. No design values
 * here — the snapshot's blocks already reference tokens only.
 */

import type { PageConfig } from "../model"
import type { WorkflowState } from "./workflow"

/** Why a version was captured. */
export type VersionTrigger =
  | "autosave"
  | "manual-save"
  | "submit"
  | "approve"
  | "publish"
  | "rollback"
  | "import"

/**
 * One immutable snapshot of a page at a point in time. The `snapshot` is a deep,
 * frozen `PageConfig` — replaying it reproduces the page exactly.
 */
export interface PageVersion {
  /** Stable version id, e.g. "ver_…". */
  id: string
  /** The page this version belongs to. */
  pageId: string
  /** Monotonic version number within the page (1-based). */
  versionNumber: number
  /** The frozen page config at capture time. */
  snapshot: PageConfig
  /** The workflow state the page was in when captured. */
  workflowState: WorkflowState
  trigger: VersionTrigger
  /** Optional human label, e.g. "Spring promo layout". */
  label?: string
  /** Short summary of what changed vs. the previous version. */
  changeSummary?: string
  /** User id who created the version. */
  authorId: string
  /** ISO timestamp. */
  createdAt: string
  /** When this version was created by rolling back, the source version id. */
  rolledBackFrom?: string
  /** Whether this version is the one currently live in production. */
  isPublished: boolean
}

/** The ordered version log for a page. */
export interface VersionHistory {
  pageId: string
  /** All versions, oldest → newest. */
  versions: readonly PageVersion[]
  /** The id of the version currently live (if any). */
  publishedVersionId?: string
  /** The id of the latest draft version. */
  latestVersionId: string
}

/**
 * A request to roll a page back to a prior version. Rollback never mutates the
 * target version; it captures a NEW version whose snapshot equals the target's,
 * preserving the full forward history (Git-revert semantics, not reset).
 */
export interface RollbackRequest {
  pageId: string
  /** The version to restore. */
  toVersionId: string
  /** User performing the rollback. */
  actorId: string
  /** Optional note explaining the rollback. */
  reason?: string
}

/** The outcome of a rollback: the newly created version, or a failure reason. */
export type RollbackResult =
  | { ok: true; newVersion: PageVersion }
  | { ok: false; error: string }

/** A field-level diff entry between two versions. */
export interface VersionDiffEntry {
  /** Dot/bracket path into the page config, e.g. "blocks[2].props.heading". */
  path: string
  kind: "added" | "removed" | "changed"
  /** Serialisable before/after values (undefined for added/removed sides). */
  before?: unknown
  after?: unknown
}

/** A computed diff between two versions of a page. */
export interface VersionDiff {
  pageId: string
  fromVersionId: string
  toVersionId: string
  entries: readonly VersionDiffEntry[]
}

/** Find a version in a history by id. Pure. */
export function findVersion(history: VersionHistory, versionId: string): PageVersion | undefined {
  return history.versions.find((v) => v.id === versionId)
}

/** The latest (newest) version in a history, if any. Pure. */
export function latestVersion(history: VersionHistory): PageVersion | undefined {
  return history.versions.length > 0 ? history.versions[history.versions.length - 1] : undefined
}

/** The next version number for a page (max existing + 1). Pure. */
export function nextVersionNumber(history: VersionHistory): number {
  return history.versions.reduce((max, v) => Math.max(max, v.versionNumber), 0) + 1
}
