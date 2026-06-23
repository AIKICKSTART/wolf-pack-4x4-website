"use client"

import { useState, type CSSProperties } from "react"

import {
  AssistantMessageBubble,
  ChatThread,
  PromptInput,
  SuggestionChips,
  UserMessageBubble,
} from "../../components/ai"
import {
  AwarenessStrip,
  CommentThreadPopover,
  PresenceAvatarStack,
} from "../../components/collab-deep"
import { COLLAB_DEEP_TONE_HEX } from "../../components/collab-deep"
import { defaultCursorTone } from "../../components/realtime-collab/realtime-collab-types"
import type { CollabUser, CursorTone } from "../../components/collab-deep"
import { ActivityFeed, StatusBadge } from "../../components/data-display"
import {
  AGENTS,
  AWARENESS,
  MENTION_SUGGESTIONS,
  OWNER,
  OWNER_BRIEF,
  PARTICIPANT_BY_ID,
  PRESENCE_BADGE,
  ROOM_ACTIVITY,
  ROOM_TITLE,
  ROOM_USERS,
  SOCIAL_THREAD,
  TORQUE_NAME,
  type GroupTurn,
  type MessageToken,
  type RoomThread,
} from "./_demo-data"
import styles from "./group-chat.module.css"

function tintOf(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Renders a single @mention routing chip, tinted to the routed agent. */
function MentionChip({ handle, agentId }: { handle: string; agentId: string }) {
  const agent = PARTICIPANT_BY_ID[agentId]
  const tint = agent ? tintOf(agent) : "var(--primitive-teal)"
  return (
    <span
      className={styles.mention}
      style={{ "--mention-tint": tint } as CSSProperties}
      data-agent={agent?.name ?? handle}
    >
      {handle}
    </span>
  )
}

/** Renders a mixed text + @mention token stream. */
function TokenStream({ tokens }: { tokens: ReadonlyArray<MessageToken> }) {
  return (
    <>
      {tokens.map((token, index) =>
        token.kind === "mention" ? (
          <MentionChip
            key={`m-${index}`}
            handle={token.handle}
            agentId={token.agentId}
          />
        ) : (
          <span key={`t-${index}`}>{token.value}</span>
        ),
      )}
    </>
  )
}

/** Owner brief, rendered as a routed user turn. */
function OwnerBrief({ turn }: { turn: GroupTurn }) {
  return (
    <UserMessageBubble timestamp={turn.timestamp} authorName={OWNER.name}>
      <p className={styles.line}>
        <TokenStream tokens={turn.tokens} />
      </p>
    </UserMessageBubble>
  )
}

export function GroupChatScene() {
  const [composer, setComposer] = useState<string>("")

  return (
    <div className={styles.scene}>
      <header className={styles.head}>
        {/* Placeholder circular Torque avatar — real mascot lands later. */}
        <span className={styles.torqueAvatar} aria-hidden="true">
          <span className={styles.torqueInitial}>T</span>
        </span>
        <div className={styles.headMeta}>
          <span className={styles.kicker}>
            <span className={styles.statusDot} aria-hidden="true" />
            {TORQUE_NAME} room · live
          </span>
          <h2 className={styles.title}>{ROOM_TITLE}</h2>
          <p className={styles.subtitle}>
            {TORQUE_NAME} — your Mufflermen business assistant. The owner and four
            sub-agents collaborate in one room; @mention an agent to route the work.
          </p>
        </div>
        <div className={styles.headPresence}>
          <PresenceAvatarStack
            users={ROOM_USERS}
            size="sm"
            max={5}
            docTitle={ROOM_TITLE}
            caption={`${ROOM_USERS.length} in the room`}
          />
        </div>
      </header>

      <div className={styles.body}>
        <aside className={styles.rail} aria-label="Room participants">
          <h3 className={styles.railTitle}>Participants</h3>
          <ul className={styles.railList}>
            <li className={styles.railItem}>
              <span
                className={styles.railAvatar}
                style={{ "--tint": tintOf(OWNER) } as CSSProperties}
              >
                <span className={styles.railInitial} aria-hidden="true">
                  D
                </span>
              </span>
              <div className={styles.railCopy}>
                <span className={styles.railName}>{OWNER.name}</span>
                <span className={styles.railJob}>{OWNER.role}</span>
              </div>
              <StatusBadge tone="brand" size="sm" shape="dot" label="Owner" />
            </li>
            {AGENTS.map((agent) => {
              const badge = PRESENCE_BADGE[agent.presence]
              return (
                <li key={agent.user.id} className={styles.railItem}>
                  <span
                    className={styles.railAvatar}
                    style={{ "--tint": tintOf(agent.user) } as CSSProperties}
                  >
                    <span className={styles.railInitial} aria-hidden="true">
                      {agent.handle.replace("@", "").charAt(0).toUpperCase()}
                    </span>
                  </span>
                  <div className={styles.railCopy}>
                    <span className={styles.railName}>
                      {agent.user.name}{" "}
                      <span className={styles.railHandle}>{agent.handle}</span>
                    </span>
                    <span className={styles.railJob}>{agent.job}</span>
                  </div>
                  <StatusBadge tone={badge.tone} size="sm" shape="dot" label={badge.label} />
                </li>
              )
            })}
          </ul>

          <div className={styles.railFeed}>
            <h3 className={styles.railTitle}>Room activity</h3>
            <ActivityFeed items={ROOM_ACTIVITY} ariaLabel="Room activity feed" />
          </div>
        </aside>

        <div className={styles.main}>
          <AwarenessStrip entries={AWARENESS} caption="Working now" />

          <ChatThread ariaLabel="Torque group chat transcript" className={styles.thread}>
            <OwnerBrief turn={OWNER_BRIEF} />

            <AssistantMessageBubble
              timestamp="7:55 AM"
              authorName="Torque Blog"
              modelName="@blog"
              showFeedbackRow={false}
            >
              <div className={styles.turnCopy}>
                <p className={styles.line}>
                  Picked up the brief from <MentionChip handle="@blog" agentId="agent-blog" />.
                  Here&apos;s a short, plain-spoken draft in your voice:
                </p>
                <article className={styles.draftCard} data-agent="blog">
                  <span className={styles.draftLabel}>
                    Blog draft{" "}
                    <span className={styles.draftChannel}>· mufflermen.com.au</span>
                  </span>
                  <h4 className={styles.draftTitle}>
                    Hearing your exhaust this winter? Here&apos;s why — and what to do
                  </h4>
                  <p className={styles.draftBody}>
                    When the cold rolls into the Illawarra, the first thing a lot of
                    drivers notice is a louder car. Cold metal contracts, old joints
                    crack, and a small leak that hid all summer suddenly drones the
                    whole way down Princes Highway. Bring it into Oak Flats Muffler Men
                    and we&apos;ll put it on the hoist, show you the old part, and tell
                    you straight whether it needs a clamp, a section, or a full system.
                  </p>
                  <div className={styles.draftMeta}>
                    <span>
                      Words <b>320</b>
                    </span>
                    <span>
                      Reading time <b>2 min</b>
                    </span>
                    <span>
                      CTA <b>Book a free undercar check</b>
                    </span>
                  </div>
                </article>
                <p className={styles.line}>
                  Handing the copy to <MentionChip handle="@social" agentId="agent-social" /> for
                  the posts, and asking <MentionChip handle="@workshop" agentId="agent-workshop" />{" "}
                  to make sure there are slots to book into.
                </p>
              </div>
            </AssistantMessageBubble>

            <AssistantMessageBubble
              timestamp="7:57 AM"
              authorName="Torque Workshop"
              modelName="@workshop"
              showFeedbackRow={false}
            >
              <div className={styles.turnCopy}>
                <p className={styles.line}>
                  Done — I&apos;ve held <b className={styles.figure}>6</b> free pre-winter
                  check slots for Thursday so the posts point at something real. Diary&apos;s
                  green; quotes will auto-draft if anyone books a section repair.
                </p>
              </div>
            </AssistantMessageBubble>

            <AssistantMessageBubble
              timestamp="7:57 AM"
              authorName="Torque Social"
              modelName="@social"
              showFeedbackRow={false}
            >
              <div className={styles.turnCopy}>
                <p className={styles.line}>
                  Got the draft from <MentionChip handle="@blog" agentId="agent-blog" />. Two
                  posts ready, both pointing at the free check:
                </p>
                <article className={styles.draftCard} data-agent="social">
                  <span className={styles.draftLabel}>
                    Facebook <span className={styles.draftChannel}>· @oakflatsmufflermen</span>
                  </span>
                  <p className={styles.draftBody}>
                    Car getting louder now the mornings are cold? That&apos;s usually a tired
                    exhaust joint, not your imagination. Pop in to Oak Flats and we&apos;ll
                    throw it on the hoist and show you what&apos;s going on — free undercar
                    check, Thursday slots open now. 🔧
                  </p>
                  <div className={styles.tags}>
                    <span className={styles.tag}>#OakFlats</span>
                    <span className={styles.tag}>#Illawarra</span>
                    <span className={styles.tag}>#ExhaustRepairs</span>
                  </div>
                </article>
              </div>
            </AssistantMessageBubble>
          </ChatThread>

          <ThreadPanel thread={SOCIAL_THREAD} />

          <div className={styles.composerStack}>
            <SuggestionChips
              chips={MENTION_SUGGESTIONS}
              onSelect={(chip) => setComposer(chip.prompt)}
              ariaLabel="Quick @mention routing prompts"
            />
            <PromptInput
              value={composer}
              onValueChange={setComposer}
              onSubmit={() => setComposer("")}
              placeholder="Message the room — type @blog, @social, @seo or @workshop to route…"
            />
          </div>
        </div>
      </div>

      <div className={styles.note}>
        <span className={styles.noteLabel}>Composition notes</span>
        <p>
          One client island owns the shared composer state. The room is built from
          existing primitives — <code>ChatThread</code>, <code>AssistantMessageBubble</code>,{" "}
          <code>UserMessageBubble</code>, <code>PromptInput</code> and{" "}
          <code>SuggestionChips</code> from <code>ai</code>;{" "}
          <code>PresenceAvatarStack</code>, <code>AwarenessStrip</code> and{" "}
          <code>CommentThreadPopover</code> from <code>collab-deep</code>;{" "}
          <code>ActivityFeed</code> and <code>StatusBadge</code> from{" "}
          <code>data-display</code> — with real Oak Flats Muffler Men copy. @mention chips
          are a thin local view that tints to each agent.
        </p>
      </div>
    </div>
  )
}

/** Threaded reply panel — wraps the collab-deep CommentThreadPopover inline. */
function ThreadPanel({ thread }: { thread: RoomThread }) {
  const rootAuthor = PARTICIPANT_BY_ID[thread.rootAuthorId]
  const replies = thread.replies.map((reply) => ({
    id: reply.id,
    author: PARTICIPANT_BY_ID[reply.authorId],
    body: reply.body,
    timestamp: reply.timestamp,
  }))

  return (
    <section className={styles.threadPanel} aria-label="Threaded reply">
      <span className={styles.threadKicker}>Thread · {thread.title}</span>
      <div className={styles.threadInner}>
        <CommentThreadPopover
          pinNumber={thread.pinNumber}
          title={thread.title}
          rootAuthor={rootAuthor}
          rootBody={thread.rootBody}
          rootTimestamp={thread.rootTimestamp}
          replies={replies}
          status={thread.status}
          className={styles.threadPopover}
        />
      </div>
    </section>
  )
}

export default GroupChatScene
