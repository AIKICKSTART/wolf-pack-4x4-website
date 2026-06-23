import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { WorkshopSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Workshop UX | UI Primitives",
}

export default function WorkshopPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="08 / Workshop UX"
        title="Quote, parts, fitment, and job flow primitives"
        description="Domain-specific primitives for Oak Flats Mufflermen so quoting, parts search, fitment notes, and job readiness all share a coherent operational language."
      />
      <WorkshopSection />
    </main>
  )
}
