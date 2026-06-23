import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getHeroOption, heroOptions, type HeroPresentationOption } from "../hero-options"
import { heroComponentForOption, heroComponentLabel } from "../hero-renderer"

import { ButtonDnaLink } from "../../components/button-dna-link"
import { DeviceFrame, type DeviceFrameSpec } from "./device-frame"
import styles from "./preview.module.css"

export const dynamicParams = false

export function generateStaticParams(): Array<{ option: string }> {
  return heroOptions.map((option) => ({ option: option.id }))
}

interface PreviewPageProps {
  params: Promise<{ option: string }>
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { option: optionId } = await params
  const option = getHeroOption(optionId)
  if (!option) {
    return { title: "Hero preview" }
  }
  return {
    title: `${option.name} · Hero preview`,
    description: `${option.useCase} — ${option.overlay}, ${option.motion}.`,
  }
}

/**
 * Mobile widths show the portrait (9:16-leaning) treatment; social/stack
 * options use a true 9:16 ratio, others use a tall phone ratio.
 */
function mobileRatio(frame: HeroPresentationOption["frame"]): number {
  if (frame === "social" || frame === "stack") return 9 / 16
  return 9 / 19.5
}

function deviceSpecs(option: HeroPresentationOption): DeviceFrameSpec[] {
  const mr = mobileRatio(option.frame)
  return [
    { width: 1920, ratio: 16 / 9, label: "Desktop XL", kind: "desktop" },
    { width: 1440, ratio: 16 / 9, label: "Desktop", kind: "desktop" },
    { width: 1280, ratio: 16 / 9, label: "Laptop", kind: "desktop" },
    { width: 1024, ratio: 4 / 3, label: "Tablet landscape", kind: "tablet" },
    { width: 768, ratio: 3 / 4, label: "Tablet portrait", kind: "tablet" },
    { width: 430, ratio: mr, label: "Phone XL", kind: "mobile" },
    { width: 390, ratio: mr, label: "Phone", kind: "mobile" },
    { width: 375, ratio: mr, label: "Phone compact", kind: "mobile" },
    { width: 320, ratio: mr, label: "Phone small", kind: "mobile" },
  ]
}

export default async function HeroPreviewPage({ params }: PreviewPageProps) {
  const { option: optionId } = await params
  const option = getHeroOption(optionId)
  if (!option) {
    notFound()
  }

  const component = heroComponentForOption(option)
  const frameSrc = `/hero-frame/${option.id}`
  const specs = deviceSpecs(option)
  const desktopSpecs = specs.filter((spec) => spec.kind !== "mobile")
  const mobileSpecs = specs.filter((spec) => spec.kind === "mobile")

  const metaRows: Array<{ label: string; value: string }> = [
    { label: "Group", value: option.group },
    { label: "Frame", value: option.frame },
    { label: "Use case", value: option.useCase },
    { label: "Overlay", value: option.overlay },
    { label: "Motion", value: option.motion },
    { label: "Hero component", value: heroComponentLabel(component) },
    { label: "Media", value: `${option.asset.title} · ${option.asset.aspectRatio} · ${option.asset.durationSec}s` },
  ]

  return (
    <main className={styles.page} aria-labelledby="preview-title">
      <header className={styles.header}>
        <Link className={styles.back} href="/ui-primitives/video-heroes">
          <span aria-hidden="true">←</span> Back to video heroes
        </Link>
        <ButtonDnaLink />

        <div className={styles.headingRow}>
          <span className={styles.kicker}>{option.group} · {option.useCase}</span>
          <h1 className={styles.title} id="preview-title">{option.name}</h1>
          <p className={styles.lede}>
            {option.overlay}. {option.motion}. Rendered with {option.asset.title.toLowerCase()} as a{" "}
            <strong>{heroComponentLabel(component)}</strong> hero across nine viewports.
          </p>
        </div>

        <dl className={styles.metaGrid}>
          {metaRows.map((row) => (
            <div className={styles.metaItem} key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className={styles.viewportGroup} aria-label="Desktop and tablet viewports">
        <header className={styles.groupHead}>
          <h2>Desktop &amp; tablet</h2>
          <span>1920 → 768 px · live responsive render</span>
        </header>
        <div className={styles.desktopGrid}>
          {desktopSpecs.map((spec) => (
            <DeviceFrame key={spec.width} spec={spec} src={frameSrc} title={option.name} />
          ))}
        </div>
      </section>

      <section className={styles.viewportGroup} aria-label="Mobile viewports">
        <header className={styles.groupHead}>
          <h2>Mobile</h2>
          <span>
            430 → 320 px ·{" "}
            {option.frame === "social" || option.frame === "stack" ? "9:16 portrait treatment" : "tall phone treatment"}
          </span>
        </header>
        <div className={styles.mobileGrid}>
          {mobileSpecs.map((spec) => (
            <DeviceFrame key={spec.width} spec={spec} src={frameSrc} title={option.name} />
          ))}
        </div>
      </section>

      <footer className={styles.pageFooter}>
        <Link className={styles.footerLink} href={frameSrc} target="_blank" rel="noreferrer">
          Open the bare hero in a new tab ↗
        </Link>
        <span>Seedance 2.0 · muted autoplay · real local logo overlay</span>
      </footer>
    </main>
  )
}
