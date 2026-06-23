import type {
  ChannelMatrixChannel,
  ChannelMatrixRow,
  ChannelMatrixValue,
  NotificationCardAction,
  NotificationHistoryGroup,
  NotificationPopoverItem,
  RuleSlotConfig,
} from "../components/notifications"

export const DEMO_POPOVER_ITEMS: ReadonlyArray<NotificationPopoverItem> = [
  {
    id: "n1",
    title: "Booking confirmed — Bay 02 at 09:30",
    sub: "Holden Commodore VZ · exhaust replacement",
    timestamp: "2 min ago",
    source: "Bookings",
    tone: "success",
    icon: "✓",
    unread: true,
    href: "/ui-primitives/notifications/card",
  },
  {
    id: "n2",
    title: "Quote Q-2415 approved by Marcus Wells",
    sub: "Stage 2 cat-back upgrade — $1,840 incl. labour",
    timestamp: "9 min ago",
    source: "Quotes",
    tone: "info",
    icon: "$",
    unread: true,
    mention: true,
    href: "/ui-primitives/notifications/card",
  },
  {
    id: "n3",
    title: "Invoice INV-1043 paid",
    sub: "Tradie Fleet Co — $612.50",
    timestamp: "32 min ago",
    source: "Billing",
    tone: "success",
    icon: "✓",
    href: "/ui-primitives/notifications/card",
  },
  {
    id: "n4",
    title: "Jordan @mentioned you on Job J-2103",
    sub: "\"Need a hand swapping the muffler on the HiLux\"",
    timestamp: "1 h ago",
    source: "Workshop",
    tone: "warn",
    icon: "@",
    unread: true,
    mention: true,
    href: "/ui-primitives/notifications/card",
  },
  {
    id: "n5",
    title: "Compressor maintenance overdue",
    sub: "Last service 89 days ago — schedule before next shift",
    timestamp: "3 h ago",
    source: "System",
    tone: "error",
    icon: "!",
    href: "/ui-primitives/notifications/card",
  },
  {
    id: "n6",
    title: "Stock alert — 4 mufflers below reorder threshold",
    timestamp: "Yesterday",
    source: "Inventory",
    tone: "warn",
    icon: "▾",
  },
  {
    id: "n7",
    title: "Lift bay sensor went offline briefly",
    sub: "Hoist 02 — back online after 4s",
    timestamp: "Yesterday",
    source: "Telemetry",
    tone: "info",
    icon: "~",
  },
]

export const DEMO_CARD_ACTIONS: ReadonlyArray<NotificationCardAction> = [
  { label: "Open booking", variant: "primary" },
  { label: "Reschedule", variant: "secondary" },
]

export const DEMO_HISTORY_GROUPS: ReadonlyArray<NotificationHistoryGroup> = [
  {
    date: "Today",
    items: [
      {
        id: "h1",
        title: "Booking confirmed — Bay 02 / 09:30",
        sub: "Holden Commodore VZ · exhaust replacement",
        time: "09:08",
        source: "Bookings",
        tone: "success",
        unread: true,
      },
      {
        id: "h2",
        title: "Quote Q-2415 approved",
        sub: "Stage 2 cat-back upgrade",
        time: "08:42",
        source: "Quotes",
        tone: "info",
        unread: true,
      },
      {
        id: "h3",
        title: "Jordan @mentioned you on Job J-2103",
        time: "07:58",
        source: "Workshop",
        tone: "warn",
        unread: true,
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        id: "h4",
        title: "Invoice INV-1043 paid",
        sub: "Tradie Fleet Co — $612.50",
        time: "16:24",
        source: "Billing",
        tone: "success",
      },
      {
        id: "h5",
        title: "Stock alert: aftermarket mufflers low",
        sub: "4 SKUs below threshold",
        time: "11:02",
        source: "Inventory",
        tone: "warn",
      },
      {
        id: "h6",
        title: "Hoist 02 sensor flickered",
        time: "09:31",
        source: "Telemetry",
        tone: "info",
      },
    ],
  },
  {
    date: "Tue 21 May",
    items: [
      {
        id: "h7",
        title: "Job J-2098 marked complete",
        sub: "Custom dual-tip install · Subaru WRX",
        time: "17:15",
        source: "Workshop",
        tone: "success",
      },
      {
        id: "h8",
        title: "Compressor maintenance overdue",
        time: "08:00",
        source: "System",
        tone: "error",
      },
    ],
  },
]

export const DEMO_CHANNEL_ROWS: ReadonlyArray<ChannelMatrixRow> = [
  { id: "booking", label: "Booking" },
  { id: "quote", label: "Quote" },
  { id: "job", label: "Job" },
  { id: "invoice", label: "Invoice" },
  { id: "mention", label: "Mention" },
  { id: "system", label: "System" },
  { id: "marketing", label: "Marketing" },
]

export const DEMO_CHANNELS: ReadonlyArray<ChannelMatrixChannel> = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "push", label: "Push" },
  { id: "inapp", label: "In-app" },
  { id: "slack", label: "Slack" },
]

export const DEMO_CHANNEL_VALUE: ChannelMatrixValue = {
  booking: { email: true, sms: true, push: true, inapp: true, slack: false },
  quote: { email: true, sms: false, push: true, inapp: true, slack: true },
  job: { email: false, sms: false, push: true, inapp: true, slack: true },
  invoice: { email: true, sms: false, push: false, inapp: true, slack: false },
  mention: { email: false, sms: false, push: true, inapp: true, slack: true },
  system: { email: true, sms: false, push: false, inapp: true, slack: false },
  marketing: { email: true, sms: false, push: false, inapp: false, slack: false },
}

export const DEMO_RULE_EVENT_SLOT: RuleSlotConfig = {
  kind: "event",
  label: "an event",
  defaultValue: "quote-approved",
  options: [
    { value: "booking-confirmed", label: "booking confirmed", hint: "Bookings" },
    { value: "quote-approved", label: "quote approved", hint: "Quotes" },
    { value: "job-completed", label: "job completed", hint: "Workshop" },
    { value: "invoice-paid", label: "invoice paid", hint: "Billing" },
    { value: "mention-received", label: "you are @mentioned", hint: "Team" },
  ],
}

export const DEMO_RULE_CHANNEL_SLOT: RuleSlotConfig = {
  kind: "channel",
  label: "a channel",
  defaultValue: "push-and-email",
  options: [
    { value: "email", label: "email" },
    { value: "push", label: "push only" },
    { value: "sms", label: "SMS only" },
    { value: "push-and-email", label: "push + email", hint: "Combined" },
    { value: "slack", label: "Slack #workshop" },
  ],
}

export const DEMO_RULE_DELAY_SLOT: RuleSlotConfig = {
  kind: "delay",
  label: "a delay",
  defaultValue: "immediately",
  options: [
    { value: "immediately", label: "immediately" },
    { value: "5m", label: "5 minutes" },
    { value: "1h", label: "1 hour" },
    { value: "next-business", label: "next business hour" },
  ],
}

export const DEMO_RULE_CONDITION_SLOT: RuleSlotConfig = {
  kind: "condition",
  label: "a condition",
  defaultValue: "quiet-hours",
  options: [
    { value: "quiet-hours", label: "in quiet hours" },
    { value: "weekend", label: "on weekend" },
    { value: "low-priority", label: "marked low priority" },
    { value: "self-actor", label: "I am the actor" },
  ],
}
