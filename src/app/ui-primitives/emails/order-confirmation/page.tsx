import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailOrderConfirmation,
  EmailPreviewFrame,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Order confirmation email | Email Templates",
  description:
    "Template 04 — Mufflermen order confirmation with line items, totals, ETA, and view-order CTA.",
}

export default function OrderConfirmationEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 04 / Order confirmation"
        title="Order confirmation"
        description="Sent immediately after an online parts order — line items, subtotal + GST + shipping, total, ETA, and a CTA back to the order page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Order confirmation" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <orders@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Order #OFM-2026-0418 confirmed",
        }}
        email={
          <EmailOrderConfirmation
            recipientFirstName="Jordan"
            orderNumber="OFM-2026-0418"
            orderDateLabel="28 May 2026 · 10:14am"
            etaLabel="Mon 02 Jun — Wed 04 Jun"
            lineItems={[
              {
                sku: "OFM-CB-2.5IN",
                name: "Centre Bullet Muffler · 2.5\"",
                qty: 1,
                unitPriceCents: 18900,
                lineTotalCents: 18900,
              },
              {
                sku: "OFM-CLP-25",
                name: "Stainless V-band Clamp · 2.5\"",
                qty: 2,
                unitPriceCents: 2200,
                lineTotalCents: 4400,
              },
              {
                sku: "OFM-GSK-MN3",
                name: "Manifold Gasket · 3-bolt",
                qty: 1,
                unitPriceCents: 1450,
                lineTotalCents: 1450,
              },
            ]}
            subtotalCents={24750}
            gstCents={2475}
            shippingCents={1500}
            totalCents={28725}
            viewOrderUrl="https://mufflermen.com.au/orders/OFM-2026-0418"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
