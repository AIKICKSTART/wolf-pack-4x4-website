import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./dev-experience.module.css"

export const metadata: Metadata = {
  title: "Dev experience | UI Primitives",
  description:
    "Developer-experience primitives for the Mufflermen API — SDK install switcher, quickstart step cards, multi-language code switcher, auth snippet card, rate-limit error card, cursor pagination, webhook payload sample, OpenAPI explorer, SDK changelog row, generic tabbed code switcher, inline copy button, output preview pane, SDK version selector, and TypeScript types preview — plus a full quickstart composition.",
}

interface Scene {
  index: string
  title: string
  href: string
  description: string
  accent: "teal" | "amber" | "red" | "green" | "purple" | "neutral"
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    index: "01",
    title: "SDK install snippet",
    href: "/ui-primitives/dev-experience/sdk-install-snippet",
    description:
      "Package manager switcher — npm / pnpm / yarn / bun — each rendering the matching install command with copy-per-tab.",
    accent: "teal",
    state: "Stateful · tabs + copy",
  },
  {
    index: "02",
    title: "Quickstart step card",
    href: "/ui-primitives/dev-experience/quickstart-step-card",
    description:
      "Single quickstart step — number chip, title, body, language-tagged code block, and a mark-done toggle.",
    accent: "amber",
    state: "Stateful · done toggle",
  },
  {
    index: "03",
    title: "Lang switcher tabs",
    href: "/ui-primitives/dev-experience/lang-switcher-tabs",
    description:
      "Multi-language code switcher — TypeScript / JavaScript / Python / Go / Ruby / cURL — each tab renders a code-block sample.",
    accent: "teal",
    state: "Stateful · tablist",
  },
  {
    index: "04",
    title: "Auth snippet card",
    href: "/ui-primitives/dev-experience/auth-snippet-card",
    description:
      "Auth example card — Bearer / API key / mTLS / OIDC variants with copy + open-in-Postman CTA.",
    accent: "green",
    state: "Stateful · variants",
  },
  {
    index: "05",
    title: "Rate-limit error card",
    href: "/ui-primitives/dev-experience/rate-limit-error-card",
    description:
      "Sample HTTP 429 response — JSON body, Retry-After header chip, and a link to the exponential back-off recipe.",
    accent: "amber",
    state: "Stateless · tone variants",
  },
  {
    index: "06",
    title: "Pagination cursor snippet",
    href: "/ui-primitives/dev-experience/pagination-cursor-snippet",
    description:
      "First-page request, response with next_cursor, then second-page request — three stacked code blocks with arrow rails.",
    accent: "teal",
    state: "Stateless · three steps",
  },
  {
    index: "07",
    title: "Webhook payload sample",
    href: "/ui-primitives/dev-experience/webhook-payload-sample",
    description:
      "Event-type chip, version + timestamp meta strip, signature header pill, and the full JSON payload body.",
    accent: "purple",
    state: "Stateless · meta-driven",
  },
  {
    index: "08",
    title: "OpenAPI explorer",
    href: "/ui-primitives/dev-experience/openapi-explorer",
    description:
      "Method chip + path + tabs (Parameters / Request body / Responses / Code samples) with a try-it CTA.",
    accent: "teal",
    state: "Stateful · tabs",
  },
  {
    index: "09",
    title: "SDK changelog row",
    href: "/ui-primitives/dev-experience/sdk-changelog-row",
    description:
      "Single changelog entry — version chip, date, categorised chips (Added / Changed / Fixed / Deprecated / Removed) and summary.",
    accent: "neutral",
    state: "Stateless · category chips",
  },
  {
    index: "10",
    title: "Tabbed code switcher",
    href: "/ui-primitives/dev-experience/tabbed-code-switcher",
    description:
      "Generic topic switcher — Initialize / Authenticate / First request — persistent state across tab clicks.",
    accent: "amber",
    state: "Stateful · topic tabs",
  },
  {
    index: "11",
    title: "Inline copy button",
    href: "/ui-primitives/dev-experience/inline-copy-button",
    description:
      "Tiny inline copy chip with a confirm-tone shift after click — for sprinkling on API keys, IDs, and short snippets.",
    accent: "green",
    state: "Stateful · copy state",
  },
  {
    index: "12",
    title: "Output preview pane",
    href: "/ui-primitives/dev-experience/output-preview-pane",
    description:
      "stdout / stderr / network / json tabs with tone-coded badges — for previewing CLI or SDK output.",
    accent: "teal",
    state: "Stateful · stream tabs",
  },
  {
    index: "13",
    title: "SDK version selector",
    href: "/ui-primitives/dev-experience/sdk-version-selector",
    description:
      "Version dropdown — current version, chips for stable / beta / canary, and an inline breaking-changes badge.",
    accent: "red",
    state: "Stateful · dropdown",
  },
  {
    index: "14",
    title: "TypeScript types preview",
    href: "/ui-primitives/dev-experience/typescript-types-preview",
    description:
      "Type definition pane with collapsible nested interfaces — every node toggles independently with aria-expanded.",
    accent: "teal",
    state: "Stateful · collapsible",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  purple: styles.accentPurple,
  neutral: styles.accentNeutral,
}

export default function DevExperiencePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 14 primitives + 1 composition"
        title="Ship the SDK"
        description="Developer-experience primitives for the @mufflermen/sdk surface — package-manager switchers, multi-language samples, auth snippets, rate-limit guidance, cursor pagination, webhook payloads, an OpenAPI explorer for quotes.create / parts.lookup / bookings.list, changelog rows, and a TypeScript types preview. Tuned for the Mufflermen instant-quote engine and bay-availability webhooks."
      />
      <section className={styles.section} aria-label="Dev-experience primitives index">
        <header>
          <span className={styles.kicker}>Index · 14 primitives + Full quickstart</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Every primitive renders at full scale in its own sub-route with realistic
            Mufflermen API data — <code>@mufflermen/sdk</code>, endpoints{" "}
            <code>quotes.create</code>, <code>parts.lookup</code>,{" "}
            <code>bookings.list</code>, webhook events <code>quote.created</code> and{" "}
            <code>invoice.paid</code>. Composition lives under{" "}
            <code>/full-quickstart</code>.
          </p>
        </header>
        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <Link
              key={scene.href}
              className={`${styles.thumb} ${ACCENT_CLASS[scene.accent]}`}
              href={scene.href}
            >
              <div className={styles.thumbHead}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <span className={styles.thumbState}>{scene.state}</span>
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={`${styles.thumb} ${styles.accentPurple}`}
            href="/ui-primitives/dev-experience/full-quickstart"
          >
            <div className={styles.thumbHead}>
              <span className={styles.thumbIndex}>15</span>
              <span className={styles.thumbState}>Composition · bonus</span>
            </div>
            <h3 className={styles.thumbTitle}>Full quickstart composition</h3>
            <p className={styles.thumbCopy}>
              SdkInstallSnippet on top, five QuickstartStepCards stacked, an
              AuthSnippetCard, a LangSwitcherTabs request example, the
              PaginationCursorSnippet, the WebhookPayloadSample, a SdkChangelogRow
              footer, and an SdkVersionSelector pinned top-right.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
