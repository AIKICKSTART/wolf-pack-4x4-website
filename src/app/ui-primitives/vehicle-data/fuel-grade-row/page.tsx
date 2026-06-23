import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FuelGradeRow } from "../../components/vehicle-data/fuel-grade-row"

import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Fuel grade row | Vehicle data | UI Primitives",
  description:
    "Fuel grade row — pump grade (91 / 95 / 98 / E10 / diesel) with engine compatibility verdict, RON / cetane rating, and pump price.",
}

const COMMODORE_ROWS = [
  {
    grade: "91" as const,
    compatibility: "compatible" as const,
    rating: "91 RON",
    pricePerLitre: 1.84,
    note: "Minimum for the LS2 V8. Acceptable for low-load city driving.",
  },
  {
    grade: "95" as const,
    compatibility: "recommended" as const,
    rating: "95 RON",
    pricePerLitre: 1.96,
    note: "Holden's recommended grade for the VE Commodore SS — improves part-throttle response.",
  },
  {
    grade: "98" as const,
    compatibility: "recommended" as const,
    rating: "98 RON",
    pricePerLitre: 2.08,
    note: "Use when towing or running tunes that pull more advance under load.",
  },
  {
    grade: "e10" as const,
    compatibility: "warning" as const,
    rating: "94 RON · 10% ethanol",
    pricePerLitre: 1.78,
    note: "OK occasionally — pre-2008 fuel lines may swell over extended E10 use.",
  },
  {
    grade: "diesel" as const,
    compatibility: "not-compatible" as const,
    rating: "51 cetane",
    pricePerLitre: 1.92,
    note: "Petrol-only engine. Misfuelling requires fuel system flush.",
  },
]

export default function FuelGradeRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 12"
        title="Fuel grade row"
        description="Five rows mapping each Australian pump grade against a 2007 VE Commodore SS L98 V8 — recommended, compatible, watch, or do-not-use."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Fuel grade row" },
        ]}
      />
      <section className={styles.tableShell}>
        <table className={styles.dataTable} aria-label="Fuel grade compatibility">
          <thead>
            <tr>
              <th scope="col">Grade</th>
              <th scope="col">Verdict</th>
              <th scope="col">Pump price</th>
              <th scope="col">Tag</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {COMMODORE_ROWS.map((row) => (
              <FuelGradeRow
                key={row.grade}
                grade={row.grade}
                compatibility={row.compatibility}
                rating={row.rating}
                pricePerLitre={row.pricePerLitre}
                note={row.note}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
