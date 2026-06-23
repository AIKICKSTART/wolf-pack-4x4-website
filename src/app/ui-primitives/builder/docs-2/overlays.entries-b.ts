/**
 * Overlays family doc entries — part B (video lightbox → confetti modal).
 * Split from `overlays.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"
import { OVERLAYS_PATH, SCRIM_TOKENS } from "./overlays.shared"

const COMPONENT_PATH = OVERLAYS_PATH

const videoLightbox: ComponentDocEntry = {
  key: "overlays/video-lightbox",
  importName: "VideoLightbox",
  name: "Video lightbox",
  summary: "Overlay video player with poster and caption.",
  category: "Media",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/video-lightbox",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "src", type: "url", required: true },
      { key: "poster", type: "image", required: false },
      { key: "caption", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-media-overlay", category: "color", usage: "darkened backdrop" },
    { token: "--primitive-text-on-accent", category: "color", usage: "controls on dark" },
    { token: "--primitive-radius-lg", category: "radius", usage: "player corner" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "close" }],
  assetDependencies: [{ id: "video-src", type: "video", required: true, description: "Video source URL." }],
  previewConfig: {
    sampleProps: {
      open: true,
      title: "Workshop tour",
      src: "/media/generated/replicate/videos/workshop-hero-landscape.mp4",
      poster: "/media/generated/replicate/videos/workshop-hero-landscape.webp",
    },
    background: "media",
    aspectRatio: "16/9",
  },
  codeExample: {
    language: "tsx",
    caption: "A video overlay.",
    code: `"use client"

import { useState } from "react"
import { VideoLightbox } from "@/app/ui-primitives/components/overlays"

export function Tour() {
  const [open, setOpen] = useState(false)
  return (
    <VideoLightbox
      open={open}
      onOpenChange={setOpen}
      title="Workshop tour"
      src="/media/generated/replicate/videos/workshop-hero-landscape.mp4"
      poster="/media/generated/replicate/videos/workshop-hero-landscape.webp"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import VideoLightbox.", "Pass src + title.", "Provide a poster for the loading state."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Native player controls are keyboard-operable"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Player fits width.", tablet: "Centered 16/9.", desktop: "Centered 16/9." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Triggered from a video thumbnail."],
  },
  agent: {
    whenToUse: "Use to play a video in a focused overlay.",
    steps: ["Open on the trigger.", "Pass src + poster."],
    pitfalls: ["Provide a title for the dialog label."],
  },
  tags: ["lightbox", "video", "media"],
}

const wizardModal: ComponentDocEntry = {
  key: "overlays/wizard-modal",
  importName: "WizardModal",
  name: "Wizard modal",
  summary: "Multi-step modal with a typed step union, step indicator, and finish handler.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/wizard-modal",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "steps", type: "array", required: true, description: "WizardStep<T> list." },
      { key: "initialStep", type: "string", required: false },
      { key: "finishLabel", type: "string", required: false },
      { key: "cancelLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "modal surface" },
    { token: "--primitive-red", category: "color", usage: "active step indicator" },
    { token: "--primitive-line", category: "color", usage: "step separators" },
    { token: "--primitive-radius-xl", category: "radius", usage: "modal corner" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "close button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Set up account" }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A two-step wizard.",
    code: `"use client"

import { useState } from "react"
import { WizardModal } from "@/app/ui-primitives/components/overlays"

type Step = "vehicle" | "contact"

export function Setup() {
  const [open, setOpen] = useState(false)
  return (
    <WizardModal<Step>
      open={open}
      onOpenChange={setOpen}
      title="Book a service"
      steps={[
        { id: "vehicle", title: "Vehicle", content: vehicleForm },
        { id: "contact", title: "Contact", content: contactForm },
      ]}
      onFinish={(last) => submit(last)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import WizardModal.", "Type the step id union and pass steps.", "Handle onFinish (+ optional onStepChange)."],
    notes: ["Generic over the step-id union; supply the type parameter for full safety."],
  },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Focus trapped", "Next/Back/Finish are focusable"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Step indicator condenses.", tablet: "Inline step indicator.", desktop: "Inline step indicator." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Code-composed flow."],
  },
  agent: {
    whenToUse: "Use for short guided multi-step flows in a modal.",
    steps: ["Define a step-id union.", "Provide ordered steps.", "Submit on onFinish."],
    pitfalls: ["initialStep must be one of the step ids."],
  },
  tags: ["modal", "wizard", "steps"],
}

const commandModal: ComponentDocEntry = {
  key: "overlays/command-modal",
  importName: "CommandModal",
  name: "Command modal",
  summary: "Command palette with sectioned items, recents, and a footer hint.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/command-modal",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "placeholder", type: "string", required: false },
      { key: "sections", type: "array", required: true, description: "CommandModalSection list." },
      { key: "recents", type: "array", required: false, description: "CommandModalItem list." },
      { key: "footerHint", type: "json", required: false },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "palette surface" },
    { token: "--primitive-field-bg", category: "color", usage: "search field" },
    { token: "--primitive-field-hover", category: "color", usage: "row highlight" },
    { token: "--primitive-radius-lg", category: "radius", usage: "palette corner" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "search", importPath: "lucide-react", usage: "search field glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, placeholder: "Search commands…" }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A command palette.",
    code: `"use client"

import { useState } from "react"
import { CommandModal } from "@/app/ui-primitives/components/overlays"

export function Palette() {
  const [open, setOpen] = useState(false)
  return (
    <CommandModal
      open={open}
      onOpenChange={setOpen}
      placeholder="Search commands…"
      sections={[
        { id: "nav", label: "Navigate", items: [{ id: "home", label: "Go home", onSelect: () => go("/") }] },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import CommandModal.", "Provide sections + items.", "Open via a ⌘K shortcut you wire up."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Type to filter", "ArrowUp/ArrowDown move", "Enter runs", "Escape closes"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Near full-width palette.", tablet: "Centered palette.", desktop: "Centered palette." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["App-shell command surface."],
  },
  agent: {
    whenToUse: "Use for a keyboard-first command palette.",
    steps: ["Group commands into sections.", "Bind a global open shortcut."],
    pitfalls: ["Keep item ids unique within sections."],
  },
  tags: ["command", "palette", "search"],
}

const popoverRich: ComponentDocEntry = {
  key: "overlays/popover-rich",
  importName: "PopoverRich",
  name: "Rich popover",
  summary: "Anchored popover with header/body/footer slots, placement, and controlled/uncontrolled open.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/popover-rich",
  propsSchema: {
    fields: [
      { key: "trigger", type: "json", required: true, description: "Element that toggles the popover." },
      { key: "header", type: "json", required: false },
      { key: "children", type: "json", required: true, description: "Popover body." },
      { key: "footer", type: "json", required: false },
      { key: "placement", type: "enum", required: false, options: ["top", "bottom", "left", "right"], description: "PopoverRichPlacement." },
      { key: "align", type: "enum", required: false, options: ["start", "center", "end"], description: "PopoverRichAlign." },
      { key: "sideOffset", type: "number", required: false },
      { key: "open", type: "boolean", required: false, description: "Controlled open." },
      { key: "defaultOpen", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel-strong", category: "color", usage: "popover surface" },
    { token: "--primitive-line", category: "color", usage: "slot separators" },
    { token: "--primitive-radius-lg", category: "radius", usage: "popover corner" },
    { token: "--primitive-shadow-raised", category: "shadow", usage: "elevation" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { placement: "bottom", align: "start" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A popover anchored to a button.",
    code: `import { PopoverRich } from "@/app/ui-primitives/components/overlays"

export function Help() {
  return (
    <PopoverRich
      trigger={<button>What is this?</button>}
      header={<strong>Resonator</strong>}
      placement="bottom"
      align="start"
    >
      <p>Tunes exhaust drone without changing volume.</p>
    </PopoverRich>
  )
}`,
  },
  usageExamples: [
    {
      title: "Controlled",
      description: "Drive open externally for coordinated UI.",
      example: { language: "tsx", code: `<PopoverRich trigger={btn} open={open} onOpenChange={setOpen}>{body}</PopoverRich>` },
    },
  ],
  setupInstructions: { steps: ["Import PopoverRich.", "Pass a trigger element + body.", "Choose placement/align."] },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Enter/Space toggles via the trigger", "Escape closes", "Focus moves into the popover"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Repositions to stay on-screen.", tablet: "Anchored.", desktop: "Anchored." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Anchored helper overlay."],
  },
  agent: {
    whenToUse: "Use for rich contextual info anchored to a control.",
    steps: ["Pass the trigger.", "Choose placement.", "Optionally control open."],
    pitfalls: ["Do not pass both open and defaultOpen."],
  },
  tags: ["popover", "tooltip", "anchored"],
}

const toastTray: ComponentDocEntry = {
  key: "overlays/toast-tray",
  importName: "ToastTray",
  name: "Toast tray",
  summary: "Stacked transient notifications with tone, placement, and dismiss.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/toast-tray",
  propsSchema: {
    fields: [
      { key: "toasts", type: "array", required: true, description: "ToastTrayItem list." },
      { key: "placement", type: "enum", required: false, options: ["top-left", "top-right", "bottom-left", "bottom-right"], description: "ToastTrayPlacement." },
      { key: "ariaLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel-strong", category: "color", usage: "toast surface" },
    { token: "--primitive-teal", category: "color", usage: "info tone" },
    { token: "--primitive-green", category: "color", usage: "success tone" },
    { token: "--primitive-amber", category: "color", usage: "warning tone" },
    { token: "--primitive-red", category: "color", usage: "error tone" },
    { token: "--primitive-radius-lg", category: "radius", usage: "toast corner" },
    { token: "--primitive-shadow-raised", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [{ name: "x", importPath: "lucide-react", usage: "dismiss button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { placement: "bottom-right" }, background: "canvas", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A toast region.",
    code: `"use client"

import { useState } from "react"
import { ToastTray } from "@/app/ui-primitives/components/overlays"

export function Toasts() {
  const [toasts, setToasts] = useState([
    { id: "1", title: "Saved", tone: "success" as const },
  ])
  return (
    <ToastTray
      toasts={toasts}
      placement="bottom-right"
      onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ToastTray.", "Hold a toasts array in state.", "Remove items in onDismiss."] },
  accessibility: {
    role: "region",
    requiresLabel: true,
    keyboard: ["Dismiss buttons are focusable"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Region is announced politely; provide ariaLabel."],
  },
  responsive: { mobile: "Toasts span the safe width.", tablet: "Corner-anchored stack.", desktop: "Corner-anchored stack." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Mount once near the app root."],
  },
  agent: {
    whenToUse: "Use as the global toast outlet.",
    steps: ["Mount once.", "Push/remove toasts from a store.", "Handle onDismiss."],
    pitfalls: ["Keep ids unique; avoid duplicate keys."],
  },
  tags: ["toast", "notification", "transient"],
}

const loadingOverlay: ComponentDocEntry = {
  key: "overlays/loading-overlay",
  importName: "LoadingOverlay",
  name: "Loading overlay",
  summary: "Blocking spinner overlay, fixed to the viewport or absolute to a positioned parent.",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/loading-overlay",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "message", type: "string", required: false },
      { key: "detail", type: "string", required: false },
      { key: "tone", type: "enum", required: false, options: ["neutral", "amber", "red"], description: "LoadingOverlayTone." },
      { key: "fixed", type: "boolean", required: false, description: "Fixed to viewport vs absolute to parent." },
      { key: "ariaLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-overlay", category: "color", usage: "scrim" },
    { token: "--primitive-text-strong", category: "color", usage: "message text" },
    { token: "--primitive-amber", category: "color", usage: "amber tone spinner" },
    { token: "--primitive-red", category: "color", usage: "red tone spinner" },
    { token: "--primitive-duration-slow", category: "motion", usage: "spinner rotation" },
  ],
  iconDependencies: [{ name: "loader-2", importPath: "lucide-react", usage: "spinner" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, message: "Saving…", tone: "neutral" }, background: "panel", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "Block a panel while saving.",
    code: `import { LoadingOverlay } from "@/app/ui-primitives/components/overlays"

export function Panel({ saving }: { saving: boolean }) {
  return (
    <div style={{ position: "relative" }}>
      {content}
      <LoadingOverlay open={saving} message="Saving…" />
    </div>
  )
}`,
  },
  usageExamples: [
    {
      title: "Full-screen",
      description: "Set fixed to cover the viewport during a route transition.",
      example: { language: "tsx", code: `<LoadingOverlay open={busy} fixed message="Loading…" />` },
    },
  ],
  setupInstructions: {
    steps: ["Import LoadingOverlay.", "Place inside a positioned parent (or set fixed).", "Toggle open."],
    notes: ["Without fixed it absolutely fills the nearest positioned ancestor."],
  },
  accessibility: {
    role: "status",
    requiresLabel: false,
    keyboard: [],
    visibleFocus: false,
    respectsReducedMotion: true,
    notes: ["Spinner rotation pauses under prefers-reduced-motion; the message conveys state."],
  },
  responsive: { mobile: "Covers its container.", tablet: "Covers its container.", desktop: "Covers its container." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Transient busy state."],
  },
  agent: {
    whenToUse: "Use to block interaction during async work.",
    steps: ["Wrap the region in a positioned parent.", "Toggle open with the loading flag."],
    pitfalls: ["For absolute mode the parent must be position: relative."],
  },
  tags: ["loading", "spinner", "blocking"],
}

const confettiModal: ComponentDocEntry = {
  key: "overlays/confetti-modal",
  importName: "ConfettiModal",
  name: "Confetti modal",
  summary: "Celebration dialog with a confetti burst (cannon or center burst).",
  category: "System",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/overlays/confetti-modal",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: false },
      { key: "children", type: "json", required: false },
      { key: "actions", type: "json", required: false },
      { key: "mode", type: "enum", required: false, options: ["cannon", "burst"], description: "Confetti firing mode." },
    ],
  },
  tokenDependencies: [
    ...SCRIM_TOKENS,
    { token: "--primitive-panel-strong", category: "color", usage: "modal surface" },
    { token: "--primitive-amber", category: "color", usage: "confetti accent" },
    { token: "--primitive-red", category: "color", usage: "confetti accent" },
    { token: "--primitive-radius-xl", category: "radius", usage: "modal corner" },
    { token: "--primitive-shadow-deep", category: "shadow", usage: "elevation" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Booked!", mode: "burst" }, background: "media", aspectRatio: "4/3", animate: true },
  codeExample: {
    language: "tsx",
    caption: "Celebrate a successful booking.",
    code: `"use client"

import { useState } from "react"
import { ConfettiModal } from "@/app/ui-primitives/components/overlays"

export function Celebrate() {
  const [open, setOpen] = useState(true)
  return (
    <ConfettiModal
      open={open}
      onOpenChange={setOpen}
      title="You're booked in!"
      description="See you Tuesday at 9am."
      mode="cannon"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ConfettiModal.", "Open on success.", "Pick cannon or burst."] },
  accessibility: {
    role: "dialog",
    requiresLabel: false,
    keyboard: ["Escape closes", "Focus trapped while open"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Confetti is suppressed under prefers-reduced-motion."],
  },
  responsive: { mobile: "Centered modal.", tablet: "Centered modal.", desktop: "Centered modal." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: true,
    notes: ["Success-moment overlay."],
  },
  agent: {
    whenToUse: "Use for celebratory success moments.",
    steps: ["Open after the success event.", "Keep the message short."],
    pitfalls: ["Do not overuse — reserve for genuine wins."],
  },
  tags: ["modal", "celebrate", "confetti"],
}

export const OVERLAYS_ENTRIES_B: readonly ComponentDocEntry[] = [
  videoLightbox,
  wizardModal,
  commandModal,
  popoverRich,
  toastTray,
  loadingOverlay,
  confettiModal,
]
