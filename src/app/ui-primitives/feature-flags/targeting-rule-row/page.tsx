import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"
import { TargetingRuleScene } from "./targeting-rule-row-client"

export const metadata: Metadata = {
  title: "Targeting rule row | Feature flags",
  description:
    "Primitive 05 — targeting rule row with subject + operator + tag value list.",
}

export default function TargetingRuleRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Targeting"
        title="Targeting rule row"
        description="Single rule row composing a subject chip (user / workspace / role / geo / device), an operator chip (is / is-not / in / starts-with / regex) and a tag-input value list with backspace + Enter handling. Compose many of these inside a rule list to build a flag's targeting condition."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Targeting rule row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · edit subject + operator · add and remove value tags</span>
        <TargetingRuleScene />
      </section>
    </main>
  )
}
