"use client"

import { useId, useState, type FormEvent } from "react"

import type { FormPatternId } from "../form-patterns"
import styles from "./compact-patterns.module.css"

type CompactField =
  | {
      kind: "text"
      name: string
      label: string
      type?: "email" | "password" | "tel" | "text"
      placeholder: string
      required?: boolean
      autoComplete?: string
      help?: string
    }
  | {
      kind: "textarea"
      name: string
      label: string
      placeholder: string
      required?: boolean
      help?: string
    }
  | {
      kind: "select"
      name: string
      label: string
      options: ReadonlyArray<string>
      help?: string
    }
  | {
      kind: "radio"
      name: string
      label: string
      options: ReadonlyArray<string>
      defaultValue: string
    }
  | {
      kind: "chips"
      name: string
      label: string
      options: ReadonlyArray<string>
      defaultValues: ReadonlyArray<string>
    }
  | {
      kind: "range"
      name: string
      label: string
      min: number
      max: number
      step: number
      defaultValue: number
      unit: string
    }
  | {
      kind: "checkbox"
      name: string
      label: string
      help?: string
      defaultChecked?: boolean
    }

interface CompactPatternConfig {
  id: FormPatternId
  eyebrow: string
  title: string
  body: string
  submitLabel: string
  successLabel: string
  fields: ReadonlyArray<CompactField>
}

const PATTERN_CONFIGS: Record<string, CompactPatternConfig> = {
  "auth-security": {
    id: "auth-security",
    eyebrow: "Auth / security",
    title: "Verify an operator",
    body: "Credential, OTP, and device trust in one compact security pass.",
    submitLabel: "Verify session",
    successLabel: "Session verified locally",
    fields: [
      {
        kind: "text",
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "operator@oakflats.example",
        required: true,
        autoComplete: "email",
      },
      {
        kind: "text",
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Workshop passphrase",
        required: true,
        autoComplete: "current-password",
      },
      {
        kind: "text",
        name: "otp",
        label: "One-time code",
        placeholder: "000000",
        required: true,
        help: "Six digits from authenticator or SMS.",
      },
      {
        kind: "checkbox",
        name: "trustDevice",
        label: "Trust this workshop device for 30 days",
        defaultChecked: true,
      },
    ],
  },
  "account-team-settings": {
    id: "account-team-settings",
    eyebrow: "Account / team",
    title: "Invite a bay operator",
    body: "Team invite, role assignment, bay scope, and digest preference.",
    submitLabel: "Prepare invite",
    successLabel: "Invite staged locally",
    fields: [
      {
        kind: "text",
        name: "name",
        label: "Display name",
        placeholder: "Mara King",
        required: true,
        autoComplete: "name",
      },
      {
        kind: "text",
        name: "email",
        label: "Work email",
        type: "email",
        placeholder: "mara@oakflats.example",
        required: true,
        autoComplete: "email",
      },
      {
        kind: "select",
        name: "role",
        label: "Role",
        options: ["Workshop manager", "Parts receiver", "Technician", "Read-only"],
      },
      {
        kind: "chips",
        name: "bays",
        label: "Bay access",
        options: ["Oak Flats", "Albion Park", "Mobile", "Parts desk"],
        defaultValues: ["Oak Flats"],
      },
      {
        kind: "checkbox",
        name: "digest",
        label: "Send weekly account digest",
        defaultChecked: true,
      },
    ],
  },
  "billing-payment-tax": {
    id: "billing-payment-tax",
    eyebrow: "Billing / tax",
    title: "Update billing profile",
    body: "Payment card, invoice contact, ABN, country, and receipt delivery.",
    submitLabel: "Save billing",
    successLabel: "Billing profile saved locally",
    fields: [
      {
        kind: "text",
        name: "cardName",
        label: "Name on card",
        placeholder: "Oak Flats Muffler Men",
        required: true,
      },
      {
        kind: "text",
        name: "card",
        label: "Card number",
        placeholder: "4242 4242 4242 4242",
        required: true,
      },
      {
        kind: "text",
        name: "abn",
        label: "ABN",
        placeholder: "11 222 333 444",
        help: "Demo validation only.",
      },
      {
        kind: "select",
        name: "country",
        label: "Tax country",
        options: ["Australia", "New Zealand", "United Kingdom", "United States"],
      },
      {
        kind: "checkbox",
        name: "receipt",
        label: "Email receipts to billing owner",
        defaultChecked: true,
      },
    ],
  },
  "quote-authoring-signature": {
    id: "quote-authoring-signature",
    eyebrow: "Quote / signature",
    title: "Prepare a quote section",
    body: "Quote line, discount, terms version, signer, and acceptance method.",
    submitLabel: "Stage quote",
    successLabel: "Quote section staged locally",
    fields: [
      {
        kind: "text",
        name: "lineTitle",
        label: "Line item",
        placeholder: "Manta 3in stainless cat-back",
        required: true,
      },
      {
        kind: "select",
        name: "discount",
        label: "Discount",
        options: ["None", "5% loyalty", "10% fleet", "Fixed workshop credit"],
      },
      {
        kind: "radio",
        name: "signature",
        label: "Signature method",
        options: ["Typed", "Drawn", "Upload"],
        defaultValue: "Typed",
      },
      {
        kind: "textarea",
        name: "terms",
        label: "Terms note",
        placeholder: "Quote valid for 14 days. Parts subject to supplier availability.",
      },
    ],
  },
  "calendar-scheduling": {
    id: "calendar-scheduling",
    eyebrow: "Calendar / schedule",
    title: "Reserve bay coverage",
    body: "Date range, time, bay, technician, recurrence, and conflict status.",
    submitLabel: "Reserve slot",
    successLabel: "Schedule held locally",
    fields: [
      {
        kind: "text",
        name: "date",
        label: "Date",
        placeholder: "2026-06-12",
        required: true,
      },
      {
        kind: "select",
        name: "time",
        label: "Time",
        options: ["08:00", "10:30", "13:00", "15:30"],
      },
      {
        kind: "select",
        name: "bay",
        label: "Bay",
        options: ["Bay 01", "Bay 02", "Weld bay", "Mobile van"],
      },
      {
        kind: "chips",
        name: "technicians",
        label: "Technicians",
        options: ["Mara", "Ben", "Talia", "Darren"],
        defaultValues: ["Mara"],
      },
    ],
  },
  "compliance-kyc-consent": {
    id: "compliance-kyc-consent",
    eyebrow: "Compliance / consent",
    title: "Collect a signoff",
    body: "Document type, declaration, policy version, and consent acknowledgement.",
    submitLabel: "Record signoff",
    successLabel: "Signoff recorded locally",
    fields: [
      {
        kind: "select",
        name: "document",
        label: "Document",
        options: ["Driver licence", "ABN certificate", "ADR declaration", "Noise report"],
      },
      {
        kind: "radio",
        name: "review",
        label: "Review state",
        options: ["Pending", "Needs review", "Approved"],
        defaultValue: "Pending",
      },
      {
        kind: "textarea",
        name: "declaration",
        label: "Declaration",
        placeholder: "I confirm the supplied details are accurate for this workflow.",
        required: true,
      },
      {
        kind: "checkbox",
        name: "consent",
        label: "Consent to store this record for compliance review",
        defaultChecked: true,
      },
    ],
  },
  "supplier-ops": {
    id: "supplier-ops",
    eyebrow: "Supplier ops",
    title: "Submit a supplier update",
    body: "SKU, price, lead time, catalog upload state, and compliance certificate.",
    submitLabel: "Queue supplier update",
    successLabel: "Supplier update queued locally",
    fields: [
      {
        kind: "text",
        name: "sku",
        label: "SKU",
        placeholder: "XFC-PX3-MAN",
        required: true,
      },
      {
        kind: "text",
        name: "price",
        label: "Unit price",
        placeholder: "$489.50",
        required: true,
      },
      {
        kind: "select",
        name: "leadTime",
        label: "Lead time",
        options: ["In stock", "2-3 days", "1 week", "Backorder"],
      },
      {
        kind: "chips",
        name: "documents",
        label: "Documents",
        options: ["Catalog CSV", "Invoice PDF", "Compliance cert", "Media pack"],
        defaultValues: ["Catalog CSV"],
      },
    ],
  },
  "roster-workshop-ops": {
    id: "roster-workshop-ops",
    eyebrow: "Roster / ops",
    title: "Request coverage",
    body: "Shift swap, time-off reason, bay coverage, training, and approval state.",
    submitLabel: "Request approval",
    successLabel: "Coverage request staged locally",
    fields: [
      {
        kind: "select",
        name: "technician",
        label: "Technician",
        options: ["Mara King", "Ben Cassidy", "Talia Ng", "Darren Hale"],
      },
      {
        kind: "radio",
        name: "request",
        label: "Request type",
        options: ["Time off", "Shift swap", "Training", "Bay reassignment"],
        defaultValue: "Shift swap",
      },
      {
        kind: "chips",
        name: "coverage",
        label: "Coverage needed",
        options: ["Quote desk", "Bay 01", "Weld bay", "Parts desk"],
        defaultValues: ["Bay 01"],
      },
      {
        kind: "textarea",
        name: "reason",
        label: "Reason",
        placeholder: "Coverage note for the workshop manager.",
      },
    ],
  },
  "builder-editor-admin-rules": {
    id: "builder-editor-admin-rules",
    eyebrow: "Builder / admin",
    title: "Author a validation rule",
    body: "Field type, default value, condition, operator, target, and publish state.",
    submitLabel: "Validate rule",
    successLabel: "Rule validated locally",
    fields: [
      {
        kind: "select",
        name: "fieldType",
        label: "Field type",
        options: ["Text", "Select", "Checkbox", "Upload", "Date"],
      },
      {
        kind: "text",
        name: "defaultValue",
        label: "Default value",
        placeholder: "Oak Flats",
      },
      {
        kind: "radio",
        name: "operator",
        label: "Condition",
        options: ["Equals", "Contains", "Greater than"],
        defaultValue: "Equals",
      },
      {
        kind: "text",
        name: "target",
        label: "Target",
        placeholder: "serviceInterest",
      },
    ],
  },
  "support-comment-composer": {
    id: "support-comment-composer",
    eyebrow: "Support / composer",
    title: "Draft a support reply",
    body: "Macro, mention, reply body, priority, internal note, and resolve toggle.",
    submitLabel: "Queue reply",
    successLabel: "Reply queued locally",
    fields: [
      {
        kind: "select",
        name: "macro",
        label: "Macro",
        options: ["Quote follow-up", "Parts ETA", "Warranty check", "Booking change"],
      },
      {
        kind: "text",
        name: "mention",
        label: "Mention",
        placeholder: "@parts-desk",
      },
      {
        kind: "textarea",
        name: "reply",
        label: "Reply",
        placeholder: "Thanks for the details. We will confirm fitment before booking.",
        required: true,
      },
      {
        kind: "checkbox",
        name: "resolve",
        label: "Resolve after sending",
      },
    ],
  },
  "commerce-checkout": {
    id: "commerce-checkout",
    eyebrow: "Commerce / checkout",
    title: "Review a parts order",
    body: "Customer, shipping, pickup, payment, order notes, and terms acceptance.",
    submitLabel: "Review order",
    successLabel: "Checkout reviewed locally",
    fields: [
      {
        kind: "text",
        name: "customer",
        label: "Customer",
        placeholder: "Jordan Harris",
        required: true,
        autoComplete: "name",
      },
      {
        kind: "radio",
        name: "fulfilment",
        label: "Fulfilment",
        options: ["Pickup", "Ship", "Fit at workshop"],
        defaultValue: "Fit at workshop",
      },
      {
        kind: "select",
        name: "payment",
        label: "Payment",
        options: ["Card", "Account credit", "Pay at pickup"],
      },
      {
        kind: "checkbox",
        name: "terms",
        label: "I accept the parts availability and fitment terms",
        defaultChecked: true,
      },
    ],
  },
  "notification-permissions": {
    id: "notification-permissions",
    eyebrow: "Notifications / access",
    title: "Set an access rule",
    body: "Channel, quiet hours, role scope, approval reason, and muted state.",
    submitLabel: "Apply policy",
    successLabel: "Policy applied locally",
    fields: [
      {
        kind: "chips",
        name: "channels",
        label: "Channels",
        options: ["Email", "SMS", "Push", "In-app"],
        defaultValues: ["Email", "In-app"],
      },
      {
        kind: "select",
        name: "role",
        label: "Role scope",
        options: ["Owner", "Manager", "Technician", "Supplier"],
      },
      {
        kind: "range",
        name: "quietHours",
        label: "Quiet hours starts",
        min: 17,
        max: 23,
        step: 1,
        defaultValue: 20,
        unit: ":00",
      },
      {
        kind: "textarea",
        name: "reason",
        label: "Approval reason",
        placeholder: "Why this access or notification rule is needed.",
      },
    ],
  },
  "email-campaign-builder": {
    id: "email-campaign-builder",
    eyebrow: "Email / campaign",
    title: "Prepare a campaign send",
    body: "Subject, preheader, audience, personalization, test recipient, and send check.",
    submitLabel: "Send test",
    successLabel: "Test send staged locally",
    fields: [
      {
        kind: "text",
        name: "subject",
        label: "Subject",
        placeholder: "Your quote is ready for review",
        required: true,
      },
      {
        kind: "text",
        name: "preheader",
        label: "Preheader",
        placeholder: "Open to view parts, labour, and booking options.",
      },
      {
        kind: "chips",
        name: "audience",
        label: "Audience",
        options: ["Open quotes", "Past customers", "Fleet", "Parts buyers"],
        defaultValues: ["Open quotes"],
      },
      {
        kind: "text",
        name: "testRecipient",
        label: "Test recipient",
        type: "email",
        placeholder: "test@oakflats.example",
        autoComplete: "email",
      },
    ],
  },
}

function CompactPatternDemo({ config }: { config: CompactPatternConfig }) {
  const rootId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [chipValues, setChipValues] = useState<Record<string, string[]>>(() => {
    const seed: Record<string, string[]> = {}
    for (const field of config.fields) {
      if (field.kind === "chips") seed[field.name] = [...field.defaultValues]
    }
    return seed
  })
  const [rangeValues, setRangeValues] = useState<Record<string, number>>(() => {
    const seed: Record<string, number> = {}
    for (const field of config.fields) {
      if (field.kind === "range") seed[field.name] = field.defaultValue
    }
    return seed
  })

  const toggleChip = (name: string, value: string) => {
    setSubmitted(false)
    setChipValues((current) => {
      const selected = current[name] ?? []
      return {
        ...current,
        [name]: selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value],
      }
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    for (const [name, values] of Object.entries(chipValues)) {
      data.delete(name)
      for (const value of values) data.append(name, value)
    }
    for (const [name, value] of Object.entries(rangeValues)) {
      data.set(name, String(value))
    }
    setSubmitted(true)
  }

  return (
    <form
      className={styles.compactForm}
      data-form-dna-demo={config.id}
      onSubmit={handleSubmit}
      noValidate
    >
      <header className={styles.formHead}>
        <span className={styles.eyebrow}>{config.eyebrow}</span>
        <h3>{config.title}</h3>
        <p>{config.body}</p>
      </header>

      <div className={styles.fieldGrid}>
        {config.fields.map((field, index) => {
          const fieldId = `${rootId}-${field.name}-${index}`
          const helpId = `${fieldId}-help`

          if (field.kind === "text") {
            return (
              <div key={field.name} className={styles.field}>
                <label htmlFor={fieldId}>{field.label}</label>
                <input
                  id={fieldId}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-describedby={field.help ? helpId : undefined}
                  onChange={() => setSubmitted(false)}
                />
                {field.help ? <span id={helpId}>{field.help}</span> : null}
              </div>
            )
          }

          if (field.kind === "textarea") {
            return (
              <div key={field.name} className={`${styles.field} ${styles.wide}`}>
                <label htmlFor={fieldId}>{field.label}</label>
                <textarea
                  id={fieldId}
                  name={field.name}
                  rows={3}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-describedby={field.help ? helpId : undefined}
                  onChange={() => setSubmitted(false)}
                />
                {field.help ? <span id={helpId}>{field.help}</span> : null}
              </div>
            )
          }

          if (field.kind === "select") {
            return (
              <div key={field.name} className={styles.field}>
                <label htmlFor={fieldId}>{field.label}</label>
                <select
                  id={fieldId}
                  name={field.name}
                  defaultValue={field.options[0]}
                  aria-describedby={field.help ? helpId : undefined}
                  onChange={() => setSubmitted(false)}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {field.help ? <span id={helpId}>{field.help}</span> : null}
              </div>
            )
          }

          if (field.kind === "radio") {
            return (
              <fieldset key={field.name} className={`${styles.choiceGroup} ${styles.wide}`}>
                <legend>{field.label}</legend>
                <div className={styles.optionGrid}>
                  {field.options.map((option) => (
                    <label key={option} className={styles.radioCard}>
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        defaultChecked={option === field.defaultValue}
                        onChange={() => setSubmitted(false)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )
          }

          if (field.kind === "chips") {
            const selected = chipValues[field.name] ?? []
            return (
              <fieldset key={field.name} className={`${styles.choiceGroup} ${styles.wide}`}>
                <legend>{field.label}</legend>
                <div className={styles.chipRow}>
                  {field.options.map((option) => {
                    const isOn = selected.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`${styles.chip} ${isOn ? styles.chipActive : ""}`}
                        aria-pressed={isOn}
                        onClick={() => toggleChip(field.name, option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            )
          }

          if (field.kind === "range") {
            const value = rangeValues[field.name] ?? field.defaultValue
            return (
              <div key={field.name} className={`${styles.field} ${styles.wide}`}>
                <div className={styles.rangeTop}>
                  <label htmlFor={fieldId}>{field.label}</label>
                  <output htmlFor={fieldId} aria-live="polite">
                    {value}
                    {field.unit}
                  </output>
                </div>
                <input
                  id={fieldId}
                  name={field.name}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={value}
                  onChange={(event) => {
                    setSubmitted(false)
                    setRangeValues((current) => ({
                      ...current,
                      [field.name]: Number(event.target.value),
                    }))
                  }}
                />
              </div>
            )
          }

          return (
            <label key={field.name} className={`${styles.toggleRow} ${styles.wide}`}>
              <input
                name={field.name}
                type="checkbox"
                defaultChecked={field.defaultChecked}
                onChange={() => setSubmitted(false)}
              />
              <span>
                <strong>{field.label}</strong>
                {field.help ? <small>{field.help}</small> : null}
              </span>
            </label>
          )
        })}
      </div>

      {submitted ? (
        <p className={styles.status} role="status" aria-live="polite">
          {config.successLabel}
        </p>
      ) : null}

      <div className={styles.actions}>
        <button type="reset" onClick={() => setSubmitted(false)}>
          Reset
        </button>
        <button type="submit">{config.submitLabel}</button>
      </div>
    </form>
  )
}

function DemoFor({ id }: { id: keyof typeof PATTERN_CONFIGS }) {
  return <CompactPatternDemo config={PATTERN_CONFIGS[id]} />
}

export function AuthSecurityForm() {
  return <DemoFor id="auth-security" />
}

export function AccountTeamSettingsForm() {
  return <DemoFor id="account-team-settings" />
}

export function BillingPaymentTaxForm() {
  return <DemoFor id="billing-payment-tax" />
}

export function QuoteAuthoringSignatureForm() {
  return <DemoFor id="quote-authoring-signature" />
}

export function CalendarSchedulingForm() {
  return <DemoFor id="calendar-scheduling" />
}

export function ComplianceKycConsentForm() {
  return <DemoFor id="compliance-kyc-consent" />
}

export function SupplierOpsForm() {
  return <DemoFor id="supplier-ops" />
}

export function RosterWorkshopOpsForm() {
  return <DemoFor id="roster-workshop-ops" />
}

export function BuilderEditorAdminRulesForm() {
  return <DemoFor id="builder-editor-admin-rules" />
}

export function SupportCommentComposerForm() {
  return <DemoFor id="support-comment-composer" />
}

export function CommerceCheckoutForm() {
  return <DemoFor id="commerce-checkout" />
}

export function NotificationPermissionsForm() {
  return <DemoFor id="notification-permissions" />
}

export function EmailCampaignBuilderForm() {
  return <DemoFor id="email-campaign-builder" />
}
