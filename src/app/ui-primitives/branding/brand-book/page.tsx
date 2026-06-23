import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AccessibilityContrastGrid,
  BrandDoDontCard,
  BrandGuidelinesPageTemplate,
  BrandVoiceSlider,
  ColorRolesGrid,
  FaviconPreview,
  LogoAssetGrid,
  LogoLockup,
  LogoMarkBuilder,
  MoodBoard,
  PaletteExtractor,
  PatternLibraryTile,
  ToneOfVoiceCard,
  TypePairingCard,
  type BrandGuidelinesSection,
  type BrandVoiceAxis,
  type ColorRoleEntry,
  type ContrastCellResult,
  type ContrastColor,
  type LogoAsset,
  type MoodTile,
  type PaletteSource,
  type PatternId,
} from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Brand book composition | Branding Lab",
  description:
    "Bonus — every branding primitive composed into one navigable, scrollable brand book scene.",
}

const ROLES: ReadonlyArray<ColorRoleEntry> = [
  {
    role: "Primary",
    description: "Workshop red. Reserved for the brand mark, primary actions, and the voice of the bay.",
    background: "#E62028",
    foreground: "#FFFFFF",
    pairingLabel: "PRIMARY",
  },
  {
    role: "Surface",
    description: "Bay graphite. The default canvas for marketing and product surfaces.",
    background: "#101016",
    foreground: "#F6F6F8",
    pairingLabel: "SURFACE",
  },
  {
    role: "Critical",
    description: "Stop. Destructive actions, hard errors, and bay-out alerts.",
    background: "#A8141A",
    foreground: "#FFEDED",
    pairingLabel: "CRITICAL",
  },
  {
    role: "Success",
    description: "Telemetry green. Confirmations, completed jobs, and safe states.",
    background: "#37D67A",
    foreground: "#06150D",
    pairingLabel: "SUCCESS",
  },
  {
    role: "Muted",
    description: "Chrome mist. Supporting labels, breadcrumbs, and inactive UI text.",
    background: "#1B1C25",
    foreground: "#AEB2BD",
    pairingLabel: "MUTED",
  },
  {
    role: "Accent",
    description: "Service amber. Highlight role — used sparingly.",
    background: "#FFC14F",
    foreground: "#1A1306",
    pairingLabel: "ACCENT",
  },
]

const TILES: ReadonlyArray<MoodTile> = [
  { id: "hero", kind: "image", label: "Bay 04", detail: "Service light · 6500K", span: "wide" },
  { id: "swatch-red", kind: "swatch", label: "Workshop red", detail: "#E62028", background: "#E62028" },
  { id: "type", kind: "type", label: "ANTON", detail: "Display headliner", span: "square" },
  { id: "swatch-amber", kind: "swatch", label: "Service amber", detail: "#FFC14F", background: "#FFC14F" },
  { id: "texture", kind: "texture", label: "Carbon weave", detail: "Surface texture", span: "tall" },
  { id: "pit", kind: "image", label: "Pit lane", detail: "Tooling rack" },
  {
    id: "quote",
    kind: "quote",
    label: '"Built properly. Not pretty — proper."',
    detail: "Workshop manifesto",
    span: "wide",
  },
  { id: "swatch-teal", kind: "swatch", label: "Scan teal", detail: "#40BCFF", background: "#40BCFF" },
  { id: "swatch-ink", kind: "swatch", label: "Stencil ink", detail: "#050508", background: "#050508" },
  { id: "decal", kind: "image", label: "Decals", detail: "Van livery" },
  { id: "plate", kind: "texture", label: "Diamond plate", detail: "Floor texture" },
  { id: "swatch-green", kind: "swatch", label: "Telemetry", detail: "#37D67A", background: "#37D67A" },
]

const PALETTE_SOURCES: ReadonlyArray<PaletteSource> = [
  {
    id: "workshop-floor",
    label: "Workshop floor",
    description: "Bay 04 under service light, with chrome glare from the exhaust line.",
    gradient:
      "radial-gradient(circle at 22% 18%, #ffc14f 0%, transparent 38%), radial-gradient(circle at 78% 82%, #e62028 0%, transparent 48%), linear-gradient(135deg, #1c1c25 0%, #0a0a10 100%)",
    samples: [
      { id: "amber", name: "Service amber", hex: "#FFC14F", role: "Accent" },
      { id: "red", name: "Workshop red", hex: "#E62028", role: "Primary" },
      { id: "graphite", name: "Bay graphite", hex: "#1B1C25", role: "Surface" },
      { id: "chrome", name: "Chrome mist", hex: "#9AA3AD", role: "Muted" },
      { id: "ink", name: "Stencil ink", hex: "#050508", role: "Base" },
    ],
  },
]

const ATTRIBUTES = ["Confident", "Honest", "Workshop", "Warm", "Direct"]

const VOICE_EXAMPLES = [
  {
    do: "Your exhaust system needs three new gaskets. We can fit them on Thursday — no surprises on the bill.",
    dont: "Critical exhaust failure detected. Immediate intervention required to mitigate cascading risk.",
  },
  {
    do: "Honest answer — that part will outlast the car. Skip the upgrade.",
    dont: "Highly recommended premium replacement option (limited-time offer, save 20%).",
  },
]

const AXES: ReadonlyArray<BrandVoiceAxis> = [
  { id: "formality", leftLabel: "Formal", rightLabel: "Casual", defaultValue: 72, helper: "Lean casual — counter warmth." },
  { id: "tone", leftLabel: "Serious", rightLabel: "Playful", defaultValue: 34, helper: "Serious by default." },
  { id: "restraint", leftLabel: "Restrained", rightLabel: "Bold", defaultValue: 68, helper: "Bold for marketing, restrained for docs." },
]

function ChevronDisc({ disc = "var(--primitive-red)", stroke = "var(--primitive-text-on-accent)" }: { disc?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Disc mark" focusable="false">
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
    <svg viewBox="0 0 100 100" role="img" aria-label="Outline mark" focusable="false">
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
    id: "full",
    name: "Full colour",
    description: "Default brand mark on canvas.",
    surfaceClass: "fullColor",
    formats: ["SVG", "PNG", "PDF"],
    mark: <ChevronDisc />,
  },
  {
    id: "mono",
    name: "Mono black",
    description: "Single ink — receipts and paperwork.",
    surfaceClass: "mono",
    formats: ["SVG", "PNG"],
    mark: <ChevronDisc disc="color-mix(in oklab, var(--primitive-canvas) 82%, var(--primitive-text-strong))" />,
  },
  {
    id: "outline",
    name: "Outline",
    description: "Stencilling, etching, light-on-dark posters.",
    surfaceClass: "outline",
    formats: ["SVG", "EPS"],
    mark: <OutlineMark />,
  },
  {
    id: "duotone",
    name: "Duotone",
    description: "Reserved for events and partnership lockups.",
    surfaceClass: "duotone",
    formats: ["SVG", "PNG"],
    mark: <ChevronDisc disc="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />,
  },
]

const PATTERNS: ReadonlyArray<{ pattern: PatternId; name: string; usage: string }> = [
  { pattern: "carbon-fibre", name: "Carbon fibre", usage: "Performance product surfaces." },
  { pattern: "diamond-plate", name: "Diamond plate", usage: "Workshop floor backdrops." },
  { pattern: "herringbone", name: "Herringbone", usage: "Editorial accents." },
  { pattern: "brushed-metal", name: "Brushed metal", usage: "Chrome surfaces." },
]

const CONTRAST_FG: ReadonlyArray<ContrastColor> = [
  { id: "ink", label: "Stencil ink", hex: "#050508" },
  { id: "paper", label: "Paper", hex: "#F6F6F8" },
  { id: "amber", label: "Service amber", hex: "#FFC14F" },
]

const CONTRAST_BG: ReadonlyArray<ContrastColor> = [
  { id: "canvas", label: "Canvas", hex: "#101016" },
  { id: "paper", label: "Paper", hex: "#F6F6F8" },
  { id: "red", label: "Workshop red", hex: "#E62028" },
  { id: "green", label: "Telemetry", hex: "#37D67A" },
]

const CONTRAST_RESULTS: ReadonlyArray<ReadonlyArray<ContrastCellResult>> = [
  [
    { ratio: 18.32, level: "AAA" },
    { ratio: 18.6, level: "AAA" },
    { ratio: 6.41, level: "AA" },
    { ratio: 12.42, level: "AAA" },
  ],
  [
    { ratio: 17.92, level: "AAA" },
    { ratio: 1.06, level: "fail" },
    { ratio: 4.62, level: "AA" },
    { ratio: 1.51, level: "fail" },
  ],
  [
    { ratio: 11.84, level: "AAA" },
    { ratio: 1.6, level: "fail" },
    { ratio: 2.71, level: "fail" },
    { ratio: 1.49, level: "fail" },
  ],
]

function MarkClean() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-canvas)" />
      <circle cx="50" cy="30" r="16" fill="var(--primitive-red)" />
      <path d="M42 34 L48 28 L52 32 L58 26" fill="none" stroke="var(--primitive-text-on-accent)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function MarkSquished() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-canvas)" />
      <ellipse cx="50" cy="30" rx="28" ry="10" fill="var(--primitive-red)" />
      <path d="M40 32 L46 26 L52 30 L58 24" fill="none" stroke="var(--primitive-text-on-accent)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

const SECTIONS: ReadonlyArray<BrandGuidelinesSection> = [
  {
    id: "identity",
    number: "01",
    title: "Identity",
    description: "Mark, lockups, clear-space, and approved configurations.",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        <LogoLockup variant="stacked" />
        <LogoLockup variant="horizontal" />
        <LogoLockup variant="mark-only" />
        <LogoLockup variant="wordmark-only" />
      </div>
    ),
  },
  {
    id: "exploration",
    number: "02",
    title: "Mark exploration",
    description: "Live editor for testing alternative silhouettes during early identity work.",
    content: <LogoMarkBuilder />,
  },
  {
    id: "palette",
    number: "03",
    title: "Palette",
    description: "The lab pulls five-colour palettes from real imagery before we lock them down.",
    content: <PaletteExtractor sources={PALETTE_SOURCES} />,
  },
  {
    id: "roles",
    number: "04",
    title: "Colour roles",
    description: "Semantic colour roles — Primary, Surface, Critical, Success, Muted, Accent.",
    content: <ColorRolesGrid roles={ROLES} />,
  },
  {
    id: "mood",
    number: "05",
    title: "Mood board",
    description: "References, textures, and quotes pinned to anchor design decisions.",
    content: <MoodBoard tiles={TILES} />,
  },
  {
    id: "type",
    number: "06",
    title: "Typography",
    description: "Display + body pairing with rationale and full sample copy.",
    content: (
      <TypePairingCard
        pairingName="Display + Body"
        headingFont="Anton, Impact, sans-serif"
        bodyFont="Inter, Arial, sans-serif"
        headingExample="Built properly. Not pretty — proper."
        bodyExample="Anton carries the marquee. Inter handles every body string underneath without competing."
        rationale="Industrial cut + neutral body. The pair lets the headline shout without the page feeling salesy."
      />
    ),
  },
  {
    id: "voice",
    number: "07",
    title: "Voice & tone",
    description: "Attribute chips plus do/don't examples for the workshop voice.",
    content: (
      <ToneOfVoiceCard
        attributes={ATTRIBUTES}
        summary="Mufflermen write the way the counter sounds — confident, plain-spoken, never salesy."
        examples={VOICE_EXAMPLES}
      />
    ),
  },
  {
    id: "rules",
    number: "08",
    title: "Brand rules",
    description: "Hard rules for handling the mark in the wild.",
    content: (
      <BrandDoDontCard
        rule="Always keep the mark in its locked aspect ratio."
        doLabel="Locked aspect"
        doDetail="The disc stays a disc. Never scale on a single axis."
        doVisual={<MarkClean />}
        dontLabel="Stretched mark"
        dontDetail="Single-axis scaling destroys the silhouette inside three metres."
        dontVisual={<MarkSquished />}
      />
    ),
  },
  {
    id: "favicon",
    number: "09",
    title: "Favicon",
    description: "Browser tab, bookmark bar, iOS home screen, Android PWA.",
    content: <FaviconPreview title="Oak Flats Mufflermen" url="https://mufflermen.com.au" />,
  },
  {
    id: "assets",
    number: "10",
    title: "Asset library",
    description: "Every approved logo variation, ready to download.",
    content: <LogoAssetGrid assets={ASSETS} />,
  },
  {
    id: "axes",
    number: "11",
    title: "Voice axes",
    description: "Calibrate the brand against formality, seriousness, and restraint.",
    content: <BrandVoiceSlider axes={AXES} />,
  },
  {
    id: "contrast",
    number: "12",
    title: "Accessibility",
    description: "WCAG pass-fail matrix across the approved colour set.",
    content: (
      <AccessibilityContrastGrid
        foregrounds={CONTRAST_FG}
        backgrounds={CONTRAST_BG}
        results={CONTRAST_RESULTS}
      />
    ),
  },
  {
    id: "patterns",
    number: "13",
    title: "Pattern library",
    description: "The texture system, with usage rules baked in.",
    content: (
      <section
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}
      >
        {PATTERNS.map((entry) => (
          <PatternLibraryTile
            key={entry.pattern}
            pattern={entry.pattern}
            name={entry.name}
            usage={entry.usage}
          />
        ))}
      </section>
    ),
  },
]

export default function BrandBookPage() {
  return (
    <main className={styles.bookMain}>
      <PageHeader
        kicker="Bonus / Brand book"
        title="Brand book composition"
        description="Every branding primitive composed into one long-scroll brand book. Use this scene as the end-to-end stakeholder walkthrough — identity, palette, mood, voice, accessibility, patterns, all the way through."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Brand book" },
        ]}
      />
      <BrandGuidelinesPageTemplate
        workmark="Oak Flats Mufflermen"
        tagline="Workshop · Exhaust · Tuning"
        versionLabel="Brand book · v3.2"
        intro="The Oak Flats Mufflermen brand book pins identity, voice, and asset governance into one scrollable surface. Every customer-facing thing we ship — invoices, livery, marketing pages — pulls from in here."
        sections={SECTIONS}
      />
    </main>
  )
}
