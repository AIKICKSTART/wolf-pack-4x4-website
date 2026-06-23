import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CodePlayground } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Code playground | UI Primitives — Help & Docs",
}

const sampleCode = `import { QuoteBuilder } from "@oak/quote"

export function CatbackQuote({ customerId, vehicleId }: Props) {
  return (
    <QuoteBuilder
      customer={customerId}
      vehicle={vehicleId}
      preset="custom-catback"
      onSigned={(quote) => bookJob(quote.id)}
    />
  )
}`

export default function CodePlaygroundPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 12"
        title="Code playground"
        description="Side-by-side editor + result preview, with an Open in StackBlitz CTA. Editor pane uses the existing code-block primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Code playground" },
        ]}
      />
      <section className={styles.canvas} aria-label="Code playground demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Drop into a docs article when a reader benefits from seeing the code and its
            output together. The preview is cosmetic — pass real rendered output via props.
          </p>
        </div>
        <CodePlayground
          title="Embedding the quote builder"
          description="Wire the quote builder into a custom workshop dashboard with a customer and vehicle ID."
          code={sampleCode}
          language="tsx"
          fileName="CatbackQuote.tsx"
          preview={
            <div
              style={{
                display: "grid",
                gap: 10,
                padding: 16,
                border: "1px solid var(--primitive-line)",
                borderRadius: 10,
                background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
              }}
            >
              <span
                style={{
                  color: "var(--primitive-amber)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Quote builder · v2
              </span>
              <strong
                style={{
                  color: "var(--primitive-text-strong)",
                  fontFamily: "var(--primitive-font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                Custom catback · 2017 VFII
              </strong>
              <span style={{ color: "var(--primitive-body)", fontSize: 13 }}>
                MF-14816 universal · 2.5″ inlet · 31% margin
              </span>
            </div>
          }
        />
      </section>
    </main>
  )
}
