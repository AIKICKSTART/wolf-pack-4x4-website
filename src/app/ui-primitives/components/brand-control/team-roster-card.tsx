import { Mail, Users } from "lucide-react"

import { Chip } from "../primitives/chip"

import type { RoleId, TeamMember } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface TeamRosterCardProps {
  member: TeamMember
  className?: string
}

const ROLE_LABEL: Record<RoleId, string> = {
  founder: "Founder",
  brand: "Brand",
  parts: "Parts",
  workshop: "Workshop",
  contractor: "Contractor",
}

const ROLE_TONE: Record<RoleId, "red" | "amber" | "teal" | "green" | "neutral"> = {
  founder: "red",
  brand: "amber",
  parts: "teal",
  workshop: "green",
  contractor: "neutral",
}

/**
 * Team roster card — a single team member with avatar initials, role pill,
 * last-active stamp, and an access-scope chip list.
 */
export function TeamRosterCard({ member, className }: TeamRosterCardProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Team member — ${member.name}`}
    >
      <div className={styles.head}>
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "color-mix(in srgb, var(--primitive-red) 28%, transparent)",
            color: "var(--primitive-body)",
            fontFamily: "var(--primitive-font-display)",
            fontSize: 18,
            letterSpacing: "0.04em",
          }}
          aria-hidden="true"
        >
          {member.avatarInitial}
        </div>
        <div className={styles.headStack} style={{ flex: 1 }}>
          <span className={styles.kicker}>
            <Users size={12} aria-hidden="true" /> Team
          </span>
          <h3 className={styles.title} style={{ fontSize: 18 }}>
            {member.name}
          </h3>
          <span className={styles.subtitle}>
            <Mail size={11} aria-hidden="true" style={{ verticalAlign: -1, marginRight: 6 }} />
            <code className={styles.mono}>{member.email}</code>
          </span>
        </div>
        <Chip label={ROLE_LABEL[member.roleId]} tone={ROLE_TONE[member.roleId]} />
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaItem}>
          Last active <strong>{member.lastActive}</strong>
        </span>
      </div>

      <div>
        <span className={styles.tinyLabel}>Access scope</span>
        <div className={styles.metaRow}>
          {member.scope.map((token) => (
            <span key={token} className={styles.tokenChip}>
              <code>{token}</code>
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default TeamRosterCard
