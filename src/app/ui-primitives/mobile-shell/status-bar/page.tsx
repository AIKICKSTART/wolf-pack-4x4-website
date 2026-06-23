import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { StatusBarDemo } from "./status-bar-demo"

export const metadata: Metadata = {
  title: "Mobile status bar | UI Primitives — Mobile Shell",
}

export default function StatusBarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 11"
        title="Mobile status bar"
        description="Simulated status bar with time, signal, carrier and battery rendered as crisp SVG glyphs. Light or dark tone. Always presentational — not a live system info reader."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Status bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Status bar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Marketing previews, design reviews, app screenshots — wraps every other mobile primitive
            in a believable native shell.
          </p>
        </div>
        <StatusBarDemo />
      </section>
    </main>
  )
}
