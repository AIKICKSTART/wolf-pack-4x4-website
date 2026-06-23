"use client"

import Image from "next/image"

export function HomepageFounderTeam() {
  return (
    <section className="section home-founder-team" id="founder-team">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="label-red">[ About ] Our founder and team</div>
            <h2 className="display display-lg" style={{ marginTop: 18, maxWidth: 860 }}>
              <span className="tk-ink">4x4 upgrades.</span>
              <br />
              <span className="tk-accent">
                One local workshop.
              </span>
            </h2>
          </div>
          <p className="lead">
            Wolfpack 4x4 plans, supplies and fits suspension, protection, lighting,
            recovery and touring upgrades for work utes and weekend rigs.
          </p>
        </div>
        <div className="home-founder-grid home-founder-grid-single">
          <article className="home-founder-card home-founder-card-lead glass reveal">
            <div>
              <span className="label-red">Workshop specialists</span>
              <h3>Wolfpack starts with the build plan.</h3>
              <p>
                The team checks how the vehicle is loaded, towed and driven before
                parts are ordered. Suspension, bull bars, winches, lighting and
                touring storage are planned as one upgrade path.
              </p>
              <p>
                Customers get the right path first: supplied parts, fitment or a staged
                build, with timing confirmed before booking the bay.
              </p>
            </div>
            <Image
              src="/media/wolfpack/wolfpack-mascot.png"
              alt="Wolfpack 4x4 armored wolf mascot"
              width={1100}
              height={820}
            />
          </article>
        </div>
      </div>
    </section>
  )
}
