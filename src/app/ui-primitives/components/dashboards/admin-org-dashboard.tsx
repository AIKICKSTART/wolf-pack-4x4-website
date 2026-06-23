import { ActivityFeed } from "../data-display/activity-feed"
import { ComparisonTable } from "../data-display/comparison-table"
import { DashboardCard } from "../data-display/dashboard-card"
import { ChannelMatrix } from "../notifications/channel-matrix"
import type { ActivityFeedItem } from "../data-display/activity-feed"
import type {
  ChannelMatrixChannel,
  ChannelMatrixRow,
  ChannelMatrixValue,
} from "../notifications/channel-matrix"

import { DashboardShell } from "./dashboard-shell"
import { DashboardTile } from "./dashboard-tile"
import styles from "./admin-org-dashboard.module.css"

interface Integration {
  id: string
  glyph: string
  name: string
  meta: string
  status: "connected" | "syncing" | "degraded"
}

const INTEGRATIONS: ReadonlyArray<Integration> = [
  { id: "xero", glyph: "X°", name: "Xero", meta: "Accounting · Last sync 04:12", status: "connected" },
  { id: "stripe", glyph: "S$", name: "Stripe", meta: "Payments · Last sync 09:38", status: "connected" },
  { id: "twilio", glyph: "Tw", name: "Twilio", meta: "SMS · Last sync 11:01", status: "syncing" },
  { id: "mailgun", glyph: "M=", name: "Mailgun", meta: "Email · Last sync 02:24", status: "connected" },
  { id: "hubspot", glyph: "HS", name: "HubSpot", meta: "CRM · Last sync 06:55", status: "degraded" },
  { id: "rmm", glyph: "Rm", name: "Repco Connect", meta: "Parts · Last sync 12:08", status: "connected" },
]

const STATUS_LABEL: Record<Integration["status"], string> = {
  connected: "Connected",
  syncing: "Syncing",
  degraded: "Degraded",
}

const AUDIT: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "au-1",
    title: "Pricing change approved — twin-loop kit +6%",
    description: "Approved by Marcia O. Effective Mon 02 Jun.",
    timestamp: "09:18 today",
    tone: "info",
    actor: { name: "Marcia Olague" },
  },
  {
    id: "au-2",
    title: "Permission grant — Mateo R. → bay supervisor",
    description: "Time-bound 30 days. Audit ref AUD-2026-0142.",
    timestamp: "Yesterday · 16:42",
    tone: "success",
    actor: { name: "Brett Walters" },
  },
  {
    id: "au-3",
    title: "Integration credential rotated — Twilio",
    description: "Owner-only secret rotation. No downtime detected.",
    timestamp: "2 days ago",
    tone: "info",
    actor: { name: "Petra Iverson" },
  },
  {
    id: "au-4",
    title: "Failed deploy — primitives storybook v0.43",
    description: "Sentry caught regression in chart-area. Rolled back automatically.",
    timestamp: "3 days ago",
    tone: "warn",
    actor: { name: "CI bot" },
  },
]

const CHANNEL_ROWS: ReadonlyArray<ChannelMatrixRow> = [
  { id: "billing", label: "Billing event" },
  { id: "security", label: "Security alert" },
  { id: "outage", label: "Service outage" },
  { id: "newsletter", label: "Owner newsletter" },
]

const CHANNEL_CHANNELS: ReadonlyArray<ChannelMatrixChannel> = [
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS" },
  { id: "slack", label: "Slack" },
  { id: "inapp", label: "In-app" },
]

const CHANNEL_VALUE: ChannelMatrixValue = {
  billing: { email: true, sms: false, slack: true, inapp: true, push: false },
  security: { email: true, sms: true, slack: true, inapp: true, push: false },
  outage: { email: true, sms: true, slack: true, inapp: true, push: false },
  newsletter: { email: true, sms: false, slack: false, inapp: false, push: false },
}

export function AdminOrgDashboard() {
  return (
    <div className={styles.surface}>
      <DashboardShell
        kicker="Admin / Organisation"
        title="Oak Flats Mufflermen org"
        subtitle="Owner-level view across revenue, customer base, work volume, and the third-party rails that keep the workshop running."
        toolbar={<span>Owner · Brett W.</span>}
        ariaLabel="Admin organisation dashboard"
        density="comfortable"
        columns={4}
      >
        <DashboardTile label="MRR" aside="May 2026" span={1} tone="green">
          <DashboardCard
            label="Monthly recurring"
            value="$48,420"
            unit="MRR"
            delta={{ label: "+8.4% MoM", direction: "up" }}
            meta="Subscriptions + service plans"
            surface="glass"
          />
        </DashboardTile>
        <DashboardTile label="Customers" aside="Active" span={1} tone="teal">
          <DashboardCard
            label="Active customers"
            value="612"
            delta={{ label: "+27 this month", direction: "up" }}
            meta="Trailing 90d active"
            surface="glass"
          />
        </DashboardTile>
        <DashboardTile label="Jobs · month" aside="Volume" span={1} tone="amber">
          <DashboardCard
            label="Jobs completed"
            value="148"
            unit="jobs"
            delta={{ label: "+12 vs Apr", direction: "up" }}
            meta="Across 6 bays"
            surface="glass"
          />
        </DashboardTile>
        <DashboardTile label="NPS" aside="Latest pulse" span={1} tone="red">
          <DashboardCard
            label="Net promoter"
            value="74"
            delta={{ label: "+4 pts QoQ", direction: "up" }}
            meta="208 responses"
            surface="glass"
          />
        </DashboardTile>
      </DashboardShell>

      <DashboardShell
        kicker="Integrations / Connected services"
        title="The plumbing"
        subtitle="Third-party rails for accounting, payments, comms, and CRM. Watch the degraded ones."
        ariaLabel="Connected integrations section"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Integrations" aside="6 connected" span={1} tone="teal">
          <div className={styles.integrationGrid}>
            {INTEGRATIONS.map((integration) => (
              <div key={integration.id} className={styles.integration} data-status={integration.status}>
                <span className={styles.integrationGlyph} aria-hidden="true">
                  {integration.glyph}
                </span>
                <div className={styles.integrationBody}>
                  <div className={styles.integrationName}>{integration.name}</div>
                  <div className={styles.integrationMeta}>{integration.meta}</div>
                </div>
                <span className={styles.integrationStatus} data-status={integration.status}>
                  {STATUS_LABEL[integration.status]}
                </span>
              </div>
            ))}
          </div>
        </DashboardTile>
      </DashboardShell>

      <div className={styles.row}>
        <DashboardTile label="Owner audit log" aside="Last 7d" tone="amber">
          <ActivityFeed items={AUDIT} ariaLabel="Owner-level audit log" />
        </DashboardTile>

        <DashboardTile label="Notification routing" aside="Org policy" tone="teal">
          <ChannelMatrix
            rows={CHANNEL_ROWS}
            channels={CHANNEL_CHANNELS}
            defaultValue={CHANNEL_VALUE}
            legend="Owner notification policy"
          />
        </DashboardTile>
      </div>

      <DashboardShell
        kicker="Plan & posture"
        title="Where we sit"
        subtitle="The Mufflermen subscription tier compared against the standard mate-rate plans."
        ariaLabel="Pricing tier spotlight"
        density="compact"
        columns={1}
      >
        <DashboardTile label="Current plan · Workshop Pro" span={1} tone="red">
          <ComparisonTable
            columns={[
              { id: "mate", name: "Mate-rate" },
              { id: "workshop", name: "Workshop", caption: "Most workshops" },
              { id: "pro", name: "Workshop Pro", caption: "Your plan", popular: true },
            ]}
            rows={[
              { feature: "Job tickets / month", values: ["50", "300", "Unlimited"] },
              { feature: "Bay scheduling", values: ["cross", "check", "check"] },
              { feature: "Integrations slot", values: ["1", "3", "Unlimited"] },
              { feature: "Customer portal", values: ["cross", "check", "check"] },
              { feature: "Quote workspace", values: ["check", "check", "check"] },
              { feature: "Custom branding", values: ["cross", "cross", "check"] },
            ]}
            caption="Subscription plan comparison"
          />
        </DashboardTile>
      </DashboardShell>
    </div>
  )
}

export default AdminOrgDashboard
