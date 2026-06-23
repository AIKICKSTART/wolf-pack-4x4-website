import { CodeBlock } from "../primitives/code-block"

import styles from "./primitive-implementation-card.module.css"

export interface PrimitiveSourceFiles {
  route: string
  component: string
  styles: string
  barrel?: string
  types?: string
}

export interface PrimitiveSetupStep {
  label: string
  detail: string
  command?: string
}

export interface PrimitiveCodeSample {
  title: string
  fileName: string
  language: "tsx" | "css" | "bash" | "json"
  code: string
}

export interface PrimitiveImplementationDoc {
  id: string
  title: string
  componentName: string
  importPath: string
  sourceFiles: PrimitiveSourceFiles
  setup: ReadonlyArray<PrimitiveSetupStep>
  samples: ReadonlyArray<PrimitiveCodeSample>
  usageGuidance: ReadonlyArray<string>
  accessibility: ReadonlyArray<string>
  responsive: ReadonlyArray<string>
  tokens: ReadonlyArray<string>
  dependencies: ReadonlyArray<string>
  agentNotes: ReadonlyArray<string>
}

interface PrimitiveImplementationCardProps {
  doc: PrimitiveImplementationDoc
}

const sourceFileLabels: Array<[keyof PrimitiveSourceFiles, string]> = [
  ["route", "Route"],
  ["component", "Component"],
  ["styles", "Styles"],
  ["barrel", "Barrel"],
  ["types", "Types"],
]

export function PrimitiveImplementationCard({ doc }: PrimitiveImplementationCardProps) {
  return (
    <article className={styles.card} aria-labelledby={`${doc.id}-title`}>
      <header className={styles.header}>
        <span className={styles.kicker}>Implementation source</span>
        <h2 id={`${doc.id}-title`}>{doc.title}</h2>
        <p>
          Use <code>{doc.componentName}</code> from <code>{doc.importPath}</code>. This card is
          the copy contract for agents building the same Mufflermen DNA elsewhere.
        </p>
      </header>

      <section className={styles.section} aria-label="Source files">
        <h3>Source files</h3>
        <div className={styles.fileGrid}>
          {sourceFileLabels.map(([key, label]) => {
            const value = doc.sourceFiles[key]
            return value ? (
              <div key={key} className={styles.fileRow}>
                <span>{label}</span>
                <code>{value}</code>
              </div>
            ) : null
          })}
        </div>
      </section>

      <section className={styles.section} aria-label="Setup instructions">
        <h3>Setup</h3>
        <ol className={styles.setupList}>
          {doc.setup.map((step, index) => (
            <li key={step.label}>
              <strong>{index + 1}</strong>
              <div>
                <span>{step.label}</span>
                <p>{step.detail}</p>
                {step.command ? <code>{step.command}</code> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.guidanceGrid}>
        <GuidanceList title="Usage guidance" items={doc.usageGuidance} />
        <GuidanceList title="Accessibility notes" items={doc.accessibility} />
        <GuidanceList title="Responsive behaviour" items={doc.responsive} />
        <GuidanceList title="Required tokens" items={doc.tokens} code />
        <GuidanceList title="Dependencies" items={doc.dependencies} code />
        <GuidanceList title="AI agent notes" items={doc.agentNotes} />
      </div>

      {doc.samples.map((sample) => (
        <section key={sample.title} className={styles.section} aria-label={sample.title}>
          <h3>{sample.title}</h3>
          <CodeBlock
            code={sample.code}
            language={sample.language}
            fileName={sample.fileName}
            showLineNumbers={false}
          />
        </section>
      ))}
    </article>
  )
}

function GuidanceList({ title, items, code = false }: { title: string; items: ReadonlyArray<string>; code?: boolean }) {
  return (
    <section className={styles.guidancePanel} aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{code ? <code>{item}</code> : item}</li>
        ))}
      </ul>
    </section>
  )
}

export default PrimitiveImplementationCard
