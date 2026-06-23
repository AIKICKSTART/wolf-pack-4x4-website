import type {
  BannerSpec,
  ChannelMatrixCell,
  DeliveryReportRowSpec,
  DigestScheduleValue,
  EventTemplateValue,
  NotificationCentreItem,
  NotificationChannelMeta,
  NotificationEventMeta,
  NotificationSoundPreset,
  PriorityRuleSpec,
  SnoozeDuration,
  ToastDescriptor,
} from "../components/notifications-system"

export const MOCK_TOASTS: ReadonlyArray<ToastDescriptor> = [
  {
    id: "t-quote",
    tone: "success",
    title: "Quote QF-0241 accepted",
    description: "Marcus accepted the catback + extractors package — booking opens.",
    actionLabel: "Open quote",
  },
  {
    id: "t-roadworthy",
    tone: "warning",
    title: "Roadworthy expiring in 9 days",
    description: "AGY-118 (2014 BA Falcon ute) due before 07 Jun — slot available Wed.",
    actionLabel: "Book inspection",
  },
  {
    id: "t-payment",
    tone: "danger",
    title: "Payment failed · INV-9931",
    description: "Card was declined for the FPV exhaust deposit. Customer notified.",
    actionLabel: "Retry capture",
  },
  {
    id: "t-info",
    tone: "info",
    title: "Hermes detected a recall hit",
    description: "Recall code 24-AB17 matches your vehicle list — 3 cars flagged.",
    actionLabel: "Review list",
  },
  {
    id: "t-success",
    tone: "success",
    title: "Service complete · Bay 3",
    description: "Job JC-7782 marked complete by Hermes. Pickup window open.",
    actionLabel: "Send pickup SMS",
  },
]

export const MOCK_TOAST_TICKING: ToastDescriptor = {
  id: "t-tick",
  tone: "warning",
  title: "Inventory low — Walker mid-muffler 50213",
  description: "Last unit reserved 14 min ago. Reorder window closes today 16:00.",
  actionLabel: "Reorder",
  durationMs: 6000,
}

export const MOCK_BANNERS: ReadonlyArray<BannerSpec> = [
  {
    id: "b-announce",
    variant: "announcement",
    title: "Weekend bay swap",
    message: "Bay 4 hoist offline Sat 31 May — bookings auto-rerouted to Bay 3.",
    ctaLabel: "View schedule",
  },
  {
    id: "b-alert",
    variant: "alert",
    title: "Twilio SMS provider degraded",
    message: "SMS delivery is queued and retrying. In-app and email unaffected.",
    ctaLabel: "Open status page",
  },
  {
    id: "b-promo",
    variant: "promo",
    title: "Winter exhaust special — ends 30 Jun",
    message: "Quote turnaround 24h, 10% off Magnaflow + Walker.",
    ctaLabel: "Quote a build",
  },
  {
    id: "b-maint",
    variant: "maintenance",
    title: "Hermes overnight retrain · 03:00 – 05:00 AEST",
    message: "Auto-responses paused for 2 hours. Manual queue continues.",
    dismissible: false,
  },
]

export const MOCK_CHANNELS: ReadonlyArray<NotificationChannelMeta> = [
  { id: "in-app", label: "In-app", hint: "Bell + center" },
  { id: "email", label: "Email", hint: "AWS SES" },
  { id: "sms", label: "SMS", hint: "Twilio AU" },
  { id: "push-web", label: "Push · web", hint: "PWA" },
  { id: "push-mobile", label: "Push · mobile", hint: "iOS / Android" },
]

export const MOCK_EVENTS: ReadonlyArray<NotificationEventMeta> = [
  {
    id: "quote-new",
    label: "Quote · new",
    description: "A customer requested a build estimate.",
    tone: "info",
  },
  {
    id: "quote-accepted",
    label: "Quote · accepted",
    description: "Customer accepted a sent quote.",
    tone: "success",
  },
  {
    id: "booking-confirmed",
    label: "Booking · confirmed",
    description: "Hoist slot locked in.",
    tone: "success",
  },
  {
    id: "booking-changed",
    label: "Booking · changed",
    description: "Customer or workshop moved the slot.",
    tone: "warning",
  },
  {
    id: "service-complete",
    label: "Service · complete",
    description: "Hermes marks job done — pickup window opens.",
    tone: "success",
  },
  {
    id: "invoice-paid",
    label: "Invoice · paid",
    description: "Stripe captured the customer payment.",
    tone: "success",
  },
  {
    id: "roadworthy-expiring",
    label: "Roadworthy · expiring",
    description: "Pink slip within 14 days of expiry.",
    tone: "warning",
  },
  {
    id: "recall-hit",
    label: "Recall · hit",
    description: "Govt recall matches a vehicle on file.",
    tone: "danger",
  },
  {
    id: "hermes-escalation",
    label: "Hermes · escalation",
    description: "Hermes flags a customer thread for a human.",
    tone: "warning",
  },
  {
    id: "inventory-low",
    label: "Inventory · low",
    description: "Stock dipped under workshop minimum.",
    tone: "info",
  },
  {
    id: "payment-failed",
    label: "Payment · failed",
    description: "Card was declined or reversed.",
    tone: "danger",
  },
]

export const MOCK_PREFERENCE_VALUE: ReadonlyArray<ChannelMatrixCell> = [
  { event: "quote-new", channel: "in-app", enabled: true },
  { event: "quote-new", channel: "email", enabled: true },
  { event: "quote-new", channel: "sms", enabled: false },
  { event: "quote-new", channel: "push-web", enabled: true },
  { event: "quote-new", channel: "push-mobile", enabled: false },

  { event: "quote-accepted", channel: "in-app", enabled: true },
  { event: "quote-accepted", channel: "email", enabled: true },
  { event: "quote-accepted", channel: "sms", enabled: true },
  { event: "quote-accepted", channel: "push-web", enabled: true },
  { event: "quote-accepted", channel: "push-mobile", enabled: true },

  { event: "booking-confirmed", channel: "in-app", enabled: true },
  { event: "booking-confirmed", channel: "email", enabled: true },
  { event: "booking-confirmed", channel: "sms", enabled: true },
  { event: "booking-confirmed", channel: "push-web", enabled: false },
  { event: "booking-confirmed", channel: "push-mobile", enabled: true },

  { event: "service-complete", channel: "in-app", enabled: true },
  { event: "service-complete", channel: "email", enabled: false },
  { event: "service-complete", channel: "sms", enabled: true },
  { event: "service-complete", channel: "push-web", enabled: true },
  { event: "service-complete", channel: "push-mobile", enabled: true },

  { event: "invoice-paid", channel: "in-app", enabled: true },
  { event: "invoice-paid", channel: "email", enabled: true },
  { event: "invoice-paid", channel: "sms", enabled: false },
  { event: "invoice-paid", channel: "push-web", enabled: false },
  { event: "invoice-paid", channel: "push-mobile", enabled: true },

  { event: "roadworthy-expiring", channel: "in-app", enabled: true },
  { event: "roadworthy-expiring", channel: "email", enabled: true },
  { event: "roadworthy-expiring", channel: "sms", enabled: true },
  { event: "roadworthy-expiring", channel: "push-web", enabled: false },
  { event: "roadworthy-expiring", channel: "push-mobile", enabled: false },

  { event: "recall-hit", channel: "in-app", enabled: true },
  { event: "recall-hit", channel: "email", enabled: true },
  { event: "recall-hit", channel: "sms", enabled: true },
  { event: "recall-hit", channel: "push-web", enabled: true },
  { event: "recall-hit", channel: "push-mobile", enabled: true },

  { event: "hermes-escalation", channel: "in-app", enabled: true },
  { event: "hermes-escalation", channel: "email", enabled: false },
  { event: "hermes-escalation", channel: "sms", enabled: false },
  { event: "hermes-escalation", channel: "push-web", enabled: true },
  { event: "hermes-escalation", channel: "push-mobile", enabled: true },

  { event: "inventory-low", channel: "in-app", enabled: true },
  { event: "inventory-low", channel: "email", enabled: true },
  { event: "inventory-low", channel: "sms", enabled: false },
  { event: "inventory-low", channel: "push-web", enabled: false },
  { event: "inventory-low", channel: "push-mobile", enabled: false },

  { event: "payment-failed", channel: "in-app", enabled: true },
  { event: "payment-failed", channel: "email", enabled: true },
  { event: "payment-failed", channel: "sms", enabled: true },
  { event: "payment-failed", channel: "push-web", enabled: true },
  { event: "payment-failed", channel: "push-mobile", enabled: true },

  { event: "booking-changed", channel: "in-app", enabled: true },
  { event: "booking-changed", channel: "email", enabled: true },
  { event: "booking-changed", channel: "sms", enabled: true },
  { event: "booking-changed", channel: "push-web", enabled: false },
  { event: "booking-changed", channel: "push-mobile", enabled: false },
]

export const MOCK_SNOOZE_DURATIONS: ReadonlyArray<SnoozeDuration> = [
  {
    id: "15m",
    label: "15 min",
    hint: "Resume at 09:48",
    resumesAt: "today · 09:48",
  },
  {
    id: "1h",
    label: "1 hour",
    hint: "Resume at 10:33",
    resumesAt: "today · 10:33",
  },
  {
    id: "today",
    label: "Today",
    hint: "Resume tomorrow 07:00",
    resumesAt: "tomorrow · 07:00",
  },
  {
    id: "until-mon",
    label: "Until Monday",
    hint: "Resume Mon 07:00",
    resumesAt: "Mon · 07:00",
  },
]

export const MOCK_DIGEST_DAILY: DigestScheduleValue = {
  cadence: "daily",
  hour: 7,
  minute: 30,
  timezone: "Australia/Sydney",
  recipients: 6,
}

export const MOCK_DIGEST_WEEKLY: DigestScheduleValue = {
  cadence: "weekly",
  weekday: "Sat",
  hour: 9,
  minute: 0,
  timezone: "Australia/Sydney",
  recipients: 412,
}

export const MOCK_SOUND_PRESETS: ReadonlyArray<NotificationSoundPreset> = [
  {
    id: "muffler-purr",
    label: "Muffler purr",
    hint: "Deep two-tone purr, signature workshop sound.",
  },
  {
    id: "tappet",
    label: "Tappet click",
    hint: "Crisp metallic click — workshop floor vibe.",
  },
  {
    id: "spanner-clink",
    label: "Spanner clink",
    hint: "Bright ringing clink — quick attention grabber.",
  },
  {
    id: "bay-bell",
    label: "Bay bell",
    hint: "Old-school workshop bell — three taps.",
  },
  {
    id: "silent",
    label: "Silent",
    hint: "No sound — counts on badge + vibration only.",
  },
]

export const MOCK_CENTRE_ITEMS: ReadonlyArray<NotificationCentreItem> = [
  {
    id: "n-001",
    tone: "danger",
    event: "payment-failed",
    title: "Invoice INV-9931 — payment declined",
    body: "Visa ending 4422 was declined for the FPV deposit. Customer texted twice; awaiting card update.",
    receivedAtISO: "2026-05-29T09:18:00+10:00",
    read: false,
    channel: "in-app",
  },
  {
    id: "n-002",
    tone: "warning",
    event: "hermes-escalation",
    title: "Hermes flagged · Jenna T.",
    body: "Customer asked about extractor warranty — Hermes confidence 0.41, please reply.",
    receivedAtISO: "2026-05-29T08:46:00+10:00",
    read: false,
    channel: "in-app",
  },
  {
    id: "n-003",
    tone: "success",
    event: "quote-accepted",
    title: "Quote QF-0241 accepted",
    body: "Marcus accepted catback + extractors. Booking auto-drafted for Wed 04 Jun.",
    receivedAtISO: "2026-05-29T08:11:00+10:00",
    read: false,
    channel: "email",
  },
  {
    id: "n-004",
    tone: "info",
    event: "inventory-low",
    title: "Stock low · Walker 50213",
    body: "Two units left. Lead time 9 days from Sydney warehouse.",
    receivedAtISO: "2026-05-29T07:32:00+10:00",
    read: true,
    channel: "in-app",
  },
  {
    id: "n-005",
    tone: "success",
    event: "service-complete",
    title: "Bay 3 — JC-7782 complete",
    body: "Hermes closed the job 12 minutes ago. Vehicle ready for pickup.",
    receivedAtISO: "2026-05-28T16:48:00+10:00",
    read: true,
    channel: "push-mobile",
  },
  {
    id: "n-006",
    tone: "warning",
    event: "roadworthy-expiring",
    title: "Roadworthy expiring · AGY-118",
    body: "2014 Falcon ute pink slip lapses 07 Jun. Customer SMS sent 09:02.",
    receivedAtISO: "2026-05-28T09:02:00+10:00",
    read: true,
    channel: "sms",
  },
  {
    id: "n-007",
    tone: "danger",
    event: "recall-hit",
    title: "Recall · 24-AB17 matches 3 vehicles",
    body: "Govt recall hits three Falcons in your service list. Notify owners.",
    receivedAtISO: "2026-05-27T13:24:00+10:00",
    read: true,
    channel: "email",
  },
]

export const MOCK_PRIORITY_RULES: ReadonlyArray<PriorityRuleSpec> = [
  {
    id: "rule-1",
    event: "payment-failed",
    ifUnreadMinutes: 5,
    action: "page",
    enabled: true,
  },
  {
    id: "rule-2",
    event: "hermes-escalation",
    ifUnreadMinutes: 15,
    action: "escalate",
    enabled: true,
  },
  {
    id: "rule-3",
    event: "recall-hit",
    ifUnreadMinutes: 10,
    action: "email-supervisor",
    enabled: true,
  },
  {
    id: "rule-4",
    event: "booking-changed",
    ifUnreadMinutes: 30,
    action: "sms-on-call",
    enabled: false,
  },
]

export const MOCK_TEMPLATE_INVOICE_PAID: EventTemplateValue = {
  event: "invoice-paid",
  channel: "email",
  subject: "Payment received — INV-{{invoice_id}}",
  body: "Hi {{first_name}},\n\nWe've received your payment of A${{amount}} for {{vehicle}}. Your receipt is attached.\n\nCheers,\nOak Flats Mufflermen",
  mergeTags: ["first_name", "invoice_id", "amount", "vehicle", "service_date"],
}

export const MOCK_TEMPLATE_SMS_PICKUP: EventTemplateValue = {
  event: "service-complete",
  channel: "sms",
  subject: "",
  body: "Hi {{first_name}}, {{vehicle}} is ready for pickup at Oak Flats Mufflermen. Workshop open until 17:00.",
  mergeTags: ["first_name", "vehicle", "bay_number"],
}

export const MOCK_DELIVERY_REPORTS: ReadonlyArray<DeliveryReportRowSpec> = [
  {
    id: "d-1",
    channel: "email",
    recipient: "marcus.t@gmail.com",
    subject: "Quote QF-0241 — catback + extractors",
    sentAtISO: "2026-05-29T09:14:00+10:00",
    status: "clicked",
    attempts: 1,
    latencyMs: 412,
  },
  {
    id: "d-2",
    channel: "sms",
    recipient: "+61 412 880 442",
    subject: "Bay 3 ready for pickup",
    sentAtISO: "2026-05-29T08:58:00+10:00",
    status: "delivered",
    attempts: 1,
    latencyMs: 1280,
  },
  {
    id: "d-3",
    channel: "push-mobile",
    recipient: "Jenna · iPhone 15",
    subject: "Hermes flagged your thread",
    sentAtISO: "2026-05-29T08:46:00+10:00",
    status: "opened",
    attempts: 1,
    latencyMs: 220,
  },
  {
    id: "d-4",
    channel: "sms",
    recipient: "+61 418 224 991",
    subject: "Roadworthy expiring · AGY-118",
    sentAtISO: "2026-05-28T09:02:00+10:00",
    status: "failed",
    attempts: 3,
    latencyMs: 9800,
  },
  {
    id: "d-5",
    channel: "email",
    recipient: "ops@mufflermen.com.au",
    subject: "Inventory low · Walker 50213",
    sentAtISO: "2026-05-28T07:32:00+10:00",
    status: "sent",
    attempts: 1,
    latencyMs: 380,
  },
  {
    id: "d-6",
    channel: "email",
    recipient: "old.address@oldmail.com",
    subject: "Workshop newsletter — May",
    sentAtISO: "2026-05-26T11:00:00+10:00",
    status: "bounced",
    attempts: 1,
    latencyMs: 540,
  },
  {
    id: "d-7",
    channel: "in-app",
    recipient: "Workshop · floor team",
    subject: "Bay swap notice — Sat 31 May",
    sentAtISO: "2026-05-26T10:12:00+10:00",
    status: "queued",
    attempts: 0,
  },
]
