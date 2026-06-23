"use client"

import { Maximize2, Mic, MicOff, Pause, Play, Settings2, Users, Volume2 } from "lucide-react"
import { useCallback, useId, useState } from "react"
import type { ReactNode } from "react"

import { Sparkline } from "../charts/sparkline"

import styles from "./live-player.module.css"
import type { BroadcastHost, LiveStreamState, StreamHealth } from "./live-broadcast-types"

interface LivePlayerProps {
  title: string
  /** Stream state — drives badge color + label. */
  state?: LiveStreamState
  /** Active viewer count. */
  viewerCount: number
  /** Bitrate in kbps for the indicator chip. */
  bitrateKbps: number
  /** Display resolution e.g. "1080p60". */
  resolutionLabel: string
  /** Connection health drives indicator dot. */
  health?: StreamHealth
  /** Primary host badge below the title. */
  host: BroadcastHost
  /** Optional poster image src shown in placeholder. */
  posterSrc?: string
  /** Optional sparkline of last 24 bitrate samples. */
  bitrateHistory?: ReadonlyArray<number>
  /** Optional decorative overlay (chat preview, lower-third etc). */
  overlay?: ReactNode
  /** Optional alt label spoken to assistive tech. */
  description?: string
  className?: string
}

const STATE_LABEL: Record<LiveStreamState, string> = {
  live: "Live",
  starting: "Starting",
  ended: "Replay",
  scheduled: "Scheduled",
}

const HEALTH_LABEL: Record<StreamHealth, string> = {
  excellent: "Excellent",
  good: "Stable",
  degraded: "Degraded",
  critical: "At risk",
}

function formatViewerCount(value: number): string {
  if (value >= 10000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  }
  return value.toLocaleString("en-AU")
}

export function LivePlayer({
  title,
  state = "live",
  viewerCount,
  bitrateKbps,
  resolutionLabel,
  health = "good",
  host,
  posterSrc,
  bitrateHistory,
  overlay,
  description,
  className,
}: LivePlayerProps) {
  const headingId = useId()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const classes = [styles.player, styles[`state-${state}`], className].filter(Boolean).join(" ")
  const stateLabel = STATE_LABEL[state]
  const healthLabel = HEALTH_LABEL[health]
  const playLabel = isPlaying ? "Pause" : "Play"

  return (
    <section
      className={classes}
      role="region"
      aria-labelledby={headingId}
      aria-describedby={description ? `${headingId}-desc` : undefined}
    >
      <div
        className={styles.stage}
        style={posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined}
      >
        <div className={styles.stageScrim} aria-hidden="true" />
        {!isPlaying ? (
          <div className={styles.posterCue} aria-hidden="true">
            <span className={styles.posterGlyph}>
              <Play size={36} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className={styles.posterLabel}>Tap to start broadcast audio</span>
          </div>
        ) : null}

        <div className={styles.topRow}>
          <span
            className={[styles.stateBadge, styles[`badge-${state}`]].join(" ")}
            role="status"
            aria-label={`Broadcast status: ${stateLabel}`}
          >
            <span className={styles.statePip} aria-hidden="true" />
            {stateLabel}
          </span>

          <span className={styles.viewers} aria-label={`${viewerCount.toLocaleString("en-AU")} viewers`}>
            <Users size={13} strokeWidth={2.2} aria-hidden="true" />
            <span className={styles.viewerCount}>{formatViewerCount(viewerCount)}</span>
            <span className={styles.viewersLabel}>watching</span>
          </span>

          <span
            className={[styles.healthChip, styles[`health-${health}`]].join(" ")}
            aria-label={`Stream health: ${healthLabel}`}
          >
            <span className={styles.healthPip} aria-hidden="true" />
            {healthLabel}
          </span>
        </div>

        {overlay ? <div className={styles.overlay}>{overlay}</div> : null}

        <div className={styles.bottomRow}>
          <h2 id={headingId} className={styles.title}>{title}</h2>
          <p className={styles.hostLine}>
            <span className={styles.hostName}>{host.name}</span>
            <span aria-hidden="true" className={styles.dot}>·</span>
            <span className={styles.hostRole}>{host.role}</span>
          </p>
          {description ? (
            <p id={`${headingId}-desc`} className={styles.description}>{description}</p>
          ) : null}
        </div>
      </div>

      <div className={styles.controlBar}>
        <div className={styles.controlsLeft}>
          <button
            type="button"
            className={styles.playButton}
            aria-label={playLabel}
            aria-pressed={isPlaying}
            onClick={handleTogglePlay}
          >
            {isPlaying ? (
              <Pause size={18} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Play size={18} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={isMuted ? "Unmute" : "Mute"}
            aria-pressed={!isMuted}
            onClick={handleToggleMute}
          >
            {isMuted ? (
              <MicOff size={15} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Volume2 size={15} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
          <span className={styles.bitrateChip} aria-label={`Bitrate: ${bitrateKbps} kilobits per second at ${resolutionLabel}`}>
            <span className={styles.bitrateValue}>{bitrateKbps.toLocaleString("en-AU")}</span>
            <span className={styles.bitrateUnit}>kbps</span>
            <span className={styles.bitrateRes}>{resolutionLabel}</span>
          </span>
          {bitrateHistory && bitrateHistory.length > 1 ? (
            <span className={styles.bitrateSpark} aria-hidden="true">
              <Sparkline
                points={[...bitrateHistory]}
                tone={health === "critical" ? "red" : health === "degraded" ? "amber" : "teal"}
                width={88}
                height={26}
                ariaLabel="Bitrate trend"
              />
            </span>
          ) : null}
        </div>

        <div className={styles.controlsRight}>
          <button type="button" className={styles.iconButton} aria-label="Open stream settings">
            <Settings2 size={15} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Enter fullscreen">
            <Maximize2 size={15} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" className={styles.broadcastPill} aria-label="Open broadcast mic options">
            <Mic size={13} strokeWidth={2.2} aria-hidden="true" />
            Stream
          </button>
        </div>
      </div>
    </section>
  )
}

export default LivePlayer
