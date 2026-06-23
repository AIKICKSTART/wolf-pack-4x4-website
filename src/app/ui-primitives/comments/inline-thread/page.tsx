import type { Metadata } from "next"

import {
  CommentComposer,
  InlineCommentThread,
} from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { MENTION_CANDIDATES, ROOT_COMMENT } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Inline comment thread | Comments primitives",
  description:
    "Primitive 01 — anchored inline thread with pin badge, root comment, replies, composer, and resolve toggle.",
}

export default function InlineThreadPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Inline comment thread"
        title="Inline comment thread"
        description="Anchored thread next to the content it discusses. Pin badge top-left, replies stacked beneath, composer at the bottom, resolve toggle in the header."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Inline thread" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Open thread · pin #1</span>
        <div className={styles.demoColumn}>
          <InlineCommentThread
            pinNumber={1}
            title="Rear bracket clearance under tow bar"
            rootComment={ROOT_COMMENT}
            composer={
              <CommentComposer
                placeholder="Reply with measurement or photo…"
                mentionCandidates={MENTION_CANDIDATES}
              />
            }
            highlighted
          />
        </div>
      </section>
    </main>
  )
}
