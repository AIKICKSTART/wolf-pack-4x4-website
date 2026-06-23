"use client"

import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import type { EndpointSummary, HttpMethod } from "./api-explorer-types"

import styles from "./endpoint-catalog.module.css"

interface EndpointCatalogProps {
  endpoints: ReadonlyArray<EndpointSummary>
  /** Currently-selected endpoint id (drives `aria-current`). */
  selectedId?: string
  /** Click handler — when omitted, items render as static rows. */
  onSelect?: (endpoint: EndpointSummary) => void
  /** Override the default search placeholder. */
  searchPlaceholder?: string
  className?: string
}

const METHOD_CLASS: Record<HttpMethod, string> = {
  GET: styles.methodGet,
  POST: styles.methodPost,
  PUT: styles.methodPut,
  PATCH: styles.methodPatch,
  DELETE: styles.methodDelete,
  HEAD: styles.methodHead,
  OPTIONS: styles.methodOptions,
}

interface TagGroup {
  tag: string
  items: ReadonlyArray<EndpointSummary>
}

function groupByTag(endpoints: ReadonlyArray<EndpointSummary>): ReadonlyArray<TagGroup> {
  const map = new Map<string, EndpointSummary[]>()
  for (const endpoint of endpoints) {
    const list = map.get(endpoint.tag) ?? []
    list.push(endpoint)
    map.set(endpoint.tag, list)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, items]) => ({ tag, items }))
}

export function EndpointCatalog({
  endpoints,
  selectedId,
  onSelect,
  searchPlaceholder = "Filter endpoints…",
  className,
}: EndpointCatalogProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle.length === 0) {
      return endpoints
    }
    return endpoints.filter((endpoint) => {
      return (
        endpoint.path.toLowerCase().includes(needle) ||
        endpoint.summary.toLowerCase().includes(needle) ||
        endpoint.tag.toLowerCase().includes(needle) ||
        endpoint.method.toLowerCase().includes(needle)
      )
    })
  }, [endpoints, query])

  const groups = useMemo(() => groupByTag(filtered), [filtered])
  const classes = [styles.catalog, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="API endpoint catalogue">
      <label className={styles.searchWrap}>
        <Search size={13} strokeWidth={2.4} aria-hidden="true" className={styles.searchIcon} />
        <span className={styles.srOnly}>Filter endpoints</span>
        <input
          type="search"
          className={styles.search}
          value={query}
          spellCheck={false}
          autoComplete="off"
          placeholder={searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {groups.length === 0 ? (
        <p className={styles.empty}>No endpoints match the current filter.</p>
      ) : (
        <ul className={styles.groups} role="list">
          {groups.map((group) => (
            <li key={group.tag} className={styles.group}>
              <h3 className={styles.groupTitle}>
                <span>{group.tag}</span>
                <span className={styles.groupCount}>{group.items.length}</span>
              </h3>
              <ul className={styles.items} role="list">
                {group.items.map((endpoint) => {
                  const isCurrent = endpoint.id === selectedId
                  const rowClasses = [
                    styles.row,
                    isCurrent && styles.rowCurrent,
                    endpoint.deprecated && styles.rowDeprecated,
                  ]
                    .filter(Boolean)
                    .join(" ")
                  const content = (
                    <>
                      <span
                        className={[styles.method, METHOD_CLASS[endpoint.method]].join(" ")}
                      >
                        {endpoint.method}
                      </span>
                      <code className={styles.path}>{endpoint.path}</code>
                      <span className={styles.summary}>{endpoint.summary}</span>
                      {endpoint.deprecated && (
                        <span className={styles.depTag} aria-label="Deprecated">
                          DEP
                        </span>
                      )}
                    </>
                  )
                  if (onSelect) {
                    return (
                      <li key={endpoint.id}>
                        <button
                          type="button"
                          className={rowClasses}
                          aria-current={isCurrent ? "true" : undefined}
                          onClick={() => onSelect(endpoint)}
                        >
                          {content}
                        </button>
                      </li>
                    )
                  }
                  return (
                    <li key={endpoint.id} className={rowClasses}>
                      {content}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default EndpointCatalog
