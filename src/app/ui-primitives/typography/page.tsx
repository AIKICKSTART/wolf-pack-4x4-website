import type { Metadata } from "next"
import Image from "next/image"
import type { CSSProperties, ReactElement } from "react"

import {
  GradientTrail,
  MorphText,
  Reveal,
  StaggerList,
} from "../components/motion"
import { PageHeader } from "../components/page-header"
import { Chip } from "../components/primitives/chip"
import { Kbd } from "../components/primitives/kbd"
import { ProgressLinear } from "../components/primitives/progress-linear"
import { StatTile } from "../components/primitives/stat-tile"
import {
  FontAnton,
  FontBebas,
  FontBigShoulders,
  FontBricolage,
  FontCormorant,
  FontFraunces,
  FontIbmMono,
  FontInterTight,
  FontMajorMono,
  FontSpaceGrotesk,
  KineticText,
  RoleControl,
  RoleDenseTable,
  RoleBodyBase,
  RoleBodyLead,
  RoleBodySmall,
  RoleCaption,
  RoleDisplay,
  RoleEyebrow,
  RoleH1,
  RoleH2,
  RoleH3,
  RoleH4,
  RoleH5,
  RoleH6,
  RoleLabel,
  RoleKineticSafe,
  RoleMono,
  RoleNumeric,
  typographyFontClassNames,
  typographyFonts,
  typographyRoles,
  type KineticTextMotionId,
  type TypographyRoleId,
  type TypographyFontId,
} from "../components/typography"

import styles from "./typography.module.css"

export const metadata: Metadata = {
  title: "Typography | UI Primitives",
}

interface SectionMeta {
  index: string
  title: string
  description: string
  component: () => ReactElement
}

const SECTIONS: ReadonlyArray<SectionMeta> = [
  {
    index: "01",
    title: "Anton",
    description:
      "Industrial single-cut display. Letter-stagger rise resolves the headline a glyph at a time so it reads on the workshop hero.",
    component: FontAnton,
  },
  {
    index: "02",
    title: "Big Shoulders Inline",
    description:
      "Heavy inline display with a printed coach-line. Gradient sweeps fill the outline left-to-right for livery and signage callouts.",
    component: FontBigShoulders,
  },
  {
    index: "03",
    title: "Bebas Neue",
    description:
      "Condensed marquee cut. Runs as a horizontal banner ticker — perfect for live status rails and bay announcements.",
    component: FontBebas,
  },
  {
    index: "04",
    title: "Space Grotesk",
    description:
      "Tightened grotesque for body, telemetry, and UI labels. Typewriter caret reveal reinforces the diagnostic / terminal voice.",
    component: FontSpaceGrotesk,
  },
  {
    index: "05",
    title: "Fraunces",
    description:
      "Variable serif with weight, optical-size, soft, and wonk axes. Morph cycle showcases the full expressive range in one mark.",
    component: FontFraunces,
  },
  {
    index: "06",
    title: "Major Mono Display",
    description:
      "All-lowercase decorative mono. Client-side cipher scramble resolves left-to-right and aria-label keeps the spoken text stable.",
    component: FontMajorMono,
  },
  {
    index: "07",
    title: "Bricolage Grotesque",
    description:
      "Variable grotesque sweeping the width axis 75 to 125 and optical size 12 to 96. One family for tight chips and wide headlines.",
    component: FontBricolage,
  },
  {
    index: "08",
    title: "IBM Plex Mono",
    description:
      "Engineering-grade monospace. Vertical scanline overlay sweeps across the heading to read as a live telemetry stream.",
    component: FontIbmMono,
  },
  {
    index: "09",
    title: "Inter Tight",
    description:
      "Tightened Inter for modern product callouts. Four-stop gradient sweep paints the whole brand palette across the heading.",
    component: FontInterTight,
  },
  {
    index: "10",
    title: "Cormorant Garamond",
    description:
      "Most romantic Garamond revival. Fades up from below while resolving italic to roman — a flourish reserved for heritage copy.",
    component: FontCormorant,
  },
]

interface KineticPairing {
  fontId: TypographyFontId
  motion: KineticTextMotionId
  text: string
}

type DemoTone = "red" | "amber"
type MaterialTone = DemoTone | "chrome" | "carbon"

interface MotionLabDemo {
  label: string
  caption: string
  fontId: TypographyFontId
  motion: KineticTextMotionId
  text: string
  tone: DemoTone
  progress: number
  trailPath: string
}

interface OperationalTypeDemo {
  label: string
  caption: string
  fontId: TypographyFontId
  motion: KineticTextMotionId
  text: string
  tone: DemoTone
  progress: number
  code: string
}

interface EcosystemTypeDemo {
  label: string
  caption: string
  fontId: TypographyFontId
  motion: KineticTextMotionId
  text: string
  tone: DemoTone
  progress: number
  statLabel: string
  statValue: string
  token: string
}

interface MaterialReference {
  label: string
  caption: string
  tone: MaterialTone
}

const KINETIC_PAIRINGS: ReadonlyArray<KineticPairing> = [
  { fontId: "anton", motion: "letter-rise", text: "Performance" },
  { fontId: "anton", motion: "stamp-pop", text: "Approved" },
  { fontId: "anton", motion: "heat-shimmer", text: "Hot Metal" },
  { fontId: "anton", motion: "weld-flicker", text: "Arc Ready" },
  { fontId: "anton", motion: "redline-ramp", text: "Redline Ready" },
  { fontId: "bigshoulders", motion: "outline-fill", text: "Coast Road" },
  { fontId: "bigshoulders", motion: "arc-flash", text: "Arc Flash" },
  { fontId: "bigshoulders", motion: "grid-lock", text: "Lane Locked" },
  { fontId: "bigshoulders", motion: "paint-mask", text: "Paint Mask" },
  { fontId: "inter-tight", motion: "color-sweep", text: "Built Properly" },
  { fontId: "inter-tight", motion: "chrome-glint", text: "Chrome Finish" },
  { fontId: "inter-tight", motion: "road-blur", text: "Road Ready" },
  { fontId: "inter-tight", motion: "oil-slick", text: "Surface Tune" },
  { fontId: "inter-tight", motion: "turbo-spool", text: "Spool Curve" },
  { fontId: "bebas", motion: "marquee", text: "Bay 04 · Workshop Floor" },
  { fontId: "bebas", motion: "spark-trail", text: "Weld Line" },
  { fontId: "bebas", motion: "lane-split", text: "Dual Exit" },
  { fontId: "bebas", motion: "bay-door-reveal", text: "Bay Door Open" },
  { fontId: "bebas", motion: "dyno-pull", text: "Dyno Pull" },
  { fontId: "bebas", motion: "checker-wave", text: "Finish Flag" },
  { fontId: "bebas", motion: "brake-pulse", text: "Brake Check" },
  { fontId: "fraunces", motion: "weight-morph", text: "Craft, restored" },
  { fontId: "fraunces", motion: "italic-shift", text: "Heritage, in motion" },
  { fontId: "fraunces", motion: "exhaust-wave", text: "Soft exhaust note" },
  { fontId: "fraunces", motion: "receipt-stamp", text: "Stamped" },
  { fontId: "ibm-mono", motion: "scanline-wipe", text: "stream · 0x42" },
  { fontId: "ibm-mono", motion: "signal-bounce", text: "sensor online" },
  { fontId: "ibm-mono", motion: "gauge-sweep", text: "rpm sweep" },
  { fontId: "ibm-mono", motion: "valve-tick", text: "tick tick tick" },
  { fontId: "ibm-mono", motion: "route-draw", text: "route plotted" },
  { fontId: "ibm-mono", motion: "tacho-needle", text: "needle sweep" },
  { fontId: "space-grotesk", motion: "type-on", text: "diag ready" },
  { fontId: "space-grotesk", motion: "torque-tilt", text: "torque spec" },
  { fontId: "space-grotesk", motion: "boost-squeeze", text: "boost ready" },
  { fontId: "space-grotesk", motion: "piston-stroke", text: "piston loop" },
  { fontId: "space-grotesk", motion: "relay-pulse", text: "control relay" },
  { fontId: "space-grotesk", motion: "circuit-trace", text: "tone bus active" },
  { fontId: "space-grotesk", motion: "clutch-drop", text: "clutch drop" },
  { fontId: "space-grotesk", motion: "visor-scan", text: "visor scan" },
  { fontId: "major-mono", motion: "scramble", text: "vin: 2hg-cg-1657" },
  { fontId: "major-mono", motion: "spark-plug-fire", text: "coil 04 fire" },
  { fontId: "bricolage", motion: "axis-swing", text: "coastal precision" },
  { fontId: "bricolage", motion: "rubber-burn", text: "grip trace" },
  { fontId: "bricolage", motion: "neon-idle", text: "after hours" },
  { fontId: "bricolage", motion: "hoist-lift", text: "lift clear" },
  { fontId: "cormorant", motion: "chrome-glint", text: "Heritage chrome" },
  { fontId: "ibm-mono", motion: "blueprint-pan", text: "bay datum grid" },
  { fontId: "bigshoulders", motion: "marker-swipe", text: "marked for fit" },
  { fontId: "space-grotesk", motion: "meter-step", text: "meter step" },
  { fontId: "anton", motion: "impact-stack", text: "shop impact" },
  { fontId: "inter-tight", motion: "signal-cut", text: "signal cut" },
  { fontId: "bricolage", motion: "status-latch", text: "status latched" },
  { fontId: "space-grotesk", motion: "cam-sync", text: "cam sync" },
  { fontId: "anton", motion: "bead-run", text: "bead run" },
  { fontId: "bricolage", motion: "fan-balance", text: "fan balance" },
  { fontId: "ibm-mono", motion: "battery-charge", text: "charge rail" },
  { fontId: "bebas", motion: "pressure-wave", text: "pressure wave" },
  { fontId: "bigshoulders", motion: "shift-gate", text: "shift gate" },
  { fontId: "inter-tight", motion: "supplier-glow", text: "supplier lock" },
  { fontId: "major-mono", motion: "data-ribbon", text: "data ribbon" },
]

const MOTION_LAB_DEMOS: ReadonlyArray<MotionLabDemo> = [
  {
    label: "Weld handoff",
    caption: "Material spark, glyph flicker, and trail draw share the same amber/red heat.",
    fontId: "anton",
    motion: "weld-flicker",
    text: "weld signed",
    tone: "amber",
    progress: 96,
    trailPath: "M 2 28 C 38 4 66 52 102 28 S 166 4 202 28 S 268 52 306 22",
  },
  {
    label: "Bay release",
    caption: "A reveal wrapper lands the bay phrase while the material pulse confirms state.",
    fontId: "bebas",
    motion: "bay-door-reveal",
    text: "bay 04 open",
    tone: "red",
    progress: 84,
    trailPath: "M 2 34 L 52 10 L 104 34 L 156 10 L 208 34 L 258 10 L 306 34",
  },
  {
    label: "Telemetry rail",
    caption: "Signal-mark motion, mono scanline text, and a trace path read as one live bus.",
    fontId: "ibm-mono",
    motion: "scanline-wipe",
    text: "rpm stream",
    tone: "red",
    progress: 88,
    trailPath: "M 2 28 H 42 L 56 12 L 76 44 L 94 20 L 112 28 H 162 L 178 10 L 198 42 L 216 22 L 232 28 H 306",
  },
  {
    label: "Customer proof",
    caption: "The approval material mark, morph copy, and soft neon wordmark stay readable in light mode.",
    fontId: "bricolage",
    motion: "neon-idle",
    text: "ready to collect",
    tone: "amber",
    progress: 92,
    trailPath: "M 2 28 Q 44 6 78 28 T 154 28 T 230 28 T 306 28",
  },
]

const OPERATIONAL_TYPE_DEMOS: ReadonlyArray<OperationalTypeDemo> = [
  {
    label: "Redline ramp",
    caption: "Gauge-style material pulse and underline ramp share the same red/amber climb.",
    fontId: "anton",
    motion: "redline-ramp",
    text: "redline ramp",
    tone: "red",
    progress: 94,
    code: "rpm / hero",
  },
  {
    label: "Clutch drop",
    caption: "Glyphs compress then release for launch-status labels without blurring the word.",
    fontId: "space-grotesk",
    motion: "clutch-drop",
    text: "clutch drop",
    tone: "amber",
    progress: 81,
    code: "launch / chip",
  },
  {
    label: "Turbo spool",
    caption: "Redline spool styling pairs with compact performance cards.",
    fontId: "inter-tight",
    motion: "turbo-spool",
    text: "spool curve",
    tone: "red",
    progress: 88,
    code: "boost / card",
  },
  {
    label: "Brake pulse",
    caption: "A short red flash for checks, warnings, and stop-state microcopy.",
    fontId: "bebas",
    motion: "brake-pulse",
    text: "brake pulse",
    tone: "red",
    progress: 76,
    code: "safety / alert",
  },
  {
    label: "Paint mask",
    caption: "Livery-color sweep for banners that need to feel tied to brand assets.",
    fontId: "bigshoulders",
    motion: "paint-mask",
    text: "paint mask",
    tone: "amber",
    progress: 90,
    code: "livery / banner",
  },
  {
    label: "Route draw",
    caption: "Dashed path underline works with location, delivery, and service-radius views.",
    fontId: "ibm-mono",
    motion: "route-draw",
    text: "route drawn",
    tone: "amber",
    progress: 84,
    code: "route / map",
  },
  {
    label: "Receipt stamp",
    caption: "Hard-edged stamp treatment for paid, approved, and collected states.",
    fontId: "fraunces",
    motion: "receipt-stamp",
    text: "approved",
    tone: "red",
    progress: 92,
    code: "invoice / state",
  },
  {
    label: "Spark plug fire",
    caption: "Per-glyph ignition flicker borrows the heat, bevel, and spark styling.",
    fontId: "major-mono",
    motion: "spark-plug-fire",
    text: "coil 04 fire",
    tone: "amber",
    progress: 89,
    code: "ignition / mono",
  },
  {
    label: "Hoist lift",
    caption: "Subtle vertical lift gives service-bay labels a mechanical raise cycle.",
    fontId: "bricolage",
    motion: "hoist-lift",
    text: "lift clear",
    tone: "amber",
    progress: 87,
    code: "bay / status",
  },
  {
    label: "Tacho needle",
    caption: "A compact sweep marker for dashboards and tune-progress readouts.",
    fontId: "ibm-mono",
    motion: "tacho-needle",
    text: "needle sweep",
    tone: "red",
    progress: 95,
    code: "gauge / data",
  },
  {
    label: "Visor scan",
    caption: "Scanline typography stays legible for diagnostic panels and system rails.",
    fontId: "space-grotesk",
    motion: "visor-scan",
    text: "visor scan",
    tone: "red",
    progress: 83,
    code: "scan / rail",
  },
  {
    label: "Checker wave",
    caption: "Finish-flag energy for completion surfaces without losing word shape.",
    fontId: "bebas",
    motion: "checker-wave",
    text: "finish flag",
    tone: "amber",
    progress: 98,
    code: "complete / cta",
  },
  {
    label: "Blueprint pan",
    caption: "Drafting-grid texture ties type to service plans, diagrams, and route overlays.",
    fontId: "ibm-mono",
    motion: "blueprint-pan",
    text: "datum grid",
    tone: "red",
    progress: 91,
    code: "plan / map",
  },
  {
    label: "Marker swipe",
    caption: "A controlled paint-marker pass gives labels the same warm accent as brand chips.",
    fontId: "bigshoulders",
    motion: "marker-swipe",
    text: "marked fit",
    tone: "amber",
    progress: 87,
    code: "brand / tag",
  },
  {
    label: "Meter step",
    caption: "Stepped underline progress reads with stat tiles, segmented bars, and tuning states.",
    fontId: "space-grotesk",
    motion: "meter-step",
    text: "meter step",
    tone: "red",
    progress: 93,
    code: "progress / stat",
  },
  {
    label: "Impact stack",
    caption: "Hard offset shadows create a dark-mode display hit without blurring the letterform.",
    fontId: "anton",
    motion: "impact-stack",
    text: "shop hit",
    tone: "red",
    progress: 86,
    code: "display / hero",
  },
  {
    label: "Signal cut",
    caption: "A diagonal scan slice connects live bus labels to signal marks and telemetry rails.",
    fontId: "inter-tight",
    motion: "signal-cut",
    text: "signal cut",
    tone: "amber",
    progress: 89,
    code: "signal / rail",
  },
  {
    label: "Status latch",
    caption: "Bracketed motion frames short state copy for chips, approvals, and handoff rows.",
    fontId: "bricolage",
    motion: "status-latch",
    text: "latched",
    tone: "red",
    progress: 95,
    code: "state / chip",
  },
]

const ECOSYSTEM_TYPE_DEMOS: ReadonlyArray<EcosystemTypeDemo> = [
  {
    label: "Cam timing",
    caption: "Glyph lift follows a cam rhythm and lands beside material controls, stat tiles, and timing chips.",
    fontId: "space-grotesk",
    motion: "cam-sync",
    text: "cam sync",
    tone: "amber",
    progress: 88,
    statLabel: "Advance",
    statValue: "12",
    token: "motion.step / amber",
  },
  {
    label: "Weld bead",
    caption: "The bead underline shares heat tokens with welded material styling and keeps the word itself readable.",
    fontId: "anton",
    motion: "bead-run",
    text: "bead run",
    tone: "red",
    progress: 93,
    statLabel: "Bead",
    statValue: "04",
    token: "tone.heat / red",
  },
  {
    label: "Cooling balance",
    caption: "Conic type shimmer, cooling material mark, and redline progress form one primitive story.",
    fontId: "bricolage",
    motion: "fan-balance",
    text: "fan balance",
    tone: "red",
    progress: 84,
    statLabel: "Temp",
    statValue: "82",
    token: "gradient.cool / red",
  },
  {
    label: "Charge rail",
    caption: "Segmented charge type pairs with status material marks and progress rails without needing a bespoke component.",
    fontId: "ibm-mono",
    motion: "battery-charge",
    text: "charge rail",
    tone: "amber",
    progress: 91,
    statLabel: "Volts",
    statValue: "14.2",
    token: "progress.segmented / amber",
  },
  {
    label: "Pressure wave",
    caption: "Per-glyph pressure motion links boost, dyno, and telemetry copy to the same pulse cadence.",
    fontId: "bebas",
    motion: "pressure-wave",
    text: "pressure wave",
    tone: "red",
    progress: 89,
    statLabel: "Boost",
    statValue: "18",
    token: "pulse.signal / red",
  },
  {
    label: "Shift gate",
    caption: "Bracket motion frames command text so keyboard tags and state chips feel mechanically connected.",
    fontId: "bigshoulders",
    motion: "shift-gate",
    text: "shift gate",
    tone: "amber",
    progress: 86,
    statLabel: "Gate",
    statValue: "H",
    token: "control.frame / amber",
  },
  {
    label: "Supplier lock",
    caption: "A supplier glow treatment ties partner marks, price tags, and approval copy to the brand palette.",
    fontId: "inter-tight",
    motion: "supplier-glow",
    text: "supplier lock",
    tone: "red",
    progress: 90,
    statLabel: "SKU",
    statValue: "7",
    token: "brand.rim / red",
  },
  {
    label: "Data ribbon",
    caption: "A stepped telemetry ribbon gives mono labels the same segmented rhythm as diagnostic progress.",
    fontId: "major-mono",
    motion: "data-ribbon",
    text: "data ribbon",
    tone: "amber",
    progress: 95,
    statLabel: "Bus",
    statValue: "CAN",
    token: "data.ribbon / amber",
  },
]

interface RoleComponentSpec {
  id: TypographyRoleId
  component: () => ReactElement
}

interface ScaleRow {
  token: string
  label: string
  value: string
  sample: string
}

const HEADING_ROLE_COMPONENTS: ReadonlyArray<RoleComponentSpec> = [
  { id: "display", component: RoleDisplay },
  { id: "h1", component: RoleH1 },
  { id: "h2", component: RoleH2 },
  { id: "h3", component: RoleH3 },
  { id: "h4", component: RoleH4 },
  { id: "h5", component: RoleH5 },
  { id: "h6", component: RoleH6 },
]

const BODY_ROLE_COMPONENTS: ReadonlyArray<RoleComponentSpec> = [
  { id: "body-lead", component: RoleBodyLead },
  { id: "body-base", component: RoleBodyBase },
  { id: "body-small", component: RoleBodySmall },
  { id: "caption", component: RoleCaption },
  { id: "eyebrow", component: RoleEyebrow },
  { id: "label", component: RoleLabel },
  { id: "mono", component: RoleMono },
  { id: "numeric", component: RoleNumeric },
  { id: "control", component: RoleControl },
  { id: "dense-table", component: RoleDenseTable },
  { id: "kinetic-safe", component: RoleKineticSafe },
]

const FOUNDATION_TOKEN_ROWS: ReadonlyArray<ScaleRow> = [
  {
    token: "--primitive-font-display",
    label: "Display font",
    value: "foundation family",
    sample: "Display and headings inherit",
  },
  {
    token: "--primitive-font-body",
    label: "Body font",
    value: "foundation family",
    sample: "Body, label, control inherit",
  },
  {
    token: "--primitive-font-mono",
    label: "Mono font",
    value: "foundation family",
    sample: "Code, numeric, table inherit",
  },
  {
    token: "--primitive-text-*",
    label: "Text scale",
    value: "role sizes",
    sample: "2xs through 3xl",
  },
  {
    token: "--primitive-leading-*",
    label: "Line height",
    value: "none to relaxed",
    sample: "Readable rhythm gates",
  },
  {
    token: "--primitive-weight-*",
    label: "Weight",
    value: "regular to bold",
    sample: "Hierarchy without decoration",
  },
  {
    token: "--primitive-tracking-*",
    label: "Tracking",
    value: "normal to widest",
    sample: "Labels and captions",
  },
  {
    token: "prefers-reduced-motion",
    label: "Kinetic guard",
    value: "static fallback",
    sample: "Motion-safe readable text",
  },
]

const TYPE_SCALE_ROWS: ReadonlyArray<ScaleRow> = [
  { token: "--primitive-display", label: "Display", value: "fluid 48-120px", sample: "DISPLAY" },
  { token: "--primitive-h1", label: "H1", value: "fluid 36-64px", sample: "Heading one" },
  { token: "--primitive-h2", label: "H2", value: "fluid 26-40px", sample: "Heading two" },
  { token: "--primitive-h3", label: "H3", value: "fluid 21-28px", sample: "Heading three" },
  { token: "--primitive-h4", label: "H4", value: "20px", sample: "Heading four" },
  { token: "--primitive-h5", label: "H5", value: "17px", sample: "Heading five" },
  { token: "--primitive-h6", label: "H6", value: "15px", sample: "Heading six" },
  { token: "--primitive-text-2xs", label: "2XS", value: "10px", sample: "Micro label" },
  { token: "--primitive-text-xs", label: "XS", value: "12px", sample: "Caption text" },
  { token: "--primitive-text-sm", label: "SM", value: "13px", sample: "Small body" },
  { token: "--primitive-text-base", label: "Base", value: "15px", sample: "Default body" },
  { token: "--primitive-text-md", label: "MD", value: "16px", sample: "Medium body" },
  { token: "--primitive-text-lg", label: "LG", value: "18px", sample: "Lead body" },
  { token: "--primitive-text-xl", label: "XL", value: "22px", sample: "Large title" },
  { token: "--primitive-text-2xl", label: "2XL", value: "28px", sample: "Section title" },
  { token: "--primitive-text-3xl", label: "3XL", value: "36px", sample: "Hero support" },
]

const LEADING_ROWS: ReadonlyArray<ScaleRow> = [
  { token: "--primitive-leading-none", label: "None", value: "1", sample: "Single-line counters and chips" },
  { token: "--primitive-leading-tight", label: "Tight", value: "0.95", sample: "Compressed display headlines" },
  { token: "--primitive-leading-snug", label: "Snug", value: "1.15", sample: "Stacked headings and compact cards" },
  { token: "--primitive-leading-normal", label: "Normal", value: "1.5", sample: "Default readable interface copy" },
  { token: "--primitive-leading-relaxed", label: "Relaxed", value: "1.7", sample: "Long form notes and service guidance" },
]

const TRACKING_ROWS: ReadonlyArray<ScaleRow> = [
  { token: "--primitive-tracking-tight", label: "Tight", value: "0", sample: "Wide display copy" },
  { token: "--primitive-tracking-normal", label: "Normal", value: "0", sample: "Body and forms" },
  { token: "--primitive-tracking-wide", label: "Wide", value: "0.08em", sample: "Label text" },
  { token: "--primitive-tracking-wider", label: "Wider", value: "0.16em", sample: "Panel metadata" },
  { token: "--primitive-tracking-widest", label: "Widest", value: "0.22em", sample: "SECTION EYEBROW" },
]

const PARAGRAPH_SPACING_ROWS: ReadonlyArray<ScaleRow> = [
  { token: "--primitive-space-2", label: "Tight stack", value: "8px", sample: "Dense inspector metadata" },
  { token: "--primitive-space-4", label: "Default stack", value: "16px", sample: "Form labels, helper text, fields" },
  { token: "--primitive-space-6", label: "Reading stack", value: "24px", sample: "Paragraph groups and documentation" },
  { token: "--primitive-space-10", label: "Section stack", value: "48px", sample: "Major board sections" },
]

const MATERIAL_REFERENCES: ReadonlyArray<MaterialReference> = [
  { label: "Carbon twill", caption: "woven dark texture", tone: "carbon" },
  { label: "Red bevel", caption: "hot edge highlight", tone: "red" },
  { label: "Chrome gloss", caption: "machined sweep", tone: "chrome" },
  { label: "Smoke glass", caption: "deep field layer", tone: "carbon" },
  { label: "Amber heat", caption: "welded accent", tone: "amber" },
  { label: "Red verify", caption: "approved state", tone: "red" },
]

const OFFICIAL_MUFFLERMEN_LOGO = "/media/brand/mufflermen-logo-nav.webp"

export default function TypographyPage() {
  return (
    <main className={`${styles.main} ${typographyFontClassNames}`}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Atomic type roles from Foundations"
        description="A production typography board for Oak Flats Mufflermen: display, heading, body, mono, label, caption, numeric, control, dense table, and motion-safe kinetic text roles that downstream sections inherit."
        dnaSectionId="typography"
      />

      <section className={styles.scaleSection} aria-labelledby="section-foundation-inheritance">
        <header className={styles.sectionHeader}>
          <span>00 / Foundation inheritance</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-foundation-inheritance">Type roles consume Foundation tokens</h2>
            <p>
              Typography does not invent local scales. It maps readable atomic roles to
              Foundation font, text-size, line-height, weight, and tracking tokens, then
              passes those roles to Surfaces and every downstream primitive.
            </p>
          </div>
        </header>

        <div className={styles.scaleGrid} role="list">
          {FOUNDATION_TOKEN_ROWS.map((row) => (
            <article key={row.token} className={styles.scaleCard} role="listitem">
              <span>{row.label}</span>
              <p>{row.sample}</p>
              <code>{row.token}</code>
              <strong>{row.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fontOptionMatrix} aria-labelledby="section-font-options">
        <header className={styles.sectionHeader}>
          <span>01 / Font options</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-font-options">Eighteen production font voices</h2>
            <p>
              The board now exposes the full type menu as real Next font variables: original
              Mufflermen faces plus eight additional display, condensed, serif, technical,
              and mono options for production surfaces.
            </p>
          </div>
        </header>

        <div className={styles.materialReferenceRail} aria-label="Premium material style references">
          {MATERIAL_REFERENCES.map((reference, index) => (
            <article
              key={reference.label}
              className={styles.materialTile}
              data-tone={reference.tone}
              style={{ "--material-index": index } as CSSProperties}
            >
              <span className={styles.materialPreview} aria-hidden="true" />
              <strong>{reference.label}</strong>
              <span>{reference.caption}</span>
            </article>
          ))}
        </div>

        <div className={styles.fontMatrixGrid} role="list">
          {typographyFonts.map((font, index) => (
            <article
              key={font.id}
              className={styles.fontMatrixCard}
              style={
                {
                  "--font-option-family": font.cssVar,
                  "--font-option-index": index,
                } as CSSProperties
              }
              role="listitem"
            >
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Kbd size="sm">{font.category}</Kbd>
              </header>
              <span className={styles.fontMatrixMaterialMark} aria-hidden="true" />
              <p className={styles.fontMatrixSample}>{font.sample}</p>
              <div className={styles.fontMatrixMeta}>
                <strong>{font.label}</strong>
                <span>{font.axis ?? "static family"}</span>
                <code>{font.cssVar}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.roleSection} aria-labelledby="section-heading-roles">
        <header className={styles.sectionHeader}>
          <span>02 / Heading hierarchy</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-heading-roles">Display, H1, H2, H3, H4, H5, H6</h2>
            <p>
              Every heading tier is now represented by its own production component file,
              with token, rhythm, intended usage, and source filename visible on the board.
            </p>
          </div>
        </header>

        <div className={styles.roleGrid} role="list">
          {HEADING_ROLE_COMPONENTS.map((item) => {
            const RoleComponent = item.component
            return (
              <div key={item.id} role="listitem">
                <RoleComponent />
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.roleSection} aria-labelledby="section-body-roles">
        <header className={styles.sectionHeader}>
          <span>03 / Body and UI roles</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-body-roles">Body, caption, label, mono, numeric, control, dense table, kinetic</h2>
            <p>
              Interface copy roles now have the same production treatment as headings,
              including controls, tabular numeric text, dense table rows, mono diagnostics,
              and bounded kinetic text for workshop systems.
            </p>
          </div>
        </header>

        <div className={styles.roleGrid} role="list">
          {BODY_ROLE_COMPONENTS.map((item) => {
            const RoleComponent = item.component
            return (
              <div key={item.id} role="listitem">
                <RoleComponent />
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.scaleSection} aria-labelledby="section-type-scale">
        <header className={styles.sectionHeader}>
          <span>04 / Size scale</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-type-scale">Many sizes, one visible scale</h2>
            <p>
              The type-size board shows every heading and UI text token from Foundations
              together so agents can choose the right size without guessing from isolated
              component examples.
            </p>
          </div>
        </header>

        <div className={styles.scaleGrid} role="list">
          {TYPE_SCALE_ROWS.map((row) => (
            <article key={row.token} className={styles.scaleCard} role="listitem">
              <span>{row.label}</span>
              <p>{row.sample}</p>
              <code>{row.token}</code>
              <strong>{row.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.rhythmSection} aria-labelledby="section-type-rhythm">
        <header className={styles.sectionHeader}>
          <span>05 / Leading and spacing</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-type-rhythm">Leading, tracking, paragraph rhythm</h2>
            <p>
              Foundation line-height, tracking, and spacing tokens are shown as applied
              typography so heading, paragraph, label, and dense UI rhythm can be compared
              in one pass.
            </p>
          </div>
        </header>

        <div className={styles.rhythmGrid}>
          <div className={styles.rhythmColumn}>
            <h3>Line height</h3>
            {LEADING_ROWS.map((row) => (
              <article key={row.token} className={styles.rhythmCard}>
                <span>{row.label}</span>
                <p>{row.sample}</p>
                <code>{row.token} / {row.value}</code>
              </article>
            ))}
          </div>

          <div className={styles.rhythmColumn}>
            <h3>Letter spacing</h3>
            {TRACKING_ROWS.map((row) => (
              <article key={row.token} className={styles.rhythmCard}>
                <span>{row.label}</span>
                <p>{row.sample}</p>
                <code>{row.token} / {row.value}</code>
              </article>
            ))}
          </div>

          <div className={styles.rhythmColumn}>
            <h3>Paragraph spacing</h3>
            {PARAGRAPH_SPACING_ROWS.map((row) => (
              <article key={row.token} className={styles.paragraphRhythmCard}>
                <span>{row.label}</span>
                <div style={{ "--paragraph-gap": `var(${row.token})` } as CSSProperties}>
                  <p>{row.sample}</p>
                  <p>Used when text blocks need {row.value} of vertical rhythm.</p>
                </div>
                <code>{row.token} / {row.value}</code>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.fileMapSection} aria-labelledby="section-production-files">
        <header className={styles.sectionHeader}>
          <span>06 / Production files</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-production-files">Individual typography files</h2>
            <p>
              Each role below has a dedicated TSX component and CSS module under the typography
              component package, making the typography system bootstrappable from individual files.
            </p>
          </div>
        </header>

        <div className={styles.fileMapGrid} role="list">
          {typographyRoles.map((role) => (
            <article key={role.id} className={styles.fileMapCard} role="listitem">
              <span>{role.label}</span>
              <code>components/typography/{role.fileName}</code>
              <code>components/typography/{role.fileName.replace(".tsx", ".module.css")}</code>
              <p>{role.usage}</p>
            </article>
          ))}
        </div>
      </section>

      {SECTIONS.map((section, index) => {
        const Tile = section.component
        const fontMeta = typographyFonts[index]
        return (
          <section
            key={section.title}
            className={styles.section}
            aria-labelledby={`section-${fontMeta.id}`}
          >
            <header className={styles.sectionHeader}>
              <span>{section.index} / {fontMeta.category}</span>
              <div className={styles.sectionHeaderBody}>
                <h2 id={`section-${fontMeta.id}`}>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            </header>
            <Tile />
          </section>
        )
      })}

      <section className={styles.motionLab} aria-labelledby="section-motion-lab">
        <header className={styles.sectionHeader}>
          <span>11 / Motion choreography</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-motion-lab">Typography moves with the rest of the kit</h2>
            <p>
              These combinations reuse the shared Reveal, StaggerList, GradientTrail, and MorphText primitives
              so type, material, and brand feedback land as one system instead of separate effects.
            </p>
          </div>
        </header>

        <div className={styles.motionLabLayout}>
          <Reveal from="below" delay={80} className={styles.motionLabFeature}>
            <div className={styles.motionLabFeatureCopy}>
              <span className={styles.motionLabKicker}>Brand lockup choreography</span>
              <h3>
                <KineticText fontId="bigshoulders" motion="outline-fill" size="hero">
                  Mufflermen motion
                </KineticText>
              </h3>
              <p>
                <MorphText
                  from="Built for signs"
                  to="Ready for interfaces"
                  trigger="interval"
                  intervalMs={2600}
                  className={styles.motionLabMorph}
                />
              </p>
            </div>

            <div className={styles.motionLabFeatureMark} aria-hidden="true">
              <Image
                className={styles.officialLogoMark}
                src={OFFICIAL_MUFFLERMEN_LOGO}
                alt=""
                width={360}
                height={112}
              />
              <GradientTrail
                d="M 2 34 C 40 6 76 62 116 34 S 192 6 232 34 S 272 62 310 22"
                viewBox="0 0 312 68"
                thickness={3}
                durationMs={3200}
                trackColor="var(--primitive-line)"
                className={styles.motionLabFeatureTrail}
              />
            </div>
          </Reveal>

          <StaggerList
            as="div"
            from="below"
            gap={90}
            stagger={90}
            className={styles.motionDemoGrid}
          >
            {MOTION_LAB_DEMOS.map((demo) => (
              <article
                key={`${demo.fontId}-${demo.motion}`}
                className={styles.motionDemoCard}
                data-tone={demo.tone}
              >
                <header className={styles.motionDemoHeader}>
                  <span className={styles.motionMaterialMark} aria-hidden="true" />
                  <span className={styles.motionDemoMeta}>
                    <strong>{demo.label}</strong>
                    <span>{demo.fontId} / {demo.motion}</span>
                  </span>
                </header>

                <div className={styles.motionDemoType}>
                  <KineticText fontId={demo.fontId} motion={demo.motion} size="lg">
                    {demo.text}
                  </KineticText>
                </div>

                <GradientTrail
                  d={demo.trailPath}
                  viewBox="0 0 308 56"
                  thickness={2.5}
                  durationMs={2800}
                  trackColor="var(--primitive-line)"
                  className={styles.motionDemoTrail}
                />

                <p>{demo.caption}</p>
                <div className={styles.motionDemoFooter}>
                  <Chip label={demo.tone} tone={demo.tone} selected />
                  <ProgressLinear
                    label={`${demo.label} sync`}
                    value={demo.progress}
                    tone={demo.tone}
                    variant="solid"
                  />
                </div>
              </article>
            ))}
          </StaggerList>
        </div>
      </section>

      <section className={styles.operationalMotion} aria-labelledby="section-operational-motion">
        <header className={styles.sectionHeader}>
          <span>12 / Operational motion set</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-operational-motion">More type animations for real primitives</h2>
            <p>
              Focused KineticText presets are mapped to material marks, status chips, keyboard tags,
              stat tiles, and progress rails so product screens can reuse them without inventing one-off motion.
            </p>
          </div>
        </header>

        <div className={styles.operationalShowcase}>
          <aside className={styles.operationalConsole} aria-label="Typography motion console">
            <div className={styles.operationalConsoleMark} aria-hidden="true">
              <Image
                className={styles.officialLogoMark}
                src={OFFICIAL_MUFFLERMEN_LOGO}
                alt=""
                width={360}
                height={112}
              />
              <GradientTrail
                d="M 2 30 C 42 4 72 54 112 30 S 190 6 230 30 S 282 54 314 18"
                viewBox="0 0 316 64"
                thickness={2.5}
                durationMs={2600}
                trackColor="var(--primitive-line)"
                className={styles.operationalConsoleTrail}
              />
            </div>
            <span className={styles.motionLabKicker}>Expanded motion library</span>
            <h3>
              <KineticText fontId="anton" motion="redline-ramp" size="xl">
                type relay
              </KineticText>
            </h3>
            <p>
              Every preset keeps the readable text in the DOM, then layers one bounded visual effect around it.
              The cards on the right show the intended primitive pairing.
            </p>
            <div className={styles.operationalConsoleStats}>
              <StatTile
                label="Focus pass"
                value={String(ECOSYSTEM_TYPE_DEMOS.length)}
                tone="amber"
                caption="ecosystem presets"
                sparkline={[1, 3, 5, ECOSYSTEM_TYPE_DEMOS.length]}
              />
              <StatTile
                label="Pairings"
                value={String(KINETIC_PAIRINGS.length)}
                tone="red"
                caption="font + motion cells"
                sparkline={[18, 28, 36, KINETIC_PAIRINGS.length]}
              />
            </div>
          </aside>

          <div className={styles.operationalGrid} role="list">
            {OPERATIONAL_TYPE_DEMOS.map((demo) => (
              <article
                key={`${demo.fontId}-${demo.motion}`}
                className={styles.operationalCard}
                data-tone={demo.tone}
                role="listitem"
              >
                <header className={styles.operationalCardHeader}>
                  <span className={styles.operationalMaterialMark} aria-hidden="true" />
                  <span className={styles.operationalMeta}>
                    <strong>{demo.label}</strong>
                    <span>{demo.code}</span>
                  </span>
                  <Kbd size="sm">{demo.motion}</Kbd>
                </header>

                <div className={styles.operationalType}>
                  <KineticText fontId={demo.fontId} motion={demo.motion} size="md">
                    {demo.text}
                  </KineticText>
                </div>

                <p>{demo.caption}</p>

                <footer className={styles.operationalFooter}>
                  <Chip label={demo.tone} tone={demo.tone} selected />
                  <ProgressLinear
                    label={`${demo.label} primitive sync`}
                    value={demo.progress}
                    tone={demo.tone}
                    variant="solid"
                  />
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ecosystemMotion} aria-labelledby="section-ecosystem-motion">
        <header className={styles.sectionHeader}>
          <span>13 / Ecosystem integration</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-ecosystem-motion">Kinetic type plugs into primitive tokens</h2>
            <p>
              New local KineticText motions are shown as reusable recipes: each one binds a font,
              a material mark, a tone chip, a stat tile, a keyboard tag, and a progress rail.
            </p>
          </div>
        </header>

        <div className={styles.ecosystemLayout}>
          <article className={styles.ecosystemCommand} aria-label="Primitive token relay">
            <div className={styles.ecosystemCommandMark} aria-hidden="true">
              <span data-tone="red" />
              <span data-tone="amber" />
              <span data-tone="red" />
            </div>
            <span className={styles.motionLabKicker}>Token relay</span>
            <h3>
              <KineticText fontId="bricolage" motion="fan-balance" size="xl">
                primitive sync
              </KineticText>
            </h3>
            <p>
              The motion recipes stay bounded inside the typography primitive, then borrow the
              surrounding system tokens for tone, glow, rails, and state feedback.
            </p>
            <div className={styles.ecosystemCommandChips}>
              <Chip label="brand.red" tone="red" selected />
              <Chip label="heat.amber" tone="amber" selected />
              <Chip label="carbon.black" tone="red" selected />
              <Chip label="chrome.edge" tone="amber" selected />
            </div>
            <div className={styles.ecosystemCommandStats}>
              <StatTile
                label="New motions"
                value={String(ECOSYSTEM_TYPE_DEMOS.length)}
                tone="amber"
                caption="local KineticText ids"
                sparkline={[2, 4, 6, ECOSYSTEM_TYPE_DEMOS.length]}
              />
              <StatTile
                label="Primitive links"
                value="6"
                tone="red"
                caption="mark/chip/stat/kbd/progress"
                sparkline={[2, 3, 5, 6]}
              />
            </div>
            <ProgressLinear
              label="Ecosystem recipe coverage"
              value={92}
              tone="amber"
              variant="segmented"
              segments={10}
              showLabel
            />
          </article>

          <div className={styles.ecosystemGrid} role="list">
            {ECOSYSTEM_TYPE_DEMOS.map((demo) => (
              <article
                key={`${demo.fontId}-${demo.motion}`}
                className={styles.ecosystemCard}
                data-tone={demo.tone}
                role="listitem"
              >
                <header className={styles.ecosystemCardHeader}>
                  <span className={styles.ecosystemMaterialMark} aria-hidden="true" />
                  <span className={styles.ecosystemCardMeta}>
                    <strong>{demo.label}</strong>
                    <span>{demo.token}</span>
                  </span>
                  <Kbd size="sm">{demo.motion}</Kbd>
                </header>

                <div className={styles.ecosystemType}>
                  <KineticText fontId={demo.fontId} motion={demo.motion} size="md">
                    {demo.text}
                  </KineticText>
                </div>

                <p>{demo.caption}</p>

                <div className={styles.ecosystemPrimitiveRow}>
                  <Chip label={demo.tone} tone={demo.tone} selected />
                  <StatTile
                    label={demo.statLabel}
                    value={demo.statValue}
                    tone={demo.tone}
                    caption="token sample"
                    sparkline={[42, 58, 76, demo.progress]}
                  />
                </div>

                <ProgressLinear
                  label={`${demo.label} ecosystem sync`}
                  value={demo.progress}
                  tone={demo.tone}
                  variant="solid"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.kineticSection} aria-labelledby="section-kinetic">
        <header className={styles.sectionHeader}>
          <span>14 / KineticText primitive</span>
          <div className={styles.sectionHeaderBody}>
            <h2 id="section-kinetic">Mix any font with any motion</h2>
            <p>
              The KineticText primitive accepts a fontId, a motion id, and a Foundation size
              role. Each cell below renders a contained, reduced-motion-safe pairing so callers
              can wire the right effect without creating overflow or unreadable text.
            </p>
          </div>
        </header>

        <div className={styles.kineticGrid} role="list">
          {KINETIC_PAIRINGS.map((pair, index) => (
            <article
              key={`${pair.fontId}-${pair.motion}-${index}`}
              className={styles.kineticCell}
              role="listitem"
            >
              <div className={styles.kineticMeta}>
                <strong>{pair.fontId}</strong>
                <span>{pair.motion}</span>
              </div>
              <div className={styles.kineticPreview}>
                <KineticText fontId={pair.fontId} motion={pair.motion} size="lg">
                  {pair.text}
                </KineticText>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
