import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../../components/page-header"
import type { BlockManifest } from "../../builder/model"

import {
  ExhaustRepairSection,
  PerformanceExhaustSection,
  ServiceOverviewSection,
  WebsiteHeroSection,
  WorkshopTrustSection,
  exhaustRepairManifest,
  performanceExhaustManifest,
  serviceOverviewManifest,
  webSectionManifests,
  websiteHeroManifest,
  workshopTrustManifest,
} from "./index"
import { PreviewFrame } from "./_showcase/preview-frame"
import styles from "./section-library-web.module.css"

export const metadata: Metadata = {
  title: "Web Section Library | UI Primitives",
  description:
    "Five production-ready Oak Flats Mufflermen page sections — website hero, service overview, exhaust repair, performance exhaust, and workshop trust — each composed from existing primitives, fully token-driven, and shipping a BlockManifest for the CMS canvas.",
}

interface ShowcaseEntry {
  index: string
  manifest: BlockManifest
  render: ReactNode
}

const SHOWCASE: ReadonlyArray<ShowcaseEntry> = [
  { index: "01", manifest: websiteHeroManifest, render: <WebsiteHeroSection /> },
  { index: "02", manifest: serviceOverviewManifest, render: <ServiceOverviewSection /> },
  { index: "03", manifest: exhaustRepairManifest, render: <ExhaustRepairSection /> },
  { index: "04", manifest: performanceExhaustManifest, render: <PerformanceExhaustSection /> },
  { index: "05", manifest: workshopTrustManifest, render: <WorkshopTrustSection /> },
]

const editableFieldCount = webSectionManifests.reduce(
  (total, manifest) => total + manifest.editableFields.length,
  0,
)
const tokenDependencyCount = webSectionManifests.reduce(
  (total, manifest) => total + manifest.tokenDependencies.length,
  0,
)

const META_TILES: ReadonlyArray<{ value: string; label: string }> = [
  { value: String(webSectionManifests.length), label: "Drag-ready sections" },
  { value: String(editableFieldCount), label: "Owner-editable fields" },
  { value: String(tokenDependencyCount), label: "Token dependencies wired" },
]

export default function SectionLibraryWebPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Section library / Web"
        title="Web page sections"
        description="Five reusable, production-ready Oak Flats Mufflermen page sections — website hero, service overview, exhaust repair, performance exhaust, and workshop trust. Each is composed from existing UI primitives, fully token-driven (carbon + metallic, red→amber CTAs), light/dark, responsive 320→1920, reduced-motion safe, and ships a BlockManifest so the CMS canvas can drag, edit, and document it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Section library · Web" },
        ]}
      />

      <section className={styles.intro} aria-label="Overview">
        <span className={styles.notice}>
          Composed from existing primitives · zero hardcoded design values
        </span>
        <div className={styles.metaGrid}>
          {META_TILES.map((tile) => (
            <div key={tile.label} className={styles.metaTile}>
              <span className={styles.metaValue}>{tile.value}</span>
              <span className={styles.metaLabel}>{tile.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.frames}>
        {SHOWCASE.map((entry) => (
          <PreviewFrame
            key={entry.manifest.type}
            index={entry.index}
            title={entry.manifest.name}
            blockType={entry.manifest.type}
            summary={entry.manifest.summary}
          >
            {entry.render}
          </PreviewFrame>
        ))}
      </div>
    </main>
  )
}
