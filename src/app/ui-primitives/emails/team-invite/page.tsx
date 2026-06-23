import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EmailPreviewFrame, EmailTeamInvite } from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Team invite email | Email Templates",
  description:
    "Template 09 — Mufflermen team invite with sender avatar, workspace name, accept CTA, and decline link.",
}

export default function TeamInviteEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 09 / Team invite"
        title="Team invite"
        description="Sent when someone adds you to a workspace — sender avatar, role pill, accept CTA, decline link, and a clear expiry note."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Team invite" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Mufflermen Teams <teams@mufflermen.com.au>",
          to: "mitch.collins@example.com.au",
          subject: "Tracey invited you to Bay 3 Crew",
        }}
        email={
          <EmailTeamInvite
            recipientFirstName="Mitch"
            senderName="Tracey Doyle"
            senderInitials="TD"
            senderRole="Workshop manager · Oak Flats"
            workspaceName="Bay 3 Crew"
            inviteRole="Technician"
            acceptUrl="https://mufflermen.com.au/teams/accept?token=demo"
            declineUrl="https://mufflermen.com.au/teams/decline?token=demo"
            expiresInDays={7}
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
