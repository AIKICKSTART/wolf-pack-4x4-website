import type { Metadata } from "next"

import { AchMandateCard } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "ACH mandate | Billing | UI Primitives",
  description:
    "Direct debit mandate card primitive — BSB, account, bank name, mandate text, signature input, revoke action.",
}

export default function AchMandatePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06"
        title="ACH mandate"
        description="Direct Debit Authority surface — bank details, mandate agreement text, hand-written-feel signature input. Status chip switches between Pending / Active / Revoked / Failed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "ACH mandate" },
        ]}
      />
      <AchMandateCard
        bsb="062-005"
        accountLast4="4291"
        bankName="Commonwealth Bank"
        accountHolder="Tarrawanna Marine Pty Ltd"
        mandateId="DDA-118402"
        status="active"
      />
    </main>
  )
}
