import Link from "next/link"
import type { Metadata } from "next"
import type { CSSProperties } from "react"

import { PageHeader } from "../components/page-header"
import { sections } from "../sidebar-config"
import styles from "../ui-primitives.module.css"

export const metadata: Metadata = {
  title: "Primitive QA Matrix | UI Primitives",
}

const viewports = [
  { label: "Mobile 320", width: 320, type: "mobile" },
  { label: "Mobile 375", width: 375, type: "mobile" },
  { label: "Mobile 390", width: 390, type: "mobile" },
  { label: "Mobile 430", width: 430, type: "mobile" },
  { label: "Tablet 768", width: 768, type: "tablet" },
  { label: "Tablet 1024", width: 1024, type: "tablet" },
  { label: "Desktop 1280", width: 1280, type: "desktop" },
  { label: "Desktop 1440", width: 1440, type: "desktop" },
  { label: "Desktop 1920", width: 1920, type: "desktop" },
] as const

const qaPages = [
  {
    title: "All Primitives Overview",
    href: "/ui-primitives",
    body: "Check all system groupings, source routes, theme control, catalog cards, and top-level navigation density.",
  },
  {
    title: "Mobile Viewport QA",
    href: "/ui-primitives/qa#mobile",
    body: "Verify 320, 375, 390 and 430 widths in light and dark mode. No clipped headings, horizontal overflow, or small tap targets.",
  },
  {
    title: "Tablet Viewport QA",
    href: "/ui-primitives/qa#tablet",
    body: "Verify 768 and 1024 widths. Sidebar and card grids must reflow without layout shift or mixed theme styling.",
  },
  {
    title: "Desktop Viewport QA",
    href: "/ui-primitives/qa#desktop",
    body: "Verify 1280, 1440 and 1920 widths. Cards should remain readable, not overstretched or visually sparse.",
  },
  {
    title: "Light Mode QA",
    href: "/ui-primitives/qa#theme",
    body: "Check pearl enamel/frosted glass surfaces, contrast, shadows, icons, focus states and disabled/loading states.",
  },
  {
    title: "Dark Mode QA",
    href: "/ui-primitives/qa#theme",
    body: "Check obsidian/chrome/red paint surfaces, contrast, gradients, glow restraint, keyboard focus and reduced motion.",
  },
  {
    title: "Accessibility QA",
    href: "/ui-primitives/qa#a11y",
    body: "Check semantics, labels, ARIA only where needed, keyboard flow, no duplicate IDs, no inaccessible custom controls.",
  },
  {
    title: "Lighthouse QA",
    href: "/ui-primitives/qa#lighthouse",
    body: "Target 100 performance, accessibility, best practices and SEO. Document blockers when 100 is not possible.",
  },
  {
    title: "Marketing Asset QA",
    href: "/ui-primitives/brand-assets",
    body: "Verify canonical logos, approved marketing images, presentation banners, alt text and image sizing.",
  },
  {
    title: "App-Specific Primitive QA",
    href: "/ui-primitives/implementation",
    body: "Verify every app section explains shared primitives, product-context variants, code/setup and required tokens.",
  },
]

const accessibilityChecks = [
  "Semantic HTML and heading order are valid.",
  "ARIA is present only when native semantics are insufficient.",
  "Keyboard navigation reaches every interactive primitive.",
  "Focus-visible states are stronger than hover states.",
  "Screen-reader labels exist for icon-only controls and media controls.",
  "Light and dark colour contrast remains readable.",
  "Reduced-motion users do not receive non-essential animation.",
  "Hover, active, disabled, loading and error states are accessible.",
  "Mobile tap targets are at least 44px where practical.",
  "No duplicate IDs or inaccessible custom controls are introduced.",
]

const lighthouseTargets = [
  ["Performance", "100"],
  ["Accessibility", "100"],
  ["Best Practices", "100"],
  ["SEO", "100"],
] as const

export default function PrimitiveQaPage() {
  const routeCount = sections.length
  const toneForViewport = (type: (typeof viewports)[number]["type"]) => {
    if (type === "mobile") return "var(--primitive-red)"
    if (type === "tablet") return "var(--primitive-amber)"
    return "var(--primitive-teal)"
  }

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="00 / Source of truth"
        title="Responsive, accessibility and Lighthouse QA"
        description="The repeatable QA contract for every Mufflermen primitive: required viewports, light/dark checks, accessibility expectations, Lighthouse targets and file-structure rules."
        dnaSectionId="qa"
      />

      <section className={styles.section}>
        <div className={styles.systemGrid}>
          {qaPages.map((page) => (
            <article key={page.title} className={styles.systemCard}>
              <h2>{page.title}</h2>
              <p>{page.body}</p>
              <div className={styles.systemMeta}>
                <Link href={page.href} prefetch={false}>
                  Open QA target
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="mobile" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>Viewport matrix</span>
          <div>
            <h2>Required preview sizes</h2>
            <p>
              Each primitive detail page must document behaviour at all nine widths in light and
              dark mode. This route is the checklist and browser-test target.
            </p>
          </div>
        </div>
        <div className={styles.assetGrid}>
          {viewports.map((viewport) => (
            <article
              key={viewport.label}
              className={styles.assetCard}
              style={{ "--card-tone": toneForViewport(viewport.type) } as CSSProperties}
            >
              <h2>{viewport.label}</h2>
              <p>{viewport.width}px wide viewport. Verify no horizontal overflow, clipped copy, broken density or tap-target failures.</p>
              <div className={styles.assetMeta}>
                <span>{viewport.type}</span>
                <span>light + dark</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="theme" className={styles.section}>
        <div className={styles.guideGrid}>
          <article className={styles.guideCard}>
            <h2>Light profile</h2>
            <p>
              Pearl enamel canvas, frosted workshop glass, clean steel shadows and calibrated
              red/amber/teal/green signals. It must not be a simple inversion of dark mode.
            </p>
          </article>
          <article className={styles.guideCard}>
            <h2>Dark profile</h2>
            <p>
              Obsidian canvas, chrome panels, red paint, amber workshop light and instrument-glass
              telemetry. It must stay legible without excessive glow.
            </p>
          </article>
        </div>
      </section>

      <section id="a11y" className={styles.section}>
        <article className={styles.guideCard}>
          <h2>Accessibility gate</h2>
          <ol className={styles.stepList}>
            {accessibilityChecks.map((check, index) => (
              <li key={check}>
                <strong>{index + 1}</strong>
                <span>{check}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section id="lighthouse" className={styles.section}>
        <div className={styles.assetGrid}>
          {lighthouseTargets.map(([label, score]) => (
            <article key={label} className={styles.assetCard}>
              <h2>{label}</h2>
              <p>Target Lighthouse score: {score}. If blocked by an unavoidable dependency, document the blocker on the primitive page.</p>
              <div className={styles.assetMeta}>
                <span>{score}</span>
                <span>{routeCount} menu routes</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <article className={styles.guideCard}>
          <h2>Required primitive file structure</h2>
          <pre className={styles.codeBlock}>
{`/src/primitives/
  /buttons/
    Button.tsx
    Button.variants.ts
    Button.demo.tsx
    Button.docs.mdx
    Button.test.tsx
    Button.a11y.test.tsx
    index.ts
  /cards/
  /forms/
  /navigation/
  /modals/
  /tables/
  /dashboards/
  /marketing/
  /shared/`}
          </pre>
        </article>
      </section>
    </main>
  )
}
