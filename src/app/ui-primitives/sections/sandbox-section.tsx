import type { CSSProperties } from "react"
import { Activity, MessageSquare, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { SectionHeader } from "./section-shell"

import styles from "../ui-primitives.module.css"
import local from "./sections.module.css"

const toneVar = (tone: string): CSSProperties => ({ "--tone": tone } as CSSProperties)

export function SandboxSection() {
  return (
    <section id="sandbox" className={styles.section}>
      <SectionHeader eyebrow="10 / Sandbox" title="Experiment lane before production rollout">
        Sandbox primitives isolate uncertain presentation choices without destabilizing the
        current homepage, SEO pages, or parts catalogue.
      </SectionHeader>

      <div className={styles.sandboxGrid}>
        <article className={`${styles.sandboxCard} ${local.labCard}`} style={toneVar("var(--primitive-amber)")}>
          <Activity aria-hidden="true" />
          <h3>Live quote amount</h3>
          <p>Test animated estimate ranges without changing production price cards.</p>
          <div className={styles.amountPreview}>
            <span>From</span>
            <strong className={local.amountFigure}>$680</strong>
            <small>inspection required</small>
          </div>
        </article>

        <article className={`${styles.sandboxCard} ${local.labCard}`} style={toneVar("var(--primitive-green)")}>
          <ShieldCheck aria-hidden="true" />
          <h3>Compliance marker</h3>
          <p>Trial ADR/legal sound flags for performance services and handover notes.</p>
          <div className={styles.compliancePreview}>
            <Badge>Legal note</Badge>
            <span>Noise, clearance, and emissions reviewed.</span>
          </div>
        </article>

        <article className={`${styles.sandboxCard} ${local.labCard}`} style={toneVar("var(--primitive-teal)")}>
          <MessageSquare aria-hidden="true" />
          <h3>Customer update</h3>
          <p>Prototype SMS/email message states before wiring delivery automation.</p>
          <div className={styles.messagePreview}>
            <strong>Photo received</strong>
            <span>We can quote this from the current underbody shot.</span>
          </div>
        </article>
      </div>
    </section>
  )
}
