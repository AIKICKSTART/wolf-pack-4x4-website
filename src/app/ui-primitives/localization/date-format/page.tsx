import type { Metadata } from "next"

import { DateFormatDemo } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { DATE_LOCALES, REFERENCE_ISO } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Date format demo | Localization",
  description:
    "Primitive 04 — same instant formatted across en-AU, en-US, en-GB, de-DE, ja-JP, and ar-SA using Intl.DateTimeFormat. The Arabic row uses dir=\"rtl\".",
}

export default function DateFormatScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Intl"
        title="Date format demo"
        description={
          'A single ISO instant rendered for each locale with Intl.DateTimeFormat — weekday, long month, numeric year. The Arabic row flips direction with dir="rtl" so the date and time read right to left.'
        }
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Date format demo" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — reference instant {REFERENCE_ISO}
        </span>
        <DateFormatDemo isoDate={REFERENCE_ISO} locales={DATE_LOCALES} />
      </section>
    </main>
  )
}
