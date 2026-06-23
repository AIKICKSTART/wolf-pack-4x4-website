"use client"

import { useCinemaVideo, useScrollCinemaProgress } from "../shared/cinema-video"
import { VIDEOS } from "../shared/media"

// ── 4x4 Build Architecture ────────────────────────────────────
export function ExhaustArchitecture() {
  const { ref, vRef } = useCinemaVideo(0.3)
  useScrollCinemaProgress(ref)

  const tiers = [
    {
      n: "01",
      name: "Suspension",
      mat: "Lift · shocks · load support",
      body: "Ride height, tyre clearance and load support scoped before parts are ordered.",
    },
    {
      n: "02",
      name: "Protection",
      mat: "Bull bars · underbody · recovery",
      body: "Protection and recovery gear matched around access, weight and how the vehicle is used.",
    },
    {
      n: "03",
      name: "Touring systems",
      mat: "Lighting · power · racks",
      body: "Electrical, storage and touring accessories staged so the build remains practical.",
    },
  ]

  return (
    <section
      className="arch-cinema"
      id="about"
      ref={ref}
      data-screen-label="4x4 Build Architecture"
    >
      <video
        ref={vRef}
        className="arch-vid"
        muted
        playsInline
        preload="metadata"
      >
        <source src={VIDEOS.exhaustReveal} type="video/mp4" />
      </video>
      <div className="arch-vignette" />

      <div className="arch-text pos-bl">
        <div className="label-row">
          <span className="dot" />
          <span>Section 03 · Build options</span>
        </div>
        <h2>
          <span className="tk-cinema-ink">Every upgrade,</span>
          <br />
          <span className="tk-accent">laid out flat.</span>
        </h2>
        <p className="sub">
          Suspension, protection, recovery, lighting and touring accessories
          start with the vehicle, the load and the result you want.
        </p>
      </div>

      <div className="arch-tiers">
        {tiers.map((t) => (
          <div key={t.n} className="arch-tier glass">
            <div className="n">{t.n}</div>
            <div className="name">{t.name}</div>
            <div className="mat">{t.mat}</div>
            <p>{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
