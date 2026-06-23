import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DiagnosticCodeRow } from "../../components/vehicle-data/diagnostic-code-row"

import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Diagnostic code row | Vehicle data | UI Primitives",
  description:
    "OBD-II diagnostic trouble code table row — P0420, P0171, P246C, U0140, B1234 with severity chips and links to the workshop fix playbooks.",
}

const ROWS = [
  {
    code: "P0420",
    description: "Catalyst system efficiency below threshold (Bank 1)",
    severity: "moderate" as const,
    system: "powertrain" as const,
    detectedISO: "2026-05-26T11:20:00+10:00",
    freezeFrame: "RPM 2,180 · Load 42%",
    fixHref: "#fix-p0420",
    fixLabel: "Cat efficiency brief",
  },
  {
    code: "P0171",
    description: "System too lean (Bank 1)",
    severity: "low" as const,
    system: "powertrain" as const,
    detectedISO: "2026-05-22T07:48:00+10:00",
    freezeFrame: "RPM 880 · Load 21%",
    fixHref: "#fix-p0171",
    fixLabel: "Fuel trim playbook",
  },
  {
    code: "P246C",
    description: "Diesel particulate filter regeneration interrupted",
    severity: "critical" as const,
    system: "powertrain" as const,
    detectedISO: "2026-05-29T07:48:00+10:00",
    freezeFrame: "EGT 580 °C · DPF 86%",
    fixHref: "#fix-p246c",
    fixLabel: "Book DPF service",
  },
  {
    code: "U0140",
    description: "Lost communication with body control module",
    severity: "low" as const,
    system: "network" as const,
    detectedISO: "2026-05-12T14:02:00+10:00",
    freezeFrame: "CAN bus drop",
  },
  {
    code: "B1234",
    description: "Passenger airbag impedance out of range",
    severity: "info" as const,
    system: "body" as const,
    detectedISO: "2026-04-28T09:33:00+10:00",
    fixHref: "#fix-b1234",
    fixLabel: "SRS diagnostic",
  },
]

export default function DiagnosticCodeRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 09"
        title="Diagnostic code row"
        description="Five OBD-II / U-network / body DTCs rendered in the workshop diagnostics table. Critical rows announce themselves to assistive tech via role='alert'."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Diagnostic code row" },
        ]}
      />
      <section className={styles.tableShell}>
        <table className={styles.dataTable} aria-label="Diagnostic trouble codes">
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
            {ROWS.map((row) => (
              <DiagnosticCodeRow
                key={row.code}
                code={row.code}
                description={row.description}
                severity={row.severity}
                system={row.system}
                detectedISO={row.detectedISO}
                freezeFrame={row.freezeFrame}
                fixHref={row.fixHref}
                fixLabel={row.fixLabel}
              />
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}
