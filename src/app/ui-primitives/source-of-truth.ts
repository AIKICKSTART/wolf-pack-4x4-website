import { sections, type PrimitiveSection } from "./sidebar-config"

export type DnaGroupId = "source" | "shared"
export type DnaReadiness = "locked" | "ready" | "needs-proof"

export interface PrimitiveDnaContract {
  role: string
  atomicOutputs: readonly string[]
  evidence: readonly string[]
  readiness: DnaReadiness
}

export interface PrimitiveDnaSection {
  index: string
  group: DnaGroupId
  section: PrimitiveSection
  contract: PrimitiveDnaContract
}

export const sourceTruthOrder = [
  "overview",
  "telemetry",
  "audit",
  "implementation",
  "qa",
  "production",
] as const

export const sharedDnaOrder = [
  "foundations",
  "wireframes",
  "layouts",
  "sizing",
  "section-patterns",
  "surfaces",
  "typography",
  "icons",
  "theming",
  "actions",
  "forms",
  "selection",
  "navigation",
  "feedback",
  "overlays",
  "data-display",
  "search",
  "file-browser",
  "motion",
  "mobile-shell",
] as const

const sourceTruthContracts: Record<(typeof sourceTruthOrder)[number], PrimitiveDnaContract> = {
  overview: {
    role: "Entry board for every primitive family, route group, source route, and active build standard.",
    atomicOutputs: ["Group map", "route index", "coverage summary"],
    evidence: ["Dashboard renders", "sidebar route exists", "overview links to 00/01"],
    readiness: "locked",
  },
  telemetry: {
    role: "Operational signal language for health, coverage, live state, and confidence readouts.",
    atomicOutputs: ["gauges", "signal bars", "status tiles"],
    evidence: ["Telemetry page", "hero stripe", "route health checks"],
    readiness: "ready",
  },
  audit: {
    role: "Current-state inspection layer for primitive coverage, gaps, and stale surface detection.",
    atomicOutputs: ["audit rows", "status pills", "coverage cards"],
    evidence: ["Audit route", "gap states", "old route removal checks"],
    readiness: "ready",
  },
  implementation: {
    role: "Agent handoff contract for how future pages consume tokens, primitives, copy, and file structure.",
    atomicOutputs: ["implementation cards", "code samples", "agent rules"],
    evidence: ["Agent guide route", "source files listed", "token usage notes"],
    readiness: "ready",
  },
  qa: {
    role: "Repeatable responsive, accessibility, theme, Lighthouse, and asset verification matrix.",
    atomicOutputs: ["viewport matrix", "theme gates", "a11y checklist"],
    evidence: ["QA route", "nine viewport targets", "light/dark checks"],
    readiness: "ready",
  },
  production: {
    role: "Release gate for promoted primitives, known gaps, deployment proof, and production handoff.",
    atomicOutputs: ["release gates", "coverage matrix", "handoff states"],
    evidence: ["Production route", "build checks", "browser verification"],
    readiness: "needs-proof",
  },
}

const sharedDnaContracts: Record<(typeof sharedDnaOrder)[number], PrimitiveDnaContract> = {
  foundations: {
    role: "Root source for colour, type, spacing, radius, depth, material, motion, focus, icon treatment, responsive shells, wireframes, sizing, layout, and section-pattern rules.",
    atomicOutputs: ["token families", "material recipes", "wireframe/layout/sizing/section hubs"],
    evidence: ["Foundations route", "CSS variables", "Shared DNA expansion links"],
    readiness: "locked",
  },
  wireframes: {
    role: "Anatomy layer for page, section, card, control, table, overlay, and mobile skeletons before downstream visual styling.",
    atomicOutputs: ["page skeletons", "slot anatomy", "responsive wireframes"],
    evidence: ["Wireframes route", "seven skeleton families", "anatomy gates"],
    readiness: "ready",
  },
  layouts: {
    role: "Structural layout layer for gutters, max widths, split ratios, rails, bands, stacks, spacing rhythm, and responsive collapse rules.",
    atomicOutputs: ["split ratios", "rail/band/stack layouts", "spacing rules"],
    evidence: ["Layouts route", "six layout contracts", "collapse rules"],
    readiness: "ready",
  },
  sizing: {
    role: "Component sizing layer for buttons, icon buttons, pills, badges, cards, rows, fields, icon wells, and media frames.",
    atomicOutputs: ["size token table", "control scales", "usage matrix"],
    evidence: ["Sizing route", "component-size tokens", "existing button scale alignment"],
    readiness: "ready",
  },
  "section-patterns": {
    role: "Full-section taxonomy for hero, proof, feature, process, pricing, FAQ, CTA, footer, dashboard, workshop, product, form, media, state, and utility sections.",
    atomicOutputs: ["section taxonomy", "promotion gates", "BlockManifest-compatible guidance"],
    evidence: ["Section patterns route", "15 section families", "section-library boundary"],
    readiness: "ready",
  },
  surfaces: {
    role: "Material grammar that consumes Foundations tokens to produce carbon, glass, chrome, panel, card, recessed, raised, pressed, selected, media, and recovery shell states.",
    atomicOutputs: ["card primitive contract", "material trace", "surface families", "state matrix"],
    evidence: ["Surfaces route", "card primitive anchors", "Foundations trace", "state coverage table"],
    readiness: "ready",
  },
  typography: {
    role: "Atomic type roles inherited from Foundations for display, heading, body, mono, label, caption, numeric, controls, dense tables, and motion-safe kinetic text.",
    atomicOutputs: ["Foundation token inheritance", "type role components", "contained kinetic text"],
    evidence: ["Typography route", "role components", "reduced-motion containment"],
    readiness: "ready",
  },
  icons: {
    role: "Production Carbon & Red icon language, supplier-logo treatment, and downstream sizing, stroke, well, label, hover, focus, and reduced-motion rules.",
    atomicOutputs: ["Carbon & Red card and glyph wells", "source-backed supplier logo plates", "usage rules"],
    evidence: ["Icons route metadata", "PageHeader DNA contract", "local icon and supplier manifests"],
    readiness: "locked",
  },
  theming: {
    role: "Single theme and style-profile governance section. Foundations stay the source, theme presets set palette and typography, style profiles set material/radius/shadow/action/field/focus/motion treatment, and local editors remain scoped until promoted.",
    atomicOutputs: ["token source ledger", "dashboard-root presets", "style-profile bridge", "theme control entrypoint", "scoped token editors", "theme export snapshots"],
    evidence: ["Theming route", "theme catalog count", "global preset persistence", "theme/style bridge", "style profile dashboard data", "theme control route", "style profile route"],
    readiness: "ready",
  },
  actions: {
    role: "Command and CTA layer that promotes the red primary button as the default approval CTA, defines theme-matched alternatives, and treats site, ActionButton, liquid, metal, segmented, toolbar, icon, destructive, shadcn, size, and pill buttons as token-driven adapters.",
    atomicOutputs: ["red CTA", "theme alternatives", "small/medium/large buttons", "button pills", "ActionButton taxonomy", "icon tools", "segmented controls", "toolbar actions", "destructive commands"],
    evidence: ["Actions route", "button primitive anchors", "selected-theme button matrix", "size scale", "pill system", "adapter contract cards", "atomic output rail", "focus and reduced-motion states"],
    readiness: "ready",
  },
  forms: {
    role: "Input grammar that consumes Wireframes, Layouts, Sizing, Surfaces, Typography, Actions, Selection, and Feedback before rendering labels, hints, fields, selects, errors, validation, and submit states.",
    atomicOutputs: ["label/hint/error roles", "field/select anatomy", "submit rail", "validation states", "form family atlas"],
    evidence: ["Forms route", "FORM_DNA_ROLES source data", "FORM_FOUNDATION_CHAIN route links", "23 form pattern demos", "shared verifier DOM hooks"],
    readiness: "ready",
  },
  selection: {
    role: "Choice states for tabs, chips, badges, toggles, radios, checkboxes, active rows, and selected cards.",
    atomicOutputs: ["tabs", "chips", "toggles"],
    evidence: ["Selection route", "ARIA states", "keyboard-safe choices"],
    readiness: "ready",
  },
  navigation: {
    role: "Movement model for sidebars, breadcrumbs, command bars, context rails, menus, and mobile navigation.",
    atomicOutputs: ["breadcrumbs", "menus", "rails"],
    evidence: ["Navigation route", "shell links", "current states"],
    readiness: "ready",
  },
  feedback: {
    role: "User response layer for alerts, toast, progress, empty, loading, success, warning, and fault states.",
    atomicOutputs: ["toasts", "alerts", "progress"],
    evidence: ["Feedback route", "status variants", "reduced motion"],
    readiness: "ready",
  },
  overlays: {
    role: "Temporary focus surfaces for dialogs, sheets, command palettes, lightboxes, wizards, and blocking flows.",
    atomicOutputs: ["dialogs", "sheets", "menus"],
    evidence: ["Overlays route", "overlay docs", "focus expectations"],
    readiness: "ready",
  },
  "data-display": {
    role: "Structured information layer for tables, KPI cards, activity feeds, kanban, pricing, and dense dashboards.",
    atomicOutputs: ["tables", "KPI cards", "feeds"],
    evidence: ["Data display route", "dense examples", "overflow checks"],
    readiness: "ready",
  },
  search: {
    role: "Findability layer for global search, inline search, filters, active facets, result rows, and analytics.",
    atomicOutputs: ["search fields", "filters", "results"],
    evidence: ["Search route", "faceted routes", "analytics route"],
    readiness: "ready",
  },
  "file-browser": {
    role: "Asset and document navigation layer for trees, grid/list views, preview panes, upload, and selection.",
    atomicOutputs: ["tree", "file rows", "preview pane"],
    evidence: ["File browser route", "asset library variants", "selection states"],
    readiness: "ready",
  },
  motion: {
    role: "Motion semantics for reveal, stagger, magnetic, tilt, parallax, morph, scroll, and reduced-motion paths.",
    atomicOutputs: ["motion contracts", "reveal states", "reduced motion"],
    evidence: ["Motion route", "motion contracts", "CSS motion tokens"],
    readiness: "ready",
  },
  "mobile-shell": {
    role: "Responsive app shell primitives for top bars, bottom nav, drawers, action sheets, FABs, and modal sheets.",
    atomicOutputs: ["phone shell", "bottom nav", "action sheet"],
    evidence: ["Mobile shell route", "mobile QA", "tap target checks"],
    readiness: "ready",
  },
}

const sectionById = new Map(sections.map((section) => [section.id, section]))

function requireSection(id: string): PrimitiveSection {
  const section = sectionById.get(id)
  if (!section) {
    throw new Error(`Missing UI primitive section: ${id}`)
  }
  return section
}

function buildDnaSections<T extends readonly string[]>(
  group: DnaGroupId,
  order: T,
  contracts: Record<T[number], PrimitiveDnaContract>,
): PrimitiveDnaSection[] {
  return order.map((id, index) => {
    const sectionId = id as T[number]

    return {
      index: `${group === "source" ? "00" : "01"}.${String(index + 1).padStart(2, "0")}`,
      group,
      section: requireSection(sectionId),
      contract: contracts[sectionId],
    }
  })
}

export const sourceTruthSections = buildDnaSections("source", sourceTruthOrder, sourceTruthContracts)

export const sharedDnaSections = buildDnaSections("shared", sharedDnaOrder, sharedDnaContracts)

const dnaSectionById = new Map(
  [...sourceTruthSections, ...sharedDnaSections].map((section) => [section.section.id, section]),
)

export function getPrimitiveDnaSection(id: string): PrimitiveDnaSection | undefined {
  return dnaSectionById.get(id)
}

export const dnaSourceGroups = [
  {
    id: "source" as const,
    label: "00 / Source of truth",
    summary: "Governs evidence, QA, production readiness, theme control, and future-agent handoff.",
    sections: sourceTruthSections,
  },
  {
    id: "shared" as const,
    label: "01 / Shared DNA",
    summary: "Governs atomic foundations, primitives, material treatment, interactions, and app shells.",
    sections: sharedDnaSections,
  },
] as const

export const dnaRouteCount = sourceTruthSections.length + sharedDnaSections.length
