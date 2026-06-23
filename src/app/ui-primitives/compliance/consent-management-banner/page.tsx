import type { Metadata } from "next"

import { ConsentManagementBanner } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Consent management banner | Compliance",
  description:
    "Primitive 06 — full consent management surface with granular toggles for Essential, Functional, Analytics, Marketing, and Sale of data.",
}

export default function ConsentManagementBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Consent"
        title="Consent management banner"
        description="Full consent management surface — five granular categories with role=switch toggles, plus accept-all / reject-non-essential / save-preferences actions and a preference center link. Essential cookies are locked. Distinct from the lighter marketing cookie banner — this is the deeper preference panel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Consent management banner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · five categories · stateful</span>
        <ConsentManagementBanner
          title="Manage your data preferences"
          body="We use cookies and similar technologies for the categories below. Essential cookies are always on — they keep the booking flow working. Everything else respects your choice."
          preferenceCenterHref="#preference-center"
          categories={[
            {
              key: "essential",
              label: "Essential",
              description: "Auth session, CSRF tokens, booking cart state. Required for the workshop site to work.",
              locked: true,
              defaultGranted: true,
            },
            {
              key: "functional",
              label: "Functional",
              description: "Remember saved vehicles, preferred bay location, dark/light theme.",
              defaultGranted: true,
            },
            {
              key: "analytics",
              label: "Analytics",
              description: "Aggregate usage data we use to improve quoting + parts discovery. No raw IPs retained.",
              defaultGranted: false,
            },
            {
              key: "marketing",
              label: "Marketing",
              description: "Targeted ads for fitment promotions on Meta + Google. Off by default in AU.",
              defaultGranted: false,
            },
            {
              key: "sale-of-data",
              label: "Sale of personal data",
              description: "We do not sell or rent personal data. This category exists for CCPA / CPRA compliance only.",
              defaultGranted: false,
            },
          ]}
        />
      </section>
    </main>
  )
}
