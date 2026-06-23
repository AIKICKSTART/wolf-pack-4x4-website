import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SupplierLoginSurface } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Supplier login | UI Primitives — Supplier Portal",
}

export default function SupplierLoginPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.01 / Supplier portal"
        title="Supplier login surface"
        description="Trade sign-in with account ID + password + 2FA prompt. Brand pane on the left, form pane on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Login surface" },
        ]}
      />
      <section className={styles.canvas}>
        <SupplierLoginSurface
          supplierName="Manta Performance"
          defaultAccount="manta-performance"
          twoFactorRequired
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Suppliers always land on their trade login first. Two-factor is on by default for
            trade accounts because dispatch confirmation has financial consequences.
          </p>
        </div>
      </section>
    </main>
  )
}
