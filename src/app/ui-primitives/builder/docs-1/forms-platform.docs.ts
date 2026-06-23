/**
 * Forms-platform family — component documentation manifest (docs-1).
 *
 * Read-only docs for the 14 form-platform primitives that power the
 * form-builder, submissions inbox, anti-spam, payments, conditional logic,
 * multi-step wizard, notifications, exports, webhooks, publish, and analytics.
 * All data shapes come from `forms-platform-types.ts`. Token-driven only.
 *
 * Source of truth: src/app/ui-primitives/components/forms-platform/*.tsx +
 * forms-platform-types.ts (read-only).
 */

import { DEFAULT_ACCESSIBILITY_RULES } from "../model"
import type { TokenDependency } from "../model"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

const BARREL = "@/app/ui-primitives/components/forms-platform"

/** Panel/row tokens shared across the platform surfaces. */
const PANEL_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-panel", category: "color", usage: "panel fill" },
  { token: "--primitive-card-bg", category: "color", usage: "card fill" },
  { token: "--primitive-line", category: "color", usage: "hairline border" },
  { token: "--primitive-body", category: "color", usage: "body text" },
  { token: "--primitive-muted", category: "color", usage: "secondary text" },
  { token: "--primitive-text-strong", category: "color", usage: "heading text" },
  { token: "--primitive-radius-lg", category: "radius", usage: "panel radius" },
]

/** The platform tone palette (FormsPlatformTone). */
const PLATFORM_TONE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-red", category: "color", usage: "red tone" },
  { token: "--primitive-amber", category: "color", usage: "amber tone" },
  { token: "--primitive-teal", category: "color", usage: "teal tone" },
  { token: "--primitive-green", category: "color", usage: "green tone" },
]

const FIELD_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-field-bg", category: "color", usage: "input fill" },
  { token: "--primitive-field-hover", category: "color", usage: "input hover" },
  { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
]

/** A11y posture for a static info panel/row in this family. */
const panelA11y: ComponentDocEntry["a11y"] = {
  keyboard: ["Static presentation surface; any embedded buttons are native and keyboard-operable."],
  screenReader: ["Labelled region/heading structure; status chips carry text labels."],
  reducedMotion: "Module gates entrance motion behind prefers-reduced-motion.",
  focus: ["Embedded controls show a visible focus ring via --primitive-focus-ring."],
}

const responsivePanel: ComponentDocEntry["responsive"] = {
  mobile: "Full-width panel; meta rows wrap.",
  tablet: "Comfortable.",
  desktop: "Often docked in an inspector or list column.",
  hasHorizontalScroll: false,
}

const formsPlatformDocs: ComponentDocFamily = {
  family: "forms-platform",
  title: "Forms platform",
  group: "Operations",
  summary:
    "Fourteen form-platform primitives: builder canvas + field config, submissions inbox + detail, anti-spam shield, payment field, file-upload zone, conditional logic, multi-step rail, notification rules, data export, webhook triggers, publish card, and analytics funnel. Shared types live in forms-platform-types.",
  barrelPath: BARREL,
  entries: [
    {
      manifest: {
        type: "forms-platform/form-builder-canvas",
        name: "Form Builder Canvas",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Drag-target canvas pairing a field palette with the live field list and a drop indicator.",
        componentPath: BARREL,
        importName: "FormBuilderCanvas",
        propsSchema: {
          fields: [
            { key: "palette", type: "array", required: true, description: "FormBuilderPaletteSection[] { id, title, items: FormBuilderPaletteItem[] }." },
            { key: "formTitle", type: "string", required: true },
            { key: "hint", type: "string", required: false },
            { key: "fields", type: "array", required: true, description: "FormBuilderCanvasField[] { id, type, label, required?, helperText?, tone? }." },
            { key: "selectedFieldId", type: "string", required: false },
            { key: "activeDropIndex", type: "number", required: false, description: "Index where the drop indicator shows." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { formTitle: "" },
        editableFields: [
          { path: "formTitle", label: "Form title", control: "text", valueType: "string" },
          { path: "hint", label: "Hint", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS, ...FIELD_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", stack: true, span: 12 }, { breakpoint: "lg", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, keyboardOperable: true, visibleFocus: true },
        previewConfig: { sampleProps: { formTitle: "Booking form" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Builder canvas with a palette and three placed fields.",
          code: `import { FormBuilderCanvas } from "${BARREL}"

export function Builder() {
  return (
    <FormBuilderCanvas
      formTitle="Booking request"
      hint="Drag fields from the palette"
      palette={[
        { id: "common", title: "Common", items: [
          { id: "text", label: "Text", type: "text" },
          { id: "email", label: "Email", type: "email" },
        ] },
      ]}
      fields={[
        { id: "f1", type: "text", label: "Full name", required: true },
        { id: "f2", type: "email", label: "Email", required: true, tone: "teal" },
        { id: "f3", type: "date", label: "Preferred date" },
      ]}
      selectedFieldId="f2"
      activeDropIndex={3}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { FormBuilderCanvas } from "${BARREL}".`, "Provide palette sections + placed fields.", "Drive selectedFieldId/activeDropIndex from your drag state."],
          requires: ["forms-platform/field-config-panel"],
          notes: ["Presentational — wire actual drag-and-drop upstream; FormFieldType comes from ../form-builder/form-builder-types."],
        },
        tags: ["form-builder", "canvas", "drag-drop", "operations"],
      },
      role: "Form-builder palette + canvas surface.",
      usageExamples: [{ title: "Empty canvas", scenario: "No fields yet, palette only.", code: `<FormBuilderCanvas formTitle="New form" palette={palette} fields={[]} />` }],
      a11y: { ...panelA11y, screenReader: ["Canvas is a labelled region; placed fields list their type + required state."] },
      responsive: { mobile: "Palette stacks above the canvas.", tablet: "Side-by-side.", desktop: "Palette left, canvas right.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: ["palette", "fields"], notes: ["A builder tool surface, not page content."] },
      agent: {
        steps: ["Supply palette + fields arrays.", "Pass selectedFieldId/activeDropIndex from your DnD controller."],
        pitfalls: ["This renders the canvas; it does not implement DnD logic itself."],
        requirements: ["palette, formTitle, fields required.", "FormFieldType values must match form-builder-types."],
      },
    },
    {
      manifest: {
        type: "forms-platform/field-config-panel",
        name: "Field Config Panel",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Inspector panel showing a single field's draft config (label, type, placeholder, required, options).",
        componentPath: BARREL,
        importName: "FieldConfigPanel",
        propsSchema: {
          fields: [
            { key: "draft", type: "object", required: true, description: "FieldConfigDraft { id, label, type, placeholder?, helperText?, defaultValue?, required, options? }." },
            { key: "helperHint", type: "string", required: false },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "draft.label", label: "Field label", control: "text", valueType: "string" },
          { path: "draft.required", label: "Required", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...FIELD_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true },
        previewConfig: { sampleProps: {}, aspectRatio: "3/4", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Inspector for a dropdown field.",
          code: `import { FieldConfigPanel } from "${BARREL}"

export function Inspector() {
  return (
    <FieldConfigPanel
      helperHint="Shown beneath the field"
      draft={{
        id: "f9",
        label: "Vehicle type",
        type: "dropdown",
        required: true,
        options: [
          { id: "o1", label: "Sedan", value: "sedan" },
          { id: "o2", label: "Ute", value: "ute" },
        ],
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { FieldConfigPanel } from "${BARREL}".`, "Pass a FieldConfigDraft for the selected field.", "Provide options for dropdown/radio types."],
          notes: ["Presentational inspector; emits no events — wire edits in the parent."],
        },
        tags: ["form-builder", "inspector", "config", "operations"],
      },
      role: "Single-field config inspector.",
      usageExamples: [{ title: "Text field", scenario: "A simple required text field.", code: `<FieldConfigPanel draft={{ id: "f1", label: "Name", type: "text", required: true }} />` }],
      a11y: panelA11y,
      responsive: responsivePanel,
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: ["draft.options"], notes: ["Builder inspector surface, not page content."] },
      agent: {
        steps: ["Pass the selected field's draft.", "Include options only for choice field types."],
        pitfalls: ["type must be a valid FormFieldType."],
        requirements: ["draft required (with id, label, type, required)."],
      },
    },
    {
      manifest: {
        type: "forms-platform/submission-inbox-row",
        name: "Submission Inbox Row",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "One submissions-list row: submitter, preview, status chip, optional amount + unread flag.",
        componentPath: BARREL,
        importName: "SubmissionInboxRow",
        propsSchema: {
          fields: [
            { key: "entry", type: "object", required: true, description: "SubmissionInboxEntry { id, formName, submitter, submitterEmail?, submittedAt, status, preview, amount?, unread? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Status uses a labelled chip; unread state is conveyed with text, not colour alone."] },
        previewConfig: { sampleProps: {}, aspectRatio: "12/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "A new, unread submission row.",
          code: `import { SubmissionInboxRow } from "${BARREL}"

export function Row() {
  return (
    <SubmissionInboxRow
      entry={{
        id: "s1",
        formName: "Booking request",
        submitter: "Jane Doe",
        submitterEmail: "jane@example.com",
        submittedAt: "2026-05-29 09:14",
        status: "new",
        preview: "Exhaust rattle on a 2018 Ranger",
        unread: true,
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { SubmissionInboxRow } from "${BARREL}".`, "Map each inbox entry to a row.", "Status drives the chip colour + label."],
          notes: ["Compose multiple rows inside your own list/table wrapper."],
        },
        tags: ["submissions", "inbox", "row", "operations"],
      },
      role: "Submissions inbox list row.",
      usageExamples: [{ title: "Paid submission", scenario: "Row showing a captured amount.", code: `<SubmissionInboxRow entry={{ id: "s2", formName: "Deposit", submitter: "Tom", submittedAt: "now", status: "approved", preview: "Deposit paid", amount: "$120.00" }} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Stacks meta below the title.", tablet: "Single row.", desktop: "Single row with status at the end.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: [], notes: ["Bound to submission data, not authored."] },
      agent: {
        steps: ["Pass one SubmissionInboxEntry per row.", "Render rows inside your own list container."],
        pitfalls: ["status must be a valid SubmissionStatus."],
        requirements: ["entry required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/submission-detail-panel",
        name: "Submission Detail Panel",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Full submission view: header meta, answer rows (with flags), and a toned audit timeline.",
        componentPath: BARREL,
        importName: "SubmissionDetailPanel",
        propsSchema: {
          fields: [
            { key: "formName", type: "string", required: true },
            { key: "submitter", type: "string", required: true },
            { key: "submitterEmail", type: "string", required: false },
            { key: "status", type: "enum", required: true, options: ["new", "reviewing", "approved", "rejected", "spam", "archived"] },
            { key: "submittedAt", type: "string", required: true },
            { key: "workshop", type: "string", required: false },
            { key: "sourceLabel", type: "string", required: false },
            { key: "answers", type: "array", required: true, description: "SubmissionAnswerRow[] { id, label, value, meta?, flagged? }." },
            { key: "audit", type: "array", required: true, description: "SubmissionAuditEvent[] { id, timestamp, actor, message, tone? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS, { token: "--primitive-line-strong", category: "color", usage: "timeline rail" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, notes: ["Flagged answers convey state with text + a dot; audit dots are tone-coded with adjacent text."] },
        previewConfig: { sampleProps: {}, aspectRatio: "3/4", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Detail view of a reviewing submission.",
          code: `import { SubmissionDetailPanel } from "${BARREL}"

export function Detail() {
  return (
    <SubmissionDetailPanel
      formName="Booking request"
      submitter="Jane Doe"
      submitterEmail="jane@example.com"
      status="reviewing"
      submittedAt="2026-05-29 09:14"
      workshop="Oak Flats"
      answers={[
        { id: "a1", label: "Vehicle", value: "2018 Ranger" },
        { id: "a2", label: "Issue", value: "Exhaust rattle", flagged: true },
      ]}
      audit={[
        { id: "e1", timestamp: "09:15", actor: "System", message: "Received", tone: "teal" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { SubmissionDetailPanel } from "${BARREL}".`, "Pass header meta + answers + audit arrays.", "Flag answers needing review."],
          notes: ["Read-only detail surface; action buttons are wired by the parent."],
        },
        tags: ["submissions", "detail", "audit", "operations"],
      },
      role: "Single-submission detail panel.",
      usageExamples: [{ title: "Approved submission", scenario: "No flagged answers.", code: `<SubmissionDetailPanel formName="Quote" submitter="Sam" status="approved" submittedAt="now" answers={[{ id: "a1", label: "Total", value: "$420" }]} audit={[]} />` }],
      a11y: panelA11y,
      responsive: responsivePanel,
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: ["answers", "audit"], notes: ["Bound to submission data."] },
      agent: {
        steps: ["Pass formName, submitter, status, submittedAt.", "Provide answers + audit arrays."],
        pitfalls: ["status must be a valid SubmissionStatus; tone (audit) is FormsPlatformTone."],
        requirements: ["formName, submitter, status, submittedAt, answers, audit required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/anti-spam-shield-card",
        name: "Anti-Spam Shield Card",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Spam-defence dashboard card: total blocked + per-defence rules with armed/off/warn state.",
        componentPath: BARREL,
        importName: "AntiSpamShieldCard",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: true },
            { key: "subtitle", type: "string", required: false },
            { key: "totalBlocked", type: "number", required: true },
            { key: "rules", type: "array", required: true, description: "SpamShieldRule[] { id, defence, label, state, blocked, hint? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { title: "", totalBlocked: 0 },
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string" },
        ],
        tokenDependencies: [...PANEL_TOKENS, { token: "--primitive-green", category: "color", usage: "armed state" }, { token: "--primitive-amber", category: "color", usage: "warning state" }, { token: "--primitive-red", category: "color", usage: "blocked count emphasis" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Defence state conveyed with a text label, not colour alone; numbers use tabular-nums."] },
        previewConfig: { sampleProps: { title: "Spam shield", totalBlocked: 1284 }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Shield card with three armed defences.",
          code: `import { AntiSpamShieldCard } from "${BARREL}"

export function Shield() {
  return (
    <AntiSpamShieldCard
      title="Spam shield"
      subtitle="Last 24h"
      totalBlocked={1284}
      rules={[
        { id: "r1", defence: "honeypot", label: "Honeypot", state: "armed", blocked: 902 },
        { id: "r2", defence: "turnstile", label: "Turnstile", state: "armed", blocked: 318 },
        { id: "r3", defence: "rate-limit", label: "Rate limit", state: "warning", blocked: 64 },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { AntiSpamShieldCard } from "${BARREL}".`, "Pass totalBlocked + a rules array.", "Set each rule's state to armed/disabled/warning."],
          notes: ["defence is a SpamDefence enum (honeypot/turnstile/rate-limit/captcha-v3)."],
        },
        tags: ["spam", "security", "card", "operations"],
      },
      role: "Spam-defence status card.",
      usageExamples: [{ title: "One disabled defence", scenario: "A turned-off rule.", code: `<AntiSpamShieldCard title="Shield" totalBlocked={0} rules={[{ id: "r1", defence: "captcha-v3", label: "reCAPTCHA", state: "disabled", blocked: 0 }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full width.", tablet: "Half width.", desktop: "Half width in a security row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["rules"], notes: ["Operations dashboard card bound to defence telemetry."] },
      agent: {
        steps: ["Pass totalBlocked + rules.", "Use the correct SpamDefence + SpamDefenceState enums."],
        pitfalls: ["state must be armed|disabled|warning."],
        requirements: ["title, totalBlocked, rules required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/payment-field-card",
        name: "Payment Field Card",
        category: "Commerce",
        kind: "component",
        version: "1.0.0",
        summary: "Stripe payment-field preview: AUD amount, tip chips, cardholder capture, masked key.",
        componentPath: BARREL,
        importName: "PaymentFieldCard",
        propsSchema: {
          fields: [
            { key: "draft", type: "object", required: true, description: "PaymentFieldDraft { id, label, amountAud, tipLabel?, tipPercents?, tippingEnabled?, captureCardholder?, stripeKey? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "draft.label", label: "Field label", control: "text", valueType: "string" },
          { path: "draft.amountAud", label: "Amount (AUD)", control: "number", valueType: "number" },
          { path: "draft.tippingEnabled", label: "Tipping", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...FIELD_TOKENS, { token: "--primitive-green", category: "color", usage: "amount emphasis" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Amount formatted via Intl AUD currency; key shown as a masked prefix only."] },
        previewConfig: { sampleProps: {}, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Deposit payment field with tipping.",
          code: `import { PaymentFieldCard } from "${BARREL}"

export function Deposit() {
  return (
    <PaymentFieldCard
      draft={{
        id: "pay1",
        label: "Booking deposit",
        amountAud: 120,
        tippingEnabled: true,
        tipLabel: "Add a tip",
        tipPercents: [5, 10, 15],
        captureCardholder: true,
        stripeKey: "pk_live_51AbC…",
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { PaymentFieldCard } from "${BARREL}".`, "Pass a PaymentFieldDraft with amountAud.", "Enable tipping + provide tipPercents as needed."],
          notes: ["Preview only — never put a secret key here; stripeKey is a display-only publishable prefix."],
        },
        tags: ["payment", "stripe", "commerce", "field"],
      },
      role: "Stripe payment field preview.",
      usageExamples: [{ title: "No tipping", scenario: "A flat fee with cardholder capture.", code: `<PaymentFieldCard draft={{ id: "p1", label: "Inspection fee", amountAud: 89, captureCardholder: true }} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full width.", tablet: "Half width.", desktop: "Half width.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["draft.tipPercents"], notes: ["A form-field block; amountAud + tip config are the editable surface."] },
      agent: {
        steps: ["Pass a draft with id, label, amountAud.", "Add tip config only when tippingEnabled."],
        pitfalls: ["stripeKey is publishable-prefix display only — never pass a secret key."],
        requirements: ["draft required (id, label, amountAud)."],
      },
    },
    {
      manifest: {
        type: "forms-platform/file-upload-zone",
        name: "File Upload Zone",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Drop zone with active state plus a scanned-file list showing progress + virus-scan status.",
        componentPath: BARREL,
        importName: "FileUploadZone",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: true },
            { key: "hint", type: "string", required: false },
            { key: "active", type: "boolean", required: false, description: "Highlight the drop target." },
            { key: "files", type: "array", required: true, description: "UploadedFileEntry[] { id, name, sizeLabel, progress, scanState, kind? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { title: "", files: [] },
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string" },
          { path: "hint", label: "Hint", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...FIELD_TOKENS, { token: "--primitive-green", category: "color", usage: "clean scan" }, { token: "--primitive-red", category: "color", usage: "infected scan" }],
        iconDependencies: [],
        assetDependencies: [{ id: "uploaded-file", type: "document", required: false, description: "User-uploaded files (preview metadata only)." }],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "region", requiresLabel: true, keyboardOperable: true, visibleFocus: true, notes: ["Scan state shown with a text label; progress conveyed numerically."] },
        previewConfig: { sampleProps: { title: "Upload photos", files: [] }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Upload zone with two scanned files.",
          code: `import { FileUploadZone } from "${BARREL}"

export function Upload() {
  return (
    <FileUploadZone
      title="Upload vehicle photos"
      hint="JPG or PNG up to 10MB"
      active={false}
      files={[
        { id: "u1", name: "exhaust.jpg", sizeLabel: "2.4 MB", progress: 100, scanState: "clean", kind: "image/jpeg" },
        { id: "u2", name: "rego.pdf", sizeLabel: "120 KB", progress: 60, scanState: "scanning" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { FileUploadZone } from "${BARREL}".`, "Pass files with progress + scanState.", "Set active during a drag-over."],
          notes: ["Presentational — wire the actual upload + scanning pipeline upstream."],
        },
        tags: ["upload", "files", "dropzone", "operations"],
      },
      role: "File upload + scan-status zone.",
      usageExamples: [{ title: "Threat detected", scenario: "An infected file flagged.", code: `<FileUploadZone title="Upload" files={[{ id: "u1", name: "x.exe", sizeLabel: "1 MB", progress: 100, scanState: "infected" }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full-width drop target.", tablet: "Comfortable.", desktop: "Comfortable.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["files"], notes: ["A form-field block; the files list is runtime state, not authored content."] },
      agent: {
        steps: ["Pass title + a files array.", "Drive active from drag events; update progress/scanState live."],
        pitfalls: ["scanState must be queued|scanning|clean|infected."],
        requirements: ["title, files required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/conditional-logic-card",
        name: "Conditional Logic Card",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Rule card: ALL/ANY conditions → an action on a target field, with an enabled toggle.",
        componentPath: BARREL,
        importName: "ConditionalLogicCard",
        propsSchema: {
          fields: [
            { key: "rule", type: "object", required: true, description: "ConditionalLogicRule { id, label, conditions, match, action, targetField, enabled }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "rule.enabled", label: "Enabled", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES },
        previewConfig: { sampleProps: {}, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Show a field when a dropdown equals a value.",
          code: `import { ConditionalLogicCard } from "${BARREL}"

export function Logic() {
  return (
    <ConditionalLogicCard
      rule={{
        id: "rule1",
        label: "Reveal tow details",
        match: "all",
        action: "show",
        targetField: "tow_address",
        enabled: true,
        conditions: [
          { id: "c1", sourceField: "service_type", operator: "equals", value: "towing" },
        ],
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { ConditionalLogicCard } from "${BARREL}".`, "Pass a ConditionalLogicRule.", "Set match (all/any), action, and targetField."],
          notes: ["operator + action are typed enums (ConditionalLogicOperator / ConditionalLogicAction)."],
        },
        tags: ["logic", "conditional", "rules", "operations"],
      },
      role: "Conditional-logic rule card.",
      usageExamples: [{ title: "Hide on empty", scenario: "Hide a field when a source is empty.", code: `<ConditionalLogicCard rule={{ id: "r2", label: "Hide note", match: "any", action: "hide", targetField: "note", enabled: true, conditions: [{ id: "c1", sourceField: "issue", operator: "is-empty", value: "" }] }} />` }],
      a11y: panelA11y,
      responsive: responsivePanel,
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: ["rule.conditions"], notes: ["Builder logic surface, not page content."] },
      agent: {
        steps: ["Build a rule with at least one condition.", "Choose match, action, and a targetField."],
        pitfalls: ["operator/action must be the typed enum literals."],
        requirements: ["rule required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/multi-step-form-rail",
        name: "Multi-Step Form Rail",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Vertical wizard rail with complete/current/upcoming/skipped steps and an overall progress.",
        componentPath: BARREL,
        importName: "MultiStepFormRail",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: true },
            { key: "steps", type: "array", required: true, description: "FormWizardStep[] { id, index, title, state, progress?, fieldCount? }." },
            { key: "overallPercent", type: "number", required: false, min: 0, max: 100 },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { title: "" },
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string" },
        ],
        tokenDependencies: [...PANEL_TOKENS, { token: "--primitive-teal", category: "color", usage: "current step" }, { token: "--primitive-green", category: "color", usage: "complete step" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 3 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "navigation", requiresLabel: true, notes: ["Step state uses text + index bubble, not colour alone."] },
        previewConfig: { sampleProps: { title: "Booking" }, aspectRatio: "3/4", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Four-step wizard rail at step 2.",
          code: `import { MultiStepFormRail } from "${BARREL}"

export function Rail() {
  return (
    <MultiStepFormRail
      title="Booking wizard"
      overallPercent={40}
      steps={[
        { id: "s1", index: 1, title: "Vehicle", state: "complete", fieldCount: 3 },
        { id: "s2", index: 2, title: "Service", state: "current", progress: 50, fieldCount: 4 },
        { id: "s3", index: 3, title: "Schedule", state: "upcoming" },
        { id: "s4", index: 4, title: "Pay", state: "upcoming" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { MultiStepFormRail } from "${BARREL}".`, "Pass steps with state per step.", "Set overallPercent for the summary bar."],
          notes: ["state is WizardStepState (complete/current/upcoming/skipped)."],
        },
        tags: ["wizard", "multi-step", "rail", "operations"],
      },
      role: "Multi-step wizard progress rail.",
      usageExamples: [{ title: "With a skipped step", scenario: "Optional step marked skipped.", code: `<MultiStepFormRail title="Flow" steps={[{ id: "a", index: 1, title: "A", state: "complete" }, { id: "b", index: 2, title: "B", state: "skipped" }, { id: "c", index: 3, title: "C", state: "current" }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full-width rail at top.", tablet: "Side rail.", desktop: "Left side rail.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["steps"], notes: ["Wizard chrome; steps reflect runtime navigation state."] },
      agent: {
        steps: ["Give each step a unique index + state.", "Keep exactly one step current.", "Set overallPercent."],
        pitfalls: ["state must be a valid WizardStepState."],
        requirements: ["title, steps required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/notification-rule-row",
        name: "Notification Rule Row",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "One automation row: trigger → channel → recipient + template, with an enabled toggle.",
        componentPath: BARREL,
        importName: "NotificationRuleRow",
        propsSchema: {
          fields: [
            { key: "rule", type: "object", required: true, description: "NotificationRule { id, trigger, channel, recipient, templateLabel, enabled }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [
          { path: "rule.enabled", label: "Enabled", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES },
        previewConfig: { sampleProps: {}, aspectRatio: "12/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Email-on-submit notification rule.",
          code: `import { NotificationRuleRow } from "${BARREL}"

export function Rule() {
  return (
    <NotificationRuleRow
      rule={{
        id: "n1",
        trigger: "on-submit",
        channel: "email",
        recipient: "service@oakflats.example",
        templateLabel: "New booking alert",
        enabled: true,
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { NotificationRuleRow } from "${BARREL}".`, "Pass a NotificationRule.", "Render multiple rows in your own list."],
          notes: ["trigger + channel are typed enums (NotificationTrigger / NotificationChannel)."],
        },
        tags: ["notifications", "automation", "row", "operations"],
      },
      role: "Notification automation row.",
      usageExamples: [{ title: "Slack on payment", scenario: "A Slack alert when payment lands.", code: `<NotificationRuleRow rule={{ id: "n2", trigger: "on-payment", channel: "slack", recipient: "#sales", templateLabel: "Paid", enabled: true }} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Stacks fields.", tablet: "Single row.", desktop: "Single row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: [], notes: ["Automation config surface."] },
      agent: {
        steps: ["Pass a NotificationRule per row.", "Use valid trigger + channel enums."],
        pitfalls: ["channel must be email|sms|slack|webhook."],
        requirements: ["rule required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/data-export-card",
        name: "Data Export Card",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Export panel: date range + format presets (CSV/JSON/XLS/PDF) with row estimates.",
        componentPath: BARREL,
        importName: "DataExportCard",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: true },
            { key: "range", type: "object", required: true, description: "DataExportRange { from, to, caption? }." },
            { key: "presets", type: "array", required: true, description: "DataExportPreset[] { id, label, format, rowsEstimate }." },
            { key: "selectedPresetId", type: "string", required: false },
            { key: "totalRows", type: "number", required: true },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { title: "", totalRows: 0 },
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string" },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Row counts use tabular-nums; format shown with a text label."] },
        previewConfig: { sampleProps: { title: "Export", totalRows: 4820 }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Export card with three format presets.",
          code: `import { DataExportCard } from "${BARREL}"

export function Export() {
  return (
    <DataExportCard
      title="Export submissions"
      totalRows={4820}
      selectedPresetId="csv"
      range={{ from: "2026-05-01", to: "2026-05-29", caption: "Last 28 days" }}
      presets={[
        { id: "csv", label: "CSV", format: "csv", rowsEstimate: 4820 },
        { id: "json", label: "JSON", format: "json", rowsEstimate: 4820 },
        { id: "pdf", label: "PDF summary", format: "pdf", rowsEstimate: 1 },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { DataExportCard } from "${BARREL}".`, "Pass a range + presets array.", "Set selectedPresetId + totalRows."],
          notes: ["format is an ExportFormat enum (csv/json/xls/pdf)."],
        },
        tags: ["export", "data", "csv", "operations"],
      },
      role: "Data export configuration card.",
      usageExamples: [{ title: "Single preset", scenario: "CSV-only export.", code: `<DataExportCard title="Export" totalRows={120} range={{ from: "2026-05-01", to: "2026-05-29" }} presets={[{ id: "csv", label: "CSV", format: "csv", rowsEstimate: 120 }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full width.", tablet: "Half width.", desktop: "Half width.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["presets"], notes: ["Tooling surface bound to dataset metadata."] },
      agent: {
        steps: ["Pass range + presets + totalRows.", "Default selectedPresetId to the most common format."],
        pitfalls: ["format must be csv|json|xls|pdf."],
        requirements: ["title, range, presets, totalRows required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/webhook-trigger-row",
        name: "Webhook Trigger Row",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Webhook row: endpoint + event + delivery status, last-delivery time, and a sample payload.",
        componentPath: BARREL,
        importName: "WebhookTriggerRow",
        propsSchema: {
          fields: [
            { key: "trigger", type: "object", required: true, description: "WebhookTrigger { id, endpoint, event, status, lastDelivery, samplePayload, retries? }." },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: {},
        editableFields: [],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS, { token: "--primitive-font-mono", category: "typography", usage: "endpoint + payload monospace" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Delivery status shown with a labelled chip; payload in a labelled code region."] },
        previewConfig: { sampleProps: {}, aspectRatio: "12/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "A delivered webhook row.",
          code: `import { WebhookTriggerRow } from "${BARREL}"

export function Hook() {
  return (
    <WebhookTriggerRow
      trigger={{
        id: "wh1",
        endpoint: "https://hooks.example.com/forms",
        event: "on-submit",
        status: "delivered",
        lastDelivery: "2m ago",
        retries: 0,
        samplePayload: JSON.stringify({ id: "s1", status: "new" }, null, 2),
      }}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { WebhookTriggerRow } from "${BARREL}".`, "Pass a WebhookTrigger.", "samplePayload should be pre-formatted JSON text."],
          notes: ["status is a WebhookStatus enum (delivered/retrying/failed/paused)."],
        },
        tags: ["webhook", "integration", "row", "operations"],
      },
      role: "Webhook delivery row.",
      usageExamples: [{ title: "Failed delivery", scenario: "A failed hook with retries.", code: `<WebhookTriggerRow trigger={{ id: "wh2", endpoint: "https://x.example/h", event: "on-payment", status: "failed", lastDelivery: "1h ago", retries: 3, samplePayload: "{}" }} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Stacks; payload scrolls within its block.", tablet: "Single row.", desktop: "Single row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: [], notes: ["Integration config surface."] },
      agent: {
        steps: ["Pass a WebhookTrigger.", "Pre-stringify samplePayload (JSON.stringify with indent)."],
        pitfalls: ["status must be delivered|retrying|failed|paused."],
        requirements: ["trigger required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/form-publish-card",
        name: "Form Publish Card",
        category: "Operations",
        kind: "component",
        version: "1.0.0",
        summary: "Publish panel: share link, embed snippet, and publish-mode targets (embed/popup/link/QR).",
        componentPath: BARREL,
        importName: "FormPublishCard",
        propsSchema: {
          fields: [
            { key: "formName", type: "string", required: true },
            { key: "shareLink", type: "url", required: true },
            { key: "embedSnippet", type: "string", required: true },
            { key: "targets", type: "array", required: true, description: "FormPublishTarget[] { id (PublishMode), label, description }." },
            { key: "activeTargetId", type: "enum", required: true, options: ["inline-embed", "popup", "share-link", "qr-code"] },
            { key: "published", type: "boolean", required: true },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { published: false, activeTargetId: "share-link", formName: "" },
        editableFields: [
          { path: "published", label: "Published", control: "toggle", valueType: "boolean" },
          { path: "activeTargetId", label: "Active target", control: "select", valueType: "enum", options: ["inline-embed", "popup", "share-link", "qr-code"] },
        ],
        tokenDependencies: [...PANEL_TOKENS, { token: "--primitive-green", category: "color", usage: "published state" }, { token: "--primitive-font-mono", category: "typography", usage: "embed snippet" }, { token: "--primitive-btn-primary-bg", category: "button", usage: "publish CTA" }],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, keyboardOperable: true, visibleFocus: true },
        previewConfig: { sampleProps: { formName: "Booking form" }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Publish card set to share-link, published.",
          code: `import { FormPublishCard } from "${BARREL}"

export function Publish() {
  return (
    <FormPublishCard
      formName="Booking request"
      published
      activeTargetId="share-link"
      shareLink="https://oakflats.example/f/booking"
      embedSnippet={'<script src="https://oakflats.example/embed.js" data-form="booking"></script>'}
      targets={[
        { id: "share-link", label: "Share link", description: "A standalone hosted page" },
        { id: "inline-embed", label: "Embed", description: "Drop into any page" },
        { id: "qr-code", label: "QR code", description: "For in-store signage" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { FormPublishCard } from "${BARREL}".`, "Pass shareLink + embedSnippet + targets.", "Set activeTargetId + published."],
          notes: ["activeTargetId / target ids are PublishMode enums."],
        },
        tags: ["publish", "embed", "share", "operations"],
      },
      role: "Form publish/share card.",
      usageExamples: [{ title: "Unpublished draft", scenario: "Embed target, not yet live.", code: `<FormPublishCard formName="Draft" published={false} activeTargetId="inline-embed" shareLink="https://x" embedSnippet="<div/>" targets={[{ id: "inline-embed", label: "Embed", description: "" }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full width; snippet scrolls.", tablet: "Half width.", desktop: "Half width.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: false, acceptsChildren: false, repeaterProps: ["targets"], notes: ["Publish tooling surface."] },
      agent: {
        steps: ["Pass shareLink, embedSnippet, targets.", "Set activeTargetId to a valid PublishMode + published flag."],
        pitfalls: ["activeTargetId must match one of the target ids (PublishMode)."],
        requirements: ["formName, shareLink, embedSnippet, targets, activeTargetId, published required."],
      },
    },
    {
      manifest: {
        type: "forms-platform/analytics-funnel-tile",
        name: "Analytics Funnel Tile",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Conversion funnel tile: staged bars (started→submitted/abandoned) with retention + conversion.",
        componentPath: BARREL,
        importName: "AnalyticsFunnelTile",
        propsSchema: {
          fields: [
            { key: "title", type: "string", required: true },
            { key: "stages", type: "array", required: true, description: "FunnelStageDatum[] { stage, label, count, retentionPct }." },
            { key: "periodLabel", type: "string", required: false },
            { key: "conversionPct", type: "number", required: false, min: 0, max: 100 },
            { key: "className", type: "string", required: false },
          ],
        },
        defaultProps: { title: "" },
        editableFields: [
          { path: "title", label: "Title", control: "text", valueType: "string" },
          { path: "periodLabel", label: "Period", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...PANEL_TOKENS, ...PLATFORM_TONE_TOKENS],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }, { breakpoint: "lg", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, notes: ["Counts + percentages use tabular-nums; bars are labelled, not colour-only."] },
        previewConfig: { sampleProps: { title: "Booking funnel" }, aspectRatio: "4/3", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Four-stage conversion funnel.",
          code: `import { AnalyticsFunnelTile } from "${BARREL}"

export function Funnel() {
  return (
    <AnalyticsFunnelTile
      title="Booking funnel"
      periodLabel="Last 28 days"
      conversionPct={42}
      stages={[
        { stage: "started", label: "Started", count: 1000, retentionPct: 100 },
        { stage: "halfway", label: "Halfway", count: 720, retentionPct: 72 },
        { stage: "submitted", label: "Submitted", count: 420, retentionPct: 42 },
        { stage: "abandoned", label: "Abandoned", count: 580, retentionPct: 58 },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { AnalyticsFunnelTile } from "${BARREL}".`, "Pass stages with count + retentionPct.", "Set conversionPct + periodLabel."],
          notes: ["stage is a FunnelStage enum (started/halfway/submitted/abandoned)."],
        },
        tags: ["analytics", "funnel", "conversion", "data"],
      },
      role: "Conversion funnel tile.",
      usageExamples: [{ title: "Minimal funnel", scenario: "Two-stage start→submit.", code: `<AnalyticsFunnelTile title="Mini" stages={[{ stage: "started", label: "Start", count: 100, retentionPct: 100 }, { stage: "submitted", label: "Done", count: 30, retentionPct: 30 }]} />` }],
      a11y: panelA11y,
      responsive: { mobile: "Full width.", tablet: "Half width.", desktop: "Half width in an analytics row.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["stages"], notes: ["stages is a repeater; values bind to analytics data."] },
      agent: {
        steps: ["Pass stages with descending counts.", "Set retentionPct relative to the first stage.", "Set conversionPct."],
        pitfalls: ["stage must be a valid FunnelStage."],
        requirements: ["title, stages required."],
      },
    },
  ],
}

export default formsPlatformDocs
