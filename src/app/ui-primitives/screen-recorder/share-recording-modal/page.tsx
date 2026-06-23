import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ShareRecordingModal } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Share recording modal | Screen recorder",
  description:
    "Primitive 10 — share modal with copy-URL chip, privacy toggle, email distribution input, embed code block and an expiry-date picker. role=dialog with aria-modal.",
}

export default function ShareRecordingModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Share recording modal"
        title="Share recording modal"
        description="The handoff step — copy a tokenised share URL, set privacy posture (private / team / public-link), invite the workshop crew by email, copy the embed snippet for the customer-facing CMS, and set an auto-expiry."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Share recording modal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop tour — Bay 2 install walkthrough</span>
        <ShareRecordingModal
          recordingTitle="Workshop tour — Bay 2 install walkthrough"
          shareUrl="https://share.mufflermen.com.au/r/bay2-install-walkthrough"
          privacy="team"
          emailRecipients="brodie@mufflermen.com.au, kelsey@mufflermen.com.au"
          expiryDate="2026-07-31"
        />
      </section>
    </main>
  )
}
