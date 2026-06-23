import type { Metadata } from "next"

import { CoverArtStudio } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { COVER_SUGGESTIONS, HERO_FRONTMATTER } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Cover art studio | Content studio",
  description:
    "Primitive 14 — cover image cropper with focal-point pin and AI background suggestions. Three states — 16:9 hero, 4:5 social, 1:1 square.",
}

export default function CoverArtStudioScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Cover art studio"
        title="Cover art studio"
        description="Crop the cover for the channel — pin the focal point on the BF Falcon's tail pipes — and pick from four AI-generated cover suggestions. Three states — 16:9 web hero, 4:5 IG portrait, 1:1 square."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Cover art studio" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <CoverArtStudio
            coverAlt={HERO_FRONTMATTER.coverAlt}
            focalX={HERO_FRONTMATTER.coverFocalX}
            focalY={HERO_FRONTMATTER.coverFocalY}
            suggestions={COVER_SUGGESTIONS}
            defaultRatio="16:9"
          />
          <CoverArtStudio
            coverAlt={HERO_FRONTMATTER.coverAlt}
            focalX={42}
            focalY={62}
            suggestions={COVER_SUGGESTIONS}
            defaultRatio="4:5"
          />
          <CoverArtStudio
            coverAlt={HERO_FRONTMATTER.coverAlt}
            focalX={50}
            focalY={50}
            suggestions={COVER_SUGGESTIONS}
            defaultRatio="1:1"
          />
        </div>
      </section>
    </main>
  )
}
