import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./emails.module.css"

export const metadata: Metadata = {
  title: "Email Templates | UI Primitives",
  description:
    "Twelve transactional email templates for the Oak Flats Mufflermen workshop — welcome, auth, commerce, billing, lifecycle, and review prompts. Inline-styled and table-based for email-client safety.",
}

interface EmailScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const SCENES: ReadonlyArray<EmailScene> = [
  {
    kicker: "Template 01",
    title: "Welcome",
    body: "Account-creation welcome — hero, primary CTA, secondary links, footer.",
    href: "/ui-primitives/emails/welcome",
    accent: "amber",
    state: "Account · onboarding",
  },
  {
    kicker: "Template 02",
    title: "Password reset",
    body: "Reset link with expiry, IP + device summary, and ignore-if-not-you copy.",
    href: "/ui-primitives/emails/password-reset",
    accent: "red",
    state: "Auth · security",
  },
  {
    kicker: "Template 03",
    title: "Magic link",
    body: "One-click sign-in button with 6-digit code fallback and expiry timer.",
    href: "/ui-primitives/emails/magic-link",
    accent: "teal",
    state: "Auth · passwordless",
  },
  {
    kicker: "Template 04",
    title: "Order confirmation",
    body: "Order number, line-items table, totals, ETA, view-order CTA.",
    href: "/ui-primitives/emails/order-confirmation",
    accent: "green",
    state: "Commerce · receipt",
  },
  {
    kicker: "Template 05",
    title: "Shipping update",
    body: "Status chip, carrier + tracking, 4-step progress, tracking CTA.",
    href: "/ui-primitives/emails/shipping-update",
    accent: "teal",
    state: "Commerce · logistics",
  },
  {
    kicker: "Template 06",
    title: "Payment failed",
    body: "Decline reason, masked card, retry + update-card CTAs, support line.",
    href: "/ui-primitives/emails/payment-failed",
    accent: "red",
    state: "Billing · alert",
  },
  {
    kicker: "Template 07",
    title: "Invoice attached",
    body: "Invoice number, amount due, due-date strip, view + download links.",
    href: "/ui-primitives/emails/invoice-attached",
    accent: "amber",
    state: "Billing · invoice",
  },
  {
    kicker: "Template 08",
    title: "Monthly digest",
    body: "Four stat cards, top-3 articles, opt-in footer with unsubscribe.",
    href: "/ui-primitives/emails/monthly-digest",
    accent: "teal",
    state: "Marketing · digest",
  },
  {
    kicker: "Template 09",
    title: "Team invite",
    body: "Sender avatar + workspace, role pill, accept + decline, expiry note.",
    href: "/ui-primitives/emails/team-invite",
    accent: "teal",
    state: "Collaboration",
  },
  {
    kicker: "Template 10",
    title: "Receipt",
    body: "Paid chip, line items, GST, masked payment method, refund link.",
    href: "/ui-primitives/emails/receipt",
    accent: "green",
    state: "Billing · receipt",
  },
  {
    kicker: "Template 11",
    title: "Abandoned cart",
    body: "Product image placeholder + savings chip + return-to-cart CTA.",
    href: "/ui-primitives/emails/abandoned-cart",
    accent: "red",
    state: "Lifecycle · win-back",
  },
  {
    kicker: "Template 12",
    title: "Review request",
    body: "Vehicle summary + 1-5 star buttons (table cells) + incentive chip.",
    href: "/ui-primitives/emails/review-request",
    accent: "amber",
    state: "Lifecycle · review",
  },
]

const ACCENT_CLASS: Record<EmailScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

const EMAIL_DNA = [
  {
    label: "Theme-safe preview",
    value: "Preview chrome, paper, and source mode inherit the shared theme surface tokens.",
  },
  {
    label: "Email-client core",
    value: "Template bodies stay table-based and inline-styled while gallery chrome stays tokenized.",
  },
  {
    label: "Single heading owner",
    value: "Primitive routes keep the page h1; embedded emails render visual headings below it.",
  },
] as const

export default function EmailsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="18 / Email templates"
        title="Transactional emails"
        description="Twelve email templates that ship from the Oak Flats Mufflermen workshop — inline-styled, table-based, and safe in Gmail, Outlook and Apple Mail. Open one to see the rendered preview and toggle the source HTML."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails" },
        ]}
        dnaSectionId="theming"
      />

      <section className={styles.dnaPanel} aria-labelledby="emails-dna-title">
        <div>
          <span className={styles.dnaKicker}>Email shared DNA</span>
          <h2 id="emails-dna-title">One preview shell for every template</h2>
          <p>
            Email templates keep their client-safe table markup, but the primitive gallery,
            route headers, preview toggles, source viewer, and light/dark frame all inherit
            from the same theme and surface DNA.
          </p>
        </div>
        <dl>
          {EMAIL_DNA.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <span className={styles.notice}>
        Inline styles + table layout — email-client safe
      </span>

      <div className={styles.ruler} aria-hidden="true">
        <span>01</span>
        <span className={styles.rulerLine} />
        <span>12</span>
      </div>

      <section className={styles.grid} aria-label="Email templates">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbFrame}>
                <span className={styles.thumbHeader} />
                <span className={styles.thumbBody}>
                  <span className={styles.thumbLine} />
                  <span className={`${styles.thumbLine} ${styles.thumbLineShort}`} />
                  <span className={styles.thumbLineAccent} />
                  <span className={styles.thumbLine} />
                  <span className={`${styles.thumbLine} ${styles.thumbLineShort}`} />
                </span>
                <span className={styles.thumbFooter} />
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
