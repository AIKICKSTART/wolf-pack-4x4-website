import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { HelpCenterLanding } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Help center landing | UI Primitives — Help & Docs",
}

const categoryIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" />
    <path d="M9 9h6M9 13h6M9 17h3" strokeLinecap="round" />
  </svg>
)

const categories = [
  {
    icon: categoryIcon,
    title: "Quoting workflow",
    description: "From inbound enquiry to a signed quote in under 60 minutes.",
    articleCount: 18,
    href: "/ui-primitives/help-docs/article",
  },
  {
    icon: categoryIcon,
    title: "Workshop floor",
    description: "Bay assignments, daily handover, tool inventory, safety.",
    articleCount: 24,
    href: "/ui-primitives/help-docs/article",
  },
  {
    icon: categoryIcon,
    title: "Parts catalogue",
    description: "Browsing, sourcing, and matching parts to vehicles.",
    articleCount: 31,
    href: "/ui-primitives/help-docs/article",
  },
  {
    icon: categoryIcon,
    title: "Customer comms",
    description: "SMS templates, escalation paths, and reviews follow-up.",
    articleCount: 9,
    href: "/ui-primitives/help-docs/article",
  },
  {
    icon: categoryIcon,
    title: "Billing",
    description: "Stripe, BPAY, settlement timing, refunds.",
    articleCount: 12,
    href: "/ui-primitives/help-docs/article",
  },
  {
    icon: categoryIcon,
    title: "Account",
    description: "Adding crew, permissions, MFA, audit log.",
    articleCount: 7,
    href: "/ui-primitives/help-docs/article",
  },
]

const popular = [
  {
    title: "How to add a custom-bent pipe line item to a quote",
    href: "/ui-primitives/help-docs/article",
    readTime: "4 min",
  },
  {
    title: "Handing a job from one bay to another mid-shift",
    href: "/ui-primitives/help-docs/article",
    readTime: "3 min",
  },
  {
    title: "Resolving a Stripe dispute on a deposit invoice",
    href: "/ui-primitives/help-docs/article",
    readTime: "6 min",
  },
  {
    title: "Searching the Magnaflow catalogue by ID",
    href: "/ui-primitives/help-docs/article",
    readTime: "2 min",
  },
  {
    title: "End-of-day stock count quick guide",
    href: "/ui-primitives/help-docs/article",
    readTime: "5 min",
  },
]

export default function HelpCenterPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 04"
        title="Help center landing"
        description="Help-center hero surface with search, categorised topic cards, popular articles list, and contact-support card for floor staff."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Help center landing" },
        ]}
      />
      <section className={styles.canvas} aria-label="Help center landing demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            The entry point at /help. Anyone who lands here should find what they need within
            two clicks or know how to reach a human.
          </p>
        </div>
        <HelpCenterLanding
          categories={categories}
          popular={popular}
          contactHref="/ui-primitives/help-docs/article"
        />
      </section>
    </main>
  )
}
