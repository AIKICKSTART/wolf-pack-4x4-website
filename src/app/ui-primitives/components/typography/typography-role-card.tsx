import { createElement } from "react"

import type { TypographyRoleSpec } from "./typography-role-data"
import styles from "./typography-role-card.module.css"

interface TypographyRoleCardProps {
  role: TypographyRoleSpec
  className: string
}

export function TypographyRoleCard({ role, className }: TypographyRoleCardProps) {
  const previewElement = role.element === "h1" ? "p" : role.element
  const preview = createElement(
    previewElement,
    { className: styles.preview, "data-preview-element": role.element },
    role.sample,
  )

  return (
    <article className={`${styles.card} ${className}`} aria-labelledby={`role-${role.id}`}>
      <header className={styles.header}>
        <span className={styles.kicker}>{role.id}</span>
        <h3 id={`role-${role.id}`}>{role.label}</h3>
      </header>

      {preview}

      <dl className={styles.meta}>
        <div>
          <dt>Token</dt>
          <dd>{role.token}</dd>
        </div>
        <div>
          <dt>Rhythm</dt>
          <dd>{role.measurement}</dd>
        </div>
        <div>
          <dt>File</dt>
          <dd>{role.fileName}</dd>
        </div>
      </dl>

      <p className={styles.usage}>{role.usage}</p>
    </article>
  )
}
