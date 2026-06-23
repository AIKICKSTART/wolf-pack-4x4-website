import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DocSidebar } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Doc sidebar | UI Primitives — Help & Docs",
}

const sections = [
  {
    id: "getting-started",
    label: "Getting started",
    links: [
      { label: "Workshop overview", href: "/ui-primitives/help-docs/article" },
      { label: "Day-one onboarding", href: "/ui-primitives/help-docs/article" },
      { label: "Account setup", href: "/ui-primitives/help-docs/article" },
    ],
  },
  {
    id: "quoting",
    label: "Quoting workflow",
    links: [
      { label: "Inbound enquiry", href: "/ui-primitives/help-docs/article" },
      { label: "Building the quote", href: "/ui-primitives/help-docs/article" },
      { label: "Custom catback flow", href: "/ui-primitives/help-docs/article#active" },
      { label: "Sign-off", href: "/ui-primitives/help-docs/article" },
    ],
  },
  {
    id: "workshop",
    label: "Workshop floor",
    links: [
      { label: "Bay assignments", href: "/ui-primitives/help-docs/article" },
      { label: "Tooling and consumables", href: "/ui-primitives/help-docs/article" },
      { label: "Sign-off checklist", href: "/ui-primitives/help-docs/article" },
    ],
  },
  {
    id: "billing",
    label: "Billing & disputes",
    defaultOpen: false,
    links: [
      { label: "Stripe deposits", href: "/ui-primitives/help-docs/article" },
      { label: "BPAY settlements", href: "/ui-primitives/help-docs/article" },
      { label: "Refunds", href: "/ui-primitives/help-docs/article" },
    ],
  },
]

export default function DocSidebarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 09"
        title="Doc sidebar"
        description="Left-side nav for docs: collapsible sections, nested links, and active highlight. Toggle a section header to expand or collapse."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Doc sidebar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Doc sidebar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchors the left edge of every docs page. Sticky on larger viewports, stacks above
            the article on mobile.
          </p>
        </div>
        <div
          className={styles.stage}
          style={{
            display: "grid",
            gridTemplateColumns: "260px minmax(0, 1fr)",
            gap: 24,
            alignItems: "start",
          }}
        >
          <DocSidebar
            sections={sections}
            activeHref="/ui-primitives/help-docs/article#active"
          />
          <div
            style={{
              padding: 20,
              border: "1px dashed var(--primitive-line)",
              borderRadius: 12,
              color: "var(--primitive-muted)",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Article body would render here. The sidebar holds nav focus while the body
            scrolls.
          </div>
        </div>
      </section>
    </main>
  )
}
