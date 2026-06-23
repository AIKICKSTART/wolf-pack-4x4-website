import type { Metadata } from "next"

import {
  GetStartedPageTemplate,
  ProfileCompletionMeter,
} from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Get-started template | Onboarding",
  description:
    "Primitive 14 — compositional template that wraps welcome headline + milestone tracker + setup checklist + first-action grid into a single Getting Started surface, with optional aside slot.",
}

export default function GetStartedTemplateScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Get-started template"
        title="Get-started page template"
        description="A compositional template — not a route page — that lays out a complete Getting Started landing surface. Combines a welcome headline, milestone tracker, setup checklist with sticky aside, and the first-action grid. Designed to be dropped into an app's /getting-started route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Get-started template" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live composition — embedded surface</span>
        <GetStartedPageTemplate
          kicker="Get started"
          headline="Open the bay doors at Oak Flats"
          intro="Three quick milestones to get the workshop live and taking jobs. You can come back to this dashboard from the sidebar any time."
          milestones={[
            {
              id: "workshop",
              label: "Workshop",
              caption: "Configured",
              status: "complete",
            },
            {
              id: "parts",
              label: "Parts",
              caption: "Imported",
              status: "complete",
            },
            {
              id: "stripe",
              label: "Stripe",
              caption: "Connecting",
              status: "current",
            },
            {
              id: "crew",
              label: "Crew",
              caption: "Invite team",
              status: "upcoming",
            },
            {
              id: "first-job",
              label: "First job",
              caption: "Book + invoice",
              status: "upcoming",
            },
          ]}
          checklist={[
            {
              id: "stripe",
              title: "Connect Stripe payouts",
              description: "Card + Apple Pay at the front desk.",
              status: "in-progress",
              duration: "4 min",
              href: "/ui-primitives/onboarding/connect-integration",
              expanded: true,
              details:
                "We've started provisioning your Stripe account. Confirm bank details and licence so payouts can land in the Mufflermen trust.",
            },
            {
              id: "team",
              title: "Invite the crew",
              description: "Bay leads, parts receivers, front desk.",
              status: "todo",
              duration: "2 min",
              href: "/ui-primitives/onboarding/empty-team-prompt",
            },
            {
              id: "first-job",
              title: "Book your first job",
              description: "Rego, vehicle, ADR notes, scheduled bay.",
              status: "todo",
              duration: "6 min",
              href: "/ui-primitives/onboarding/first-actions",
            },
          ]}
          firstActions={[
            {
              id: "vehicle",
              title: "Add a vehicle",
              description: "Capture rego, make, model, ADR build date.",
              duration: "1 min",
              glyph: "▤",
              href: "#vehicle",
              accent: "amber",
            },
            {
              id: "job",
              title: "Schedule a job",
              description: "Pick a bay, slot a customer in, set the SLA.",
              duration: "2 min",
              glyph: "◷",
              href: "#job",
              accent: "teal",
            },
            {
              id: "team",
              title: "Invite a team member",
              description: "Bay lead, parts receiver, front desk.",
              duration: "2 min",
              glyph: "✦",
              href: "/ui-primitives/onboarding/empty-team-prompt",
              accent: "green",
            },
            {
              id: "stripe",
              title: "Connect Stripe",
              description: "Card + Apple Pay payouts to the trust.",
              duration: "4 min",
              glyph: "$",
              href: "/ui-primitives/onboarding/connect-integration",
              accent: "red",
              badge: "Recommended",
            },
          ]}
          aside={
            <ProfileCompletionMeter
              kicker="Profile"
              title="Workshop profile"
              fields={[
                { id: "name", label: "Workshop name", filled: true },
                { id: "abn", label: "ABN", filled: true },
                { id: "address", label: "Postal address", filled: true },
                { id: "hours", label: "Opening hours", filled: true },
                { id: "logo", label: "Logo", filled: false },
                { id: "adr", label: "ADR settings", filled: false },
              ]}
              completeHref="#complete"
            />
          }
        />
      </section>
    </main>
  )
}
