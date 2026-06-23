/**
 * Overlays family doc entries — part A (dialogs → image lightbox).
 * Split from `overlays.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"
import { OVERLAYS_PATH, SCRIM_TOKENS } from "./overlays.shared"

const COMPONENT_PATH = OVERLAYS_PATH

const basicDialog: ComponentDocEntry = {
  key: "overlays/basic-dialog",
  importName: "BasicDialog",
  name: "Basic dialog",
  summary: "Centered modal with title, optional description, body, action row, sizes, and a close button.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/basic-dialog",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: false },
      { key: "children", type: "json", required: true, description: "Dialog body." },
      { key: "actions", type: "json", required: false, description: "Footer action buttons." },
      { key: "size", type: "enum", required: false, options: ["sm", "md", "lg"], description: "BasicDialogSize." },
      { key: "showClose", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "dialog surface" },
    { token: "--primitive-line", category: "color", usage: "header/footer hairlines" },
    { token: "--primitive-radius-xl", category: "radius", usage: "dialog corner" },
    { token: "--primitive-space-6", category: "space", usage: "content padding" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "close button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Confirm details", size: "md", showClose: true }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A controlled dialog.",
    code: `"use client"

import { useState } from "react"
import { BasicDialog } from "@/app/ui-primitives/components/overlays"

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <BasicDialog
      open={open}
      onOpenChange={setOpen}
      title="Booking details"
      description="Review before you confirm."
      actions={<button onClick={() => setOpen(false)}>Close</button>}
    >
      <p>Your service is booked for Tuesday.</p>
    </BasicDialog>
  )
}`,
  },
  usageExamples: [
    {
      title: "Large dialog",
      description: "Use size=\"lg\" for forms or dense content.",
      example: { language: "tsx", code: `<BasicDialog open={open} onOpenChange={setOpen} title="Edit" size="lg">{form}</BasicDialog>` },
    },
  ],
  setupInstructions: {
    steps: ["Import BasicDialog.", "Drive open + onOpenChange from state.", "Pass body as children and footer buttons via actions."],
    notes: ["Focus is trapped while open; Escape and scrim click close it."],
  },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Tab is trapped within the dialog", "Focus returns to the trigger on close"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["title labels the dialog; description describes it."],
  },
  responsive: {
    mobile: "Near full-width with safe margins.",
    tablet: "Centered at the chosen size.",
    desktop: "Centered; max width tracks size.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Overlay container — composed in code, not dropped on a page."],
  },
  agent: {
    whenToUse: "Use for generic confirmation/content modals that need a title and actions.",
    steps: ["Hold open in state.", "Render body as children.", "Provide actions for the footer."],
    pitfalls: ["open + onOpenChange are both required for controlled behaviour."],
  },
  tags: ["modal", "dialog"],
}

const confirmDialog: ComponentDocEntry = {
  key: "overlays/confirm-dialog",
  importName: "ConfirmDialog",
  name: "Confirm dialog",
  summary: "Two-action confirmation modal with variant styling and a busy state.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/confirm-dialog",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: true },
      { key: "confirmLabel", type: "string", required: true },
      { key: "cancelLabel", type: "string", required: false },
      { key: "variant", type: "enum", required: false, options: ["default", "danger"], description: "ConfirmDialogVariant." },
      { key: "busy", type: "boolean", required: false },
      { key: "icon", type: "json", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "dialog surface" },
    { token: "--primitive-red", category: "color", usage: "danger confirm accent" },
    { token: "--primitive-radius-xl", category: "radius", usage: "dialog corner" },
    { token: "--primitive-btn-primary-bg", category: "button", usage: "confirm button" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Delete part?", description: "This cannot be undone.", confirmLabel: "Delete", variant: "danger" }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "Destructive confirmation.",
    code: `"use client"

import { useState } from "react"
import { ConfirmDialog } from "@/app/ui-primitives/components/overlays"

export function DeletePart() {
  const [open, setOpen] = useState(false)
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title="Remove this part?"
      description="The line item will be deleted from the quote."
      confirmLabel="Remove"
      variant="danger"
      onConfirm={() => remove()}
    />
  )
}`,
  },
  usageExamples: [
    {
      title: "Busy while pending",
      description: "Set busy to disable the confirm button during an async action.",
      example: { language: "tsx", code: `<ConfirmDialog open={open} onOpenChange={setOpen} title="Save?" description="..." confirmLabel="Save" busy={saving} onConfirm={save} />` },
    },
  ],
  setupInstructions: {
    steps: ["Import ConfirmDialog.", "Provide title/description/confirmLabel.", "Handle onConfirm (+ optional onCancel)."],
  },
  accessibility: {
    role: "alertdialog",
    requiresLabel: false,
    keyboard: ["Escape cancels", "Focus is trapped", "Enter triggers the confirm button when focused"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Stacked actions.", tablet: "Inline actions.", desktop: "Inline actions." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Imperative overlay."],
  },
  agent: {
    whenToUse: "Use before destructive or irreversible actions.",
    steps: ["Open on the trigger.", "Use variant=\"danger\" for destructive ops.", "Set busy during async confirm."],
    pitfalls: ["description is required, unlike BasicDialog."],
  },
  tags: ["modal", "confirm", "danger"],
}

const alertDialog: ComponentDocEntry = {
  key: "overlays/alert-dialog",
  importName: "AlertDialog",
  name: "Alert dialog",
  summary: "Single-acknowledgement modal for blocking notices.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/alert-dialog",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: true },
      { key: "okLabel", type: "string", required: false },
      { key: "icon", type: "json", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "dialog surface" },
    { token: "--primitive-radius-xl", category: "radius", usage: "dialog corner" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Session expired", description: "Please sign in again." }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A blocking notice.",
    code: `"use client"

import { useState } from "react"
import { AlertDialog } from "@/app/ui-primitives/components/overlays"

export function Expired() {
  const [open, setOpen] = useState(true)
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
      title="Session expired"
      description="Sign in again to continue."
      onOk={() => goToLogin()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import AlertDialog.", "Provide title/description.", "Handle onOk."] },
  accessibility: {
    role: "alertdialog",
    requiresLabel: false,
    keyboard: ["Escape / OK dismiss", "Focus trapped on the OK button"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Full-width OK button.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Imperative overlay."],
  },
  agent: {
    whenToUse: "Use for one-way notices that require acknowledgement.",
    steps: ["Open on the event.", "Handle onOk to proceed."],
    pitfalls: ["Not for choices — use ConfirmDialog when there are two outcomes."],
  },
  tags: ["modal", "alert", "notice"],
}

const sideSheet: ComponentDocEntry = {
  key: "overlays/side-sheet",
  importName: "SideSheet",
  name: "Side sheet",
  summary: "Edge-anchored drawer (left/right) with title, subtitle, body, and footer.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/side-sheet",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "subtitle", type: "string", required: false },
      { key: "side", type: "enum", required: false, options: ["left", "right"], description: "SideSheetSide." },
      { key: "width", type: "enum", required: false, options: ["sm", "md", "lg"], description: "SideSheetWidth." },
      { key: "children", type: "json", required: true },
      { key: "footer", type: "json", required: false },
      { key: "showClose", type: "boolean", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "sheet surface" },
    { token: "--primitive-line", category: "color", usage: "header/footer hairlines" },
    { token: "--primitive-space-6", category: "space", usage: "content padding" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "close button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Filters", side: "right", width: "md" }, background: "media", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A right-side drawer.",
    code: `"use client"

import { useState } from "react"
import { SideSheet } from "@/app/ui-primitives/components/overlays"

export function Filters() {
  const [open, setOpen] = useState(false)
  return (
    <SideSheet open={open} onOpenChange={setOpen} title="Filters" side="right" width="md">
      {filterControls}
    </SideSheet>
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SideSheet.", "Drive open state.", "Choose side + width."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Focus trapped while open"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: {
    mobile: "Sheet expands toward full width.",
    tablet: "Fixed width drawer.",
    desktop: "Fixed width drawer.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Overlay container."],
  },
  agent: {
    whenToUse: "Use for filters, details, or secondary flows beside the main content.",
    steps: ["Open on the trigger.", "Pick a side that matches context."],
    pitfalls: ["Avoid stacking multiple side sheets."],
  },
  tags: ["drawer", "sheet", "panel"],
}

const bottomSheet: ComponentDocEntry = {
  key: "overlays/bottom-sheet",
  importName: "BottomSheet",
  name: "Bottom sheet",
  summary: "Bottom-anchored sheet with height presets, body, and footer — ideal on mobile.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/bottom-sheet",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: false },
      { key: "children", type: "json", required: true },
      { key: "footer", type: "json", required: false },
      { key: "height", type: "enum", required: false, options: ["auto", "half", "full"], description: "BottomSheetHeight." },
      { key: "showClose", type: "boolean", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "sheet surface" },
    { token: "--primitive-line", category: "color", usage: "grab handle + hairlines" },
    { token: "--primitive-radius-xl", category: "radius", usage: "top corners" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "close button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Choose option", height: "half" }, background: "media", aspectRatio: "3/4", thumbnailBreakpoint: "sm" },
  codeExample: {
    language: "tsx",
    caption: "A half-height bottom sheet.",
    code: `"use client"

import { useState } from "react"
import { BottomSheet } from "@/app/ui-primitives/components/overlays"

export function Options() {
  const [open, setOpen] = useState(false)
  return (
    <BottomSheet open={open} onOpenChange={setOpen} title="Choose a bay" height="half">
      {optionsList}
    </BottomSheet>
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import BottomSheet.", "Drive open state.", "Pick a height preset."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Focus trapped while open"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: {
    mobile: "Primary use — thumb-reachable from the bottom edge.",
    tablet: "Still bottom-anchored.",
    desktop: "Works but consider a dialog at wide widths.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Overlay container."],
  },
  agent: {
    whenToUse: "Use for mobile-first option pickers and quick flows.",
    steps: ["Open on the trigger.", "Choose height for the content volume."],
    pitfalls: ["Avoid full height for short content."],
  },
  tags: ["sheet", "mobile", "bottom"],
}

const topBannerSheet: ComponentDocEntry = {
  key: "overlays/top-banner-sheet",
  importName: "TopBannerSheet",
  name: "Top banner sheet",
  summary: "Top-edge announcement banner with tone, message, actions, and dismiss.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/top-banner-sheet",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "message", type: "string", required: true },
      { key: "tone", type: "enum", required: false, options: ["info", "success", "warning", "danger"], description: "TopBannerTone." },
      { key: "actions", type: "json", required: false },
      { key: "icon", type: "json", required: false },
      { key: "showClose", type: "boolean", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel-strong", category: "color", usage: "banner surface" },
    { token: "--primitive-teal", category: "color", usage: "info tone" },
    { token: "--primitive-green", category: "color", usage: "success tone" },
    { token: "--primitive-amber", category: "color", usage: "warning tone" },
    { token: "--primitive-red", category: "color", usage: "danger tone" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "dismiss button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Heads up", message: "Bay 2 is closed today.", tone: "warning" }, background: "panel", aspectRatio: "16/3" },
  codeExample: {
    language: "tsx",
    caption: "A dismissible warning banner.",
    code: `"use client"

import { useState } from "react"
import { TopBannerSheet } from "@/app/ui-primitives/components/overlays"

export function Notice() {
  const [open, setOpen] = useState(true)
  return (
    <TopBannerSheet
      open={open}
      onOpenChange={setOpen}
      title="Scheduled maintenance"
      message="Online booking pauses 2–3pm."
      tone="warning"
      showClose
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import TopBannerSheet.", "Drive open state.", "Pick a tone matching severity."] },
  accessibility: {
    role: "status",
    requiresLabel: false,
    keyboard: ["Dismiss + action buttons are focusable"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Message wraps; actions stack.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: true,
    blockType: "overlays/top-banner",
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Announcement content is owner-editable; can sit at the top of a CMS page."],
  },
  agent: {
    whenToUse: "Use for site-wide announcements pinned to the top edge.",
    steps: ["Control open via state or feature flag.", "Choose tone."],
    pitfalls: ["Avoid more than one banner at once."],
  },
  tags: ["banner", "announcement", "notice"],
}

const fullTakeover: ComponentDocEntry = {
  key: "overlays/full-takeover",
  importName: "FullTakeover",
  name: "Full takeover",
  summary: "Full-viewport overlay for immersive flows, with eyebrow, title, toolbar, and minimize.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/full-takeover",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "eyebrow", type: "string", required: false },
      { key: "children", type: "json", required: true },
      { key: "toolbar", type: "json", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-canvas", category: "color", usage: "takeover background" },
    { token: "--primitive-line", category: "color", usage: "toolbar hairline" },
    { token: "--primitive-text-strong", category: "color", usage: "title" },
    { token: "--primitive-space-8", category: "space", usage: "content padding" },
  ],
  iconDependencies: [
    { name: "x", importPath: "lucide-react", usage: "close button" },
    { name: "minus", importPath: "lucide-react", usage: "minimize button" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Build your quote", eyebrow: "Quote" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "An immersive flow.",
    code: `"use client"

import { useState } from "react"
import { FullTakeover } from "@/app/ui-primitives/components/overlays"

export function QuoteFlow() {
  const [open, setOpen] = useState(false)
  return (
    <FullTakeover open={open} onOpenChange={setOpen} eyebrow="Quote" title="Build your quote">
      {wizard}
    </FullTakeover>
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FullTakeover.", "Drive open state.", "Optionally pass a toolbar and onMinimize."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Focus trapped while open"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Fills the screen.", tablet: "Fills the screen.", desktop: "Fills the screen with padded content." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Overlay container for flows."],
  },
  agent: {
    whenToUse: "Use for multi-step flows that warrant the whole screen.",
    steps: ["Open on the trigger.", "Render the flow as children."],
    pitfalls: ["Provide a clear close/minimize affordance."],
  },
  tags: ["takeover", "fullscreen", "flow"],
}

const imageLightbox: ComponentDocEntry = {
  key: "overlays/image-lightbox",
  importName: "ImageLightbox",
  name: "Image lightbox",
  summary: "Full-bleed image gallery overlay with slide navigation.",
  category: "Media",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/image-lightbox",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "slides", type: "array", required: true, description: "LightboxSlide list ({ src, alt, ... })." },
      { key: "initialIndex", type: "number", required: false, min: 0 },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-media-overlay", category: "color", usage: "darkened backdrop" },
    { token: "--primitive-text-on-accent", category: "color", usage: "controls on dark" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "x", importPath: "lucide-react", usage: "close" },
    { name: "chevron-left", importPath: "lucide-react", usage: "previous slide" },
    { name: "chevron-right", importPath: "lucide-react", usage: "next slide" },
  ],
  assetDependencies: [{ id: "lightbox-slides", type: "image", required: true, description: "Caller-provided gallery images." }],
  previewConfig: { sampleProps: { open: true, initialIndex: 0 }, background: "media", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A gallery lightbox.",
    code: `"use client"

import { useState } from "react"
import { ImageLightbox } from "@/app/ui-primitives/components/overlays"

export function Gallery() {
  const [open, setOpen] = useState(false)
  return (
    <ImageLightbox
      open={open}
      onOpenChange={setOpen}
      slides={[{ src: "/work/before.jpg", alt: "Before" }, { src: "/work/after.jpg", alt: "After" }]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ImageLightbox.", "Pass slides with alt text.", "Open at a chosen initialIndex."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "ArrowLeft/ArrowRight change slides"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Every slide requires alt text."],
  },
  responsive: { mobile: "Swipe-friendly full-bleed image.", tablet: "Full-bleed.", desktop: "Full-bleed with side controls." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Triggered from gallery thumbnails."],
  },
  agent: {
    whenToUse: "Use to zoom gallery images full-screen.",
    steps: ["Map images to slides.", "Open at the clicked index."],
    pitfalls: ["Never omit alt text."],
  },
  tags: ["lightbox", "gallery", "image"],
}

export const OVERLAYS_ENTRIES_A: readonly ComponentDocEntry[] = [
  basicDialog,
  confirmDialog,
  alertDialog,
  sideSheet,
  bottomSheet,
  topBannerSheet,
  fullTakeover,
  imageLightbox,
]
