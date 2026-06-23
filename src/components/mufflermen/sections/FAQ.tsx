"use client"

import * as React from "react"

// ── FAQ ────────────────────────────────────────────────────────
export function FAQ() {
  const items = [
    {
      q: "Can the team build a staged 4x4 upgrade plan?",
      a: "Yes. Wolfpack can plan suspension, protection, lighting, recovery and touring accessories so the vehicle is upgraded in the right order.",
    },
    {
      q: "How long does the work take?",
      a: "Straightforward accessory fitting may be quick. Larger suspension, electrical, protection or touring builds may need booking time, so call first.",
    },
    {
      q: "What areas does the workshop serve?",
      a: "Oak Flats, Albion Park Rail, Illawarra, Wollongong and nearby South Coast customers. Call first if the vehicle needs special handling.",
    },
    {
      q: "What should a customer send in an enquiry?",
      a: "Vehicle make, model, year, engine, current accessories, tyre size and how the vehicle is used. Photos help the workshop confirm fitment quickly.",
    },
  ]
  const [open, setOpen] = React.useState(0)
  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 07 ] Customer questions</div>
            <h2 className="display display-lg" style={{ marginTop: 18 }}>
              <span className="tk-ink">Decide with confidence</span>
              <br />
              <span className="tk-accent">
                before the bay.
              </span>
            </h2>
          </div>
          <p className="lead">
            Practical answers for customers comparing parts, fitment and staged
            upgrade options before booking a bay.
          </p>
        </div>

        <div className="faq-list reveal">
          {items.map((it, i) => (
            <details
              key={it.q}
              className="faq-item glass"
              open={open === i}
              onToggle={(e) => {
                if (e.currentTarget.open) setOpen(i)
              }}
            >
              <summary>
                <span className="faq-num">{`0${i + 1}`}</span>
                <span className="faq-q">{it.q}</span>
                <span className="faq-mark" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
