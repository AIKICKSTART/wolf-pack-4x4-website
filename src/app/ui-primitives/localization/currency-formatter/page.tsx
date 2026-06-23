import type { Metadata } from "next"

import { CurrencyFormatterDemo } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { CURRENCIES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Currency formatter | Localization",
  description:
    "Primitive 03 — same amount formatted across AUD / USD / EUR / GBP / JPY / NZD / CAD using the built-in Intl.NumberFormat currency style. No translation library, just the platform.",
}

export default function CurrencyFormatterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Intl"
        title="Currency formatter"
        description="One $4,830.75 muffler quote rendered across the workshop's seven supported markets. Each row uses Intl.NumberFormat with the locale and currency code — no external i18n library, just the platform primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Currency formatter" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — AUD 4830.75 as the source</span>
        <CurrencyFormatterDemo
          amount={4830.75}
          sourceCurrency="AUD"
          currencies={CURRENCIES}
        />
      </section>
    </main>
  )
}
