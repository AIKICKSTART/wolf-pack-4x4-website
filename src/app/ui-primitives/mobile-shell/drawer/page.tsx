import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { DrawerDemo } from "./drawer-demo"

export const metadata: Metadata = {
  title: "Mobile drawer | UI Primitives — Mobile Shell",
}

export default function DrawerPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 05"
        title="Mobile drawer"
        description="Side drawer that slides from the left over a dimmed backdrop. Dismiss via swipe-left, backdrop tap, or Esc. role=dialog with aria-modal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Drawer" },
        ]}
      />
      <section className={styles.canvas} aria-label="Mobile drawer demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Secondary nav for the workshop tablet — settings, archived jobs, help shortcuts. Stays
            out of the way until the burger is pressed.
          </p>
        </div>
        <DrawerDemo />
      </section>
    </main>
  )
}
