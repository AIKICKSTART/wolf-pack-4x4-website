import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { MobileCondensedDemo } from "./mobile-condensed-demo"

export const metadata: Metadata = {
  title: "Header · Mobile condensed | UI Primitives — Chrome",
}

export default function HeaderMobileCondensedRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Header 04 / Chrome"
        title="Mobile condensed"
        description="Mobile-first header — center logo, hamburger left, cart right — shrinks on scroll. Includes a cart badge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Mobile condensed" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live header preview
          <span>Mobile · shrink</span>
        </span>
        <div className={styles.demoFrameBody}>
          <MobileCondensedDemo />
        </div>
      </div>
    </main>
  )
}
