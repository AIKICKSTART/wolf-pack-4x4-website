import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../sub-route.module.css"
import { ModelSelectorDemo } from "./model-selector-demo"

export const metadata: Metadata = {
  title: "Model selector | UI Primitives — AI",
}

export default function ModelSelectorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.12 / Conversation"
        title="Model selector"
        description="Listbox popover for picking the assistant model. Each option carries a tier badge (Opus / Sonnet / Haiku / Mini) plus context-window and cost-per-million chips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Model selector" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <ModelSelectorDemo />
        </div>
        <div className={styles.note}>
          <span>Accessibility</span>
          <p>
            The trigger uses aria-haspopup=&quot;listbox&quot; with aria-expanded
            tied to open state. The menu is role=listbox; each option is
            role=option with aria-selected. Escape and outside click both close
            the menu without losing focus.
          </p>
        </div>
      </section>
    </main>
  )
}
