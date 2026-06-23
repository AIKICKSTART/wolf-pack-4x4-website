import type { Metadata } from "next"

import { LogicRuleBuilder } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { LOGIC_AVAILABLE_FIELDS, LOGIC_RULES } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Logic rule builder | Form builder",
  description:
    "Primitive 05 — show / hide rule builder using chip selectors for fields, operators, values, actions, and targets.",
}

export default function LogicRuleBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Logic rule builder"
        title="Logic rule builder"
        description="Compose conditional rules with chip selectors — When [field] [operator] [value], then [show / hide / skip / require] [target field]. Field and value chips are tone-coded, action chips track the verb. Visual reference only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Logic rule builder" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote form logic</span>
        <LogicRuleBuilder rules={LOGIC_RULES} availableFields={LOGIC_AVAILABLE_FIELDS} />
      </section>
    </main>
  )
}
