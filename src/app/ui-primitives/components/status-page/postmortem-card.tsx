import styles from "./postmortem-card.module.css"

export interface PostmortemActionItem {
  id: string
  owner: string
  description: string
  dueDate: string
}

export interface PostmortemCardProps {
  title: string
  date: string
  author: string
  /** Bullet list of the 5-whys summary, top-level. */
  fiveWhys: ReadonlyArray<string>
  actionItems: ReadonlyArray<PostmortemActionItem>
  lessonsLearned: string
  className?: string
}

export function PostmortemCard({
  title,
  date,
  author,
  fiveWhys,
  actionItems,
  lessonsLearned,
  className,
}: PostmortemCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Postmortem — ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Postmortem · {date}</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.author}>By {author}</span>
      </header>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>5 Whys</h4>
        <ol className={styles.whys}>
          {fiveWhys.map((why, idx) => (
            <li key={`why-${idx}`} className={styles.whyItem}>
              <span className={styles.whyIndex}>{idx + 1}</span>
              <span className={styles.whyBody}>{why}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>Action items</h4>
        <ul className={styles.actions}>
          {actionItems.map((item) => (
            <li key={item.id} className={styles.actionItem}>
              <div className={styles.actionMain}>
                <span className={styles.actionDescription}>{item.description}</span>
                <span className={styles.actionMeta}>
                  {item.owner} · due {item.dueDate}
                </span>
              </div>
              <span className={styles.actionChip}>Open</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h4 className={styles.sectionTitle}>Lessons learned</h4>
        <p className={styles.lessons}>{lessonsLearned}</p>
      </section>
    </article>
  )
}

export default PostmortemCard
