import Link from "next/link"

import type {
  DocsChangelogEntry,
  DocsChangelogKind,
} from "./docs-suite-types"

import styles from "./changelog-strip.module.css"

interface ChangelogStripProps {
  entries: ReadonlyArray<DocsChangelogEntry>
  title?: string
  viewAllHref?: string
  ariaLabel?: string
}

const KIND_LABEL: Record<DocsChangelogKind, string> = {
  added: "Added",
  fixed: "Fixed",
  changed: "Changed",
  deprecated: "Deprecated",
}

const KIND_CLASS: Record<DocsChangelogKind, string> = {
  added: "chipAdded",
  fixed: "chipFixed",
  changed: "chipChanged",
  deprecated: "chipDeprecated",
}

export function ChangelogStrip({
  entries,
  title = "Recent changes on this page",
  viewAllHref,
  ariaLabel,
}: ChangelogStripProps) {
  return (
    <aside className={styles.strip} aria-label={ariaLabel ?? title}>
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {viewAllHref ? (
          <Link className={styles.viewAll} href={viewAllHref}>
            View all
          </Link>
        ) : null}
      </header>
      <ul className={styles.list}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <ChangelogRow entry={entry} />
          </li>
        ))}
      </ul>
    </aside>
  )
}

function ChangelogRow({ entry }: { entry: DocsChangelogEntry }) {
  const chipClass = styles[KIND_CLASS[entry.kind]] ?? ""
  const chip = (
    <span className={[styles.chip, chipClass].filter(Boolean).join(" ")}>
      {KIND_LABEL[entry.kind]}
    </span>
  )
  const summary = <p className={styles.summary}>{entry.summary}</p>
  const time = (
    <time className={styles.time} dateTime={entry.occurredIso}>
      {entry.occurredAt}
    </time>
  )

  if (entry.href) {
    return (
      <Link
        href={entry.href}
        className={[styles.row, styles.rowLink].join(" ")}
      >
        {chip}
        {summary}
        {time}
      </Link>
    )
  }

  return (
    <div className={styles.row}>
      {chip}
      {summary}
      {time}
    </div>
  )
}

export default ChangelogStrip
