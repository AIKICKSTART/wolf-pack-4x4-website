"use client"

import { useState } from "react"
import Link from "next/link"

import { StateComingSoon } from "../../components/states"
import styles from "../states.module.css"

export function ComingSoonDemo() {
  const [confirmation, setConfirmation] = useState<string | null>(null)

  const handleSubmit = (email: string): void => {
    setConfirmation(email)
  }

  return (
    <>
      <StateComingSoon
        launchAt="2026-06-12 — Albion Park Rail"
        headline="Polishing the launch line"
        message="The new Mufflermen booking surface rolls in 12 days from the Albion Park Rail bay. Tap the waitlist and we will text you the moment fitment slots open."
        countdownParts={[
          { label: "Days", value: "12" },
          { label: "Hours", value: "08" },
          { label: "Mins", value: "42" },
          { label: "Secs", value: "16" },
        ]}
        waitlistLabel="Join the workshop waitlist"
        emailPlaceholder="you@oakflats.com.au"
        onWaitlistSubmit={handleSubmit}
        submitLabel="Join"
        secondaryAction={
          <Link href="/ui-primitives" className={styles.btnGhost}>
            Back to dashboard
          </Link>
        }
      />
      {confirmation ? (
        <aside className={styles.note}>
          <span>Waitlist captured</span>
          <p>
            Thanks — we will text <strong>{confirmation}</strong> when the booking surface opens at
            the Albion Park Rail bay.
          </p>
        </aside>
      ) : null}
    </>
  )
}
