import type {
  DocsArticleMeta,
  DocsArticleSummary,
  DocsBreadcrumbCrumb,
  DocsCategoryFilter,
  DocsChangelogEntry,
  DocsCommitInfo,
  DocsContributor,
  DocsGlossaryEntry,
  DocsNavTarget,
  DocsPageTreeNode,
  DocsRelatedArticle,
  DocsSearchGroup,
  DocsTocItem,
  DocsVersion,
  MdxBlock,
} from "../components/docs-suite"

export const DOCS_AUTHOR: DocsContributor = {
  initials: "DF",
  name: "Daniel Fleuren",
  role: "Writer · Oak Flats",
}

export const DOCS_EDITOR: DocsContributor = {
  initials: "MP",
  name: "Mia Pham",
  role: "Editor · Trade Desk",
}

export const DOCS_CONTRIBUTORS: ReadonlyArray<DocsContributor> = [
  { initials: "TH", name: "Tom Halloran", role: "Workshop manager" },
  { initials: "JS", name: "Jordie Singh", role: "Trade lead" },
  { initials: "EB", name: "Erin Beavis", role: "Hermes maintainer" },
]

export const DOCS_VERSIONS: ReadonlyArray<DocsVersion> = [
  {
    id: "v1.0",
    label: "v1.0",
    releasedAt: "12 Aug 2024",
    releasedIso: "2024-08-12",
  },
  {
    id: "v2.0",
    label: "v2.0",
    isCurrent: true,
    releasedAt: "04 Mar 2026",
    releasedIso: "2026-03-04",
  },
  {
    id: "v3.0-beta",
    label: "v3.0 beta",
    isBreaking: true,
    releasedAt: "18 May 2026",
    releasedIso: "2026-05-18",
  },
]

export const DOCS_CATEGORIES: ReadonlyArray<DocsCategoryFilter> = [
  { id: "operator-manual", label: "Operator Manual", count: 3 },
  { id: "trade-account-api", label: "Trade Account API", count: 2 },
  { id: "pricing-engine", label: "Pricing Engine", count: 2 },
  { id: "hermes-chat-playbook", label: "Hermes Chat", count: 1 },
]

export const DOCS_ARTICLES: ReadonlyArray<DocsArticleSummary> = [
  {
    id: "om-shift-open",
    title: "Opening a shift on the workshop floor",
    surface: "operator-manual",
    surfaceLabel: "Operator Manual",
    category: "operator-manual",
    excerpt:
      "Pre-shift checklist that covers hoist safety, bay clearance, and tool calibration before the first job is signed in.",
    difficulty: "starter",
    readMinutes: 4,
    updatedAt: "24 May 2026 · 8:02 AEST",
    updatedIso: "2026-05-24T08:02:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "om-job-handoff",
    title: "Handing a job to the bay supervisor",
    surface: "operator-manual",
    surfaceLabel: "Operator Manual",
    category: "operator-manual",
    excerpt:
      "Two-minute handoff protocol — what the supervisor must read aloud, what the customer must sign, what gets logged.",
    difficulty: "intermediate",
    readMinutes: 6,
    updatedAt: "22 May 2026 · 14:11 AEST",
    updatedIso: "2026-05-22T14:11:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "om-incident",
    title: "Reporting a near-miss incident",
    surface: "operator-manual",
    surfaceLabel: "Operator Manual",
    category: "operator-manual",
    excerpt:
      "Triage matrix, photo evidence checklist, and the WorkSafe NSW form that auto-files within 60 minutes.",
    difficulty: "advanced",
    readMinutes: 9,
    updatedAt: "19 May 2026 · 16:44 AEST",
    updatedIso: "2026-05-19T16:44:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "ta-tokens",
    title: "Issuing a trade account API token",
    surface: "trade-account-api",
    surfaceLabel: "Trade Account API",
    category: "trade-account-api",
    excerpt:
      "Per-supplier scoped tokens, rotation cadence, and the 90-day audit log every supplier portal honours.",
    difficulty: "intermediate",
    readMinutes: 5,
    updatedAt: "21 May 2026 · 10:32 AEST",
    updatedIso: "2026-05-21T10:32:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "ta-stock-sync",
    title: "Subscribing to the live stock sync stream",
    surface: "trade-account-api",
    surfaceLabel: "Trade Account API",
    category: "trade-account-api",
    excerpt:
      "Server-Sent Events stream that publishes Magnaflow stock deltas every 30 seconds for the active warehouse.",
    difficulty: "advanced",
    readMinutes: 11,
    updatedAt: "20 May 2026 · 11:08 AEST",
    updatedIso: "2026-05-20T11:08:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "pe-margin",
    title: "Configuring the 28% margin floor",
    surface: "pricing-engine",
    surfaceLabel: "Pricing Engine",
    category: "pricing-engine",
    excerpt:
      "Floor enforcement, override audit trail, and the director sign-off webhook that the bay terminal calls home with.",
    difficulty: "intermediate",
    readMinutes: 7,
    updatedAt: "18 May 2026 · 09:21 AEST",
    updatedIso: "2026-05-18T09:21:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "pe-rebate",
    title: "Stacking quarterly supplier rebates",
    surface: "pricing-engine",
    surfaceLabel: "Pricing Engine",
    category: "pricing-engine",
    excerpt:
      "Magnaflow ANZ + Pacemaker rebate stacking, the supplier ledger settlement, and the 14-day clearing window.",
    difficulty: "advanced",
    readMinutes: 8,
    updatedAt: "16 May 2026 · 13:55 AEST",
    updatedIso: "2026-05-16T13:55:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
  {
    id: "hp-playbook",
    title: "Hermes after-hours fallback playbook",
    surface: "hermes-chat-playbook",
    surfaceLabel: "Hermes Chat",
    category: "hermes-chat-playbook",
    excerpt:
      "What the chat agent says when the workshop is closed, when it escalates to phone, and what it never promises.",
    difficulty: "starter",
    readMinutes: 4,
    updatedAt: "23 May 2026 · 21:42 AEST",
    updatedIso: "2026-05-23T21:42:00+10:00",
    href: "/ui-primitives/docs-suite/article-browser",
  },
]

export const DOCS_TOC: ReadonlyArray<DocsTocItem> = [
  { id: "intro", label: "Why this exists", depth: 2 },
  { id: "before-you-start", label: "Before you start", depth: 2 },
  { id: "before-you-start-keys", label: "Pre-issued keys", depth: 3 },
  { id: "before-you-start-env", label: "Sandbox env vars", depth: 3 },
  { id: "issuing-a-token", label: "Issuing the token", depth: 2 },
  { id: "issuing-a-token-curl", label: "Curl example", depth: 3 },
  { id: "issuing-a-token-error", label: "Error envelope", depth: 4 },
  { id: "rotation", label: "Rotation cadence", depth: 2 },
  { id: "rotation-window", label: "Grace window", depth: 3 },
  { id: "auditing", label: "Auditing access", depth: 2 },
]

export const DOCS_BLOCKS: ReadonlyArray<MdxBlock> = [
  {
    kind: "prose",
    id: "intro",
    html: `<h2>Why this exists</h2><p>The trade account API exists so supplier portals can read stock and write order intent without sitting in front of the Mufflermen workshop terminal. Every endpoint here is scoped per-supplier and audited.</p>`,
  },
  {
    kind: "note",
    id: "note-1",
    title: "Mufflermen-only header",
    body: "Every request must include the X-Mufflermen-Workshop header naming the issuing workshop (oak-flats, dapto, kiama).",
  },
  {
    kind: "prose",
    id: "before-you-start",
    html: `<h2>Before you start</h2><h3 id="before-you-start-keys">Pre-issued keys</h3><p>Your portal admin pre-provisions two keys — one production, one sandbox. They never share the same prefix.</p><h3 id="before-you-start-env">Sandbox env vars</h3><p>Sandbox keys are prefixed <code>sandbox_</code>. Production keys are prefixed <code>live_</code>. Anything else is a forgery.</p>`,
  },
  {
    kind: "code",
    id: "issuing-a-token-curl",
    language: "bash",
    filename: "issue-token.sh",
    code: `curl -X POST https://trade.mufflermen.com.au/v2/tokens \\
  -H "Authorization: Bearer $MUFFLERMEN_ADMIN_KEY" \\
  -H "X-Mufflermen-Workshop: oak-flats" \\
  -d '{"supplier":"magnaflow-anz","scopes":["stock.read","orders.write"]}'`,
  },
  {
    kind: "warning",
    id: "warn-1",
    title: "Never log raw token bodies",
    body: "The response includes the raw token only once. Persist it to your secret store and never log it. Subsequent reads return a fingerprint only.",
  },
  {
    kind: "diff",
    id: "issuing-a-token-error",
    filename: "error-envelope.diff",
    lines: [
      { type: "context", text: '  "status": 400,' },
      { type: "removed", text: '  "error": "bad request"' },
      { type: "added", text: '  "error": {' },
      { type: "added", text: '    "code": "scope_not_allowed",' },
      { type: "added", text: '    "scope": "billing.read"' },
      { type: "added", text: "  }" },
    ],
  },
  {
    kind: "tabs",
    id: "issuing-a-token-tabs",
    tabs: [
      {
        id: "ts",
        label: "TypeScript",
        language: "ts",
        code: `import { TradeClient } from "@mufflermen/trade"

const client = new TradeClient({
  workshop: "oak-flats",
  adminKey: process.env.MUFFLERMEN_ADMIN_KEY!,
})

const token = await client.tokens.issue({
  supplier: "magnaflow-anz",
  scopes: ["stock.read", "orders.write"],
})`,
      },
      {
        id: "py",
        label: "Python",
        language: "py",
        code: `from mufflermen_trade import TradeClient

client = TradeClient(
    workshop="oak-flats",
    admin_key=os.environ["MUFFLERMEN_ADMIN_KEY"],
)

token = client.tokens.issue(
    supplier="magnaflow-anz",
    scopes=["stock.read", "orders.write"],
)`,
      },
    ],
  },
  {
    kind: "prose",
    id: "rotation",
    html: `<h2>Rotation cadence</h2><h3 id="rotation-window">Grace window</h3><p>Tokens rotate every 90 days. The old token is honoured for 24 hours after the new one is issued so portals can roll over without downtime.</p>`,
  },
  {
    kind: "prose",
    id: "auditing",
    html: `<h2>Auditing access</h2><p>Every call logs to <code>audit.tokens.v2</code> with the calling IP, scopes used, and the supplier identifier. Logs retain for 18 months.</p>`,
  },
]

export const DOCS_META: DocsArticleMeta = {
  versionLabel: "v2.0",
  versionIso: "2026-03-04",
  publishedLabel: "04 Mar 2026 · 09:00 AEST",
  publishedIso: "2026-03-04T09:00:00+10:00",
  updatedLabel: "24 May 2026 · 11:18 AEST",
  updatedIso: "2026-05-24T11:18:00+10:00",
  author: DOCS_AUTHOR,
  editor: DOCS_EDITOR,
  contributors: DOCS_CONTRIBUTORS,
}

export const DOCS_PREVIOUS: DocsNavTarget = {
  title: "Authentication overview",
  href: "/ui-primitives/docs-suite/article-browser",
  category: "Trade Account API",
  relationHint: "Read this first if you have not used the trade API before",
}

export const DOCS_NEXT: DocsNavTarget = {
  title: "Subscribing to the live stock stream",
  href: "/ui-primitives/docs-suite/related-articles",
  category: "Trade Account API",
  relationHint: "Most callers wire up the SSE stream right after issuing a token",
}

export const DOCS_BREADCRUMB: ReadonlyArray<DocsBreadcrumbCrumb> = [
  { label: "Docs", href: "/ui-primitives/docs-suite" },
  { label: "Trade Account API", href: "/ui-primitives/docs-suite/article-browser" },
  { label: "Issuing a trade account API token" },
]

export const DOCS_PAGE_TREE: ReadonlyArray<DocsPageTreeNode> = [
  { label: "Authentication overview", href: "/ui-primitives/docs-suite/article-browser" },
  {
    label: "Issuing a trade account API token",
    href: "/ui-primitives/docs-suite/breadcrumb-doc-trail",
    isCurrent: true,
  },
  { label: "Subscribing to the live stock stream", href: "/ui-primitives/docs-suite/related-articles" },
  { label: "Error envelopes & retry semantics", href: "/ui-primitives/docs-suite/api-reference-card" },
]

export const DOCS_SEARCH_GROUPS: ReadonlyArray<DocsSearchGroup> = [
  {
    id: "manual",
    kind: "manual",
    label: "Operator Manual",
    items: [
      {
        id: "sm-1",
        title: "Opening a shift on the workshop floor",
        snippet: "Pre-shift checklist for hoist safety + tool calibration.",
        href: "/ui-primitives/docs-suite/article-browser",
        surfaceLabel: "Manual",
      },
      {
        id: "sm-2",
        title: "Bay supervisor handoff script",
        snippet: "Two-minute spoken handoff before signing the job in.",
        href: "/ui-primitives/docs-suite/article-browser",
        surfaceLabel: "Manual",
      },
    ],
  },
  {
    id: "api",
    kind: "api",
    label: "Trade Account API",
    items: [
      {
        id: "sa-1",
        title: "POST /v2/tokens",
        snippet: "Issue a scoped trade account API token for a supplier portal.",
        href: "/ui-primitives/docs-suite/api-reference-card",
        surfaceLabel: "API",
      },
      {
        id: "sa-2",
        title: "GET /v2/stock/stream",
        snippet: "SSE stream of stock deltas for the active warehouse.",
        href: "/ui-primitives/docs-suite/api-reference-card",
        surfaceLabel: "API",
      },
    ],
  },
  {
    id: "playbook",
    kind: "playbook",
    label: "Hermes Chat Playbook",
    items: [
      {
        id: "sp-1",
        title: "After-hours fallback prompt",
        snippet: "Exact wording Hermes uses when the workshop is closed.",
        href: "/ui-primitives/docs-suite/article-browser",
        surfaceLabel: "Playbook",
      },
    ],
  },
  {
    id: "history",
    kind: "history",
    label: "Recent",
    items: [
      {
        id: "sh-1",
        title: "Margin floor configuration",
        snippet: "Last opened 2 minutes ago",
        href: "/ui-primitives/docs-suite/article-browser",
        surfaceLabel: "History",
      },
    ],
  },
]

export const DOCS_RELATED: ReadonlyArray<DocsRelatedArticle> = [
  {
    id: "rel-1",
    title: "Rotating supplier tokens without downtime",
    surfaceLabel: "Trade Account API",
    href: "/ui-primitives/docs-suite/related-articles",
    readMinutes: 6,
    excerpt: "Use the 24-hour grace window to roll keys in production without a quiet hour.",
  },
  {
    id: "rel-2",
    title: "Audit log retention policy",
    surfaceLabel: "Operator Manual",
    href: "/ui-primitives/docs-suite/related-articles",
    readMinutes: 4,
    excerpt: "Eighteen months hot, seven years cold. WorkSafe NSW gets the cold tier on demand.",
  },
  {
    id: "rel-3",
    title: "Magnaflow ANZ rebate stacking",
    surfaceLabel: "Pricing Engine",
    href: "/ui-primitives/docs-suite/related-articles",
    readMinutes: 8,
    excerpt: "Quarter-close settlement lands fourteen calendar days after the supplier ledger seals.",
  },
]

export const DOCS_GLOSSARY: DocsGlossaryEntry = {
  term: "Margin floor",
  definition:
    "The minimum allowable gross margin on any quote line. Mufflermen sets this at 28% — quotes below the floor block on save and require director sign-off in the audit log.",
  href: "/ui-primitives/docs-suite/article-browser",
}

export const DOCS_CHANGELOG: ReadonlyArray<DocsChangelogEntry> = [
  {
    id: "cl-1",
    kind: "added",
    summary: "POST /v2/tokens now returns the fingerprint alongside the raw token",
    occurredAt: "24 May 2026 · 11:18 AEST",
    occurredIso: "2026-05-24T11:18:00+10:00",
    href: "/ui-primitives/docs-suite/changelog-strip",
  },
  {
    id: "cl-2",
    kind: "fixed",
    summary: "Sandbox tokens no longer leak across workshops in the audit envelope",
    occurredAt: "21 May 2026 · 09:04 AEST",
    occurredIso: "2026-05-21T09:04:00+10:00",
    href: "/ui-primitives/docs-suite/changelog-strip",
  },
  {
    id: "cl-3",
    kind: "changed",
    summary: "Rotation cadence dropped from 120 days to 90 days",
    occurredAt: "18 May 2026 · 13:42 AEST",
    occurredIso: "2026-05-18T13:42:00+10:00",
    href: "/ui-primitives/docs-suite/changelog-strip",
  },
  {
    id: "cl-4",
    kind: "deprecated",
    summary: "X-Mufflermen-Branch header — use X-Mufflermen-Workshop instead",
    occurredAt: "12 May 2026 · 16:10 AEST",
    occurredIso: "2026-05-12T16:10:00+10:00",
  },
]

export const DOCS_COMMIT: DocsCommitInfo = {
  sha: "8b6d95e9c1f3a2",
  message: "docs(trade-api): clarify rotation grace window for sandbox keys",
  authorInitials: "DF",
  authorName: "Daniel Fleuren",
  committedAt: "24 May 2026 · 11:18 AEST",
  committedIso: "2026-05-24T11:18:00+10:00",
}
