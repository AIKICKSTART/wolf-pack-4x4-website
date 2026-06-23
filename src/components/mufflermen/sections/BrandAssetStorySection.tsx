import Image from "next/image"

export function BrandAssetStorySection() {
  const upgradeAssets = [
    {
      title: "Suspension and stance",
      label: "Lift package",
      path: "/media/wolfpack/wolfpack-hero.png",
      body: "Visual proof for customers comparing ride height, tyre clearance, load support and fitted outcome.",
    },
    {
      title: "Protection and recovery",
      label: "Bull bar ready",
      path: "/media/wolfpack/wolfpack-logo-transparent.webp",
      body: "Show customers how protection, winches and recovery gear fit into the full vehicle plan.",
    },
    {
      title: "Touring electrical",
      label: "Power support",
      path: "/media/wolfpack/wolfpack-mascot.png",
      body: "Lighting, dual battery and touring power support presented clearly before the bay is booked.",
    },
    {
      title: "Parts on the bench",
      label: "Accessory components",
      path: "/media/generated/products/parts-proof-bench-integrated-card.webp",
      body: "Clear product imagery for suspension, towing, lighting, recovery and storage accessories before the bay is booked.",
    },
    {
      title: "Performance 4x4 upgrades",
      label: "Drivability",
      path: "/media/wolfpack/wolfpack-hero.png",
      body: "Performance imagery that sells the right parts by vehicle, use case, load and intended result.",
    },
    {
      title: "Workshop 4x4 products",
      label: "Product proof",
      path: "/media/generated/products/parts-range-integrated-card.webp",
      body: "A branded product scene for category pages, quote inserts and parts lookup journeys.",
    },
  ]

  return (
    <section className="section brand-assets-story" id="brand-assets">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 05 ] 4x4 upgrades</div>
            <h2 className="display display-lg" style={{ marginTop: 18, maxWidth: 940 }}>
              Show the build,
              <br />
              <span className="tk-accent">
                then quote it properly.
              </span>
            </h2>
          </div>
          <p className="lead">
            Strong 4x4 imagery helps customers compare suspension, protection,
            lighting, recovery, supplied parts, fitment detail and touring outcomes
            before they request a quote.
          </p>
        </div>

        <div className="brand-assets-grid reveal">
          {upgradeAssets.map((asset, index) => (
            <article
              key={asset.title}
              className={`brand-asset-card glass ${index === 0 ? "is-wide" : ""}`}
            >
              <Image
                src={asset.path}
                alt={`${asset.title} for Wolfpack 4x4`}
                width={index === 0 ? 1200 : 760}
                height={index === 0 ? 675 : 428}
                sizes={index === 0 ? "(max-width: 980px) 100vw, 58vw" : "(max-width: 980px) 50vw, 25vw"}
                loading="lazy"
              />
              <div>
                <span className="label-red">{asset.label}</span>
                <h3>{asset.title}</h3>
                <p>{asset.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
