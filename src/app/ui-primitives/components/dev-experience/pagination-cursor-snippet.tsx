import { CodeBlock } from "../primitives/code-block"
import type { CodeLanguage } from "./dev-experience-types"
import styles from "./pagination-cursor-snippet.module.css"

export interface PaginationStep {
  /** Step heading, e.g. "First page request". */
  label: string
  /** Code shown in the step. */
  code: string
  /** Language tag passed down to code-block. */
  language: CodeLanguage
  /** Optional caption below the heading. */
  caption?: string
}

export interface PaginationCursorSnippetProps {
  /** Exactly three steps: first request → cursor response → next request. */
  steps: readonly [PaginationStep, PaginationStep, PaginationStep]
  /** Optional className passthrough. */
  className?: string
}

export function PaginationCursorSnippet({
  steps,
  className,
}: PaginationCursorSnippetProps) {
  const classes = [styles.snippet, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label="Cursor pagination example">
      <header className={styles.head}>
        <span className={styles.kicker}>Pagination</span>
        <h3 className={styles.title}>Cursor-based — three calls</h3>
        <p className={styles.caption}>
          First request returns a <code>next_cursor</code>. Forward the cursor on the
          next call to receive the following page until <code>next_cursor</code> is
          <code> null</code>.
        </p>
      </header>
      <ol className={styles.flow}>
        {steps.map((step, index) => {
          const stepNumber = (index + 1).toString().padStart(2, "0")
          return (
            <li key={`${step.label}-${index}`} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {stepNumber}
                </span>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  {step.caption ? (
                    <span className={styles.stepCaption}>{step.caption}</span>
                  ) : null}
                </div>
              </div>
              <CodeBlock
                code={step.code}
                language={step.language}
                showLineNumbers={false}
              />
              {index < steps.length - 1 ? (
                <div className={styles.arrowRail} aria-hidden="true">
                  <span className={styles.arrowStem} />
                  <span className={styles.arrowHead}>↓</span>
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default PaginationCursorSnippet
