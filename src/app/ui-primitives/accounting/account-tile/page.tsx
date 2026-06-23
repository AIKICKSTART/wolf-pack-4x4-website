import type { Metadata } from "next"

import { AccountBalanceTile } from "../../components/accounting"
import { PageHeader } from "../../components/page-header"
import { DEMO_ACCOUNT_TILES } from "../demo-data"
import styles from "../accounting.module.css"

export const metadata: Metadata = {
  title: "Account balance tile | Accounting | UI Primitives",
  description: "Per-account balance tile with classification chip, current value and trailing sparkline.",
}

export default function AccountTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13"
        title="Account balance tile"
        description="Compact summary tile for any general ledger account. Surfaces the classification, current balance, percent change vs prior period and a trailing-12-period sparkline of the balance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting", href: "/ui-primitives/accounting" },
          { label: "Account tile" },
        ]}
      />
      <div className={styles.tilesRow}>
        {DEMO_ACCOUNT_TILES.map((tile) => (
          <AccountBalanceTile
            key={tile.code}
            code={tile.code}
            name={tile.name}
            classification={tile.classification}
            balance={tile.balance}
            changePct={tile.changePct}
            trend={tile.trend}
          />
        ))}
      </div>
    </main>
  )
}
