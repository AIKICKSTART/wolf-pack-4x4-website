import type { Metadata } from "next"

import { PhoneOtpEntry } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Phone OTP entry | KYC",
  description:
    "Primitive 05 — verification-specific 6-cell SMS one-time-password pad with country code prefix and a resend timer.",
}

export default function PhoneOtpScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Mobile OTP"
        title="Phone OTP entry"
        description="Verification-specific 6-cell SMS one-time-password pad. Renders the country-code prefix beside the masked phone number, accepts paste and arrow-key navigation, and shows a live countdown until the user can resend the code. Inline error state on a bad code."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Phone OTP" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Australian mobile</span>
        <PhoneOtpEntry
          kicker="Mobile verification"
          title="Enter the SMS code"
          countryCode="+61"
          phoneNumber="432 118 904"
          resendSeconds={94}
        />
      </section>
    </main>
  )
}
