import Link from "next/link"

import { UPGRADE_PRODUCT_VIDEO } from "../shared/media"

// ── Showcase: prebuilt video-hero variants, fed brand videos ───
export function MaskedPipeHeroBand() {
  return (
    <section className="section video-hero-band" id="4x4-build" aria-label="4x4 upgrade build">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ Build ] 4x4 upgrade work</div>
            <h2 className="display display-md" style={{ marginTop: 18, maxWidth: 820 }}>
              Parts shaped around the rig.
            </h2>
          </div>
          <p className="lead">
            Suspension, protection, lighting and recovery gear planned around
            the way the vehicle is loaded and driven.
          </p>
        </div>
      </div>
      <div className="video-hero-stage exhaust-video-stage reveal">
        <section className="exhaust-video-hero" aria-labelledby="exhaust-video-title">
          <video
            className="exhaust-video-bg"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={UPGRADE_PRODUCT_VIDEO.posterSrc}
            aria-hidden="true"
          >
            <source src={UPGRADE_PRODUCT_VIDEO.videoSrc} type="video/mp4" />
          </video>
          <div className="exhaust-video-shade" aria-hidden="true" />
          <div className="exhaust-video-frame">
            <div className="exhaust-video-copy">
              <div className="label-red">Bay fitment · 4x4 accessories</div>
              <h3 id="exhaust-video-title" className="display display-lg">
                Built in the bay.
                <br />
                Finished like it matters.
              </h3>
              <p>
                Lift kits, protection, lighting, recovery and touring accessories
                shaped around the vehicle before the parts are fitted.
              </p>
              <div className="exhaust-video-actions">
                <Link className="btn btn-red" href="/quote">
                  <span>Send my vehicle details</span>
                  <span className="arrow" />
                </Link>
                <Link className="btn btn-chrome" href="/services/suspension-lift-kits">
                  <span>View upgrade services</span>
                  <span className="arrow" />
                </Link>
              </div>
            </div>
            <div className="exhaust-video-proof" aria-label="4x4 build proof points">
              <div>
                <span>01</span>
                <strong>Ride height</strong>
                <small>Clearance checked before parts are ordered</small>
              </div>
              <div>
                <span>02</span>
                <strong>Accessory load</strong>
                <small>Built around the way the rig is used</small>
              </div>
              <div>
                <span>03</span>
                <strong>Recovery plan</strong>
                <small>Parts matched to the trip or work target</small>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
