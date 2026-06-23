import type { Metadata } from "next"

import { DnsRecordRow } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { DNS_RECORDS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "DNS record row | Deploy console",
  description:
    "Primitive 08 — DNS record row with TTL and propagation progress.",
}

const PROPAGATED = DNS_RECORDS.find((r) => r.state === "propagated") ?? DNS_RECORDS[0]
const PARTIAL = DNS_RECORDS.find((r) => r.state === "partial") ?? DNS_RECORDS[2]
const DRIFTED = DNS_RECORDS.find((r) => r.state === "drift") ?? DNS_RECORDS[4]
const PENDING = DNS_RECORDS.find((r) => r.state === "pending") ?? DNS_RECORDS[5]

export default function DnsRecordRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Row"
        title="DNS record row"
        description="One row per DNS record. Type badge (A / AAAA / CNAME / MX / TXT / NS / CAA), TTL with human formatting, value in a mono block and a propagation progress bar with state chip (pending / partial / propagated / drift)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "DNS record row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · fully propagated · primitives apex A record</span>
        <DnsRecordRow record={PROPAGATED} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · partial · 68% of resolvers see the CNAME</span>
        <DnsRecordRow record={PARTIAL} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · drift / pending · SPF mismatch + fresh ACME challenge</span>
        <DnsRecordRow record={DRIFTED} />
        <DnsRecordRow record={PENDING} />
      </section>
    </main>
  )
}
