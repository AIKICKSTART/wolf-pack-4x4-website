"use client"

import { useState } from "react"
import Link from "next/link"

import { StateSuccessConfirmed } from "../../components/states"
import styles from "../states.module.css"

export function SuccessConfirmedDemo() {
  const [celebrate, setCelebrate] = useState<boolean>(true)

  return (
    <>
      <StateSuccessConfirmed
        celebrate={celebrate}
        headline="Locked in — see you in the workshop"
        message="Quote Q-2841 is paid and the fitment slot is reserved. We have texted Lana so Bay 2 will be on the lift when you roll up. ADR check sheet is queued to print."
        summary={[
          { label: "Reference", value: "Q-2841 · Oak Flats", emphasizeRef: true },
          { label: "Vehicle", value: "Ford BA Falcon XR8 — VIN AAFBP8ABZ65042118" },
          { label: "Booked bay", value: "Bay 2 · Thu 09:30 AEST" },
          { label: "Fitment", value: "3-inch midpipe + Magnaflow muffler + ADR tip" },
          { label: "Total", value: "A$1,184 paid (Stripe · ch_1J42)" },
        ]}
        primaryAction={
          <Link href="/ui-primitives/data-display" className={styles.btnRed}>
            View booking ledger
          </Link>
        }
        secondaryAction={
          <button
            type="button"
            className={styles.btnChrome}
            onClick={() => setCelebrate((current) => !current)}
          >
            {celebrate ? "Re-arm confetti" : "Fire confetti"}
          </button>
        }
      />
      <aside className={styles.note}>
        <span>Demo control</span>
        <p>
          The secondary button toggles the confetti trigger. The burst respects
          prefers-reduced-motion — under that media query the cannon never fires regardless of the
          celebrate flag.
        </p>
      </aside>
    </>
  )
}
