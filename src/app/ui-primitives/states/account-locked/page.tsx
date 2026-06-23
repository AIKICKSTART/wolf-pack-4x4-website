import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateAccountLocked } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Account locked · 423 | UI Primitives — System States",
}

export default function AccountLockedShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.04 / System states"
        title="Bay closed · account on hold"
        description="Padlock + brake-rotor security hold surface. Reasons list, account reference, and twin actions for unlock + workshop desk contact."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Account locked" },
        ]}
      />
      <section className={styles.canvas}>
        <StateAccountLocked
          accountRef="MM-0182 · Lana Petrov · Oak Flats"
          lockedAt="2026-05-28 07:14 AEST"
          reasons={[
            "Five failed sign-in attempts inside ten minutes from a new device.",
            "Sign-in from an IP range outside the Illawarra service area.",
            "ADR verification step skipped on the last booking confirmation.",
          ]}
          primaryAction={
            <Link href="/ui-primitives/auth" className={styles.btnRed}>
              Send unlock link
            </Link>
          }
          secondaryAction={
            <a href="tel:+61242961234" className={styles.btnGhost}>
              Call workshop desk
            </a>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;alert&quot; with a labelled reasons list. The shackle jiggle and the rotor
            spin both freeze under prefers-reduced-motion.
          </p>
        </aside>
      </section>
    </main>
  )
}
