import type {
  Conversation,
  InboxPerson,
  PinnedMessage,
  ReactionEmoji,
  ReadReceipt,
  ThreadReplySummary,
} from "../components/inbox/inbox-types"

function buildWaveform(count: number, seed: number): ReadonlyArray<number> {
  return Array.from({ length: count }, (_, index) => {
    const base = Math.sin((index + seed) * 0.32) * 0.32
    const swell = Math.sin(seed + index * 0.11) * 0.28
    const grit = Math.sin(index * 0.7 + seed * 1.3) * 0.18
    return Math.max(0.08, Math.min(0.98, 0.5 + base + swell + grit))
  })
}

export const PEOPLE = {
  jordan: {
    id: "jordan",
    name: "Jordan Riley",
    role: "Bay 2 Tech",
    kind: "team",
    presence: "online",
  },
  sophie: {
    id: "sophie",
    name: "Sophie Tan",
    role: "Front Desk",
    kind: "team",
    presence: "online",
  },
  daniel: {
    id: "daniel",
    name: "Daniel P.",
    role: "Parts Runner",
    kind: "team",
    presence: "away",
  },
  mick: {
    id: "mick",
    name: "Mick Davis",
    role: "Hilux Owner",
    kind: "customer",
    presence: "online",
  },
  leah: {
    id: "leah",
    name: "Leah O'Donnell",
    role: "VF Commodore",
    kind: "customer",
    presence: "offline",
  },
  sam: {
    id: "sam",
    name: "Sam Whittaker",
    role: "Workshop Lead",
    kind: "team",
    presence: "busy",
  },
  ash: {
    id: "ash",
    name: "Ash Murray",
    role: "Apprentice",
    kind: "team",
    presence: "online",
  },
  tom: {
    id: "tom",
    name: "Tom Beck",
    role: "Falcon BA Owner",
    kind: "customer",
    presence: "away",
  },
} as const satisfies Record<string, InboxPerson>

export const ME: InboxPerson = {
  id: "me",
  name: "Verridian Ops",
  role: "Foreman",
  kind: "team",
  presence: "online",
}

export const DEMO_CONVERSATIONS: ReadonlyArray<Conversation> = [
  {
    id: "c-mick",
    participant: PEOPLE.mick,
    lastMessagePreview:
      "Will the 3-inch system clear the Hilux factory diff drop?",
    lastMessageAt: "9:42a",
    unreadCount: 3,
    isCustomer: true,
    hasMention: true,
    active: true,
  },
  {
    id: "c-jordan",
    participant: PEOPLE.jordan,
    lastMessagePreview: "Bay 2 ready — got the lift open for the LS swap.",
    lastMessageAt: "9:31a",
    unreadCount: 0,
  },
  {
    id: "c-sophie",
    participant: PEOPLE.sophie,
    lastMessagePreview: "Quote sent to the BA Falcon owner, copying you in.",
    lastMessageAt: "9:14a",
    unreadCount: 1,
  },
  {
    id: "c-daniel",
    participant: PEOPLE.daniel,
    lastMessagePreview:
      "Parts pickup ETA from Hi-Flow Wollongong is 11:30am.",
    lastMessageAt: "8:58a",
    unreadCount: 0,
  },
  {
    id: "c-leah",
    participant: PEOPLE.leah,
    lastMessagePreview:
      "Sounds great — see you Friday for the VF Commodore install.",
    lastMessageAt: "yest",
    unreadCount: 0,
    isCustomer: true,
  },
  {
    id: "c-sam",
    participant: PEOPLE.sam,
    lastMessagePreview: "Need a hand on the dyno calibration after lunch?",
    lastMessageAt: "yest",
    unreadCount: 2,
    hasMention: true,
  },
  {
    id: "c-ash",
    participant: PEOPLE.ash,
    lastMessagePreview: "Cleaned the welding station — restocked tips too.",
    lastMessageAt: "Mon",
    unreadCount: 0,
  },
  {
    id: "c-tom",
    participant: PEOPLE.tom,
    lastMessagePreview: "Cheers boys, mufflers sound mint.",
    lastMessageAt: "Sat",
    unreadCount: 0,
    isCustomer: true,
  },
]

export const DEMO_MEMO_WAVEFORM = buildWaveform(48, 11)

export const DEMO_REACTIONS: ReadonlyArray<ReactionEmoji> = [
  { id: "thumbs-up", glyph: "👍", label: "Thumbs up" },
  { id: "fire", glyph: "🔥", label: "Fire" },
  { id: "wrench", glyph: "🔧", label: "Wrench" },
  { id: "muscle", glyph: "💪", label: "Strong" },
  { id: "spark", glyph: "✨", label: "Spark" },
  { id: "celebrate", glyph: "🎉", label: "Celebrate" },
]

export const DEMO_PINNED: ReadonlyArray<PinnedMessage> = [
  {
    id: "p-1",
    author: PEOPLE.sam,
    preview:
      "Hilux quote template lives in Drive › Quotes › 2026 › Stainless three-inch.",
    pinnedAt: "Mon 10:12a",
  },
  {
    id: "p-2",
    author: PEOPLE.sophie,
    preview:
      "Customer pickup runs from 7:30am — please log all rego tags into Hermes before handover.",
    pinnedAt: "Tue 8:02a",
  },
  {
    id: "p-3",
    author: PEOPLE.jordan,
    preview:
      "Bay 2 hoist is booked exclusively for LS swaps Thursday + Friday.",
    pinnedAt: "Wed 4:46p",
  },
]

export const DEMO_READ_RECEIPTS: ReadonlyArray<ReadReceipt> = [
  { id: "r-1", reader: PEOPLE.sophie, readAt: "9:48a" },
  { id: "r-2", reader: PEOPLE.jordan, readAt: "9:46a" },
  { id: "r-3", reader: PEOPLE.daniel, readAt: "9:44a" },
  { id: "r-4", reader: PEOPLE.ash, readAt: "9:43a" },
]

export const DEMO_THREAD_SUMMARY: ThreadReplySummary = {
  count: 4,
  lastReplyAt: "9:38a",
  repliers: [PEOPLE.jordan, PEOPLE.sophie, PEOPLE.daniel],
}

export const MENTION_CANDIDATES: ReadonlyArray<InboxPerson> = [
  PEOPLE.jordan,
  PEOPLE.sophie,
  PEOPLE.daniel,
  PEOPLE.sam,
  PEOPLE.ash,
]
