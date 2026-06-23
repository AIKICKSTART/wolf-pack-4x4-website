import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BrakePadLifeMeter,
  EcuDiagnosticCodeRow,
  FuelLogRow,
  InsuranceCard,
  MileageTracker,
  RecallNotificationBanner,
  RegistrationExpiryChip,
  RoadworthyCertificateCard,
  ServiceHistoryTimeline,
  TelematicsChip,
  TyreConditionDiagram,
  VehicleCardFleet,
  VinDecoderStrip,
} from "../../components/vehicles"

import {
  PRIMARY_VEHICLE,
  SAMPLE_BRAKE_AXLES,
  SAMPLE_ECU_CODES,
  SAMPLE_FUEL_LOG,
  SAMPLE_INSURANCE,
  SAMPLE_MILEAGE,
  SAMPLE_RECALL,
  SAMPLE_ROADWORTHY,
  SAMPLE_SERVICE_HISTORY,
  SAMPLE_TELEMATICS,
  SAMPLE_TYRES,
  SAMPLE_VIN,
  SAMPLE_VIN_FIELDS,
} from "../fixtures"
import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Full vehicle detail | Vehicles | UI Primitives",
  description:
    "Bonus composition — single-vehicle detail combining the fleet card, VIN decoder, service timeline, mileage tracker, registration chip, insurance, roadworthy, fuel log, tyre diagram, brake-pad meter, telematics, ECU codes, and recall banner.",
}

const NOW = new Date("2026-05-29T08:00:00+10:00")

export default function FullVehicleDetailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus"
        title="Full vehicle detail"
        description="Complete fleet-owner detail page for the 2022 Toyota Hilux N80 SR5 (rego BTR-882) — every vehicles primitive composed into one operational view."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Full vehicle detail" },
        ]}
      />

      <RecallNotificationBanner
        recallId={SAMPLE_RECALL.recallId}
        manufacturer={SAMPLE_RECALL.manufacturer}
        headline={SAMPLE_RECALL.headline}
        affectedSystems={SAMPLE_RECALL.affectedSystems}
        actionRequired={SAMPLE_RECALL.actionRequired}
        severity={SAMPLE_RECALL.severity}
        issuedISO={SAMPLE_RECALL.issuedISO}
        primaryAction={{ label: "Book recall", href: "#book" }}
        secondaryAction={{ label: "View bulletin", href: "#bulletin" }}
      />

      <div className={styles.heroRow}>
        <VehicleCardFleet
          rego={PRIMARY_VEHICLE.rego}
          year={PRIMARY_VEHICLE.year}
          make={PRIMARY_VEHICLE.make}
          model={PRIMARY_VEHICLE.model}
          status={PRIMARY_VEHICLE.status}
          odometerKm={PRIMARY_VEHICLE.odometerKm}
          fuelType={PRIMARY_VEHICLE.fuelType}
          driverName={PRIMARY_VEHICLE.driverName}
        />
        <div style={{ display: "grid", gap: 14 }}>
          <TelematicsChip
            reading={SAMPLE_TELEMATICS}
            vehicleLabel={`${PRIMARY_VEHICLE.make} ${PRIMARY_VEHICLE.model} · ${PRIMARY_VEHICLE.rego}`}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <RegistrationExpiryChip expiresISO="2026-06-12" now={NOW} />
          </div>
          <VinDecoderStrip vin={SAMPLE_VIN} fields={SAMPLE_VIN_FIELDS} />
        </div>
      </div>

      <div className={styles.detailLayout}>
        <div className={styles.detailColumn}>
          <MileageTracker
            currentOdometerKm={PRIMARY_VEHICLE.odometerKm}
            serviceIntervalKm={15_000}
            lastServiceKm={75_220}
            monthlyKm={SAMPLE_MILEAGE}
            projectedMonthlyKm={2_500}
          />
          <InsuranceCard
            insurer={SAMPLE_INSURANCE.insurer}
            policyNumber={SAMPLE_INSURANCE.policyNumber}
            covers={SAMPLE_INSURANCE.covers}
            renewalISO={SAMPLE_INSURANCE.renewalISO}
            openClaims={SAMPLE_INSURANCE.openClaims}
            lifetimeClaims={SAMPLE_INSURANCE.lifetimeClaims}
            excessAud={SAMPLE_INSURANCE.excessAud}
            now={NOW}
          />
          <RoadworthyCertificateCard
            certNumber={SAMPLE_ROADWORTHY.certNumber}
            issuedISO={SAMPLE_ROADWORTHY.issuedISO}
            expiresISO={SAMPLE_ROADWORTHY.expiresISO}
            workshop={SAMPLE_ROADWORTHY.workshop}
            inspector={SAMPLE_ROADWORTHY.inspector}
            status={SAMPLE_ROADWORTHY.status}
            advisories={SAMPLE_ROADWORTHY.advisories}
          />
        </div>
        <div className={styles.detailColumn}>
          <TyreConditionDiagram tyres={SAMPLE_TYRES} />
          <BrakePadLifeMeter readings={SAMPLE_BRAKE_AXLES} />
          <ServiceHistoryTimeline entries={SAMPLE_SERVICE_HISTORY} />
        </div>
      </div>

      <section className={styles.tableShell}>
        <h3 className={styles.sceneHeading}>Fuel log · most recent fills</h3>
        <table className={styles.dataTable} aria-label="Fuel log">
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

      <section className={styles.tableShell}>
        <h3 className={styles.sceneHeading}>ECU diagnostics · current codes</h3>
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
