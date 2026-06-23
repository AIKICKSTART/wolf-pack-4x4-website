/**
 * Demo fixtures for the "App states" Torque screen.
 *
 * Customer-visible identity is "Torque — your Mufflermen business assistant".
 * (Dev note: the back-end console this surface maps to is internally codenamed
 *  elsewhere; that codename must never appear in any customer-visible copy.)
 *
 * Every string below is real Oak Flats Muffler Men marketing copy — exhausts,
 * servicing, the Illawarra NSW catchment — phrased as Torque would speak to the
 * shop owner when a full-surface state takes over the app.
 */

/** Brand assistant name shown to the owner everywhere on this surface. */
export const TORQUE_NAME = "Torque" as const

/** The intro the owner reads above the gallery. */
export const STATES_INTRO =
  "These are the full-surface screens Torque shows the Oak Flats Muffler Men crew when the app cannot show the usual dashboard — an empty queue, a slow backend, a planned shutdown, a win worth celebrating. Each one keeps the brand voice and points to the next useful action." as const

/** Two viewing lanes so the owner can compare the calm states against the disruptive ones. */
export type StateLane = "all" | "calm" | "disruption"

export interface StateLaneOption {
  id: StateLane
  label: string
  hint: string
}

export const STATE_LANES: ReadonlyArray<StateLaneOption> = [
  { id: "all", label: "All states", hint: "Every full-surface screen" },
  { id: "calm", label: "Calm + done", hint: "Empty, success, scheduled" },
  { id: "disruption", label: "Disruption", hint: "Errors, offline, slow" },
]

/** Stable keys for each demonstrated screen. */
export type StateKey =
  | "empty-inbox"
  | "empty-results"
  | "loading"
  | "server-error"
  | "offline"
  | "maintenance"
  | "success-confirmed"

export interface StateGalleryItem {
  key: StateKey
  /** Two-digit index shown on the frame. */
  index: string
  /** Frame caption — what triggered this screen. */
  caption: string
  /** Short description of how the Torque app handles this state. */
  note: string
  /** Which lane(s) this item belongs to. */
  lane: Exclude<StateLane, "all">
}

/**
 * Gallery ordering + per-frame copy. The actual full-surface components are
 * composed in the scene; this drives the captions, lane filter, and a11y labels.
 */
export const STATE_GALLERY: ReadonlyArray<StateGalleryItem> = [
  {
    key: "empty-inbox",
    index: "01",
    caption: "Inbox · nothing waiting",
    note: "Quote replies and supplier notes are all cleared. Torque shows the lull plus today's throughput instead of an awkward blank panel.",
    lane: "calm",
  },
  {
    key: "empty-results",
    index: "02",
    caption: "Catalogue search · 0 matches",
    note: "A fitment lookup found nothing. Torque echoes the query and offers broader chips so the counter staffer keeps moving.",
    lane: "calm",
  },
  {
    key: "loading",
    index: "03",
    caption: "Booking surface · spinning up",
    note: "First paint while the workshop dashboard hydrates. A branded skeleton holds the layout so nothing janks in.",
    lane: "disruption",
  },
  {
    key: "server-error",
    index: "04",
    caption: "Backend · fault registered",
    note: "A 500 from the quotes service. Torque is honest about it, surfaces the incident id, and keeps a retry one tap away.",
    lane: "disruption",
  },
  {
    key: "offline",
    index: "05",
    caption: "Mesh ping · timed out",
    note: "The tablet on the workshop floor dropped Wi-Fi. Torque keeps the last cached job sheet readable and retries quietly.",
    lane: "disruption",
  },
  {
    key: "maintenance",
    index: "06",
    caption: "Workshop · planned shutdown",
    note: "A scheduled upgrade window. Torque shows when it opens and when the booking surface is back, with no guesswork.",
    lane: "disruption",
  },
  {
    key: "success-confirmed",
    index: "07",
    caption: "Workshop · job confirmed",
    note: "A quote was paid and a bay reserved. Torque celebrates the win and confirms the next step in plain language.",
    lane: "calm",
  },
]

/* ---- Per-screen Torque copy ------------------------------------------------ */

export const EMPTY_INBOX_COPY = {
  headline: "All caught up at Oak Flats",
  message:
    "The inbox is clear — every quote reply, supplier note, and ADR confirmation has been handled. Bay 1 reopens at 8:30, so grab a coffee while it lasts.",
  stats: [
    { label: "Cleared today", value: "14" },
    { label: "Avg reply", value: "6m" },
    { label: "Open quotes", value: "0" },
  ],
} as const

export const EMPTY_RESULTS_COPY = {
  headline: "No fitment matched that search",
  query: "stainless catback — VF Commodore wagon",
  message:
    "Torque rolled through the supplier ledger and the workshop catalogue across the Illawarra. Nothing matched that exact build. Try a broader chassis match or one of the chips below.",
  suggestions: [
    "VE/VF catback",
    "3-inch stainless",
    "Redback headers",
    "Magnaflow muffler",
    "Resonated midpipe",
    "ADR-legal tip",
  ],
} as const

export const SERVER_ERROR_COPY = {
  headline: "The quotes service blew a gasket",
  message:
    "Our backend just dropped its midpipe mid-request. The Oak Flats tech team has been paged and is already under it. A retry usually clears it — if not, the status page has live updates.",
  errorCode: "500 · QUOTES SERVICE",
  incidentId: "OFM-INC-4471",
  occurredAt: "Thu 29 May · 9:42 AM AEST",
} as const

export const OFFLINE_COPY = {
  headline: "Lost the link to the workshop mesh",
  message:
    "The floor tablet dropped Wi-Fi, so live quotes and telemetry are paused. Torque will keep retrying in the background — no need to refresh.",
  retryCount: 3,
  lastOnlineAt: "9:38 AM",
  cachedDataNote:
    "You can still read the last opened job sheet, the ledger snapshot, and today's bay schedule straight from the local cache.",
} as const

export const MAINTENANCE_COPY = {
  headline: "We're on the tools — back shortly",
  message:
    "The booking surface is down for a scheduled upgrade. Quotes, invoices, and the workshop dashboard are paused while we tighten a few bolts behind the scenes.",
  startsAt: "2026-05-30 22:00",
  endsAt: "2026-05-30 23:30",
  affectedSurface: "BOOKINGS",
} as const

export const SUCCESS_COPY = {
  headline: "Locked in — see you in the workshop",
  message:
    "The quote is paid and the fitment slot is reserved. Torque has texted the workshop manager, so Bay 2 will be on the lift when the customer rolls up.",
  summary: [
    { label: "Reference", value: "Q-2841 · Oak Flats", emphasizeRef: true },
    { label: "Booked bay", value: "Bay 2 · 09:30 Thu" },
    { label: "Vehicle", value: "Hilux 2.8L · 3-inch system" },
    { label: "Total", value: "A$1,184 paid" },
  ],
} as const

/** Copy for the bespoke branded loading screen built from scratch in the scene. */
export const LOADING_COPY = {
  headline: "Warming up the workshop dashboard",
  message:
    "Torque is pulling today's bookings, the live bay status, and the quote queue for Oak Flats Muffler Men. This usually takes a second or two.",
  steps: ["Bay schedule", "Open quotes", "Supplier ledger"],
} as const
