"use client"

import { useState } from "react"

import {
  AssistantMessageBubble,
  ChatThread,
  CitationPill,
  ModelSelector,
  PromptInput,
  StopRegenActions,
  StreamingIndicator,
  SuggestionChips,
  TokenUsageChip,
  ToolCallCard,
  UserMessageBubble,
} from "../../components/ai"
import {
  BRAND_VOICE_TOOL_INPUT,
  BRAND_VOICE_TOOL_OUTPUT,
  PUBLISH_TOOL_INPUT,
  TORQUE_CONVERSATION_TITLE,
  TORQUE_MODELS,
  TORQUE_NAME,
  TORQUE_SUGGESTIONS,
} from "./_demo-data"
import styles from "./torque-chat.module.css"

/**
 * Customer-facing Torque conversation. The owner (Daniel at Oak Flats Muffler
 * Men) asks for a winter blog + social posts; Torque proposes a coordinated set.
 */
export function TorqueChatScene() {
  const [selectedModel, setSelectedModel] = useState<string>("sonnet")
  const [composer, setComposer] = useState<string>("")

  return (
    <div className={styles.scene}>
      <header className={styles.head}>
        <span className={styles.avatar} aria-hidden="true">
          <span className={styles.avatarInitial}>T</span>
        </span>
        <div className={styles.headMeta}>
          <span className={styles.kicker}>
            <span className={styles.statusDot} aria-hidden="true" />
            {TORQUE_NAME} · online
          </span>
          <h2 className={styles.title}>{TORQUE_NAME} — your Mufflermen business assistant</h2>
          <p className={styles.subtitle}>{TORQUE_CONVERSATION_TITLE}</p>
        </div>
        <div className={styles.headTools}>
          <TokenUsageChip used={18_240} budget={200_000} label="This chat" />
          <ModelSelector
            models={TORQUE_MODELS}
            selectedId={selectedModel}
            onSelect={setSelectedModel}
          />
        </div>
      </header>

      <ChatThread
        ariaLabel="Torque assistant conversation"
        className={styles.thread}
      >
        <UserMessageBubble timestamp="7:58 AM" authorName="Daniel">
          <div className={styles.bubbleCopy}>
            <p>
              Morning Torque — winter&apos;s coming and people start hearing
              their exhausts blow. Can you write me a short blog post and a
              couple of social posts about getting an undercar check before the
              cold sets in?
            </p>
          </div>
        </UserMessageBubble>

        <AssistantMessageBubble
          timestamp="7:58 AM"
          authorName={TORQUE_NAME}
          modelName="Torque Standard"
        >
          <div className={styles.bubbleCopy}>
            <p>
              Good idea — cold mornings are when blown gaskets and rusty
              joints get loud, so the timing&apos;s spot on. Let me pull your
              house voice first so everything sounds like Oak Flats Muffler
              Men, not a generic blog.
            </p>
            <ToolCallCard
              toolName="load_brand_voice"
              status="done"
              durationMs={214}
              inputJson={BRAND_VOICE_TOOL_INPUT}
              outputJson={BRAND_VOICE_TOOL_OUTPUT}
            />
          </div>
        </AssistantMessageBubble>

        <AssistantMessageBubble
          timestamp="7:59 AM"
          authorName={TORQUE_NAME}
          modelName="Torque Standard"
          citations={
            <>
              <CitationPill
                index={1}
                title="NSW roadworthy — exhaust & emissions"
                url="https://www.nsw.gov.au/driving-boating-and-transport/vehicle-registration/safety-check"
                snippet="A blowing or leaking exhaust system can fail a NSW safety inspection and let fumes into the cabin."
              />
              <CitationPill
                index={2}
                title="Oak Flats Muffler Men — servicing"
                url="https://mufflermen.com.au/servicing"
                snippet="Free visual undercar check with every logbook service across the Illawarra."
              />
            </>
          }
        >
          <div className={styles.bubbleCopy}>
            <p>
              Here&apos;s a coordinated set in your voice — one blog post and
              two socials that all point back to booking in at Oak Flats. Have
              a read and tell me what to tweak:
            </p>

            <article className={styles.draftCard}>
              <span className={styles.draftLabel}>
                Blog draft <span className={styles.draftChannel}>· mufflermen.com.au</span>
              </span>
              <h3 className={styles.draftTitle}>
                Hearing your exhaust this winter? Here&apos;s why — and what to do
              </h3>
              <p className={styles.draftBody}>
                When the cold rolls into the Illawarra, the first thing a lot of
                drivers notice is a louder car. Cold metal contracts, old joints
                crack, and a small leak that hid all summer suddenly drones the
                whole way down Princes Highway. The good news: most of it&apos;s
                cheap to catch early. Bring it into Oak Flats Muffler Men and
                we&apos;ll put it on the hoist, show you the old part, and tell
                you straight whether it needs a clamp, a section, or a full
                system. No surprises, no upsell.
              </p>
              <div className={styles.draftMeta}>
                <span>Reading time <b>2 min</b></span>
                <span>Words <b>320</b></span>
                <span>CTA <b>Book a free undercar check</b></span>
              </div>
            </article>

            <article className={styles.draftCard}>
              <span className={styles.draftLabel}>
                Facebook post <span className={styles.draftChannel}>· @oakflatsmufflermen</span>
              </span>
              <p className={styles.draftBody}>
                Car getting louder now the mornings are cold? That&apos;s usually
                a tired exhaust joint, not your imagination. Pop in to Oak Flats
                and we&apos;ll throw it on the hoist and show you what&apos;s
                going on — free undercar check, no booking needed. We&apos;re
                here for the whole Illawarra. 🔧
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>#OakFlats</span>
                <span className={styles.tag}>#Illawarra</span>
                <span className={styles.tag}>#ExhaustRepairs</span>
              </div>
            </article>

            <article className={styles.draftCard}>
              <span className={styles.draftLabel}>
                Instagram caption <span className={styles.draftChannel}>· @oakflatsmufflermen</span>
              </span>
              <p className={styles.draftBody}>
                Cold mornings = loud exhausts. Don&apos;t let a $40 joint turn
                into a whole system. Free undercar check at Oak Flats — we&apos;ll
                show you the old part before we touch anything.
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>#MufflerMen</span>
                <span className={styles.tag}>#WollongongCars</span>
                <span className={styles.tag}>#WinterReady</span>
              </div>
            </article>

            <p>
              Nothing&apos;s scheduled yet — say the word and I&apos;ll set the
              blog to draft and queue both posts for a Thursday 7am slot.
            </p>

            <ToolCallCard
              toolName="prepare_publish"
              status="running"
              inputJson={PUBLISH_TOOL_INPUT}
            />

            <StopRegenActions streaming />
          </div>
        </AssistantMessageBubble>

        <UserMessageBubble timestamp="8:01 AM" authorName="Daniel">
          <div className={styles.bubbleCopy}>
            <p>
              Love it. Can you make the Facebook one a touch shorter and add
              that we do this across Wollongong and Shellharbour too?
            </p>
          </div>
        </UserMessageBubble>

        <AssistantMessageBubble
          timestamp="8:01 AM"
          authorName={TORQUE_NAME}
          modelName="Torque Standard"
          streaming
        >
          <div className={styles.bubbleCopy}>
            <p>On it — trimming the Facebook caption and widening the area now</p>
            <StreamingIndicator label="Torque is rewriting the Facebook post" />
          </div>
        </AssistantMessageBubble>
      </ChatThread>

      <div className={styles.composerStack}>
        <SuggestionChips
          chips={TORQUE_SUGGESTIONS}
          onSelect={(chip) => setComposer(chip.prompt)}
          ariaLabel="Suggested follow-ups for Torque"
        />
        <PromptInput
          value={composer}
          onValueChange={setComposer}
          onSubmit={() => setComposer("")}
          placeholder="Ask Torque to write, tweak, or schedule something…"
        />
      </div>

      <div className={styles.note}>
        <span className={styles.noteLabel}>Composition notes</span>
        <p>
          One client island owns the model picker and composer state. Every
          turn is built from the existing <code>ai</code> primitives — chat
          thread, message bubbles, streaming indicator, prompt input, suggestion
          chips, tool-call cards, citation pills, model and token chips — with
          real Oak Flats Muffler Men marketing copy.
        </p>
      </div>
    </div>
  )
}

export default TorqueChatScene
