import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../theming.module.css"
import { FontPickerDemo } from "./font-picker-demo"

export const metadata: Metadata = {
  title: "Token font picker | UI Primitives — Theming",
}

export default function FontPickerPage() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.subRouteShell}>
        <PageHeader
          kicker="Theming · 04"
          title="Token font picker"
          description="Swap any font-family token from a curated list of already-loaded stacks. The picker never triggers network requests for fonts — it only re-points the token at a stack the route already has."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Theming", href: "/ui-primitives/theming" },
            { label: "Font picker" },
          ]}
        />
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Test display contrast quickly. Switch from `Anton` to `Playfair Display` and see every section heading
            in the preview re-render with no rebuild.
          </p>
        </div>
        <FontPickerDemo />
      </div>
    </main>
  )
}
