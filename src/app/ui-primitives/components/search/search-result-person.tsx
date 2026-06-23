import { Mail, MessageCircle, Phone } from "lucide-react"

import styles from "./search-result-person.module.css"

interface SearchResultPersonProps {
  name: string
  role: string
  workshop: string
  initials?: string
  avatarUrl?: string
  email?: string
  phone?: string
  chatHref?: string
  available?: boolean
  className?: string
}

function deriveInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() ?? "")
    .join("")
}

export function SearchResultPerson({
  name,
  role,
  workshop,
  initials,
  avatarUrl,
  email,
  phone,
  chatHref,
  available = true,
  className,
}: SearchResultPersonProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const resolvedInitials = initials ?? deriveInitials(name)
  return (
    <article className={classes}>
      <div className={styles.avatarWrap}>
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.avatar} src={avatarUrl} alt="" />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {resolvedInitials || "·"}
          </span>
        )}
        <span
          className={styles.presence}
          data-on={available ? "true" : "false"}
          aria-label={available ? "Available" : "Unavailable"}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>
          <span>{role}</span>
          <span aria-hidden="true">·</span>
          <span className={styles.workshop}>{workshop}</span>
        </p>
      </div>
      <div className={styles.actions} role="group" aria-label={`Contact ${name}`}>
        {email ? (
          <a
            className={styles.actionBtn}
            href={`mailto:${email}`}
            aria-label={`Email ${name}`}
          >
            <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
          </a>
        ) : null}
        {phone ? (
          <a
            className={styles.actionBtn}
            href={`tel:${phone}`}
            aria-label={`Call ${name}`}
          >
            <Phone size={14} strokeWidth={2.2} aria-hidden="true" />
          </a>
        ) : null}
        {chatHref ? (
          <a
            className={styles.actionBtn}
            href={chatHref}
            aria-label={`Chat with ${name}`}
          >
            <MessageCircle size={14} strokeWidth={2.2} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default SearchResultPerson
