import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CitationPill } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Citation pill | UI Primitives — AI",
}

export default function CitationPillPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.08 / Conversation"
        title="Citation pill"
        description="Inline citation chip with [n] index and source title. Hovering or focusing reveals a QuoteBubble popover with the source snippet and URL."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Citation pill" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <p style={{ margin: 0, color: "var(--primitive-body)", lineHeight: 1.7, fontSize: "var(--primitive-text-sm)" }}>
            For a 2018 Hilux 2.8 diesel, both the Redback 3&quot; cat-back{" "}
            <CitationPill
              index={1}
              title="Redback datasheet"
              url="https://www.redbackexhausts.com.au/hilux-2-8-gun125"
              snippet="Mandrel-bent 304 stainless. Tested at 89.1 dB(A) bench, V-band 76 mm."
            />{" "}
            and the Magnaflow mid-pipe{" "}
            <CitationPill
              index={2}
              title="Magnaflow Hilux fitment"
              url="https://www.magnaflow.com/au/hilux-mid-pipe"
              snippet="Bolt-in mid replacement, retains stock tip and cat. Bench 85.4 dB(A)."
            />{" "}
            sit comfortably under the NSW EPA 90 dB(A) static cap{" "}
            <CitationPill
              index={3}
              title="NSW EPA noise limits"
              url="https://www.epa.nsw.gov.au/noise-limits"
              snippet="Diesel 4×4 utility 2018 onwards: 90 dB(A) static, 80 dB(A) drive-by."
            />
            . Both retain the cat, so emissions compliance is unchanged.
          </p>
        </div>

        <div className={styles.note}>
          <span>Popover behaviour</span>
          <p>
            The popover wraps an existing QuoteBubble for consistent tail and
            tone. It uses opacity + transform for entry, and the wrapping span
            handles focus-within so keyboard users see the same popover when
            tabbing through citations.
          </p>
        </div>
      </section>
    </main>
  )
}
