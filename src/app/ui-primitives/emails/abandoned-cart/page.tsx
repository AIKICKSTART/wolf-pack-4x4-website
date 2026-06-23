import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailAbandonedCart,
  EmailPreviewFrame,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Abandoned cart email | Email Templates",
  description:
    "Template 11 — Mufflermen abandoned cart reminder with product image placeholder, savings chip, and return-to-cart CTA.",
}

export default function AbandonedCartEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 11 / Abandoned cart"
        title="Abandoned cart"
        description="Sent ~24h after items are left in the cart — product image placeholder, still-interested copy, a clear savings chip, and a return-to-cart CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Abandoned cart" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <shop@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Still want that 2.5\" muffler, Jordan?",
        }}
        email={
          <EmailAbandonedCart
            recipientFirstName="Jordan"
            productName={'Centre Bullet Muffler · 2.5"'}
            productSubtitle="Mild steel · 12-month workshop warranty"
            productImagePlaceholder="MUFF"
            originalPriceCents={18900}
            savingsCents={2900}
            returnToCartUrl="https://mufflermen.com.au/cart"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
