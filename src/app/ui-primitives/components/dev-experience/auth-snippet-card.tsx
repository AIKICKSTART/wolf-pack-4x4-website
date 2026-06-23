"use client"

import { ExternalLink } from "lucide-react"
import { useId, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import {
  AUTH_METHOD_LABEL,
  type AuthMethod,
  type CodeLanguage,
} from "./dev-experience-types"
import styles from "./auth-snippet-card.module.css"

export interface AuthSnippetVariant {
  method: AuthMethod
  code: string
  language: CodeLanguage
  /** Short summary appended below the method title. */
  caption: string
}

export interface AuthSnippetCardProps {
  /** Snippet variants — at least one required. */
  variants: ReadonlyArray<AuthSnippetVariant>
  /** Default method tab. Defaults to the first variant. */
  defaultMethod?: AuthMethod
  /** Postman destination URL — opens in a new tab. */
  postmanUrl?: string
  /** Optional className passthrough. */
  className?: string
}

export function AuthSnippetCard({
  variants,
  defaultMethod,
  postmanUrl,
  className,
}: AuthSnippetCardProps) {
  const initial = defaultMethod ?? variants[0]?.method ?? "bearer"
  const [active, setActive] = useState<AuthMethod>(initial)
  const tablistId = useId()
  const current = variants.find((v) => v.method === active) ?? variants[0]
  const classes = [styles.card, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  return (
    <section className={classes} aria-label="Authentication snippet">
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Authentication</span>
          <h3 className={styles.title}>{AUTH_METHOD_LABEL[current.method]}</h3>
          <p className={styles.caption}>{current.caption}</p>
        </div>
        {postmanUrl ? (
          <a
            className={styles.postman}
            href={postmanUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Open in Postman</span>
            <ExternalLink size={13} strokeWidth={2.2} aria-hidden="true" />
          </a>
        ) : null}
      </header>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Auth method"
        id={tablistId}
      >
        {variants.map((variant) => {
          const selected = variant.method === active
          return (
            <button
              key={variant.method}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
              onClick={() => setActive(variant.method)}
            >
              {AUTH_METHOD_LABEL[variant.method]}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-label={`${AUTH_METHOD_LABEL[current.method]} snippet`}
        className={styles.panel}
      >
        <CodeBlock
          code={current.code}
          language={current.language}
          showLineNumbers
        />
      </div>
    </section>
  )
}

export default AuthSnippetCard
