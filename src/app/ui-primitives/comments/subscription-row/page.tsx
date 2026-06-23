import type { Metadata } from "next"

import { CommentSubscriptionRow } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Subscription row | Comments primitives",
  description:
    "Primitive 12 — subscription chip row: avatars of followers + bell toggle to subscribe / unsubscribe.",
}

const FOLLOWERS = [
  PEOPLE.jordan,
  PEOPLE.kara,
  PEOPLE.marcus,
  PEOPLE.rita,
  PEOPLE.taj,
  PEOPLE.brian,
]

export default function SubscriptionRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Subscription row"
        title="Subscription row"
        description="Shows who is following this thread + a bell toggle to opt in or out. Overflow avatars collapse into a +N pill."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Subscription row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Subscribed · six followers</span>
        <CommentSubscriptionRow
          followers={FOLLOWERS}
          threadLabel="Rear bracket clearance thread"
        />
        <span className={styles.demoLabel}>Not subscribed</span>
        <CommentSubscriptionRow
          followers={FOLLOWERS.slice(0, 3)}
          defaultSubscribed={false}
          threadLabel="Welder fume hood thread"
        />
      </section>
    </main>
  )
}
