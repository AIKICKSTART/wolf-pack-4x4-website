import type { Metadata } from "next"

import { SubRouteShell } from "../sub-route-shell"
import styles from "../three-scenes.module.css"

export const metadata: Metadata = {
  title: "Interactive card stack | UI Primitives — 3D",
}

export default function CardStackPage() {
  return (
    <SubRouteShell
      scene="card-stack"
      index="10"
      title="Interactive quote bay — select and lift"
      description="The live workshop quote deck rendered as 3D cards, with selectable status chips, bay labels, selected-quote mirrors, progress meters, and stat tiles drawn from the same primitive data used by the 2D quote stack."
      body="Each card is a thin box geometry backed by the shared PendingQuote model. The selected card drives the canvas depth, quote-bay status chips, selected share/readiness mirrors, service contracts, fallback packet, and decision toast while the dock uses real Chip, Kbd, ProgressLinear, ProgressRadial, StatTile, Toast, KineticText, and Mufflermen icon primitives."
      controls={[
        { label: "Select card", binding: "Click" },
        { label: "Lift + tilt", binding: "Hover" },
        { label: "Pointer", binding: "Move" },
      ]}
      reducedMotionNote="When prefers-reduced-motion is reduce, hover tilt is ignored while chip selection, labels, and accents remain available at the full stack depth."
      crumbLabel="Quote bay stack"
    >
      <section className={styles.routeAlignment} aria-label="Card stack primitive alignment">
        <div>
          <span className={styles.routeAlignmentKicker}>Primitive alignment</span>
          <h2>3D scene spine, 2D primitive contract</h2>
          <p>
            The route shell frames the card-stack canvas as a composition primitive: the selected
            mesh, dock metrics, bay status chips, selected-state mirrors, service contracts,
            fallback deck, and quote selector all mirror the same PendingQuote data surface.
          </p>
        </div>
        <dl className={styles.routeAlignmentGrid}>
          <div>
            <dt>Canvas</dt>
            <dd>Quote bay cards</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Chip + Kbd rail</dd>
          </div>
          <div>
            <dt>Metrics</dt>
            <dd>Progress + StatTile</dd>
          </div>
          <div>
            <dt>Selected</dt>
            <dd>Toast + mirror</dd>
          </div>
        </dl>
      </section>
    </SubRouteShell>
  )
}
