"use client"

import { useMemo, useState } from "react"

import { WizardModal } from "../../components/overlays"
import type { WizardStep } from "../../components/overlays"
import styles from "../overlays.module.css"

type StepId = "vehicle" | "service" | "schedule" | "review"

export function WizardModalDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [done, setDone] = useState<string>("")

  const steps = useMemo<ReadonlyArray<WizardStep<StepId>>>(
    () => [
      {
        id: "vehicle",
        label: "Vehicle",
        description: "Capture the make, model, and rego so we can pre-populate the workshop ticket.",
        content: (
          <DemoFields
            fields={[
              { label: "Make · Model", value: "Holden Commodore VFII SS" },
              { label: "Rego", value: "CHV-184" },
              { label: "Odometer", value: "142,860 km" },
            ]}
          />
        ),
      },
      {
        id: "service",
        label: "Service",
        description: "Pick the service category. The workshop bay is assigned automatically based on capacity.",
        content: (
          <DemoFields
            fields={[
              { label: "Service", value: "Cat-back replacement · twin tips" },
              { label: "Estimated time", value: "4–5 hours" },
              { label: "Assigned bay", value: "Bay 04" },
            ]}
          />
        ),
      },
      {
        id: "schedule",
        label: "Schedule",
        description: "Pick a drop-off window. We will text the customer the night before.",
        skippable: true,
        content: (
          <DemoFields
            fields={[
              { label: "Drop-off", value: "Thursday 06 Jun · 08:00" },
              { label: "Pickup", value: "Thursday 06 Jun · 16:00" },
              { label: "Courtesy car", value: "Hyundai i30 — silver" },
            ]}
          />
        ),
      },
      {
        id: "review",
        label: "Review",
        description: "Confirm everything and lock the ticket. The customer SMS is sent on finish.",
        content: (
          <DemoFields
            fields={[
              { label: "Quote total (AUD)", value: "A$2,180.50" },
              { label: "Deposit", value: "A$320.00 · card on file" },
              { label: "Ticket number", value: "OFM-2415" },
            ]}
          />
        ),
      },
    ],
    [],
  )

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Start ticket wizard
        </button>
        {done && <span className={styles.statusPill}>{done}</span>}
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <WizardModal
        open={open}
        onOpenChange={setOpen}
        title="New job ticket"
        steps={steps}
        onFinish={(lastId) => {
          setOpen(false)
          setDone(`Finished on step "${lastId}"`)
        }}
      />
    </div>
  )
}

function DemoFields({
  fields,
}: {
  fields: ReadonlyArray<{ label: string; value: string }>
}) {
  return (
    <ul style={{ display: "grid", gap: "var(--primitive-space-2-5)", margin: 0, padding: 0, listStyle: "none" }}>
      {fields.map((field) => (
        <li
          key={field.label}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 160px) 1fr",
            gap: "var(--primitive-space-3)",
            padding: "var(--primitive-space-3) 14px",
            border: "1px solid var(--primitive-line)",
            borderRadius: 10,
            background: "var(--primitive-glass-soft)",
          }}
        >
          <span
            style={{
              color: "var(--primitive-muted)",
              fontFamily: "var(--primitive-font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {field.label}
          </span>
          <strong
            style={{
              color: "var(--primitive-text-strong)",
              fontSize: 14,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {field.value}
          </strong>
        </li>
      ))}
    </ul>
  )
}
