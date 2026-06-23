import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CommentOverlayPin } from "../../components/collab-deep"

import { USER_DANIEL, USER_MIA, USER_TIM } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Comment overlay pin | Collab deep",
  description:
    "Primitive 03 — canvas comment pin tinted to its author, with reply badge and status states.",
}

export default function CommentOverlayPinPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Pin"
        title="Comment overlay pin"
        description="Canvas comment pin — anchored to a position, tinted to its author, with optional reply badge, status (open / resolved / reopened), and hover tooltip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Comment overlay pin" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Falcon parts page · 3 pins</span>
        <div className={styles.canvasStage} aria-label="Canvas with 3 anchored comment pins">
          <span className={styles.canvasGuide} aria-hidden="true" />
          <article className={styles.canvasDoc} aria-hidden="true">
            <h2 className={styles.canvasTitle}>Falcon FG · 3 inch cat-back</h2>
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
          </article>
          <CommentOverlayPin
            number={1}
            author={USER_MIA}
            position={{ x: 24, y: 22 }}
            tooltip="Can we shorten the headline?"
            replyCount={2}
            selected
          />
          <CommentOverlayPin
            number={2}
            author={USER_TIM}
            position={{ x: 72, y: 40 }}
            tooltip="Price is wrong — should be 1,485"
            status="reopened"
            replyCount={4}
          />
          <CommentOverlayPin
            number={3}
            author={USER_DANIEL}
            position={{ x: 50, y: 70 }}
            tooltip="Spec table reviewed."
            status="resolved"
          />
        </div>
      </section>
    </main>
  )
}
