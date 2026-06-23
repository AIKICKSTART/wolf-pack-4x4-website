import Link from "next/link"
import Image from "next/image"

import { BrandCarbonIcon } from "../shared/brand-icon"
import type { PublicCardIconItem } from "../shared/types"

// ── Services ───────────────────────────────────────────────────
export function Services() {
  const items: Array<PublicCardIconItem & { image: string; imageAlt: string }> = [
    {
      n: "01",
      title: "Suspension and lift kits",
      href: "/services/suspension-lift-kits",
      iconName: "suspension",
      image: "/media/wolfpack/services/suspension-lift-kits.webp",
      imageAlt: "Wolfpack 4x4 suspension and lift kit service artwork",
      body: "Lift, shocks and springs selected around the vehicle, accessory weight, towing load and real touring use.",
    },
    {
      n: "02",
      title: "Bull bars and protection",
      href: "/services/bull-bars-protection",
      iconName: "protection",
      image: "/media/wolfpack/services/bull-bars-protection.webp",
      imageAlt: "Wolfpack 4x4 bull bar and protection service artwork",
      body: "Front bars, steps, rails and protection gear planned around sensors, weight, clearance and recovery setup.",
    },
    {
      n: "03",
      title: "Winches and recovery",
      href: "/services/winches-recovery-gear",
      iconName: "winch",
      image: "/media/wolfpack/services/winches-recovery-gear.webp",
      imageAlt: "Wolfpack 4x4 winch and recovery gear service artwork",
      body: "Winches, recovery points, boards and recovery accessories chosen around the places you actually drive.",
    },
    {
      n: "04",
      title: "Lighting and electrical",
      href: "/services/4x4-lighting-electrical",
      iconName: "lighting",
      image: "/media/wolfpack/services/4x4-lighting-electrical.webp",
      imageAlt: "Wolfpack 4x4 lighting and electrical service artwork",
      body: "Driving lights, work lights, switch gear and accessory wiring planned around bars, racks, canopies and power needs.",
    },
  ]
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 02 ] Workshop services</div>
            <h2
              className="display display-lg services-h2"
              style={{ marginTop: 18, maxWidth: 780 }}
            >
              <span className="tk-ink">Trail-ready.</span>
              <br />
              <span className="tk-accent">
                Built as a system.
              </span>
            </h2>
            <div className="services-stamp">
              <span className="label">Albion Park Rail · 4x4 upgrades</span>
              <span className="services-stamp-line" />
            </div>
          </div>
          <p className="lead">
            Suspension, protection, recovery, lighting and touring parts planned
            around the way your 4x4 is actually used.
          </p>
        </div>

        <div className="services">
          {items.map((it, i) => (
            <article
              key={it.n}
              className={`service glass reveal d${i + 1}`}
              data-reveal="scale"
            >
              <div className="sweep" aria-hidden="true" />
              <div className="service-media">
                <Image
                  src={it.image}
                  alt={it.imageAlt}
                  width={1280}
                  height={560}
                  sizes="(max-width: 720px) 88vw, (max-width: 1180px) 42vw, 21vw"
                />
              </div>
              <div className="service-num">{it.n}</div>
              <div>
                <div className="service-icon brand-carbon-icon">
                  <BrandCarbonIcon name={it.iconName} />
                </div>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
              <Link className="more" href={it.href}>
                View {it.title}
              </Link>
            </article>
          ))}
        </div>
        <div className="services-actions reveal">
          <Link className="btn btn-red" href="/services">
            <span>See all services</span>
            <span className="arrow" />
          </Link>
          <Link className="btn btn-ghost" href="/quote">
            <span>Send my vehicle details</span>
            <span className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  )
}
