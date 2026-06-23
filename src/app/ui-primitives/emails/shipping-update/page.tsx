import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailPreviewFrame,
  EmailShippingUpdate,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Shipping update email | Email Templates",
  description:
    "Template 05 — Mufflermen shipping update with status chip, carrier, tracking, ETA, and 4-step progress.",
}

export default function ShippingUpdateEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 05 / Shipping update"
        title="Shipping update"
        description="Sent when the parts order changes shipping state — status chip, carrier and tracking number, ETA, and the 4-step picked → packed → shipped → delivered timeline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Shipping update" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <orders@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Your parts are on the move · OFM-2026-0418",
        }}
        email={
          <EmailShippingUpdate
            recipientFirstName="Jordan"
            orderNumber="OFM-2026-0418"
            status="Shipped"
            carrierName="Aramex"
            trackingNumber="3OPS00184429"
            trackingUrl="https://www.aramex.com.au/tools/track?l=3OPS00184429"
            etaLabel="Wed 04 Jun"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
