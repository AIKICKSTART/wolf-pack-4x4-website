import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceMenuBoard } from "../../components/bay-display"
import { MENU_SERVICES } from "../bay-display-mock"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Service menu board | UI Primitives — Bay Display",
}

export default function ServiceMenuBoardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.09 / Bay display"
        title="Service menu board"
        description="Menu-board layout for the waiting room — cat-back fit, headers, dyno tune, DPF clean. Each row pairs the service name with a from-price; signature picks flag a red Signature ribbon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Service menu board" },
        ]}
      />
      <section className={styles.canvas}>
        <ServiceMenuBoard
          heading="Workshop menu"
          kicker="Albion Park"
          services={MENU_SERVICES}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Custom-fab and other negotiable services pass fromPrice 0 and
            render as POA. Dot leaders connect copy and price across the row,
            matching the diner-menu aesthetic the waiting room earns.
          </p>
        </div>
      </section>
    </main>
  )
}
