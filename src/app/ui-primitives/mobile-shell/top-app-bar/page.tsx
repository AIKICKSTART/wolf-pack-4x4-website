import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { TopAppBarDemo } from "./top-app-bar-demo"

export const metadata: Metadata = {
  title: "Top app bar | UI Primitives — Mobile Shell",
}

export default function TopAppBarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 02"
        title="Top app bar"
        description="Sticky bar that anchors mobile context. Title, subtitle, back chevron, trailing actions, solid or transparent variant."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Top app bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Top app bar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The Bay 2 tablet shows the active job ID and rego in the top bar. Trailing slot carries
            notifications and the per-job action menu.
          </p>
        </div>
        <TopAppBarDemo />
      </section>
    </main>
  )
}
