import type { Metadata } from "next"

import { AccountConnectorCard } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { buildAccounts, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Account connector card | Muffler Pulse",
  description:
    "Primitive 03 — connected social account tile with OAuth state, follower count, token expiry, retry CTA.",
}

export default function AccountConnectorCardPage() {
  const accounts = buildAccounts()
  const connected = accounts.find((a) => a.status === "connected")
  const expiring = accounts.find((a) => a.status === "expiring")
  const failed = accounts.find((a) => a.status === "expired" || a.status === "error")

  const platformFor = (key: string) =>
    PLATFORMS.find((p) => p.key === key) ?? PLATFORMS[0]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Account connector"
        title="Account connector card"
        description="The single connected-account tile. Renders the OAuth lifecycle states the team actually sees in production — healthy, expiring soon, expired with reconnect CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Account connector card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Connected (Instagram)</span>
        {connected && (
          <AccountConnectorCard
            account={connected}
            platform={platformFor(connected.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Expiring (TikTok)</span>
        {expiring && (
          <AccountConnectorCard
            account={expiring}
            platform={platformFor(expiring.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Expired with retry (X)</span>
        {failed && (
          <AccountConnectorCard
            account={failed}
            platform={platformFor(failed.platform)}
          />
        )}
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bonus · All Mufflermen channels</span>
        <div className={styles.pulseAccounts}>
          {accounts.map((account) => (
            <AccountConnectorCard
              key={account.id}
              account={account}
              platform={platformFor(account.platform)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
