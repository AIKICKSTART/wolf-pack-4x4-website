"use client"

import { ArrowUpRight } from "lucide-react"

import { AuthMethodChip } from "./auth-method-chip"
import type { AuthMethod, HttpMethod } from "./api-console-types"

import styles from "./endpoint-card.module.css"

interface EndpointCardProps {
  method: HttpMethod
  path: string
  description: string
  /** e.g. "v1" or "v2-beta" */
  version: string
  /** Authentication required to call this endpoint. */
  auth: AuthMethod
  /** Optional handler — when omitted the CTA renders as a static label. */
  onTry?: () => void
  /** Override the CTA label. */
  tryLabel?: string
  /** Mark the endpoint as deprecated. */
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

export function EndpointCard({
  method,
  path,
  description,
  version,
  auth,
  onTry,
  tryLabel = "Try it",
  deprecated = false,
  className,
}: EndpointCardProps) {
  const classes = [styles.card, deprecated && styles.deprecated, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`${method} ${path}`}>
      <header className={styles.head}>
        <span className={[styles.methodChip, METHOD_CLASS[method]].join(" ")}>{method}</span>
        <code className={styles.path}>{path}</code>
        {deprecated && <span className={styles.deprecatedTag}>Deprecated</span>}
      </header>

      <p className={styles.description}>{description}</p>

      <footer className={styles.foot}>
        <div className={styles.meta}>
          <span className={styles.versionChip}>{version}</span>
          <AuthMethodChip method={auth} />
        </div>
        {onTry ? (
          <button type="button" className={styles.tryBtn} onClick={onTry}>
            <span>{tryLabel}</span>
            <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : (
          <span className={styles.tryStatic}>
            <span>{tryLabel}</span>
            <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
          </span>
        )}
      </footer>
    </article>
  )
}

export default EndpointCard
