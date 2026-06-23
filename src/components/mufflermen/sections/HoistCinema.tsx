import Image from "next/image"

import { HERO_POSTER } from "../shared/media"

// ── Hoist cinema ───────────────────────────────────────────────
export function HoistCinema() {
  return (
    <section className="hoist-cinema" data-screen-label="Upgrade Bay">
      <Image
        className="hoist-vid"
        src={HERO_POSTER}
        alt="Wolfpack 4x4 workshop upgrade planning hero"
        fill
        sizes="100vw"
      />
      <div className="hoist-vignette" />

      <div className="hoist-text pos-tl">
        <div className="label-row">
          <span className="dot" />
          <span>Scene 04 · Build planning</span>
        </div>
        <h2>
          <span className="tk-cinema-ink">Plan the build.</span>
          <br />
          <span className="tk-accent">
            Fit every part.
          </span>
        </h2>
        <p className="sub">
          The team checks the vehicle, talks through the outcome and recommends
          the right suspension, protection, recovery, lighting, towing or parts
          path before work begins.
        </p>
        <div className="row">
          <a className="btn btn-chrome" href="#process">
            <span>See the process</span>
            <span className="arrow" />
          </a>
        </div>
      </div>

      <div className="hoist-meta">
        <div>
          <div className="label">Fitment</div>
          <div className="v">Checked</div>
        </div>
        <div>
          <div className="label">Vehicles</div>
          <div className="v">4x4 rigs</div>
        </div>
        <div>
          <div className="label">Support</div>
          <div className="v">Call first</div>
        </div>
      </div>
    </section>
  )
}
