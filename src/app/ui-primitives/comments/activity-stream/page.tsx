import type { Metadata } from "next"

import { ActivityStream } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { ACTIVITY } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Activity stream | Comments primitives",
  description:
    "Primitive 09 — long-form activity stream of comment events: commented, replied, resolved, reopened, mentioned, liked, annotated.",
}

export default function ActivityStreamPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Activity stream"
        title="Activity stream"
        description="Every comment event flows into this stream — opens, replies, resolves, reopens, mentions, likes, pin drops. Each event gets a verb chip and a context link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Activity stream" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop floor — last 24h</span>
        <ActivityStream events={ACTIVITY} title="Workshop activity" />
      </section>
    </main>
  )
}
