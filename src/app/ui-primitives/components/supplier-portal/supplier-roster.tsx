import { Avatar, type AvatarStatus, type AvatarTone } from "../primitives/avatar"

import styles from "./supplier-roster.module.css"

export interface SupplierRosterRep {
  id: string
  name: string
  role: string
  avatarSrc?: string
  tone?: AvatarTone
  status?: AvatarStatus
  /** Friendly last-active label e.g. "Active now", "3h ago". */
  lastActiveLabel: string
}

export interface SupplierRosterProps {
  /** Heading for the roster region. */
  heading?: string
  reps: ReadonlyArray<SupplierRosterRep>
}

export function SupplierRoster({
  heading = "Trade contacts",
  reps,
}: SupplierRosterProps) {
  return (
    <section
      className={styles.wrap}
      role="region"
      aria-label={heading}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Supplier reps</span>
        <h3 className={styles.title}>{heading}</h3>
      </header>

      <ul className={styles.grid}>
        {reps.map((rep) => (
          <li key={rep.id} className={styles.cell}>
            <Avatar
              name={rep.name}
              src={rep.avatarSrc}
              tone={rep.tone ?? "obsidian"}
              status={rep.status}
              size="lg"
            />
            <div className={styles.body}>
              <strong className={styles.name}>{rep.name}</strong>
              <span className={styles.role}>{rep.role}</span>
              <span className={styles.lastActive}>{rep.lastActiveLabel}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SupplierRoster
