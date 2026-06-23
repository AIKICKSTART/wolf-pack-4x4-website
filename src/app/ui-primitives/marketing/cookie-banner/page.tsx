import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CookieBanner } from "../../components/marketing/cookie-banner"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Cookie banner | Marketing Blocks",
  description:
    "Primitive 11 — bottom-aligned cookie consent banner with slide-in animation and reduced-motion override.",
}

export default function CookieBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Cookie banner"
        title="Cookie banner"
        description="Bottom-aligned consent banner with manage/accept actions. Slide-in animation, reduced-motion override, dialog semantics."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Cookie banner" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Cookie banner demo">
        <span className={styles.stageCaption}>
          The banner renders at the bottom of the viewport. Scroll all the way down if you can&rsquo;t see it.
        </span>
      </section>

      <CookieBanner
        kicker="Heads up"
        heading="We use cookies to log workshop bookings"
        body={
          <>
            Mufflermen uses essential cookies to keep your booking session alive and analytics cookies to count
            workshop visits. Choose what you&rsquo;re okay with — no sneaky third-party trackers.
          </>
        }
        acceptLabel="Accept all"
        manageLabel="Manage choices"
      />
    </main>
  )
}
