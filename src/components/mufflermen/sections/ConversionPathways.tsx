import Link from "next/link"

import { BrandCarbonIcon } from "../shared/brand-icon"
import type { PublicCardIconItem } from "../shared/types"

export function ConversionPathways() {
  const items: PublicCardIconItem[] = [
    {
      kicker: "Fast quote",
      title: "Call the workshop",
      iconName: "phone",
      body:
        "Call with your vehicle, current setup and upgrade goal so the team can steer you toward the right staged 4x4 plan.",
      href: "tel:+61242569256",
      cta: "Call Wolfpack",
    },
    {
      kicker: "Detailed & clear",
      title: "Quote my vehicle",
      iconName: "quote",
      body:
        "Send the make, model, year, photos and intended use so the team can quote suspension, protection, lighting, recovery, towing or supplied parts.",
      href: "/quote",
      cta: "Send my vehicle details",
    },
    {
      kicker: "Need parts",
      title: "Choose 4x4 parts",
      iconName: "parts",
      body:
        "Browse 4x4 categories for suspension, towing, lighting, recovery, storage and engine-bay support before you book the bay.",
      href: "/parts",
      cta: "Browse 4x4 parts",
    },
  ]

  return (
    <section className="section conversion-pathways" id="quote-path">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 03 ] Book the right job</div>
            <h2 className="display display-lg" style={{ marginTop: 18, maxWidth: 780 }}>
              <span className="tk-ink">One clear path.</span>
              <br />
              <span className="tk-accent">
                Right build, first time.
              </span>
            </h2>
          </div>
          <p className="lead">
            Three ways to start — all lead to the right upgrade path, with no
            misdirection and no wrong first step.
          </p>
        </div>

        <div className="route-grid conversion-grid">
          {items.map((item, i) => (
            <article
              key={item.title}
              className="route-panel conversion-panel glass reveal"
              data-reveal={["left", "scale", "right"][i % 3]}
            >
              <div className="conversion-icon brand-carbon-icon" aria-hidden="true">
                <BrandCarbonIcon name={item.iconName} />
              </div>
              <div>
                <span className="label-red">{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              {item.href.startsWith("#") || item.href.startsWith("tel:") ? (
                <a className="more" href={item.href}>
                  {item.cta}
                </a>
              ) : (
                <Link className="more" href={item.href}>
                  {item.cta}
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
