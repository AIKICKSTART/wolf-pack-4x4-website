import type { Metadata } from "next"

import { LanguageSwitcher } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { LANGUAGES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Language switcher | Localization",
  description:
    "Primitive 01 — compact language switcher with current flag, searchable dropdown, endonyms for each entry, and RTL marker chips for Arabic, Hebrew, and Urdu.",
}

export default function LanguageSwitcherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Switching"
        title="Language switcher"
        description="Compact switcher driving the Mufflermen workshop interface language. Click the trigger to reveal a searchable list of locales with endonyms and RTL markers; selecting an option closes the popover. Stateless to the parent — wire it into a router or a cookie."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Language switcher" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — open the trigger to search locales</span>
        <div className={styles.demoStage}>
          <LanguageSwitcher languages={LANGUAGES} value="en-AU" />
        </div>
      </section>
    </main>
  )
}
