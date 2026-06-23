import type { Metadata } from "next"

import { FieldTypeIcon } from "../../components/form-builder"
import type { FormFieldType } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Field type icon | Form builder",
  description:
    "Primitive 04 — a single component dispatching 15 inline SVG glyphs for every form field type.",
}

const TYPES: ReadonlyArray<{ type: FormFieldType; label: string }> = [
  { type: "short-text", label: "Short text" },
  { type: "long-text", label: "Long text" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "number", label: "Number" },
  { type: "currency", label: "Currency" },
  { type: "date", label: "Date" },
  { type: "dropdown", label: "Dropdown" },
  { type: "multi-select", label: "Multi-select" },
  { type: "rating", label: "Rating" },
  { type: "file-upload", label: "File upload" },
  { type: "signature", label: "Signature" },
  { type: "address", label: "Address" },
  { type: "payment", label: "Payment" },
  { type: "yes-no", label: "Yes / No" },
]

export default function FieldTypeIconScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Field type icon"
        title="Field type icon"
        description="One component, 15 inline-SVG glyphs — short-text, long-text, email, phone, number, currency, date, dropdown, multi-select, rating, file-upload, signature, address, payment, yes-no. Sized by a `size` prop, optional `ariaLabel` flips it to a labelled image role."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Field type icon" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — all 15 glyphs at 22px</span>
        <div className={styles.demoInline}>
          {TYPES.map((entry) => (
            <div key={entry.type} style={iconCardStyle}>
              <FieldTypeIcon type={entry.type} size={22} ariaLabel={entry.label} />
              <span style={iconLabelStyle}>{entry.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

const iconCardStyle = {
  display: "grid",
  placeItems: "center",
  gap: "8px",
  padding: "16px",
  minWidth: "104px",
  border: "1px solid var(--primitive-line)",
  borderRadius: "var(--primitive-radius-md)",
  background: "color-mix(in oklab, var(--primitive-canvas) 55%, transparent)",
  color: "var(--primitive-text-strong)",
} as const

const iconLabelStyle = {
  fontFamily: "var(--primitive-font-mono)",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--primitive-muted)",
}
