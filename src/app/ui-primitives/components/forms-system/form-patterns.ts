export type FormPatternId =
  | "contact"
  | "newsletter"
  | "booking"
  | "vehicle-intake"
  | "quote-request"
  | "address"
  | "search-filter"
  | "file-upload"
  | "feedback-review"
  | "survey-nps"
  | "auth-security"
  | "account-team-settings"
  | "billing-payment-tax"
  | "quote-authoring-signature"
  | "calendar-scheduling"
  | "compliance-kyc-consent"
  | "supplier-ops"
  | "roster-workshop-ops"
  | "builder-editor-admin-rules"
  | "support-comment-composer"
  | "commerce-checkout"
  | "notification-permissions"
  | "email-campaign-builder"

export type FormDomain =
  | "Website"
  | "Workshop"
  | "Parts"
  | "Commerce"
  | "CMS"
  | "Operations"
  | "Governance"
  | "Agent"
  | "Marketing"

export interface FormPattern {
  id: FormPatternId
  title: string
  shortTitle: string
  domain: FormDomain
  family: string
  description: string
  route?: string
  source: "forms-gallery" | "forms-system"
  intent:
    | "Capture"
    | "Schedule"
    | "Configure"
    | "Verify"
    | "Authorize"
    | "Compose"
    | "Search"
    | "Upload"
    | "Survey"
    | "Checkout"
  usedBy: ReadonlyArray<string>
  fields: ReadonlyArray<string>
  states: ReadonlyArray<string>
}

export type FormDnaRoleId = "label" | "hint" | "field" | "select" | "error" | "submit"

export interface FormDnaRole {
  id: FormDnaRoleId
  title: string
  foundation: "Wireframes" | "Layouts" | "Sizing" | "Surfaces" | "Typography" | "Actions" | "Selection" | "Feedback"
  token: string
  contract: string
  output: string
}

export interface FormDnaState {
  state: string
  owner: "Feedback" | "Surfaces" | "Actions" | "Selection"
  contract: string
}

export interface FormFoundationLink {
  source: "Wireframes" | "Layouts" | "Sizing" | "Surfaces" | "Typography" | "Actions" | "Selection" | "Feedback"
  route: string
  contract: string
}

export const FORM_DNA_ROLES: ReadonlyArray<FormDnaRole> = [
  {
    id: "label",
    title: "Label",
    foundation: "Typography",
    token: "--primitive-text-2xs / --primitive-font-mono",
    contract: "Every control has a visible label or fieldset legend before the control surface.",
    output: "label text, legend, group label",
  },
  {
    id: "hint",
    title: "Hint",
    foundation: "Typography",
    token: "--primitive-body / --primitive-muted",
    contract: "Helper text is connected with aria-describedby and never replaces an error.",
    output: "hint text, format note, privacy note",
  },
  {
    id: "field",
    title: "Field",
    foundation: "Sizing",
    token: "--primitive-size-field-md",
    contract: "Text, email, password, textarea, date, and search controls inherit field height, radius, focus, and recessed surface.",
    output: "input, textarea, field wrapper",
  },
  {
    id: "select",
    title: "Select",
    foundation: "Selection",
    token: "--primitive-size-field-md",
    contract: "Menus, radio groups, chips, toggles, and native selects use one choice-state grammar.",
    output: "select, radio cards, chips, toggles",
  },
  {
    id: "error",
    title: "Error",
    foundation: "Feedback",
    token: "--primitive-red / --primitive-focus-ring",
    contract: "Invalid states reserve message space, expose role or aria-invalid semantics, and keep focus visible.",
    output: "error row, invalid border, status copy",
  },
  {
    id: "submit",
    title: "Submit",
    foundation: "Actions",
    token: "--primitive-size-command-sm",
    contract: "Submit and reset actions use Actions DNA for sizing, disabled state, destructive state, and success transition.",
    output: "submit rail, reset command, local success status",
  },
]

export const FORM_DNA_STATES: ReadonlyArray<FormDnaState> = [
  {
    state: "Idle",
    owner: "Surfaces",
    contract: "Field surface is recessed and readable before interaction.",
  },
  {
    state: "Focus",
    owner: "Surfaces",
    contract: "Focus ring uses the shared focus token and does not shift layout.",
  },
  {
    state: "Filled",
    owner: "Selection",
    contract: "Filled controls keep label, value, and helper text visible.",
  },
  {
    state: "Invalid",
    owner: "Feedback",
    contract: "Error copy appears in the reserved message slot.",
  },
  {
    state: "Submitting",
    owner: "Actions",
    contract: "Submit command owns pending feedback and keeps secondary actions available when safe.",
  },
  {
    state: "Success",
    owner: "Feedback",
    contract: "Success state is local to the demo unless a production route wires a real endpoint.",
  },
]

export const FORM_FOUNDATION_CHAIN: ReadonlyArray<FormFoundationLink> = [
  {
    source: "Wireframes",
    route: "/ui-primitives/wireframes",
    contract: "Form sections inherit page, card, control-row, overlay, and mobile anatomy.",
  },
  {
    source: "Layouts",
    route: "/ui-primitives/layouts",
    contract: "Field grids, sticky metadata, two-column panels, and mobile stacks follow the approved splits.",
  },
  {
    source: "Sizing",
    route: "/ui-primitives/sizing",
    contract: "Fields, rows, icon wells, buttons, chips, and cards use named component-size tokens.",
  },
  {
    source: "Surfaces",
    route: "/ui-primitives/surfaces",
    contract: "Form panels, field wells, focus surfaces, and success/error rows inherit material recipes.",
  },
  {
    source: "Actions",
    route: "/ui-primitives/actions",
    contract: "Submit, reset, upload, save, verify, and queue commands use the canonical action layer.",
  },
  {
    source: "Selection",
    route: "/ui-primitives/selection",
    contract: "Radio cards, chips, toggles, select menus, and active filters share choice-state taxonomy.",
  },
  {
    source: "Feedback",
    route: "/ui-primitives/feedback",
    contract: "Validation, pending, success, warning, and fault responses use one feedback language.",
  },
]

export const FORM_PATTERNS: ReadonlyArray<FormPattern> = [
  {
    id: "contact",
    title: "Workshop contact",
    shortTitle: "Contact",
    domain: "Website",
    family: "Public enquiry",
    description: "Name, email, phone, subject, message, attachment slot, and consent.",
    route: "/ui-primitives/forms-gallery/contact",
    source: "forms-gallery",
    intent: "Capture",
    usedBy: ["forms-gallery", "support", "quote request", "service pages"],
    fields: ["name", "email", "phone", "subject", "message", "consent"],
    states: ["idle", "attached", "submitted"],
  },
  {
    id: "newsletter",
    title: "Newsletter signup",
    shortTitle: "Newsletter",
    domain: "Marketing",
    family: "Subscription",
    description: "Compact email capture with success state and unsubscribe promise.",
    route: "/ui-primitives/forms-gallery/newsletter",
    source: "forms-gallery",
    intent: "Capture",
    usedBy: ["forms-gallery", "email-builder", "marketing", "footer"],
    fields: ["email"],
    states: ["idle", "submitted"],
  },
  {
    id: "booking",
    title: "Workshop booking",
    shortTitle: "Booking",
    domain: "Workshop",
    family: "Scheduling",
    description: "Rego, date picker, slot selection, drop-off mode, callback, and confirmation.",
    route: "/ui-primitives/forms-gallery/booking",
    source: "forms-gallery",
    intent: "Schedule",
    usedBy: ["forms-gallery", "booking-widget", "calendar", "workshop scenes"],
    fields: ["rego", "date", "slot", "drop mode", "callback"],
    states: ["date selected", "slot selected", "submitted"],
  },
  {
    id: "vehicle-intake",
    title: "Vehicle intake",
    shortTitle: "Vehicle intake",
    domain: "Workshop",
    family: "Vehicle profile",
    description: "Rego lookup, make/model/year, engine, body, fuel, photo tray, and notes.",
    route: "/ui-primitives/forms-gallery/vehicle-intake",
    source: "forms-gallery",
    intent: "Capture",
    usedBy: ["forms-gallery", "booking-widget", "quotes", "workshop scenes"],
    fields: ["rego", "make", "model", "year", "engine", "body", "fuel", "notes"],
    states: ["lookup", "photos attached", "locked"],
  },
  {
    id: "quote-request",
    title: "Quote request wizard",
    shortTitle: "Quote request",
    domain: "Website",
    family: "Quote intake",
    description: "Three-step vehicle, service multi-select, contact, and audience flow.",
    route: "/ui-primitives/forms-gallery/quote-request",
    source: "forms-gallery",
    intent: "Capture",
    usedBy: ["forms-gallery", "quotes", "CRM", "homepage CTA"],
    fields: ["vehicle", "services", "name", "email", "phone", "audience"],
    states: ["step 1", "step 2", "step 3", "submitted"],
  },
  {
    id: "address",
    title: "Address capture",
    shortTitle: "Address",
    domain: "Commerce",
    family: "Billing and delivery",
    description: "Country, street autocomplete, suburb, state, postcode, and delivery override.",
    route: "/ui-primitives/forms-gallery/address",
    source: "forms-gallery",
    intent: "Capture",
    usedBy: ["forms-gallery", "billing", "commerce", "KYC"],
    fields: ["country", "street", "suburb", "state", "postcode", "delivery address"],
    states: ["autocomplete", "delivery override", "saved"],
  },
  {
    id: "search-filter",
    title: "Search and filter",
    shortTitle: "Search filter",
    domain: "Parts",
    family: "Catalog discovery",
    description: "Keyword, price range, category, vehicle, supplier toggle, and sort menu.",
    route: "/ui-primitives/forms-gallery/search-filter",
    source: "forms-gallery",
    intent: "Search",
    usedBy: ["forms-gallery", "search", "parts pages", "file browser"],
    fields: ["keyword", "price", "category", "vehicle", "supplier", "sort"],
    states: ["expanded groups", "selected filters", "applied"],
  },
  {
    id: "file-upload",
    title: "File upload",
    shortTitle: "Upload",
    domain: "CMS",
    family: "Evidence and media",
    description: "Drop zone, file list, progress, type/size validation, remove, and submit.",
    route: "/ui-primitives/forms-gallery/file-upload",
    source: "forms-gallery",
    intent: "Upload",
    usedBy: ["forms-gallery", "file-browser", "email-builder", "KYC", "supplier portal"],
    fields: ["files", "type", "size", "progress"],
    states: ["drag active", "uploading", "done", "error"],
  },
  {
    id: "feedback-review",
    title: "Feedback and review",
    shortTitle: "Feedback",
    domain: "Website",
    family: "Customer sentiment",
    description: "Star rating, category, title, message, photo attachment, and anonymity toggle.",
    route: "/ui-primitives/forms-gallery/feedback",
    source: "forms-gallery",
    intent: "Survey",
    usedBy: ["forms-gallery", "reviews", "support", "emails"],
    fields: ["rating", "category", "title", "message", "anonymous"],
    states: ["hover rating", "photo attached", "submitted"],
  },
  {
    id: "survey-nps",
    title: "Survey and NPS",
    shortTitle: "Survey",
    domain: "Marketing",
    family: "Research",
    description: "Recommendation scale, multi-select improvements, ranked list, notes, and slider.",
    route: "/ui-primitives/forms-gallery/survey",
    source: "forms-gallery",
    intent: "Survey",
    usedBy: ["forms-gallery", "surveys", "reviews", "roster"],
    fields: ["score", "improvements", "ranked reasons", "notes", "satisfaction"],
    states: ["progress", "ranked", "submitted"],
  },
  {
    id: "auth-security",
    title: "Auth and security",
    shortTitle: "Auth",
    domain: "CMS",
    family: "Identity",
    description: "Login, password, OTP, recovery, session trust, and security consent.",
    source: "forms-system",
    intent: "Verify",
    usedBy: ["auth", "KYC", "permissions", "supplier portal"],
    fields: ["email", "password", "OTP", "remember device"],
    states: ["idle", "invalid", "verifying", "trusted"],
  },
  {
    id: "account-team-settings",
    title: "Account and team settings",
    shortTitle: "Account",
    domain: "CMS",
    family: "Workspace settings",
    description: "Profile, team invite, role, bay assignment, notification preference, and save state.",
    source: "forms-system",
    intent: "Configure",
    usedBy: ["account", "team", "notifications", "permissions"],
    fields: ["display name", "email", "role", "bay", "digest"],
    states: ["dirty", "saved", "invite ready"],
  },
  {
    id: "billing-payment-tax",
    title: "Billing, payment, and tax",
    shortTitle: "Billing",
    domain: "Commerce",
    family: "Payment settings",
    description: "Card details, billing address, ABN, invoice contact, tax toggle, and receipt email.",
    source: "forms-system",
    intent: "Authorize",
    usedBy: ["billing", "account", "commerce", "quotes"],
    fields: ["card", "expiry", "CVC", "ABN", "billing email", "country"],
    states: ["brand detected", "validated", "saved"],
  },
  {
    id: "quote-authoring-signature",
    title: "Quote authoring and signature",
    shortTitle: "Quote authoring",
    domain: "Workshop",
    family: "Quote to cash",
    description: "Line item editing, discount, terms, signer, signature method, and acceptance.",
    source: "forms-system",
    intent: "Compose",
    usedBy: ["quotes", "workshop scenes", "CRM", "print docs"],
    fields: ["line title", "quantity", "discount", "terms", "signer", "signature"],
    states: ["draft", "sent", "signed"],
  },
  {
    id: "calendar-scheduling",
    title: "Calendar scheduling",
    shortTitle: "Calendar",
    domain: "Workshop",
    family: "Availability",
    description: "Date range, time, recurrence, bay, technician, and conflict check.",
    source: "forms-system",
    intent: "Schedule",
    usedBy: ["calendar", "booking-widget", "roster", "workshop scenes"],
    fields: ["date range", "time", "recurrence", "bay", "technician"],
    states: ["available", "conflict", "scheduled"],
  },
  {
    id: "compliance-kyc-consent",
    title: "Compliance, KYC, and consent",
    shortTitle: "Compliance",
    domain: "Governance",
    family: "Regulated data",
    description: "Identity evidence, declaration, consent, data request, policy version, and signoff.",
    source: "forms-system",
    intent: "Verify",
    usedBy: ["compliance", "KYC", "permissions", "print docs"],
    fields: ["document", "declaration", "policy", "consent", "signature"],
    states: ["pending", "review", "approved"],
  },
  {
    id: "supplier-ops",
    title: "Supplier operations",
    shortTitle: "Supplier ops",
    domain: "Operations",
    family: "Supplier portal",
    description: "Catalog upload, SKU creation, order acknowledgement, invoice, and compliance cert.",
    source: "forms-system",
    intent: "Upload",
    usedBy: ["supplier-portal", "inventory", "billing", "parts pages"],
    fields: ["supplier", "SKU", "price", "lead time", "invoice", "certificate"],
    states: ["queued", "submitted", "needs review"],
  },
  {
    id: "roster-workshop-ops",
    title: "Roster and workshop ops",
    shortTitle: "Roster",
    domain: "Operations",
    family: "People and bays",
    description: "Time off, shift swap, technician profile, bay assignment, and training signoff.",
    source: "forms-system",
    intent: "Schedule",
    usedBy: ["roster", "workshop scenes", "calendar", "account"],
    fields: ["technician", "shift", "reason", "coverage", "approval"],
    states: ["requested", "approved", "declined"],
  },
  {
    id: "builder-editor-admin-rules",
    title: "Builder, editor, and admin rules",
    shortTitle: "Builder",
    domain: "Agent",
    family: "Rule authoring",
    description: "Field builder, validation rules, conditional logic, workflow variables, and admin query filters.",
    source: "forms-system",
    intent: "Configure",
    usedBy: ["form-builder", "workflows", "db-admin", "reports"],
    fields: ["field type", "default", "condition", "operator", "target"],
    states: ["draft", "valid", "published"],
  },
  {
    id: "support-comment-composer",
    title: "Support and comment composer",
    shortTitle: "Support",
    domain: "Agent",
    family: "Conversation input",
    description: "Reply body, internal note, macro picker, mention picker, priority, and resolve toggle.",
    source: "forms-system",
    intent: "Compose",
    usedBy: ["support", "comments", "inbox", "reviews"],
    fields: ["reply", "note", "macro", "mention", "priority", "resolve"],
    states: ["draft", "queued", "sent"],
  },
  {
    id: "commerce-checkout",
    title: "Commerce checkout",
    shortTitle: "Checkout",
    domain: "Commerce",
    family: "Cart to order",
    description: "Customer, shipping, delivery, payment method, order notes, and terms acceptance.",
    source: "forms-system",
    intent: "Checkout",
    usedBy: ["commerce", "parts pages", "billing", "emails"],
    fields: ["customer", "shipping", "delivery", "payment", "notes", "terms"],
    states: ["cart", "review", "paid"],
  },
  {
    id: "notification-permissions",
    title: "Notifications and permissions",
    shortTitle: "Access rules",
    domain: "Governance",
    family: "Policy controls",
    description: "Notification channel rules, quiet hours, role scope, access request, and approval reason.",
    source: "forms-system",
    intent: "Authorize",
    usedBy: ["notifications", "permissions", "account", "workflows"],
    fields: ["channel", "quiet hours", "role", "scope", "reason"],
    states: ["requested", "approved", "muted"],
  },
  {
    id: "email-campaign-builder",
    title: "Email campaign builder",
    shortTitle: "Email builder",
    domain: "Marketing",
    family: "Campaign editing",
    description: "Subject, preheader, audience, personalization token, test recipient, and send check.",
    source: "forms-system",
    intent: "Compose",
    usedBy: ["email-builder", "notifications", "marketing campaigns", "newsletter"],
    fields: ["subject", "preheader", "audience", "token", "test recipient"],
    states: ["draft", "preview", "test sent"],
  },
]

export const FORM_PATTERNS_BY_ID = Object.fromEntries(
  FORM_PATTERNS.map((pattern) => [pattern.id, pattern]),
) as Record<FormPatternId, FormPattern>

export const FORM_DOMAINS: ReadonlyArray<FormDomain> = [
  "Website",
  "Workshop",
  "Parts",
  "Commerce",
  "CMS",
  "Operations",
  "Governance",
  "Agent",
  "Marketing",
]
