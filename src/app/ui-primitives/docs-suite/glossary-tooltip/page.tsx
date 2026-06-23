import type { Metadata } from "next"

import { GlossaryTooltipTrigger } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_GLOSSARY } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export const metadata: Metadata = {
  title: "Glossary tooltip trigger | UI Primitives — Docs Suite",
}

const rebateEntry = {
  term: "Rebate stacking",
  definition:
    "Multiple supplier rebates (Magnaflow ANZ + Pacemaker) applied to a single quote line at quarter close. The settlement clears 14 calendar days after the supplier ledger seals.",
  href: "/ui-primitives/docs-suite/article-browser",
}

export default function GlossaryTooltipPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 10"
        title="Glossary tooltip trigger"
        description="Underlined inline term that reveals its glossary definition on hover, focus, or click. Keeps the reader inside the article instead of forcing a separate glossary page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Glossary tooltip trigger" },
        ]}
      />
      <section className={styles.canvas} aria-label="Glossary tooltip demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Wraps any term in the prose that has a glossary entry. Keyboard-accessible — focus
            the underlined trigger and the popover stays open until blur.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.glossaryProse}>
            <p>
              Every quote line passes through the pricing engine&apos;s{" "}
              <GlossaryTooltipTrigger entry={DOCS_GLOSSARY} /> before save. When margin slips
              below the floor, the quote tool blocks save and emits a director-sign-off
              webhook.
            </p>
            <p>
              At quarter close, the engine reconciles{" "}
              <GlossaryTooltipTrigger entry={rebateEntry} /> against the supplier ledger and
              settles fourteen calendar days later.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
