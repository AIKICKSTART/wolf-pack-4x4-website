import { Fragment } from "react"

import { CodeBlock } from "../primitives/code-block"
import type { StoredProcedure } from "./db-admin-types"
import styles from "./stored-procedure-card.module.css"

interface StoredProcedureCardProps {
  procedure: StoredProcedure
  /** Max code body height — defaults to 220. */
  bodyMaxHeight?: number
  className?: string
}

const LANGUAGE_CLASS: Record<StoredProcedure["language"], string> = {
  plpgsql: styles.languagePlpgsql,
  sql: styles.languageSql,
  python: styles.languagePython,
  js: styles.languageJs,
}

const LANGUAGE_LABEL: Record<StoredProcedure["language"], string> = {
  plpgsql: "plpgsql",
  sql: "sql",
  python: "python",
  js: "javascript",
}

export function StoredProcedureCard({
  procedure,
  bodyMaxHeight = 220,
  className,
}: StoredProcedureCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Stored procedure ${procedure.name}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Stored procedure</span>
        <span className={styles.signature}>
          <span className={styles.name}>{procedure.name}</span>
          <span className={styles.argsLine}>(</span>
          {procedure.arguments.map((argument, index) => (
            <Fragment key={argument.name}>
              <span className={styles.argName}>{argument.name}</span>
              <span className={styles.argsLine}> </span>
              <span className={styles.argType}>{argument.type}</span>
              {index < procedure.arguments.length - 1 ? (
                <span className={styles.argsLine}>, </span>
              ) : null}
            </Fragment>
          ))}
          <span className={styles.argsLine}>) → </span>
          <span className={styles.returns}>{procedure.returns}</span>
        </span>
      </header>
      <div className={styles.metaRow}>
        <span className={`${styles.metaChip} ${LANGUAGE_CLASS[procedure.language]}`}>
          {LANGUAGE_LABEL[procedure.language]}
        </span>
        <span className={styles.metaChip}>{procedure.arguments.length} args</span>
        <span className={styles.metaChip}>{procedure.body.split("\n").length} lines</span>
      </div>
      <CodeBlock
        code={procedure.body}
        language={LANGUAGE_LABEL[procedure.language]}
        fileName={`${procedure.name}()`}
        maxHeight={bodyMaxHeight}
      />
    </article>
  )
}

export default StoredProcedureCard
