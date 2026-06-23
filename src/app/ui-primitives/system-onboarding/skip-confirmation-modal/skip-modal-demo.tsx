"use client"

import { useState } from "react"

import {
  SkipConfirmationModal,
  type SkipConsequence,
} from "../../components/system-onboarding"

interface SkipModalDemoProps {
  buttonLabel: string
  kicker: string
  title: string
  description: string
  consequences: ReadonlyArray<SkipConsequence>
  remindLaterLabel?: string
  confirmLabel?: string
  cancelLabel?: string
}

export function SkipModalDemo({
  buttonLabel,
  kicker,
  title,
  description,
  consequences,
  remindLaterLabel,
  confirmLabel,
  cancelLabel,
}: SkipModalDemoProps) {
  const [open, setOpen] = useState(false)
  const [outcome, setOutcome] = useState<string | null>(null)

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <button
        type="button"
        onClick={() => {
          setOutcome(null)
          setOpen(true)
        }}
        style={{
          padding: "9px 14px",
          border: "1px solid var(--primitive-btn-secondary-border)",
          borderRadius: "var(--primitive-btn-radius)",
          background: "var(--primitive-btn-secondary-bg)",
          color: "var(--primitive-btn-secondary-fg)",
          boxShadow: "var(--primitive-shadow-inset)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          cursor: "pointer",
          width: "max-content",
          fontWeight: "var(--primitive-weight-bold)",
        }}
      >
        {buttonLabel}
      </button>
      {outcome ? (
        <span
          style={{
            fontFamily: "var(--primitive-font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--primitive-muted)",
          }}
        >
          Last outcome — {outcome}
        </span>
      ) : null}
      <SkipConfirmationModal
        open={open}
        kicker={kicker}
        title={title}
        description={description}
        consequences={consequences}
        remindLaterLabel={remindLaterLabel}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={() => {
          setOutcome("skipped")
          setOpen(false)
        }}
        onCancel={() => {
          setOutcome("cancelled")
          setOpen(false)
        }}
        onRemindLater={
          remindLaterLabel
            ? () => {
                setOutcome("remind later")
                setOpen(false)
              }
            : undefined
        }
      />
    </div>
  )
}

export default SkipModalDemo
