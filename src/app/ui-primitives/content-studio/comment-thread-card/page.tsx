import type { Metadata } from "next"

import { CommentThreadCard } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { DRAFT_COMMENTS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Comment thread card | Content studio",
  description:
    "Primitive 11 — editorial comment thread on a draft block. Three states — open with replies, resolved with note, in review.",
}

export default function CommentThreadCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Comment thread card"
        title="Comment thread card"
        description="Editorial threads anchored to a draft block — open, resolved, or in-review. Each thread reuses the comments primitives (bubbles, replies) and adds block anchoring + resolution notes. Three states — open with replies, resolved with note, in review."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Comment thread card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          {DRAFT_COMMENTS.map((comment) => (
            <CommentThreadCard key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </main>
  )
}
