import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ApiExplorerPlayground,
  ApiKeyManager,
  EndpointCard,
  QuotaMeter,
  RateLimitGauge,
  WebhookEventLog,
  WebhookSubscriberRow,
} from "../../components/api-console"
import {
  API_KEYS,
  AVAILABLE_SCOPES,
  ENDPOINTS,
  EVENT_LOG,
  EXPLORER_RESPONSE,
  SUBSCRIBERS,
} from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Full console | API Console",
  description:
    "Bonus composition — API explorer playground, endpoint list, key manager, webhook subscribers, event log, and live rate-limit + quota meters in a single screen.",
}

export default function FullConsolePage() {
  return (
    <main className={styles.consoleMain}>
      <PageHeader
        kicker="Bonus / Full console"
        title="Mufflermen API console"
        description="Every primitive in this lab assembled into one operational console screen — explorer at the top, endpoint catalogue and key manager beneath, then webhook subscribers, the live event log, and the rate-limit + quota meters as a footer strip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Full console" },
        ]}
      />

      <section className={styles.consoleSection} aria-label="Live explorer">
        <span className={styles.consoleSectionLabel}>Explorer</span>
        <ApiExplorerPlayground
          defaultMethod="GET"
          defaultUrl="https://api.muffler.men/v1/quotes?cursor=qte_2026_0509"
          response={EXPLORER_RESPONSE}
        />
      </section>

      <section className={styles.consoleSection} aria-label="Live meters">
        <span className={styles.consoleSectionLabel}>Live meters</span>
        <div className={styles.gridTwo}>
          <RateLimitGauge currentRpm={910} limitRpm={1200} burstCapacity={300} />
          <QuotaMeter
            used={48_412}
            limit={100_000}
            overage={0}
            period="May 2026"
            overageRate="$0.002 / call"
          />
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Endpoint catalogue">
        <span className={styles.consoleSectionLabel}>Endpoint catalogue</span>
        <div className={styles.stack}>
          {ENDPOINTS.slice(0, 4).map((endpoint) => (
            <EndpointCard
              key={`${endpoint.method}-${endpoint.path}`}
              method={endpoint.method}
              path={endpoint.path}
              description={endpoint.description}
              version={endpoint.version}
              auth={endpoint.auth}
              deprecated={endpoint.deprecated}
            />
          ))}
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Keys">
        <span className={styles.consoleSectionLabel}>Keys</span>
        <ApiKeyManager keys={API_KEYS.slice(0, 3)} availableScopes={AVAILABLE_SCOPES} />
      </section>

      <section className={styles.consoleSection} aria-label="Webhook subscribers">
        <span className={styles.consoleSectionLabel}>Webhook subscribers</span>
        <div className={styles.stack} role="list">
          {SUBSCRIBERS.map((subscriber) => (
            <WebhookSubscriberRow key={subscriber.id} subscriber={subscriber} />
          ))}
        </div>
      </section>

      <section className={styles.consoleSection} aria-label="Recent event log">
        <span className={styles.consoleSectionLabel}>Event log</span>
        <WebhookEventLog entries={EVENT_LOG} caption="Webhook deliveries (last hour)" />
      </section>
    </main>
  )
}
