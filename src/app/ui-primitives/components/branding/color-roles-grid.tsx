import styles from "./color-roles-grid.module.css"

export interface ColorRoleEntry {
  role: string
  description: string
  background: string
  foreground: string
  pairingLabel: string
}

export interface ColorRolesGridProps {
  roles: ReadonlyArray<ColorRoleEntry>
}

export function ColorRolesGrid({ roles }: ColorRolesGridProps) {
  return (
    <section className={styles.wrapper} aria-label="Semantic colour roles">
      <header className={styles.head}>
        <span className={styles.kicker}>Colour roles</span>
        <h2 className={styles.title}>Semantic colour cascade</h2>
        <p className={styles.lede}>
          Each tone is bound to a job — surface, interaction, critical, success, muted, accent. Designers reach
          for the role, never the literal hex.
        </p>
      </header>
      <div className={styles.grid} role="list">
        {roles.map((entry) => (
          <article key={entry.role} className={styles.card} role="listitem">
            <span className={styles.badge}>{entry.role}</span>
            <div
              className={styles.preview}
              style={{ background: entry.background, color: entry.foreground }}
              aria-hidden="true"
            >
              <span className={styles.previewWord}>Aa</span>
              <span className={styles.previewWord}>{entry.pairingLabel}</span>
            </div>
            <p className={styles.note}>{entry.description}</p>
            <dl className={styles.spec}>
              <div>
                <dt>Surface</dt>
                <dd>
                  <code>{entry.background}</code>
                </dd>
              </div>
              <div>
                <dt>Ink</dt>
                <dd>
                  <code>{entry.foreground}</code>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
