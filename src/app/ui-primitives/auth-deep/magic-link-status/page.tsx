import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MagicLinkStatus } from "../../components/auth-deep"

import {
  MAGIC_EXPIRED,
  MAGIC_OPENED,
  MAGIC_SENT,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Magic link status | Auth deep",
  description:
    "Primitive 03 — magic-link sent confirmation with masked email, countdown chip and inbox shortcut.",
}

export default function MagicLinkStatusPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Magic link"
        title="Magic link status"
        description="Email-link delivery state — sending, sent (with countdown), opened, expired. Email is partially masked; live region announces state changes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Magic link status" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Sent · awaiting inbox open</span>
        <MagicLinkStatus {...MAGIC_SENT} />

        <span className={styles.stageCaption}>Opened · finishing sign-in</span>
        <MagicLinkStatus {...MAGIC_OPENED} />

        <span className={styles.stageCaption}>Expired · prompt to resend</span>
        <MagicLinkStatus {...MAGIC_EXPIRED} />
      </section>
    </main>
  )
}
