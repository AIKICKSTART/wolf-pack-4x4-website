import styles from "./scope-permission-grid.module.css"

export type ScopePermissionLevel = "granted" | "requested" | "denied" | "none"

export interface ScopePermissionEntry {
  /** Provider name, e.g. "Google", "Stripe". */
  provider: string
  /** Display label, e.g. "Calendar (read)". */
  label: string
  /** OAuth scope id, e.g. "https://www.googleapis.com/auth/calendar.readonly". */
  scope: string
  level: ScopePermissionLevel
}

export interface ScopePermissionGridProps {
  /** Distinct providers — columns. */
  providers: ReadonlyArray<string>
  /** Distinct scope rows — preferred order. */
  scopeRows: ReadonlyArray<{ id: string; label: string; scope: string }>
  /** Cell data keyed by `${provider}::${scopeId}`. */
  entries: ReadonlyArray<ScopePermissionEntry & { id: string }>
  className?: string
}

const LEVEL_CLASS: Record<ScopePermissionLevel, string> = {
  granted: styles.cellGranted,
  requested: styles.cellRequested,
  denied: styles.cellDenied,
  none: styles.cellNone,
}

const LEVEL_LABEL: Record<ScopePermissionLevel, string> = {
  granted: "Granted",
  requested: "Requested",
  denied: "Denied",
  none: "Not requested",
}

const LEVEL_SYMBOL: Record<ScopePermissionLevel, string> = {
  granted: "✓",
  requested: "·",
  denied: "✕",
  none: "—",
}

function buildKey(provider: string, scopeId: string): string {
  return `${provider}::${scopeId}`
}

export function ScopePermissionGrid({
  providers,
  scopeRows,
  entries,
  className,
}: ScopePermissionGridProps) {
  const entryByKey = new Map<string, ScopePermissionEntry>()
  for (const entry of entries) {
    entryByKey.set(buildKey(entry.provider, entry.id), entry)
  }

  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="OAuth scope permission grid by provider"
    >
      <header className={styles.legend}>
        <span className={styles.legendKicker}>Permission grid</span>
        <ul className={styles.legendList} aria-label="Cell legend">
          {(Object.keys(LEVEL_LABEL) as ScopePermissionLevel[]).map((level) => (
            <li key={level} className={styles.legendItem}>
              <span className={[styles.legendDot, LEVEL_CLASS[level]].join(" ")} aria-hidden="true" />
              <span className={styles.legendLabel}>{LEVEL_LABEL[level]}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.scopeHead}>
                Scope
              </th>
              {providers.map((provider) => (
                <th scope="col" key={provider} className={styles.providerHead}>
                  {provider}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scopeRows.map((row) => (
              <tr key={row.id}>
                <th scope="row" className={styles.scopeCell}>
                  <span className={styles.scopeLabel}>{row.label}</span>
                  <code className={styles.scopeCode}>{row.scope}</code>
                </th>
                {providers.map((provider) => {
                  const entry = entryByKey.get(buildKey(provider, row.id))
                  const level: ScopePermissionLevel = entry?.level ?? "none"
                  return (
                    <td key={provider} className={styles.dataCell}>
                      <span
                        className={[styles.cell, LEVEL_CLASS[level]].join(" ")}
                        aria-label={`${row.label} for ${provider} — ${LEVEL_LABEL[level]}`}
                        title={`${row.label} · ${provider} · ${LEVEL_LABEL[level]}`}
                      >
                        {LEVEL_SYMBOL[level]}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ScopePermissionGrid
