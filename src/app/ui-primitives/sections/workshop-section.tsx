import { Clock3, ImageIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"

const workshopSteps = [
  "Vehicle details",
  "Sound target",
  "Fitment check",
  "Quote approval",
  "Workshop slot",
] as const

type ServiceCard = {
  title: string
  meta: string
  status: string
}

const serviceCards: ServiceCard[] = [
  {
    title: "Custom exhaust",
    meta: "Mandrel bends / stainless / tuned sound",
    status: "High intent",
  },
  {
    title: "Muffler repair",
    meta: "Rattle, leak, bracket, hanger, weld",
    status: "Fast quote",
  },
  {
    title: "Extractors",
    meta: "Headers / collectors / clearance check",
    status: "Fitment",
  },
]

export function WorkshopSection() {
  return (
    <section id="workshop" className={styles.section}>
      <SectionHeader eyebrow="08 / Workshop UX" title="Domain primitives for Oak Flats Mufflermen">
        These are the last 20 percent from the video: reusable components specific to this
        workshop, not generic SaaS controls.
      </SectionHeader>

      <div className={styles.workshopGrid}>
        <article className={styles.quoteFlow}>
          <div className={styles.sampleHeader}>
            <h3>Quote path</h3>
            <Badge>5 steps</Badge>
          </div>
          <ol className={local.stepConnector}>
            {workshopSteps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </article>

        {serviceCards.map((service) => (
          <article className={`${styles.servicePrimitive} ${local.domainCard}`} key={service.title}>
            <Badge variant="outline">{service.status}</Badge>
            <h3>{service.title}</h3>
            <p>{service.meta}</p>
            <Button size="sm" variant="outline">View primitive</Button>
          </article>
        ))}

        <article className={`${styles.partPrimitive} ${local.domainCard}`}>
          <span className={styles.partThumb}>
            <ImageIcon aria-hidden="true" />
          </span>
          <span className={styles.kicker}>SSMBM-003</span>
          <h3>Manta 3 inch stainless system</h3>
          <p>Manta / Complete systems / RRP <span className={local.priceFigure}>$1,289.00</span></p>
          <div>
            <Badge variant="secondary">Real image</Badge>
            <Badge variant="outline">Fitment note</Badge>
          </div>
        </article>

        <article className={`${styles.jobPrimitive} ${local.domainCard}`}>
          <div>
            <Clock3 aria-hidden="true" />
            <span>Next slot</span>
          </div>
          <strong className={local.priceFigure}>Tue 8:30 AM</strong>
          <p>Drop off for inspection, quote lock, and weld bay allocation.</p>
        </article>
      </div>
    </section>
  )
}
