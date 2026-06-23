import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { SelectionSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Selection | UI Primitives",
}

export default function SelectionPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Tabs, chips, badges, toggles"
        description="Stateful selection primitives — tabs, chips, badges, toggles, radios, and check states — defined once so they read identically across every workshop and CMS surface."
        dnaSectionId="selection"
      />
      <SelectionSection />
    </main>
  )
}
