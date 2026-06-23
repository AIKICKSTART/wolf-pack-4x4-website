import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { CompactStripDemo } from "./compact-strip-demo"

export const metadata: Metadata = {
  title: "Footer · Compact strip | UI Primitives — Chrome",
}

export default function FooterCompactStripRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Footer 08 / Chrome"
        title="Compact strip"
        description="One-line shell footer with brand chip, four divided links, theme toggle and copyright. Suits internal app surfaces."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Compact strip" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live footer preview
          <span>App · strip</span>
        </span>
        <div className={styles.demoFrameBody}>
          <CompactStripDemo />
        </div>
      </div>
    </main>
  )
}
