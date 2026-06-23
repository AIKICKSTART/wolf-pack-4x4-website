import Image from "next/image"

const wolfpackCollections = [
  {
    slug: "ranger-raptor-hilux",
    title: "Ranger Raptor and HiLux GR Sport",
    body: "Australian dual-cab performance utes with OEM badging retained, then finished in the Wolfpack black, blue and purple wrap direction.",
    proof: "Badged performance utes with Wolfpack wrap",
    status: "AU ute builds",
    badgeAction: "Raptor / GR Sport",
    hero: "/media/wolfpack/vehicles/ford-ranger-raptor-wolfpack.png",
    frames: [
      { path: "/media/wolfpack/vehicles/toyota-hilux-gr-sport-wolfpack.png", title: "Toyota HiLux GR Sport concept" },
      { path: "/media/wolfpack/merch/founding-wolfpack-shirt.png", title: "Founding Wolfpack shirt" },
    ],
  },
  {
    slug: "patrol-landcruiser",
    title: "Patrol Warrior and LandCruiser 79",
    body: "Big Australian touring platforms with visible Nissan, Warrior, Toyota and LandCruiser cues, ready for suspension, protection and recovery planning.",
    proof: "Touring platforms with OEM identity intact",
    status: "Touring builds",
    badgeAction: "Warrior / 79",
    hero: "/media/wolfpack/vehicles/nissan-patrol-warrior-wolfpack.png",
    frames: [
      { path: "/media/wolfpack/vehicles/toyota-landcruiser-79-wolfpack.png", title: "Toyota LandCruiser 79 concept" },
      { path: "/media/wolfpack/wolfpack-logo-transparent.png", title: "Wolfpack 4x4 badge system" },
    ],
  },
  {
    slug: "dmax-triton",
    title: "D-MAX Blade and Triton GSR",
    body: "Late-model Australian 4x4 utes with visible Isuzu, Blade, Mitsubishi and GSR cues, wrapped into the same Wolfpack performance identity.",
    proof: "Work utes turned into Wolfpack builds",
    status: "Ute builds",
    badgeAction: "Blade / GSR",
    hero: "/media/wolfpack/vehicles/isuzu-dmax-blade-wolfpack.png",
    frames: [
      { path: "/media/wolfpack/vehicles/mitsubishi-triton-gsr-wolfpack.png", title: "Mitsubishi Triton GSR concept" },
      { path: "/media/wolfpack/wolfpack-mascot.png", title: "Technical Wolfpack mascot" },
    ],
  },
]

export function VehicleImageCollectionsSection() {
  return (
    <section className="section vehicle-collections-section" id="vehicle-sets">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ 04 ] Gallery / quote confidence</div>
            <h2 className="display display-lg" style={{ marginTop: 18, maxWidth: 980 }}>
              See the finish,
              <br />
              <span className="tk-accent">
                then book the bay.
              </span>
            </h2>
          </div>
          <p className="lead">
            Use the gallery like a quoting brief: accurate Australian 4x4 models,
            OEM badges left visible, and the Wolfpack black, blue and purple wrap
            direction applied over real-world upgrade platforms.
          </p>
        </div>

        <div className="vehicle-collection-feature reveal">
          {wolfpackCollections.map((collection, index) => (
            <article
              key={collection.slug}
              className="vehicle-collection-card glass vehicle-collection-card-black"
            >
              <div className="vehicle-collection-hero">
                <Image
                  src={collection.hero}
                  alt={`${collection.title} for Wolfpack 4x4`}
                  width={940}
                  height={940}
                  sizes="(max-width: 980px) 100vw, 38vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  data-parallax={20 + index * 8}
                />
                <div className="vehicle-collection-badge">
                  <span>{collection.status}</span>
                  <strong>{collection.badgeAction}</strong>
                </div>
              </div>
              <div className="vehicle-collection-copy">
                <span className="label-red">{collection.proof}</span>
                <h3>{collection.title}</h3>
                <p>{collection.body}</p>
              </div>
              <div className="vehicle-frame-strip" aria-label={`${collection.title} upgrade proof`}>
                {collection.frames.map((frame) => (
                  <figure key={`${collection.slug}-${frame.path}`}>
                    <Image
                      src={frame.path}
                      alt={`${frame.title} for Wolfpack 4x4`}
                      width={260}
                      height={260}
                      sizes="(max-width: 760px) 36vw, 9vw"
                      loading="lazy"
                    />
                    <figcaption>{frame.title}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
