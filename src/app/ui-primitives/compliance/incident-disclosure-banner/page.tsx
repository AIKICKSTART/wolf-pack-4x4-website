import type { Metadata } from "next"

import { IncidentDisclosureBanner } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Incident disclosure banner | Compliance",
  description:
    "Primitive 14 — top-of-app incident banner with severity, status timeline, mitigation update, and statuspage link.",
}

export default function IncidentDisclosureBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Incident"
        title="Incident disclosure banner"
        description="Top-of-app banner shown during an active security or availability incident. Carries a severity chip with a pulsing dot, the public-friendly description, a status timeline (Detected / Investigating / Mitigating / Resolved), the latest mitigation update with timestamp, and a link to the live statuspage. Uses role='alert' + aria-live='polite' for screen reader announcement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Incident disclosure banner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four severity bands</span>
        <IncidentDisclosureBanner
          severity="sev-1"
          incidentId="MUF-INC-2026-051"
          headline="Booking API degraded — investigating"
          body="A subset of new bookings are failing with a 503 in the Sydney region. Existing bookings, parts ordering, and the workshop staff console remain online. We are investigating an upstream database failover."
          timeline={[
            { id: "detected", label: "Detected · 14:02 AEST", status: "done" },
            { id: "investigating", label: "Investigating", status: "current" },
            { id: "mitigating", label: "Mitigating", status: "pending" },
            { id: "resolved", label: "Resolved", status: "pending" },
          ]}
          mitigationUpdate="We have identified a regional Postgres failover stalling on the booking primary. Traffic has been failed over to ap-southeast-4. Recovery expected within 15 minutes."
          updatedAt="14:18 AEST · 2026-05-27"
          statuspageHref="https://status.mufflermen.com.au"
        />
        <IncidentDisclosureBanner
          severity="sev-3"
          incidentId="MUF-INC-2026-052"
          headline="Statuspage minor — third-party SMS provider delays"
          body="Booking reminder SMS messages are delayed by up to 12 minutes. New bookings and the workshop console are unaffected."
          timeline={[
            { id: "detected", label: "Detected", status: "done" },
            { id: "investigating", label: "Investigating", status: "done" },
            { id: "mitigating", label: "Mitigating", status: "current" },
            { id: "resolved", label: "Resolved", status: "pending" },
          ]}
          mitigationUpdate="Switched primary SMS route to backup provider. Backlog is draining at ~2k msg / min."
          updatedAt="11:42 AEST · 2026-05-27"
          statuspageHref="https://status.mufflermen.com.au"
        />
      </section>
    </main>
  )
}
