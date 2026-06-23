/**
 * Shared mock data for the live-chat showcase routes.
 *
 * All Mufflermen-flavoured: Hilux fitment + Manta cat-back + quote follow-up
 * + warranty claim + parts availability. Operators are Jordan / Sophie / Bec.
 */

import type {
  ActiveChatMessage,
  ChatQueueItem,
  CustomerCartItem,
  KbSnippet,
  MultiChatTab,
  PresenceOperator,
  QuickReplyShortcut,
  TransferOperator,
  TransferTeamOption,
} from "../components/live-chat"
import type { MacroEntry } from "../components/support/macro-picker"
import type { InboxPerson } from "../components/inbox/inbox-types"

export const ME: InboxPerson = {
  id: "me",
  name: "Verridian Ops",
  kind: "team",
  presence: "online",
  role: "Live chat",
}

export const VISITOR_MICK: InboxPerson = {
  id: "visitor-mick",
  name: "Mick Davis",
  kind: "customer",
  presence: "online",
  role: "Hilux owner",
}

export const HILUX_MESSAGES: ReadonlyArray<ActiveChatMessage> = [
  {
    id: "m1",
    sender: "other",
    authorName: "Mick Davis",
    content:
      "G'day, will the Manta 3in cat-back fit a 2018 Hilux N80 with the long-range tank? Heard there's clearance dramas.",
    timestamp: "9:42 am",
  },
  {
    id: "m2",
    sender: "me",
    authorName: "Jordan",
    content:
      "Morning Mick. Yes — N80 with the long-range needs the high-clearance variant. We've fitted nine of those this quarter without dramas.",
    timestamp: "9:42 am",
    status: "read",
  },
  {
    id: "m3",
    sender: "other",
    authorName: "Mick Davis",
    content: "Sweet. Got Bay 2 free Friday arvo? Want it done before the trip up to Coffs.",
    timestamp: "9:43 am",
  },
  {
    id: "m4",
    sender: "me",
    authorName: "Jordan",
    content:
      "Bay 2 has a 1:30 pm slot Friday. I can pencil you in and post the ADR cheatsheet so you've got the paperwork sorted.",
    timestamp: "9:44 am",
    status: "delivered",
  },
]

export const QUEUE_ITEMS: ReadonlyArray<ChatQueueItem> = [
  {
    id: "q1",
    visitorName: "Mick Davis",
    pageTitle: "Manta 3in cat-back · N80 Hilux",
    preview: "Will it fit the long-range tank?",
    waitMinutes: 4,
    mine: true,
  },
  {
    id: "q2",
    visitorName: "Leah O'Donnell",
    pageTitle: "Quote · VF Commodore SS",
    preview: "Following up on Tuesday's quote.",
    waitMinutes: 7,
    mine: true,
  },
  {
    id: "q3",
    visitorName: "Anonymous visitor",
    pageTitle: "Warranty claim · Manta DPF",
    preview: "Bought a year ago, started rattling.",
    waitMinutes: 1,
    unassigned: true,
  },
  {
    id: "q4",
    visitorName: "Tom Beck",
    pageTitle: "Parts · Falcon BA mid-pipe",
    preview: "Is the mild steel one in stock?",
    waitMinutes: -2,
    unassigned: true,
  },
  {
    id: "q5",
    visitorName: "Anonymous visitor",
    pageTitle: "Bay 2 booking · ADR cheatsheet",
    preview: "Need the engineer's sign-off doc.",
    waitMinutes: 9,
    mine: false,
    unassigned: true,
  },
]

export const MULTI_CHAT_TABS: ReadonlyArray<MultiChatTab> = [
  { id: "q1", name: "Mick Davis", context: "Hilux fitment", unread: 0 },
  { id: "q2", name: "Leah O'Donnell", context: "Quote follow-up", unread: 2 },
  { id: "q3", name: "Anonymous", context: "Warranty claim", unread: 5 },
  { id: "q5", name: "Anonymous", context: "Bay 2 booking", unread: 1 },
]

export const HILUX_CART: ReadonlyArray<CustomerCartItem> = [
  {
    id: "p1",
    name: "Manta 3in cat-back · high-clear",
    quantity: 1,
    priceCents: 169500,
  },
  {
    id: "p2",
    name: "Engineer's ADR cert pack",
    quantity: 1,
    priceCents: 18500,
  },
]

export const MACRO_LIBRARY: ReadonlyArray<MacroEntry> = [
  {
    id: "macro-bay2",
    title: "Bay 2 booking",
    shortcut: "/bay2",
    category: "Bookings",
    body:
      "Hi {{visitor.firstName}}, Bay 2 has {{slot.label}} available on {{slot.date}}. I'll pencil you in now and send a calendar invite to {{visitor.email}} — sound good?",
    variables: [
      { token: "{{visitor.firstName}}", label: "Visitor first name" },
      { token: "{{slot.label}}", label: "Slot label, e.g. 1:30 pm" },
      { token: "{{slot.date}}", label: "Booked date" },
      { token: "{{visitor.email}}", label: "Visitor email" },
    ],
  },
  {
    id: "macro-adr",
    title: "ADR cheatsheet",
    shortcut: "/adr",
    category: "Compliance",
    body:
      "Here's the ADR cheatsheet for {{vehicle.model}} — covers the engineer's sign-off, the emissions tag spec and what you'll need at rego time.",
    variables: [
      { token: "{{vehicle.model}}", label: "Vehicle model" },
    ],
  },
  {
    id: "macro-quote",
    title: "AUD quote acknowledgement",
    shortcut: "/quote-ack",
    category: "Quotes",
    body:
      "Cheers {{visitor.firstName}} — quote received for {{quote.amount}} AUD inc GST. We hold quotes for 14 days. Let me know if you want to lock in Bay 2 while parts are still in stock.",
    variables: [
      { token: "{{visitor.firstName}}", label: "Visitor first name" },
      { token: "{{quote.amount}}", label: "Quote amount" },
    ],
  },
  {
    id: "macro-warranty",
    title: "Warranty triage",
    shortcut: "/warranty",
    category: "Warranty",
    body:
      "Sorry to hear that {{visitor.firstName}}. Manta cat-backs carry a 36-month warranty — can you grab the invoice number and a 10s phone video of the rattle so I can route this through the right channel?",
    variables: [
      { token: "{{visitor.firstName}}", label: "Visitor first name" },
    ],
  },
  {
    id: "macro-followup",
    title: "Follow-up tomorrow",
    shortcut: "/followup",
    category: "Routine",
    body:
      "I'll follow up tomorrow morning once Bay 2 confirms availability. If you don't hear from me by 10am, reply STATUS and I'll chase it.",
  },
]

export const QUICK_REPLY_SHORTCUTS: ReadonlyArray<QuickReplyShortcut> = [
  { id: "qr1", label: "Bay 2 booking", macroId: "macro-bay2" },
  { id: "qr2", label: "ADR cheatsheet", macroId: "macro-adr" },
  { id: "qr3", label: "AUD quote ack", macroId: "macro-quote" },
]

export const KB_SNIPPETS: ReadonlyArray<KbSnippet> = [
  {
    id: "kb1",
    title: "Hilux N80 long-range tank clearance guide",
    category: "Fitment",
    readMinutes: 4,
    preview:
      "Step-by-step on the 12mm clearance offset required for N80 trucks running the 130L long-range tank with a 3in cat-back.",
    matchScore: 0.94,
    href: "#",
  },
  {
    id: "kb2",
    title: "Manta cat-back warranty — what we cover",
    category: "Warranty",
    readMinutes: 3,
    preview:
      "Covers rattles, weld fatigue and mid-pipe corrosion within 36 months. Excludes off-road incidents and DPF removal.",
    matchScore: 0.71,
    href: "#",
  },
  {
    id: "kb3",
    title: "ADR cert flow for engineered exhausts",
    category: "Compliance",
    readMinutes: 6,
    preview:
      "Where the engineer's sign-off form lives, how long the cert lasts and which states accept the digital version.",
    matchScore: 0.62,
    href: "#",
  },
]

export const TEAM_PRESENCE: ReadonlyArray<PresenceOperator> = [
  {
    id: "jordan",
    name: "Jordan Riley",
    role: "Bay 2 Tech",
    status: "available",
    load: 3,
    capacity: 4,
  },
  {
    id: "sophie",
    name: "Sophie Tan",
    role: "Front desk",
    status: "available",
    load: 2,
    capacity: 3,
  },
  {
    id: "bec",
    name: "Bec Singh",
    role: "Parts counter",
    status: "in-wrap",
    load: 1,
    capacity: 3,
  },
  {
    id: "sam",
    name: "Sam Whittaker",
    role: "Workshop lead",
    status: "busy",
    load: 4,
    capacity: 4,
  },
  {
    id: "ash",
    name: "Ash Murray",
    role: "Apprentice",
    status: "away",
    load: 0,
    capacity: 2,
  },
]

export const TRANSFER_OPERATORS: ReadonlyArray<TransferOperator> = [
  {
    id: "sophie",
    name: "Sophie Tan",
    role: "Front desk · Bookings",
    status: "available",
    load: 2,
    capacity: 3,
  },
  {
    id: "bec",
    name: "Bec Singh",
    role: "Parts counter",
    status: "in-wrap",
    load: 1,
    capacity: 3,
  },
  {
    id: "sam",
    name: "Sam Whittaker",
    role: "Workshop lead",
    status: "busy",
    load: 4,
    capacity: 4,
  },
]

export const TRANSFER_TEAMS: ReadonlyArray<TransferTeamOption> = [
  { team: "Front desk", averageWait: 1, onlineCount: 2 },
  { team: "Bay 2 fitting", averageWait: 3, onlineCount: 1 },
  { team: "Parts counter", averageWait: 2, onlineCount: 2 },
  { team: "Warranty", averageWait: 6, onlineCount: 1 },
  { team: "Manager", averageWait: 8, onlineCount: 1 },
]

export const MENTION_CANDIDATES: ReadonlyArray<InboxPerson> = [
  {
    id: "sophie",
    name: "Sophie Tan",
    role: "Front desk",
    kind: "team",
    presence: "online",
  },
  {
    id: "bec",
    name: "Bec Singh",
    role: "Parts counter",
    kind: "team",
    presence: "online",
  },
]

export const SUGGESTED_TAGS: ReadonlyArray<string> = [
  "Hilux",
  "Manta cat-back",
  "Bay 2",
  "Long-range tank",
  "ADR cert",
]
