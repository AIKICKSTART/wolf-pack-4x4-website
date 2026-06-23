import type { Metadata } from "next"

import { VehicleInspectionChecklist } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { InspectionSection } from "../../components/workshop-ops"

import { INSPECTION_SECTIONS } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Vehicle inspection checklist | Workshop ops",
  description:
    "Primitive 08 — body, tyres, brakes, exhaust, and electrical inspection panel — three states.",
}

const ALL_PASS: ReadonlyArray<InspectionSection> = INSPECTION_SECTIONS.map(
  (section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item, result: "pass" as const, note: undefined })),
  }),
)

const SEVERE_FAIL: ReadonlyArray<InspectionSection> = [
  {
    id: "i-sev-body",
    label: "Body & chassis",
    items: [
      { id: "i-sev-body-1", label: "Underbody rust survey", result: "fail", note: "Driver-side rail perforated near tow-eye." },
      { id: "i-sev-body-2", label: "Chassis rail straightness", result: "warn" },
    ],
  },
  {
    id: "i-sev-brakes",
    label: "Brakes",
    items: [
      { id: "i-sev-brakes-1", label: "Front pad wear", result: "fail", note: "Sub-metal contact — stop driving." },
      { id: "i-sev-brakes-2", label: "Rear pad wear", result: "warn", note: "2mm — replace soon." },
      { id: "i-sev-brakes-3", label: "Brake hose perish", result: "fail", note: "Rear-left hose cracked at fitting." },
    ],
  },
  {
    id: "i-sev-exhaust",
    label: "Exhaust & emissions",
    items: [
      { id: "i-sev-exhaust-1", label: "Manifold to cat seal", result: "fail" },
      { id: "i-sev-exhaust-2", label: "Tail-pipe hanger condition", result: "fail", note: "Two missing — pipe touching diff." },
      { id: "i-sev-exhaust-3", label: "Cat efficiency burn-test", result: "warn" },
    ],
  },
]

export default function VehicleInspectionChecklistScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Vehicle inspection checklist"
        title="Pre-service inspection panel"
        description="Pre-service walk-around — body & chassis, tyres & wheels, brakes, exhaust & emissions, electrical & lighting. Each item is pass / watch / fail / N-A with optional inspector notes. Three states — typical pass with one fail, an everything-passes scenario, and an unroadworthy fail-stack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Vehicle inspection checklist" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <VehicleInspectionChecklist
            vehicleLabel="2019 Hilux N80 SR5 · WO-2847"
            rego="BX1-8RT"
            inspectorName="Brad McKenzie"
            inspectedAt="Tue 26 May · 10:14"
            sections={INSPECTION_SECTIONS}
          />
          <VehicleInspectionChecklist
            vehicleLabel="2024 Ranger Raptor · WO-2853"
            rego="RAP-22Z"
            inspectorName="Jase Patel"
            inspectedAt="Tue 26 May · 13:42"
            sections={ALL_PASS}
          />
          <VehicleInspectionChecklist
            vehicleLabel="2002 Camry SXV20 · walk-in"
            rego="WLK-2CV"
            inspectorName="Tim Hollister"
            inspectedAt="Wed 27 May · 09:08"
            sections={SEVERE_FAIL}
          />
        </div>
      </section>
    </main>
  )
}
