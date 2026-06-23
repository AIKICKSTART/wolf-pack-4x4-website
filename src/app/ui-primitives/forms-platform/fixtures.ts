import type {
  ConditionalLogicRule,
  DataExportPreset,
  DataExportRange,
  FieldConfigDraft,
  FormBuilderCanvasField,
  FormBuilderPaletteSection,
  FormPublishTarget,
  FormWizardStep,
  FunnelStageDatum,
  NotificationRule,
  PaymentFieldDraft,
  SpamShieldRule,
  SubmissionAnswerRow,
  SubmissionAuditEvent,
  SubmissionInboxEntry,
  UploadedFileEntry,
  WebhookTrigger,
} from "../components/forms-platform"

export const PALETTE_SECTIONS: ReadonlyArray<FormBuilderPaletteSection> = [
  {
    id: "text",
    title: "Text",
    items: [
      { id: "p-short", label: "Short text", type: "short-text", hint: "Single line" },
      { id: "p-long", label: "Long text", type: "long-text", hint: "Multi-line" },
      { id: "p-email", label: "Email", type: "email" },
      { id: "p-phone", label: "Phone", type: "phone" },
    ],
  },
  {
    id: "selection",
    title: "Selection",
    items: [
      { id: "p-dropdown", label: "Dropdown", type: "dropdown" },
      { id: "p-multi", label: "Multi-select", type: "multi-select" },
      { id: "p-yesno", label: "Yes / No", type: "yes-no" },
    ],
  },
  {
    id: "media",
    title: "Media & payments",
    items: [
      { id: "p-upload", label: "File upload", type: "file-upload", hint: "ClamAV scan" },
      { id: "p-signature", label: "Signature", type: "signature" },
      { id: "p-payment", label: "Payment", type: "payment", hint: "Stripe AU" },
    ],
  },
]

export const BOOK_SERVICE_FIELDS: ReadonlyArray<FormBuilderCanvasField> = [
  {
    id: "f-vehicle-rego",
    type: "short-text",
    label: "Vehicle registration",
    required: true,
    helperText: "e.g. ABC-123 (NSW)",
    tone: "teal",
  },
  {
    id: "f-vehicle-model",
    type: "dropdown",
    label: "Vehicle make / model",
    required: true,
    helperText: "Holden HSV VL Walkinshaw, Ford Falcon BA, etc.",
  },
  {
    id: "f-service-type",
    type: "multi-select",
    label: "Service required",
    required: true,
    helperText: "Exhaust · Muffler · Catalytic converter · Custom build",
    tone: "amber",
  },
  {
    id: "f-preferred-date",
    type: "date",
    label: "Preferred drop-off date",
    helperText: "We confirm within 1 business day",
  },
  {
    id: "f-deposit",
    type: "payment",
    label: "Booking deposit",
    helperText: "$150 AUD — refundable if cancelled 24h ahead",
    tone: "green",
  },
]

export const FIELD_CONFIG_DRAFT: FieldConfigDraft = {
  id: "f-service-type",
  label: "Service required",
  type: "multi-select",
  placeholder: "Pick all that apply",
  helperText: "Respondents can choose more than one workshop service.",
  defaultValue: "Muffler swap",
  required: true,
  options: [
    { id: "o-exhaust", label: "Exhaust system", value: "exhaust" },
    { id: "o-muffler", label: "Muffler swap", value: "muffler" },
    { id: "o-cat", label: "Catalytic converter", value: "catalytic" },
    { id: "o-custom", label: "Custom build", value: "custom" },
    { id: "o-other", label: "Other (specify)", value: "other" },
  ],
}

export const INBOX_ENTRIES: ReadonlyArray<SubmissionInboxEntry> = [
  {
    id: "s-001",
    formName: "Book a Service",
    submitter: "Mick Stafford",
    submitterEmail: "mick.s@oldmate.com.au",
    submittedAt: "2026-05-29 09:14",
    status: "new",
    preview: "VL Walkinshaw · full exhaust + 2.5\" tailpipe",
    amount: "$150.00",
    unread: true,
  },
  {
    id: "s-002",
    formName: "Request Quote",
    submitter: "Daniela Souza",
    submitterEmail: "dsouza@verridian.ai",
    submittedAt: "2026-05-29 08:42",
    status: "reviewing",
    preview: "BA Falcon · tigertail muffler, low rumble",
    unread: true,
  },
  {
    id: "s-003",
    formName: "Trade Account Apply",
    submitter: "Northshore Performance",
    submitterEmail: "accounts@nsp.com.au",
    submittedAt: "2026-05-28 16:08",
    status: "approved",
    preview: "ABN 84 219 553 022 · NET-30 requested",
  },
  {
    id: "s-004",
    formName: "Newsletter Signup",
    submitter: "Petra Yip",
    submitterEmail: "petra@graveltyres.com",
    submittedAt: "2026-05-28 13:45",
    status: "new",
    preview: "Wants V8 club builds, drag-strip prep",
  },
  {
    id: "s-005",
    formName: "Warranty Claim",
    submitter: "Joel Carmichael",
    submitterEmail: "joelcarm@gmail.com",
    submittedAt: "2026-05-28 10:21",
    status: "rejected",
    preview: "Cracked weld on 18-month warranty",
    amount: "$0.00",
  },
  {
    id: "s-006",
    formName: "Book a Service",
    submitter: "Anonymous · 203.0.113.42",
    submittedAt: "2026-05-28 03:11",
    status: "spam",
    preview: "viagra cheap luxury watches no rx",
  },
]

export const SPAM_SHIELD_RULES: ReadonlyArray<SpamShieldRule> = [
  {
    id: "ss-honeypot",
    defence: "honeypot",
    label: "Honeypot field",
    state: "armed",
    blocked: 8,
    hint: "Hidden 'website' input — bots auto-fill it",
  },
  {
    id: "ss-turnstile",
    defence: "turnstile",
    label: "Cloudflare Turnstile",
    state: "armed",
    blocked: 3,
    hint: "Invisible challenge · failover from reCAPTCHA",
  },
  {
    id: "ss-rate",
    defence: "rate-limit",
    label: "Per-IP rate limit",
    state: "warning",
    blocked: 1,
    hint: "5 submits / 10 min · borderline traffic detected",
  },
  {
    id: "ss-recaptcha",
    defence: "captcha-v3",
    label: "reCAPTCHA v3",
    state: "disabled",
    blocked: 0,
    hint: "Disabled — Turnstile preferred",
  },
]

export const PAYMENT_FIELD_DRAFT: PaymentFieldDraft = {
  id: "p-deposit",
  label: "Booking deposit",
  amountAud: 150,
  tipLabel: "Add a tip for the crew",
  tipPercents: [0, 5, 10, 15],
  tippingEnabled: true,
  captureCardholder: true,
  stripeKey: "pk_live_OAK_…AUD",
}

export const UPLOAD_FILES: ReadonlyArray<UploadedFileEntry> = [
  {
    id: "u-1",
    name: "VL-walkinshaw-rear-quarter.heic",
    sizeLabel: "4.2 MB",
    kind: "image/heic",
    progress: 100,
    scanState: "clean",
  },
  {
    id: "u-2",
    name: "rego-papers-2026.pdf",
    sizeLabel: "812 KB",
    kind: "application/pdf",
    progress: 100,
    scanState: "clean",
  },
  {
    id: "u-3",
    name: "stock-exhaust-photo.jpg",
    sizeLabel: "2.1 MB",
    kind: "image/jpeg",
    progress: 64,
    scanState: "scanning",
  },
  {
    id: "u-4",
    name: "supplier_invoice_macro.docm",
    sizeLabel: "187 KB",
    kind: "macro-doc",
    progress: 100,
    scanState: "infected",
  },
]

export const CONDITIONAL_RULES: ReadonlyArray<ConditionalLogicRule> = [
  {
    id: "r-1",
    label: "Show tow rating if vehicle is 4WD",
    match: "all",
    enabled: true,
    conditions: [
      { id: "c-1", sourceField: "vehicle_type", operator: "equals", value: "4WD" },
    ],
    action: "show",
    targetField: "tow_rating_kg",
  },
  {
    id: "r-2",
    label: "Require deposit if service > $1,200",
    match: "all",
    enabled: true,
    conditions: [
      { id: "c-2", sourceField: "quote_total", operator: "greater-than", value: "1200" },
    ],
    action: "require",
    targetField: "booking_deposit",
  },
  {
    id: "r-3",
    label: "Skip Stripe page on trade account",
    match: "any",
    enabled: false,
    conditions: [
      { id: "c-3", sourceField: "account_type", operator: "equals", value: "trade" },
      { id: "c-4", sourceField: "abn_verified", operator: "is-not-empty", value: "" },
    ],
    action: "skip-page",
    targetField: "payment_page",
  },
]

export const WIZARD_STEPS: ReadonlyArray<FormWizardStep> = [
  { id: "w-1", index: 1, title: "Vehicle", state: "complete", fieldCount: 4 },
  { id: "w-2", index: 2, title: "Service scope", state: "complete", fieldCount: 5 },
  { id: "w-3", index: 3, title: "Drop-off & contact", state: "current", progress: 60, fieldCount: 4 },
  { id: "w-4", index: 4, title: "Payment", state: "upcoming", fieldCount: 3 },
  { id: "w-5", index: 5, title: "Review & confirm", state: "upcoming", fieldCount: 0 },
]

export const SUBMISSION_ANSWERS: ReadonlyArray<SubmissionAnswerRow> = [
  { id: "a-1", label: "Vehicle registration", value: "WLK-318 (NSW)" },
  { id: "a-2", label: "Make / model", value: "Holden VL Walkinshaw Group A", meta: "Build 318 of 750" },
  { id: "a-3", label: "Service required", value: "Custom 2.5\" stainless system + tigertail muffler" },
  { id: "a-4", label: "Drop-off date", value: "2026-06-03 · Wednesday", meta: "Bay 2 reserved by Hermes" },
  { id: "a-5", label: "Vehicle photos", value: "3 files attached", meta: "12.4 MB · clamAV clean" },
  { id: "a-6", label: "Special notes", value: "Concours-spec — preserve original heat-shielding", flagged: true },
  { id: "a-7", label: "Booking deposit", value: "$150.00 AUD", meta: "Stripe AU · pi_3OakK…AUD" },
]

export const SUBMISSION_AUDIT: ReadonlyArray<SubmissionAuditEvent> = [
  { id: "av-1", timestamp: "09:14:02", actor: "Hermes", message: "Submission received from /book", tone: "teal" },
  { id: "av-2", timestamp: "09:14:03", actor: "Anti-spam", message: "Honeypot + Turnstile passed · score 0.94", tone: "green" },
  { id: "av-3", timestamp: "09:14:04", actor: "Stripe", message: "Deposit captured · $150.00 AUD", tone: "green" },
  { id: "av-4", timestamp: "09:15:18", actor: "Bay 2", message: "Reserved for 2026-06-03 09:00", tone: "amber" },
  { id: "av-5", timestamp: "09:15:19", actor: "Mick (Workshop)", message: "Flagged 'special notes' for review", tone: "violet" },
]

export const NOTIFICATION_RULES: ReadonlyArray<NotificationRule> = [
  {
    id: "n-1",
    trigger: "on-submit",
    channel: "email",
    recipient: "workshop@mufflermen.com.au",
    templateLabel: "Workshop intake digest",
    enabled: true,
  },
  {
    id: "n-2",
    trigger: "on-payment",
    channel: "sms",
    recipient: "+61 412 408 219",
    templateLabel: "Owner: deposit received · $amount",
    enabled: true,
  },
  {
    id: "n-3",
    trigger: "on-submit",
    channel: "slack",
    recipient: "#bookings",
    templateLabel: "Hermes: new booking · rego · service",
    enabled: true,
  },
  {
    id: "n-4",
    trigger: "on-rejection",
    channel: "webhook",
    recipient: "hermes.oakflats.local/v1/submission",
    templateLabel: "submission.rejected payload",
    enabled: false,
  },
]

export const EXPORT_PRESETS: ReadonlyArray<DataExportPreset> = [
  { id: "x-csv", label: "Submissions CSV", format: "csv", rowsEstimate: 64 },
  { id: "x-json", label: "Hermes JSON", format: "json", rowsEstimate: 64 },
  { id: "x-xls", label: "Accounting XLS", format: "xls", rowsEstimate: 18 },
  { id: "x-pdf", label: "PDF report", format: "pdf", rowsEstimate: 1 },
]

export const EXPORT_RANGE: DataExportRange = {
  from: "2026-05-01",
  to: "2026-05-29",
  caption: "Last 28 days · Mufflermen forms",
}

export const WEBHOOK_TRIGGERS: ReadonlyArray<WebhookTrigger> = [
  {
    id: "wh-1",
    endpoint: "https://hermes.oakflats.local/v1/booking",
    event: "on-submit",
    status: "delivered",
    lastDelivery: "2 min ago",
    samplePayload: `{
  "form": "book-service",
  "submission_id": "s-001",
  "rego": "WLK-318",
  "service": ["exhaust", "muffler"],
  "deposit_aud": 150.00
}`,
  },
  {
    id: "wh-2",
    endpoint: "https://hermes.oakflats.local/v1/payment",
    event: "on-payment",
    status: "retrying",
    lastDelivery: "9 min ago",
    retries: 2,
    samplePayload: `{
  "form": "book-service",
  "submission_id": "s-001",
  "amount_aud": 150.00,
  "stripe_pi": "pi_3OakK…",
  "status": "succeeded"
}`,
  },
  {
    id: "wh-3",
    endpoint: "https://api.xero.com/api.xro/2.0/Invoices",
    event: "on-approval",
    status: "failed",
    lastDelivery: "1h 12m ago",
    retries: 5,
    samplePayload: `{
  "Invoices": [{
    "Type": "ACCREC",
    "Contact": { "Name": "Northshore Performance" },
    "LineAmountTypes": "Exclusive"
  }]
}`,
  },
]

export const PUBLISH_TARGETS: ReadonlyArray<FormPublishTarget> = [
  { id: "inline-embed", label: "Inline embed", description: "Drops into any page" },
  { id: "popup", label: "Popup", description: "Triggered by CTA button" },
  { id: "share-link", label: "Share link", description: "Standalone hosted page" },
  { id: "qr-code", label: "QR code", description: "Workshop counter card" },
]

export const PUBLISH_EMBED_SNIPPET = `<script src="https://forms.mufflermen.com.au/embed.js" async defer></script>
<div data-mufflermen-form="book-service" data-theme="workshop-dark"></div>`

export const PUBLISH_SHARE_LINK =
  "https://forms.mufflermen.com.au/book-service"

export const FUNNEL_STAGES: ReadonlyArray<FunnelStageDatum> = [
  { stage: "started", label: "Started", count: 482, retentionPct: 100 },
  { stage: "halfway", label: "Halfway", count: 321, retentionPct: 67 },
  { stage: "submitted", label: "Submitted", count: 196, retentionPct: 41 },
  { stage: "abandoned", label: "Abandoned", count: 286, retentionPct: 59 },
]
