import type { Metadata } from "next"

import { ConnectIntegrationStep } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Connect integration | Onboarding",
  description:
    "Primitive 09 — a single integration setup step with an abstract SVG logo mark, headline, description, status chip and connect / manage CTA.",
}

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

export default function ConnectIntegrationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Integration"
        title="Connect integration step"
        description="A single integration setup card — abstract SVG mark, eyebrow + headline + description, status chip (not started / in-progress with pulsing dot / connected), and a connect-or-manage CTA. Stripe, Xero, and Mailchimp shown across the three states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Connect integration" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — three states</span>
        <div className={styles.demoStack}>
          <ConnectIntegrationStep
            kicker="Payments"
            title="Connect Stripe to accept payments"
            description="Accept card + Apple Pay at the front desk and pay out to the Mufflermen trust account."
            logo={<StripeMark />}
            status="not-started"
            href="#stripe"
          />
          <ConnectIntegrationStep
            kicker="Accounting"
            title="Sync invoices with Xero"
            description="Push every Oak Flats job invoice straight into your NSW Xero org."
            logo={<XeroMark />}
            status="in-progress"
            href="#xero"
          />
          <ConnectIntegrationStep
            kicker="Marketing"
            title="Mailchimp customer follow-ups"
            description="Trigger an automated post-service email two days after the booking."
            logo={<MailchimpMark />}
            status="connected"
            href="#mailchimp"
          />
        </div>
      </section>
    </main>
  )
}
