import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { ExportDemo } from "./export-demo"

export const metadata: Metadata = {
  title: "Theme export | UI Primitives — Theming",
}

export default function ExportPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 05"
          title="Theme export"
          description="The current cascade rendered as CSS custom properties, JSON, and a Tailwind `theme.extend` stub. Copy-to-clipboard per format with a polite aria-live confirmation."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Export" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Hand the resulting tokens to downstream apps. The CSS block drops straight onto `:root`. The JSON acts
            as a source of truth. The Tailwind stub seeds a separate consumer.
          </p>
        </div>
        <ExportDemo />
      </div>
    </main>
  )
}
