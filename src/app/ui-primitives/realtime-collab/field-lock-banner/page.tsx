import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FieldLockBanner } from "../../components/realtime-collab"
import { MARCUS, SOPHIE } from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Field lock banner | UI Primitives - Realtime collab",
}

export default function FieldLockBannerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · 04"
        title="Field lock banner"
        description="Amber banner shown above a field while another collaborator holds its edit lock — holder avatar, hold duration, and a request-release CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Field lock banner" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Sophie holding the quote total</span>
          <div className={styles.demoStack}>
            <FieldLockBanner
              holder={SOPHIE}
              fieldLabel="Quote total"
              heldFor="Held 28s"
            />
          </div>
        </div>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Marcus holding labour line 3 · release disabled</span>
          <div className={styles.demoStack}>
            <FieldLockBanner
              holder={MARCUS}
              fieldLabel="Labour line 3"
              heldFor="Held 6s"
              canRelease={false}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Banner sets <code>aria-busy=&quot;true&quot;</code> on itself and is
            wired to <code>aria-labelledby</code> the locked field. Release CTA is
            an amber Chip reused from primitives so the visual stays consistent
            with the rest of the design system. Distinct from comments-side resolve
            patterns since the field itself is what&apos;s locked.
          </p>
        </div>
      </section>
    </main>
  )
}
