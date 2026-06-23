import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  PaymentIconStrip,
  QuickProductGrid,
  ReceiptPrinterRow,
} from "../../components/pos-checkout"

import {
  ABN_EMPTY,
  COUPON_OPTIONS,
  CUSTOMER_VIP,
  DENOMINATIONS_FLOAT,
  DISCOUNT_REASONS,
  QUICK_PRODUCTS,
  RECEIPT_QUEUE,
  REFUND_CANDIDATES,
  REFUND_REASONS,
} from "../_mock-data"
import styles from "../pos-checkout.module.css"

import { FullRegisterScene } from "./full-register-scene"

export const metadata: Metadata = {
  title: "Full register | POS checkout",
  description:
    "Bonus composition — Oak Flats Bay 1 register, wiring the cart panel, barcode scanner, Tyro EFTPOS prompt, split tender, customer lookup, discount picker, tax tile, void card and receipt preview into one live register.",
}

export default function FullRegisterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full register"
        description="A composed Bay 1 register surface — scanner, cart panel, quick product grid, customer lookup, split tender, EFTPOS prompt, tax summary, void and receipt preview all wired together with Oak Flats fixtures."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Full register" },
        ]}
      />

      <FullRegisterScene
        customer={CUSTOMER_VIP}
        quickProducts={QUICK_PRODUCTS}
        discountReasons={DISCOUNT_REASONS}
        refundCandidates={REFUND_CANDIDATES}
        refundReasons={REFUND_REASONS}
        couponOptions={COUPON_OPTIONS}
        initialAbn={ABN_EMPTY}
        denominations={DENOMINATIONS_FLOAT}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Quick grid · top sellers · same instance</span>
        <QuickProductGrid products={QUICK_PRODUCTS} />
      </section>

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Accepted brands · Bay 1 strip</span>
        <PaymentIconStrip
          accepted={["visa", "mastercard", "amex", "eftpos", "applepay", "googlepay"]}
          note="Tyro EFTPOS · Apple/Google Pay tap supported"
        />
        <span className={styles.stageCaption}>Receipt queue · live print log</span>
        <div className={styles.queueList} role="list">
          {RECEIPT_QUEUE.map((entry) => (
            <ReceiptPrinterRow key={entry.id} {...entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
