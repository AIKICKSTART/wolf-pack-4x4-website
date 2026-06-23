import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MacroPicker } from "../../components/support"

import { MACRO_LIBRARY } from "../_mock-data"
import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Macro picker | Support",
  description:
    "Primitive 05 — searchable canned-response picker with hover preview and variable placeholder chips.",
}

export default function MacroPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Picker"
        title="Macro picker"
        description="Searchable canned-response library. Left rail lists macros (title + shortcut + category). Right preview shows the resolved body, the variable placeholder chips and an Insert action. The Insert button toggles aria-pressed so screen-reader users know which macro was applied last."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Macro picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 5 macros · search + preview + insert</span>
        <MacroPicker macros={MACRO_LIBRARY} />
      </section>
    </main>
  )
}
