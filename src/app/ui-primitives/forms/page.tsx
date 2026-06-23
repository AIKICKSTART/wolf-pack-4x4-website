import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { FormsSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Forms System | UI Primitives",
}

export default function FormsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Forms system atlas"
        description="Canonical board-first form patterns for contact, booking, quotes, search, uploads, auth, billing, compliance, supplier operations, roster workflows, support, and checkout. Interactive demos only; no production submissions are wired."
        dnaSectionId="forms"
      />
      <FormsSection />
    </main>
  )
}
