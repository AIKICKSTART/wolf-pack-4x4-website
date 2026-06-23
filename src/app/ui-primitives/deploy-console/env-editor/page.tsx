import type { Metadata } from "next"

import { EnvEditor } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { ENV_VARIABLES } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Env editor | Deploy console",
  description:
    "Primitive 01 — env editor with type detection, dirty markers and a scope filter.",
}

export default function EnvEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Editor"
        title="Env editor"
        description="Key/value env grid. Type detection (string / url / secret / json / number / boolean) plus dirty markers (added / edited / removed). Secrets always render masked by default. Scope filter swaps the visible variables. Numerics use tabular-nums."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Env editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State A · production scope · 9 vars · 2 unsaved · secret reveal on demand
        </span>
        <EnvEditor variables={ENV_VARIABLES} initialScope="production" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · all scopes · scope filter idle
        </span>
        <EnvEditor variables={ENV_VARIABLES} initialScope="all" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · development scope · single deleted row
        </span>
        <EnvEditor variables={ENV_VARIABLES} initialScope="development" />
      </section>
    </main>
  )
}
