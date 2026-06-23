"use client"

import { useMemo, useState, type ReactNode } from "react"

import {
  StateEmptyInbox,
  StateEmptyResults,
  StateMaintenance,
  StateOffline,
  StateServerError,
  StateSuccessConfirmed,
} from "../../components/states"
import {
  EMPTY_INBOX_COPY,
  EMPTY_RESULTS_COPY,
  LOADING_COPY,
  MAINTENANCE_COPY,
  OFFLINE_COPY,
  SERVER_ERROR_COPY,
  STATE_GALLERY,
  STATE_LANES,
  STATES_INTRO,
  SUCCESS_COPY,
  TORQUE_NAME,
  type StateGalleryItem,
  type StateKey,
  type StateLane,
} from "./_demo-data"
import { StatesLoadingScreen } from "./states-loading-screen"
import styles from "./states-overview.module.css"

/** Placeholder circular Torque avatar — real mascot lands later. */
function TorqueAvatar() {
  return (
    <span className={styles.avatar} aria-hidden="true">
      <span className={styles.avatarInitial}>T</span>
    </span>
  )
}

interface ActionButtonProps {
  children: ReactNode
  tone?: "primary" | "ghost"
  onClick?: () => void
}

/** Lightweight demo action so each state screen reads like the real app. */
function ActionButton({ children, tone = "primary", onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.action} ${tone === "primary" ? styles.actionPrimary : styles.actionGhost}`}
    >
      {children}
    </button>
  )
}

/** Renders the full-surface state screen for a given gallery key. */
function StateScreen({
  stateKey,
  celebrate,
  onReplay,
}: {
  stateKey: StateKey
  /** Only meaningful for the success screen — fires the confetti burst. */
  celebrate: boolean
  onReplay: () => void
}) {
  switch (stateKey) {
    case "empty-inbox":
      return (
        <StateEmptyInbox
          headline={EMPTY_INBOX_COPY.headline}
          message={EMPTY_INBOX_COPY.message}
          stats={EMPTY_INBOX_COPY.stats}
          primaryAction={<ActionButton>Open the booking diary</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">View archived quotes</ActionButton>}
        />
      )
    case "empty-results":
      return (
        <StateEmptyResults
          headline={EMPTY_RESULTS_COPY.headline}
          message={EMPTY_RESULTS_COPY.message}
          query={EMPTY_RESULTS_COPY.query}
          suggestions={EMPTY_RESULTS_COPY.suggestions}
          primaryAction={<ActionButton>Order it in from a supplier</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">Clear the search</ActionButton>}
        />
      )
    case "loading":
      return (
        <StatesLoadingScreen
          headline={LOADING_COPY.headline}
          message={LOADING_COPY.message}
          steps={LOADING_COPY.steps}
        />
      )
    case "server-error":
      return (
        <StateServerError
          headline={SERVER_ERROR_COPY.headline}
          message={SERVER_ERROR_COPY.message}
          errorCode={SERVER_ERROR_COPY.errorCode}
          incidentId={SERVER_ERROR_COPY.incidentId}
          occurredAt={SERVER_ERROR_COPY.occurredAt}
          primaryAction={<ActionButton>Retry the request</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">Open the status page</ActionButton>}
        />
      )
    case "offline":
      return (
        <StateOffline
          headline={OFFLINE_COPY.headline}
          message={OFFLINE_COPY.message}
          retryCount={OFFLINE_COPY.retryCount}
          lastOnlineAt={OFFLINE_COPY.lastOnlineAt}
          cachedDataNote={OFFLINE_COPY.cachedDataNote}
          primaryAction={<ActionButton>Retry now</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">Work from cache</ActionButton>}
        />
      )
    case "maintenance":
      return (
        <StateMaintenance
          headline={MAINTENANCE_COPY.headline}
          message={MAINTENANCE_COPY.message}
          startsAt={MAINTENANCE_COPY.startsAt}
          endsAt={MAINTENANCE_COPY.endsAt}
          affectedSurface={MAINTENANCE_COPY.affectedSurface}
          primaryAction={<ActionButton>Notify me when it&apos;s back</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">Call the workshop</ActionButton>}
        />
      )
    case "success-confirmed":
      return (
        <StateSuccessConfirmed
          headline={SUCCESS_COPY.headline}
          message={SUCCESS_COPY.message}
          summary={SUCCESS_COPY.summary}
          celebrate={celebrate}
          primaryAction={<ActionButton onClick={onReplay}>Replay celebration</ActionButton>}
          secondaryAction={<ActionButton tone="ghost">View the booking</ActionButton>}
        />
      )
    default:
      return null
  }
}

function GalleryFrame({
  item,
  screenKey,
  celebrate,
  onReplay,
}: {
  item: StateGalleryItem
  /** Forces a remount of the inner screen (used to re-fire success confetti). */
  screenKey: string
  celebrate: boolean
  onReplay: () => void
}) {
  const headingId = `state-frame-${item.key}`
  const isSuccess = item.key === "success-confirmed"

  return (
    <figure className={styles.frame} aria-labelledby={headingId}>
      <figcaption className={styles.frameHead}>
        <span className={styles.frameIndex} aria-hidden="true">
          {item.index}
        </span>
        <span className={styles.frameCaption}>{item.caption}</span>
        {isSuccess ? (
          <button type="button" className={styles.frameReplay} onClick={onReplay}>
            Replay
          </button>
        ) : null}
      </figcaption>

      <div className={styles.viewport}>
        <div className={styles.viewportBar} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.viewportBody}>
          <h3 id={headingId} className={styles.srOnly}>
            {item.caption}
          </h3>
          <StateScreen
            key={screenKey}
            stateKey={item.key}
            celebrate={celebrate}
            onReplay={onReplay}
          />
        </div>
      </div>

      <p className={styles.frameNote}>{item.note}</p>
    </figure>
  )
}

export function StatesOverviewScene() {
  const [lane, setLane] = useState<StateLane>("all")
  // Bump a nonce to retrigger the success confetti when the owner taps replay.
  const [celebrateNonce, setCelebrateNonce] = useState<number>(0)

  const visible = useMemo<ReadonlyArray<StateGalleryItem>>(() => {
    if (lane === "all") {
      return STATE_GALLERY
    }
    return STATE_GALLERY.filter((item) => item.lane === lane)
  }, [lane])

  const replay = () => setCelebrateNonce((value) => value + 1)

  return (
    <div className={styles.scene}>
      <header className={styles.head}>
        <TorqueAvatar />
        <div className={styles.headMeta}>
          <span className={styles.kicker}>
            <span className={styles.statusDot} aria-hidden="true" />
            {TORQUE_NAME} · {STATE_GALLERY.length} app states
          </span>
          <h2 className={styles.title}>{TORQUE_NAME} — your Mufflermen business assistant</h2>
          <p className={styles.subtitle}>{STATES_INTRO}</p>
        </div>
      </header>

      <div
        className={styles.controls}
        role="group"
        aria-label="Filter app states by kind"
      >
        <span className={styles.controlsLabel}>Filter</span>
        <div className={styles.lanes}>
          {STATE_LANES.map((option) => {
            const selected = lane === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                className={styles.lane}
                data-selected={selected ? "true" : "false"}
                onClick={() => setLane(option.id)}
              >
                <span className={styles.laneLabel}>{option.label}</span>
                <span className={styles.laneHint}>{option.hint}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.gallery}>
        {visible.map((item) => {
          const isSuccess = item.key === "success-confirmed"
          // Remount the success screen on every replay so the confetti re-fires.
          const screenKey = isSuccess ? `${item.key}-${celebrateNonce}` : item.key
          return (
            <GalleryFrame
              key={item.key}
              item={item}
              screenKey={screenKey}
              celebrate={isSuccess}
              onReplay={replay}
            />
          )
        })}
      </div>

      <div className={styles.note}>
        <span className={styles.noteLabel}>Composition notes</span>
        <p>
          Each frame is an existing <code>states</code> primitive — empty inbox, empty results,
          server error, offline, and maintenance — plus the success screen with its confetti
          burst, all dressed in real Oak Flats Muffler Men copy. The loading screen is a small
          branded skeleton built in this folder. One client island owns the lane filter and the
          replay nonce; the primitives are imported, never edited. Light and dark inherit from
          the showcase theme tokens.
        </p>
      </div>
    </div>
  )
}

export default StatesOverviewScene
