"use client"

import { useEffect, useState } from "react"

import {
  AchievementUnlockToast,
  ConnectIntegrationStep,
  FeatureHighlightCard,
  FirstActionGrid,
  MilestoneTracker,
  SampleDataBanner,
  SetupChecklist,
  WelcomeModal,
} from "../../components/onboarding"
import styles from "../onboarding.module.css"

function StripeMark() {
  return (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="8" fill="#635bff" />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="800"
        fill="#fff"
      >
        S
      </text>
    </svg>
  )
}

function XeroMark() {
  return (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="8" fill="#13b5ea" />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="800"
        fill="#fff"
      >
        X
      </text>
    </svg>
  )
}

function MailchimpMark() {
  return (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="8" fill="#ffe01b" />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="14"
        fontWeight="800"
        fill="#241c15"
      >
        M
      </text>
    </svg>
  )
}

export function FullSceneStage() {
  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(true)
  const [achievementOpen, setAchievementOpen] = useState<boolean>(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setAchievementOpen(true), 3200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className={styles.sceneShell} aria-label="Full first-run onboarding scene">
      <SampleDataBanner />

      <div className={styles.sceneRow}>
        <MilestoneTracker
          kicker="Activation"
          title="Mufflermen onboarding milestones"
          milestones={[
            { id: "workshop", label: "Workshop", caption: "Configured", status: "complete" },
            { id: "parts", label: "Parts", caption: "Imported", status: "complete" },
            { id: "stripe", label: "Stripe", caption: "Connecting", status: "current" },
            { id: "crew", label: "Crew", caption: "Invite team", status: "upcoming" },
            { id: "first-job", label: "First job", caption: "Book + invoice", status: "upcoming" },
          ]}
        />
      </div>

      <div className={styles.sceneRow}>
        <SetupChecklist
          kicker="Workshop setup"
          title="Get Oak Flats workshop live"
          steps={[
            {
              id: "workshop",
              title: "Configure workshop profile",
              description: "Bay layout, opening hours, NSW ABN 41 102 568 779.",
              status: "done",
              duration: "3 min",
            },
            {
              id: "parts",
              title: "Import parts catalogue",
              description: "Mufflers, midpipes, ADR-compliant cats, hardware.",
              status: "done",
              duration: "5 min",
            },
            {
              id: "stripe",
              title: "Connect Stripe payouts",
              description: "Accept card + Apple Pay at the front desk.",
              status: "in-progress",
              duration: "4 min",
              expanded: true,
              href: "/ui-primitives/onboarding/connect-integration",
              details:
                "We've created your Stripe account. Provide bank details and confirm licence to activate payouts to the Mufflermen trust.",
            },
            {
              id: "team",
              title: "Invite the crew",
              description: "Bay leads, parts receivers, front desk.",
              status: "todo",
              duration: "2 min",
              href: "/ui-primitives/onboarding/empty-team-prompt",
            },
          ]}
        />
      </div>

      <div className={styles.sceneRow}>
        <FirstActionGrid
          kicker="First things to do"
          title="Pick somewhere to start"
          cards={[
            {
              id: "vehicle",
              title: "Add a vehicle",
              description: "Rego, make, model, ADR build date.",
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
              href: "#team",
              accent: "green",
            },
            {
              id: "stripe",
              title: "Connect Stripe",
              description: "Card + Apple Pay payouts to the trust.",
              duration: "4 min",
              glyph: "$",
              href: "#stripe",
              accent: "red",
              badge: "Recommended",
            },
          ]}
        />
      </div>

      <div className={styles.sceneRow}>
        <FeatureHighlightCard
          kicker="New"
          headline="Bay-side ADR validator"
          body="Run an Oak Flats job through the ADR sound-level validator without leaving the bay screen — the rego is auto-checked against the build-date table."
          tryLabel="Try ADR validator"
          href="#adr"
          accent="amber"
          illustration={<span style={{ fontFamily: "var(--primitive-font-display)" }}>ADR</span>}
        />
      </div>

      <div className={styles.sceneRow}>
        <ConnectIntegrationStep
          kicker="Payments"
          title="Connect Stripe to accept payments"
          description="Accept card + Apple Pay at the front desk."
          logo={<StripeMark />}
          status="in-progress"
          href="#stripe"
        />
        <ConnectIntegrationStep
          kicker="Accounting"
          title="Sync invoices with Xero"
          description="Push Oak Flats invoices into your NSW Xero org."
          logo={<XeroMark />}
          status="not-started"
          href="#xero"
        />
        <ConnectIntegrationStep
          kicker="Marketing"
          title="Mailchimp customer follow-ups"
          description="Trigger an automated post-service email."
          logo={<MailchimpMark />}
          status="connected"
          href="#mailchimp"
        />
      </div>

      <WelcomeModal
        open={welcomeOpen}
        kicker="Welcome aboard"
        headline="G'day Daniel — let's open the bay doors"
        body="Oak Flats workshop is provisioned. Pick a starting point below — you can always come back to this from the dashboard."
        ctas={[
          {
            label: "Add your first vehicle",
            description: "Capture a rego and you're rolling.",
            glyph: "▸",
            href: "#vehicle",
          },
          {
            label: "Invite the crew",
            description: "Bay leads, parts receivers, front desk.",
            glyph: "✦",
            href: "#team",
          },
          {
            label: "Take a 90-second tour",
            description: "Walk through the workshop floor surface.",
            glyph: "↝",
            href: "/ui-primitives/onboarding/tour-invitation",
          },
        ]}
        onClose={() => setWelcomeOpen(false)}
      />

      <div
        style={{
          position: "fixed",
          right: "var(--primitive-space-6)",
          bottom: "var(--primitive-space-6)",
          zIndex: 240,
          pointerEvents: achievementOpen ? "auto" : "none",
        }}
      >
        <AchievementUnlockToast
          open={achievementOpen}
          kicker="Achievement unlocked"
          title="Workshop online"
          body="Oak Flats workshop is provisioned and live. Bay leads can now log in and start scheduling."
          points="+50 XP"
          onClose={() => setAchievementOpen(false)}
        />
      </div>
    </section>
  )
}

export default FullSceneStage
