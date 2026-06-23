import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ImpersonationBanner } from "../../components/auth-deep"

import {
  IMPERSONATION_BANNER,
  IMPERSONATION_URGENT,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Impersonation banner | Auth deep",
  description:
    "Primitive 13 — admin impersonation banner with reason ref, elapsed time and auto-exit countdown.",
}

export default function ImpersonationBannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Support"
        title="Impersonation banner"
        description="Persistent admin-impersonating-user banner — surfaces real admin label, subject, reason ticket and an explicit exit button. Urgent style triggers when auto-exit drops under one minute."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Impersonation banner" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Standard · 9 minute timer</span>
        <ImpersonationBanner {...IMPERSONATION_BANNER} />

        <span className={styles.stageCaption}>Urgent · auto-exit imminent</span>
        <ImpersonationBanner {...IMPERSONATION_URGENT} />
      </section>
    </main>
  )
}
