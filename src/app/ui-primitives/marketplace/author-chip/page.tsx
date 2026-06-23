import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuthorChip } from "../../components/marketplace/author-chip"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Author chip | Marketplace | UI Primitives",
  description: "Author chip with avatar, verified badge, and optional profile link.",
}

interface AuthorEntry {
  name: string
  verified: boolean
  href?: string
}

const AUTHORS: ReadonlyArray<AuthorEntry> = [
  { name: "Stripe Inc.", verified: true, href: "#stripe" },
  { name: "Twilio", verified: true, href: "#twilio" },
  { name: "Verridian", verified: true },
  { name: "Manta Performance", verified: false, href: "#manta" },
  { name: "Australian Business Register", verified: true },
  { name: "OpenAI", verified: false },
]

export default function AuthorChipShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.7 / Author chip"
        title="Author chip"
        description="Compact author chip with avatar, verified badge, and optional link to the author profile page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Author chip" },
        ]}
      />

      <section className={styles.section} aria-labelledby="author-chip-row">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Chips</span>
          <h2 id="author-chip-row" className={styles.sectionTitle}>
            Verified and unverified authors
          </h2>
        </header>
        <div className={styles.chipRow}>
          {AUTHORS.map((author) => (
            <AuthorChip
              key={author.name}
              name={author.name}
              verified={author.verified}
              profileHref={author.href}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
