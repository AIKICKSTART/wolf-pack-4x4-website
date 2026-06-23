import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CustomerCallBanner } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Customer call banner | UI Primitives — Bay Display",
}

export default function CustomerCallBannerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.03 / Bay display"
        title="Customer call banner"
        description="Full-width call-out for the front-of-house bell. The Anton hero locks at clamp(56px, 7vw, 140px) so it reads across the waiting room. The bell sound never autoplays — the Ring button is the only trigger."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Customer call banner" },
        ]}
      />
      <section className={styles.canvas}>
        <CustomerCallBanner
          title="Mr"
          surname="Davis"
          message="Your vehicle is ready"
          bayLabel="Bay 3"
        />
        <CustomerCallBanner
          title="Ms"
          surname="Aleksic"
          message="Hilux finished — keys at the counter"
          bayLabel="Bay 2"
          bellSrc="/sounds/bell.mp3"
        />
        <CustomerCallBanner
          title="Mr"
          surname="McKinnon"
          message="Patrol off the dyno — come see"
          bayLabel="Bay 3"
          intense={false}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Sound is gated behind an explicit user click on the Ring button. A
            mute toggle sits next to it so floor staff can silence the bell
            mid-shift. The pulsing glow and color sweep both freeze when
            prefers-reduced-motion is set.
          </p>
        </div>
      </section>
    </main>
  )
}
