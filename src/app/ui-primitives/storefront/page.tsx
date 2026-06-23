import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./storefront.module.css"

export const metadata: Metadata = {
  title: "Storefront | UI Primitives",
  description:
    "Fourteen reusable storefront primitives for the Oak Flats Mufflermen e-commerce surface — product grid, PDP, cart drawer, mini cart badge, checkout stepper, address form, payment methods, order summary rail, search, faceted filters, wishlist, out-of-stock notify, coupon entry, and order confirmation.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Product list grid",
    body: "Product cards with quick-view hover, inline qty stepper, and add-to-cart for the catalogue grid surface.",
    href: "/ui-primitives/storefront/product-list-grid",
    accent: "amber",
    state: "Grid",
  },
  {
    kicker: "Primitive 02",
    title: "Product detail page",
    body: "PDP with media gallery, variant picker, fitment chip, spec sheet and verified-buyer reviews.",
    href: "/ui-primitives/storefront/product-detail-page",
    accent: "teal",
    state: "PDP",
  },
  {
    kicker: "Primitive 03",
    title: "Cart drawer",
    body: "Slide-out cart with line edit, swipe-to-remove, free shipping progress and postcode estimate.",
    href: "/ui-primitives/storefront/cart-drawer",
    accent: "red",
    state: "Cart",
  },
  {
    kicker: "Primitive 04",
    title: "Mini cart badge",
    body: "Header cart icon with count badge, pulse on add, and optional total label.",
    href: "/ui-primitives/storefront/mini-cart-badge",
    accent: "amber",
    state: "Badge",
  },
  {
    kicker: "Primitive 05",
    title: "Checkout stepper",
    body: "Cart → Shipping → Payment → Review with status, captions and segmented progress.",
    href: "/ui-primitives/storefront/checkout-stepper",
    accent: "green",
    state: "Stepper",
  },
  {
    kicker: "Primitive 06",
    title: "Address form card",
    body: "Shipping address with autocomplete, AU state/territory picker and validation surface.",
    href: "/ui-primitives/storefront/address-form-card",
    accent: "teal",
    state: "Form",
  },
  {
    kicker: "Primitive 07",
    title: "Payment method card",
    body: "Card · Apple Pay · Google Pay · Afterpay (4×$322.50) · BPay biller code picker with declined state.",
    href: "/ui-primitives/storefront/payment-method-card",
    accent: "green",
    state: "Payment",
  },
  {
    kicker: "Primitive 08",
    title: "Order summary rail",
    body: "Sticky right rail with items, shipping, GST, coupon discount, total and trust badges.",
    href: "/ui-primitives/storefront/order-summary-rail",
    accent: "amber",
    state: "Rail",
  },
  {
    kicker: "Primitive 09",
    title: "Product search bar",
    body: "Search with autocomplete suggestions, trending, recent searches and ⌘K shortcut.",
    href: "/ui-primitives/storefront/product-search-bar",
    accent: "teal",
    state: "Search",
  },
  {
    kicker: "Primitive 10",
    title: "Faceted filter panel",
    body: "Left-rail filters — brand, category, price range, finish swatches and rego-based fitment match.",
    href: "/ui-primitives/storefront/faceted-filter-panel",
    accent: "amber",
    state: "Filters",
  },
  {
    kicker: "Primitive 11",
    title: "Wishlist card",
    body: "Saved-item card with stock alert toggle, move-to-cart and quick remove.",
    href: "/ui-primitives/storefront/wishlist-card",
    accent: "red",
    state: "Wishlist",
  },
  {
    kicker: "Primitive 12",
    title: "Out-of-stock row",
    body: "OOS row with ETA, alternate suggestion CTA and inline notify-me capture.",
    href: "/ui-primitives/storefront/out-of-stock-row",
    accent: "red",
    state: "OOS",
  },
  {
    kicker: "Primitive 13",
    title: "Coupon input card",
    body: "Promo entry with apply/error/applied states, auto-applied chip and inline suggestion.",
    href: "/ui-primitives/storefront/coupon-input-card",
    accent: "green",
    state: "Coupon",
  },
  {
    kicker: "Primitive 14",
    title: "Order confirmation card",
    body: "Thank-you card with order #, ETA blocks, copy, share, track and email-again actions.",
    href: "/ui-primitives/storefront/order-confirmation-card",
    accent: "green",
    state: "Confirmed",
  },
  {
    kicker: "Bonus",
    title: "Full shop",
    body: "Composes search, faceted filters, product grid, cart drawer, coupon card and order rail into a live storefront surface.",
    href: "/ui-primitives/storefront/full-shop",
    accent: "teal",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function StorefrontIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Storefront · commerce pack"
        title="Storefront primitive pack"
        description="Fourteen reusable e-commerce surfaces for Oak Flats Mufflermen — product grid, PDP, cart drawer, mini cart, checkout stepper, AU address form, payment methods (card / Apple Pay / Google Pay / Afterpay / BPay), order summary rail, search, faceted filters, wishlist, out-of-stock notify, coupon entry, and order confirmation. Bonus: a full shop composition route."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront" },
        ]}
      />

      <span className={styles.notice}>
        Storefront primitives — composed for the e-commerce surface
      </span>

      <section className={styles.grid} aria-label="Storefront primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbHeadline} />
                <div className={styles.thumbRows}>
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                  <span className={styles.thumbRow} />
                </div>
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
