/**
 * Shared mock data for the content-studio sub-routes + full newsroom.
 *
 * Authentic Oak Flats Mufflermen editorial vocabulary — bay-floor
 * stories, suburb spotlights, parts deep-dives, customer rebuilds.
 * Nothing wired to real storage; purely visual reference.
 */

import type {
  Author,
  BlockSnippet,
  CoAuthorSlot,
  CoverSuggestion,
  DraftComment,
  EditorBlock,
  Frontmatter,
  OutlineEntry,
  PostCategory,
  ReadabilityScore,
  RepurposeOutput,
  RevisionDiffLine,
  RevisionMeta,
  SeoMetaPreview,
  SeoSignal,
  TaxonomyNode,
} from "../components/content-studio"

export const AUTHORS: Record<string, Author> = {
  daniel: {
    id: "a-daniel",
    name: "Daniel Fleuren",
    role: "founder",
    qualifier: "Founder · Oak Flats",
    visibility: "byline",
  },
  mia: {
    id: "a-mia",
    name: "Mia Pellegrino",
    role: "editor",
    qualifier: "Editorial lead",
    visibility: "byline",
  },
  ben: {
    id: "a-ben",
    name: "Ben Sokolic",
    role: "parts-lead",
    qualifier: "Parts counter",
    visibility: "co-author",
  },
  jordan: {
    id: "a-jordan",
    name: "Jordan McKee",
    role: "tech-lead",
    qualifier: "Bay foreman",
    visibility: "co-author",
  },
  hermes: {
    id: "a-hermes",
    name: "Hermes Bot",
    role: "ai-bot",
    qualifier: "AI drafts",
    isBot: true,
    visibility: "ghost",
  },
}

/* ------------------------------------------------------------------ *
 * Article — "Why your Falcon's twin pipes are growling"
 * ------------------------------------------------------------------ */

export const HERO_BLOCKS: ReadonlyArray<EditorBlock> = [
  {
    id: "b-heading-1",
    kind: "heading",
    level: 1,
    text: "Why your Falcon's twin pipes are growling",
  },
  {
    id: "b-paragraph-1",
    kind: "paragraph",
    text: "Last Tuesday a 2008 BF Falcon rolled into Bay 3 with a deep, gargling note that the owner reckoned had crept in over a fortnight. Nine times out of ten that grumble traces back to a tired centre muffler — and that is exactly what we found.",
  },
  {
    id: "b-heading-2",
    kind: "heading",
    level: 2,
    text: "What the noise is actually telling you",
    focused: true,
  },
  {
    id: "b-paragraph-2",
    kind: "paragraph",
    text: "A healthy twin system sings through the tail pipes. Once a baffle perforates, exhaust pulses start fighting each other and you get that wet, ragged growl most Wollongong drivers describe as a chesty cough.",
  },
  {
    id: "b-list-1",
    kind: "list",
    items: [
      "Idle pitch drops by roughly an octave",
      "Cabin drone appears between 1800 and 2200 rpm",
      "Light hydrocarbon smell after a 20-minute drive",
    ],
  },
  {
    id: "b-quote-1",
    kind: "quote",
    text: "If you can hear yourself breathing over the exhaust at idle, the muffler is doing its job. If you can hear the exhaust over the radio, it isn't.",
    attribution: "Daniel Fleuren · workshop notebook",
  },
  {
    id: "b-heading-3",
    kind: "heading",
    level: 2,
    text: "How we diagnose it on the hoist",
  },
  {
    id: "b-paragraph-3",
    kind: "paragraph",
    text: "We start with a cold-engine listen-down, then probe each weld with a stethoscope while the system runs at 2500 rpm. A pin-hole in the muffler shell sounds like a tin whistle. A failed internal baffle sounds like a kazoo.",
  },
  {
    id: "b-media-1",
    kind: "media",
    mediaKind: "image",
    caption: "BF Falcon centre muffler under the hoist — note the corrosion blooms along the bottom seam.",
  },
  {
    id: "b-heading-4",
    kind: "heading",
    level: 2,
    text: "Repair vs replace — the honest call",
  },
  {
    id: "b-paragraph-4",
    kind: "paragraph",
    text: "Patch welding a Falcon centre muffler buys you about six months in Illawarra coastal air. We will quote it both ways but always recommend replacing with a 2.5-inch aluminised unit if the budget allows.",
  },
  {
    id: "b-code-1",
    kind: "code",
    language: "yaml",
    code: "quote:\n  vehicle: BF Falcon XR6 2008\n  parts:\n    - id: manta-2.5-centre\n      label: Manta 2.5\" aluminised centre muffler\n      price: 289\n  labour_hours: 1.4\n  exhaust_repair_illawarra: true",
  },
]

export const FOCUSED_BLOCK_ID = "b-heading-2"

/* ------------------------------------------------------------------ *
 * Outline
 * ------------------------------------------------------------------ */

export const OUTLINE: ReadonlyArray<OutlineEntry> = [
  { id: "o-1", level: 1, label: "Why your Falcon's twin pipes are growling", wordCount: 0 },
  { id: "o-2", level: 2, label: "What the noise is actually telling you", wordCount: 84, active: true },
  { id: "o-3", level: 2, label: "How we diagnose it on the hoist", wordCount: 96 },
  { id: "o-4", level: 3, label: "Stethoscope walk-around", wordCount: 42 },
  { id: "o-5", level: 2, label: "Repair vs replace — the honest call", wordCount: 132 },
  { id: "o-6", level: 3, label: "Pricing breakdown", wordCount: 68 },
  { id: "o-7", level: 2, label: "What a healthy Falcon sounds like", wordCount: 56 },
]

/* ------------------------------------------------------------------ *
 * Frontmatter
 * ------------------------------------------------------------------ */

export const HERO_FRONTMATTER: Frontmatter = {
  title: "Why your Falcon's twin pipes are growling",
  slug: "falcon-twin-pipes-growling",
  excerpt:
    "Nine times out of ten that BF Falcon gargle is a perforated centre muffler. Here's how we listen for it on the hoist — and the honest call between patch and replace.",
  coverAlt: "BF Falcon XR6 on the hoist in Bay 3 with the centre exhaust hanging.",
  coverFocalX: 62,
  coverFocalY: 48,
  category: "workshop-tales",
  tags: ["bf-falcon", "centre-muffler", "exhaust-repair-illawarra", "diagnostics"],
  authorIds: [AUTHORS.daniel.id, AUTHORS.mia.id, AUTHORS.ben.id],
  scheduledFor: "2026-06-04T08:30:00+10:00",
  estimatedReadMinutes: 7,
}

/* ------------------------------------------------------------------ *
 * SEO inspector
 * ------------------------------------------------------------------ */

export const SEO_SIGNALS: ReadonlyArray<SeoSignal> = [
  {
    id: "seo-keyword",
    label: "Focus keyword density",
    value: "1.2%",
    score: 78,
    hint: "Keyword \"exhaust repair illawarra\" appears 9× — sits in the healthy 1–1.5% band.",
  },
  {
    id: "seo-meta-length",
    label: "Meta description length",
    value: "152 / 160 chars",
    score: 92,
    hint: "Comfortable under the 160 char Google snippet ceiling.",
  },
  {
    id: "seo-title",
    label: "Title tag",
    value: "58 / 60 chars",
    score: 88,
    hint: "Title fits Google's 60 char visual limit.",
  },
  {
    id: "seo-h2",
    label: "Heading hierarchy",
    value: "1 × H1 · 4 × H2 · 2 × H3",
    score: 71,
    hint: "Hierarchy is clean. Consider one more H3 under repair vs replace.",
  },
  {
    id: "seo-alt",
    label: "Image alt coverage",
    value: "1 / 1 images",
    score: 95,
    hint: "All inline media has descriptive alt text.",
  },
  {
    id: "seo-link",
    label: "Outbound links",
    value: "0 outbound",
    score: 42,
    hint: "Consider linking once to ADR 49 brochure for authority.",
  },
]

export const SEO_META_PREVIEW: SeoMetaPreview = {
  url: "https://mufflermen.com.au/journal/falcon-twin-pipes-growling",
  title: "Why your Falcon's twin pipes are growling — Mufflermen",
  description:
    "BF Falcon gargle? It's almost always a perforated centre muffler. We break down how we listen for it on the hoist and when to patch vs replace.",
  ogImageAlt: "BF Falcon XR6 on the hoist with the centre exhaust hanging — Bay 3, Oak Flats.",
}

/* ------------------------------------------------------------------ *
 * Readability
 * ------------------------------------------------------------------ */

export const READABILITY: ReadabilityScore = {
  fleschEase: 64.2,
  gradeLevel: 7.4,
  avgSentenceLength: 16.8,
  longWordPercent: 9.1,
}

export const READABILITY_VARIANTS: ReadonlyArray<{ label: string; score: ReadabilityScore }> = [
  {
    label: "Plain English (default)",
    score: READABILITY,
  },
  {
    label: "Tech explainer draft",
    score: { fleschEase: 47.6, gradeLevel: 11.2, avgSentenceLength: 22.4, longWordPercent: 14.6 },
  },
  {
    label: "Customer story polish",
    score: { fleschEase: 82.1, gradeLevel: 5.8, avgSentenceLength: 12.6, longWordPercent: 4.8 },
  },
]

/* ------------------------------------------------------------------ *
 * Taxonomy tree
 * ------------------------------------------------------------------ */

export const TAXONOMY: ReadonlyArray<TaxonomyNode> = [
  {
    id: "cat-workshop",
    label: "Workshop Tales",
    count: 38,
    isPrimary: true,
    children: [
      { id: "tag-bay3", label: "Bay 3 diaries", count: 12, isPrimary: false },
      { id: "tag-hoist", label: "On the hoist", count: 18, isPrimary: false },
      { id: "tag-call-outs", label: "Roadside call-outs", count: 8, isPrimary: false, dropTarget: true },
    ],
  },
  {
    id: "cat-suburb",
    label: "Suburb Spotlights",
    count: 22,
    isPrimary: true,
    children: [
      { id: "tag-wollongong", label: "Wollongong", count: 9, isPrimary: false },
      { id: "tag-shellharbour", label: "Shellharbour", count: 7, isPrimary: false },
      { id: "tag-kiama", label: "Kiama", count: 6, isPrimary: false },
    ],
  },
  {
    id: "cat-tech",
    label: "Tech Explainers",
    count: 31,
    isPrimary: true,
    children: [
      { id: "tag-emissions", label: "Emissions law (ADR)", count: 11, isPrimary: false },
      { id: "tag-acoustic", label: "Acoustic tuning", count: 8, isPrimary: false },
      { id: "tag-materials", label: "Aluminised vs stainless", count: 12, isPrimary: false },
    ],
  },
  {
    id: "cat-parts",
    label: "Parts Deep-Dives",
    count: 27,
    isPrimary: true,
    children: [
      { id: "tag-manta", label: "Manta", count: 9, isPrimary: false },
      { id: "tag-pacemaker", label: "Pacemaker", count: 8, isPrimary: false },
      { id: "tag-redback", label: "Redback", count: 10, isPrimary: false },
    ],
  },
  {
    id: "cat-customer",
    label: "Customer Stories",
    count: 18,
    isPrimary: true,
    children: [
      { id: "tag-restorations", label: "Restorations", count: 7, isPrimary: false },
      { id: "tag-rebuilds", label: "Rebuilds", count: 6, isPrimary: false },
      { id: "tag-rallies", label: "Show & shines", count: 5, isPrimary: false },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Co-authors
 * ------------------------------------------------------------------ */

export const CO_AUTHORS: ReadonlyArray<CoAuthorSlot> = [
  { author: AUTHORS.daniel, visible: true },
  { author: AUTHORS.mia, visible: true, bylineOverride: "Editor: Mia P." },
  { author: AUTHORS.ben, visible: true },
  { author: AUTHORS.jordan, visible: false },
  { author: AUTHORS.hermes, visible: false },
]

/* ------------------------------------------------------------------ *
 * Revision diff viewer
 * ------------------------------------------------------------------ */

export const REVISION_OLD: RevisionMeta = {
  id: "rev-3",
  label: "Revision 3 · Mia's first pass",
  author: AUTHORS.mia,
  timestamp: "Mon 25 May · 14:08",
  changeSummary: "Tightened intro, swapped \"loud\" for \"growling\", added Wollongong reference.",
}

export const REVISION_NEW: RevisionMeta = {
  id: "rev-4",
  label: "Revision 4 · Daniel's bay-floor pass",
  author: AUTHORS.daniel,
  timestamp: "Tue 26 May · 09:32",
  changeSummary: "Replaced generic Falcon intro with the actual Bay 3 job, added stethoscope detail.",
}

export const REVISION_DIFF: ReadonlyArray<RevisionDiffLine> = [
  {
    id: "d-1",
    kind: "context",
    text: "Last Tuesday a 2008 BF Falcon rolled into Bay 3 with a deep, gargling note",
  },
  {
    id: "d-2",
    kind: "removed",
    text: "that the owner said had been there a while.",
  },
  {
    id: "d-3",
    kind: "added",
    text: "that the owner reckoned had crept in over a fortnight.",
    note: "Aussie cadence — closer to how Daniel actually talks to customers.",
  },
  {
    id: "d-4",
    kind: "context",
    text: "",
  },
  {
    id: "d-5",
    kind: "removed",
    text: "A healthy twin system runs quiet. When a baffle fails, the noise gets ragged.",
  },
  {
    id: "d-6",
    kind: "added",
    text: "A healthy twin system sings through the tail pipes. Once a baffle perforates,",
  },
  {
    id: "d-7",
    kind: "added",
    text: "exhaust pulses start fighting each other and you get that wet, ragged growl",
    note: "Adds the sensory detail Mia kept asking for.",
  },
  {
    id: "d-8",
    kind: "added",
    text: "most Wollongong drivers describe as a chesty cough.",
  },
  {
    id: "d-9",
    kind: "context",
    text: "",
  },
  {
    id: "d-10",
    kind: "context",
    text: "We start with a cold-engine listen-down, then probe each weld with a stethoscope.",
  },
]

/* ------------------------------------------------------------------ *
 * Reusable block snippets
 * ------------------------------------------------------------------ */

export const BLOCK_SNIPPETS: ReadonlyArray<BlockSnippet> = [
  {
    id: "snip-callout-adr",
    kind: "callout",
    label: "ADR 49 callout",
    body: "Heads up — replacing a centre muffler on a 1996+ vehicle must keep noise levels within ADR 83/00 limits.",
    usageCount: 11,
    tone: "amber",
  },
  {
    id: "snip-lead-quote",
    kind: "lead-magnet",
    label: "Book-a-quote lead magnet",
    body: "Drop your rego and we'll send a fixed-price quote within 90 minutes during workshop hours.",
    usageCount: 24,
    tone: "teal",
  },
  {
    id: "snip-diagram-twin",
    kind: "diagram",
    label: "Twin-pipe diagram",
    body: "Cross-section sketch of a healthy vs perforated centre muffler with airflow arrows.",
    usageCount: 6,
    tone: "violet",
  },
  {
    id: "snip-quote-customer",
    kind: "quote-block",
    label: "Customer pull-quote",
    body: "\"Bays were warm, coffee was hot, exhaust was sorted. Mufflermen mob got it right first try.\"",
    usageCount: 9,
    tone: "green",
  },
  {
    id: "snip-stat-block",
    kind: "stat-block",
    label: "Workshop stat block",
    body: "97% first-time fit · 6,800 mufflers fitted since 2014 · 4.9 / 5 Google rating",
    usageCount: 14,
    tone: "red",
  },
]

/* ------------------------------------------------------------------ *
 * Editorial comments
 * ------------------------------------------------------------------ */

export const DRAFT_COMMENTS: ReadonlyArray<DraftComment> = [
  {
    id: "dc-1",
    author: AUTHORS.mia,
    body: "Love this lead. Can we work the phrase \"exhaust repair illawarra\" naturally into the first 80 words for SEO?",
    timestamp: "Mon 25 May · 14:18",
    state: "open",
    blockAnchor: "b-paragraph-1",
    replies: [
      {
        id: "dc-1-r1",
        author: AUTHORS.daniel,
        body: "Working it into the second paragraph reads more honestly than forcing it up top — see revision 4.",
        timestamp: "Tue 26 May · 09:34",
      },
    ],
  },
  {
    id: "dc-2",
    author: AUTHORS.ben,
    body: "Manta centre muffler price is now $289 not $269 — supplier nudged it on the 15th.",
    timestamp: "Tue 26 May · 11:02",
    state: "resolved",
    blockAnchor: "b-code-1",
    resolutionNote: "Daniel updated quote YAML to $289.",
  },
  {
    id: "dc-3",
    author: AUTHORS.jordan,
    body: "The stethoscope detail is great but consider mentioning we keep a borescope on the bench too — readers love the gear porn.",
    timestamp: "Tue 26 May · 13:47",
    state: "in-review",
    blockAnchor: "b-paragraph-3",
  },
]

/* ------------------------------------------------------------------ *
 * Social repurpose
 * ------------------------------------------------------------------ */

export const REPURPOSE_OUTPUTS: ReadonlyArray<RepurposeOutput> = [
  {
    channel: "twitter-thread",
    status: "drafted",
    hookLine: "Your BF Falcon's twin pipes shouldn't growl. Here's why yours do — 9 posts.",
    estimatedReach: "~4.2k impressions",
    snippet: "1/ A healthy twin exhaust sings through both tail pipes. Yours is gargling. Here's what's happening under the floor →",
  },
  {
    channel: "instagram-reel",
    status: "scheduled",
    hookLine: "POV: your Falcon is telling you the muffler is cooked",
    estimatedReach: "~12.6k reach",
    snippet: "30s reel · stethoscope test → cut-open muffler → new Manta unit fitted → tail-pipe walk-around.",
  },
  {
    channel: "instagram-carousel",
    status: "drafted",
    hookLine: "5 sounds your Falcon makes when the centre muffler is dying",
    estimatedReach: "~8.4k reach",
    snippet: "Slide 1: idle drop · 2: cabin drone · 3: hydrocarbon whiff · 4: tin whistle · 5: book a quote.",
  },
  {
    channel: "linkedin-post",
    status: "queued",
    hookLine: "Why a $40 weld today saves a $480 system swap in February.",
    estimatedReach: "~1.1k reach",
  },
  {
    channel: "tiktok-script",
    status: "queued",
    hookLine: "If your Ford sounds chesty at the lights, watch this before you spend $500.",
    estimatedReach: "~22k reach",
  },
  {
    channel: "newsletter-snippet",
    status: "approved",
    hookLine: "This week from Bay 3 — the BF Falcon gargle, decoded.",
    estimatedReach: "1,840 subscribers",
  },
]

/* ------------------------------------------------------------------ *
 * Cover art studio
 * ------------------------------------------------------------------ */

export const COVER_SUGGESTIONS: ReadonlyArray<CoverSuggestion> = [
  {
    id: "cover-1",
    label: "Bay 3 — golden hour",
    prompt: "BF Falcon on hoist, sodium afternoon light, Oak Flats workshop signage soft in background.",
    tone: "amber",
  },
  {
    id: "cover-2",
    label: "Cutaway muffler hero",
    prompt: "Centre muffler cutaway showing perforated baffle, black studio backdrop, top-light only.",
    tone: "violet",
  },
  {
    id: "cover-3",
    label: "Tail-pipe close-up",
    prompt: "Polished twin tail pipes, condensation droplet, shallow depth of field, blue Falcon paint behind.",
    tone: "teal",
  },
  {
    id: "cover-4",
    label: "Daniel + stethoscope",
    prompt: "Daniel in navy workshop shirt, stethoscope to muffler, half-light, mood: confident.",
    tone: "green",
  },
]

/* ------------------------------------------------------------------ *
 * Related article cards
 * ------------------------------------------------------------------ */

export interface SamplePost {
  id: string
  title: string
  category: PostCategory
  excerpt: string
  authorId: string
  publishedRel: string
  readMinutes: number
  status: "draft" | "scheduled" | "published"
}

export const SAMPLE_POSTS: ReadonlyArray<SamplePost> = [
  {
    id: "p-1",
    title: "Why your Falcon's twin pipes are growling",
    category: "workshop-tales",
    excerpt: "Nine times out of ten that BF Falcon gargle is a perforated centre muffler.",
    authorId: AUTHORS.daniel.id,
    publishedRel: "Scheduled · Thu 8:30am",
    readMinutes: 7,
    status: "scheduled",
  },
  {
    id: "p-2",
    title: "Wollongong's ten loudest exhaust myths",
    category: "suburb-spotlights",
    excerpt: "From mandrel bends to cat-back swaps — what locals get wrong about going louder legally.",
    authorId: AUTHORS.mia.id,
    publishedRel: "Published · 19 May",
    readMinutes: 9,
    status: "published",
  },
  {
    id: "p-3",
    title: "Catalytic converter theft — the Illawarra heat map",
    category: "suburb-spotlights",
    excerpt: "Six postcodes that account for 64% of cat thefts we've replaced this year.",
    authorId: AUTHORS.mia.id,
    publishedRel: "Published · 12 May",
    readMinutes: 11,
    status: "published",
  },
  {
    id: "p-4",
    title: "Manta vs Pacemaker — extractor headers for the LS swap crowd",
    category: "parts-deep-dives",
    excerpt: "Side-by-side weld quality, mandrel radius, and dyno gains across three test fits.",
    authorId: AUTHORS.ben.id,
    publishedRel: "Draft · last edited 2h ago",
    readMinutes: 13,
    status: "draft",
  },
  {
    id: "p-5",
    title: "Sam's 1986 LandCruiser restoration — exhaust chapter",
    category: "customer-stories",
    excerpt: "Why we walked away from the original cast iron and built a custom stainless 2.5\".",
    authorId: AUTHORS.daniel.id,
    publishedRel: "Published · 04 May",
    readMinutes: 8,
    status: "published",
  },
  {
    id: "p-6",
    title: "ADR 83/00 in plain English — what \"loud\" really means",
    category: "tech-explainers",
    excerpt: "Decibels, distances, drive-by tests, and the bit roadside cops actually measure.",
    authorId: AUTHORS.hermes.id,
    publishedRel: "Draft · awaiting Daniel pass",
    readMinutes: 10,
    status: "draft",
  },
]

/* ------------------------------------------------------------------ *
 * Helper getters
 * ------------------------------------------------------------------ */

export function authorById(id: string): Author {
  for (const key of Object.keys(AUTHORS)) {
    const author = AUTHORS[key]
    if (author.id === id) return author
  }
  return AUTHORS.daniel
}
