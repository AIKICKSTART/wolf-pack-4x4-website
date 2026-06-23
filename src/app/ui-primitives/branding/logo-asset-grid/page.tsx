import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LogoAssetGrid, type LogoAsset } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Logo asset grid | Branding Lab",
  description:
    "Primitive 10 — every approved logo variation with download chip and format chips per asset.",
}

function ChevronMark({ stroke = "var(--primitive-text-on-accent)" }: { stroke?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Oak Flats chevron mark"
      focusable="false"
    >
      <title>Chevron mark</title>
      <path
        d="M20 64 L36 44 L48 56 L62 38 L78 52"
        fill="none"
        stroke={stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="74" r="4" fill={stroke} />
    </svg>
  )
}

function DiscMark({ disc = "var(--primitive-red)", stroke = "var(--primitive-text-on-accent)" }: { disc?: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Oak Flats disc mark"
      focusable="false"
    >
      <title>Disc mark</title>
      <circle cx="50" cy="50" r="40" fill={disc} />
      <path
        d="M28 60 L42 46 L52 56 L62 42 L72 50"
        fill="none"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OutlineMark() {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Outline mark"
      focusable="false"
    >
      <title>Outline mark</title>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
      <path
        d="M28 60 L42 46 L52 56 L62 42 L72 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ASSETS: ReadonlyArray<LogoAsset> = [
  {
    id: "full-color",
    name: "Full colour",
    description: "Default brand mark on canvas. Use everywhere we own the full colour budget.",
    surfaceClass: "fullColor",
    formats: ["SVG", "PNG", "PDF"],
    mark: <DiscMark />,
  },
  {
    id: "mono",
    name: "Mono black",
    description: "Single ink — receipts, embossing, plain paper printouts, watermarks.",
    surfaceClass: "mono",
    formats: ["SVG", "PNG", "PDF"],
    mark: <DiscMark disc="color-mix(in oklab, var(--primitive-canvas) 82%, var(--primitive-text-strong))" stroke="var(--primitive-text-on-accent)" />,
  },
  {
    id: "inverse",
    name: "Mono red on white",
    description: "Use over light photography. Approved tint only — no off-reds.",
    surfaceClass: "inverse",
    formats: ["SVG", "PNG", "PDF"],
    mark: <DiscMark disc="var(--primitive-red)" stroke="var(--primitive-text-on-accent)" />,
  },
  {
    id: "outline",
    name: "Outline",
    description: "Stroke-only treatment for stencilling, etching, and light-on-dark posters.",
    surfaceClass: "outline",
    formats: ["SVG", "EPS"],
    mark: <OutlineMark />,
  },
  {
    id: "stencil",
    name: "Stencil",
    description: "Spray-stencil cut — used for sign-writing, jersey numbers, decals.",
    surfaceClass: "stencil",
    formats: ["SVG", "EPS", "PDF"],
    mark: <ChevronMark stroke="var(--primitive-amber)" />,
  },
  {
    id: "duotone",
    name: "Duotone",
    description: "Reserved for events and partnership lockups. Approved by Brand only.",
    surfaceClass: "duotone",
    formats: ["SVG", "PNG"],
    mark: <DiscMark disc="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" stroke="var(--primitive-text-on-accent)" />,
  },
]

export default function LogoAssetGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Asset library"
        title="Logo asset grid"
        description="Every approved logo variation in one library — full colour, mono, inverse, outline, stencil, duotone. Each card carries a download action and the formats packaged for it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Asset grid" },
        ]}
      />
      <LogoAssetGrid assets={ASSETS} />
    </main>
  )
}
