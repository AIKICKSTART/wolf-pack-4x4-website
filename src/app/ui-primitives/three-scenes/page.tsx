import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import { Chip, type ChipTone } from "../components/primitives/chip"
import { Kbd } from "../components/primitives/kbd"
import { ProgressLinear } from "../components/primitives/progress-linear"
import { ProgressRadial } from "../components/primitives/progress-radial"
import { StatTile } from "../components/primitives/stat-tile"
import styles from "./three-scenes.module.css"

export const metadata: Metadata = {
  title: "3D Scenes | UI Primitives",
}

interface ScenePrimitive {
  index: string
  title: string
  href: string
  description: string
  category: string
  status: string
  statusTone: ChipTone
  contract: string
  control: {
    binding: string
    label: string
  }
  readiness: number
  featured?: boolean
  primitives?: ReadonlyArray<string>
}

const SCENES: ReadonlyArray<ScenePrimitive> = [
  {
    index: "01",
    title: "Exhaust pipe viewer",
    href: "/ui-primitives/three-scenes/exhaust-pipe",
    description:
      "Procedural 3D exhaust assembly along a Catmull-Rom curve. Orbit, hover for a part callout, subtle pulse on enter.",
    category: "Workshop geometry",
    status: "Orbit ready",
    statusTone: "teal",
    contract: "Scene island + callout hover",
    control: { binding: "Orbit", label: "Inspect pipe sections" },
    readiness: 94,
  },
  {
    index: "02",
    title: "Vehicle showcase",
    href: "/ui-primitives/three-scenes/vehicle-showcase",
    description:
      "Realistic procedural vehicle primitive with curved bodywork, cabin glass, tyres, rims, lights, reflections, and poster fallback.",
    category: "Vehicle primitive",
    status: "Poster backed",
    statusTone: "green",
    contract: "Vehicle mesh + fallback",
    control: { binding: "Orbit", label: "Turntable camera" },
    readiness: 96,
  },
  {
    index: "03",
    title: "Rotating logo",
    href: "/ui-primitives/three-scenes/rotating-logo",
    description:
      "Ambient brand mark using drei Text with a metallic outline stroke. Slow Y-axis rotation, warehouse environment.",
    category: "Brand object",
    status: "Ambient loop",
    statusTone: "amber",
    contract: "Logo mesh + motion safe",
    control: { binding: "Auto", label: "Slow brand rotation" },
    readiness: 90,
  },
  {
    index: "04",
    title: "Welder sparks",
    href: "/ui-primitives/three-scenes/welder-sparks",
    description:
      "MIG welder spark particle field with parabolic gravity and amber-to-red lifetime color ramp.",
    category: "Particle system",
    status: "Motion safe",
    statusTone: "red",
    contract: "Particle field + pause state",
    control: { binding: "Auto", label: "Sparks simulation" },
    readiness: 92,
  },
  {
    index: "05",
    title: "Dyno chart",
    href: "/ui-primitives/three-scenes/dyno-chart",
    description:
      "3D RPM × torque × boost curve drawn as a thick tube along a Catmull-Rom path. Auto-orbit camera.",
    category: "Data shape",
    status: "Telemetry",
    statusTone: "green",
    contract: "Curve geometry + labels",
    control: { binding: "Auto", label: "RPM curve sweep" },
    readiness: 93,
  },
  {
    index: "06",
    title: "Parts grid",
    href: "/ui-primitives/three-scenes/parts-grid",
    description:
      "3×3 grid of placeholder part categories: mufflers, extractors, fittings, brackets. Each tile bobs out of phase.",
    category: "Catalogue grid",
    status: "Nine-up",
    statusTone: "teal",
    contract: "Part tiles + phase motion",
    control: { binding: "Hover", label: "Read category depth" },
    readiness: 88,
  },
  {
    index: "07",
    title: "Wireframe car scan",
    href: "/ui-primitives/three-scenes/wireframe-car",
    description:
      "Low-poly wireframe chassis with a horizontal scan beam sweeping vertically through the model.",
    category: "Diagnostic scan",
    status: "Scan loop",
    statusTone: "teal",
    contract: "Wireframe + scan beam",
    control: { binding: "Auto", label: "Scan pass" },
    readiness: 91,
  },
  {
    index: "08",
    title: "Gauge cluster",
    href: "/ui-primitives/three-scenes/gauge-cluster",
    description:
      "Three radial gauges (RPM / boost / EGT) with needles sweeping across their dials in 3D space.",
    category: "Gauge cluster",
    status: "Instrumented",
    statusTone: "green",
    contract: "Needles + dial labels",
    control: { binding: "Auto", label: "Gauge sweep" },
    readiness: 92,
  },
  {
    index: "09",
    title: "Holographic job card",
    href: "/ui-primitives/three-scenes/holo-card",
    description:
      "Billboarded job card with a custom scanline ShaderMaterial. Subtle vertical bob, reduced-motion safe.",
    category: "Job card",
    status: "Shader pass",
    statusTone: "amber",
    contract: "Billboard + scanline material",
    control: { binding: "Auto", label: "Card bob" },
    readiness: 90,
  },
  {
    index: "10",
    title: "Interactive card stack",
    href: "/ui-primitives/three-scenes/card-stack",
    description:
      "Stack of five job cards in 3D space. Hover lifts the card forward and tilts it toward the pointer.",
    category: "Composition spine",
    status: "Interactive",
    statusTone: "amber",
    contract: "3D deck + primitive dock",
    control: { binding: "Click", label: "Select quote card" },
    readiness: 100,
    featured: true,
    primitives: ["Chip", "Kbd", "Progress", "StatTile"],
  },
  {
    index: "11",
    title: "Workshop vehicle showcase",
    href: "/ui-primitives/three-scenes/vehicle-workshop-showcase",
    description:
      "Workshop-ready vehicle turntable with realistic procedural body, exhaust detail, reflective floor, and mobile-safe orbit controls.",
    category: "Vehicle primitive",
    status: "Turntable",
    statusTone: "green",
    contract: "Vehicle bay + orbit controls",
    control: { binding: "Orbit", label: "Workshop view" },
    readiness: 96,
  },
  {
    index: "12",
    title: "Exhaust service hero",
    href: "/ui-primitives/three-scenes/vehicle-exhaust-hero",
    description:
      "Hero scene with highlighted exhaust hardware, warm service-bay lighting, and reduced-motion-safe animation.",
    category: "Service scene",
    status: "Highlight",
    statusTone: "amber",
    contract: "Hero canvas + service accents",
    control: { binding: "Auto", label: "Warm bay motion" },
    readiness: 94,
  },
  {
    index: "13",
    title: "Performance car promo",
    href: "/ui-primitives/three-scenes/vehicle-performance-promo",
    description:
      "Cinematic performance promo scene with cool rim lighting, premium reflections, and controlled turntable motion.",
    category: "Promo scene",
    status: "Cinematic",
    statusTone: "teal",
    contract: "Turntable + rim lighting",
    control: { binding: "Auto", label: "Performance loop" },
    readiness: 94,
  },
  {
    index: "14",
    title: "Parts product scene",
    href: "/ui-primitives/three-scenes/vehicle-parts-scene",
    description:
      "Vehicle product composition with floating exhaust, gasket, and bracket primitives for catalogue storytelling.",
    category: "Product scene",
    status: "Catalogue",
    statusTone: "green",
    contract: "Vehicle + floating parts",
    control: { binding: "Orbit", label: "Product inspection" },
    readiness: 93,
  },
  {
    index: "15",
    title: "Social media vehicle preview",
    href: "/ui-primitives/three-scenes/vehicle-social-preview",
    description:
      "Square-safe social vehicle preview with safe-area frame, strong accents, and generated poster fallback.",
    category: "Social preview",
    status: "Safe area",
    statusTone: "amber",
    contract: "Square frame + poster",
    control: { binding: "Auto", label: "Social crop check" },
    readiness: 95,
  },
  {
    index: "16",
    title: "Website hero video primitive",
    href: "/ui-primitives/three-scenes/vehicle-hero-video",
    description:
      "Hero-video-ready vehicle scene with local loop and poster fallback behind the WebGL layer.",
    category: "Video primitive",
    status: "Loop backed",
    statusTone: "teal",
    contract: "Video layer + WebGL",
    control: { binding: "Auto", label: "Hero loop" },
    readiness: 95,
  },
  {
    index: "17",
    title: "Dashboard vehicle status animation",
    href: "/ui-primitives/three-scenes/vehicle-status-animation",
    description:
      "Dashboard-friendly vehicle status animation with diagnostic scan lighting and a stable reduced-motion state.",
    category: "Dashboard state",
    status: "Diagnostic",
    statusTone: "green",
    contract: "Status scan + stable state",
    control: { binding: "Auto", label: "Status sweep" },
    readiness: 96,
  },
]

const CONTROL_CONTRACTS: ReadonlyArray<{ binding: string; label: string; tone: ChipTone }> = [
  { binding: "Orbit", label: "Camera inspection where scene geometry needs it.", tone: "teal" },
  { binding: "Hover", label: "Depth, tilt, or callout affordances stay pointer-safe.", tone: "amber" },
  { binding: "Click", label: "Selection drives the card-stack primitive state.", tone: "green" },
  { binding: "Auto", label: "Looping scenes keep a stable reduced-motion snapshot.", tone: "neutral" },
]

export default function ThreeScenesIndexPage() {
  const featuredScene = SCENES.find((scene) => scene.featured)
  const vehicleScenes = SCENES.filter((scene) => scene.category.includes("Vehicle")).length
  const interactiveScenes = SCENES.filter((scene) =>
    ["Orbit", "Hover", "Click"].includes(scene.control.binding),
  ).length
  const averageReadiness = Math.round(
    SCENES.reduce((total, scene) => total + scene.readiness, 0) / SCENES.length,
  )

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="17 / 3D scene primitives"
        title="Three.js / R3F primitives for the Mufflermen surface"
        description="Procedural exhaust assemblies, realistic vehicle primitives, scanned wireframes, holographic job cards, spark particles, dyno curves, gauge clusters, and interactive card stacks - every scene reduced-motion aware and rendered through a Suspense-wrapped fallback poster."
      />
      <section className={styles.workbench} aria-label="Three scenes shell workbench">
        <div className={styles.statusRail} aria-label="Scene system status">
          <Chip label={`${SCENES.length} live routes`} tone="green" selected />
          <Chip label="R3F + drei islands" tone="teal" selected />
          <Chip label="Reduced-motion contract" tone="amber" selected />
          <Chip label="Poster fallback shell" tone="neutral" selected />
        </div>

        <div className={styles.metricsGrid} aria-label="Three scenes metrics">
          <StatTile
            label="Routes"
            value={String(SCENES.length)}
            unit="scenes"
            tone="teal"
            caption="Overview plus shared sub-route shell"
          />
          <StatTile
            label="Vehicle set"
            value={String(vehicleScenes)}
            unit="routes"
            tone="green"
            caption="Vehicle-led primitives in the scene suite"
          />
          <StatTile
            label="Interactive"
            value={String(interactiveScenes)}
            unit="routes"
            tone="amber"
            caption="Orbit, hover, or click-driven surfaces"
          />
          <StatTile
            label="Readiness"
            value={String(averageReadiness)}
            unit="%"
            tone="red"
            caption="Metadata score across the shell catalogue"
          />
        </div>

        <div className={styles.contractDeck}>
          <section className={styles.contractPanel} aria-label="Scene shell contract">
            <div className={styles.panelHead}>
              <span className={styles.kicker}>Shell contract</span>
              <h2 className={styles.sectionTitle}>Canvas, controls, metadata</h2>
              <p className={styles.subhead}>
                The route shell exposes the same primitives around every client-only scene:
                status chips, keyboard/control bindings, readiness progress, scene metadata,
                and a reduced-motion state beside the canvas.
              </p>
            </div>
            <ProgressLinear
              value={SCENES.length}
              max={SCENES.length}
              tone="green"
              variant="segmented"
              segments={SCENES.length}
              label="Reduced-motion coverage"
              showLabel
              className={styles.contractProgress}
            />
          </section>

          <section className={styles.controlsPanel} aria-label="Scene control primitives">
            <div className={styles.panelHeadCompact}>
              <span className={styles.kicker}>Controls</span>
              <h3>Input map</h3>
            </div>
            <div className={styles.controlList}>
              {CONTROL_CONTRACTS.map((control) => (
                <div key={control.binding} className={styles.controlItem}>
                  <Kbd size="sm">{control.binding}</Kbd>
                  <span>{control.label}</span>
                  <Chip label={control.tone === "neutral" ? "Shell" : control.tone} tone={control.tone} />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.coveragePanel} aria-label="Primitive coverage">
            <ProgressRadial
              value={SCENES.length}
              max={SCENES.length}
              size="lg"
              tone="amber"
              showLabel
              label="Scene coverage"
            />
            <div>
              <span className={styles.kicker}>Contract status</span>
              <strong>{SCENES.length} / {SCENES.length}</strong>
              <p>Every overview entry maps to a routed scene island with shell metadata.</p>
            </div>
          </section>
        </div>

        {featuredScene ? (
          <article className={styles.featureRail}>
            <span className={styles.featureIndex}>{featuredScene.index}</span>
            <div className={styles.featureCopy}>
              <div className={styles.featureStatus}>
                <Chip label={featuredScene.status} tone={featuredScene.statusTone} selected />
                <span>{featuredScene.category}</span>
              </div>
              <strong>{featuredScene.title}</strong>
              <p>
                The card-stack route bridges a live 3D scene to the same primitives used by
                the 2D quote stack, so the canvas, dock, chips, progress, and stats read as
                one primitive contract.
              </p>
            </div>
            <div className={styles.featureTags} aria-label="Mapped primitives">
              {featuredScene.primitives?.map((primitive) => (
                <span key={primitive}>{primitive}</span>
              ))}
            </div>
            <Link className={styles.featureAction} href={featuredScene.href}>
              Open spine
            </Link>
          </article>
        ) : null}
      </section>

      <section className={styles.section} aria-label="3D scene primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index / {SCENES.length} scenes</span>
          <h2 className={styles.sectionTitle}>Scene directory</h2>
          <p className={styles.subhead}>
            Pick a routed scene, inspect the control contract, and compare metadata without
            leaving the primitive gallery surface.
          </p>
        </header>

        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <article
              key={scene.href}
              className={`${styles.thumb} ${scene.featured ? styles.thumbFeatured : ""}`}
            >
              <div className={styles.thumbStatus}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <Chip label={scene.status} tone={scene.statusTone} selected={scene.featured} />
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <dl className={styles.thumbMeta}>
                <div>
                  <dt>Contract</dt>
                  <dd>{scene.contract}</dd>
                </div>
                <div>
                  <dt>Control</dt>
                  <dd>
                    <Kbd size="sm">{scene.control.binding}</Kbd>
                    <span>{scene.control.label}</span>
                  </dd>
                </div>
              </dl>
              <ProgressLinear
                value={scene.readiness}
                tone={scene.statusTone === "neutral" ? "teal" : scene.statusTone}
                label={`${scene.title} shell readiness`}
                showLabel
                className={styles.thumbProgress}
              />
              {scene.primitives ? (
                <div className={styles.thumbTags} aria-label="Mapped primitives">
                  {scene.primitives.map((primitive) => (
                    <span key={primitive}>{primitive}</span>
                  ))}
                </div>
              ) : null}
              <Link className={styles.thumbFoot} href={scene.href}>
                Open scene
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
