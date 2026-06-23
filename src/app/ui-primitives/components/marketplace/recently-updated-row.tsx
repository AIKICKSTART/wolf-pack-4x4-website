import { VersionChip } from "./version-chip"
import styles from "./recently-updated-row.module.css"

export interface RecentlyUpdatedRowItem {
  id: string
  name: string
  version: string
  releaseDate: string
  changelogExcerpt: string
  logoInitials?: string
  href?: string
}

export interface RecentlyUpdatedRowProps {
  items: ReadonlyArray<RecentlyUpdatedRowItem>
  title?: string
  className?: string
}

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function RecentlyUpdatedRow({
  items,
  title = "Recently updated",
  className,
}: RecentlyUpdatedRowProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => {
          const initials = item.logoInitials ?? initialsFromName(item.name)
          const content = (
            <>
              <span className={styles.logo} aria-hidden="true">
                {initials}
              </span>
              <div className={styles.identity}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.releaseDate}>{item.releaseDate}</span>
              </div>
              <span className={styles.versionSlot}>
                <VersionChip version={item.version} releaseDate={item.releaseDate} />
              </span>
              <p className={styles.excerpt}>{item.changelogExcerpt}</p>
            </>
          )
          if (item.href) {
            return (
              <li key={item.id}>
                <a className={styles.row} href={item.href}>
                  {content}
                </a>
              </li>
            )
          }
          return (
            <li key={item.id}>
              <div className={styles.row}>{content}</div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RecentlyUpdatedRow
