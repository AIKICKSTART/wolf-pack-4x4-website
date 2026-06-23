"use client"

import { Braces, ChevronRight, Sparkles, Variable } from "lucide-react"
import { useId, useState } from "react"

import { Chip } from "../primitives/chip"
import { formatTokens, type WorkflowTone } from "./ai-workflow-types"
import styles from "./prompt-block.module.css"

export interface PromptBlockVariable {
  id: string
  name: string
  /** Hint for the value — shown inline as a faded chip. */
  sample: string
  tone?: WorkflowTone
}

interface PromptBlockProps {
  title: string
  /** Short context strip — e.g. "Quote estimator · v3". */
  kicker?: string
  /** Editable system prompt body. */
  systemPrompt: string
  /** Editable user prompt template. */
  userPrompt: string
  /** Variables in scope. */
  variables: ReadonlyArray<PromptBlockVariable>
  /** Token budget warning ceiling. */
  tokenBudget?: number
  className?: string
}

const TONE_CHIP: Record<WorkflowTone, "neutral" | "red" | "amber" | "teal" | "green"> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  violet: "teal",
}

/** Cheap visual token estimate (words × 1.3). Not for billing. */
function estimateTokens(text: string): number {
  if (!text) {
    return 0
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words * 1.3))
}

export function PromptBlock({
  title,
  kicker,
  systemPrompt,
  userPrompt,
  variables,
  tokenBudget = 8000,
  className,
}: PromptBlockProps) {
  const systemId = useId()
  const userId = useId()
  const [system, setSystem] = useState(systemPrompt)
  const [user, setUser] = useState(userPrompt)

  const tokens = estimateTokens(system) + estimateTokens(user)
  const ratio = Math.min(1, tokens / tokenBudget)
  const tone: WorkflowTone = ratio > 0.85 ? "red" : ratio > 0.65 ? "amber" : "teal"

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Prompt block · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Sparkles size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span
          className={styles.tokenChip}
          data-tone={tone}
          aria-label={`Token estimate ${tokens} of budget ${tokenBudget}`}
        >
          <span className={styles.tokenCount}>{formatTokens(tokens)}</span>
          <span className={styles.tokenSep}>/</span>
          <span className={styles.tokenBudget}>{formatTokens(tokenBudget)}</span>
        </span>
      </header>

      <div className={styles.budgetBar} aria-hidden="true">
        <span
          className={styles.budgetFill}
          data-tone={tone}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={systemId} className={styles.fieldLabel}>
          <Braces size={11} strokeWidth={2.4} aria-hidden="true" /> System
        </label>
        <textarea
          id={systemId}
          className={styles.textarea}
          rows={4}
          spellCheck={false}
          value={system}
          onChange={(event) => setSystem(event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={userId} className={styles.fieldLabel}>
          <ChevronRight size={11} strokeWidth={2.4} aria-hidden="true" /> User
        </label>
        <textarea
          id={userId}
          className={styles.textarea}
          rows={4}
          spellCheck={false}
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
      </div>

      <div className={styles.varsRow} aria-label="Variables in scope">
        <span className={styles.varsLabel}>
          <Variable size={11} strokeWidth={2.4} aria-hidden="true" /> Variables ·{" "}
          {variables.length}
        </span>
        <div className={styles.varChips}>
          {variables.map((variable) => (
            <span key={variable.id} className={styles.varChipWrap}>
              <Chip
                label={`{{${variable.name}}}`}
                tone={TONE_CHIP[variable.tone ?? "teal"]}
              />
              <span className={styles.varSample}>{variable.sample}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromptBlock
