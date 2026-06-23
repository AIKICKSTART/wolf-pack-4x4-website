import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EcuDiagnosticCodeRow } from "../../components/vehicles/ecu-diagnostic-code-row"

import { SAMPLE_ECU_CODES } from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "ECU diagnostic code row | Vehicles | UI Primitives",
  description:
    "ECU diagnostic table row — OBD-II code, description, severity chip, occurrence count, suggested-fix link. Critical rows use role=alert.",
}

export default function EcuDiagnosticCodeRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 12"
        title="ECU diagnostic code row"
        description="OBD-II codes detected on the Hilux N80 ECU. P246C is a critical DPF interrupt — semantically a role=alert row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "ECU diagnostic code row" },
        ]}
      />
      <section className={styles.tableShell}>
        <table className={styles.dataTable} aria-label="ECU diagnostic codes">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Description</th>
              <th scope="col">Severity</th>
              <th scope="col" style={{ textAlign: "right" }}>
                Fix
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ECU_CODES.map((row) => (
              <EcuDiagnosticCodeRow
                key={row.id}
                code={row.code}
                description={row.description}
                severity={row.severity}
                detectedISO={row.detectedISO}
                occurrenceCount={row.occurrenceCount}
                suggestedFixHref={row.fixHref}
                suggestedFixLabel={row.fixLabel}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
