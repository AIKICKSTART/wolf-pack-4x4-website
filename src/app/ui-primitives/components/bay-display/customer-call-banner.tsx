"use client"

import { useCallback, useRef, useState } from "react"
import { BellRing, Volume2, VolumeX } from "lucide-react"

import { KineticText } from "../typography/kinetic-text"
import { formatCustomerCall } from "./bay-display-types"
import styles from "./customer-call-banner.module.css"

export interface CustomerCallBannerProps {
  /** Courtesy title — "Mr", "Ms", "Mx". */
  title: string
  /** Customer surname. */
  surname: string
  /** Status copy — defaults to "Your vehicle is ready". */
  message?: string
  /** Bay where the vehicle is parked for pickup. */
  bayLabel?: string
  /** Optional sound URL — bell trigger; never autoplays. */
  bellSrc?: string
  /** When false the marquee slows for distance / accessibility. */
  intense?: boolean
  className?: string
}

export function CustomerCallBanner({
  title,
  surname,
  message = "Your vehicle is ready",
  bayLabel,
  bellSrc,
  intense = true,
  className,
}: CustomerCallBannerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [muted, setMuted] = useState<boolean>(true)
  const name = formatCustomerCall(title, surname)

  const handleBell = useCallback(() => {
    if (!bellSrc) return
    const audio = audioRef.current
    if (!audio) return
    // Sound only plays on explicit user gesture — never autoplay.
    audio.muted = false
    audio.currentTime = 0
    void audio.play().catch(() => {
      // Browser blocked; remain silent.
    })
    setMuted(false)
  }, [bellSrc])

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      const audio = audioRef.current
      if (audio) audio.muted = next
      return next
    })
  }, [])

  const classes = [
    styles.banner,
    intense && styles.intense,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <aside
      className={classes}
      role="alert"
      aria-live="assertive"
      aria-label={`Customer call — ${name}, ${message}`}
    >
      <div className={styles.kicker}>
        <BellRing size={20} strokeWidth={2.4} aria-hidden="true" />
        <span>Now serving</span>
      </div>
      <div className={styles.headline}>
        <KineticText
          fontId="anton"
          motion={intense ? "color-sweep" : "letter-rise"}
          size="hero"
          className={styles.name}
        >
          {name}
        </KineticText>
      </div>
      <p className={styles.message}>
        {message}
        {bayLabel && (
          <>
            {" — "}
            <strong className={styles.bay}>{bayLabel}</strong>
          </>
        )}
      </p>
      {bellSrc && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={handleBell}
            aria-label={`Ring bell to call ${name}`}
          >
            <BellRing size={18} strokeWidth={2.4} aria-hidden="true" />
            <span>Ring</span>
          </button>
          <button
            type="button"
            className={styles.muteBtn}
            onClick={handleToggleMute}
            aria-pressed={muted}
            aria-label={muted ? "Unmute bell sound" : "Mute bell sound"}
          >
            {muted ? (
              <VolumeX size={16} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Volume2 size={16} strokeWidth={2.2} aria-hidden="true" />
            )}
          </button>
          <audio
            ref={audioRef}
            src={bellSrc}
            preload="auto"
            muted={muted}
            aria-hidden="true"
          />
        </div>
      )}
    </aside>
  )
}

export default CustomerCallBanner
