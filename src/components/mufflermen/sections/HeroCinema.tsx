"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { contactFromCms, splitHeroHeadline } from "../shared/contact"
import { HERO_PLAYLIST, HERO_POSTER } from "../shared/media"
import { SOUND_EVENT } from "../shared/cinema-video"
import { TypeReveal } from "../shared/type-reveal"
import type { HomepageCmsContent } from "../shared/types"

// The top hero plays as ONE continuous reel: logo intro → cinematic build →
// brand showcase. Two stacked <video> layers crossfade (one plays while the
// next preloads), so every clip flows into the next like a single video.
const CLIPS: readonly string[] = HERO_PLAYLIST

// ── Hero cinema ────────────────────────────────────────────────
export function HeroCinema({ content }: { content: HomepageCmsContent }) {
  const ref = React.useRef<HTMLElement>(null)
  const aRef = React.useRef<HTMLVideoElement>(null)
  const bRef = React.useRef<HTMLVideoElement>(null)
  const unmutedRef = React.useRef(false)
  const [soundOn, setSoundOn] = React.useState(false)
  const [started, setStarted] = React.useState(false)
  const [videoReady, setVideoReady] = React.useState(false)
  const [idx, setIdx] = React.useState(0)
  const [front, setFront] = React.useState<"a" | "b">("a")
  const hasClips = CLIPS.length > 0

  const contact = contactFromCms(content.settings)
  const [heroLineOne, heroLineTwo] = splitHeroHeadline(content.override?.headline)
  const heroEyebrow =
    content.override?.eyebrow ??
    content.settings?.announcement ??
    "Lead. Protect. Dominate."
  const heroLede =
    content.override?.lede ??
    content.override?.summary ??
    "Call with the vehicle, the accessories already fitted and the 4x4 outcome you want. Wolfpack 4x4 will point you toward the right suspension, protection, recovery, lighting, towing or parts path before you book."

  const frontEl = () => (front === "a" ? aRef.current : bRef.current)
  const backEl = () => (front === "a" ? bRef.current : aRef.current)

  // Start the reel on mount (logo first), muted autoplay. Reduced-motion users
  // keep the static poster.
  React.useEffect(() => {
    if (!hasClips) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // Scheduled async so the effect never sets state synchronously (avoids a
    // cascading re-render during hydration).
    const id = window.setTimeout(() => setStarted(true), 0)
    return () => window.clearTimeout(id)
  }, [hasClips])

  // Drive the two buffers: the front plays CLIPS[idx]; the back preloads the
  // next clip. The back preload is deferred so the just-ended (outgoing) layer
  // keeps showing its last frame through the crossfade instead of flashing black.
  React.useEffect(() => {
    if (!started || !hasClips) return
    const f = frontEl()
    if (!f) return

    // Front clip is normally already buffered (it was the preloaded back buffer);
    // only (re)assign + load when its source actually differs, to avoid a reload.
    if (!f.src.endsWith(CLIPS[idx])) {
      f.src = CLIPS[idx]
      f.load()
    }
    f.muted = !unmutedRef.current
    if (f.currentTime > 0.05) f.currentTime = 0
    f.play().catch(() => {
      f.muted = true
      f.play().catch(() => {})
    })

    const b = backEl()
    const nextSrc = CLIPS[(idx + 1) % CLIPS.length]
    let timer = 0
    if (b && !b.src.endsWith(nextSrc)) {
      timer = window.setTimeout(() => {
        b.src = nextSrc
        b.load()
      }, 650)
    }
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [started, idx, front, hasClips])

  const advance = React.useCallback(() => {
    if (!hasClips) return
    setIdx((i) => (i + 1) % CLIPS.length)
    setFront((p) => (p === "a" ? "b" : "a"))
  }, [hasClips])

  // Pause/resume the reel when the hero scrolls in and out of view.
  React.useEffect(() => {
    const el = ref.current
    if (!el || !hasClips) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const f = frontEl()
          if (!f) return
          if (e.isIntersecting && e.intersectionRatio > 0.25) {
            if (!started) return
            f.muted = !unmutedRef.current
            f.play().catch(() => {
              f.muted = true
              f.play().catch(() => {})
            })
          } else {
            f.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, front, hasClips])

  const broadcastSound = (on: boolean) => {
    window.__mufflermenSound = on
    window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: { soundOn: on } }))
  }

  const toggleSound = () => {
    const next = !soundOn
    const f = frontEl()
    unmutedRef.current = next
    setSoundOn(next)
    broadcastSound(next)
    if (!hasClips) return
    setStarted(true)
    if (!f) return
    f.muted = !next
    f.play().catch(() => {
      if (!next) return
      unmutedRef.current = false
      setSoundOn(false)
      broadcastSound(false)
      f.muted = true
      f.play().catch(() => {})
    })
  }

  const isFront = (which: "a" | "b") => front === which

  return (
    <section className="hero-cinema" ref={ref} data-screen-label="Hero">
      <div className="hero-cinema-track">
        <div className="hero-media-frame">
          <Image
            src={HERO_POSTER}
            alt="Wolfpack 4x4 performance upgrade workshop hero"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={`hero-poster ${hasClips && videoReady ? "is-hidden" : ""}`}
          />
          {hasClips ? (
            <>
              <video
                ref={aRef}
                className={`hero-vid ${videoReady && isFront("a") ? "is-on" : ""}`}
                muted
                playsInline
                preload="none"
                onLoadedData={() => setVideoReady(true)}
                onEnded={() => isFront("a") && advance()}
                aria-hidden="true"
              />
              <video
                ref={bRef}
                className={`hero-vid ${videoReady && isFront("b") ? "is-on" : ""}`}
                muted
                playsInline
                preload="none"
                onLoadedData={() => setVideoReady(true)}
                onEnded={() => isFront("b") && advance()}
                aria-hidden="true"
              />
            </>
          ) : null}

          <div className="hero-vignette" />
        </div>

        <div className="hero-corner pos-tl">
          <div className="label-row">
            <span className="dot" />
            <span>{heroEyebrow}</span>
          </div>
        </div>

        <div className="hero-corner pos-tr">
          <span className="label tk-cinema-muted">
            Suspension, protection, lighting and touring accessories fitted locally
          </span>
        </div>

        <div className="hero-main">
          <h1 className="hero-h1">
            <span className="sr-only">
              {heroLineTwo ? `${heroLineOne} ${heroLineTwo}` : heroLineOne}
            </span>
            <span className="line" aria-hidden="true">
              <TypeReveal text={heroLineOne} srText={false} />
            </span>
            {heroLineTwo ? (
              <>
                {" "}
                <span className="line" aria-hidden="true">
                  <TypeReveal text={heroLineTwo} accent srText={false} />
                </span>
              </>
            ) : null}
          </h1>
          <p className="hero-sub reveal-fade">{heroLede}</p>
          <div className="hero-row reveal-fade" style={{ transitionDelay: "1.4s" }}>
            <a className="btn btn-red" href={contact.phoneHref}>
              <span>Call for a 4x4 quote</span>
              <span className="arrow" />
            </a>
            <Link className="btn btn-chrome" href="/quote">
              <span>Send my vehicle details</span>
            </Link>
            <Link className="btn btn-ghost" href="/parts">
              <span>Browse 4x4 parts</span>
              <span className="arrow" />
            </Link>
          </div>
        </div>

        <div className="hero-scroll-cue">
          <span>Scroll</span>
          <span className="line" />
        </div>

        {hasClips ? (
          <button
            className={`sound-mini ${soundOn ? "on" : ""}`}
            onClick={toggleSound}
            aria-label={soundOn ? "Mute hero video" : "Play hero video sound"}
            aria-pressed={soundOn}
          >
            <span className="icon" aria-hidden="true">{soundOn ? "🔊" : "🔇"}</span>
          </button>
        ) : null}
      </div>
    </section>
  )
}
