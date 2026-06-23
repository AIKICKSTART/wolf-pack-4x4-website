/* Shared mock data for the support sub-routes + full-helpdesk composition. */

import type {
  CsatBreakdownEntry,
  CustomerPriorTicket,
  CustomerProfileNote,
  CustomerVehicle,
  LinkedArticleSuggestion,
  MacroEntry,
  MultiChannelInboxFilter,
  MultiChannelInboxTab,
  SupportConversationEntry,
  TicketPriority,
  TicketStatus,
} from "../components/support"
import type { InternalMentionCandidate } from "../components/support"

export interface MufflermenTicket {
  id: string
  subject: string
  customerName: string
  status: TicketStatus
  priority: TicketPriority
  assignee?: string
  lastUpdate: string
  slaRemainingMinutes: number
  slaLabel?: string
}

export const TICKET_QUEUE: ReadonlyArray<MufflermenTicket> = [
  {
    id: "MM-4187",
    subject: "Hilux fitment query — Manta 3in cat-back",
    customerName: "Mick Davis",
    status: "open",
    priority: "p1",
    assignee: "Sarah Pope",
    lastUpdate: "3m ago",
    slaRemainingMinutes: 42,
    slaLabel: "First response",
  },
  {
    id: "MM-4192",
    subject: "Quote escalation — Patrol Y62 twin 3in",
    customerName: "Wayne Sutton",
    status: "pending",
    priority: "p2",
    assignee: "Tom Gillan",
    lastUpdate: "11m ago",
    slaRemainingMinutes: 145,
    slaLabel: "Resolution",
  },
  {
    id: "MM-4198",
    subject: "Bay 2 reschedule — Wednesday 9:30 AEST",
    customerName: "Jess Holloway",
    status: "open",
    priority: "p2",
    lastUpdate: "21m ago",
    slaRemainingMinutes: 380,
    slaLabel: "Resolution",
  },
  {
    id: "MM-4201",
    subject: "Manta warranty claim — cracked tail flange",
    customerName: "Brett Adamthwaite",
    status: "new",
    priority: "p1",
    lastUpdate: "1m ago",
    slaRemainingMinutes: 18,
    slaLabel: "First response",
  },
  {
    id: "MM-4204",
    subject: "Customer SMS delivery — booking 27 May",
    customerName: "Aisha Rahman",
    status: "on-hold",
    priority: "p3",
    assignee: "Workshop ops",
    lastUpdate: "1h ago",
    slaRemainingMinutes: -32,
    slaLabel: "Resolution",
  },
  {
    id: "MM-4178",
    subject: "Critical — Pickup delayed, tow truck inbound",
    customerName: "Devon Maxwell",
    status: "open",
    priority: "p0",
    assignee: "Sarah Pope",
    lastUpdate: "just now",
    slaRemainingMinutes: 8,
    slaLabel: "First response",
  },
]

export const HILUX_CONVERSATION: ReadonlyArray<SupportConversationEntry> = [
  {
    id: "conv-1",
    author: "Mick Davis",
    role: "Customer",
    timestamp: "Today · 09:14 AEST",
    body: "Gday, after a Manta 3in cat-back for my 2019 Hilux SR5 auto. Manta said it ships separately to the Mufflermen tip. Will it bolt up clean or do I need to weld a new flange?",
    channel: "email",
    visibility: "public",
  },
  {
    id: "conv-2",
    author: "Sarah Pope",
    role: "Workshop · Bay 2",
    timestamp: "Today · 10:42 AEST",
    body: "Cheers Mick. The Manta DPF-back is plug-and-play if your tip is the 4in rolled angle. Got photos of the existing flange? Happy to confirm fitment before quoting.",
    channel: "email",
    visibility: "public",
  },
  {
    id: "conv-3",
    author: "Sarah Pope",
    role: "Workshop · Bay 2",
    timestamp: "Today · 10:43 AEST",
    body: "Internal note — Mick is our 4th Hilux SR5 this week with the rolled angle tip. Heads up to Bay 1 if they bowl up: pre-cut the flange template, save 20 mins.",
    channel: "email",
    visibility: "internal",
  },
  {
    id: "conv-4",
    author: "Mick Davis",
    role: "Customer",
    timestamp: "Today · 11:08 AEST",
    body: "Photos attached. Looks like the rolled angle. What's the install slot looking like — Friday avo?",
    channel: "sms",
    visibility: "public",
  },
  {
    id: "conv-5",
    author: "Sarah Pope",
    role: "Workshop · Bay 2",
    timestamp: "Today · 11:31 AEST",
    body: "Confirmed rolled angle. Bay 2 has a 13:00 Friday slot. ETA 90 mins, $1,840 fitted incl. drive-on dyno verify.",
    channel: "sms",
    visibility: "public",
  },
]

export const TEAM_MENTIONS: ReadonlyArray<InternalMentionCandidate> = [
  { id: "u-1", name: "Sarah Pope", role: "Workshop · Bay 2" },
  { id: "u-2", name: "Tom Gillan", role: "Quotes · Senior" },
  { id: "u-3", name: "Bec Lawson", role: "Workshop manager" },
  { id: "u-4", name: "Daniel Fleuren", role: "Ops" },
]

export const MACRO_LIBRARY: ReadonlyArray<MacroEntry> = [
  {
    id: "macro-1",
    title: "Booking confirmation",
    shortcut: "/book-ok",
    category: "Bookings",
    body: "G'day {{customer.firstName}}, your booking is locked in for {{booking.date}} at {{booking.time}} in {{booking.bay}}. ETA on the floor is {{booking.eta}}. Bring the keys, we'll handle the rest.\n\nCheers,\nThe Mufflermen team",
    variables: [
      { token: "{{customer.firstName}}", label: "First name" },
      { token: "{{booking.date}}", label: "Booking date" },
      { token: "{{booking.time}}", label: "Booking time" },
      { token: "{{booking.bay}}", label: "Assigned bay" },
      { token: "{{booking.eta}}", label: "Floor ETA" },
    ],
  },
  {
    id: "macro-2",
    title: "Quote follow-up",
    shortcut: "/quote-bump",
    category: "Quotes",
    body: "Hey {{customer.firstName}}, just bumping the quote for the {{vehicle.description}}. Total still sits at {{quote.total}} parts + fit. Lock it in this week and we'll throw in the dyno verify on the house.",
    variables: [
      { token: "{{customer.firstName}}", label: "First name" },
      { token: "{{vehicle.description}}", label: "Vehicle" },
      { token: "{{quote.total}}", label: "Quote total" },
    ],
  },
  {
    id: "macro-3",
    title: "Manta warranty claim — opened",
    shortcut: "/warranty-open",
    category: "Warranty",
    body: "Hey {{customer.firstName}}, claim opened with Manta on the {{part.sku}}. Reference {{claim.ref}}. Manta turnaround is usually 5 working days — we'll ping you the moment we hear back.",
    variables: [
      { token: "{{customer.firstName}}", label: "First name" },
      { token: "{{part.sku}}", label: "Part SKU" },
      { token: "{{claim.ref}}", label: "Claim reference" },
    ],
  },
  {
    id: "macro-4",
    title: "Bay reschedule",
    shortcut: "/bay-resched",
    category: "Bookings",
    body: "Hey {{customer.firstName}}, the workshop's had to bump your {{booking.date}} slot. Closest swap is {{booking.new_date}} at {{booking.new_time}}. That work?",
    variables: [
      { token: "{{customer.firstName}}", label: "First name" },
      { token: "{{booking.date}}", label: "Original date" },
      { token: "{{booking.new_date}}", label: "Proposed date" },
      { token: "{{booking.new_time}}", label: "Proposed time" },
    ],
  },
  {
    id: "macro-5",
    title: "Pickup-ready",
    shortcut: "/pickup",
    category: "Workshop",
    body: "Your {{vehicle.description}} is ready for pickup. Workshop closes at {{workshop.close_time}}. Bring photo ID + the original booking ref.",
    variables: [
      { token: "{{vehicle.description}}", label: "Vehicle" },
      { token: "{{workshop.close_time}}", label: "Workshop close time" },
    ],
  },
]

export const CSAT_BREAKDOWN: ReadonlyArray<CsatBreakdownEntry> = [
  { rating: 5, count: 184 },
  { rating: 4, count: 64 },
  { rating: 3, count: 18 },
  { rating: 2, count: 6 },
  { rating: 1, count: 2 },
]

export const LINKED_ARTICLES: ReadonlyArray<LinkedArticleSuggestion> = [
  {
    id: "kb-1",
    title: "Hilux SR5 cat-back fitment — rolled angle vs cut tip",
    category: "Fitment guides",
    matchScore: 94,
    href: "/ui-primitives/support/linked-articles-suggester",
  },
  {
    id: "kb-2",
    title: "Manta warranty claim — opening, evidence and timelines",
    category: "Warranty policy",
    matchScore: 81,
    href: "/ui-primitives/support/linked-articles-suggester",
  },
  {
    id: "kb-3",
    title: "Bay reschedule — same-week and next-week windows",
    category: "Bookings",
    matchScore: 67,
    href: "/ui-primitives/support/linked-articles-suggester",
  },
  {
    id: "kb-4",
    title: "DPF-back vs cat-back — what we recommend and why",
    category: "Buying guides",
    matchScore: 54,
    href: "/ui-primitives/support/linked-articles-suggester",
  },
]

export const MICK_VEHICLES: ReadonlyArray<CustomerVehicle> = [
  { description: "2019 Toyota Hilux SR5 4WD 2.8L Auto", rego: "BX42-OD" },
  { description: "2014 Toyota LandCruiser 79 Single Cab", rego: "TY09-MV" },
]

export const MICK_PRIOR_TICKETS: ReadonlyArray<CustomerPriorTicket> = [
  {
    id: "MM-3982",
    subject: "Extractors — Landcruiser 79 1HD-FTE",
    status: "closed",
  },
  {
    id: "MM-4061",
    subject: "Hilux DPF blockage — workshop diagnosis",
    status: "resolved",
  },
  {
    id: "MM-4109",
    subject: "Dyno verify quote — Hilux",
    status: "resolved",
  },
]

export const MICK_NOTES: ReadonlyArray<CustomerProfileNote> = [
  {
    id: "note-1",
    author: "Sarah Pope",
    body: "Prefers SMS over email for scheduling. Mate of Wayne Sutton.",
    timestamp: "12 Apr 2026",
  },
  {
    id: "note-2",
    author: "Bec Lawson",
    body: "Pays on the day, never on terms. Always brings a coffee for Bay 2.",
    timestamp: "08 Feb 2026",
  },
]

export const INBOX_TABS: ReadonlyArray<MultiChannelInboxTab> = [
  { channel: "email", count: 18 },
  { channel: "chat", count: 7 },
  { channel: "sms", count: 11 },
  { channel: "phone", count: 3 },
  { channel: "x", count: 2 },
  { channel: "facebook", count: 4 },
]

export const INBOX_FILTERS: ReadonlyArray<MultiChannelInboxFilter> = [
  { id: "open", label: "Open only", active: true },
  { id: "mine", label: "Assigned to me" },
  { id: "p0p1", label: "P0 + P1" },
  { id: "breached", label: "SLA breached" },
  { id: "today", label: "Created today" },
]
