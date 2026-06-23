"use client"

import {
  ChatPanel,
  ClipCreatorCard,
  DonationTierCard,
  HostBackstagePanel,
  LivePlayer,
  PollCard,
  QnaQueueRow,
  RaidBanner,
  ReactionsStrip,
  ReplayCard,
  RsvpCard,
  ScheduleCard,
  StreamQualityPanel,
  ViewerListRow,
} from "../../components/live-broadcast"

import {
  CHAT_MESSAGES,
  CLIP_MOMENT,
  HOSTS,
  POLL_OPEN,
  QNA_QUESTIONS,
  RAID_EVENT,
  REACTION_PULSES,
  REPLAY_BROADCASTS,
  SCHEDULED_DYNO_TUESDAY,
  SCHEDULED_MANTA_LAUNCH,
  STREAM_HEALTH_STABLE,
  TIERS,
  VIEWERS,
} from "../_mock-data"
import styles from "../live-broadcast.module.css"

const TOP_QUESTIONS = QNA_QUESTIONS.slice(0, 3)

export function FullStudioDemo() {
  return (
    <>
      <RaidBanner raid={RAID_EVENT} />

      <section className={styles.studio} aria-label="Live broadcast studio">
        <div className={styles.studioMain}>
          <LivePlayer
            title="Dyno Tuesday - Falcon GT-HO 351 Cleveland"
            state="live"
            viewerCount={284}
            bitrateKbps={STREAM_HEALTH_STABLE.bitrateKbps}
            resolutionLabel={STREAM_HEALTH_STABLE.resolutionLabel}
            bitrateHistory={STREAM_HEALTH_STABLE.bitrateHistory}
            health="good"
            host={HOSTS.daniel}
            description={`Bay 1 - twin 3.5" stainless - Tim on the dyno, Daniel on the mic.`}
            overlay={<ReactionsStrip pulses={REACTION_PULSES} ariaLabel="Live reactions" />}
          />

          <div className={styles.demoDouble}>
            <PollCard poll={POLL_OPEN} />
            <StreamQualityPanel snapshot={STREAM_HEALTH_STABLE} />
          </div>

          <section className={styles.demoSurface} aria-labelledby="qna-title">
            <h2 id="qna-title" className={styles.demoLabel}>
              Top Q&A queue
            </h2>
            <ul className={styles.list}>
              {TOP_QUESTIONS.map((question) => (
                <QnaQueueRow key={question.id} question={question} showHostActions />
              ))}
            </ul>
          </section>

          <ClipCreatorCard moment={CLIP_MOMENT} />

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Next up + recent replays</span>
            <div className={styles.demoDouble}>
              <ScheduleCard
                broadcast={SCHEDULED_DYNO_TUESDAY}
                countdownLabel="Live now"
                isNextUp
              />
              <RsvpCard
                broadcast={SCHEDULED_MANTA_LAUNCH}
                reminderInitial
                countdownLabel="2h 14m"
              />
            </div>
            <div className={styles.demoDouble}>
              <ReplayCard replay={REPLAY_BROADCASTS[0]} />
              <ReplayCard replay={REPLAY_BROADCASTS[1]} />
            </div>
          </section>
        </div>

        <aside className={styles.studioSide} aria-label="Live broadcast side rail">
          <ChatPanel messages={CHAT_MESSAGES} slowModeSeconds={5} />

          <HostBackstagePanel
            phase="live"
            counters={{ pendingRaiseHands: 4, reportsToReview: 1, newSupporters: 8 }}
            slowModeInitial
          />

          <section className={styles.demoSurface} aria-labelledby="viewers-title">
            <h2 id="viewers-title" className={styles.demoLabel}>
              Top viewers - watching now
            </h2>
            <ul className={styles.list}>
              {VIEWERS.slice(0, 5).map((viewer) => (
                <ViewerListRow key={viewer.id} viewer={viewer} showHostActions />
              ))}
            </ul>
          </section>

          <section className={styles.demoSurface} aria-labelledby="tiers-title">
            <h2 id="tiers-title" className={styles.demoLabel}>
              Supporter tiers
            </h2>
            <div className={styles.demoStack}>
              {TIERS.slice(0, 2).map((descriptor) => (
                <DonationTierCard key={descriptor.tier} descriptor={descriptor} />
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  )
}
