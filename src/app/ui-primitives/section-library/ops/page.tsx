import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../../components/page-header"

import { AgentWorkflowSection } from "./agent-workflow-section"
import { CmsEditorSection } from "./cms-editor-section"
import { DashboardCommandSection } from "./dashboard-command-section"
import { PreviewFrame, ThemeToggle } from "./preview-frame"
import { OPS_SECTION_MANIFESTS } from "./section-manifests"
import styles from "./sections-ops.module.css"

export const metadata: Metadata = {
  title: "Section library · Operations | UI Primitives",
  description:
    "Three production-ready Mufflermen page sections — dashboard command, agent workflow and CMS editor — each composed from registered primitives, fully token-driven, with mobile/tablet/desktop and light/dark previews.",
}

interface Specimen {
  id: string
  title: string
  summary: string
  render: () => ReactNode
}

const SPECIMENS: ReadonlyArray<Specimen> = [
  {
    id: "dashboard-command",
    title: "Dashboard command",
    summary: OPS_SECTION_MANIFESTS[0].summary,
    render: () => <DashboardCommandSection />,
  },
  {
    id: "agent-workflow",
    title: "Agent workflow",
    summary: OPS_SECTION_MANIFESTS[1].summary,
    render: () => <AgentWorkflowSection />,
  },
  {
    id: "cms-editor",
    title: "CMS editor",
    summary: OPS_SECTION_MANIFESTS[2].summary,
    render: () => <CmsEditorSection />,
  },
]

const VIEWPORTS = [
  { key: "mobile", label: "320 · Mobile" },
  { key: "tablet", label: "768 · Tablet" },
  { key: "desktop", label: "1280 · Desktop" },
] as const

export default function SectionLibraryOpsPage() {
  return (
    <main className={styles.showcase}>
      <PageHeader
        kicker="Section library / Operations"
        title="Operations sections"
        description="Three reusable Mufflermen page sections — dashboard command, agent workflow and CMS editor — each composed from registered primitives, 100% token-driven (carbon + metallic via central tokens, CTAs in metallic red→amber), and drag-ready via an exported BlockManifest. Toggle light/dark and scan each section at mobile, tablet and desktop widths."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Section library", href: "/ui-primitives/section-library" },
          { label: "Operations" },
        ]}
      />

      <section className={styles.intro} aria-label="Group overview">
        <div className={styles.metaWall}>
          <span className={styles.metaPill}>{SPECIMENS.length} sections</span>
          <span className={styles.metaPill}>Token-driven</span>
          <span className={styles.metaPill}>Light / dark</span>
          <span className={styles.metaPill}>320 → 1920</span>
          <span className={styles.metaPill}>BlockManifest drag-ready</span>
        </div>
        <ThemeToggle />
      </section>

      {SPECIMENS.map((specimen) => (
        <section
          key={specimen.id}
          className={styles.specimen}
          aria-labelledby={`spec-${specimen.id}`}
        >
          <header className={styles.specimenHead}>
            <div>
              <h2 id={`spec-${specimen.id}`} className={styles.specimenTitle}>
                {specimen.title}
              </h2>
              <p className={styles.specimenSummary}>{specimen.summary}</p>
            </div>
            <nav
              className={styles.viewportToolbar}
              aria-label={`${specimen.title} preview widths`}
            >
              {VIEWPORTS.map((vp) => (
                <a
                  key={vp.key}
                  className={styles.viewportLink}
                  href={`#${specimen.id}-${vp.key}`}
                >
                  {vp.label}
                </a>
              ))}
            </nav>
          </header>

          <div className={styles.frameGrid}>
            {VIEWPORTS.map((vp) => (
              <PreviewFrame
                key={vp.key}
                id={`${specimen.id}-${vp.key}`}
                viewport={vp.key}
              >
                {specimen.render()}
              </PreviewFrame>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
