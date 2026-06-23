import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { BottomNavDemo } from "./bottom-nav-demo"

export const metadata: Metadata = {
  title: "Bottom nav bar | UI Primitives — Mobile Shell",
}

export default function BottomNavPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 03"
        title="Bottom nav bar"
        description="Persistent 4–5 tab nav. A shared layout pill or underline slides between active tabs. Badge counter on Jobs, aria-current on the active tab."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Bottom nav bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Bottom nav demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Workshop tablet root nav — Home, Jobs (with unread badge), Scan, Parts, and the account
            menu.
          </p>
        </div>
        <BottomNavDemo />
      </section>
    </main>
  )
}
