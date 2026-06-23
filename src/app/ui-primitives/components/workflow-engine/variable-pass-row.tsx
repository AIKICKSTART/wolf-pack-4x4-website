import { ArrowRight, KeySquare } from "lucide-react"

import {
  VAR_SOURCE_LABEL,
  VAR_TYPE_LABEL,
  VAR_TYPE_TONE,
  type EngineTone,
  type EngineVarSource,
  type EngineVarType,
} from "./workflow-engine-types"
import styles from "./variable-pass-row.module.css"

/**
 * Variable pass-through row — single line in the variable explorer that
 * shows where a variable came from, its name, its type, and where it's
 * being mapped to in the next step. Used in the inspector + composition
 * scenes to make the data plane legible.
 */
interface VariablePassRowProps {
  /** Path token, e.g. "trigger.customer.email" or "step3.quote.id". */
  source: string
  /** Source kind — trigger / step / constant / secret / context. */
  sourceKind: EngineVarSource
  /** Variable runtime type. */
  type: EngineVarType
  /** Target path — where this value is being written into. */
  target: string
  /** Optional preview value — shown faded. */
  sample?: string
  /** Optional flag — marks the row as required for the target. */
  required?: boolean
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

export function VariablePassRow({
  source,
  sourceKind,
  type,
  target,
  sample,
  required = false,
  className,
}: VariablePassRowProps) {
  const tone = VAR_TYPE_TONE[type]
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      style={{ "--row-tone": TONE_VAR[tone] } as Record<string, string>}
      aria-label={`Variable ${source} maps to ${target}`}
    >
      <span className={styles.sourceChip} aria-label={`Source · ${VAR_SOURCE_LABEL[sourceKind]}`}>
        <KeySquare size={11} strokeWidth={2.4} aria-hidden="true" />
        {VAR_SOURCE_LABEL[sourceKind]}
      </span>
      <code className={styles.sourcePath}>{source}</code>
      <span className={styles.typeChip}>{VAR_TYPE_LABEL[type]}</span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowRight size={14} strokeWidth={2.4} />
      </span>
      <code className={styles.targetPath}>{target}</code>
      <div className={styles.tailRow}>
        {required ? <span className={styles.requiredChip}>Required</span> : null}
        {sample ? <span className={styles.sample}>{sample}</span> : null}
      </div>
    </article>
  )
}

export default VariablePassRow
