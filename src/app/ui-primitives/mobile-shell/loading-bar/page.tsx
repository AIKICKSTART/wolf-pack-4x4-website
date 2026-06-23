import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { LoadingBarDemo } from "./loading-bar-demo"

export const metadata: Metadata = {
  title: "Mobile loading bar | UI Primitives — Mobile Shell",
}

export default function LoadingBarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 09"
        title="Mobile loading bar"
        description="Top hairline progress with indeterminate shimmer or determinate fill. Tone variants for red sync, amber warn-load, teal background fetch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Loading bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Loading bar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Background syncs with the Acme Exhausts supplier feed — never blocks the mechanic, just
            keeps them informed.
          </p>
        </div>
        <LoadingBarDemo />
      </section>
    </main>
  )
}
