import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveReactionPop } from "../../components/realtime-collab"
import { BEC, JORDAN, MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Live reaction pop | UI Primitives - Realtime collab",
}

export default function LiveReactionPopPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 10"
        title="Live reaction pop"
        description="Floating emoji reaction popping briefly from a collaborator's cursor location — tone follows the cursor colour, reduced-motion holds the pop static."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Live reaction pop" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Four live reactions over the parts table</span>
          <div className={styles.reactionStage}>
            <LiveReactionPop
              user={SOPHIE}
              reaction="like"
              position={{ x: 22, y: 70 }}
            />
            <LiveReactionPop
              user={MARCUS}
              reaction="lightbulb"
              position={{ x: 48, y: 80 }}
            />
            <LiveReactionPop
              user={JORDAN}
              reaction="fire"
              position={{ x: 70, y: 64 }}
            />
            <LiveReactionPop
              user={BEC}
              reaction="clap"
              position={{ x: 86, y: 76 }}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Reactions share the comments-side <code>ReactionEmoji</code> glyph map
            so they read identically to inline comment reactions. Pop animates with
            a 1.8s float-and-fade. Each pop carries an aria-live=&quot;polite&quot;
            label like &quot;Sophie reacted Like&quot; so screen readers receive
            the event without being interrupted.
          </p>
        </div>
      </section>
    </main>
  )
}
