import type { Metadata } from "next"

import { MemberBenefitChip } from "../../components/loyalty/member-benefit-chip"
import { PageHeader } from "../../components/page-header"

import styles from "../loyalty.module.css"

export const metadata: Metadata = {
  title: "Member benefit chip | Loyalty | UI Primitives",
  description:
    "Tiny per-benefit chip — variant earned / saved / redeemed / pending. Built on the primitive Chip with a soft drop-shadow per tone.",
}

export default function MemberBenefitChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 13"
        title="Member benefit chip"
        description="Four tone variants used across the member portal. Each chip composes the primitive Chip with a tone derived from the variant."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty", href: "/ui-primitives/loyalty" },
          { label: "Member benefit chip" },
        ]}
      />
      <section className={[styles.sceneShell, styles.benefitsRow].join(" ")}>
        <MemberBenefitChip benefitLabel="Workshop credit" earnedAmount={250} variant="earned" />
        <MemberBenefitChip benefitLabel="Exhaust discount" earnedAmount={140} variant="saved" />
        <MemberBenefitChip benefitLabel="Pre-inspection waiver" earnedAmount={85} variant="redeemed" />
        <MemberBenefitChip benefitLabel="Quarterly dyno session" earnedAmount={180} variant="pending" />
        <MemberBenefitChip benefitLabel="Branded merch pack" earnedAmount={60} variant="redeemed" />
        <MemberBenefitChip benefitLabel="Bay 2 priority slot" earnedAmount={50} variant="saved" />
      </section>
    </main>
  )
}
