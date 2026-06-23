import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  MOCK_TYPE_PAIRINGS,
  TypographyPairingCard,
} from "../../components/brand-control"

import styles from "../brand-control.module.css"

export const metadata: Metadata = {
  title: "Typography pairing | Brand control",
}

export default function TypographyPairingRoute() {
  return (
    <main className={styles.subRoute}>
      <div className={styles.shellNarrow}>
        <PageHeader
          kicker="Primitive 03"
          title="Typography pairing"
          description="Display × body pairing card with a real font stack — display, body, and the rationale that justifies the pairing."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control", href: "/ui-primitives/brand-control" },
            { label: "Typography pairing" },
          ]}
        />

        <div className={styles.note}>
          <span>Three states</span>
          <p>
            The default Anton × Inter pairing, an Anton × JetBrains Mono pairing for telemetry, and a Heritage Cream serif pair rendered in print mode.
          </p>
        </div>

        <section className={styles.stateWrap} aria-label="Default Anton × Inter">
          <span className={styles.stateLabel}>State 01 · Default</span>
          <TypographyPairingCard pairing={MOCK_TYPE_PAIRINGS[0]} />
        </section>

        <section className={styles.stateWrap} aria-label="Anton × JetBrains Mono">
          <span className={styles.stateLabel}>State 02 · Telemetry</span>
          <TypographyPairingCard pairing={MOCK_TYPE_PAIRINGS[1]} />
        </section>

        <section className={styles.stateWrap} aria-label="Heritage Cream print mode">
          <span className={styles.stateLabel}>State 03 · Heritage print</span>
          <TypographyPairingCard pairing={MOCK_TYPE_PAIRINGS[2]} printMode />
        </section>
      </div>
    </main>
  )
}
