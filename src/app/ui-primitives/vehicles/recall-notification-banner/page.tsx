import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecallNotificationBanner } from "../../components/vehicles/recall-notification-banner"

import { SAMPLE_RECALL } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Recall notification banner | Vehicles | UI Primitives",
  description:
    "Recall notification banner — NHTSA-style alert with severity, affected systems, action required copy, and book-now CTA. Uses role=alert with aria-live.",
}

export default function RecallNotificationBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 13"
        title="Recall notification banner"
        description="Three severities — Toyota mandatory fuel-pump recall, Ford advised seatbelt pretensioner notice, and a Nissan watch-only software issue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Recall notification banner" },
        ]}
      />
      <section className={styles.sceneShell}>
        <RecallNotificationBanner
          recallId={SAMPLE_RECALL.recallId}
          manufacturer={SAMPLE_RECALL.manufacturer}
          headline={SAMPLE_RECALL.headline}
          affectedSystems={SAMPLE_RECALL.affectedSystems}
          actionRequired={SAMPLE_RECALL.actionRequired}
          severity={SAMPLE_RECALL.severity}
          issuedISO={SAMPLE_RECALL.issuedISO}
          primaryAction={{ label: "Book recall", href: "#book" }}
          secondaryAction={{ label: "View bulletin", href: "#bulletin" }}
        />
        <RecallNotificationBanner
          recallId="NHTSA 24V-118"
          manufacturer="Ford"
          headline="Ranger PX3 front seatbelt pretensioner — incorrect crimp"
          affectedSystems={["Driver pretensioner", "Passenger pretensioner"]}
          actionRequired="Visit any Ford dealer for free inspection and replacement of both front seatbelt pretensioners. Allow 90 minutes."
          severity="advised"
          issuedISO="2026-03-02"
          primaryAction={{ label: "Book inspection", href: "#book" }}
          secondaryAction={{ label: "VIN check", href: "#vin" }}
        />
        <RecallNotificationBanner
          recallId="NHTSA 25V-022"
          manufacturer="Nissan"
          headline="Patrol Y62 infotainment audio cut-out under updated firmware"
          affectedSystems={["IVI head unit"]}
          actionRequired="Apply over-the-air update v8.2.41. No workshop visit required. Vehicle remains safe to drive."
          severity="watch"
          issuedISO="2026-04-30"
          primaryAction={{ label: "Apply update", href: "#update" }}
        />
      </section>
    </main>
  )
}
