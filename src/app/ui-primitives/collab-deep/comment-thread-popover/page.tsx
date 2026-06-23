import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommentThreadPopover } from "../../components/collab-deep"

import { USER_DANIEL, USER_MIA, USER_TIM } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Comment thread popover | Collab deep",
  description:
    "Primitive 04 — anchored comment thread popover with root comment, replies, status chip, and reply composer.",
}

export default function CommentThreadPopoverPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Thread"
        title="Comment thread popover"
        description="Anchored thread popover for a single comment — root author, replies, status chip, and inline reply composer. Tinted to the originating collaborator."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Comment thread popover" },
        ]}
      />

      <section className={styles.stageFrame}>
        <div className={styles.stageRow}>
          <CommentThreadPopover
            pinNumber={1}
            title="Headline length"
            rootAuthor={USER_MIA}
            rootBody="Can we shorten the headline so it fits in two lines on mobile? Maybe drop the year range."
            rootTimestamp="3m ago"
            replies={[
              {
                id: "r1",
                author: USER_DANIEL,
                body: "Year range stays — SEO. Let's tighten the verb instead.",
                timestamp: "2m ago",
              },
              {
                id: "r2",
                author: USER_MIA,
                body: "Fair. Pushing a draft now.",
                timestamp: "30s ago",
              },
            ]}
            status="open"
          />

          <CommentThreadPopover
            pinNumber={2}
            title="Price"
            rootAuthor={USER_TIM}
            rootBody="Price is wrong — should be A$ 1,485, not 1,499. Confirmed with Pacemaker NSW."
            rootTimestamp="58s ago"
            replies={[
              {
                id: "r3",
                author: USER_DANIEL,
                body: "Updating now, thanks Tim.",
                timestamp: "20s ago",
              },
            ]}
            status="reopened"
          />

          <CommentThreadPopover
            pinNumber={3}
            title="Spec table"
            rootAuthor={USER_DANIEL}
            rootBody="Spec table reviewed against the printed catalogue. All good."
            rootTimestamp="6m ago"
            status="resolved"
          />
        </div>
      </section>
    </main>
  )
}
