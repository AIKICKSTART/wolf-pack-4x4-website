import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { FoundationsSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Foundations | UI Primitives",
}

export default function FoundationsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Foundations of every primitive"
        description="The first Shared DNA route: source tokens, material recipes, typography roles, icon treatment, motion, focus, and responsive shell rules that every downstream primitive must consume."
        dnaSectionId="foundations"
      />
      <FoundationsSection />
    </main>
  )
}
