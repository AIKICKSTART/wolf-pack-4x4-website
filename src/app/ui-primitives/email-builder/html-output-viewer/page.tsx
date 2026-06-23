import type { Metadata } from "next"

import { HtmlOutputViewer } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_HTML, SAMPLE_INLINED, SAMPLE_PLAIN } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "HTML output viewer | Email builder",
  description:
    "Primitive 11 — tabbed source output (HTML, inlined CSS, plain text) rendered via the CodeBlock primitive.",
}

export default function HtmlOutputViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / HTML output viewer"
        title="HTML output viewer"
        description="A tabbed inspector for the underlying email output — the raw HTML, the CSS-inlined Outlook-safe version, and the plain-text fallback. Each tab is rendered through the existing CodeBlock primitive so copy and line numbers come along for free."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "HTML output viewer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter newsletter source</span>
        <HtmlOutputViewer
          html={SAMPLE_HTML}
          inlinedCss={SAMPLE_INLINED}
          plainText={SAMPLE_PLAIN}
        />
      </section>
    </main>
  )
}
