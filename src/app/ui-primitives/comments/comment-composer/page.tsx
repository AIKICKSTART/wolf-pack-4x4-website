import type { Metadata } from "next"

import { CommentComposer } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { MENTION_CANDIDATES } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Comment composer | Comments primitives",
  description:
    "Primitive 04 — new comment composer with textarea, mention picker, attach, emoji, draft auto-save indicator and send.",
}

export default function CommentComposerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Comment composer"
        title="Comment composer"
        description="Textarea anchored to a thread. Type @ to open the mention picker, attach files, drop emoji, and post with ⌘↵. The draft indicator surfaces idle, drafting, and saved states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Composer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty · idle</span>
        <div className={styles.demoColumn}>
          <CommentComposer mentionCandidates={MENTION_CANDIDATES} />
        </div>
        <span className={styles.demoLabel}>Pre-filled draft</span>
        <div className={styles.demoColumn}>
          <CommentComposer
            defaultValue="Marcus, can you grab two spacer kits from shelf 12B before "
            mentionCandidates={MENTION_CANDIDATES}
          />
        </div>
      </section>
    </main>
  )
}
