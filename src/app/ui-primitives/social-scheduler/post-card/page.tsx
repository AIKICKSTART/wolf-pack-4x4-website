import type { Metadata } from "next"

import { PostCard } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { buildScheduledPosts, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Post card | Muffler Pulse",
  description:
    "Primitive 05 — scheduled post card with platform pills, status, engagement preview.",
}

export default function PostCardPage() {
  const posts = buildScheduledPosts()
  const scheduled = posts.find((p) => p.status === "scheduled")
  const published = posts.find((p) => p.status === "published")
  const failed = posts.find((p) => p.status === "failed")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Post card"
        title="Post card"
        description="The compact card that represents a single scheduled, published, or failed post. Platform pills declare reach, the status badge declares lifecycle stage, and the footer shows engagement when available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Post card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Scheduled, IG + TikTok + FB</span>
        {scheduled && <PostCard post={scheduled} platforms={PLATFORMS} />}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Published with engagement</span>
        {published && <PostCard post={published} platforms={PLATFORMS} />}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Failed (token expired)</span>
        {failed && <PostCard post={failed} platforms={PLATFORMS} />}
      </section>
    </main>
  )
}
