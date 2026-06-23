/**
 * Commerce family doc entries — part B (checkout stepper → freight estimator).
 * Split from `commerce.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"
import { COMMERCE_PATH, STATIC_A11Y } from "./commerce.shared"

const COMPONENT_PATH = COMMERCE_PATH

const checkoutStepper: ComponentDocEntry = {
  key: "commerce/checkout-stepper",
  importName: "CheckoutStepper",
  name: "Checkout stepper",
  summary: "Horizontal checkout progress across cart → details → payment → done.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/checkout",
  propsSchema: {
    fields: [
      { key: "steps", type: "array", required: true, description: "CheckoutStep list ({ id, label, status })." },
      { key: "ariaLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-line", category: "color", usage: "connector track" },
    { token: "--primitive-red", category: "color", usage: "active step accent" },
    { token: "--primitive-green", category: "color", usage: "completed step" },
    { token: "--primitive-muted", category: "color", usage: "upcoming step" },
    { token: "--primitive-radius-round", category: "radius", usage: "step node" },
  ],
  iconDependencies: [{ name: "check", importPath: "lucide-react", usage: "completed step mark" }],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A checkout progress bar.",
    code: `import { CheckoutStepper } from "@/app/ui-primitives/components/commerce"

export function Steps() {
  return (
    <CheckoutStepper
      steps={[
        { id: "cart", label: "Cart", status: "complete" },
        { id: "details", label: "Details", status: "current" },
        { id: "payment", label: "Payment", status: "upcoming" },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import CheckoutStepper.", "Pass ordered steps.", "Update status as the user advances."] },
  accessibility: { ...STATIC_A11Y, keyboard: [], visibleFocus: false, role: "list", notes: ["Provide ariaLabel for the checkout progress."] },
  responsive: { mobile: "Labels condense; nodes remain visible.", tablet: "Full labels.", desktop: "Full labels." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Bound to checkout flow state."],
  },
  agent: {
    whenToUse: "Use across the checkout flow to show progress.",
    steps: ["Define the steps once.", "Mark exactly one current step."],
    pitfalls: ["Keep step order stable across pages."],
  },
  tags: ["checkout", "stepper", "progress"],
}

const paymentMethodCard: ComponentDocEntry = {
  key: "commerce/payment-method-card",
  importName: "PaymentMethodCard",
  name: "Payment method card",
  summary: "Saved-card row with brand, masked number, default flag, and edit/remove/set-default.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/payments",
  propsSchema: {
    fields: [
      { key: "brand", type: "enum", required: true, description: "PaymentBrand." },
      { key: "label", type: "string", required: true },
      { key: "maskedNumber", type: "string", required: true },
      { key: "expiry", type: "string", required: false },
      { key: "holder", type: "string", required: false },
      { key: "isDefault", type: "boolean", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-line", category: "color", usage: "card border" },
    { token: "--primitive-amber", category: "color", usage: "default-method accent" },
    { token: "--primitive-font-mono", category: "typography", usage: "masked number" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { brand: "visa", label: "Personal Visa", maskedNumber: "•••• 4242", isDefault: true }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A saved payment method.",
    code: `import { PaymentMethodCard } from "@/app/ui-primitives/components/commerce"

export function Method() {
  return (
    <PaymentMethodCard
      brand="visa"
      label="Personal Visa"
      maskedNumber="•••• 4242"
      expiry="08/28"
      isDefault
      onSetDefault={() => setDefault()}
      onRemove={() => remove()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import PaymentMethodCard.", "Pass brand + maskedNumber.", "Handle edit/remove/set-default."] },
  accessibility: { ...STATIC_A11Y, notes: ["Only the masked number is rendered — never full PAN."] },
  responsive: { mobile: "Actions wrap below the number.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per saved payment method."],
  },
  agent: {
    whenToUse: "Use to list a user's saved cards.",
    steps: ["Render per method.", "Reflect the default flag.", "Wire the action handlers."],
    pitfalls: ["Never render unmasked card data."],
  },
  tags: ["payment", "card", "billing"],
}

const paymentBrandLogo: ComponentDocEntry = {
  key: "commerce/payment-brand-logo",
  importName: "PaymentBrandLogo",
  name: "Payment brand logo",
  summary: "Inline SVG brand mark (Visa, Mastercard, etc.) accepting SVG props.",
  category: "Commerce",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/payments",
  propsSchema: {
    fields: [
      { key: "brand", type: "enum", required: true, description: "PaymentBrand." },
      { key: "title", type: "string", required: false, description: "Accessible SVG title; omit for decorative use." },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-icon-lg", category: "icon", usage: "default logo height" },
  ],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-marks", type: "vector", required: true, description: "Built-in inline SVG brand marks (no external asset)." }],
  previewConfig: { sampleProps: { brand: "visa" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A payment brand mark.",
    code: `import { PaymentBrandLogo } from "@/app/ui-primitives/components/commerce"

export function Brands() {
  return (
    <div>
      <PaymentBrandLogo brand="visa" title="Visa" />
      <PaymentBrandLogo brand="mastercard" title="Mastercard" />
    </div>
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import PaymentBrandLogo.", "Pass the brand.", "Pass title for a labelled mark, or omit when decorative."] },
  accessibility: { ...STATIC_A11Y, keyboard: [], visibleFocus: false, notes: ["With title the SVG is labelled; without it, treat it as decorative (aria-hidden)."] },
  responsive: { mobile: "Scales via SVG sizing props.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Composed inside payment rows/footers."],
  },
  agent: {
    whenToUse: "Use to render accepted-card brand marks.",
    steps: ["Pass the brand enum.", "Add title only when the mark conveys meaning."],
    pitfalls: ["Accepts native SVG props (size via width/height)."],
  },
  tags: ["payment", "logo", "svg"],
}

const walletRow: ComponentDocEntry = {
  key: "commerce/wallet-row",
  importName: "WalletRow",
  name: "Wallet row",
  summary: "Balance row with an icon, caption, formatted balance, and tone.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/wallet",
  propsSchema: {
    fields: [
      { key: "icon", type: "icon", required: true, description: "Leading icon node." },
      { key: "label", type: "string", required: true },
      { key: "balance", type: "number", required: true },
      { key: "caption", type: "string", required: false },
      { key: "currency", type: "string", required: false },
      { key: "href", type: "url", required: false },
      { key: "tone", type: "enum", required: false, options: ["neutral", "amber", "teal", "green"] },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-amber", category: "color", usage: "amber tone" },
    { token: "--primitive-teal", category: "color", usage: "teal tone" },
    { token: "--primitive-green", category: "color", usage: "green tone" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { label: "Store credit", balance: 42.5, tone: "teal" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A store-credit balance row.",
    code: `import { Wallet } from "lucide-react"
import { WalletRow } from "@/app/ui-primitives/components/commerce"

export function Credit() {
  return (
    <WalletRow
      icon={<Wallet aria-hidden="true" />}
      label="Store credit"
      balance={42.5}
      caption="Expires 30 Jun"
      tone="teal"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import WalletRow.", "Pass an icon node + label + balance.", "Set tone + href if linkable."] },
  accessibility: { ...STATIC_A11Y, notes: ["Balance uses tabular-nums; aria-hide the icon."] },
  responsive: { mobile: "Single row; balance aligns right.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Rendered per wallet/balance."],
  },
  agent: {
    whenToUse: "Use to show a balance (store credit, gift card, points).",
    steps: ["Pass an aria-hidden icon.", "Format-free number for balance.", "Set tone."],
    pitfalls: ["Aria-hide the leading icon."],
  },
  tags: ["wallet", "balance", "credit"],
}

const subscriptionTierToggle: ComponentDocEntry = {
  key: "commerce/subscription-tier-toggle",
  importName: "SubscriptionTierToggle",
  name: "Subscription tier toggle",
  summary: "Segmented control to switch billing tiers (e.g. monthly/yearly).",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/pricing",
  propsSchema: {
    fields: [
      { key: "options", type: "array", required: true, description: "SubscriptionTierOption list." },
      { key: "value", type: "enum", required: true, description: "SubscriptionTier." },
      { key: "ariaLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "track surface" },
    { token: "--primitive-panel-strong", category: "color", usage: "selected pill" },
    { token: "--primitive-red", category: "color", usage: "selected accent" },
    { token: "--primitive-radius-pill", category: "radius", usage: "track + pill shape" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { value: "monthly" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A billing-cycle toggle.",
    code: `"use client"

import { useState } from "react"
import { SubscriptionTierToggle } from "@/app/ui-primitives/components/commerce"

export function Cycle() {
  const [value, setValue] = useState<"monthly" | "yearly">("monthly")
  return (
    <SubscriptionTierToggle
      value={value}
      onChange={setValue}
      options={[
        { id: "monthly", label: "Monthly" },
        { id: "yearly", label: "Yearly", badge: "Save 20%" },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import SubscriptionTierToggle.", "Pass options + value.", "Handle onChange."] },
  accessibility: { ...STATIC_A11Y, notes: ["Behaves as a radiogroup; arrow keys move selection."], keyboard: ["Arrow keys move", "Enter/Space select"] },
  responsive: { mobile: "Full-width segmented control.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Drives a pricing table; options are owner-editable."],
  },
  agent: {
    whenToUse: "Use to switch billing cycles/tiers on a pricing page.",
    steps: ["Provide options with ids.", "Bind value + onChange."],
    pitfalls: ["value must match an option id."],
  },
  tags: ["subscription", "toggle", "pricing"],
}

const giftCardRedeem: ComponentDocEntry = {
  key: "commerce/gift-card-redeem",
  importName: "GiftCardRedeem",
  name: "Gift card redeem",
  summary: "Gift-card entry with redeem, busy, redeemed result, and error.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/gift-card",
  propsSchema: {
    fields: [
      { key: "redeemed", type: "object", required: false, description: "GiftCardRedeemResult or null." },
      { key: "busy", type: "boolean", required: false },
      { key: "error", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-field-bg", category: "color", usage: "code input" },
    { token: "--primitive-green", category: "color", usage: "redeemed state" },
    { token: "--primitive-red", category: "color", usage: "error state" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [{ name: "gift", importPath: "lucide-react", usage: "gift card glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A gift-card redeem card.",
    code: `import { GiftCardRedeem } from "@/app/ui-primitives/components/commerce"

export function Redeem() {
  return (
    <GiftCardRedeem
      onRedeem={(code) => redeem(code)}
    />
  )
}`,
  },
  usageExamples: [
    {
      title: "Redeemed result",
      description: "Pass redeemed to show the applied balance.",
      example: { language: "tsx", code: `<GiftCardRedeem redeemed={{ code: "GC-001", balance: 50 }} />` },
    },
  ],
  setupInstructions: { steps: ["Import GiftCardRedeem.", "Handle onRedeem.", "Reflect redeemed/busy/error from the result."] },
  accessibility: { ...STATIC_A11Y, notes: ["Error text is associated with the code input."] },
  responsive: { mobile: "Input + button stack.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Used at checkout or in wallet."],
  },
  agent: {
    whenToUse: "Use to redeem a gift card.",
    steps: ["Wire onRedeem.", "Show redeemed balance on success.", "Show error on failure."],
    pitfalls: ["Set busy during the redeem request."],
  },
  tags: ["gift-card", "redeem", "wallet"],
}

const freightEstimator: ComponentDocEntry = {
  key: "commerce/freight-estimator",
  importName: "FreightEstimator",
  name: "Freight estimator",
  summary: "Postcode-driven shipping estimate with tiered options.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/shipping-tracker",
  propsSchema: {
    fields: [
      { key: "estimates", type: "array", required: false, description: "FreightEstimate list ({ tier, label, cost, eta })." },
      { key: "busy", type: "boolean", required: false },
      { key: "currency", type: "string", required: false },
      { key: "defaultPostcode", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "estimator surface" },
    { token: "--primitive-field-bg", category: "color", usage: "postcode input" },
    { token: "--primitive-line", category: "color", usage: "option dividers" },
    { token: "--primitive-text-strong", category: "color", usage: "estimate cost" },
    { token: "--primitive-radius-lg", category: "radius", usage: "card corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [{ name: "truck", importPath: "lucide-react", usage: "freight glyph" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { defaultPostcode: "2529" }, background: "panel", aspectRatio: "4/3" },
  codeExample: {
    language: "tsx",
    caption: "A freight estimator.",
    code: `import { FreightEstimator } from "@/app/ui-primitives/components/commerce"

export function Freight() {
  return (
    <FreightEstimator
      defaultPostcode="2529"
      onEstimate={(postcode) => estimate(postcode)}
      estimates={[
        { tier: "standard", label: "Standard", cost: 14.95, eta: "3–5 days" },
        { tier: "express", label: "Express", cost: 29.95, eta: "1–2 days" },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FreightEstimator.", "Handle onEstimate(postcode).", "Pass estimates from your rate quote."] },
  accessibility: { ...STATIC_A11Y, notes: ["Estimate costs use tabular-nums."] },
  responsive: { mobile: "Options stack.", tablet: "Stacked options.", desktop: "Options table." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Bound to a freight-rate service."],
  },
  agent: {
    whenToUse: "Use to estimate shipping by postcode in cart/checkout.",
    steps: ["Wire onEstimate.", "Render returned tiers.", "Set busy while quoting."],
    pitfalls: ["Validate the postcode before quoting."],
  },
  tags: ["freight", "shipping", "estimate"],
}

export const COMMERCE_ENTRIES_B: readonly ComponentDocEntry[] = [
  checkoutStepper,
  paymentMethodCard,
  paymentBrandLogo,
  walletRow,
  subscriptionTierToggle,
  giftCardRedeem,
  freightEstimator,
]
