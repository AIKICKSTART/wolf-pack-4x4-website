import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"

type PrimitiveFamily = {
  family: string
  primitives: string
  currentSource: string
  gate: string
}

const primitiveFamilies: readonly PrimitiveFamily[] = [
  {
    family: "Foundations",
    primitives: "Colour, type, spacing, radius, elevation, material, motion",
    currentSource: "globals.css, mufflermen.css, dashboard tokens",
    gate: "Readable with shaders off and reduced motion enabled",
  },
  {
    family: "Actions",
    primitives: "Primary, secondary, chrome, ghost, icon, destructive, disabled",
    currentSource: "global .btn classes, Base UI Button, and the ui-primitives button family",
    gate: "Stable 44px targets, focus ring, hover, press, disabled states",
  },
  {
    family: "Forms",
    primitives: "Input, textarea, field group, error, select, checkbox, radio",
    currentSource: "src/components/ui plus parts lookup controls",
    gate: "Labels, descriptions, aria-invalid, keyboard operation",
  },
  {
    family: "Selection",
    primitives: "Tabs, badges, filter chips, checked rows, segmented control",
    currentSource: "Badge, Tabs, current parts filters, dashboard samples",
    gate: "Selected state is visible without relying only on colour",
  },
  {
    family: "Surfaces",
    primitives: "Card, panel, list, table, media stub, empty state",
    currentSource: ".glass, .neumo, .seo-card, route-panel, Card",
    gate: "Compact, non-nested, scannable, no text collision",
  },
  {
    family: "Navigation",
    primitives: "Left rail, top nav, breadcrumb, command bar, context rail",
    currentSource: "homepage nav, SEO nav, dashboard rail",
    gate: "Works as app shell and public-site navigation pattern",
  },
  {
    family: "Feedback",
    primitives: "Dialog, sheet, alert, snackbar, progress, skeleton, disclosure",
    currentSource: "Dialog, Sheet, Accordion and dashboard-only samples",
    gate: "Interactive primitives are keyboard accessible and visible",
  },
  {
    family: "Workshop UX",
    primitives: "Quote path, service card, parts card, job slot, fitment note",
    currentSource: "homepage, SEO pages, parts lookup, dashboard domain samples",
    gate: "Reusable across service, parts, location, and quote surfaces",
  },
] as const

const productionGates = [
  "No generic landing-page wrapper; the first screen is the primitives product surface.",
  "All current website primitive sources are named in the audit matrix.",
  "Base UI primitives and global Mufflermen CSS primitives are both represented.",
  "Domain-specific workshop primitives exist beside generic UI primitives.",
  "Responsive layout has desktop and mobile evidence, including no clipped headline text.",
  "Motion is decorative only, has reduced-motion CSS, and does not carry meaning.",
  "The route is noindex and can be inspected without changing customer-facing pages.",
  "Lint, TypeScript, build, and live route checks must pass before calling complete.",
] as const

export function ProductionSection() {
  return (
    <section id="production" className={styles.section}>
      <SectionHeader eyebrow="09 / Production" title="Coverage matrix and release gates">
        This matrix turns the dashboard into an audit surface: every primitive family has a
        current source, a reusable target, and a production gate.
      </SectionHeader>

      <div className={styles.productionGrid}>
        <article className={styles.matrixPanel}>
          <h3>Primitive matrix</h3>
          <div className={styles.matrixTable} role="table" aria-label="Primitive family coverage matrix">
            <div role="row">
              <span role="columnheader">Family</span>
              <span role="columnheader">Primitives</span>
              <span role="columnheader">Current source</span>
              <span role="columnheader">Gate</span>
            </div>
            {primitiveFamilies.map((item) => (
              <div role="row" className={local.matrixRow} key={item.family}>
                <strong role="cell" className={local.matrixFamily}>{item.family}</strong>
                <span role="cell">{item.primitives}</span>
                <span role="cell">{item.currentSource}</span>
                <span role="cell">{item.gate}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.gatePanel}>
          <div className={styles.sampleHeader}>
            <h3>Release gates</h3>
            <Badge variant="secondary">Production standard</Badge>
          </div>
          <ul>
            {productionGates.map((gate, index) => (
              <li className={local.gateItem} key={gate}>
                <CheckCircle2 aria-hidden="true" />
                <span>
                  <span className={local.gateIndex}>{String(index + 1).padStart(2, "0")}</span>{" "}
                  {gate}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
