import {
  Anton,
  Archivo_Black,
  Barlow_Condensed,
  Bebas_Neue,
  Big_Shoulders_Inline,
  Bricolage_Grotesque,
  Chakra_Petch,
  Cormorant_Garamond,
  DM_Serif_Display,
  Fraunces,
  IBM_Plex_Mono,
  Inter_Tight,
  Kode_Mono,
  Major_Mono_Display,
  Saira_Condensed,
  Source_Code_Pro,
  Space_Grotesk,
  Teko,
} from "next/font/google"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-ts-anton",
  display: "swap",
})

const bigShoulders = Big_Shoulders_Inline({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--ff-ts-bigshoulders",
  display: "swap",
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-ts-bebas",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-ts-space-grotesk",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--ff-ts-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
})

const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-ts-major-mono",
  display: "swap",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ff-ts-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--ff-ts-ibm-mono",
  display: "swap",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--ff-ts-inter-tight",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--ff-ts-cormorant",
  display: "swap",
})

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-ts-archivo-black",
  display: "swap",
})

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--ff-ts-barlow-condensed",
  display: "swap",
})

const teko = Teko({
  subsets: ["latin"],
  variable: "--ff-ts-teko",
  display: "swap",
})

const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--ff-ts-chakra-petch",
  display: "swap",
})

const sairaCondensed = Saira_Condensed({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--ff-ts-saira-condensed",
  display: "swap",
})

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--ff-ts-dm-serif-display",
  display: "swap",
})

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--ff-ts-kode-mono",
  display: "swap",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--ff-ts-source-code-pro",
  display: "swap",
})

export const typographyFontClassNames = [
  anton.variable,
  bigShoulders.variable,
  bebas.variable,
  spaceGrotesk.variable,
  fraunces.variable,
  majorMono.variable,
  bricolage.variable,
  ibmPlexMono.variable,
  interTight.variable,
  cormorant.variable,
  archivoBlack.variable,
  barlowCondensed.variable,
  teko.variable,
  chakraPetch.variable,
  sairaCondensed.variable,
  dmSerifDisplay.variable,
  kodeMono.variable,
  sourceCodePro.variable,
].join(" ")

export type TypographyFontId =
  | "anton"
  | "bigshoulders"
  | "bebas"
  | "space-grotesk"
  | "fraunces"
  | "major-mono"
  | "bricolage"
  | "ibm-mono"
  | "inter-tight"
  | "cormorant"
  | "archivo-black"
  | "barlow-condensed"
  | "teko"
  | "chakra-petch"
  | "saira-condensed"
  | "dm-serif-display"
  | "kode-mono"
  | "source-code-pro"

export const kineticMotionIds = [
  "letter-rise",
  "outline-fill",
  "marquee",
  "type-on",
  "weight-morph",
  "scramble",
  "axis-swing",
  "scanline-wipe",
  "color-sweep",
  "italic-shift",
  "heat-shimmer",
  "stamp-pop",
  "lane-split",
  "spark-trail",
  "torque-tilt",
  "chrome-glint",
  "signal-bounce",
  "road-blur",
  "arc-flash",
  "boost-squeeze",
  "bay-door-reveal",
  "rubber-burn",
  "gauge-sweep",
  "weld-flicker",
  "dyno-pull",
  "piston-stroke",
  "neon-idle",
  "valve-tick",
  "exhaust-wave",
  "oil-slick",
  "grid-lock",
  "relay-pulse",
  "circuit-trace",
  "redline-ramp",
  "clutch-drop",
  "turbo-spool",
  "brake-pulse",
  "paint-mask",
  "route-draw",
  "receipt-stamp",
  "spark-plug-fire",
  "hoist-lift",
  "tacho-needle",
  "visor-scan",
  "checker-wave",
  "blueprint-pan",
  "marker-swipe",
  "meter-step",
  "impact-stack",
  "signal-cut",
  "status-latch",
  "cam-sync",
  "bead-run",
  "fan-balance",
  "battery-charge",
  "pressure-wave",
  "shift-gate",
  "supplier-glow",
  "data-ribbon",
] as const

export type KineticMotionId = (typeof kineticMotionIds)[number]

export type TypographyCategory =
  | "display"
  | "display-inline"
  | "sans"
  | "serif"
  | "mono"
  | "mono-display"
  | "grotesque"
  | "condensed"
  | "technical"

export interface TypographyFontMeta {
  id: TypographyFontId
  label: string
  category: TypographyCategory
  cssVar: string
  axis?: string
  sample: string
  motion: KineticMotionId
}

export const typographyFonts: ReadonlyArray<TypographyFontMeta> = [
  {
    id: "anton",
    label: "Anton",
    category: "display",
    cssVar: "var(--ff-ts-anton)",
    sample: "Performance Built Properly",
    motion: "letter-rise",
  },
  {
    id: "bigshoulders",
    label: "Big Shoulders Inline",
    category: "display-inline",
    cssVar: "var(--ff-ts-bigshoulders)",
    sample: "Built On The Coast Road",
    motion: "outline-fill",
  },
  {
    id: "bebas",
    label: "Bebas Neue",
    category: "display",
    cssVar: "var(--ff-ts-bebas)",
    sample: "Mufflermen Workshop Floor",
    motion: "marquee",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    category: "sans",
    cssVar: "var(--ff-ts-space-grotesk)",
    sample: "Diagnostic ready, idle stable",
    motion: "type-on",
  },
  {
    id: "fraunces",
    label: "Fraunces",
    category: "serif",
    cssVar: "var(--ff-ts-fraunces)",
    axis: "wght · opsz · italic",
    sample: "Craft, restored",
    motion: "weight-morph",
  },
  {
    id: "major-mono",
    label: "Major Mono Display",
    category: "mono-display",
    cssVar: "var(--ff-ts-major-mono)",
    sample: "vin: 2hg-cg-1657",
    motion: "scramble",
  },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    category: "grotesque",
    cssVar: "var(--ff-ts-bricolage)",
    axis: "wdth · opsz",
    sample: "Coastal precision engineering",
    motion: "axis-swing",
  },
  {
    id: "ibm-mono",
    label: "IBM Plex Mono",
    category: "mono",
    cssVar: "var(--ff-ts-ibm-mono)",
    sample: "uptime: 99.94% / 0xMUFF",
    motion: "scanline-wipe",
  },
  {
    id: "inter-tight",
    label: "Inter Tight",
    category: "sans",
    cssVar: "var(--ff-ts-inter-tight)",
    sample: "Tuned For The Road Ahead",
    motion: "color-sweep",
  },
  {
    id: "cormorant",
    label: "Cormorant Garamond",
    category: "serif",
    cssVar: "var(--ff-ts-cormorant)",
    sample: "Heritage, in motion",
    motion: "italic-shift",
  },
  {
    id: "archivo-black",
    label: "Archivo Black",
    category: "display",
    cssVar: "var(--ff-ts-archivo-black)",
    sample: "Heavy Duty Headers",
    motion: "impact-stack",
  },
  {
    id: "barlow-condensed",
    label: "Barlow Condensed",
    category: "condensed",
    cssVar: "var(--ff-ts-barlow-condensed)",
    axis: "300 -> 800",
    sample: "Service bay schedule",
    motion: "marker-swipe",
  },
  {
    id: "teko",
    label: "Teko",
    category: "condensed",
    cssVar: "var(--ff-ts-teko)",
    axis: "variable weight",
    sample: "Dyno Pull Ready",
    motion: "redline-ramp",
  },
  {
    id: "chakra-petch",
    label: "Chakra Petch",
    category: "technical",
    cssVar: "var(--ff-ts-chakra-petch)",
    axis: "300 -> 700",
    sample: "Sensor bus aligned",
    motion: "circuit-trace",
  },
  {
    id: "saira-condensed",
    label: "Saira Condensed",
    category: "condensed",
    cssVar: "var(--ff-ts-saira-condensed)",
    axis: "300 -> 900",
    sample: "Workshop control lane",
    motion: "shift-gate",
  },
  {
    id: "dm-serif-display",
    label: "DM Serif Display",
    category: "serif",
    cssVar: "var(--ff-ts-dm-serif-display)",
    axis: "roman + italic",
    sample: "Craft Notes",
    motion: "chrome-glint",
  },
  {
    id: "kode-mono",
    label: "Kode Mono",
    category: "mono",
    cssVar: "var(--ff-ts-kode-mono)",
    axis: "variable weight",
    sample: "job_id=OFM-418",
    motion: "data-ribbon",
  },
  {
    id: "source-code-pro",
    label: "Source Code Pro",
    category: "mono",
    cssVar: "var(--ff-ts-source-code-pro)",
    axis: "variable weight + italic",
    sample: "torque_map.status = pass",
    motion: "scanline-wipe",
  },
] as const
