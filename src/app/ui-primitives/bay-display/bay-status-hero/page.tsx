import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BayStatusHero } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Bay status hero | UI Primitives — Bay Display",
}

export default function BayStatusHeroPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.01 / Bay display"
        title="Bay status hero"
        description="Large-format bay card sized for 5 m viewing distance. Bay number sits in Anton at 156 px, status chip is right-aligned with a pulsing accent dot, and the vehicle stack reads as the second hierarchy beat."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Bay status hero" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <BayStatusHero
            bay="bay-2"
            status="in-bay"
            vehicle="Hilux N80 GUN126R · BTR-882"
            customer="Aleksic"
            mechanic="Jordan Pace"
            eta="12:40 pm"
            pulse
          />
          <BayStatusHero
            bay="bay-3"
            status="dyno"
            vehicle="Patrol Y62 5.6L · QXK-014"
            customer="McKinnon"
            mechanic="Sophie Tan"
            eta="1:20 pm"
            pulse
          />
        </div>
        <div className={styles.row}>
          <BayStatusHero
            bay="bay-4"
            status="ready"
            vehicle="VE Commodore SS · CTU-491"
            customer="Rakuljic"
            mechanic="Trent Williams"
            eta="now"
            pulse
          />
          <BayStatusHero
            bay="bay-1"
            status="clear"
            pulse={false}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Status tone drives an accent rail, the chip colour and the pulse
            ring. The clear state shows a dashed placeholder. The pulse honours
            prefers-reduced-motion by freezing at a quiet halo.
          </p>
        </div>
      </section>
    </main>
  )
}
