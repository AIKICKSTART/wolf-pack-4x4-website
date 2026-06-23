import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AuthSnippetCard,
  LangSwitcherTabs,
  PaginationCursorSnippet,
  QuickstartStepCard,
  SdkChangelogRow,
  SdkInstallSnippet,
  SdkVersionSelector,
  WebhookPayloadSample,
} from "../../components/dev-experience"
import type {
  AuthSnippetVariant,
  LangSample,
  PaginationStep,
  SdkVersionOption,
} from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Full quickstart | UI Primitives — Dev experience",
}

const VERSIONS: ReadonlyArray<SdkVersionOption> = [
  { version: "3.4.0", channel: "stable" },
  { version: "3.3.2", channel: "stable" },
  { version: "4.0.0-beta.2", channel: "beta", breaking: true },
  { version: "4.0.0-canary.7", channel: "canary", breaking: true },
]

const AUTH_VARIANTS: ReadonlyArray<AuthSnippetVariant> = [
  {
    method: "bearer",
    language: "typescript",
    caption: "Recommended for server-side workshop integrations.",
    code: `const muff = new Mufflermen({
  apiKey: process.env.MUFFLERMEN_API_KEY,
})`,
  },
  {
    method: "api-key",
    language: "curl",
    caption: "Raw header for non-SDK environments.",
    code: `curl https://api.mufflermen.com/v1/parts/lookup \\
  -H "X-Mufflermen-Key: sk_live_********"`,
  },
  {
    method: "oidc",
    language: "typescript",
    caption: "Manager dashboards — exchanges OIDC ID tokens for SDK access.",
    code: `const muff = await Mufflermen.fromOidc({
  issuer: "https://login.oakflats.mufflermen.com",
  audience: "https://api.mufflermen.com",
  idToken: await getIdTokenFromWorkOs(),
})`,
  },
]

const REQUEST_SAMPLES: ReadonlyArray<LangSample> = [
  {
    language: "typescript",
    fileName: "quote.ts",
    code: `const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})`,
  },
  {
    language: "python",
    fileName: "quote.py",
    code: `quote = muff.quotes.create(
    vehicle_id="veh_2026_ford_ranger_xl",
    part_ids=["part_extractor_xforce_4cyl"],
    bay_id="bay_oak_flats_03",
)`,
  },
  {
    language: "curl",
    fileName: "quote.sh",
    code: `curl -X POST https://api.mufflermen.com/v1/quotes \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "vehicle_id": "veh_2026_ford_ranger_xl", "part_ids": ["part_extractor_xforce_4cyl"], "bay_id": "bay_oak_flats_03" }'`,
  },
]

const PAGINATION_STEPS: readonly [PaginationStep, PaginationStep, PaginationStep] = [
  {
    label: "First page",
    caption: "GET /v1/bookings?limit=20",
    language: "curl",
    code: `curl https://api.mufflermen.com/v1/bookings?limit=20 \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY"`,
  },
  {
    label: "Response · next_cursor",
    caption: "200 OK",
    language: "json",
    code: `{
  "data": [
    { "id": "bkg_01HQ8E...", "bay_id": "bay_oak_flats_03" },
    { "id": "bkg_01HQ8F...", "bay_id": "bay_oak_flats_01" }
  ],
  "page": { "limit": 20, "next_cursor": "cur_b6f9c4d0", "has_more": true }
}`,
  },
  {
    label: "Second page",
    caption: "GET /v1/bookings?cursor=...",
    language: "curl",
    code: `curl https://api.mufflermen.com/v1/bookings?limit=20&cursor=cur_b6f9c4d0 \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY"`,
  },
]

const WEBHOOK_PAYLOAD = `{
  "id": "evt_01HQ8FK4ZJM7CVS3Y9VTBP2NTR",
  "type": "quote.created",
  "created": "2026-05-21T08:42:11Z",
  "workshop_id": "wsh_oak_flats",
  "data": {
    "quote_id": "qte_2026_xforce_extractor_001",
    "bay_id": "bay_oak_flats_03",
    "total_aud": 1842.50
  }
}`

const AUTH_CODE = `import { Mufflermen } from "@mufflermen/sdk"

export const muff = new Mufflermen({
  workshopId: "wsh_oak_flats",
  apiKey: process.env.MUFFLERMEN_API_KEY,
})`

const QUOTE_CODE = `const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})`

const PARTS_CODE = `const parts = await muff.parts.lookup({
  query: "xforce 4-cylinder extractor",
  limit: 10,
})`

const BOOKINGS_CODE = `const bookings = await muff.bookings.list({
  bayId: "bay_oak_flats_03",
  from: "2026-05-21",
  to: "2026-05-28",
})`

const WEBHOOK_CODE = `import { verifySignature } from "@mufflermen/sdk/webhooks"

export async function POST(req: Request) {
  const raw = await req.text()
  const sig = req.headers.get("mufflermen-signature") ?? ""
  verifySignature(raw, sig, process.env.MUFFLERMEN_WEBHOOK_SECRET)

  const event = JSON.parse(raw)
  if (event.type === "quote.created") {
    await notifyService(event.data)
  }

  return Response.json({ received: true })
}`

export default function FullQuickstartPage() {
  return (
    <main className={styles.page}>
      <div className={styles.pageHeaderHero}>
        <PageHeader
          kicker="Dev experience · Full quickstart composition"
          title="Ship the SDK — full quickstart"
          description="Every dev-experience primitive assembled into the quickstart flow used in the Mufflermen developer portal — install, five-step walk-through, auth card, multi-language request example, cursor pagination, webhook payload, version selector, and a changelog footer."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Dev experience", href: "/ui-primitives/dev-experience" },
            { label: "Full quickstart" },
          ]}
        />
        <SdkVersionSelector options={VERSIONS} currentVersion="3.4.0" />
      </div>

      <div className={styles.quickstartShell}>
        <SdkInstallSnippet
          packageName="@mufflermen/sdk"
          title="Install the Mufflermen SDK"
          defaultManager="pnpm"
        />

        <div className={styles.stepStack}>
          <QuickstartStepCard
            stepNumber={1}
            title="Authenticate the SDK"
            language="typescript"
            fileName="lib/muff.ts"
            code={AUTH_CODE}
            initialDone
          >
            <p>
              Create one client per workshop, scoped by your live API key. Server-side
              only — never ship the key to the browser.
            </p>
          </QuickstartStepCard>
          <QuickstartStepCard
            stepNumber={2}
            title="Create your first instant quote"
            language="typescript"
            fileName="scripts/first-quote.ts"
            code={QUOTE_CODE}
          >
            <p>
              <code>quotes.create</code> resolves bay availability for the requested bay
              and returns a draft quote with line items, totals (AUD), and an expiry.
            </p>
          </QuickstartStepCard>
          <QuickstartStepCard
            stepNumber={3}
            title="Look up parts"
            language="typescript"
            fileName="scripts/parts-lookup.ts"
            code={PARTS_CODE}
          >
            <p>
              <code>parts.lookup</code> is a vector search over the Mufflermen parts
              catalogue. Pass a freeform query — the SDK handles embeddings.
            </p>
          </QuickstartStepCard>
          <QuickstartStepCard
            stepNumber={4}
            title="List bookings"
            language="typescript"
            fileName="scripts/bookings.ts"
            code={BOOKINGS_CODE}
          >
            <p>
              <code>bookings.list</code> returns the bookings for one bay across a date
              range. Responses are cursor-paginated — see step 6 for the cursor flow.
            </p>
          </QuickstartStepCard>
          <QuickstartStepCard
            stepNumber={5}
            title="Subscribe to webhooks"
            language="typescript"
            fileName="app/webhooks/route.ts"
            code={WEBHOOK_CODE}
          >
            <p>
              Verify every payload using the <code>Mufflermen-Signature</code> header
              before acting on it. The SDK ships a verifier helper.
            </p>
          </QuickstartStepCard>
        </div>

        <AuthSnippetCard
          variants={AUTH_VARIANTS}
          postmanUrl="https://www.postman.com/mufflermen/workspace/api/collection/quotes"
        />

        <LangSwitcherTabs
          samples={REQUEST_SAMPLES}
          title="Create the quote — same call, three languages"
        />

        <PaginationCursorSnippet steps={PAGINATION_STEPS} />

        <WebhookPayloadSample
          eventType="quote.created"
          version="2026-05-01"
          timestamp="2026-05-21T08:42:11Z"
          signatureHeader="t=1716280931,v1=8f2e9a4d3c6b1f7e0c5a2b8d4e6f9c1a3b5d7e8f2a4c6b8d0e2f4a6c8b1d3f5e"
          payload={WEBHOOK_PAYLOAD}
        />

        <section className={styles.footerBar} aria-label="Recent SDK releases">
          <header className={styles.footerHead}>
            <span className={styles.footerKicker}>Recent releases</span>
            <h2 className={styles.footerTitle}>@mufflermen/sdk changelog</h2>
          </header>
          <div className={styles.footerRows}>
            <SdkChangelogRow
              version="3.4.0"
              date="2026-05-21"
              categories={["added", "changed"]}
              summary="Add bay-availability streaming + retag quote.created events with bay_id."
              detail="Drop-in upgrade — existing webhook handlers continue receiving JSON."
            />
            <SdkChangelogRow
              version="3.3.2"
              date="2026-05-05"
              categories={["fixed"]}
              summary="Resolve Idempotency-Key collision when retrying quotes.create within 1s."
            />
            <SdkChangelogRow
              version="3.3.0"
              date="2026-04-18"
              categories={["added", "deprecated"]}
              summary="Add parts.lookup vector search. Deprecate parts.search — removal in v4.0."
            />
          </div>
        </section>
      </div>
    </main>
  )
}
