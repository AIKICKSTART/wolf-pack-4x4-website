import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "commerce",
  "title": "Commerce",
  "group": "Commerce",
  "summary": "13 commerce primitives for the Oak Flats workshop storefront — pricing, cart line items and summary, coupons, checkout/shipping steppers, order confirmation, saved payment methods and brand logos, wallet rows, subscription billing toggle, gift-card redemption, and freight estimation. Surfaced across eight composed showcase scenes (cart, checkout, order-confirmation, shipping-tracker, pricing, gift-card, wallet, payments).",
  "entries": [
    {
      "key": "commerce/price-tag",
      "family": "commerce",
      "name": "PriceTag",
      "label": "Price tag",
      "description": "Currency-formatted price with optional strikethrough compare-at price and computed savings percentage chip, in sm/md/lg sizes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "tags": [
        "pricing",
        "currency",
        "discount"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/cart-line-item",
      "family": "commerce",
      "name": "CartLineItem",
      "label": "Cart line item",
      "description": "Single cart row with thumbnail, SKU, option chips, a clamped quantity stepper, unit and line totals, and a remove action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/cart",
      "tags": [
        "cart",
        "quantity",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/cart-summary",
      "family": "commerce",
      "name": "CartSummary",
      "label": "Cart summary",
      "description": "Order-summary aside listing subtotal, freight, GST, discount and extra lines with a collapsible discount region, animated count-up total, and checkout CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/cart",
      "tags": [
        "cart",
        "totals",
        "checkout"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/coupon-field",
      "family": "commerce",
      "name": "CouponField",
      "label": "Coupon field",
      "description": "Coupon-code input that uppercases and submits a code, then swaps to an applied-coupon badge with description and remove control; supports busy and error states.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "tags": [
        "coupon",
        "discount",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/shipping-progress",
      "family": "commerce",
      "name": "ShippingProgress",
      "label": "Shipping progress",
      "description": "Horizontal or vertical ordered list of shipping stages with complete/current/upcoming states, a reduced-motion-aware pulse on the current step, and a live completion summary.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/shipping-tracker",
      "tags": [
        "shipping",
        "stepper",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/order-summary",
      "family": "commerce",
      "name": "OrderSummary",
      "label": "Order summary",
      "description": "Post-purchase confirmation card showing order number, placed date, ETA, itemized lines, totals, grand total price tag, and the shipping address.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/order-confirmation",
      "tags": [
        "order",
        "confirmation",
        "receipt"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/checkout-stepper",
      "family": "commerce",
      "name": "CheckoutStepper",
      "label": "Checkout stepper",
      "description": "Numbered checkout step nav with complete/current/upcoming states and a segmented linear progress bar reflecting the current step.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/checkout",
      "tags": [
        "checkout",
        "stepper",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/payment-method-card",
      "family": "commerce",
      "name": "PaymentMethodCard",
      "label": "Payment method card",
      "description": "Saved-card tile with brand logo, masked number, holder and expiry, a default badge, and set-default/edit/remove actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/payments",
      "tags": [
        "payment",
        "card",
        "wallet"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/payment-brand-logo",
      "family": "commerce",
      "name": "PaymentBrandLogo",
      "label": "Payment brand logo",
      "description": "Inline SVG logo for Visa, Mastercard, Amex, PayPal, Afterpay, Apple Pay, Google Pay, or a generic card, with accessible brand title.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/payments",
      "tags": [
        "payment",
        "logo",
        "svg"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/wallet-row",
      "family": "commerce",
      "name": "WalletRow",
      "label": "Wallet row",
      "description": "Tappable wallet entry rendering as link or button with an icon, label/caption, formatted balance with currency, tonal accent, and chevron affordance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/wallet",
      "tags": [
        "wallet",
        "balance",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/subscription-tier-toggle",
      "family": "commerce",
      "name": "SubscriptionTierToggle",
      "label": "Subscription tier toggle",
      "description": "Radiogroup segmented control for switching monthly/annual/lifetime billing cycles with optional savings badges and a sliding active thumb.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/pricing",
      "tags": [
        "subscription",
        "billing",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/gift-card-redeem",
      "family": "commerce",
      "name": "GiftCardRedeem",
      "label": "Gift card redeem",
      "description": "Gift-card redemption surface with a 4x4 segmented code input (paste/keyboard navigation), redeem CTA, and an animated balance-added reveal.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/commerce",
      "routeHref": "/ui-primitives/commerce/gift-card",
      "tags": [
        "gift-card",
        "redeem",
        "code-input"
      ],
      "status": "captured"
    },
    {
      "key": "commerce/freight-estimator",
      "family": "commerce",
      "name": "FreightEstimator",
      "label": "Freight estimator",
      "description": "Postcode-based freight lookup with 4-digit validation that, on submit, surfaces express/standard/economy tier estimates with prices and delivery windows.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/commerce",
      "tags": [
        "freight",
        "shipping",
        "estimator"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
