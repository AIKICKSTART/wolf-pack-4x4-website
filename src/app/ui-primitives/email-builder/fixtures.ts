import type { HeatCell } from "../components/charts/heatmap-calendar"
import type {
  BlockPaletteSection,
  ClickHeatSpot,
  EmailBlock,
  PersonalizationToken,
  SavedTemplate,
  SpamWarning,
  TestEmailRecipient,
  ThemePresetSpec,
} from "../components/email-builder"

export const BLOCK_PALETTE_SECTIONS: ReadonlyArray<BlockPaletteSection> = [
  {
    id: "structure",
    title: "Structure",
    items: [
      { kind: "heading", name: "Heading", hint: "H1 — H3 row" },
      { kind: "divider", name: "Divider", hint: "Rule line" },
      { kind: "spacer", name: "Spacer", hint: "Vertical air" },
      { kind: "columns-2", name: "Two columns", hint: "Side by side" },
      { kind: "columns-3", name: "Three columns", hint: "Feature triplet" },
    ],
  },
  {
    id: "media",
    title: "Media + CTA",
    items: [
      { kind: "image", name: "Image", hint: "Hero or inline" },
      { kind: "button", name: "Button", hint: "Primary CTA" },
      { kind: "social-row", name: "Social row", hint: "Footer icons" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    items: [
      { kind: "footer", name: "Footer block", hint: "Compliance" },
      { kind: "html", name: "Custom HTML", hint: "Hand-rolled" },
      { kind: "personalization", name: "Token", hint: "Merge field" },
    ],
  },
]

export const WINTER_NEWSLETTER_BLOCKS: ReadonlyArray<EmailBlock> = [
  {
    id: "blk-hero",
    kind: "image",
    label: "Hero image",
    preview: "Winter workshop — bay door open at first light",
  },
  {
    id: "blk-heading",
    kind: "heading",
    label: "Heading",
    preview: "Winter at the workshop",
  },
  {
    id: "blk-intro",
    kind: "personalization",
    label: "Personalised greeting",
    preview: "Hi {{first_name}} — here's what's new in Oak Flats this month.",
  },
  {
    id: "blk-feature",
    kind: "columns-2",
    label: "Parts feature row",
    preview: "Magnaflow Pro · Free fitting · 12-month warranty",
  },
  {
    id: "blk-quote",
    kind: "personalization",
    label: "Quote confidence block",
    preview: "Your last quote — {{quote.total}} — is still on the bench.",
  },
  {
    id: "blk-cta",
    kind: "button",
    label: "Book a bay",
    preview: "Book your service",
  },
  {
    id: "blk-divider",
    kind: "divider",
    label: "Divider",
    preview: "—",
  },
  {
    id: "blk-footer",
    kind: "footer",
    label: "Footer block",
    preview: "Unit 4 / 12 Cygnet Place · Oak Flats NSW · ABN 12 345 678 901",
  },
]

export const PERSONALIZATION_TOKENS: ReadonlyArray<PersonalizationToken> = [
  {
    token: "{{first_name}}",
    label: "Customer first name",
    sample: "Daniel",
    group: "Customer",
  },
  {
    token: "{{last_name}}",
    label: "Customer last name",
    sample: "Fleuren",
    group: "Customer",
  },
  {
    token: "{{vehicle.rego}}",
    label: "Vehicle registration",
    sample: "BFM-712",
    group: "Vehicle",
  },
  {
    token: "{{vehicle.make_model}}",
    label: "Vehicle make and model",
    sample: "Toyota Hilux SR5",
    group: "Vehicle",
  },
  {
    token: "{{quote.total}}",
    label: "Latest quote total",
    sample: "$1,180.00 AUD",
    group: "Quote",
  },
  {
    token: "{{quote.ref}}",
    label: "Quote reference",
    sample: "Q-2026-0413",
    group: "Quote",
  },
  {
    token: "{{workshop.bay}}",
    label: "Workshop bay assignment",
    sample: "Bay 3 — Heritage",
    group: "Workshop",
  },
  {
    token: "{{workshop.eta}}",
    label: "Workshop pickup ETA",
    sample: "Friday 3:30 PM",
    group: "Workshop",
  },
]

export const THEME_PRESETS: ReadonlyArray<ThemePresetSpec> = [
  {
    id: "workshop-dark",
    name: "Workshop dark",
    description: "Garage night · amber CTA",
    paper: "#11141a",
    ink: "#f1f2f5",
    accent: "#ffc14f",
  },
  {
    id: "heritage-cream",
    name: "Heritage cream",
    description: "Bone paper · ochre",
    paper: "#f4eedd",
    ink: "#1f1a12",
    accent: "#b6502b",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Deep crimson · grain",
    paper: "#0a0a0e",
    ink: "#f6f6f8",
    accent: "#e62028",
  },
  {
    id: "newsletter-classic",
    name: "Newsletter classic",
    description: "Newsprint · indigo",
    paper: "#fafafa",
    ink: "#1c1c20",
    accent: "#2058ff",
  },
  {
    id: "receipt-style",
    name: "Receipt style",
    description: "Mono · register tape",
    paper: "#ffffff",
    ink: "#0a0a0a",
    accent: "#000000",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Stone · single accent",
    paper: "#f3f1ed",
    ink: "#1f2230",
    accent: "#37d67a",
  },
]

export const SAVED_TEMPLATES: ReadonlyArray<SavedTemplate> = [
  {
    id: "tmpl-winter-newsletter",
    name: "Winter workshop newsletter",
    editedAt: "2 May 2026, 09:14",
    sentCount: 412,
    thumb: "WN",
  },
  {
    id: "tmpl-quote-followup",
    name: "Quote follow-up · 48hr",
    editedAt: "30 Apr 2026, 16:02",
    sentCount: 1289,
    thumb: "QF",
  },
  {
    id: "tmpl-service-due",
    name: "Service due reminder",
    editedAt: "28 Apr 2026, 11:48",
    sentCount: 884,
    thumb: "SD",
  },
  {
    id: "tmpl-warranty-renewal",
    name: "Warranty renewal nudge",
    editedAt: "22 Apr 2026, 14:20",
    sentCount: 326,
    thumb: "WR",
  },
  {
    id: "tmpl-loyalty-offer",
    name: "Loyalty $20 voucher",
    editedAt: "16 Apr 2026, 08:01",
    sentCount: 612,
    thumb: "LO",
  },
  {
    id: "tmpl-launch-magnaflow",
    name: "Magnaflow Pro launch",
    editedAt: "11 Apr 2026, 17:34",
    sentCount: 224,
    thumb: "MP",
  },
]

export const SPAM_WARNINGS: ReadonlyArray<SpamWarning> = [
  {
    id: "spam-images",
    message: "Image-to-text ratio above 60% — add more written content.",
    severity: "medium",
  },
  {
    id: "spam-alttext",
    message: "Hero image is missing alt text.",
    severity: "medium",
  },
  {
    id: "spam-unsub",
    message: "Unsubscribe link present.",
    severity: "low",
  },
  {
    id: "spam-allcaps",
    message: "Subject avoids ALL CAPS.",
    severity: "low",
  },
  {
    id: "spam-exclaim",
    message: "Two exclamation marks detected in preheader — consider one.",
    severity: "medium",
  },
]

export const CLICK_HEAT_SPOTS: ReadonlyArray<ClickHeatSpot> = [
  {
    id: "spot-hero",
    label: "Hero image link",
    ctr: 11,
    position: { top: 24, left: 50 },
  },
  {
    id: "spot-feature-left",
    label: "Magnaflow Pro feature",
    ctr: 6,
    position: { top: 52, left: 28 },
  },
  {
    id: "spot-feature-right",
    label: "Free fitting feature",
    ctr: 4,
    position: { top: 52, left: 72 },
  },
  {
    id: "spot-cta",
    label: "Book your service CTA",
    ctr: 22,
    position: { top: 74, left: 50 },
  },
  {
    id: "spot-unsubscribe",
    label: "Unsubscribe",
    ctr: 1,
    position: { top: 94, left: 50 },
  },
]

function buildHeatCells(): ReadonlyArray<HeatCell> {
  const cells: HeatCell[] = []
  const start = new Date(2026, 1, 23)
  for (let week = 0; week < 12; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start)
      date.setDate(start.getDate() + week * 7 + day)
      const iso = date.toISOString().slice(0, 10)
      // Bias higher values mid-week and around send days.
      const dayBoost = day === 1 || day === 3 ? 8 : 1
      const sendDayBoost = week === 6 || week === 10 ? 28 : 0
      const noise = ((week * 7 + day) * 13) % 9
      cells.push({
        date: iso,
        value: dayBoost + sendDayBoost + noise,
      })
    }
  }
  return cells
}

export const DAILY_CLICK_CELLS: ReadonlyArray<HeatCell> = buildHeatCells()

export const TEST_RECIPIENTS: ReadonlyArray<TestEmailRecipient> = [
  { email: "marketing@mufflermen.com.au", label: "Marketing inbox" },
  { email: "daniel@verridian.ai", label: "Daniel" },
  { email: "qa@mufflermen.com.au", label: "QA" },
]

export const SELECTED_BLOCK = WINTER_NEWSLETTER_BLOCKS[5]

export const SAMPLE_SUBJECT =
  "Winter workshop newsletter — what we shipped this month"
export const SAMPLE_PREHEADER =
  "A peek at the winter parts shipment and a $20 service voucher inside."
export const SAMPLE_FROM = "Oak Flats Mufflermen <hello@mufflermen.com.au>"

export const SAMPLE_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Winter workshop newsletter</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f4f2ee; color: #1f2230; }
      .container { max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; }
      h1 { font-family: Anton, "Arial Narrow", Impact, sans-serif; font-size: 32px; margin: 0 0 12px; }
      .cta { display: inline-block; padding: 12px 22px; background: #e62028; color: #fff; text-decoration: none; border-radius: 6px; }
      .footer { font-size: 12px; color: #6b7080; text-align: center; padding-top: 24px; }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="/winter-hero.webp" alt="Winter workshop at sunrise" width="552" />
      <h1>Winter at the workshop</h1>
      <p>Hi {{first_name}} — here's what's new in Oak Flats this month.</p>
      <p>Your last quote, {{quote.total}}, is still on the bench in {{workshop.bay}}.</p>
      <p><a class="cta" href="https://mufflermen.com.au/book">Book your service</a></p>
      <p class="footer">Unit 4 / 12 Cygnet Place, Oak Flats NSW 2529 · ABN 12 345 678 901</p>
    </div>
  </body>
</html>
`

export const SAMPLE_INLINED = `<table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="background:#ffffff;font-family:Arial,sans-serif;color:#1f2230">
  <tr><td style="padding:24px">
    <img src="https://mufflermen.com.au/media/winter-hero.webp" alt="Winter workshop at sunrise" width="552" style="display:block;border:0;outline:none;text-decoration:none" />
    <h1 style="font-family:Anton,Impact,sans-serif;font-size:32px;margin:0 0 12px">Winter at the workshop</h1>
    <p style="font-size:16px;line-height:1.5">Hi {{first_name}} — here's what's new in Oak Flats this month.</p>
    <p style="font-size:16px;line-height:1.5">Your last quote, {{quote.total}}, is still on the bench in {{workshop.bay}}.</p>
    <a href="https://mufflermen.com.au/book" style="display:inline-block;padding:12px 22px;background:#e62028;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:700">Book your service</a>
    <p style="font-size:12px;color:#6b7080;text-align:center;padding-top:24px">Unit 4 / 12 Cygnet Place, Oak Flats NSW 2529 · ABN 12 345 678 901</p>
  </td></tr>
</table>
`

export const SAMPLE_PLAIN = `WINTER AT THE WORKSHOP

Hi {{first_name}} — here's what's new in Oak Flats this month.

Your last quote, {{quote.total}}, is still on the bench in {{workshop.bay}}.

Book your service: https://mufflermen.com.au/book

—
Oak Flats Mufflermen
Unit 4 / 12 Cygnet Place, Oak Flats NSW 2529
ABN 12 345 678 901
Unsubscribe: https://mufflermen.com.au/unsubscribe
`
