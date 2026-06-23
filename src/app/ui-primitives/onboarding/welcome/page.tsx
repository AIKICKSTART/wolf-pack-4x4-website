import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { WelcomeModalDemo } from "./welcome-modal-demo"
import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Welcome modal | Onboarding",
  description:
    "Primitive 01 — friendly post-signup welcome modal with garage-door SVG, three next-step CTAs and a skip-for-now link.",
}

export default function WelcomeModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Welcome"
        title="Welcome modal"
        description="First-login welcome surface — kicker, big headline, hand-drawn garage-door SVG illustration, three next-step CTAs as a vertical stack, and a quiet skip-for-now link at the foot. Backdrop blur + Escape-to-close. Reduced-motion overrides the spring-in animation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Welcome" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — click the trigger to reopen the modal
        </span>
        <WelcomeModalDemo />
      </section>
    </main>
  )
}
