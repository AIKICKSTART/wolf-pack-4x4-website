import type { DocsArticleMeta } from "./docs-suite-types"

import styles from "./article-meta-card.module.css"

interface ArticleMetaCardProps {
  meta: DocsArticleMeta
  ariaLabel?: string
}

export function ArticleMetaCard({ meta, ariaLabel = "Article metadata" }: ArticleMetaCardProps) {
  return (
    <aside className={styles.card} aria-label={ariaLabel}>
      <header className={styles.head}>
        <span className={styles.kicker}>Article metadata</span>
        <span className={styles.version}>
          <time dateTime={meta.versionIso}>{meta.versionLabel}</time>
        </span>
      </header>

      <dl className={styles.dates}>
        <div className={styles.date}>
          <dt>Published</dt>
          <dd>
            <time dateTime={meta.publishedIso}>{meta.publishedLabel}</time>
          </dd>
        </div>
        <div className={styles.date}>
          <dt>Updated</dt>
          <dd>
            <time dateTime={meta.updatedIso}>{meta.updatedLabel}</time>
          </dd>
        </div>
      </dl>

      <section className={styles.role} aria-label="Author">
        <span className={styles.roleLabel}>Author</span>
        <div className={styles.person}>
          <span className={styles.avatar} aria-hidden="true">
            {meta.author.initials}
          </span>
          <div className={styles.personMain}>
            <span className={styles.personName}>{meta.author.name}</span>
            <span className={styles.personRole}>{meta.author.role}</span>
          </div>
        </div>
      </section>

      <section className={styles.role} aria-label="Editor">
        <span className={styles.roleLabel}>Editor</span>
        <div className={styles.person}>
          <span className={[styles.avatar, styles.avatarTeal].join(" ")} aria-hidden="true">
            {meta.editor.initials}
          </span>
          <div className={styles.personMain}>
            <span className={styles.personName}>{meta.editor.name}</span>
            <span className={styles.personRole}>{meta.editor.role}</span>
          </div>
        </div>
      </section>

      {meta.contributors.length > 0 ? (
        <section className={styles.contributors} aria-label="Contributors">
          <span className={styles.roleLabel}>Contributors</span>
          <ul className={styles.contributorList}>
            {meta.contributors.map((person) => (
              <li key={`${person.name}-${person.initials}`}>
                <span className={styles.tinyAvatar} aria-hidden="true">
                  {person.initials}
                </span>
                {person.name}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  )
}

export default ArticleMetaCard
