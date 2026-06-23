import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PasskeyManagementCard } from "../../components/auth-deep"

import { PASSKEYS, PASSKEY_EMPTY } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Passkey management card | Auth deep",
  description:
    "Primitive 04 — passkey list with transport, manufacturer, last-used and revoke action.",
}

export default function PasskeyManagementCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Passkeys"
        title="Passkey management card"
        description="WebAuthn passkey register with transport surface, last-used and revoke. Revoked devices stay dimmed in the list for audit reference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Passkey management card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Populated · 3 active + 1 revoked</span>
        <PasskeyManagementCard
          ownerLabel="Mick Davies · Oak Flats Mufflermen"
          passkeys={PASSKEYS}
          policyNote="Passkey-only login enforced"
        />

        <span className={styles.stageCaption}>Empty · onboarding prompt</span>
        <PasskeyManagementCard
          ownerLabel="Jase Moretti · Illawarra 4WD Co"
          passkeys={PASSKEY_EMPTY}
        />
      </section>
    </main>
  )
}
