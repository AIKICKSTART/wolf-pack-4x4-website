import {
  BookOpen,
  Boxes,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wrench,
} from "lucide-react"

import {
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./template-library-grid.module.css"

/** One workflow template tile. */
export interface WorkflowTemplate {
  id: string
  /** Template title — e.g. "Quote follow-up · day 3". */
  title: string
  /** Short one-liner explaining the flow. */
  summary: string
  /** Category label — e.g. "Sales", "Compliance", "Customer success". */
  category: string
  /** Icon discriminator — picks the right glyph. */
  iconKind: "quote" | "compliance" | "refund" | "welcome" | "recall" | "playbook"
  /** Number of steps in the template — drives the steps chip. */
  steps: number
  /** Number of times this template has been instantiated. */
  installCount: number
  /** Visual tone for the tile accent. */
  tone: EngineTone
  /** Whether this is the workshop's recommended template. */
  recommended?: boolean
}

interface TemplateLibraryGridProps {
  templates: ReadonlyArray<WorkflowTemplate>
  title?: string
  kicker?: string
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

const ICON_LOOKUP: Record<WorkflowTemplate["iconKind"], typeof Sparkles> = {
  quote: Sparkles,
  compliance: ShieldCheck,
  refund: Wallet,
  welcome: BookOpen,
  recall: Wrench,
  playbook: Boxes,
}

export function TemplateLibraryGrid({
  templates,
  title = "Workflow templates",
  kicker = "Library",
  className,
}: TemplateLibraryGridProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.totalChip}>
          {templates.length} templates
        </span>
      </header>

      <ul className={styles.grid} aria-label="Template tiles">
        {templates.map((template) => {
          const Icon = ICON_LOOKUP[template.iconKind]
          return (
            <li
              key={template.id}
              className={styles.tile}
              style={
                {
                  "--tile-tone": TONE_VAR[template.tone],
                } as Record<string, string>
              }
            >
              <header className={styles.tileHead}>
                <span className={styles.tileIcon} aria-hidden="true">
                  <Icon size={14} strokeWidth={2.2} />
                </span>
                <span className={styles.category}>{template.category}</span>
                {template.recommended ? (
                  <span className={styles.recommended}>
                    <CheckCircle2 size={11} strokeWidth={2.4} aria-hidden="true" />
                    Recommended
                  </span>
                ) : null}
              </header>
              <h5 className={styles.tileTitle}>{template.title}</h5>
              <p className={styles.tileSummary}>{template.summary}</p>
              <footer className={styles.tileFoot}>
                <span className={styles.footChip}>
                  {template.steps} step{template.steps === 1 ? "" : "s"}
                </span>
                <span className={styles.footChip}>
                  {template.installCount.toLocaleString()} installs
                </span>
                <span className={styles.useLink}>
                  Use template
                  <span aria-hidden="true">→</span>
                </span>
              </footer>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TemplateLibraryGrid
