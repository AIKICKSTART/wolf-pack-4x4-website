import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EmailPreviewFrame, EmailWelcome } from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Welcome email | Email Templates",
  description:
    "Template 01 — Mufflermen account creation welcome email with hero, primary CTA, helpful links, and footer.",
}

export default function WelcomeEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 01 / Welcome"
        title="Welcome email"
        description="Sent right after an account is created — sets the tone, points to the dashboard, and offers a couple of next-step links."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Welcome" },
        ]}
        dnaSectionId="theming"
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <hello@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Welcome to Oak Flats Mufflermen",
        }}
        email={
          <EmailWelcome
            recipientFirstName="Jordan"
            ctaUrl="https://mufflermen.com.au/dashboard"
            helpDeskUrl="https://mufflermen.com.au/help"
            bookFirstServiceUrl="https://mufflermen.com.au/book"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
