import type { Metadata } from "next"

import { EftposTerminalPanel } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "EFTPOS terminal | POS checkout",
  description:
    "Primitive 03 — Tyro / Square / Stripe EFTPOS prompt panel with status messages and indeterminate progress while waiting.",
}

const WAITING_MESSAGES: ReadonlyArray<string> = [
  "[13:42:12] PROMPT · Insert, tap or swipe",
  "[13:42:13] LINK · Bay 1 lane connected · Tyro 2.7.4",
  "[13:42:14] MSG · $2,116.50 AUD inc GST",
]

const APPROVED_MESSAGES: ReadonlyArray<string> = [
  "[13:42:21] CARD · Visa **** 4242 · contactless",
  "[13:42:22] HOST · Auth code 02814 · APPROVED",
  "[13:42:22] PRINT · Customer copy queued",
]

const DECLINED_MESSAGES: ReadonlyArray<string> = [
  "[13:42:31] CARD · Mastercard **** 1881 · contactless",
  "[13:42:31] HOST · Issuer DECLINED · insufficient funds",
  "[13:42:31] PROMPT · Use another card or split",
]

export default function EftposTerminalPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / EFTPOS"
        title="EFTPOS terminal panel"
        description="Tyro / Square / Stripe terminal prompt with rolling log messages, indeterminate progress while waiting, and cancel / retry actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "EFTPOS terminal" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · waiting for card · $2,116.50</span>
        <EftposTerminalPanel
          provider="tyro"
          amount={2116.5}
          status="waiting"
          messages={WAITING_MESSAGES}
        />
        <span className={styles.stageCaption}>State 02 · approved Visa contactless</span>
        <EftposTerminalPanel
          provider="tyro"
          amount={2116.5}
          status="approved"
          messages={APPROVED_MESSAGES}
        />
        <span className={styles.stageCaption}>State 03 · Square decline + surcharge</span>
        <EftposTerminalPanel
          provider="square"
          terminalId="SQ-OFM-02"
          amount={2116.5}
          surcharge={21.16}
          status="declined"
          messages={DECLINED_MESSAGES}
        />
      </section>
    </main>
  )
}
