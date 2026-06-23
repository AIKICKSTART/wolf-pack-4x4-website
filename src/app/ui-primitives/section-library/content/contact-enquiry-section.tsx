/**
 * Contact / enquiry section.
 *
 * Composes the existing `forms-gallery/ContactForm` (general enquiry) and
 * `forms-gallery/QuoteRequestForm` (vehicle quote) into a two-up contact
 * surface with workshop details. The forms are client islands; this section is
 * a server component. Token-driven, light/dark, responsive, a11y handled by the
 * form primitives.
 *
 * Exports `ContactEnquirySection` and `contactEnquiryManifest`.
 */

import { ContactForm, QuoteRequestForm } from "../../components/forms-gallery"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"
import styles from "./contact-enquiry-section.module.css"

const CONTACT_POINTS: ReadonlyArray<{ id: string; label: string; value: string; href?: string }> = [
  { id: "phone", label: "Phone", value: "(02) 4256 1234", href: "tel:+61242561234" },
  { id: "address", label: "Workshop", value: "12 Industrial Dr, Oak Flats NSW 2529" },
  { id: "hours", label: "Hours", value: "Mon–Fri 7:30–17:00 · Sat 8:00–12:00" },
  { id: "email", label: "Email", value: "bay@mufflermen.com.au", href: "mailto:bay@mufflermen.com.au" },
]

export function ContactEnquirySection() {
  return (
    <section className={shell.section} aria-labelledby="contact-enquiry-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Get in touch</span>
        <h2 id="contact-enquiry-heading" className={shell.title}>
          Talk to the Oak Flats bay
        </h2>
        <p className={shell.lede}>
          Send a general enquiry or request a fixed-price quote for your vehicle.
          A fitter replies — usually same business day.
        </p>
      </header>

      <div className={shell.body}>
        <ul className={styles.points} aria-label="Workshop contact details">
          {CONTACT_POINTS.map((point) => (
            <li key={point.id} className={styles.point}>
              <span className={styles.pointLabel}>{point.label}</span>
              {point.href ? (
                <a className={styles.pointValue} href={point.href}>
                  {point.value}
                </a>
              ) : (
                <span className={styles.pointValue}>{point.value}</span>
              )}
            </li>
          ))}
        </ul>

        <div className={shell.split}>
          <div className={styles.formCard} aria-labelledby="contact-general-heading">
            <h3 id="contact-general-heading" className={styles.formTitle}>
              General enquiry
            </h3>
            <p className={styles.formHint}>
              Questions about a service, warranty, or a part you supplied.
            </p>
            <ContactForm />
          </div>

          <div className={styles.formCard} aria-labelledby="contact-quote-heading">
            <h3 id="contact-quote-heading" className={styles.formTitle}>
              Request a quote
            </h3>
            <p className={styles.formHint}>
              Tell us the vehicle and what you need — we price it back fast.
            </p>
            <QuoteRequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export const contactEnquiryManifest: BlockManifest = {
  type: "section/contact-enquiry",
  name: "Contact & enquiry section",
  category: "Content",
  kind: "section",
  version: "1.0.0",
  summary:
    "Two-up contact section — workshop details list plus a general-enquiry form and a vehicle quote-request form, both client-side validated.",
  componentPath: "@/app/ui-primitives/section-library/content/contact-enquiry-section",
  importName: "ContactEnquirySection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string" },
    { path: "title", label: "Heading", control: "text", valueType: "string" },
    { path: "lede", label: "Intro", control: "textarea", valueType: "richtext" },
    { path: "contactPoints[]", label: "Contact details", control: "repeater", valueType: "array" },
    { path: "contactPoints[].label", label: "Detail label", control: "text", valueType: "string" },
    { path: "contactPoints[].value", label: "Detail value", control: "text", valueType: "string" },
    { path: "contactPoints[].href", label: "Detail link", control: "url", valueType: "url", optional: true },
    { path: "showQuoteForm", label: "Show quote form", control: "toggle", valueType: "boolean" },
  ],
  tokenDependencies: withCommonTokens([
    { token: "--primitive-field-bg", category: "color", usage: "form field surfaces" },
    { token: "--primitive-field-strong", category: "color", usage: "form field focus surface" },
    { token: "--primitive-card-bg", category: "color", usage: "form card surface" },
  ]),
  iconDependencies: [
    { name: "Phone", importPath: "lucide-react", usage: "phone contact point" },
    { name: "MapPin", importPath: "lucide-react", usage: "address contact point" },
  ],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    keyboardOperable: true,
    requiresLabel: true,
    notes: [
      "Both forms are labelled, use noValidate + inline error messaging.",
      "Contact details are an accessible list with linked tel/mailto values.",
    ],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "ContactPage",
    requiresAltText: false,
    indexable: true,
  },
  conversionGoal: {
    id: "submit-enquiry",
    label: "Submit enquiry",
    action: "submit",
    eventName: "contact_enquiry_submit",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "16/10",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { ContactEnquirySection } from "@/app/ui-primitives/section-library/content/contact-enquiry-section"',
      "",
      "export default function Page() {",
      "  return <ContactEnquirySection />",
      "}",
    ].join("\n"),
    caption: "Server-rendered section with two client-side form islands.",
  },
  setupInstructions: {
    steps: [
      "Render under a `.dashboard`-scoped surface for tokens.",
      "Wire each form's `onSubmit` to your handler / server action.",
      "Update the contact-point list with your real phone, address, and hours.",
    ],
    requires: [],
    notes: ["Forms ship without a network handler — submissions are no-ops until wired."],
  },
  tags: ["contact", "enquiry", "form", "lead", "content"],
}
