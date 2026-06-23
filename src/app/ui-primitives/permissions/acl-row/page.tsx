import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AclRow } from "../../components/permissions"

import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "ACL row | Permissions",
  description:
    "Primitive 04 — single ACL entry showing principal, grants, source, expiry and remove action.",
}

export default function AclRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / ACL row"
        title="Access control entry"
        description="One principal per row. Tells you who has access, what they can do, where the access comes from, and when it stops. Users render as avatar + name + subtitle; roles render as a Role badge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "ACL row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>User principal · direct grant · expiring</span>
        <div className={styles.aclList} role="list">
          <AclRow
            principal={{
              kind: "user",
              name: "Marcus Wells",
              subtitle: "marcus.wells@oakflatsmuffler.au",
              avatarTone: "red",
            }}
            grants={[
              { id: "g1", label: "quotes.approve", tone: "green" },
              { id: "g2", label: "invoices.export", tone: "amber" },
              { id: "g3", label: "users.invite", tone: "teal" },
            ]}
            source="direct"
            expiresAt={null}
          />
          <AclRow
            principal={{
              kind: "user",
              name: "Jordan Mitchell",
              subtitle: "Apprentice · Oak Flats",
              avatarTone: "amber",
            }}
            grants={[
              { id: "g1", label: "jobs.edit", tone: "green" },
              { id: "g2", label: "parts.create", tone: "amber" },
            ]}
            source="direct"
            expiresAt="2026-05-30T18:00:00+10:00"
          />
          <AclRow
            principal={{
              kind: "role",
              name: "Front Desk",
              roleTone: "member",
            }}
            grants={[
              { id: "g1", label: "bookings.create", tone: "teal" },
              { id: "g2", label: "quotes.view", tone: "neutral" },
              { id: "g3", label: "invoices.view", tone: "neutral" },
            ]}
            source="inherited"
            expiresAt={null}
          />
          <AclRow
            principal={{
              kind: "group",
              name: "Albion Park bay leads",
              subtitle: "5 members · group",
              avatarTone: "teal",
            }}
            grants={[
              { id: "g1", label: "jobs.view", tone: "neutral" },
              { id: "g2", label: "jobs.edit", tone: "green" },
            ]}
            source="group"
            expiresAt={null}
          />
          <AclRow
            principal={{
              kind: "service-account",
              name: "fleet-sync-bot",
              subtitle: "Service account · machine",
              avatarTone: "obsidian",
            }}
            grants={[{ id: "g1", label: "quotes.read", tone: "neutral" }]}
            source="workspace"
            expiresAt="2026-12-31T23:59:00+10:00"
          />
        </div>
      </section>
    </main>
  )
}
