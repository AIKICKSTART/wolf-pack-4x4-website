import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { LOCALE_ENTRIES } from "../_mock-data"
import styles from "../localization-deep.module.css"

import { LocaleSwitcherClient } from "./locale-switcher-client"

export const metadata: Metadata = {
  title: "Locale switcher | Localization deep",
  description:
    "Primitive 06 — translator-cockpit locale picker with flag, endonym and a completion meter per locale.",
}

export default function LocaleSwitcherPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Switcher"
        title="Locale switcher"
        description="Translator-cockpit locale picker with regional shorthand, endonym (e.g. 简体中文) and a completion meter per locale. The dropdown stays usable at 320px and respects prefers-reduced-motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Locale switcher" },
        ]}
      />
      <LocaleSwitcherClient locales={LOCALE_ENTRIES} />
    </main>
  )
}
