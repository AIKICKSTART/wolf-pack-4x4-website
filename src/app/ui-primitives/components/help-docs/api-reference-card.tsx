import { CodeBlock } from "../primitives/code-block"

import styles from "./api-reference-card.module.css"

export type ApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
}

interface ApiReferenceCardProps {
  method: ApiMethod
  path: string
  description: string
  parameters: ReadonlyArray<ApiParameter>
  requestExample: string
  responseExample: string
  requestLanguage?: string
  responseLanguage?: string
}

const METHOD_CLASS: Record<ApiMethod, string> = {
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
  requestExample,
  responseExample,
  requestLanguage = "bash",
  responseLanguage = "json",
}: ApiReferenceCardProps) {
  const methodClass = styles[METHOD_CLASS[method]]
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={[styles.method, methodClass].filter(Boolean).join(" ")}>{method}</span>
        <code className={styles.path}>{path}</code>
        <p className={styles.description}>{description}</p>
      </header>

      <section className={styles.section} aria-label="Parameters">
        <h4 className={styles.sectionTitle}>Parameters</h4>
        <div className={styles.table} role="table">
          <div className={styles.row} role="row">
            <span role="columnheader">Name</span>
            <span role="columnheader">Type</span>
            <span role="columnheader">Required</span>
            <span role="columnheader">Description</span>
          </div>
          {parameters.map((param) => (
            <div key={param.name} className={styles.row} role="row">
              <code role="cell" className={styles.paramName}>
                {param.name}
              </code>
              <span role="cell" className={styles.paramType}>
                {param.type}
              </span>
              <span role="cell" className={styles.paramRequired}>
                {param.required ? "Yes" : "—"}
              </span>
              <span role="cell" className={styles.paramDesc}>
                {param.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-label="Example request">
        <h4 className={styles.sectionTitle}>Example request</h4>
        <CodeBlock code={requestExample} language={requestLanguage} showLineNumbers={false} />
      </section>

      <section className={styles.section} aria-label="Example response">
        <h4 className={styles.sectionTitle}>Example response</h4>
        <CodeBlock code={responseExample} language={responseLanguage} showLineNumbers={false} />
      </section>
    </article>
  )
}

export default ApiReferenceCard
