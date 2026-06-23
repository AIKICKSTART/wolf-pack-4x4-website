import { ArrowRight, Wrench } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import { Chip } from "../primitives/chip"
import {
  TOOL_BLURB,
  TOOL_LABEL,
  type WorkflowToolName,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./tool-block.module.css"

export interface ToolBlockMapping {
  /** Result path on the tool response, e.g. "data.skuList[0]". */
  from: string
  /** Variable name written into the workflow scope. */
  to: string
  tone?: WorkflowTone
}

interface ToolBlockProps {
  toolName: WorkflowToolName
  /** Display title — defaults to the tool label. */
  title?: string
  /** Short context kicker. */
  kicker?: string
  /** JSON schema preview (already pretty-printed). */
  schemaPreview: string
  /** Output → workflow-scope mappings. */
  mappings: ReadonlyArray<ToolBlockMapping>
  /** Optional retry policy text. */
  retryPolicy?: string
  /** Optional timeout policy text. */
  timeoutMs?: number
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

export function ToolBlock({
  toolName,
  title,
  kicker = "Tool call",
  schemaPreview,
  mappings,
  retryPolicy,
  timeoutMs,
  className,
}: ToolBlockProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={`Tool block · ${toolName}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Wrench size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title ?? TOOL_LABEL[toolName]}</h4>
        </div>
        <code className={styles.name}>{toolName}</code>
      </header>

      <p className={styles.blurb}>{TOOL_BLURB[toolName]}</p>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>JSON schema · input</span>
        <CodeBlock
          code={schemaPreview}
          language="json"
          showLineNumbers={false}
          maxHeight={180}
        />
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Result mapping</span>
        <ul className={styles.mapList} aria-label="Output to scope mappings">
          {mappings.map((mapping) => (
            <li key={`${mapping.from}-${mapping.to}`} className={styles.mapRow}>
              <code className={styles.mapFrom}>{mapping.from}</code>
              <span className={styles.mapArrow} aria-hidden="true">
                <ArrowRight size={12} strokeWidth={2.4} />
              </span>
              <Chip
                label={`{{${mapping.to}}}`}
                tone={TONE_CHIP[mapping.tone ?? "teal"]}
              />
            </li>
          ))}
        </ul>
      </div>

      {retryPolicy || timeoutMs ? (
        <div className={styles.policyRow}>
          {retryPolicy ? (
            <span className={styles.policyChip}>Retry · {retryPolicy}</span>
          ) : null}
          {timeoutMs ? (
            <span className={styles.policyChip}>Timeout · {timeoutMs}ms</span>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export default ToolBlock
