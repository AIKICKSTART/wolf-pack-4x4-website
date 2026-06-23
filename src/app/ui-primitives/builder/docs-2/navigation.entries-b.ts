/**
 * Navigation (chrome) family doc entries — part B (docks + slide-ups + sidebars).
 * Split from `navigation.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./navigation.shared"
import {
  BRAND_SNIPPET,
  CHROME_PATH,
  DOCK_RESPONSIVE,
  NAV_CTA_TOKENS,
  NAV_GLASS_TOKENS,
  NAV_LANDMARK_A11Y,
  NAV_OVERLAY_A11Y,
  NAV_SURFACE_TOKENS,
  NAV_TEXTURE_TOKENS,
  SIDEBAR_RESPONSIVE,
  SLIDE_UP_RESPONSIVE,
} from "./navigation.shared"

const dockBottomGlass: ComponentDocEntry = {
  key: "navigation/dock-bottom-glass",
  importName: "DockBottomGlass",
  name: "Dock — bottom glass",
  summary: "Fixed bottom-center glass dock of quick actions.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/docks/bottom-glass",
  propsSchema: {
    fields: [
      { key: "actions", type: "array", required: true, description: "DockBottomGlassAction list." },
      { key: "layout", type: "enum", required: false, options: ["fixed", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_GLASS_TOKENS, { token: "--primitive-line", category: "color", usage: "dock hairline" }, { token: "--primitive-radius-pill", category: "radius", usage: "dock shape" }, { token: "--primitive-focus-ring", category: "color", usage: "focus ring" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { layout: "static" }, background: "media", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A bottom glass dock.",
    code: `import { DockBottomGlass } from "@/app/ui-primitives/components/chrome"

export function QuickDock() {
  return (
    <DockBottomGlass
      actions={[
        { id: "book", label: "Book", onClick: () => book() },
        { id: "call", label: "Call", onClick: () => call() },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import DockBottomGlass.", "Pass actions.", "Use layout=\"static\" inside previews."] },
  accessibility: NAV_OVERLAY_A11Y,
  responsive: DOCK_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: true, acceptsChildren: false, notes: ["App-shell quick-action dock."] },
  agent: { whenToUse: "Use as a floating quick-action bar.", steps: ["Define the actions.", "Default fixed layout pins it to the bottom."], pitfalls: ["Use static layout for embedded previews."] },
  tags: ["dock", "glass", "quick-actions"],
}

const dockSideMagnetic: ComponentDocEntry = {
  key: "navigation/dock-side-magnetic",
  importName: "DockSideMagnetic",
  name: "Dock — side magnetic",
  summary: "Right-side vertical dock with magnetic hover and an optional divider.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/docks/side-magnetic",
  propsSchema: {
    fields: [
      { key: "actions", type: "array", required: true, description: "DockSideMagneticAction list." },
      { key: "dividerAfter", type: "number", required: false, min: 0 },
      { key: "layout", type: "enum", required: false, options: ["fixed", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_GLASS_TOKENS, { token: "--primitive-line", category: "color", usage: "divider + hairline" }, { token: "--primitive-radius-pill", category: "radius", usage: "dock shape" }, { token: "--primitive-duration-fast", category: "motion", usage: "magnetic hover" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { layout: "static" }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A magnetic side dock.",
    code: `import { DockSideMagnetic } from "@/app/ui-primitives/components/chrome"

export function SideDock() {
  return (
    <DockSideMagnetic
      actions={[
        { id: "chat", label: "Chat", onClick: () => chat() },
        { id: "top", label: "Top", onClick: () => scrollTop() },
      ]}
      dividerAfter={0}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import DockSideMagnetic.", "Pass actions.", "Optionally set dividerAfter."] },
  accessibility: { ...NAV_OVERLAY_A11Y, notes: ["Magnetic hover is transform-only and pauses under reduced-motion."] },
  responsive: DOCK_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: true, acceptsChildren: false, notes: ["App-shell side dock."] },
  agent: { whenToUse: "Use for a persistent right-edge action dock.", steps: ["Define actions.", "Group with dividerAfter."], pitfalls: ["Use static layout in previews."] },
  tags: ["dock", "magnetic", "side"],
}

const dockCornerQuick: ComponentDocEntry = {
  key: "navigation/dock-corner-quick",
  importName: "DockCornerQuick",
  name: "Dock — corner quick",
  summary: "Bottom-right FAB cluster: compose, chat (with badge), back-to-top, theme.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/docks/corner-quick",
  propsSchema: {
    fields: [
      { key: "chatBadge", type: "number", required: false, min: 0 },
      { key: "hintLabel", type: "string", required: false },
      { key: "layout", type: "enum", required: false, options: ["fixed", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_CTA_TOKENS, { token: "--primitive-radius-round", category: "radius", usage: "FAB shape" }, { token: "--primitive-shadow-raised", category: "shadow", usage: "FAB elevation" }, { token: "--primitive-focus-ring", category: "color", usage: "focus ring" }],
  iconDependencies: [
    { name: "pen-line", importPath: "lucide-react", usage: "compose FAB" },
    { name: "message-circle", importPath: "lucide-react", usage: "chat satellite" },
    { name: "arrow-up", importPath: "lucide-react", usage: "back-to-top" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { layout: "static", chatBadge: 3 }, background: "media", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A corner FAB cluster.",
    code: `"use client"

import { DockCornerQuick } from "@/app/ui-primitives/components/chrome"

export function CornerDock() {
  return (
    <DockCornerQuick
      chatBadge={3}
      onComposeClick={() => compose()}
      onChatClick={() => openChat()}
      onScrollTopClick={() => scrollTop()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import DockCornerQuick.", "Wire onComposeClick + onChatClick.", "Optionally wire scroll/theme handlers."] },
  accessibility: { ...NAV_OVERLAY_A11Y, notes: ["Each FAB is labelled; the chat badge is announced."] },
  responsive: DOCK_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: true, acceptsChildren: false, notes: ["App-shell FAB cluster."] },
  agent: { whenToUse: "Use for a persistent corner FAB cluster (compose + chat).", steps: ["Wire the required compose + chat handlers."], pitfalls: ["compose + chat handlers are required."] },
  tags: ["dock", "fab", "corner"],
}

const dockTabRail: ComponentDocEntry = {
  key: "navigation/dock-tab-rail",
  importName: "DockTabRail",
  name: "Dock — tab rail",
  summary: "Mobile-style bottom tab bar with an active item.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/docks/tab-rail",
  propsSchema: {
    fields: [
      { key: "items", type: "array", required: true, description: "DockTabRailItem list." },
      { key: "activeId", type: "string", required: true },
      { key: "layout", type: "enum", required: false, options: ["floating", "inline"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-red", category: "color", usage: "active tab accent" }, { token: "--primitive-radius-lg", category: "radius", usage: "rail corner" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { activeId: "home", layout: "inline" }, background: "panel", aspectRatio: "16/4", thumbnailBreakpoint: "sm" },
  codeExample: {
    language: "tsx",
    caption: "A bottom tab rail.",
    code: `"use client"

import { DockTabRail } from "@/app/ui-primitives/components/chrome"

export function Tabs() {
  return (
    <DockTabRail
      activeId="home"
      items={[
        { id: "home", label: "Home", href: "/" },
        { id: "shop", label: "Shop", href: "/shop" },
      ]}
      onSelect={(id) => go(id)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import DockTabRail.", "Pass items + activeId.", "Handle onSelect."] },
  accessibility: { ...NAV_OVERLAY_A11Y, role: "navigation", notes: ["Active tab carries aria-current."] },
  responsive: { mobile: "Primary navigation surface.", tablet: "Floating tab rail.", desktop: "Consider a sidebar instead." },
  cms: { cmsBlock: false, blockKind: "component", draggable: true, acceptsChildren: false, notes: ["Mobile app-shell navigation."] },
  agent: { whenToUse: "Use as a mobile bottom tab bar.", steps: ["Define tabs.", "Bind activeId to the route."], pitfalls: ["activeId must match an item id."] },
  tags: ["dock", "tabs", "mobile-nav"],
}

// — Slide-ups ——————————————————————————————————————————————

const slideUpActionSheet: ComponentDocEntry = {
  key: "navigation/slide-up-action-sheet",
  importName: "SlideUpActionSheet",
  name: "Slide-up — action sheet",
  summary: "Bottom action sheet of choices with a cancel affordance.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/slide-ups/action-sheet",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "string", required: false },
      { key: "actions", type: "array", required: true, description: "SlideUpActionSheetAction list." },
      { key: "cancelLabel", type: "string", required: false },
      { key: "embedded", type: "boolean", required: false, description: "Render in-flow for showcase routes." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-overlay", category: "color", usage: "scrim" }, { token: "--primitive-radius-xl", category: "radius", usage: "sheet top corners" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, title: "Choose action", embedded: true }, background: "media", aspectRatio: "3/4", thumbnailBreakpoint: "sm" },
  codeExample: {
    language: "tsx",
    caption: "A bottom action sheet.",
    code: `"use client"

import { useState } from "react"
import { SlideUpActionSheet } from "@/app/ui-primitives/components/chrome"

export function Actions() {
  const [open, setOpen] = useState(false)
  return (
    <SlideUpActionSheet
      open={open}
      onClose={() => setOpen(false)}
      title="Manage booking"
      actions={[{ id: "reschedule", label: "Reschedule", onClick: () => reschedule() }]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SlideUpActionSheet.", "Drive open + onClose.", "Pass actions."] },
  accessibility: { ...NAV_OVERLAY_A11Y, role: "dialog" },
  responsive: SLIDE_UP_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: false, acceptsChildren: false, notes: ["Imperative bottom sheet."] },
  agent: { whenToUse: "Use for a mobile action menu sliding from the bottom.", steps: ["Open on the trigger.", "Provide the action list."], pitfalls: ["Use embedded inside MobileViewport demos."] },
  tags: ["slide-up", "action-sheet", "mobile"],
}

const slideUpFullTakeover: ComponentDocEntry = {
  key: "navigation/slide-up-full-takeover",
  importName: "SlideUpFullTakeover",
  name: "Slide-up — full takeover",
  summary: "Full-height slide-up panel with a breadcrumb trail, body, and footer.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/slide-ups/full-takeover",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "kicker", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "trail", type: "array", required: false, description: "BreadcrumbItem list." },
      { key: "children", type: "json", required: true },
      { key: "footer", type: "json", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-canvas", category: "color", usage: "takeover background" }, { token: "--primitive-overlay", category: "color", usage: "scrim" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, kicker: "Quote", title: "Build your quote" }, background: "canvas", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A full-height slide-up.",
    code: `"use client"

import { useState } from "react"
import { SlideUpFullTakeover } from "@/app/ui-primitives/components/chrome"

export function Takeover() {
  const [open, setOpen] = useState(false)
  return (
    <SlideUpFullTakeover
      open={open}
      onClose={() => setOpen(false)}
      kicker="Quote"
      title="Build your quote"
    >
      {wizard}
    </SlideUpFullTakeover>
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SlideUpFullTakeover.", "Drive open + onClose.", "Render the flow as children."] },
  accessibility: { ...NAV_OVERLAY_A11Y, role: "dialog", notes: ["Breadcrumb trail renders as an ordered nav."] },
  responsive: SLIDE_UP_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: false, acceptsChildren: true, notes: ["Imperative full-height panel."] },
  agent: { whenToUse: "Use for a full-height mobile flow that slides up.", steps: ["Open on the trigger.", "Pass a breadcrumb trail + body."], pitfalls: ["Provide a clear close affordance."] },
  tags: ["slide-up", "takeover", "flow"],
}

const slideUpDetailCard: ComponentDocEntry = {
  key: "navigation/slide-up-detail-card",
  importName: "SlideUpDetailCard",
  name: "Slide-up — detail card",
  summary: "Bottom detail card with meta chips, stats, description, and two CTAs.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/slide-ups/detail-card",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "kicker", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "metas", type: "array", required: false, description: "{ id, label, tone } chips." },
      { key: "stats", type: "array", required: true, description: "SlideUpDetailStat list." },
      { key: "description", type: "string", required: false },
      { key: "primaryCta", type: "object", required: true, description: "{ label, onClick }." },
      { key: "secondaryCta", type: "object", required: false, description: "{ label, onClick }." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS, { token: "--primitive-overlay", category: "color", usage: "scrim" }, { token: "--primitive-radius-xl", category: "radius", usage: "card top corners" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, kicker: "Job", title: "Service #2041" }, background: "media", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A bottom detail card.",
    code: `"use client"

import { useState } from "react"
import { SlideUpDetailCard } from "@/app/ui-primitives/components/chrome"

export function Detail() {
  const [open, setOpen] = useState(false)
  return (
    <SlideUpDetailCard
      open={open}
      onClose={() => setOpen(false)}
      kicker="Job"
      title="Service #2041"
      stats={[{ id: "eta", label: "ETA", value: "45 min" }]}
      primaryCta={{ label: "Start job", onClick: () => start() }}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SlideUpDetailCard.", "Drive open + onClose.", "Provide stats + a primary CTA."] },
  accessibility: { ...NAV_OVERLAY_A11Y, role: "dialog" },
  responsive: SLIDE_UP_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: false, acceptsChildren: false, notes: ["Imperative detail sheet."] },
  agent: { whenToUse: "Use to preview an entity's details from a list.", steps: ["Open with the entity's data.", "Wire the CTAs."], pitfalls: ["primaryCta is required."] },
  tags: ["slide-up", "detail", "stats"],
}

const slideUpMultiStep: ComponentDocEntry = {
  key: "navigation/slide-up-multi-step",
  importName: "SlideUpMultiStep",
  name: "Slide-up — multi-step",
  summary: "Bottom multi-step flow with a controlled index, back/next, and finish.",
  category: "Chrome",
  kind: "component",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/slide-ups/multi-step",
  propsSchema: {
    fields: [
      { key: "open", type: "boolean", required: true },
      { key: "kicker", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "steps", type: "array", required: true, description: "SlideUpMultiStepStep list." },
      { key: "currentIndex", type: "number", required: true, min: 0 },
      { key: "finishLabel", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS, { token: "--primitive-overlay", category: "color", usage: "scrim" }, { token: "--primitive-red", category: "color", usage: "active step indicator" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { open: true, kicker: "Booking", title: "Book a service", currentIndex: 0 }, background: "media", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A controlled multi-step slide-up.",
    code: `"use client"

import { useState } from "react"
import { SlideUpMultiStep } from "@/app/ui-primitives/components/chrome"

export function Flow() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const steps = [{ id: "a", title: "Vehicle", content: vehicleForm }]
  return (
    <SlideUpMultiStep
      open={open}
      onClose={() => setOpen(false)}
      kicker="Booking"
      title="Book a service"
      steps={steps}
      currentIndex={index}
      onNext={() => setIndex((i) => i + 1)}
      onBack={() => setIndex((i) => Math.max(0, i - 1))}
      onFinish={() => submit()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SlideUpMultiStep.", "Own currentIndex in state.", "Wire onNext/onBack/onFinish."], notes: ["currentIndex is controlled — the component does not advance itself."] },
  accessibility: { ...NAV_OVERLAY_A11Y, role: "dialog" },
  responsive: SLIDE_UP_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "component", draggable: false, acceptsChildren: false, notes: ["Imperative step flow."] },
  agent: { whenToUse: "Use for a mobile multi-step flow sliding from the bottom.", steps: ["Control currentIndex.", "Advance via onNext/onBack."], pitfalls: ["You own step advancement — wire all three handlers."] },
  tags: ["slide-up", "wizard", "steps"],
}

// — Sidebars ———————————————————————————————————————————————

const sidebarCinematicVertical: ComponentDocEntry = {
  key: "navigation/sidebar-cinematic-vertical",
  importName: "SidebarCinematicVertical",
  name: "Sidebar — cinematic vertical",
  summary: "Tall branded sidebar with nav items and an EST. footer line.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/sidebars/cinematic-vertical",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "items", type: "array", required: true, description: "SidebarCinematicVerticalItem list." },
      { key: "footerLabel", type: "string", required: true },
      { key: "layout", type: "enum", required: false, options: ["sticky", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_TEXTURE_TOKENS, { token: "--primitive-red", category: "color", usage: "active item accent" }],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: { layout: "static", footerLabel: "EST. 1968" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A cinematic vertical sidebar.",
    code: `import { SidebarCinematicVertical } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function Sidebar() {
  return (
    <SidebarCinematicVertical
      brand={brand}
      items={[{ id: "dash", label: "Dashboard", href: "/", isActive: true }]}
      footerLabel="EST. 1968"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SidebarCinematicVertical.", "Pass brand + items.", "Set footerLabel."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: SIDEBAR_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["App-shell sidebar."] },
  agent: { whenToUse: "Use as a branded app sidebar.", steps: ["Pass nav items.", "Mark the active item."], pitfalls: ["Use static layout in previews."] },
  tags: ["sidebar", "navigation", "cinematic"],
}

const sidebarGlassCompact: ComponentDocEntry = {
  key: "navigation/sidebar-glass-compact",
  importName: "SidebarGlassCompact",
  name: "Sidebar — glass compact",
  summary: "Narrow glass sidebar with an optional divider and a user footer.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/sidebars/glass-compact",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "items", type: "array", required: true, description: "SidebarGlassCompactItem list." },
      { key: "dividerAfter", type: "number", required: false, min: 0 },
      { key: "user", type: "object", required: false, description: "{ name }." },
      { key: "layout", type: "enum", required: false, options: ["sticky", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_GLASS_TOKENS, { token: "--primitive-red", category: "color", usage: "active item accent" }],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: { layout: "static" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A compact glass sidebar.",
    code: `import { SidebarGlassCompact } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function CompactSidebar() {
  return (
    <SidebarGlassCompact
      brand={brand}
      items={[{ id: "dash", label: "Dashboard", href: "/", isActive: true }]}
      user={{ name: "Dan F." }}
      dividerAfter={2}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SidebarGlassCompact.", "Pass items.", "Add a user footer + divider."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: SIDEBAR_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["App-shell sidebar."] },
  agent: { whenToUse: "Use as a compact glass app sidebar.", steps: ["Pass items.", "Add the user footer."], pitfalls: ["Use static layout in previews."] },
  tags: ["sidebar", "glass", "compact"],
}

const sidebarMegaAnchored: ComponentDocEntry = {
  key: "navigation/sidebar-mega-anchored",
  importName: "SidebarMegaAnchored",
  name: "Sidebar — mega anchored",
  summary: "Grouped sidebar with sections, a search trigger, and a footer card.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/sidebars/mega-anchored",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "groups", type: "array", required: true, description: "SidebarMegaAnchoredGroup list." },
      { key: "footerCard", type: "object", required: false, description: "{ title, subtitle }." },
      { key: "layout", type: "enum", required: false, options: ["sticky", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-red", category: "color", usage: "active item accent" }, { token: "--primitive-radius-md", category: "radius", usage: "item corner" }],
  iconDependencies: [{ name: "search", importPath: "lucide-react", usage: "search trigger" }],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: { layout: "static" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A grouped mega sidebar.",
    code: `import { SidebarMegaAnchored } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function MegaSidebar() {
  return (
    <SidebarMegaAnchored
      brand={brand}
      groups={[
        { id: "ops", label: "Operations", items: [{ id: "jobs", label: "Jobs", href: "/jobs" }] },
      ]}
      footerCard={{ title: "Dan F.", subtitle: "Oak Flats workshop" }}
      onOpenSearch={() => openCommandPalette()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SidebarMegaAnchored.", "Pass grouped items.", "Wire onOpenSearch + footerCard."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: SIDEBAR_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["App-shell sidebar with grouped nav."] },
  agent: { whenToUse: "Use as a grouped dashboard sidebar.", steps: ["Group items into sections.", "Add a search trigger + footer card."], pitfalls: ["Keep group + item ids unique."] },
  tags: ["sidebar", "groups", "dashboard"],
}

const sidebarContextRail: ComponentDocEntry = {
  key: "navigation/sidebar-context-rail",
  importName: "SidebarContextRail",
  name: "Sidebar — context rail",
  summary: "Right-hand context rail with meta, stats, related links, and actions.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/sidebars/context-rail",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "metas", type: "array", required: true, description: "SidebarContextRailMeta list." },
      { key: "stats", type: "array", required: true, description: "SidebarContextRailStat list." },
      { key: "related", type: "array", required: true, description: "SidebarContextRailRelated list." },
      { key: "primaryAction", type: "object", required: true, description: "{ label, onClick }." },
      { key: "secondaryAction", type: "object", required: false, description: "{ label, onClick }." },
      { key: "layout", type: "enum", required: false, options: ["sticky", "static"] },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS, { token: "--primitive-radius-lg", category: "radius", usage: "rail card corners" }],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { layout: "static", kicker: "Context", title: "Service #2041" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A right-hand context rail.",
    code: `import { SidebarContextRail } from "@/app/ui-primitives/components/chrome"

export function ContextRail() {
  return (
    <SidebarContextRail
      kicker="Context"
      title="Service #2041"
      metas={[{ id: "bay", label: "Bay 2" }]}
      stats={[{ id: "eta", label: "ETA", value: "45m" }]}
      related={[{ id: "cust", label: "Customer", href: "/customers/9" }]}
      primaryAction={{ label: "Start job", onClick: () => start() }}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SidebarContextRail.", "Pass meta + stats + related.", "Provide a primary action."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "complementary", notes: ["Renders as an aside/complementary landmark."] },
  responsive: SIDEBAR_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Contextual detail rail bound to the focused entity."] },
  agent: { whenToUse: "Use as a right-hand detail rail beside a record.", steps: ["Pass meta/stats/related for the entity.", "Wire the primary action."], pitfalls: ["primaryAction is required."] },
  tags: ["sidebar", "context", "complementary"],
}

export const NAVIGATION_ENTRIES_B: readonly ComponentDocEntry[] = [
  dockBottomGlass,
  dockSideMagnetic,
  dockCornerQuick,
  dockTabRail,
  slideUpActionSheet,
  slideUpFullTakeover,
  slideUpDetailCard,
  slideUpMultiStep,
  sidebarCinematicVertical,
  sidebarGlassCompact,
  sidebarMegaAnchored,
  sidebarContextRail,
]
