/**
 * Shared types for the code-diff / version-control primitive group.
 *
 * Used by every component under `code-diff/` so diff lines, PR cards,
 * file-tree entries, and review threads speak a single vocabulary
 * without leaking `any`.
 */

/** Single line classification inside a diff hunk. */
export type DiffLineKind = "added" | "removed" | "context" | "meta"

/** Pull request lifecycle state. */
export type PrStatus =
  | "draft"
  | "open"
  | "changes-requested"
  | "approved"
  | "merged"
  | "closed"

/** File status inside a changeset. */
export type FileChangeKind = "added" | "modified" | "renamed" | "deleted"

/** Review verdict an author selects in the approve-changes group. */
export type ReviewVerdict = "approve" | "request-changes" | "comment"

/** CI / status-check status used by PR card check rows. */
export type CheckStatus = "pending" | "passing" | "failing" | "skipped"

/** Branch protection level used on the branch chip + approve group. */
export type BranchProtection = "none" | "review-required" | "admins-only"

/** A single diff line as rendered in inline + side-by-side diffs. */
export interface DiffLine {
  /** Classification — drives tone. */
  kind: DiffLineKind
  /** Old-side line number (omit for added). */
  oldLineNumber?: number
  /** New-side line number (omit for removed). */
  newLineNumber?: number
  /** Raw line text without leading +/- marker. */
  text: string
}

/** Range header for a diff hunk — @@ -a,b +c,d @@. */
export interface HunkRange {
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  /** Optional function-context label appended after the range. */
  context?: string
}

/** Commit summary used by commit-card + commit-graph-mini. */
export interface CommitSummary {
  sha: string
  author: string
  authorEmail?: string
  message: string
  body?: string
  branch?: string
  signed?: boolean
  timestamp: string
}

/** Single PR check row used by pull-request-card. */
export interface CheckRow {
  name: string
  status: CheckStatus
  durationLabel?: string
}

/** File entry inside file-tree-changes. */
export interface FileChange {
  path: string
  kind: FileChangeKind
  insertions: number
  deletions: number
}

/** Format a sha to 7 characters — git short sha convention. */
export function shortSha(sha: string): string {
  return sha.slice(0, 7)
}

/** Pretty-print a hunk range — @@ -1,4 +1,6 @@. */
export function hunkRangeLabel(range: HunkRange): string {
  const oldPart = `-${range.oldStart},${range.oldLines}`
  const newPart = `+${range.newStart},${range.newLines}`
  const base = `@@ ${oldPart} ${newPart} @@`
  return range.context ? `${base} ${range.context}` : base
}
