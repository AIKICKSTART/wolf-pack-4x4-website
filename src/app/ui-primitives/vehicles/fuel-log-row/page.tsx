import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FuelLogRow } from "../../components/vehicles/fuel-log-row"

import { SAMPLE_FUEL_LOG } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Fuel log row | Vehicles | UI Primitives",
  description:
    "Semantic table row primitive for the fuel log — date, litres, AUD cost with $/L, km/L efficiency chip, and station + grade chip.",
}

export default function FuelLogRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 08"
        title="Fuel log row"
        description="Recent diesel fills for the Hilux N80 — pricing in AUD, efficiency chip tones from red (poor) through green (excellent)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Fuel log row" },
        ]}
      />
      <section className={styles.tableShell}>
        <table className={styles.dataTable} aria-label="Fuel log entries">
          <thead>
            <tr>
              <th scope="col">Filled</th>
              <th scope="col">Litres</th>
              <th scope="col">Cost</th>
              <th scope="col">Efficiency</th>
              <th scope="col">Station</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_FUEL_LOG.map((entry) => (
              <FuelLogRow
                key={entry.id}
                filledISO={entry.filledISO}
                litres={entry.litres}
                costAud={entry.costAud}
                distanceSinceLastKm={entry.distanceSinceLastKm}
                station={entry.station}
                grade={entry.grade}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
