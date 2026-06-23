import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ContactForm } from "../../components/forms-gallery/contact-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Contact form | Forms Gallery",
  description:
    "Pattern 01 — workshop contact form with name, email, phone, subject select, message, attachment, and consent.",
}

export default function ContactFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 01 / Contact"
        title="Contact form"
        description="A general-purpose workshop contact pattern — labels, helper text, validated select, textarea, file slot, and consent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Contact" },
        ]}
      />
      <ContactForm />
    </main>
  )
}
