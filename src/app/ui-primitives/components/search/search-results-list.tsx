import { Fragment, type ReactNode } from "react"

import styles from "./search-results-list.module.css"

export type SearchResultKind = "product" | "file" | "person" | "doc" | "job" | "generic"

export interface SearchResultItem {
  id: string
  title: string
  href?: string
  snippet?: string
  kind?: SearchResultKind
  kindLabel?: string
  meta?: ReadonlyArray<string>
  trailing?: ReactNode
}

interface SearchResultsListProps {
  query: string
  results: ReadonlyArray<SearchResultItem>
  variant?: "compact" | "comfortable"
  totalCount?: number
  emptyState?: ReactNode
  className?: string
}

const KIND_TONE: Record<SearchResultKind, string> = {
  product: styles.toneAmber,
  file: styles.toneTeal,
  person: styles.tonePurple,
  doc: styles.toneNeutral,
  job: styles.toneRed,
  generic: styles.toneNeutral,
}

function HighlightedText({ text, query }: { text: string; query: string }): ReactNode {
  const trimmed = query.trim()
  if (trimmed.length === 0) {
    return text
  }
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escaped})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className={styles.mark}>
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}

export function SearchResultsList({
  query,
  results,
  variant = "comfortable",
  totalCount,
  emptyState,
  className,
}: SearchResultsListProps) {
  const classes = [styles.list, variant === "compact" && styles.compact, className]
    .filter(Boolean)
    .join(" ")

  if (results.length === 0) {
    return (
      <div className={styles.emptyShell}>
        {emptyState ?? <p className={styles.emptyDefault}>No results found.</p>}
      </div>
    )
  }

  return (
    <section className={styles.wrap} aria-label="Search results">
      <header className={styles.header}>
        <output
          className={styles.count}
          role="status"
          aria-live="polite"
        >
          {totalCount ?? results.length} {(totalCount ?? results.length) === 1 ? "result" : "results"}
        </output>
        {query.trim().length > 0 ? (
          <span className={styles.queryEcho} aria-hidden="true">
            for <code>{query}</code>
          </span>
        ) : null}
      </header>
      <ul className={classes}>
        {results.map((result) => {
          const kind = result.kind ?? "generic"
          const Anchor = result.href ? "a" : "div"
          return (
            <li key={result.id}>
              <Anchor className={styles.item} href={result.href}>
                <div className={styles.itemHead}>
                  <h3 className={styles.title}>
                    <HighlightedText text={result.title} query={query} />
                  </h3>
                  {result.kindLabel ? (
                    <span className={`${styles.kindChip} ${KIND_TONE[kind]}`}>
                      {result.kindLabel}
                    </span>
                  ) : null}
                </div>
                {result.snippet ? (
                  <p className={styles.snippet}>
                    <HighlightedText text={result.snippet} query={query} />
                  </p>
                ) : null}
                {(result.meta && result.meta.length > 0) || result.trailing ? (
                  <footer className={styles.itemFoot}>
                    {result.meta && result.meta.length > 0 ? (
                      <ul className={styles.metaList}>
                        {result.meta.map((meta, index) => (
                          <li key={`${result.id}-meta-${index}`}>{meta}</li>
                        ))}
                      </ul>
                    ) : null}
                    {result.trailing ? (
                      <span className={styles.trailing}>{result.trailing}</span>
                    ) : null}
                  </footer>
                ) : null}
              </Anchor>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SearchResultsList
