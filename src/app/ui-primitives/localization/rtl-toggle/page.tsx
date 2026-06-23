import type { Metadata } from "next"

import { RtlLayoutToggle } from "../../components/localization"
import { PageHeader } from "../../components/page-header"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "RTL layout toggle | Localization",
  description:
    "Primitive 09 — toggle between LTR and RTL preview. The preview frame applies dir to its content; reduced-motion shows an instant swap with no transform animation.",
}

export default function RtlToggleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Direction"
        title="RTL layout toggle"
        description="Switch the preview surface between LTR and RTL to verify that logical properties (margin-inline, padding-inline, gap, scrollbars) flip correctly. The frame applies dir='rtl' rather than rotating, so layout actually mirrors instead of merely visually flipping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "RTL layout toggle" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — swap direction to preview</span>
        <RtlLayoutToggle initialDirection="ltr">
          <article style={{ display: "grid", gap: 12 }}>
            <h4 style={{ margin: 0, color: "var(--primitive-text-strong)", fontFamily: "inherit" }}>
              احجز خدمة صيانة العادم
            </h4>
            <p style={{ margin: 0, color: "var(--primitive-body)", fontSize: 13 }}>
              Workshop opens at 7:30 AM. Free coffee while you wait — and yes, the radio plays the
              right cricket call from Sydney on test day.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid color-mix(in oklab, var(--primitive-amber) 40%, transparent)",
                  background: "color-mix(in oklab, var(--primitive-amber) 10%, transparent)",
                  color: "var(--primitive-amber)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                }}
              >
                Confirm booking →
              </button>
              <span
                style={{
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: 11,
                  color: "var(--primitive-muted)",
                  alignSelf: "center",
                }}
              >
                Spot #12 · Oak Flats
              </span>
            </div>
          </article>
        </RtlLayoutToggle>
      </section>
    </main>
  )
}
