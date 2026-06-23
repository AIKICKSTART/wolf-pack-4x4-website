import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  CoEditConflictBanner,
  CollabShareLinkGenerator,
  FieldLockBanner,
  LiveDocVersionIndicator,
  LiveReactionPop,
  LiveTypingIndicator,
  MultiCursorOverlay,
  PresenceActivityFeed,
  PresenceAvatarStack,
  ReadReceiptTrail,
  RoomParticipantsPanel,
  TimeZoneIndicatorChip,
} from "../../components/realtime-collab"
import type { CollabCursor } from "../../components/realtime-collab"
import {
  ACTIVITY_EVENTS,
  BEC,
  COLLABORATORS,
  DANIEL,
  JORDAN,
  MARCUS,
  READ_RECEIPTS,
  SOPHIE,
} from "../mock-data"
import styles from "../realtime-collab.module.css"

export const metadata: Metadata = {
  title: "Full room | UI Primitives - Realtime collab",
}

const CURSORS: ReadonlyArray<CollabCursor> = [
  { id: "fr-c-marcus", user: MARCUS, position: { x: 22, y: 32 }, hint: "labour" },
  { id: "fr-c-sophie", user: SOPHIE, position: { x: 58, y: 24 }, hint: "totals" },
  { id: "fr-c-jordan", user: JORDAN, position: { x: 72, y: 58 }, hint: "parts" },
  { id: "fr-c-bec", user: BEC, position: { x: 32, y: 76 }, hint: "notes" },
  { id: "fr-c-daniel", user: DANIEL, position: { x: 50, y: 80 }, hint: "share" },
]

const PARTICIPANTS = [
  { ...MARCUS, focus: "Labour totals" },
  { ...SOPHIE, focus: "Parts line 5" },
  { ...JORDAN, focus: "Watching · idle" },
  { ...BEC, focus: "Customer notes" },
  { ...DANIEL, focus: "Share + perms" },
]

export default function FullRoomPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Realtime collab · Full room"
        title="Quote #Q-1408 · live collaborative room"
        description="Every realtime-collab primitive assembled into one live quote-editing room — Marcus, Sophie, Jordan, Bec and Daniel co-editing Quote #Q-1408 for a 2019 Hilux 2.8L exhaust replacement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Realtime collab", href: "/ui-primitives/realtime-collab" },
          { label: "Full room" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Top bar · doc state + presence</span>
          <div className={styles.roomTopRow}>
            <LiveDocVersionIndicator
              version="v19"
              savedLabel="Saving labour line 3..."
              collaboratorsOnline={4}
              state="saving"
            />
            <PresenceAvatarStack users={COLLABORATORS} max={4} />
          </div>
        </div>

        <div className={styles.fullRoomGrid}>
          <div className={styles.fullRoomMain}>
            <div className={styles.demoStage}>
              <span className={styles.demoLabel}>Live cursors over the quote canvas</span>
              <MultiCursorOverlay
                cursors={CURSORS}
                caption="QUOTE #Q-1408 / 2019 HILUX 2.8L EXHAUST"
              >
                <div className={styles.docMock}>
                  <h4>Quote #Q-1408 - 2019 Hilux 2.8L exhaust replacement</h4>
                  <p>Customer: Mira K. - 0418 442 991</p>
                  <p>Labour line 1 - Diagnostic ........... $ 88.00</p>
                  <p>Labour line 2 - Remove old system .... $148.00</p>
                  <p>Labour line 3 - Install new system ... $222.00</p>
                  <p>Parts line 4 - Catalytic converter ... $612.40</p>
                  <p>Parts line 5 - Magnaflow muffler ..... $284.90</p>
                  <p>Parts line 6 - 409SS pipe set ........ $114.00</p>
                  <p>Totals: $1,469.30 inc GST</p>
                </div>
                <span style={{ position: "absolute", left: "62%", top: "26%" }}>
                  <LiveReactionPop
                    user={SOPHIE}
                    reaction="lightbulb"
                    position={{ x: 0, y: 0 }}
                  />
                </span>
              </MultiCursorOverlay>
            </div>

            <div className={styles.demoStage}>
              <span className={styles.demoLabel}>Live indicators on the doc</span>
              <div className={styles.demoStack}>
                <LiveTypingIndicator
                  users={[SOPHIE]}
                  field="Labour line 3"
                  docTitle="Quote #Q-1408"
                />
                <FieldLockBanner
                  holder={MARCUS}
                  fieldLabel="Quote total"
                  heldFor="Held 28s"
                />
                <CoEditConflictBanner
                  fieldLabel="Parts line 5 · Magnaflow muffler"
                  myValue="Magnaflow 14816 - $284.90"
                  otherUser={SOPHIE}
                  otherValue="Magnaflow 14816 - $279.50 (workshop rate)"
                  conflictAt="Conflicted 4s ago"
                />
              </div>
            </div>

            <div className={styles.demoStage}>
              <span className={styles.demoLabel}>Doc footer · receipts + zones</span>
              <div className={styles.demoStack}>
                <ReadReceiptTrail
                  receipts={READ_RECEIPTS}
                  title="Seen by"
                />
                <div className={styles.demoInline}>
                  <TimeZoneIndicatorChip
                    user={MARCUS}
                    localTime="14:32"
                    timezoneLabel="AEST"
                    offsetFromMe="Same TZ"
                  />
                  <TimeZoneIndicatorChip
                    user={JORDAN}
                    localTime="12:32"
                    timezoneLabel="AWST"
                    offsetFromMe="-2h"
                  />
                  <TimeZoneIndicatorChip
                    user={DANIEL}
                    localTime="14:32"
                    timezoneLabel="AEST"
                    offsetFromMe="Same TZ"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.fullRoomCol}>
            <RoomParticipantsPanel
              title="Quote #Q-1408"
              participants={PARTICIPANTS}
            />
            <PresenceActivityFeed
              events={ACTIVITY_EVENTS}
              title="Live activity"
            />
            <CollabShareLinkGenerator
              url="https://oakflats.mufflermen.com.au/quote/Q-1408?share=v_ab8d"
              scope="comment"
              expiryLabel="Expires Fri 06 Jun · 5:00 PM"
            />
          </div>
        </div>

        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            Every primitive in the realtime-collab group is rendered here against
            the same shared mock data. The top row pairs
            <code> LiveDocVersionIndicator</code> with
            <code> PresenceAvatarStack</code>. The cursor stage hosts
            <code> MultiCursorOverlay</code> with a <code>LiveReactionPop</code>
            anchored to Sophie&apos;s cursor. Below the stage,
            <code> LiveTypingIndicator</code>, <code> FieldLockBanner</code>, and
            <code> CoEditConflictBanner</code> stack vertically as they would in a
            real document. The right column is a sidebar of
            <code> RoomParticipantsPanel</code>, <code> PresenceActivityFeed</code>,
            and <code> CollabShareLinkGenerator</code>. ReadReceiptTrail and
            TimeZoneIndicatorChip live in the doc footer.
          </p>
        </div>
      </section>
    </main>
  )
}
