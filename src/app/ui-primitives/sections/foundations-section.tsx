import type { CSSProperties } from "react"

import { carbonRedIcons, type CarbonRedIcon } from "../components/icons-carbon-red"
import { sharedDnaSections } from "../source-of-truth"
import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"
import { SectionHeader } from "./section-shell"

type FoundationLayer = {
  index: string
  title: string
  contract: string
  feeds: readonly string[]
}

type TokenGroup = {
  title: string
  description: string
  tokens: readonly {
    name: string
    value: string
    tone?: string
  }[]
}

type Recipe = {
  title: string
  token: string
  description: string
  className: string
}

type Gate = {
  title: string
  rule: string
  target: string
}

type ResponsiveShell = {
  title: string
  rule: string
  primitives: readonly string[]
}

const iconIds = ["exhaust-pipe", "spark-plug", "actions-save", "access-settings"] as const

const foundationIcons = iconIds
  .map((id) => carbonRedIcons.find((icon) => icon.id === id))
  .filter(Boolean) as CarbonRedIcon[]

const downstreamSections = sharedDnaSections.filter(
  (dnaSection) => dnaSection.section.id !== "foundations",
)

const layers: readonly FoundationLayer[] = [
  {
    index: "F-01",
    title: "Token Registry",
    contract: "Colour, type, spacing, radius, depth, focus, icon, and motion values live in the global `--primitive-*` layer before any route adds local composition.",
    feeds: ["Surfaces", "Typography", "Theming", "Actions"],
  },
  {
    index: "F-02",
    title: "Material Recipes",
    contract: "Carbon fibre, metallic red, chrome edge, glass, and recessed fields are recipes. Chrome is a highlight rail, not a full-card finish.",
    feeds: ["Surfaces", "Overlays", "Data display", "File browser"],
  },
  {
    index: "F-03",
    title: "Type Roles",
    contract: "Display, heading, body, mono, label, caption, numeric, and control text roles are fixed before page composition.",
    feeds: ["Typography", "Search", "Navigation", "Feedback"],
  },
  {
    index: "F-04",
    title: "Responsive Shells",
    contract: "Desktop, tablet, and mobile shells share gutters, tap targets, page headers, route contracts, and overflow rules.",
    feeds: ["Navigation", "Overlays", "Mobile shell", "Forms"],
  },
]

const tokenGroups: readonly TokenGroup[] = [
  {
    title: "Colour Channels",
    description: "The minimum semantic palette every primitive consumes before custom state colour.",
    tokens: [
      { name: "--primitive-canvas", value: "#050508", tone: "#050508" },
      { name: "--primitive-panel", value: "rgba(16,16,22,.82)", tone: "#101016" },
      { name: "--primitive-text-strong", value: "#ffffff", tone: "#ffffff" },
      { name: "--primitive-red", value: "#e62028", tone: "#e62028" },
      { name: "--primitive-amber", value: "#ffc14f", tone: "#ffc14f" },
      { name: "--primitive-teal", value: "#40bcff", tone: "#40bcff" },
    ],
  },
  {
    title: "Type Roles",
    description: "Fluid only where hierarchy needs it; UI chrome stays predictable and compact.",
    tokens: [
      { name: "--primitive-display", value: "clamp(3rem, 1rem + 7vw, 7.5rem)" },
      { name: "--primitive-h1", value: "clamp(2.25rem, 1.2rem + 4vw, 4rem)" },
      { name: "--primitive-text-base", value: "0.9375rem" },
      { name: "--primitive-text-2xs", value: "0.625rem" },
      { name: "--primitive-font-display", value: "Oswald / Anton" },
      { name: "--primitive-font-mono", value: "technical mono" },
    ],
  },
  {
    title: "Space + Radius",
    description: "A 4px base with small radii keeps the product dense, mechanical, and repeatable.",
    tokens: [
      { name: "--primitive-space-1", value: "4px" },
      { name: "--primitive-space-4", value: "16px" },
      { name: "--primitive-space-8", value: "32px" },
      { name: "--primitive-radius-sm", value: "4px" },
      { name: "--primitive-radius-md", value: "8px" },
      { name: "--primitive-radius-lg", value: "12px" },
    ],
  },
  {
    title: "Motion + Focus",
    description: "Short interaction motion, visible focus, and reduced-motion exits are part of the foundation.",
    tokens: [
      { name: "--primitive-duration-fast", value: "150ms" },
      { name: "--primitive-duration-normal", value: "240ms" },
      { name: "--primitive-ease-out", value: "cubic-bezier(.16,1,.3,1)" },
      { name: "--primitive-focus-ring", value: "#40bcff", tone: "#40bcff" },
      { name: "--primitive-focus-shadow", value: "0 0 0 3px" },
      { name: "--primitive-icon-stroke", value: "1.75" },
    ],
  },
]

const recipes: readonly Recipe[] = [
  {
    title: "Carbon Weave",
    token: "--primitive-carbon-weave",
    description: "Base material for premium cards, icon wells, and command surfaces.",
    className: local.foundationRecipeCarbon,
  },
  {
    title: "Metallic Red",
    token: "--primitive-metallic-red",
    description: "Primary command finish; hover can shift to metallic amber, never flat orange.",
    className: local.foundationRecipeRed,
  },
  {
    title: "Chrome Edge",
    token: "--primitive-chrome-edge",
    description: "Used as a bevel, separator, or highlight band. Never promoted into an entire card skin.",
    className: local.foundationRecipeChrome,
  },
  {
    title: "Obsidian Glass",
    token: "--primitive-panel-strong",
    description: "Route headers, overlays, tool panels, and data-dense cards.",
    className: local.foundationRecipeGlass,
  },
]

const responsiveShells: readonly ResponsiveShell[] = [
  {
    title: "Desktop workbench",
    rule: "Wide layouts use route headers, source boards, dense grids, and rails with stable gutters and no hidden dependency context.",
    primitives: ["page header", "source board", "side rail", "data grid"],
  },
  {
    title: "Tablet stack",
    rule: "Two-column grids collapse before content squeezes. Cards keep token rows, icon wells, and state labels readable.",
    primitives: ["two-up cards", "wrapped chips", "scroll-safe tables", "compact panels"],
  },
  {
    title: "Mobile shell",
    rule: "Everything stacks to one column, code and token values wrap, icon tiles shrink, and tap targets stay at control scale.",
    primitives: ["single column", "wrapped code", "bottom actions", "modal sheets"],
  },
]

const foundationCoreRoutes = [
  {
    index: "01.02",
    title: "Wireframes",
    href: "/ui-primitives/wireframes",
    summary: "Page, section, card, control, table, overlay, and mobile skeletons.",
    outputs: ["slot anatomy", "wireframes", "responsive skeletons"],
  },
  {
    index: "01.03",
    title: "Layouts",
    href: "/ui-primitives/layouts",
    summary: "Gutters, max widths, split ratios, rails, bands, stacks, and collapse rules.",
    outputs: ["split ratios", "page rhythm", "rail/band patterns"],
  },
  {
    index: "01.04",
    title: "Sizing",
    href: "/ui-primitives/sizing",
    summary: "Named sizes for buttons, icon tools, pills, cards, rows, fields, wells, and media.",
    outputs: ["control scale", "card scale", "media scale"],
  },
  {
    index: "01.05",
    title: "Section patterns",
    href: "/ui-primitives/section-patterns",
    summary: "Full-section taxonomy for heroes, proof, dashboards, products, forms, media, and states.",
    outputs: ["section taxonomy", "promotion gates", "library boundary"],
  },
] as const

const gates: readonly Gate[] = [
  {
    title: "Source before surface",
    rule: "New primitives must declare token, material, type, state, and responsive shell usage before visual variants.",
    target: "all 01 sections",
  },
  {
    title: "No orphan styling",
    rule: "Avoid raw colour, random radius, and one-off shadows when an existing foundation token covers the same job.",
    target: "CSS modules",
  },
  {
    title: "Responsive from origin",
    rule: "Desktop shell, tablet shell, and mobile shell rules must be part of the primitive contract, not a later patch.",
    target: "navigation + shell pages",
  },
  {
    title: "Premium icon parity",
    rule: "If an icon enters a component, its size, well, label, and hover state must match the Carbon & Red standard.",
    target: "icons + actions",
  },
  {
    title: "Chrome restraint",
    rule: "Chrome may frame, divide, or catch light. It must not become a high-glare card body or wash out readable content.",
    target: "materials + cards",
  },
  {
    title: "Inheritance trace",
    rule: "Every Shared DNA route should be able to point back to the Foundation token family or material recipe it consumes.",
    target: "all downstream pages",
  },
]

const swatchStyle = (tone: string): CSSProperties => ({ "--foundation-tone": tone } as CSSProperties)

export function FoundationsSection() {
  return (
    <section id="foundations" className={`${styles.section} ${local.foundationRoot}`}>
      <SectionHeader eyebrow="01 / Foundations" title="Foundations of every primitive">
        This is the first Shared DNA route. Every later section must consume these source
        layers before it adds variants, examples, or app-specific composition.
      </SectionHeader>

      <div className={local.foundationHeroGrid}>
        <article className={local.foundationSourcePanel}>
          <span className={local.foundationLabel}>Root contract</span>
          <h3>Foundation first, then build every primitive from the same source.</h3>
          <p>
            Foundations define the non-negotiable source: tokens, material recipes, type
            roles, focus states, icon treatment, and responsive shells. Surfaces,
            typography, icons, theming, actions, forms, selection, navigation, feedback,
            overlays, data display, search, file browsers, motion, desktop shells, and
            mobile shells all build from this layer.
          </p>
          <div className={local.foundationStats} aria-label="Foundation source status">
            <span>
              <strong>01.01</strong>
              First shared route
            </span>
            <span>
              <strong>20</strong>
              Shared DNA routes
            </span>
            <span>
              <strong>0</strong>
              Orphan style rules
            </span>
          </div>
        </article>

        <aside className={local.foundationIconRail} aria-label="Premium icon treatment reference">
          <div className={local.foundationRailHead}>
            <span>Icon treatment</span>
            <strong>Carbon & Red baseline</strong>
          </div>
          <div className={local.foundationIconGrid}>
            {foundationIcons.map((icon) => (
              <figure key={icon.id} className={local.foundationIconTile}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon.card} alt={icon.label} width={96} height={96} loading="lazy" />
                <figcaption>{icon.label}</figcaption>
              </figure>
            ))}
          </div>
        </aside>
      </div>

      <section className={local.foundationExpansionPanel} aria-labelledby="foundation-expansion-title">
        <header className={local.foundationBoardHeader}>
          <span>Primitive foundation expansion</span>
          <h3 id="foundation-expansion-title">The missing core DNA is now explicit</h3>
          <p>
            Foundations remains the source route, but these four boards define the practical
            build basis that every later primitive needs: skeleton, layout, sizing, and
            full-section composition.
          </p>
        </header>
        <div className={local.foundationExpansionGrid}>
          {foundationCoreRoutes.map((route) => (
            <a key={route.href} href={route.href} className={local.foundationExpansionCard}>
              <span>{route.index}</span>
              <h4>{route.title}</h4>
              <p>{route.summary}</p>
              <div>
                {route.outputs.map((output) => (
                  <small key={output}>{output}</small>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className={local.foundationLineagePanel} aria-label="Downstream inheritance map">
        <header className={local.foundationBoardHeader}>
          <span>Dependency cue</span>
          <h3>Every Shared DNA primitive starts here</h3>
          <p>
            Foundations is the source section. The routes below can add variants and
            implementation examples only after they inherit a Foundation token, material,
            motion, focus, icon, or responsive shell rule.
          </p>
        </header>
        <div className={local.foundationLineageGrid}>
          {downstreamSections.map((dnaSection) => (
            <article key={dnaSection.section.id} className={local.foundationLineageCard}>
              <span>{dnaSection.index}</span>
              <h4>{dnaSection.section.label}</h4>
              <p>{dnaSection.contract.role}</p>
              <small>{dnaSection.contract.atomicOutputs.join(" / ")}</small>
            </article>
          ))}
        </div>
      </section>

      <div className={local.foundationLayerGrid}>
        {layers.map((layer) => (
          <article key={layer.index} className={local.foundationLayerCard}>
            <span className={local.foundationLayerIndex}>{layer.index}</span>
            <h3>{layer.title}</h3>
            <p>{layer.contract}</p>
            <div className={local.foundationFeeds}>
              {layer.feeds.map((feed) => (
                <span key={feed}>{feed}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className={local.foundationTokenBoard}>
        <header className={local.foundationBoardHeader}>
          <span>Token source</span>
          <h3>Atomic variables that downstream sections must consume</h3>
          <p>
            These rows are the custody layer for source values. Downstream sections can
            alias them into components, but should not fork the raw visual decisions.
          </p>
        </header>
        <div className={local.foundationTokenGrid}>
          {tokenGroups.map((group) => (
            <article key={group.title} className={local.foundationTokenGroup}>
              <h4>{group.title}</h4>
              <p>{group.description}</p>
              <div className={local.foundationTokenRows}>
                {group.tokens.map((token) => (
                  <div key={token.name} className={local.foundationTokenRow}>
                    {token.tone ? (
                      <span
                        className={local.foundationSwatch}
                        style={swatchStyle(token.tone)}
                        aria-hidden="true"
                      />
                    ) : (
                      <span className={local.foundationTick} aria-hidden="true" />
                    )}
                    <code>{token.name}</code>
                    <span>{token.value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className={local.foundationResponsivePanel} aria-label="Responsive primitive rules">
        <header className={local.foundationBoardHeader}>
          <span>Responsive source</span>
          <h3>Shell rules are inherited with the tokens</h3>
          <p>
            Responsive behavior is not a cleanup pass. It is part of the Foundation
            contract consumed by navigation, forms, overlays, data display, file browser,
            search, and the mobile shell route.
          </p>
        </header>
        <div className={local.foundationResponsiveGrid}>
          {responsiveShells.map((shell) => (
            <article key={shell.title} className={local.foundationResponsiveCard}>
              <h4>{shell.title}</h4>
              <p>{shell.rule}</p>
              <div>
                {shell.primitives.map((primitive) => (
                  <span key={primitive}>{primitive}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className={local.foundationRecipeGrid}>
        {recipes.map((recipe) => (
          <article key={recipe.title} className={`${local.foundationRecipe} ${recipe.className}`}>
            <span>{recipe.token}</span>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </article>
        ))}
      </div>

      <section className={local.foundationGatePanel} aria-label="Foundation gates">
        <header className={local.foundationBoardHeader}>
          <span>Build gates</span>
          <h3>Rules every next section inherits</h3>
        </header>
        <div className={local.foundationGateGrid}>
          {gates.map((gate, index) => (
            <article key={gate.title} className={local.foundationGate}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{gate.title}</h4>
              <p>{gate.rule}</p>
              <strong>{gate.target}</strong>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
