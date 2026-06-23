import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DeviceTrustRow } from "../../components/auth-deep"

import { DEVICE_TRUST_ROWS } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Device trust row | Auth deep",
  description:
    "Primitive 08 — trusted device row with scope, fingerprint, extend and remove actions.",
}

export default function DeviceTrustRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Trust"
        title="Device trust row"
        description="Trusted device record — scope (this session / 30 days / forever), masked fingerprint and clean extend or remove path."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Device trust row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Forever-trusted · current device</span>
        <DeviceTrustRow {...DEVICE_TRUST_ROWS[0]} />

        <span className={styles.stageCaption}>30-day window</span>
        <DeviceTrustRow {...DEVICE_TRUST_ROWS[1]} />

        <span className={styles.stageCaption}>Single-session iPad</span>
        <DeviceTrustRow {...DEVICE_TRUST_ROWS[2]} />
      </section>
    </main>
  )
}
