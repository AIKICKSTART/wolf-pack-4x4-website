"use client"

import { useState } from "react"

import {
  AssignToCard,
  BulkActionBar,
  ChannelStatusRow,
  ComposerWithMacros,
  ConversationThreadView,
  CustomerContextRail,
  MergeConversationsModal,
  MultiChannelList,
  PriorityFlagRow,
  SentimentTagStrip,
  SlaCountdownTile,
  TagManagerStrip,
  TeamPresenceRail,
  AutoReplyRuleCard,
  type UnifiedConversation,
} from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import {
  AUTO_REPLY_RULES,
  CHANNEL_HEALTH,
  CONVERSATIONS,
  MACROS,
  MICK_PROFILE,
  MICK_RECENT_JOBS,
  MICK_THREAD,
  TAG_LIBRARY,
  TEAM,
  resolveTags,
} from "../_mock-data"
import styles from "../unified-inbox.module.css"

const HOT_RULE = AUTO_REPLY_RULES[0]

export default function FullInboxScenePage() {
  const [activeId, setActiveId] = useState<string>("conv-mick")
  const [selectedCount, setSelectedCount] = useState<number>(0)
  const [mergeOpen, setMergeOpen] = useState<boolean>(false)

  const active = CONVERSATIONS.find(
    (conversation: UnifiedConversation) => conversation.id === activeId,
  )

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full unified inbox"
        title="Mufflermen unified inbox"
        description="All 14 primitives composed end-to-end. Tim is on Mick's DPF SMS thread, Karen W.'s Facebook quote follow-up is flagged upset and urgent after a third reschedule, Bec S.'s refund email sits with Daniel, and the Instagram OAuth is silently expired in the channel status row. SLA countdown is hot — 9 minutes left on the first-response window."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Full unified inbox" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Composition · 6 conversations · 5 channels · 3 teammates online
        </span>

        <div className={styles.fullShell}>
          <ChannelStatusRow
            channels={CHANNEL_HEALTH.map((entry) =>
              entry.state === "expired" || entry.state === "disconnected"
                ? { ...entry, onReconnect: () => undefined }
                : entry,
            )}
          />

          <div className={styles.fullBulk}>
            <BulkActionBar
              selectedCount={selectedCount}
              contextLabel={selectedCount > 0 ? "across 3 channels" : undefined}
              onAction={() => undefined}
              onDismiss={() => setSelectedCount(0)}
            />
            <div className={styles.fullActions}>
              <button
                type="button"
                className={styles.fullActionBtn}
                onClick={() => setSelectedCount((value) => value + 1)}
              >
                Add 1 to selection
              </button>
              <button
                type="button"
                className={styles.fullActionBtn}
                onClick={() => setMergeOpen(true)}
              >
                Open merge modal
              </button>
            </div>
          </div>

          <div className={styles.fullGrid}>
            <div className={styles.fullCol}>
              <MultiChannelList
                conversations={CONVERSATIONS}
                activeId={activeId}
                onSelect={setActiveId}
              />
              <TeamPresenceRail teammates={TEAM} />
            </div>

            <div className={styles.fullCol}>
              <SlaCountdownTile
                remainingMinutes={9}
                targetMinutes={15}
                scope="first-response"
                context={`Hot lead · ${active?.customerName ?? "Mick D."}`}
              />
              <ConversationThreadView
                channel="sms"
                subject="DPF clean question — Hilux"
                customerName="Mick D."
                customerContact="+61 412 803 277"
                messages={MICK_THREAD}
              />
              <ComposerWithMacros macros={MACROS} customerName="Mick D." />
              <SentimentTagStrip
                detected="neutral"
                source="Auto-detected from 4 messages today"
              />
              <PriorityFlagRow defaultValue="normal" />
              <TagManagerStrip
                selected={resolveTags(active?.tagIds ?? [])}
                suggestions={TAG_LIBRARY}
              />
              <AutoReplyRuleCard
                kind={HOT_RULE.kind}
                title={HOT_RULE.title}
                body={HOT_RULE.body}
                schedule={HOT_RULE.schedule}
                channels={HOT_RULE.channels}
                defaultEnabled={HOT_RULE.enabled}
              />
            </div>

            <div className={styles.fullCol}>
              <CustomerContextRail
                customer={MICK_PROFILE}
                recentJobs={MICK_RECENT_JOBS}
                persona="Returning · Hilux community"
              />
              <AssignToCard teammates={TEAM} assigneeId="tim" />
            </div>
          </div>
        </div>

        <MergeConversationsModal
          open={mergeOpen}
          onOpenChange={setMergeOpen}
          candidates={CONVERSATIONS}
          primaryId="conv-mick"
        />
      </section>
    </main>
  )
}
