"use client"

import { useState } from "react"

import {
  AssistantMessageBubble,
  ChatThread,
  CitationPill,
  ConversationRail,
  ModelSelector,
  PromptInput,
  StopRegenActions,
  SuggestionChips,
  SystemPromptEditor,
  TokenUsageChip,
  ToolCallCard,
  UserMessageBubble,
} from "../../components/ai"
import type {
  ConversationEntry,
  ModelOption,
  SuggestionChip,
} from "../../components/ai"
import styles from "./full-conversation.module.css"

const CONVERSATIONS: ReadonlyArray<ConversationEntry> = [
  {
    id: "active",
    title: "Hilux 2.8 — volume-legal exhaust",
    preview: "Redback 3\" cat-back vs Magnaflow mid-pipe.",
    timestamp: "09:41",
    group: "today",
  },
  {
    id: "bay2",
    title: "Bay 2 — Thursday morning slot",
    preview: "Hold for Hilux + warranty re-cat.",
    timestamp: "08:12",
    group: "today",
  },
  {
    id: "magna",
    title: "Magnaflow supplier ETA",
    preview: "Stainless lab AU + Magnaflow restock.",
    timestamp: "Yesterday",
    group: "yesterday",
  },
  {
    id: "egt",
    title: "EGT outlier — bay 3 cyl 4",
    preview: "Amber band 38s, tip sniffer trace OK.",
    timestamp: "Mon",
    group: "week",
  },
  {
    id: "stainless",
    title: "304 vs 409 stainless FAQ",
    preview: "Customer-facing copy for coastal NSW.",
    timestamp: "Sat",
    group: "week",
  },
]

const MODELS: ReadonlyArray<ModelOption> = [
  {
    id: "opus",
    name: "Claude Opus 4.7",
    tier: "opus",
    contextWindow: "1M",
    costPerMillion: "$15",
    description: "Deepest reasoning — architectural calls, gnarly diagnostics.",
  },
  {
    id: "sonnet",
    name: "Claude Sonnet 4.6",
    tier: "sonnet",
    contextWindow: "200K",
    costPerMillion: "$3",
    description: "Daily driver. Sharp on fitments and supplier ops.",
  },
  {
    id: "haiku",
    name: "Claude Haiku 4.5",
    tier: "haiku",
    contextWindow: "200K",
    costPerMillion: "$0.80",
    description: "Lightweight + fast for slash tools and chips.",
  },
]

const SUGGESTIONS: ReadonlyArray<SuggestionChip> = [
  {
    id: "noise",
    label: "Noise comparison vs stock",
    prompt: "How much louder than stock will the Redback 3\" be at 80 km/h cruise?",
  },
  {
    id: "warranty",
    label: "Does this void warranty?",
    prompt: "Does fitting the Redback cat-back affect the factory powertrain warranty?",
  },
  {
    id: "egt",
    label: "EGT bung placement",
    prompt: "Where should I add an EGT bung on the Redback mid-pipe for a pyrometer?",
  },
  {
    id: "service",
    label: "Service notes",
    prompt: "Generate the service notes summary for the customer hand-back.",
  },
]

const DEFAULT_SYSTEM_PROMPT = `You are the Oak Flats Mufflermen quote assistant. Reply in plain Australian English. Always cite NSW EPA noise limits when relevant, prefer 304 stainless for coastal jobs, and quote fitted AUD prices including GST.`

const PARTS_LOOKUP_INPUT = `{
  "make": "Toyota",
  "model": "Hilux",
  "engine": "2.8L 1GD-FTV",
  "year": 2018,
  "category": "cat-back exhaust"
}`

const PARTS_LOOKUP_OUTPUT = `{
  "results": [
    { "sku": "RB-HXL-30-304", "noise_db": 89.1, "price_aud": 1184, "in_stock": 6 },
    { "sku": "MF-HXL-MID-409", "noise_db": 85.4, "price_aud": 684, "in_stock": 12 }
  ]
}`

export function FullConversationScene() {
  const [activeId, setActiveId] = useState<string>("active")
  const [selectedModel, setSelectedModel] = useState<string>("sonnet")
  const [composer, setComposer] = useState<string>("")

  return (
    <div className={styles.scene}>
      <ConversationRail
        conversations={CONVERSATIONS}
        activeId={activeId}
        onSelect={setActiveId}
        className={styles.rail}
      />

      <div className={styles.main}>
        <header className={styles.head}>
          <div className={styles.headLeft}>
            <span className={styles.kicker}>Live · Quote thread</span>
            <h2 className={styles.headTitle}>Hilux 2.8 — volume-legal exhaust</h2>
          </div>
          <div className={styles.headRight}>
            <TokenUsageChip used={42_180} budget={200_000} label="Context" />
            <ModelSelector
              models={MODELS}
              selectedId={selectedModel}
              onSelect={setSelectedModel}
            />
          </div>
        </header>

        <SystemPromptEditor defaultPrompt={DEFAULT_SYSTEM_PROMPT} />

        <ChatThread
          ariaLabel="Hilux 2.8 quote assistant transcript"
          className={styles.thread}
        >
          <UserMessageBubble timestamp="09:41" authorName="Daniel">
            <p>
              Help me pick an exhaust for a Hilux 2.8L diesel — needs to stay
              volume-legal in NSW.
            </p>
          </UserMessageBubble>

          <AssistantMessageBubble
            timestamp="09:41"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            citations={
              <>
                <CitationPill
                  index={1}
                  title="NSW EPA noise limits"
                  url="https://www.epa.nsw.gov.au/noise-limits"
                  snippet="Diesel 4x4 utility 2018+: 90 dB(A) static, 80 dB(A) drive-by."
                />
                <CitationPill
                  index={2}
                  title="Redback datasheet — Hilux 2.8"
                  url="https://www.redbackexhausts.com.au/hilux-2-8-gun125"
                  snippet="304 stainless, V-band 76 mm, 89.1 dB(A) bench."
                />
              </>
            }
          >
            <p>
              Two volume-legal paths under the NSW EPA 90 dB(A) static cap. Both
              retain the cat so emissions stay compliant:
            </p>
            <ul>
              <li>
                <strong>Redback 3&quot; cat-back</strong> — A$1,184 fitted, 89.1
                dB(A) bench.
              </li>
              <li>
                <strong>Magnaflow mid-pipe + factory tip</strong> — A$684 fitted,
                85.4 dB(A) bench.
              </li>
            </ul>
            <ToolCallCard
              toolName="parts_lookup"
              status="done"
              durationMs={412}
              inputJson={PARTS_LOOKUP_INPUT}
              outputJson={PARTS_LOOKUP_OUTPUT}
            />
            <p>Want fitted timing for either at Oak Flats this week?</p>
            <StopRegenActions />
          </AssistantMessageBubble>

          <UserMessageBubble timestamp="09:43" authorName="Daniel">
            <p>Redback fitted. Earliest morning slot please.</p>
          </UserMessageBubble>

          <AssistantMessageBubble
            timestamp="09:43"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
          >
            <p>
              Thursday 09:30 Bay 2 is free — estimated 2 h on rack. I&apos;ll hold
              the slot for 30 min while you confirm.
            </p>
          </AssistantMessageBubble>
        </ChatThread>

        <div className={styles.composerStack}>
          <SuggestionChips
            chips={SUGGESTIONS}
            onSelect={(chip) => setComposer(chip.prompt)}
          />
          <PromptInput
            value={composer}
            onValueChange={setComposer}
            onSubmit={() => setComposer("")}
            placeholder="Ask about fitments, suppliers, noise limits…"
          />
        </div>
      </div>
    </div>
  )
}

export default FullConversationScene
