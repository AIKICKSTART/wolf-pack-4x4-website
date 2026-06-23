import type { Metadata } from "next"

import { DynoRunCard } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { DynoCurvePoint, DynoRun } from "../../components/workshop-ops"

import { DYNO_HILUX } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Dyno run card | Workshop ops",
  description:
    "Primitive 09 — dyno result card with power & torque curves before vs after — three states.",
}

function curveSet(
  baseKw: number,
  baseTorque: number,
  uplift: number,
): ReadonlyArray<DynoCurvePoint> {
  const rpms = [2000, 2800, 3600, 4200, 5000, 5800, 6600]
  const peakIdx = 3
  return rpms.map((rpm, idx) => {
    const distance = Math.abs(idx - peakIdx)
    const falloff = 1 - (distance / rpms.length) * 0.5
    return {
      rpm,
      power: baseKw * falloff + uplift + ((idx * 17) % 6),
      torque: baseTorque * (1 - (distance / rpms.length) * 0.35) + uplift * 1.8,
    }
  })
}

const DYNO_GT_XB: DynoRun = {
  id: "dyno-gt-xb",
  label: "Falcon GT XB '76 · twin stainless + headers",
  recordedAt: "Wed 27 May · 10:54",
  peakPowerKw: 218.4,
  peakTorqueNm: 532,
  peakRpm: 4200,
  beforeCurve: curveSet(168, 442, 0),
  afterCurve: curveSet(168, 442, 36),
  notes:
    "Net +50.4 kW & +90 Nm at the rollers — Karen got the deep V8 tone she asked for without breaching ADR 83/00 drive-by.",
}

const DYNO_RAPTOR_NULL: DynoRun = {
  id: "dyno-raptor-null",
  label: "Ranger Raptor · X-Force baseline run",
  recordedAt: "Tue 26 May · 11:08",
  peakPowerKw: 198.6,
  peakTorqueNm: 568,
  peakRpm: 3600,
  beforeCurve: curveSet(196, 562, 0),
  afterCurve: curveSet(196, 562, 2.6),
  notes:
    "Stock baseline run pre-fit. Marginal +2.6 kW from intake clean — exhaust upgrade scheduled Thursday.",
}

export default function DynoRunCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Dyno run card"
        title="Dyno run result card"
        description="Bay 6 dyno result — before vs after power kW and torque Nm curves, with peak callouts. Three states — Hilux N80 cat-back uplift (the main result), Falcon GT XB '76 big gain on hand-fit headers, and a stock Ranger Raptor baseline run pre-fit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Dyno run card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <DynoRunCard run={DYNO_HILUX} />
          <DynoRunCard run={DYNO_GT_XB} />
          <DynoRunCard run={DYNO_RAPTOR_NULL} />
        </div>
      </section>
    </main>
  )
}
