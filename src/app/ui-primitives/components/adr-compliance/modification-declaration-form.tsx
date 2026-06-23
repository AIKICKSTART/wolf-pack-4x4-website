"use client"

import { useState, type FormEvent } from "react"

import { FileUploadForm } from "../forms-gallery/file-upload-form"
import { Chip } from "../primitives/chip"
import { ESignaturePad } from "../quotes/e-signature-pad"

import styles from "./modification-declaration-form.module.css"

interface ModificationDeclarationFormProps {
  /** Default customer name (prefills the typed signature input). */
  defaultCustomerName?: string
  /** Default technician name. */
  defaultTechnicianName?: string
  /** Submit handler — receives the assembled declaration payload. */
  onSubmit?: (payload: ModificationDeclarationPayload) => void
  className?: string
}

export interface ModificationDeclarationPayload {
  customerName: string
  customerLicence: string
  vehicleRego: string
  vehicleVin: string
  vehicleDescription: string
  modificationDescription: string
  customerAcknowledged: boolean
}

export function ModificationDeclarationForm({
  defaultCustomerName = "",
  defaultTechnicianName = "Will Brierley",
  onSubmit,
  className,
}: ModificationDeclarationFormProps) {
  const [customerName, setCustomerName] = useState<string>(defaultCustomerName)
  const [customerLicence, setCustomerLicence] = useState<string>("")
  const [vehicleRego, setVehicleRego] = useState<string>("")
  const [vehicleVin, setVehicleVin] = useState<string>("")
  const [vehicleDescription, setVehicleDescription] = useState<string>("")
  const [modificationDescription, setModificationDescription] = useState<string>("")
  const [acknowledged, setAcknowledged] = useState<boolean>(false)

  const canSubmit =
    customerName.trim() !== "" &&
    vehicleRego.trim() !== "" &&
    modificationDescription.trim() !== "" &&
    acknowledged

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    onSubmit?.({
      customerName,
      customerLicence,
      vehicleRego,
      vehicleVin,
      vehicleDescription,
      modificationDescription,
      customerAcknowledged: acknowledged,
    })
  }

  return (
    <form
      className={`${styles.dialog} ${className ?? ""}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mod-decl-title"
      onSubmit={handleSubmit}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>ADR · Customer declaration</span>
        <h2 id="mod-decl-title" className={styles.title}>
          Modification + compliance declaration
        </h2>
        <p className={styles.lede}>
          Customer authorises the workshop to fit a modification within the limits of the Australian Design Rules.
          Technician confirms in-service compliance under NSW VSI 08 and 14.
        </p>
      </header>

      <fieldset className={styles.fields} aria-labelledby="vehicle-section">
        <legend id="vehicle-section" className={styles.kicker}>
          Vehicle + customer
        </legend>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Customer name</span>
            <input
              type="text"
              className={styles.input}
              autoComplete="name"
              required
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>NSW licence #</span>
            <input
              type="text"
              className={styles.input}
              autoComplete="off"
              value={customerLicence}
              onChange={(event) => setCustomerLicence(event.target.value)}
            />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Rego</span>
            <input
              type="text"
              className={styles.input}
              autoCapitalize="characters"
              required
              value={vehicleRego}
              onChange={(event) => setVehicleRego(event.target.value.toUpperCase())}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>VIN</span>
            <input
              type="text"
              className={styles.input}
              maxLength={17}
              value={vehicleVin}
              onChange={(event) => setVehicleVin(event.target.value.toUpperCase())}
            />
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Vehicle</span>
          <input
            type="text"
            className={styles.input}
            placeholder="2008 Holden VE Commodore SS — Sedan"
            value={vehicleDescription}
            onChange={(event) => setVehicleDescription(event.target.value)}
          />
        </label>
      </fieldset>

      <hr className={styles.divider} />

      <fieldset className={styles.fields} aria-labelledby="modification-section">
        <legend id="modification-section" className={styles.kicker}>
          Modification scope
        </legend>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Description of modification</span>
          <textarea
            className={styles.textarea}
            placeholder="Cat-back stainless 2.5″ with high-flow centre muffler and resonator delete."
            required
            value={modificationDescription}
            onChange={(event) => setModificationDescription(event.target.value)}
          />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-1-5)" }}>
          <Chip label="ADR 28/01 · Stationary" tone="amber" />
          <Chip label="ADR 79/04 · Emissions" tone="amber" />
          <Chip label="NSW VSI 08" tone="teal" />
        </div>
        <div className={styles.uploadSlot}>
          <span className={styles.fieldLabel}>Supporting evidence (optional)</span>
          <FileUploadForm />
        </div>
      </fieldset>

      <hr className={styles.divider} />

      <div className={styles.signatureGrid}>
        <div className={styles.signaturePanel}>
          <div className={styles.signaturePanelHead}>
            <span>Customer signature</span>
            <span>Required</span>
          </div>
          <ESignaturePad signerName={customerName || "Customer"} defaultMethod="typed" />
        </div>
        <div className={styles.signaturePanel}>
          <div className={styles.signaturePanelHead}>
            <span>Technician sign-off</span>
            <span>Optional · pre-flight</span>
          </div>
          <ESignaturePad signerName={defaultTechnicianName} defaultMethod="typed" />
        </div>
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={acknowledged}
          onChange={(event) => setAcknowledged(event.target.checked)}
        />
        <span>
          I acknowledge that the modification described above will be assessed against the
          Australian Design Rules and NSW in-service standards. The workshop may decline
          to fit any part that pushes the vehicle outside ADR limits.
        </span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primary} disabled={!canSubmit}>
          Lodge declaration
        </button>
      </div>
    </form>
  )
}

export default ModificationDeclarationForm
