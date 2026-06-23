import type { Metadata } from "next"

import { StatusBadge } from "../../components/data-display"
import { PageHeader } from "../../components/page-header"
import { RoleBadge } from "../../components/permissions"
import type { RoleTone } from "../../components/permissions"
import { Chip, ProgressLinear, StatTile } from "../../components/primitives"

import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Role badge | Permissions",
  description:
    "Primitive 01 — role label badge composed into real permission assignment states.",
}

type AssignmentState = "live" | "elevated" | "pending" | "blocked"
type CoverageTone = "red" | "amber" | "teal" | "green"

interface RoleSample {
  readonly tone: RoleTone
  readonly label: string
  readonly shortCode: string
  readonly description: string
}

interface RoleAssignment {
  readonly id: string
  readonly person: string
  readonly initials: string
  readonly location: string
  readonly tone: RoleTone
  readonly role: string
  readonly shortCode: string
  readonly state: AssignmentState
  readonly scope: string
  readonly access: number
  readonly permissionCount: number
  readonly audit: string
  readonly chips: ReadonlyArray<{
    readonly label: string
    readonly tone: "neutral" | "red" | "amber" | "teal" | "green"
  }>
}

interface LedgerRole {
  readonly id: string
  readonly role: string
  readonly tone: RoleTone
  readonly shortCode: string
  readonly holders: string
  readonly scope: string
  readonly state: AssignmentState
  readonly coverage: string
  readonly nextReview: string
}

const SAMPLES: ReadonlyArray<RoleSample> = [
  { tone: "owner", label: "Owner", shortCode: "OW", description: "Full control · root" },
  { tone: "admin", label: "Admin", shortCode: "AD", description: "Workspace + users" },
  { tone: "workshop", label: "Workshop Manager", shortCode: "WM", description: "Jobs + quotes <= $4k" },
  { tone: "member", label: "Front Desk", shortCode: "FD", description: "Bookings + view" },
  { tone: "billing", label: "Billing", shortCode: "BL", description: "Invoices + exports" },
  { tone: "viewer", label: "Viewer", shortCode: "VW", description: "Read-only" },
  { tone: "guest", label: "Guest", shortCode: "GT", description: "Customer self-serve" },
]

const ASSIGNMENTS: ReadonlyArray<RoleAssignment> = [
  {
    id: "jordan",
    person: "Jordan Mitchell",
    initials: "JM",
    location: "Oak Flats bay lead",
    tone: "workshop",
    role: "Workshop Manager",
    shortCode: "WM",
    state: "elevated",
    scope: "Oak Flats + Albion Park",
    access: 82,
    permissionCount: 32,
    audit: "Temporary approval expires 18:00",
    chips: [
      { label: "MFA fresh", tone: "green" },
      { label: "Quote cap $4k", tone: "amber" },
      { label: "2 sites", tone: "teal" },
    ],
  },
  {
    id: "sophie",
    person: "Sophie Tan",
    initials: "ST",
    location: "Albion Park front desk",
    tone: "member",
    role: "Front Desk",
    shortCode: "FD",
    state: "live",
    scope: "Bookings + customer lookup",
    access: 46,
    permissionCount: 14,
    audit: "Inherited from AP desk crew",
    chips: [
      { label: "No exports", tone: "neutral" },
      { label: "Customer PII", tone: "teal" },
    ],
  },
  {
    id: "marcus",
    person: "Marcus Wells",
    initials: "MW",
    location: "Workspace owner",
    tone: "owner",
    role: "Owner",
    shortCode: "OW",
    state: "live",
    scope: "All workspaces",
    access: 100,
    permissionCount: 57,
    audit: "Break-glass logged on every use",
    chips: [
      { label: "Root", tone: "red" },
      { label: "API rotate", tone: "amber" },
      { label: "Billing admin", tone: "green" },
    ],
  },
]

const LEDGER_ROLES: ReadonlyArray<LedgerRole> = [
  {
    id: "owner",
    role: "Owner",
    tone: "owner",
    shortCode: "OW",
    holders: "1",
    scope: "Workspace root",
    state: "live",
    coverage: "57 / 57",
    nextReview: "Daily audit",
  },
  {
    id: "admin",
    role: "Admin",
    tone: "admin",
    shortCode: "AD",
    holders: "3",
    scope: "Users + settings",
    state: "pending",
    coverage: "42 / 57",
    nextReview: "Invite review",
  },
  {
    id: "workshop",
    role: "Workshop Manager",
    tone: "workshop",
    shortCode: "WM",
    holders: "6",
    scope: "Jobs + quotes",
    state: "elevated",
    coverage: "32 / 57",
    nextReview: "18:00 today",
  },
  {
    id: "billing",
    role: "Billing",
    tone: "billing",
    shortCode: "BL",
    holders: "2",
    scope: "Invoices + exports",
    state: "live",
    coverage: "18 / 57",
    nextReview: "Month end",
  },
  {
    id: "guest",
    role: "Guest",
    tone: "guest",
    shortCode: "GT",
    holders: "12",
    scope: "Portal self-serve",
    state: "blocked",
    coverage: "4 / 57",
    nextReview: "Awaiting MFA",
  },
]

const STATE_BADGE: Record<AssignmentState, { label: string; tone: "success" | "warn" | "error" | "info" }> = {
  live: { label: "Live", tone: "success" },
  elevated: { label: "Elevated", tone: "warn" },
  pending: { label: "Pending", tone: "info" },
  blocked: { label: "Blocked", tone: "error" },
}

function coverageTone(value: number): CoverageTone {
  if (value >= 90) {
    return "green"
  }
  if (value >= 70) {
    return "amber"
  }
  if (value >= 45) {
    return "teal"
  }
  return "red"
}

function renderStatusBadge(state: AssignmentState) {
  const badge = STATE_BADGE[state]
  return <StatusBadge label={badge.label} tone={badge.tone} size="sm" shape="dot" />
}

export default function RoleBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Role badge"
        title="Role badge"
        description="Role identity badges shown in practical permission surfaces: temporary elevation, inherited access, blocked portal roles, audit context, scope chips, and coverage meters."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Role badge" },
        ]}
      />

      <section className={styles.roleBadgeHero} aria-label="Role badge operational preview">
        <div className={styles.roleBadgeHeroCopy}>
          <span className={styles.demoLabel}>Live assignment surface</span>
          <RoleBadge
            label="Workshop Manager"
            tone="workshop"
            size="lg"
            shortCode="WM"
            description="Temporary quote approval · Oak Flats"
            className={styles.roleBadgePreview}
          />
          <p>
            Badge tone, shortcode and role label stay compact enough for rows,
            tables and access cards while still carrying a clear permission tier.
          </p>
          <div className={styles.roleBadgeActionRow}>
            <StatusBadge label="Elevated" tone="warn" size="md" shape="dot" />
            <StatusBadge label="MFA fresh" tone="success" size="md" shape="pill" />
            <StatusBadge label="Auto-expire 18:00" tone="brand" size="md" shape="square" />
          </div>
        </div>

        <div className={styles.roleBadgeMetricGrid} aria-label="Role badge metrics">
          <StatTile
            label="Role holders"
            value="24"
            delta={{ value: "+3", direction: "up", helpText: "Temporary coverage for Friday rush" }}
            tone="amber"
            caption="Across 3 workspaces"
            sparkline={[18, 19, 21, 20, 24, 24]}
          />
          <StatTile
            label="Elevations"
            value="4"
            delta={{ value: "2 expire", direction: "flat" }}
            tone="red"
            caption="Needs owner audit"
            sparkline={[2, 3, 3, 5, 4, 4]}
          />
          <StatTile
            label="Coverage"
            value="82"
            unit="%"
            delta={{ value: "+8%", direction: "up" }}
            tone="green"
            caption="Workshop role set"
            sparkline={[64, 68, 71, 74, 78, 82]}
          />
        </div>
      </section>

      <section className={styles.roleBadgeSurface} aria-label="Role badge tone set">
        <div className={styles.roleBadgeSectionHead}>
          <span className={styles.demoLabel}>Every role tone</span>
          <p>Medium badges for rows, small badges for dense chips, large badges for identity cards.</p>
        </div>
        <div className={styles.roleBadgeWall}>
          {SAMPLES.map((sample) => (
            <article key={sample.tone} className={styles.roleBadgeToneCard}>
              <RoleBadge
                label={sample.label}
                tone={sample.tone}
                shortCode={sample.shortCode}
                className={styles.roleBadgePreview}
              />
              <RoleBadge
                label={sample.label}
                tone={sample.tone}
                size="sm"
                className={styles.roleBadgePreview}
              />
              <RoleBadge
                label={sample.label}
                tone={sample.tone}
                size="lg"
                description={sample.description}
                className={styles.roleBadgePreview}
              />
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roleBadgeSurface} aria-label="Role assignments">
        <div className={styles.roleBadgeSectionHead}>
          <span className={styles.demoLabel}>Assignment cards</span>
          <p>Badges composed with status, scope chips and a permission coverage meter.</p>
        </div>
        <div className={styles.roleBadgeAssignments}>
          {ASSIGNMENTS.map((assignment) => (
            <article key={assignment.id} className={styles.roleBadgeAssignmentCard}>
              <header className={styles.roleBadgeAssignmentHead}>
                <span className={styles.roleBadgeAvatar} aria-hidden="true">
                  {assignment.initials}
                </span>
                <span className={styles.roleBadgePerson}>
                  <strong>{assignment.person}</strong>
                  <small>{assignment.location}</small>
                </span>
                {renderStatusBadge(assignment.state)}
              </header>

              <div className={styles.roleBadgeAssignmentRole}>
                <RoleBadge
                  label={assignment.role}
                  tone={assignment.tone}
                  shortCode={assignment.shortCode}
                  description={assignment.audit}
                  className={styles.roleBadgePreview}
                />
              </div>

              <dl className={styles.roleBadgeAssignmentMeta}>
                <div>
                  <dt>Scope</dt>
                  <dd>{assignment.scope}</dd>
                </div>
                <div>
                  <dt>Permissions</dt>
                  <dd>{assignment.permissionCount}</dd>
                </div>
              </dl>

              <ProgressLinear
                value={assignment.access}
                tone={coverageTone(assignment.access)}
                variant="segmented"
                segments={10}
                label="Access coverage"
                showLabel
              />

              <div className={styles.roleBadgeChipRow}>
                {assignment.chips.map((chip) => (
                  <Chip key={chip.label} label={chip.label} tone={chip.tone} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roleBadgeSurface} aria-label="Role badge ledger">
        <div className={styles.roleBadgeSectionHead}>
          <span className={styles.demoLabel}>Role ledger table</span>
          <p>Compact row usage for admin tables where the badge must sit beside state and review data.</p>
        </div>
        <div className={styles.roleBadgeTableShell}>
          <table className={styles.roleBadgeTable}>
            <caption>Role badge ledger states</caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">State</th>
                <th scope="col">Holders</th>
                <th scope="col">Scope</th>
                <th scope="col">Coverage</th>
                <th scope="col">Review</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER_ROLES.map((role) => (
                <tr key={role.id}>
                  <td>
                    <RoleBadge
                      label={role.role}
                      tone={role.tone}
                      shortCode={role.shortCode}
                      size="sm"
                      className={styles.roleBadgePreview}
                    />
                  </td>
                  <td>{renderStatusBadge(role.state)}</td>
                  <td>{role.holders}</td>
                  <td>{role.scope}</td>
                  <td>
                    <code>{role.coverage}</code>
                  </td>
                  <td>{role.nextReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
