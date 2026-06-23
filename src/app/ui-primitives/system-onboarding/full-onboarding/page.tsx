import type { Metadata } from "next"

import {
  AccountSetupForm,
  BrandSetupCard,
  ChecklistProgressTile,
  FirstDeployTile,
  IntegrationWizardRow,
  MentorChatCard,
  MigrationImportCard,
  OnboardingStepRail,
  SuccessStateCard,
  TeamInvitePanel,
  TemplatePickGrid,
  WelcomeHero,
  WorkshopConfigCard,
} from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  ACCOUNT_TIMEZONES,
  ACCOUNT_VALUES_FRESH,
  BRAND_LOGO_UPLOADED,
  BRAND_PALETTE,
  BRAND_TYPOGRAPHIES,
  CHECKLIST_PARTIAL,
  DEPLOY_CHECKLIST_READY,
  INTEGRATION_FULL_LIST,
  MENTOR_SUGGESTIONS,
  MENTOR_TRANSCRIPT_LONG,
  MIGRATION_COUNTS,
  STEP_RAIL_MID,
  SUCCESS_NEXT_STEPS,
  SUCCESS_STATS,
  TEAM_INVITES_FRESH,
  TEMPLATES,
  WELCOME_CTAS,
  WELCOME_OWNER,
  WELCOME_STATS,
  WORKSHOP_SERVICE_CATALOGUE,
  WORKSHOP_VALUES_DRAFT,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Full onboarding flow | System onboarding",
  description:
    "Composed first-run onboarding flow for Illawarra Tyres & Brakes — step rail aside, welcome hero, account + workshop + integrations + team + brand + deploy steps, mentor chat, migration import and a final success card.",
}

export default function FullOnboardingScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full onboarding"
        title="Full onboarding flow"
        description="The whole activation surface in one go — Illawarra Tyres & Brakes signing up for Mufflermen Pro. Step rail aside on the left, the welcome hero leads, then each wizard step composes in sequence. Hermes hovers on the right with suggestions. Closes with the success state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Full onboarding" },
        ]}
      />

      <section className={styles.flow}>
        <div className={styles.flowSplit}>
          <div className={styles.flowCol}>
            <WelcomeHero
              kicker="Welcome to Mufflermen Pro"
              tenantName="Illawarra Tyres & Brakes"
              headline="G'day Sarah — let's spin up Illawarra TB"
              body="A 6-step path to getting Illawarra Tyres & Brakes booking jobs and taking payments. Hermes will keep you on track."
              owner={WELCOME_OWNER}
              stats={WELCOME_STATS}
              ctas={WELCOME_CTAS}
            />

            <TemplatePickGrid
              kicker="Starter · Templates"
              title="Pick a starter template"
              description="We'll pre-seed your Mufflermen workspace with sensible defaults. You can change later, but the migration is destructive."
              templates={TEMPLATES}
              selectedId="tpl-workshop"
            />

            <AccountSetupForm
              kicker="Step 1 of 6 · Account"
              title="Set up your admin account"
              description="Owner accounts can bill, deploy and invite. Promote teammates to owner later if you like."
              values={ACCOUNT_VALUES_FRESH}
              timezones={ACCOUNT_TIMEZONES}
            />

            <WorkshopConfigCard
              kicker="Step 2 of 6 · Workshop"
              title="Tell us about Illawarra Tyres & Brakes"
              description="ABN, address, hours and services. We'll fold this into your quote header and local-SEO pages."
              values={WORKSHOP_VALUES_DRAFT}
              serviceCatalogue={WORKSHOP_SERVICE_CATALOGUE}
            />

            <section className={styles.demoSurface}>
              <span className={styles.demoLabel}>Step 3 of 6 · Integrations — connect your stack</span>
              <div className={styles.demoStack}>
                {INTEGRATION_FULL_LIST.map((row) => (
                  <IntegrationWizardRow key={row.id} row={row} />
                ))}
              </div>
            </section>

            <TeamInvitePanel
              kicker="Step 4 of 6 · Team"
              title="Bring on the crew"
              description="Mechanics get assigned to bays. Front-desk staff get the inbox. Apprentices get supervised access."
              rows={TEAM_INVITES_FRESH}
            />

            <BrandSetupCard
              kicker="Step 5 of 6 · Brand"
              title="Make Mufflermen look like Illawarra TB"
              description="Drop a logo, lock in your accent and pick a typography mood. Refine anytime from brand-control."
              logo={BRAND_LOGO_UPLOADED}
              palettes={BRAND_PALETTE}
              typographies={BRAND_TYPOGRAPHIES}
              selectedTypographyId="t-anton-inter"
            />

            <MigrationImportCard
              kicker="Optional · Migration"
              title="Bring your MYOB history with you"
              description="Customers, vehicles, invoices and parts — pulled in with audit trail intact."
              source="myob"
              counts={MIGRATION_COUNTS}
              status="running"
            />

            <FirstDeployTile
              kicker="Step 6 of 6 · Deploy"
              title="Launch your workshop"
              description="All checks green. Quotes go out branded as your workshop. Hermes answers the phone after-hours."
              checklist={DEPLOY_CHECKLIST_READY}
              targetUrl="https://illawarra-tb.mufflermen.com.au"
              deployHref="#launch"
            />

            <SuccessStateCard
              kicker="Onboarding · Complete"
              headline="Illawarra TB is live."
              body="Quotes go out branded as your workshop, your phone forwards to Hermes after-hours, and your first bay booking is on the schedule for tomorrow at 09:00."
              stats={SUCCESS_STATS}
              nextSteps={SUCCESS_NEXT_STEPS}
              primaryCtaHref="#dashboard"
              secondaryCtaHref="/ui-primitives/system-onboarding/team-invite-panel"
            />
          </div>

          <aside className={styles.flowAside} aria-label="Onboarding navigation">
            <OnboardingStepRail
              kicker="Onboarding · Steps"
              title="Setup roadmap"
              steps={STEP_RAIL_MID}
            />
            <ChecklistProgressTile
              kicker="Onboarding · Progress"
              title="You're 2 of 6 steps in"
              description="Workshop profile is locked in. Hermes is mid-connect on Stripe AU."
              items={CHECKLIST_PARTIAL}
              remainingTime="9 min"
              resumeHref="/ui-primitives/system-onboarding/integration-wizard-row"
            />
            <MentorChatCard
              kicker="Hermes · Mentor"
              title="Hermes is on standby"
              mentorName="Hermes"
              mentorRole="Onboarding mentor"
              messages={MENTOR_TRANSCRIPT_LONG}
              suggestions={MENTOR_SUGGESTIONS}
              typing
            />
          </aside>
        </div>
      </section>
    </main>
  )
}
