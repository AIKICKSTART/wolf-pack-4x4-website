import type { Metadata } from "next"

import { I18nLanguageSwitcher } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_LOCALES } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Locale switcher | CMS",
  description:
    "Primitive 14 — locale tab strip with translation completeness bars and last reviewed dates.",
}

export default function I18nLanguageSwitcherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Locales"
        title="Locale switcher"
        description="Locale tab strip used at the top of any localised CMS page. Each tab carries the language code, name, a translation completeness ProgressLinear, a pending-strings chip and the last review date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Locale switcher" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · loading translation memory
          </span>
          <I18nLanguageSwitcher locales={CMS_LOCALES} loading />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · five locales
          </span>
          <I18nLanguageSwitcher locales={CMS_LOCALES} defaultLocale="en-AU" />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · TM service down
          </span>
          <I18nLanguageSwitcher
            locales={CMS_LOCALES}
            error="Translation memory service returned 500 — translation counts may be stale."
          />
        </div>
      </section>
    </main>
  )
}
