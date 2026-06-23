import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AuthConfigCard,
  ChangelogEntryCard,
  CodeSampleTabs,
  EndpointCatalog,
  EndpointDeprecationBanner,
  EndpointDetailCard,
  ErrorCodeRow,
  RateLimitTile,
  ResponseViewer,
  SchemaExplorer,
  SdkInstallCard,
  TryItConsole,
  TryItHistoryRow,
  WebhookReceiverCard,
} from "../../components/api-explorer"
import {
  CHANGELOG_ENTRIES,
  ENDPOINT_CREATE_QUOTE,
  ENDPOINTS,
  ERROR_CODES,
  HISTORY_ROWS,
  QUOTE_SCHEMA,
  RATE_LIMIT_FREE,
  RATE_LIMIT_PLUS,
  RESPONSE_SUCCESS,
  SAMPLES_CREATE_QUOTE,
  SDK_PARTS_SNIPPETS,
  WEBHOOK_EVENTS_PRIMARY,
} from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Full API explorer | API Explorer",
  description:
    "Composed Mufflermen API explorer — catalogue, detail card, try-it console, response viewer, code samples, rate-limit tiles, auth config, webhook receiver, errors, SDK install, changelog, history, deprecation banner.",
}

export default function FullExplorerPage() {
  return (
    <main className={styles.composedMain}>
      <PageHeader
        kicker="Bonus / Full explorer composition"
        title="Mufflermen API explorer"
        description="The full developer surface — catalogue + detail + try-it + response + samples + history wired together. Demonstrates that all 14 primitives compose without ambient styling overrides."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Full explorer" },
        ]}
      />

      <EndpointDeprecationBanner
        endpoint="POST /v0/quote"
        replacementEndpoint="POST /v1/quotes"
        replacementHref="#detail"
        sunsetDate="2026-12-31"
        message="The legacy quote endpoint stays online for 217 more days. Move to /v1/quotes for itemised line items and supersession-aware pricing."
      />

      <div className={styles.composedLayout}>
        <aside className={styles.composedColLeft} aria-label="Catalogue + auth">
          <EndpointCatalog
            endpoints={ENDPOINTS}
            selectedId={ENDPOINT_CREATE_QUOTE.id}
          />
          <AuthConfigCard
            strategy="bearer"
            label="Live workshop bearer"
            credential="mfm_live_sk_2026_7af2_8810_a91d_0c8a"
            hint="Bearer token sourced from the API key vault. Rotate quarterly."
            testState="success"
            testMessage="Connection verified — 184ms"
          />
        </aside>

        <section className={styles.composedColRight} id="detail" aria-label="Endpoint detail + samples">
          <EndpointDetailCard
            method={ENDPOINT_CREATE_QUOTE.method}
            path={ENDPOINT_CREATE_QUOTE.path}
            summary={ENDPOINT_CREATE_QUOTE.summary}
            description={ENDPOINT_CREATE_QUOTE.description}
            version={ENDPOINT_CREATE_QUOTE.version}
            auth={ENDPOINT_CREATE_QUOTE.auth}
            tag={ENDPOINT_CREATE_QUOTE.tag}
            pathParams={[
              { name: "Idempotency-Key", description: "Optional header — replays of the same key return the original quote." },
            ]}
          />

          <CodeSampleTabs
            samples={SAMPLES_CREATE_QUOTE}
            heading={`${ENDPOINT_CREATE_QUOTE.method} ${ENDPOINT_CREATE_QUOTE.path}`}
          />

          <div className={styles.composedSplit}>
            <TryItConsole
              defaultMethod={ENDPOINT_CREATE_QUOTE.method}
              defaultUrl="https://api.muffler.men/v1/quotes"
              defaultBody={JSON.stringify(
                {
                  registration: "OAK-194",
                  service: "muffler_swap",
                  vehicle: { make: "Falcon", model: "XR6", year: 2008 },
                },
                null,
                2,
              )}
            />
            <ResponseViewer response={RESPONSE_SUCCESS} />
          </div>

          <SchemaExplorer root={QUOTE_SCHEMA} />
        </section>
      </div>

      <section className={styles.routeSection} aria-label="Quotas & SDKs">
        <span className={styles.sectionLabel}>Quotas & SDKs</span>
        <div className={styles.gridThree}>
          <RateLimitTile {...RATE_LIMIT_PLUS} />
          <RateLimitTile {...RATE_LIMIT_FREE} />
          <SdkInstallCard
            name="@mufflermen/parts"
            description="Typed client for the parts catalogue API."
            snippets={SDK_PARTS_SNIPPETS}
          />
        </div>
      </section>

      <section className={styles.routeSection} aria-label="Webhook receiver + errors">
        <span className={styles.sectionLabel}>Webhooks & errors</span>
        <div className={styles.gridTwo}>
          <WebhookReceiverCard
            url="https://workshop.muffler.men/hooks/v1/inbox"
            secretMasked="whsec_••••••••••••7af2"
            events={WEBHOOK_EVENTS_PRIMARY}
            lastDeliveryAt="2026-05-28 08:41:09 — 200 OK in 218ms"
          />
          <div className={styles.stack}>
            {ERROR_CODES.slice(0, 3).map((entry) => (
              <ErrorCodeRow key={entry.code} {...entry} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.routeSection} aria-label="Recent calls + changelog">
        <span className={styles.sectionLabel}>Recent calls + changelog</span>
        <div className={styles.gridTwo}>
          <div className={styles.stack}>
            {HISTORY_ROWS.map((row) => (
              <TryItHistoryRow key={row.id} {...row} />
            ))}
          </div>
          <div className={styles.stack}>
            {CHANGELOG_ENTRIES.map((entry) => (
              <ChangelogEntryCard key={entry.version} {...entry} />
            ))}
          </div>
        </div>
      </section>

      <aside className={styles.note}>
        <span>Composition note</span>
        <p>
          Every primitive ships with its own scoped CSS module — there is no shared global
          mounted by this page. All 14 primitives coexist using only the standard
          dark-canonical CSS variables.
        </p>
      </aside>
    </main>
  )
}
