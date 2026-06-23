"use client"

import * as React from "react"

// ── Pinned "How it works" story ────────────────────────────────
// Tall scroll track with a sticky stage; the active step advances with scroll
// progress. Front-loads the customer's "what happens next" question. Collapses
// to a stacked static list on small screens / reduced-motion (CSS).
const STEPS = [
  {
    tag: "01",
    title: "Call or send the vehicle",
    body: "Start with the 4x4, current accessories, tyre size, towing or touring goal and the outcome you want. A quick call or the online form is enough to get moving.",
  },
  {
    tag: "02",
    title: "Plan the upgrade path",
    body: "The workshop scopes what should happen first: suspension, protection, recovery, lighting, towing support or parts. You get a practical path before anything is ordered.",
  },
  {
    tag: "03",
    title: "Fitted and checked",
    body: "The setup is fitted around clearance, weight, wiring and daily use, then checked before the vehicle leaves the bay.",
  },
]

export function ProcessPinned() {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = track.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const scrolled = Math.min(Math.max(-r.top, 0), Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))
      setActive(idx)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section
      className="process-pinned"
      id="process"
      aria-labelledby="process-heading"
      ref={trackRef}
      data-active={active}
    >
      <div className="process-pinned-stage">
        <div className="process-pinned-head reveal" data-reveal="left">
          <span className="label-red">[ How it works ]</span>
          <h2 id="process-heading" className="display display-lg">
            From quote to{" "}
            <span className="tk-accent">
              ready
            </span>
            .
          </h2>
          <p className="lead">
            4x4 upgrade work scheduled around your build — three steps, no surprises.
          </p>
        </div>

        <div className="process-pinned-grid">
          <ol className="process-pinned-rail">
            {STEPS.map((s, i) => (
              <li
                key={s.tag}
                className={i === active ? "is-active" : i < active ? "is-done" : ""}
              >
                <span className="num">{s.tag}</span>
                <span className="t">{s.title}</span>
              </li>
            ))}
          </ol>

          <div className="process-pinned-panels">
            {STEPS.map((s, i) => (
              <article
                key={s.tag}
                className={`process-pinned-panel${i === active ? " is-active" : ""}`}
                aria-hidden={i !== active}
              >
                <span className="big-num" aria-hidden="true">
                  {s.tag}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
