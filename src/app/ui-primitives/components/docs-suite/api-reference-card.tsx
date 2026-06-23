import type {
  DocsApiMethod,
  DocsApiQueryParam,
  DocsApiTryItLink,
} from "./docs-suite-types"

import styles from "./api-reference-card.module.css"

interface ApiReferenceCardProps {
  method: DocsApiMethod
  path: string
  description: string
  parameters: ReadonlyArray<DocsApiQueryParam>
  tryIt?: DocsApiTryItLink
  ariaLabel?: string
}

const METHOD_CLASS: Record<DocsApiMethod, string> = {
  GET: "methodGet",
  POST: "methodPost",
  PATCH: "methodPatch",
  PUT: "methodPut",
  DELETE: "methodDelete",
}

export function ApiReferenceCard({
  method,
  path,
  description,
  parameters,
  tryIt,
  ariaLabel,
}: ApiReferenceCardProps) {
  const methodClass = styles[METHOD_CLASS[method]] ?? ""

  return (
    <article
      className={styles.card}
      aria-label={ariaLabel ?? `${method} ${path}`}
    >
      <header className={styles.head}>
        <div className={styles.signature}>
          <span
            className={[styles.method, methodClass].filter(Boolean).join(" ")}
            aria-label={`HTTP method ${method}`}
          >
            {method}
          </span>
          <code className={styles.path} aria-label="Endpoint path">
            {path}
          </code>
          {tryIt ? (
            <a
              className={styles.tryIt}
              href={tryIt.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tryIt.label} — opens in a new tab`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m6 18 12-12M9 6h9v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tryIt.label}
            </a>
          ) : null}
        </div>
        <p className={styles.description}>{description}</p>
      </header>

      {parameters.length > 0 ? (
        <section className={styles.params} aria-label="Query parameters">
          <header className={styles.sectionHead}>
            <h4 className={styles.sectionTitle}>Parameters</h4>
            <span className={styles.sectionTitle}>{parameters.length} total</span>
          </header>
          <div className={[styles.row, styles.rowHead].join(" ")} role="row">
            <span>Name</span>
            <span>Type</span>
            <span>Required</span>
            <span>Description</span>
          </div>
          {parameters.map((param) => (
            <div key={param.name} className={styles.row} role="row">
              <code className={styles.paramName}>{param.name}</code>
              <span className={styles.paramType}>{param.type}</span>
              <span
                className={[styles.paramRequired, param.required ? styles.requiredYes : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {param.required ? "Required" : "Optional"}
              </span>
              <span className={styles.paramDesc}>{param.description}</span>
            </div>
          ))}
        </section>
      ) : null}
    </article>
  )
}

export default ApiReferenceCard
