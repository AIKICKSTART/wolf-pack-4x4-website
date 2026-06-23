import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SocialMediaWall } from "../../components/bay-display"
import { SOCIAL_POSTS } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Social media wall | UI Primitives — Bay Display",
}

export default function SocialMediaWallPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.13 / Bay display"
        title="Social media wall"
        description="Instagram-first social wall pulling @oakflats.mufflermen. Posts render as a 2×2 grid with platform badge, handle, caption clamp and likes/comments. Captions clamp to two lines for tidy bento composition."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Social media wall" },
        ]}
      />
      <section className={styles.canvas}>
        <SocialMediaWall posts={SOCIAL_POSTS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each post uses next/image with explicit fill and sizes so the
            waiting-room signage hits its LCP target. Captions clamp to two
            lines via -webkit-line-clamp for tidy bento composition. Platform
            badge stays in the top-right of the media.
          </p>
        </div>
      </section>
    </main>
  )
}
