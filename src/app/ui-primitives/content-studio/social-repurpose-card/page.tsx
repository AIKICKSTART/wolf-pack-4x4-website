import type { Metadata } from "next"

import { SocialRepurposeCard } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { HERO_FRONTMATTER, REPURPOSE_OUTPUTS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Social repurpose card | Content studio",
  description:
    "Primitive 12 — generate X thread, IG reel, IG carousel, LinkedIn, TikTok, newsletter from an article. Three states — drafted, scheduled, queued.",
}

const SOURCE_TITLE = HERO_FRONTMATTER.title

export default function SocialRepurposeCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Social repurpose card"
        title="Social repurpose card"
        description="One source article fans out into six channels — each with a hook line, estimated reach, and a status chip. Three states shown — drafted, scheduled, queued."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Social repurpose card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          {REPURPOSE_OUTPUTS.map((output) => (
            <SocialRepurposeCard
              key={output.channel}
              output={output}
              sourceTitle={SOURCE_TITLE}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
