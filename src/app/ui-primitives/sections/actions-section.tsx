import Link from "next/link"
import {
  Check,
  Clock3,
  Copy,
  Menu,
  Phone,
  Save,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  ActionButton,
  LiquidButton,
  MetalButton,
} from "../components/actions/button-primitive"
import { ActiveThemeButtonCard } from "./active-theme-button-card"
import { ArrowGlyph, SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"

const actionInheritance = [
  {
    source: "Foundations",
    title: "Hit targets and focus",
    body: "Minimum 44px controls, shared radius, token focus shadow, and reduced-motion exits are inherited before any action finish.",
    tokens: "--primitive-btn-radius / --primitive-focus-shadow",
  },
  {
    source: "Surfaces",
    title: "Material state",
    body: "Primary, chrome, liquid, and metal actions consume the carbon, red paint, chrome edge, panel, and recessed depth recipes.",
    tokens: "--primitive-btn-primary-bg / --primitive-chrome-edge",
  },
  {
    source: "Typography + Icons",
    title: "Label and glyph rules",
    body: "Mono labels, display hierarchy, icon sizes, and stroke weight remain upstream contracts, not route-local reinventions.",
    tokens: "--primitive-font-mono / --primitive-icon-md",
  },
  {
    source: "Theming",
    title: "Token adapters",
    body: "Global shadcn buttons, liquid-ui class hooks, and local action primitives are adapters over the same primitive tokens.",
    tokens: "Button / ActionButton / LiquidButton",
  },
] as const

const actionOutputs = [
  "Primary command",
  "Secondary command",
  "Icon tool",
  "Segmented choice",
  "Toolbar action",
  "Destructive command",
] as const

const sharedButtonLinks = [
  { href: "/ui-primitives#shared-dna", label: "Shared DNA board" },
  { href: "/ui-primitives/actions#button-size-scale", label: "Size scale" },
  { href: "/ui-primitives/actions#button-pill-system", label: "Pills" },
  { href: "/ui-primitives/actions#site-cta-buttons", label: "Site CTA adapters" },
  { href: "/ui-primitives/actions#action-button", label: "ActionButton" },
  { href: "/ui-primitives/actions#liquid-button", label: "LiquidButton" },
  { href: "/ui-primitives/actions#metal-button", label: "MetalButton" },
  { href: "/ui-primitives/actions#theme-button-matrix", label: "Theme matrix" },
] as const

const buttonFamilies = [
  {
    id: "site-cta-buttons",
    title: "Site CTA adapters",
    role: "Content, contact, hero, and section CTAs.",
    variants: "Red primary / chrome alternate / ghost tertiary",
    source: "CSS modules: siteButtonRed, siteButtonChrome, siteButtonGhost",
  },
  {
    id: "action-button",
    title: "ActionButton",
    role: "Default product command button for app actions.",
    variants: "default / cool / secondary / outline / ghost / destructive / link",
    source: "components/actions/button-primitive.tsx",
  },
  {
    id: "liquid-button",
    title: "LiquidButton",
    role: "Glass-style high-emphasis adapter.",
    variants: "default / outline / secondary / ghost / destructive / link",
    source: "components/actions/button-primitive.tsx",
  },
  {
    id: "metal-button",
    title: "MetalButton",
    role: "Tactile machined adapter for premium workshop actions.",
    variants: "default / primary / success / error / gold / bronze",
    source: "components/actions/button-primitive.tsx",
  },
] as const

const sizeScale = [
  {
    id: "small",
    label: "Small",
    token: "--primitive-size-command-sm",
    role: "Dense toolbar, table, card, and filter actions. Still touch-safe at 44px.",
  },
  {
    id: "medium",
    label: "Medium",
    token: "--primitive-size-command-md",
    role: "Default app command, form action, dialog footer, and route-level controls.",
  },
  {
    id: "large",
    label: "Large",
    token: "--primitive-size-command-lg",
    role: "Hero, conversion CTA, empty-state recovery, and high-emphasis workflow commands.",
  },
] as const

const pillSystem = [
  {
    label: "Status pill",
    role: "Read-only state label for proof, audit, production, and routing status.",
    example: "Ready",
  },
  {
    label: "Filter pill",
    role: "Toggleable chip for scoped search, category, vehicle, and state filters.",
    example: "Stainless",
  },
  {
    label: "CTA pill",
    role: "Rounded high-emphasis command for liquid buttons, hero CTAs, and mobile bars.",
    example: "Book bay",
  },
] as const

export function ActionsSection() {
  return (
    <section
      id="button-primitives"
      className={`${styles.section} ${styles.actionsSection}`}
      aria-labelledby="button-primitives-title"
    >
      <SectionHeader eyebrow="01.06 / Actions" title="Buttons and command controls">
        One command grammar for app actions, site CTAs, icon tools, segmented choices,
        toolbar commands, and destructive states. Existing button systems stay visible
        as adapters, but the tokens and interaction rules come from Shared DNA.
      </SectionHeader>

      <div className={styles.buttonPrimitiveIndex} aria-label="Button Shared DNA route links">
        <div>
          <span>Button primitives</span>
          <h3 id="button-primitives-title">Shared DNA button map</h3>
          <p>
            Red primary remains the approval/default CTA. Chrome, ghost, liquid, metal,
            icon, segmented, toolbar, and destructive variants are theme-matched
            alternatives that inherit the same tokens.
          </p>
        </div>
        <nav className={styles.buttonPrimitiveLinks} aria-label="Button primitive anchors">
          {sharedButtonLinks.map((link) => (
            <Link key={link.href} href={link.href} prefetch={false}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.actionContractGrid} aria-label="Actions Shared DNA inheritance">
        {actionInheritance.map((item) => (
          <article key={item.title} className={styles.actionContractCard}>
            <span>{item.source}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <code>{item.tokens}</code>
          </article>
        ))}
      </div>

      <div className={styles.buttonSpecGrid} aria-label="Defined Shared DNA button families">
        {buttonFamilies.map((family) => (
          <article key={family.id} id={family.id} className={styles.buttonPrimitiveFamily}>
            <span>{family.title}</span>
            <p>{family.role}</p>
            <dl>
              <div>
                <dt>Variants</dt>
                <dd>{family.variants}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{family.source}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div
        id="theme-button-matrix"
        className={styles.buttonThemeMatrix}
        aria-label="Button styles for the selected theme preset"
      >
        <ActiveThemeButtonCard />
      </div>

      <div
        id="button-size-scale"
        className={styles.buttonScaleGrid}
        aria-label="Small, medium, and large button variants"
      >
        {sizeScale.map((size) => (
          <article key={size.id} className={styles.buttonScaleCard} data-size={size.id}>
            <div>
              <span>{size.label}</span>
              <code>{size.token}</code>
            </div>
            <p>{size.role}</p>
            <div className={styles.buttonScaleSamples}>
              <ActionButton size={size.id === "large" ? "lg" : size.id === "small" ? "sm" : "default"}>
                {size.label} app
              </ActionButton>
              <LiquidButton size={size.id === "large" ? "lg" : size.id === "small" ? "sm" : "default"} variant="outline">
                {size.label} pill
              </LiquidButton>
            </div>
          </article>
        ))}
      </div>

      <div
        id="button-pill-system"
        className={styles.buttonPillGrid}
        aria-label="Button, badge, and chip pill coverage"
      >
        {pillSystem.map((pill) => (
          <article key={pill.label} className={styles.buttonPillCard}>
            <span>{pill.label}</span>
            <p>{pill.role}</p>
            <div className={styles.buttonPillPreview}>
              <Badge variant={pill.label === "Status pill" ? "secondary" : "outline"}>{pill.example}</Badge>
              <ActionButton
                className={styles.roundCommand}
                size={pill.label === "CTA pill" ? "lg" : "sm"}
                variant={pill.label === "Filter pill" ? "outline" : "secondary"}
              >
                {pill.example}
              </ActionButton>
            </div>
          </article>
        ))}
      </div>

      <div
        id="action-output-rail"
        className={styles.actionOutputRail}
        aria-label="Atomic action outputs"
      >
        {actionOutputs.map((output) => (
          <span key={output}>{output}</span>
        ))}
      </div>

      <div className={styles.twoColumn}>
        <article className={styles.samplePanel} aria-labelledby="site-cta-buttons-panel">
          <div className={styles.sampleHeader}>
            <h3 id="site-cta-buttons-panel">Site CTA buttons</h3>
            <Badge>Adapter</Badge>
          </div>
          <p className={styles.sampleNote}>
            Legacy site buttons are allowed when the destination is content or contact. They
            still consume primitive red, chrome, focus, radius, and motion tokens.
          </p>
          <div className={styles.buttonRow}>
            <a className={`${styles.siteButton} ${styles.siteButtonRed}`} href="tel:+61242563740">
              Call workshop
              <ArrowGlyph />
            </a>
            <a className={`${styles.siteButton} ${styles.siteButtonChrome}`} href="mailto:info@mufflermen.com.au">
              Send vehicle details
            </a>
            <a className={`${styles.siteButton} ${styles.siteButtonGhost}`} href="#action-output-rail">
              Output rail
            </a>
          </div>
        </article>

        <article className={styles.samplePanel} aria-labelledby="action-button-panel">
          <div className={styles.sampleHeader}>
            <h3 id="action-button-panel">App button primitive</h3>
            <Badge variant="outline">Canonical</Badge>
          </div>
          <p className={styles.sampleNote}>
            Use <code>ActionButton</code> for product commands first. It is the
            canonical app-level wrapper for semantic button variants.
          </p>
          <div className={styles.buttonRow}>
            <ActionButton>
              <Phone aria-hidden="true" />
              Primary
            </ActionButton>
            <ActionButton variant="cool">Cool</ActionButton>
            <ActionButton variant="secondary">Secondary</ActionButton>
            <ActionButton variant="outline">Outline</ActionButton>
            <ActionButton variant="ghost">Ghost</ActionButton>
            <ActionButton variant="destructive">Destructive</ActionButton>
            <ActionButton disabled>
              <Clock3 aria-hidden="true" />
              Loading
            </ActionButton>
          </div>
        </article>

        <article className={styles.samplePanel} aria-labelledby="icon-tools-panel">
          <div className={styles.sampleHeader}>
            <h3 id="icon-tools-panel">Icon tools</h3>
            <Badge variant="secondary">44px targets</Badge>
          </div>
          <p className={styles.sampleNote}>
            Icon-only tools always require an accessible name and tokenized focus
            ring. The visual glyph follows the Icon route sizing contract.
          </p>
          <div className={styles.iconRail}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ActionButton
                    aria-label="Copy primitive token"
                    size="icon"
                    variant="outline"
                  />
                }
              >
                <Copy aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>Copy primitive token</TooltipContent>
            </Tooltip>
            <ActionButton aria-label="Filter primitives" size="icon" variant="outline">
              <SlidersHorizontal aria-hidden="true" />
            </ActionButton>
            <ActionButton aria-label="Open primitive menu" size="icon" variant="ghost">
              <Menu aria-hidden="true" />
            </ActionButton>
            <ActionButton aria-label="Confirm review" size="icon" variant="secondary">
              <Check aria-hidden="true" />
            </ActionButton>
          </div>
        </article>

        <article className={styles.samplePanel} aria-labelledby="liquid-metal-panel">
          <div className={styles.sampleHeader}>
            <h3 id="liquid-metal-panel">Liquid and metal finishes</h3>
            <Badge variant="secondary">Surface adapters</Badge>
          </div>
          <p className={styles.sampleNote}>
            Liquid and metal finishes are presentation adapters for high-emphasis
            CTAs only. They do not replace the ActionButton state taxonomy.
          </p>
          <div className={styles.buttonRow}>
            <LiquidButton>
              <Phone aria-hidden="true" />
              Liquid CTA
            </LiquidButton>
            <LiquidButton variant="outline" size="sm">
              Glass outline
            </LiquidButton>
            <MetalButton variant="primary">Workshop action</MetalButton>
            <MetalButton variant="gold">Premium quote</MetalButton>
          </div>
        </article>

        <article className={styles.samplePanel} aria-labelledby="segmented-command-panel">
          <div className={styles.sampleHeader}>
            <h3 id="segmented-command-panel">Segmented command</h3>
            <Badge variant="outline">Stateful</Badge>
          </div>
          <p className={styles.sampleNote}>
            Segmented controls use pressed state only for mutually exclusive choices,
            not navigation or unrelated filter chips.
          </p>
          <div className={styles.segmentedControl} role="group" aria-label="Primitive density">
            <button type="button" aria-pressed="true">Compact</button>
            <button type="button">Comfort</button>
            <button type="button">Wide</button>
          </div>
        </article>

        <article className={styles.samplePanel} aria-labelledby="toolbar-destructive-panel">
          <div className={styles.sampleHeader}>
            <h3 id="toolbar-destructive-panel">Toolbar and destructive states</h3>
            <Badge variant="destructive">Guarded</Badge>
          </div>
          <p className={styles.sampleNote}>
            Toolbar actions stay compact but named. Destructive commands must be
            visually distinct and never share the primary approval treatment.
          </p>
          <div className={styles.actionToolbar} role="toolbar" aria-label="Action state examples">
            <ActionButton size="sm" variant="outline">
              <Save aria-hidden="true" />
              Save draft
            </ActionButton>
            <ActionButton size="sm" variant="secondary">
              <Copy aria-hidden="true" />
              Duplicate
            </ActionButton>
            <ActionButton size="sm" variant="destructive">
              <ShieldAlert aria-hidden="true" />
              Delete quote
            </ActionButton>
          </div>
        </article>
      </div>
    </section>
  )
}
