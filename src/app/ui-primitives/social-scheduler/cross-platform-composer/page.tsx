import type { Metadata } from "next"

import { CrossPlatformComposer } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { PLATFORMS, SAMPLE_HASHTAGS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Cross-platform composer | Muffler Pulse",
  description:
    "Primitive 01 — multi-platform composer producing per-platform variants with character counters and previews.",
}

export default function CrossPlatformComposerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Cross-platform composer"
        title="Cross-platform composer"
        description="A single editor pushing per-platform variants. Toggle channels, watch character counters track per platform limit, and preview each render in the right column."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Cross-platform composer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Default workshop drop</span>
        <CrossPlatformComposer
          platforms={PLATFORMS}
          initialBody={
            "300ZX Twin Turbo on the hoist. Custom 3\" stainless cat-back fab'd in-house, mandrel bent, TIG welded. The bark hits different."
          }
          initialHashtags={SAMPLE_HASHTAGS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · X-only short copy</span>
        <CrossPlatformComposer
          eyebrow="Composer / X-only"
          title="X-first drop"
          platforms={PLATFORMS}
          initialBody={"254rwkw on the 200 Series. Dyno Tuesday delivered."}
          initialHashtags={["#DynoTuesday", "#4WDExhaust"]}
          initialSelected={["x"]}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Overflow on X / Bluesky</span>
        <CrossPlatformComposer
          eyebrow="Composer / overflow warnings"
          title="Long-form blog cross-post"
          platforms={PLATFORMS}
          initialBody={
            "We've shipped 184 custom exhaust systems out of the Oak Flats workshop since January. " +
            "Every fab job starts with an aluminium template, gets mandrel bent on the Bendpak, " +
            "and finishes on the Lukey dyno for a final tune and curve. Here's what our process looks like, " +
            "what suppliers we trust, and why we still TIG weld every single bend in-house — even on the entry-level systems."
          }
          initialHashtags={SAMPLE_HASHTAGS}
          initialSelected={["instagram", "facebook", "linkedin", "x", "bluesky"]}
        />
      </section>
    </main>
  )
}
