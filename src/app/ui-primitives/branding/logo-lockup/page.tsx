import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LogoLockup, type LogoLockupVariant } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Logo lockup | Branding Lab",
  description:
    "Primitive 01 — stacked, horizontal, mark-only, and wordmark-only logo configurations with use-case notes.",
}

const VARIANTS: ReadonlyArray<LogoLockupVariant> = [
  "stacked",
  "horizontal",
  "mark-only",
  "wordmark-only",
]

export default function LogoLockupPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Logo lockup"
        title="Logo lockup variants"
        description="Stacked, horizontal, mark-only, and wordmark-only — the four approved configurations with use-case and minimum-size notes. The mark itself is a hand-drawn chevron curve over a workshop-red disc."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Logo lockup" },
        ]}
      />
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}
      >
        {VARIANTS.map((variant) => (
          <LogoLockup key={variant} variant={variant} />
        ))}
      </section>
    </main>
  )
}
