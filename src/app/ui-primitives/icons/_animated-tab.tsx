"use client"

import Image from "next/image"
import type { ComponentType, CSSProperties } from "react"

import {
  getPartsBrandLogoThemeSrc,
  partsBrandLogos,
  type PartsBrandLogo,
  type PartsBrandLogoSurface,
} from "@/lib/parts-brand-logos"

import { Chip } from "../components/primitives/chip"
import type { ChipTone } from "../components/primitives/chip"
import { Kbd } from "../components/primitives/kbd"
import { ProgressLinear } from "../components/primitives/progress-linear"
import type { ProgressLinearTone } from "../components/primitives/progress-linear"
import { StatTile } from "../components/primitives/stat-tile"
import {
  KineticText,
  typographyFontClassNames,
  type KineticMotionId,
  type TypographyFontId,
} from "../components/typography"
import {
  AnimatedIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  RadiatorGridIcon,
  ShieldTickIcon,
  SignalPulseIcon,
  WorkshopBayIcon,
} from "../components/icons"
import type { IconMotion, IconProps, IconTone, IconVariant } from "../components/icons"

import styles from "./icons.module.css"

const SUPPLIER_LOGOS = partsBrandLogos

type PartsBrandLogoSourceType = PartsBrandLogo["sourceType"]

interface LogoPrimitiveContract {
  Icon: ComponentType<IconProps>
  label: string
  caption: string
  accent: string
  chipTone: ChipTone
  iconTone: IconTone
  progressTone: ProgressLinearTone
  motion: IconMotion
  fontId: TypographyFontId
  kineticMotion: KineticMotionId
  progress: number
}

const LOGO_SOURCE_PRIMITIVES: Record<PartsBrandLogoSourceType, LogoPrimitiveContract> = {
  PNG: {
    Icon: ExhaustPipeIcon,
    label: "Raster lockup",
    caption: "Tone wraps around preserved pixel artwork.",
    accent: "var(--primitive-red)",
    chipTone: "red",
    iconTone: "red",
    progressTone: "red",
    motion: "draw",
    fontId: "anton",
    kineticMotion: "weld-flicker",
    progress: 82,
  },
  SVG: {
    Icon: CompassRoseIcon,
    label: "Vector trace",
    caption: "Linework mirrors the signed icon stroke system.",
    accent: "var(--primitive-teal)",
    chipTone: "teal",
    iconTone: "teal",
    progressTone: "teal",
    motion: "pulse",
    fontId: "bigshoulders",
    kineticMotion: "grid-lock",
    progress: 94,
  },
  JPG: {
    Icon: WorkshopBayIcon,
    label: "Archive plate",
    caption: "Warm surface treatment protects legacy scans.",
    accent: "var(--primitive-amber)",
    chipTone: "amber",
    iconTone: "amber",
    progressTone: "amber",
    motion: "drift",
    fontId: "fraunces",
    kineticMotion: "exhaust-wave",
    progress: 72,
  },
  WEBP: {
    Icon: SignalPulseIcon,
    label: "Compressed signal",
    caption: "Fast media gets the live telemetry treatment.",
    accent: "var(--primitive-green)",
    chipTone: "green",
    iconTone: "green",
    progressTone: "green",
    motion: "spark",
    fontId: "bricolage",
    kineticMotion: "neon-idle",
    progress: 88,
  },
}

const LOGO_SURFACE_PRIMITIVES: Record<
  PartsBrandLogoSurface,
  {
    Icon: ComponentType<IconProps>
    label: string
    caption: string
    accent: string
    chipTone: ChipTone
    iconTone: IconTone
    progressTone: ProgressLinearTone
    motion: IconMotion
  }
> = {
  light: {
    Icon: RadiatorGridIcon,
    label: "light plates",
    caption: "Frosted-glass plates lift dark supplier marks for legibility.",
    accent: "var(--primitive-amber)",
    chipTone: "amber",
    iconTone: "amber",
    progressTone: "amber",
    motion: "draw",
  },
  dark: {
    Icon: ShieldTickIcon,
    label: "dark plates",
    caption: "Transparent plates carry reversed and white marks.",
    accent: "var(--primitive-teal)",
    chipTone: "teal",
    iconTone: "teal",
    progressTone: "teal",
    motion: "pulse",
  },
}

const LOGO_SOURCE_TYPE_STATS = (
  Object.keys(LOGO_SOURCE_PRIMITIVES) as PartsBrandLogoSourceType[]
).map((sourceType) => ({
  sourceType,
  count: SUPPLIER_LOGOS.filter((logo) => logo.sourceType === sourceType).length,
}))

const LOGO_SURFACE_STATS = (
  Object.keys(LOGO_SURFACE_PRIMITIVES) as PartsBrandLogoSurface[]
).map((surface) => ({
  surface,
  count: SUPPLIER_LOGOS.filter((logo) => logo.surface === surface).length,
  percentage: Math.round(
    (SUPPLIER_LOGOS.filter((logo) => logo.surface === surface).length / SUPPLIER_LOGOS.length) * 100,
  ),
}))

export function AnimatedIconsTab() {
  const variant: IconVariant = "monoline"

  return (
    <div className={`${styles.supplierTab} ${typographyFontClassNames}`}>
      <div className={styles.shell}>
        <section className={styles.supplierShowcase} aria-labelledby="supplier-showcase-title">
          <header className={styles.supplierShowcaseHeader}>
            <div>
              <span className={styles.sectionKicker}>Supplier logos</span>
              <h3 id="supplier-showcase-title" className={styles.supplierShowcaseTitle}>
                Official parts logos stay source-backed
              </h3>
              <p>
                Logos render from the shared parts brand manifest and local media assets.
                Logos render as transparent local light and dark variants. Source page and source
                asset URLs stay visible for audit without loading external artwork.
              </p>
              <div className={styles.supplierSurfaceRail} aria-label="Official logo artboard balance">
                {LOGO_SURFACE_STATS.map(({ surface, count, percentage }) => {
                  const surfacePrimitive = LOGO_SURFACE_PRIMITIVES[surface]
                  const SurfaceIcon = surfacePrimitive.Icon

                  return (
                    <article
                      key={`logo-surface-${surface}`}
                      className={styles.supplierSurfacePill}
                      data-surface={surface}
                      style={{ "--logo-surface-accent": surfacePrimitive.accent } as CSSProperties}
                    >
                      <AnimatedIcon
                        icon={SurfaceIcon}
                        tone={surfacePrimitive.iconTone}
                        motion={surfacePrimitive.motion}
                        frame="none"
                        variant={variant}
                        size={22}
                        tooltip={`${surfacePrimitive.label} surface`}
                      />
                      <span className={styles.supplierSurfaceCopy}>
                        <strong>
                          {count} {surfacePrimitive.label}
                        </strong>
                        <span>{surfacePrimitive.caption}</span>
                      </span>
                      <ProgressLinear
                        label={`${surfacePrimitive.label} share`}
                        value={percentage}
                        tone={surfacePrimitive.progressTone}
                        variant="segmented"
                        segments={8}
                        className={styles.supplierSurfaceProgress}
                      />
                    </article>
                  )
                })}
              </div>
              <div className={styles.supplierSourceRail} aria-label="Official logo source file mix">
                {LOGO_SOURCE_TYPE_STATS.map(({ sourceType, count }) => {
                  const sourcePrimitive = LOGO_SOURCE_PRIMITIVES[sourceType]

                  return (
                    <Chip
                      key={`logo-source-${sourceType}`}
                      label={`${sourceType} ${count}`}
                      tone={sourcePrimitive.chipTone}
                      selected
                    />
                  )
                })}
              </div>
            </div>
            <StatTile
              label="Official logos"
              value={String(SUPPLIER_LOGOS.length)}
              tone="amber"
              caption="local media assets"
              sparkline={[8, 16, 24, SUPPLIER_LOGOS.length]}
              className={styles.supplierStat}
            />
          </header>
          <div className={styles.supplierLogoGrid}>
            {SUPPLIER_LOGOS.map((logo) => {
              const sourcePrimitive = LOGO_SOURCE_PRIMITIVES[logo.sourceType]
              const SourceIcon = sourcePrimitive.Icon
              const surfacePrimitive = LOGO_SURFACE_PRIMITIVES[logo.surface]

              return (
                <article
                  key={`supplier-logo-${logo.id}`}
                  className={styles.supplierLogoCard}
                  data-surface={logo.surface}
                  data-source-type={logo.sourceType}
                  style={
                    {
                      "--logo-card-accent": sourcePrimitive.accent,
                      "--logo-surface-accent": surfacePrimitive.accent,
                    } as CSSProperties
                  }
                >
                  <div className={styles.supplierLogoPlate} data-surface={logo.surface}>
                    <Image
                      className={`${styles.supplierLogoImage} ${styles.supplierLogoImageLight}`}
                      data-supplier-logo-img="true"
                      data-supplier-logo-theme="light"
                      src={getPartsBrandLogoThemeSrc(logo, "light")}
                      alt={`${logo.name} official logo for light mode`}
                      width={320}
                      height={112}
                      sizes="(max-width: 760px) 80vw, 220px"
                    />
                    <Image
                      className={`${styles.supplierLogoImage} ${styles.supplierLogoImageDark}`}
                      data-supplier-logo-img="true"
                      data-supplier-logo-theme="dark"
                      src={getPartsBrandLogoThemeSrc(logo, "dark")}
                      alt={`${logo.name} official logo`}
                      width={320}
                      height={112}
                      sizes="(max-width: 760px) 80vw, 220px"
                    />
                  </div>
                  <div className={styles.supplierLogoCopy}>
                    <h4 className={styles.supplierLogoName}>{logo.name}</h4>
                    <code className={styles.supplierLogoSlug}>{logo.id}</code>
                  </div>
                  <div className={styles.supplierPrimitiveRail}>
                    <Chip label="source asset" tone="green" selected />
                    <Chip label={logo.sourceType} tone={sourcePrimitive.chipTone} selected />
                    <Kbd size="sm">{logo.surface} surface</Kbd>
                  </div>
                  <div className={styles.supplierBrandEcho}>
                    <span className={styles.supplierEchoIcon}>
                      <AnimatedIcon
                        icon={SourceIcon}
                        tone={sourcePrimitive.iconTone}
                        motion={sourcePrimitive.motion}
                        frame="none"
                        variant={variant}
                        size={24}
                        tooltip={`${logo.sourceType} primitive echo`}
                      />
                    </span>
                    <span className={styles.supplierEchoCopy}>
                      <span className={styles.supplierEchoKicker}>{sourcePrimitive.label}</span>
                      <KineticText
                        fontId={sourcePrimitive.fontId}
                        motion={sourcePrimitive.kineticMotion}
                        size="sm"
                      >
                        {sourcePrimitive.caption}
                      </KineticText>
                    </span>
                    <ProgressLinear
                      label={`${logo.sourceType} primitive fit`}
                      value={sourcePrimitive.progress}
                      tone={sourcePrimitive.progressTone}
                      variant="segmented"
                      segments={6}
                      className={styles.supplierEchoProgress}
                    />
                  </div>
                  <dl className={styles.supplierLogoAudit}>
                    <div>
                      <dt>Local variants</dt>
                      <dd>
                        <code>{getPartsBrandLogoThemeSrc(logo, "light")}</code>
                        <br />
                        <code>{getPartsBrandLogoThemeSrc(logo, "dark")}</code>
                      </dd>
                    </div>
                    <div>
                      <dt>Source page</dt>
                      <dd>
                        <a href={logo.sourcePage} target="_blank" rel="noreferrer">
                          {logo.sourcePage}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Asset</dt>
                      <dd>
                        <a href={logo.sourceAsset} target="_blank" rel="noreferrer">
                          {logo.sourceAsset}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
