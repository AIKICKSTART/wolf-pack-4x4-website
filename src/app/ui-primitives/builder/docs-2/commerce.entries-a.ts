/**
 * Commerce family doc entries — part A (price tag → order summary).
 * Split from `commerce.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"
import { COMMERCE_PATH, STATIC_A11Y } from "./commerce.shared"

const COMPONENT_PATH = COMMERCE_PATH

const priceTag: ComponentDocEntry = {
  key: "commerce/price-tag",
  importName: "PriceTag",
  name: "Price tag",
  summary: "Localised price with optional compare-at strike-through and size variants.",
  category: "Commerce",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/pricing",
  propsSchema: {
    fields: [
      { key: "amount", type: "number", required: true, min: 0 },
      { key: "currency", type: "string", required: false, description: "ISO code; defaults to AUD." },
      { key: "compareAt", type: "number", required: false, min: 0 },
      { key: "size", type: "enum", required: false, options: ["sm", "md", "lg"], description: "PriceTagSize." },
      { key: "locale", type: "string", required: false },
      { key: "ariaLabel", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-text-strong", category: "color", usage: "current price" },
    { token: "--primitive-muted", category: "color", usage: "compare-at strike" },
    { token: "--primitive-red", category: "color", usage: "sale emphasis" },
    { token: "--primitive-h3", category: "typography", usage: "lg price size" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { amount: 129.95, compareAt: 159.95, size: "lg" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A sale price.",
    code: `import { PriceTag } from "@/app/ui-primitives/components/commerce"

export function Price() {
  return <PriceTag amount={129.95} compareAt={159.95} size="lg" />
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import PriceTag.", "Pass amount (+ compareAt for sales).", "Set currency/locale if not AUD."] },
  accessibility: { ...STATIC_A11Y, keyboard: [], visibleFocus: false, notes: ["Formatted via Intl; provide ariaLabel for screen-reader-friendly pricing."] },
  responsive: { mobile: "Scales with size prop.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Composed inside product cards/lists."],
  },
  agent: {
    whenToUse: "Use anywhere a formatted price is shown.",
    steps: ["Pass amount.", "Add compareAt for a strike-through."],
    pitfalls: ["amount is a number, not a pre-formatted string."],
  },
  tags: ["price", "money", "commerce"],
}

const cartLineItem: ComponentDocEntry = {
  key: "commerce/cart-line-item",
  importName: "CartLineItem",
  name: "Cart line item",
  summary: "Cart row with thumbnail, options, a clamped quantity stepper, and remove.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/cart",
  propsSchema: {
    fields: [
      { key: "id", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "sku", type: "string", required: true },
      { key: "unitPrice", type: "number", required: true, min: 0 },
      { key: "quantity", type: "number", required: true, min: 0 },
      { key: "thumbnail", type: "image", required: false },
      { key: "thumbnailAlt", type: "string", required: false },
      { key: "options", type: "array", required: false, description: "CartLineItemOption list." },
      { key: "currency", type: "string", required: false },
      { key: "minQuantity", type: "number", required: false, min: 0 },
      { key: "maxQuantity", type: "number", required: false, min: 1 },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "row surface" },
    { token: "--primitive-line", category: "color", usage: "row divider" },
    { token: "--primitive-field-bg", category: "color", usage: "quantity stepper" },
    { token: "--primitive-muted", category: "color", usage: "sku + options" },
    { token: "--primitive-radius-md", category: "radius", usage: "thumbnail + stepper corners" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "minus", importPath: "lucide-react", usage: "decrement quantity" },
    { name: "plus", importPath: "lucide-react", usage: "increment quantity" },
    { name: "trash-2", importPath: "lucide-react", usage: "remove line" },
  ],
  assetDependencies: [{ id: "thumbnail", type: "image", required: false, description: "Optional product thumbnail." }],
  previewConfig: { sampleProps: { id: "l1", title: "Sports muffler", sku: "MUF-204", unitPrice: 129.95, quantity: 1 }, background: "panel", aspectRatio: "16/5" },
  codeExample: {
    language: "tsx",
    caption: "A cart line with a quantity stepper.",
    code: `import { CartLineItem } from "@/app/ui-primitives/components/commerce"

export function Line() {
  return (
    <CartLineItem
      id="l1"
      title="Sports muffler"
      sku="MUF-204"
      unitPrice={129.95}
      quantity={1}
      maxQuantity={9}
      onQuantityChange={(id, qty) => update(id, qty)}
      onRemove={(id) => remove(id)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import CartLineItem.", "Pass id/title/sku/unitPrice/quantity.", "Handle onQuantityChange / onRemove."], notes: ["Quantity is clamped to min/maxQuantity."] },
  accessibility: { ...STATIC_A11Y, notes: ["Stepper buttons are labelled; thumbnail needs thumbnailAlt."] },
  responsive: { mobile: "Thumbnail + details stack; stepper stays tappable.", tablet: "Inline row.", desktop: "Inline row." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Rendered per cart line from cart state."],
  },
  agent: {
    whenToUse: "Use to render each line in a shopping cart.",
    steps: ["Render per cart item.", "Clamp via min/maxQuantity.", "Persist quantity/remove changes."],
    pitfalls: ["Provide thumbnailAlt when a thumbnail is set."],
  },
  tags: ["cart", "line-item", "quantity"],
}

const cartSummary: ComponentDocEntry = {
  key: "commerce/cart-summary",
  importName: "CartSummary",
  name: "Cart summary",
  summary: "Totals panel with subtotal/freight/GST/discount, extra lines, and a checkout CTA.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/cart",
  propsSchema: {
    fields: [
      { key: "subtotal", type: "number", required: true, min: 0 },
      { key: "freight", type: "number", required: true, min: 0 },
      { key: "gst", type: "number", required: true, min: 0 },
      { key: "total", type: "number", required: true, min: 0 },
      { key: "discount", type: "number", required: false, min: 0 },
      { key: "currency", type: "string", required: false },
      { key: "extraLines", type: "array", required: false, description: "CartSummaryLine list." },
      { key: "discountSlot", type: "json", required: false, description: "Slot for a coupon field." },
      { key: "checkoutLabel", type: "string", required: false },
      { key: "busy", type: "boolean", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "summary surface" },
    { token: "--primitive-line", category: "color", usage: "line dividers" },
    { token: "--primitive-text-strong", category: "color", usage: "total" },
    { token: "--primitive-muted", category: "color", usage: "line labels" },
    { token: "--primitive-btn-primary-bg", category: "button", usage: "checkout CTA" },
    { token: "--primitive-radius-lg", category: "radius", usage: "summary corner" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { subtotal: 259.9, freight: 14.95, gst: 27.48, total: 302.33 }, background: "panel", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A cart totals panel with a coupon slot.",
    code: `import { CartSummary, CouponField } from "@/app/ui-primitives/components/commerce"

export function Summary() {
  return (
    <CartSummary
      subtotal={259.9}
      freight={14.95}
      gst={27.48}
      total={302.33}
      discountSlot={<CouponField onApply={(code) => apply(code)} />}
      onCheckout={() => checkout()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import CartSummary.", "Pass subtotal/freight/gst/total.", "Slot a CouponField + handle onCheckout."] },
  accessibility: { ...STATIC_A11Y, notes: ["All figures use tabular-nums; checkout CTA follows the primary-button standard."] },
  responsive: { mobile: "Full-width sticky panel.", tablet: "Side panel.", desktop: "Side panel beside the line items." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Bound to cart state."],
  },
  agent: {
    whenToUse: "Use as the totals panel of a cart page.",
    steps: ["Pass the computed totals.", "Slot a coupon field.", "Wire checkout."],
    pitfalls: ["Compute total upstream; the component does not sum for you."],
  },
  tags: ["cart", "totals", "checkout"],
}

const couponField: ComponentDocEntry = {
  key: "commerce/coupon-field",
  importName: "CouponField",
  name: "Coupon field",
  summary: "Promo-code input with apply/remove, busy, applied, and error states.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/cart",
  propsSchema: {
    fields: [
      { key: "applied", type: "object", required: false, description: "AppliedCoupon ({ code, label, ... })." },
      { key: "placeholder", type: "string", required: false },
      { key: "busy", type: "boolean", required: false },
      { key: "error", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "input surface" },
    { token: "--primitive-line", category: "color", usage: "input border" },
    { token: "--primitive-green", category: "color", usage: "applied state" },
    { token: "--primitive-red", category: "color", usage: "error state" },
    { token: "--primitive-radius-md", category: "radius", usage: "input corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "tag", importPath: "lucide-react", usage: "coupon glyph" },
    { name: "x", importPath: "lucide-react", usage: "remove applied coupon" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { placeholder: "Promo code" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A coupon input.",
    code: `import { CouponField } from "@/app/ui-primitives/components/commerce"

export function Coupon() {
  return (
    <CouponField
      placeholder="Promo code"
      onApply={(code) => apply(code)}
      onRemove={() => clear()}
    />
  )
}`,
  },
  usageExamples: [
    {
      title: "Applied state",
      description: "Pass applied to show the active coupon with a remove affordance.",
      example: { language: "tsx", code: `<CouponField applied={{ code: "SAVE10", label: "10% off" }} onRemove={clear} />` },
    },
  ],
  setupInstructions: { steps: ["Import CouponField.", "Handle onApply / onRemove.", "Surface error/busy from your request."] },
  accessibility: { ...STATIC_A11Y, notes: ["Error text is associated with the input for screen readers."] },
  responsive: { mobile: "Input + apply stack if needed.", tablet: "Inline.", desktop: "Inline." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Slotted into CartSummary or checkout."],
  },
  agent: {
    whenToUse: "Use to capture and apply a promo code.",
    steps: ["Wire onApply to validation.", "Reflect applied/error/busy from the result."],
    pitfalls: ["Show the error string when validation fails."],
  },
  tags: ["coupon", "promo", "discount"],
}

const shippingProgress: ComponentDocEntry = {
  key: "commerce/shipping-progress",
  importName: "ShippingProgress",
  name: "Shipping progress",
  summary: "Stepped shipment tracker (horizontal or vertical) with per-step status.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/shipping-tracker",
  propsSchema: {
    fields: [
      { key: "steps", type: "array", required: true, description: "ShippingStep list ({ id, label, status })." },
      { key: "orientation", type: "enum", required: false, options: ["horizontal", "vertical"] },
      { key: "ariaLabel", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-line", category: "color", usage: "connector track" },
    { token: "--primitive-green", category: "color", usage: "completed step" },
    { token: "--primitive-amber", category: "color", usage: "in-progress step" },
    { token: "--primitive-muted", category: "color", usage: "pending step" },
    { token: "--primitive-radius-round", category: "radius", usage: "step node" },
  ],
  iconDependencies: [{ name: "check", importPath: "lucide-react", usage: "completed step mark" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { orientation: "horizontal" }, background: "panel", aspectRatio: "16/5" },
  codeExample: {
    language: "tsx",
    caption: "A shipment tracker.",
    code: `import { ShippingProgress } from "@/app/ui-primitives/components/commerce"

export function Tracker() {
  return (
    <ShippingProgress
      steps={[
        { id: "packed", label: "Packed", status: "complete" },
        { id: "transit", label: "In transit", status: "current" },
        { id: "delivered", label: "Delivered", status: "upcoming" },
      ]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import ShippingProgress.", "Pass ordered steps with status.", "Choose orientation."] },
  accessibility: { ...STATIC_A11Y, keyboard: [], visibleFocus: false, role: "list", notes: ["Provide ariaLabel describing the shipment."] },
  responsive: { mobile: "Switch to vertical for narrow widths.", tablet: "Horizontal.", desktop: "Horizontal." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Bound to fulfilment state."],
  },
  agent: {
    whenToUse: "Use to visualise shipment/fulfilment stages.",
    steps: ["Order steps logically.", "Mark exactly one current step."],
    pitfalls: ["Prefer vertical orientation on mobile."],
  },
  tags: ["shipping", "stepper", "tracking"],
}

const orderSummary: ComponentDocEntry = {
  key: "commerce/order-summary",
  importName: "OrderSummary",
  name: "Order summary",
  summary: "Order confirmation panel with items, address, totals, and ETA.",
  category: "Commerce",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/commerce/order-confirmation",
  propsSchema: {
    fields: [
      { key: "orderNumber", type: "string", required: true },
      { key: "placedAt", type: "string", required: true },
      { key: "eta", type: "string", required: true },
      { key: "customerName", type: "string", required: true },
      { key: "shippingAddress", type: "object", required: true, description: "OrderSummaryAddress." },
      { key: "items", type: "array", required: true, description: "OrderSummaryItem list." },
      { key: "subtotal", type: "number", required: true, min: 0 },
      { key: "freight", type: "number", required: true, min: 0 },
      { key: "gst", type: "number", required: true, min: 0 },
      { key: "total", type: "number", required: true, min: 0 },
      { key: "discount", type: "number", required: false, min: 0 },
      { key: "currency", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "panel surface" },
    { token: "--primitive-line", category: "color", usage: "section dividers" },
    { token: "--primitive-text-strong", category: "color", usage: "total + order number" },
    { token: "--primitive-muted", category: "color", usage: "labels + address" },
    { token: "--primitive-radius-lg", category: "radius", usage: "panel corner" },
    { token: "--primitive-font-mono", category: "typography", usage: "order number" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { orderNumber: "OF-10231", placedAt: "1 Jun", eta: "5 Jun", customerName: "Dan", total: 302.33 }, background: "panel", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "An order confirmation summary.",
    code: `import { OrderSummary } from "@/app/ui-primitives/components/commerce"

export function Confirmation() {
  return (
    <OrderSummary
      orderNumber="OF-10231"
      placedAt="1 Jun 2026"
      eta="5 Jun 2026"
      customerName="Dan Fleuren"
      shippingAddress={{ line1: "1 Industrial Dr", suburb: "Oak Flats", state: "NSW", postcode: "2529" }}
      items={[{ id: "i1", title: "Sports muffler", quantity: 1, price: 129.95 }]}
      subtotal={129.95}
      freight={14.95}
      gst={14.49}
      total={159.39}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import OrderSummary.", "Pass order header + items + totals.", "Render on the confirmation page."] },
  accessibility: { ...STATIC_A11Y, keyboard: [], visibleFocus: false },
  responsive: { mobile: "Sections stack.", tablet: "Two-column header.", desktop: "Two-column with items table." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Bound to a placed order."],
  },
  agent: {
    whenToUse: "Use on the order-confirmation page.",
    steps: ["Map the placed order to props.", "Pass computed totals."],
    pitfalls: ["total/gst are precomputed, not derived here."],
  },
  tags: ["order", "confirmation", "receipt"],
}

export const COMMERCE_ENTRIES_A: readonly ComponentDocEntry[] = [
  priceTag,
  cartLineItem,
  cartSummary,
  couponField,
  shippingProgress,
  orderSummary,
]
