/**
 * Block-editor showcase fixtures — Oak Flats Mufflermen editorial
 * vocabulary: workshop time-lapse, dyno data tables, customer voices,
 * pre-service checklists, brand polls, exhaust callouts. Used by the
 * 14 sub-routes and the full-document composition.
 */

import type {
  AccordionPayload,
  BlockData,
  BlockError,
  CalloutPayload,
  ChecklistPayload,
  CodePayload,
  CodeSandboxPayload,
  CtaPayload,
  DividerPayload,
  EmbedPayload,
  GalleryPayload,
  PollPayload,
  QuotePayload,
  TablePayload,
  TimelinePayload,
  VideoPayload,
} from "../components/block-editor"

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const NOW = "2026-05-29T08:30:00+10:00"

function envelope<T>(id: string, payload: T): BlockData<T> {
  return {
    id,
    payload,
    version: 1,
    updatedAt: NOW,
  }
}

/* ------------------------------------------------------------------ *
 * Gallery — workshop time-lapse + before/after exhaust + dyno bay
 * ------------------------------------------------------------------ */

export const GALLERY_BLOCK = envelope<GalleryPayload>("blk-gallery", {
  layout: "grid",
  caption: "Bay 3 hoist, time-lapse from sundown to lock-up. Twin-pipe Falcon, full Manta swap.",
  items: [
    {
      id: "g-1",
      src: "/media/generated/falcon-dyno-pull.webp",
      alt: "Falcon on the dyno at 4800rpm, blue flame at the tip",
      caption: "Dyno pull · 4800 rpm",
      ratio: 16 / 10,
    },
    {
      id: "g-2",
      src: "/media/generated/falcon-twin-pipes-before.webp",
      alt: "Original BF Falcon centre muffler with corrosion blooms",
      caption: "Before · corroded centre",
      ratio: 16 / 11,
    },
    {
      id: "g-3",
      src: "/media/generated/falcon-twin-pipes-after.webp",
      alt: "New 2.5-inch aluminised Manta twin system fitted",
      caption: "After · Manta 2.5\" aluminised",
      ratio: 16 / 12,
    },
    {
      id: "g-4",
      src: "/media/generated/workshop-bay-3.webp",
      alt: "Bay 3 wide shot with the hoist at full height",
      caption: "Bay 3 · 21:14",
      ratio: 16 / 9,
    },
    {
      id: "g-5",
      src: "/media/generated/welder-spark-trail.webp",
      alt: "Mick mid-weld, sparks under the centre muffler",
      caption: "Centre weld · Mick D.",
      ratio: 16 / 10,
    },
    {
      id: "g-6",
      src: "/media/generated/exhaust-tip-cooldown.webp",
      alt: "Final tip cooldown after the road test",
      caption: "Tip cooldown · post road test",
      ratio: 16 / 10,
    },
  ],
})

/* ------------------------------------------------------------------ *
 * Code — fitment-check bash + parts-API JSON
 * ------------------------------------------------------------------ */

export const CODE_BLOCK = envelope<CodePayload>("blk-code", {
  language: "bash",
  theme: "graphite",
  showLineNumbers: true,
  filename: "fitment-check.sh",
  source: [
    "#!/usr/bin/env bash",
    "# Fitment lookup against the Mufflermen parts API",
    "set -euo pipefail",
    "",
    'REGO="${1:-DRL07X}"',
    'VEHICLE=$(curl -fsS "https://parts.mufflermen.au/lookup?rego=$REGO")',
    "echo \"$VEHICLE\" | jq '.exhaust.options[] | { brand, sku, fits }'",
    "",
    "# Hot tip: pair this with the dyno script before quoting",
  ].join("\n"),
})

/* ------------------------------------------------------------------ *
 * Table — dyno results across stock vs. Manta 2.5"
 * ------------------------------------------------------------------ */

export const TABLE_BLOCK = envelope<TablePayload>("blk-table", {
  caption: "BF Falcon XR6 dyno comparison — stock vs Manta 2.5\" aluminised twin",
  columns: [
    { id: "rpm", label: "RPM", align: "right", format: "number", width: 96, sortable: true },
    { id: "stock-kw", label: "Stock kW", align: "right", format: "number", width: 120, sortable: true },
    { id: "manta-kw", label: "Manta kW", align: "right", format: "number", width: 120, sortable: true },
    { id: "delta", label: "Δ kW", align: "right", format: "number", width: 100, sortable: true },
    { id: "note", label: "Note", align: "left", format: "text", width: 220, sortable: false },
  ],
  rows: [
    { id: "r-1", cells: { rpm: "1800", "stock-kw": "61", "manta-kw": "63", delta: "2", note: "Idle smoothing" } },
    { id: "r-2", cells: { rpm: "2400", "stock-kw": "98", "manta-kw": "108", delta: "10", note: "Drone band clears" } },
    { id: "r-3", cells: { rpm: "3200", "stock-kw": "142", "manta-kw": "158", delta: "16", note: "Cat-back gains" } },
    { id: "r-4", cells: { rpm: "4000", "stock-kw": "184", "manta-kw": "204", delta: "20", note: "Peak shift +200rpm" } },
    { id: "r-5", cells: { rpm: "4800", "stock-kw": "192", "manta-kw": "218", delta: "26", note: "Headers free up" } },
    { id: "r-6", cells: { rpm: "5400", "stock-kw": "176", "manta-kw": "205", delta: "29", note: "Sustained pull" } },
  ],
  sort: { columnId: "rpm", direction: "asc" },
})

/* ------------------------------------------------------------------ *
 * Embed — YouTube workshop walkthrough
 * ------------------------------------------------------------------ */

export const EMBED_BLOCK = envelope<EmbedPayload>("blk-embed", {
  provider: "youtube",
  url: "https://youtu.be/oakflats-twin-pipe-walkaround",
  title: "Bay 3 walk-around — BF Falcon twin pipes diagnostic",
  aspect: "16:9",
  authorHandle: "@oakflatsmufflermen",
})

/* ------------------------------------------------------------------ *
 * Quote — Mick Davis customer testimonial
 * ------------------------------------------------------------------ */

export const QUOTE_BLOCK = envelope<QuotePayload>("blk-quote", {
  variant: "image",
  text: "Booked the 4WD for a centre-muffler swap and a leaky cat. Picked it up Friday lunch and it breathes like a dream — Bay 3 found a snapped hanger nobody else had spotted.",
  author: "Mick Davis",
  citation: "Albion Park · 2026 LandCruiser 200",
  imageAlt: "Mick Davis portrait — LandCruiser owner",
})

/* ------------------------------------------------------------------ *
 * Poll — next exhaust brand to stock
 * ------------------------------------------------------------------ */

export const POLL_BLOCK = envelope<PollPayload>("blk-poll", {
  question: "Which exhaust brand should we stock next?",
  totalVotes: 1284,
  multiSelect: false,
  closesAt: "2026-06-10",
  choices: [
    { id: "p-manta", label: "Manta", votes: 412 },
    { id: "p-pacemaker", label: "Pacemaker", votes: 348 },
    { id: "p-xforce", label: "XForce", votes: 296 },
    { id: "p-genie", label: "Genie", votes: 228 },
  ],
})

/* ------------------------------------------------------------------ *
 * Code sandbox — pricing-widget mock
 * ------------------------------------------------------------------ */

export const SANDBOX_BLOCK = envelope<CodeSandboxPayload>("blk-sandbox", {
  activePane: "html",
  previewLabel: "Booking widget · live",
  html: `<section class="quote">
  <h2>Quick quote</h2>
  <form>
    <label>Rego <input name="rego" /></label>
    <label>Bay <select><option>3</option></select></label>
    <button>Get quote</button>
  </form>
</section>`,
  css: `.quote {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: color-mix(in oklab, var(--primitive-amber) 12%, var(--primitive-canvas));
  color: var(--primitive-text-strong);
  font-family: var(--primitive-font-body);
}
.quote button {
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--primitive-red);
  color: var(--primitive-text-on-accent);
}`,
  javascript: `const form = document.querySelector('.quote form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const rego = new FormData(form).get('rego');
  alert(\`Quote queued for \${rego}\`);
});`,
})

/* ------------------------------------------------------------------ *
 * Timeline — workshop milestones
 * ------------------------------------------------------------------ */

export const TIMELINE_BLOCK = envelope<TimelinePayload>("blk-timeline", {
  title: "Oak Flats Mufflermen — half a century on the floor",
  events: [
    {
      id: "t-1",
      date: "1972",
      label: "Founded by Bill Fleuren",
      description: "Two bays on the South Coast Highway, a hand-built bender, and a phone line that rang non-stop.",
      granularity: "year",
      tone: "amber",
    },
    {
      id: "t-2",
      date: "1989",
      label: "Mandrel bender installed",
      description: "First mandrel in the Illawarra — full-radius bends with zero shell collapse.",
      granularity: "year",
      tone: "teal",
    },
    {
      id: "t-3",
      date: "2002",
      label: "Daniel Fleuren takes the keys",
      description: "Second-generation handover. Daniel keeps Bill's notebook on the bench to this day.",
      granularity: "year",
      tone: "neutral",
    },
    {
      id: "t-4",
      date: "2018",
      label: "In-house dyno commissioned",
      description: "DynoJet 224x installed in Bay 4. Every cat-back swap leaves with a printed power graph.",
      granularity: "year",
      tone: "violet",
    },
    {
      id: "t-5",
      date: "2024",
      label: "EV high-voltage certification",
      description: "Bay 5 fitted for HV-isolation work. First fleet contract: Endeavour Energy Hilux EVs.",
      granularity: "year",
      tone: "green",
    },
    {
      id: "t-6",
      date: "Apr 2026",
      label: "Mufflerpulse beta",
      description: "Customer SMS pipeline goes live — quote acceptance up 38% in the first fortnight.",
      granularity: "month",
      tone: "red",
    },
  ],
})

/* ------------------------------------------------------------------ *
 * Divider — five variants reused on the divider sub-route
 * ------------------------------------------------------------------ */

export const DIVIDER_BLOCK = envelope<DividerPayload>("blk-divider", {
  variant: "icon",
  label: "Bay change",
})

/* ------------------------------------------------------------------ *
 * Video — dyno walkthrough with chapters
 * ------------------------------------------------------------------ */

export const VIDEO_BLOCK = envelope<VideoPayload>("blk-video", {
  src: "/media/generated/replicate/videos/workshop-hero-landscape.mp4",
  posterUrl: "/media/generated/replicate/videos/workshop-hero-landscape.webp",
  title: "Bay 3 dyno walk — BF Falcon twin-pipe gains",
  durationSeconds: 432,
  captionsEnabled: true,
  chapters: [
    { id: "ch-1", label: "Cold idle listen-down", start: 0 },
    { id: "ch-2", label: "Stethoscope walk-around", start: 78 },
    { id: "ch-3", label: "Hoist + replacement", start: 184 },
    { id: "ch-4", label: "Dyno pull · stock vs Manta", start: 296 },
    { id: "ch-5", label: "Road test impressions", start: 384 },
  ],
})

/* ------------------------------------------------------------------ *
 * Callout — DPF cleaning specialist note
 * ------------------------------------------------------------------ */

export const CALLOUT_BLOCK = envelope<CalloutPayload>("blk-callout", {
  kind: "warning",
  title: "DPF cleaning needs specialised tools",
  body: "Diesel particulate filter regen and bake-off requires our Bay 5 oven and a proprietary ash scale. Book the appointment first — we won't tackle it cold off the street.",
  dismissible: true,
})

/* ------------------------------------------------------------------ *
 * Checklist — pre-service walk-around
 * ------------------------------------------------------------------ */

export const CHECKLIST_BLOCK = envelope<ChecklistPayload>("blk-checklist", {
  title: "Pre-service walk-around",
  items: [
    { id: "ck-1", label: "Engine oil + filter level checked", done: true },
    { id: "ck-2", label: "Coolant overflow at high-mark", done: true },
    { id: "ck-3", label: "Tyre pressures (32 psi cold)", done: true },
    { id: "ck-4", label: "Exhaust hangers + clamps inspected", done: false },
    { id: "ck-5", label: "Brake pad thickness > 4mm", done: false },
    { id: "ck-6", label: "Battery cranking voltage > 12.4V", done: false },
    { id: "ck-7", label: "Customer signed handover sheet", done: false },
  ],
})

/* ------------------------------------------------------------------ *
 * Accordion — frequently-asked workshop questions
 * ------------------------------------------------------------------ */

export const ACCORDION_BLOCK = envelope<AccordionPayload>("blk-accordion", {
  title: "Workshop FAQ — exhaust + tuning",
  entries: [
    {
      id: "a-1",
      question: "Do I need a roadworthy after a cat-back swap?",
      answer: "Not in NSW for like-for-like cat-back. We do supply a workshop fitment cert for insurance and rego transfers.",
      open: true,
    },
    {
      id: "a-2",
      question: "How loud is a Manta 2.5\" Falcon system?",
      answer: "About 92 dB at the kerb at 3000 rpm — within the EPA stationary-noise limit. Drone band sits below 75 dB inside the cabin.",
      open: false,
    },
    {
      id: "a-3",
      question: "Can you fit aftermarket on an EV?",
      answer: "EVs don't have exhausts — but Bay 5 handles HV isolation, charging-port relocation, and undercarriage skid plates.",
      open: false,
    },
    {
      id: "a-4",
      question: "Lead time on a custom dual stainless?",
      answer: "Around 7–10 business days once specs are locked. We bend in-house, so the bottleneck is the tip-finishing run.",
      open: false,
    },
  ],
})

/* ------------------------------------------------------------------ *
 * CTA — book a dyno session
 * ------------------------------------------------------------------ */

export const CTA_BLOCK = envelope<CtaPayload>("blk-cta", {
  heading: "Want it on the dyno before the weekend?",
  body: "Lock in Bay 4 for a stock-vs-system pull. Includes printed graph, baseline tune, and a coffee from across the highway.",
  buttonLabel: "Book Bay 4",
  buttonHref: "/booking",
  tone: "amber",
})

/* ------------------------------------------------------------------ *
 * Error sample — used by every sub-route's error-state demo
 * ------------------------------------------------------------------ */

export const SAMPLE_ERROR: BlockError = {
  code: "BLOCK_MEDIA_404",
  message: "We couldn't reach the workshop media bucket. Showing the cached envelope.",
  hint: "Retry · then escalate to ops if the DAM stays offline.",
}
