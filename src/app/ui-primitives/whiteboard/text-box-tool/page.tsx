import type { Metadata } from "next"

import { TextBoxTool } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Text box tool | UI Primitives - Whiteboard",
}

export default function TextBoxToolPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 12"
        title="Text box tool"
        description="Auto-growing text box with a floating formatting toolbar for font, size, weight, style and colour."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Text box tool" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Toolbar forced open for inspection</span>
          <TextBoxTool
            defaultValue="Launch offer: free fitment check with every performance exhaust quote."
            defaultFamily="display"
            defaultSize="lg"
            defaultBold
            defaultColor="#ffc14f"
            alwaysShowToolbar
          />
        </div>
      </section>
    </main>
  )
}
