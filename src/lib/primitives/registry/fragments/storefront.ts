import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "storefront",
  "title": "Storefront",
  "group": "Commerce",
  "summary": "14 e-commerce storefront primitives for an Australian auto-parts shop — product grid/detail, cart drawer + mini badge, multi-step checkout (address, payment, summary, confirmation), search, faceted filters, wishlist, out-of-stock notify, and coupon entry — all sharing AUD currency, en-AU locale, and stock/fitment types.",
  "entries": [
    {
      "key": "storefront/product-list-grid",
      "family": "storefront",
      "name": "ProductListGrid",
      "label": "Product list grid",
      "description": "Responsive catalogue grid of product cards with badges, stock chips, ratings, price/Afterpay, per-card quantity stepper and add-to-cart, plus an empty state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/product-list-grid",
      "tags": [
        "catalogue",
        "grid",
        "add-to-cart",
        "stock"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/product-detail-page",
      "family": "storefront",
      "name": "ProductDetailPage",
      "label": "Product detail page",
      "description": "Full product detail layout with image gallery/thumbnails, variant radiogroups, quantity stepper, add-to-cart/wishlist, overview, specs and customer reviews.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/product-detail-page",
      "tags": [
        "pdp",
        "gallery",
        "variants",
        "reviews"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/cart-drawer",
      "family": "storefront",
      "name": "CartDrawer",
      "label": "Cart drawer",
      "description": "Modal slide-over cart with free-shipping progress bar, editable line items, postcode shipping estimate, totals (subtotal/freight/GST/discount) and a checkout button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/cart-drawer",
      "tags": [
        "cart",
        "drawer",
        "shipping",
        "totals"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/mini-cart-badge",
      "family": "storefront",
      "name": "MiniCartBadge",
      "label": "Mini cart badge",
      "description": "Compact cart trigger button showing item count (capped at 99+) with a pulse animation on increment and optional total label, in solid or outline variant.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/mini-cart-badge",
      "tags": [
        "cart",
        "badge",
        "header",
        "indicator"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/checkout-stepper",
      "family": "storefront",
      "name": "StorefrontCheckoutStepper",
      "label": "Checkout stepper",
      "description": "Ordered cart/shipping/payment/review progress nav with complete/current states, numbered or check badges, jump-to-stage buttons and a progress bar.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/checkout-stepper",
      "tags": [
        "checkout",
        "stepper",
        "progress",
        "nav"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/address-form-card",
      "family": "storefront",
      "name": "AddressFormCard",
      "label": "Address form card",
      "description": "Controlled Australian shipping-address form with address autocomplete/suggestions, state-territory select, postcode/phone fields, per-field errors and optional submit.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/address-form-card",
      "tags": [
        "checkout",
        "address",
        "form",
        "autocomplete"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/payment-method-card",
      "family": "storefront",
      "name": "PaymentMethodCard",
      "label": "Payment method card",
      "description": "Payment selector (card/Apple Pay/Google Pay/Afterpay/BPay) with a masked card form, Afterpay installment schedule, BPay biller details and a pay button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/payment-method-card",
      "tags": [
        "checkout",
        "payment",
        "afterpay",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/order-summary-rail",
      "family": "storefront",
      "name": "OrderSummaryRail",
      "label": "Order summary rail",
      "description": "Sticky checkout sidebar listing cart lines with quantities, totals (subtotal/freight/GST/coupon), grand total, ETA and secure-checkout trust badges.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/order-summary-rail",
      "tags": [
        "checkout",
        "summary",
        "totals",
        "rail"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/product-search-bar",
      "family": "storefront",
      "name": "ProductSearchBar",
      "label": "Product search bar",
      "description": "Keyboard-navigable search combobox with categorised suggestions (part/category/vehicle/rego), trending and recent searches, and an empty-results state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/product-search-bar",
      "tags": [
        "search",
        "combobox",
        "suggestions",
        "autocomplete"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/faceted-filter-panel",
      "family": "storefront",
      "name": "FacetedFilterPanel",
      "label": "Faceted filter panel",
      "description": "Refinement sidebar with active-filter chips and collapsible groups supporting checkbox, swatch, dual-handle range and rego-lookup facet kinds plus a result count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/faceted-filter-panel",
      "tags": [
        "filter",
        "facets",
        "refine",
        "range"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/wishlist-card",
      "family": "storefront",
      "name": "WishlistCard",
      "label": "Wishlist card",
      "description": "Saved-item card with brand/fitment, stock chip, price, a back-in-stock alert toggle, move-to-cart and remove actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/wishlist-card",
      "tags": [
        "wishlist",
        "saved",
        "stock-alert",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/out-of-stock-row",
      "family": "storefront",
      "name": "OutOfStockRow",
      "label": "Out of stock row",
      "description": "Out-of-stock product row with ETA, alternate-product suggestion, price, and an email back-in-stock notify form with validation and confirmation state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/out-of-stock-row",
      "tags": [
        "stock",
        "notify",
        "email",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/coupon-input-card",
      "family": "storefront",
      "name": "CouponInputCard",
      "label": "Coupon input card",
      "description": "Promo-code entry card with async apply (sync or promise), validation errors, a suggested code, and a list of applied coupons with discounts and remove buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/coupon-input-card",
      "tags": [
        "coupon",
        "promo",
        "discount",
        "checkout"
      ],
      "status": "captured"
    },
    {
      "key": "storefront/order-confirmation-card",
      "family": "storefront",
      "name": "OrderConfirmationCard",
      "label": "Order confirmation card",
      "description": "Post-purchase confirmation with order number (copy-to-clipboard), payment, totals, shipping/delivery/pick-up ETA blocks, and track/share/email-receipt actions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/storefront",
      "routeHref": "/ui-primitives/storefront/order-confirmation-card",
      "tags": [
        "order",
        "confirmation",
        "receipt",
        "tracking"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
