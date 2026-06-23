"use client"

import { Avatar } from "../primitives/avatar"

import {
  TEAM_INVITE_STATUS_LABEL,
  TEAM_INVITE_STATUS_TONE,
  TEAM_ROLE_LABEL,
  type TeamInviteRow,
  type TeamRole,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./team-invite-panel.module.css"

export interface TeamInvitePanelProps {
  /** Eyebrow label eg "Step 4 / Team". */
  kicker: string
  /** Big title eg "Bring on the crew". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Existing rows the user has drafted or sent. */
  rows: ReadonlyArray<TeamInviteRow>
  /** Available roles. */
  roles?: ReadonlyArray<TeamRole>
  /** Optional helper copy under the bulk-add row. */
  bulkAddHint?: string
  /** Label for the primary "send all" CTA. */
  sendLabel?: string
  /** Optional skip CTA label. */
  skipLabel?: string
  className?: string
}

const DEFAULT_ROLES: ReadonlyArray<TeamRole> = [
  "manager",
  "mechanic",
  "front-desk",
  "apprentice",
]

const TONE_CLASS = {
  red: shell.toneRed,
  amber: shell.toneAmber,
  teal: shell.toneTeal,
  green: shell.toneGreen,
  neutral: shell.toneNeutral,
  violet: shell.toneViolet,
} as const

const ROLE_AVATAR_TONE: Record<TeamRole, "red" | "amber" | "teal" | "green" | "obsidian"> = {
  owner: "red",
  manager: "red",
  mechanic: "amber",
  "front-desk": "teal",
  apprentice: "green",
}

export function TeamInvitePanel({
  kicker,
  title,
  description,
  rows,
  roles = DEFAULT_ROLES,
  bulkAddHint = "Tip — paste a comma-separated list of emails to bulk invite.",
  sendLabel = "Send invites",
  skipLabel = "Skip for now",
  className,
}: TeamInvitePanelProps) {
  const classes = [shell.shell, styles.card, className].filter(Boolean).join(" ")
  const sendable = rows.filter((row) => row.status === "draft" || row.status === "queued")

  return (
    <section className={classes} aria-label={title}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <ul className={styles.list}>
        {rows.map((row) => {
          const tone = TEAM_INVITE_STATUS_TONE[row.status]
          return (
            <li key={row.id} className={[styles.row, TONE_CLASS[tone]].join(" ")}>
              <div className={styles.lead}>
                <Avatar name={row.fullName} tone={ROLE_AVATAR_TONE[row.role]} size="md" />
                <div className={styles.copy}>
                  <span className={styles.name}>{row.fullName}</span>
                  <span className={styles.email}>{row.email}</span>
                </div>
              </div>
              <span className={styles.roleChip}>{TEAM_ROLE_LABEL[row.role]}</span>
              <span
                className={[shell.chip, TONE_CLASS[tone]].join(" ")}
                aria-label={`Invite status ${TEAM_INVITE_STATUS_LABEL[row.status]}`}
              >
                {TEAM_INVITE_STATUS_LABEL[row.status]}
              </span>
            </li>
          )
        })}
      </ul>

      <form
        className={styles.bulkAdd}
        aria-label="Add team member"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={shell.field}>
          <label htmlFor="so-team-name" className={shell.label}>
            Full name
          </label>
          <input
            id="so-team-name"
            name="fullName"
            type="text"
            className={shell.input}
            placeholder="Jake Hannan"
            autoComplete="off"
          />
        </div>
        <div className={shell.field}>
          <label htmlFor="so-team-email" className={shell.label}>
            Email
          </label>
          <input
            id="so-team-email"
            name="email"
            type="email"
            className={shell.input}
            placeholder="jake@illawarra-tb.com.au"
            autoComplete="off"
          />
        </div>
        <div className={shell.field}>
          <label htmlFor="so-team-role" className={shell.label}>
            Role
          </label>
          <select
            id="so-team-role"
            name="role"
            className={shell.select}
            defaultValue="mechanic"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {TEAM_ROLE_LABEL[role]}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={[shell.button, shell.buttonGhost].join(" ")}
        >
          Add row
        </button>
      </form>

      <p className={shell.helper}>{bulkAddHint}</p>

      <footer className={styles.foot}>
        <button type="button" className={[shell.button, shell.buttonGhost].join(" ")}>
          {skipLabel}
        </button>
        <button
          type="button"
          className={[shell.button, shell.buttonPrimary, shell.toneTeal].join(" ")}
          disabled={sendable.length === 0}
        >
          {sendLabel}{" "}
          <span aria-hidden="true">
            ({sendable.length} pending)
          </span>
        </button>
      </footer>
    </section>
  )
}

export default TeamInvitePanel
