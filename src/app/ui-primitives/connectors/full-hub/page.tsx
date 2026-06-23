import type { Metadata } from "next"

import { FadeIn } from "../../components/motion"
import { PageHeader } from "../../components/page-header"
import {
  ApiKeyVaultRow,
  AuditTrailRow,
  ConnectionTestResult,
  DataMappingRow,
  EventRelayTable,
  IntegrationHealthTile,
  OAuthConnectCard,
  ProviderDirectoryCard,
  QuotaPurchaseCard,
  RateLimitGauge,
  RetryPolicyCard,
  ScopePermissionGrid,
  SyncScheduleCard,
  WebhookConfigCard,
} from "../../components/connectors"

import {
  AUDIT_ENTRIES,
  EVENT_RELAY_ROWS,
  HEALTH_SHOPIFY,
  HEALTH_STRIPE,
  HEALTH_TWILIO,
  HEALTH_XERO,
  MAPPING_SHOPIFY_TO_PAYLOAD,
  OAUTH_GOOGLE_CONNECTED,
  OAUTH_META_WARNING,
  OAUTH_STRIPE_CONNECTED,
  OAUTH_XERO_CONNECTED,
  PROVIDER_DIRECTORY,
  QUOTA_REPLICATE,
  RATE_GOOGLE_CALENDAR_HEALTHY,
  RATE_OPENAI_NEAR,
  RATE_REPLICATE_OVER,
  RETRY_REPLICATE,
  RETRY_STRIPE,
  RETRY_TWILIO,
  SCHEDULE_LINKEDIN_PAUSED,
  SCHEDULE_SUPPLIER,
  SCHEDULE_XERO,
  SCOPE_GRID_DATA,
  TEST_STRIPE_OK,
  VAULT_ANTHROPIC,
  VAULT_OPENAI,
  VAULT_PAYLOAD_SECRET,
  VAULT_REPLICATE,
  VAULT_STRIPE,
  WEBHOOK_SHOPIFY,
  WEBHOOK_STRIPE,
  WEBHOOK_TWILIO,
} from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Full integration hub | Connectors",
  description:
    "End-to-end composition — directory, OAuth, secrets, webhooks, schedules, health, rate limits, event relay and audit trail in one workshop view.",
}

const PROVIDER_TOP_FOUR = PROVIDER_DIRECTORY.slice(0, 4)
const VAULT_ENTRIES = [VAULT_STRIPE, VAULT_REPLICATE, VAULT_OPENAI, VAULT_ANTHROPIC, VAULT_PAYLOAD_SECRET]
const SCHEDULES = [SCHEDULE_SUPPLIER, SCHEDULE_XERO, SCHEDULE_LINKEDIN_PAUSED]
const RATE_GAUGES = [
  RATE_GOOGLE_CALENDAR_HEALTHY,
  RATE_OPENAI_NEAR,
  RATE_REPLICATE_OVER,
]
const RETRY_POLICIES = [RETRY_STRIPE, RETRY_REPLICATE, RETRY_TWILIO]
const HEALTH_TILES = [HEALTH_STRIPE, HEALTH_TWILIO, HEALTH_SHOPIFY, HEALTH_XERO]

export default function FullHubScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Connectors / Composition"
        title="Full integration hub"
        description="The unified workshop integration hub composed entirely from the 14 connector primitives — directory, OAuth grants, secret vault, webhooks, schedules, health tiles, rate limits, event log, retry policies, mapping, quota tier and the audit trail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Full integration hub" },
        ]}
      />

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-directory">
          <header className={styles.sectionHead}>
            <h2 id="hub-directory" className={styles.sectionTitle}>Provider directory</h2>
            <span className={styles.sectionMeta}>{PROVIDER_DIRECTORY.length} providers · 4 installed</span>
          </header>
          <div className={styles.demoTriple}>
            {PROVIDER_TOP_FOUR.map((entry) => (
              <ProviderDirectoryCard key={entry.provider} {...entry} />
            ))}
          </div>
        </section>
      </FadeIn>

      <section className={styles.hubSplit} aria-label="OAuth and secrets">
        <FadeIn>
          <div className={styles.demoSurface}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>OAuth connections</h2>
              <span className={styles.sectionMeta}>4 grants live</span>
            </header>
            <div className={styles.demoStack}>
              <OAuthConnectCard {...OAUTH_GOOGLE_CONNECTED} scopes={OAUTH_GOOGLE_CONNECTED.scopes} />
              <OAuthConnectCard {...OAUTH_META_WARNING} scopes={OAUTH_META_WARNING.scopes} />
              <OAuthConnectCard {...OAUTH_STRIPE_CONNECTED} scopes={OAUTH_STRIPE_CONNECTED.scopes} />
              <OAuthConnectCard {...OAUTH_XERO_CONNECTED} scopes={OAUTH_XERO_CONNECTED.scopes} />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className={styles.hubAside}>
            <div className={styles.demoSurface}>
              <header className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>API key vault</h2>
                <span className={styles.sectionMeta}>5 keys · 1 overdue</span>
              </header>
              <div className={styles.demoStack}>
                {VAULT_ENTRIES.map((entry) => (
                  <ApiKeyVaultRow key={entry.keyName} {...entry} />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-webhooks">
          <header className={styles.sectionHead}>
            <h2 id="hub-webhooks" className={styles.sectionTitle}>Webhook endpoints</h2>
            <span className={styles.sectionMeta}>3 sources</span>
          </header>
          <div className={styles.demoTriple}>
            <WebhookConfigCard
              source={WEBHOOK_STRIPE.source}
              endpoint={WEBHOOK_STRIPE.endpoint}
              signingSecret={WEBHOOK_STRIPE.signingSecret}
              status={WEBHOOK_STRIPE.status}
              events={WEBHOOK_STRIPE.events}
            />
            <WebhookConfigCard
              source={WEBHOOK_SHOPIFY.source}
              endpoint={WEBHOOK_SHOPIFY.endpoint}
              signingSecret={WEBHOOK_SHOPIFY.signingSecret}
              status={WEBHOOK_SHOPIFY.status}
              events={WEBHOOK_SHOPIFY.events}
            />
            <WebhookConfigCard
              source={WEBHOOK_TWILIO.source}
              endpoint={WEBHOOK_TWILIO.endpoint}
              signingSecret={WEBHOOK_TWILIO.signingSecret}
              status={WEBHOOK_TWILIO.status}
              events={WEBHOOK_TWILIO.events}
            />
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-schedules">
          <header className={styles.sectionHead}>
            <h2 id="hub-schedules" className={styles.sectionTitle}>Sync schedules</h2>
            <span className={styles.sectionMeta}>3 cadences</span>
          </header>
          <div className={styles.demoTriple}>
            {SCHEDULES.map((schedule) => (
              <SyncScheduleCard key={schedule.jobName} {...schedule} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-health">
          <header className={styles.sectionHead}>
            <h2 id="hub-health" className={styles.sectionTitle}>Integration health</h2>
            <span className={styles.sectionMeta}>4 integrations</span>
          </header>
          <div className={styles.demoTriple}>
            {HEALTH_TILES.map((tile) => (
              <IntegrationHealthTile key={tile.provider} {...tile} />
            ))}
          </div>
        </section>
      </FadeIn>

      <section className={styles.hubSplit} aria-label="Rate limits and retry policies">
        <FadeIn>
          <div className={styles.demoSurface}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Rate limits</h2>
              <span className={styles.sectionMeta}>3 quotas tracked</span>
            </header>
            <div className={styles.demoStack}>
              {RATE_GAUGES.map((gauge) => (
                <RateLimitGauge key={gauge.provider} {...gauge} />
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <div className={styles.demoSurface}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Retry policies</h2>
              <span className={styles.sectionMeta}>3 consumers</span>
            </header>
            <div className={styles.demoStack}>
              {RETRY_POLICIES.map((policy) => (
                <RetryPolicyCard key={policy.consumer} {...policy} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-relay">
          <header className={styles.sectionHead}>
            <h2 id="hub-relay" className={styles.sectionTitle}>Event relay</h2>
            <span className={styles.sectionMeta}>{EVENT_RELAY_ROWS.length} recent events</span>
          </header>
          <EventRelayTable rows={EVENT_RELAY_ROWS} caption="Inbound webhook events" />
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-mapping">
          <header className={styles.sectionHead}>
            <h2 id="hub-mapping" className={styles.sectionTitle}>Data mapping · Shopify → Payload</h2>
            <span className={styles.sectionMeta}>{MAPPING_SHOPIFY_TO_PAYLOAD.length} fields</span>
          </header>
          <div className={styles.demoStack}>
            {MAPPING_SHOPIFY_TO_PAYLOAD.map((row) => (
              <DataMappingRow key={`${row.sourceField}-${row.targetField}`} {...row} />
            ))}
          </div>
        </section>
      </FadeIn>

      <section className={styles.hubSplit} aria-label="Permissions and quota">
        <FadeIn>
          <div className={styles.demoSurface}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Scope permission grid</h2>
              <span className={styles.sectionMeta}>5 providers · 6 scopes</span>
            </header>
            <ScopePermissionGrid {...SCOPE_GRID_DATA} />
          </div>
        </FadeIn>
        <FadeIn>
          <div className={styles.demoSurface}>
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Quota purchase</h2>
              <span className={styles.sectionMeta}>Replicate · Studio recommended</span>
            </header>
            <QuotaPurchaseCard {...QUOTA_REPLICATE} />
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-test">
          <header className={styles.sectionHead}>
            <h2 id="hub-test" className={styles.sectionTitle}>Last connection test</h2>
            <span className={styles.sectionMeta}>Stripe · {TEST_STRIPE_OK.latencyMs}ms</span>
          </header>
          <ConnectionTestResult {...TEST_STRIPE_OK} />
        </section>
      </FadeIn>

      <FadeIn>
        <section className={styles.demoSurface} aria-labelledby="hub-audit">
          <header className={styles.sectionHead}>
            <h2 id="hub-audit" className={styles.sectionTitle}>Audit trail</h2>
            <span className={styles.sectionMeta}>{AUDIT_ENTRIES.length} entries · last 48h</span>
          </header>
          <div className={styles.demoStack}>
            {AUDIT_ENTRIES.map((entry, index) => (
              <AuditTrailRow
                key={`audit-${entry.action}-${entry.connector}-${index}`}
                {...entry}
              />
            ))}
          </div>
        </section>
      </FadeIn>
    </main>
  )
}
