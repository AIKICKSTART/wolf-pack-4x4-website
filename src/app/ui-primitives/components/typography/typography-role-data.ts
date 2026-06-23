export type TypographyRoleId =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-lead"
  | "body-base"
  | "body-small"
  | "caption"
  | "eyebrow"
  | "label"
  | "mono"
  | "numeric"
  | "control"
  | "dense-table"
  | "kinetic-safe"

export interface TypographyRoleSpec {
  id: TypographyRoleId
  label: string
  token: string
  fileName: string
  usage: string
  sample: string
  measurement: string
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export const typographyRoles: ReadonlyArray<TypographyRoleSpec> = [
  {
    id: "display",
    label: "Display",
    token: "--primitive-display",
    fileName: "role-display.tsx",
    usage: "Hero mastheads, signage panels, campaign leads.",
    sample: "Built For The Road",
    measurement: "clamp(3rem, 1rem + 7vw, 7.5rem) / 0.95 leading",
    element: "p",
  },
  {
    id: "h1",
    label: "Heading 1",
    token: "--primitive-h1",
    fileName: "role-h1.tsx",
    usage: "Primary page titles and full-screen workflow headers.",
    sample: "Performance Exhaust Systems",
    measurement: "clamp(2.25rem, 1.2rem + 4vw, 4rem) / 1.0 leading",
    element: "h1",
  },
  {
    id: "h2",
    label: "Heading 2",
    token: "--primitive-h2",
    fileName: "role-h2.tsx",
    usage: "Major section headers and dashboard surface titles.",
    sample: "Workshop Control",
    measurement: "clamp(1.6rem, 1.1rem + 2vw, 2.5rem) / 1.0 leading",
    element: "h2",
  },
  {
    id: "h3",
    label: "Heading 3",
    token: "--primitive-h3",
    fileName: "role-h3.tsx",
    usage: "Panel groups, card clusters, and sub-route titles.",
    sample: "Bay Status",
    measurement: "clamp(1.3rem, 1rem + 1.2vw, 1.75rem) / 1.15 leading",
    element: "h3",
  },
  {
    id: "h4",
    label: "Heading 4",
    token: "--primitive-h4",
    fileName: "role-h4.tsx",
    usage: "Compact card titles and toolbar section labels.",
    sample: "Quote Review",
    measurement: "1.25rem / 1.15 leading",
    element: "h4",
  },
  {
    id: "h5",
    label: "Heading 5",
    token: "--primitive-h5",
    fileName: "role-h5.tsx",
    usage: "Small card headers, list groups, and dense inspectors.",
    sample: "Fitment Notes",
    measurement: "1.0625rem / 1.15 leading",
    element: "h5",
  },
  {
    id: "h6",
    label: "Heading 6",
    token: "--primitive-h6",
    fileName: "role-h6.tsx",
    usage: "Micro-section headers and repeated table group titles.",
    sample: "Line Item",
    measurement: "0.9375rem / 1.15 leading",
    element: "h6",
  },
  {
    id: "body-lead",
    label: "Body lead",
    token: "--primitive-text-lg",
    fileName: "role-body-lead.tsx",
    usage: "Intro paragraphs and explanatory copy above a workflow.",
    sample: "Every vehicle gets a clear service story before it reaches the bay.",
    measurement: "1.125rem / 1.7 leading",
    element: "p",
  },
  {
    id: "body-base",
    label: "Body base",
    token: "--primitive-text-base",
    fileName: "role-body-base.tsx",
    usage: "Default product UI copy, forms, cards, and content blocks.",
    sample: "The exhaust quote is linked to parts, labour, photos, and approval state.",
    measurement: "0.9375rem / 1.5 leading",
    element: "p",
  },
  {
    id: "body-small",
    label: "Body small",
    token: "--primitive-text-sm",
    fileName: "role-body-small.tsx",
    usage: "Secondary descriptions, table helper copy, and dense cards.",
    sample: "Updated 4 minutes ago by the front counter.",
    measurement: "0.8125rem / 1.5 leading",
    element: "p",
  },
  {
    id: "caption",
    label: "Caption",
    token: "--primitive-text-xs",
    fileName: "role-caption.tsx",
    usage: "Media captions, metadata, timestamps, and tiny helper copy.",
    sample: "Photo proof - rear muffler install",
    measurement: "0.75rem / 1.5 leading",
    element: "p",
  },
  {
    id: "eyebrow",
    label: "Eyebrow",
    token: "--primitive-tracking-widest",
    fileName: "role-eyebrow.tsx",
    usage: "Small uppercase section labels and production board markers.",
    sample: "WORKSHOP STATUS",
    measurement: "0.6875rem / 0.22em tracking",
    element: "span",
  },
  {
    id: "label",
    label: "Label",
    token: "--primitive-text-xs",
    fileName: "role-label.tsx",
    usage: "Control labels, chips, badges, and filter names.",
    sample: "Approval state",
    measurement: "0.75rem / semibold / 0.08em tracking",
    element: "span",
  },
  {
    id: "mono",
    label: "Mono",
    token: "--primitive-font-mono",
    fileName: "role-mono.tsx",
    usage: "Codes, logs, routes, diagnostics, and technical readouts.",
    sample: "job.ofm.418.status = ready",
    measurement: "0.8125rem / JetBrains Mono stack",
    element: "p",
  },
  {
    id: "numeric",
    label: "Numeric",
    token: "font-variant-numeric: tabular-nums",
    fileName: "role-numeric.tsx",
    usage: "Counters, prices, percentages, odometer values, and KPIs.",
    sample: "$1,284.00 / 98.7% / 0142",
    measurement: "tabular nums / 1rem / semibold",
    element: "p",
  },
  {
    id: "control",
    label: "Control",
    token: "--primitive-text-xs",
    fileName: "role-control.tsx",
    usage: "Buttons, segmented controls, toggles, tabs, and command labels.",
    sample: "Apply workshop filter",
    measurement: "0.75rem / semibold / 0.08em tracking",
    element: "span",
  },
  {
    id: "dense-table",
    label: "Dense table",
    token: "--primitive-text-xs + --primitive-font-mono",
    fileName: "role-dense-table.tsx",
    usage: "Data grids, service rows, invoice lines, and compact telemetry tables.",
    sample: "OFM-418 | Cat-back install | $1,284.00 | Ready",
    measurement: "0.75rem / 1.15 leading / tabular nums",
    element: "p",
  },
  {
    id: "kinetic-safe",
    label: "Motion-safe kinetic text",
    token: "--primitive-text-xl + prefers-reduced-motion",
    fileName: "role-kinetic-safe.tsx",
    usage: "Bounded animated words that keep readable text available and settle under reduced motion.",
    sample: "bounded motion",
    measurement: "role token size / contained paint / reduced motion static",
    element: "p",
  },
] as const

export const typographyRoleMap: Record<TypographyRoleId, TypographyRoleSpec> = {
  display: typographyRoles[0],
  h1: typographyRoles[1],
  h2: typographyRoles[2],
  h3: typographyRoles[3],
  h4: typographyRoles[4],
  h5: typographyRoles[5],
  h6: typographyRoles[6],
  "body-lead": typographyRoles[7],
  "body-base": typographyRoles[8],
  "body-small": typographyRoles[9],
  caption: typographyRoles[10],
  eyebrow: typographyRoles[11],
  label: typographyRoles[12],
  mono: typographyRoles[13],
  numeric: typographyRoles[14],
  control: typographyRoles[15],
  "dense-table": typographyRoles[16],
  "kinetic-safe": typographyRoles[17],
}
