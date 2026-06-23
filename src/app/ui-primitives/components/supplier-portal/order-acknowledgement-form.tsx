"use client"

import { Truck } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import { Chip } from "../primitives/chip"

import styles from "./order-acknowledgement-form.module.css"
import type {
  AcknowledgementDecision,
  ShippingCarrier,
  SupplierTone,
} from "./supplier-portal-types"

export interface OrderAcknowledgementFormProps {
  poNumber: string
  defaultDecision?: AcknowledgementDecision
  defaultLeadTimeDays?: number
  defaultCarrier?: ShippingCarrier
  onSubmit?: (payload: OrderAcknowledgementPayload) => void
}

export interface OrderAcknowledgementPayload {
  decision: AcknowledgementDecision
  leadTimeDays: number
  carrier: ShippingCarrier
  trackingHint: string
}

const DECISION_LABEL: Record<AcknowledgementDecision, string> = {
  accept: "Accept in full",
  partial: "Partial fill",
  decline: "Decline",
}

const DECISION_TONE: Record<AcknowledgementDecision, SupplierTone> = {
  accept: "green",
  partial: "amber",
  decline: "red",
}

const CARRIERS: ReadonlyArray<{ id: ShippingCarrier; label: string }> = [
  { id: "startrack", label: "StarTrack premium" },
  { id: "tnt", label: "TNT road express" },
  { id: "toll", label: "Toll IPEC" },
  { id: "auspost", label: "Australia Post parcel" },
  { id: "own-fleet", label: "Own fleet — direct" },
  { id: "pickup", label: "Workshop pickup" },
]

export function OrderAcknowledgementForm({
  poNumber,
  defaultDecision = "accept",
  defaultLeadTimeDays = 5,
  defaultCarrier = "startrack",
  onSubmit,
}: OrderAcknowledgementFormProps) {
  const leadId = useId()
  const carrierId = useId()
  const trackingId = useId()
  const [decision, setDecision] = useState<AcknowledgementDecision>(defaultDecision)
  const [leadTimeDays, setLeadTimeDays] = useState<number>(defaultLeadTimeDays)
  const [carrier, setCarrier] = useState<ShippingCarrier>(defaultCarrier)
  const [trackingHint, setTrackingHint] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ decision, leadTimeDays, carrier, trackingHint })
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label={`Acknowledgement for ${poNumber}`}
    >
      <header className={styles.head}>
        <span className={styles.eyebrow}>Acknowledge</span>
        <h3 className={styles.title}>{poNumber}</h3>
        <p className={styles.sub}>
          Tell the workshop what to expect — they queue install bays from this answer.
        </p>
      </header>

      <fieldset className={styles.decisionGroup}>
        <legend className={styles.legend}>Decision</legend>
        <div className={styles.decisionRow} role="radiogroup" aria-label="Decision">
          {(Object.keys(DECISION_LABEL) as AcknowledgementDecision[]).map((value) => {
            const selected = decision === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`${styles.decisionBtn} ${selected ? styles.decisionBtnOn : ""}`}
                data-tone={DECISION_TONE[value]}
                onClick={() => setDecision(value)}
              >
                {DECISION_LABEL[value]}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className={styles.grid}>
        <label className={styles.field} htmlFor={leadId}>
          <span className={styles.fieldLabel}>Lead time (business days)</span>
          <input
            id={leadId}
            type="number"
            min={0}
            max={45}
            value={leadTimeDays}
            onChange={(event) => setLeadTimeDays(Number.parseInt(event.target.value, 10) || 0)}
            className={styles.input}
          />
        </label>

        <label className={styles.field} htmlFor={carrierId}>
          <span className={styles.fieldLabel}>Carrier</span>
          <select
            id={carrierId}
            value={carrier}
            onChange={(event) => setCarrier(event.target.value as ShippingCarrier)}
            className={styles.input}
          >
            {CARRIERS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.field} htmlFor={trackingId}>
        <span className={styles.fieldLabel}>Tracking reference (optional now)</span>
        <input
          id={trackingId}
          type="text"
          value={trackingHint}
          placeholder="Auto-filled after dispatch"
          onChange={(event) => setTrackingHint(event.target.value)}
          className={styles.input}
        />
      </label>

      <footer className={styles.footer}>
        <Chip
          label={`${DECISION_LABEL[decision]} · ${leadTimeDays}d`}
          tone={DECISION_TONE[decision]}
          icon={<Truck size={12} aria-hidden="true" />}
        />
        <button type="submit" className={styles.primary}>
          Send acknowledgement
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </form>
  )
}

export default OrderAcknowledgementForm
