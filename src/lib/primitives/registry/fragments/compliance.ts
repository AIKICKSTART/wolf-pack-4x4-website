import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "compliance",
  "title": "Compliance & governance",
  "group": "System",
  "summary": "14 compliance, privacy, and security-governance primitives — framework status, ROPA records, DPAs, sub-processors, consent, DSR intake, retention, encryption, pentest/VDP, posture scoring, policy diffs, and incident disclosure — tuned to the Privacy Act 1988 (Cth) and GDPR.",
  "entries": [
    {
      "key": "compliance/compliance-dashboard",
      "family": "compliance",
      "name": "ComplianceDashboard",
      "label": "Compliance dashboard",
      "description": "Governance posture surface with a head strip of summary tiles (auto-derived from frameworks) over a grid of FrameworkStatusCard primitives.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/compliance-dashboard",
      "tags": [
        "governance",
        "dashboard",
        "posture"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/framework-status-card",
      "family": "compliance",
      "name": "FrameworkStatusCard",
      "label": "Framework status card",
      "description": "Per-framework card showing status chip, a clamped percent-complete meter, and last/next audit dates with tone derived from compliance status.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/framework-status-card",
      "tags": [
        "framework",
        "audit",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/data-processing-record",
      "family": "compliance",
      "name": "DataProcessingRecord",
      "label": "Data processing record",
      "description": "ROPA / Article-30-style record listing data category, purpose, legal basis, retention, recipients, and onshore vs cross-border transfer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/data-processing-record",
      "tags": [
        "ropa",
        "privacy",
        "gdpr"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/dpa-viewer",
      "family": "compliance",
      "name": "DpaViewer",
      "label": "DPA viewer",
      "description": "Data processing agreement summary with version/term/sub-processor/SCC metadata, key-clause list, signed date, and a downloadable PDF link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/dpa-viewer",
      "tags": [
        "dpa",
        "contract",
        "vendor"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/subprocessor-list",
      "family": "compliance",
      "name": "SubprocessorList",
      "label": "Sub-processor list",
      "description": "DataTable-backed register of sub-processors with vendor/service, location chip, DPIA status chip, and last-reviewed date.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/subprocessor-list",
      "tags": [
        "subprocessor",
        "dpia",
        "register"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/consent-management-banner",
      "family": "compliance",
      "name": "ConsentManagementBanner",
      "label": "Consent management banner",
      "description": "Cookie/consent banner with per-category toggle switches (locked essentials), accept-all/reject/save actions, and a preference-center link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/consent-management-banner",
      "tags": [
        "consent",
        "cookies",
        "privacy"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/dsr-request-form",
      "family": "compliance",
      "name": "DsrRequestForm",
      "label": "DSR request form",
      "description": "Three-step data-subject-request intake (identity, request type, scope) with a stepper, validation gating, and an onSubmit submission payload.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/dsr-request-form",
      "tags": [
        "dsr",
        "privacy",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/retention-schedule-editor",
      "family": "compliance",
      "name": "RetentionScheduleEditor",
      "label": "Retention schedule editor",
      "description": "Editable retention rule with category/duration/disposal selects, a legal-hold switch, and a live plain-language summary line.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/retention-schedule-editor",
      "tags": [
        "retention",
        "disposal",
        "legal-hold"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/encryption-status-indicator",
      "family": "compliance",
      "name": "EncryptionStatusIndicator",
      "label": "Encryption status indicator",
      "description": "Three-tile readout of at-rest algorithm, in-transit TLS, and key-management backing with last-rotation and rotation-cadence footer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/encryption-status-indicator",
      "tags": [
        "encryption",
        "keys",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/pentest-results-card",
      "family": "compliance",
      "name": "PentestResultsCard",
      "label": "Pentest results card",
      "description": "Penetration-test report card with engagement metadata, executive summary, findings counts by CVSS severity, and a redacted-report download.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/pentest-results-card",
      "tags": [
        "pentest",
        "security",
        "findings"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/vulnerability-disclosure-card",
      "family": "compliance",
      "name": "VulnerabilityDisclosureCard",
      "label": "Vulnerability disclosure card",
      "description": "VDP card with security contact, optional PGP key/fingerprint, in-scope vs out-of-scope panels, SLA chip, and hall-of-fame link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/vulnerability-disclosure-card",
      "tags": [
        "vdp",
        "disclosure",
        "security"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/policy-version-diff",
      "family": "compliance",
      "name": "PolicyVersionDiff",
      "label": "Policy version diff",
      "description": "Policy revision diff viewer toggling between split and unified views with added/removed/changed line styling and a color legend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/policy-version-diff",
      "tags": [
        "policy",
        "diff",
        "versioning"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/security-posture-score",
      "family": "compliance",
      "name": "SecurityPostureScore",
      "label": "Security posture score",
      "description": "Scorecard with a circular gauge dial (tone by score band), contributing-factor list, and an SVG 14-day trend sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/security-posture-score",
      "tags": [
        "posture",
        "score",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "compliance/incident-disclosure-banner",
      "family": "compliance",
      "name": "IncidentDisclosureBanner",
      "label": "Incident disclosure banner",
      "description": "Live incident alert banner with severity chip, status timeline steps, latest mitigation update, and a statuspage link.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/compliance",
      "routeHref": "/ui-primitives/compliance/incident-disclosure-banner",
      "tags": [
        "incident",
        "status",
        "disclosure"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
