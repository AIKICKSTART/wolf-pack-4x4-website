// Workshop note composer — turns supplier feed records into structured,
// human-feeling workshop copy. Agreed format (adversarial copy debate
// 2026-06-11): availability-TIERED blocks, never headings over fumes;
// section vocabulary from the owner's quality benchmark; heading +
// phrasing variants rotate on a SKU hash so 19.5k pages do not share
// one fingerprint. Hard rules: no em/en dashes, no "•" artifacts, the
// part title appears at most once, no install claims outside gated
// categories, never render "$0" or a raw stock enum.
import type { SupplierPart } from "@/lib/parts"

export interface WorkshopNoteSection {
  heading: string
  accent: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface WorkshopNoteContent {
  lede: string[]
  sections: WorkshopNoteSection[]
  summary: string
}

const BANNED = /unlock the full potential|enthusiasts demand|weekend warrior|last exhaust system your/gi

function hashSku(sku: string): number {
  let h = 0
  for (let i = 0; i < sku.length; i++) h = (h * 31 + sku.charCodeAt(i)) >>> 0
  return h
}

// Per-slot decorrelation: a plain (seed + slot) % 3 collapses the
// catalogue into ~6 frame families that share EVERY sentence (the 31
// multiplier in hashSku is 1 mod 3). Mix seed and slot properly.
function pick<T>(seed: number, slot: number, options: T[]): T {
  const h = Math.imul(seed ^ (slot * 0x9e3779b1), 0x85ebca6b) >>> 0
  return options[h % options.length]
}

// No em or en dashes anywhere; mid-word "•" feed artifacts become
// hyphens, stray bullets become commas.
export function sanitizeNoteText(text: string): string {
  return text
    .replace(/(\w)•(\w)/g, "$1-$2")
    .replace(/\s*•\s*/g, ", ")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(BANNED, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/(^|[\s/-])([a-z])/g, (m, pre, ch) => pre + ch.toUpperCase())
    .replace(/\b(V6|V8|V12|4x4|4wd|Awd|Ute|Efi|Dpf|Hpc|Ecu)\b/gi, (m) => m.toUpperCase())
}

// Truncation-fragment whitelist (productHandle): short trailing tokens
// that are real, not feed truncation.
const KNOWN_SHORT = new Set(["V6", "V8", "3IN", "2IN", "CAT", "KIT", "DPF", "HPC", "ECU", "UTE", "4X4"])

// Casing-preserve set is DIFFERENT: KIT/CAT/UTE are English words and
// get cased; only true acronyms keep caps.
const CASE_KEEP = new Set(["V6", "V8", "V12", "DPF", "HPC", "ECU", "EFI", "4X4", "4WD", "AWD", "GVM", "TD", "TDI"])

// Aussie model codes that must never be smart-cased ("Fg Falcon" makes
// a vehicle buyer flinch).
const MODEL_CODES = new Set([
  "FG", "FGX", "BA", "BF", "EL", "EF", "XH", "AU", "PX", "PJ", "PK", "RA", "RG",
  "VE", "VF", "VT", "VX", "VY", "VZ", "VS", "VN", "VP", "VR", "ZB", "WK", "WH",
  "GQ", "GU", "NP", "NS", "NT", "NW", "NM", "NL", "PB", "MQ", "MN", "ML", "KL",
  "CJ", "SZ", "TF", "JH", "XR", "KUN", "TGN", "GGN", "VDJ", "KZN", "N80", "N70",
])

// Connector words must not title-case ("2015 To 2025").
const CONNECTORS = new Set(["TO", "WITH", "AND", "FOR", "OF", "ON"])

const keepCase = (w: string) => {
  const upper = w.toUpperCase()
  return CASE_KEEP.has(upper) || MODEL_CODES.has(upper)
}

// Feed taxonomy masquerading as a vehicle ("4x4 Exhausts - Toyota",
// "Performance Car - Ford") must never render as a fitment listing.
const JUNK_FITMENT = /( - )|\b(exhausts?|mufflers?|extractors?|performance car|universal|commercial|accessor)/i

// Vehicle line: a bare make never earns a fitment sentence, and junk
// taxonomy routes to the confirm-before-order close instead.
function vehicleHint(part: SupplierPart): string | null {
  const target = (part.targetVehicle ?? "").trim()
  if (!target || JUNK_FITMENT.test(target)) return null
  const cased = titleCase(target)
  const words = cased.split(/\s+/)
  if (words.length < 2) return null
  return cased
}

interface FeatureRule {
  test: RegExp
  bullet: string
}

const VEHICLE_MAKES = /^(chevrolet|chevy|ford|holden|toyota|nissan|mazda|mitsubishi|isuzu|subaru|honda|hyundai|kia|volkswagen|vw|bmw|mercedes|audi|jeep|land rover|renault|suzuki|volvo|ram|dodge|hsv|fpv|great wall|ldv|ssangyong)\b/i

const CATEGORY_NOUN: Record<string, string> = {
  "complete-exhaust-systems": "full system",
  "extractors-headers": "extractor set",
  "mufflers-resonators": "muffler",
  "exhaust-pipes-tips": "pipework",
  "fasteners-fittings": "fitting hardware",
  "filters-engine-bay-accessories": "engine bay hardware",
  "suspension-4x4-parts": "suspension hardware",
  "performance-chips-ecu-remaps": "tuning module",
  "cold-air-induction": "induction kit",
  "4x4-lighting-accessories": "lighting kit",
  "towing-4x4-accessories": "towing hardware",
}

const FEATURE_BOUNDARY = /\b(full exhaust|exhaust|system|muffler|cat[\s-]?back|turbo[\s-]?back|extractors?|headers?|kit|dpf|filter|spring|gasket|tip|pipe)\b/i

const FEATURE_RULES: FeatureRule[] = [
  { test: /hpc|ceramic coat/i, bullet: "HPC ceramic coated, keeps heat in the pipe, not the engine bay" },
  { test: /high[\s-]?flow cat|hi[\s-]?flow cat|\bcats?\b.*(high|hi)[\s-]?flow/i, bullet: "High flow cats, emissions compliant without strangling the engine" },
  { test: /\bcats?\b/i, bullet: "A proper cat in the line, emissions handled, not deleted" },
  { test: /mandrel/i, bullet: "Mandrel bent tubing, full bore through every bend" },
  { test: /quad tip/i, bullet: "Quad tip finish under the rear bar" },
  { test: /twin tip|dual tip/i, bullet: "Twin tip finish at the rear" },
  { test: /\bcat[\s-]?back\b/i, bullet: "Complete system behind the cats, no factory sections carried over" },
  { test: /turbo[\s-]?back/i, bullet: "Turbo back, the whole path from turbo flange to tip" },
  { test: /\bextractors?\b|\bheaders?\b/i, bullet: "Extractors built to pull gases out evenly, cylinder by cylinder" },
  { test: /hotdog|resonator/i, bullet: "Resonator in the line to take the drone out of cruise speeds" },
  { test: /stainless/i, bullet: "Stainless construction, built for years of Australian conditions" },
  { test: /\bloud\b/i, bullet: "Built loud, pick this option because you want to hear it" },
  { test: /\bdpf\b|particulate/i, bullet: "Direct replacement diesel particulate filter" },
  { test: /muffler/i, bullet: "Muffler matched to the system for tone, not just volume" },
  { test: /coil spring/i, bullet: "Coil spring rated for the load and ride height listed" },
  { test: /gasket/i, bullet: "Correct gasket for a clean seal, no guesswork at the flange" },
  { test: /\b(3|2\.5|2 1\/2|2)\s?(in|inch|")/i, bullet: "Pipe diameter sized to the engine, not one-size-fits-all" },
]

// Categories where a fitment claim is defensible at category level.
const BOLT_ON_CATEGORIES = new Set([
  "suspension-4x4-parts",
  "towing-4x4-accessories",
  "4x4-lighting-accessories",
  "filters-engine-bay-accessories",
  "performance-chips-ecu-remaps",
  "cold-air-induction",
])

const CATEGORY_PAYOFF: Record<string, string[]> = {
  "complete-exhaust-systems": [
    "a deeper note you feel at idle and proper breathing room when you lean on it",
    "a stronger note and free flow from the flange back",
  ],
  "extractors-headers": [
    "sharper response and heat kept out of the engine bay",
    "an engine that breathes out as well as it breathes in",
  ],
  "mufflers-resonators": [
    "the tone you actually want, not just more volume",
    "a note tuned for the street without the drone at cruise",
  ],
  "exhaust-pipes-tips": [
    "clean flow and a finish that looks fitted, not bolted on",
    "the right bore and a tidy exit under the bar",
  ],
  "fasteners-fittings": [
    "the small hardware that decides whether a system seals or leaks",
    "the right fastener for the job, fitted once, fitted properly",
  ],
  "filters-engine-bay-accessories": [
    "cleaner airflow in and a tidier engine bay",
    "engine bay hardware that earns its place",
  ],
  "suspension-4x4-parts": [
    "control and clearance matched to how the vehicle is actually used",
    "the ride and load rating the vehicle was set up for",
  ],
  "performance-chips-ecu-remaps": [
    "tuning that works with the hardware, not against it",
    "more usable torque where the engine actually drives",
  ],
  "cold-air-induction": [
    "colder, denser intake air and an induction note to match",
    "airflow support that matches the wider 4x4 build plan",
  ],
  "4x4-lighting-accessories": [
    "light where the track needs it",
    "visibility that holds up off the bitumen",
  ],
  "towing-4x4-accessories": [
    "towing hardware rated for the job, not the brochure",
    "capability you can load up and trust",
  ],
}

function extractBullets(part: SupplierPart): string[] {
  const haystack = `${part.title} ${(part.tags ?? []).join(" ")}`
  const bullets: string[] = []
  for (const rule of FEATURE_RULES) {
    if (bullets.length >= 5) break
    if (rule.test.test(haystack)) bullets.push(rule.bullet)
  }
  // "high flow cats" titles fire both cat rules; the generic one is
  // redundant noise next to the specific claim.
  if (bullets.some((b) => b.startsWith("High flow cats")) ) {
    const i = bullets.findIndex((b) => b.startsWith("Cats included"))
    if (i >= 0) bullets.splice(i, 1)
  }
  return bullets
}

// ~20% of feed titles arrive ALL CAPS. Title-case pure-alpha shouting
// tokens; tokens carrying digits or hyphens (model codes: BT50, D-MAX,
// GUN156R) and known acronyms stay as supplied.
function smartCase(text: string): string {
  return text
    .split(/\s+/)
    .map((w) => {
      if (/[\d-]/.test(w) || w.length <= 1 || w === "&") return w
      if (!/^[A-Z&/]+$/.test(w)) return w
      if (keepCase(w)) return w
      if (CONNECTORS.has(w)) return w.toLowerCase()
      return w.charAt(0) + w.slice(1).toLowerCase()
    })
    .join(" ")
}

// Vehicle phrase for ledes/summaries: drop stray periods (keep 2.8L),
// trailing pipe-size tokens and dangling punctuation.
function trimVehiclePhrase(text: string): string {
  return text
    .replace(/\.(?!\d)/g, "")
    .replace(/[\s,]+\d+(\.\d+)?\s?(in|inch|inches)\b.*$/i, "")
    .replace(/\s-\s/g, " to ")
    .replace(/[\s,.;:]+$/, "")
    .trim()
}

// When the title's remainder after the vehicle phrase names the part
// ("Full Exhaust", "DPF Back"), that IS the noun; the category noun is
// only a fallback. Acronym/digit tokens keep their case.
const PART_WORD = /^(system|kit|set|muffler|extractors?|pipes?|gaskets?|filters?|springs?|tips?|hardware|cooler|bracket|washer|clamp|resonator|cat|flange|plate|hanger)s?$/i

function normalizeNoun(text: string): string {
  const cleaned = sanitizeNoteText(text).replace(/^(with|inc|incl)\b\s*/i, "")
  if (!cleaned) return ""
  let words = cleaned
    .split(/\s+/)
    .map((w) => (/[\d]/.test(w) || keepCase(w) ? w : w.toLowerCase()))
    .map((w) => w.replace(/[,.;:]+$/, ""))
    .filter(Boolean)
  if (words.length > 5) words = words.slice(0, 5)
  // Series-suffix flip: a trailing non-part brand/series token after a
  // part word reads broken ("centre muffler everflo"); it becomes a
  // title-cased prefix ("Everflo centre muffler").
  if (words.length >= 2) {
    const last = words[words.length - 1]
    if (/^[a-z]+$/i.test(last) && !PART_WORD.test(last) && words.slice(0, -1).some((w) => PART_WORD.test(w))) {
      words.pop()
      words.unshift(last.charAt(0).toUpperCase() + last.slice(1))
    }
  }
  let noun = words.join(" ")
  if (!words.some((w) => PART_WORD.test(w))) {
    noun += " system"
  }
  return noun
}

// Short product handle for the lede: strip dangling truncation frags
// ("Op", "Sys", "Ext") and the supplier noise, keep it readable.
// Damaged/clearance-stock flags: disclosed in the close, never buried
// in the handle. Deliberately narrow — bare "clearance" is a ground
// height word on 4x4 hardware.
const CONDITION_FLAG = /\b(dented|dent|shop[\s-]?soiled|b[\s-]?grade|ex[\s-]?demo|damaged|blemished)\b/i

function productHandle(part: SupplierPart): string {
  let cleaned = sanitizeNoteText(part.title).replace(
    /\s*[-,]?\s*\b(dented|dent|shop[\s-]?soiled|b[\s-]?grade|ex[\s-]?demo|damaged|blemished)\b/gi,
    "",
  )
  // Long feed titles read as the supplier dump's voice; cut at the
  // first clause boundary so the lede names the part, the kit section
  // carries the details.
  if (cleaned.length > 60) {
    const boundary = cleaned.search(/,| with | inc\.? | incl /i)
    if (boundary > 24) {
      cleaned = cleaned.slice(0, boundary)
    } else {
      // No clause boundary (40% of the catalogue): hard-cut at the
      // last word boundary under 60 so the lede never carries a full
      // listing line; the frag-dropper below tidies the tail.
      const cut = cleaned.lastIndexOf(" ", 60)
      if (cut > 24) cleaned = cleaned.slice(0, cut)
    }
  }
  const words = cleaned.split(/\s+/)
  while (words.length > 3) {
    const last = words[words.length - 1].replace(/[^\w"]/g, "")
    if (last.length < 4 && !KNOWN_SHORT.has(last.toUpperCase())) words.pop()
    else break
  }
  return words.join(" ")
}

export function composeWorkshopNote(part: SupplierPart): WorkshopNoteContent {
  const seed = hashSku(part.sku)
  const brand = (part.brand ?? "").trim()
  const supplier = (part.supplier ?? "").trim()
  const maker = brand || supplier || "the supplier"
  const vehicle = vehicleHint(part)
  const bullets = extractBullets(part)
  // Zero extractable bullets means the composer knows nothing concrete
  // about this part; a category payoff would be a confident guess (the
  // feed mis-bins items), so it drops to the neutral truth. Otherwise a
  // loud option leads with the sound, then the category default.
  // One knowledge gate everywhere a claim depends on the feed category:
  // the same threshold that lets the kit section render. A single weak
  // substring hit must not unlock a performance claim.
  const knows = bullets.length >= 2
  const payoff =
    !knows
      ? "the right part for the job, confirmed against the vehicle before it goes on"
      : /\bloud\b/i.test(part.title)
        ? pick(seed, 1, [
            "a note with real presence at start-up and under load",
            "a sound you pick on purpose, strong at idle, harder when you lean on it",
          ])
        : /catalytic|\bcat conver|universal cat/i.test(part.title)
          ? "emissions compliance sorted without choking the flow"
          : pick(seed, 1, CATEGORY_PAYOFF[part.category] ?? [
              "the right part for the job, confirmed against the vehicle before it goes on",
            ])
  const catNoun = CATEGORY_NOUN[part.category] ?? "part"
  let handle = smartCase(productHandle(part))

  // A handle that opens with a vehicle make reads as a listing line;
  // restructure to "{maker}'s {part noun} for the {vehicle phrase}",
  // where the noun comes from the title's own remainder when it names
  // the part, and the category noun only as fallback.
  let vehiclePhrase: string | null = null
  let remainder = handle
  if (VEHICLE_MAKES.test(handle)) {
    // The phrase ends at the FIRST of: a part word, a size token
    // (2 1/2", 3in, 3 inch) or a position word (centre/front/rear) —
    // sizes and positions describe the part, not the vehicle. A size
    // boundary is consumed whole: the phrase ends before it AND the
    // remainder starts after it, or "inch" strands in the noun.
    const sizeMatch = /\b\d+(\s?\d\/\d)?\s?("|in\b|inch(es)?\b)/i.exec(handle)
    const cuts: Array<{ index: number; skip: number }> = [
      { index: handle.search(FEATURE_BOUNDARY), skip: 0 },
      sizeMatch ? { index: sizeMatch.index, skip: sizeMatch[0].length } : { index: -1, skip: 0 },
      { index: handle.search(/\b(centre|center|front|rear)\b/i), skip: 0 },
      // Config words describe the part layout, not the vehicle.
      { index: handle.search(/\b(dual|single|twin)\b/i), skip: 0 },
    ].filter((c) => c.index > 4)
    const cut = cuts.length ? cuts.reduce((a, b) => (b.index < a.index ? b : a)) : null
    if (cut) {
      vehiclePhrase = trimVehiclePhrase(handle.slice(0, cut.index))
      remainder = handle.slice(cut.index + cut.skip).trim()
      // Leading leftovers after a size skip include the hyphen of
      // compounds like "3in-Single".
      handle = normalizeNoun(remainder.replace(/^[-\d\s/"]+|^\bin\b\s*/i, "")) || catNoun
    }
  }

  // Digit-soup check runs on the remainder only, and it is unit-aware:
  // "4 inch 304 stainless 1D 90 degree bend" is a readable title, not
  // soup. Only bare 1-2 digit tokens NOT followed by a unit word count
  // toward the soup score (true soup: "Super ID 3 3 8 3 1 2").
  const UNIT_WORD = /^(in|inch(es)?|mm|cm|deg|degrees?|lt|litres?|l)$/i
  const remainderWords = remainder.split(/\s+/).filter(Boolean)
  const soupTokens = remainderWords.filter((w, i) => {
    if (!/^\d{1,2}(\/\d{1,2})?$/.test(w)) return false
    const next = remainderWords[i + 1]
    return !(next && UNIT_WORD.test(next))
  })
  const digitShare = remainderWords.length ? soupTokens.length / remainderWords.length : 0
  // Knowledge gate for any place the category noun would render: zero
  // extracted bullets means the feed category cannot be trusted.
  const trustNoun = knows ? catNoun : "part"
  const article = /^[aeiou]/i.test(trustNoun) ? "an" : "a"

  // Lede: the only place the title (handle) appears.
  const ledeIntro =
    digitShare > 0.3
      ? pick(seed, 2, [
          `This one is ${article} ${trustNoun} from ${maker}'s range.`,
          `${maker} supplies this ${trustNoun} through the workshop.`,
        ])
      : vehiclePhrase
        ? pick(seed, 2, [
            `This is ${maker}'s ${handle} for the ${vehiclePhrase}.`,
            `${maker} builds this ${handle} for the ${vehiclePhrase}.`,
            `For the ${vehiclePhrase}, this is ${maker}'s ${handle}.`,
          ])
        : vehicle
          ? pick(seed, 2, [
              `This is ${maker}'s ${handle} for the ${vehicle}.`,
              `${maker} builds this ${handle} specifically for the ${vehicle}.`,
              `For the ${vehicle}, this is ${maker}'s ${handle}.`,
            ])
          : pick(seed, 2, [
              `This is ${maker}'s ${handle}.`,
              `${maker} supplies this ${handle} through the workshop.`,
              `This ${handle} comes through ${maker}.`,
            ])
  const ledePayoff = pick(seed, 3, [
    `Fitted right, that means ${payoff}.`,
    `What you are buying is ${payoff}.`,
    `The point of it: ${payoff}.`,
  ])

  const sections: WorkshopNoteSection[] = []

  // Kit section: gated, never headings over fumes.
  if (bullets.length >= 2) {
    const kitHeading = pick(seed, 4, [
      { heading: "What you're getting", accent: "getting" },
      { heading: "Inside the kit", accent: "kit" },
      { heading: "The hardware", accent: "hardware" },
    ])
    sections.push({ ...kitHeading, bullets })
  }

  // Fitment: only for gated categories AND a real vehicle.
  if (vehicle && BOLT_ON_CATEGORIES.has(part.category)) {
    const fit = pick(seed, 5, [
      { heading: "Fitment notes", accent: "Fitment" },
      { heading: "Why it suits this vehicle", accent: "suits" },
    ])
    sections.push({
      ...fit,
      paragraphs: [
        pick(seed, 6, [
          `Listed for the ${vehicle}. The team still checks model year, engine, body style and the current accessory setup before anything is ordered, because supplier listings do not catch every variant.`,
          `The listing covers the ${vehicle}. Before booking, the workshop confirms engine, year and what is on the vehicle now, so the part that arrives is the part that fits.`,
        ]),
      ],
    })
  }

  // Close: always renders. Stock is a 3-way enum, never rendered raw.
  const close = pick(seed, 7, [
    { heading: "Before you order", accent: "order" },
    { heading: "Getting it right", accent: "right" },
    { heading: "How we handle it", accent: "handle" },
  ])
  const rrpDisplay = part.rrp.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  // "Quoted fitted, parts and labour" is comic on a $10 washer; gate
  // the fitted-quote phrasing on a realistic job value.
  const price =
    part.rrp >= 150
      ? `RRP sits at $${rrpDisplay} and the workshop quotes it fitted, parts and labour in one number.`
      : part.rrp > 0
        ? `It is listed at $${rrpDisplay} and usually goes on as part of a larger job.`
        : part.category === "fasteners-fittings"
          ? `This one is priced on quote with ${supplier || maker}, and it usually goes on as part of a larger job.`
          : `This one is priced on quote, the workshop confirms the current price with ${supplier || maker} and quotes it fitted.`
  // The title sometimes carries the part's best fact ("Suits Toyota
  // TYB202..."): render it as attributed listing data, not a claim.
  const suitsMatch = /\bsuits?,?\s+(.{6,80}?)(?:\.|$)/i.exec(sanitizeNoteText(part.title))
  const suits = suitsMatch
    ? `The listing has it suiting the ${suitsMatch[1].replace(/[\s,.]+$/, "")}, the team still checks it against the vehicle.`
    : ""
  const stock =
    part.stockStatus === "IN_STOCK"
      ? "Stock showed available at the last supplier update."
      : part.stockStatus === "OUT_OF_STOCK"
        ? "This one is order-in, the workshop confirms lead time when it quotes."
        : ""
  const confirm = pick(seed, 8, [
    "Send the rego or VIN with the enquiry and fitment is confirmed before anything is ordered.",
    "Give the workshop the rego or VIN and the part is checked against the exact vehicle first.",
    "Fitment gets confirmed against the rego or VIN before any order goes in.",
  ])
  // Condition flags get disclosed up front in the close; honesty is
  // the brand.
  const conditionMatch = CONDITION_FLAG.exec(part.title)
  const condition = conditionMatch
    ? `This one is listed as a ${conditionMatch[1].toLowerCase().replace(/[-\s]+/, " ")} unit, priced accordingly. The team confirms the condition with photos before you commit.`
    : ""
  sections.push({
    ...close,
    paragraphs: [[condition, suits, confirm, price, stock].filter(Boolean).join(" ")],
  })

  // Fold summary: rotated and category-aware so the always-visible
  // line is not one sentence stamped across 19.5k pages.
  // Same knowledge gate as the payoff: zero bullets and no remainder
  // noun means the category cannot be trusted, the summary says "part".
  const summaryNoun = vehiclePhrase
    ? `${handle} for the ${vehiclePhrase}`
    : vehicle
      ? `${trustNoun} for the ${vehicle}`
      : trustNoun
  const summary = pick(seed, 9, [
    `The workshop read on this ${maker} ${summaryNoun}: what to check and how it gets confirmed before ordering.`,
    `What the bay checks on this ${summaryNoun} before it is ordered, and how the quote works.`,
    `Fitment checks, price reality and ordering notes for this ${maker} ${summaryNoun}.`,
  ])

  return {
    lede: [sanitizeNoteText(ledeIntro), sanitizeNoteText(ledePayoff)],
    sections: sections.map((s) => ({
      ...s,
      paragraphs: s.paragraphs?.map(sanitizeNoteText),
      bullets: s.bullets?.map(sanitizeNoteText),
    })),
    summary: sanitizeNoteText(summary),
  }
}
