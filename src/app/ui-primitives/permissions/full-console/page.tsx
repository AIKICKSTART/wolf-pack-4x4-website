import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AclRow,
  ApprovalRequestRow,
  AuditTrail,
  JitAccessBanner,
  PermissionMatrix,
  RoleInspector,
  WorkspaceSwitcher,
} from "../../components/permissions"

import {
  DEMO_ACTIONS,
  DEMO_APPROVAL_REQUESTS,
  DEMO_AUDIT_ACTORS,
  DEMO_AUDIT_DATE_RANGES,
  DEMO_AUDIT_EVENTS,
  DEMO_AUDIT_EVENT_TYPES,
  DEMO_MATRIX_VALUE,
  DEMO_RESOURCES,
  DEMO_ROLE_INSPECTOR_PERMISSIONS,
  DEMO_ROLE_SCOPES,
  DEMO_WORKSPACES,
  nextJitExpiry,
} from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Full RBAC console | Permissions",
  description:
    "Composition — full RBAC console scene composing workspace switcher, role inspector, permission matrix, ACL rows, approvals inbox and audit trail.",
}

export default function FullConsoleScenePage() {
  const [current, ...others] = DEMO_WORKSPACES

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / RBAC console"
        title="Full RBAC console"
        description="One page demonstrating how the permissions primitives compose into a real operator surface — workspace switcher and JIT banner at the top, the role inspector and permission matrix as the centrepiece, ACL rows and approvals inbox along the left, audit trail aside on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Top bar — workspace switcher</span>
        <div className={styles.topRow}>
          <WorkspaceSwitcher current={current} workspaces={[current, ...others]} />
          <JitAccessBanner
            role="Workshop Manager"
            roleTone="workshop"
            expiresAt={nextJitExpiry()}
            scope="Oak Flats — quote approvals only"
          />
        </div>
      </section>

      <div className={styles.console}>
        <div className={styles.consoleMain}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Role inspector — Workshop Manager</span>
            <RoleInspector
              roleName="Workshop Manager"
              roleTone="workshop"
              summary="Day-to-day operator. Approves quotes up to $4,000 and edits jobs across bays."
              memberCount={6}
              permissionCount={32}
              scopes={DEMO_ROLE_SCOPES}
              permissions={DEMO_ROLE_INSPECTOR_PERMISSIONS}
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Permission matrix</span>
            <PermissionMatrix
              resources={DEMO_RESOURCES}
              actions={DEMO_ACTIONS}
              defaultValue={DEMO_MATRIX_VALUE}
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>ACL — three entries</span>
            <div className={styles.aclList} role="list">
              <AclRow
                principal={{
                  kind: "user",
                  name: "Marcus Wells",
                  subtitle: "Owner · Oak Flats",
                  avatarTone: "red",
                }}
                grants={[
                  { id: "g1", label: "quotes.approve", tone: "green" },
                  { id: "g2", label: "users.invite", tone: "teal" },
                ]}
                source="direct"
                expiresAt={null}
              />
              <AclRow
                principal={{
                  kind: "role",
                  name: "Workshop Manager",
                  roleTone: "workshop",
                }}
                grants={[
                  { id: "g1", label: "jobs.edit", tone: "green" },
                  { id: "g2", label: "quotes.approve", tone: "amber" },
                ]}
                source="inherited"
                expiresAt={null}
              />
              <AclRow
                principal={{
                  kind: "user",
                  name: "Jordan Mitchell",
                  subtitle: "Apprentice — JIT 4h",
                  avatarTone: "amber",
                }}
                grants={[{ id: "g1", label: "quotes.approve", tone: "amber" }]}
                source="direct"
                expiresAt="2026-05-28T18:00:00+10:00"
              />
            </div>
          </section>
        </div>

        <aside className={styles.consoleSide}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Approvals inbox</span>
            <div className={styles.approvalStack}>
              {DEMO_APPROVAL_REQUESTS.slice(0, 2).map((request) => (
                <ApprovalRequestRow key={request.id} request={request} />
              ))}
            </div>
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Audit trail (recent 4)</span>
            <AuditTrail
              events={DEMO_AUDIT_EVENTS.slice(0, 4)}
              eventTypes={DEMO_AUDIT_EVENT_TYPES}
              actors={DEMO_AUDIT_ACTORS}
              dateRanges={DEMO_AUDIT_DATE_RANGES}
              defaultDateRangeId="24h"
              initialPageSize={4}
            />
          </section>
        </aside>
      </div>
    </main>
  )
}
