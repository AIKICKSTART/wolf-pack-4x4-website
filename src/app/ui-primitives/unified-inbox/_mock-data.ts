/**
 * Shared mock data for the unified-inbox showcase routes.
 *
 * Mufflermen-flavoured front desk: Tim (manager), Mia (counter),
 * Daniel (admin). Conversations span SMS, Facebook DM, Instagram DM,
 * email and web chat — DPF clean question from Mick D, quote follow-up
 * from Karen W (flagged upset after 3 reschedules), refund request from
 * Bec S, plus a couple more to round out the queue.
 */

import type { ChannelStatusEntry } from "../components/unified-inbox"
import type {
  AutoReplyKind,
  ColorTag,
  MacroChip,
  UnifiedChannel,
  UnifiedConversation,
  UnifiedCustomerProfile,
  UnifiedPriority,
  UnifiedRecentJob,
  UnifiedSentiment,
  UnifiedTeammate,
  UnifiedThreadMessage,
} from "../components/unified-inbox"

export const TEAM: ReadonlyArray<UnifiedTeammate> = [
  {
    id: "tim",
    name: "Tim Whitaker",
    role: "Manager · Workshop",
    presence: "online",
    workload: 4,
    capacity: 6,
  },
  {
    id: "mia",
    name: "Mia Rourke",
    role: "Counter · Front desk",
    presence: "online",
    workload: 5,
    capacity: 6,
  },
  {
    id: "daniel",
    name: "Daniel Park",
    role: "Admin · Bookings",
    presence: "away",
    workload: 2,
    capacity: 4,
  },
  {
    id: "ash",
    name: "Ash Murray",
    role: "Apprentice · Floor",
    presence: "busy",
    workload: 3,
    capacity: 3,
  },
  {
    id: "bec",
    name: "Bec Singh",
    role: "Parts counter",
    presence: "offline",
    workload: 0,
    capacity: 3,
  },
]

export const TAG_LIBRARY: ReadonlyArray<ColorTag> = [
  { id: "tag-dpf", label: "DPF clean", tone: "teal" },
  { id: "tag-quote", label: "Quote follow-up", tone: "amber" },
  { id: "tag-refund", label: "Refund request", tone: "red" },
  { id: "tag-warranty", label: "Warranty", tone: "amber" },
  { id: "tag-vip", label: "VIP customer", tone: "violet" },
  { id: "tag-booking", label: "Booking", tone: "teal" },
  { id: "tag-installed", label: "Installed", tone: "green" },
  { id: "tag-urgent", label: "Urgent", tone: "red" },
]

const tagsById = new Map(TAG_LIBRARY.map((tag) => [tag.id, tag]))

export function resolveTags(ids: ReadonlyArray<string>): ReadonlyArray<ColorTag> {
  const tags: ColorTag[] = []
  for (const id of ids) {
    const tag = tagsById.get(id)
    if (tag) tags.push(tag)
  }
  return tags
}

export const CONVERSATIONS: ReadonlyArray<UnifiedConversation> = [
  {
    id: "conv-mick",
    channel: "sms" satisfies UnifiedChannel,
    customerName: "Mick D.",
    subject: "DPF clean question — Hilux",
    preview:
      "Hey team, is it worth doing a full DPF clean before the long-range trip?",
    timestamp: "9:42 am",
    unreadCount: 2,
    sentiment: "neutral" satisfies UnifiedSentiment,
    priority: "normal" satisfies UnifiedPriority,
    assigneeId: "tim",
    tagIds: ["tag-dpf"],
    active: true,
  },
  {
    id: "conv-karen",
    channel: "facebook",
    customerName: "Karen W.",
    subject: "Quote follow-up — VF Commodore",
    preview:
      "This is the third time I've had to reschedule. Are you going to honour the quote or not?",
    timestamp: "9:18 am",
    unreadCount: 5,
    sentiment: "upset",
    priority: "urgent",
    assigneeId: "mia",
    tagIds: ["tag-quote", "tag-urgent"],
  },
  {
    id: "conv-bec",
    channel: "email",
    customerName: "Bec S.",
    subject: "Refund request — cancelled DPF",
    preview:
      "Hi team, the part wasn't compatible so we never installed it. Could we process a refund?",
    timestamp: "8:54 am",
    unreadCount: 1,
    sentiment: "negative",
    priority: "high",
    assigneeId: "daniel",
    tagIds: ["tag-refund"],
  },
  {
    id: "conv-jase",
    channel: "instagram",
    customerName: "Jase T.",
    subject: "Manta cat-back DM",
    preview:
      "Saw your Reel — keen on the 3in cat-back for my BA Falcon. Cheers!",
    timestamp: "Yesterday",
    sentiment: "positive",
    priority: "low",
    tagIds: ["tag-quote"],
  },
  {
    id: "conv-erin",
    channel: "web",
    customerName: "Anonymous visitor",
    subject: "Web chat · Bay 2 availability",
    preview: "Any spots Friday afternoon for a hoist + photos?",
    timestamp: "9:31 am",
    unreadCount: 3,
    sentiment: "neutral",
    priority: "normal",
    tagIds: ["tag-booking"],
  },
  {
    id: "conv-tom",
    channel: "sms",
    customerName: "Tom B.",
    subject: "Falcon BA mid-pipe stock",
    preview: "Mild steel one in stock? Need it before the weekend run.",
    timestamp: "Yesterday",
    sentiment: "positive",
    priority: "normal",
    assigneeId: "mia",
    tagIds: ["tag-installed"],
  },
]

export const CONVERSATION_MICK = CONVERSATIONS[0]
export const CONVERSATION_KAREN = CONVERSATIONS[1]
export const CONVERSATION_BEC = CONVERSATIONS[2]

export const MICK_THREAD: ReadonlyArray<UnifiedThreadMessage> = [
  {
    id: "m-mick-1",
    direction: "inbound",
    authorName: "Mick D.",
    body: "Hey team, is it worth doing a full DPF clean before the long-range trip up to Coffs next month?",
    timestamp: "9:38 am",
    channel: "sms",
  },
  {
    id: "m-mick-2",
    direction: "outbound",
    authorName: "Tim Whitaker",
    body: "Morning Mick — if the diff drop is still factory and you're towing the van, a DPF clean now will save you a regen mid-trip. We can book Bay 2 Thursday arvo if that suits.",
    timestamp: "9:40 am",
    channel: "sms",
    read: true,
  },
  {
    id: "m-mick-3",
    direction: "inbound",
    authorName: "Mick D.",
    body: "Sweet, Thursday arvo works. Also — same trip I'll be on the long-range tank so I need the high-clearance variant. Will the 3in cat-back still bolt up?",
    timestamp: "9:41 am",
    channel: "sms",
  },
  {
    id: "m-mick-4",
    direction: "outbound",
    authorName: "Tim Whitaker",
    body: "Yep, the Manta high-clear N80 kit is the one. I'll pencil you in Thursday 1:30pm + grab the kit off the shelf so it's ready.",
    timestamp: "9:42 am",
    channel: "sms",
    read: false,
  },
]

export const KAREN_THREAD: ReadonlyArray<UnifiedThreadMessage> = [
  {
    id: "m-karen-1",
    direction: "inbound",
    authorName: "Karen W.",
    body: "This is the third time you've shifted the date. The wedding's on Saturday — am I getting the VF back or do I need to call my brother in law's shop?",
    timestamp: "9:14 am",
    channel: "facebook",
  },
  {
    id: "m-karen-2",
    direction: "inbound",
    authorName: "Karen W.",
    body: "And if the answer's no, I want the quote honoured at the original price — you can post it.",
    timestamp: "9:16 am",
    channel: "facebook",
  },
  {
    id: "m-karen-3",
    direction: "outbound",
    authorName: "Mia Rourke",
    body: "Karen — totally hear you and we have dropped the ball. Sam is hands on it now, you'll have the VF back Friday before 4pm and the original quote is locked. I'll DM you a calendar invite + the engineer's cert in the next 10 minutes.",
    timestamp: "9:18 am",
    channel: "facebook",
    read: false,
  },
]

export const MACROS: ReadonlyArray<MacroChip> = [
  {
    id: "macro-dpf",
    label: "DPF triage",
    category: "Triage",
    body: "Hi {{customer.firstName}}, a DPF clean before a long-range trip is a smart call — we book those Tuesday + Thursday arvos. Want me to pencil you in?",
    variables: [
      { token: "{{customer.firstName}}", label: "Customer first name" },
    ],
  },
  {
    id: "macro-quote",
    label: "Quote held",
    category: "Quotes",
    body: "{{customer.firstName}}, the quote of {{quote.amount}} AUD is held until {{quote.expiry}}. Reply LOCK and I'll grab a Bay 2 slot for you.",
    variables: [
      { token: "{{customer.firstName}}", label: "Customer first name" },
      { token: "{{quote.amount}}", label: "Quote amount" },
      { token: "{{quote.expiry}}", label: "Quote expiry date" },
    ],
  },
  {
    id: "macro-refund",
    label: "Refund acknowledgement",
    category: "Refunds",
    body: "Hi {{customer.firstName}}, processing a refund on the part takes 2 business days back to the original card. I'll send the receipt the moment it clears.",
    variables: [
      { token: "{{customer.firstName}}", label: "Customer first name" },
    ],
  },
  {
    id: "macro-apology",
    label: "Reschedule apology",
    category: "Recovery",
    body: "We owe you a straight answer {{customer.firstName}}. The VF is back on the hoist now and Sam will personally call you when it's wrapped. Original quote stands.",
    variables: [
      { token: "{{customer.firstName}}", label: "Customer first name" },
    ],
  },
]

export const MICK_PROFILE: UnifiedCustomerProfile = {
  id: "cust-mick",
  name: "Mick Davis",
  email: "mick.d@example.com.au",
  phone: "+61 412 803 277",
  locality: "Oak Flats NSW · Hilux owner",
  lifetimeValueCents: 1284_500,
  jobCount: 4,
}

export const MICK_RECENT_JOBS: ReadonlyArray<UnifiedRecentJob> = [
  {
    id: "job-mick-1",
    title: "Manta cat-back fit · N80 Hilux",
    completedAt: "12 Apr 2026",
    totalCents: 169_500,
  },
  {
    id: "job-mick-2",
    title: "DPF clean + injector service",
    completedAt: "08 Jan 2026",
    totalCents: 64_200,
  },
  {
    id: "job-mick-3",
    title: "ADR cert pack · engineer sign-off",
    completedAt: "21 Nov 2025",
    totalCents: 18_500,
  },
]

export const CHANNEL_HEALTH: ReadonlyArray<ChannelStatusEntry> = [
  {
    channel: "sms",
    state: "connected",
    handle: "0418 088 211",
    lastSync: "2m ago",
  },
  {
    channel: "facebook",
    state: "connected",
    handle: "Oak Flats Muffler Shop",
    lastSync: "8m ago",
  },
  {
    channel: "instagram",
    state: "expired",
    handle: "@oakflatsmufflermen",
    lastSync: "3h ago",
  },
  {
    channel: "email",
    state: "connected",
    handle: "support@mufflermen.au",
    lastSync: "Just now",
  },
  {
    channel: "web",
    state: "degraded",
    handle: "mufflermen.au · widget",
    lastSync: "12m ago",
  },
]

export const AUTO_REPLY_RULES: ReadonlyArray<{
  id: string
  kind: AutoReplyKind
  title: string
  body: string
  schedule: string
  channels: ReadonlyArray<UnifiedChannel>
  enabled: boolean
}> = [
  {
    id: "rule-after-hours",
    kind: "out-of-hours",
    title: "Out-of-hours auto reply",
    body: "Thanks for messaging Mufflermen — we're off the tools till 7:30am tomorrow. Hot leads still get a callback first thing.",
    schedule: "Mon–Fri after 5:30pm + weekends",
    channels: ["sms", "facebook", "instagram", "email", "web"],
    enabled: true,
  },
  {
    id: "rule-away",
    kind: "away-message",
    title: "Away message · counter cover",
    body: "Mia's at the counter helping a customer — she'll reply within 15 minutes. For urgent fitment questions, call 02 4256 1188.",
    schedule: "Triggers when no operator replies in 5m",
    channels: ["facebook", "instagram", "web"],
    enabled: true,
  },
  {
    id: "rule-first-touch",
    kind: "first-touch",
    title: "First-touch acknowledgement",
    body: "Got it — Tim's checking the workshop diary and will be back to you in a few. Cheers!",
    schedule: "First inbound message of a new conversation",
    channels: ["sms", "email"],
    enabled: false,
  },
]
