"use client"

import { useId } from "react"

import styles from "./customer-details-form.module.css"
import type { CustomerDetailsValues } from "./booking-widget-types"

interface CustomerDetailsFormProps {
  values: CustomerDetailsValues
  onChange?: (next: CustomerDetailsValues) => void
  /** Optional id of an external submit button. */
  formId?: string
  onSubmit?: (values: CustomerDetailsValues) => void
}

type FieldKey = keyof CustomerDetailsValues

function setField(
  values: CustomerDetailsValues,
  key: FieldKey,
  value: string,
): CustomerDetailsValues {
  return { ...values, [key]: value }
}

export function CustomerDetailsForm({
  values,
  onChange,
  formId,
  onSubmit,
}: CustomerDetailsFormProps) {
  const nameId = useId()
  const emailId = useId()
  const phoneId = useId()
  const vehicleId = useId()
  const notesId = useId()

  const update = (key: FieldKey, value: string) => {
    onChange?.(setField(values, key, value))
  }

  return (
    <form
      id={formId}
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(values)
      }}
      noValidate
    >
      <span className={styles.kicker}>Your details</span>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.label}>
            Full name
          </label>
          <input
            id={nameId}
            className={styles.input}
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            placeholder="Brett Anderson"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={phoneId} className={styles.label}>
            Mobile
          </label>
          <input
            id={phoneId}
            className={styles.input}
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="0412 345 678"
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={emailId} className={styles.label}>
          Email
        </label>
        <input
          id={emailId}
          className={styles.input}
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          placeholder="brett@example.com"
        />
        <span className={styles.help}>We send the booking confirmation here.</span>
      </div>

      <div className={styles.field}>
        <label htmlFor={vehicleId} className={styles.label}>
          Vehicle — rego or make & model
        </label>
        <input
          id={vehicleId}
          className={styles.input}
          type="text"
          required
          value={values.vehicle}
          onChange={(event) => update("vehicle", event.target.value)}
          placeholder="CGB-741 — 2014 Holden Commodore SS"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={notesId} className={styles.label}>
          Notes for the bay
        </label>
        <textarea
          id={notesId}
          className={styles.textarea}
          rows={4}
          value={values.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Sounds like a blow at the mid-muffler. Happy to wait."
        />
      </div>
    </form>
  )
}

export default CustomerDetailsForm
