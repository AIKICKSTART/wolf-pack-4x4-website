import type { Metadata } from "next"

import { AutoReplyRuleCard } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { AUTO_REPLY_RULES } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Auto-reply rule card | Unified inbox primitives",
  description:
    "Primitive 11 — out-of-hours / away-message / first-touch rule card with toggle and channel chips.",
}

export default function AutoReplyRuleCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Rule card"
        title="Auto-reply rule card"
        description="Card per rule — out-of-hours, away-message, first-touch. The body preview shows what customers actually see, and the channels chip strip clarifies which surfaces the rule covers. Toggle is a switch with full ARIA + reduced-motion behaviour."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Auto-reply rule card" },
        ]}
      />
      <section className={styles.demoDouble}>
        {AUTO_REPLY_RULES.map((rule) => (
          <AutoReplyRuleCard
            key={rule.id}
            kind={rule.kind}
            title={rule.title}
            body={rule.body}
            schedule={rule.schedule}
            channels={rule.channels}
            defaultEnabled={rule.enabled}
          />
        ))}
      </section>
    </main>
  )
}
