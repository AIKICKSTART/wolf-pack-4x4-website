import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import { SandboxSection } from "../sections"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Sandbox | UI Primitives",
}

export default function SandboxPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="05 / Lab"
        title="Experimental surfaces before graduation"
        description="Unique or still-uncertain interactions live here first so the main primitives board stays stable while new presentation ideas get tested."
      />
      <SandboxSection />
    </main>
  )
}
