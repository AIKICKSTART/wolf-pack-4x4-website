import type { Metadata } from "next"

import { EmbedCodeGenerator } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Embed code generator | Form builder",
  description:
    "Primitive 09 — choose inline / popup / slider / fullscreen and copy the matching embed snippet.",
}

export default function EmbedCodeGeneratorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Embed code generator"
        title="Embed code generator"
        description="Pick the embed mode — inline, popup, slider, or fullscreen — and a ready-to-paste HTML snippet renders below via the shared CodeBlock primitive. The copy action is live; the snippet is for visual reference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Embed code" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quote form embed</span>
        <EmbedCodeGenerator formId="frm_oakflats_quote" initialMode="inline" />
      </section>
    </main>
  )
}
