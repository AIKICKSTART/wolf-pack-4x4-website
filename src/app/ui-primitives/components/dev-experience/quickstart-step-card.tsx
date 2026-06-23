"use client"

import { Check } from "lucide-react"
import { useState, type ReactNode } from "react"

import { CodeBlock } from "../primitives/code-block"
import { CODE_LANGUAGE_LABEL, type CodeLanguage } from "./dev-experience-types"
import styles from "./quickstart-step-card.module.css"

export interface QuickstartStepCardProps {
  /** 1-based step index — rendered in the number chip. */
  stepNumber: number
  /** Step title — short imperative ("Install the SDK"). */
  title: string
  /** Body explanation — supports rich content via ReactNode. */
  children: ReactNode
  /** Source code shown under the body. */
  code: string
  /** Language tag for the code-block. */
  language: CodeLanguage
  /** Optional file name shown on the code-block header. */
  fileName?: string
  /** Optional initial done state (uncontrolled). */
  initialDone?: boolean
  /** Optional className passthrough. */
  className?: string
}

export function QuickstartStepCard({
  stepNumber,
  title,
  children,
  code,
  language,
  fileName,
  initialDone = false,
  className,
}: QuickstartStepCardProps) {
  const [done, setDone] = useState<boolean>(initialDone)
  const classes = [styles.card, done ? styles.cardDone : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-labelledby={`step-${stepNumber}-title`}
      data-done={done}
    >
      <header className={styles.head}>
        <span className={styles.chip} aria-hidden="true">
          {stepNumber.toString().padStart(2, "0")}
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>
            Step · {CODE_LANGUAGE_LABEL[language]}
          </span>
          <h3 id={`step-${stepNumber}-title`} className={styles.title}>
            {title}
          </h3>
        </div>
        <button
          type="button"
          className={`${styles.toggle} ${done ? styles.toggleDone : ""}`}
          onClick={() => setDone((prev) => !prev)}
          aria-pressed={done}
          aria-label={done ? "Mark step as not done" : "Mark step as done"}
        >
          <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          <span>{done ? "Done" : "Mark done"}</span>
        </button>
      </header>
      <div className={styles.body}>{children}</div>
      <CodeBlock
        code={code}
        language={language}
        fileName={fileName}
        showLineNumbers={false}
      />
    </article>
  )
}

export default QuickstartStepCard
