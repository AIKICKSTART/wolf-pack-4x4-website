import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AwarenessStrip,
  CommentOverlayPin,
  CommentThreadPopover,
  CommitPulseStrip,
  CursorTrailRail,
  FollowModePill,
  LiveEditIndicator,
  LockZoneOverlay,
  PresenceAvatarStack,
  PresenceCursor,
  ScreenShareCard,
  SelectionHighlightBar,
  VersionConflictModal,
  VoiceRoomTile,
} from "../../components/collab-deep"

import {
  ALL_USERS,
  AWARENESS_ENTRIES,
  COMMIT_EVENTS,
  CONFLICT_DOC,
  CONFLICT_FIELD,
  CONFLICT_VERSIONS,
  CURSOR_TRAILS,
  DEEP_CURSORS,
  LIVE_EDIT_PRICE,
  LIVE_EDIT_TITLE,
  LOCK_EXPORT,
  LOCK_HERO,
  LOCK_PRICE,
  SELECTION_PARA,
  SELECTION_TITLE,
  USER_DANIEL,
  USER_MIA,
  USER_TIM,
  VIEWER_SAMPLE,
  VOICE_PARTICIPANTS,
} from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Full collab cockpit | Collab deep",
  description:
    "Bonus composition — every collab-deep primitive wired together on the Falcon parts page with Daniel, Mia, and Tim co-editing.",
}

export default function FullCollabPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Composition"
        title="Full collab cockpit"
        description="A composed cockpit showing the whole collab-deep family on a single doc. Daniel, Mia, and Tim are editing the Falcon FG cat-back parts page. Mia's cursor is on the title; Tim's is on the price; Daniel just hit save and tripped a 3-way conflict on the description."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Full collab cockpit" },
        ]}
      />

      <div className={styles.fullGrid}>
        <header className={styles.fullTopBar}>
          <PresenceAvatarStack
            users={ALL_USERS}
            size="md"
            caption="On Falcon parts page"
            docTitle="Falcon FG cat-back"
          />
          <FollowModePill user={USER_MIA} detail="tracking cursor" />
        </header>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Stage · canvas + cursors + pins</span>
          <h2>Falcon FG · 3 inch cat-back</h2>
          <div className={styles.canvasStage} aria-label="Falcon FG cat-back canvas">
            <span className={styles.canvasGuide} aria-hidden="true" />
            <article className={styles.canvasDoc} aria-hidden="true">
              <h2 className={styles.canvasTitle}>Falcon FG · 3 inch cat-back</h2>
              <span className={styles.canvasLine} />
              <span className={styles.canvasLine} />
              <span className={styles.canvasLine} />
              <span className={styles.canvasLine} />
              <span className={styles.canvasLine} />
            </article>
            {DEEP_CURSORS.map((cursor) => (
              <PresenceCursor
                key={cursor.id}
                user={cursor.user}
                position={cursor.position}
                activity={cursor.activity}
              />
            ))}
            <CommentOverlayPin
              number={1}
              author={USER_MIA}
              position={{ x: 26, y: 22 }}
              tooltip="Headline length"
              replyCount={2}
              selected
            />
            <CommentOverlayPin
              number={2}
              author={USER_TIM}
              position={{ x: 78, y: 38 }}
              tooltip="Price wrong"
              status="reopened"
              replyCount={1}
            />
            <CommentOverlayPin
              number={3}
              author={USER_DANIEL}
              position={{ x: 56, y: 74 }}
              status="resolved"
            />
          </div>
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Awareness · who&apos;s looking at what</span>
          <AwarenessStrip
            entries={AWARENESS_ENTRIES}
            caption="Live focus · Falcon parts page"
          />
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Live edits + remote selections</span>
          <div className={styles.stageRow}>
            <LiveEditIndicator edit={LIVE_EDIT_TITLE} />
            <LiveEditIndicator edit={LIVE_EDIT_PRICE} />
          </div>
          <div className={styles.stack}>
            <SelectionHighlightBar
              selection={SELECTION_TITLE}
              contextLabel="Title"
            />
            <SelectionHighlightBar
              selection={SELECTION_PARA}
              contextLabel="Description · paragraph 1"
            />
          </div>
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Locks · simultaneous edits</span>
          <div className={styles.stack}>
            <LockZoneOverlay lock={LOCK_PRICE} hint="Auto-unlock in 12s">
              <p style={{ margin: 0 }}>
                A$ 1,499 · RRP · GST inclusive · Free shipping Wollongong → Bowral
              </p>
            </LockZoneOverlay>
            <LockZoneOverlay lock={LOCK_HERO} />
            <LockZoneOverlay lock={LOCK_EXPORT} hint="14% of 64 pages" />
          </div>
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Conflict · 3-way merge on description</span>
          <VersionConflictModal
            fieldLabel={CONFLICT_FIELD}
            docTitle={CONFLICT_DOC}
            versions={CONFLICT_VERSIONS}
            selectedResolution="merge"
          />
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Commit pulse + cursor trails</span>
          <CommitPulseStrip
            events={COMMIT_EVENTS}
            caption="Falcon parts page · last 5m"
            totalLabel="5 saves · last 5m"
          />
          <CursorTrailRail
            trails={CURSOR_TRAILS}
            caption="Last 30s · Falcon parts page"
          />
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Voice + screen share</span>
          <div className={styles.stageColumns}>
            <ScreenShareCard
              presenter={USER_DANIEL}
              sharing="Falcon parts CMS — description"
              source="Window · Chrome"
              viewers={5}
              viewerSample={VIEWER_SAMPLE}
              state="live"
              durationLabel="08:12"
            />
            <VoiceRoomTile
              roomName="Bay floor"
              subtitle="Workshop · 5 in room"
              participants={VOICE_PARTICIPANTS}
              listenerCount={5}
              joined
            />
          </div>
        </section>

        <section className={styles.fullSection}>
          <span className={styles.fullKicker}>Thread popovers · anchored</span>
          <div className={styles.stageRow}>
            <CommentThreadPopover
              pinNumber={1}
              title="Headline length"
              rootAuthor={USER_MIA}
              rootBody="Can we shorten the headline so it fits in two lines on mobile? Maybe drop the year range."
              rootTimestamp="3m ago"
              replies={[
                {
                  id: "f-r1",
                  author: USER_DANIEL,
                  body: "Year range stays — SEO. Let's tighten the verb instead.",
                  timestamp: "2m ago",
                },
              ]}
              status="open"
            />
            <CommentThreadPopover
              pinNumber={2}
              title="Price"
              rootAuthor={USER_TIM}
              rootBody="Price is wrong — should be A$ 1,485, not 1,499."
              rootTimestamp="58s ago"
              status="reopened"
            />
            <CommentThreadPopover
              pinNumber={3}
              title="Spec table"
              rootAuthor={USER_DANIEL}
              rootBody="Spec table reviewed against the printed catalogue. All good."
              rootTimestamp="6m ago"
              status="resolved"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
