/**
 * Component documentation manifest — `commerce` family.
 *
 * Cart + checkout + billing primitives: price tag, cart line item, cart summary,
 * coupon field, shipping progress, order summary, checkout stepper, payment
 * method card, payment brand logo, wallet row, subscription tier toggle, gift
 * card redeem, and a freight estimator. Sourced READ-ONLY from
 * `src/app/ui-primitives/components/commerce`.
 *
 * Entries live in `commerce.entries-a.ts` / `commerce.entries-b.ts` (split for
 * the 800-line cap); this file composes them. Every design value is referenced
 * as a central `--primitive-*` token name.
 */

import { COMMERCE_ENTRIES_A } from "./commerce.entries-a"
import { COMMERCE_ENTRIES_B } from "./commerce.entries-b"
import { COMMERCE_PATH } from "./commerce.shared"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

const entries: readonly ComponentDocEntry[] = [
  ...COMMERCE_ENTRIES_A,
  ...COMMERCE_ENTRIES_B,
]

const commerceDocs: ComponentDocFamily = {
  family: "commerce",
  title: "Commerce",
  group: "Commerce",
  summary:
    "Cart + checkout + billing primitives: price tag, cart line item + summary, coupon field, shipping progress, order summary, checkout stepper, payment method card + brand logo, wallet row, subscription tier toggle, gift card redeem, and a freight estimator.",
  importPath: COMMERCE_PATH,
  entries,
}

export default commerceDocs
