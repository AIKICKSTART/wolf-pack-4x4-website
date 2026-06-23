import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  CalloutDanger,
  CalloutInfo,
  CalloutTip,
  CalloutWarning,
} from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Callouts | UI Primitives — Help & Docs",
}

export default function CalloutsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 06"
        title="Callouts"
        description="Four sibling callout box primitives — info, warning, tip, danger. Each has its own inline SVG icon, tone, title, and body. Reduced-motion safe."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Callouts" },
        ]}
      />
      <section className={styles.canvas} aria-label="Callouts demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Drop into long-form articles to interrupt the prose with a high-signal note. Use
            danger sparingly — it should mean: do this wrong and the workshop is at risk.
          </p>
        </div>
        <div className={styles.calloutRow}>
          <CalloutInfo title="Heads up">
            <p>
              The supplier ledger updates every 30 minutes. Rebates may take up to 24 hours to
              appear after a quarter close.
            </p>
          </CalloutInfo>
          <CalloutWarning title="Margin floor enforced">
            <p>
              Quotes that fall under 28% margin will be blocked from save. Override requires a
              director sign-off in the audit log.
            </p>
          </CalloutWarning>
          <CalloutTip title="Workshop tip">
            <p>
              Drag a job between bays in week-view to reschedule — the system re-orders the
              parts pick list automatically.
            </p>
          </CalloutTip>
          <CalloutDanger title="Do not bypass safety lockout">
            <p>
              Never close out a job while the safety lockout is engaged. The hoist must be
              cleared and the wheel chocks logged before sign-off.
            </p>
          </CalloutDanger>
        </div>
      </section>
    </main>
  )
}
