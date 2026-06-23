import type { Metadata } from "next"

import { SslCertCard } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { CERTIFICATES } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "SSL cert card | Deploy console",
  description:
    "Primitive 09 — TLS certificate card with expiry countdown and auto-renew toggle.",
}

const HEALTHY = CERTIFICATES.find((c) => c.health === "healthy") ?? CERTIFICATES[0]
const RENEWING = CERTIFICATES.find((c) => c.health === "renewing") ?? CERTIFICATES[1]
const WARNING = CERTIFICATES.find((c) => c.health === "warning") ?? CERTIFICATES[2]
const CRITICAL = CERTIFICATES.find((c) => c.health === "critical") ?? CERTIFICATES[3]

export default function SslCertCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Card"
        title="SSL cert card"
        description="TLS certificate card. CN, issuer, SAN list, expiry countdown with a visual bar and an auto-renew toggle. Tone shifts from green through red as expiry approaches. Auto-renew toggle wires aria-checked correctly and respects the readonly prop."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "SSL cert card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · healthy · 64 days remaining · auto-renew on</span>
        <SslCertCard certificate={HEALTHY} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · renewing · 8 days remaining · Hermes</span>
        <SslCertCard certificate={RENEWING} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · warning + critical · apex 3d away · internal expired 2d ago</span>
        <SslCertCard certificate={WARNING} />
        <SslCertCard certificate={CRITICAL} />
      </section>
    </main>
  )
}
