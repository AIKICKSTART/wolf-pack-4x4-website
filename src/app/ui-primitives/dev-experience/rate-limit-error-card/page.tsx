import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RateLimitErrorCard } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Rate-limit error card | UI Primitives — Dev experience",
}

const WARNING_BODY = `{
  "error": {
    "type": "rate_limit_exceeded",
    "message": "Quote creation rate-limit reached for workshop wsh_oak_flats.",
    "request_id": "req_01HQ8FK4ZJM7CVS3Y9VTBP2NTR",
    "limit": 120,
    "window_sec": 60
  }
}`

const CRITICAL_BODY = `{
  "error": {
    "type": "burst_limit_exceeded",
    "message": "Parts lookup burst limit reached — back off before retrying.",
    "request_id": "req_01HQ8FK6MRPP2XNZBBQH3CAYJN",
    "burst_limit": 50,
    "burst_window_sec": 1
  }
}`

export default function RateLimitErrorCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 05"
        title="Rate-limit error card"
        description="Sample HTTP 429 response — JSON body, Retry-After header chip, and a link to the back-off recipe."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Rate-limit error card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quotes.create — sliding-window cap</span>
          <RateLimitErrorCard
            tone="warning"
            endpoint="POST /v1/quotes"
            retryAfter="30"
            body={WARNING_BODY}
            backoffRecipeHref="/ui-primitives/dev-experience/rate-limit-error-card#backoff"
          />
          <RateLimitErrorCard
            tone="critical"
            endpoint="GET /v1/parts/lookup"
            retryAfter="2"
            body={CRITICAL_BODY}
            backoffRecipeHref="/ui-primitives/dev-experience/rate-limit-error-card#backoff"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tone drives the left border, status chip, and Retry-After pill. The endpoint
            chip is a single-line code tag — long paths truncate with an ellipsis. The
            entire section is labelled <code>HTTP 429 rate-limit error for {`{endpoint}`}</code>{" "}
            so a screen reader gets the verb + path together.
          </p>
        </div>
      </section>
    </main>
  )
}
