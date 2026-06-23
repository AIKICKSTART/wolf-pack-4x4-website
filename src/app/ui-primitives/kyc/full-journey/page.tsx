import type { Metadata } from "next"

import {
  AddressVerificationRow,
  BeneficialOwnerCard,
  BusinessRegistrationStep,
  ComplianceDisclosureBlock,
  DocumentVerificationStatus,
  IdUploadStep,
  KycProgressStepper,
  KycSuccessState,
  ManualReviewBanner,
  PhoneOtpEntry,
  RiskRatingMeter,
  SanctionsScreenResult,
  SelfieCaptureCard,
  TaxInfoForm,
} from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Full KYC journey | KYC",
  description:
    "Composition — full multi-step KYC journey with progress stepper, ID upload, selfie, OTP, address, business, beneficial owners, tax, sanctions, risk rating, manual review banner, success state and compliance disclosure.",
}

export default function FullKycJourneyScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full KYC journey"
        title="Full KYC journey"
        description="A composed multi-step KYC journey for the Mufflermen Oak Flats workshop. The horizontal stepper sits at the top; each primitive renders in journey order — identity, address, business, beneficial owners, tax, sanctions, risk rating, manual-review banner, success state — and the compliance disclosure block closes the surface."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Full journey" },
        ]}
      />

      <section className={styles.journeyStage} aria-label="Full KYC journey">
        <KycProgressStepper
          steps={[
            { id: "identity", state: "complete", caption: "Licence verified" },
            { id: "address", state: "complete", caption: "Proof on file" },
            { id: "business", state: "complete", caption: "ABN matched" },
            { id: "owners", state: "current", caption: "3 of 3 listed" },
            { id: "tax", state: "upcoming", caption: "TFN pending" },
            { id: "bank", state: "locked", caption: "Locked" },
          ]}
        />

        <ManualReviewBanner
          title="Sanctions match needs a reviewer"
          body="One beneficial owner triggered a partial AUSTRAC PEP match. We’ll continue with the rest of your application while compliance reviews."
          eta="~ 2 business days"
          reference="CASE-2026-104-77"
          contactHref="mailto:compliance@verridian.ai"
        />

        <article className={styles.journeyStep} aria-label="Step 1 of 9 — Identity">
          <span className={styles.journeyStepLabel}>Step 1 of 9 — Identity capture</span>
          <IdUploadStep
            kicker="Step 01 / Identity"
            title="Driver licence uploaded"
            documentKind="drivers-licence"
            constraints={[
              { label: "PDF, JPG, PNG" },
              { label: "Max 10 MB" },
              { label: "Front + back" },
            ]}
            verificationProgress={100}
            verificationLabel="OCR + authenticity"
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 2 of 9 — Selfie">
          <span className={styles.journeyStepLabel}>Step 2 of 9 — Liveness selfie</span>
          <SelfieCaptureCard
            kicker="Step 02 / Liveness"
            title="Selfie matched the licence"
            body="Face match passed. Selfie is encrypted and held only for the review window."
            instructions={[
              "Centred face inside the capture ring",
              "No sunglasses",
              "Even lighting",
            ]}
            initialState="preview"
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 3 of 9 — Mobile OTP">
          <span className={styles.journeyStepLabel}>Step 3 of 9 — Mobile OTP</span>
          <PhoneOtpEntry
            kicker="Mobile verification"
            title="Confirm your mobile number"
            countryCode="+61"
            phoneNumber="432 118 904"
            resendSeconds={62}
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 4 of 9 — Address">
          <span className={styles.journeyStepLabel}>Step 4 of 9 — Address verification</span>
          <AddressVerificationRow
            label="Trading address"
            address="18 Industrial Drive, Oak Flats NSW 2529"
            status="proof-on-file"
            meta="Utility bill filed 14 May 2026"
          />
          <AddressVerificationRow
            label="Director residence"
            address="7 Central Avenue, Shellharbour NSW 2529"
            status="proof-needed"
            meta="Needs one fresh proof document"
            uploadProofHref="/ui-primitives/kyc/id-upload"
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 5 of 9 — Business">
          <span className={styles.journeyStepLabel}>Step 5 of 9 — Business registration</span>
          <BusinessRegistrationStep
            kicker="Step 04 / Entity"
            title="Look up business registration"
            defaultAbn="11 222 333 444"
            defaultTradingSince="2018-04-16"
            defaultStructure="pty-ltd"
            lookupResult={{
              abn: "11 222 333 444",
              entityName: "Oak Flats Mufflermen Pty Ltd",
              status: "active",
              gstStatus: "registered",
              state: "NSW",
            }}
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 6 of 9 — Beneficial owners">
          <span className={styles.journeyStepLabel}>Step 6 of 9 — Beneficial owners</span>
          <BeneficialOwnerCard
            kicker="Step 05 / Owners"
            title="Beneficial owner disclosure"
            body="All natural persons or controlling entities at 25 percent ownership and above, per AUSTRAC."
            initialOwners={[
              {
                id: "owner-01",
                name: "Rachel Mercer",
                ownershipPct: 55,
                role: "Director / UBO",
                status: "approved",
              },
              {
                id: "owner-02",
                name: "Ben Halliday",
                ownershipPct: 25,
                role: "Trustee",
                status: "under-review",
              },
              {
                id: "owner-03",
                name: "Leonie Young",
                ownershipPct: 20,
                role: "Operations manager",
                status: "pending",
              },
            ]}
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 7 of 9 — Tax">
          <span className={styles.journeyStepLabel}>Step 7 of 9 — Tax details</span>
          <TaxInfoForm
            kicker="Step 06 / Tax"
            title="Collect tax details"
            defaultCountry="AU"
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 8 of 9 — Sanctions and document review">
          <span className={styles.journeyStepLabel}>
            Step 8 of 9 — Sanctions + document review
          </span>
          <SanctionsScreenResult
            kicker="Entity screening"
            subject="Oak Flats Mufflermen Pty Ltd"
            status="review"
            scannedAt="28 May 2026, 7:56 PM AEST"
            defaultExpanded
            matches={[
              {
                id: "match-01",
                name: "Oak Flat Muffler Works LLC",
                list: "OFAC adverse media",
                confidence: 64,
                notes: "Country mismatch; held for reviewer sign-off.",
              },
            ]}
          />
          <DocumentVerificationStatus
            kicker="Document review"
            documentLabel="Trust deed"
            reference="DOC-204-9917"
            status="approved"
            reviewer={{ id: "rvw-11", name: "Marco Bianchi", team: "Compliance pod" }}
            body="Deed signed and witnessed. Linked to the workshop entity record."
          />
        </article>

        <article className={styles.journeyStep} aria-label="Step 9 of 9 — Risk rating">
          <span className={styles.journeyStepLabel}>Step 9 of 9 — Composite risk rating</span>
          <RiskRatingMeter
            kicker="Composite risk"
            title="Oak Flats Mufflermen Pty Ltd"
            level="low"
            score={22}
            body="Low-risk profile overall. One owner pending verification; expected to clear within 24 hours."
            factors={[
              { id: "f1", label: "AU residency", tone: "positive" },
              { id: "f2", label: "Established 2018", tone: "positive" },
              { id: "f3", label: "1 owner pending", tone: "neutral" },
            ]}
          />
        </article>

        <KycSuccessState
          kicker="KYC complete"
          headline="All set — your workshop is verified"
          body="Identity, address, business and beneficial-owner checks all came back clear. You can now connect payments and quote your first job."
          ctas={[
            {
              label: "Connect Stripe payouts",
              description: "Accept card + Apple Pay at the front desk.",
              glyph: "$",
              href: "/ui-primitives/onboarding/connect-integration",
            },
            {
              label: "Start your first quote",
              description: "Capture a rego and quote a muffler swap.",
              glyph: "▸",
              href: "/ui-primitives/onboarding/first-actions",
            },
          ]}
        />

        <ComplianceDisclosureBlock
          title="How we handle your information"
          privacyBody="Collected to satisfy AUSTRAC AML/CTF obligations. Stored encrypted, accessible only to compliance reviewers."
          policies={[
            {
              id: "p1",
              label: "Australian Privacy Principles (APP)",
              href: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
            },
            { id: "p2", label: "AUSTRAC AML/CTF Act 2006", href: "https://www.austrac.gov.au/" },
            {
              id: "p3",
              label: "NSW Fair Trading record-keeping",
              href: "https://www.fairtrading.nsw.gov.au/",
            },
          ]}
          retentionLabel="Data retention"
          retentionDetail="Records held seven years after relationship ends, per AUSTRAC requirements."
          contactEmail="privacy@verridian.ai"
          lastUpdated="Last updated 12 March 2026"
        />
      </section>
    </main>
  )
}
