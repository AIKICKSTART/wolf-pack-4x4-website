import { seedanceById } from "@/app/ui-primitives/seedance-video-pack"
import { CinematicLoopHero } from "@/app/ui-primitives/components/video-heroes"

export function PrimitiveMarketingVideoSection() {
  const hero = seedanceById("workshop-hero-landscape")
  const service = seedanceById("service-dyno-landscape")
  const product = seedanceById("exhaust-product-landscape")

  const assets = [
    {
      asset: service,
      copy: "Show customers the fitment view before they book suspension, protection, lighting or recovery work.",
      label: "Book a 4x4 inspection",
      title: "Inspect the build before quoting",
    },
    {
      asset: product,
      copy: "Sell suspension, towing, lighting and recovery accessories with clear product footage before the customer asks for a quote.",
      label: "Choose 4x4 parts",
      title: "Show the parts before the install",
    },
  ]

  return (
    <section className="section primitive-marketing-section" id="marketing-assets">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 03 ] Workshop media</div>
            <h2 className="display display-lg" style={{ marginTop: 18, maxWidth: 900 }}>
              See the work before
              <br />
              <span className="tk-accent">
                you book the bay.
              </span>
            </h2>
          </div>
          <p className="lead">
            Workshop footage, service checks and product details give customers a clearer
            read on fitment before the quote is locked in.
          </p>
        </div>

        <div className="primitive-video-layout reveal">
          <div className="primitive-video-hero-shell glass">
            <CinematicLoopHero
              headline="See the 4x4 build before you book."
              subhead="See the bay, the vehicle and the fitment target before choosing supplied parts, accessory fitting or a staged build."
              cta={{ label: "Request a 4x4 quote", href: "/contact-us" }}
              videoSrc={hero.videoSrc}
              posterSrc={hero.posterSrc}
              timestampLabel="Wolfpack workshop · bay footage"
            />
          </div>
          <div className="primitive-video-rail">
            {assets.map(({ asset, copy, label, title }) => (
              <article key={asset.id} className="primitive-video-card glass">
                <video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={asset.posterSrc}
                  aria-label={asset.alt}
                >
                  <source src={asset.videoSrc} type="video/mp4" />
                </video>
                <div>
                  <span className="label-red">{label}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
