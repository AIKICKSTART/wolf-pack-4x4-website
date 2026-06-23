import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CampaignConsole } from "./_campaign-console"
import styles from "./email-campaign.module.css"

export const metadata: Metadata = {
  title: "Email campaign composer | Torque",
  description:
    "Torque drafts the Oak Flats Muffler Men winter exhaust newsletter — a block-based email body, subject and inbox preview, audience segment, deliverability hints, and an owner approval-before-send gate.",
}

export default function TorqueEmailCampaignPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Marketing surface"
        title="Email campaign composer"
        description="Torque is the Oak Flats Muffler Men business assistant. Here it has drafted the winter exhaust-special newsletter as a block-based email — hero, copy, a book-the-bay CTA and a compliance footer — with the subject and inbox preview laid out exactly as subscribers will see them. Pick the audience segment, review the deliverability hints, fine-tune the wording, and approve the send in one tap. Nothing reaches a single inbox without your sign-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque/social-composer" },
          { label: "Email campaign composer" },
        ]}
      />

      <section className={styles.demoSurface} aria-label="Email campaign composer console">
        <span className={styles.demoLabel}>
          Composition · Torque marketing surface · 1 winter newsletter · 642 recipients
        </span>
        <CampaignConsole />
      </section>
    </main>
  )
}
