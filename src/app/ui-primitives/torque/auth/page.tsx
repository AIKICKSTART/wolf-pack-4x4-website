import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuthScene } from "./auth-scene"
import styles from "./auth.module.css"

export const metadata: Metadata = {
  title: "Torque sign in / sign up | UI Primitives — Torque",
}

export default function TorqueAuthPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque / Access"
        title="Sign in / sign up"
        description="The Torque access surface — a split branded layout where Oak Flats Muffler Men signs in or provisions a new workshop. OAuth, a three-step signup wizard, live password strength, and a six-digit verification pad, all composed from existing auth primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Sign in / sign up" },
        ]}
      />
      <section className={styles.canvas} aria-label="Torque authentication">
        <AuthScene />
      </section>
    </main>
  )
}
