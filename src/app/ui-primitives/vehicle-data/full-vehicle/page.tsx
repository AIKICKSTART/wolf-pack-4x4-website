import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AftermarketModRow,
  DiagnosticCodeRow,
  EngineBayDiagram,
  FitmentValidator,
  FuelGradeRow,
  NswRegoLookup,
  ObdLiveReadout,
  PartsCompatibilityMatrix,
  RecallLookupCard,
  ServiceIntervalTimeline,
  TowCapacityTile,
  TyreSpecPanel,
  VinDecoderCard,
  VinHistoryCard,
} from "../../components/vehicle-data"

import {
  COMPATIBILITY_PARTS,
  COMPATIBILITY_VEHICLES,
  HILUX,
  HILUX_ENGINE_BAY,
  HILUX_RECALLS,
  HILUX_SERVICE_INTERVALS,
  HILUX_TYRES_FRONT,
  HILUX_TYRES_REAR,
  HILUX_VIN_DECODE,
  HILUX_VIN_HISTORY_EVENTS,
  OBD_INITIAL,
  RAPTOR_FITMENT,
} from "../fixtures"
import styles from "../vehicle-data.module.css"

export const metadata: Metadata = {
  title: "Full vehicle data | Vehicle data | UI Primitives",
  description:
    "Bonus composition — every vehicle-data primitive assembled into a single technical record for the 2021 Toyota Hilux N80 SR5 (rego KFK-23M).",
}

const NOW = new Date("2026-05-29T08:00:00+10:00")

const HILUX_FUEL_ROWS = [
  {
    grade: "diesel" as const,
    compatibility: "recommended" as const,
    rating: "51 cetane",
    pricePerLitre: 1.92,
    note: "1GD-FTV is diesel-only — Toyota recommends low-sulphur (≤10 ppm).",
  },
  {
    grade: "premium-diesel" as const,
    compatibility: "compatible" as const,
    rating: "54 cetane",
    pricePerLitre: 2.06,
    note: "Cetane-boosted blends improve DPF regen completion rates.",
  },
  {
    grade: "91" as const,
    compatibility: "not-compatible" as const,
    rating: "91 RON",
    pricePerLitre: 1.84,
    note: "Misfuelling requires fuel pump replacement plus injector clean.",
  },
]

const HILUX_DTCS = [
  {
    code: "P0420",
    description: "Catalyst system efficiency below threshold (Bank 1)",
    severity: "moderate" as const,
    system: "powertrain" as const,
    detectedISO: "2026-05-26T11:20:00+10:00",
    freezeFrame: "RPM 2,180 · Load 42%",
    fixHref: "#fix-p0420",
    fixLabel: "Cat efficiency",
  },
  {
    code: "P0171",
    description: "System too lean (Bank 1)",
    severity: "low" as const,
    system: "powertrain" as const,
    detectedISO: "2026-05-22T07:48:00+10:00",
    freezeFrame: "RPM 880 · Load 21%",
    fixHref: "#fix-p0171",
    fixLabel: "Fuel trim",
  },
]

const HILUX_MODS = [
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
    label: "Snorkel + 4-inch silicon airbox",
    partReference: "Safari ARMAX SS720HF",
    category: "intake" as const,
    legality: "engineered" as const,
    claimedGain: "+3 kW",
    installedAud: 1480,
    certificateRef: "VSI 6 issued 11/24",
    briefHref: "#brief-snorkel",
  },
]

export default function FullVehicleDataScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus"
        title="Full vehicle data"
        description={`Single technical record for the ${HILUX.year} ${HILUX.make} ${HILUX.model} (rego ${HILUX.rego}) — every vehicle-data primitive composed into the workshop intake view.`}
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicle data", href: "/ui-primitives/vehicle-data" },
          { label: "Full vehicle data" },
        ]}
      />

      <div className={styles.heroRow}>
        <VinDecoderCard
          defaultVin={HILUX.vin}
          result={HILUX_VIN_DECODE}
        />
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
      </div>

      <ObdLiveReadout
        initial={OBD_INITIAL}
        vehicleLabel={`${HILUX.make} ${HILUX.model.split(" ")[0]} · ${HILUX.rego}`}
        capturedAtISO="2026-05-29T08:14:12+10:00"
      />

      <div className={styles.detailLayout}>
        <div className={styles.detailColumn}>
          <VinHistoryCard
            vin={HILUX.vin}
            vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
            ownersCount={2}
            accidentsCount={1}
            totalKm={82_410}
            stateHistory={["NSW"]}
            riskFlag="minor"
            events={HILUX_VIN_HISTORY_EVENTS}
          />
          <RecallLookupCard
            defaultVin={HILUX.vin}
            results={HILUX_RECALLS}
          />
          <TyreSpecPanel
            front={HILUX_TYRES_FRONT}
            rear={HILUX_TYRES_REAR}
            brand="BFGoodrich KO2"
            placard="Door pillar · DLM-N80-SR5"
          />
        </div>
        <div className={styles.detailColumn}>
          <EngineBayDiagram
            components={HILUX_ENGINE_BAY}
            vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
          />
          <ServiceIntervalTimeline intervals={HILUX_SERVICE_INTERVALS} />
          <TowCapacityTile
            vehicleLabel={`${HILUX.year} ${HILUX.make} ${HILUX.model}`}
            brakedKg={3500}
            unbrakedKg={750}
            ballWeightKg={350}
            gcmKg={5850}
            currentLoadKg={2800}
          />
        </div>
      </div>

      <FitmentValidator
        defaultIdentifier={HILUX.rego}
        initialResult={RAPTOR_FITMENT}
      />

      <PartsCompatibilityMatrix
        caption="Workshop catalogue × pool vehicles"
        vehicles={COMPATIBILITY_VEHICLES}
        parts={COMPATIBILITY_PARTS}
      />

      <section className={styles.tableShell}>
        <h3 className={styles.sceneHeading}>OBD-II diagnostic trouble codes</h3>
        <table className={styles.dataTable} aria-label="DTC table">
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
            {HILUX_DTCS.map((row) => (
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

      <section className={styles.tableShell}>
        <h3 className={styles.sceneHeading}>Fuel grade compatibility</h3>
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
            {HILUX_FUEL_ROWS.map((row) => (
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

      <section className={styles.tableShell}>
        <h3 className={styles.sceneHeading}>Aftermarket modifications</h3>
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
            {HILUX_MODS.map((row) => (
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
