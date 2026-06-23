import { Gift, Plus, Wallet, Ticket, Banknote } from "lucide-react"
import type { Metadata } from "next"

import { WalletRow } from "../../components/commerce/wallet-row"
import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

export const metadata: Metadata = {
  title: "Wallet | Commerce | UI Primitives",
  description:
    "Customer wallet — credit balance hero, multi-currency rows, top-up CTA, payout options.",
}

interface WalletEntry {
  key: string
  icon: typeof Wallet
  label: string
  caption: string
  balance: number
  tone?: "amber" | "teal" | "green" | "neutral"
}

const ENTRIES: ReadonlyArray<WalletEntry> = [
  {
    key: "store-credit",
    icon: Wallet,
    label: "Workshop credit",
    caption: "Gift cards and refunds combined",
    balance: 340.0,
    tone: "green",
  },
  {
    key: "loyalty-rewards",
    icon: Ticket,
    label: "Loyalty rewards",
    caption: "Earn 2% on every workshop visit",
    balance: 84.5,
    tone: "amber",
  },
  {
    key: "gift-balance",
    icon: Gift,
    label: "Gift balance",
    caption: "From OFM-WORK-2024-XMAS",
    balance: 100.0,
    tone: "teal",
  },
  {
    key: "afterpay-credit",
    icon: Banknote,
    label: "Afterpay credit",
    caption: "Available for instalment orders",
    balance: 250.0,
    tone: "neutral",
  },
]

export default function WalletPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 07"
        title="Wallet"
        description="Combined workshop credit, loyalty rewards, gift card balance, and Afterpay credit — all in one place."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Wallet" },
        ]}
      />

      <section className={styles.walletHero} aria-labelledby="wallet-balance-title">
        <span id="wallet-balance-title" className={styles.walletKicker}>Total available balance</span>
        <strong className={styles.walletBalance}>
          $774.50
          <span className={styles.walletCurrency}>AUD</span>
        </strong>
        <button type="button" className={styles.walletCta}>
          <Plus size={16} aria-hidden="true" />
          <span>Top up wallet</span>
        </button>
      </section>

      <section className={styles.walletList} aria-label="Wallet rows">
        {ENTRIES.map((entry) => {
          const Icon = entry.icon
          return (
            <WalletRow
              key={entry.key}
              icon={<Icon size={20} strokeWidth={1.8} aria-hidden="true" />}
              label={entry.label}
              caption={entry.caption}
              balance={entry.balance}
              tone={entry.tone}
              href={`/ui-primitives/commerce/wallet#${entry.key}`}
            />
          )
        })}
      </section>
    </main>
  )
}
