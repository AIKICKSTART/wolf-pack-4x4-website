import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConsentRecordRow } from "../../components/auth-deep"

import { CONSENT_RECORDS } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Consent record row | Auth deep",
  description:
    "Primitive 12 — consent record row with version, IP, accepted/withdrawn timestamps and withdraw action.",
}

export default function ConsentRecordRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Consent"
        title="Consent record row"
        description="Auditable consent record with policy version, source, masked IP and explicit withdraw button."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Consent record row" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Accepted · terms v4.2</span>
        <ConsentRecordRow {...CONSENT_RECORDS[0]} />

        <span className={styles.stageCaption}>Accepted · privacy v3.0</span>
        <ConsentRecordRow {...CONSENT_RECORDS[1]} />

        <span className={styles.stageCaption}>Withdrawn · marketing opt-out</span>
        <ConsentRecordRow {...CONSENT_RECORDS[2]} />

        <span className={styles.stageCaption}>Expired · cookies v2.0</span>
        <ConsentRecordRow {...CONSENT_RECORDS[3]} />

        <span className={styles.stageCaption}>Pending · AI processing consent</span>
        <ConsentRecordRow {...CONSENT_RECORDS[4]} />
      </section>
    </main>
  )
}
