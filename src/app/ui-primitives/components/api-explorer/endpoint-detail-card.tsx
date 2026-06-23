import { Copy, Link2 } from "lucide-react"

import { AuthMethodChip } from "../api-console/auth-method-chip"
import type { AuthMethod, HttpMethod } from "./api-explorer-types"

import styles from "./endpoint-detail-card.module.css"

interface EndpointDetailCardProps {
  method: HttpMethod
  path: string
  summary: string
  description: string
  version: string
  auth: AuthMethod
  /** Tag the endpoint belongs to (rendered as a kicker). */
  tag?: string
  /** Optional path-parameter / query-parameter quick references. */
  pathParams?: ReadonlyArray<{ name: string; description: string }>
  /** Deprecation flag — applies a subtle hatched background. */
  deprecated?: boolean
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

export function EndpointDetailCard({
  method,
  path,
  summary,
  description,
  version,
  auth,
  tag,
  pathParams,
  deprecated = false,
  className,
}: EndpointDetailCardProps) {
  const classes = [styles.card, deprecated && styles.deprecated, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${method} ${path}`}>
      <header className={styles.head}>
        {tag && <span className={styles.tagKicker}>{tag}</span>}
        <h2 className={styles.summary}>{summary}</h2>
      </header>

      <div className={styles.signature}>
        <span className={[styles.method, METHOD_CLASS[method]].join(" ")}>{method}</span>
        <code className={styles.path}>{path}</code>
        <span className={styles.copyHint} aria-hidden="true">
          <Copy size={11} strokeWidth={2.4} />
        </span>
      </div>

      <p className={styles.description}>{description}</p>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>Version</dt>
          <dd>
            <span className={styles.versionChip}>{version}</span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Auth</dt>
          <dd>
            <AuthMethodChip method={auth} />
          </dd>
        </div>
        {deprecated && (
          <div className={styles.metaItem}>
            <dt>Status</dt>
            <dd>
              <span className={styles.depPill}>
                <Link2 size={11} strokeWidth={2.4} aria-hidden="true" />
                Deprecated
              </span>
            </dd>
          </div>
        )}
      </dl>

      {pathParams && pathParams.length > 0 && (
        <section className={styles.paramSection} aria-label="Path parameters">
          <h3 className={styles.paramTitle}>Path parameters</h3>
          <ul className={styles.paramList}>
            {pathParams.map((param) => (
              <li key={param.name} className={styles.paramRow}>
                <code className={styles.paramName}>{param.name}</code>
                <span className={styles.paramDesc}>{param.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export default EndpointDetailCard
