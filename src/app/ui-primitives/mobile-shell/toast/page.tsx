import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { ToastDemo } from "./toast-demo"

export const metadata: Metadata = {
  title: "Mobile toast | UI Primitives — Mobile Shell",
}

export default function ToastPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 08"
        title="Mobile toast"
        description="Top-anchored toast with tone-tinted icon, primary text, supporting description, optional dismiss. aria-live polite for announcements that don't steal focus."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Toast" },
        ]}
      />
      <section className={styles.canvas} aria-label="Toast demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Quick acknowledgements — SMS sent, job closed, sync failed. Different from the desktop
            toast tray; lands from the notch edge with safe-area inset.
          </p>
        </div>
        <ToastDemo />
      </section>
    </main>
  )
}
