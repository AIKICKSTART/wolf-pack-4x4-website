import type { Metadata } from "next"

import { PluralizationTester } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { PLURAL_LOCALES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Pluralization tester | Localization",
  description:
    "Primitive 10 — cardinal count input and one-line output per CLDR plural form (zero, one, two, few, many, other) per locale, powered by Intl.PluralRules.",
}

export default function PluralizationTesterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Plural rules"
        title="Pluralization tester"
        description="Change the count and watch each locale resolve to its CLDR plural category via Intl.PluralRules. Arabic uses zero/one/two/few/many/other; Russian and Polish use one/few/many/other; Japanese only has other. The active category for the current count is highlighted."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Pluralization tester" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — start at 1, try 0, 2, 5, 21</span>
        <PluralizationTester initialCount={1} locales={PLURAL_LOCALES} />
      </section>
    </main>
  )
}
