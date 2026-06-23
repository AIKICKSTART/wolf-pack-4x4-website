"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  ActiveChatWindow,
  ChatQueueInbox,
  ChatSlaTimerChip,
  ChatVolumeGauge,
  CustomerContextCard,
  KbSnippetSuggester,
  MultiChatTabs,
  OperatorStatusPill,
  OperatorTeamPresence,
  QuickRepliesMacroPanel,
  SentimentIndicator,
  TransferChatModal,
  WrapUpForm,
} from "../../components/live-chat"

import {
  HILUX_CART,
  HILUX_MESSAGES,
  KB_SNIPPETS,
  MACRO_LIBRARY,
  MENTION_CANDIDATES,
  MULTI_CHAT_TABS,
  QUEUE_ITEMS,
  QUICK_REPLY_SHORTCUTS,
  SUGGESTED_TAGS,
  TEAM_PRESENCE,
  TRANSFER_OPERATORS,
  TRANSFER_TEAMS,
  VISITOR_MICK,
} from "../_mock-data"
import styles from "../live-chat.module.css"

export default function FullConsoleScenePage() {
  const [activeTabId, setActiveTabId] = useState<string>("q1")
  const [transferOpen, setTransferOpen] = useState<boolean>(false)
  const [wrapOpen, setWrapOpen] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full operator console"
        title="Mufflermen live chat console"
        description="The full operator console composed end-to-end — chat queue left, multi-chat tab strip up top, active chat window centre, customer context right with sentiment + KB suggester below it, team presence + chat volume gauge in the header strip, macro panel docked to the right and transfer + wrap-up modal triggers in the action bar. Realistic Hilux fitment scenario with Mick Davis."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Full operator console" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Composition · operator Jordan + 4 active chats + queue depth 5
        </span>

        <div className={styles.consoleShell}>
          <div className={styles.consoleHeader}>
            <div className={styles.consoleHeaderLeft}>
              <OperatorStatusPill
                status="available"
                operatorName="Jordan"
                onPress={() => undefined}
              />
              <ChatSlaTimerChip
                remainingMinutes={56}
                kind="next-response"
                context="Mick Davis"
              />
            </div>
            <ChatVolumeGauge
              inProgress={9}
              capacity={12}
              queueLength={5}
              projectedEtaMinutes={3}
            />
          </div>

          <MultiChatTabs
            tabs={MULTI_CHAT_TABS}
            activeId={activeTabId}
            onSelect={setActiveTabId}
            onClose={() => undefined}
            onNew={() => undefined}
          />

          <div className={styles.consoleGrid}>
            <div className={styles.consoleCol}>
              <ChatQueueInbox items={QUEUE_ITEMS} activeId={activeTabId} />
              <OperatorTeamPresence operators={TEAM_PRESENCE} />
            </div>

            <div className={styles.consoleCol}>
              <ActiveChatWindow
                visitorName="Mick Davis"
                visitorMeta="Oak Flats NSW · Chrome on Android · 14m on site"
                messages={HILUX_MESSAGES}
                typingPerson={VISITOR_MICK}
                mentionCandidates={MENTION_CANDIDATES}
              />
              <QuickRepliesMacroPanel
                macros={MACRO_LIBRARY}
                shortcuts={QUICK_REPLY_SHORTCUTS}
              />
              <div className={styles.consoleOverlay}>
                <button
                  type="button"
                  className={styles.openTransferBtn}
                  onClick={() => setTransferOpen(true)}
                >
                  Transfer chat
                </button>
                <button
                  type="button"
                  className={styles.openWrapBtn}
                  onClick={() => setWrapOpen(true)}
                >
                  Wrap up + close
                </button>
              </div>
            </div>

            <div className={styles.consoleCol}>
              <CustomerContextCard
                visitorName="Mick Davis"
                contact="mick.davis@example.com.au"
                pageTitle="Manta 3in cat-back · high-clearance"
                pageMeta="/parts/manta-3in-cat-back · 14m on site"
                cart={HILUX_CART}
                pastChats={4}
                openTickets={1}
                persona="Returning · LTV $12,845"
              />
              <SentimentIndicator score={56} recentShiftPoints={14} />
              <KbSnippetSuggester
                snippets={KB_SNIPPETS}
                contextLabel="From Mick's Hilux fitment chat"
              />
            </div>
          </div>
        </div>

        <TransferChatModal
          open={transferOpen}
          onOpenChange={setTransferOpen}
          operators={TRANSFER_OPERATORS}
          teams={TRANSFER_TEAMS}
          visitorName="Mick Davis"
        />
        <WrapUpForm
          open={wrapOpen}
          onOpenChange={setWrapOpen}
          visitorName="Mick Davis"
          suggestedTags={SUGGESTED_TAGS}
          durationSummary="8m 22s · 14 messages · sentiment +56"
        />
      </section>
    </main>
  )
}
