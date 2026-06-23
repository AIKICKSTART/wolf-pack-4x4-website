import type { Metadata } from "next"

import {
  AdrRuleReferenceCard,
  AdrSoundMeterCard,
  CertificateOfComplianceTemplate,
  DriveByNoiseTestResult,
  InspectorSignoffCard,
  ModificationApprovalWorkflow,
  ModificationDeclarationForm,
  PassFailCounter,
  RoadworthyVsAdrComparison,
  RpmCorrelationChart,
  SoundTestReport,
} from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import {
  POST_MOD_WAVEFORM,
  PRE_MOD_WAVEFORM,
  RPM_SAMPLES_POST_MOD,
  RPM_SAMPLES_PRE_MOD,
  SAMPLE_VEHICLE,
  SAMPLE_WORKSHOP,
} from "../demo-data"
import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Full ADR compliance flow | ADR compliance",
  description:
    "Composition — the complete ADR modification approval flow from declaration through certificate of compliance.",
}

export default function FullComplianceFlowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full flow"
        title="Full ADR compliance flow"
        description="Bonus composition wiring every primitive into a single end-to-end story: approval workflow → declaration → live sound meter → sound test reports → RPM correlation → drive-by → inspector sign-off → certificate. Side rail surfaces the ADR rule reference and the roadworthy vs ADR comparison. Footer shows the workshop pass/fail counter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Full compliance flow" },
        ]}
      />

      <div className={styles.fullShell}>
        <ModificationApprovalWorkflow />

        <div className={styles.fullSplit}>
          <div className={styles.demoStack}>
            <ModificationDeclarationForm
              defaultCustomerName={SAMPLE_VEHICLE.customerName}
              defaultTechnicianName={SAMPLE_WORKSHOP.technician}
            />

            <AdrSoundMeterCard
              heading="Bay 2 · Post-mod idle"
              measuredDb={74.2}
              limitDb={90}
              ruleLabel="ADR 28/01"
              caption="Live · sound level meter feed"
            />

            <div className={styles.demoSplit}>
              <SoundTestReport
                title="Pre-modification capture"
                preModDb={72.4}
                postModDb={84.2}
                limitDb={90}
                ruleLabel="ADR 28/01"
                position="stationary"
                testedIso="2026-05-27T09:12:00+10:00"
                testedAt="Mon 27 May · 09:12"
                signedBy={`${SAMPLE_WORKSHOP.technician} · ${SAMPLE_WORKSHOP.technicianLicence}`}
                preSamples={PRE_MOD_WAVEFORM}
                postSamples={PRE_MOD_WAVEFORM}
              />
              <SoundTestReport
                title="Post-modification capture"
                preModDb={84.2}
                postModDb={88.6}
                limitDb={90}
                ruleLabel="ADR 28/01"
                position="rev-test"
                testedIso="2026-05-27T13:48:00+10:00"
                testedAt="Mon 27 May · 13:48"
                signedBy={`${SAMPLE_WORKSHOP.technician} · ${SAMPLE_WORKSHOP.technicianLicence}`}
                preSamples={PRE_MOD_WAVEFORM}
                postSamples={POST_MOD_WAVEFORM}
              />
            </div>

            <RpmCorrelationChart
              title={`${SAMPLE_VEHICLE.description} · sweep 800 → 6,500 RPM`}
              samples={RPM_SAMPLES_POST_MOD}
              baselineSamples={RPM_SAMPLES_PRE_MOD}
              limitDb={90}
              caption="Stationary close-proximity protocol · cabin closed."
            />

            <DriveByNoiseTestResult
              title={SAMPLE_VEHICLE.description}
              result="pass"
              speedKmh={50}
              measuredDb={86.2}
              ambientDb={52}
              limitDb={90}
              traffic="quiet"
              caption="Primrose St roadside · 7.5 m mic"
            />

            <InspectorSignoffCard
              inspectorName={SAMPLE_WORKSHOP.technician}
              qualification="MTA · Cert III Auto"
              licenceNumber={SAMPLE_WORKSHOP.technicianLicence}
              signedIso="2026-05-27T14:18:00+10:00"
              signedAt="Mon 27 May · 14:18"
              photoEvidenceCount={12}
            />

            <CertificateOfComplianceTemplate
              certificateNumber="OFM-2026-00184"
              issuedAt="Mon 27 May 2026"
              issuedIso="2026-05-27"
              customerName={SAMPLE_VEHICLE.customerName}
              vehicleDescription={SAMPLE_VEHICLE.description}
              vehicleRego={SAMPLE_VEHICLE.rego}
              vehicleVin={SAMPLE_VEHICLE.vin}
              workCertified="2.5″ stainless cat-back with high-flow centre muffler, resonator delete and OEM-spec tailpipes."
              adrReference="ADR 28/01 + NSW VSI 08"
              technicianName={SAMPLE_WORKSHOP.technician}
              technicianLicence={SAMPLE_WORKSHOP.technicianLicence}
              workshopName={SAMPLE_WORKSHOP.name}
              workshopAbn={SAMPLE_WORKSHOP.abn}
              workshopAddress={SAMPLE_WORKSHOP.address}
              verificationUrl="https://oakflatsmuffler.com.au/verify/OFM-2026-00184"
            />
          </div>

          <aside className={styles.fullSide}>
            <AdrRuleReferenceCard
              rule="adr-28-01"
              badges={[
                { label: "Light vehicle", tone: "teal" },
                { label: "90 dB(A)", tone: "green" },
              ]}
            />
            <AdrRuleReferenceCard
              rule="adr-79-04"
              badges={[{ label: "Euro 5/6", tone: "teal" }]}
            />
            <AdrRuleReferenceCard
              rule="nsw-vsi-08"
              badges={[{ label: "NSW guidance", tone: "amber" }]}
            />
            <RoadworthyVsAdrComparison />
          </aside>
        </div>

        <div className={styles.fullFooter}>
          <PassFailCounter
            windows={[
              { label: "Today", passed: 12, failed: 1 },
              { label: "Week", passed: 64, failed: 4 },
              { label: "Month", passed: 248, failed: 18 },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
