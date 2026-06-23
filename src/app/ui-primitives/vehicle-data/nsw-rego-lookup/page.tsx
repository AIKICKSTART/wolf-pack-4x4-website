import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NswRegoLookup } from "../../components/vehicle-data/nsw-rego-lookup"

import { COMMODORE, FALCON, HILUX } from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "NSW rego lookup | Vehicle data | UI Primitives",
  description:
    "NSW rego lookup card — Transport for NSW yellow placard, expiry countdown, encumbrance flag, written-off flag, and CTP green slip insurer.",
}

const NOW = new Date("2026-05-29T08:00:00+10:00")

export default function NswRegoLookupScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 11"
        title="NSW rego lookup"
        description="Three rego scenarios — an active Hilux KFK-23M expiring August, a written-off Falcon DGR-411 with WOVR flag, and an encumbered Commodore VEZ-771 under finance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "NSW rego lookup" },
        ]}
      />
      <section className={styles.sceneShell}>
        <NswRegoLookup
          rego={HILUX.rego}
          vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
          expiryISO="2026-08-15"
          status="active"
          encumbered={false}
          writtenOff={false}
          ctpInsurer="NRMA Insurance"
          now={NOW}
        />
        <NswRegoLookup
          rego={FALCON.rego}
          vehicleLabel={`${FALCON.year} ${FALCON.make} ${FALCON.model}`}
          expiryISO="2026-02-04"
          status="written-off"
          encumbered={false}
          writtenOff={true}
          now={NOW}
        />
        <NswRegoLookup
          rego={COMMODORE.rego}
          vehicleLabel={`${COMMODORE.year} ${COMMODORE.make} ${COMMODORE.model}`}
          expiryISO="2026-11-22"
          status="encumbered"
          encumbered={true}
          writtenOff={false}
          ctpInsurer="QBE Insurance"
          now={NOW}
        />
      </section>
    </main>
  )
}
