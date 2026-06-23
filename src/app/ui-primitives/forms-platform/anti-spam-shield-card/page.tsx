import type { Metadata } from "next"

import { AntiSpamShieldCard } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { SPAM_SHIELD_RULES } from "../fixtures"
import styles from "../forms-platform.module.css"

const TOTAL_BLOCKED = SPAM_SHIELD_RULES.reduce(
  (sum, rule) => sum + rule.blocked,
  0,
)

export const metadata: Metadata = {
  title: "Anti-spam shield card | Forms platform",
  description:
    "Primitive 04 — the anti-spam shield card with honeypot, Turnstile, rate-limit, and reCAPTCHA defence rows.",
}

export default function AntiSpamShieldCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Anti-spam shield card"
        title="Anti-spam shield card"
        description="Defence stack — honeypot armed, Cloudflare Turnstile armed, per-IP rate limit warning, reCAPTCHA v3 disabled. The shield catches roughly 12 bots a day across the public-facing Mufflermen forms."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Anti-spam shield card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — public Mufflermen forms
        </span>
        <div className={styles.demoInline}>
          <AntiSpamShieldCard
            title="Anti-spam shield"
            subtitle="Applied to Book a Service, Request Quote, Trade Account Apply"
            totalBlocked={TOTAL_BLOCKED}
            rules={SPAM_SHIELD_RULES}
          />
        </div>
      </section>
    </main>
  )
}
