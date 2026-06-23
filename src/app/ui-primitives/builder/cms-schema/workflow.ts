/**
 * Editorial workflow state machine.
 *
 * The draft → review → approved → scheduled → published lifecycle, with an
 * explicit human-approval gate before anything reaches production, plus
 * rollback. This is a typed superset of the builder model's `PageStatus`
 * (`draft | in-review | published | archived`): every CMS state maps back onto
 * one of those four for storage (see `WORKFLOW_TO_PAGE_STATUS` and
 * `payload-mapping.ts`), while the CMS tracks the finer-grained state.
 *
 * The machine is data, not behaviour: `WORKFLOW_TRANSITIONS` declares the legal
 * edges and which role may take each, and `canTransition` is a pure guard. No
 * side effects, no design values.
 */

import type { PageStatus } from "../model"

/**
 * The fine-grained editorial state of a page version.
 *
 *   draft      — being edited; never public.
 *   review     — submitted; awaiting an approver (the human gate).
 *   approved   — an approver signed off; cleared for publish/schedule.
 *   scheduled  — approved + queued to go live at `scheduledFor`.
 *   published  — live in production.
 *   archived   — retired from production; retained in history.
 *   rejected   — review failed; bounced back to the author with notes.
 */
export type WorkflowState =
  | "draft"
  | "review"
  | "approved"
  | "scheduled"
  | "published"
  | "archived"
  | "rejected"

export const WORKFLOW_STATES: readonly WorkflowState[] = [
  "draft",
  "review",
  "approved",
  "scheduled",
  "published",
  "archived",
  "rejected",
] as const

export function isWorkflowState(value: unknown): value is WorkflowState {
  return typeof value === "string" && (WORKFLOW_STATES as readonly string[]).includes(value)
}

/**
 * Roles in the workflow. The approval gate requires an `approver` (or higher) —
 * an `author` may never approve their own work to production.
 */
export type WorkflowRole = "author" | "editor" | "approver" | "admin"

export const WORKFLOW_ROLES: readonly WorkflowRole[] = [
  "author",
  "editor",
  "approver",
  "admin",
] as const

/** Role seniority, low → high. Index doubles as a privilege level. */
export const WORKFLOW_ROLE_ORDER: readonly WorkflowRole[] = [
  "author",
  "editor",
  "approver",
  "admin",
] as const

/** Whether `role` has at least the privilege of `required`. */
export function roleSatisfies(role: WorkflowRole, required: WorkflowRole): boolean {
  return WORKFLOW_ROLE_ORDER.indexOf(role) >= WORKFLOW_ROLE_ORDER.indexOf(required)
}

/**
 * The named action that drives a transition. Mirrors the buttons an editor
 * sees: Submit, Approve, Reject, Schedule, Publish, etc.
 */
export type WorkflowAction =
  | "submit"
  | "approve"
  | "reject"
  | "schedule"
  | "publish"
  | "unpublish"
  | "archive"
  | "restore"
  | "withdraw"
  | "rollback"

/** One legal edge in the state machine. */
export interface WorkflowTransition {
  action: WorkflowAction
  from: WorkflowState
  to: WorkflowState
  /** Minimum role required to take this edge. */
  minRole: WorkflowRole
  /** Whether this edge crosses the production boundary (publishes/unpublishes). */
  affectsProduction: boolean
  /** One-line description for the UI + the doc. */
  description: string
}

/**
 * The complete transition table. This is the single source of truth for the
 * lifecycle: the UI derives available actions from it, and `canTransition`
 * guards every state change against it.
 *
 * The human-approval gate is structural: the only edges INTO `approved`/
 * `published`/`scheduled` require `approver`+, and `submit` is the only way out
 * of `draft` toward production — an author cannot self-publish.
 */
export const WORKFLOW_TRANSITIONS: readonly WorkflowTransition[] = [
  {
    action: "submit",
    from: "draft",
    to: "review",
    minRole: "author",
    affectsProduction: false,
    description: "Author submits the draft for approval.",
  },
  {
    action: "withdraw",
    from: "review",
    to: "draft",
    minRole: "author",
    affectsProduction: false,
    description: "Author pulls the page back out of review to keep editing.",
  },
  {
    action: "approve",
    from: "review",
    to: "approved",
    minRole: "approver",
    affectsProduction: false,
    description: "Approver signs off — the human gate before production.",
  },
  {
    action: "reject",
    from: "review",
    to: "rejected",
    minRole: "approver",
    affectsProduction: false,
    description: "Approver bounces the page back with required changes.",
  },
  {
    action: "withdraw",
    from: "rejected",
    to: "draft",
    minRole: "author",
    affectsProduction: false,
    description: "Author returns a rejected page to draft to address notes.",
  },
  {
    action: "publish",
    from: "approved",
    to: "published",
    minRole: "approver",
    affectsProduction: true,
    description: "Approved page goes live immediately.",
  },
  {
    action: "schedule",
    from: "approved",
    to: "scheduled",
    minRole: "approver",
    affectsProduction: false,
    description: "Approved page is queued to publish at a future time.",
  },
  {
    action: "withdraw",
    from: "scheduled",
    to: "approved",
    minRole: "approver",
    affectsProduction: false,
    description: "Cancel a scheduled publish; the page stays approved.",
  },
  {
    action: "publish",
    from: "scheduled",
    to: "published",
    minRole: "approver",
    affectsProduction: true,
    description: "Scheduler fires: the queued page goes live.",
  },
  {
    action: "unpublish",
    from: "published",
    to: "draft",
    minRole: "approver",
    affectsProduction: true,
    description: "Pull a live page down for further editing.",
  },
  {
    action: "archive",
    from: "published",
    to: "archived",
    minRole: "approver",
    affectsProduction: true,
    description: "Retire a live page from production, keeping its history.",
  },
  {
    action: "archive",
    from: "draft",
    to: "archived",
    minRole: "editor",
    affectsProduction: false,
    description: "Shelve a draft without deleting it.",
  },
  {
    action: "restore",
    from: "archived",
    to: "draft",
    minRole: "editor",
    affectsProduction: false,
    description: "Bring an archived page back as a draft.",
  },
] as const

/** Result of evaluating a transition request. */
export interface TransitionCheck {
  allowed: boolean
  /** The resolved edge when allowed. */
  transition?: WorkflowTransition
  /** Human-readable reason when not allowed. */
  reason?: string
}

/**
 * Pure guard: may `role` take `action` from `from`? Returns the matched edge or
 * a reason. Does not mutate; callers apply the resulting `to` state themselves.
 */
export function canTransition(
  from: WorkflowState,
  action: WorkflowAction,
  role: WorkflowRole,
): TransitionCheck {
  const edge = WORKFLOW_TRANSITIONS.find((t) => t.from === from && t.action === action)
  if (!edge) {
    return { allowed: false, reason: `No "${action}" transition from "${from}".` }
  }
  if (!roleSatisfies(role, edge.minRole)) {
    return {
      allowed: false,
      reason: `Role "${role}" cannot "${action}"; requires "${edge.minRole}".`,
    }
  }
  return { allowed: true, transition: edge }
}

/** All actions `role` may currently take from `from`. */
export function availableActions(from: WorkflowState, role: WorkflowRole): readonly WorkflowAction[] {
  return WORKFLOW_TRANSITIONS.filter(
    (t) => t.from === from && roleSatisfies(role, t.minRole),
  ).map((t) => t.action)
}

/**
 * Collapse a fine-grained CMS state onto the four-state Payload `PageStatus`
 * for storage. `review`/`rejected` are both pre-prod review states; `approved`/
 * `scheduled` are staged-but-not-live (held as drafts until they publish).
 */
export function toPageStatus(state: WorkflowState): PageStatus {
  switch (state) {
    case "published":
      return "published"
    case "archived":
      return "archived"
    case "review":
    case "rejected":
      return "in-review"
    case "draft":
    case "approved":
    case "scheduled":
      return "draft"
  }
}

/**
 * An approval record — the audit of the human gate. Captures who decided, when,
 * and why, so production changes are always attributable.
 */
export interface ApprovalRecord {
  id: string
  /** The version this approval applies to. */
  versionId: string
  decision: "approved" | "rejected"
  /** User id of the approver. */
  approvedBy: string
  approverRole: WorkflowRole
  /** ISO timestamp. */
  decidedAt: string
  /** Required when rejected; optional sign-off note when approved. */
  note?: string
}

/**
 * A scheduled-publish ticket. Created on `schedule`, consumed when the
 * scheduler fires `publish`. `timezone` is an IANA zone, e.g. "Australia/Sydney".
 */
export interface PublishSchedule {
  versionId: string
  /** ISO timestamp for go-live. */
  scheduledFor: string
  timezone: string
  /** Optional auto-unpublish (expiry) ISO timestamp. */
  expiresAt?: string
  scheduledBy: string
}

/**
 * The live workflow state of a page, bundling current state, the gate audit,
 * and any pending schedule. This is what the CMS persists alongside the page.
 */
export interface WorkflowStatus {
  state: WorkflowState
  /** The id of the version currently in this state. */
  currentVersionId: string
  /** Approval audit trail (latest last). */
  approvals: readonly ApprovalRecord[]
  /** Pending schedule when `state === "scheduled"`. */
  schedule?: PublishSchedule
  /** User id who last moved the page. */
  lastActor?: string
  /** ISO timestamp of the last transition. */
  updatedAt: string
}
