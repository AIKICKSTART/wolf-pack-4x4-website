import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../states.module.css"
import { ComingSoonDemo } from "./coming-soon-demo"

export const metadata: Metadata = {
  title: "Coming soon | UI Primitives — System States",
}

export default function ComingSoonShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.11 / System states"
        title="Curtain up · coming soon"
        description="Covered car silhouette under the workshop lights. Live countdown grid and a waitlist input that captures the customer email and confirms with an aria-live announcement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Coming soon" },
        ]}
      />
      <section className={styles.canvas}>
        <ComingSoonDemo />
      </section>
    </main>
  )
}
