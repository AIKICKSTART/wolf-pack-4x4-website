import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LogoMarkBuilder } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Logo mark builder | Branding Lab",
  description:
    "Primitive 02 — pick a silhouette, tone, and stroke treatment. The mark redraws live as you click.",
}

export default function LogoMarkBuilderPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Mark builder"
        title="Logo mark builder"
        description="Mini editor for the mark. Six silhouettes, five tones, three stroke treatments — the preview redraws live. Use it during early identity exploration to land on a shape language quickly."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Logo mark builder" },
        ]}
      />
      <LogoMarkBuilder />
    </main>
  )
}
