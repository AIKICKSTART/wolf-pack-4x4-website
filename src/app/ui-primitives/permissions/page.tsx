import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./permissions.module.css"

export const metadata: Metadata = {
  title: "Permissions & RBAC | UI Primitives",
  description:
    "Deep RBAC primitives — role badges, permission matrix, inheritance tree, ACL rows, forbidden state, role inspector, workspace switcher, request-access flow, approvals inbox, JIT banner, API scope chip, session table, audit trail, policy editor.",
}

interface PermissionScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<PermissionScene> = [
  {
    kicker: "Primitive 01",
    title: "Role badge",
    body: "Pill badge for Owner / Admin / Workshop / Billing / Viewer / Guest with iconlet + tone.",
    href: "/ui-primitives/permissions/role-badge",
    accent: "red",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Permission matrix",
    body: "Resources × actions grid with allow / deny / inherited cells and bulk row + column toggles.",
    href: "/ui-primitives/permissions/matrix",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · grid",
  },
  {
    kicker: "Primitive 03",
    title: "Inheritance tree",
    body: "Vertical resolution path showing how direct, role, group and workspace defaults combine.",
    href: "/ui-primitives/permissions/inheritance",
    accent: "amber",
    glyph: "⇣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "ACL row",
    body: "Single access entry — principal, grants, source chip, expiry, remove button.",
    href: "/ui-primitives/permissions/acl-row",
    accent: "green",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Forbidden state",
    body: "403 surface showing the missing permission, attempted action, request and switch options.",
    href: "/ui-primitives/permissions/forbidden",
    accent: "red",
    glyph: "⊘",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Role inspector",
    body: "Detailed role card — member count, scopes, expandable full permission set.",
    href: "/ui-primitives/permissions/role-inspector",
    accent: "amber",
    glyph: "🔎",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 07",
    title: "Workspace switcher",
    body: "Top-bar dropdown with searchable list, role-in-workspace and plan chip.",
    href: "/ui-primitives/permissions/workspace-switcher",
    accent: "teal",
    glyph: "▼",
    state: "Stateful · search",
  },
  {
    kicker: "Primitive 08",
    title: "Request access flow",
    body: "Three-step wizard — explain why → choose role → submit, with reviewer + SLA chip.",
    href: "/ui-primitives/permissions/request-access",
    accent: "amber",
    glyph: "01·02·03",
    state: "Stateful · steps",
  },
  {
    kicker: "Primitive 09",
    title: "Approval request row",
    body: "Pending approval row — requester avatar, role, reason snippet, approve / reject / snooze.",
    href: "/ui-primitives/permissions/approval-row",
    accent: "green",
    glyph: "✓×",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "JIT access banner",
    body: "Just-in-time elevation banner with live countdown and revoke-now button.",
    href: "/ui-primitives/permissions/jit-banner",
    accent: "amber",
    glyph: "⚡",
    state: "Stateful · timer",
  },
  {
    kicker: "Primitive 11",
    title: "API scope chip",
    body: "Compact chip per scope (workshop.read, parts.write, billing.admin) with hover tooltip.",
    href: "/ui-primitives/permissions/api-scope-chip",
    accent: "teal",
    glyph: "{}",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Session table",
    body: "Full DataTable of active sessions — device, IP, location, last active, current chip.",
    href: "/ui-primitives/permissions/session-table",
    accent: "violet",
    glyph: "▦",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 13",
    title: "Audit trail",
    body: "Filter chips + paginated table; expand any row for the full JSON payload.",
    href: "/ui-primitives/permissions/audit-trail",
    accent: "red",
    glyph: "≡",
    state: "Stateful · filters",
  },
  {
    kicker: "Primitive 14",
    title: "Policy rule editor",
    body: "When [event] on [subject], if [condition], then [allow/deny] because [reason] — chip-selectable.",
    href: "/ui-primitives/permissions/policy-editor",
    accent: "amber",
    glyph: "if/then",
    state: "Stateful · slots",
  },
  {
    kicker: "Composition",
    title: "Full RBAC console",
    body: "Workspace switcher + role inspector + matrix + ACL list + approvals inbox + audit aside.",
    href: "/ui-primitives/permissions/full-console",
    accent: "red",
    glyph: "★▦≡",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<PermissionScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function PermissionsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Permissions / 14 primitives + composition"
        title="Permissions & RBAC primitives"
        description="Role-based access control surfaces — role badges, the full permission matrix, inheritance resolution, ACL rows, the forbidden state, role inspector, workspace switcher, request-access wizard, approvals inbox, JIT elevation, API scope chips, session table, audit trail, and a chip-based policy editor. Visual references — no real authorisation wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real authorisation wired
      </span>

      <FormPatternReferences
        ids={["notification-permissions", "compliance-kyc-consent", "auth-security"]}
      />

      <section className={styles.grid} aria-label="Permission primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
