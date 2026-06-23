"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { ShiftSwapModal } from "../../components/roster/shift-swap-modal"
import { TECHNICIANS } from "../roster-mock"
import styles from "../roster.module.css"

export default function ShiftSwapPage() {
  const [open, setOpen] = useState<boolean>(true)
  const [lastTarget, setLastTarget] = useState<string | null>(null)

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.03 / Roster"
        title="Shift swap modal"
        description="Compose a swap request — pick the teammate, give a reason, send. Manager + receiver both get pinged."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Shift swap modal" },
        ]}
      />
      <section className={styles.canvas}>
        <button
          type="button"
          className={styles.swapTrigger}
          onClick={() => setOpen(true)}
        >
          Open swap modal
        </button>
        <ShiftSwapModal
          open={open}
          onOpenChange={setOpen}
          myShift={{
            label: "Tue 4 Jun · 07:00–15:30 · Bay 2",
            duration: "8h 30m",
          }}
          candidates={TECHNICIANS.filter((tech) => tech.id !== "trent-williams")}
          onSubmit={(payload) => {
            setLastTarget(payload.targetId)
            setOpen(false)
          }}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The modal lives on top of the BasicDialog primitive. Reason chips
            toggle as a radio group; the send button is disabled until a
            candidate is selected.
            {lastTarget ? ` Last submitted target: ${lastTarget}.` : ""}
          </p>
        </div>
      </section>
    </main>
  )
}
