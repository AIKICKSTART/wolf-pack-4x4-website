import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../chrome.module.css"

import { ShowcaseShellDemo } from "./showcase-shell-demo"

export const metadata: Metadata = {
  title: "Showcase shell | UI Primitives — Chrome",
  description:
    "Toggleable showroom that composes any header + footer + dock + sidebar variant around mock workshop content.",
}

export default function ShowcaseShellRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Composition / Chrome"
        title="Showcase shell"
        description="Pick any header, footer, dock, and sidebar variant. The shell re-composes around mock workshop content so you can see them work together."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Showcase shell" },
        ]}
      />
      <ShowcaseShellDemo />
    </main>
  )
}
