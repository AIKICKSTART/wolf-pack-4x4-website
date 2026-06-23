import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { UmbrellaPreviewDemo } from "./umbrella-preview-demo"

export const metadata: Metadata = {
  title: "Umbrella preview | UI Primitives — Theming",
}

export default function UmbrellaPreviewPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 06"
          title="Umbrella preview"
          description="A representative slice of every primitive category — hero, stat tiles, sparkline, avatars, chips, radial meter, progress bars — composed inside a single ThemeController so the cascade is undeniable."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Umbrella preview" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            QA the cascade. Pick a preset and verify that every primitive — not just the obvious accent ones —
            inherits the new token values.
          </p>
        </div>
        <UmbrellaPreviewDemo />
      </div>
    </main>
  )
}
