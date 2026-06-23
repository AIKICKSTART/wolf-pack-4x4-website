import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { KnowledgeSourceRow } from "../../components/hermes-agent"

import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Knowledge source row | Hermes",
  description:
    "Primitive 05 — connected knowledge source row with sync status, records, last-sync chip and re-sync trigger.",
}

export default function KnowledgeSourceRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Source"
        title="Knowledge source row"
        description="A single connected knowledge source row — Mufflermen CMS docs, Drive folder, Manta supplier feed, call transcripts, Shopify catalogue. Each row shows kind, metadata, status, records, last sync and action buttons."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Knowledge source row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · synced sources</span>
        <KnowledgeSourceRow
          id="kb-cms"
          title="Mufflermen CMS · workshop docs"
          kind="cms-docs"
          metadata="172 docs · /workshop-hours · /policies"
          status="synced"
          lastSyncLabel="00:14m"
          recordCount={172}
        />
        <KnowledgeSourceRow
          id="kb-shopify"
          title="Shopify · parts catalogue"
          kind="shopify"
          metadata="3,184 SKUs · live · cat-backs, mid-pipes, mufflers"
          status="synced"
          lastSyncLabel="02:46m"
          recordCount={3184}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · syncing supplier feed</span>
        <KnowledgeSourceRow
          id="kb-manta"
          title="Manta supplier feed"
          kind="supplier-feed"
          metadata="Hourly poll · price + stock + lead time"
          status="syncing"
          lastSyncLabel="01:02m"
          recordCount={812}
          syncProgress={64}
        />
        <KnowledgeSourceRow
          id="kb-drive"
          title="Google Drive · ADR cert cheatsheets"
          kind="google-drive"
          metadata="/Mufflermen/Compliance · 18 PDFs"
          status="syncing"
          lastSyncLabel="just now"
          recordCount={18}
          syncProgress={22}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · stale & error</span>
        <KnowledgeSourceRow
          id="kb-transcripts"
          title="Phone transcripts · Saturday tickets"
          kind="transcripts"
          metadata="Whisper auto-transcription · 14d window"
          status="stale"
          lastSyncLabel="4d ago"
          recordCount={246}
        />
        <KnowledgeSourceRow
          id="kb-xforce"
          title="X-Force supplier feed"
          kind="supplier-feed"
          metadata="Auth token rotated · re-link required"
          status="error"
          lastSyncLabel="6d ago"
          recordCount={0}
        />
        <KnowledgeSourceRow
          id="kb-pacemaker"
          title="Pacemaker supplier feed"
          kind="supplier-feed"
          metadata="Paused by Daniel · awaiting price review"
          status="paused"
          lastSyncLabel="—"
          recordCount={184}
        />
      </section>
    </main>
  )
}
