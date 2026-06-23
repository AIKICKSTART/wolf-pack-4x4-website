import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MobileTechCard } from "../../components/workshop-scenes/mobile-tech-card"
import type { MobileTechCardProps } from "../../components/workshop-scenes/mobile-tech-card"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Mobile tech | UI Primitives — Workshop Scenes",
}

const techs: ReadonlyArray<MobileTechCardProps> = [
  {
    name: "Jordan Webb",
    role: "Mobile fit van · van 4",
    status: "on-job",
    currentJobNumber: "FIELD-114",
    currentJobTitle: "Hilux N80 mid-muffler swap",
    currentLocation: "Bank St · Oak Flats",
    etaMinutes: 18,
    distanceKm: 6.4,
  },
  {
    name: "Kahli Forbes",
    role: "Mobile fit · van 5",
    status: "busy",
    currentJobNumber: "FIELD-115",
    currentJobTitle: "Patrol Y62 cabin sound damping",
    currentLocation: "Schofield Pde · Warilla",
    etaMinutes: 42,
    distanceKm: 11.2,
  },
  {
    name: "Sef Tapuala",
    role: "Mobile fit · van 6",
    status: "offline",
    currentJobNumber: "STBY-002",
    currentJobTitle: "Off shift — rostered back at 13:00",
    currentLocation: "Depot · Industrial Rd",
    etaMinutes: 0,
    distanceKm: 0,
  },
]

export default function MobileTechScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.12 / Workshop scenes"
        title="Mobile tech card"
        description="The dispatcher's view of every mobile fitter — avatar, status, current job, ETA, distance, and the two contact CTAs reception leans on."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Mobile tech" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          {techs.map((tech) => (
            <MobileTechCard key={tech.name} {...tech} />
          ))}
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Status pulse glows for the two active states (on-job, travelling)
            and falls silent for off-shift. ETA chip clamps to On site at zero
            minutes so reception never has to wonder whether the van is
            already there.
          </p>
        </div>
      </section>
    </main>
  )
}
