import type {
  FieldPaletteSection,
  FormBuilderField,
  FormBuilderPage,
  FormThemePreset,
  LogicRule,
  SubmissionDropOff,
  ValidationRule,
} from "../components/form-builder"

export const PALETTE_SECTIONS: ReadonlyArray<FieldPaletteSection> = [
  {
    id: "text",
    title: "Text inputs",
    items: [
      { type: "short-text", name: "Short text", hint: "Single-line" },
      { type: "long-text", name: "Long text", hint: "Paragraph" },
      { type: "email", name: "Email", hint: "Validated" },
      { type: "phone", name: "Phone", hint: "AU format" },
    ],
  },
  {
    id: "numeric",
    title: "Numeric",
    items: [
      { type: "number", name: "Number", hint: "Min / max" },
      { type: "currency", name: "Currency", hint: "AUD" },
      { type: "date", name: "Date", hint: "Picker" },
    ],
  },
  {
    id: "selection",
    title: "Selection",
    items: [
      { type: "dropdown", name: "Dropdown", hint: "Single value" },
      { type: "multi-select", name: "Multi-select", hint: "Chips" },
      { type: "rating", name: "Rating", hint: "1–5 stars" },
      { type: "yes-no", name: "Yes / No", hint: "Boolean" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    items: [
      { type: "file-upload", name: "File upload", hint: "Photos · PDFs" },
      { type: "signature", name: "Signature", hint: "Draw to sign" },
      { type: "address", name: "Address", hint: "AU street + postcode" },
      { type: "payment", name: "Payment", hint: "Card · deposit" },
    ],
  },
]

export const QUOTE_FORM_FIELDS: ReadonlyArray<FormBuilderField> = [
  {
    id: "vehicle-make",
    type: "dropdown",
    label: "Vehicle make",
    placeholder: "Pick your make",
    required: true,
    options: ["Toyota", "Holden", "Ford", "Mazda", "Nissan"],
    help: "We'll match your make to our parts catalogue.",
  },
  {
    id: "vehicle-model",
    type: "short-text",
    label: "Vehicle model",
    placeholder: "e.g. Hilux SR5 2.8 TD",
    required: true,
    help: "Trim level helps us nail the right system.",
  },
  {
    id: "suburb",
    type: "short-text",
    label: "Suburb",
    placeholder: "e.g. Oak Flats",
    required: true,
  },
  {
    id: "sound-preference",
    type: "multi-select",
    label: "Sound preference",
    options: ["Quiet", "Throaty", "Performance"],
    help: "Pick all that apply — guides the muffler spec.",
  },
  {
    id: "photos",
    type: "file-upload",
    label: "Vehicle photos",
    help: "Up to 5 photos · 10 MB each · JPG / PNG / HEIC.",
  },
  {
    id: "signature",
    type: "signature",
    label: "Signature",
    required: true,
    help: "Sign to confirm quote acknowledgement.",
  },
]

export const VALIDATION_RULES: ReadonlyArray<ValidationRule> = [
  { id: "required", kind: "required", label: "Required", enabled: true },
  { id: "min-length", kind: "min-length", label: "Min length", hint: "≥ 2", enabled: true },
  { id: "max-length", kind: "max-length", label: "Max length", hint: "≤ 80", enabled: false },
  { id: "regex", kind: "regex", label: "Regex", hint: "^[A-Z]", enabled: false },
  { id: "email-format", kind: "email-format", label: "Email format", enabled: false },
  { id: "phone-format", kind: "phone-format", label: "AU phone format", enabled: false },
  { id: "min-value", kind: "min-value", label: "Min value", hint: "≥ 0", enabled: false },
  { id: "max-value", kind: "max-value", label: "Max value", hint: "≤ 50000", enabled: false },
  { id: "file-size", kind: "file-size", label: "Max file size", hint: "10 MB", enabled: true },
  { id: "file-type", kind: "file-type", label: "File types", hint: "JPG · PNG · HEIC", enabled: true },
]

export const LOGIC_RULES: ReadonlyArray<LogicRule> = [
  {
    id: "lr-001",
    sourceField: "vehicle-make",
    operator: "equals",
    value: "Toyota",
    action: "show",
    targetField: "sound-preference",
  },
  {
    id: "lr-002",
    sourceField: "sound-preference",
    operator: "contains",
    value: "Performance",
    action: "show",
    targetField: "photos",
  },
  {
    id: "lr-003",
    sourceField: "suburb",
    operator: "is-empty",
    value: "",
    action: "require",
    targetField: "suburb",
  },
  {
    id: "lr-004",
    sourceField: "vehicle-model",
    operator: "not-equals",
    value: "Custom",
    action: "hide",
    targetField: "signature",
  },
]

export const LOGIC_AVAILABLE_FIELDS: ReadonlyArray<{ id: string; label: string }> =
  QUOTE_FORM_FIELDS.map((field) => ({ id: field.id, label: field.label }))

export const FORM_PAGES: ReadonlyArray<FormBuilderPage> = [
  { id: "vehicle", title: "Your vehicle", fieldCount: 2 },
  { id: "preferences", title: "Sound preferences", fieldCount: 1 },
  { id: "evidence", title: "Photos + signature", fieldCount: 2 },
  { id: "review", title: "Review + submit", fieldCount: 1 },
]

// Each preset is a distinct FORM-DESIGN brand palette (ink/paper/accent) a user
// picks for their published form — documented data/brand colours, not the
// dashboard's own design tokens, so the hex literals are intentional data.
export const THEME_PRESETS: ReadonlyArray<FormThemePreset> = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Light · clean default",
    ink: "#1c1c20",
    paper: "#fafafa",
    accent: "#2058ff",
  },
  {
    id: "workshop-dark",
    name: "Workshop dark",
    description: "Garage night · amber",
    ink: "#f1f2f5",
    paper: "#11141a",
    accent: "#ffc14f",
  },
  {
    id: "editorial-light",
    name: "Editorial light",
    description: "Newsprint · ochre",
    ink: "#1a1815",
    paper: "#f5efe3",
    accent: "#c0362b",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    description: "Yellow · drop shadow",
    ink: "#0a0a0a",
    paper: "#ffd900",
    accent: "#ff007a",
  },
]

export const SUBMISSION_DROPOFF: ReadonlyArray<SubmissionDropOff> = [
  { field: "Vehicle make", completion: 98 },
  { field: "Vehicle model", completion: 92 },
  { field: "Suburb", completion: 84 },
  { field: "Sound preference", completion: 71 },
  { field: "Photos", completion: 47 },
  { field: "Signature", completion: 38 },
]
