import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EmailPasswordReset, EmailPreviewFrame } from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Password reset email | Email Templates",
  description:
    "Template 02 — Mufflermen password reset email with security notes, expiry warning, and ignore-if-not-you copy.",
}

export default function PasswordResetEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 02 / Password reset"
        title="Password reset"
        description="Sent when the user requests a password reset — short-lived link, IP + device summary, and an obvious ignore-if-not-you escape hatch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Password reset" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Mufflermen Security <no-reply@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Reset your Mufflermen password",
        }}
        email={
          <EmailPasswordReset
            recipientFirstName="Jordan"
            resetUrl="https://mufflermen.com.au/reset?token=demo"
            expiresInMinutes={30}
            ipAddress="203.10.45.221"
            deviceLabel="Safari on iPhone · Sydney AU"
            helpDeskUrl="https://mufflermen.com.au/help"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
