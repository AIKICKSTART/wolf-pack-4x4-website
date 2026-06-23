import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AftermarketModRow } from "../../components/vehicle-data/aftermarket-mod-row"

import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Aftermarket mod row | Vehicle data | UI Primitives",
  description:
    "Aftermarket modification row — exhaust, intake, tune, suspension, brakes — with claimed gain, installed cost, legality chip, and engineer certificate reference.",
}

const ROWS = [
  {
    label: "3-inch cat-back exhaust",
    partReference: "Manta MKTY0186",
    category: "exhaust" as const,
    legality: "compliant" as const,
    claimedGain: "+8 kW",
    installedAud: 2640,
    certificateRef: "EPA NSW notified",
    briefHref: "#brief-cat-back",
  },
  {
    label: "Cold air intake (4-inch silicon)",
    partReference: "K&N 57-2604",
    category: "intake" as const,
    legality: "engineered" as const,
    claimedGain: "+4 kW · +6 Nm",
    installedAud: 980,
    certificateRef: "VSI 6 issued 12/24",
    briefHref: "#brief-cai",
  },
  {
    label: "Stage 1 ECU tune",
    partReference: "Bosch ME17.9.7 calibration",
    category: "tune" as const,
    legality: "engineered" as const,
    claimedGain: "+22 kW · +60 Nm",
    installedAud: 1480,
    certificateRef: "VSI 14 issued 03/25",
    briefHref: "#brief-tune",
  },
  {
    label: "Coilover lowering kit (-30 mm)",
    partReference: "BC Racing BR-RA",
    category: "suspension" as const,
    legality: "grey" as const,
    installedAud: 2240,
    certificateRef: "Pending engineer sign-off",
    briefHref: "#brief-coils",
  },
  {
    label: "Open-pipe straight exhaust (no resonator)",
    partReference: "Workshop bespoke 3-inch",
    category: "exhaust" as const,
    legality: "illegal" as const,
    claimedGain: "+12 kW",
    installedAud: 1980,
  },
]

export default function AftermarketModRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 14"
        title="Aftermarket mod row"
        description="Five mod scenarios — engineer-certified exhaust + tune, ADR-compliant intake, grey-area coilovers pending sign-off, and an illegal open-pipe install."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Aftermarket mod row" },
        ]}
      />
      <section className={styles.tableShell}>
        <table className={styles.dataTable} aria-label="Aftermarket modifications">
          <thead>
            <tr>
              <th scope="col">Modification</th>
              <th scope="col">Gain</th>
              <th scope="col">Installed</th>
              <th scope="col">Legality</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Brief
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <AftermarketModRow
                key={row.label}
                label={row.label}
                partReference={row.partReference}
                category={row.category}
                legality={row.legality}
                claimedGain={row.claimedGain}
                installedAud={row.installedAud}
                certificateRef={row.certificateRef}
                briefHref={row.briefHref}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
