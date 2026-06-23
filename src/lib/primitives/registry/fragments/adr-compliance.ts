import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "adr-compliance",
  "title": "ADR compliance + sound testing",
  "group": "Operations",
  "summary": "14 Australian Design Rules sound, emissions and modification-compliance primitives for an exhaust workshop — live dB(A) meter, band chips, pre/post test reports, drive-by results, RPM-vs-dB chart, rule reference, customer declaration form, certificate preview, inspector sign-off, pass/fail counter, education spotlight, approval workflow, roadworthy-vs-ADR comparison and equipment status. Visual reference only, sharing a SoundComplianceBand/ADR_RULES type contract.",
  "entries": [
    {
      "key": "adr-compliance/adr-sound-meter-card",
      "family": "adr-compliance",
      "name": "AdrSoundMeterCard",
      "label": "ADR sound meter card",
      "description": "Live dB(A) sound-pressure reading with a radial peak meter, ADR limit readout and an auto-classified tone-shifting compliance band chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/adr-sound-meter-card",
      "tags": [
        "sound",
        "meter",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/compliance-band-chip",
      "family": "adr-compliance",
      "name": "ComplianceBandChip",
      "label": "Compliance band chip",
      "description": "Legal / borderline / over-limit chip with a tone-shifting waveform glyph; raises role=alert and aria-live=assertive when over the ADR limit.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/compliance-band-chip",
      "tags": [
        "chip",
        "status",
        "sound"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/sound-test-report",
      "family": "adr-compliance",
      "name": "SoundTestReport",
      "label": "Sound test report",
      "description": "Pre-mod vs post-mod dB(A) reading card with computed delta, dual audio waveforms, microphone-position diagram and signed-by + band chips.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/sound-test-report",
      "tags": [
        "report",
        "sound",
        "waveform"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/drive-by-noise-test-result",
      "family": "adr-compliance",
      "name": "DriveByNoiseTestResult",
      "label": "Drive-by noise test result",
      "description": "DashboardCard-wrapped drive-by result with pass/fail/pending stamp, test speed, measured vs ambient dB headroom and traffic-condition chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/drive-by-noise-test-result",
      "tags": [
        "drive-by",
        "result",
        "noise"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/rpm-correlation-chart",
      "family": "adr-compliance",
      "name": "RpmCorrelationChart",
      "label": "RPM correlation chart",
      "description": "Area chart of dB(A) across the rev range with an optional pre-mod baseline series, ADR limit legend and peak/limit/sample-count summary chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/rpm-correlation-chart",
      "tags": [
        "chart",
        "rpm",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/adr-rule-reference-card",
      "family": "adr-compliance",
      "name": "AdrRuleReferenceCard",
      "label": "ADR rule reference card",
      "description": "Reference card for a single ADR_RULES entry — rule number pill, title, plain-English summary, badge chips and official PDF link; card or plain variant.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/adr-rule-reference-card",
      "tags": [
        "reference",
        "adr",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/modification-declaration-form",
      "family": "adr-compliance",
      "name": "ModificationDeclarationForm",
      "label": "Modification declaration form",
      "description": "Stateful customer ADR declaration dialog — vehicle/customer fields, modification scope, file-upload evidence, dual e-signature pads and a consent gate.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/modification-declaration-form",
      "tags": [
        "form",
        "declaration",
        "signature"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/certificate-of-compliance-template",
      "family": "adr-compliance",
      "name": "CertificateOfComplianceTemplate",
      "label": "Certificate of compliance",
      "description": "In-app framed preview of the printable ADR certificate of compliance (wraps PrintComplianceCert) with cert number, vehicle, ADR ref and verification URL.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/certificate-of-compliance-template",
      "tags": [
        "certificate",
        "print",
        "preview"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/inspector-signoff-card",
      "family": "adr-compliance",
      "name": "InspectorSignoffCard",
      "label": "Inspector sign-off card",
      "description": "Technician sign-off card with avatar, qualification and licence chips, photo-evidence count, sign-off timestamp and a typed signature glyph.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/inspector-signoff-card",
      "tags": [
        "signoff",
        "inspector",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/pass-fail-counter",
      "family": "adr-compliance",
      "name": "PassFailCounter",
      "label": "Pass / fail counter",
      "description": "Aggregated pass/fail panel across today/week/month windows rendered with a MetricBlock plus a side pass-rate radial meter and pass/fail legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/pass-fail-counter",
      "tags": [
        "counter",
        "metrics",
        "pass-fail"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/adr-education-snippet",
      "family": "adr-compliance",
      "name": "AdrEducationSnippet",
      "label": "ADR education snippet",
      "description": "Customer-facing ADR education spotlight (wraps FeatureSpotlight) with kicker, heading, body, rule bullets, an ADR glyph visual and further-reading link.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/adr-education-snippet",
      "tags": [
        "education",
        "marketing",
        "spotlight"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/modification-approval-workflow",
      "family": "adr-compliance",
      "name": "ModificationApprovalWorkflow",
      "label": "Modification approval workflow",
      "description": "Five-step ADR approval process (declaration → pre-test → modification → post-test → certificate) rendered via ProcessSteps with lucide icons.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/modification-approval-workflow",
      "tags": [
        "workflow",
        "process",
        "steps"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/roadworthy-vs-adr-comparison",
      "family": "adr-compliance",
      "name": "RoadworthyVsAdrComparison",
      "label": "Roadworthy vs ADR",
      "description": "Side-by-side comparison table contrasting NSW roadworthy scope with the federal ADR programme across sound, emissions, drive-by and certification rows.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/roadworthy-vs-adr-comparison",
      "tags": [
        "comparison",
        "table",
        "roadworthy"
      ],
      "status": "captured"
    },
    {
      "key": "adr-compliance/test-equipment-status",
      "family": "adr-compliance",
      "name": "TestEquipmentStatus",
      "label": "Test equipment status",
      "description": "DashboardCard listing workshop instruments (meter, accelerometer, mic) with code badges, calibration/last-checked meta and ok/due/overdue/fault status chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/adr-compliance",
      "routeHref": "/ui-primitives/adr-compliance/test-equipment-status",
      "tags": [
        "equipment",
        "status",
        "dashboard"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
