import { ArrowUpRight } from "lucide-react"
import { Fragment, type ReactNode } from "react"

import styles from "./search-result-card.module.css"

export interface SearchResultCardTag {
  id: string
  label: string
}

interface SearchResultCardProps {
  title: string
  url: string
  source?: string
  snippet?: string
  thumbnail?: ReactNode
  tags?: ReadonlyArray<SearchResultCardTag>
  query?: string
  href?: string
  className?: string
}

function HighlightedText({ text, query }: { text: string; query?: string }): ReactNode {
  const trimmed = query?.trim() ?? ""
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

export function SearchResultCard({
  title,
  url,
  source,
  snippet,
  thumbnail,
  tags,
  query,
  href,
  className,
}: SearchResultCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const Anchor = href ? "a" : "article"
  return (
    <Anchor className={classes} href={href}>
      {thumbnail ? (
        <span className={styles.thumb} aria-hidden="true">
          {thumbnail}
        </span>
      ) : null}
      <div className={styles.body}>
        <header className={styles.head}>
          {source ? <span className={styles.source}>{source}</span> : null}
          <span className={styles.url}>
            <span className={styles.urlPath}>{url}</span>
            <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
          </span>
        </header>
        <h3 className={styles.title}>
          <HighlightedText text={title} query={query} />
        </h3>
        {snippet ? (
          <p className={styles.snippet}>
            <HighlightedText text={snippet} query={query} />
          </p>
        ) : null}
        {tags && tags.length > 0 ? (
          <ul className={styles.tagList}>
            {tags.map((tag) => (
              <li key={tag.id} className={styles.tag}>
                {tag.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Anchor>
  )
}

export default SearchResultCard
