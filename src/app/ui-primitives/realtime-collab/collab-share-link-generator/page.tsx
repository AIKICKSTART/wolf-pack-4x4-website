import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CollabShareLinkGenerator } from "../../components/realtime-collab"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Collab share link generator | UI Primitives - Realtime collab",
}

export default function CollabShareLinkGeneratorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 12"
        title="Collab share link generator"
        description="Share link card — URL input, copy CTA, scope chip radio (View / Comment / Edit / Admin), and an expiry label below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Collab share link generator" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>View-only link · 7 day expiry</span>
          <div className={styles.demoStack}>
            <CollabShareLinkGenerator
              url="https://oakflats.mufflermen.com.au/quote/Q-1408?share=v_ab8d"
              scope="view"
              expiryLabel="Expires in 7 days"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Editor link · expires Friday</span>
          <div className={styles.demoStack}>
            <CollabShareLinkGenerator
              url="https://oakflats.mufflermen.com.au/quote/Q-1408?share=e_22ff"
              scope="edit"
              expiryLabel="Expires Fri 06 Jun · 5:00 PM"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Admin link · no expiry</span>
          <div className={styles.demoStack}>
            <CollabShareLinkGenerator
              url="https://oakflats.mufflermen.com.au/quote/Q-1408?share=a_c1f9"
              scope="admin"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Scope row is a <code>role=&quot;radiogroup&quot;</code> of chip
            primitives. Copy CTA falls back to <code>navigator.clipboard.writeText</code>
            when no <code>onCopy</code> handler is provided and surfaces a
            transient &quot;Copied&quot; state for 1.5s. The input is read-only so
            consumers can wire mutations server-side without breaking the look.
          </p>
        </div>
      </section>
    </main>
  )
}
