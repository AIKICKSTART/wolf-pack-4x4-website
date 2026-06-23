import type { CSSProperties } from "react"
import Link from "next/link"
import { Gauge } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import {
  HudFrame,
  NoiseOverlay,
  ScanOverlay,
  TelemetrySection,
  TelemetryStripe,
  TopHud,
} from "./hud"
import {
  ActionsSection,
  ArrowGlyph,
  AuditSection,
  FeedbackSection,
  FormsSection,
  FoundationsSection,
  NavigationSection,
  ProductionSection,
  SandboxSection,
  SectionHeader,
  SelectionSection,
  SurfacesSection,
  WorkshopSection,
} from "./sections"
import { carbonRedIcons } from "./components/icons-carbon-red"
import { groupTitles, sections, type PrimitiveGroup } from "./sidebar-config"
import { dnaRouteCount, sharedDnaSections, sourceTruthSections } from "./source-of-truth"
import styles from "./ui-primitives.module.css"

const groupTones: Record<PrimitiveGroup, string> = {
  source: "var(--primitive-red)",
  shared: "var(--primitive-teal)",
  website: "var(--primitive-amber)",
  parts: "var(--primitive-green)",
  workshop: "var(--primitive-red)",
  hermes: "var(--primitive-teal)",
  pulse: "var(--primitive-amber)",
  cms: "var(--primitive-green)",
  agent: "var(--primitive-teal)",
  presentation: "var(--primitive-teal)",
  lab: "var(--primitive-red)",
}

const catalogGroups = (Object.entries(groupTitles) as Array<[PrimitiveGroup, string]>).map(
  ([group, title]) => ({
    group,
    title,
    items: sections.filter((section) => section.group === group),
  }),
)

const heroDnaIconIds = [
  "exhaust-pipe",
  "muffler",
  "spark-plug",
  "signal-pulse",
  "clipboard-check",
  "shield-tick",
  "actions-save",
  "access-settings",
] as const

const heroDnaIcons = heroDnaIconIds
  .map((id) => carbonRedIcons.find((icon) => icon.id === id))
  .filter((icon): icon is (typeof carbonRedIcons)[number] => Boolean(icon))

export function UiPrimitivesDashboard() {
  return (
    <main className={styles.main}>
      <TopHud buildHash="ofm-7f4e21" channel="ofm/primitives@main" />

      <section
        className={styles.hero}
        aria-labelledby="primitive-title"
        data-ui-primitive-route-header="true"
      >
        <HudFrame>
          <ScanOverlay />
          <NoiseOverlay />
          <div className={styles.heroCopy}>
            <div className={styles.heroSerial}>
              <span className={styles.kicker}>OFM // Design System</span>
              <code>REV.012 · CLUSTER 04</code>
            </div>
            <h1 id="primitive-title">
              <span data-line="01">Source</span>
              <span data-line="02">Truth</span>
              <span data-line="03" className={styles.heroAccent}>
                Shared DNA
              </span>
              <span data-line="04">For Every App.</span>
            </h1>
            <p>
              The 00 and 01 routes are the canonical design-system DNA for every Oak Flats
              Mufflermen build. Source of truth owns evidence, QA, production and theme control;
              Shared DNA owns the atomic components, material rules, icon language and app shells.
            </p>
            <div className={styles.heroActions}>
              <a className={`${styles.siteButton} ${styles.siteButtonRed}`} href="#source-of-truth">
                Inspect 00 source
                <ArrowGlyph />
              </a>
              <a className={`${styles.siteButton} ${styles.siteButtonChrome}`} href="#shared-dna">
                Open 01 DNA
              </a>
              <Link
                className={`${styles.siteButton} ${styles.siteButtonGhost}`}
                href="/ui-primitives/actions#button-primitives"
                prefetch={false}
              >
                Button DNA
              </Link>
            </div>
            <TelemetryStripe />
          </div>

          <div className={styles.heroPreview} aria-label="Primitive preview summary">
            <div className={styles.previewTopbar}>
              <span />
              <span />
              <span />
              <code>{"// dna-source.ts · live"}</code>
            </div>
            <div className={styles.dnaConsole}>
              <div className={styles.dnaConsoleHeader}>
                <span>Atomic route contract</span>
                <Badge variant="secondary">{dnaRouteCount} DNA routes</Badge>
              </div>

              <div className={styles.dnaIconGrid} aria-label="Premium Carbon and Red icon DNA">
                {heroDnaIcons.map((icon) => (
                  <figure key={icon.id} className={styles.dnaIconTile}>
                    <img src={icon.card} alt={`${icon.label} icon`} />
                    <figcaption>{icon.label}</figcaption>
                  </figure>
                ))}
              </div>

              <div className={styles.dnaSignalGrid}>
                <article>
                  <Gauge aria-hidden="true" />
                  <strong>00 / Source</strong>
                  <span>Evidence, telemetry, QA, release gates and theme controls stay canonical.</span>
                  <div className={styles.miniMeter} aria-hidden="true">
                    <span />
                  </div>
                </article>
                <article>
                  <Gauge aria-hidden="true" />
                  <strong>01 / Shared DNA</strong>
                  <span>Tokens, surfaces, forms, icons, overlays, search and mobile shell stay atomic.</span>
                  <div className={styles.miniMeter} aria-hidden="true">
                    <span />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </HudFrame>
      </section>

      <DnaSourceSection />

      <AuditSection />

      <section id="telemetry" className={styles.section}>
        <SectionHeader eyebrow="00 / Telemetry" title="Cluster readouts and signal integrity">
          Inspection surface for live design-system health: coverage gauge, channel signals, and
          OBD-style tiles that mirror how the workshop reads vehicle telemetry.
        </SectionHeader>
        <TelemetrySection />
      </section>

      <PrimitiveCatalogSection />
      <FoundationsSection />
      <ActionsSection />
      <FormsSection />
      <SelectionSection />
      <SurfacesSection />
      <NavigationSection />
      <FeedbackSection />
      <WorkshopSection />
      <ProductionSection />
      <SandboxSection />
    </main>
  )
}

function DnaSourceSection() {
  return (
    <>
      <section id="source-of-truth" className={styles.section}>
        <SectionHeader eyebrow="00 / Source of truth" title="The governing DNA for every page">
          These routes define evidence, telemetry, QA, production, theme control and agent handoff.
          Future app surfaces start here before consuming Shared DNA primitives.
        </SectionHeader>
        <div className={styles.dnaBoard}>
          {sourceTruthSections.map((item) => {
            const Icon = item.section.icon

            return (
              <article key={item.section.id} className={styles.dnaCard}>
                <div className={styles.dnaCardHeader}>
                  <span className={styles.dnaIndex}>{item.index}</span>
                  <span className={styles.dnaIconPuck} aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3>{item.section.label}</h3>
                <p>{item.contract.role}</p>
                <a className={styles.dnaRoute} href={item.section.href}>
                  {item.section.href}
                </a>
                <div className={styles.dnaListGrid}>
                  <div>
                    <span>Atomic outputs</span>
                    <ul>
                      {item.contract.atomicOutputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>Proof</span>
                    <ul>
                      {item.contract.evidence.map((proof) => (
                        <li key={proof}>{proof}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className={styles.dnaStatus} data-readiness={item.contract.readiness}>
                  {item.contract.readiness}
                </span>
              </article>
            )
          })}
        </div>
      </section>

      <section id="shared-dna" className={styles.section}>
        <SectionHeader eyebrow="01 / Shared DNA" title="Atomic primitives ready for buildout">
          These sections are the reusable component DNA for every app: foundations, surfaces,
          typography, icons, theming, actions, forms, selection, navigation, feedback, overlays,
          data display, search, file browser, motion and mobile shell.
        </SectionHeader>
        <div className={styles.dnaBoard}>
          {sharedDnaSections.map((item) => {
            const Icon = item.section.icon

            return (
              <article key={item.section.id} className={styles.dnaCard} data-group="shared">
                <div className={styles.dnaCardHeader}>
                  <span className={styles.dnaIndex}>{item.index}</span>
                  <span className={styles.dnaIconPuck} aria-hidden="true">
                    <Icon />
                  </span>
                </div>
                <h3>{item.section.label}</h3>
                <p>{item.contract.role}</p>
                <a className={styles.dnaRoute} href={item.section.href}>
                  {item.section.href}
                </a>
                <div className={styles.dnaListGrid}>
                  <div>
                    <span>Atomic outputs</span>
                    <ul>
                      {item.contract.atomicOutputs.map((output) => (
                        <li key={output}>{output}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>Proof</span>
                    <ul>
                      {item.contract.evidence.map((proof) => (
                        <li key={proof}>{proof}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span className={styles.dnaStatus} data-readiness={item.contract.readiness}>
                  {item.contract.readiness}
                </span>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

function PrimitiveCatalogSection() {
  return (
    <section id="primitive-catalog" className={styles.section}>
      <SectionHeader
        eyebrow="01 / Surface map"
        title="Expanded primitive families on this local board"
      >
        The stale `localhost:3000` board was hiding most of the current worktree. This
        surface exposes every active primitive family, including the newer CRM and KYC
        flows, so review starts from the real local state.
      </SectionHeader>

      <div className={styles.catalogGrid}>
        {catalogGroups.map(({ group, title, items }) => (
          <article
            key={group}
            className={styles.catalogCard}
            style={{ "--catalog-tone": groupTones[group] } as CSSProperties}
          >
            <div className={styles.catalogHeader}>
              <span className={styles.catalogLabel}>{title}</span>
              <strong className={styles.catalogCount}>
                {items.length.toString().padStart(2, "0")}
              </strong>
            </div>
            <h3>{title.split(" / ")[1] ?? title}</h3>
            <p>{items[0]?.description}</p>

            <div className={styles.catalogLinks}>
              {items.slice(0, 4).map((item) => (
                <Link key={item.id} href={item.href} prefetch={false}>
                  {item.label}
                </Link>
              ))}
            </div>

            {items.length > 4 ? (
              <span className={styles.catalogMore}>+{items.length - 4} more routes</span>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
