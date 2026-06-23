import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { InspectorDemo } from "./inspector-demo"

export const metadata: Metadata = {
  title: "Token inspector | UI Primitives — Theming",
}

export default function InspectorPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 02"
          title="Token inspector"
          description="A live table of every controllable token, its current value, a swatch or type preview, and a copy chip. Reuses the DataTable primitive and announces updates via aria-live for assistive tech."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Inspector" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Diff a custom theme against a preset. Audit which tokens are still controllable. Copy a token value into
            an external tool with a single tap.
          </p>
        </div>
        <InspectorDemo />
      </div>
    </main>
  )
}
