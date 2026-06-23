/**
 * Data-display family — component documentation manifest (docs-1).
 *
 * Read-only docs for the dashboard/data presentation primitives: tables, cards,
 * metrics, feeds, inboxes, badges, kanban, and media trays. Token-driven only.
 *
 * Source of truth: src/app/ui-primitives/components/data-display/*.tsx (read-only).
 */

import { DEFAULT_ACCESSIBILITY_RULES } from "../model"
import type { TokenDependency } from "../model"
import type { ComponentDocFamily } from "./types"

const BARREL = "@/app/ui-primitives/components/data-display"

/** Tokens shared by most surface-backed cards in this family. */
const CARD_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-card-bg", category: "color", usage: "card fill" },
  { token: "--primitive-line", category: "color", usage: "hairline border" },
  { token: "--primitive-body", category: "color", usage: "body text" },
  { token: "--primitive-muted", category: "color", usage: "secondary text" },
  { token: "--primitive-text-strong", category: "color", usage: "value / heading text" },
  { token: "--primitive-radius-lg", category: "radius", usage: "card radius" },
  { token: "--primitive-card-shadow", category: "shadow", usage: "card lift" },
]

const TONE_STATUS_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-teal", category: "color", usage: "info / success tone" },
  { token: "--primitive-green", category: "color", usage: "success tone" },
  { token: "--primitive-amber", category: "color", usage: "warn tone" },
  { token: "--primitive-red", category: "color", usage: "error tone" },
]

const dataDisplayDocs: ComponentDocFamily = {
  family: "data-display",
  title: "Data display",
  group: "Data",
  summary:
    "Dashboard presentation primitives — sortable/selectable data tables, KPI cards, metric rows, live activity feeds, notification inboxes, status badges, comparison + pricing tables, a kanban board, a live counter, and a media tray.",
  barrelPath: BARREL,
  entries: [
    {
      manifest: {
        type: "data-display/data-table",
        name: "Data Table",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Generic sortable, optionally selectable table with density + zebra striping and a sticky caption.",
        componentPath: BARREL,
        importName: "DataTable",
        propsSchema: {
          fields: [
            { key: "rows", type: "array", required: true, items: { key: "row", type: "object", required: true }, description: "Row data (generic T)." },
            { key: "columns", type: "array", required: true, description: "DataTableColumn<T>: { id, header, cell(row)=>node, sortable?, align?, width? }." },
            { key: "getRowId", type: "json", required: true, description: "(row, index) => string row-key resolver." },
            { key: "density", type: "enum", required: false, options: ["compact", "comfortable", "wide"], description: "Defaults to \"comfortable\"." },
            { key: "selectable", type: "boolean", required: false, description: "Adds a select-all + per-row checkbox column. Defaults false." },
            { key: "zebra", type: "boolean", required: false, description: "Alternating row tint. Defaults true." },
            { key: "caption", type: "string", required: false },
            { key: "kicker", type: "string", required: false },
            { key: "empty", type: "json", required: false, description: "Empty-state node." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { density: "comfortable", selectable: false, zebra: true },
        editableFields: [
          { path: "density", label: "Density", control: "select", valueType: "enum", options: ["compact", "comfortable", "wide"] },
          { path: "selectable", label: "Selectable", control: "toggle", valueType: "boolean" },
          { path: "zebra", label: "Zebra rows", control: "toggle", valueType: "boolean" },
          { path: "caption", label: "Caption", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...CARD_TOKENS, { token: "--primitive-field-hover", category: "color", usage: "row hover" }, { token: "--primitive-focus-ring", category: "color", usage: "sort button focus" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, keyboardOperable: true, visibleFocus: true },
        previewConfig: { sampleProps: { density: "comfortable" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Sortable, selectable job table.",
          code: `import { DataTable } from "${BARREL}"

interface Job { id: string; ref: string; status: string }

export function Jobs({ jobs }: { jobs: Job[] }) {
  return (
    <DataTable
      rows={jobs}
      getRowId={(row) => row.id}
      caption="Open jobs"
      kicker="Service desk"
      selectable
      columns={[
        { id: "ref", header: "Ref", cell: (r) => r.ref, sortable: true },
        { id: "status", header: "Status", cell: (r) => r.status, align: "right" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { DataTable } from "${BARREL}".`, "Define columns with cell render functions.", "Pass rows + a getRowId resolver."],
          notes: ["Client component (\"use client\") — sort + selection state are internal."],
        },
        tags: ["table", "sortable", "selectable", "data"],
      },
      role: "Generic sortable data table.",
      usageExamples: [
        { title: "Compact, no zebra", scenario: "Dense read-only table.", code: `<DataTable rows={rows} getRowId={(r) => r.id} density="compact" zebra={false} columns={cols} />` },
      ],
      a11y: {
        keyboard: ["Sortable headers are real buttons — Enter/Space cycle asc → desc → none.", "Checkboxes are native inputs, fully keyboard-operable."],
        screenReader: ["Wrapped in a labelled <section>; aria-sort is set per column; a visually-hidden <caption> repeats the label."],
        reducedMotion: "No motion.",
        focus: ["Sort buttons and checkboxes show a visible focus ring via --primitive-focus-ring."],
      },
      responsive: { mobile: "Horizontal scroller keeps columns intact under 360px.", tablet: "Comfortable.", desktop: "Full width.", hasHorizontalScroll: true },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["rows", "columns"], notes: ["columns carry render functions — the CMS exposes column config, not arbitrary JSX; data binds from a source."] },
      agent: {
        steps: ["Type your row shape and pass it through the generic.", "Map each column's cell to a row accessor.", "Provide getRowId for stable keys."],
        pitfalls: ["Sort is lexical on the cell output unless you sort upstream — verify the column's sortable semantics fit your data."],
        requirements: ["Client component.", "getRowId required."],
      },
    },
    {
      manifest: {
        type: "data-display/dashboard-card",
        name: "Dashboard Card",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "KPI card with icon, value/unit, delta chip, optional sparkline slot, and a footer link.",
        componentPath: BARREL,
        importName: "DashboardCard",
        propsSchema: {
          fields: [
            { key: "label", type: "string", required: true },
            { key: "value", type: "string", required: true },
            { key: "unit", type: "string", required: false },
            { key: "icon", type: "icon", required: false, description: "ReactNode icon (e.g. lucide)." },
            { key: "delta", type: "object", required: false, fields: [
              { key: "label", type: "string", required: true },
              { key: "direction", type: "enum", required: true, options: ["up", "down", "flat"] },
            ] },
            { key: "spark", type: "json", required: false, description: "Sparkline node slot." },
            { key: "footer", type: "object", required: false, fields: [
              { key: "label", type: "string", required: true },
              { key: "href", type: "url", required: true },
            ] },
            { key: "meta", type: "string", required: false },
            { key: "surface", type: "enum", required: false, options: ["glass", "neuo", "material"], description: "Defaults to \"glass\"." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { surface: "glass", label: "", value: "" },
        editableFields: [
          { path: "label", label: "Label", control: "text", valueType: "string" },
          { path: "value", label: "Value", control: "text", valueType: "string" },
          { path: "unit", label: "Unit", control: "text", valueType: "string", optional: true },
          { path: "surface", label: "Surface", control: "select", valueType: "enum", options: ["glass", "neuo", "material"] },
          { path: "delta.direction", label: "Delta direction", control: "select", valueType: "enum", options: ["up", "down", "flat"], optional: true },
          { path: "footer.href", label: "Footer link", control: "url", valueType: "url", optional: true },
        ],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS, { token: "--primitive-glass-soft", category: "color", usage: "glass surface variant" }],
        iconDependencies: [{ name: "lucide-react (caller-supplied)", importPath: "lucide-react", usage: "leading KPI icon, passed as the icon prop" }],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "md", span: 6 }, { breakpoint: "lg", span: 3 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Delta chip has an aria-label describing the change; icon is aria-hidden."] },
        previewConfig: { sampleProps: { surface: "glass", label: "Revenue", value: "12.4" }, aspectRatio: "4/3", background: "canvas", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Glass KPI card with an up-delta and a sparkline.",
          code: `import { DashboardCard } from "${BARREL}"
import { Sparkline } from "@/app/ui-primitives/components/charts"
import { Wrench } from "lucide-react"

export function Kpi() {
  return (
    <DashboardCard
      label="Jobs this week"
      value="128"
      unit="jobs"
      icon={<Wrench size={20} strokeWidth={1.8} />}
      delta={{ label: "+12%", direction: "up" }}
      spark={<Sparkline points={[8, 12, 9, 14, 18]} ariaLabel="Jobs trend" />}
      footer={{ label: "View all", href: "/jobs" }}
      surface="glass"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { DashboardCard } from "${BARREL}".`, "Pass label + value (both required).", "Optionally pass icon, delta, spark, footer."],
          notes: ["Footer renders a next/link — href must be a valid route. Icon is decorative (aria-hidden)."],
        },
        tags: ["card", "kpi", "metric", "dashboard"],
      },
      role: "Single-KPI dashboard card.",
      usageExamples: [
        { title: "Neuo surface, flat delta", scenario: "Neumorphic card with no trend.", code: `<DashboardCard label="NPS" value="71" surface="neuo" delta={{ label: "no change", direction: "flat" }} />` },
      ],
      a11y: {
        keyboard: ["Only the footer link is focusable."],
        screenReader: ["Delta chip exposes aria-label \"Change: <label>\"; the glyph is aria-hidden."],
        reducedMotion: "No intrinsic motion.",
        focus: ["Footer link inherits visible focus from the link layer."],
      },
      responsive: { mobile: "Full width.", tablet: "Half-width pair.", desktop: "Quarter-width quad in a KPI row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: [], notes: ["icon + spark are node slots — the CMS picks an icon and binds a sparkline data source rather than free JSX."] },
      agent: {
        steps: ["Set label + value.", "Choose a surface matching the dashboard skin.", "Bind delta direction to the trend sign."],
        pitfalls: ["value is a string — format numbers (commas, units) before passing."],
        requirements: ["label and value required."],
      },
    },
    {
      manifest: {
        type: "data-display/metric-block",
        name: "Metric Block",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Definition-list row of compact metrics, each with value, unit, and delta chip.",
        componentPath: BARREL,
        importName: "MetricBlock",
        propsSchema: {
          fields: [
            { key: "metrics", type: "array", required: true, description: "MetricBlockItem[] { id, label, value, unit?, delta? }.", items: { key: "m", type: "object", required: true, fields: [
              { key: "id", type: "string", required: true },
              { key: "label", type: "string", required: true },
              { key: "value", type: "string", required: true },
              { key: "unit", type: "string", required: false },
            ] } },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", stack: true, span: 12 }, { breakpoint: "md", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "group", requiresLabel: true, notes: ["Renders a <dl> with role=group aria-label=\"Metric summary\"; each metric is a dt/dd pair."] },
        previewConfig: { sampleProps: {}, aspectRatio: "16/5", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Three-metric summary row.",
          code: `import { MetricBlock } from "${BARREL}"

export function Summary() {
  return (
    <MetricBlock
      metrics={[
        { id: "rev", label: "Revenue", value: "48.2", unit: "k", delta: { label: "+8%", direction: "up" } },
        { id: "jobs", label: "Jobs", value: "312" },
        { id: "nps", label: "NPS", value: "71", delta: { label: "-2", direction: "down" } },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { MetricBlock } from "${BARREL}".`, "Pass a metrics array; each item needs a stable id.", "Add delta objects where a trend applies."],
          notes: ["Server component. Uses a semantic dl/dt/dd structure."],
        },
        tags: ["metrics", "summary", "stats", "data"],
      },
      role: "Compact multi-metric summary row.",
      usageExamples: [
        { title: "No deltas", scenario: "Flat metric row.", code: `<MetricBlock metrics={[{ id: "a", label: "Open", value: "12" }, { id: "b", label: "Closed", value: "300" }]} />` },
      ],
      a11y: {
        keyboard: ["Non-interactive."],
        screenReader: ["Semantic dl; delta chip has aria-label \"Change: <label>\"."],
        reducedMotion: "No motion.",
        focus: ["No focusable elements."],
      },
      responsive: { mobile: "Metrics stack into a column.", tablet: "Inline row.", desktop: "Inline row with generous gaps.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["metrics"], notes: ["metrics is a clean repeater of {id, label, value, unit?, delta?}."] },
      agent: {
        steps: ["Give every metric a unique id.", "Format value strings; pass delta only when meaningful."],
        pitfalls: ["Duplicate ids break React keys."],
        requirements: ["Each metric needs id, label, value."],
      },
    },
    {
      manifest: {
        type: "data-display/activity-feed",
        name: "Activity Feed",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Animated chronological feed of toned events with actor avatars and an aria-live region.",
        componentPath: BARREL,
        importName: "ActivityFeed",
        propsSchema: {
          fields: [
            { key: "items", type: "array", required: true, description: "ActivityFeedItem[] { id, title, description?, timestamp, tone?, actor?, actions? }.", items: { key: "i", type: "object", required: true, fields: [
              { key: "id", type: "string", required: true },
              { key: "title", type: "string", required: true },
              { key: "description", type: "string", required: false },
              { key: "timestamp", type: "string", required: true },
              { key: "tone", type: "enum", required: false, options: ["info", "success", "warn", "error"] },
            ] } },
            { key: "className", type: "string", required: false },
            { key: "ariaLabel", type: "string", required: false, description: "Defaults to \"Activity feed\"." },
          ],
        },
        defaultProps: { ariaLabel: "Activity feed" },
        editableFields: [
          { path: "ariaLabel", label: "Accessible label", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS],
        iconDependencies: [],
        assetDependencies: [{ id: "actor-avatar", type: "image", required: false, description: "Optional actor avatar src per item." }],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, requiresLabel: true, respectsReducedMotion: true, notes: ["aria-live=polite, aria-relevant=additions; auto-animate is skipped under reduced-motion."] },
        previewConfig: { sampleProps: { ariaLabel: "Recent activity" }, aspectRatio: "9/16", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Live activity feed with toned dots.",
          code: `import { ActivityFeed } from "${BARREL}"

export function Recent() {
  return (
    <ActivityFeed
      ariaLabel="Recent workshop activity"
      items={[
        { id: "1", title: "Job #4821 approved", timestamp: "2m ago", tone: "success", actor: { name: "Dan F" } },
        { id: "2", title: "Quote sent", description: "Exhaust replacement", timestamp: "18m ago", tone: "info" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { ActivityFeed } from "${BARREL}".`, "Pass items with stable ids + timestamps.", "Set ariaLabel for the live region."],
          notes: ["Client component — uses @formkit/auto-animate, gated behind prefers-reduced-motion. Avatars come from ../primitives/avatar."],
        },
        tags: ["feed", "timeline", "activity", "live"],
      },
      role: "Animated event timeline.",
      usageExamples: [
        { title: "With per-item actions", scenario: "Feed rows carrying action buttons.", code: `<ActivityFeed items={[{ id: "1", title: "New review", timestamp: "now", actions: <button>Reply</button> }]} />` },
      ],
      a11y: {
        keyboard: ["Any per-item action nodes are keyboard-operable as authored."],
        screenReader: ["Ordered list inside an aria-live=polite region announcing additions."],
        reducedMotion: "auto-animate is bypassed entirely when reduced-motion is set.",
        focus: ["Focus belongs to action nodes you pass in."],
      },
      responsive: { mobile: "Single column.", tablet: "Single column, often in a sidebar.", desktop: "Single column.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["items"], notes: ["actions is a node slot per item — the CMS binds events, not raw JSX."] },
      agent: {
        steps: ["Provide chronologically-ordered items.", "Set tone per event severity.", "Set ariaLabel."],
        pitfalls: ["Client-only — do not call from a server-only boundary without the directive in place (it already has it)."],
        requirements: ["Client component.", "Each item needs id, title, timestamp."],
      },
    },
    {
      manifest: {
        type: "data-display/notification-inbox",
        name: "Notification Inbox",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Tabbed inbox (Unread/All/Mentions) with per-row read/dismiss actions and live counts.",
        componentPath: BARREL,
        importName: "NotificationInbox",
        propsSchema: {
          fields: [
            { key: "items", type: "array", required: true, description: "NotificationItem[] { id, title, sub?, timestamp, source?, tone?, icon?, unread?, mention? }.", items: { key: "i", type: "object", required: true, fields: [
              { key: "id", type: "string", required: true },
              { key: "title", type: "string", required: true },
              { key: "timestamp", type: "string", required: true },
              { key: "unread", type: "boolean", required: false },
              { key: "mention", type: "boolean", required: false },
            ] } },
            { key: "defaultFilter", type: "enum", required: false, options: ["unread", "all", "mentions"], description: "Defaults to \"unread\"." },
            { key: "onMarkAllRead", type: "json", required: false, description: "() => void callback." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { defaultFilter: "unread" },
        editableFields: [
          { path: "defaultFilter", label: "Default tab", control: "select", valueType: "enum", options: ["unread", "all", "mentions"] },
        ],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS, { token: "--primitive-focus-ring", category: "color", usage: "tab/button focus" }],
        iconDependencies: [{ name: "lucide-react (caller-supplied)", importPath: "lucide-react", usage: "per-item leading icon via the icon prop" }],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, keyboardOperable: true, visibleFocus: true, notes: ["Tabs use role=tablist/tab with aria-selected; items use role=status aria-live=polite."] },
        previewConfig: { sampleProps: { defaultFilter: "unread" }, aspectRatio: "3/4", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Inbox defaulting to the Unread tab.",
          code: `import { NotificationInbox } from "${BARREL}"

export function Inbox() {
  return (
    <NotificationInbox
      defaultFilter="unread"
      onMarkAllRead={() => {}}
      items={[
        { id: "1", title: "Payment received", timestamp: "1m", tone: "success", unread: true },
        { id: "2", title: "You were mentioned", timestamp: "10m", mention: true, unread: true },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { NotificationInbox } from "${BARREL}".`, "Pass items flagged with unread/mention to drive tab counts.", "Wire onMarkAllRead."],
          notes: ["Client component — filter state is internal. Mark read/dismiss buttons are present per row (wire upstream as needed)."],
        },
        tags: ["inbox", "notifications", "tabs", "data"],
      },
      role: "Tabbed notification inbox.",
      usageExamples: [
        { title: "Mentions-first", scenario: "Open on the Mentions tab.", code: `<NotificationInbox defaultFilter="mentions" items={items} />` },
      ],
      a11y: {
        keyboard: ["Tabs and all row buttons are native buttons, fully keyboard-operable."],
        screenReader: ["tablist semantics on the tabs; each item is role=status with aria-live."],
        reducedMotion: "No motion.",
        focus: ["Visible focus ring via --primitive-focus-ring on tabs + buttons."],
      },
      responsive: { mobile: "Full width; actions wrap under each row.", tablet: "Comfortable.", desktop: "Often in a flyout panel.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["items"], notes: ["A live system surface, not page content — usually wired to a data source, not authored."] },
      agent: {
        steps: ["Flag unread/mention on items so tab counts compute.", "Provide onMarkAllRead handler."],
        pitfalls: ["Counts derive from item flags, not from your own state — keep flags in sync."],
        requirements: ["Client component.", "Each item needs id, title, timestamp."],
      },
    },
    {
      manifest: {
        type: "data-display/status-badge-grid",
        name: "Status Badge Grid",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Showcase grid rendering a badge set across every shape and size combination.",
        componentPath: BARREL,
        importName: "StatusBadgeGrid",
        propsSchema: {
          fields: [
            { key: "badges", type: "array", required: false, description: "StatusBadgeSpec[] { tone, label }. Defaults to a 6-tone sample set.", items: { key: "b", type: "object", required: true, fields: [
              { key: "tone", type: "enum", required: true, options: ["info", "success", "warn", "error", "neutral", "brand"] },
              { key: "label", type: "string", required: true },
            ] } },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...TONE_STATUS_TOKENS, { token: "--primitive-text-strong", category: "color", usage: "heading text" }, { token: "--primitive-radius-pill", category: "radius", usage: "pill badge radius" }, { token: "--primitive-text-on-accent", category: "color", usage: "badge label on fill" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive", types: ["data-display/status-badge"] }],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Each shape group is a labelled <section>; badges are static spans."] },
        previewConfig: { sampleProps: {}, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Default tone set across all shapes/sizes.",
          code: `import { StatusBadgeGrid } from "${BARREL}"

export function Badges() {
  return (
    <StatusBadgeGrid
      badges={[
        { tone: "success", label: "Approved" },
        { tone: "warn", label: "Pending" },
        { tone: "error", label: "Failed" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { StatusBadgeGrid } from "${BARREL}".`, "Optionally pass a badges array (defaults provided).", "Renders every shape × size for the set."],
          notes: ["Server component. For a single badge use the StatusBadge export instead."],
        },
        tags: ["badge", "status", "showcase", "data"],
      },
      role: "Status badge showcase grid.",
      usageExamples: [
        { title: "Default sample", scenario: "No props — uses the built-in 6-tone set.", code: `<StatusBadgeGrid />` },
      ],
      a11y: {
        keyboard: ["Non-interactive."],
        screenReader: ["Shape sections carry aria-labels; badge text is read inline."],
        reducedMotion: "No motion.",
        focus: ["No focusable elements."],
      },
      responsive: { mobile: "Rows wrap.", tablet: "Rows wrap.", desktop: "Full grid.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["badges"], notes: ["A documentation/showcase block; the single StatusBadge is the composable unit."] },
      agent: {
        steps: ["Pass a badges array of {tone, label}, or omit for defaults."],
        pitfalls: ["This renders the full shape×size matrix — for one badge, import StatusBadge."],
        requirements: [],
      },
    },
    {
      manifest: {
        type: "data-display/status-badge",
        name: "Status Badge",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Single status badge with tone, size, and shape.",
        componentPath: BARREL,
        importName: "StatusBadge",
        propsSchema: {
          fields: [
            { key: "tone", type: "enum", required: true, options: ["info", "success", "warn", "error", "neutral", "brand"] },
            { key: "size", type: "enum", required: true, options: ["sm", "md", "lg"] },
            { key: "shape", type: "enum", required: true, options: ["pill", "square", "dot"] },
            { key: "label", type: "string", required: true },
          ],
        },
        defaultProps: { tone: "neutral", size: "md", shape: "pill", label: "" },
        editableFields: [
          { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["info", "success", "warn", "error", "neutral", "brand"] },
          { path: "size", label: "Size", control: "select", valueType: "enum", options: ["sm", "md", "lg"] },
          { path: "shape", label: "Shape", control: "select", valueType: "enum", options: ["pill", "square", "dot"] },
          { path: "label", label: "Label", control: "text", valueType: "string" },
        ],
        tokenDependencies: [...TONE_STATUS_TOKENS, { token: "--primitive-radius-pill", category: "radius", usage: "pill radius" }, { token: "--primitive-text-on-accent", category: "color", usage: "label colour on fill" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 2 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Static span; the label carries the meaning."] },
        previewConfig: { sampleProps: { tone: "success", size: "md", shape: "pill", label: "Approved" }, aspectRatio: "3/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "A single success pill badge.",
          code: `import { StatusBadge } from "${BARREL}"

export function Tag() {
  return <StatusBadge tone="success" size="md" shape="pill" label="Approved" />
}`,
        },
        setupInstructions: {
          steps: [`Import { StatusBadge } from "${BARREL}".`, "Pass tone, size, shape, and label (all required)."],
          notes: ["Server component. Use the \"dot\" shape for a minimal status indicator."],
        },
        tags: ["badge", "status", "label", "data"],
      },
      role: "Single status badge.",
      usageExamples: [
        { title: "Dot indicator", scenario: "Minimal status dot.", code: `<StatusBadge tone="error" size="sm" shape="dot" label="Offline" />` },
      ],
      a11y: {
        keyboard: ["Non-interactive."],
        screenReader: ["Label text is announced; tone is purely visual."],
        reducedMotion: "No motion.",
        focus: ["No focusable elements."],
      },
      responsive: { mobile: "Inline.", tablet: "Inline.", desktop: "Inline.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: [], notes: ["Composable inline primitive; bind tone to a status enum."] },
      agent: {
        steps: ["Pass all four required props.", "Map tone to your status enum."],
        pitfalls: ["For dot shape, the label is still required (used as the accessible text)."],
        requirements: ["tone, size, shape, label all required."],
      },
    },
    {
      manifest: {
        type: "data-display/live-counter-card",
        name: "Live Counter Card",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Animated count-up card with a Live pill, a sparkline trend, and a meta footer.",
        componentPath: BARREL,
        importName: "LiveCounterCard",
        propsSchema: {
          fields: [
            { key: "label", type: "string", required: true },
            { key: "value", type: "number", required: true, description: "Target value to count up to." },
            { key: "unit", type: "string", required: false },
            { key: "prefix", type: "string", required: false },
            { key: "decimals", type: "number", required: false, description: "Defaults to 0." },
            { key: "subhead", type: "string", required: false },
            { key: "sparkPoints", type: "array", required: true, items: { key: "p", type: "number", required: true } },
            { key: "sparkTone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "Defaults to \"teal\"." },
            { key: "meta", type: "string", required: false },
            { key: "source", type: "string", required: false },
            { key: "duration", type: "number", required: false, description: "Count-up ms. Defaults to 1600." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { decimals: 0, sparkTone: "teal", duration: 1600, label: "", value: 0, sparkPoints: [] },
        editableFields: [
          { path: "label", label: "Label", control: "text", valueType: "string" },
          { path: "value", label: "Value", control: "number", valueType: "number" },
          { path: "sparkTone", label: "Spark tone", control: "select", valueType: "enum", options: ["red", "amber", "teal", "green"] },
        ],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS, { token: "--primitive-green", category: "color", usage: "live pill pulse" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive", types: ["charts/sparkline"], min: 1, max: 1 }],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 4 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, respectsReducedMotion: true, notes: ["CountUp exposes an ariaLabel with the final value; honours reduced-motion (jumps to final)."] },
        previewConfig: { sampleProps: { label: "Live jobs", value: 128, sparkPoints: [8, 12, 9, 14, 18] }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Live counter with a teal trend.",
          code: `import { LiveCounterCard } from "${BARREL}"

export function LiveJobs() {
  return (
    <LiveCounterCard
      label="Live jobs in progress"
      value={128}
      unit="jobs"
      subhead="Across 3 bays"
      sparkPoints={[8, 12, 9, 14, 18, 22, 20]}
      sparkTone="teal"
      meta="Updated 1Hz"
      source="Workshop telemetry"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { LiveCounterCard } from "${BARREL}".`, "Pass a numeric value + sparkPoints.", "Tune prefix/decimals/duration for formatting."],
          notes: ["Composes CountUp (../primitives/count-up) + Sparkline (../charts/sparkline). Both pulled internally."],
        },
        tags: ["card", "counter", "live", "trend"],
      },
      role: "Animated live counter card.",
      usageExamples: [
        { title: "Currency counter", scenario: "Prefixed, two-decimal money value.", code: `<LiveCounterCard label="Revenue today" value={4820.5} prefix="$" decimals={2} sparkPoints={[1,2,3,4]} />` },
      ],
      a11y: {
        keyboard: ["Non-interactive."],
        screenReader: ["CountUp carries an ariaLabel with the formatted final value; the Live pill is labelled."],
        reducedMotion: "Count-up snaps to the final value when reduced-motion is set.",
        focus: ["No focusable elements."],
      },
      responsive: { mobile: "Full width; spark stretches.", tablet: "Half/third width.", desktop: "Third-width in a live row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["sparkPoints"], notes: ["value + sparkPoints usually bind to a live data source rather than static content."] },
      agent: {
        steps: ["Pass value as a number (not a string).", "Provide sparkPoints for the trend.", "Set decimals/prefix for formatting."],
        pitfalls: ["value is numeric here (unlike DashboardCard's string value)."],
        requirements: ["label, value, sparkPoints required."],
      },
    },
    {
      manifest: {
        type: "data-display/comparison-table",
        name: "Comparison Table",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Feature comparison grid with check/cross/dot/text indicators and a Most-popular column ribbon.",
        componentPath: BARREL,
        importName: "ComparisonTable",
        propsSchema: {
          fields: [
            { key: "columns", type: "array", required: true, description: "ComparisonColumn[] { id, name, caption?, popular? }.", items: { key: "c", type: "object", required: true, fields: [
              { key: "id", type: "string", required: true },
              { key: "name", type: "string", required: true },
              { key: "caption", type: "string", required: false },
              { key: "popular", type: "boolean", required: false },
            ] } },
            { key: "rows", type: "array", required: true, description: "ComparisonRow[] { feature, description?, values: (\"check\"|\"cross\"|\"dot\"|string)[] }." },
            { key: "caption", type: "string", required: false },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "caption", label: "Caption", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...CARD_TOKENS, { token: "--primitive-green", category: "color", usage: "included check" }, { token: "--primitive-red", category: "color", usage: "excluded cross" }, { token: "--primitive-amber", category: "color", usage: "popular ribbon" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, notes: ["Check/cross indicators carry aria-labels Included/Not included; a visually-hidden caption labels the table."] },
        previewConfig: { sampleProps: {}, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Three-plan comparison with a popular column.",
          code: `import { ComparisonTable } from "${BARREL}"

export function Plans() {
  return (
    <ComparisonTable
      caption="Plan comparison"
      columns={[
        { id: "basic", name: "Basic" },
        { id: "pro", name: "Pro", caption: "Most chosen", popular: true },
        { id: "fleet", name: "Fleet" },
      ]}
      rows={[
        { feature: "Inspections", values: ["check", "check", "check"] },
        { feature: "Priority booking", values: ["cross", "check", "check"] },
        { feature: "Bays", values: ["1", "3", "unlimited"] },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { ComparisonTable } from "${BARREL}".`, "Define columns (mark one popular).", "Each row's values array aligns to the columns by index."],
          notes: ["Server component. values accept the literals check/cross/dot or any free text string."],
        },
        tags: ["table", "comparison", "pricing", "data"],
      },
      role: "Feature comparison grid.",
      usageExamples: [
        { title: "Text values", scenario: "Free-text cells instead of icons.", code: `<ComparisonTable columns={[{ id: "a", name: "A" }]} rows={[{ feature: "Warranty", values: ["12 months"] }]} />` },
      ],
      a11y: {
        keyboard: ["Non-interactive."],
        screenReader: ["row/col scopes set; indicator icons carry Included/Not included/Partial labels."],
        reducedMotion: "No motion.",
        focus: ["No focusable elements."],
      },
      responsive: { mobile: "Horizontal scroller keeps columns aligned.", tablet: "Comfortable.", desktop: "Full width.", hasHorizontalScroll: true },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["columns", "rows"], notes: ["columns + rows are repeaters; row values index-align to columns — keep lengths matched in the editor."] },
      agent: {
        steps: ["Build columns first, then rows whose values align by index.", "Use check/cross/dot or plain text per cell."],
        pitfalls: ["values shorter than columns leaves trailing cells blank."],
        requirements: ["columns and rows required."],
      },
    },
    {
      manifest: {
        type: "data-display/pricing-tier-card",
        name: "Pricing Tier Card",
        category: "Commerce",
        kind: "component",
        version: "1.0.0",
        summary: "Single pricing tier with kicker, price block, feature checklist, ribbon, and a CTA link.",
        componentPath: BARREL,
        importName: "PricingTierCard",
        propsSchema: {
          fields: [
            { key: "kicker", type: "string", required: false },
            { key: "name", type: "string", required: true },
            { key: "tagline", type: "string", required: false },
            { key: "price", type: "string", required: true },
            { key: "currency", type: "string", required: false, description: "Defaults to \"AUD\"." },
            { key: "period", type: "string", required: false, description: "Defaults to \"per month\"." },
            { key: "ribbon", type: "string", required: false },
            { key: "features", type: "array", required: true, description: "PricingFeature[] { label, included? }.", items: { key: "f", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "included", type: "boolean", required: false },
            ] } },
            { key: "cta", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "href", type: "url", required: true },
            ] },
            { key: "highlight", type: "boolean", required: false, description: "Defaults false." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { currency: "AUD", period: "per month", highlight: false, name: "", price: "" },
        editableFields: [
          { path: "name", label: "Tier name", control: "text", valueType: "string" },
          { path: "price", label: "Price", control: "text", valueType: "string" },
          { path: "highlight", label: "Highlight", control: "toggle", valueType: "boolean" },
          { path: "cta.href", label: "CTA link", control: "url", valueType: "url" },
        ],
        tokenDependencies: [...CARD_TOKENS, { token: "--primitive-green", category: "color", usage: "included check" }, { token: "--primitive-btn-primary-bg", category: "button", usage: "highlighted CTA" }, { token: "--primitive-btn-primary-fg", category: "button", usage: "highlighted CTA text" }, { token: "--primitive-btn-radius", category: "button", usage: "CTA radius" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 4 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, requiresLabel: true, keyboardOperable: true, visibleFocus: true, headingLevel: 3, notes: ["Card aria-label \"<name> pricing tier\"; CTA is a next/link."] },
        seoRules: { contributesHeading: true, schemaOrgType: "Offer", indexable: true },
        conversionGoal: { id: "select-plan", label: "Select plan", action: "navigate", emphasisToken: "--primitive-btn-primary-bg" },
        previewConfig: { sampleProps: { name: "Pro", price: "149", highlight: true }, aspectRatio: "3/4", background: "canvas", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Highlighted Pro tier with a metallic CTA.",
          code: `import { PricingTierCard } from "${BARREL}"

export function Pro() {
  return (
    <PricingTierCard
      kicker="Most popular"
      name="Pro"
      tagline="For busy workshops"
      price="149"
      ribbon="Best value"
      highlight
      features={[
        { label: "Unlimited inspections" },
        { label: "Priority booking" },
        { label: "Fleet portal", included: false },
      ]}
      cta={{ label: "Choose Pro", href: "/signup?plan=pro" }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { PricingTierCard } from "${BARREL}".`, "Set name + price + a cta {label, href}.", "Set highlight on the recommended tier for the metallic CTA."],
          notes: ["Server component. CTA renders a next/link; highlight switches the CTA to the primary button DNA."],
        },
        tags: ["pricing", "tier", "commerce", "cta"],
      },
      role: "Single pricing tier card.",
      usageExamples: [
        { title: "Non-highlighted tier", scenario: "A secondary plan with a ghost CTA.", code: `<PricingTierCard name="Basic" price="49" features={[{ label: "1 bay" }]} cta={{ label: "Start", href: "/signup" }} />` },
      ],
      a11y: {
        keyboard: ["CTA link is keyboard-operable."],
        screenReader: ["Card labelled by tier name; included/excluded features render distinct icons."],
        reducedMotion: "No motion.",
        focus: ["CTA shows a visible focus ring."],
      },
      responsive: { mobile: "Full-width stacked.", tablet: "Two across.", desktop: "Three across in a pricing row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["features"], notes: ["features is a {label, included} repeater; cta is a link group; highlight is a toggle."] },
      agent: {
        steps: ["Provide name, price, features, and a cta.", "Mark one tier highlight for emphasis."],
        pitfalls: ["price is a string — include only the number; currency/period are separate props."],
        requirements: ["name, price, features, cta required."],
      },
    },
    {
      manifest: {
        type: "data-display/kanban-board",
        name: "Kanban Board",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Multi-column kanban with staged columns, priority flags, tags, and assignee avatar stacks.",
        componentPath: BARREL,
        importName: "KanbanBoard",
        propsSchema: {
          fields: [
            { key: "columns", type: "array", required: true, description: "KanbanColumn[] { stage, title, cards }. Stage in backlog|progress|review|done.", items: { key: "col", type: "object", required: true, fields: [
              { key: "stage", type: "enum", required: true, options: ["backlog", "progress", "review", "done"] },
              { key: "title", type: "string", required: true },
            ] } },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...CARD_TOKENS, ...TONE_STATUS_TOKENS],
        iconDependencies: [],
        assetDependencies: [{ id: "assignee-avatar", type: "image", required: false, description: "Optional assignee avatar src per card." }],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "list", requiresLabel: true, notes: ["Board has role=list aria-label; each column is a labelled section reporting its card count."] },
        previewConfig: { sampleProps: {}, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Four-stage workshop kanban.",
          code: `import { KanbanBoard } from "${BARREL}"

export function Board() {
  return (
    <KanbanBoard
      columns={[
        { stage: "backlog", title: "Backlog", cards: [
          { id: "1", code: "JOB-481", title: "Exhaust weld", priority: "high", tags: ["welding"] },
        ] },
        { stage: "progress", title: "In progress", cards: [
          { id: "2", code: "JOB-479", title: "Brake pads", assignees: [{ name: "Sam" }] },
        ] },
        { stage: "review", title: "Review", cards: [] },
        { stage: "done", title: "Done", cards: [] },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { KanbanBoard } from "${BARREL}".`, "Provide columns keyed by stage with their cards.", "Cards carry code, title, optional priority/tags/assignees/due."],
          notes: ["Server component. Avatars come from ../primitives/avatar; up to 4 assignees show as a stack."],
        },
        tags: ["kanban", "board", "operations", "tasks"],
      },
      role: "Staged kanban board.",
      usageExamples: [
        { title: "Single column", scenario: "A simple in-progress lane.", code: `<KanbanBoard columns={[{ stage: "progress", title: "Doing", cards: [{ id: "1", code: "A-1", title: "Task" }] }]} />` },
      ],
      a11y: {
        keyboard: ["Static presentation (no built-in drag) — non-interactive."],
        screenReader: ["Columns announce title + card count; cards expose priority via aria-label."],
        reducedMotion: "No motion.",
        focus: ["No focusable elements in the static board."],
      },
      responsive: { mobile: "Columns scroll horizontally.", tablet: "2–3 columns visible.", desktop: "All columns visible.", hasHorizontalScroll: true },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["columns"], notes: ["An operations surface bound to task data, not authored page content."] },
      agent: {
        steps: ["Provide the four stage columns (or a subset).", "Give each card a stable id + code."],
        pitfalls: ["This is a presentational board — drag/reorder is not built in here."],
        requirements: ["columns required; each card needs id + code + title."],
      },
    },
    {
      manifest: {
        type: "data-display/media-tray",
        name: "Media Tray",
        category: "Media",
        kind: "component",
        version: "1.0.0",
        summary: "Horizontally-scrolling media gallery of figures with image/placeholder, tag, and caption.",
        componentPath: BARREL,
        importName: "MediaTray",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: false },
            { key: "kicker", type: "string", required: false },
            { key: "items", type: "array", required: true, description: "MediaTrayItem[] { id, title, meta?, tag?, src?, placeholder? }.", items: { key: "i", type: "object", required: true, fields: [
              { key: "id", type: "string", required: true },
              { key: "title", type: "string", required: true },
              { key: "src", type: "image", required: false },
              { key: "tag", type: "string", required: false },
            ] } },
            { key: "className", type: "string", required: false },
            { key: "ariaLabel", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...CARD_TOKENS, { token: "--primitive-media-overlay", category: "color", usage: "image scrim" }, { token: "--primitive-amber", category: "color", usage: "tag chip" }],
        iconDependencies: [],
        assetDependencies: [{ id: "media-image", type: "image", required: false, description: "Per-item image src (280x210 rendered); falls back to placeholder text." }],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, keyboardOperable: true, notes: ["Scroller is tabIndex=0 (keyboard scrollable); each figure has alt text from item.title."] },
        previewConfig: { sampleProps: {}, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Scrolling gallery of recent builds.",
          code: `import { MediaTray } from "${BARREL}"

export function Gallery() {
  return (
    <MediaTray
      title="Recent builds"
      kicker="Workshop"
      items={[
        { id: "1", title: "Twin-exit system", meta: "VE Commodore", tag: "Custom", src: "/builds/ve.jpg" },
        { id: "2", title: "Cat-back swap", meta: "Hilux", placeholder: "Hilux" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { MediaTray } from "${BARREL}".`, "Pass items with a title (used as alt).", "Provide src for images or rely on the placeholder text."],
          notes: ["Server component. Uses next/image with unoptimized; rendered at 280x210."],
        },
        tags: ["media", "gallery", "carousel", "scroller"],
      },
      role: "Horizontal media gallery.",
      usageExamples: [
        { title: "Placeholder-only", scenario: "Tray before images are uploaded.", code: `<MediaTray items={[{ id: "1", title: "Coming soon", placeholder: "TBD" }]} />` },
      ],
      a11y: {
        keyboard: ["The scroller is focusable (tabIndex=0) so it can be scrolled with arrow keys."],
        screenReader: ["Region labelled by title/ariaLabel; each image's alt comes from item.title."],
        reducedMotion: "No autoplay; user-driven scroll only.",
        focus: ["Scroller container shows focus when tabbed to."],
      },
      responsive: { mobile: "Swipeable horizontal scroller.", tablet: "Several figures visible.", desktop: "Wide tray.", hasHorizontalScroll: true },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["items"], notes: ["items is an image/caption repeater; src binds to the media library, title doubles as alt text."] },
      agent: {
        steps: ["Give each item a descriptive title (it is the alt text).", "Provide src or a placeholder string."],
        pitfalls: ["next/image is used with unoptimized — ensure src points to a reachable asset."],
        requirements: ["items required; each item needs id + title."],
      },
    },
  ],
}

export default dataDisplayDocs
