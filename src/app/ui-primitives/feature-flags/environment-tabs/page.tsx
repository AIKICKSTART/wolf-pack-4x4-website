import type { Metadata } from "next"

import { EnvironmentTabs } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Environment tabs | Feature flags",
  description:
    "Primitive 07 — three-tab environment switcher (Dev / Staging / Prod) with status dots and flag counts.",
}

export default function EnvironmentTabsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Tabs"
        title="Environment tabs"
        description="role=tablist switcher across Development / Staging / Production. Each tab carries a status dot (green on / grey off / amber ramping / red killed), a flag count badge, and a tone-coded active state. Arrow keys move focus between tabs, Enter selects."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Environment tabs" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · click or use arrow keys</span>
        <EnvironmentTabs
          defaultEnv="staging"
          tabs={[
            { env: "dev", status: "on", flagCount: 64 },
            { env: "staging", status: "ramping", flagCount: 41 },
            { env: "prod", status: "on", flagCount: 28 },
          ]}
        />
        <EnvironmentTabs
          defaultEnv="prod"
          tabs={[
            { env: "dev", status: "on", flagCount: 22 },
            { env: "staging", status: "off", flagCount: 9 },
            { env: "prod", status: "killed", flagCount: 4 },
          ]}
        />
      </section>
    </main>
  )
}
