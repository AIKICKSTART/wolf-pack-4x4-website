import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EmailMagicLink, EmailPreviewFrame } from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Magic link email | Email Templates",
  description:
    "Template 03 — Mufflermen passwordless sign-in email with one-click button and 6-digit code fallback.",
}

export default function MagicLinkEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 03 / Magic link"
        title="Magic link"
        description="One-click passwordless sign-in — primary CTA plus a 6-digit code fallback for users who can't open the link on the same device."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Magic link" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <hello@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Your Mufflermen sign-in link",
        }}
        email={
          <EmailMagicLink
            recipientFirstName="Jordan"
            magicLinkUrl="https://mufflermen.com.au/signin?token=demo"
            verificationCode="042-915"
            expiresInMinutes={15}
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
