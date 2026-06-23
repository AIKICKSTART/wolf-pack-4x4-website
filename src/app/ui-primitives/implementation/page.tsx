import type { Metadata } from "next"
import Link from "next/link"
import type { CSSProperties } from "react"

import {
  PrimitiveImplementationCard,
  type PrimitiveImplementationDoc,
} from "../components/help-docs"
import { PageHeader } from "../components/page-header"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Agent Implementation Guide | UI Primitives",
}

const systemContracts = [
  {
    title: "Shared Core Primitives",
    tone: "var(--primitive-teal)",
    body: "Buttons, forms, selection controls, navigation, overlays, feedback, typography, icons, tokens, and motion used by every Mufflermen product.",
    tags: ["shared tokens", "a11y first", "barrel imports"],
  },
  {
    title: "Website Primitives",
    tone: "var(--primitive-amber)",
    body: "Marketing pages, service pages, location pages, maps, banners, forms, conversion CTAs, email and campaign primitives for mufflermen.com.au.",
    tags: ["conversion", "SEO pages", "service copy"],
  },
  {
    title: "Hermes Dashboard Primitives",
    tone: "var(--primitive-teal)",
    body: "Operator dashboards, KPIs, command surfaces, AI assistant, workflow builder, inbox, audit events, and marketing approval pipelines.",
    tags: ["operator UI", "dense data", "command rail"],
  },
  {
    title: "Muffler Pulse / Postiz",
    tone: "var(--primitive-amber)",
    body: "Social composer, content calendar, approval flow, channel status, campaign analytics, notification inbox, and media preview states.",
    tags: ["social automation", "calendar", "channels"],
  },
  {
    title: "Workshop Management",
    tone: "var(--primitive-red)",
    body: "Quote builder, vehicle profile, fitment checks, job tickets, weld-bay allocation, front desk, technician mobile, CRM, invoices and print docs.",
    tags: ["rego / VIN", "fitment", "job flow"],
  },
  {
    title: "Parts System",
    tone: "var(--primitive-green)",
    body: "Parts catalogue, product cards, supplier media, compatibility filters, shipping, cart, checkout, pricing, receiver dashboard and product search.",
    tags: ["catalogue", "fitment search", "commerce"],
  },
  {
    title: "CMS / Agent UI",
    tone: "var(--primitive-green)",
    body: "Payload CMS, Control OS, permissions, auth, account, KYC, production gates, AI task surfaces, citations, tools, and audit trails.",
    tags: ["control", "permissions", "agent notes"],
  },
  {
    title: "Marketing / Presentation",
    tone: "var(--primitive-teal)",
    body: "Approved logos, campaign visuals, hero images, social tiles, presentation examples, video loops, and reusable banner grammar.",
    tags: ["brand assets", "logos", "presentation"],
  },
]

const systemReadiness = [
  {
    title: "mufflermen.com.au",
    tone: "var(--primitive-amber)",
    sourceRoute: "/ui-primitives/marketing",
    routes: ["/ui-primitives/marketing/full-landing", "/ui-primitives/forms-gallery", "/ui-primitives/maps"],
    boundary:
      "Public production website. Primitive changes must promote through task branch, PR, staging, browser QA, approval, then production.",
    qa: "SEO surfaces, service copy, forms, maps, image sizing, tap targets, no dark/light bleed, Lighthouse 100 target.",
    contract: "Website primitives own public conversion grammar; do not let app-dashboard density leak into public pages.",
  },
  {
    title: "Muffler Pulse / Postiz",
    tone: "var(--primitive-amber)",
    sourceRoute: "/ui-primitives/mufflerpulse",
    routes: ["/ui-primitives/notifications", "/ui-primitives/calendar", "/ui-primitives/brand-assets"],
    boundary:
      "Social automation surface only. Future publishing controls stay design-only until permissions and approvals are secured.",
    qa: "Composer, channel states, approval status, notification density, media previews, schedule cards and reduced motion.",
    contract: "Pulse primitives use warm campaign energy while preserving the same buttons, cards, tokens and focus states.",
  },
  {
    title: "Hermes dashboard",
    tone: "var(--primitive-teal)",
    sourceRoute: "/ui-primitives/hermes",
    routes: ["/ui-primitives/dashboards", "/ui-primitives/workflows", "/ui-primitives/production"],
    boundary:
      "Operator UI reference for authorised task intake, PR gates, staging deploys, browser QA and approval reporting.",
    qa: "Dense data readability, command states, audit trail visibility, explicit approval language and no secret exposure.",
    contract: "Hermes primitives must never imply production can be deployed without human approval and gate evidence.",
  },
  {
    title: "Workshop management",
    tone: "var(--primitive-red)",
    sourceRoute: "/ui-primitives/workshop-scenes",
    routes: ["/ui-primitives/workshop", "/ui-primitives/crm", "/ui-primitives/print-docs"],
    boundary:
      "Internal job-flow surfaces for quoting, fitment, tickets, front desk, technician mobile and printable handoff docs.",
    qa: "Mobile technician widths, job-card density, print preview, high-contrast status chips, VIN/rego/SKU overflow.",
    contract: "Workshop primitives can be dense, but every state still needs clear hierarchy and keyboard-safe controls.",
  },
  {
    title: "Parts system",
    tone: "var(--primitive-green)",
    sourceRoute: "/ui-primitives/workshop-scenes/parts-catalog",
    routes: ["/ui-primitives/commerce", "/ui-primitives/search", "/ui-primitives/marketing/full-landing"],
    boundary:
      "Catalogue and ecommerce grammar for fitment search, product cards, compatibility filters, cart and checkout.",
    qa: "Long SKU wrapping, product media fallbacks, filter controls, checkout steps, freight/payment clarity and Lighthouse blockers.",
    contract: "Parts primitives use green readiness signals without drifting away from Mufflermen chrome/glass material rules.",
  },
  {
    title: "CMS / Control OS",
    tone: "var(--primitive-green)",
    sourceRoute: "/ui-primitives/permissions",
    routes: ["/ui-primitives/auth", "/ui-primitives/account", "/ui-primitives/kyc", "/ui-primitives/help-docs"],
    boundary:
      "Payload/CMS/admin primitives. Category indexes stay complete; implementation docs belong on detail routes.",
    qa: "Auth and role semantics, KYC journey completeness, audit logs, account safety, no duplicate IDs and form labels.",
    contract: "Keep the fuller KYC index intact; add source-file guidance to detail pages instead of replacing catalogs.",
  },
  {
    title: "Agent UIs",
    tone: "var(--primitive-teal)",
    sourceRoute: "/ui-primitives/ai",
    routes: ["/ui-primitives/inbox", "/ui-primitives/workflows", "/ui-primitives/qa"],
    boundary:
      "AI and agent task surfaces for prompts, tool calls, citations, conversation rails, approvals and QA evidence.",
    qa: "Streaming states, citations, tool-call cards, keyboard traversal, reduced motion and audit-friendly status wording.",
    contract: "Agent primitives must surface evidence and approvals, not hide consequential automation behind decorative UI.",
  },
  {
    title: "Future business platforms",
    tone: "var(--primitive-red)",
    sourceRoute: "/ui-primitives/implementation",
    routes: ["/ui-primitives/brand-assets", "/ui-primitives/qa", "/ui-primitives/production"],
    boundary:
      "Bootstrap grammar for future Telegram, Google Workspace, marketing and reporting platforms. Design only until secured.",
    qa: "Explicit disabled states, permission language, approval copy, responsive matrices and asset-source traceability.",
    contract: "Future platforms inherit this source of truth first, then earn implementation only after security review.",
  },
] as const

const implementationDocs: PrimitiveImplementationDoc[] = [
  {
    id: "shared-site-button",
    title: "Mufflermen site button",
    componentName: "siteButton + variant classes",
    importPath: "src/app/ui-primitives/ui-primitives.module.css",
    sourceFiles: {
      route: "src/app/ui-primitives/actions/page.tsx",
      component: "src/app/ui-primitives/sections/actions-section.tsx",
      styles: "src/app/ui-primitives/ui-primitives.module.css",
    },
    setup: [
      {
        label: "Use the shared class recipe",
        detail: "Compose `siteButton` with `siteButtonRed`, `siteButtonChrome`, or `siteButtonGhost` so hover and focus states stay consistent.",
      },
      {
        label: "Keep action copy mechanical",
        detail: "Use direct workshop verbs: inspect, quote, approve, schedule, fit, dispatch, publish.",
      },
      {
        label: "Render inside a glass panel",
        detail: "Buttons are tuned for primitive panels that use `--primitive-panel`, `--primitive-line`, and shared neumorphic shadows.",
      },
    ],
    usageGuidance: [
      "Primary actions use red/chrome contrast; secondary actions use ghost glass.",
      "Avoid generic SaaS copy like Submit or Continue when a workshop-specific verb is available.",
      "Use icons only when they clarify the action; keep arrow glyphs for forward conversion actions.",
    ],
    accessibility: [
      "Buttons and links need visible text labels, not icon-only labels unless `aria-label` is present.",
      "Focus-visible must remain stronger than hover.",
      "Do not remove underline alternatives from links without a clear button affordance.",
    ],
    responsive: [
      "Allow wrapping in `heroActions` and `buttonRow`.",
      "Use min-height rather than fixed height so copy can localise safely.",
      "On mobile, stack critical CTAs above decorative controls.",
    ],
    tokens: [
      "--primitive-red",
      "--primitive-red-dark",
      "--primitive-line-strong",
      "--primitive-font-mono",
      "--primitive-control-surface",
      "--primitive-surface-shadow",
    ],
    dependencies: ["next/link", "lucide-react where icons are needed"],
    agentNotes: [
      "Keep the chrome/paint/glass feeling, not flat red SaaS buttons.",
      "Use Oak Flats, NSW, rego, VIN, fitment, weld bay, Manta, Hilux and Ranger copy where relevant.",
      "Never create a one-off button style for an app section without mapping it back to these tokens.",
    ],
    samples: [
      {
        title: "Minimal usage",
        fileName: "example-button.tsx",
        language: "tsx",
        code: `<a className={\`\${styles.siteButton} \${styles.siteButtonRed}\`} href="/quote">
  Start fitment quote
  <ArrowGlyph />
</a>`,
      },
    ],
  },
  {
    id: "primitive-panel",
    title: "Glass-neumo primitive panel",
    componentName: "shared panel surface",
    importPath: "src/app/ui-primitives/ui-primitives.module.css",
    sourceFiles: {
      route: "src/app/ui-primitives/surfaces/page.tsx",
      component: "src/app/ui-primitives/sections/surfaces-section.tsx",
      styles: "src/app/ui-primitives/ui-primitives.module.css",
    },
    setup: [
      {
        label: "Use semantic tokens first",
        detail: "Panel backgrounds, borders, hover shadows and textures must come from primitive tokens so light/dark are intentional profiles.",
      },
      {
        label: "Pair glass with structure",
        detail: "Use 1px borders, compact labels, strong headings and quiet texture so glass does not reduce legibility.",
      },
      {
        label: "Reserve glow for state",
        detail: "Use accent glow for active, risk, ready, needs-review, or live telemetry states only.",
      },
    ],
    usageGuidance: [
      "Default panels carry content; raised panels call attention to action or status.",
      "Use red for urgency, amber for review, teal for system telemetry, green for ready/completed.",
      "Do not paste custom dark cards into route modules; alias to the shared surface tokens.",
    ],
    accessibility: [
      "Text must meet contrast in both profiles.",
      "Avoid blur directly behind body copy unless there is a solid panel layer.",
      "Motion overlays need `prefers-reduced-motion` support.",
    ],
    responsive: [
      "Panels should use `minmax(0, 1fr)` grids and wrap at existing breakpoints.",
      "Avoid fixed-width inner content inside app sections.",
      "Use overflow wrapping for codes, VINs, ABNs, part SKUs and route paths.",
    ],
    tokens: [
      "--primitive-panel",
      "--primitive-panel-strong",
      "--primitive-line",
      "--primitive-glass-soft",
      "--primitive-neumo-light",
      "--primitive-neumo-dark",
      "--primitive-shadow-soft",
    ],
    dependencies: ["CSS Modules", "primitive layout shell"],
    agentNotes: [
      "Light mode should feel like pearl enamel and frosted workshop glass, not inverted dark mode.",
      "Dark mode should feel like obsidian, chrome, red paint and instrument glass.",
      "Keep the same radius and density across website, Hermes, Pulse, parts and workshop apps.",
    ],
    samples: [
      {
        title: "Panel recipe",
        fileName: "surface-card.module.css",
        language: "css",
        code: `.card {
  border: 1px solid var(--primitive-line);
  border-radius: 10px;
  background:
    linear-gradient(180deg, var(--primitive-glass-soft), transparent),
    var(--primitive-panel);
  box-shadow: var(--primitive-surface-shadow);
  backdrop-filter: blur(18px) saturate(1.12);
}`,
      },
    ],
  },
  {
    id: "kyc-detail-docs",
    title: "KYC primitive appendix pattern",
    componentName: "PrimitiveImplementationCard",
    importPath: "src/app/ui-primitives/components/help-docs",
    sourceFiles: {
      route: "src/app/ui-primitives/kyc/id-upload/page.tsx",
      component: "src/app/ui-primitives/components/help-docs/primitive-implementation-card.tsx",
      styles: "src/app/ui-primitives/components/help-docs/primitive-implementation-card.module.css",
      barrel: "src/app/ui-primitives/components/help-docs/index.ts",
    },
    setup: [
      {
        label: "Keep indexes intact",
        detail: "Category indexes such as KYC stay as catalogs. Append implementation cards only to primitive detail routes.",
      },
      {
        label: "Document the source files",
        detail: "Every detail route should identify route, component, style, barrel and type files.",
      },
      {
        label: "Copy guidance is part of the primitive",
        detail: "Agent notes must specify domain language, token usage, accessibility and responsive behaviour.",
      },
    ],
    usageGuidance: [
      "Use this appendix pattern for all primitive detail routes over time.",
      "Start with KYC, actions, navigation, surfaces, Hermes, Pulse, parts catalog and marketing heroes.",
      "Keep detail docs practical: enough code to recreate the primitive without dumping full source files.",
    ],
    accessibility: [
      "List required ARIA patterns for each primitive.",
      "Call out keyboard/focus expectations.",
      "Document reduced-motion and contrast assumptions.",
    ],
    responsive: [
      "State how each primitive collapses on mobile.",
      "Document safe minimum widths and wrapping rules.",
      "Call out overflow risks for data-heavy primitives.",
    ],
    tokens: [
      "--primitive-font-display",
      "--primitive-font-mono",
      "--primitive-body",
      "--primitive-line",
      "--primitive-control-surface",
    ],
    dependencies: ["CodeBlock", "PageHeader", "CSS Modules"],
    agentNotes: [
      "Do not replace the existing fuller KYC index.",
      "Use route-level docs as source-of-truth contracts for future AI agents.",
      "Prefer concise examples over long full-file copies.",
    ],
    samples: [
      {
        title: "Detail route appendix",
        fileName: "kyc/id-upload/page.tsx",
        language: "tsx",
        code: `<PrimitiveImplementationCard doc={KYC_PRIMITIVE_DOCS["id-upload"]} />`,
      },
    ],
  },
]

export default function ImplementationGuidePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="00 / Source of truth"
        title="Agent implementation guide"
        description="The rules future agents must follow to build Mufflermen interfaces with the same light/dark material profiles, app segmentation, accessibility, responsive behaviour and conversion polish."
        dnaSectionId="implementation"
      />

      <section className={styles.section}>
        <div className={styles.systemGrid}>
          {systemContracts.map((system) => (
            <article
              key={system.title}
              className={styles.systemCard}
              style={{ "--card-tone": system.tone } as CSSProperties}
            >
              <h2>{system.title}</h2>
              <p>{system.body}</p>
              <div className={styles.systemMeta}>
                {system.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="system-readiness" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>System readiness</span>
          <div>
            <h2>Every product surface maps back to primitives</h2>
            <p>
              This is the handoff map future agents must use before touching product UI. It keeps
              website, Hermes, Pulse, workshop, parts, CMS and agent surfaces on the same token,
              QA and approval rails.
            </p>
          </div>
        </div>
        <div className={styles.systemGrid}>
          {systemReadiness.map((system) => (
            <article
              key={system.title}
              className={styles.systemCard}
              style={{ "--card-tone": system.tone } as CSSProperties}
            >
              <h2>{system.title}</h2>
              <p>{system.boundary}</p>
              <div className={styles.systemMeta}>
                <Link href={system.sourceRoute} prefetch={false}>
                  Source route
                </Link>
                {system.routes.map((route) => (
                  <span key={route}>{route}</span>
                ))}
              </div>
              <p>
                <strong>QA:</strong> {system.qa}
              </p>
              <p>
                <strong>Contract:</strong> {system.contract}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <h2>Required primitive anatomy</h2>
            <ol className={styles.stepList}>
              {[
                "Live visual preview",
                "Intentional light mode example",
                "Intentional dark mode example",
                "Code block and setup instructions",
                "Usage, accessibility, responsive and token notes",
              ].map((step, index) => (
                <li key={step}>
                  <strong>{index + 1}</strong>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className={styles.guideCard}>
            <h2>Design DNA</h2>
            <p>
              Dark mode is obsidian, chrome, red paint, amber workshop light and instrument glass.
              Light mode is pearl enamel, frosted workshop glass, clean steel shadows and calibrated
              red/teal/green signals. Both modes use the same spacing, radius, typography and icon
              grammar.
            </p>
            <pre className={styles.codeBlock}>
{`Use: --primitive-red, --primitive-amber, --primitive-teal
Use: --primitive-panel, --primitive-line, --primitive-shadow-soft
Use: Anton display + mono micro labels
Avoid: one-off app palettes, generic SaaS copy, dark-only cards`}
            </pre>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.guideGrid}>
          {implementationDocs.map((doc) => (
            <PrimitiveImplementationCard key={doc.id} doc={doc} />
          ))}
        </div>
      </section>
    </main>
  )
}
