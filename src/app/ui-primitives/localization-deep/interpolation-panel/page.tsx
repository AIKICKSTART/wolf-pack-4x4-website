import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InterpolationPanel } from "../../components/localization-deep"

import { INTERPOLATION_PRIMARY, INTERPOLATION_ZH } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Interpolation panel | Localization deep",
  description:
    "Primitive 09 — interpolation token preview with editable sample values and missing/unused diagnostics.",
}

export default function InterpolationPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Tokens"
        title="Interpolation panel"
        description="Catches the most common L10N regression: a translator drops a {variable} token. The panel parses the template, renders a preview against sample values, and flags missing or unused tokens before the string ships."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Interpolation panel" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>en-AU · five tokens, one unused</span>
        <InterpolationPanel {...INTERPOLATION_PRIMARY} />

        <span className={styles.stageCaption}>zh-CN · five tokens, all in use</span>
        <InterpolationPanel {...INTERPOLATION_ZH} />
      </section>
    </main>
  )
}
