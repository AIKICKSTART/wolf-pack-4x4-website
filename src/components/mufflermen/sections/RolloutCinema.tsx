import Image from "next/image"
import Link from "next/link"

import { contactFromCms } from "../shared/contact"
import { HERO_POSTER } from "../shared/media"
import type { HomepageCmsSettings } from "../shared/types"

// ── Rolling out the door — final rotating-car CTA ──────────────
export function RolloutCinema({ settings }: { settings: HomepageCmsSettings | null }) {
  const contact = contactFromCms(settings)

  return (
    <section
      className="rollout-cinema"
      id="book"
      data-screen-label="Rollout CTA"
    >
      <Image
        className="rollout-vid"
        src={HERO_POSTER}
        alt="Wolfpack 4x4 upgrade quote call to action"
        fill
        sizes="100vw"
      />
      <div className="rollout-vignette" />

      <div className="rollout-badge">
        <div className="ring-2" />
        <div className="plate chrome-plate" />
        <div className="ring" />
        <div className="needle" aria-hidden="true" />
        <div className="core">
          <span className="n">4x4</span>
          <span className="l">READY</span>
        </div>
      </div>

      <div className="rollout-main">
        <div className="label-row" style={{ justifyContent: "center" }}>
          <span className="dot" />
          <span className="label tk-cinema-muted">
            Upgrade quotes, parts and workshop bookings
          </span>
        </div>
        <h2>
          <span className="tk-cinema-ink">Build it</span>{" "}
          <span className="tk-accent">properly.</span>
        </h2>
        <p className="sub">
          Tell us the vehicle, current accessories and the towing, touring,
          recovery or performance target. The team will point you toward the
          right upgrade path before parts are ordered.
        </p>
        <div className="row">
          <a className="btn btn-red" href={contact.phoneHref}>
            <span>Call for a 4x4 quote</span>
            <span className="arrow" />
          </a>
          <a className="btn btn-chrome" href={contact.phoneHref}>
            <span>Call {contact.phone}</span>
          </a>
          <Link className="btn btn-ghost" href="/quote">
            <span>Send my vehicle details</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
