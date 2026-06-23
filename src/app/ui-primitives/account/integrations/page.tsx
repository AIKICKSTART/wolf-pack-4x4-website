import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  IntegrationTile,
  type IntegrationStatus,
} from "../../components/account/integration-tile"

import styles from "../account.module.css"

export const metadata: Metadata = {
  title: "Integrations · Account | UI Primitives",
}

interface Integration {
  id: string
  name: string
  description: string
  status: IntegrationStatus
  glyph: string
  lastSync?: string
  scopes?: ReadonlyArray<string>
}

interface IntegrationCategory {
  id: string
  label: string
  items: ReadonlyArray<Integration>
}

const CATEGORIES: ReadonlyArray<IntegrationCategory> = [
  {
    id: "crm",
    label: "CRM",
    items: [
      {
        id: "hubspot",
        name: "HubSpot",
        description: "Sync workshop contacts and quote requests into the Oak Flats sales pipeline.",
        status: "connected",
        glyph: "HS",
        lastSync: "08 min ago",
        scopes: ["contacts:read", "deals:write"],
      },
      {
        id: "pipedrive",
        name: "Pipedrive",
        description: "Push closed-won fleet jobs into Pipedrive deal stages.",
        status: "setup",
        glyph: "PD",
      },
    ],
  },
  {
    id: "comms",
    label: "Comms",
    items: [
      {
        id: "twilio",
        name: "Twilio",
        description: "Send booking confirmations and job-ready SMS to customers.",
        status: "connected",
        glyph: "TW",
        lastSync: "2 min ago",
        scopes: ["messages:send", "lookup:read"],
      },
      {
        id: "slack",
        name: "Slack",
        description: "Post bay-floor incidents into the #ofm-floor channel.",
        status: "connected",
        glyph: "SL",
        lastSync: "27 min ago",
        scopes: ["chat:write"],
      },
      {
        id: "intercom",
        name: "Intercom",
        description: "Route fleet customer chats from the marketing site.",
        status: "disabled",
        glyph: "IC",
      },
    ],
  },
  {
    id: "storage",
    label: "Storage",
    items: [
      {
        id: "s3",
        name: "AWS S3",
        description: "Cold-store quote PDFs and customer photo uploads.",
        status: "connected",
        glyph: "S3",
        lastSync: "16 min ago",
        scopes: ["s3:put", "s3:get"],
      },
      {
        id: "drive",
        name: "Google Drive",
        description: "Backup the workshop wiki and inspection sheet templates.",
        status: "error",
        glyph: "GD",
        lastSync: "2 hr ago — retry queued",
        scopes: ["drive.file"],
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    items: [
      {
        id: "ga4",
        name: "Google Analytics 4",
        description: "Stream booking funnel events from the public site.",
        status: "connected",
        glyph: "GA",
        lastSync: "5 min ago",
      },
      {
        id: "posthog",
        name: "PostHog",
        description: "Funnel + session replay for the customer quote tool.",
        status: "setup",
        glyph: "PH",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      {
        id: "github",
        name: "GitHub",
        description: "Deploy the workshop website + plugins from the workshop monorepo.",
        status: "connected",
        glyph: "GH",
        lastSync: "Just now",
        scopes: ["repo:read", "actions:write"],
      },
      {
        id: "stripe",
        name: "Stripe",
        description: "Process card + bank invoices for the Fleet plan.",
        status: "connected",
        glyph: "ST",
        lastSync: "1 min ago",
        scopes: ["charges:read", "invoices:write"],
      },
      {
        id: "vercel",
        name: "Vercel",
        description: "Preview deployments for every workshop branch.",
        status: "setup",
        glyph: "VC",
      },
    ],
  },
]

export default function AccountIntegrationsPage() {
  return (
    <>
      <PageHeader
        kicker="18.4 / Integrations"
        title="Integrations"
        description="Every third-party service the workshop talks to — grouped by job, with status and scope at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Account", href: "/ui-primitives/account" },
          { label: "Integrations" },
        ]}
      />

      {CATEGORIES.map((category) => (
        <section
          key={category.id}
          className={styles.integrationCategoryGroup}
          aria-labelledby={`integration-${category.id}-heading`}
        >
          <h2 id={`integration-${category.id}-heading`} className={styles.integrationCategoryTitle}>
            {category.label}
          </h2>
          <div className={styles.integrationGrid}>
            {category.items.map((item) => (
              <IntegrationTile
                key={item.id}
                name={item.name}
                description={item.description}
                category={category.label}
                status={item.status}
                glyph={<span>{item.glyph}</span>}
                lastSync={item.lastSync}
                scopes={item.scopes}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
