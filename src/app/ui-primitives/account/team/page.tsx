import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  TeamMemberRow,
  type TeamMemberRowItem,
} from "../../components/account/team-member-row"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Team · Account | UI Primitives",
}

const ACTIVE_MEMBERS: ReadonlyArray<TeamMemberRowItem> = [
  {
    id: "tm-01",
    name: "Daniel Fleuren",
    email: "daniel@mufflermen.com.au",
    role: "owner",
    status: "active",
    avatarTone: "red",
    bay: "Albion Park",
  },
  {
    id: "tm-02",
    name: "Mara Kovac",
    email: "mara@mufflermen.com.au",
    role: "admin",
    status: "active",
    avatarTone: "amber",
    bay: "Shellharbour",
  },
  {
    id: "tm-03",
    name: "Jaylen Souto",
    email: "jaylen@mufflermen.com.au",
    role: "manager",
    status: "active",
    avatarTone: "teal",
    bay: "Wollongong",
  },
  {
    id: "tm-04",
    name: "Sienna Park",
    email: "sienna@mufflermen.com.au",
    role: "technician",
    status: "active",
    avatarTone: "green",
    bay: "Albion Park",
  },
  {
    id: "tm-05",
    name: "Kai Mahon",
    email: "kai@mufflermen.com.au",
    role: "technician",
    status: "active",
    avatarTone: "obsidian",
    bay: "Shellharbour",
  },
  {
    id: "tm-06",
    name: "Pia Renton",
    email: "pia@mufflermen.com.au",
    role: "viewer",
    status: "suspended",
    avatarTone: "obsidian",
    bay: "Off-roster",
  },
]

const PENDING: ReadonlyArray<TeamMemberRowItem> = [
  {
    id: "tm-pending-01",
    name: "Darren Mosby",
    email: "darren@oakflats.exhaust",
    role: "manager",
    status: "invited",
    avatarTone: "teal",
    bay: "Shellharbour",
  },
  {
    id: "tm-pending-02",
    name: "Holly Verge",
    email: "holly.v@oakflatsfleet.au",
    role: "technician",
    status: "invited",
    avatarTone: "amber",
    bay: "Wollongong",
  },
]

export default function AccountTeamPage() {
  return (
    <>
      <PageHeader
        kicker="18.3 / Team"
        title="Team"
        description="Bay-by-bay member roster, invites in flight, and role assignment for the workshop crew."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Team" },
        ]}
      />

      <section
        className={`${styles.inviteRow}`}
        aria-labelledby="invite-heading"
      >
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="invite-email">
            Invite by email
          </label>
          <input
            id="invite-email"
            className={styles.fieldInput}
            type="email"
            placeholder="darren@oakflats.exhaust"
            autoComplete="off"
          />
          <span id="invite-heading" className={styles.fieldHelper}>
            Members receive a 7-day workspace invite by email.
          </span>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="invite-role">
            Default role
          </label>
          <select
            id="invite-role"
            className={styles.fieldSelect}
            defaultValue="technician"
          >
            <option value="admin">Admin</option>
            <option value="manager">Bay manager</option>
            <option value="technician">Technician</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <button type="button" className={styles.btnPrimary}>
          Send invite
        </button>
      </section>

      <section className={styles.section} aria-labelledby="team-active-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Active members</span>
          <h2 id="team-active-heading" className={styles.sectionTitle}>
            Roster · 6 seats used
          </h2>
        </header>
        <ul className={styles.list} role="list">
          {ACTIVE_MEMBERS.map((member) => (
            <li key={member.id}>
              <TeamMemberRow member={member} />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="team-pending-heading">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>02 / Pending invites</span>
          <h2 id="team-pending-heading" className={styles.sectionTitle}>
            Awaiting acceptance
          </h2>
          <p className={styles.sectionLead}>
            Outstanding invites expire after 7 days. Resend or revoke at any time.
          </p>
        </header>
        <ul className={styles.list} role="list">
          {PENDING.map((member) => (
            <li key={member.id}>
              <TeamMemberRow member={member} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
