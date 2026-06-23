/**
 * Component documentation manifest — `states` family.
 *
 * Full-page status surfaces: 404 / 500 / maintenance / account-locked /
 * payment-required / region-blocked / empty-inbox / empty-results / offline /
 * slow-connection / coming-soon / success-confirmed. Each is a centered, themed
 * state screen with a headline, message, contextual metadata, and optional
 * primary/secondary action slots. Sourced READ-ONLY from
 * `src/app/ui-primitives/components/states`.
 *
 * Every design value is referenced as a central `--primitive-*` token name.
 */

import type {
  ComponentDocEntry,
  ComponentDocFamily,
  DocAccessibilityNotes,
  DocCmsCompatibility,
  DocResponsiveNotes,
  PropsSchemaLike,
} from "./states.shared"
import {
  STATE_A11Y,
  STATE_CMS,
  STATE_RESPONSIVE,
  STATE_TOKENS,
} from "./states.shared"

const COMPONENT_PATH = "@/app/ui-primitives/components/states"

/** Common headline + message + action fields every state screen shares. */
const BASE_FIELDS: PropsSchemaLike = [
  { key: "headline", type: "string", required: false, description: "State heading; sensible default per state." },
  { key: "message", type: "string", required: false, description: "Supporting copy; sensible default per state." },
  { key: "primaryAction", type: "json", required: false, description: "Primary action slot (e.g. a button)." },
  { key: "secondaryAction", type: "json", required: false, description: "Secondary action slot." },
]

const a11y: DocAccessibilityNotes = STATE_A11Y
const responsive: DocResponsiveNotes = STATE_RESPONSIVE
const cms: DocCmsCompatibility = STATE_CMS

const notFound: ComponentDocEntry = {
  key: "states/state-not-found",
  importName: "StateNotFound",
  name: "Not found (404)",
  summary: "404 screen with error code, route hint, and suggested routes.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/not-found",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "errorCode", type: "string", required: false },
      { key: "routeHint", type: "string", required: false },
      { key: "suggestedRoutes", type: "array", required: false, description: "StateNotFoundRoute list." },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "compass", importPath: "lucide-react", usage: "lost/navigation glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { errorCode: "404", routeHint: "/parts/unknown" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A 404 page with suggested routes.",
    code: `import { StateNotFound } from "@/app/ui-primitives/components/states"

export default function NotFound() {
  return (
    <StateNotFound
      routeHint="/parts/unknown"
      suggestedRoutes={[
        { label: "Browse parts", href: "/parts" },
        { label: "Book a service", href: "/book" },
      ]}
      primaryAction={<a href="/">Back home</a>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateNotFound.", "Render from a route's not-found boundary.", "Offer suggested routes."] },
  accessibility: a11y,
  responsive,
  cms: { ...cms, notes: ["Use as a route not-found boundary; copy is owner-editable."] },
  agent: {
    whenToUse: "Use for missing-route / 404 screens.",
    steps: ["Render in the not-found boundary.", "Provide recovery routes."],
    pitfalls: ["Keep suggested routes valid."],
  },
  tags: ["404", "error", "empty-state"],
}

const serverError: ComponentDocEntry = {
  key: "states/state-server-error",
  importName: "StateServerError",
  name: "Server error (500)",
  summary: "500 screen with error code, incident id, and timestamp.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/server-error",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "errorCode", type: "string", required: false },
      { key: "incidentId", type: "string", required: false },
      { key: "occurredAt", type: "string", required: false },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "server-crash", importPath: "lucide-react", usage: "fault glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { errorCode: "500", incidentId: "INC-4821" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A 500 page with an incident id.",
    code: `import { StateServerError } from "@/app/ui-primitives/components/states"

export default function Error() {
  return (
    <StateServerError
      incidentId="INC-4821"
      occurredAt="2:14 PM"
      primaryAction={<button onClick={() => location.reload()}>Retry</button>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateServerError.", "Render in an error boundary.", "Surface the incident id for support."] },
  accessibility: a11y,
  responsive,
  cms: { ...cms, notes: ["Use in an error boundary; copy is owner-editable."] },
  agent: {
    whenToUse: "Use for unhandled server/runtime failures.",
    steps: ["Render in error.tsx.", "Provide a retry action."],
    pitfalls: ["Do not leak stack traces in the message."],
  },
  tags: ["500", "error"],
}

const maintenance: ComponentDocEntry = {
  key: "states/state-maintenance",
  importName: "StateMaintenance",
  name: "Maintenance",
  summary: "Scheduled-maintenance window screen with start/end and affected surface.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/maintenance",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "startsAt", type: "string", required: false },
      { key: "endsAt", type: "string", required: false },
      { key: "affectedSurface", type: "string", required: false },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "wrench", importPath: "lucide-react", usage: "maintenance glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { affectedSurface: "Online booking" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A maintenance window screen.",
    code: `import { StateMaintenance } from "@/app/ui-primitives/components/states"

export default function Maintenance() {
  return (
    <StateMaintenance
      startsAt="2:00 PM"
      endsAt="3:00 PM"
      affectedSurface="Online booking"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateMaintenance.", "Show during a maintenance window.", "State the window times."] },
  accessibility: a11y,
  responsive,
  cms: { ...cms, notes: ["Toggle via a maintenance flag; copy is owner-editable."] },
  agent: {
    whenToUse: "Use during planned downtime.",
    steps: ["Gate behind a maintenance flag.", "Provide the window times."],
    pitfalls: ["Keep times in the user's locale."],
  },
  tags: ["maintenance", "downtime"],
}

const accountLocked: ComponentDocEntry = {
  key: "states/state-account-locked",
  importName: "StateAccountLocked",
  name: "Account locked",
  summary: "Locked-account screen with account ref, locked-at, and reasons list.",
  category: "Auth",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/account-locked",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "accountRef", type: "string", required: false },
      { key: "lockedAt", type: "string", required: false },
      { key: "reasons", type: "array", required: false, items: { key: "reason", type: "string", required: true } },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "lock", importPath: "lucide-react", usage: "locked glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { accountRef: "AC-9931" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A locked-account screen.",
    code: `import { StateAccountLocked } from "@/app/ui-primitives/components/states"

export default function Locked() {
  return (
    <StateAccountLocked
      accountRef="AC-9931"
      reasons={["Too many failed sign-ins"]}
      primaryAction={<a href="/support">Contact support</a>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateAccountLocked.", "Render when an account is locked.", "List the lock reasons."] },
  accessibility: a11y,
  responsive,
  cms: { ...cms, notes: ["Auth-flow state; copy is owner-editable."] },
  agent: {
    whenToUse: "Use when a user account is locked.",
    steps: ["Render after a lock decision.", "Offer a recovery path."],
    pitfalls: ["Do not reveal sensitive security detail."],
  },
  tags: ["auth", "locked", "security"],
}

const paymentRequired: ComponentDocEntry = {
  key: "states/state-payment-required",
  importName: "StatePaymentRequired",
  name: "Payment required",
  summary: "Billing-gate screen with plan summary.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/payment-required",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "plan", type: "object", required: false, description: "StatePaymentRequiredPlan summary." },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "credit-card", importPath: "lucide-react", usage: "billing glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A payment-required gate.",
    code: `import { StatePaymentRequired } from "@/app/ui-primitives/components/states"

export default function Billing() {
  return (
    <StatePaymentRequired
      plan={{ name: "Workshop Pro", price: "$49/mo" }}
      primaryAction={<a href="/billing">Update payment</a>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StatePaymentRequired.", "Gate paid features behind it.", "Link to billing."] },
  accessibility: a11y,
  responsive,
  cms: { ...cms, notes: ["Billing gate; copy is owner-editable."] },
  agent: {
    whenToUse: "Use to gate features behind active billing.",
    steps: ["Render on payment-required.", "Link to the billing flow."],
    pitfalls: ["Match the plan summary to live billing data."],
  },
  tags: ["billing", "paywall", "commerce"],
}

const regionBlocked: ComponentDocEntry = {
  key: "states/state-region-blocked",
  importName: "StateRegionBlocked",
  name: "Region blocked",
  summary: "Geo-restriction screen with detected/supported regions and a VPN note.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/region-blocked",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "detectedRegion", type: "string", required: false },
      { key: "supportedRegions", type: "array", required: false, items: { key: "region", type: "string", required: true } },
      { key: "vpnNote", type: "string", required: false },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "globe", importPath: "lucide-react", usage: "region glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { detectedRegion: "US" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A geo-restriction screen.",
    code: `import { StateRegionBlocked } from "@/app/ui-primitives/components/states"

export default function Blocked() {
  return (
    <StateRegionBlocked
      detectedRegion="US"
      supportedRegions={["AU", "NZ"]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateRegionBlocked.", "Render on a geo block.", "List supported regions."] },
  accessibility: a11y,
  responsive,
  cms,
  agent: {
    whenToUse: "Use when content is geo-restricted.",
    steps: ["Render after a geo check.", "Explain supported regions."],
    pitfalls: ["Avoid encouraging policy circumvention."],
  },
  tags: ["geo", "blocked"],
}

const emptyInbox: ComponentDocEntry = {
  key: "states/state-empty-inbox",
  importName: "StateEmptyInbox",
  name: "Empty inbox",
  summary: "Zero-message inbox state with summary stats.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/empty-inbox",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "stats", type: "array", required: false, description: "StateEmptyInboxStat list." },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "inbox", importPath: "lucide-react", usage: "inbox glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "An empty inbox state.",
    code: `import { StateEmptyInbox } from "@/app/ui-primitives/components/states"

export function Inbox() {
  return (
    <StateEmptyInbox
      stats={[{ label: "Archived", value: "128" }]}
      primaryAction={<button>Compose</button>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateEmptyInbox.", "Render when the inbox is empty.", "Offer a primary action."] },
  accessibility: a11y,
  responsive,
  cms,
  agent: {
    whenToUse: "Use for an empty message/inbox list.",
    steps: ["Render on zero items.", "Provide a get-started action."],
    pitfalls: ["Avoid implying an error — this is an OK empty state."],
  },
  tags: ["empty", "inbox"],
}

const emptyResults: ComponentDocEntry = {
  key: "states/state-empty-results",
  importName: "StateEmptyResults",
  name: "Empty results",
  summary: "No-search-results state with the query echoed and suggestions.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/empty-results",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "query", type: "string", required: false },
      { key: "suggestions", type: "array", required: false, items: { key: "suggestion", type: "string", required: true } },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "search-x", importPath: "lucide-react", usage: "no-results glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { query: "resonator" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A no-results state.",
    code: `import { StateEmptyResults } from "@/app/ui-primitives/components/states"

export function Results({ query }: { query: string }) {
  return (
    <StateEmptyResults
      query={query}
      suggestions={["muffler", "exhaust"]}
      onSuggestionSelect={(s) => search(s)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateEmptyResults.", "Render when a search returns nothing.", "Offer suggestions."] },
  accessibility: a11y,
  responsive,
  cms,
  agent: {
    whenToUse: "Use when a query yields no matches.",
    steps: ["Echo the query.", "Suggest alternatives.", "Handle onSuggestionSelect."],
    pitfalls: ["Do not blame the user for empty results."],
  },
  tags: ["empty", "search"],
}

const offline: ComponentDocEntry = {
  key: "states/state-offline",
  importName: "StateOffline",
  name: "Offline",
  summary: "No-connection state with retry count, last-online time, and a cached-data note.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/offline",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "retryCount", type: "number", required: false, min: 0 },
      { key: "lastOnlineAt", type: "string", required: false },
      { key: "cachedDataNote", type: "string", required: false },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "wifi-off", importPath: "lucide-react", usage: "offline glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { retryCount: 2 }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "An offline state.",
    code: `import { StateOffline } from "@/app/ui-primitives/components/states"

export function Offline() {
  return (
    <StateOffline
      retryCount={2}
      lastOnlineAt="2:10 PM"
      primaryAction={<button onClick={() => retry()}>Retry</button>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateOffline.", "Render on connection loss.", "Offer a retry action."] },
  accessibility: a11y,
  responsive,
  cms,
  agent: {
    whenToUse: "Use when the client loses connectivity.",
    steps: ["Detect offline.", "Provide retry."],
    pitfalls: ["Track retryCount to avoid hammering the network."],
  },
  tags: ["offline", "network"],
}

const slowConnection: ComponentDocEntry = {
  key: "states/state-slow-connection",
  importName: "StateSlowConnection",
  name: "Slow connection",
  summary: "Degraded-network state with ping/throughput labels and a lite-mode action.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/slow-connection",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "pingLabel", type: "string", required: false },
      { key: "throughputLabel", type: "string", required: false },
      { key: "liteAction", type: "json", required: false, description: "Switch-to-lite-mode action slot." },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "gauge", importPath: "lucide-react", usage: "throughput glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { pingLabel: "820ms" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A slow-connection state.",
    code: `import { StateSlowConnection } from "@/app/ui-primitives/components/states"

export function Slow() {
  return (
    <StateSlowConnection
      pingLabel="820ms"
      throughputLabel="0.4 Mbps"
      liteAction={<button onClick={() => enableLite()}>Switch to lite mode</button>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateSlowConnection.", "Render on degraded throughput.", "Offer a lite-mode toggle."] },
  accessibility: a11y,
  responsive,
  cms,
  agent: {
    whenToUse: "Use when network quality is poor but present.",
    steps: ["Detect slowness.", "Offer a lite mode."],
    pitfalls: ["Differentiate from full offline."],
  },
  tags: ["network", "slow"],
}

const comingSoon: ComponentDocEntry = {
  key: "states/state-coming-soon",
  importName: "StateComingSoon",
  name: "Coming soon",
  summary: "Pre-launch screen with a countdown and a waitlist email capture.",
  category: "Marketing",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/coming-soon",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "launchAt", type: "string", required: false },
      { key: "countdownParts", type: "array", required: false, description: "StateComingSoonCountdownPart list." },
      { key: "waitlistLabel", type: "string", required: false },
      { key: "emailPlaceholder", type: "string", required: false },
      { key: "submitLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: STATE_TOKENS,
  iconDependencies: [{ name: "rocket", importPath: "lucide-react", usage: "launch glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { waitlistLabel: "Join the waitlist" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A pre-launch waitlist screen.",
    code: `import { StateComingSoon } from "@/app/ui-primitives/components/states"

export default function ComingSoon() {
  return (
    <StateComingSoon
      launchAt="2026-07-01"
      waitlistLabel="Join the waitlist"
      onWaitlistSubmit={(email) => subscribe(email)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateComingSoon.", "Set launchAt.", "Handle onWaitlistSubmit."] },
  accessibility: {
    ...a11y,
    requiresLabel: false,
    keyboard: ["Email field + submit are focusable", "Enter submits the waitlist form"],
  },
  responsive,
  cms: { ...cms, cmsBlock: true, blockType: "states/coming-soon", notes: ["Launch landing surface; copy + countdown are owner-editable."] },
  agent: {
    whenToUse: "Use as a pre-launch landing page.",
    steps: ["Set the launch date.", "Capture waitlist emails."],
    pitfalls: ["Validate the email before subscribing."],
  },
  tags: ["launch", "waitlist", "marketing"],
}

const successConfirmed: ComponentDocEntry = {
  key: "states/state-success-confirmed",
  importName: "StateSuccessConfirmed",
  name: "Success confirmed",
  summary: "Confirmation screen with a summary table and optional confetti.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/states/success-confirmed",
  propsSchema: {
    fields: [
      ...BASE_FIELDS,
      { key: "summary", type: "array", required: false, description: "StateSuccessConfirmedSummaryRow list." },
      { key: "celebrate", type: "boolean", required: false, description: "Fire confetti on mount." },
    ],
  },
  tokenDependencies: [
    ...STATE_TOKENS,
    { token: "--primitive-green", category: "color", usage: "success accent" },
  ],
  iconDependencies: [{ name: "check-circle-2", importPath: "lucide-react", usage: "success glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { celebrate: false }, background: "canvas", aspectRatio: "16/9", animate: false },
  codeExample: {
    language: "tsx",
    caption: "A confirmation screen.",
    code: `import { StateSuccessConfirmed } from "@/app/ui-primitives/components/states"

export default function Confirmed() {
  return (
    <StateSuccessConfirmed
      summary={[
        { label: "Booking", value: "Tue 9:00 AM" },
        { label: "Bay", value: "2" },
      ]}
      celebrate
      primaryAction={<a href="/">Done</a>}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StateSuccessConfirmed.", "Render after a successful action.", "Pass a summary of what happened."] },
  accessibility: {
    ...a11y,
    notes: ["Confetti is suppressed under prefers-reduced-motion."],
  },
  responsive,
  cms,
  agent: {
    whenToUse: "Use as a terminal success/confirmation screen.",
    steps: ["Render after success.", "Summarise the outcome.", "Optionally celebrate."],
    pitfalls: ["Only celebrate for meaningful wins."],
  },
  tags: ["success", "confirmation"],
}

const entries: readonly ComponentDocEntry[] = [
  notFound,
  serverError,
  maintenance,
  accountLocked,
  paymentRequired,
  regionBlocked,
  emptyInbox,
  emptyResults,
  offline,
  slowConnection,
  comingSoon,
  successConfirmed,
]

const statesDocs: ComponentDocFamily = {
  family: "states",
  title: "Status states",
  group: "System",
  summary:
    "Full-page status surfaces: 404 / 500 / maintenance / account-locked / payment-required / region-blocked / empty-inbox / empty-results / offline / slow-connection / coming-soon / success-confirmed — each centered, themed, with headline, message, contextual metadata, and action slots.",
  importPath: COMPONENT_PATH,
  entries,
}

export default statesDocs
