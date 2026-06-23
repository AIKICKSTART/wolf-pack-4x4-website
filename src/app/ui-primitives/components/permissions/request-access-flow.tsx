"use client"

import { useCallback, useState } from "react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import type { RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./request-access-flow.module.css"

export interface RequestAccessRoleOption {
  readonly id: string
  readonly label: string
  readonly tone: RoleTone
  readonly description: string
}

export interface RequestAccessReviewer {
  readonly name: string
  readonly role: string
  readonly avatarTone?: AvatarTone
}

interface RequestAccessFlowProps {
  /** Available roles the requester can ask for. */
  roleOptions: ReadonlyArray<RequestAccessRoleOption>
  reviewer: RequestAccessReviewer
  estimatedSla?: string
  /** Pre-fill role id (optional). */
  defaultRoleId?: string
  onSubmit?: (payload: { reason: string; roleId: string }) => void
  className?: string
  /** Render as modal — adds dialog semantics. */
  asModal?: boolean
}

type Step = 0 | 1 | 2

const STEPS: ReadonlyArray<{ id: Step; label: string }> = [
  { id: 0, label: "Explain why" },
  { id: 1, label: "Choose role" },
  { id: 2, label: "Submit" },
]

export function RequestAccessFlow({
  roleOptions,
  reviewer,
  estimatedSla = "Reviewed within 1 business hour",
  defaultRoleId,
  onSubmit,
  className,
  asModal = false,
}: RequestAccessFlowProps) {
  const [step, setStep] = useState<Step>(0)
  const [reason, setReason] = useState<string>("")
  const [roleId, setRoleId] = useState<string>(defaultRoleId ?? roleOptions[0]?.id ?? "")
  const [submitted, setSubmitted] = useState<boolean>(false)

  const canAdvance = step === 0 ? reason.trim().length >= 12 : roleId.length > 0

  const advance = useCallback(() => {
    if (!canAdvance) return
    if (step < 2) {
      setStep((current) => (current + 1) as Step)
    }
  }, [step, canAdvance])

  const back = useCallback(() => {
    if (step > 0) {
      setStep((current) => (current - 1) as Step)
    }
  }, [step])

  const submit = useCallback(() => {
    onSubmit?.({ reason, roleId })
    setSubmitted(true)
  }, [reason, roleId, onSubmit])

  const classes = [styles.flow, className].filter(Boolean).join(" ")
  const wrapperProps = asModal
    ? { role: "dialog" as const, "aria-modal": true as const, "aria-labelledby": "request-access-title" }
    : { "aria-labelledby": "request-access-title" }

  const selectedRole = roleOptions.find((option) => option.id === roleId)

  return (
    <section className={classes} {...wrapperProps}>
      <header className={styles.head}>
        <span className={styles.kicker}>Request access</span>
        <h2 id="request-access-title" className={styles.title}>
          Ask the workshop manager
        </h2>
      </header>

      <ol className={styles.stepper}>
        {STEPS.map((entry) => {
          const status = entry.id === step ? "current" : entry.id < step ? "done" : "next"
          return (
            <li key={entry.id} className={styles.stepItem} data-status={status}>
              <span className={styles.stepIndex}>{String(entry.id + 1).padStart(2, "0")}</span>
              <span className={styles.stepLabel}>{entry.label}</span>
            </li>
          )
        })}
      </ol>

      {submitted ? (
        <div className={styles.successPanel}>
          <span className={styles.successGlyph} aria-hidden="true">
            ✓
          </span>
          <h3 className={styles.successTitle}>Request sent</h3>
          <p className={styles.successBody}>
            {reviewer.name} will review your request to become <strong>{selectedRole?.label ?? "an elevated role"}</strong>.
            We will ping you in-app when they respond.
          </p>
        </div>
      ) : step === 0 ? (
        <div className={styles.panel}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Why do you need access?</span>
            <textarea
              className={styles.textarea}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Need to approve the Oak Flats fleet quote tonight — Marcus is offshore."
              rows={4}
              aria-describedby="request-access-reason-help"
            />
            <span id="request-access-reason-help" className={styles.fieldHint}>
              At least 12 characters · {reason.trim().length} so far
            </span>
          </label>
        </div>
      ) : step === 1 ? (
        <div className={styles.panel}>
          <span className={styles.fieldLabel}>Choose the role to request</span>
          <ul className={styles.roleList}>
            {roleOptions.map((option) => {
              const checked = option.id === roleId
              return (
                <li key={option.id}>
                  <label className={styles.roleRow} data-checked={checked}>
                    <input
                      type="radio"
                      name="request-access-role"
                      value={option.id}
                      checked={checked}
                      onChange={() => setRoleId(option.id)}
                    />
                    <RoleBadge label={option.label} tone={option.tone} size="md" />
                    <span className={styles.roleDescription}>{option.description}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className={styles.panel}>
          <h3 className={styles.reviewTitle}>Review and submit</h3>
          <dl className={styles.reviewList}>
            <div className={styles.reviewRow}>
              <dt>Reason</dt>
              <dd>{reason}</dd>
            </div>
            <div className={styles.reviewRow}>
              <dt>Requested role</dt>
              <dd>
                {selectedRole ? (
                  <RoleBadge label={selectedRole.label} tone={selectedRole.tone} size="sm" />
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className={styles.reviewRow}>
              <dt>Reviewer</dt>
              <dd className={styles.reviewer}>
                <Avatar name={reviewer.name} tone={reviewer.avatarTone ?? "obsidian"} size="sm" />
                <span>
                  <strong>{reviewer.name}</strong>
                  <small>{reviewer.role}</small>
                </span>
              </dd>
            </div>
            <div className={styles.reviewRow}>
              <dt>Estimated SLA</dt>
              <dd>
                <span className={styles.slaChip}>{estimatedSla}</span>
              </dd>
            </div>
          </dl>
        </div>
      )}

      {!submitted && (
        <footer className={styles.actions}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={back}
            disabled={step === 0}
          >
            Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={advance}
              disabled={!canAdvance}
            >
              Continue
            </button>
          ) : (
            <button type="button" className={styles.btnPrimary} onClick={submit}>
              Submit request
            </button>
          )}
        </footer>
      )}
    </section>
  )
}

export default RequestAccessFlow
