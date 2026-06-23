import type { Metadata } from "next"

import {
  ComplianceDashboard,
  ConsentManagementBanner,
  DpaViewer,
  EncryptionStatusIndicator,
  IncidentDisclosureBanner,
  SecurityPostureScore,
  SubprocessorList,
  type SubprocessorRow,
} from "../../components/compliance"
import { PageHeader } from "../../components/page-header"
import { ComplianceAuditLog, type ComplianceAuditEntry } from "./compliance-audit-log"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Full compliance dashboard | Compliance",
  description:
    "Composition — wires ComplianceDashboard + sub-processor table + DPA viewer aside + consent banner + security posture + audit log into one mock dashboard.",
}

const AUDIT_ROWS: ReadonlyArray<ComplianceAuditEntry> = [
  {
    id: "a-1",
    when: "10 min ago",
    actor: "Tom V · Compliance",
    action: "Marked PCI control 3.4 as evidenced",
    target: "PCI DSS v4 · §3.4",
  },
  {
    id: "a-2",
    when: "42 min ago",
    actor: "Jess R · DPO",
    action: "Closed DSR request",
    target: "DSR-2026-118 (erasure)",
  },
  {
    id: "a-3",
    when: "1 hr ago",
    actor: "auto · ci",
    action: "Rotated AES-256-GCM data key",
    target: "kms/booking-rest-key",
  },
  {
    id: "a-4",
    when: "3 hr ago",
    actor: "Marcus P · Eng",
    action: "Updated sub-processor list",
    target: "Schedule 2 · Intercom removed",
  },
  {
    id: "a-5",
    when: "yesterday",
    actor: "Priya K · SecOps",
    action: "Logged pentest finding as resolved",
    target: "ENG-2026-018 · MED-02",
  },
]

const SUBPROCESSORS: ReadonlyArray<SubprocessorRow> = [
  {
    id: "stripe",
    vendor: "Stripe",
    service: "Card payment processing",
    location: "au",
    locationLabel: "Sydney AU",
    dpiaStatus: "approved",
    lastReviewed: "2026-03-14",
  },
  {
    id: "xero",
    vendor: "Xero",
    service: "Invoicing + BAS lodgement",
    location: "au",
    locationLabel: "Sydney AU",
    dpiaStatus: "approved",
    lastReviewed: "2026-02-08",
  },
  {
    id: "twilio",
    vendor: "Twilio",
    service: "SMS booking reminders",
    location: "us",
    locationLabel: "Virginia US",
    dpiaStatus: "approved",
    lastReviewed: "2026-04-02",
  },
  {
    id: "datadog",
    vendor: "Datadog",
    service: "APM + log aggregation",
    location: "eu",
    locationLabel: "Frankfurt EU",
    dpiaStatus: "approved",
    lastReviewed: "2026-01-30",
  },
  {
    id: "mailchimp",
    vendor: "Mailchimp",
    service: "Marketing newsletter",
    location: "us",
    locationLabel: "Atlanta US",
    dpiaStatus: "pending",
    lastReviewed: "2026-04-22",
  },
]

export default function FullDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Dashboard"
        title="Full compliance dashboard"
        description="Composed mock of the Mufflermen compliance + governance + privacy console — top-of-app incident banner, the framework status dashboard, the sub-processor table, an aside with the active Stripe DPA viewer + encryption posture, a consent banner, the security posture score, and a recent compliance audit log. Visual reference only, no backend is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Full dashboard" },
        ]}
      />

      <div className={styles.fullShell}>
        <IncidentDisclosureBanner
          severity="sev-3"
          incidentId="MUF-INC-2026-052"
          headline="Statuspage minor — SMS provider delays"
          body="Booking reminder SMS are delayed up to 12 minutes. New bookings and the workshop console are unaffected."
          timeline={[
            { id: "detected", label: "Detected", status: "done" },
            { id: "investigating", label: "Investigating", status: "done" },
            { id: "mitigating", label: "Mitigating", status: "current" },
            { id: "resolved", label: "Resolved", status: "pending" },
          ]}
          mitigationUpdate="Backup SMS provider promoted to primary. Backlog draining at ~2k msg / min."
          updatedAt="11:42 AEST · 2026-05-27"
          statuspageHref="https://status.mufflermen.com.au"
        />

        <ComplianceDashboard
          title="Mufflermen governance posture"
          tagline="Live status of the four frameworks the workshop reports against plus the regulated overlays (PCI for card data, HIPAA only if onboarded a US insurer)."
          frameworks={[
            {
              framework: "iso-27001",
              status: "compliant",
              percent: 100,
              lastAuditDate: "2026-02-14",
              nextAuditDate: "2026-08-14",
            },
            {
              framework: "soc-2",
              status: "compliant",
              percent: 96,
              lastAuditDate: "2026-03-22",
              nextAuditDate: "2026-09-22",
            },
            {
              framework: "gdpr",
              status: "in-progress",
              percent: 78,
              lastAuditDate: "2025-11-04",
              nextAuditDate: "2026-07-12",
            },
            {
              framework: "essential-8",
              status: "in-progress",
              percent: 84,
              lastAuditDate: "2026-01-18",
              nextAuditDate: "2026-07-18",
            },
            {
              framework: "irap",
              status: "not-started",
              percent: 16,
              lastAuditDate: "—",
              nextAuditDate: "2026-12-01",
            },
          ]}
        />

        <div className={styles.fullSplit}>
          <SubprocessorList
            rows={SUBPROCESSORS}
            caption="Active sub-processors"
            kicker="Schedule 2 · 5 vendors"
          />

          <aside className={styles.fullSide} aria-label="Compliance context">
            <DpaViewer
              vendorName="Stripe Payments Australia"
              signedDate="2026-02-14"
              term="36 months · auto-renew"
              version="v3.1"
              scc="EU 2021/914 + AU"
              subprocessorCount={11}
              keyClauses={[
                { ref: "§4.2", summary: "PAN tokenised at source." },
                { ref: "§9.1", summary: "Breach notice within 72 hours." },
              ]}
              downloadHref="#dpa-stripe"
            />
            <EncryptionStatusIndicator
              atRestAlgo="aes-256-gcm"
              atRestModule="OpenSSL 3.2 · FIPS 140-3"
              inTransitAlgo="tls-1-3"
              inTransitSuite="TLS_AES_256_GCM_SHA384"
              keyManagement="aws-kms"
              lastKeyRotation="2026-04-12"
              rotationCadence="Every 90 days"
            />
          </aside>
        </div>

        <SecurityPostureScore
          score={88}
          factors={[
            { id: "mfa", label: "MFA enforced 100%", tone: "positive" },
            { id: "edr", label: "Endpoint EDR", tone: "positive" },
            { id: "patch", label: "Patch SLA <14d", tone: "positive" },
            { id: "dlp", label: "DLP active", tone: "positive" },
            { id: "iam", label: "Privileged access review overdue", tone: "warn" },
          ]}
          trend={[80, 82, 81, 84, 83, 85, 84, 86, 85, 87, 86, 88, 87, 88]}
        />

        <ConsentManagementBanner
          title="Manage your data preferences"
          body="Essential cookies are always on. Everything else respects your choice. Distinct from the lighter marketing cookie banner — this is the deeper preference panel."
          preferenceCenterHref="#preference-center"
          categories={[
            {
              key: "essential",
              label: "Essential",
              description: "Auth session, CSRF tokens, booking cart state.",
              locked: true,
              defaultGranted: true,
            },
            {
              key: "functional",
              label: "Functional",
              description: "Remember saved vehicles, preferred bay location, theme.",
              defaultGranted: true,
            },
            {
              key: "analytics",
              label: "Analytics",
              description: "Aggregate usage data with no raw IPs retained.",
              defaultGranted: false,
            },
            {
              key: "marketing",
              label: "Marketing",
              description: "Targeted ads on Meta + Google. Off by default in AU.",
              defaultGranted: false,
            },
            {
              key: "sale-of-data",
              label: "Sale of personal data",
              description: "We do not sell or rent data. Shown for CCPA / CPRA only.",
              defaultGranted: false,
            },
          ]}
        />

        <ComplianceAuditLog rows={AUDIT_ROWS} />
      </div>
    </main>
  )
}
