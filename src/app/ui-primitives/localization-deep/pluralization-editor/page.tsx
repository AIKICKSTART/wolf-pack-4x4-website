import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import {
  PLURAL_EN_FORMS,
  PLURAL_RU_FORMS,
  PLURAL_ZH_FORMS,
} from "../_mock-data"
import styles from "../localization-deep.module.css"

import { PluralizationEditorClient } from "./pluralization-editor-client"

export const metadata: Metadata = {
  title: "Pluralization editor | Localization deep",
  description:
    "Primitive 08 — CLDR plural form editor covering zero / one / two / few / many / other, with a live count-driven preview.",
}

export default function PluralizationEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Plurals"
        title="Pluralization editor"
        description="Renders the right CLDR forms for the target locale and lets translators inspect every category. English needs one / other; Chinese needs only other; Slavic-style locales need zero / one / few / many / other."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Pluralization editor" },
        ]}
      />
      <PluralizationEditorClient
        enForms={PLURAL_EN_FORMS}
        zhForms={PLURAL_ZH_FORMS}
        ruForms={PLURAL_RU_FORMS}
      />
    </main>
  )
}
